# Copilot Instructions

## Project Type

- This repository is a webpack-userscript project targeting Tampermonkey, Violentmonkey, and compatible userscript managers.
- The main entry is `src/index.ts`, and userscript metadata is generated from `src/header.json` by `webpack-userscript`.

## Local Development

- Use `yarn dev` for local proxy-script development. The dev server serves `http://webpack.localhost:11944/bundle.proxy.user.js`.
- Use `yarn build` for the production userscript bundle and `yarn build-greasyfork` for the unminified GreasyFork bundle.
- When a change affects userscript execution, prefer validating both `yarn lint` and `yarn build`.
- The integrated browser can verify generated pages and local dev endpoints, but actual Tampermonkey or Violentmonkey runtime validation must happen in a browser profile where the extension is installed.

## Site Rule Changes

- Add or update match patterns in `src/header.json`.
- Register routing changes in `src/router/download.ts`.
- Keep rule implementations inside the existing site-specific folders under `src/rules/`.
- Follow the existing rule style. Prefer the smallest site-specific rule that fits the target website instead of broad shared changes.

## Safety Checks

- Do not remove or bypass the userscript metadata generation flow in `webpack.config.js`.
- Do not change build output filenames unless the task explicitly requires it, because local dev relies on the stable proxy URL.
- Tampermonkey 4.14 is intentionally treated as unsupported by runtime detection in `src/detect.ts`.