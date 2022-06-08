import { Readability } from "@mozilla/readability";
import { createEl } from "./dom";
import { getHtmlDOM, GfetchRequestInit, ggetHtmlDOM } from "./http";

interface ReadabilityOptions {
  debug?: boolean;
  maxElemsToParse?: number;
  nbTopCandidates?: number;
  charThreshold?: number;
  classesToPreserve?: string[];
  keepClasses?: boolean;
  serializer?: (node: Node) => string | Element;
  disableJSONLD?: boolean;
}

export function parse(doc: Document, options?: ReadabilityOptions) {
  const obj = new Readability(doc, options).parse();
  if (obj) {
    if (typeof obj.content === "string") {
      obj.content = createEl(obj.content);
    }
  }
  return obj as null | {
    /** article title */
    title: string;
    /** author metadata */
    byline: string;
    /** content direction */
    dir: string;
    /** HTML of processed article content */
    content: HTMLElement;
    /** text content of the article (all HTML removed) */
    textContent: string;
    /** length of an article, in characters */
    length: number;
    /** article description, or short excerpt from the content */
    excerpt: string;
    siteName: string;
  };
}

export async function fetchAndParse(
  url: string,
  charset?: string,
  init?: RequestInit,
  patch?: (doc: Document) => Document,
  options?: ReadabilityOptions
) {
  let doc = await getHtmlDOM(url, charset, init);
  if (typeof patch === "function") {
    doc = patch(doc);
  }
  return parse(doc, options);
}

export async function gfetchAndParse(
  url: string,
  charset?: string,
  init?: GfetchRequestInit,
  patch?: (doc: Document) => Document,
  options?: ReadabilityOptions
) {
  let doc = await ggetHtmlDOM(url, charset, init);
  if (typeof patch === "function") {
    doc = patch(doc);
  }
  return parse(doc, options);
}
