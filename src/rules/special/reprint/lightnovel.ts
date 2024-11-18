import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { ggetHtmlDOM, ggetText } from "../../../lib/http";
import { rm } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
import { _GM_xmlhttpRequest } from "../../../lib/GM";
import { UnsafeWindow } from "../../../global";

export class Lightnovel extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.maxRunLimit = 1;
        this.concurrencyLimit = 1;
        this.sleepTime = 700;
        this.maxSleepTime = 3000;
    }

    public async bookParse() {
        const bookUrl = document.location.href;
        let bookname = "";
        let author = "";
        let introDom = document.createElement("div") as HTMLElement;
        const additionalMetadate: BookAdditionalMetadate = {};
        const chapters: Chapter[] = [];
        const isVIP = false;
        const isPaid = false;
        if (bookUrl.includes("series")) {
            bookname = (document.querySelector("div.top-title h3") as HTMLElement)?.innerText ?? "";
            introDom = document.querySelector("pre.intro") as HTMLElement;
            // const coverUrl = (
            //     document.querySelector("div.collection-cover") as HTMLElement
            // ).getAttribute("style")?.match(/url\((.*?)\)/)?.[1];
            // if (coverUrl) {

            //     getAttachment(coverUrl, this.attachmentMode, "cover-")
            //         .then((coverClass) => {
            //             additionalMetadate.cover = coverClass;
            //         })
            //         .catch((error) => log.error(error));
            // }
            const cos = (unsafeWindow as any)?.__NUXT__?.data[0]?.pages;
            let chapterNumber = 0;
            for (const aElem of cos) {
                for (const i of aElem) {
                    /**
                        aid: 1092541
                        banner: "https://static.lightnovel.us/default_article_cover_h.png"
                        comments: 0
                        cover: "https://static.lightnovel.us/default_article_cover_v.png"
                        cover_type: 1
                        empty: 1
                        hits: 69601
                        last_time: "2021-12-01 22:04:54"
                        order: 100
                        time: "2021-10-26 21:53:17"
                        title: "第1话 我的女朋友出轨了我的学长"
                    */
                    chapterNumber++;
                    const chapterName = (i as any).title;
                    const chapterUrl = `https://www.lightnovel.us/cn/detail/${(i as any).aid}`;
                    
                    const chapter = new Chapter({
                        bookUrl,
                        bookname,
                        chapterUrl,
                        chapterNumber,
                        chapterName,
                        isVIP,
                        isPaid,
                        sectionName: null,
                        sectionNumber: null,
                        sectionChapterNumber: null,
                        chapterParse: this.chapterParse,
                        charset: this.charset,
                        options: {},
                    });
                    chapters.push(chapter);
                }
            }
        } else {
            bookname = document.querySelector("h2.article-title")?.textContent?.trim() ?? "";
            author = document.querySelector("div.author-name > span")?.textContent?.trim() ?? "";
            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl: bookUrl,
                chapterNumber:1,
                chapterName: "内容",
                isVIP,
                isPaid,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            chapters.push(chapter);
        }
        
        const [introduction, introductionHTML] = await introDomHandle(introDom);

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
    ) {
        const doc = await ggetHtmlDOM(chapterUrl, charset, {
            headers: {
                "Accept-Language": "zh-CN",
            },
        });
        const Dcontent = doc.querySelector("article#article-main-contents") as HTMLElement;
        const { dom, text, images } = await cleanDOM(Dcontent, "TM");
        return {
            chapterName,
            contentRaw: Dcontent,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
        };
    }
}
