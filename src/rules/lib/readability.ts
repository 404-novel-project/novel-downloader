import { Readability } from "@mozilla/readability";
import { getHtmlDOM, ggetHtmlDOM, GfetchRequestOptions } from "../../lib/http";

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
  return new Readability(doc, options).parse();
}

export async function fetchAndParse(
  url: string,
  charset?: string,
  init?: RequestInit,
  patch: (doc: Document) => Document = (docm) => docm,
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
  init?: GfetchRequestOptions,
  patch: (doc: Document) => Document = (docm) => docm,
  options?: ReadabilityOptions
) {
  let doc = await ggetHtmlDOM(url, charset, init);
  if (typeof patch === "function") {
    doc = patch(doc);
  }
  return parse(doc, options);
}
