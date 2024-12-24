import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { rm, rm2 } from "../../../lib/dom";
import { ggetHtmlDOM, getFrameContentEvent } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class lzdzw extends BaseRuleClass {
  public constructor() {
    super();
  }

    public async bookParse(): Promise<Book> {
        const bookUrl = document.location.href;
        const bookname = (
            document.querySelector(".book_info h1") as HTMLElement
        ).innerText.trim();
        const author = (
            document.querySelector(".book_info div.options li a") as HTMLAnchorElement
        ).innerText.trim();
        const intro = (
            document.querySelector("#intro_pc") as HTMLElement
        );
        rm("strong", true, intro);
        rm2(["您要是觉得《","》还不错的话请不要忘记向您QQ群和微博微信里的朋友推荐哦！"], intro);
        const [introduction, introductionHTML] = await introDomHandle(intro);
        const additionalMetadate: BookAdditionalMetadate = {};
        const coverUrl = (document.querySelector("img.img-thumbnail") as HTMLImageElement).src;
        getAttachment(coverUrl, this.attachmentMode, "cover-")
            .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
            .catch((error) => log.error(error));
        const chapters: Chapter[] = [];
        const match = bookUrl.match(/\/(\d+)\.html/);
        function getAList(doc: Document) {
            return doc.querySelectorAll(".book_list a");
        }
        const ALists: Element[] = [];
        if (match) {
            const id = match[1];
            const url = `https://www.lzdzw.com/book/${id}/1/`;
            const contentList = await ggetHtmlDOM(url).then((doc) => doc.querySelectorAll(".page-item option"));
            for (const a of Array.from(contentList)) {
                const url = "https://www.lzdzw.com/" + a.getAttribute("value");
                const dom = await ggetHtmlDOM(url);
                const AList = getAList(dom);
                for (const a of Array.from(AList)) {
                    ALists.push(a);
                }
            }
            let chapterNumber = 0;
            for (const a of ALists) {
                chapterNumber++;
                const chapterName = (a as HTMLElement).innerText;
                const chapterUrl = (a as HTMLAnchorElement).href;
                const chapter = new Chapter({
                    bookUrl,
                    bookname,
                    chapterUrl: chapterUrl,
                    chapterNumber: chapterNumber,
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
        } else {
            throw new Error("获取小说ID失败");
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
        const content = document.createElement("div");
        const doc = await getFrameContentEvent(chapterUrl);
        function appendcontent(dom: Document | null) {
            if (!dom) return;
            const br = document.createElement("br");
            const ps = dom.querySelectorAll("#novelcontent p");
            for (const p of Array.from(ps)) {
                content.appendChild(p);
                content.appendChild(br);
            }
        }
        appendcontent(doc);
        const url = chapterUrl.replace(".html", "");
        let i = 0;
        while (i< 10000) {
            i++;
            const newUrl = url + '_' + i + ".html";
            const dom = await ggetHtmlDOM(newUrl);
            if (dom.title.match("第1页"))
                break;
            appendcontent(dom);
        }
        rm2(["请关闭浏览器阅读模式后查看本章节，否则将出现无法翻页或章节内容丢失等现象。"], content);
        const text = content.innerText;
        return {
            chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: content,
            contentImages: null,
            additionalMetadate: null,
        };
    }
}
    