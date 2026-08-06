## Visual-loss review

Replacing a local composition with a complete registry pattern can remove
application-owned visuals (radar, illustration, ambient animation, branded
artwork). That is a **design decision**, not ordinary cleanup.

For every local composition replaced by a complete registry pattern, record:

| Field                                | Content                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| Application-owned visuals removed    |                                                                                |
| Application-owned behaviours removed |                                                                                |
| Reason                               |                                                                                |
| Approved or inferred                 |                                                                                |
| Alternative composition considered   |                                                                                |
| Registry slot available              | yes / no / deferred                                                            |
| Decision                             | retain via composition / accept removal / restore locally / upstream candidate |

### Classifications for removed visuals

| Class                                  | Meaning                                             |
| -------------------------------------- | --------------------------------------------------- |
| Obsolete local fork                    | Duplicate of registry styling or behaviour          |
| Application-specific decorative visual | Safe to drop or keep locally                        |
| Game-critical visual                   | Must be retained or explicitly approved for removal |
| Duplicated registry styling            | Removal is cleanup                                  |
| Intentionally removed visual           | Documented product choice                           |
| Accidentally lost visual               | Regression — restore or compose beside the pattern  |

### Composition without forking

Prefer composing application-owned visuals as **siblings** of registry patterns
inside the context shell (for example QR beside `SharedDisplayLobby`) rather
than forking the pattern or inventing theme-specific props (`radar`,
`citadelVisual`).

Generated final reports must list any removed application-owned visual.
