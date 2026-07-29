# GitHub Pages setup checklist

Public registry host for `Game-Science-UK/gamescience-ui-library`.

Expected site URL:

```text
https://game-science-uk.github.io/gamescience-ui-library/
```

## Manual repository settings

1. Open `https://github.com/Game-Science-UK/gamescience-ui-library`
2. Go to **Settings → Pages**
3. Under **Build and deployment → Source**, choose **GitHub Actions**
4. Ensure Actions are enabled for the repository / organisation
5. Run the **Deploy GitHub Pages registry** workflow via **Actions → workflow_dispatch**, or push to `main`
6. After a green deployment, confirm the Pages URL on the Settings → Pages screen
7. Verify registry JSON returns HTTP 200 and raw JSON (not HTML):

```bash
curl -I https://game-science-uk.github.io/gamescience-ui-library/r/base.json
curl -s https://game-science-uk.github.io/gamescience-ui-library/versions/0.1.0/r/base.json | head
curl -s https://game-science-uk.github.io/gamescience-ui-library/version.json
```

## Local preview

```bash
npm run registry:build
npm run pages:build
npm run pages:validate
npm run pages:serve
```

`pages:serve` serves `pages-dist` on port 4177 by default.

## Troubleshooting

| Symptom                            | Likely cause                                   | Fix                                                            |
| ---------------------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| Pages 404 before first deployment  | No successful Actions deploy yet               | Run workflow manually; confirm Source is GitHub Actions        |
| Assets 404 under wrong path        | Subpath mismatch                               | Confirm URLs include `/gamescience-ui-library/`                |
| Workflow cannot write Pages        | Org/repo Actions or Pages permissions disabled | Enable Actions + Pages; check org policy                       |
| Missing `github-pages` environment | First deploy not created env                   | Approve environment if required; re-run workflow               |
| Stale Pages output                 | Old artifact cached / failed deploy            | Re-run workflow on latest `main`; confirm green deploy         |
| JSON served as HTML                | Jekyll processing or SPA fallback              | Ensure `.nojekyll` is in `pages-dist` (added by `pages:build`) |
| HTML fallback instead of JSON      | Wrong path or Pages not deployed               | Hit `/r/base.json` exactly; check Actions logs                 |
| Org policy blocks Pages            | Enterprise/org restriction                     | Ask org admin to allow GitHub Pages for this repo              |

## Versioned vs latest

- Consumers should pin:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/0.1.0/r/{name}.json
```

- Unversioned `/r/{name}.json` tracks latest stable published from `main` / release tags.
