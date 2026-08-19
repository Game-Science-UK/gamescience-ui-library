import { Link, useParams } from "react-router-dom";

import { Markdown } from "@site/components/Markdown";
import { docUrl, useMarkdown } from "@site/lib/content";
import { PUBLIC_PAGES_DOCS, PUBLIC_PAGES_DOC_MARKERS } from "../../../scripts/pages-config.ts";

/** Migration notes are historical; they group separately from live guidance. */
const isMigrationNote = (name: string) => name.startsWith("migrations/");

function title(name: string): string {
  return PUBLIC_PAGES_DOC_MARKERS[name as keyof typeof PUBLIC_PAGES_DOC_MARKERS] ?? name;
}

function List({ names }: { names: readonly string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {names.map((name) => (
        <li key={name}>
          <Link
            to={`/docs/${name}`}
            className="border-site-border bg-site-panel hover:border-site-border-strong block rounded-lg border px-4 py-3 transition-colors"
          >
            <span className="text-site-fg text-sm">{title(name)}</span>
            <span className="font-site-mono text-site-dim mt-0.5 block text-[11px]">{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Docs() {
  const guides = PUBLIC_PAGES_DOCS.filter((name) => !isMigrationNote(name));
  const migrations = PUBLIC_PAGES_DOCS.filter(isMigrationNote);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Documentation</h1>
        <p className="text-site-muted mt-2 max-w-2xl">
          Published guidance for consuming the registry. These files are fetched by agents as well
          as read here, so the rendered page and the raw markdown are the same bytes.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-site-dim mb-3 text-[11px] uppercase tracking-wider">Guides</h2>
        <List names={guides} />
      </section>

      <section>
        <h2 className="text-site-dim mb-3 text-[11px] uppercase tracking-wider">Migration notes</h2>
        <List names={migrations} />
      </section>
    </div>
  );
}

export function Doc() {
  const params = useParams();
  const name = params["*"] ?? "";
  const { data, error, loading } = useMarkdown(docUrl(name));

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/docs" className="text-site-muted hover:text-site-fg text-sm">
        ← All documentation
      </Link>

      {loading ? <p className="text-site-dim mt-6 text-sm">Loading…</p> : null}
      {error ? (
        <p className="mt-6 text-sm text-amber-400">
          Could not load <code className="font-site-mono">{name}</code>: {error}
        </p>
      ) : null}

      {data ? (
        <>
          <p className="font-site-mono text-site-dim mt-4 text-xs">
            {name} ·{" "}
            <a href={docUrl(name)} className="text-site-accent">
              raw
            </a>
          </p>
          <div className="mt-6">
            <Markdown>{data.body}</Markdown>
          </div>
        </>
      ) : null}
    </div>
  );
}
