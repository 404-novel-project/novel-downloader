import { saveAs } from "file-saver";
import { NewUnsafeWindow, NewWindow } from "./global";
import { getRule } from "./router/download";

export async function debug() {
  const rule = await getRule();
  const book = await rule.bookParse();
  (unsafeWindow as NewUnsafeWindow).rule = rule;
  (unsafeWindow as NewUnsafeWindow).book = book;
  (window as NewWindow & typeof globalThis)._book = book;
  // @ts-ignore
  (unsafeWindow as NewUnsafeWindow).saveAs = saveAs;

  const { parse, fetchAndParse, gfetchAndParse } = await import(
    "./rules/lib/readability"
  );
  const readability = {
    parse,
    fetchAndParse,
    gfetchAndParse,
  };
  (unsafeWindow as NewUnsafeWindow).readability = readability;
  return;
}
