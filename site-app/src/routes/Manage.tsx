import { useState } from "react";
import { Link } from "react-router-dom";

import { CommandBlock } from "@site/components/CodeBlock";
import { WorkflowCanvas } from "@site/components/WorkflowCanvas";
import { VERSION } from "@site/lib/registry";

/* ─────────────────────────────────────────────────────────── building blocks */

function Section({
  id,
  title,
  lede,
  children,
}: {
  id?: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-site-border mt-14 border-t pt-10 first:mt-0 first:border-0 first:pt-0"
    >
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {lede ? <p className="text-site-muted mt-2 max-w-2xl leading-relaxed">{lede}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children?: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="border-site-border font-site-mono text-site-muted mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px]">
        {n}
      </span>
      <div className="min-w-0 flex-1 pb-1">
        <p className="text-site-fg text-[15px] font-medium">{title}</p>
        {children ? (
          <div className="text-site-muted mt-2 space-y-3 text-[14px] leading-relaxed">
            {children}
          </div>
        ) : null}
      </div>
    </li>
  );
}

/** A task the reader might have arrived wanting to do. */
function Task({
  id,
  title,
  when,
  where,
  children,
}: {
  id: string;
  title: string;
  when: string;
  where: "lovable" | "library" | "both";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const WHERE_LABEL = {
    lovable: "In Lovable",
    library: "In the library repo",
    both: "Lovable, then the library repo",
  } as const;

  return (
    <div id={id} className="border-site-border bg-site-panel scroll-mt-24 rounded-lg border">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-5 py-4 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="text-site-fg block font-medium">{title}</span>
          <span className="text-site-muted mt-1 block text-[13px]">{when}</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="border-site-border text-site-dim hidden rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide sm:inline">
            {WHERE_LABEL[where]}
          </span>
          <span className="text-site-dim text-lg leading-none">{open ? "−" : "+"}</span>
        </span>
      </button>
      {open ? (
        <div className="border-site-border border-t px-5 py-5">
          <ol className="space-y-5">{children}</ol>
        </div>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── page */

export function Manage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-10">
        <p className="font-site-mono text-site-dim text-xs uppercase tracking-widest">
          For whoever owns this next
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Managing the registry
        </h1>
        <p className="text-site-muted mt-3 max-w-2xl text-lg leading-relaxed">
          You do not need to be a developer to run this. Most of the work is typing a short command
          to an agent and checking what it did. This page covers everything you will actually be
          asked to do.
        </p>
      </header>

      <Section
        title="The two places you work"
        lede="Almost every confusion comes from mixing these up. They are separate, and they talk to each other in one direction."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-site-border bg-site-panel rounded-lg border p-5">
            <p className="text-site-fg font-medium">Lovable — where games are built</p>
            <p className="text-site-muted mt-2 text-[14px] leading-relaxed">
              Each game is its own Lovable project. This is where you and the build agent make
              screens. Games <em>consume</em> the registry.
            </p>
          </div>
          <div className="border-site-border bg-site-panel rounded-lg border p-5">
            <p className="text-site-fg font-medium">The library repo — where the registry lives</p>
            <p className="text-site-muted mt-2 text-[14px] leading-relaxed">
              One repository, opened in Claude Code or Cursor. This is where approved components and
              themes are kept and published. Games never edit it directly.
            </p>
          </div>
        </div>
        <p className="text-site-muted mt-4 text-[14px] leading-relaxed">
          Work flows <strong className="text-site-fg">out</strong> of the library into games. When
          something good is built in a game, you carry it back by hand — that is the “add a
          component” task below, and it is deliberate rather than automatic.
        </p>
      </Section>

      <Section
        title="What do you want to do?"
        lede="Open the one that matches. Each is a short sequence you can follow start to finish."
      >
        <div className="space-y-3">
          <Task
            id="new-game"
            title="Start a new game"
            when="A fresh Lovable project that should use the registry from day one."
            where="lovable"
          >
            <Step n={1} title="Ask the agent to set the project up">
              <p>In the Lovable chat, type this, naming the theme the game should use:</p>
              <CommandBlock command="/adopt-gamescience-ui using Citadel" />
              <p>
                The agent works out the rest — which version to pin, what to install, where to put
                the provider.
              </p>
            </Step>
            <Step n={2} title="Choose the contexts the game needs">
              <p>
                It will ask which surfaces exist: <strong>participant</strong> (the player's phone),{" "}
                <strong>facilitator</strong> (the console the host runs the room from), and{" "}
                <strong>shared display</strong> (the big screen). Pick only the ones the game has.
              </p>
            </Step>
            <Step n={3} title="Build as normal">
              <p>
                Ask for screens the way you normally would. Every so often, check nothing has
                drifted off the registry:
              </p>
              <CommandBlock command="/audit-gamescience-ui" />
              <p>It only reports. It changes nothing.</p>
            </Step>
          </Task>

          <Task
            id="existing-game"
            title="Move an existing game onto the registry"
            when="A game that already has its own screens and components."
            where="lovable"
          >
            <Step n={1} title="See what you are dealing with first">
              <p>Optional but recommended. This reads the project and reports, changing nothing:</p>
              <CommandBlock command="/audit-gamescience-ui" />
            </Step>
            <Step n={2} title="Start the migration">
              <CommandBlock command="/migrate-gamescience-ui" />
              <p>
                You will be asked to choose an approach. <strong>Safe incremental</strong> makes
                changes in small waves and stops more often. <strong>Full visual alignment</strong>{" "}
                moves faster with fewer stops. If in doubt, take safe incremental.
              </p>
            </Step>
            <Step n={3} title="Expect it to run in stages">
              <p>
                Lovable's agent is cautious and will stage the work across several runs rather than
                one long session. That is normal — keep going.
              </p>
            </Step>
            <Step n={4} title="Check it when the agent says it is done">
              <CommandBlock command="/validate-gamescience-ui" />
            </Step>
            <Step n={5} title="Run it again if anything is outstanding">
              <p>
                If validation finds gaps, or there are components the registry does not have yet,
                run the migration again. There is no penalty for repeating it — do so as many times
                as it takes.
              </p>
            </Step>
          </Task>

          <Task
            id="looks-wrong"
            title="A component does not look right in Lovable"
            when="Something is off — wrong colour, wrong shape, or it does not match the rest."
            where="lovable"
          >
            <Step n={1} title="Check it is actually a registry component">
              <CommandBlock command="/audit-gamescience-ui" />
              <p>
                Often the answer is that the agent built something custom instead of using the
                registry version. The audit will say so.
              </p>
            </Step>
            <Step n={2} title="If it is a registry component, check the setup">
              <CommandBlock command="/validate-gamescience-ui" />
              <p>
                This catches the usual causes: the wrong theme selected, two themes fighting, or the
                CSS not wired up.
              </p>
            </Step>
            <Step n={3} title="If the registry version itself is wrong, fix it upstream">
              <p>
                Do not patch it inside the game — the next project would hit the same problem. Use{" "}
                <a href="#add-component" className="text-site-accent">
                  add a component to the registry
                </a>{" "}
                to carry the corrected version back, then release and sync.
              </p>
            </Step>
          </Task>

          <Task
            id="add-component"
            title="Add a component to the registry"
            when="Something good was built in a game and other games should have it too."
            where="both"
          >
            <Step n={1} title="Decide whether it belongs in the registry at all">
              <p>
                Ask: would another game use this? If it is specific to one game's mechanic or
                content, leave it in that project. Only genuinely reusable things go in.
              </p>
            </Step>
            <Step n={2} title="Select it in Lovable">
              <p>
                Use the <strong>Select Elements</strong> button, click the finished component, and
                make sure the selection sits at the top left of the input field. Then type:
              </p>
              <CommandBlock command="/extract-selected-component" />
            </Step>
            <Step n={3} title="Copy what the agent gives you">
              <p>
                It replies with a full structure and style definition for that component in the
                theme currently applied. Copy the whole thing.
              </p>
            </Step>
            <Step n={4} title="Hand it to the library">
              <p>
                Open the library repo in Claude Code or Cursor, paste it in, and send. The agent
                builds it as a proper registry component.
              </p>
            </Step>
            <Step n={5} title="Look at it before publishing">
              <CommandBlock command="npm run storybook" />
              <p>Check it in every theme, not just the one it came from.</p>
            </Step>
            <Step n={6} title="Publish">
              <CommandBlock command="/release-registry" />
            </Step>
            <Step n={7} title="Pull it into the game that needs it">
              <p>
                Publishing on its own changes nothing in any project. Back in Lovable, in the game
                that should now use it:
              </p>
              <CommandBlock command="/sync-gamescience-ui" />
            </Step>
          </Task>

          <Task
            id="new-theme"
            title="Add a new theme"
            when="A new game has its own visual identity."
            where="both"
          >
            <Step n={1} title="Extract the look from the game">
              <p>In the Lovable project that has the design, type:</p>
              <CommandBlock command="/extract-theme" />
            </Step>
            <Step n={2} title="Hand it to the library">
              <p>
                Copy the reply, open the library repo in Claude Code or Cursor, paste and send. The
                agent builds the theme.
              </p>
            </Step>
            <Step n={3} title="Check it in Storybook">
              <CommandBlock command="npm run storybook" />
              <p>
                Switch through every component under the new theme. A theme that looks right on two
                screens can still be wrong on the twentieth.
              </p>
            </Step>
            <Step n={4} title="Publish, then pull it into the game">
              <CommandBlock command="/release-registry" />
              <p>Then back in Lovable:</p>
              <CommandBlock command="/sync-gamescience-ui" />
            </Step>
          </Task>

          <Task
            id="release"
            title="Publish a new version"
            when="You have changed something in the library and games need it."
            where="library"
          >
            <Step n={1} title="Run the release skill">
              <p>With the library repo open in Claude Code or Cursor:</p>
              <CommandBlock command="/release-registry" />
              <p>
                It works out the version number, writes the release notes, checks everything builds,
                and publishes.
              </p>
            </Step>
            <Step n={2} title="Nothing changes in any game yet">
              <p>
                This is the important part. Publishing does <strong>not</strong> alter a single
                running game. Each game stays on the version it pinned until you deliberately move
                it.
              </p>
            </Step>
          </Task>

          <Task
            id="sync"
            title="Update a game to a newer version"
            when="A game should pick up components or fixes published since it was built."
            where="lovable"
          >
            <Step n={1} title="Ask what would change, without changing it">
              <CommandBlock command="Check whether GameScience UI is current" />
              <p>
                The sync skill has a check-only mode. It reports what is newer and what would be
                affected, and touches nothing.
              </p>
            </Step>
            <Step n={2} title="Do the update when you are ready">
              <CommandBlock command="/sync-gamescience-ui" />
              <p>
                It moves the pin forward and updates the installed files, preserving changes the
                game owns.
              </p>
            </Step>
            <Step n={3} title="Confirm the game still holds together">
              <CommandBlock command="/validate-gamescience-ui" />
            </Step>
          </Task>
        </div>
      </Section>

      <Section
        title="The whole thing, on one canvas"
        lede="The same decisions as above, drawn as a map. Drag to pan, scroll to zoom."
      >
        <WorkflowCanvas />
      </Section>

      <Section
        title="Why pinned versions matter"
        lede="This is the one concept worth genuinely understanding. Everything else follows from it."
      >
        <div className="space-y-4">
          <p className="text-site-muted text-[15px] leading-relaxed">
            Each game records exactly which version of the registry it uses — right now that would
            be <code className="font-site-mono text-site-fg text-[13px]">{VERSION}</code>. That
            recorded number is the <strong className="text-site-fg">pin</strong>.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-site-border bg-site-panel rounded-lg border p-5">
              <p className="text-site-fg font-medium">Published versions never change</p>
              <p className="text-site-muted mt-2 text-[14px] leading-relaxed">
                Once a version is out, it is frozen. A game built against it will still build in a
                year, whatever has happened to the registry since.
              </p>
            </div>
            <div className="border-site-border bg-site-panel rounded-lg border p-5">
              <p className="text-site-fg font-medium">Nothing updates on its own</p>
              <p className="text-site-muted mt-2 text-[14px] leading-relaxed">
                Publishing cannot break a running game. A game only moves when someone runs the sync
                skill on it.
              </p>
            </div>
          </div>

          <div className="border-site-border bg-site-panel rounded-lg border p-5">
            <p className="text-site-fg font-medium">What this buys you the week before an event</p>
            <p className="text-site-muted mt-2 text-[14px] leading-relaxed">
              You can publish an improvement for the game being built next week without touching the
              three games that are already finished and tested. They stay exactly as they were
              signed off. That is the whole reason the registry works this way.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Words you will see">
        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            ["Registry", "The published set of approved components and themes. This site."],
            ["Item", "One thing in the registry — a button, a pattern, a theme."],
            ["Pin", "The version number a game has recorded and installs from."],
            ["Theme", "A game's visual identity. One per game, chosen once at the root."],
            [
              "Context",
              "Which surface a screen is: participant, facilitator, or shared display. Not a permission.",
            ],
            [
              "Pattern",
              "A whole interaction, like joining or voting. Prefer these over building up from parts.",
            ],
            [
              "Skill",
              "A procedure an agent follows when you type its name, like /adopt-gamescience-ui.",
            ],
            [
              "Storybook",
              "A separate viewer showing every component in every state. Linked in the top nav.",
            ],
          ].map(([term, definition]) => (
            <div key={term} className="border-site-border bg-site-panel rounded-lg border p-4">
              <dt className="text-site-fg text-[14px] font-medium">{term}</dt>
              <dd className="text-site-muted mt-1 text-[13px] leading-relaxed">{definition}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        title="If something goes wrong"
        lede="Three things worth knowing before you need them."
      >
        <ul className="space-y-3">
          {[
            [
              "A game broke after a sync",
              "Put the pin back to the previous version and sync again. Old versions are never removed, so going back always works.",
            ],
            [
              "The agent did something you did not expect",
              "Every skill reports what it changed. Ask it to explain, and run /validate-gamescience-ui to see the current state.",
            ],
            [
              "You are not sure whether a change belongs in the game or the registry",
              "Default to the game. Moving something into the registry later is easy; taking it back out once other games depend on it is not.",
            ],
          ].map(([title, body]) => (
            <li key={title} className="border-site-border bg-site-panel rounded-lg border p-4">
              <p className="text-site-fg text-[14px] font-medium">{title}</p>
              <p className="text-site-muted mt-1 text-[13px] leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
        <p className="text-site-muted mt-6 text-[14px]">
          Every skill's full instructions are readable on the{" "}
          <Link to="/skills" className="text-site-accent">
            skills page
          </Link>{" "}
          — what you read there is exactly what the agent runs.
        </p>
      </Section>
    </div>
  );
}
