## Final report

Report:

1. Project stack detected
2. Theme and contexts selected (targets, not roles)
3. Registry version installed (**{{VERSION}}**)
4. Registry items installed
5. Existing components mapped
6. Files overwritten
7. Application-owned files preserved
8. Local forks removed
9. Game-specific visuals retained
10. API gaps / upstream defects discovered
11. Validation results
12. Migration record location (`src/docs/gamescience-ui-migration.md`)
13. Context record location (`src/docs/gamescience-ui-contexts.md`)
14. Remaining work and recommended next slice

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
