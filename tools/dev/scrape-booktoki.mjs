// Quick DOM scraper for booktoki using E2E Chrome Profile
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { spawn } from "node:child_process";

const PROFILE_DIR = path.join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "User Data", "TampermonkeyE2E");
const CDP_PORT = 9225;
const url = "https://booktoki469.com/novel/18492830";

const chromePaths = [
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env["ProgramFiles(x86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];
const chromeExe = chromePaths.find(p => p && fs.existsSync(p));
if (!chromeExe) { console.error("Chrome not found"); process.exit(1); }

const chromeProcess = spawn(chromeExe, [
  `--user-data-dir=${PROFILE_DIR}`,
  `--remote-debugging-port=${CDP_PORT}`,
  "--no-first-run", "--no-default-browser-check",
  "about:blank",
], { detached: false, stdio: "ignore" });

let cdpReady = false;
for (let i = 0; i < 30; i++) {
  try {
    const resp = await fetch(`http://localhost:${CDP_PORT}/json/version`);
    if (resp.ok) { cdpReady = true; break; }
  } catch {}
  await new Promise(r => setTimeout(r, 500));
}
if (!cdpReady) { console.error("CDP not ready"); chromeProcess.kill(); process.exit(1); }

try {
  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);
  const context = browser.contexts()[0];
  const page = await context.newPage();
  
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(() => !document.title.includes("Just a moment"), { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  
  const result = await page.evaluate(() => {
    const article = document.querySelector("article");
    if (!article) return { error: "no article", title: document.title };
    
    const firstDiv = article.querySelector(":scope > div");
    const html = firstDiv?.innerHTML?.substring(0, 5000) || "no firstDiv";
    
    // Cover
    const imgs = document.querySelectorAll("img[src*='/data/']");
    const imgList = Array.from(imgs).map(i => i.src);
    
    // Author - try to find by text content patterns
    const allText = firstDiv?.textContent || "";
    
    // Try to get structured data from meta div children
    const metaDiv = firstDiv?.querySelector(":scope > div:nth-child(2)");
    const metaHTML = metaDiv?.innerHTML?.substring(0, 1000) || "";
    const metaChildren = metaDiv ? Array.from(metaDiv.children).map(c => ({
      tag: c.tagName,
      cls: c.className,
      text: c.textContent?.trim(),
      outerHTML: c.outerHTML.substring(0, 200)
    })) : [];
    
    // Intro
    const introP = firstDiv?.querySelector(":scope > p");
    const introHTML = introP?.outerHTML?.substring(0, 500) || "";
    const introText = introP?.textContent?.trim() || "";
    
    // Chapters
    const chapterLinks = document.querySelectorAll(".list-body a");
    const chapterCount = chapterLinks.length;
    const sampleChapters = Array.from(chapterLinks).slice(0, 3).map(a => ({
      text: a.textContent?.trim()?.substring(0, 60),
      href: a.getAttribute("href")?.substring(0, 100)
    }));
    
    return { html: html.substring(0, 3000), imgList, allText: allText.substring(0, 300), metaChildren, introHTML, introText, chapterCount, sampleChapters, pageTitle: document.title };
  });
  
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
} finally {
  chromeProcess.kill();
}
