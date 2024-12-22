import { rm } from "../../../lib/dom";
import {
    getAttachment,
    getAttachmentClassCache,
    getRandomName,
    putAttachmentClassCache,
} from "../../../lib/attachments";
import { ReferrerMode, Status } from "../../../main/main";
import { BaseRuleClass } from "../../../rules";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { getHtmlDOM, gfetch } from "../../../lib/http";
import { cleanDOM } from "../../../lib/cleanDOM";
import { Chapter } from "../../../main/Chapter";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { getFrameContentConditionWithWindow } from "../../../lib/http";
import { _GM_xmlhttpRequest } from "../../../lib/GM";
import { AttachmentClass } from "../../../main/Attachment";
import { sleep } from "../../../lib/misc";

export class fanqie extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
        this.concurrencyLimit = 1;
    }
    public async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (
            document.querySelector(".info-name h1") as HTMLElement
        ).innerText.trim();
        const author = (
            document.querySelector('.author-name') as HTMLElement
        )?.innerText.trim();
        const introDom = document.querySelector(".page-abstract-content") as HTMLElement;
        const [introduction, introductionHTML] = await introDomHandle(introDom);
        const additionalMetadate: BookAdditionalMetadate = {};
        additionalMetadate.tags = Array.from(
            document.querySelectorAll(
                'span.info-label-grey'
            )
        ).map((a) => (a as HTMLAnchorElement).innerText);
        const chapters: Chapter[] = [];
        let chapterNumber = 0;
        let sectionName: string | null = null;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        const sectionList = document.querySelector('.page-directory-content')?.childNodes ?? [];
        sectionList.forEach((sectionElem) => {
            const node = sectionElem as HTMLElement;
            sectionName = (node.querySelector('div.volume') as HTMLAnchorElement)?.innerText.trim();
            sectionChapterNumber = 0;
            sectionNumber++;
            const chapterList = node.querySelectorAll('div.chapter-item');
            chapterList.forEach((chapterElem) => {
                sectionChapterNumber++;
                chapterNumber++;
                const chapterUrl = (chapterElem.querySelector('a') as HTMLAnchorElement).href;
                const chapterName = (chapterElem.querySelector('a') as HTMLAnchorElement).innerText;
                const isVIP = chapterElem.querySelector('.chapter-item-lock') ? true : false;
                const isPaid = false;
                chapters.push(new Chapter({
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
                }));
            });
        });
        while (document.querySelectorAll(".book-cover img.loaded").length === 0)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        const coverUrl = document.querySelector(".book-cover img.loaded")?.getAttribute("src") ?? null;
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
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
        const contentRaw = document.createElement('div');
        if (isVIP) {
            log.debug('未购买SVIP,尝试第三方API获取章节内容');
            const id = chapterUrl.match(/\d+/);
            const url = `https://novel.snssdk.com/api/novel/reader/full/v1/?item_id=${id}`;
            const result: string = await new Promise((resolve) => {
                _GM_xmlhttpRequest({
                    url: url,
                    method: "GET",
                    onload: function (response) {
                        if (response.status === 200) {
                            resolve(response.responseText);
                        } else {
                            log.error(response);
                            resolve('');
                        }
                    },
                });
            });
            let json = null;
            let content = '';
            try {
                json = JSON.parse(result);
            } catch (error) {
                log.error('JSON.parse(result) error', error);
            }
            const data = json?.data ?? null;
            if (!data) {
                log.debug(url, result);
                content = '你没有购买SVIP,且第三方API获取章节内容失败';
            }
            else if (data.need_pay)
                content = '你没有购买SVIP,且第三方API未购买VIP';
            else content = data.content;
            contentRaw.innerHTML = content;
        } else {
            const textSelector = '.muye-reader-content';
            const html = await getFrameContentConditionWithWindow(chapterUrl, (frame) => {
                const doc = frame.contentWindow?.document ?? null;
                if (doc) {
                    return doc.querySelectorAll(textSelector).length !== 0;
                } else {
                    return false;
                }
            });
            const doc = html?.document?.querySelector(textSelector) ?? null;
            if (!html || !doc) {
                contentRaw.innerHTML = '获取章节内容失败';
            } else {
                const [fontName, fontlink] = await getFont(html);
                if (fontName && fontlink) {
                    // Replace Text
                    contentRaw.innerHTML = await replaceFanqieCharacter(
                        fontName,
                        fontlink,
                        doc.innerHTML
                    );
                } else {
                    log.error('字体替换失败,字体名称:', fontName, '字体链接:', fontlink);
                    contentRaw.innerHTML = '字体替换失败';
                }
            }
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

async function getFont(
    dom: Window,
): Promise<
    [string | null, string | null]
> {

    const style = (dom.document.querySelector('div.muye-reader-box') as HTMLElement)?.style;
    // 获取字体链接
    const fontFamily = style?.fontFamily.split(',')[0] ?? null;
    const styleSheets = dom?.document?.styleSheets ?? null;
    if (!fontFamily || !styleSheets) {
        return [null, null];
    }
    // 遍历所有样式表
    for (const styleSheet of Array.from(styleSheets)) {
        try {
            // 获取样式表中的所有规则
            const cssRules = styleSheet.cssRules;

            // 遍历所有规则
            for (const rule of Array.from(cssRules)) {
                // 检查是否为 @font-face 规则
                const ruleElem = rule as CSSFontFaceRule
                // 获取字体名称
                const font = ruleElem?.style?.fontFamily?.replace(/['"]/g, '') ?? null;
                // 检查字体名称是否匹配
                if (font && fontFamily.includes(font)) {
                    // 获取字体文件的 URL
                    let src = ruleElem.style.getPropertyValue('src');
                    const match = src.match(/url\(["']?([^"')]+)["']?\)/);
                    if (match) {
                        src = match[1];
                        const fileNameMatch = src.match(/[^/]+$/);
                        const fileName = fileNameMatch ? fileNameMatch[0] : null;
                        return [fileName, src];
                    }
                }

            }
        } catch (e) {
            log.error('Cannot find stylesheet:', e);
        }
    }
    // const s = dom.querySelectorAll("body > style")[1] as HTMLStyleElement;
    // let fontNameI = "";
    // let fontUrlI = "";

    // if (s.sheet) {
    //     const f = s.sheet.cssRules[s.sheet.cssRules.length - 2];

    //     const m1 = f.cssText.match(/jjwxcfont_[\d\w]+/);
    //     const m2 = f.cssText.match(/{(.*)}/);
    //     if (m1 && m2) {
    //         fontNameI = m1[0];

    //         const ft = m2[1];
    //         for (const k of ft.split(",")) {
    //             if (k.includes('format("woff2")')) {
    //                 const m3 = k.match(/url\("(.*)"\)\s/);
    //                 if (m3) {
    //                     fontUrlI = document.location.protocol + m3[1];
    //                     return [fontNameI, fontUrlI];
    //                 }
    //             }
    //         }
    //     }
    // }

    // if (fontNameI !== "") {
    //     fontUrlI = `${document.location.protocol}//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
    //     return [fontNameI, fontUrlI];
    // } else {
    //     const css = dom.querySelector("div.noveltext")?.classList;
    //     if (css) {
    //         fontNameI = Array.from(css).filter((cn) =>
    //             cn.startsWith("jjwxcfont_")
    //         )[0];
    //         if (fontNameI) {
    //             fontUrlI = `${document.location.protocol}//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
    //             return [fontNameI, fontUrlI];
    //         }
    //     }
    // }

    return [null, null];
}

export async function replaceFanqieCharacter(
    fontName: string,
    fontlink: string,
    inputText: string,
) {
    let outputText = inputText;
    const FontTable = await getFanqieFontTable(fontName, fontlink);
    if (FontTable) {
        for (const Character in FontTable) {
            if (
                Object.prototype.hasOwnProperty.call(FontTable, Character)
            ) {
                const normalCharacter = FontTable[Character];
                outputText = outputText.replaceAll(Character, normalCharacter);
            }
        }
        // outputText = outputText.replace(/\u200c/g, "");
    } else {
        return `[fanqie-font]字体对照表 ${fontName} 未找到,请前往https://github.com/404-novel-project/fanqie_font_tables 提交字体链接, ${fontlink}`;
    }
    return outputText;
}

async function getFanqieFontTable(fontName: string, fontlink: string) {
    const FontTable = await fetchRemoteFont(fontName);
    if (!FontTable) {
        log.error(`[fanqie-font]字体对照表 ${fontName} 未找到,请前往https://github.com/404-novel-project/fanqie_font_tables 提交字体链接, ${fontlink}`);
    } else {
        log.debug(`[fanqie-font]字体对照表 ${fontName}已找到,如果你认为字体对应有错误,请前往https://github.com/404-novel-project/fanqie_font_tables 重新提交字体链接, ${fontlink}`);
    }
    return FontTable;
}

async function fetchRemoteFont(fontName: string) {
    const url = `https://cdn.jsdelivr.net/gh/404-novel-project/fanqie_font_tables@master/${fontName}.json`;
    log.info(`[fanqie-font]开始请求远程字体对照表 ${fontName}`);
    const retryLimit = 10;
    let retry = retryLimit;
    while (retry > 0) {
        try {
            const response = await new Promise<FontTable | undefined>((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: (response) => {
                        if (response.status >= 200 && response.status < 300) {
                            log.info(`[fanqie-font]远程字体对照表 ${fontName} 下载成功`);
                            resolve(JSON.parse(response.responseText) as FontTable);
                        } else {
                            reject(new Error(`HTTP status ${response.status}`));
                        }
                    },
                    onerror: (error) => {
                        reject(error);
                    }
                });
            });

            if (response) {
                return response;
            }
        } catch (error) {
            log.error(error);
            retry--;
            if (retry > 0) {
                await sleep(2000);
                continue;
            } else {
                log.info(`[fanqie-font]远程字体对照表 ${fontName} 下载失败`);
                return undefined;
            }
        }
    }
}

interface FontTable {
    [index: string]: string;
}
