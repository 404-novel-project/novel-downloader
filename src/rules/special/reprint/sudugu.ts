import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { rm, rms } from "../../../lib/dom";
import { ggetHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Sudugu extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.maxRunLimit = 1;
        this.concurrencyLimit = 1;
        this.sleepTime = 500;
        this.maxSleepTime = 1000;
        this.charset = "utf-8";
    }

    public async bookParse(): Promise<Book> {
        const bookUrl = location.href;
        const bookname = (document.querySelector("div.itemtxt > h1 > a") as HTMLElement).innerText
        const author = (document.querySelector("div.itemtxt > p > a") as HTMLElement).innerText.replace(/作者：/, "").trim()
        const intro = document.querySelector("div.des");
        const [introduction, introductionHTML] = await introDomHandle(intro);

        const genre = Array.from(document.querySelectorAll("div.itemtxt > p > span")).map(
            (element) => (element as HTMLElement).innerText.trim()
        );
        const additionalMetadate: BookAdditionalMetadate = {
            tags: genre,
        };
        const coverUrl = document.querySelector("div.item img")?.getAttribute("src")!;
        getAttachment(coverUrl, this.attachmentMode, "cover-")
            .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
            .catch((error) => log.error(error));

        const chapters: Chapter[] = [];
        let chapterId = 0;
        let dirurl = bookUrl;
        while (true) {
            const doc = await ggetHtmlDOM(dirurl, this.charset);
            Array.from(doc.querySelectorAll("div#list > ul > li > a")).forEach((element) => {
                chapterId++;
                const chapterUrl = (element as HTMLAnchorElement).getAttribute("href")!;
                const chapterName = (element as HTMLAnchorElement).innerText.trim();
                const chapter = new Chapter({
                    bookUrl,
                    bookname,
                    chapterUrl: chapterUrl,
                    chapterNumber: chapterId,
                    chapterName: chapterName,
                    isVIP: false,
                    isPaid: false,
                    sectionName: null,
                    sectionNumber: null,
                    sectionChapterNumber: null,
                    chapterParse: this.chapterParse.bind(this),
                    charset: this.charset,
                    options: {},
                });
                chapters.push(chapter);
            });
            const nextPage = doc.querySelectorAll("div#pages > a")
            const lastLink = nextPage.length > 0 ? nextPage[nextPage.length - 1] : null;
            if (lastLink) {
                const nextUrl = lastLink as HTMLAnchorElement;
                if(nextUrl.innerText.trim() === "下一页") {
                    dirurl = nextUrl.getAttribute("href")!;
                } else {
                    break;
                }
            } else {
                break;
            }
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
        isPaid: boolean | null,
        charset: string,
        options: Record<string, any>
    ): Promise<ChapterParseObject> {

        let pageUrl = chapterUrl;
        const content = document.createElement("div");
        while (true) {
            const doc = await ggetHtmlDOM(pageUrl, charset);
            content.innerHTML += (doc.querySelector("div.con") as HTMLElement).innerHTML;
            const pages = doc.querySelectorAll("div.prenext > span > a");
            const lastLink = pages.length > 0 ? pages[pages.length - 1] : null;
            if (lastLink) {
                const nextUrl = lastLink as HTMLAnchorElement;
                if(nextUrl.innerText.trim() === "下一页") {
                    pageUrl = nextUrl.getAttribute("href")!;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

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

