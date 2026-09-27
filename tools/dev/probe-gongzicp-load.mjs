// Diagnostic: what script version is installed in the E2E Tampermonkey profile,
// and what API calls fire when a gongzicp novel page loads.
// OLD buggy code emits `novelInfo?id=` (empty); FIXED code always sends a real id.
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { spawn } from "node:child_process";

const PROFILE_DIR = path.join(
  process.env.LOCALAPPDATA || "",
  "Google",
  "Chrome",
  "User Data",
  "TampermonkeyE2E"
);
const CDP_PORT = Number(process.env.E2E_CDP_PORT) || 9333;
const TM_EXT_ID = "dhdgffkkebhmkfjojejmpbldmpobfkfo";

const chromePaths = [
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env["ProgramFiles(x86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];
const chromeExe = chromePaths.find((p) => p && fs.existsSync(p));
if (!chromeExe) {
  console.error("Chrome not found");
  process.exit(1);
}

const chromeProcess = spawn(
  chromeExe,
  [
    `--user-data-dir=${PROFILE_DIR}`,
    `--remote-debugging-port=${CDP_PORT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ],
  { detached: false, stdio: "ignore" }
);

let cdpReady = false;
for (let i = 0; i < 30; i++) {
  try {
    const resp = await fetch(`http://localhost:${CDP_PORT}/json/version`);
    if (resp.ok) {
      cdpReady = true;
      break;
    }
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}
if (!cdpReady) {
  console.error("CDP not ready");
  chromeProcess.kill();
  process.exit(1);
}

try {
  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  const context = browser.contexts()[0];

  // ── Phase A: which @require bundle version is cached in TM storage ──
  const tmPage = await context.newPage();
  try {
    await tmPage.goto(`chrome-extension://${TM_EXT_ID}/options.html`, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    await tmPage.waitForTimeout(2500);
    const info = await tmPage.evaluate(async () => {
      const ch = window.chrome;
      const all = await ch.storage.local.get(null);
      const out = { bundleVersion: null, bundleHasFix: false };
      for (const [k, v] of Object.entries(all)) {
        if (!k.startsWith("!extdb.@ext#")) continue;
        const url = v?.value?.url ?? "";
        if (!url.includes("bundle.user.js")) continue;
        const base = v?.value?.resource?.base ?? "";
        let full = "";
        for (let i = 0; i < base.length; i += 100000) {
          full += atob(base.slice(i, i + 100000));
        }
        out.bundleVersion = (full.match(/@version.*/) || [""])[0].trim();
        // dev 构建把非 ASCII 写成了双重转义的 \\uXXXX
        out.bundleHasFix =
          full.includes("\\\\u4E2D\\\\u65E0CP\\\\u53F7") ||
          full.includes("中无CP号");
      }
      return out;
    });
    console.log("=== TM cached bundle ===");
    console.log(JSON.stringify(info, null, 2));
  } catch (e) {
    console.log("TM storage read failed:", String(e).slice(0, 200));
  }
  await tmPage.close();

  // ── Phase B: load novel page, log relevant network ──
  const page = await context.newPage();
  const netlog = [];
  const t0 = Date.now();
  const interesting = /novelInfo|chapterGetList|getUserInfo|bundle(\.proxy)?\.user\.js|bundle\.js/;
  page.on("request", (req) => {
    const u = req.url();
    if (interesting.test(u)) {
      netlog.push({ t: Date.now() - t0, kind: "REQ", url: u.slice(0, 160) });
    }
  });
  page.on("requestfailed", (req) => {
    const u = req.url();
    if (interesting.test(u)) {
      netlog.push({
        t: Date.now() - t0,
        kind: "FAILED",
        url: u.slice(0, 160),
        err: req.failure()?.errorText,
      });
    }
  });
  page.on("response", async (resp) => {
    const u = resp.url();
    if (interesting.test(u)) {
      let bodyHead = "";
      try {
        bodyHead = (await resp.text()).slice(0, 200);
      } catch {}
      netlog.push({
        t: Date.now() - t0,
        kind: "RESP",
        status: resp.status(),
        url: u.slice(0, 160),
        bodyHead,
      });
    }
  });

  // Slow network so the "CP" placeholder window is wider than the 500ms poll —
  // catches the old buggy logic red-handed if it is still cached in TM.
  const throttle = process.env.NO_THROTTLE ? null : { latency: 500, mbps: 0.8 };
  if (throttle) {
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: throttle.latency,
      downloadThroughput: (throttle.mbps * 1024 * 1024) / 8,
      uploadThroughput: (throttle.mbps * 1024 * 1024) / 16,
    });
    console.log(`throttling: ${throttle.latency}ms latency, ${throttle.mbps} Mbps`);
  }

  console.log("=== loading novel page ===");
  await page.goto("https://www.gongzicp.com/novel-273600.html", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForSelector("#nd-button", { timeout: 60000 }).catch(() => {
    console.log("  #nd-button not found in 60s");
  });
  await page.waitForTimeout(60000);

  const ui = await page.evaluate(() => {
    const sr = document.querySelector("#nd-shadow-host")?.shadowRoot;
    const out = { shadowFound: !!sr };
    if (sr) {
      out.chapters = sr.querySelectorAll(".chapter-list .chapter").length;
      out.loading = !!sr.querySelector(".chapter-list-loading");
      out.errH2 =
        sr.querySelector(".chapter-list-loading h2")?.textContent ?? null;
    }
    return out;
  });

  console.log("=== network log ===");
  console.log(JSON.stringify(netlog, null, 2));
  console.log("=== UI state ===");
  console.log(JSON.stringify(ui, null, 2));

  await browser.close();
} finally {
  chromeProcess.kill();
}
