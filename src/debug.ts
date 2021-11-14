import { getRule } from "./routers";
import { newUnsafeWindow } from "./global";

export async function debug() {
  const rule = await getRule();
  const book = await rule.bookParse();
  (<newUnsafeWindow>unsafeWindow).rule = rule;
  (<newUnsafeWindow>unsafeWindow).book = book;
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
