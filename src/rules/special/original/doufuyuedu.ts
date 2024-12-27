import {
    getExt,
    getAttachment,
    putAttachmentClassCache,
} from "../../../lib/attachments";
import { fetchWithRetry, getFrameContentEvent } from "../../../lib/http";
import { concurrencyRun } from "../../../lib/misc";
import { calculateSha1 } from "../../../lib/hash";
import { log } from "../../../log";
import { AttachmentClass } from "../../../main/Attachment";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { Status } from "../../../main/main";
import { rm } from "../../../lib/dom";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { cleanDOM } from "../../../lib/cleanDOM";

export class doufuyuedu extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "naive";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }
    public async bookParse() {
        const bookUrl = document.location.href;
        const bookID = bookUrl.match(/novel-(\d+)/)![1];
        const bookname = (document.querySelector("h1.book_tt") as HTMLElement).innerText.trim();
        const author = (document.querySelector("div.user_name") as HTMLElement).innerText.trim();
        const introductionHTML = document.createElement("div");
        introductionHTML.innerHTML = (document.querySelector("div.book_des") as HTMLElement).innerHTML;
        rm("a", true, introductionHTML);
        rm("span", true, introductionHTML);
        const introduction = introductionHTML.innerText;
        const additionalMetadate = {} as BookAdditionalMetadate;
        const coverUrl = (document.querySelector("img.book_img ") as HTMLImageElement).src; 
        getAttachment(coverUrl, "TM", "vertical_cover-")
            .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
            .catch((error) => log.error(error));
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.book_subtt > span.book_tag")).map((tag) => (tag as HTMLElement).innerText);
        const chapters:Chapter[] = [];
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        const sectionList = document.querySelectorAll("div.catelogue");
        Array.from(sectionList).forEach((section) => {
            sectionNumber++;
            sectionChapterNumber = 0;
            const sectionName = (section.querySelector("div.catelogue_hd") as HTMLElement).innerText.trim();
            const chapterList = section.querySelectorAll("div.catelogue_bd > ul > li > a");
            const isVIP = ((section.querySelector("i.icon-vip") as HTMLElement) ?? null) == null;
            Array.from(chapterList).forEach((ep) => {
                const chapterUrl = (ep as HTMLAnchorElement).href;
                const chapterName = (ep as HTMLElement).innerText.trim();
                chapterNumber++;
                sectionChapterNumber++;    
                const isPaid = true;
                const options = {};
                const chapter = new Chapter({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName: sectionName,
                    sectionNumber: sectionNumber,
                    sectionChapterNumber: sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options,
                });
                chapters.push(chapter);
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
        isPaid: boolean,
        charset: string,
        options: object,
    ): Promise<ChapterParseObject> {
        const rawDom = await getFrameContentEvent(chapterUrl) ?? document.createElement("html");
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = (rawDom.querySelector("div#J_chapterContent") as HTMLElement).innerHTML;
        rm("span", true, contentRaw);
        const { dom, text, images } = await cleanDOM(contentRaw, "TM");
        return {
            chapterName,
            contentRaw: contentRaw,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
        }; 
    }
}