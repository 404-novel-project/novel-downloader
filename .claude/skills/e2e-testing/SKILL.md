# E2E Testing Skill — Tampermonkey Userscript Validation

Use this skill when the task requires validating that the userscript actually works in a real browser with Tampermonkey, or when developing a new site rule that needs runtime verification.

## Goal

Provide a fully automated end-to-end verification pipeline that launches Chrome with Tampermonkey, loads the dev proxy script, navigates to target pages, and confirms the download button (`#nd-button`) is injected.

## Prerequisites (One-Time Setup)

Run `powershell tools/dev/init-profile.ps1` once to create a dedicated Chrome profile with Tampermonkey installed. Manual steps required:
1. Install Tampermonkey from Chrome Web Store.
2. Navigate to `http://webpack.localhost:11944/bundle.proxy.user.js` and click Install.
3. Close Chrome.

## Automated Test Flow

### Quick Command

```powershell
# Ensure dev server is running, then:
npx tsx test/e2e-validate.ts
```

Or via npm script:

```powershell
yarn test:e2e
```

### What the E2E Test Does

1. **Checks prerequisites**: Dev server running, Chrome Profile exists, Playwright installed.
2. **Launches Chrome**: Spawns Chrome with `--remote-debugging-port=9222` and the E2E profile, connects via CDP.
3. **Warm-up phase**: 
   - Attempts Tampermonkey options page → Utilities → "Check for updates" to refresh proxy script metadata.
   - Navigates to proxy script URL and auto-clicks Install if Tampermonkey shows dialog.
4. **Runs test cases**: For each test case in `TEST_CASES`:
   - Navigates to URL
   - Waits for Cloudflare challenge (if applicable)
   - Checks `#nd-button` is attached to DOM
   - Takes screenshot
5. **Reports results**: Pass/fail counts with diagnostic info on failure.

### Test Configuration

Test cases are defined in `test/e2e-validate.ts` as `TEST_CASES` array:

```typescript
interface TestCase {
  name: string;           // Test identifier + screenshot filename
  url: string;            // Target page URL
  waitForSelector?: string; // Default: "#nd-button"
  timeout?: number;       // Override wait timeout (ms)
  expectScriptInjected?: boolean; // Check for #nd-button
}
```

### Adding a New Site Test

Add to `TEST_CASES` in `test/e2e-validate.ts`:

```typescript
{
  name: "my-site-novel-page",
  url: "https://example.com/novel/123",
  waitForSelector: "#nd-button",
  timeout: 30000,
  expectScriptInjected: true,
}
```

### Screenshots

Saved to `test/screenshots/{test-name}.png`. On failure, additional diagnostics:
- Page title and actual URL
- `#nd-button` presence
- Cloudflare challenge status
- First 500 chars of body HTML

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `❌ Chrome Profile 不存在` | First run | `powershell tools/dev/init-profile.ps1` |
| `❌ Dev server 未运行` | Need `yarn dev` | Start dev server in separate terminal |
| `⚠️ 未检测到小说下载器 UI` | Tampermonkey didn't inject script | Re-run `init-profile.ps1` or manually re-install proxy script |
| CF challenge timeout | Cloudflare blocked headless | Profile already has CF cookies; if expired, manually browse site in profile |
| `booktoki` test fails after metadata change | Tampermonkey cached old `@match`/`@include` | Navigate to proxy URL → Tampermonkey shows reinstall → auto-click or manually click |

## Cloudflare Sites

For sites behind Cloudflare (like booktoki):
- The E2E Profile preserves CF cookies between runs.
- First time: manually pass CF challenge in the E2E profile browser.
- Test adds `waitForFunction` to detect CF completion before checking `#nd-button`.
- Timeout is set to 120s for CF sites.

## Key Files

| File | Purpose |
|------|---------|
| `test/e2e-validate.ts` | E2E test runner (Playwright + Chrome CDP) |
| `tools/dev/init-profile.ps1` | One-time Chrome Profile setup |
| `tools/dev/e2e.ps1` | One-click E2E runner (checks + starts dev + runs tests) |
| `tools/dev/scrape-dom.mjs` | DOM scraper for analyzing selectors |
| `tools/dev/scrape-dom-profile.mjs` | DOM scraper with CF cookie profile |
| `test/screenshots/` | Test result screenshots |

## Important Notes

- The E2E test uses `spawn` Chrome + CDP, NOT Playwright's `launchPersistentContext`. This ensures Tampermonkey extension loads correctly.
- Dev server must be running before E2E tests (`yarn dev`).
- `@include` regex patterns in `src/header.json` are used for dynamic-domain sites (like `booktoki\d+\.com`). Standard `@match` patterns don't support wildcards in the middle of hostnames.
- After changing `@match`/`@include` in header.json, the Tampermonkey proxy script must be re-installed to pick up new metadata. The warm-up phase handles this automatically.
