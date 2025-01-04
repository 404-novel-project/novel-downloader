import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import * as CryptoJS from "crypto-js";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { cleanDOM } from "../../../lib/cleanDOM";
import { Chapter, ChapterAdditionalMetadate } from "../../../main/Chapter";
import { getAttachment } from "../../../lib/attachments";
import { log } from "../../../log";
import { ggetHtmlDOM, getFrameContentEvent } from "../../../lib/http";
import { rm } from "../../../lib/dom";
export class kadokado extends BaseRuleClass {
    public constructor() {
        super();
        this.maxRunLimit = 1;
        this.sleepTime = 700;
        this.maxSleepTime = 4000;
        this.concurrencyLimit = 1;
        this.attachmentMode = "TM";
    }

    public async bookParse(): Promise<Book> {
        const bookUrl = document.location.href;
        const bookIDMatch = bookUrl.match(/book\/(\d+)/);
        const bookID = bookIDMatch ? bookIDMatch[1] : '000';
        const bookname = (document.querySelector("main > section div h1") as HTMLElement)?.innerText;
        const authorDom = (document.querySelector("main > section > div > div > span > a") as HTMLAnchorElement);
        const author = authorDom ? authorDom.innerText : "佚名";
        const authorIDMatch = authorDom?.href.match(/user\/(\d+)/);
        const authorID = authorIDMatch ? authorIDMatch[1] : '000';
        const introduction = (document.querySelector("section#introduction p") as HTMLElement)?.innerText;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerText = introduction;
        const coverUrl = (document.querySelector("main > section img") as HTMLImageElement)?.src;
        const additionalMetadate: BookAdditionalMetadate = {
            tags: Array.from(document.querySelectorAll("main > section > div > div > div > a")).map((e) => (e as HTMLElement).innerText),
            language: "zh",
        };
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((img) => {
                    additionalMetadate.cover = img;
                })
                .catch((error) => log.error(error));
        }
        const sectionList = Array.from(document.querySelectorAll("section#chapter > div >div"));
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        const chapters: Chapter[] = [];
        sectionList.forEach((e) => {
            sectionChapterNumber = 0;
            sectionNumber++;
            const sectionName = (e.querySelector("h3") as HTMLElement)?.innerText;
            const chapterList = Array.from(e.querySelectorAll("ul li"));
            chapterList.forEach((c) => {
                const chapterUrl = (c.querySelector("a") as HTMLAnchorElement).href + `?titleId=${bookID}&ownerId=${authorID}`;
                const ChapterName = (c.querySelector("h4") as HTMLElement).innerText;
                chapterNumber++;
                sectionChapterNumber++;
                chapters.push(new Chapter({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber: chapterNumber,
                    chapterName: ChapterName,
                    isVIP: false,
                    isPaid: false,
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                }));
            });
        });
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
        isPaid: boolean | null,
        charset: string,
        options: object
    ): Promise<ChapterParseObject> {
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = (await getFrameContentEvent(chapterUrl))?.querySelector("ul > div")?.innerHTML ?? "";
        const { dom, text, images } = await cleanDOM(contentRaw, "TM");
        return {
            chapterName,
            contentRaw,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate:null,
        };
    }
}