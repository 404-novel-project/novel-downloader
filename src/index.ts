import {
  getRule,
  ruleClass,
  icon0,
  icon1,
  enaleDebug,
  enableCustomChapterFilter,
  enableCustomSaveOptions,
  r18SiteList,
  enableR18SiteWarning,
} from "./rules";
import { Book, Chapter, attachmentClass, Status, ExpectError } from "./main";
import {
  clearAttachmentClassCache,
  concurrencyRun,
  _GM_deleteValue,
  _GM_getValue,
  _GM_info,
  _GM_setValue,
} from "./lib";
import {
  setTabMark,
  getNowRunNumber,
  removeTabMark,
  progressStyleText,
  buttonStyleText,
  saveOptions,
  saveOptionsValidate,
  r18SiteWarning,
  getSaveBookObj,
  saveBook,
  audio,
} from "./index_helper";
import { log, saveLogTextToFile } from "./log";

export namespace indexNameSpace {
  export interface mainWindows extends unsafeWindow {
    rule: ruleClass;
    book: Book;
    save(book: Book, saveOptions: saveOptions): void;
    saveAs(obj: any): void;
    chapterFilter(chapter: Chapter): boolean;
    customFinishCallback(): void;
    saveOptions: saveOptions;
  }

  export interface mainTabObject extends GM_tab_object {
    novel_downloader?: string;
  }
}

function printEnvironments() {
  if (_GM_info) {
    log.info(
      `开始载入小说下载器……
当前浏览器UA：${navigator.userAgent}
当前脚本管理器：${_GM_info.scriptHandler}
当前脚本管理器版本：${_GM_info.version}
当前脚本名称：${_GM_info.script.name}
当前脚本版本：${_GM_info.script.version}
当前脚本最后更新时间：${_GM_info.script.lastModified}
是否处于隐私模式：${_GM_info.isIncognito}
是否启用调试：${enaleDebug}
当前地址：${document.location.href}
当前时间：${new Date().toISOString()}`
    );
  }
}

async function initChapters(
  rule: ruleClass,
  book: Book,
  saveBookObj: saveBook
) {
  log.info(`[initChapters]开始初始化章节`);
  let concurrencyLimit = 10;
  if (rule.concurrencyLimit !== undefined) {
    concurrencyLimit = rule.concurrencyLimit;
  }

  const chapters = getChapters();
  if (chapters.length === 0) {
    log.error(`[initChapters]初始化章节出错，未找到需初始化章节`);
    return [];
  }
  totalChapterNumber = chapters.length;

  if (concurrencyLimit === 1) {
    for (let chapter of chapters) {
      const obj = await chapter.init();
      afterGetChpater(obj);
    }
  } else {
    await concurrencyRun(chapters, concurrencyLimit, (curChapter: Chapter) => {
      if (curChapter === undefined) {
        return Promise.resolve();
      }
      return curChapter.init().then((obj) => {
        afterGetChpater(obj);
      });
    });
  }

  log.info(`[initChapters]章节初始化完毕`);
  return chapters;

  function afterGetChpater(chapter: Chapter) {
    if (chapter.contentHTML !== undefined) {
      saveBookObj.addChapter(chapter);
      finishedChapterNumber++;
      updateProgress(finishedChapterNumber, totalChapterNumber, null);
    }
    return chapter;
  }

  function getChapters() {
    if (
      enableCustomChapterFilter &&
      typeof (<any>unsafeWindow).chapterFilter === "function"
    ) {
      let tlog = "[initChapters]发现自定义筛选函数，自定义筛选函数内容如下：\n";
      tlog += (<indexNameSpace.mainWindows>(
        unsafeWindow
      )).chapterFilter.toString();
      log.info(tlog);
    }

    log.debug("[initChapters]筛选需下载章节");
    const chapters = book.chapters.filter((chapter) => {
      const b0 = chapter.status === Status.pending;
      let b1 = true;
      if (
        enableCustomChapterFilter &&
        typeof (<any>unsafeWindow).chapterFilter === "function"
      ) {
        try {
          const u = (<indexNameSpace.mainWindows>unsafeWindow).chapterFilter(
            chapter
          );
          if (typeof u === "boolean") {
            b1 = u;
          }
        } catch (error) {
          log.error("运行自定义筛选函数时出错。", error);
          log.trace(error);
        }
      }
      return b0 && b1;
    });
    return chapters;
  }
}

let totalChapterNumber: number;
let finishedChapterNumber = 0;
export function updateProgress(
  finishedChapterNumber: number,
  totalChapterNumber: number,
  zipPercent: number | null
) {
  if (!document.querySelector("#nd-progress")) {
    log.debug("[progress]初始化进度条");
    let progress = document.createElement("div");
    progress.id = "nd-progress";
    progress.innerHTML = `
        <div id='chapter-progress' title="章节"></div>
        <div id='zip-progress' title="ZIP"></div>
        `;
    let progressStyle = document.createElement("style");
    progressStyle.innerHTML = progressStyleText;
    document.head.appendChild(progressStyle);
    document.body.appendChild(progress);
  }

  let pagePercent = `${(finishedChapterNumber / totalChapterNumber) * 100}%`;
  (document.querySelector(
    "#chapter-progress"
  ) as HTMLDivElement).style.cssText = `--position:${pagePercent};`;

  if (zipPercent) {
    (document.querySelector(
      "#zip-progress"
    ) as HTMLDivElement).style.cssText = `--position:${zipPercent}%;`;
  } else {
    (document.querySelector("#zip-progress") as HTMLDivElement).style.cssText =
      "display:none;";
  }
}

async function run() {
  log.info(`[run]下载开始`);
  audio.play();
  const rule = await getRule();
  log.info(`[run]获取规则成功`);

  if (await preTest()) {
    return;
  }

  log.debug("[run]主体开始");
  const book = await rule.bookParse();
  const saveBookObj = getSave(book);
  await initChapters(rule, book, saveBookObj);

  log.debug("[run]开始保存文件");
  saveBookObj.saveTxt();
  saveBookObj.saveZip(false);

  log.debug("[run]收尾");
  if (typeof GM_getTab !== "undefined") {
    log.info(`[run]移除运行标志`);
    await removeTabMark();
  }

  log.info(`[run]下载完毕`);
  return book;

  async function preTest() {
    log.debug("[run]运行前检测");
    let maxRunLimit = null;
    let nowRunNumber;
    if (typeof GM_getTab !== "undefined") {
      log.info(`[run]添加运行标志`);
      await setTabMark();
      nowRunNumber = await getNowRunNumber();
      if (rule.maxRunLimit !== undefined && nowRunNumber !== undefined) {
        maxRunLimit = rule.maxRunLimit;
        if (nowRunNumber > maxRunLimit) {
          const alertText = `当前网站目前已有${
            nowRunNumber - 1
          }个下载任务正在运行，当前站点最多允许${maxRunLimit}下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
          alert(alertText);
          log.info(`[run]${alertText}`);
          return true;
        }
      }
    }
    return false;
  }

  function getSave(book: Book) {
    log.debug("[run]保存数据");
    if (
      enableCustomSaveOptions &&
      typeof (<any>unsafeWindow).saveOptions === "object" &&
      saveOptionsValidate((<any>unsafeWindow).saveOptions)
    ) {
      const saveOptions = (<indexNameSpace.mainWindows>unsafeWindow)
        .saveOptions;
      log.info("[run]发现自定义保存参数，内容如下\n", saveOptions);
      return getSaveBookObj(book, saveOptions);
    } else {
      return getSaveBookObj(book, {});
    }
  }
}

export function catchError(error: Error) {
  downloading = false;
  clearAttachmentClassCache();
  if (typeof GM_getTab !== "undefined") {
    removeTabMark();
  }
  finishedChapterNumber = 0;
  document.querySelector("#nd-progress")?.remove();
  audio.pause();

  if (error instanceof ExpectError) {
    log.error(error);
    log.trace(error);
    return;
  }

  document.getElementById("novel-downloader")?.remove();
  log.error(
    "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader"
  );
  log.error(error);
  log.trace(error);

  if (_GM_setValue && _GM_getValue && _GM_deleteValue) {
    import("./stat").then((stat) => {
      stat.failedPlus();
    });
  }

  alert(
    "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader"
  );
  saveLogTextToFile();
}

function addButton() {
  let button = document.createElement("button");
  button.id = "novel-downloader";
  button.style.cssText = buttonStyleText;

  let img = document.createElement("img");
  img.src = icon0;
  img.style.cssText = "height: 2em;";

  button.onclick = function () {
    if (downloading) {
      alert("正在下载中，请耐心等待……");
    } else {
      downloading = true;
      img.src = icon1;
      try {
        run()
          .then((book) => {
            downloading = false;
            finishedChapterNumber = 0;
            clearAttachmentClassCache();
            img.src = icon0;
          })
          .catch(catchError);
      } catch (error) {
        catchError(error);
      }
    }
  };
  button.appendChild(img);
  document.body.appendChild(button);
}

async function debug() {
  const rule = await getRule();
  const book = await rule.bookParse();
  (<indexNameSpace.mainWindows>unsafeWindow).rule = rule;
  (<indexNameSpace.mainWindows>unsafeWindow).book = book;
  (<indexNameSpace.mainWindows>unsafeWindow).saveAs = saveAs;
  return;
}

let downloading = false;

window.addEventListener("DOMContentLoaded", () => {
  if (enableR18SiteWarning && r18SiteList.includes(document.location.host)) {
    const c = r18SiteWarning();
    if (!c) {
      return;
    }
  }

  printEnvironments();
  addButton();

  if (enaleDebug) {
    debug();
  }
});
