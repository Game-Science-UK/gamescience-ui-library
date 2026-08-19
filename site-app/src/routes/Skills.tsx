import { Link, useParams } from "react-router-dom";

import { Markdown } from "@site/components/Markdown";
import { useMarkdown, useSkillIndex, skillUrl, type SkillSummary } from "@site/lib/content";

const DISTRIBUTION_LABEL: Record<string, string> = {
  "lovable-workspace": "Lovable workspace",
  "repo-maintainer": "Repo maintainer",
};

const DISTRIBUTION_NOTE: Record<string, string> = {
  "lovable-workspace":
    "Installed as a workspace skill in Lovable. A developer runs it by name in the project they are working on.",
  "repo-maintainer":
    "Runs in this repository, in Claude Code or Cursor. Not distributed to game projects.",
};

function Group({ title, note, skills }: { title: string; note: string; skills: SkillSummary[] }) {
  if (skills.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="text-site-muted mt-1 max-w-2xl text-sm">{note}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {skills.map((skill) => (
          <Link
            key={skill.slug}
            to={`/skills/${skill.slug}`}
            className="border-site-border bg-site-panel hover:border-site-border-strong rounded-lg border p-4 transition-colors"
          >
            <p className="font-site-mono text-site-fg text-[13px]">{skill.slug}</p>
            <p className="text-site-muted mt-2 line-clamp-3 text-[13px] leading-relaxed">
              {skill.description}
            </p>
            <p className="text-site-dim mt-3 text-[11px]">
              updated {skill.skillUpdated} · library {skill.libraryVersion}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  const { data, error, loading } = useSkillIndex();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Agent skills</h1>
        <p className="text-site-muted mt-2 max-w-2xl">
          Each skill is a procedure an agent follows — adopting the registry, migrating a project,
          extracting a theme, cutting a release. The full source is published here, so what you read
          is what the agent runs.
        </p>
      </header>

      {loading ? <p className="text-site-dim text-sm">Loading skills…</p> : null}
      {error ? <p className="text-sm text-amber-400">Could not load skills: {error}</p> : null}

      {data ? (
        <>
          <Group
            title="Workspace skills"
            note={DISTRIBUTION_NOTE["lovable-workspace"] ?? ""}
            skills={data.filter((skill) => skill.distribution === "lovable-workspace")}
          />
          <Group
            title="Maintainer skills"
            note={DISTRIBUTION_NOTE["repo-maintainer"] ?? ""}
            skills={data.filter((skill) => skill.distribution === "repo-maintainer")}
          />
        </>
      ) : null}
    </div>
  );
}

export function Skill() {
  const { slug = "" } = useParams();
  const { data, error, loading } = useMarkdown(skillUrl(slug));

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/skills" className="text-site-muted hover:text-site-fg text-sm">
        ← All skills
      </Link>

      {loading ? <p className="text-site-dim mt-6 text-sm">Loading…</p> : null}
      {error ? (
        <p className="mt-6 text-sm text-amber-400">
          Could not load <code className="font-site-mono">{slug}</code>: {error}
        </p>
      ) : null}

      {data ? (
        <>
          <header className="border-site-border mt-4 border-b pb-6">
            <p className="font-site-mono text-site-fg text-sm">{slug}</p>
            <p className="text-site-muted mt-3 text-sm leading-relaxed">
              {data.frontmatter.description}
            </p>
            <div className="text-site-dim mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px]">
              <span>{DISTRIBUTION_LABEL[data.frontmatter.distribution ?? ""] ?? "—"}</span>
              <span>updated {data.frontmatter.skillUpdated}</span>
              <span>library {data.frontmatter.libraryVersion}</span>
              <a href={skillUrl(slug)} className="text-site-accent">
                raw markdown
              </a>
            </div>
          </header>

          <div className="mt-8">
            <Markdown>{data.body}</Markdown>
          </div>
        </>
      ) : null}
    </div>
  );
}
