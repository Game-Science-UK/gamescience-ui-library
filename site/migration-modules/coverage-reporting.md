## Coverage reporting

Migration reports must distinguish **four** different concepts. Never collapse
them into a single “100% coverage” claim.

### A. Migrated-surface coverage

Which routes or components have been migrated in this project.

Example:

| Surface                     | Status       |
| --------------------------- | ------------ |
| Participant join            | migrated     |
| Facilitator host lobby      | migrated     |
| Shared-display waiting room | migrated     |
| Participant non-host lobby  | not migrated |

### B. Registry coverage within migrated surfaces

Whether the primitives, components, patterns and shells **used by those specific
surfaces** are registry-managed.

Prefer wording such as:

> All primitives used by the migrated surfaces are registry-managed.

### C. Whole-application registry coverage

Whether the **entire** application has been audited and migrated. This is a
separate claim and requires a full inventory of imports and local UI.

### D. Remaining local inventory

Local shadcn files, forks, wrappers and application-owned components still in
the repository — including files unused by migrated surfaces.

### Forbidden wording

Do **not** write:

- `Primitives: 100% registry-owned`
- `Full application migrated`
- `Complete registry coverage`

unless the full application has been inspected and every imported primitive has
been verified.

When only entry surfaces (join / lobby / shared-display lobby) were migrated,
say so explicitly and keep whole-application coverage marked incomplete.
