import { log } from "../../../log";
import { getAttachment } from "../../../lib/attachments";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { Chapter } from "../../../main/Chapter";
import { getHtmlDOM, gfetch } from "../../../lib/http";
import { Status } from "../../../main/main";
import { cleanDOM } from "../../../lib/cleanDOM";
import { sleep } from "../../../lib/misc";
import { _GM_xmlhttpRequest } from "../../../lib/GM";
import { UnsafeWindow } from "../../../global";
import { rm2 } from "../../../lib/dom";
import { getSectionName } from "../../../lib/rule";

export class Lcread extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.concurrencyLimit = 1;
    }
    public async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("#l1_a .bri h1") as HTMLElement)?.innerText;
        const author = (document.querySelector("#l1_a .bri tr td a") as HTMLElement)?.innerText;
        const introduction = (document.querySelector("#l1_a .bri #bri2") as HTMLElement)?.innerText;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerText = introduction;
        const additionalMetadate: BookAdditionalMetadate = {};
        const coverUrl = (document.querySelector("#l1_a .brc img") as HTMLImageElement) ?.src;
        getAttachment(coverUrl, this.attachmentMode, "cover-")
            .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
            .catch((error) => log.error(error));
        additionalMetadate.tags = (document.querySelector("#l1_a .bri #bri3") as HTMLElement)?.innerText
            ?.split("，")
            .map((t) => t.trim());
        const chapters: Chapter[] = [];
        const chapterElems = document.querySelectorAll("#cul td");
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        let sectionName = null;
        function getSName(sElem: Element): string {
            return (sElem as HTMLElement).innerText.trim();
        }
        const sectionElems = document.querySelectorAll("#cul h3");
        for (const elem of Array.from(chapterElems)) {
            const chapterUrl = (elem.querySelector("a") as HTMLAnchorElement)?.href;
            if (!chapterUrl) {
                continue;
            }
            chapterNumber++;
            const _sectionName = getSectionName(elem, sectionElems, getSName);
            if (sectionName !== _sectionName && _sectionName) {
                sectionName = _sectionName;
                sectionNumber++;
                sectionChapterNumber = 0;
            }
            if (_sectionName) {
                sectionChapterNumber++;
            }
            const chapterName = (elem.querySelector("span font") as HTMLElement)?.innerText;
            const isVIP = elem.querySelectorAll("span font").length > 1 ? true : false;
            // 无法从章节列表判断章节支付情况
            const isPaid = null;
            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVIP,
                isPaid,
                sectionName: _sectionName,
                sectionNumber: sectionNumber,
                sectionChapterNumber: sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            const isLogin = !document
                .querySelector("div#brl div#tip")
                ?.innerHTML.includes("登录后发帖不用输入验证码，并获得评论积分，升级职业得到更多作品推荐票!");
            if (chapter.isVIP && !isLogin) {
                chapter.status = Status.aborted;
            }
            chapters.push(chapter);
        }
        const book = new Book({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    public async chapterParse(
        chapterUrl: string,
        chapterName: string | null,
        isVIP: boolean,
        isPaid: boolean,
        charset: string,
        options: object
    ): Promise<ChapterParseObject> {

        log.debug(`[Chapter]请求 ${chapterUrl}`);
        const doc = await getHtmlDOM(chapterUrl, charset);

        const content = document.createElement("div");
        const contentText = doc.querySelector("#ccon") as HTMLElement;
        rm2(['    '], contentText);
        content.innerHTML = contentText.innerHTML;
        const { dom, text, images } = await cleanDOM(content, "TM");
        return {
            chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
        };
    }
}

