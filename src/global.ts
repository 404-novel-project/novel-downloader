import { localStorageExpired } from "./lib/misc";
import { Book, Chapter } from "./main";
import { BaseRuleClass } from "./rules";
import { saveOptions } from "./save/save";
import { parse, fetchAndParse, gfetchAndParse } from "./rules/lib/readability";
class Progress {
  private _totalChapterNumber: number;
  private _finishedChapterNumber: number;
  private _zipPercent: number;
  private progressStyleText: string;

  constructor() {
    this._totalChapterNumber = 0;
    this._finishedChapterNumber = 0;
    this._zipPercent = 0;

    this.progressStyleText = `#nd-progress {
        position: fixed;
        bottom: 8%;
        right: 3%;
        z-index: 2147483647;
        border-style: none;
        text-align: center;
        vertical-align: baseline;
        background-color: rgba(210, 210, 210, 0.2);
        padding: 6px;
        border-radius: 12px;
        display: none;
      }
      #chapter-progress{
        --color:green;
        --position:0%;
        width:200px;
        height:10px;
        border-radius:30px;
        background-color:#ccc;
        background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));
        background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));
        background-size:100% ,var(--position);
        background-repeat: no-repeat;
        display: none;
      }
      #zip-progress{
        --color:yellow;
        --position:0%;
        width:200px;
        height:10px;
        border-radius:30px;
        background-color:#ccc;
        background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));
        background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));
        background-size:100% ,var(--position);
        background-repeat: no-repeat;
        margin-top: 5px;
        display: none;
      }`;

    if (!document.getElementById("nd-progress")) {
      let progress = document.createElement("div");
      progress.id = "nd-progress";
      progress.innerHTML = `
            <div id='chapter-progress' title="章节"></div>
            <div id='zip-progress' title="ZIP"></div>
            `;
      let progressStyle = document.createElement("style");
      progressStyle.innerHTML = this.progressStyleText;
      document.head.appendChild(progressStyle);
      document.body.appendChild(progress);
    }
  }

  set totalChapterNumber(newTotalChapterNumber: number) {
    this._totalChapterNumber = newTotalChapterNumber;
    const elem = document.getElementById("nd-progress");
    if (elem) {
      if (newTotalChapterNumber === 0) {
        elem.style.cssText = "";
      } else {
        elem.style.cssText = "display: block;";
      }
    }
  }

  get totalChapterNumber(): number {
    return this._totalChapterNumber;
  }

  set finishedChapterNumber(newFinishedChapterNumber: number) {
    this._finishedChapterNumber = newFinishedChapterNumber;
    if (this._totalChapterNumber != 0) {
      const percent =
        (this._finishedChapterNumber / this._totalChapterNumber) * 100;
      const elem = document.getElementById("chapter-progress");
      if (elem) {
        if (newFinishedChapterNumber === 0) {
          elem.style.cssText = "";
          elem.title = "";
        } else {
          elem.style.cssText = `--position:${percent}%; display: block;`;
          elem.title = `${this._finishedChapterNumber}/${this._totalChapterNumber}`;
        }
      }
    }
  }

  get finishedChapterNumber(): number {
    return this._finishedChapterNumber;
  }

  set zipPercent(newZipPercent: number) {
    this._zipPercent = newZipPercent;
    const elem = document.getElementById("zip-progress");
    if (elem) {
      if (newZipPercent === 0) {
        elem.style.cssText = "";
      } else {
        elem.style.cssText = `--position:${this._zipPercent}%; display: block;`;
      }
    }
  }

  get zipPercent(): number {
    return this._zipPercent;
  }

  reset() {
    const elem = document.getElementById("nd-progress");
    if (elem) {
      elem.style.cssText = "";
    }
    this.totalChapterNumber = 0;
    this.finishedChapterNumber = 0;
    this.zipPercent = 0;
  }
}

export interface newWindow extends Window {
  progress: Progress | undefined;
  downloading: boolean;
  customStorage: localStorageExpired;
  stopFlag: boolean;
}

export interface newUnsafeWindow extends unsafeWindow {
  rule: BaseRuleClass;
  book: Book;
  save(book: Book, saveOptions: saveOptions): void;
  saveAs(obj: any): void;
  chapterFilter(chapter: Chapter): boolean;
  customFinishCallback(): void;
  saveOptions: saveOptions;
  readability: {
    parse: typeof parse;
    fetchAndParse: typeof fetchAndParse;
    gfetchAndParse: typeof gfetchAndParse;
  };
}

export function init() {
  (window as newWindow & typeof globalThis).progress = new Progress();
  (window as newWindow & typeof globalThis).downloading = false;
  (window as newWindow & typeof globalThis).customStorage =
    new localStorageExpired();
  (window as newWindow & typeof globalThis).stopFlag = false;
}
