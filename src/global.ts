import { saveAs } from "file-saver";
import { LocalStorageExpired } from "./lib/misc";
import { fetchAndParse, gfetchAndParse, parse } from "./lib/readability";
import { Book, Chapter } from "./main";
import { BaseRuleClass } from "./rules";
import { SectionObj } from "./save/misc";
import { SaveOptions } from "./save/save";

export interface WindowObject extends Window {
  workerId: string;
  downloading: boolean;
  customStorage: LocalStorageExpired;
  stopFlag: boolean;
  _sections?: SectionObj[];
  _book?: Book;
  _url?: string;
}
export type GmWindow = WindowObject & Window & typeof globalThis;

interface UnsafeWindowObject {
  rule?: BaseRuleClass;
  book?: Book;
  save?: (book: Book, saveOptions: SaveOptions) => void;
  saveAs?: typeof saveAs;
  chapterFilter?: (chapter: Chapter) => boolean;
  customFinishCallback?: () => void;
  saveOptions?: SaveOptions;
  readability?: {
    parse: typeof parse;
    fetchAndParse: typeof fetchAndParse;
    gfetchAndParse: typeof gfetchAndParse;
  };
}
export type UnsafeWindow = UnsafeWindowObject & Window & typeof globalThis;

export function init() {
  (window as GmWindow).workerId = Math.random().toString().replace("0.", "");
  (window as GmWindow).downloading = false;
  (window as GmWindow).customStorage = new LocalStorageExpired();
  (window as GmWindow).stopFlag = false;
}
