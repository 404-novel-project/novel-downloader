// Scrape booktoki DOM using Chrome Profile (with CF cookie)
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
const CDP_PORT = 9223; // Use different port from E2E test

const url = process.argv[2] || "https://booktoki469.com/novel/18492830";

// Find Chrome
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

// Launch Chrome
const chromeProcess = spawn(
  chromeExe,
  [
    `--user-data-dir=${PROFILE_DIR}`,
    `--remote-debugging-port=${CDP_PORT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--headless=new",
    "about:blank",
  ],
  { detached: false, stdio: "ignore" }
);

// Wait for CDP
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
  console.error("Chrome CDP not ready");
  chromeProcess.kill();
  process.exit(1);
}

try {
  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  const context = browser.contexts()[0];
  const page = await context.newPage();

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  // Wait for CF
  await page
    .waitForFunction(() => !document.title.includes("Just a moment"), { timeout: 60000 })
    .catch(() => console.log("CF wait timeout"));
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const article = document.querySelector("article");
    if (!article) return { error: "no article", title: document.title, url: location.href };

    const titleEl = article.querySelector(":scope > div > div:first-child");
    const metaDiv = article.querySelector(":scope > div > div:nth-child(2)");
    const metaChildren = metaDiv
      ? Array.from(metaDiv.children).map((c) => ({
          tag: c.tagName,
          cls: c.className,
          text: c.textContent?.trim()?.substring(0, 80),
        }))
      : [];
    const introEl = article.querySelector(":scope > div > p");
    const allImgs = article.querySelectorAll("img");
    const imgList = Array.from(allImgs).map((i) => ({
      src: i.src?.substring(0, 120),
      alt: i.alt,
      cls: i.className,
      parentCls: i.parentElement?.className,
    }));
    const chapterLinks = document.querySelectorAll(
      ".list-body a, ul.list-body a[href*='/novel/'], div.list-body a[href*='/novel/']"
    );
    const chapters = Array.from(chapterLinks)
      .slice(0, 5)
      .map((a) => ({
        text: a.textContent?.trim()?.substring(0, 60),
        href: a.getAttribute("href")?.substring(0, 100),
      }));
    const firstDiv = article.querySelector(":scope > div");
    const firstDivChildren = firstDiv
      ? Array.from(firstDiv.children).map((c) => ({
          tag: c.tagName,
          cls: c.className,
          text: c.textContent?.trim()?.substring(0, 60),
        }))
      : [];
    const articleStructure = Array.from(article.children).map((c) => ({
      tag: c.tagName,
      cls: c.className,
      id: c.id,
    }));
    const selectors = {
      ".view-title": document.querySelector(".view-title")?.textContent?.trim(),
      ".view-detail": !!document.querySelector(".view-detail"),
      ".view-content": !!document.querySelector(".view-content"),
      ".info-box": document.querySelector(".info-box")?.textContent?.trim(),
      ".view-intro": document.querySelector(".view-intro")?.textContent?.trim(),
      ".view-img img": document.querySelector(".view-img img")?.src,
      "h2.title": document.querySelector("h2.title")?.textContent?.trim(),
      ".bo_v_tit": document.querySelector(".bo_v_tit")?.textContent?.trim(),
    };

    return {
      title: titleEl?.textContent?.trim(),
      meta: metaDiv?.textContent?.trim(),
      metaChildren,
      intro: introEl?.textContent?.trim(),
      imgList,
      chapters,
      chapterCount: chapterLinks.length,
      firstDivChildren,
      articleStructure,
      selectors,
      pageTitle: document.title,
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
} finally {
  chromeProcess.kill();
}
