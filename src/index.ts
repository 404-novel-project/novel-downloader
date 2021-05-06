import { getRule, ruleClass, icon0, icon1, enaleDebug } from "./rules";
import { Book, Chapter, attachmentClass, Status } from "./main";
import { concurrencyRun, _GM_info, console_debug } from "./lib";
import {
  setTabMark,
  getNowRunNumber,
  save,
  removeTabMark,
  progressStyleText,
} from "./index_helper";

export namespace indexNameSpace {
  export interface mainWindows extends unsafeWindow {
    rule: ruleClass;
    book: Book;
    save(book: Book): void;
    saveAs(obj: any): void;
  }

  export interface mainTabObject extends GM_tab_object {
    novel_downloader?: string;
  }
}

function printEnvironments() {
  if (_GM_info) {
    console.log(
      `开始载入小说下载器……
当前浏览器UA：${navigator.userAgent}
当前脚本管理器：${_GM_info.scriptHandler}
当前脚本管理器版本：${_GM_info.version}
当前脚本名称：${_GM_info.script.name}
当前脚本版本：${_GM_info.script.version}
当前脚本最后更新时间：${_GM_info.script.lastModified}
是否处于隐私模式：${_GM_info.isIncognito}
是否启用调试：${enaleDebug}`
    );
  }
}

async function initBook(rule: ruleClass) {
  console.log(`[initBook]开始初始化图书`);
  const bookParse = rule.bookParse;
  const chapterParse = rule.chapterParse;
  return bookParse(chapterParse).then((obj) => {
    const {
      bookUrl,
      bookname,
      author,
      introduction,
      additionalMetadate,
      chapters,
    } = obj;
    const book = new Book(
      bookUrl,
      bookname,
      author,
      introduction,
      additionalMetadate,
      chapters
    );
    return book;
  });
}

async function initChapters(rule: ruleClass, book: Book) {
  console.log(`[initChapters]开始初始化章节`);
  let concurrencyLimit = 10;
  if (rule.concurrencyLimit !== undefined) {
    concurrencyLimit = rule.concurrencyLimit;
  }

  const chapters = book.chapters.filter(
    (chapter) => chapter.status === Status.pending
  );
  if (chapters.length === 0) {
    console.error(`[initChapters]初始化章节出错，未找到需初始化章节`);
    return [];
  }
  if (concurrencyLimit === 1) {
    for (let chapter of chapters) {
      const obj = await chapter.init();
      if (obj.contentHTML !== undefined) {
        finishedChapterNumber++;
        updateProgress(finishedChapterNumber, totalChapterNumber, null);
      }
    }
  } else {
    await concurrencyRun(chapters, concurrencyLimit, (curChapter: Chapter) => {
      if (curChapter === undefined) {
        return Promise.resolve();
      }
      return curChapter.init().then((obj) => {
        if (obj.contentHTML !== undefined) {
          finishedChapterNumber++;
          updateProgress(finishedChapterNumber, totalChapterNumber, null);
        }
        return obj;
      });
    });
  }
  console.log(`[initChapters]章节初始化完毕`);
  return chapters;
}

let totalChapterNumber: number;
let finishedChapterNumber = 0;
export function updateProgress(
  finishedChapterNumber: number,
  totalChapterNumber: number,
  zipPercent: number | null
) {
  if (!document.querySelector("#nd-progress")) {
    console_debug("[progress]初始化进度条");
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
  console.log(`[run]下载开始`);
  audio.play();
  const rule = await getRule();
  console.log(`[run]获取规则成功`);

  console_debug("[run]运行前检测");
  let maxRunLimit = null;
  let nowRunNumber;
  if (typeof GM_getTab !== "undefined") {
    console.log(`[run]添加运行标志`);
    await setTabMark();
    nowRunNumber = await getNowRunNumber();
    if (rule.maxRunLimit !== undefined && nowRunNumber !== undefined) {
      maxRunLimit = rule.maxRunLimit;
      if (nowRunNumber > maxRunLimit) {
        const alertText = `当前网站目前已有${
          nowRunNumber - 1
        }个下载任务正在运行，当前站点最多允许${maxRunLimit}下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
        alert(alertText);
        console.log(`[run]${alertText}`);
        return;
      }
    }
  }

  console_debug("[run]主体开始");
  const book = await initBook(rule);

  totalChapterNumber = book.chapters.filter(
    (chapter) => chapter.status === Status.pending
  ).length;
  await initChapters(rule, book);
  save(book);

  console_debug("[run]收尾");
  if (typeof GM_getTab !== "undefined") {
    console.log(`[run]移除运行标志`);
    await removeTabMark();
  }

  console.log(`[run]下载完毕`);
  return book;
}

export function catchError(error: Error) {
  downloading = false;
  attachmentClassCache = [];
  if (typeof GM_getTab !== "undefined") {
    removeTabMark();
  }
  finishedChapterNumber = 0;
  document.querySelector("#nd-progress")?.remove();
  document.getElementById("novel-downloader")?.remove();
  console.error(
    "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader"
  );
  console.error(error);
  audio.pause();
}

function addButton() {
  let button = document.createElement("button");
  button.id = "novel-downloader";
  button.style.cssText = `position: fixed; top: 15%; right: 5%; z-index: 2147483647; border-style: none; text-align:center; vertical-align:baseline; background-color: rgba(128, 128, 128, 0.2); padding: 5px; border-radius: 12px;`;

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
            attachmentClassCache = [];
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
  const book = await initBook(rule);
  (<indexNameSpace.mainWindows>unsafeWindow).rule = rule;
  (<indexNameSpace.mainWindows>unsafeWindow).book = book;
  (<indexNameSpace.mainWindows>unsafeWindow).save = save;
  (<indexNameSpace.mainWindows>unsafeWindow).saveAs = saveAs;
  return;
}

let downloading = false;
export let attachmentClassCache: attachmentClass[] = [];
// 无声音频，保持后台运行
export const audio = new Audio(
  "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjcxLjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhoaGvr6+vr6+8vLy8vLzKysrKysrX19fX19fX5eXl5eXl8vLy8vLy////////AAAAAExhdmM1Ny44OQAAAAAAAAAAAAAAACQCgAAAAAAAAAVY82AhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAALACwAAP/AADwQKVE9YWDGPkQWpT66yk4+zIiYPoTUaT3tnU487uNhOvEmQDaCm1Yz1c6DPjbs6zdZVBk0pdGpMzxF/+MYxA8L0DU0AP+0ANkwmYaAMkOKDDjmYoMtwNMyDxMzDHE/MEsLow9AtDnBlQgDhTx+Eye0GgMHoCyDC8gUswJcMVMABBGj/+MYxBoK4DVpQP8iAtVmDk7LPgi8wvDzI4/MWAwK1T7rxOQwtsItMMQBazAowc4wZMC5MF4AeQAGDpruNuMEzyfjLBJhACU+/+MYxCkJ4DVcAP8MAO9J9THVg6oxRMGNMIqCCTAEwzwwBkINOPAs/iwjgBnMepYyId0PhWo+80PXMVsBFzD/AiwwfcKGMEJB/+MYxDwKKDVkAP8eAF8wMwIxMlpU/OaDPLpNKkEw4dRoBh6qP2FC8jCJQFcweQIPMHOBtTBoAVcwOoCNMYDI0u0Dd8ANTIsy/+MYxE4KUDVsAP8eAFBVpgVVPjdGeTEWQr0wdcDtMCeBgDBkgRgwFYB7Pv/zqx0yQQMCCgKNgonHKj6RRVkxM0GwML0AhDAN/+MYxF8KCDVwAP8MAIHZMDDA3DArAQo3K+TF5WOBDQw0lgcKQUJxhT5sxRcwQQI+EIPWMA7AVBoTABgTgzfBN+ajn3c0lZMe/+MYxHEJyDV0AP7MAA4eEwsqP/PDmzC/gNcwXUGaMBVBIwMEsmB6gaxhVuGkpoqMZMQjooTBwM0+S8FTMC0BcjBTgPwwOQDm/+MYxIQKKDV4AP8WADAzAKQwI4CGPhWOEwCFAiBAYQnQMT+uwXUeGzjBWQVkwTcENMBzA2zAGgFEJfSPkPSZzPXgqFy2h0xB/+MYxJYJCDV8AP7WAE0+7kK7MQrATDAvQRIwOADKMBuA9TAYQNM3AiOSPjGxowgHMKFGcBNMQU1FMy45OS41VVU/31eYM4sK/+MYxKwJaDV8AP7SAI4y1Yq0MmOIADGwBZwwlgIJMztCM0qU5TQPG/MSkn8yEROzCdAxECVMQU1FMy45OS41VTe7Ohk+Pqcx/+MYxMEJMDWAAP6MADVLDFUx+4J6Mq7NsjN2zXo8V5fjVJCXNOhwM0vTCDAxFpMYYQU+RlVMQU1FMy45OS41VVVVVVVVVVVV/+MYxNcJADWAAP7EAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOsJwDWEAP7SAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPMLoDV8AP+eAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPQL0DVcAP+0AFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
);
audio.loop = true;

window.addEventListener("DOMContentLoaded", () => {
  if (_GM_info.scriptHandler === "Greasemonkey") {
    console.error(
      "小说下载器脚本与Greasemonkey脚本管理器不兼容，请改用其它脚本管理器，如：Tampermonkey、Violentmonkey。"
    );
    alert(
      "小说下载器脚本与Greasemonkey脚本管理器不兼容，请改用其它脚本管理器，如：Tampermonkey、Violentmonkey。"
    );
    return;
  }
  printEnvironments();
  addButton();

  if (enaleDebug) {
    debug();
  }
});
