import { useState } from "react";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="border-site-border text-site-muted hover:border-site-border-strong hover:text-site-fg rounded border px-2 py-1 text-xs transition-colors"
    >
      {copied ? "Copied" : label}
    </button>
  );
}

export function CodeBlock({
  code,
  filename,
  maxHeight = 520,
}: {
  code: string;
  filename?: string;
  maxHeight?: number;
}) {
  return (
    <div className="border-site-border bg-site-panel overflow-hidden rounded-lg border">
      <div className="border-site-border flex items-center justify-between border-b px-4 py-2">
        <span className="font-site-mono text-site-muted text-xs">{filename ?? "source"}</span>
        <CopyButton value={code} />
      </div>
      <pre
        className="bg-site-bg font-site-mono text-site-fg overflow-auto px-4 py-3 text-[12.5px] leading-relaxed"
        style={{ maxHeight }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** A single shell command with its own copy affordance. */
export function CommandBlock({ command }: { command: string }) {
  return (
    <div className="border-site-border bg-site-bg flex items-center justify-between gap-4 rounded-lg border px-4 py-3">
      <code className="font-site-mono text-site-fg overflow-auto text-[13px]">{command}</code>
      <CopyButton value={command} />
    </div>
  );
}
