import { getAttachment } from "../../../lib/attachments";
import { cleanDOM, htmlTrim } from "../../../lib/cleanDOM";
import { getFrameContentCondition, ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { rm, rm2 } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class QQBook extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.concurrencyLimit = 1;
    }

    public async bookParse() {
        const bookUrl = document.location.href;
        const bookIdMatch = bookUrl.match(/book\.qq\.com\/book-detail\/(\d+)/);
        const bookId = bookIdMatch ? bookIdMatch[1] : null;
        const author = (document.querySelector(".book-meta a") as HTMLElement)?.innerText;
        const authorId = document
            .getElementById("authorId")
            ?.getAttribute("data-authorid");
        const bookname = (document.querySelector(".book-title") as HTMLElement)?.innerText;
        const introDom = document.querySelector(".book-intro");
        const [introduction, introductionHTML] = await introDomHandle(introDom);
        const additionalMetadate: BookAdditionalMetadate = {};
        const coverUrl = (
            document.querySelector(".book-cover > img") as HTMLImageElement
        ).src;
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
        }
        additionalMetadate.tags = Array.from(
            document.querySelectorAll(".book-tags > a")
        ).map((a) => (a as HTMLAnchorElement).innerText.trim());
        const sectionName = null;
        const sectionNumber = 0;
        let chapterNumber = 0;
        const chapters: Chapter[] = [];
        let chapterList = null;
        try {
            chapterList = document.querySelectorAll(".tab-panel")[1]
                ?.querySelectorAll(".book-dir")[1]
                ?.querySelectorAll("li.list");
        } catch (e) {
            throw new Error("章节列表获取失败" + e);
        }
        for (const s of Array.from(chapterList)) {
            const isVIP = s.querySelector(".lock") != null;
            let sectionChapterNumber = 0;
            const a = s.querySelector("a");
            chapterNumber++;
            sectionChapterNumber++;
            const chapterName = (a as HTMLAnchorElement).innerText.trim();
            const chapterUrl = (a as HTMLAnchorElement).href;


            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVIP,
                isPaid: true,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {
                },
            });

            if (isVIP) {
                chapter.status = Status.aborted;
                if (chapter.isPaid) {
                    chapter.status = Status.pending;
                }
            }
            //
            chapters.push(chapter);
        }
        return new Book({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
    }

    public async chapterParse(
        chapterUrl: string,
        chapterName: string | null,
        isVIP: boolean,
        isPaid: boolean,
        charset: string,
        options: object
    ) {
        const nullObj = {
            chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };

        async function getChapter(): Promise<ChapterParseObject> {
            let doc;
            const selector = "#article";
            if (isVIP) {
                doc = await ggetHtmlDOM(chapterUrl, charset);
                if (
                    !doc.querySelector(selector) ||
                    (doc.querySelector(selector)?.childElementCount ?? 0) < 10
                ) {
                    doc = await getFrameContentCondition(chapterUrl, (frame) => {
                        const doc = frame.contentWindow?.document ?? null;
                        if (doc) {
                            return doc.querySelectorAll(selector).length !== 0;
                        } else {
                            return false;
                        }
                    });
                    if (doc) {
                        doc = new DOMParser().parseFromString(
                            doc.documentElement.outerHTML,
                            "text/html"
                        );
                    }
                }
            } else {
                doc = await ggetHtmlDOM(chapterUrl, charset);
            }

            if (doc) {
                chapterName = (
                    doc.querySelector("h1.chapter-title") as HTMLElement
                ).innerText.trim();
                // // VIP章节
                // if (doc.querySelector(".vip-limit-wrap")) {
                //   return nullObj;
                // }

                const content = document.createElement("div");
                let contentText = "";

                const contentMain = doc.querySelector(selector) as HTMLElement;
                if (contentMain) {
                    const { dom, text, images } = await cleanDOM(contentMain, "TM");
                    htmlTrim(dom);
                    content.appendChild(dom);
                    rm2([/^谷[\u4e00-\u9fa5]{0,1}$/gm], content);

                    contentText = contentText + text;
                    return {
                        chapterName,
                        contentRaw: content,
                        contentText,
                        contentHTML: content,
                        contentImages: images,
                        additionalMetadate: null,
                    };
                }
            }
            return nullObj;
        }
        return getChapter();
    }
}
