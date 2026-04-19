# Site Rule Development Workflow

Use this skill when adding or modifying support for a novel website. This defines the standard pipeline from analysis to tested implementation with a complete verification checklist.

## Standard Pipeline: Analysis → DOM Scraping → Implementation → Verification

### Phase 1: Analyze the Target Site

1. **Open the target URL** in the integrated browser.
2. **Identify site characteristics**:
   - Does it use Cloudflare or other anti-bot protection?
   - Is it a single-page index (chapters listed on book page) or multi-page?
   - Does chapter content require login/captcha?
3. **Determine rule category**:
   - `onePage/` — Single index page, chapter content fetched individually
   - `twoPage/` — Two-page pattern (index + content)
   - `biquge/` — Biquge-derived site structure
   - `special/` — Unique site structure
   - `reprint/` under `special/` — Reprint/aggregator sites

### Phase 2: DOM Analysis

**CRITICAL**: Never guess selectors from accessibility snapshots. Always scrape real HTML.

1. **Use `tools/dev/scrape-dom.mjs`** for sites without Cloudflare:
   ```bash
   node tools/dev/scrape-dom.mjs "https://example.com/novel/123"
   ```

2. **Use `tools/dev/scrape-booktoki.mjs`** as template for Cloudflare sites:
   - Modify the URL in the script
   - Uses the E2E Chrome Profile with CF cookies
   - Returns structured JSON with actual HTML

3. **What to identify from the scraped DOM**:
   - **Book title** selector and exact HTML structure
   - **Author** selector (may be in metadata row with platform/genre)
   - **Cover image** selector (src attribute)
   - **Introduction/synopsis** selector
   - **Chapter list** selector (anchor elements with href)
   - **Chapter content** selector (for content pages)
   - **Anti-bot indicators** (captcha forms, login prompts)

4. **Record findings** in the rule file's JSDoc comment block.

### Phase 3: Implementation

#### 3a. Choose the Right Template

```typescript
// Simple one-page sites → mkRuleClass from onePage/template.ts
import { mkRuleClass } from "../../onePage/template";

// Complex sites → direct Rule class implementation
// See existing rules for patterns
```

#### 3b. File Location

- Standard sites: `src/rules/{category}/{siteName}.ts`
- Special sites: `src/rules/special/{subcategory}/{siteName}.ts`
- Reprint sites: `src/rules/special/reprint/{siteName}.ts`

#### 3c. Required Code Changes (3 places)

1. **Rule file** (`src/rules/.../siteName.ts`):
   - Implement selector functions based on scraped DOM
   - Handle edge cases (captcha, login, pagination)
   - Set appropriate `concurrencyLimit`, `sleepTime`, `language`

2. **Router** (`src/router/download.ts`):
   - Add host matching in the switch/default case
   - Import the rule function

3. **Metadata** (`src/header.json`):
   - Add `@match` pattern for fixed-domain sites
   - Add `@include` regex for dynamic-domain sites (e.g., `booktoki\d+\.com`)
   - **NEVER** use `@match` with `*` in the middle of a hostname — use `@include` with regex instead

#### 3d. Match/Include Pattern Rules

| Pattern | When to use | Example |
|---------|-------------|---------|
| `@match *://example.com/novel/*` | Fixed domain | Most sites |
| `@include /^https?:\/\/site\d+\.com\//` | Dynamic numbered domains | booktoki469, booktoki470, etc. |
| `@match *://*.example.com/*` | Subdomain wildcard | All subdomains |

### Phase 4: Verification — Complete Checklist

Every new site rule MUST pass ALL of the following checks before being considered complete.

#### Check 1: Static Analysis ✅/❌

```bash
yarn lint    # 0 new errors (warnings OK)
yarn build   # Compiles successfully
```

#### Check 2: Script Injection ✅/❌

The Tampermonkey userscript must activate on the target page.

- **What to verify**: `#nd-button` element exists in DOM (attached state)
- **How to test**: E2E test `waitForSelector: "#nd-button"`
- **Common failure**: `@match`/`@include` pattern doesn't match the actual URL

#### Check 3: Metadata Extraction ✅/❌

The rule must correctly extract all metadata from the book page.

| Field | Validation Rule | Common Issues |
|-------|----------------|---------------|
| **书名 (bookname)** | Non-empty, no extra metadata mixed in | Title concatenated with author/genre/platform |
| **作者 (author)** | Not "未知作者" or empty | Author embedded in metadata row; need icon/text-based extraction |
| **封面 (coverUrl)** | Valid URL pointing to actual cover image | Grabbing ad/banner images instead; selector not specific enough |
| **简介 (introDom)** | Contains actual synopsis text (length > 5) | Getting only punctuation "。" or empty; wrong `view-content` div |
| **章节列表 (aList)** | count >= expected minimum | Selector misses chapters in list; wrong nesting level |

- **How to test**: E2E test `validateMetadata` callback — validates selectors directly against page DOM
- **How to add**: Create a `validateXxxMetadata` function using `validateMetadataCommon`

#### Check 4: Chapter Content Download ✅/❌

At least one chapter should be downloadable with actual content.

- **What to verify**: `getContentFromUrl` or `getContent` returns non-null HTMLElement with paragraph text
- **Special cases**:
  - Cloudflare/captcha sites: content may be a message element instead of actual text — this is acceptable if the message explains the situation
  - Login-required sites: content may be empty for unpaid chapters — document this in the rule
- **How to test**: E2E test `validateChapterDownload` callback (optional, manual for now)

#### Check 5: Screenshot Review ✅/❌

- **What to check**: Screenshot in `test/screenshots/{name}.png`
- **Verify**: Download button visible (or at least present), page layout not broken by script

#### E2E Test Configuration

Add test case to `test/e2e-validate.ts`:

```typescript
{
  name: "site-name-novel-page",
  url: "https://example.com/novel/123",
  waitForSelector: "#nd-button",
  timeout: 30000,          // 120000 for Cloudflare sites
  expectScriptInjected: true,
  validateMetadata: async (page) => validateMetadataCommon(page, {
    booknameSelector: "h1.title",
    authorSelector: "span.author",
    introSelector: "div.intro p",
    coverSelector: "img.cover",
    chapterListSelector: ".chapter-list a",
    booknameMinLength: 2,
    authorNotDefault: "未知作者",
    introMinLength: 5,
    coverUrlPattern: "/covers/",
    chapterCountMin: 10,
  }),
}
```

Then run:
```bash
npx tsx test/e2e-validate.ts
```

All checks must show ✅. If any check fails, fix the issue and re-run.

## Checklist Summary

```
□ yarn lint — 0 new errors
□ yarn build — compiles
□ E2E: #nd-button attached — script injects on target page
□ E2E: bookname — clean, no metadata mixed in
□ E2E: author — not default/empty value
□ E2E: coverUrl — valid image URL (not ad/banner)
□ E2E: introDom — actual synopsis text (length > 5)
□ E2E: chapterList — reasonable count (> 0)
□ Screenshot — page looks correct
□ (Optional) Chapter content — downloadable with actual text
```

## Common Pitfalls

1. **Accessibility snapshot ≠ real HTML**: The integrated browser's accessibility tree shows different structure than actual DOM. Always scrape raw HTML.
2. **Match pattern limitations**: `@match *://site*.com/*` does NOT work. Use `@include` with regex.
3. **Author extraction**: Author info is often in metadata row with platform/genre. Use icon elements (`fa-user`) or text patterns to identify the correct portion.
4. **Multiple `.view-content` divs**: Sites like booktoki use the same class for different sections (title, meta, intro, buttons). Use `:scope > p` or index-based selectors.
5. **Import depth**: Files in `special/reprint/` are 3 levels deep — use `../../../lib/`.
6. **NodeListOf iteration**: Use `Array.from()` for `querySelectorAll` results in for...of loops.
7. **Cover image vs ads**: Verify cover selector doesn't match banner/ad images. Use `div.view-img img` or `div.col-sm-4 img` for precision.

## File Reference

| File | Purpose |
|------|---------|
| `src/rules/onePage/template.ts` | `mkRuleClass` helper for simple rules |
| `src/router/download.ts` | Host-to-rule routing |
| `src/header.json` | Userscript metadata (match/include patterns) |
| `test/e2e-validate.ts` | E2E test runner with metadata validation |
| `tools/dev/scrape-dom.mjs` | DOM scraper (no CF) |
| `tools/dev/scrape-booktoki.mjs` | DOM scraper template (with CF profile) |
