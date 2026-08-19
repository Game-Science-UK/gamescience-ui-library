import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { CATEGORY_LABEL, byCategory, catalogue } from "@site/lib/registry";
import { previews } from "@site/previews";

export function Components() {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => {
    const term = query.trim().toLowerCase();
    return byCategory()
      .map((group) => ({
        ...group,
        items: group.items.filter((name) => {
          if (!term) return true;
          const meta = catalogue[name];
          return (
            name.includes(term) ||
            meta?.title.toLowerCase().includes(term) ||
            meta?.purpose.toLowerCase().includes(term)
          );
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="text-site-muted mt-2 max-w-2xl">
          Every item in the registry. Install what a surface needs — prefer a complete pattern over
          assembling primitives.
        </p>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components, patterns and shells…"
          className="border-site-border bg-site-panel text-site-fg placeholder:text-site-dim focus:border-site-border-strong mt-5 w-full max-w-md rounded-lg border px-3 py-2 text-sm outline-none"
        />
      </header>

      {groups.map((group) => (
        <section key={group.category} className="mb-10">
          <h2 className="text-site-dim mb-3 text-[11px] uppercase tracking-wider">
            {CATEGORY_LABEL[group.category]}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((name) => {
              const meta = catalogue[name];
              return (
                <Link
                  key={name}
                  to={`/components/${name}`}
                  className="border-site-border bg-site-panel hover:border-site-border-strong group rounded-lg border p-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-site-fg font-medium">{meta?.title ?? name}</span>
                    {previews[name] ? (
                      <span className="bg-site-raised text-site-dim rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                        live
                      </span>
                    ) : null}
                  </div>
                  <p className="text-site-muted mt-1 line-clamp-2 text-[13px]">{meta?.purpose}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {groups.length === 0 ? <p className="text-site-muted">No items match “{query}”.</p> : null}
    </div>
  );
}
