import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM, gfetch } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { rm } from "../../../lib/dom";
export class po18 extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.concurrencyLimit = 1;
    }

    public async bookParse() {
        const bookUrl = document.location.href;
        const bookID = bookUrl.match(/books\/(\d+)/)?.[1];
        const bookname = (
            document.querySelector("h1.book_name") as HTMLElement
        ).innerText.trim();
        const author = (
            document.querySelector("a.book_author") as HTMLElement
        ).innerText.trim();

        const introDom = document.querySelector(
            "div.B_I_content"
        ) as HTMLElement;
        const [introduction, introductionHTML] = await introDomHandle(introDom);

        const additionalMetadate: BookAdditionalMetadate = {};
        const coverUrl = (
            document.querySelector("div.book_cover > img") as HTMLImageElement
        ).src;
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
        }
        additionalMetadate.tags = Array.from(
            document.querySelectorAll("div.book_intro_tags > a")
        ).map((a) => (a as HTMLAnchorElement).innerText.trim());
        const dom = await getHtmlDOM(`https://www.po18.tw/books/${bookID}/articles`);
        const chapters: Chapter[] = [];
        const cos = dom.querySelectorAll("div.list-view div.c_l");
        let chapterNumber = 0;
        for (const aElem of Array.from(cos)) {
            chapterNumber++;
            const Elema = aElem.querySelector("div.l_chaptname") as HTMLElement;
            const Elemb = aElem.querySelector("div.l_btn a") as HTMLElement;
            const chapterName = Elema.innerText.trim();
            const chapterUrl = (Elema.querySelector("a") as HTMLAnchorElement)?.href ?? "javscript:void(0)";
            const isVIP  = Elemb.innerText.trim() != "免費閱讀";
            const isPaid = Elema.querySelector("a") ? true : false;
            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVIP,
                isPaid: isPaid,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            if (isVIP) {
                chapter.status = Status.aborted;
                if (chapter.isPaid) {
                    chapter.status = Status.pending;
                }
            }
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
        options: object,
    ) {
        log.debug(`[Chapter]请求 ${chapterUrl}`);
        const chapterID = chapterUrl.match(/articles\/(\d+)/)?.[1];
        const url = chapterUrl.replace('articles', 'articlescontent');
        const doc = await gfetch(url,{
            cookie: document.cookie,
            method: "GET",
            headers: {
                Accept: "text/html, */*; q=0.01",
                "X-Requested-With": "XMLHttpRequest",
                Referer: chapterUrl,
            },
        })
        const content = document.createElement("div");
        content.innerHTML = (await doc.responseText).replaceAll("<p>\n", "");
        rm("blockquote",true,content);
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
