// noinspection CssInvalidHtmlTagReference

import pLimit from "p-limit";
import { Book, saveType } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { AttachmentClass } from "../../../main/Attachment";
import { ReferrerMode, Status } from "../../../main/main";
import { gfetch, GfetchRequestInit, ggetText } from "../../../lib/http";
import { Chapter } from "../../../main/Chapter";
import { deepcopy } from "../../../lib/misc";

export class Readmoo extends BaseRuleClass {
  public constructor() {
    super();
    this.saveType = { txt: false, epub: false, raw: { ext: "epub" } };
    this.attachmentMode = "TM";
  }

  public async bookParse(): Promise<Book> {
    const Base = "https://reader.readmoo.com";
    const navBase = `${Base}/api/book/`;
    // https://reader.readmoo.com/_single-bundle/mooreader-js-viewer_all.min.js?b=3.12.9_756
    const headers = {
      Accept: "*/*",
      Authorization: "bearer TWBLXfuP-NbtCrjD2PAiFA",
      Referer: "https://reader.readmoo.com/reader/index.html",
      "X-Requested-With": "XMLHttpRequest",
    };
    const navInit: GfetchRequestInit = {
      headers,
      responseType: "json",
    };
    const epubInit: GfetchRequestInit = {
      headers,
    };

    interface epubFile {
      path: string;
      data: string | Blob;
      nocompress?: boolean;
    }

    const epubFileList: epubFile[] = [
      {
        path: "mimetype",
        data: new Blob(["application/epub+zip"]),
        nocompress: true,
      },
    ];

    const bookId = document.location.pathname.split("/").slice(-1)[0];
    const navUrl = `${navBase}${bookId}/nav`;
    const navResp = await gfetch(navUrl, navInit);
    const navData = navResp.response as nav;
    if (navData.message !== "success") {
      throw new Error("获取 nav 失败！");
    }

    const epubBase = `${Base}${navData.base}`;
    const container_xml_url = `${epubBase}META-INF/container.xml`;
    epubFileList.push({
      path: "META-INF/container.xml",
      data: container_xml_url,
    });
    const containerResp = await ggetText(container_xml_url, "UTF-8", epubInit);
    if (!containerResp) {
      throw new Error("抓取 container.xml 失败！");
    }
    const containerXML = new DOMParser().parseFromString(
      containerResp,
      "application/xml"
    );
    const content_opf_path = containerXML
      .querySelector("rootfile")
      ?.getAttribute("full-path");
    if (!content_opf_path) {
      throw new Error("解析 container.xml 出错！");
    }

    const content_opf_url = `${epubBase}${content_opf_path}`;
    epubFileList.push({ path: content_opf_path, data: content_opf_url });
    const content_opf_resp = await ggetText(content_opf_url, "UTF-8", epubInit);
    if (!content_opf_resp) {
      throw new Error("抓取 content.opf 失败！");
    }
    const contentOpf = new DOMParser().parseFromString(
      content_opf_resp,
      "application/xml"
    );

    const bookUrl = `https://readmoo.com/book/${bookId}`;
    const bookname =
      contentOpf.getElementsByTagName("dc:title")[0].textContent ?? "";
    const author =
      contentOpf.getElementsByTagName("dc:creator")[0].textContent ?? "";

    const items = contentOpf.querySelectorAll("manifest > item");
    if (items.length === 0) {
      throw new Error("解析 manifest item 出错！");
    }
    const itemObjs = Array.from(items).map((item) => {
      const href = item.getAttribute("href");
      const path = `${content_opf_path
        .split("/")
        .slice(0, -1)
        .join("/")}/${href}`;
      return {
        path,
        data: `${epubBase}${path}`,
      } as epubFile;
    });
    epubFileList.push(...itemObjs);

    const limit = pLimit(this.concurrencyLimit);

    const attachmentTasks = epubFileList.map((fobj) => {
      return limit(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { path, data, nocompress } = fobj;
        if (typeof data === "string") {
          const attach = new AttachmentClass(
            data,
            path,
            this.attachmentMode,
            ReferrerMode.keep,
            "",
            { init: deepcopy(epubInit), TMinit: deepcopy(epubInit) }
          );
          await attach.init();
          if (fobj.nocompress) {
            attach.comments = "nocompress";
          }
          return attach;
        } else {
          const attach = new AttachmentClass("", path, this.attachmentMode);
          attach.Blob = data;
          attach.status = Status.finished;
          if (fobj.nocompress) {
            attach.comments = "nocompress";
          }
          return attach;
        }
      });
    });
    const attachments = await Promise.all(attachmentTasks);
    const book = new Book({
      bookUrl,
      bookname,
      author,
      introduction: null,
      introductionHTML: null,
      additionalMetadate: { attachments },
      chapters: [
        new Chapter({
          bookUrl,
          bookname,
          chapterUrl: "",
          chapterName: null,
          chapterNumber: 0,
          isVIP: false,
          isPaid: null,
          sectionName: null,
          sectionNumber: null,
          sectionChapterNumber: null,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: {},
        }),
      ],
    });
    book.saveType = this.saveType as saveType;
    return book;
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: object
  ): Promise<ChapterParseObject> {
    return {
      chapterName,
      contentRaw: null,
      contentText: null,
      contentHTML: null,
      contentImages: null,
      additionalMetadate: null,
    };
  }
}

interface navLocate {
  tion: number;
  percent: number;
}

interface nav {
  message: string; //"success";
  base: string; //"/ebook/451/208451/203892/1_0/full/";
  nav_dir: string; //"/ebook/451/208451/203892/1_0/full/OEBPS/";
  weights: number[];
  locations: navLocate[];
  opf: string; //"content.opf";
}
