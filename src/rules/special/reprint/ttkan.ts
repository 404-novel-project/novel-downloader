import { getAttachment } from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { rm, rms } from "../../../lib/dom";
import { ggetHtmlDOM } from "../../../lib/http";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { Chapter } from "../../../main/Chapter";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";

export class Ttkan extends BaseRuleClass {
  public constructor() {
    super();
  }

  public async bookParse(): Promise<Book> {
    const $ = <T extends Element>(selector: string) =>
      document.querySelector<T>(selector);
    const host = location.hostname;
    const language = host.split(".")[0] === "tw" ? "tw" : "cn"
    const bookUrl = location.href;
    const novelId = new URL(bookUrl).pathname.split("/")[3];
    const bookname = $<HTMLHeadingElement>(".novel_info h1")!.innerText;
    const author = $<HTMLMetaElement>('meta[name="og:novel:author"]')!.content;
    const intro = $<HTMLParagraphElement>(".description");
    const [introduction, introductionHTML] = await introDomHandle(intro);

    const genre = (
      $<HTMLSpanElement>(
        ".novel_info > div:nth-child(2) > ul > li:nth-child(3)"
      )!.childNodes[1] as Text
    ).data;
    const additionalMetadate: BookAdditionalMetadate = {
      tags: [genre],
    };
    const coverUrl = $<HTMLImageElement>(".novel_info amp-img")!.getAttribute(
      "src"
    )!;
    getAttachment(coverUrl, this.attachmentMode, "cover-")
      .then((coverClass) => {
        additionalMetadate.cover = coverClass;
      })
      .catch((error) => log.error(error));

    const chapters: Chapter[] = [];
    const tocUrl = `https://${host}/api/nq/amp_novel_chapters?language=${language}&novel_id=${novelId}&__amp_source_origin=https%3A%2F%2Fwww.ttkan.co`;

    const res = await fetch(tocUrl, {
      headers: {
        Accept: "application/json",
        "AMP-Same-Origin": "true",
      },
      method: "GET",
    });

    const data = (await res.json()) as ChapterIndex;

    for (const { chapter_id, chapter_name } of data.items) {
      const chapter = new Chapter({
        bookUrl,
        bookname,
        chapterUrl: `https://${host}/novel/user/page_direct?novel_id=${novelId}&page=${chapter_id}`,
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
    const doc = await ggetHtmlDOM(chapterUrl, charset, {
      headers: {
        "Accept-Language": "zh-CN",
      },
    });
    const content = doc.querySelector(".content") as HTMLElement;
    rm("a", true, content);
    const ttkanAd =
      /[wWщшω]{0,3} ?[¸◆⊕●.•＿¤☢⊙▲✿★▪]? ?(?:[tTтⓣ] ?){2}[kKκКⓚ] ?[aAǎáдāΛⓐ] ?[nNⓝ] ?[¸◆⊕●.•＿¤☢⊙▲✿★▪]? ?[cCС￠℃] ?[oO〇○Ο] ?/gi;
    rms([ttkanAd], content);
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

interface ChapterIndex {
  items: {
    chapter_id: number;
    chapter_name: string;
  }[];
}
