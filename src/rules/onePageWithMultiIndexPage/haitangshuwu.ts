import { mkRuleClass } from "./template";
import { nextPageParse } from "../../lib/rule";
import { rm } from "../../lib/dom";
import { getHtmlDOM } from "../../lib/http";

export const haitangshuwu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (document.querySelector("h2") as HTMLElement)?.innerText.trim(),
    author:
      (
        document.querySelector("div.block_txt2 > p:nth-of-type(3) > a") as HTMLAnchorElement
      )?.innerText.trim() || "未知",
    introDom: document.querySelector("div.intro_info") as HTMLElement,
    introDomPatch: (introDom) => introDom,
    coverUrl:
      (document.querySelector("div.block_img2 > img") as HTMLImageElement)?.src || null,
    getIndexUrls: async () => {
      try {
        // Get the chapter list page URL
        const chapterListLink = document.querySelector(
          "a.chapterlist",
        ) as HTMLAnchorElement;
        
        let firstPageUrl = chapterListLink?.href;
        
        // Alternative approach: Use JavaScript to find links containing "目录" text
        if (!firstPageUrl) {
          const allLinks = Array.from(document.querySelectorAll('a'));
          const catalogLink = allLinks.find(link => 
            link.textContent?.includes('目录') || 
            link.textContent?.includes('章节') ||
            link.textContent?.includes('小说目录')
          ) as HTMLAnchorElement;
          
          firstPageUrl = catalogLink?.href;
        }
        
        if (!firstPageUrl) {
          return [];
        }
        
        // Fetch the first chapter list page to find total pages
        const doc = await getHtmlDOM(firstPageUrl, document.characterSet);
        
        // Find the "尾页" (last page) link to get total page count
        const pageLinks = Array.from(doc.querySelectorAll('div.page a'));
        const lastPageLink = pageLinks.find(link => 
          link.textContent?.trim() === '尾页'
        ) as HTMLAnchorElement;
        
        if (!lastPageLink) {
          // No pagination found, return single page
          return [firstPageUrl];
        }
        
        // Extract total page number from "尾页" link
        // URL pattern: /116/116487_26/ -> extract 26
        const lastPageUrl = lastPageLink.href;
        const pageMatch = lastPageUrl.match(/_(\d+)\/$/);
        
        if (!pageMatch) {
          // Could not parse page number, return single page
          return [firstPageUrl];
        }
        
        const totalPages = parseInt(pageMatch[1], 10);
        
        if (isNaN(totalPages) || totalPages < 1) {
          return [firstPageUrl];
        }
        
        // Generate all page URLs using the discovered pattern
        // Extract base URL pattern from first page URL
        const baseUrlMatch = firstPageUrl.match(/^(.+)_1\/$/);
        
        if (!baseUrlMatch) {
          // Could not parse base URL pattern, return single page
          return [firstPageUrl];
        }
        
        const baseUrl = baseUrlMatch[1];
        
        // Generate URLs for all pages
        const allPageUrls: string[] = [];
        for (let page = 1; page <= totalPages; page++) {
          allPageUrls.push(`${baseUrl}_${page}/`);
        }
        
        return allPageUrls;
        
      } catch (error) {
        // If anything fails, fallback to single page
        console.warn("Failed to fetch pagination for haitangshuwu:", error);
        
        // Try to get at least the first page URL for fallback
        const chapterListLink = document.querySelector(
          "a.chapterlist",
        ) as HTMLAnchorElement;
        
        if (chapterListLink) {
          return [chapterListLink.href];
        }
        
        // Last resort: try to find any chapter list link
        const allLinks = Array.from(document.querySelectorAll('a'));
        const catalogLink = allLinks.find(link => 
          link.textContent?.includes('目录') || 
          link.textContent?.includes('章节') ||
          link.textContent?.includes('小说目录')
        ) as HTMLAnchorElement;
        
        return catalogLink ? [catalogLink.href] : [];
      }
    },
    // Get chapters from the separate chapter list page
    getAList: (doc) => doc.querySelectorAll('ul.chapter > li > a:has(span)'),
    getContent: (doc) => doc.querySelector("#nr1") as HTMLElement,
    contentPatch: (content) => content,
    // concurrencyLimit: 3,
    // sleepTime: 1000,
    language: "zh",
  });
