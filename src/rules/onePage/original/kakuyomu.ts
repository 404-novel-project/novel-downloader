import { mkRuleClass } from "../template";

// Define a type for elements that can be clicked
type ClickableElement = HTMLElement & { click: () => void };

// Function to handle clicking based on aria-describedby and span id
function clickButtonFromSpan(spanElements: NodeListOf<HTMLSpanElement>, targetText: string): void {
  spanElements.forEach(span => {
    if (span.textContent?.includes(targetText)) {
      const describedById = span.id;
      if (describedById) {
        const button = document.querySelector(`button[aria-describedby="${describedById}"]`) as ClickableElement | null;
        button?.click();
      }
    }
  });
}

// Function to handle clicking based on target text within a div inside a button
function clickButtonFromDiv(divElements: NodeListOf<HTMLDivElement>, targetText: string): void {
  divElements.forEach(div => {
    if (div.textContent?.includes(targetText)) {
      let parent: HTMLElement | null = div;
      while (parent && parent.nodeName !== 'BUTTON') {
        parent = parent.parentElement;
      }
      (parent as ClickableElement | null)?.click();
    }
  });
}

// Function to handle clicking a button with an SVG and H3, but only if the SVG lacks a specific class
function clickButtonWithSVGAndH3(buttons: NodeListOf<HTMLButtonElement>): void {
  buttons.forEach(button => {
    const svg = button.querySelector('svg[class^="Icons_icon"]') as SVGSVGElement | null;
    const h3 = button.querySelector('h3');
    if (svg && h3) {
      const hasFlipClass = Array.from(svg.classList).some(className => className.startsWith('Icons_flip'));
      if (!hasFlipClass) {
        button.click();
      }
    }
  });
}

// Gather all relevant elements
const spanElements = document.querySelectorAll<HTMLSpanElement>('span');
const divElements = document.querySelectorAll<HTMLDivElement>('div');
const buttons = document.querySelectorAll<HTMLButtonElement>('button[class^="Button_button"]');

// Execute each function with the appropriate elements and target text
clickButtonFromSpan(spanElements, "…続きを読む");
clickButtonFromDiv(divElements, "つづきを表示");
clickButtonWithSVGAndH3(buttons);

export const kakuyomu = () =>
  mkRuleClass({
    bookUrl: document.location.href,
    bookname: (
      document.querySelector("h1") as HTMLElement
    ).innerText.trim(),
    author: (
      document.querySelector(
        "div[class*=partialGiftWidgetActivityName] > a"
      ) as HTMLAnchorElement
    ).innerText.trim(),
    introDom: document.querySelector("div[class*=CollapseTextWithKakuyomuLinks]") as HTMLElement,
    introDomPatch: (dom) => dom,
    coverUrl: null,
    additionalMetadatePatch: (additionalMetadate) => {
      additionalMetadate.tags = Array.from(
        document.querySelectorAll("#workMeta-tags > li > a")
      ).map((a) => (a as HTMLAnchorElement).innerText);
      return additionalMetadate;
    },
    aList: document.querySelectorAll("a[class*=WorkTocSection_link]"),
    getAName: (aElem) =>
    (
      aElem.querySelector('div[class*="Typography"]') as HTMLElement
    ).innerText.trim(),
    sections: document.querySelectorAll("h3"),
    getSName: (dom) => (dom as HTMLElement).innerText.trim(),
    getContent: (dom) => dom.querySelector(".widget-episodeBody"),
    contentPatch: (dom) => dom,
    language: "ja",
  });

