# Public Pages policy

Only approved consumer documentation and site assets are published to GitHub Pages.

## Allowed

- Allowlisted Markdown in `PUBLIC_PAGES_DOCS` (includes `context-model.md`)
- Tailwind 4 bridge CSS
- Compiled `migration-config.json` and inspection modules under `/docs/migration/`
- Onboarding site pages under `/`, `/catalogue/`, `/start/`, `/upgrade/`, `/migrate/`
- Registry JSON under `/r/` and immutable `/versions/{version}/`

## Not allowed

- Internal plans, private architecture notes, client material
- Contribution-only docs not on the allowlist
- Fixtures, temporary reports, scratch files
- Remote font CSS imports inside distributed CSS

## Validation

`pages:validate` (full mode) requires public docs, site pages, normalized
catalogue data, migration config integrity, and first-party link resolution.
