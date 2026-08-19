import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CodeBlock, CommandBlock } from "@site/components/CodeBlock";
import { PreviewFrame } from "@site/components/PreviewFrame";
import { catalogue, entry, installCommand, loadPayload, type Payload } from "@site/lib/registry";
import { preview } from "@site/previews";

type Tab = "preview" | "code" | "usage";

function Pills({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-site-dim text-[11px] uppercase tracking-wider">{label}</span>
      {values.map((value) => (
        <span
          key={value}
          className="border-site-border font-site-mono text-site-muted rounded border px-2 py-0.5 text-[11px]"
        >
          {value}
        </span>
      ))}
    </div>
  );
}

function Guidance({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "do" | "avoid";
}) {
  if (items.length === 0) return null;
  return (
    <div className="border-site-border bg-site-panel rounded-lg border p-4">
      <p className="text-site-dim mb-2 text-[11px] uppercase tracking-wider">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-site-muted flex gap-2 text-sm">
            <span className={tone === "do" ? "text-emerald-400" : "text-amber-400"}>
              {tone === "do" ? "✓" : "✕"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Item() {
  const { name = "" } = useParams();
  const [tab, setTab] = useState<Tab>("preview");
  const [fileIndex, setFileIndex] = useState(0);
  const meta = entry(name);
  const spec = preview(name);
  const [item, setItem] = useState<Payload | undefined>();

  useEffect(() => {
    let active = true;
    setItem(undefined);
    setFileIndex(0);
    void loadPayload(name).then((loaded) => {
      if (active) setItem(loaded);
    });
    return () => {
      active = false;
    };
  }, [name]);

  if (!meta) {
    return (
      <div className="py-16 text-center">
        <p className="text-site-muted">
          No registry item named <code className="font-site-mono">{name}</code>.
        </p>
        <Link to="/components" className="text-site-accent mt-4 inline-block text-sm">
          Back to components
        </Link>
      </div>
    );
  }

  const tabs: Array<{ id: Tab; label: string; enabled: boolean }> = [
    { id: "preview", label: "Preview", enabled: Boolean(spec) },
    { id: "code", label: "Code", enabled: Boolean(item?.files.length) },
    { id: "usage", label: "Usage", enabled: true },
  ];
  const active = tabs.find((entryTab) => entryTab.id === tab)?.enabled ? tab : "usage";
  const file = item?.files[fileIndex];

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="font-site-mono text-site-dim mb-1 text-xs">@gamescience/{name}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="text-site-muted mt-2">{meta.purpose}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Pills label="Contexts" values={meta.contexts} />
          <Pills label="Themes" values={meta.themes} />
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-site-fg mb-2 text-sm font-medium">Install</h2>
        <CommandBlock command={installCommand(name)} />
        {meta.uses.length > 0 ? (
          <p className="text-site-dim mt-2 text-xs">Also installs {meta.uses.join(", ")}.</p>
        ) : null}
      </section>

      <div className="border-site-border mb-4 flex gap-1 border-b">
        {tabs
          .filter((entryTab) => entryTab.enabled)
          .map((entryTab) => (
            <button
              key={entryTab.id}
              type="button"
              onClick={() => setTab(entryTab.id)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm transition-colors ${
                active === entryTab.id
                  ? "border-site-accent text-site-fg"
                  : "text-site-muted hover:text-site-fg border-transparent"
              }`}
            >
              {entryTab.label}
            </button>
          ))}
      </div>

      {active === "preview" && spec ? (
        // Keyed by item: the frame seeds theme, context and register from the
        // item on mount, and React would otherwise reuse the instance across
        // routes and keep the previous item's selection.
        <PreviewFrame key={name} item={name} spec={spec} />
      ) : null}

      {active === "code" && item ? (
        <div>
          {item.files.length > 1 ? (
            <div className="mb-3 flex flex-wrap gap-1">
              {item.files.map((candidate, index) => (
                <button
                  key={candidate.target}
                  type="button"
                  onClick={() => setFileIndex(index)}
                  className={`font-site-mono rounded px-2 py-1 text-[11px] transition-colors ${
                    index === fileIndex
                      ? "bg-site-raised text-site-fg"
                      : "text-site-muted hover:text-site-fg"
                  }`}
                >
                  {candidate.target.split("/").pop()}
                </button>
              ))}
            </div>
          ) : null}
          {file ? <CodeBlock code={file.content} filename={file.target} /> : null}
        </div>
      ) : null}

      {active === "usage" ? (
        <div className="space-y-4">
          {!spec ? (
            <p className="border-site-border bg-site-panel text-site-muted rounded-lg border p-4 text-sm">
              No live preview for this item yet. See{" "}
              <a href="/gamescience-ui-library/storybook/" className="text-site-accent">
                Storybook
              </a>{" "}
              for rendered states.
            </p>
          ) : null}
          <Guidance title="Use when" items={meta.useWhen} tone="do" />
          <Guidance title="Avoid" items={meta.avoid} tone="avoid" />
          {meta.props.length > 0 ? (
            <div className="border-site-border bg-site-panel rounded-lg border p-4">
              <p className="text-site-dim mb-2 text-[11px] uppercase tracking-wider">Props</p>
              <div className="flex flex-wrap gap-2">
                {meta.props.map((prop) => (
                  <code
                    key={prop}
                    className="bg-site-bg font-site-mono text-site-fg rounded px-2 py-1 text-[12px]"
                  >
                    {prop}
                  </code>
                ))}
              </div>
            </div>
          ) : null}
          {meta.related.length > 0 ? (
            <div className="border-site-border bg-site-panel rounded-lg border p-4">
              <p className="text-site-dim mb-2 text-[11px] uppercase tracking-wider">Related</p>
              <div className="flex flex-wrap gap-2">
                {meta.related
                  .map((related) => related.replace("@gamescience/", ""))
                  .filter((related) => catalogue[related])
                  .map((related) => (
                    <Link
                      key={related}
                      to={`/components/${related}`}
                      className="border-site-border text-site-muted hover:text-site-fg rounded border px-2 py-1 text-xs transition-colors"
                    >
                      {catalogue[related]?.title ?? related}
                    </Link>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
