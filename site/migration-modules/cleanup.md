## Cleanup

After successful migration of approved slices:

- remove replaced local primitive forks
- remove duplicate token definitions and unused local theme CSS
- remove legacy toast system
- quarantine unused default Lovable UI inventory when safe
- update `AGENTS.md` to reference installed GameScience guidance and version **{{VERSION}}**
- retain game-specific visuals and application-owned code
- record deviations

Do **not** delete files solely because they are not from the registry.

## Migration record

Create or update `src/docs/gamescience-ui-migration.md` with:

- Registry version / URL / theme / contexts / mode / date
- Migrated registry items
- Replaced local components
- Retained application components and game-specific visuals
- Local deviations and upstream issues
- Remaining migration candidates and next recommended slice
