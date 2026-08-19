import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import GlobeGL from "react-globe.gl";
import { MeshPhongMaterial, Color } from "three";
import { feature } from "topojson-client";
import { polygonToCells } from "h3-js";

import { cn } from "@/lib/cn";

/**
 * Rotating hex-tessellated globe for shared displays.
 *
 * A theme-specific *visual*, not a theme fork: no other component changes, and
 * a theme that never renders a globe pays nothing. Its entire palette comes
 * from the `--globe-*` tokens, which default to the semantic contract in
 * foundations, so it is legible under any theme and distinctive under one that
 * overrides them.
 *
 * The component owns presentation only. Positions, colours, heat and arc
 * routing are supplied by the application — this never computes geography,
 * scoring or timing.
 *
 * Heavy: pulls three.js, react-globe.gl and a world topology. Install it only
 * for displays that need it, and render it behind a client-only boundary if the
 * consuming app server-renders.
 */

const HEX_RESOLUTION = 3;

/** Atmosphere falls back to the theme's primary when no globe token is set. */
const ATMOSPHERE = ["--globe-atmosphere", "--primary"];

/** Land polygons, tessellated once on first mount rather than at import. */
let landCache: object[] | undefined;

async function loadLand(): Promise<object[]> {
  if (landCache) return landCache;

  const topology = (await import("world-atlas/countries-110m.json"))
    .default as unknown as Parameters<typeof feature>[0];
  const collection = feature(
    topology,
    (topology as unknown as { objects: { countries: unknown } }).objects.countries as never,
  ) as unknown as { features: Array<{ geometry?: { type: string; coordinates: unknown } }> };

  // A few 110m outlines make h3 throw at this resolution, and one throw aborts
  // the whole tessellation — every later landmass would silently disappear.
  landCache = collection.features.filter((entry) => {
    const geometry = entry?.geometry;
    if (!geometry) return false;
    try {
      if (geometry.type === "Polygon") {
        polygonToCells(geometry.coordinates as never, HEX_RESOLUTION, true);
      } else {
        (geometry.coordinates as unknown[]).forEach((part) =>
          polygonToCells(part as never, HEX_RESOLUTION, true),
        );
      }
      return true;
    } catch {
      return false;
    }
  }) as object[];

  return landCache;
}

/** An incident or point of interest pinned to the surface. */
export interface GlobeMarker {
  id: string;
  lat: number;
  lng: number;
  /** Application-defined marker family; drives the glyph. */
  kind?: "detection" | "identity";
  /** Any CSS colour. Defaults to `--globe-marker`. */
  color?: string;
  /** 0–1. Drives pulse rate, scale and glow. The application owns the curve. */
  heat?: number;
  state?: "live" | "resolved";
}

/** An expanding ring, used for arrivals and alerts. */
export interface GlobeRing {
  lat: number;
  lng: number;
  color?: string;
  maxRadius?: number;
  speed?: number;
}

/** A fixed location dot. */
export interface GlobeSite {
  id: string;
  lat: number;
  lng: number;
  color?: string;
}

/** A travelling arc between two points. */
export interface GlobeArc {
  id?: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string;
  stroke?: number;
  altitude?: number;
  /** Travelling-pulse duration in ms. */
  dashTime?: number;
}

export interface GlobeProps {
  width: number;
  height: number;
  markers?: GlobeMarker[];
  rings?: GlobeRing[];
  arcs?: GlobeArc[];
  sites?: GlobeSite[];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  pointOfView?: { lat?: number; lng?: number; altitude?: number };
  /** Receives the underlying instance for camera and projection work. */
  apiRef?: React.MutableRefObject<unknown>;
  className?: string;
  style?: CSSProperties;
}

/**
 * Converts an OKLCH channel triplet to sRGB.
 *
 * Theme tokens are stored as bare `L C H` channels. Browsers now preserve
 * `oklch()` in computed styles rather than converting to `rgb()`, and three.js
 * cannot parse that — reading the computed colour yields a white sphere. So the
 * conversion happens here, which also keeps the component usable outside a DOM.
 */
function oklchToRgb(l: number, c: number, hDegrees: number): [number, number, number] {
  const h = (hDegrees * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);

  const lCube = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const mCube = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const sCube = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const linear = [
    4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube,
    -1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube,
    -0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube,
  ];

  return linear.map((channel) => {
    const gamma = channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(gamma * 255)));
  }) as [number, number, number];
}

/** `rgb(r, g, b)` → `rgba(r, g, b, alpha)`. */
function withAlpha(rgb: string, alpha: number): string {
  const parts = rgb.match(/-?[\d.]+/g);
  if (!parts || parts.length < 3) return rgb;
  return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
}

/**
 * Reads the first declared token from `names` and returns it as `rgb(r, g, b)`.
 *
 * The fallback chain lives here rather than in CSS because a custom property
 * that aliases another (`--globe-hex: var(--primary)`) is computed where it is
 * declared. Declared at `:root`, it would inherit frozen and ignore the theme
 * applied further down the tree.
 */
function colorToken(host: HTMLElement, names: string[], fallback: string): string {
  if (typeof window === "undefined") return fallback;

  const styles = getComputedStyle(host);
  for (const name of names) {
    const channels = styles
      .getPropertyValue(name)
      .trim()
      .match(/-?[\d.]+/g)
      ?.map(Number);
    if (!channels || channels.length < 3) continue;

    const [l = 0, c = 0, h = 0] = channels;
    const [r, g, b] = oklchToRgb(l, c, h);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return fallback;
}

function numericToken(host: HTMLElement, name: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(host).getPropertyValue(name).trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
}

export function Globe({
  width,
  height,
  markers = [],
  rings = [],
  arcs = [],
  sites = [],
  autoRotate = true,
  autoRotateSpeed = 0.35,
  pointOfView,
  apiRef,
  className,
  style,
}: GlobeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<Record<string, (...args: never[]) => unknown> | null>(null);
  const [land, setLand] = useState<object[]>([]);

  useEffect(() => {
    let active = true;
    void loadLand().then((features) => {
      if (active) setLand(features);
    });
    return () => {
      active = false;
    };
  }, []);

  /** Theme palette, resolved once per mount from the `--globe-*` tokens. */
  const palette = useMemo(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    return {
      atmosphere: colorToken(host, ATMOSPHERE, "rgb(127, 214, 255)"),
      hex: colorToken(host, ["--globe-hex", ...ATMOSPHERE], "rgb(127, 214, 255)"),
      surface: colorToken(host, ["--globe-surface", "--surface"], "rgb(9, 18, 34)"),
      specular: colorToken(host, ["--globe-specular", "--border-strong"], "rgb(60, 110, 150)"),
      marker: colorToken(host, ["--globe-marker", ...ATMOSPHERE], "rgb(127, 214, 255)"),
      opacity: numericToken(host, "--globe-opacity", 0.55),
      hexOpacity: numericToken(host, "--globe-hex-opacity", 0.42),
      atmosphereAltitude: numericToken(host, "--globe-atmosphere-altitude", 0.26),
    };
    // Resolved after the first paint, when the host is inside the themed tree.
  }, [land.length]);

  const globeMaterial = useMemo(() => {
    if (!palette) return undefined;
    return new MeshPhongMaterial({
      color: new Color(palette.surface),
      emissive: new Color(palette.surface),
      specular: new Color(palette.specular),
      shininess: 12,
      transparent: true,
      opacity: palette.opacity,
      depthWrite: true,
    });
  }, [palette]);

  // Marker nodes must survive re-renders: rebuilding them restarts their CSS
  // animations, so a polling application would never let a pulse play through.
  const latest = useRef(new Map<string, GlobeMarker>());
  latest.current = new Map(markers.map((marker) => [marker.id, marker]));
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const sizeRef = useRef(width);
  sizeRef.current = width;

  const identityKey = markers
    .map((marker) => `${marker.id}:${marker.lat.toFixed(3)}:${marker.lng.toFixed(3)}`)
    .join("|");

  const stableMarkers = useMemo(
    () => markers.map(({ id, lat, lng, kind }) => ({ id, lat, lng, kind })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [identityKey],
  );

  const applyMarkerState = useCallback(
    (element: HTMLDivElement, marker: GlobeMarker) => {
      const heat = Math.max(0, Math.min(1, marker.heat ?? 0));
      const resolved = marker.state === "resolved";

      element.style.setProperty("--gs-globe-marker-color", marker.color ?? palette?.marker ?? "");
      element.style.setProperty("--gs-globe-marker-heat", heat.toFixed(3));
      // Cool markers breathe; hot markers pulse hard and fast.
      element.style.setProperty("--gs-globe-marker-duration", `${(3.2 - 2.65 * heat).toFixed(2)}s`);
      element.style.setProperty("--gs-globe-marker-scale", (0.62 + 0.63 * heat).toFixed(3));
      element.style.setProperty(
        "--gs-globe-marker-glow",
        resolved ? "0" : (0.15 + 0.85 * heat ** 1.6).toFixed(3),
      );
      element.classList.toggle("is-resolved", resolved);
    },
    [palette],
  );

  useEffect(() => {
    nodes.current.forEach((element, id) => {
      const marker = latest.current.get(id);
      if (marker) applyMarkerState(element, marker);
    });
  });

  // Identity must stay stable — three-globe recreates every marker element when
  // this accessor changes, which would restart animations on every poll.
  const buildMarker = useCallback((datum: unknown) => {
    const marker = datum as { id: string; kind?: string };
    const element = document.createElement("div");
    const size = Math.max(14, Math.round(sizeRef.current / 34));

    element.className = "gs-globe-marker";
    element.style.setProperty("--gs-globe-marker-size", `${size}px`);
    element.style.pointerEvents = "none";

    const glyph =
      marker.kind === "identity"
        ? `<circle cx="8" cy="8" r="5.25" fill="currentColor" fill-opacity="0.16" stroke="currentColor"/><circle cx="8" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-opacity="0.55"/><circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none"/>`
        : `<circle cx="8" cy="8" r="5.25" fill="currentColor" fill-opacity="0.12" stroke="currentColor"/><circle cx="8" cy="8" r="1.7" fill="currentColor" stroke="none"/>`;

    element.innerHTML = `<span class="gs-globe-marker-inner"><span class="gs-globe-marker-glow"></span><span class="gs-globe-marker-pulse"><svg width="${size}" height="${size}" viewBox="0 0 16 16" stroke-width="1.6" aria-hidden="true">${glyph}</svg></span></span>`;

    nodes.current.set(marker.id, element);
    const current = latest.current.get(marker.id);
    if (current) applyMarkerState(element, current);
    return element;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hexColor = useCallback(
    () => withAlpha(palette?.hex ?? "", palette?.hexOpacity ?? 0.42),
    [palette],
  );

  const ringColor = useCallback(
    (datum: unknown) => (t: number) => {
      const fade = (1 - t) ** 1.6;
      const ring = datum as GlobeRing;
      return withAlpha(ring.color ?? palette?.atmosphere ?? "", fade * 0.6);
    },
    [palette],
  );

  const arcColor = useCallback(
    (datum: unknown) => {
      const arc = datum as GlobeArc;
      const base = arc.color ?? palette?.atmosphere ?? "";
      // Dim tail, hot head, dim landing — readable across a room without
      // competing with marker heat.
      return [withAlpha(base, 0.18), withAlpha(base, 1), withAlpha(base, 0.22)];
    },
    [palette],
  );

  const pointColor = useCallback(
    (datum: unknown) => (datum as GlobeSite).color ?? withAlpha(palette?.atmosphere ?? "", 0.55),
    [palette],
  );

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    if (apiRef) apiRef.current = globe;

    const controls = globe.controls?.() as
      { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean } | undefined;
    if (controls) {
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = autoRotateSpeed;
      controls.enableZoom = false;
    }

    globe.pointOfView?.({
      lat: pointOfView?.lat ?? 20,
      lng: pointOfView?.lng ?? 0,
      altitude: pointOfView?.altitude ?? 2.5,
    } as never);

    return () => {
      if (apiRef && apiRef.current === globe) apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotate, autoRotateSpeed, land.length]);

  return (
    <div
      ref={hostRef}
      className={cn("gs-globe relative", className)}
      style={{ width, height, ...style }}
    >
      {palette && land.length > 0 ? (
        <GlobeGL
          ref={globeRef as never}
          width={width}
          height={height}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere
          atmosphereColor={palette.atmosphere}
          atmosphereAltitude={palette.atmosphereAltitude}
          hexPolygonsData={land}
          hexPolygonUseDots
          hexPolygonResolution={HEX_RESOLUTION}
          hexPolygonMargin={0.35}
          hexPolygonAltitude={0.005}
          hexPolygonColor={hexColor}
          globeMaterial={globeMaterial as never}
          htmlElementsData={stableMarkers}
          htmlLat="lat"
          htmlLng="lng"
          htmlElement={buildMarker as never}
          ringsData={rings}
          ringLat="lat"
          ringLng="lng"
          ringColor={ringColor as never}
          ringMaxRadius={(datum: unknown) => (datum as GlobeRing).maxRadius ?? 14}
          ringPropagationSpeed={(datum: unknown) => (datum as GlobeRing).speed ?? 5.8}
          ringRepeatPeriod={0}
          pointsData={sites}
          pointLat="lat"
          pointLng="lng"
          pointColor={pointColor as never}
          pointAltitude={0.015}
          pointRadius={0.24}
          pointResolution={24}
          arcsData={arcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={arcColor as never}
          arcAltitude={(datum: unknown) => (datum as GlobeArc).altitude ?? null}
          arcAltitudeAutoScale={0.45}
          arcDashLength={(datum: unknown) => ((datum as GlobeArc).dashTime ? 0.45 : 0.25)}
          arcDashGap={(datum: unknown) => ((datum as GlobeArc).dashTime ? 0.65 : 0.9)}
          arcDashAnimateTime={(datum: unknown) => (datum as GlobeArc).dashTime ?? 2200}
          arcStroke={(datum: unknown) => (datum as GlobeArc).stroke ?? 0.7}
          arcsTransitionDuration={0}
        />
      ) : null}
    </div>
  );
}

Globe.displayName = "Globe";
