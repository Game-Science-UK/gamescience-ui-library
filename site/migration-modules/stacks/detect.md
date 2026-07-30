## Stack guidance — detect from project

Selected Tailwind integration: **Detect from project**.

Determine the consumer Tailwind major version **before** choosing an
integration path. Generated briefs must then follow **exactly one** branch:

- Tailwind 3 → `docs/tailwind-v3-integration.md`
- Tailwind 4 → `docs/tailwind-v4-integration.md`

### Detection checklist

1. Inspect `package.json` for `tailwindcss` major version
2. Inspect the application CSS entry for `@tailwind` directives vs
   `@import "tailwindcss"`
3. Inspect whether a `tailwind.config.*` file exists and is still authoritative
4. Inspect installed GameScience payload / foundation CSS once base is present —
   do not infer stack support solely from guide filenames
5. Detect router / framework separately (Lovable, Vite, React Router, TanStack,
   etc.)

Router / framework detection is separate:

> Tailwind version does not determine router integration.

### After detection

If Tailwind 3:

- retain `tailwind.config.*`
- merge semantic token mappings
- retain `@tailwind` directives
- do **not** install `tailwind-v4-bridge.css`

If Tailwind 4:

- import the approved bridge
- use CSS-first scanning
- do **not** introduce `tailwind.config.ts` merely for the registry

If evidence is insufficient, classify as **Uncertain — payload inspection
required**. Do not declare a blocking mismatch until incompatibility is
verified.

### Stack support classification

Use exactly one of:

- Supported
- Supported with stack-specific integration
- Unsupported
- Uncertain — payload inspection required
