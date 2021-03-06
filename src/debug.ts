import { saveAs } from "file-saver";
import { GmWindow, UnsafeWindow } from "./global";
import { getRule } from "./router/download";

export async function debug() {
  const rule = await getRule();
  let book;
  if (typeof (window as GmWindow)._book !== "undefined") {
    book = (window as GmWindow)._book;
  } else {
    book = await rule.bookParse();
  }
  (unsafeWindow as UnsafeWindow).rule = rule;
  (unsafeWindow as UnsafeWindow).book = book;
  (window as GmWindow)._book = book;

  (unsafeWindow as UnsafeWindow).saveAs = saveAs;
  const { parse, fetchAndParse, gfetchAndParse } = await import(
    "./lib/readability"
  );
  (unsafeWindow as UnsafeWindow).readability = {
    parse,
    fetchAndParse,
    gfetchAndParse,
  };

  (unsafeWindow as UnsafeWindow).stopController = (
    window as GmWindow
  ).stopController;
  return;
}
