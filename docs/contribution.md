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

1. Add `src/themes/<name>.css` implementing every token in `theme-contract.ts`
2. Add the theme to `SUPPORTED_THEMES`
3. Add Storybook toolbar entry
4. Add registry theme item
5. Run `npm run theme:check`

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
