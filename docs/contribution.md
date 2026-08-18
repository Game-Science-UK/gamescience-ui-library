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

Registration is scaffolded — do not edit the registration sites by hand. Adding
a theme is additive, so it ships as a new minor release (never re-cut a prior
lock, and never use `update-registry` for a new item).

1. Scaffold every registration site:

   ```bash
   npm run theme:new -- <name> --title "<Name>" [--registers "default,alternate"]
   ```

   This writes `src/themes/<name>.css` with all required tokens stubbed, adds
   the `@import` to `src/themes/index.css`, extends `SUPPORTED_THEMES`, adds the
   Storybook toolbar entry, and adds the `registry:theme` item to
   `scripts/registry-manifest.ts`. Theme-agnostic registry items need no edits —
   they resolve their theme list from `SUPPORTED_THEMES` at build time.

2. Convert source hex values to OKLCH token channels:

   ```bash
   npm run theme:oklch -- --token --background '#02050A'
   ```

3. Author the token values and any theme-scoped `gs-*` treatment rules.

4. Run `npm run theme:check` — fails on tokens that are missing **or declared
   with no value**, so a scaffolded theme fails until authored.

5. Regenerate with `npm run registry:build`.

6. Publish via the `release-registry` workflow (minor bump): version bump,
   migration note, new `releases/<version>.lock.json` + snapshot, push.

See [adding-a-theme.md](./adding-a-theme.md) for the full procedure, including
the token/treatment conflict trap and removal.

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
