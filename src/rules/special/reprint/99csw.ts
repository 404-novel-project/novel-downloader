import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { rm, rms } from "../../../lib/dom";
import { ggetHtmlDOM } from "../../../lib/http";
import { getFrameContentConditionWithWindow } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class I99csw extends BaseRuleClass {
    public constructor() {
        super();
        this.concurrencyLimit = 1;
        this.sleepTime = 600;
        this.maxSleepTime = 10000;
    }

    public async bookParse(): Promise<Book> {
        const $ = <T extends Element>(selector: string) =>
            document.querySelector<T>(selector);
        const bookUrl = location.href;
        const bookname = $<HTMLHeadingElement>("div#book_info > h2")!.innerText.trim();
        const author = $<HTMLElement>('div#book_info > h4 > a')!.innerText.trim();
        const intro = $<HTMLParagraphElement>("div#book_info > div.intro");
        const [introduction, introductionHTML] = await introDomHandle(intro);

        const additionalMetadate: BookAdditionalMetadate = {
        };
        const coverUrl = $<HTMLImageElement>("div#book_info img")!.getAttribute(
            "src"
        )!;
        getAttachment("https:" + coverUrl, "naive", "cover-")
            .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
            .catch((error) => log.error(error));

        const chapters: Chapter[] = [];
        let chapter_id = 0;
        const chapterList = Array.from(document.querySelectorAll("dl#dir > dd > a"));

        for (const elem of chapterList) {
            const chapterUrl = elem.getAttribute("href") || "";
            const chapter_name = (elem as HTMLElement).innerText.trim();
            chapter_id += 1;
            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl: chapterUrl,
                chapterNumber: chapter_id,
                chapterName: chapter_name,
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
        isPaid: boolean | null,
        charset: string,
        options: Record<string, any>
    ): Promise<ChapterParseObject> {
        const html = await getFrameContentConditionWithWindow(chapterUrl, (frame) => {
            frame.contentWindow?.scrollTo(0, frame.contentWindow.document.body.scrollHeight);
            const doc = frame.contentWindow?.document ?? null;
            if (doc) {
                const displayStyle = doc.querySelector("#cload")?.computedStyleMap().get("display")?.toString(); 
                return displayStyle === "none";
            } else {
                return false;
            }
        });
        const contentRaw = document.createElement("div");
        if (!html) {
            contentRaw.innerHTML = '获取章节内容失败';
        } else {
            
            const content = html.document.querySelector("#content") as HTMLElement;
            content.querySelectorAll("div").forEach((div) => {
                const style = html.getComputedStyle(div) as CSSStyleDeclaration;
                if (style.display !== "none") {
                    const p = document.createElement("p");
                    p.innerText = div.innerText;
                    contentRaw.appendChild(p);
                }
            });
            rm("abbm", true, contentRaw);
        }
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

