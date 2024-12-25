import {
    getExt,
    getAttachment,
    putAttachmentClassCache,
} from "../../../lib/attachments";
import { fetchWithRetry } from "../../../lib/http";
import { concurrencyRun } from "../../../lib/misc";
import { calculateSha1 } from "../../../lib/hash";
import { log } from "../../../log";
import { AttachmentClass } from "../../../main/Attachment";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { Status } from "../../../main/main";
import { rm } from "../../../lib/dom";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { cleanDOM } from "../../../lib/cleanDOM";

export class novelpia extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "naive";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }
    public async bookParse() {
        const bookUrl = document.location.href;
        const bookID = bookUrl.match(/novel\/(\d+)/)![1];
        const timestamp = Date.now();
        const headers = {
            cookie: document.cookie,
        };
        let init: RequestInit = {
            headers,
            method: "GET",
        };
        const novelInfoRequest = await fetchWithRetry(
            `https://novelpia.jp/proc/novel?cmd=get_novel&novel_no=${bookID}&mem_nick=HATI&_=${timestamp}`
            , init
        );
        const novelInfo: NovelInfo = await novelInfoRequest.json();
        const bookname = novelInfo.novel.novel_name;
        const author = novelInfo.novel.writer_nick;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerHTML = novelInfo.novel.novel_story;
        const introduction = introductionHTML.innerText;
        const additionalMetadate = {} as BookAdditionalMetadate;
        const coverUrl = "https:" + novelInfo.novel.cover_img; 
        log.debug("coverUrl:"+coverUrl.toString());
        getAttachment(coverUrl, "TM", "vertical_cover-")
            .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
            .catch((error) => log.error(error));
        additionalMetadate.tags = novelInfo.novel.novel_genre_arr;
        const pagesnum = Math.ceil(novelInfo.novel.count_book / 20);
        const chapters:Chapter[] = [];
        let chapterNumber = 0;
        for (let i = 0; i < pagesnum; i++) {
            init = {
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: `novel_no=${bookID}&page=${i}`,
                method: "POST",
            };
            const content = await fetchWithRetry("https://novelpia.jp/proc/episode_list", init);
            const dom = document.createElement("div");
            dom.innerHTML = await content.text();
            rm("td.ep_style3", true, dom);
            const chapterList = dom.querySelectorAll("tr > td > b");
            Array.from(chapterList).forEach((ep) => {
                const chapter_id = ep.querySelector("i")?.getAttribute("id")?.match(/(\d+)/)![1];
                const chapterUrl = `https://novelpia.jp/viewer/${chapter_id}`;
                chapterNumber++;
                const isVIP = ((ep.querySelector("span.b_free") as HTMLElement) ?? null) == null;
                const epe = ep as HTMLElement;
                rm("span", true, epe);
                const chapterName = epe.innerText.trim();
                
                const isPaid = true;
                const options: chapterOption = {
                    chapter_id: chapter_id,
                };
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
                    options,
                });
                chapters.push(chapter);
            });
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
        options: chapterOption,
    ): Promise<ChapterParseObject> {
        const apiURL = `https://novelpia.jp/proc/viewer_data/${options.chapter_id}`;
        const headers = {
            cookie: document.cookie,
            Accept:"application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding":"gzip, deflate, br, zstd",
            "Accept-Language":"en-US,en;q=0.9",
        };
        const init: RequestInit = {
            body: `size=14`,
            method: "POST",
            headers: headers,
        };
        const content = await fetchWithRetry(apiURL, init);
        const chapterContent: ChapterContent = await content.json();
        const rawDom = document.createElement("div");
        for (const s of chapterContent.s) {
            const p = document.createElement("p");
            p.innerHTML = s.text;
            rawDom.appendChild(p);
            rawDom.appendChild(document.createElement("br"));
        }
        const { dom, text, images } = await cleanDOM(rawDom, "TM");
        return {
            chapterName,
            contentRaw: rawDom,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
        }; 
    }
}
interface chapterOption{
    chapter_id: string|undefined;
}
interface Novel {
    novel_no: number;
    novel_name: string;
    novel_search: string;
    novel_subtitle: string | null;
    novel_age: number;
    mem_no: number;
    novel_thumb: string;
    novel_img: string;
    novel_thumb_all: string;
    novel_img_all: string;
    novel_count: number;
    novel_status: number;
    novel_type: number;
    novel_genre: string;
    novel_story: string;
    novel_weekly: number;
    count_view: number;
    count_auth: number;
    count_good: number;
    count_like: number;
    count_book: number;
    count_pick: number;
    writer_nick: string;
    writer_original: string;
    isbn: string;
    last_viewdate: string;
    is_monopoly: number;
    is_complete: number;
    is_donation_refusal: number;
    is_secondary_creation: number;
    is_contest: number;
    start_date: string;
    status_date: string;
    del_date: string | null;
    complete_date: string | null;
    last_write_date: string;
    novel_live: number;
    is_indent: number;
    main_genre: number;
    is_osmu: string | null;
    flag_collect: number;
    flag_free_monopoly: number;
    regdate: string;
    is_translation: number;
    cover_thumb: string;
    cover_img: string;
    cover_thumb_webp: string;
    novel_genre_arr: string[];
    novel_story_cnt: number;
}

interface NovelInfo {
    status: number;
    code: string;
    errmsg: string;
    novel: Novel;
}
interface TextObject {
    text: string;//\u304a\u77e5\u3089\u305b\n
}

interface EncryptedContent {
    ct: string;//J18UvKuZYPVRkC0vtt7e7qnyD2Id8HozcKyBH98jZ4ggHsLiVXICuD767wc390+32V5rhkmbJ2PFMf3znXbtZN1EZAc7uRXxHA8\\\/0yxFW\\\/XMBa+KIcq70Se5Xud0z9SDEhlm+ZRK38zseJsB3ZtHSwBqHB8XbjU3Q+Qr
    iv: string;//468f9ca70120c6c1ff51de9028bfe0b0
    s: string;//d44c551157d4796d
}

interface ChapterContent {
    s: TextObject[];
    c: EncryptedContent;
}