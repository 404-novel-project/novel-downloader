import defaultMainStyleText from "./main.css";
import defaultTocStyleText from "./toc.css";
import { Chapter } from "../main/Chapter";
import { fullWidthLength } from "../lib/dom";
import { Book } from "../main/Book";

class Common {
  public genMetaDateTxt(book: Book) {
    let metaDateText = `题名：${book.bookname}\n作者：${book.author}`;
    if (book.additionalMetadate.tags) {
      metaDateText += `\nTag列表：${book.additionalMetadate.tags.join("、")}`;
    }
    metaDateText += `\n原始网址：${book.bookUrl}`;
    if (book.additionalMetadate.cover) {
      metaDateText += `\n封面图片地址：${book.additionalMetadate.cover.url}`;
    }
    if (book.introduction) {
      metaDateText += `\n简介：${book.introduction}`;
    }
    metaDateText += `\n下载时间：${new Date().toISOString()}\n本文件由小说下载器生成，软件地址：https://github.com/404-novel-project/novel-downloader\n\n`;
    return metaDateText;
  }

  public getChapterNumberToSave(chapter: Chapter, chapters: Chapter[]) {
    return `${"0".repeat(
      Math.max(chapters.length.toString().length, 5) -
        Math.trunc(chapter.chapterNumber).toString().length
    )}${chapter.chapterNumber.toString()}`;
  }
}

export interface SaveOptions {
  mainStyleText?: string;
  tocStyleText?: string;
  getchapterName?: Options["getchapterName"];
  genSectionText?: Options["genSectionText"];
  genChapterText?: Options["genChapterText"];
  genChapterEpub?: Options["genChapterEpub"];
  chapterSort?: Options["chapterSort"];
}

export function saveOptionsValidate(data: any) {
  const keyNamesS: (keyof SaveOptions)[] = ["mainStyleText", "tocStyleText"];
  const keyNamesF: (keyof SaveOptions)[] = [
    "getchapterName",
    "genSectionText",
    "genChapterText",
    "genChapterEpub",
    "chapterSort",
  ];

  function keyNametest(keyname: string) {
    const keyList: string[] = [...keyNamesS, ...keyNamesF];
    return keyList.includes(keyname);
  }

  function keyNamesStest(keyname: string) {
    if (keyNamesS.includes(keyname as keyof SaveOptions)) {
      if (typeof data[keyname] === "string") {
        return true;
      }
    }
    return false;
  }

  function keyNamesFtest(keyname: string) {
    if (keyNamesF.includes(keyname as keyof SaveOptions)) {
      if (typeof data[keyname] === "function") {
        return true;
      }
    }
    return false;
  }

  if (typeof data !== "object") {
    return false;
  }
  if (Object.keys(data).length === 0) {
    return false;
  }
  for (const keyname in data) {
    if (Object.prototype.hasOwnProperty.call(data, keyname)) {
      if (!keyNametest(keyname)) {
        return false;
      }
      if (!(keyNamesStest(keyname) || keyNamesFtest(keyname))) {
        return false;
      }
    }
  }
  return true;
}

export class Options extends Common {
  public mainStyleText = defaultMainStyleText;
  public tocStyleText = defaultTocStyleText;

  public getchapterName(chapter: Chapter) {
    if (chapter.chapterName) {
      return chapter.chapterName;
    } else {
      return chapter.chapterNumber.toString();
    }
  }

  public genSectionText(sectionName: string) {
    return (
      `${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}` +
      "\n\n"
    );
  }

  public genChapterText(chapterName: string, contentText: string) {
    return `${chapterName}\n${"=".repeat(
      fullWidthLength(chapterName) * 2 + 10
    )}\n\n${contentText}\n\n`;
  }

  public genChapterEpub(contentXHTML: string) {
    return contentXHTML;
  }

  public chapterSort(a: Chapter, b: Chapter) {
    return a.chapterNumber - b.chapterNumber;
  }
}
