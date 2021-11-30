import * as FileSaver from "file-saver";
import { LocalStorageExpired } from "./lib/misc";
import { fetchAndParse, gfetchAndParse, parse } from "./lib/readability";
import { Book, Chapter } from "./main";
import { BaseRuleClass } from "./rules";
import { SaveOptions, SectionObj } from "./save/save";

export interface WindowObject extends Window {
  downloading: boolean;
  customStorage: LocalStorageExpired;
  stopFlag: boolean;
  _sections?: SectionObj[];
  _book?: Book;
}
export type GmWindow = WindowObject & typeof globalThis;

interface UnsafeWindowObject {
  rule?: BaseRuleClass;
  book?: Book;
  save?: (book: Book, saveOptions: SaveOptions) => void;
  saveAs?: typeof FileSaver;
  chapterFilter?: (chapter: Chapter) => boolean;
  customFinishCallback?: () => void;
  saveOptions?: SaveOptions;
  readability?: {
    parse: typeof parse;
    fetchAndParse: typeof fetchAndParse;
    gfetchAndParse: typeof gfetchAndParse;
  };
}
export type UnsafeWindow = UnsafeWindowObject & typeof globalThis;

export function init() {
  (window as GmWindow).downloading = false;
  (window as GmWindow).customStorage = new LocalStorageExpired();
  (window as GmWindow).stopFlag = false;
}
