import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { insertBrBeforeText, rm } from "../../../lib/dom";
import { getFrameContentEvent, getHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { getSectionName, introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { Status } from "../../../main/main";
import { BaseRuleClass } from "../../../rules";
import { mkRuleClass } from "../../onePage/template";

export class faloo extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
        this.sleepTime = 900;
        this.maxSleepTime = 2000;
    }
    public async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (
            document.querySelector("h1#novelName") as HTMLElement
        ).innerText.trim();
        const author = (
            document.querySelector(
                "img.rentouOne"
            ) as HTMLAnchorElement
        ).innerText.trim();
        const introDom = document.querySelector("div.T-L-T-C-Box1") as HTMLDivElement;
        let introduction = null;
        let introductionHTML = null;
        if (introDom) {
            [introduction, introductionHTML] = await introDomHandle(
                introDom,
            );
        }
        const additionalMetadate: BookAdditionalMetadate = {};
        const coverUrl =
            (document.querySelector("img.imgcss") as HTMLImageElement)
                ?.src ?? null;
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
        }
        additionalMetadate.tags = Array.from(
            document.querySelectorAll("div.T-R-T-B2-Box1 a")
        ).map((a) => (a as HTMLAnchorElement).innerText.trim());
        const aList = document.querySelectorAll("div.C-Fo-Zuo div.DivTable a");
        const sections = document.querySelectorAll("div.C-Fo-Zuo h3 a");
        const chapters: Chapter[] = [];
        function getName(aElem: Element) {
            return (aElem as HTMLElement)?.innerText.trim();
        }
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        let sectionName = null;
        for (const aElem of Array.from(aList) as HTMLAnchorElement[]) {
            const chapterName = aElem.innerText.trim();
            const chapterUrl = aElem.href;
            const _sectionName = getSectionName(aElem, sections, getName);
            if (_sectionName !== sectionName) {
                sectionName = _sectionName;
                sectionNumber++;
                sectionChapterNumber = 0;
            }
            chapterNumber++;
            sectionChapterNumber++;
            const isVIP = false;
            const isPaid = false;
            const chapter: Chapter | void = new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName,
                sectionNumber: sectionNumber,
                sectionChapterNumber: sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: { bookname },
            });
            if (isVIP && !isPaid) {
                chapter.status = Status.aborted;
            }
            if (chapter) {
                chapters.push(chapter);
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
        isPaid: boolean,
        charset: string,
        options: object
    ) {
        const doc = await getHtmlDOM(chapterUrl, charset);
        if (!doc) {
            throw new Error("chapterParse: getHtmlDOM error");
        }
        const doms = doc.querySelector("div.noveContent") as HTMLElement;
        const content = document.createElement("div");
        if (doms) {
            rm("b", true, doms);
            if (doms.querySelector("div.con_img")) {
                const domain = "https://read.faloo.com/";
                const script = Array.from(doc.querySelectorAll('script')).find(s => s?.textContent && s.textContent.includes('image_do3'));
                if (script) {
                    const match = script?.textContent?.match(/image_do3(.*)/);
                    //(.,.,......,..,..,0,'........','1......','','16','666666',1,1,0,1,'2024-12-30 01...')
                    if (match) {
                        const [num, o, id, n, en, t, k, u, time, fontsize, fontcolor, chaptertype, font_family_type, background_type, unt, now_time] = match[1].split(/['",]+/).filter(Boolean);
                        const fontcolor1 = "000000";
                        const url = domain + "Page4VipImage.aspx?num=" + num + "&o=" + o + "&id=" + id + "&n=" + n
                            + "&ct=" + chaptertype + "&en=" + en + "&t=" + t + "&font_size=" + fontsize
                            + "&font_color=" + fontcolor1 + "&FontFamilyType=" + font_family_type + "&backgroundtype="
                            + background_type + "&u=" + u + "&time="+time + "&k=" + k;
                        const img = document.createElement("img");
                        img.alt = "VIP图片章节，请使用Epub下载";
                        img.src = url;
                        content.appendChild(img);
                    }
                }
            } else {
                content.innerHTML = doms.innerHTML;
            }
            const { dom, text, images } = await cleanDOM(content, "TM", undefined);
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
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