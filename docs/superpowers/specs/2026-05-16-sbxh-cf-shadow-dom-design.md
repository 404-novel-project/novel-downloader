# sbxh1.com Cloudflare + closed shadow-root 下载方案设计

**Date:** 2026-05-16
**Owner:** ldm2060
**Scope:** `src/rules/special/reprint/sbxh.ts` + 启动入口重构
**Status:** Draft — pending user review

## 背景

`sbxh1.com` 同时存在两道屏障：

1. **Cloudflare 挑战**：fetch() 请求被 CF 当作 AJAX（基于 `Sec-Fetch-Mode: cors` / `Sec-Fetch-Dest: empty` 等浏览器内部 header），始终返回 `Just a moment …` 挑战页。这些 header 由浏览器写入，userscript 无法覆盖。
2. **Closed Shadow DOM**：章节正文 `.novel-viewer` 由站点 JS 渲染进 `mode: "closed"` 的 Shadow Root，外部代码无法 `pierceShadow` 取到 `shadowRoot`。

目前 `sbxh.ts` 的实现方式为：在 iframe 上覆盖 `Element.prototype.attachShadow` 后 `fetch()` + `document.write()`。由于 fetch 拿到的是 CF 挑战页，`document.write` 写入的 HTML 里没有真实站点 JS，attachShadow override 永远不会被触发，因此章节下载失败。

书籍信息页 (`/novel/<id>`) 已通过 CF（cookie `cf_clearance` 已建立），但章节 URL (`/novel/<id>/<chap>`) 的 fetch 仍被检测为非导航请求。

## 目标

- 章节下载在用户已通过 CF 的 sbxh1.com 标签页中能稳定工作。
- 遇到 CF 挑战时，给用户清晰的中/韩提示而非静默失败。
- 不破坏其他规则；不引入对 sbxh1.com 之外站点的副作用。

## 非目标

- 自动绕过未完成的 CF 验证（用户必须先在浏览器中通过 CF）。
- 自动求解 CF 挑战 / JS Challenge / Turnstile。
- 修改其他规则文件。

## 选定方案：Approach C — 取消 noframes，iframe 内运行劫持代码

### 关键决策

- 让 userscript 在章节 iframe 内**同时**运行 (`noframes: false`)，借助 `@run-at document-start` 在站点 JS 执行前注入 attachShadow 劫持。
- iframe 使用 **`frame.src = chapterUrl`** 真正的浏览器导航请求，自然带上 `Sec-Fetch-Mode: navigate`，CF 放行。
- iframe 内劫持完成后通过 `postMessage` 把渲染好的章节 HTML 发回父窗口。

### 为什么不是 A/B

| 方案 | 否决理由 |
|------|----------|
| A：`GM_xmlhttpRequest` 替换 fetch | 取决于 TM 的请求是否被 CF 当作导航；多个用户报告 CF 仍能识别 GM_xhr。冒险但收益小。 |
| B：真 src 导航 + MutationObserver 抢注入 `<script>` | 与 CF 内联挑战 JS 抢跑；不可靠，难调试。 |

C 用 Tampermonkey 自身的注入时序（document-start 早于站点任何脚本）来消除竞态，是最稳的方案。代价是入口需要拆分。

## 三种执行模式

`src/index.ts` 在 document-start 同步分派：

| 条件 | 模式 | 行为 |
|------|------|------|
| `window === window.top` | **top** | 原有完整流程：fixVue、globalInit、检测、UI、规则路由 |
| iframe + URL 匹配 sbxh 章节模式 | **sbxhIframe** | 仅安装 attachShadow 劫持 + postMessage 内容提供者，**不**加载 fixVue / UI |
| iframe + 其他 URL | **noop** | 立即 return，保留今天 `noframes: true` 的语义 |

## 文件级改动

### `src/header.json`

- `"noframes": false`（唯一一行修改）

### `src/index.ts`（重写为轻量分派器，约 25 行）

不能有任何带有顶层副作用的静态 import（特别是 `./ui/fixVue` 现在做 `globalThis.Function = new Proxy(...)`），否则会泄漏到所有 iframe。

```ts
import { log } from "./log";

const SBXH_CHAPTER_RE = /^https?:\/\/(?:www\.)?sbxh1\.com\/novel\/[^/]+\/[^/]+/;

(async () => {
  if (window === window.top) {
    const { run } = await import("./bootstrap/top");
    await run();
    return;
  }
  if (SBXH_CHAPTER_RE.test(location.href)) {
    const { run } = await import("./bootstrap/sbxhIframe");
    run();
    return;
  }
  // iframe in unrelated context — preserve old noframes:true behavior
})().catch((err) => log.error("[index] bootstrap failed", err));
```

`./log` 仍可静态 import，前提是确认 `src/log.ts` 没有顶层副作用（实现期审计）。如果有，再降级为动态 import。

### `src/bootstrap/top.ts`（新）

迁移 `index.ts` 旧的 main 流程：

```ts
import { environments } from "../detect";
import { init as globalInit } from "../global";
import { log } from "../log";
import "../ui/fixVue";
import { init as uiInit } from "../ui/ui";

async function main(ev?: Event) {
  if (ev) document.removeEventListener(ev.type, main);
  globalInit();
  log.info("[Init]开始载入小说下载器……");
  Object.entries(await environments()).forEach((kv) =>
    log.info("[Init]" + kv.join("：")),
  );
  await uiInit();
}

export async function run() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    await main();
  }
}
```

### `src/bootstrap/sbxhIframe.ts`（新）

```ts
import { pierceShadow } from "../lib/pierceShadow";

const TIMEOUT_MS = 30_000;
const POLL_MS = 500;
const ALLOWED_ORIGINS = new Set(["https://sbxh1.com", "https://www.sbxh1.com"]);

export function run() {
  installShadowHijack();
  installMessageHandler();
}

function installShadowHijack() {
  const native = Element.prototype.attachShadow;
  const patched = function (this: Element, init: ShadowRootInit) {
    return native.call(this, { ...init, mode: "open" });
  };
  Object.defineProperty(patched, "toString", {
    value: () => native.toString(),
    configurable: true,
  });
  Element.prototype.attachShadow = patched as typeof Element.prototype.attachShadow;
}

function installMessageHandler() {
  window.addEventListener("message", async (ev) => {
    if (!ALLOWED_ORIGINS.has(ev.origin)) return;
    const data = ev.data;
    if (!data || data.type !== "sbxh-request-content" || typeof data.id !== "string") return;

    const reply = (payload: { html: string | null; captcha: boolean }) =>
      (ev.source as Window | null)?.postMessage(
        { type: "sbxh-content", id: data.id, ...payload },
        { targetOrigin: ev.origin },
      );

    try {
      if (isCaptcha()) return reply({ html: null, captcha: true });
      const viewer = await waitForViewer();
      reply({ html: viewer?.outerHTML ?? null, captcha: false });
    } catch {
      reply({ html: null, captcha: false });
    }
  });
}

function isCaptcha(): boolean {
  return (
    document.title.includes("Just a moment") ||
    !!document.querySelector("#challenge-running, #challenge-form, .cf-browser-verification")
  );
}

async function waitForViewer(): Promise<Element | null> {
  const deadline = Date.now() + TIMEOUT_MS;
  return new Promise((resolve) => {
    const tick = () => {
      const viewer = pierceShadow(document, ".novel-viewer");
      if (viewer) {
        if (viewer.querySelector(".novel-empty")) return resolve(viewer);
        const text = viewer.textContent?.trim() ?? "";
        if (text.length > 100) return resolve(viewer);
      }
      if (Date.now() >= deadline) return resolve(null);
      window.setTimeout(tick, POLL_MS);
    };
    tick();
  });
}
```

> 说明：上面 listener 内联了 reply。一次请求一次 reply；超时由父窗口的 35s 计时器兜底，iframe 端不再做超时（避免双重计时器复杂化）。

### `src/lib/pierceShadow.ts`（提取至共享）

将 `sbxh.ts` 当前的 `pierceShadow` 原样搬过来，供父窗口和 iframe 都使用。

```ts
export function pierceShadow(
  root: Document | Element | ShadowRoot,
  selector: string,
): Element | null {
  const direct = root.querySelector(selector);
  if (direct) return direct;
  const all = Array.from(root.querySelectorAll("*"));
  for (const el of all) {
    if (el.shadowRoot) {
      const found = el.shadowRoot.querySelector(selector);
      if (found) return found;
      const deeper = pierceShadow(el.shadowRoot, selector);
      if (deeper) return deeper;
    }
  }
  return null;
}
```

### `src/rules/special/reprint/sbxh.ts`（重写 `loadChapterFrame`）

```ts
import { mkRuleClass } from "../../onePage/template";
import { rm } from "../../../lib/dom";
import { log } from "../../../log";
import { randomUUID } from "../../../lib/misc";

const REQUEST_TIMEOUT_MS = 35_000;

export const sbxh = () =>
  mkRuleClass({
    // ... unchanged book metadata fields ...
    getContentFromUrl: async (chapterUrl, _name, _charset) => {
      const result = await fetchChapterViaIframe(chapterUrl);
      if (!result) return null;
      if (result.captcha) return createCaptchaMessage();
      return parseViewerHtml(result.html);
    },
    contentPatch: (content) => {
      rm("script, style, iframe, ins", false, content);
      return content;
    },
    concurrencyLimit: 1,
    sleepTime: 1000,
    needLogin: false,
    nsfw: false,
    language: "ko",
  });

async function fetchChapterViaIframe(
  url: string,
): Promise<{ html: string | null; captcha: boolean } | null> {
  const frame = document.createElement("iframe");
  frame.width = "1";
  frame.height = "1";
  frame.style.cssText = "position:fixed;left:-9999px;top:-9999px;border:0;";
  frame.src = url;
  document.body.appendChild(frame);

  const id = randomUUID();
  const targetOrigin = new URL(url).origin;

  try {
    await waitForFrameLoad(frame);
    return await new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        window.removeEventListener("message", onMessage);
        log.warn(`[sbxh] timeout waiting for iframe content: ${url}`);
        resolve(null);
      }, REQUEST_TIMEOUT_MS);

      function onMessage(ev: MessageEvent) {
        if (ev.source !== frame.contentWindow) return;
        if (ev.origin !== targetOrigin) return;
        const data = ev.data;
        if (!data || data.type !== "sbxh-content" || data.id !== id) return;
        window.clearTimeout(timer);
        window.removeEventListener("message", onMessage);
        resolve({ html: data.html, captcha: !!data.captcha });
      }
      window.addEventListener("message", onMessage);
      frame.contentWindow?.postMessage(
        { type: "sbxh-request-content", id },
        targetOrigin,
      );
    });
  } finally {
    frame.remove();
  }
}

function waitForFrameLoad(frame: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve) => {
    if (frame.contentDocument?.readyState === "complete") return resolve();
    const onLoad = () => {
      frame.removeEventListener("load", onLoad);
      resolve();
    };
    frame.addEventListener("load", onLoad);
  });
}

function parseViewerHtml(html: string | null): HTMLElement | null {
  if (!html) return null;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const viewer = doc.querySelector(".novel-viewer") ?? doc.body.firstElementChild;
  if (!viewer) return null;
  const children = viewer.children;
  if (children.length >= 2) return children[1] as HTMLElement;
  return viewer as HTMLElement;
}

// getBookname / getAuthor / getIntroDom / getCoverUrl / getChapterList
// 保持原样不动 — 它们在父窗口(书籍页)运行，已经能通过 CF。

// createCaptchaMessage 保持原样
```

注意：书籍页面 (`/novel/<id>`) 不在章节 iframe 模式下运行，仍走 top mode 的现有元数据抓取逻辑，无需修改。

## postMessage 协议

| 方向 | 消息 | 触发时机 |
|------|------|----------|
| Parent → iframe | `{type: "sbxh-request-content", id: uuid}` | iframe 的 `load` 事件已触发 |
| Iframe → Parent | `{type: "sbxh-content", id, html: string\|null, captcha: boolean}` | 内容已渲染 / 检测到 CF / 超时（html=null） |

双方均验证 `event.origin ∈ {https://sbxh1.com, https://www.sbxh1.com}` 与 `id` 匹配。

不做 ready 握手 — parent 等 iframe `load` 事件就够：load 触发时 document-start 的劫持代码早已执行，listener 已就位。

## attachShadow 劫持要点

```js
const native = Element.prototype.attachShadow;
const patched = function (init) {
  return native.call(this, { ...init, mode: "open" });
};
Object.defineProperty(patched, "toString", {
  value: () => native.toString(),
  configurable: true,
});
Element.prototype.attachShadow = patched;
```

- `{...init, mode: "open"}`：保留 `delegatesFocus`、`slotAssignment` 等其它字段，仅强制 open。
- `toString` 伪装：CF/反爬偶尔做 `attachShadow.toString().includes("[native code]")` 检测，伪装可避免触发。
- 不做 `Object.defineProperty(Element.prototype, "attachShadow", {writable:false})` —— 不必要的强化反而可能被检测。
- 不在 iframe 内劫持 `console.log` / `EventTarget.addEventListener` / MutationObserver —— 当前不必要，等出现具体检测再加。

## 风险与缓解

| 风险 | 缓解 |
|------|------|
| 其他规则的 `lib/http.ts` iframe 现在也会跑 userscript | dispatcher 的 noop 分支立即 return；零成本 |
| `src/log.ts` 若含顶层副作用，会泄漏到 iframe | 实现期 grep `globalThis\.` / `window\.` 顶层赋值并审计；如有副作用则改为动态 import |
| webpack 把 `bootstrap/top` 和 `bootstrap/sbxhIframe` 切成额外 chunk → 让 Tampermonkey 加载失败 | webpack 单 bundle 输出已被 `webpack-userscript` 强制；动态 import 在 userscript 模式下会被打成同步函数。**实现期必须 `yarn build` 验证产物只有一个文件，再加测试。** |
| sbxh 章节 URL 在 iframe 内也匹配书籍 URL 通配（`/novel/*` 含 `/novel/<id>/<chap>`） | 使用更严格的章节正则 `\/novel\/[^/]+\/[^/]+` 要求两段 path；书籍 URL 只有一段，自然落到 noop |
| 同源策略：postMessage 双向都做了 origin 校验 | 已在协议里固定 |
| 章节 iframe 永远卡住（站点改版 / 资源失败） | 35s 超时，parent 返回 null + warn |

## 验证计划

1. **构建产物**：`yarn build` 通过，输出单个 `.user.js`；查 metadata `noframes` 已是 `false`。
2. **本地 dev**：`yarn dev` + Tampermonkey 装 proxy 脚本。
3. **回归矩阵**（必跑）：
   - sbxh1.com 书籍页：元数据、章节列表抓取正常。
   - sbxh1.com 章节下载：能正确得到正文。
   - sbxh1.com 未过 CF：能看到中/韩 captcha 提示。
   - 其他规则各抽 1-2 个使用 `lib/http.ts` iframe 拉取的（如 jjwxc 等）：iframe 内 userscript 不应抢加载 UI，下载结果与今天一致。
4. **DevTools 验证**：在章节页面 iframe 中 `Element.prototype.attachShadow.toString()` 输出仍是 `[native code]`；`document.querySelectorAll('*').forEach(e => e.shadowRoot && console.log(e.shadowRoot.mode))` 全部为 `"open"`。
5. **E2E**：执行 `npx tsx test/e2e-validate.ts` 中针对 sbxh1.com 的用例（若不存在则新增）。

## 实现步骤（写入 plan 时再展开）

1. 抽出 `src/lib/pierceShadow.ts`。
2. 创建 `src/bootstrap/top.ts`，迁移现有 main 流程。
3. 创建 `src/bootstrap/sbxhIframe.ts`，含劫持 + postMessage。
4. 重写 `src/index.ts` 为分派器（动态 import）。
5. 改 `src/header.json` 的 `noframes` 为 `false`。
6. 改 `src/rules/special/reprint/sbxh.ts`：删除 fetch+document.write，新增 postMessage 取数。
7. `yarn lint` + `yarn build` 全绿。
8. 浏览器手动 + E2E 验证。

## 未来工作（不在此 PR）

- 把 captcha 提示换成"打开可见 iframe 让用户现场过 CF + 脚本自动重试"的更佳 UX。
- 把 iframe + postMessage 抽成通用的 `runScriptInRealNavIframe(url, runner)` 工具，给未来需要绕过 CF 的规则复用。
