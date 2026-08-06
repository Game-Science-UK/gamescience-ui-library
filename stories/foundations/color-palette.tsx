type SwatchMap = Record<string, string>;

type PaletteGroup = {
  heading: string;
  items: Array<{ title: string; subtitle?: string; colors: SwatchMap }>;
};

const GROUPS: PaletteGroup[] = [
  {
    heading: "Surfaces",
    items: [
      {
        title: "Background & Foreground",
        subtitle: "Page chrome",
        colors: {
          background: "oklch(var(--background))",
          foreground: "oklch(var(--foreground))",
        },
      },
      {
        title: "Surface",
        subtitle: "Panels and raised layers",
        colors: {
          surface: "oklch(var(--surface))",
          "surface-subtle": "oklch(var(--surface-subtle))",
          "surface-raised": "oklch(var(--surface-raised))",
          "surface-overlay": "oklch(var(--surface-overlay))",
        },
      },
      {
        title: "Muted",
        subtitle: "Quiet fills and secondary copy",
        colors: {
          muted: "oklch(var(--muted))",
          "muted-foreground": "oklch(var(--muted-foreground))",
        },
      },
    ],
  },
  {
    heading: "Interactive",
    items: [
      {
        title: "Primary",
        colors: {
          primary: "oklch(var(--primary))",
          "primary-foreground": "oklch(var(--primary-foreground))",
          "primary-hover": "oklch(var(--primary-hover))",
          "primary-active": "oklch(var(--primary-active))",
        },
      },
      {
        title: "Secondary",
        colors: {
          secondary: "oklch(var(--secondary))",
          "secondary-foreground": "oklch(var(--secondary-foreground))",
          "secondary-hover": "oklch(var(--secondary-hover))",
          "secondary-active": "oklch(var(--secondary-active))",
        },
      },
      {
        title: "Accent",
        colors: {
          accent: "oklch(var(--accent))",
          "accent-foreground": "oklch(var(--accent-foreground))",
        },
      },
    ],
  },
  {
    heading: "Status",
    items: [
      {
        title: "Success",
        colors: {
          success: "oklch(var(--success))",
          "success-foreground": "oklch(var(--success-foreground))",
        },
      },
      {
        title: "Warning",
        colors: {
          warning: "oklch(var(--warning))",
          "warning-foreground": "oklch(var(--warning-foreground))",
        },
      },
      {
        title: "Danger",
        colors: {
          danger: "oklch(var(--danger))",
          "danger-foreground": "oklch(var(--danger-foreground))",
        },
      },
      {
        title: "Information",
        colors: {
          information: "oklch(var(--information))",
          "information-foreground": "oklch(var(--information-foreground))",
        },
      },
    ],
  },
  {
    heading: "System",
    items: [
      {
        title: "Border & Focus",
        colors: {
          border: "oklch(var(--border))",
          "border-strong": "oklch(var(--border-strong))",
          "focus-ring": "oklch(var(--focus-ring))",
        },
      },
    ],
  },
];

function ColorRow({
  title,
  subtitle,
  colors,
}: {
  title: string;
  subtitle?: string;
  colors: SwatchMap;
}) {
  const entries = Object.entries(colors);

  return (
    <div className="grid gap-4 border-t border-border py-4 md:grid-cols-[minmax(10rem,14rem)_1fr] md:gap-8">
      <div className="min-w-0">
        <p className="gs-label text-foreground">{title}</p>
        {subtitle ? <p className="gs-micro mt-1 text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="min-w-0 space-y-2">
        <div className="flex h-12 overflow-hidden rounded-lg border border-border">
          {entries.map(([name, value]) => (
            <div
              key={name}
              title={`${name}: ${value}`}
              className="h-full flex-1"
              style={{ background: value }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {entries.map(([name, value]) => (
            <div key={name} className="min-w-0 flex-1">
              <p className="truncate font-mono text-[11px] leading-tight text-foreground">{name}</p>
              <p className="truncate font-mono text-[10px] leading-tight text-muted-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Live token palette — resolves CSS variables from the active Theme toolbar value. */
export function SemanticColorPalette() {
  return (
    <div className="not-prose w-full max-w-4xl space-y-8 text-foreground">
      {GROUPS.map((group) => (
        <section key={group.heading} className="space-y-1">
          <div className="grid gap-4 pb-2 md:grid-cols-[minmax(10rem,14rem)_1fr] md:gap-8">
            <p className="gs-label text-muted-foreground">Name</p>
            <p className="gs-label text-muted-foreground">Swatches</p>
          </div>
          <h3 className="gs-title mb-2 tracking-tight">{group.heading}</h3>
          <div>
            {group.items.map((item) => (
              <ColorRow key={item.title} {...item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
