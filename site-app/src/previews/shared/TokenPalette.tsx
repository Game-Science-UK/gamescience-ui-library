/**
 * Renders the active theme's semantic tokens. Used by the `base` and theme
 * items, where the thing worth previewing is the contract rather than a
 * component — switch the theme above and every swatch re-resolves.
 */
const GROUPS: Array<{ title: string; tokens: string[] }> = [
  { title: "Surfaces", tokens: ["background", "surface-subtle", "surface", "surface-raised"] },
  { title: "Ink", tokens: ["foreground", "muted-foreground"] },
  { title: "Accents", tokens: ["primary", "secondary", "accent"] },
  { title: "Status", tokens: ["success", "warning", "danger", "information"] },
  { title: "Lines", tokens: ["border", "border-strong", "focus-ring"] },
];

function Swatch({ token }: { token: string }) {
  return (
    <div className="gs-panel overflow-hidden rounded-card border">
      <div className="h-12 w-full" style={{ background: `oklch(var(--${token}))` }} />
      <p className="gs-micro px-2 py-1.5">--{token}</p>
    </div>
  );
}

export function TokenPalette() {
  return (
    <div className="space-y-6">
      {GROUPS.map((group) => (
        <section key={group.title}>
          <p className="gs-label mb-2">{group.title}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </div>
        </section>
      ))}

      <section>
        <p className="gs-label mb-2">Typography</p>
        <div className="space-y-2">
          <p className="gs-display-hero">Display hero</p>
          <p className="gs-title-page">Page title</p>
          <p className="gs-title-section">Section title</p>
          <p className="gs-body">Body copy sets the reading rhythm for participant surfaces.</p>
          <p className="gs-label">Label</p>
          <p className="gs-data">0123456789</p>
        </div>
      </section>
    </div>
  );
}
