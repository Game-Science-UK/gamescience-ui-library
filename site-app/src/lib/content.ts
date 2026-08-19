import { useEffect, useState } from "react";

import { PAGES_SITE_PATH } from "../../../scripts/pages-config.ts";

/**
 * Skills and docs are fetched from the published markdown rather than bundled.
 *
 * The bytes served at `/skills/*.md` and `/docs/*.md` are copied from the repo
 * by `build-pages`, so a page always shows the source for the deployed version —
 * and the bundle stays small even though `extract-theme` alone is ~50kB.
 */

export interface SkillSummary {
  slug: string;
  name: string;
  description: string;
  distribution: string;
  skillUpdated: string;
  libraryVersion: string;
}

function base(path: string): string {
  return `${PAGES_SITE_PATH}${path}`;
}

export const skillUrl = (slug: string) => base(`/skills/${slug}.md`);
export const docUrl = (name: string) => base(`/docs/${name}`);

type State<T> = { data?: T; error?: string; loading: boolean };

function useFetched<T>(url: string, parse: (raw: string) => T): State<T> {
  const [state, setState] = useState<State<T>>({ loading: true });

  useEffect(() => {
    let active = true;
    setState({ loading: true });

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((raw) => {
        if (active) setState({ data: parse(raw), loading: false });
      })
      .catch((error: unknown) => {
        if (active) setState({ error: String((error as Error).message), loading: false });
      });

    return () => {
      active = false;
    };
  }, [url]);

  return state;
}

export function useSkillIndex(): State<SkillSummary[]> {
  return useFetched(base("/skills/index.json"), (raw) => JSON.parse(raw) as SkillSummary[]);
}

export interface Document {
  /** Frontmatter stripped; skills carry YAML that should not render as text. */
  body: string;
  frontmatter: Record<string, string>;
}

export function useMarkdown(url: string): State<Document> {
  return useFetched(url, (raw) => {
    const match = /^---\n([\s\S]*?)\n---\n/.exec(raw);
    const frontmatter: Record<string, string> = {};

    if (match?.[1]) {
      const lines = match[1].split("\n");
      lines.forEach((line, index) => {
        const pair = /^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
        if (!pair?.[1]) return;

        const inline = (pair[2] ?? "").trim();
        // YAML folded scalars (`key: >-`) continue on the indented lines below.
        if (inline && inline !== ">-" && inline !== ">" && inline !== "|") {
          frontmatter[pair[1]] = inline;
          return;
        }

        const folded: string[] = [];
        for (const next of lines.slice(index + 1)) {
          if (!/^\s/.test(next)) break;
          folded.push(next.trim());
        }
        frontmatter[pair[1]] = folded.join(" ");
      });
    }

    return { body: match ? raw.slice(match[0].length) : raw, frontmatter };
  });
}
