import { saveAs } from "file-saver";
import { LocalStorageExpired } from "./lib/misc";
import { Book, Chapter } from "./main";
import { BaseRuleClass } from "./rules";
import { fetchAndParse, gfetchAndParse, parse } from "./rules/lib/readability";
import { SaveOptions, SectionObj } from "./save/save";

export interface NewWindow extends Window {
  downloading: boolean;
  customStorage: LocalStorageExpired;
  stopFlag: boolean;
  _sections: SectionObj[];
}

export interface NewUnsafeWindow extends unsafeWindow {
  rule: BaseRuleClass;
  book: Book;
  save(book: Book, saveOptions: SaveOptions): void;
  saveAs(obj: any): typeof saveAs;
  chapterFilter?: (chapter: Chapter) => boolean;
  customFinishCallback(): void;
  enableDebug: boolean;
  saveOptions: SaveOptions;
  readability: {
    parse: typeof parse;
    fetchAndParse: typeof fetchAndParse;
    gfetchAndParse: typeof gfetchAndParse;
  };
}

export function init() {
  (window as NewWindow & typeof globalThis).downloading = false;
  (window as NewWindow & typeof globalThis).customStorage =
    new LocalStorageExpired();
  (window as NewWindow & typeof globalThis).stopFlag = false;
}
