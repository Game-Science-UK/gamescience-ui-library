import { Globe, type GlobeArc, type GlobeMarker, type GlobeSite } from "@/components/display";
import type { Preview } from "@site/previews";

const SITES: GlobeSite[] = [
  { id: "ldn", lat: 51.5, lng: -0.12 },
  { id: "nyc", lat: 40.71, lng: -74.01 },
  { id: "sin", lat: 1.35, lng: 103.82 },
  { id: "syd", lat: -33.87, lng: 151.21 },
  { id: "fra", lat: 50.11, lng: 8.68 },
];

const MARKERS: GlobeMarker[] = [
  { id: "a", lat: 51.5, lng: -0.12, kind: "detection", heat: 0.2 },
  { id: "b", lat: 40.71, lng: -74.01, kind: "identity", heat: 0.75 },
  { id: "c", lat: 1.35, lng: 103.82, kind: "detection", heat: 0.95 },
];

const ARCS: GlobeArc[] = [
  { id: "1", startLat: 51.5, startLng: -0.12, endLat: 40.71, endLng: -74.01, dashTime: 2600 },
  { id: "2", startLat: 1.35, startLng: 103.82, endLat: 50.11, endLng: 8.68, dashTime: 3200 },
];

function GlobePreview() {
  return (
    <div className="flex justify-center">
      <Globe width={440} height={440} sites={SITES} markers={MARKERS} arcs={ARCS} />
    </div>
  );
}

export default {
  context: "shared-display",
  viewport: "full",
  theme: "sentinel",
  render: GlobePreview,
} satisfies Preview;
