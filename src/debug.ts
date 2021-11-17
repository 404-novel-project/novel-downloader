import { getRule } from "./router/download";
import { newUnsafeWindow } from "./global";
import { saveAs } from "file-saver";

export async function debug() {
  const rule = await getRule();
  const book = await rule.bookParse();
  (<newUnsafeWindow>unsafeWindow).rule = rule;
  (<newUnsafeWindow>unsafeWindow).book = book;
  //@ts-ignore
  (<newUnsafeWindow>unsafeWindow).saveAs = saveAs;

  const { parse, fetchAndParse, gfetchAndParse } = await import(
    "./rules/lib/readability"
  );
  const readability = {
    parse: parse,
    fetchAndParse: fetchAndParse,
    gfetchAndParse: gfetchAndParse,
  };
  (<newUnsafeWindow>unsafeWindow).readability = readability;
  return;
}
