# Registry homepage

The GitHub Pages site at `/gamescience-ui-library/` is an onboarding surface for
GameScience UI consumers. It is generated during the **latest** Pages promotion
from sources under `site/` and must not modify immutable version trees.

## Generated routes

- `/` — homepage and mental model
- `/catalogue/` — browsable registry catalogue
- `/start/` — clean-install brief composer
- `/upgrade/` — immutable version upgrade brief composer
- `/migrate/` — migration brief composer (deterministic Markdown assembly)

## Source of truth

- Version and item count: `site-data.json` (baked from `agent-catalogue.json`)
- Composer modules: `site/migration-modules/` compiled to `docs/migration-config.json`
- Individual modules remain under `/docs/migration/` for inspection only

## Constraints

- No AI API calls on Pages
- Start and Migrate target current stable only
- Upgrade may select any published immutable version
- Public docs remain allowlisted in `scripts/pages-config.ts`
