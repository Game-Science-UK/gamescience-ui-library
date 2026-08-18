# Adding a theme

Canonical procedure for adding a theme to the registry. Follow this rather than
copying an existing theme's stylesheet.

## Scaffold

```bash
npm run theme:new -- <slug> --title "Display Name" --registers "default,alternate"
```

`--registers` is optional and only needed when the theme has more than one
visual register (`cinematic` / `restrained`). The first register
is the default and lives in the base block.

This performs every mechanical registration step:

| Step                                                    | File                           |
| ------------------------------------------------------- | ------------------------------ |
| Stylesheet with all required tokens stubbed and grouped | `src/themes/<slug>.css`        |
| Aggregate import                                        | `src/themes/index.css`         |
| `SUPPORTED_THEMES` entry                                | `src/themes/theme-contract.ts` |
| Storybook theme toolbar entry                           | `.storybook/preview.tsx`       |
| `theme-<slug>` registry item                            | `scripts/registry-manifest.ts` |

**Theme-agnostic registry items need no edits.** They omit `catalogue.themes`
and resolve it from `SUPPORTED_THEMES` at build time, so the new theme
propagates to all of them automatically.

## Author the values

Colour tokens are **bare OKLCH channels** (`L C H`, no `oklch()` wrapper),
consumed as `oklch(var(--token))`. Extraction briefs usually quote hex, so
convert first:

```bash
npm run theme:oklch -- '#02050A' '#B983FF'
```

```bash
npm run theme:oklch -- --token --background '#02050A' --primary '#B983FF'
```

`--token` mode emits paste-ready declarations with the source hex retained as a
comment, which keeps the brief traceable from the stylesheet.

## Style through the right layer

Work in this order and stop as soon as the design is expressed:

1. **Tokens.** Most of a theme should be token values alone. The `gamescience`
   theme styles only 5 `gs-*` hooks; everything else comes from tokens.
2. **Theme-scoped `gs-*` hooks.** Use these only where tokens cannot express the
   design — Citadel styles 45.
3. **Component changes.** Avoid. Component files are registry payloads, so
   touching one forces consumers to reinstall that item and stops the theme
   being purely additive. If a hook you need does not exist, raise it as a
   contract addition rather than editing components ad hoc.

Do not fork React components, add theme props, or add conditional theme
branches. `npm run architecture:check` enforces this.

### Watch for token/treatment conflicts

Component variants apply Tailwind utilities such as `bg-primary`. If the theme
declares `--primary` but the design does not use a solid primary fill, you must
override the treatment explicitly:

```css
/* Declaring --primary is not enough — the component still applies bg-primary. */
[data-theme="<slug>"] .gs-button[data-intent="primary"] {
  background: oklch(var(--surface));
  border-color: oklch(var(--border-strong));
}
```

Setting only `border-color` here leaves the component's `bg-primary` in force,
which is how a theme ends up with a solid fill its source design never had.
Check every intent, not just the ones the brief happened to describe.

## Verify

```bash
npm run theme:check
```

Confirms every required token is declared **and non-empty** — a scaffolded theme
fails until values are authored.

```bash
npm run validate
```

Full suite, including registry build/validate and the Tailwind 3/4 smoke
installs across every supported theme.

Then review in Storybook (`npm run storybook`) under the new theme across all
three contexts and both registers, comparing against the source application
rather than against another registry theme.

## Release

Cut a new immutable version with the `release-registry` skill. Published
versions keep the theme permanently by design — removing a theme affects
`latest` and future pins only, never an already-pinned project.

## Removing a theme

Reverse of the scaffold: delete `src/themes/<slug>.css`, its `@import`, its
`SUPPORTED_THEMES` entry, its Storybook toolbar entry, and its registry item.
Theme-agnostic items need no edits. Prior published versions remain unchanged.
