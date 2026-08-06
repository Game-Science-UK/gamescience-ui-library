## Final report

Report:

1. Project stack detected
2. Theme and contexts selected (targets, not roles)
3. Registry version installed (**{{VERSION}}**)
4. Registry items installed (must match `gamescience-ui-state.json`)
5. Obligation ledger summary (migrated / retained-approved / upstream-gap /
   out-of-scope-approved / open)
6. Existing components mapped
7. Files overwritten
8. Application-owned files preserved
9. Local forks removed
10. Game-specific visuals retained **and** any application-owned visuals removed
11. API gaps / upstream defects discovered (structured gap proposals)
12. Payload integrity and token-contract results
13. Validation results across dimensions A–E
14. Migration record location (`src/docs/gamescience-ui-migration.md`)
15. Context record location (`src/docs/gamescience-ui-contexts.md`)
16. Project state record (`src/docs/gamescience-ui-state.json`)
17. Coverage summary using dimensions A–E and obligation counts
18. Mixed-context route findings
19. Reference-vs-consumer visual comparison results
20. Remaining work and recommended next slice

Result must be exactly one of:

- First slice migrated successfully
- Migration progressed — ledger updated with remaining obligations
- Safe incremental stop — awaiting confirmation
- Full alignment in progress
- Full alignment complete
- Full alignment incomplete
- Blocked by unresolved ownership, stack, token-contract or validation issues

**Full alignment complete** is allowed only when all in-scope obligations have
final dispositions, unclassified count is zero, migrated obligations pass A–E,
payload integrity and token contract pass, and an independent coverage audit
reconciles ledger, repository and runtime.

Never claim whole-application primitive replacement from evidence limited to a
few migrated surfaces. Build/test green alone is never sufficient.

### Context architecture recommendation

Every Migrate audit must finish with:

- Contexts currently present
- Contexts inferred but not declared
- Contexts absent and legitimately unnecessary
- Unclassified surfaces requiring clarification
- Surfaces that should remain application-owned
- Route-to-context mapping
- Recommended provider placement
- Recommended shell mapping
- Recommended pattern mapping
- Composition splits required
- Composition splits not justified
- Shared-display privacy findings
- Authorisation findings tracked separately
- First context vertical slice
- Context-related registry gaps
