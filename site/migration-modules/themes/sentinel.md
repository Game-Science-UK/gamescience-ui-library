## Theme validation lens — Sentinel

Selected theme: **sentinel**

Migrated screens must derive visual identity from `@gamescience/theme-sentinel` / `sentinel.css`.

Validation lens (not permission to fork components):

- void field (`#02050A` cinematic / `#060910` restrained)
- violet primary
- ice secondary in the cinematic register; indigo secondary in restrained
- mint accent / success
- amber warning
- red only for overrun / danger
- square geometry (`radius` 0 except pill)
- uppercase mono labels
- panel wash only in the cinematic register
- no generic rounded SaaS card appearance
- no application-owned globe, rain, radar, or boot choreography in the registry theme

Set the register through `GameScienceProvider` (`register="cinematic"` default, or `register="restrained"`). Do **not** create `SentinelButton` or other Sentinel-specific component APIs.
