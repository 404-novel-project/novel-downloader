import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { execSync, spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── 配置 ────────────────────────────────────────────────
const PROFILE_NAME = "TampermonkeyE2E";
const PROFILE_DIR = path.join(
  process.env.LOCALAPPDATA || "",
  "Google",
  "Chrome",
  "User Data",
  PROFILE_NAME
);
const DEV_SERVER_URL = "http://localhost:11944";
const DEV_PROXY_URL = "http://webpack.localhost:11944/bundle.proxy.user.js";
// Proxy script URL via localhost (Node.js cannot resolve webpack.localhost)
const DEV_PROXY_URL_LOCALHOST = "http://localhost:11944/bundle.proxy.user.js";
const SCREENSHOT_DIR = path.resolve(__dirname, "..", "..", "test", "screenshots");

// 测试用例：URL + 预期行为
interface TestCase {
  name: string;
  url: string;
  waitForSelector?: string;
  timeout?: number;
  expectScriptInjected?: boolean;
  // 元数据验证：在脚本注入后检查元数据是否正确提取
  validateMetadata?: (page: Page) => Promise<{ passed: boolean; details: string }>;
  // 章节下载验证：点击下载并检查是否能获取章节内容
  validateChapterDownload?: (page: Page) => Promise<{ passed: boolean; details: string }>;
}

const TEST_CASES: TestCase[] = [
  {
    // kakuyomu.jp - 日本小说站，通常稳定可用
    name: "kakuyomu-novel-page",
    url: "https://kakuyomu.jp/works/16817330662472563710",
    waitForSelector: "#nd-button",
    timeout: 30000,
    expectScriptInjected: true,
  },
  {
    // twkan.com - 繁体小说站
    name: "twkan-novel-page",
    url: "https://twkan.com/book/11606.html",
    waitForSelector: "#nd-button",
    timeout: 30000,
    expectScriptInjected: true,
  },
  {
    // booktoki (북토끼) - 韩国小说站，Cloudflare 防护
    name: "booktoki-novel-page",
    url: "https://booktoki469.com/novel/18492830",
    waitForSelector: "#nd-button",
    timeout: 120000,
    expectScriptInjected: true,
    validateMetadata: validateBooktokiMetadata,
  },
];

// ─── 元数据验证函数 ───────────────────────────────────────

/** 通用元数据验证：直接在页面 DOM 上验证选择器 */
async function validateMetadataCommon(
  page: Page,
  config: {
    // 选择器 → 期望值
    booknameSelector: string;
    authorSelector: string;
    introSelector: string;
    coverSelector: string;
    chapterListSelector: string;
    // 验证规则
    booknameMinLength?: number;
    authorNotDefault?: string;
    introMinLength?: number;
    coverUrlPattern?: string;
    chapterCountMin?: number;
  }
): Promise<{ passed: boolean; details: string }> {
  const issues: string[] = [];

  const result = await page.evaluate((cfg) => {
    const data: Record<string, string | number | null> = {};

    // 书名
    const titleEl = document.querySelector(cfg.booknameSelector);
    data.bookname = titleEl?.textContent?.trim() || null;

    // 作者
    // 尝试通过 fa-user 图标定位
    const metaDiv = document.querySelector('div.view-content[style*="color: #666"], div.view-content[style*="color:#666"]');
    if (metaDiv) {
      const userIcon = metaDiv.querySelector('i.fa-user, i[class*="fa-user"]');
      if (userIcon?.nextSibling?.textContent?.trim()) {
        data.author = userIcon.nextSibling.textContent.trim();
      } else {
        data.author = document.querySelector(cfg.authorSelector)?.textContent?.trim() || null;
      }
    } else {
      data.author = document.querySelector(cfg.authorSelector)?.textContent?.trim() || null;
    }

    // 简介
    const introEl = document.querySelector(cfg.introSelector);
    data.intro = introEl?.textContent?.trim() || null;

    // 封面
    const coverEl = document.querySelector(cfg.coverSelector) as HTMLImageElement | null;
    data.coverUrl = coverEl?.src || null;

    // 章节列表
    const chapterLinks = document.querySelectorAll(cfg.chapterListSelector);
    data.chapterCount = chapterLinks.length;

    return data;
  }, config);

  // 验证书名
  const minTitleLen = config.booknameMinLength ?? 1;
  if (!result.bookname || (result.bookname as string).length < minTitleLen) {
    issues.push(`书名异常: "${result.bookname || "(空)"}"`);
  }

  // 验证作者
  if (config.authorNotDefault && result.author === config.authorNotDefault) {
    issues.push(`作者为默认值: "${result.author}"`);
  }
  if (!result.author) {
    issues.push("作者为空");
  }

  // 验证简介
  if (config.introMinLength && config.introMinLength > 0) {
    const introText = (result.intro as string) || "";
    if (introText.length < config.introMinLength) {
      issues.push(`简介异常: "${introText.substring(0, 50) || "(空)"}" (长度 ${introText.length} < ${config.introMinLength})`);
    }
  }

  // 验证封面
  if (config.coverUrlPattern) {
    const coverUrl = (result.coverUrl as string) || "";
    if (!coverUrl || !coverUrl.includes(config.coverUrlPattern)) {
      issues.push(`封面URL异常: "${coverUrl?.substring(0, 80) || "(空)"}"`);
    }
  }

  // 验证章节数
  const minChapters = config.chapterCountMin ?? 1;
  if ((result.chapterCount as number) < minChapters) {
    issues.push(`章节数不足: ${result.chapterCount} < ${minChapters}`);
  }

  const passed = issues.length === 0;
  const details = passed
    ? `书名="${result.bookname}", 作者="${result.author}", 章节=${result.chapterCount}, 简介="${(result.intro as string)?.substring(0, 30)}...", 封面="${(result.coverUrl as string)?.substring(0, 60) || "无"}"`
    : issues.join("; ");

  return { passed, details };
}

/** booktoki 元数据验证 */
async function validateBooktokiMetadata(page: Page): Promise<{ passed: boolean; details: string }> {
  return validateMetadataCommon(page, {
    booknameSelector: "div.col-sm-8 div.view-content span b, div.col-sm-8 div.view-content:first-of-type",
    authorSelector: "div.view-content[style*='color: #666'] i.fa-user",
    introSelector: "div.col-sm-8 div.view-content p",
    coverSelector: "div.view-img img",
    chapterListSelector: ".list-body a[href*='/novel/']",
    booknameMinLength: 2,
    authorNotDefault: "未知作者",
    chapterCountMin: 10,
    coverUrlPattern: "/data/file/novel/",
    introMinLength: 5,
  });
}

// ─── 工具函数 ─────────────────────────────────────────────
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function checkDevServer(): Promise<boolean> {
  // webpack.localhost is a custom domain only resolvable by browsers;
  // use localhost:11944 to reach the same dev server from Node.js.
  try {
    const resp = await fetch(DEV_PROXY_URL_LOCALHOST, { method: "HEAD" });
    return resp.ok;
  } catch {
    return false;
  }
}

// ─── 核心逻辑 ─────────────────────────────────────────────
async function runTests() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  Tampermonkey E2E 自动化验证                     ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log();

  // 1. 检查 Profile 目录
  if (!fs.existsSync(PROFILE_DIR)) {
    console.error(`❌ Chrome Profile 不存在: ${PROFILE_DIR}`);
    console.error("   请先运行初始化脚本：powershell tools/dev/init-profile.ps1");
    process.exit(1);
  }
  console.log(`✅ Chrome Profile: ${PROFILE_DIR}`);

  // 2. 检查 dev server
  const devServerOk = await checkDevServer();
  if (!devServerOk) {
    console.error("❌ Dev server 未运行！");
    console.error("   请先启动：yarn dev");
    process.exit(1);
  }
  console.log("✅ Dev server 已运行");

  // 3. 准备截图目录
  ensureDir(SCREENSHOT_DIR);
  console.log(`✅ 截图目录: ${SCREENSHOT_DIR}`);
  console.log();

  // 4. 启动 Chrome（手动启动 + CDP 连接，更稳定）
  console.log("🚀 启动 Chrome（加载 Tampermonkey Profile）...");
  let browser: Browser | null = null;
  let context: BrowserContext | null = null;
  let chromeProcess: ReturnType<typeof spawn> | null = null;

  const CDP_PORT = 9222;

  // 查找 Chrome
  const chromePaths = [
    `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env["ProgramFiles(x86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  ];
  const chromeExe = chromePaths.find((p) => p && fs.existsSync(p));
  if (!chromeExe) {
    console.error("❌ 未找到 Chrome！");
    process.exit(1);
  }

  try {
    // 手动启动 Chrome，保留所有扩展
    chromeProcess = spawn(
      chromeExe,
      [
        `--user-data-dir=${PROFILE_DIR}`,
        `--remote-debugging-port=${CDP_PORT}`,
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "about:blank",
      ],
      { detached: false, stdio: "ignore" }
    );

    // 等待 Chrome 启动并开启 CDP
    console.log("  等待 Chrome CDP 端口就绪...");
    let cdpReady = false;
    for (let i = 0; i < 20; i++) {
      try {
        const resp = await fetch(`http://localhost:${CDP_PORT}/json/version`);
        if (resp.ok) {
          cdpReady = true;
          break;
        }
      } catch {
        // 还没准备好
      }
      await new Promise((r) => setTimeout(r, 500));
    }

    if (!cdpReady) {
      throw new Error("Chrome CDP 端口未就绪（超时 10s）");
    }

    // 通过 CDP 连接
    browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
    context = browser.contexts()[0] || await browser.newContext();
    console.log("✅ Chrome 已启动并连接");
    console.log();

    // 5. 运行测试用例
    let passed = 0;
    let failed = 0;

    // 预热：自动更新 Tampermonkey proxy 脚本
    console.log("🔄 预热：自动更新 Tampermonkey 脚本...");
    const warmupPage = await context.newPage();
    try {
      // 方法1：通过 Tampermonkey options page 的 Utilities tab 触发脚本更新
      const tmExtId = "dhdgffkkebhmkfjojejmpbldmpobfkfo";
      const tmOptionsUrl = `chrome-extension://${tmExtId}/options.html`;

      try {
        await warmupPage.goto(tmOptionsUrl, { waitUntil: "load", timeout: 8000 });

        // 切换到 Utilities tab
        const utilsTab = await warmupPage.$(
          "[data-tab='utilities'], a[href='#utilities'], li:has-text('Utilities')"
        );
        if (utilsTab) {
          await utilsTab.click();
          await warmupPage.waitForTimeout(1000);
        }

        // 点击 "Check for userscript updates"
        const updateBtn = await warmupPage.$(
          "input[value*='Check for'], button:has-text('Check'), [data-i18n*='update']"
        );
        if (updateBtn) {
          console.log("  📦 触发 Tampermonkey 脚本更新...");
          await updateBtn.click();
          await warmupPage.waitForTimeout(8000);
          console.log("  ✅ Tampermonkey 脚本更新完成");
        } else {
          console.log("  (未找到更新按钮，继续)");
        }
      } catch (e) {
        console.log(`  (Tampermonkey 选项页不可用: ${(e as Error).message?.substring(0, 80)})`);
      }

      // 方法2：导航到 proxy 脚本 URL 触发安装/更新
      // Tampermonkey 检测到 .user.js URL 会自动弹出安装对话框
      try {
        // 在新 tab 中打开 proxy 脚本
        const proxyPage = await context.newPage();
        await proxyPage.goto("http://webpack.localhost:11944/bundle.proxy.user.js", {
          waitUntil: "domcontentloaded",
          timeout: 15000,
        });
        await proxyPage.waitForTimeout(2000);

        // Tampermonkey 可能已接管页面显示安装对话框
        // 尝试找到并点击 "Install" 或 "Reinstall" 或 "确认"
        const installSelectors = [
          "input[type='submit'][value*='Install' i]",
          "input[type='button'][value*='Install' i]",
          "input[value*='安装']",
          "input[value*='确认']",
          "button:has-text('Install')",
          "button:has-text('安装')",
          "#install_script",
          "[data-i18n='Install']",
        ];

        for (const sel of installSelectors) {
          const btn = await proxyPage.$(sel);
          if (btn) {
            console.log(`  📦 点击 Tampermonkey 安装按钮 (${sel})`);
            await btn.click();
            await proxyPage.waitForTimeout(3000);
            break;
          }
        }
        await proxyPage.close();
      } catch {
        // 导航可能被 Tampermonkey 拦截并自动处理
      }

      // 等待 Tampermonkey 处理完所有变更
      await new Promise((r) => setTimeout(r, 3000));
    } catch {
      console.log("  (预热步骤未完全成功，继续执行测试)");
    }
    await warmupPage.close();
    console.log("✅ 预热完成");
    console.log();

    for (const tc of TEST_CASES) {
      console.log(`▶ 运行测试: ${tc.name}`);
      console.log(`  URL: ${tc.url}`);

      const page: Page = await context.newPage();
      const screenshotPath = path.join(SCREENSHOT_DIR, `${tc.name}.png`);
      let testPassed = true;

      try {
        // booktoki 等有 Cloudflare 保护的站点需要更长的加载时间
        const isCloudflareSite = tc.url.includes("booktoki");
        if (isCloudflareSite) {
          console.log("  ⚠️ Cloudflare 站点，等待验证通过...");
        }

        await page.goto(tc.url, {
          waitUntil: "domcontentloaded",
          timeout: tc.timeout || 10000,
        });

        // 对 Cloudflare 站点，先等待页面真正加载（通过 CF 验证）
        if (isCloudflareSite) {
          // 等待 Cloudflare challenge 完成
          await page.waitForFunction(
            () => !document.title.includes("Just a moment"),
            { timeout: 60000 }
          ).catch(() => {
            console.log("  ⚠️ Cloudflare 验证可能未通过，继续尝试...");
          });
          // 额外等待页面内容加载
          await page.waitForTimeout(3000);
        }

        // ─── 检查项 1: 脚本注入 ───
        if (tc.waitForSelector) {
          console.log(`  等待选择器: ${tc.waitForSelector}`);
          await page.waitForSelector(tc.waitForSelector, {
            timeout: tc.timeout || 10000,
            state: "attached",
          });
        }
        if (tc.expectScriptInjected) {
          const ndButton = await page.$("#nd-button");
          if (ndButton) {
            console.log("  ✅ [注入] 小说下载器 UI 已注入");
          } else {
            console.log("  ❌ [注入] 未检测到小说下载器 UI");
            testPassed = false;
          }
        }

        // ─── 检查项 2: 元数据验证 ───
        if (tc.validateMetadata) {
          console.log("  📋 [元数据] 验证中...");
          const metaResult = await tc.validateMetadata(page);
          if (metaResult.passed) {
            console.log(`  ✅ [元数据] ${metaResult.details}`);
          } else {
            console.log(`  ❌ [元数据] ${metaResult.details}`);
            testPassed = false;
          }
        }

        // ─── 检查项 3: 章节下载验证 ───
        if (tc.validateChapterDownload) {
          console.log("  📥 [下载] 验证中...");
          const dlResult = await tc.validateChapterDownload(page);
          if (dlResult.passed) {
            console.log(`  ✅ [下载] ${dlResult.details}`);
          } else {
            console.log(`  ❌ [下载] ${dlResult.details}`);
            testPassed = false;
          }
        }

        // 截图
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  📸 截图已保存: ${screenshotPath}`);

        if (testPassed) {
          console.log(`  ✅ PASSED`);
          passed++;
        } else {
          console.log(`  ❌ FAILED`);
          failed++;
        }
      } catch (error) {
        const errMsg = (error as Error).message;
        console.log(`  ❌ FAILED: ${errMsg.substring(0, 200)}`);

        // 诊断信息：检查页面状态
        try {
          const title = await page.title();
          const url = page.url();
          console.log(`  📋 页面标题: ${title}`);
          console.log(`  📋 实际URL: ${url}`);
          const hasNdButton = await page.$("#nd-button");
          const hasCFChallenge = await page.$("#challenge-running");
          console.log(`  📋 #nd-button 存在: ${!!hasNdButton}`);
          console.log(`  📋 CF challenge: ${!!hasCFChallenge}`);
        } catch {
          // 忽略诊断失败
        }

        // 即使失败也截图
        try {
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`  📸 失败截图: ${screenshotPath}`);
        } catch {
          // 忽略截图失败
        }
        failed++;
      } finally {
        await page.close();
      }
      console.log();
    }

    // 6. 输出结果
    console.log("══════════════════════════════════════════════════");
    console.log(`总计: ${TEST_CASES.length} | 通过: ${passed} | 失败: ${failed}`);
    console.log("══════════════════════════════════════════════════");

    if (failed > 0) {
      process.exitCode = 1;
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    if (chromeProcess && !chromeProcess.killed) {
      chromeProcess.kill();
    }
  }
}

// ─── 入口 ─────────────────────────────────────────────────
runTests().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
