import { Link } from "react-router-dom";

import { CommandBlock } from "@site/components/CodeBlock";
import { VERSION, byCategory, itemNames, versionedRegistryUrl } from "@site/lib/registry";
import { SUPPORTED_CONTEXTS, SUPPORTED_THEMES } from "@/themes/theme-contract";

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="border-site-border bg-site-panel rounded-lg border px-4 py-3">
      <p className="text-site-fg text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-site-muted mt-0.5 text-[13px]">{label}</p>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="border-site-border font-site-mono text-site-muted mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px]">
        {n}
      </span>
      <div>
        <p className="text-site-fg font-medium">{title}</p>
        <p className="text-site-muted mt-1 text-[14px] leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

export function Home() {
  const groups = byCategory();

  return (
    <div className="mx-auto max-w-4xl">
      <section className="py-8">
        <p className="font-site-mono text-site-dim text-xs uppercase tracking-widest">
          GameScience UI · {VERSION}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          A component registry for multiplayer learning games.
        </h1>
        <p className="text-site-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Approved React source you install into a game project — participant, facilitator and
          shared-display interfaces, themed per game, composed by the Lovable build agent.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/get-started"
            className="bg-site-accent text-site-accent-fg rounded-lg px-4 py-2 text-sm font-medium"
          >
            Get started
          </Link>
          <Link
            to="/components"
            className="border-site-border text-site-fg hover:border-site-border-strong rounded-lg border px-4 py-2 text-sm transition-colors"
          >
            Browse the registry
          </Link>
          <Link
            to="/skills"
            className="border-site-border text-site-fg hover:border-site-border-strong rounded-lg border px-4 py-2 text-sm transition-colors"
          >
            Agent skills
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat value={itemNames.length} label="Registry items" />
        <Stat value={SUPPORTED_THEMES.length} label={`Themes — ${SUPPORTED_THEMES.join(", ")}`} />
        <Stat value={SUPPORTED_CONTEXTS.length} label="Experience contexts" />
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">How the registry works</h2>
        <p className="text-site-muted mt-2 max-w-2xl">
          It distributes <strong className="text-site-fg">source code</strong>, not a package. There
          is no runtime dependency on GameScience and no automatic updates.
        </p>
        <ol className="mt-6 space-y-5">
          <Step n={1} title="Pin a version">
            A project records an immutable registry URL. Published versions never change, so a game
            built today keeps building tomorrow.
          </Step>
          <Step n={2} title="Install what the surface needs">
            <code className="font-site-mono text-site-fg text-[13px]">shadcn add</code> copies the
            files into the project. They become ordinary project source — editable, reviewable, and
            owned by the game.
          </Step>
          <Step n={3} title="Compose in Lovable">
            The build agent assembles installed patterns into screens. Game logic, networking,
            scoring and content stay in the application.
          </Step>
          <Step n={4} title="Upgrade deliberately">
            Moving to a newer version is an explicit action, diffed before it lands. Nothing updates
            underneath a running game.
          </Step>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Point a project at it</h2>
        <p className="text-site-muted mt-2">
          Add the namespace to <code className="font-site-mono text-[13px]">components.json</code>,
          then install.
        </p>
        <div className="mt-4 space-y-3">
          <CommandBlock command={`"@gamescience": "${versionedRegistryUrl()}"`} />
          <CommandBlock command="npx shadcn@latest add @gamescience/base @gamescience/theme-gamescience" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Theme, context, role, route</h2>
        <p className="text-site-muted mt-2 max-w-2xl">
          Four separate concerns. Conflating them is the most common source of trouble.
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            [
              "Theme",
              "Visual identity, selected once at the application root. Never a component prop.",
            ],
            ["Context", "The interface environment — participant, facilitator, or shared display."],
            [
              "Role",
              "What a person is authorised to do. Application-owned; a context prop grants nothing.",
            ],
            [
              "Route",
              "Where a surface is mounted. A route may imply a context, but does not define one.",
            ],
          ].map(([term, definition]) => (
            <div key={term} className="border-site-border bg-site-panel rounded-lg border p-4">
              <dt className="text-site-fg font-medium">{term}</dt>
              <dd className="text-site-muted mt-1 text-[14px] leading-relaxed">{definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-8 mt-14">
        <h2 className="text-xl font-semibold tracking-tight">What is in it</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {groups.map((group) => (
            <Link
              key={group.category}
              to="/components"
              className="border-site-border bg-site-panel hover:border-site-border-strong rounded-lg border p-4 transition-colors"
            >
              <p className="text-site-fg font-medium">
                {group.items.length}{" "}
                <span className="text-site-muted">
                  {group.category === "base" ? "foundation" : group.category}
                  {group.items.length === 1 ? "" : "s"}
                </span>
              </p>
              <p className="text-site-dim mt-1 truncate text-[13px]">
                {group.items.slice(0, 4).join(", ")}
                {group.items.length > 4 ? "…" : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
