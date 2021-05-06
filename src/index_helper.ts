import { Book, Chapter, attachmentClass, Status } from "./main";
import { console_debug } from "./lib";
import { updateProgress, audio, indexNameSpace, catchError } from "./index";

export const progressStyleText = `#nd-progress {
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

type JSZip = any;
declare let JSZip: JSZip;
class saveBook {
  protected book: Book;
  private chapters: Chapter[];

  public mainStyleText: string;

  private savedZip: any;
  private savedTextArray: string[];
  private saveFileNameBase: string;

  public constructor(book: Book) {
    this.book = book;
    this.chapters = book.chapters;
    this.chapters.sort(this.chapterSort);

    this.savedZip = new JSZip();
    this.savedTextArray = [];
    this.saveFileNameBase = `[${this.book.author}]${this.book.bookname}`;

    this.mainStyleText = `body {
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
}
img {
  vertical-align: text-bottom;
}`;
  }

  public saveTxt() {
    const metaDateText = this.genMetaDateTxt();
    this.savedTextArray.push(metaDateText);

    let sections: string[] = [];
    for (const chapter of this.chapters) {
      const chapterName = chapter.chapterName
        ? chapter.chapterName
        : chapter.chapterNumber.toString();
      if (chapter.sectionName && !sections.includes(chapter.sectionName)) {
        sections.push(chapter.sectionName);
        const sectionText = this.genSectionText(chapter.sectionName);
        this.savedTextArray.push(sectionText);
      }

      if (chapter.contentText) {
        const chapterText = this.genChapterText(
          chapterName,
          chapter.contentText
        );
        this.savedTextArray.push(chapterText);
      }
    }

    console.log("[save]保存TXT文件");
    const savedText = this.savedTextArray.join("\n");
    saveAs(
      new Blob([savedText], { type: "text/plain;charset=utf-8" }),
      `${this.saveFileNameBase}.txt`
    );
  }

  public saveZip() {
    const ToC = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><link href="style.css" type="text/css" rel="stylesheet"/><title>Table of Contents</title></head><body><div class="main"><h1>Table of Contents</h1></div></body></html>`,
      "text/html"
    );
    const TocMain = ToC.querySelector("div.main");

    console_debug("[save]保存源数据文本，保存样式");
    const metaDateText = this.genMetaDateTxt();
    this.savedZip.file(
      "info.txt",
      new Blob([metaDateText], { type: "text/plain;charset=utf-8" })
    );
    this.savedZip.file(
      "style.css",
      new Blob([this.mainStyleText], { type: "text/css;charset=utf-8" })
    );

    if (this.book.additionalMetadate.cover) {
      console_debug("[save]保存封面");
      this.addImageToZip(this.book.additionalMetadate.cover, this.savedZip);
    }
    if (this.book.additionalMetadate.attachments) {
      console_debug("[save]保存书籍附件");
      for (const bookAttachment of this.book.additionalMetadate.attachments) {
        this.addImageToZip(bookAttachment, this.savedZip);
      }
    }

    let sections: string[] = [];
    for (const chapter of this.chapters) {
      const chapterName = chapter.chapterName
        ? chapter.chapterName
        : chapter.chapterNumber.toString();
      const htmlfileNameBase = `${"0".repeat(
        this.chapters.length.toString().length -
          chapter.chapterNumber.toString().length
      )}${chapter.chapterNumber.toString()}.html`;
      const chapterHtmlFileName = `Chapter${htmlfileNameBase}`;

      console_debug("[save]生成ToC项目，保存Section HTML文件");
      if (chapter.sectionName) {
        const sectionHtmlId = `section${chapter.sectionNumber}`;

        if (!sections.includes(chapter.sectionName)) {
          sections.push(chapter.sectionName);

          console_debug("[save]ToC");
          const sectionDiv = document.createElement("div");
          sectionDiv.id = sectionHtmlId;

          const heading = document.createElement("h2");
          heading.className = "section-label";
          heading.innerHTML = chapter.sectionName;

          const hr = document.createElement("hr");

          sectionDiv.appendChild(heading);
          TocMain?.appendChild(hr);
          TocMain?.appendChild(sectionDiv);

          console_debug("[save]Zip");
          const sectionHTMLBlob = this.genSectionHtmlFile(chapter.sectionName);
          this.savedZip.file(`Section${htmlfileNameBase}`, sectionHTMLBlob);
        }

        console_debug("[save]ToC");
        const sectionDiv = TocMain?.querySelector("#" + sectionHtmlId);

        const chapterDiv = document.createElement("div");
        chapterDiv.className = "chapter";
        const chapterAnchor = document.createElement("a");
        chapterAnchor.href = chapterHtmlFileName;
        chapterAnchor.innerHTML = chapterName;

        chapterDiv.appendChild(chapterAnchor);
        sectionDiv?.appendChild(chapterDiv);
      } else {
        const chapterDiv = document.createElement("div");
        chapterDiv.className = "chapter";
        const chapterAnchor = document.createElement("a");
        chapterAnchor.href = chapterHtmlFileName;
        chapterAnchor.innerHTML = chapterName;

        chapterDiv.appendChild(chapterAnchor);
        TocMain?.appendChild(chapterDiv);
      }

      console_debug("[save]保存HTML文件");
      if (chapter.contentHTML) {
        const chapterHTMLBlob = this.genChapterHtmlFile(
          chapterName,
          chapter.contentHTML,
          chapter.chapterUrl
        );
        this.savedZip.file(chapterHtmlFileName, chapterHTMLBlob);
      }

      console_debug("[save]保存附件");
      if (chapter.contentImages) {
        for (const attachment of chapter.contentImages) {
          this.addImageToZip(attachment, this.savedZip);
        }
      }
    }

    console_debug("[save]保存ToC文件");
    this.savedZip.file(
      "ToC.html",
      new Blob([ToC.documentElement.outerHTML], {
        type: "text/html; charset=UTF-8",
      })
    );

    console.log("[save]开始保存ZIP文件");
    this.savedZip
      .generateAsync(
        {
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: 6,
          },
        },
        (metadata: any) => updateProgress(1, 1, metadata.percent)
      )
      .then((blob: Blob) => {
        console_debug("[save]ZIP文件生成完毕，开始保存ZIP文件");
        saveAs(blob, `${this.saveFileNameBase}.zip`);
      })
      .then(() => {
        console_debug("[save]保存ZIP文件完毕");
        document.querySelector("#nd-progress")?.remove();
        audio.pause();
      })
      .catch((err: Error) => {
        console.error("saveZip: " + err);
        catchError(err);
      });
  }

  private genMetaDateTxt() {
    let metaDateText = `题名：${this.book.bookname}\n作者：${this.book.author}`;
    if (this.book.introduction) {
      metaDateText += `\n简介：${this.book.introduction}`;
    }
    if (this.book.additionalMetadate.cover) {
      metaDateText += `\n封面图片地址：${this.book.additionalMetadate.cover.imageUrl}`;
    }
    if (this.book.additionalMetadate.tags) {
      metaDateText += `\nTag列表：${this.book.additionalMetadate.tags.join(
        "、"
      )}`;
    }
    metaDateText += `\n下载时间：${new Date().toISOString()}\n本文件由小说下载器生成，软件地址：https://github.com/yingziwu/novel-downloader`;
    return metaDateText;
  }

  private addImageToZip(image: attachmentClass, zip: JSZip) {
    if (image.status === Status.finished && image.imageBlob) {
      console_debug(
        `[save]添加附件，文件名：${image.name}，对象`,
        image.imageBlob
      );
      zip.file(image.name, image.imageBlob);
    } else {
      console.error("[save]附件下载失败！");
      console.error(image);
    }
  }

  private genSectionText(sectionName: string) {
    return `${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}`;
  }

  private genChapterText(chapterName: string, contentText: string) {
    return `## ${chapterName}\n\n${contentText}\n\n`;
  }

  private genSectionHtmlFile(sectionName: string) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><link href="style.css" type="text/css" rel="stylesheet"/><title>${sectionName}</title></head><body><div class="main"><h1>${sectionName}</h1></div></body></html>`,
      "text/html"
    );
    return new Blob(
      [
        htmlFile.documentElement.outerHTML.replace(
          new RegExp("data-src-address", "g"),
          "src"
        ),
      ],
      {
        type: "text/html; charset=UTF-8",
      }
    );
  }

  private genChapterHtmlFile(
    chapterName: string,
    DOM: HTMLElement,
    chapterUrl: string
  ) {
    let htmlFile = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><meta name="source" content="${chapterUrl}"><link href="style.css" type="text/css" rel="stylesheet"/><title>${chapterName}</title></head><body><div class="main"><h2>${chapterName}</h2></div></body></html>`,
      "text/html"
    );
    htmlFile.querySelector(".main")?.appendChild(DOM);
    return new Blob(
      [
        htmlFile.documentElement.outerHTML.replace(
          new RegExp("data-src-address", "g"),
          "src"
        ),
      ],
      {
        type: "text/html; charset=UTF-8",
      }
    );
  }

  private chapterSort(a: Chapter, b: Chapter) {
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
}

export function save(book: Book) {
  const saveBookObj = new saveBook(book);
  saveBookObj.saveTxt();
  saveBookObj.saveZip();
}
export function setTabMark(): Promise<indexNameSpace.mainTabObject> {
  return new Promise((resolve, reject) => {
    GM_getTab((curTabObject) => {
      (<indexNameSpace.mainTabObject>curTabObject).novel_downloader =
        document.location.href;
      GM_saveTab(curTabObject);
      resolve(<indexNameSpace.mainTabObject>curTabObject);
    });
  });
}
export function getNowRunNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    GM_getTabs((curTabObjects) => {
      let nowRunNumber = 0;
      for (let i in curTabObjects) {
        const novel_downloader_url = (<indexNameSpace.mainTabObject>(
          curTabObjects[i]
        )).novel_downloader;
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
export function removeTabMark(): Promise<indexNameSpace.mainTabObject> {
  return new Promise((resolve, reject) => {
    GM_getTab((curTabObject) => {
      if ((<indexNameSpace.mainTabObject>curTabObject).novel_downloader) {
        delete (<indexNameSpace.mainTabObject>curTabObject).novel_downloader;
      }
      GM_saveTab(curTabObject);
      resolve(<indexNameSpace.mainTabObject>curTabObject);
    });
  });
}
