// noinspection CssInvalidHtmlTagReference

import sgc from "./sgc-toc.css";
import webStyleText from "./web.css";
import { _GM_info } from "../lib/GM";
import { extensionToMimetype, randomUUID } from "../lib/misc";
import { FflateZip } from "../lib/zip";
import { log } from "../log";
import { Book } from "../main/Book";
import { Chapter } from "../main/Chapter";
import { Options, SaveOptions } from "./options";
import { AttachmentClass } from "../main/Attachment";
import { Status } from "../main/main";
import { convertHTMLtoXHTML } from "../lib/dom";
import { getSectionsObj } from "./misc";

import chapterHtml from "./chapter.html.j2";
import indexHtml from "./index.html.j2";
import sectionHtml from "./section.html.j2";
import { Environment, Template } from "nunjucks";

const env = new Environment(undefined, { autoescape: false });

const section = new Template(sectionHtml, env, undefined, true);
const chapterTemplt = new Template(chapterHtml, env, undefined, true);
const index = new Template(indexHtml, env, undefined, true);

function getDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const _monty = new Date().getMonth() + 1;
  const monty = _monty < 10 ? `0${_monty}` : _monty;
  const _day = date.getDate();
  const day = _day < 10 ? `0${_day}` : _day;
  return `${year}-${monty}-${day}`;
}

const uuid = randomUUID();
const content_opf = `<?xml version="1.0" encoding="utf-8"?>
<package version="3.0" unique-identifier="BookId" prefix="rendition: http://www.idpf.org/vocab/rendition/#" xmlns="http://www.idpf.org/2007/opf">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:identifier id="BookId">urn:uuid:${uuid}</dc:identifier>
    <meta content="${_GM_info.script.version}" name="novel-downloader version"/>
    <meta content="https://github.com/404-novel-project/novel-downloader" name="generator"/>
    <meta property="dcterms:created">${getDateString()}</meta>
    <meta property="dcterms:modified">${new Date()
      .toISOString()
      .replace(/\.\d\d\dZ$/, "Z")}</meta>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="navid" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="sgc-toc.css" href="sgc-toc.css" media-type="text/css"/>
    <item id="style.css" href="style.css" media-type="text/css"/>
    <item id="cover.xhtml" href="cover.xhtml" media-type="application/xhtml+xml" properties="svg"/>
    <item id="info.xhtml" href="info.xhtml" media-type="application/xhtml+xml"/>
    <item id="message.xhtml" href="message.xhtml" media-type="application/xhtml+xml"/>
    <item id="TOC.xhtml" href="TOC.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="cover.xhtml"/>
    <itemref idref="info.xhtml"/>
    <itemref idref="message.xhtml"/>
    <itemref idref="TOC.xhtml"/>
  </spine>
  <guide>
    <reference type="cover" title="Cover" href="cover.xhtml"/>
    <reference type="toc" title="Table of Contents" href="TOC.xhtml"/>
  </guide>
</package>`;

const toc_ncx = `<?xml version="1.0" encoding="utf-8" ?>
<ncx version="2005-1" xmlns="http://www.daisy.org/z3986/2005/ncx/">
  <head>
    <meta content="urn:uuid:${uuid}" name="dtb:uid"/>
    <meta content="2" name="dtb:depth"/>
    <meta content="0" name="dtb:totalPageCount"/>
    <meta content="0" name="dtb:maxPageNumber"/>
  </head>
  <docTitle>
    <text></text>
  </docTitle>
  <navMap>
  </navMap>
</ncx>`;

const TOC_xhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>Table of Contents</title>
  <link href="sgc-toc.css" rel="stylesheet" type="text/css"/>
</head>
<body>
  <div class="sgc-toc-title">
    目录
  </div>
</body>
</html>`;

const nav_xhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <meta charset="utf-8"/>
  <title>ePub Nav</title>
  <style type="text/css">
    ol { list-style-type: none; }
  </style>
</head>
<body epub:type="frontmatter">
  <nav epub:type="toc" id="toc" role="doc-toc">
    <h1>Table of Contents</h1>
  </nav>
  <nav epub:type="landmarks" id="landmarks" hidden=""><h2>Guide</h2>
    <ol>
      <li><a epub:type="cover" href="cover.xhtml">Cover</a></li>
      <li><a epub:type="toc" href="TOC.xhtml">Table of Contents</a></li>
    </ol>
  </nav>
</body>
</html>`;

const getCoverXhtml = (
  coverName: string
) => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>Cover</title>
</head>

<body>
  <div style="text-align: center; padding: 0pt; margin: 0pt;">
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" preserveAspectRatio="xMidYMid meet" version="1.1" viewBox="0 0 368 460" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink"><image width="368" height="460" xlink:href="${coverName}"/></svg>
  </div>
</body>
</html>`;

const getInfoXhtml = (
  title: string,
  author: string
) => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>信息页</title>
  <link href="style.css" type="text/css" rel="stylesheet"/>
</head>

<body>
  <div class="main">
    <h1>${title}</h1>

    ${author ? `<h2>作者：${author}</h2>` : ""}
  </div>
</body>
</html>`;

const getMessageXhtml = (book: Book) => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>信息页</title>
  <link href="style.css" type="text/css" rel="stylesheet"/>
</head>

<body>
  <div class="main">
    <div><strong>制作信息</strong></div>
    <hr/>
    <div>题名：${book.bookname}</div>
    <div>作者：${book.author}</div>
    <div>原始地址：<a href="${book.bookUrl}">${book.bookUrl}</a></div>
    <div>本文件由<a href="https://github.com/404-novel-project/novel-downloader">小说下载器</a>生成。</div>
    ${
      book.introductionHTML
        ? `<hr/><span>简介：</span>${book.introductionHTML.outerHTML}`
        : ""
    }
    ${
      book.additionalMetadate.tags
        ? `<hr/><div>Tag列表：${book.additionalMetadate.tags.join("、")}</div>`
        : ""
    }
  </div>
</body>
</html>`;

export class EPUB extends Options {
  private readonly contentOpf = new DOMParser().parseFromString(
    content_opf,
    "application/xml"
  );
  private readonly metadata = this.contentOpf.querySelector(
    "metadata"
  ) as Element;
  private readonly manifest = this.contentOpf.querySelector(
    "manifest"
  ) as Element;
  private readonly spine = this.contentOpf.querySelector("spine") as Element;
  private readonly guide = this.contentOpf.querySelector("guide") as Element;

  private readonly ncx = new DOMParser().parseFromString(
    toc_ncx,
    "application/xml"
  );
  private readonly navMap = this.ncx.querySelector("navMap") as Element;

  private readonly navHtml = new DOMParser().parseFromString(
    nav_xhtml,
    "application/xhtml+xml"
  );
  private readonly navHtmlToc = this.navHtml.getElementById("toc") as Element;

  private readonly toc = new DOMParser().parseFromString(
    TOC_xhtml,
    "application/xhtml+xml"
  );
  private readonly tocBody = this.toc.body;

  private readonly book: Book;
  private readonly chapters: Chapter[];
  private readonly epubZip: FflateZip;

  public constructor(book: Book, streamZip: boolean, options?: SaveOptions) {
    super();
    this.book = book;
    this.chapters = this.book.chapters;

    const zipFilename = `[${this.book.author}]${this.book.bookname}.epub`;
    this.epubZip = new FflateZip(
      zipFilename,
      streamZip,
      "application/epub+zip"
    );

    if (options) {
      Object.assign(this, options);
    }
  }

  private static genChapterHtmlFile(chapterObj: Chapter) {
    const _htmlText = chapterTemplt.render({
      chapterUrl: chapterObj.chapterUrl,
      chapterName: chapterObj.chapterName,
      outerHTML: chapterObj.contentHTML?.outerHTML ?? "",
    });
    const htmlText = convertHTMLtoXHTML(_htmlText);
    return new Blob(
      [
        `<?xml version="1.0" encoding="utf-8"?>`,
        htmlText
          .replaceAll("data-src-address", "src")
          .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
          .replaceAll(/[\u{007f}-\u{009f}]/gu, "")
          .replace(
            '<html xmlns="http://www.w3.org/1999/xhtml">',
            '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">'
          ),
      ],
      {
        type: "application/xhtml+xml",
      }
    );
  }

  public async saveEpub() {
    const self = this;

    log.debug("[save-epub]保存epub基本文件");
    await saveEpubMimetype();
    log.debug("[save-epub]保存样式文件");
    await saveStyle();
    log.debug("[save-epub]更新Metadata");
    await updateMetadata();
    if (this.book.additionalMetadate.attachments) {
      log.debug("[save]保存书籍附件");
      for (const bookAttachment of this.book.additionalMetadate.attachments) {
        await this.addAttachment(bookAttachment);
      }
    }
    log.debug("[save-epub]保存仅标题章节文件");
    await saveStubChapters(this.chapters);
    log.debug("[save-epub]保存目录文件");
    await saveToC();

    await saveZipFiles();

    await this.epubZip.generateAsync();

    async function saveEpubMimetype() {
      // mimetype
      await self.epubZip.file(
        "mimetype",
        new Blob(["application/epub+zip"]),
        true
      );
      // container.xml
      await self.epubZip.file(
        "META-INF/container.xml",
        new Blob([
          `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
    </rootfiles>
</container>`,
        ])
      );
    }

    async function saveStyle() {
      await self.epubZip.file(
        "OEBPS/style.css",
        new Blob([self.mainStyleText])
      );
      await self.epubZip.file("OEBPS/sgc-toc.css", new Blob([sgc]));
    }

    async function updateMetadata() {
      const title = self.contentOpf.createElement("dc:title");
      title.textContent = self.book.bookname;
      self.metadata.appendChild(title);
      (self.ncx.querySelector("docTitle > text") as Element).innerHTML =
        self.book.bookname;

      const author = self.contentOpf.createElement("dc:creator");
      author.setAttribute("id", "cre");
      author.textContent = self.book.author;
      self.metadata.appendChild(author);
      const authorMeta = self.contentOpf.createElement("meta");
      authorMeta.setAttribute("refines", "#cre");
      authorMeta.setAttribute("property", "role");
      authorMeta.setAttribute("scheme", "marc:relators");
      authorMeta.textContent = "aut";
      self.metadata.appendChild(authorMeta);

      const source = self.contentOpf.createElement("dc:source");
      source.textContent = self.book.bookUrl;
      self.metadata.appendChild(source);

      const language = self.contentOpf.createElement("dc:language");
      language.textContent = self.book.additionalMetadate.language ?? "zh";
      self.metadata.appendChild(language);

      if (self.book.introduction) {
        const introduction = self.contentOpf.createElement("dc:description");
        introduction.textContent = self.book.introduction;
        self.metadata.appendChild(introduction);
      }

      if (self.book.additionalMetadate.cover) {
        await self.addAttachment(self.book.additionalMetadate.cover);

        const cover = self.contentOpf.createElement("meta");
        cover.setAttribute("name", "cover");
        cover.setAttribute("content", self.book.additionalMetadate.cover.name);
        self.metadata.appendChild(cover);

        await self.epubZip.file(
          "OEBPS/cover.xhtml",
          new Blob([getCoverXhtml(self.book.additionalMetadate.cover.name)], {
            type: "application/xhtml+xml",
          })
        );
      } else {
        self.manifest.querySelector('item[id="cover.xhtml"]')?.remove();
        self.spine.querySelector('itemref[idref="cover.xhtml"]')?.remove();
        self.guide.querySelector('reference[type="cover"]')?.remove();
      }

      if (self.book.additionalMetadate.tags) {
        for (const _tag of self.book.additionalMetadate.tags) {
          const tag = self.contentOpf.createElement("dc:subject");
          tag.textContent = _tag;
          self.metadata.appendChild(tag);
        }
      }

      await self.epubZip.file(
        "OEBPS/info.xhtml",
        new Blob(
          [
            getInfoXhtml(self.book.bookname, self.book.author)
              .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
              .replaceAll(/[\u{007f}-\u{009f}]/gu, ""),
          ],
          {
            type: "application/xhtml+xml",
          }
        )
      );

      await self.epubZip.file(
        "OEBPS/message.xhtml",
        new Blob(
          [
            convertHTMLtoXHTML(getMessageXhtml(self.book))
              .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
              .replaceAll(/[\u{007f}-\u{009f}]/gu, ""),
          ],
          {
            type: "application/xhtml+xml",
          }
        )
      );
    }

    async function saveStubChapters(chapters: Chapter[]) {
      chapters = chapters.filter((c) => c.status !== Status.saved);
      for (const c of chapters) {
        if (c.status === Status.finished) {
          await self.addChapter(c);
        } else {
          await self.addChapter(c, "Stub");
        }
      }
    }

    async function saveToC() {
      log.debug("[save-epub]对 chapters 排序");
      self.chapters.sort(self.chapterSort);

      const sectionsListObj = getSectionsObj(self.chapters, self.chapterSort);

      let i = 0;
      let sectionNumberG = null;
      let sectionNavPoint;
      let sectionTOCDiv;
      const navHtmlTocOl = self.navHtml.createElement("ol");
      self.navHtmlToc.appendChild(navHtmlTocOl);
      let sectionNavOl;
      for (const sectionObj of sectionsListObj) {
        const { sectionName, sectionNumber, chpaters } = sectionObj;
        if (sectionNumber !== sectionNumberG) {
          const sectionNumberToSave = self.getChapterNumberToSave(
            chpaters[0],
            self.chapters
          );
          const sectionHtmlFileName = `No${sectionNumberToSave}Section.xhtml`;
          if (sectionName) {
            sectionNumberG = sectionNumber;

            log.debug(`[save-epub]保存卷HTML文件：${sectionName}`);
            const sectionHTMLBlob = genSectionHtmlFile(sectionName);
            await self.epubZip.file(
              `OEBPS/${sectionHtmlFileName}`,
              sectionHTMLBlob
            );

            // manifest
            appendManifest(sectionHtmlFileName);

            // spine
            appendSpine(sectionHtmlFileName);

            // navMap
            i++;
            const navPoint = genNavPoint(i, sectionName, sectionHtmlFileName);
            if (sectionNavPoint) {
              self.navMap.appendChild(sectionNavPoint);
            }
            sectionNavPoint = navPoint;

            // navHTML
            const li = genNavHtmlLi(sectionName, sectionHtmlFileName);
            sectionNavOl = self.navHtml.createElement("ol");
            li.appendChild(sectionNavOl);
            navHtmlTocOl.appendChild(li);

            // TOC.html
            const div = genTocDiv(
              "sgc-toc-level-1",
              sectionName,
              sectionHtmlFileName
            );
            if (sectionTOCDiv) {
              self.tocBody.appendChild(sectionTOCDiv);
            }
            sectionTOCDiv = div;
          }
        }
        for (const chpater of chpaters) {
          const chapterHtmlFileName = chpater.chapterHtmlFileName;
          if (sectionName) {
            // spine
            appendSpine(chapterHtmlFileName);

            // navMap
            i++;
            const navPoint = genNavPoint(
              i,
              chpater.chapterName ?? "",
              chapterHtmlFileName
            );
            sectionNavPoint?.appendChild(navPoint);

            // navHTML
            sectionNavOl?.appendChild(
              genNavHtmlLi(chpater.chapterName ?? "", chapterHtmlFileName)
            );

            // TOC.html
            const div = genTocDiv(
              "sgc-toc-level-2",
              chpater.chapterName ?? "",
              chapterHtmlFileName
            );
            sectionTOCDiv?.appendChild(div);
          } else {
            // spine
            appendSpine(chapterHtmlFileName);

            // navMap
            i++;
            const navPoint = genNavPoint(
              i,
              chpater.chapterName ?? "",
              chapterHtmlFileName
            );
            self.navMap.appendChild(navPoint);

            // navHTML
            navHtmlTocOl.appendChild(
              genNavHtmlLi(chpater.chapterName ?? "", chapterHtmlFileName)
            );

            // TOC.html
            const div = genTocDiv(
              "sgc-toc-level-2",
              chpater.chapterName ?? "",
              chapterHtmlFileName
            );
            self.tocBody.appendChild(div);
          }
        }
      }
      if (sectionNavPoint) {
        self.navMap.appendChild(sectionNavPoint);
      }
      if (sectionTOCDiv) {
        self.tocBody.appendChild(sectionTOCDiv);
      }

      // content.opf
      await self.epubZip.file(
        "OEBPS/content.opf",
        new Blob(
          [
            new XMLSerializer()
              .serializeToString(self.contentOpf)
              .replaceAll('xmlns=""', "")
              .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
              .replaceAll(/[\u{007f}-\u{009f}]/gu, ""),
          ],
          { type: "application/oebps-package+xml" }
        )
      );
      // toc.ncx
      await self.epubZip.file(
        "OEBPS/toc.ncx",
        new Blob(
          [
            new XMLSerializer()
              .serializeToString(self.ncx)
              .replaceAll('xmlns=""', "")
              .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
              .replaceAll(/[\u{007f}-\u{009f}]/gu, ""),
          ],
          { type: "application/x-dtbncx+xml" }
        )
      );
      // nav.xhtml
      await self.epubZip.file(
        "OEBPS/nav.xhtml",
        new Blob(
          [
            new XMLSerializer()
              .serializeToString(self.navHtml)
              .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
              .replaceAll(/[\u{007f}-\u{009f}]/gu, ""),
          ],
          {
            type: "application/xhtml+xml",
          }
        )
      );
      // TOC.xhtml
      await self.epubZip.file(
        "OEBPS/TOC.xhtml",
        new Blob(
          [
            new XMLSerializer()
              .serializeToString(self.toc)
              .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
              .replaceAll(/[\u{007f}-\u{009f}]/gu, ""),
          ],
          { type: "application/xhtml+xml" }
        )
      );

      function appendManifest(htmlFileName: string) {
        const item = self.contentOpf.createElement("item");
        item.id = htmlFileName;
        item.setAttribute("href", htmlFileName);
        item.setAttribute("media-type", "application/xhtml+xml");
        if (!self.manifest.querySelector(`itme[id="${htmlFileName}"]`)) {
          self.manifest.appendChild(item);
        }
      }

      function appendSpine(htmlFileName: string) {
        const itemref = self.contentOpf.createElement("itemref");
        itemref.setAttribute("idref", htmlFileName);
        self.spine.appendChild(itemref);
      }

      function genNavPoint(num: number, name: string, htmlFileName: string) {
        const navPoint = self.ncx.createElement("navPoint");
        navPoint.id = `navPoint-${num}`;
        navPoint.setAttribute("playOrder", num.toString());
        const navLabel = self.ncx.createElement("navLabel");
        const text = self.ncx.createElement("text");
        text.textContent = name;
        const content = self.ncx.createElement("content");
        content.setAttribute("src", htmlFileName);
        navLabel.appendChild(text);
        navPoint.appendChild(navLabel);
        navPoint.appendChild(content);
        return navPoint;
      }

      function genNavHtmlLi(name: string, htmlFileName: string) {
        const li = self.navHtml.createElement("li");
        const a = self.navHtml.createElement("a");
        a.textContent = name;
        a.href = htmlFileName;
        li.appendChild(a);
        return li;
      }

      function genTocDiv(
        className: string,
        name: string,
        htmlFileName: string
      ) {
        const div = self.toc.createElement("div");
        div.className = className;
        const a = self.toc.createElement("a");
        a.href = htmlFileName;
        a.innerText = name;
        div.appendChild(a);
        return div;
      }

      function genSectionHtmlFile(sectionName: string) {
        const _htmlText = section.render({ sectionName: sectionName });
        const htmlText = convertHTMLtoXHTML(_htmlText);
        return new Blob(
          [
            `<?xml version="1.0" encoding="utf-8"?>`,
            htmlText
              .replaceAll("data-src-address", "src")
              .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
              .replaceAll(/[\u{007f}-\u{009f}]/gu, "")
              .replace(
                '<html xmlns="http://www.w3.org/1999/xhtml">',
                '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">'
              ),
          ],
          {
            type: "application/xhtml+xml",
          }
        );
      }
    }

    async function saveZipFiles() {
      log.debug("[save-zip]保存元数据文本");
      const metaDateText = self.genMetaDateTxt(self.book);
      await self.epubZip.file(
        "OEBPS/info.txt",
        new Blob([metaDateText], { type: "text/plain;charset=utf-8" })
      );

      log.debug("[save-zip]保存web样式");
      await self.epubZip.file(
        "OEBPS/web.css",
        new Blob([webStyleText], { type: "text/css;charset=utf-8" })
      );
      modifyTocStyleText();
      await self.epubZip.file(
        "OEBPS/toc.css",
        new Blob([self.tocStyleText], { type: "text/css;charset=utf-8" })
      );
      await self.epubZip.file(
        "OEBPS/web.js",
        new Blob(
          [
            `if (typeof fetch === "function" && !navigator.userAgent.includes("calibre-viewer") && navigator.userAgent.startsWith("Mozilla/5.0")) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "web.css";
  document.head.append(link);
}`,
          ],
          { type: "application/javascript" }
        )
      );

      log.debug("[save-zip]开始生成并保存 index.html");
      await saveIndex();

      log.debug("[save-zip]开始保存 Meta Data Json");
      await saveMetaJson();

      function modifyTocStyleText() {
        if (self.book.additionalMetadate.cover) {
          self.tocStyleText = `${self.tocStyleText}
    .info {
      display: grid;
      grid-template-columns: 30% 70%;
    }`;
        } else {
          self.tocStyleText = `${self.tocStyleText}
    .info {
      display: grid;
      grid-template-columns: 100%;
    }`;
        }
      }

      async function saveIndex() {
        log.debug("[save]对 chapters 排序");
        self.chapters.sort(self.chapterSort);

        const sectionsListObj = getSectionsObj(self.chapters, self.chapterSort);

        const _indexHtmlText = index.render({
          creationDate: Date.now(),
          bookname: self.book.bookname,
          author: self.book.author,
          cover: self.book.additionalMetadate.cover,
          introductionHTML: self.book.introductionHTML?.outerHTML,
          bookUrl: self.book.bookUrl,
          sectionsObj: Object.values(sectionsListObj),
          Status,
        });
        const indexHtmlText = convertHTMLtoXHTML(_indexHtmlText);
        await self.epubZip.file(
          "OEBPS/index.xhtml",
          new Blob(
            [
              indexHtmlText
                .replaceAll("data-src-address", "src")
                .replaceAll(/[\u{0000}-\u{001f}]/gu, "")
                .replaceAll(/[\u{007f}-\u{009f}]/gu, ""),
            ],
            {
              type: "application/xhtml+xml; charset=UTF-8",
            }
          )
        );
      }

      async function saveMetaJson() {
        await self.epubZip.file(
          "OEBPS/book.json",
          new Blob([JSON.stringify(self.book)], {
            type: "application/json; charset=utf-8",
          })
        );

        await self.epubZip.file(
          "OEBPS/chapters.json",
          new Blob([JSON.stringify(self.book.chapters)], {
            type: "application/json; charset=utf-8",
          })
        );
      }
    }
  }

  public async addChapter(chapter: Chapter, suffix = "") {
    const chapterName = this.getchapterName(chapter);
    const chapterNumberToSave = this.getChapterNumberToSave(
      chapter,
      this.chapters
    );
    const chapterHtmlFileName = `No${chapterNumberToSave}Chapter${suffix}.xhtml`;
    chapter.chapterHtmlFileName = chapterHtmlFileName;

    log.debug(`[save-epub]保存章HTML文件：${chapterName}`);
    const chapterHTMLBlob = EPUB.genChapterHtmlFile(chapter);
    await this.epubZip.file(`OEBPS/${chapterHtmlFileName}`, chapterHTMLBlob);

    const item = this.contentOpf.createElement("item");
    item.id = chapterHtmlFileName;
    item.setAttribute("href", chapterHtmlFileName);
    item.setAttribute("media-type", "application/xhtml+xml");
    if (!this.manifest.querySelector(`item[id="${chapterHtmlFileName}"]`)) {
      this.manifest.appendChild(item);
    }

    if (chapter.contentImages && chapter.contentImages.length !== 0) {
      log.debug(`[save-epub]保存章节附件：${chapterName}`);
      for (const attachment of chapter.contentImages) {
        await this.addAttachment(attachment);
      }
    }
  }

  private async addAttachment(attachment: AttachmentClass) {
    if (attachment.status === Status.finished && attachment.Blob) {
      log.debug(
        `[save-epub]添加附件，文件名：${attachment.name}，对象`,
        attachment.Blob
      );

      await this.epubZip.file(`OEBPS/${attachment.name}`, attachment.Blob);

      const item = this.contentOpf.createElement("item");
      item.id = attachment.name;
      item.setAttribute("href", attachment.name);
      const mimetype = extensionToMimetype(
        attachment.name.substring(attachment.name.lastIndexOf(".") + 1)
      );
      item.setAttribute("media-type", mimetype);
      if (!this.manifest.querySelector(`item[id="${attachment.name}"]`)) {
        this.manifest.appendChild(item);
      }
    } else if (attachment.status === Status.saved) {
      log.debug(`[save-epub]附件${attachment.name}已添加`);
    } else {
      log.warn(
        `[save-epub]添加附件${attachment.name}失败，该附件未完成或内容为空。`
      );
      log.warn(attachment);
    }
  }
}
