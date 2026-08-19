import { Link } from "react-router-dom";

import { CodeBlock, CommandBlock } from "@site/components/CodeBlock";
import { VERSION, versionedRegistryUrl } from "@site/lib/registry";

function Section({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-site-border mt-12 border-t pt-8 first:mt-0 first:border-0 first:pt-0">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {lede ? <p className="text-site-muted mt-2 max-w-2xl">{lede}</p> : null}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Numbered({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="border-site-border font-site-mono text-site-muted mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px]">
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-site-fg font-medium">{title}</p>
        <div className="text-site-muted mt-2 space-y-3 text-[14px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function GetStarted() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Get started</h1>
        <p className="text-site-muted mt-2 max-w-2xl">
          Two paths: adding the registry to a game project, or running this library locally to
          extend it.
        </p>
      </header>

      <Section
        title="Add the registry to a game"
        lede="The fastest route is to let an agent do it — the skills handle detection, pinning, provider placement and validation. Run one of these by name in your project."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["adopt-gamescience-ui", "New or early-stage project with little custom UI."],
            ["migrate-gamescience-ui", "Established project that already has substantial UI."],
            ["audit-gamescience-ui", "Read-only. Tells you what a migration would involve."],
          ].map(([slug, when]) => (
            <Link
              key={slug}
              to={`/skills/${slug}`}
              className="border-site-border bg-site-panel hover:border-site-border-strong rounded-lg border p-4 transition-colors"
            >
              <p className="font-site-mono text-site-fg text-[12.5px]">{slug}</p>
              <p className="text-site-muted mt-2 text-[13px] leading-relaxed">{when}</p>
            </Link>
          ))}
        </div>
        <p className="text-site-dim text-[13px]">
          Unsure? Run <code className="font-site-mono">audit-gamescience-ui</code> first. It changes
          nothing and reports what is covered.
        </p>
      </Section>

      <Section
        title="Or wire it up by hand"
        lede="Four steps. The registry distributes source, so after installing, the files are yours."
      >
        <Numbered n={1} title="Point components.json at a pinned version">
          <p>
            Pin the version. Never the unversioned URL — published versions are immutable, so a
            pinned project keeps building.
          </p>
          <CodeBlock
            filename="components.json"
            maxHeight={200}
            code={`{
  "registries": {
    "@gamescience": "${versionedRegistryUrl()}"
  }
}`}
          />
        </Numbered>

        <Numbered n={2} title="Install the foundations and one theme">
          <CommandBlock command="npx shadcn@latest add @gamescience/base @gamescience/theme-gamescience" />
          <p>
            One theme per application. Installing a second does not give you a toggle — it gives you
            a conflict.
          </p>
        </Numbered>

        <Numbered n={3} title="Import the CSS once">
          <p>
            Foundations first, then exactly one theme. Tailwind 4 projects also need the bridge —
            see{" "}
            <Link to="/docs/tailwind-v4-integration.md" className="text-site-accent">
              the Tailwind 4 guide
            </Link>
            .
          </p>
          <CodeBlock
            filename="src/styles.css"
            maxHeight={200}
            code={`@import "tailwindcss";
@import "./foundations/index.css";
@import "./themes/gamescience.css";`}
          />
          <p>
            Fonts are application-owned. Load them with a <code>&lt;link&gt;</code> — the registry
            never embeds a remote font.
          </p>
        </Numbered>

        <Numbered n={4} title="Mount one provider at the root">
          <p>
            Theme is selected here and nowhere else. Context describes the surface — participant,
            facilitator or shared display — and is not a permission.
          </p>
          <CodeBlock
            filename="src/main.tsx"
            maxHeight={220}
            code={`<GameScienceProvider theme="gamescience" context="participant">
  <App />
</GameScienceProvider>`}
          />
        </Numbered>
      </Section>

      <Section
        title="Then install what a surface needs"
        lede="Prefer a complete pattern over assembling primitives. A pattern pulls its own dependencies."
      >
        <CommandBlock command="npx shadcn@latest add @gamescience/join-flow" />
        <p className="text-site-dim text-[13px]">
          Browse the{" "}
          <Link to="/components" className="text-site-accent">
            catalogue
          </Link>{" "}
          to see what exists before writing new UI.
        </p>
      </Section>

      <Section
        title="Run this library locally"
        lede="For extending the registry itself — adding a component, a pattern or a theme."
      >
        <div className="space-y-4">
          <div>
            <p className="text-site-fg text-sm font-medium">Documentation site</p>
            <p className="text-site-muted mb-2 mt-1 text-[13px]">
              This site, with hot reload. Serves on the project path, matching GitHub Pages.
            </p>
            <CommandBlock command="npm run site:dev" />
          </div>

          <div>
            <p className="text-site-fg text-sm font-medium">Storybook</p>
            <p className="text-site-muted mb-2 mt-1 text-[13px]">
              The state-complete reference — every variant, state and viewport.
            </p>
            <CommandBlock command="npm run storybook" />
          </div>

          <div>
            <p className="text-site-fg text-sm font-medium">The published output</p>
            <p className="text-site-muted mb-2 mt-1 text-[13px]">
              Builds and serves everything, including the registry JSON endpoints. Deep links need
              the <code className="font-site-mono">404.html</code> fallback that GitHub Pages
              provides and most static servers do not — navigate from the home page.
            </p>
            <CommandBlock command="npm run pages:build && npm run pages:serve" />
          </div>

          <div>
            <p className="text-site-fg text-sm font-medium">Add a theme</p>
            <p className="text-site-muted mb-2 mt-1 text-[13px]">
              Scaffolds every registration site. Theme-agnostic registry items need no edits.
            </p>
            <CommandBlock command='npm run theme:new -- <slug> --title "Name"' />
          </div>

          <div>
            <p className="text-site-fg text-sm font-medium">Before opening a PR</p>
            <CommandBlock command="npm run validate" />
          </div>
        </div>
      </Section>

      <Section title="Rules worth knowing up front">
        <ul className="text-site-muted space-y-2 text-[14px]">
          {[
            "One theme per application, set only on the root provider. Never a component prop.",
            'Context is not authority. context="facilitator" grants nothing.',
            "Keep game logic, networking, scoring and content out of registry components.",
            "Do not fork components per theme — no CitadelButton, no SentinelPanel.",
            "Use semantic tokens (bg-surface, text-muted-foreground), not raw colours.",
            "Upgrade deliberately: diff before overwriting installed source.",
          ].map((rule) => (
            <li key={rule} className="flex gap-2">
              <span className="text-site-dim">—</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        <p className="text-site-dim text-[13px]">
          Current version <code className="font-site-mono">{VERSION}</code>. Full guidance in{" "}
          <Link to="/docs" className="text-site-accent">
            the documentation
          </Link>
          .
        </p>
      </Section>
    </div>
  );
}
