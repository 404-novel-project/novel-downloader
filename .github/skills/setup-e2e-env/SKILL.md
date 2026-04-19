# Setup E2E Test Environment

Use this skill when setting up the E2E testing environment for the **first time**, or when the environment needs to be reset/recreated.

## Overview

The E2E test environment requires:
1. **Node.js dependencies** (Playwright, tsx, etc.)
2. **A dedicated Chrome Profile** with Tampermonkey extension installed
3. **The dev proxy script** registered in Tampermonkey

## Step-by-Step Setup

### Step 1: Install Node.js Dependencies

```bash
yarn install
```

This installs all required packages including:
- `playwright` — Browser automation
- `tsx` — TypeScript execution for E2E test runner
- `webpack-dev-server` — Serves the proxy userscript

> **No additional Playwright browser install needed** — the E2E tests connect to your system Chrome via CDP, not Playwright's bundled browsers.

### Step 2: Initialize Chrome Profile with Tampermonkey

```bash
yarn test:e2e:init
# or: powershell -NoProfile -ExecutionPolicy Bypass -File tools/dev/init-profile.ps1
```

This script:
1. Creates a Chrome user data directory at `%LOCALAPPDATA%\Google\Chrome\User Data\TampermonkeyE2E`
2. Launches Chrome with this profile
3. Opens two tabs:
   - Tampermonkey Chrome Web Store page
   - Dev proxy script URL (`http://webpack.localhost:11944/bundle.proxy.user.js`)

**⚠️ Manual steps required in the browser:**

1. **Install Tampermonkey**: On the Web Store tab, click "Add to Chrome" → confirm installation
2. **Install proxy script**: Make sure `yarn dev` is running first, then on the proxy script tab, click "Install" in the Tampermonkey dialog
3. **Close Chrome** when both installations are complete

### Step 3: Start Dev Server

```bash
yarn dev
```

This starts `webpack-dev-server` serving the proxy userscript at:
```
http://webpack.localhost:11944/bundle.proxy.user.js
```

> The dev server must remain running for E2E tests to work. Run it in a separate terminal or background it.

### Step 4: Run E2E Tests

```bash
yarn test:e2e
# or: npx tsx test/e2e-validate.ts
```

If all setup is correct, you should see output like:
```
✅ [注入] 小说下载器 UI 已注入
✅ PASSED
```

## Troubleshooting

### `❌ Chrome Profile 不存在`
The Chrome profile directory was not found. Re-run Step 2.

### `❌ Dev server 未运行`
Start the dev server first (`yarn dev`). Keep it running in a separate terminal.

### `❌ Playwright not found`
Run `yarn install` to install dependencies. Playwright is a dev dependency.

### Proxy script shows 404
The dev server isn't running or hasn't finished compiling. Wait for `webpack compiled successfully` before running tests.

### Tampermonkey didn't inject the script
Possible causes:
1. Tampermonkey was not installed — redo Step 2
2. Proxy script was not installed — navigate to `http://webpack.localhost:11944/bundle.proxy.user.js` and click Install
3. `@match`/`@include` patterns don't match the test URL — check `src/header.json`

### Cloudflare sites keep failing
CF cookies expire. To refresh:
1. Run `init-profile.ps1` to open the E2E browser
2. Manually navigate to the Cloudflare-protected site
3. Pass the challenge (click the checkbox)
4. Close Chrome — cookies are saved for next test run

## Quick Reference

| Command | Purpose |
|---------|---------|
| `yarn install` | Install all Node.js dependencies |
| `yarn test:e2e:init` | One-time Chrome + Tampermonkey profile setup |
| `yarn dev` | Start dev server (must be running for tests) |
| `yarn test:e2e` | Run E2E tests |

## File Reference

| File | Purpose |
|------|---------|
| `tools/dev/init-profile.ps1` | Creates Chrome profile, launches browser for manual Tampermonkey setup |
| `test/e2e-validate.ts` | E2E test runner |
| `test/screenshots/` | Test result screenshots |
| `%LOCALAPPDATA%\Google\Chrome\User Data\TampermonkeyE2E\` | Chrome profile directory |

## One-Click Full Setup (from scratch)

```bash
# 1. Install deps
yarn install

# 2. Initialize Chrome profile (requires manual steps in browser)
yarn test:e2e:init
# → Install Tampermonkey, install proxy script, close Chrome

# 3. Start dev server (keep running)
yarn dev

# 4. Run tests (in another terminal)
yarn test:e2e
```
