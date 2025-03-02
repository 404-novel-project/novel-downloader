import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getFrameContentEvent } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
import { rm, sandboxed } from "../../../lib/dom";
import { _GM_xmlhttpRequest } from "../../../lib/GM";


export class Langge extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.streamZip = true;
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }

    public async bookParse() {
        const bookUrl = document.location.href;
        const chapterUrlPrefix = bookUrl.replace("online_detail", "online_reader") + "&item_id=";
        const bookname = (
            document.querySelector("div.book-info > h1") as HTMLHeadElement
        ).innerText.trim();
        const authorDom = document.querySelector("div.book-info > p") as HTMLElement;
        rm("strong", true, authorDom);
        const author = (
            authorDom as HTMLAnchorElement
        ).innerText
            .trim();
        const introDom = document.querySelector("div.book-info") as HTMLElement;
        const coverUrl = (document.querySelector("img.book-cover") as HTMLImageElement).src;
        const [introduction, introductionHTML] = await introDomHandle(introDom);

        const additionalMetadate: BookAdditionalMetadate = {};
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
        }
        const regex = /goToChapter\('(\d+)'/;
        const chapters: Chapter[] = [];
        const chapterList = Array.from(document.querySelectorAll("#chapterList > div.chapter-item"));
        let i = 0;
        for (const c of chapterList) {
            i++;
            const onclickAttr = c.getAttribute("onclick")?.toString() ?? "";
            const match = onclickAttr.match(regex);
            let chapterID = "-1";
            if (match) {
                chapterID = match[1];
            } else {
                throw Error(`Match ${onclickAttr} ID失败，结果为${match}`)
            }
            const chapterName = c.querySelector("span")?.innerText ?? i.toString();
            //https://api.langge.cf/online_reader?item_id=7475639215670182424&source=%E7%95%AA%E8%8C%84&book_id=7475640580433773080

            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl: chapterUrlPrefix + chapterID,
                chapterNumber: i,
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
        let chapterTrueUrl = chapterUrl.replace("/online_reader?", "/content?");
        const secretKey2 = getCookie('secretKey2');
        chapterTrueUrl += '&key=' + secretKey2;
        log.debug(`[Chapter]请求 ${chapterTrueUrl}，Refer：${chapterUrl}`);
        const chapter: ChapterInfo = await new Promise((resolve) => {
            _GM_xmlhttpRequest({
                url: chapterTrueUrl,
                headers: {
                    'cache-control': 'no-cache', 'accept-encoding': 'gzip, deflate, br, zstd' },
                method: "GET",
                onload: function (response) {
                    if (response.status === 200) {
                        const resultI: ChapterInfo = JSON.parse(
                            response.responseText
                        );
                        resolve(resultI);
                    }
                    else {
                        log.error(`response status = ${response.status}`);
                        const resultI: ChapterInfo = JSON.parse(
                            `{"code": 500`
                        );
                        resolve(resultI);
                    }
                }
            })
        });
        if (chapter.code === 500)
            throw new Error("chapter get error");
        const content = chapter.content;
        if (content) {
            const Dcontent = document.createElement("div");
            Dcontent.innerText = content;
            const { dom, text, images } = await cleanDOM(Dcontent, "TM");
            return {
                chapterName,
                contentRaw: Dcontent,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        } else {
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
}

function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

interface ChapterInfo {
    code: number;
    title: string;
    content: string;
    is_vip: boolean;
}