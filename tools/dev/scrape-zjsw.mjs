import { chromium } from "playwright";

const url = process.argv[2] || "https://www.zjsw.org/read/135118/182028595.html";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const content = document.getElementById("content");
  const contentHTML = content?.innerHTML?.substring(0, 2000);

  // Get all links near content
  const allLinks = Array.from(document.querySelectorAll("a")).filter(a =>
    a.textContent?.includes("下一页") || a.textContent?.includes("下一章") ||
    a.textContent?.includes("上一页") || a.textContent?.includes("上一章")
  ).map(a => ({ text: a.textContent?.trim(), href: a.href, id: a.id, class: a.className }));

  // Get the h1 and surrounding structure
  const h1 = document.querySelector("h1");

  // Get the kfyd div structure
  const kfyd = document.querySelector(".kfyd");

  // Get breadcrumb
  const breadcrumb = document.querySelector(".path, .breadcrumb, .crumb, .navigation");

  // Check for multi-page content
  const pageSelect = document.querySelector("select[name='pages'], select#selectpage, .page-select select");

  return {
    contentHTML,
    navigationLinks: allLinks,
    h1Text: h1?.textContent?.trim(),
    h1Class: h1?.className,
    kfydHTML: kfyd?.innerHTML?.substring(0, 500),
    kfydClass: kfyd?.className,
    breadcrumbHTML: breadcrumb?.innerHTML?.substring(0, 500),
    pageSelectExists: !!pageSelect,
    pageSelectHTML: pageSelect?.outerHTML?.substring(0, 500),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
