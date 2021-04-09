import { getRule, ruleClass, icon0, icon1 } from "./rules";
import { Book, Chapter, ImageClass } from "./main";
import { concurrencyRun } from "./lib";

namespace main {
  export interface mainWindows extends unsafeWindow {
    rule: ruleClass;
    book: Book;
    save(book: Book): void;
  }

  export interface mainTabObject extends GM_tab_object {
    novel_downloader?: string;
  }
}

function printEnvironments() {
  console.log(
    `开始载入小说下载器……
当前浏览器UA：${navigator.userAgent}
当前脚本管理器：${GM_info.scriptHandler}
当前脚本管理器版本：${GM_info.version}
当前脚本名称：${GM_info.script.name}
当前脚本版本：${GM_info.script.version}
当前脚本最后更新时间：${GM_info.script.lastModified}
是否处于隐私模式：${GM_info.isIncognito}
是否启用调试：${enaleDebug}`
  );
}

async function initBook(rule: ruleClass) {
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
  let concurrencyLimit = 10;
  if (rule.concurrencyLimit !== undefined) {
    concurrencyLimit = rule.concurrencyLimit;
  }

  const chapters = book.chapters;
  if (concurrencyLimit === 1) {
    for (let chapter of chapters) {
      await chapter.init();
    }
  } else {
    await concurrencyRun(chapters, concurrencyLimit, (curChapter: Chapter) => {
      return curChapter.init();
    });
  }
  return chapters;
}

type JSZip = any;
declare let JSZip: JSZip;
function save(book: Book) {
  function chapterSort(a: Chapter, b: Chapter) {
    if (a.chapterNumber > b.chapterNumber) {
      return 1;
    }
    if ((a.chapterNumber = b.chapterNumber)) {
      return 0;
    }
    if (a.chapterNumber < b.chapterNumber) {
      return -1;
    }
    return 0;
  }

  function addImageToZip(image: ImageClass, zip: JSZip) {
    zip.file(image.name, image.imageBlob);
  }

  function genSectionText(sectionName: string) {
    return `${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}`;
  }

  function genChapterText(chapterName: string, contentText: string) {
    return `## ${chapterName}\n\n${contentText}\n\n`;
  }

  function genSectionHtmlFile(sectionName: string) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${sectionName}</title></head><body><h1>${sectionName}</h2></body></html>`,
      "text/html"
    );
    return new Blob([htmlFile.documentElement.outerHTML], {
      type: "text/html; charset=UTF-8",
    });
  }

  function genHtmlFile(chapterName: string, DOM: HTMLElement) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${chapterName}</title></head><body><h2>${chapterName}</h2></body></html>`,
      "text/html"
    );
    htmlFile.querySelector("body")?.appendChild(DOM);
    return new Blob([htmlFile.documentElement.outerHTML], {
      type: "text/html; charset=UTF-8",
    });
  }

  const chapters = book.chapters;
  chapters.sort(chapterSort);

  let savedTextArray = [];
  let savedZip = new JSZip();

  let infoText = `题名：${book.bookname}\n作者：${book.author}\n简介：${
    book.introduction
  }\n来源：${
    book.bookUrl
  }\n下载时间：${new Date().toISOString()}\n本文件由小说下载器生成，软件地址：https://github.com/yingziwu/novel-downloader\n\n`;
  savedTextArray.push(infoText);
  if (book.additionalMetadate.cover) {
    const cover = book.additionalMetadate.cover;
    savedZip.file(
      `cover.${cover.imageBlob.type.split("/").slice(-1)[0]}`,
      cover.imageBlob
    );
  }
  savedZip.file(
    "info.txt",
    new Blob([infoText], { type: "text/plain;charset=utf-8" })
  );

  let preSectionName: string | null = "";
  for (const c of chapters) {
    const sectionName = c.sectionName;
    const chapterName = c.chapterName
      ? c.chapterName
      : c.chapterNumber.toString();
    const contentText = c.contentText;
    const contentHTML = c.contentHTML;
    const contentImages = c.contentImages;

    const fileNameBase = `${"0".repeat(
      chapters.length.toString().length - c.chapterNumber.toString().length
    )}${c.chapterNumber.toString()}.html`;

    if (sectionName && contentText && sectionName !== preSectionName) {
      savedTextArray.push(genSectionText(sectionName));
      savedZip.file(`Section${fileNameBase}`, genSectionHtmlFile(sectionName));
    }
    preSectionName = sectionName;

    if (contentText) {
      savedTextArray.push(genChapterText(chapterName, contentText));
    }

    if (contentHTML) {
      savedZip.file(
        `Chapter${fileNameBase}`,
        genHtmlFile(chapterName, contentHTML)
      );
    }

    if (contentImages !== null) {
      for (const image of contentImages) {
        addImageToZip(image, savedZip);
      }
    }
  }

  console.debug("[save]开始保存");
  const saveFileNameBase = `[${book.author}]${book.bookname}`;

  const savedText = savedTextArray.join("\n");
  saveAs(
    new Blob([savedText], { type: "text/plain;charset=utf-8" }),
    `${saveFileNameBase}.txt`
  );

  savedZip
    .generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6,
      },
    })
    .then((blob: Blob) => {
      saveAs(blob, `${saveFileNameBase}.zip`);
    })
    .catch((err: Error) => console.error("saveZip: " + err));
}

function setTabMark(): Promise<main.mainTabObject> {
  return new Promise((resolve, reject) => {
    GM_getTab((curTabObject) => {
      (<main.mainTabObject>curTabObject).novel_downloader =
        document.location.href;
      GM_saveTab(curTabObject);
      resolve(<main.mainTabObject>curTabObject);
    });
  });
}

function getNowRunNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    GM_getTabs((curTabObjects) => {
      let nowRunNumber = 0;
      for (let i in curTabObjects) {
        const novel_downloader_url = (<main.mainTabObject>curTabObjects[i])
          .novel_downloader;
        if (
          novel_downloader_url !== undefined &&
          new URL(novel_downloader_url).hostname === document.location.hostname
        ) {
          nowRunNumber++;
        }
      }
      resolve(nowRunNumber);
    });
  });
}

function removeTabMark(): Promise<main.mainTabObject> {
  return new Promise((resolve, reject) => {
    GM_getTab((curTabObject) => {
      if ((<main.mainTabObject>curTabObject).novel_downloader) {
        delete (<main.mainTabObject>curTabObject).novel_downloader;
      }
      GM_saveTab(curTabObject);
      resolve(<main.mainTabObject>curTabObject);
    });
  });
}

async function run() {
  console.log(`[run]下载开始`);
  const rule = getRule();

  let maxRunLimit = null;
  await setTabMark();
  let nowRunNumber = await getNowRunNumber();
  if (rule.maxRunLimit !== undefined) {
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

  const book = await initBook(rule);
  await initChapters(rule, book);
  save(book);

  await removeTabMark();
  console.log(`[run]下载完毕`);
  return book;
}

function catchError(error: Error) {
  downloading = false;
  removeTabMark();
  document.getElementById("novel-downloader")?.remove();
  console.error(
    "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader"
  );
  console.error(error);
}

function addButton() {
  let button = document.createElement("button");
  button.id = "novel-downloader";
  button.style.cssText = `position: fixed; top: 15%; right: 5%; z-index: 99; border-style: none; text-align:center; vertical-align:baseline; background-color: rgba(128, 128, 128, 0.2); padding: 5px; border-radius: 12px;`;

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
  const rule = getRule();
  const book = await initBook(rule);
  (<main.mainWindows>unsafeWindow).rule = rule;
  (<main.mainWindows>unsafeWindow).book = book;
  (<main.mainWindows>unsafeWindow).save = save;
  return;
}

let downloading = false;
const enaleDebug = false;
window.addEventListener("DOMContentLoaded", () => {
  printEnvironments();
  addButton();

  if (enaleDebug) {
    debug();
  }
});
