import type { Meta, StoryObj } from "@storybook/react-vite";

import { Globe, type GlobeArc, type GlobeMarker, type GlobeSite } from "@/components/display";

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
  { id: "d", lat: -33.87, lng: 151.21, kind: "detection", heat: 0.4, state: "resolved" },
];

const ARCS: GlobeArc[] = [
  { id: "1", startLat: 51.5, startLng: -0.12, endLat: 40.71, endLng: -74.01, dashTime: 2600 },
  { id: "2", startLat: 1.35, startLng: 103.82, endLat: 50.11, endLng: 8.68, dashTime: 3200 },
];

const meta = {
  title: "Components/Globe",
  component: Globe,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Shared-display globe. Every colour resolves from the `--globe-*` tokens, so switching the theme toolbar re-themes the sphere, atmosphere, land dots and markers. Positions and heat are application-owned.",
      },
    },
  },
} satisfies Meta<typeof Globe>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ambient: Story = {
  args: { width: 520, height: 520, sites: SITES, arcs: ARCS },
};

export const WithIncidents: Story = {
  args: { width: 520, height: 520, sites: SITES, markers: MARKERS, arcs: ARCS },
};

export const Static: Story = {
  args: { width: 520, height: 520, sites: SITES, autoRotate: false },
};
