import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import * as CryptoJS from "crypto-js";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { cleanDOM } from "../../../lib/cleanDOM";
import { Chapter, ChapterAdditionalMetadate } from "../../../main/Chapter";
import { getAttachment } from "../../../lib/attachments";
import { log } from "../../../log";
import { ggetHtmlDOM, getFrameContentEvent } from "../../../lib/http";
import { rm } from "../../../lib/dom";
export class ihuaben extends BaseRuleClass {
    public constructor() {
        super();
        this.concurrencyLimit = 1;
        this.attachmentMode = "TM";
    }

    public async bookParse(): Promise<Book> {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("h1.text-danger") as HTMLElement)?.innerText;
        const author = (document.querySelector("a.text-muted") as HTMLElement)?.innerText;
        const introduction = (document.querySelector("div.aboutbook") as HTMLElement)?.innerText;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerText = introduction;
        const coverUrl = (document.querySelector("div.cover img") as HTMLImageElement)?.src;
        const additionalMetadate: BookAdditionalMetadate = {
            tags: Array.from(document.querySelectorAll("div.tagList a")).map((e) => (e as HTMLElement).innerText),
            language: "zh",
        };
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((img) => {
                    additionalMetadate.cover = img;
                })
                .catch((error) => log.error(error));
        }
        const chapternumsMatch = (document.querySelector("div.chapters h2.hidden-xs a") as HTMLElement)?.innerText?.match(/\d+/);
        let chapternums = chapternumsMatch ? parseInt(chapternumsMatch[0]) : 0;
        chapternums = Math.ceil(chapternums / 40);
        const chapterList = Array.from(getList(document));
        for (let i = 2; i <= chapternums; i++) { 
            const url = bookUrl + "?page=" + i;
            const dom = await ggetHtmlDOM(url);
            getList(dom).forEach((e) => chapterList.push(e));
        }
        let chapterNumber = 0;
        const chapters = chapterList.map((c) => {
            const cc = c as HTMLAnchorElement;
            const chapterUrl = cc.href;
            const ChapterName = cc.innerText;
            chapterNumber++;
            return new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber: chapterNumber,
                chapterName: ChapterName,
                isVIP: false,
                isPaid: false,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
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
        contentRaw.innerHTML = (await getFrameContentEvent(chapterUrl))?.querySelector("div.discription")?.innerHTML ?? "";
        rm("i", true, contentRaw);
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
function getList(dom: Document) {
    return dom.querySelectorAll("div.chapterlist span.chapterTitle a");
}