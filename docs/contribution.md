# Contribution guide

## Add a core UI component

1. Confirm it is not already in the catalogue
2. Confirm it is required by a real pattern or recurring need
3. Create `src/components/ui/<name>.tsx` with semantic CVA variants
4. Export from `src/components/ui/index.ts`
5. Add Storybook stories and focused tests
6. Register the item in `scripts/registry-manifest.ts`
7. Run validation suite

## Add a domain component

1. Place it in `src/components/game/` or `src/components/display/`
2. Use domain language in the API
3. Keep networking and scoring out of the component
4. Document context support in the catalogue

## Add a pattern

1. Compose approved components
2. Accept typed state + callbacks only
3. Document participant / facilitator / shared-display variants where applicable
4. Declare registry dependencies so installs pull required pieces

## Add a theme

A valid CSS file alone does not register a theme — the slug is enforced by a
hardcoded union in the registry source. Adding a theme is additive, so it ships
as a new minor release (never re-cut a prior lock, and never use
`update-registry` for a new item).

1. Add `src/themes/<name>.css` implementing every token in `theme-contract.ts`,
   scoped under `[data-theme="<name>"]`, plus any theme-scoped treatment rules.
2. Add `<name>` to `SUPPORTED_THEMES` in `src/themes/theme-contract.ts`
   (`GameScienceProvider` asserts against this list and throws on an unknown slug).
3. Add `@import "./<name>.css";` to `src/themes/index.css` — the single entry
   that Storybook and consumers import; without it the theme never loads.
4. Add a `{ value: "<name>", title: "<Name>" }` entry to the `theme` toolbar
   `globalTypes` in `.storybook/preview.tsx`.
5. Register in `scripts/registry-manifest.ts` (source of truth — the generated
   JSON under `registry/**`, `public/registry/**`, and `consumer/**` is produced
   by `npm run registry:build`, never hand-edited):
   - Widen the catalogue union type `themes: Array<"gamescience" | "citadel">`.
   - Add a `registryItems` entry: `type: "registry:theme"`, `category: "theme"`,
     `registryDependencies: ["base"]`, one `registry:file` pointing at the CSS,
     and a `catalogue` block with `themes: ["<name>"]`.
   - Add `<name>` to the `themes` array of every theme-agnostic item
     (components, patterns, templates).
6. Update remaining hardcoded theme lists: the `ThemeName` unions and theme
   loops in `scripts/smoke-*.ts`, the `themes` array in
   `scripts/write-site-pages.ts`, and the theme loop in
   `src/test/compose-markdown.test.ts`.
7. Regenerate with `npm run registry:build`.
8. Run `npm run theme:check` (iterates `SUPPORTED_THEMES`, so the new theme is
   validated once registered).
9. Publish via the `release-registry` workflow (minor bump): version bump,
   migration note, new `releases/<version>.lock.json` + snapshot, push.

## Pull requests

- Keep changes focused
- Include Storybook coverage for user-visible UI
- Do not add legacy toast implementations
- Do not introduce theme-named component forks
- Do not commit secrets, `.env` files, private client assets, or confidential game content
- After registry/source changes that affect a **released** version, bump `GAMESCIENCE_UI_VERSION` rather than rewriting a locked `releases/{version}.lock.json`
- Run `npm run validate` (includes Pages build/validate) before merge when touching registry distribution

## Public repository hygiene

This repository is public. Never commit:

- credentials or tokens
- private client materials
- KPMG-specific shared APIs
- internal commercial proposals or pricing
