import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
import { Status } from "../../../main/main";
import { _GM_xmlhttpRequest } from "../../../lib/GM";
export class XRUnionread extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.streamZip = true;
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
        this.maxSleepTime = 2000;
        this.sleepTime = 500;
    }
    
    public async bookParse() {
        const bookUrl = document.location.href;
        const bookID = bookUrl.match(/(\d+)/)?.[1] ?? -1;
        if (bookID === -1) {
            throw new Error("书籍ID获取失败");
        }
        const bookname = (document.querySelector("div.novel_name span") as HTMLElement).innerText.trim();
        const authorDom = document.querySelector(
                "div.novel_author span"
            );
        const author = (authorDom as HTMLElement).innerText
            .replace("作者：", "")
            .trim();

        const introDom = (document.querySelector("div.novel_info div.novel_text") as HTMLElement);
        const [introduction, introductionHTML] = await introDomHandle(introDom);

        const additionalMetadate: BookAdditionalMetadate = {};
        const coverDom = document.querySelector("img.bookcover");
        const coverUrl = (coverDom as HTMLImageElement).src;
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.zuopin span.novel_type") as NodeListOf<HTMLElement>)?.map((t) => t.innerText) ?? [];
        additionalMetadate.tags.push((document.querySelector("div.novel_type_name") as HTMLElement)?.innerText ?? "");
        interface DirectoryList {
            code: number;
            message: string;
            data: {
                volume: {
                    volume_id: number;
                    volume_name: string;
                    volume_order: number;
                    volume_desc: string;
                }[];
                data: {
                    chapter_id: number;
                    chapter_islogin: number;
                    chapter_isvip: number;
                    chapter_ispay: number;
                    is_subscribe: number;
                    chapter_number: number;
                    chapter_name: string;
                    chapter_nid: number;
                    chapter_vid: number;
                    chapter_cid: number;
                    chapter_order: number;
                    chapter_time: number;
                    chapter_uptime: number;
                }[];
            };
        }
        const url = `https://hk-api.xrzww.com/api/directoryList?nid=${bookID}&orderBy=0`;
        const directoryList: DirectoryList = await new Promise((resolve) => {
            _GM_xmlhttpRequest({
                url: url,
                method: "GET",
                headers: {
                    "Cache-Control": "max-age=0",
                    mode: "cors",
                },
                onload: function (response) {
                    let resultI: DirectoryList = JSON.parse('{"message":"nd error"}');
                    if (response.status === 200) {
                        resultI = JSON.parse(String(response.responseText));
                    } else {
                        log.error(`response status = ${response.status}`);
                        resultI = JSON.parse('{"message":"nd error"}');
                    }
                    resolve(resultI);
                },
            });
        });
        if (directoryList.message === "nd error") {
            throw new Error("章节列表获取失败");
        }
        if (directoryList.code !== 200) {
            throw new Error(`章节列表请求失败, code = ${directoryList.code}, msg = ${directoryList.message}`);
        }
        const signIn = document.querySelector("div.main")?.innerHTML.includes("登录");
        const volumes = directoryList.data.volume.reduce((obj, vol) => {
            obj[vol.volume_id] = {
                name: vol.volume_name,
                order: vol.volume_order,
                desc: vol.volume_desc,
            };
            return obj;
        }, {} as { [index: number]: { name: string; order: number; desc: string } });
        const chapters: Chapter[] = [];
        let i = 0;
        let tSectionName = null;
        let s = 0;
        let sc = 0;
        for (const c of directoryList.data.data) {
            i++;
            const chapterName = c.chapter_name;
            const chapterNumber = i;

            const isVIP = c.chapter_ispay === 1;
            const isPaid = c.is_subscribe === 1;

            const sectionName = volumes[c.chapter_vid].name;
            if (tSectionName !== sectionName) {
                tSectionName = sectionName;
                s++;
                sc = 0;
            }
            const sectionNumber = s;
            sc++;
            const sectionChapterNumber = sc;

            const nid = c.chapter_nid;
            const vid = c.chapter_vid;
            const chapter_id = c.chapter_id;
            const chapter_order = c.chapter_order;
            const chapterUrl = `https://hk-api.xrzww.com/api/readNovelByWeb?nid=${nid}&vid=${vid}&chapter_id=${chapter_id}&chapter_order=${chapter_order}&showpic=false`;
            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            if (signIn) {
                if (chapter.isVIP && chapter.isPaid === false) {
                    chapter.status = Status.aborted;
                }
            } else {
                if (chapter.isVIP) {
                    chapter.status = Status.aborted;
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
        options: object
    ) {
        log.debug(`[Chapter]请求 ${chapterUrl}`);
        interface ReadNovelByWeb{
            code: number;
            message: string;
            data: {
                chapter_id: number;
                chapter_status: number;
                chapter_islogin: number;
                chapter_isvip: number;
                chapter_ispay: number;
                chapter_istxt: number;
                first_chapter_number: number;
                chapter_number: number;
                chapter_name: string;
                chapter_nid: number;
                chapter_vid: number;
                chapter_cid: number;
                chapter_order: number;
                chapter_path: string | null;
                chapter_time: number;
                chapter_uptime: number;
                subscribe_number: number;
                chip_in_number: number;
                segment_comment_number: number;
                chapter_comment_number: number;
                now_subscribe_number: number;
                volume: {
                    volume_id: number;
                    volume_name: string;
                    volume_nid: number;
                    volume_desc: string;
                    volume_order: number;
                    volume_time: number;
                    is_first: number;
                };
                chapter_say: string | null;
                content: string;
                prev_chapter: number;
                prev_chapter_order: number;
                prev_chapter_ispay: number;
                prev_chapter_is_subscribe: number;
                next_chapter: number;
                next_chapter_order: number;
                next_chapter_ispay: number;
                next_chapter_is_subscribe: number;
                is_subscribe: number;
                audio: string | null;
                chapter_comment: {
                    id: number;
                    novel_id: number;
                    chapter_id: number;
                    form_uid: number;
                    comment_content: string;
                    img: string[];
                    like_num: number;
                    istop: number;
                    isbest: number;
                    count: number;
                    last_reply_user_id: number;
                    last_reply_id: number;
                    last_reply_time: number;
                    create_time: number;
                    is_delete: number;
                    option: string | null;
                    isding: number;
                    fanslevel: number;
                    fanslevelname: string;
                    user_id: number;
                    user_nickname: string;
                    user_head: string;
                    is_author: number;
                    author_nickname: string;
                } [];
                auto_subscribe: number;
                is_popup: number;
                price: number;
            };
            user_gold2: string;
        }
        const chapter:ReadNovelByWeb = await new Promise((resolve) => {
            _GM_xmlhttpRequest({
                url: chapterUrl,
                method: "GET",
                headers: {
                    "Cache-Control": "max-age=0",
                    mode: "cors",
                },
                onload: function (response) {
                    let resultI: ReadNovelByWeb = JSON.parse('{"message":"nd error"}');
                    if (response.status === 200) {
                        resultI = JSON.parse(String(response.responseText));
                    } else {
                        log.error(`response status = ${response.status}`);
                        resultI = JSON.parse('{"message":"nd error"}');
                    }
                    resolve(resultI);
                },
            });
        });
        if (chapter.message === "nd error") {
            throw new Error("章节列表获取失败");
        }
        if (chapter.code !== 200) {
            throw new Error(`章节列表请求失败, code = ${chapter.code}, msg = ${chapter.message}`);
        }
        
        if (chapter.data.content) {
            const content = chapter.data.content;
            const contentRaw = document.createElement("pre");
            contentRaw.innerHTML = content;
            let contentText = content
                .split("\n")
                .map((p: string) => p.trim())
                .join("\n\n");
            const _contentHTML = document.createElement("div");
            _contentHTML.innerHTML = content
                .split("\n")
                .map((p: string) => p.trim())
                .map((p: string) => {
                    if (p.length === 0) {
                        return "<p><br/></p>";
                    } else {
                        return `<p>${p}</p>`;
                    }
                })
                .join("\n");
            const contentHTML = document.createElement("div");
            contentHTML.className = "main";
            contentHTML.appendChild(_contentHTML);
            contentRaw.innerHTML = [
                contentRaw.innerHTML
            ].join("\n\n");
            contentText = [contentText].join("\n\n");
            return {
                chapterName,
                contentRaw,
                contentText,
                contentHTML,
                contentImages: null,
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
