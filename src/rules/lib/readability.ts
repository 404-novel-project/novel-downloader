import { Readability } from "@mozilla/readability";
import {
  getHtmlDOM,
  ggetHtmlDOM,
  gfetch_request_options,
} from "../../lib/http";

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

export function parse(
  doc: Document,
  options: ReadabilityOptions | undefined = undefined
) {
  return new Readability(doc, options).parse();
}

export async function fetchAndParse(
  url: string,
  charset: string | undefined,
  init: RequestInit | undefined = undefined,
  patch: (doc: Document) => Document = (doc) => doc,
  options: ReadabilityOptions | undefined = undefined
) {
  let doc = await getHtmlDOM(url, charset, init);
  doc = patch(doc);
  return parse(doc, options);
}

export async function gfetchAndParse(
  url: string,
  charset: string | undefined,
  init: gfetch_request_options | undefined = undefined,
  patch: (doc: Document) => Document = (doc) => doc,
  options: ReadabilityOptions | undefined = undefined
) {
  let doc = await ggetHtmlDOM(url, charset, init);
  doc = patch(doc);
  return parse(doc, options);
}
