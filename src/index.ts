import { getRule, ruleClass, icon0, icon1 } from "./rules";
import { Book, Chapter, attachmentClass, Status } from "./main";
import { concurrencyRun, _GM_info } from "./lib";

namespace main {
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

type JSZip = any;
declare let JSZip: JSZip;
function save(book: Book) {
  function chapterSort(a: Chapter, b: Chapter) {
    if (a.chapterNumber > b.chapterNumber) {
      return 1;
    }
    if (a.chapterNumber === b.chapterNumber) {
      return 0;
    }
    if (a.chapterNumber < b.chapterNumber) {
      return -1;
    }
    return 0;
  }

  function addImageToZip(image: attachmentClass, zip: JSZip) {
    if (image.status === Status.finished && image.imageBlob) {
      console.debug(
        `[save]添加附件，文件名：${image.name}，对象`,
        image.imageBlob
      );
      zip.file(image.name, image.imageBlob);
    } else {
      console.error("[save]附件下载失败！");
      console.error(image);
    }
  }

  function genSectionText(sectionName: string) {
    return `${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}`;
  }

  function genChapterText(chapterName: string, contentText: string) {
    return `## ${chapterName}\n\n${contentText}\n\n`;
  }

  function genSectionHtmlFile(sectionName: string) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><link href="style.css" type="text/css" rel="stylesheet"/><title>${sectionName}</title></head><body><div class="main"><h1>${sectionName}</h1></div></body></html>`,
      "text/html"
    );
    return new Blob([htmlFile.documentElement.outerHTML], {
      type: "text/html; charset=UTF-8",
    });
  }

  function genHtmlFile(
    chapterName: string,
    DOM: HTMLElement,
    chapterUrl: string
  ) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><meta name="source" content="${chapterUrl}"><link href="style.css" type="text/css" rel="stylesheet"/><title>${chapterName}</title></head><body><div class="main"><h2>${chapterName}</h2></div></body></html>`,
      "text/html"
    );
    htmlFile.querySelector(".main")?.appendChild(DOM);
    return new Blob([htmlFile.documentElement.outerHTML], {
      type: "text/html; charset=UTF-8",
    });
  }

  console.log("[save]开始保存");
  console.debug("book Object:", book);
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
    if (cover.imageBlob) {
      console.debug(
        `[save]添加封面图片，文件名：${`cover.${
          cover.imageBlob.type.split("/").slice(-1)[0]
        }`}，对象`,
        cover.imageBlob
      );
      savedZip.file(
        `cover.${cover.imageBlob.type.split("/").slice(-1)[0]}`,
        cover.imageBlob
      );
    } else {
      console.error("[save]图片下载失败！");
      console.error(cover);
    }
  }
  savedZip.file(
    "info.txt",
    new Blob([infoText], { type: "text/plain;charset=utf-8" })
  );

  const styleCSS = `body {
  background-color: #f0f0f2;
  margin: 0;
  padding: 0;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
div.main {
  width: 900px;
  margin: 5em auto;
  padding: 2em;
  background-color: #fdfdff;
  border-radius: 0.5em;
  box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);
}
@media (max-width: 700px) {
  div.main {
    margin: 0 auto;
    width: auto;
  }
}
h1 {
  line-height: 130%;
  text-align: center;
  font-weight: bold;
  font-size: xxx-large;
  margin-top: 3.2em;
  margin-bottom: 3.3em;
}
h2 {
  line-height: 130%;
  text-align: center;
  font-weight: bold;
  font-size: x-large;
  margin-top: 1.2em;
  margin-bottom: 2.3em;
}
div {
  margin: 0px;
  padding: 0px;
  text-align: justify;
}
p {
  text-indent: 2em;
  display: block;
  line-height: 1.3em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}`;
  savedZip.file(
    "style.css",
    new Blob([styleCSS], { type: "text/css;charset=utf-8" })
  );

  let preSectionName: string | null = "";
  for (const c of chapters) {
    if (c.status === Status.finished) {
      const sectionName = c.sectionName;
      const chapterNumber = c.chapterNumber;
      const chapterUrl = c.chapterUrl;
      const chapterName = c.chapterName
        ? c.chapterName
        : chapterNumber.toString();
      const contentText = c.contentText;
      const contentHTML = c.contentHTML;
      const contentImages = c.contentImages;

      const fileNameBase = `${"0".repeat(
        chapters.length.toString().length - chapterNumber.toString().length
      )}${chapterNumber.toString()}.html`;

      if (sectionName && contentText && sectionName !== preSectionName) {
        savedTextArray.push(genSectionText(sectionName));
        const sectionHTMLBlob = genSectionHtmlFile(sectionName);
        if (sectionHTMLBlob) {
          console.debug(
            `[save]添加卷HTML，文件名：${"Section" + fileNameBase}，对象`,
            sectionHTMLBlob
          );
          savedZip.file(`Section${fileNameBase}`, sectionHTMLBlob);
        }
      }
      preSectionName = sectionName;

      if (contentText) {
        savedTextArray.push(genChapterText(chapterName, contentText));
      }

      if (contentHTML) {
        const chapterHTMLBlob = genHtmlFile(
          chapterName,
          contentHTML,
          chapterUrl
        );
        if (chapterHTMLBlob) {
          console.debug(
            `[save]添加章节HTML，文件名：${"Chapter" + fileNameBase}，对象`,
            chapterHTMLBlob
          );
          savedZip.file(`Chapter${fileNameBase}`, chapterHTMLBlob);
        }
      }

      if (contentImages !== null) {
        for (const image of contentImages) {
          addImageToZip(image, savedZip);
        }
      }
    }
  }

  console.log("[save]开始生成下载文件");
  const saveFileNameBase = `[${book.author}]${book.bookname}`;

  console.debug("[save]开始保存TXT文件");
  const savedText = savedTextArray.join("\n");
  saveAs(
    new Blob([savedText], { type: "text/plain;charset=utf-8" }),
    `${saveFileNameBase}.txt`
  );
  console.debug("[save]保存TXT文件完毕");

  console.debug("[save]开始生成ZIP文件");
  savedZip
    .generateAsync(
      {
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6,
        },
      },
      (metadata: any) =>
        updateProgress(
          finishedChapterNumber,
          totalChapterNumber,
          metadata.percent
        )
    )
    .then((blob: Blob) => {
      console.debug("[save]ZIP文件生成完毕，开始保存ZIP文件");
      saveAs(blob, `${saveFileNameBase}.zip`);
    })
    .then(() => {
      console.debug("[save]保存ZIP文件完毕");
      finishedChapterNumber = 0;
      document.querySelector("#nd-progress")?.remove();
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

let totalChapterNumber: number;
let finishedChapterNumber = 0;
function updateProgress(
  finishedChapterNumber: number,
  totalChapterNumber: number,
  zipPercent: number | null
) {
  if (!document.querySelector("#nd-progress")) {
    console.debug("[progress]初始化进度条");
    let progress = document.createElement("div");
    progress.id = "nd-progress";
    progress.innerHTML = `
        <div id='chapter-progress' title="章节"></div>
        <div id='zip-progress' title="ZIP"></div>
        `;
    let progressStyle = document.createElement("style");
    progressStyle.innerHTML = `#nd-progress {
    position: fixed;
    bottom: 8%;
    right: 3%;
    z-index: 99;
    border-style: none;
    text-align: center;
    vertical-align: baseline;
    background-color: rgba(210, 210, 210, 0.2);
    padding: 6px;
    border-radius: 12px;
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
}`;
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
  const rule = getRule();
  console.log(`[run]获取规则成功`);

  let maxRunLimit = null;
  let nowRunNumber;
  if (_GM_info.scriptHandler === "Tampermonkey") {
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

  const book = await initBook(rule);

  totalChapterNumber = book.chapters.filter(
    (chapter) => chapter.status === Status.pending
  ).length;

  await initChapters(rule, book);
  save(book);

  if (_GM_info.scriptHandler === "Tampermonkey") {
    console.log(`[run]移除运行标志`);
    await removeTabMark();
  }

  console.log(`[run]下载完毕`);
  return book;
}

function catchError(error: Error) {
  downloading = false;
  if (_GM_info.scriptHandler === "Tampermonkey") {
    removeTabMark();
  }
  finishedChapterNumber = 0;
  document.querySelector("#nd-progress")?.remove();
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
  (<main.mainWindows>unsafeWindow).saveAs = saveAs;
  return;
}

let downloading = false;
const enaleDebug = false;
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
