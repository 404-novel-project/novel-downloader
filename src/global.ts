import { localStorageExpired } from "./lib/misc";
import { Book, Chapter } from "./main";
import { BaseRuleClass } from "./rules";
import { saveOptions, sectionsObj } from "./save/save";
import { parse, fetchAndParse, gfetchAndParse } from "./rules/lib/readability";

export interface newWindow extends Window {
  downloading: boolean;
  customStorage: localStorageExpired;
  stopFlag: boolean;
  _sections: sectionsObj;
}

export interface newUnsafeWindow extends unsafeWindow {
  rule: BaseRuleClass;
  book: Book;
  save(book: Book, saveOptions: saveOptions): void;
  saveAs(obj: any): void;
  chapterFilter(chapter: Chapter): boolean;
  customFinishCallback(): void;
  enableDebug: boolean;
  saveOptions: saveOptions;
  readability: {
    parse: typeof parse;
    fetchAndParse: typeof fetchAndParse;
    gfetchAndParse: typeof gfetchAndParse;
  };
}

export function init() {
  (window as newWindow & typeof globalThis).downloading = false;
  (window as newWindow & typeof globalThis).customStorage =
    new localStorageExpired();
  (window as newWindow & typeof globalThis).stopFlag = false;
}
