import { getAttachment } from "../../../lib/attachments";
import { cleanDOM, htmlTrim } from "../../../lib/cleanDOM";
import { getFrameContentCondition, ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { rm, rm2 } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Status } from "../../../main/main";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import * as CryptoJS from "crypto-js";
import { _GM_xmlhttpRequest } from "../../../lib/GM";

export class Shaoniandream extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.concurrencyLimit = 1;
    }

    public async bookParse() {
        const bookUrl = document.location.href;
        const match = bookUrl.match(/\/(\d+)$/);
        const bookID = match ? match[1] : null;
        const bookname = (
            document.querySelector(".bookdetail-name .title") as HTMLElement
        ).innerText.trim();

        const author = (
            document.querySelector(
                ".bookdetail-name .penName"
            ) as HTMLElement
        ).innerText.trim();
        const introDom = document.querySelector(".bookdetial-jianjie");
        const [introduction, introductionHTML] = await introDomHandle(introDom);

        const additionalMetadate: BookAdditionalMetadate = {};
        const coverUrl = (
            document.querySelector(".bookdetail-top .cover img") as HTMLImageElement
        ).src;
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
        }
        additionalMetadate.tags = Array.from(
            document.querySelectorAll(".bookdetail-top .label-list span")
        ).map((a) => (a as HTMLAnchorElement).innerText.trim());

        const chapters: Chapter[] = [];
        const sections = document.querySelectorAll(
            ".bookdetail-left-list > #S_BookDir > .DataList > div"
        );
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1; 
            const sectionName = (s.querySelector(".volume_name") as HTMLElement).innerText
                .trim();
            let sectionChapterNumber = 0;

            const cs = s.querySelectorAll(".chapter_list > ul > li");
            for (const c of Array.from(cs)) {
                const a = c.querySelector("a");
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = (a as HTMLAnchorElement).innerText.trim();
                const chapterUrl = (a as HTMLAnchorElement).href;
                const match = chapterUrl.match(/\/(\d+)$/);
                const chapterID = match ? match[1] : null;
                const isVIP = () => {
                    return c.classList.contains('lock_fill');
                };
                const isPaid = () => {
                    return true;
                };
                const chapter = new Chapter({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: isVIP(),
                    isPaid: isPaid(),
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: { bookID, chapterID},
                });
                const isLogin = () => {
                    const signInDom = document.querySelector(".sign-in");
                    const signOutDom = document.querySelector(".sign-out");
                    if (signInDom && signOutDom) {
                        if (Array.from(signOutDom.classList).includes("hidden")) {
                            return true;
                        }
                    }
                    return false;
                };
                if (isVIP()) {
                    chapter.status = Status.aborted;
                    if (chapter.isPaid) {
                        chapter.status = Status.pending;
                    }
                }
                //
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
        options: chapterOptions
    ) {
        return await MemberSingleChapter(options.bookID, options.chapterID, chapterName);
    }
}

interface chapterOptions {
    limitFree: boolean;
    bookID: string;
    chapterID: string;
}

interface Membersinglechaptersign {
    status: number;
    msg: string;
    data: {
        chapter_access_key: string;
    };
    time: number;
}

interface Membersinglechapter {
    status: number;
    msg: string;
    data: {
        id: number;
        theUser: number;
        BookID: number;
        title: string;
        chapterpic: any[];
        miaoshu: string;
        isFree: number;
        FontCount: number;
        SubscribeCount: number;
        release_time_now: number;
        encryt_keys: string[];
        imgPrefix: string;
        show_content: {
            content: string;
            tsukkomi: number;
            paragraph_index: number;
        }[];
    };
    time: number;
}

async function MemberSingleChapter(bookID: string, chapterID: string, chapterName: string | null) {
    const headers = {
        referer: `https://www.shaoniandream.com/readchapter/${chapterID}`,
        accept: "application/json",
        origin: 'https://www.shaoniandream.com',
        'x-requested-with': 'XMLHttpRequest',
    }
    const SignUrl = `https://www.shaoniandream.com/booklibrary/membersinglechaptersign/chapter_id/${chapterID}`;
    const ActionUrl = `https://www.shaoniandream.com/booklibrary/membersinglechapter/chapter_id/${chapterID}`;
    const chapterSign:Membersinglechaptersign = await new Promise((resolve) => {
        _GM_xmlhttpRequest({
            url: SignUrl + "?randoom=" + Math.random(), 
            headers: headers,
            method: "POST",
            onload: function (response) {
                if (response.status === 200) {
                    const resultI: Membersinglechaptersign = JSON.parse(
                        response.responseText
                    );
                    resolve(resultI);
                }
                else {
                    log.error(`response status = ${response.status}`);
                    const resultI: Membersinglechaptersign = JSON.parse(
                        `{"msg":"ND error"}`
                    );
                    resolve(resultI);
                }
            }
        })
    });
    if (chapterSign.msg === "ND error")
        throw new Error("chapterSign resolve error");
    const chapter_access_key = chapterSign?.data?.chapter_access_key ?? "";
    const bodyData = `chapter_access_key=${chapter_access_key}&isMarket=1`;
    const headers1 = {
        referer: `https://www.shaoniandream.com/readchapter/${chapterID}`,
        accept: "application/json, text/javascript, */*; q=0.01",
        origin: 'https://www.shaoniandream.com',
        'x-requested-with': 'XMLHttpRequest',
        'priority': 'u = 1, i',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-fetch-site': 'same-origin',
    }
    const singlechapter: Membersinglechapter = await new Promise((resolve) => {
        _GM_xmlhttpRequest({
            url: ActionUrl + "?randomm=" + Math.random(),
            headers: headers1,
            method: "POST",
            data: bodyData,
            onload: function (response) {
                if (response.status === 200) {
                    const resultI: Membersinglechapter = JSON.parse(
                        response.responseText
                    );
                    resolve(resultI);
                }
                else {
                    log.error(`response status = ${response.status}`);
                    const resultI: Membersinglechapter = JSON.parse(
                        `{"msg":"ND error"}`
                    );
                    resolve(resultI);
                }
            }
        })
    });
    function base64Decode(str: string) {
        return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(str));
    }
    if (singlechapter.msg === "ND error")
        throw new Error("chapterSign resolve error");
    if (singlechapter.status == 1) {
        const tempKey = base64Decode(singlechapter.data.encryt_keys[0]);
        const tempVi = base64Decode(singlechapter.data.encryt_keys[1]);
        // 章节内容
        const listArr = singlechapter.data.show_content;
        // 图片前缀
        const imgPrefix = singlechapter.data.imgPrefix;
        // 章节插图
        const chapterpic = singlechapter.data.chapterpic;
        let content = "";
        for (let i = 0; i < listArr.length; i++) {
            const tempContent = CryptoJS.AES.decrypt(listArr[i].content, CryptoJS.enc.Utf8.parse(tempKey), {
                iv: CryptoJS.enc.Utf8.parse(tempVi),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            content += tempContent.toString(CryptoJS.enc.Utf8);
            content += "\n";
        }
        let contentText = content
            .split("\n")
            .map((p: string) => p.trim())
            .join("\n\n");
        const chapterName = singlechapter.data.title;
        // 章节插图是否存在
        const chapterImgs = document.createElement("div");
        if (chapterpic.length > 0) {
            for (let i = 0; i < chapterpic.length; i++) {
                const imgi = document.createElement("img");
                imgi.src = imgPrefix + chapterpic[i].url;
                imgi.innerText = chapterpic[i].miaoshu;
                chapterImgs.appendChild(imgi);
            }
        }
        // 作者说的话追加
        const postscript = CryptoJS.AES.decrypt(singlechapter.data.miaoshu, CryptoJS.enc.Utf8.parse(tempKey), {
            iv: CryptoJS.enc.Utf8.parse(tempVi),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8) ?? "";
        const contentRaw = document.createElement("pre");
        contentRaw.innerHTML = content;
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

        const hr = document.createElement("hr");
        const authorSayDom = document.createElement("div");
        authorSayDom.innerHTML = postscript
            ?.split("\n")
            ?.map((p: string) => {
                if (p.length === 0) {
                    return "<p><br/></p>";
                } else {
                    return `<p>${p}</p>`;
                }
            })
            ?.join("\n") ?? "";
        contentHTML.appendChild(chapterImgs);
        contentHTML.appendChild(hr);
        contentHTML.appendChild(_contentHTML);
        contentHTML.appendChild(hr);
        contentHTML.appendChild(authorSayDom);

        contentRaw.innerHTML = [
            contentRaw.innerHTML,
            "-".repeat(20),
            postscript,
        ].join("\n\n");
        contentText = [contentText, "-".repeat(20), postscript].join("\n\n");

        return {
            chapterName,
            contentRaw,
            contentText,
            contentHTML,
            contentImages: null,
            additionalMetadate: null,
        };
    } else if (singlechapter.status == 3) {
        log.warn(`请登录后阅读 chapterID = ${chapterID}`);
        return {
          chapterName:chapterName,
          contentRaw: null,
          contentText: "",
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
    } else if (singlechapter.status == 4) {
        log.warn(`章节不存在 chapterID = ${chapterID}`);
        return {
            chapterName: chapterName,
            contentRaw: null,
            contentText: "",
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };
    }
        
    else {
        log.error(`解析失败, status = ${singlechapter.status}, msg = ${singlechapter.msg}`);
        throw new Error(`解析失败, status = ${singlechapter.status}, msg = ${singlechapter.msg}`);
    }
}
    