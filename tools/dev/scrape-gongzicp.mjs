// Scrape gongzicp (长佩) novel page DOM — Vue SPA, needs real browser rendering.
// Focus: the "CP<id>" span used by Gongzicp.bookParse to build the novel id.
//
// Usage:
//   node tools/dev/scrape-gongzicp.mjs [url]            # dump final DOM of a novel page
//   node tools/dev/scrape-gongzicp.mjs --probe [url]    # timeline: poll span.c-light-gray every 100ms from document-start
//   node tools/dev/scrape-gongzicp.mjs --multi [n]      # homepage → visit n novel pages, report ID-span status
import { chromium } from "playwright";

const args = process.argv.slice(2);
const mode = args[0]?.startsWith("--") ? args[0] : "dump";
const arg = args[0]?.startsWith("--") ? args[1] : args[0];

let browser;
try {
  browser = await chromium.launch({ headless: true });
} catch {
  // bundled chromium not installed — fall back to system Chrome
  browser = await chromium.launch({ headless: true, channel: "chrome" });
}

async function dumpPage(url) {
  const page = await browser.newPage();
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(8000);

  const data = await page.evaluate(() => {
    const out = {};

    // 1. All span.c-light-gray (the selector the rule currently relies on)
    out.cLightGraySpans = Array.from(
      document.querySelectorAll("span.c-light-gray")
    ).map((el) => ({
      innerText: el.innerText?.substring(0, 80),
      textContent: el.textContent?.substring(0, 80),
      parent:
        el.parentElement?.tagName + "." + (el.parentElement?.className || ""),
      outer: el.outerHTML.substring(0, 250),
    }));

    // 2. Leaf elements whose text contains CP<digits>
    out.cpMatches = Array.from(document.querySelectorAll("*"))
      .filter(
        (el) =>
          el.children.length === 0 && /CP\s*\d{3,}/.test(el.textContent || "")
      )
      .slice(0, 20)
      .map((el) => ({
        tag: el.tagName,
        cls: el.className,
        id: el.id,
        text: el.textContent?.trim().substring(0, 80),
        outer: el.outerHTML.substring(0, 300),
      }));

    out.title = document.title;
    out.pathname = location.pathname;

    // 3. Full HTML of the complaint box containing the CP id
    const complain = document.querySelector("div.cp-complain");
    out.complainOuter = complain?.outerHTML
      ?.replace(/\s+/g, " ")
      .substring(0, 1500);
    return out;
  });
  await page.close();
  return data;
}

if (mode === "dump" || mode === undefined) {
  const data = await dumpPage(arg || "https://www.gongzicp.com/novel-273600.html");
  console.log(JSON.stringify(data, null, 2));
} else if (mode === "--probe") {
  // Replicate the userscript poll: from document-start, every 100ms record
  // what `document.querySelector("span.c-light-gray")?.innerText.replace("CP","")` yields.
  const url = arg || "https://www.gongzicp.com/novel-273600.html";
  const page = await browser.newPage();
  await page.addInitScript(() => {
    window.__probe = [];
    const t0 = performance.now();
    const timer = setInterval(() => {
      const el = document.querySelector("span.c-light-gray");
      const snap = {
        t: Math.round(performance.now() - t0),
        exists: !!el,
        innerText: el ? el.innerText : null,
        textContent: el ? el.textContent : null,
        readState: document.readyState,
      };
      const prev = window.__probe[window.__probe.length - 1];
      if (
        !prev ||
        prev.exists !== snap.exists ||
        prev.innerText !== snap.innerText
      ) {
        window.__probe.push(snap);
      }
      if (snap.t > 30000) clearInterval(timer);
    }, 100);
  });
  console.log(`Probing ${url} (fresh, cache disabled, slow network)...`);
  // Simulate a cold / slow load like a real user hit
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.5 * 1024 * 1024) / 8, // ~1.5 Mbps
    uploadThroughput: (750 * 1024) / 8,
  });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(32000);
  const probe = await page.evaluate(() => window.__probe);
  console.log(JSON.stringify(probe, null, 2));
  await page.close();
} else if (mode === "--multi") {
  const count = parseInt(arg || "5", 10);
  // 1. Collect novel links from homepage
  const home = await browser.newPage();
  console.log("Loading homepage for novel links...");
  await home.goto("https://www.gongzicp.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await home.waitForTimeout(6000);
  const links = await home.evaluate(() =>
    Array.from(new Set(
      Array.from(document.querySelectorAll("a[href*='novel-']"))
        .map((a) => a.href)
        .filter((h) => /\/novel-\d+\.html$/.test(h))
    )).slice(0, 12)
  );
  console.log("Found links:", links);
  await home.close();

  for (const url of links.slice(0, count)) {
    const data = await dumpPage(url);
    console.log(
      JSON.stringify({
        url,
        title: data.title,
        spans: data.cLightGraySpans.map((s) => ({
          innerText: s.innerText,
          parent: s.parent,
        })),
        complainOuter: data.complainOuter?.substring(0, 300),
      })
    );
  }
}

await browser.close();
