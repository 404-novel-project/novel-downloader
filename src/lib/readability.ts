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
  return obj;
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
