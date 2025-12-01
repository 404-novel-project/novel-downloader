import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass } from "../../../rules";
import { sandboxed } from "../../../lib/dom";


export class Bilibili extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.streamZip = true;
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }

    public async bookParse() {
        const bookUrl = document.location.href;
        const match = bookUrl.match(/readlist\/rl(\d+)/);
        const bookID = match ? match[1] : null;
        const bookname = (
            document.querySelector(".list-header .title") as HTMLHeadElement
        ).innerText.trim();
        const author = (
            document.querySelector(".up-name") as HTMLAnchorElement
        ).innerText
            .trim();
        const introDom = document.querySelector("div.introduce") as HTMLElement;
        const coverUrl = (document.querySelector("img.cover") as HTMLImageElement).src;
        const [introduction, introductionHTML] = await introDomHandle(introDom);

        const additionalMetadate: BookAdditionalMetadate = {};
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
        }
        const chapters: Chapter[] = [];
        const bookListURL = `https://api.bilibili.com/x/article/list/web/articles?id=${bookID}`;
        const res = await fetch(bookListURL, {
            headers: {
                Accept: "application/json",
            },
            method: "GET",
        });
        const booklist = (await res.json()) as BookList;
        let i = 0
        for (const article of booklist.data.articles) {
            i++;
            const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl: `https://www.bilibili.com/read/cv${article.id}`,
                chapterNumber: i,
                chapterName: article.title,
                isVIP: false,
                isPaid: false,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse.bind(this),
                charset: this.charset,
                options: {chapterimg: article.image_urls},
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
        options: chapterOption
    ) {
        const chapterDom = await getHtmlDOM(chapterUrl);
        const content = (chapterDom.querySelector("div.opus-module-content") ?? chapterDom.querySelector("div.article-content")) as HTMLElement;
        const chapterimg = document.createElement("img");
        chapterimg.src = options["chapterimg"][0];
        content.insertBefore(chapterimg, content.firstChild);
        const chapterimgTitle = document.createElement("p");
        chapterimgTitle.innerText = "章节封面插图";
        content.insertBefore(chapterimgTitle, chapterimg);
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


interface BookList {
    code: number;
    message: string;
    ttl: number;
    data: {
        list: {
            id: number;
            mid: number;
            name: string;
            image_url: string;
            update_time: number;
            ctime: number;
            publish_time: number;
            summary: string;
            words: number;
            read: number;
            articles_count: number;
            state: number;
            reason: string;
            apply_time: string;
            check_time: string;
        };
        articles: {
            id: number;
            title: string;
            state: number;
            publish_time: number;
            words: number;
            image_urls: string[];
            category: {
                id: number;
                parent_id: number;
                name: string;
            };
            categories: {
                id: number;
                parent_id: number;
                name: string;
            }[];
            summary: string;
            type: number;
            dyn_id_str: string;
            attributes: number;
            author_uid: number;
            stats: {
                view: number;
                favorite: number;
                like: number;
                dislike: number;
                reply: number;
                share: number;
                coin: number;
                dynamic: number;
            };
            like_state: number;
        }[];
        author: {
            mid: number;
            name: string;
            face: string;
            pendant: {
                pid: number;
                name: string;
                image: string;
                expire: number;
            };
            official_verify: {
                type: number;
                desc: string;
            };
            nameplate: {
                nid: number;
                name: string;
                image: string;
                image_small: string;
                level: string;
                condition: string;
            };
            vip: {
                type: number;
                status: number;
                due_date: number;
                vip_pay_type: number;
                theme_type: number;
                label: {
                    path: string;
                    text: string;
                    label_theme: string;
                };
                avatar_subscript: number;
                nickname_color: string;
            };
            fans: number;
            level: number;
        };
        last: {
            id: number;
            title: string;
            state: number;
            publish_time: number;
            words: number;
            image_urls: string[];
            category: {
                id: number;
                parent_id: number;
                name: string;
            };
            categories: {
                id: number;
                parent_id: number;
                name: string;
            }[];
            summary: string;
            type: number;
            dyn_id_str: string;
            attributes: number;
            author_uid: number;
        };
        attention: boolean;
    };
}

interface chapterOption{
    chapterimg: string[];
}