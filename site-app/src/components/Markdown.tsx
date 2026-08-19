import { useMemo } from "react";
import { marked } from "marked";

/**
 * Renders published markdown.
 *
 * The source is this repository's own docs and skills, copied verbatim by
 * build-pages, so it is trusted content rather than user input. Prose styling is
 * applied through a scoped class rather than Tailwind Typography to avoid adding
 * a plugin for one surface.
 */
export function Markdown({ children }: { children: string }) {
  const html = useMemo(
    () => marked.parse(children, { async: false, gfm: true, breaks: false }) as string,
    [children],
  );

  return (
    <div
      className="site-prose max-w-none"
      // Trusted content: this repository's own published markdown.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
