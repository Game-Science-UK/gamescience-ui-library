## Overwrite policy

1. Inspect differences first: `npx shadcn@latest add <item> --diff`
2. `-y` does **not** imply overwrite
3. Use `--overwrite` only for reviewed upstream-managed files
4. Dependency files may also be overwritten when resolving registry dependencies
5. Never overwrite application-owned files without an explicit plan
6. Create a commit or rollback point before installation
7. Report every overwritten file in the final report
