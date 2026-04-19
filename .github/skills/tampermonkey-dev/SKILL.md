# Tampermonkey Dev Workflow

Use this skill when the task involves creating, modifying, debugging, or validating the userscript in a browser environment.

## Goal

Establish a repeatable local workflow for userscript development without breaking the production bundle flow.

## Required Checks

1. Confirm the project still serves the proxy userscript from `http://webpack.localhost:11944/bundle.proxy.user.js`.
2. If the task changes runtime behavior, validate `yarn lint` and `yarn build` unless the user explicitly limits verification.
3. If a browser extension is required, state clearly whether the current environment can execute the Tampermonkey runtime directly or only validate the generated script endpoint.

## Standard Workflow

1. Start the dev server with `yarn dev`.
2. Open `http://webpack.localhost:11944/bundle.proxy.user.js` in a browser.
3. Install or refresh that proxy script in Tampermonkey or Violentmonkey.
4. Navigate to a supported site page matched by `src/header.json`.
5. Make code changes, then reload the target page to pick up the updated bundle.

## Repository-Specific Notes

- Userscript metadata comes from `src/header.json` and is versioned dynamically in `webpack.config.js`.
- Local development depends on the `proxyScript` block in `webpack.config.js`. Keep the filename stable unless the task explicitly changes the workflow.
- Site support usually requires touching three places: rule implementation, router registration, and metadata match patterns.
- This repository already contains built artifacts in `dist/`, but development should use the live proxy script instead of editing built files.

## Practical Limits

- Browser automation can verify the local dev server and generated script responses.
- Installing or interacting with Tampermonkey itself depends on an actual browser profile with the extension available. If the current environment lacks that extension, stop at serving and opening the proxy script, then report the remaining manual step.