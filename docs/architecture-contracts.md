# Architecture contracts

Automated checks that protect GameScience library constraints.

## Command

```bash
npm run architecture:check
```

Included in `npm run validate`.

## Enforced rules

| Rule                                        | What fails                                                                | Why                                          |
| ------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| `theme-prop`                                | Shared UI/game/display/pattern/template components declare a `theme` prop | Theme is root-only via `GameScienceProvider` |
| `theme-import`                              | Shared components import `themes/citadel` or `themes/gamescience`         | Prevents theme coupling in implementations   |
| `theme-branch`                              | Shared components branch on concrete theme identities                     | Visual differences belong in theme CSS       |
| `prohibited-name`                           | Names such as `CitadelButton`, `TechButton`, `GlassCard`                  | No theme-specific or legacy forks            |
| `client-name`                               | `KPMG` (or similar client names) in shared source                         | Keep shared APIs client-agnostic             |
| `versioned-or-placeholder-name`             | `ButtonV2`, `NewButton`, `FinalCard`                                      | Prefer stable semantic names                 |
| `filename-case`                             | PascalCase component filenames                                            | Filenames must be kebab-case                 |
| `raw-hex`                                   | Hex colours in `src/components`, `src/patterns`, `src/templates`          | Use semantic tokens                          |
| `legacy-toast-file` / `legacy-toast-import` | `toast.tsx`, `toaster.tsx`, `use-toast.ts` or imports thereof             | Sonner only                                  |
| `networking-import`                         | socket/supabase/firebase/axios-style imports in shared UI/patterns        | Keep transport out of the library            |
| `theme-asset-in-ui`                         | Core UI imports theme asset paths                                         | Theme assets belong in themes/templates      |

## Permitted exceptions

Legitimate theme references are allowed in:

- `src/themes/**`
- `src/foundations/**`
- `src/providers/gamescience-provider.tsx`
- Storybook decorators and stories
- Theme-focused tests
- Registry scripts and manifests
- Documentation

## Allowlist process

If a justified exception is required:

1. Confirm no composition-based alternative exists
2. Add an entry to `CONTENT_ALLOWLIST` or `FILENAME_ALLOWLIST` in `scripts/check-architecture.ts`
3. Include `file`, `rule`, and `reason`
4. Document the exception in the PR and this file

Do not broaden regexes to silence real violations.

## Self-tests

`architecture:check` runs fixture self-tests (valid and invalid samples) before scanning the library, then deletes those fixtures.
