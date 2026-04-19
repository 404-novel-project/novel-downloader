import { chromium } from "playwright";

const url = process.argv[2] || "https://booktoki469.com/novel/18492830";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
console.log(`Navigating to ${url}...`);
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

// Wait for Cloudflare
await page
  .waitForFunction(() => !document.title.includes("Just a moment"), { timeout: 60000 })
  .catch(() => console.log("CF wait timeout"));
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const article = document.querySelector("article");
  if (!article) return { error: "no article" };

  // Title
  const titleEl = article.querySelector(":scope > div > div:first-child");
  
  // Metadata (platform, genre, author)
  const metaDiv = article.querySelector(":scope > div > div:nth-child(2)");
  const metaChildren = metaDiv
    ? Array.from(metaDiv.children).map((c) => ({
        tag: c.tagName,
        cls: c.className,
        text: c.textContent?.trim()?.substring(0, 80),
      }))
    : [];

  // Intro
  const introEl = article.querySelector(":scope > div > p");

  // Cover
  const allImgs = article.querySelectorAll("img");
  const imgList = Array.from(allImgs).map((i) => ({
    src: i.src?.substring(0, 120),
    alt: i.alt,
    cls: i.className,
    parent: i.parentElement?.className,
  }));

  // Chapter links
  const chapterLinks = document.querySelectorAll(
    ".list-body a, ul.list-body a[href*='/novel/'], div.list-body a[href*='/novel/']"
  );
  const chapters = Array.from(chapterLinks)
    .slice(0, 5)
    .map((a) => ({
      text: a.textContent?.trim()?.substring(0, 60),
      href: a.getAttribute("href")?.substring(0, 100),
    }));

  // First div structure
  const firstDiv = article.querySelector(":scope > div");
  const firstDivChildren = firstDiv
    ? Array.from(firstDiv.children).map((c) => ({
        tag: c.tagName,
        cls: c.className,
        text: c.textContent?.trim()?.substring(0, 60),
      }))
    : [];

  // Article structure
  const articleStructure = Array.from(article.children).map((c) => ({
    tag: c.tagName,
    cls: c.className,
    id: c.id,
  }));

  // Try various selectors
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
