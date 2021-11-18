import { getRule } from "./router/download";
import { NewUnsafeWindow } from "./global";
import { saveAs } from "file-saver";

export async function debug() {
  const rule = await getRule();
  const book = await rule.bookParse();
  (unsafeWindow as NewUnsafeWindow).rule = rule;
  (unsafeWindow as NewUnsafeWindow).book = book;
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
