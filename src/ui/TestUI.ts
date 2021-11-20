import * as Vue from "vue";
import { GmWindow, NewWindow } from "../global";
import { createStyle } from "../lib/createEl";
import { sleep } from "../lib/misc";
import { Book, Chapter, Status } from "../main";
import { retryLimit } from "../setting";
import TestUIHtml from "./TestUI.html";
import TestUICss from "./TestUI.less";

export default Vue.defineComponent({
  name: "TestUI",
  setup(props, context) {
    const book = Vue.reactive({} as Book);
    const chapter = Vue.reactive({} as Chapter);

    async function initBook(retry: number): Promise<Book | undefined> {
      const _book = (window as GmWindow)._book;
      if (_book) {
        Object.assign(book, _book);
        return _book;
      } else {
        if (retry > 0) {
          await sleep(2 ** (retryLimit - retry) * 500);
          return initBook(retry);
        } else {
          return;
        }
      }
    }

    interface MetaData {
      封面: string;
      题名: string;
      作者: string;
      网址: string;
      简介: HTMLElement;
    }
    const metaData = Vue.reactive({} as MetaData);
    function getData(key: string, value: string | HTMLElement) {
      if (key === "封面") {
        return `<img src="${value}">`;
      }
      if (key === "简介") {
        return (value as HTMLElement).outerHTML;
      }
      if (key === "网址") {
        return `<a href="${value}">${value}</a>`;
      }
      return value;
    }

    async function initChapter(_book: Book) {
      const chapters = _book.chapters;
      const n = Math.min(17, chapters.length);
      const _chapter = chapters[n];
      await _chapter.init();
      return _chapter;
    }
    function isSeenChapter(_chapter: Chapter) {
      return _chapter.status === Status.finished;
    }
    function isChapterFailed(_chapter: Chapter) {
      return _chapter.status === Status.failed;
    }
    function getChapterHtml(_chapter: Chapter) {
      const imgs = _chapter.contentHTML?.querySelectorAll("img");
      if (imgs) {
        Array.from(imgs).forEach((img) => {
          img.src = img.alt;
        });
      }
      return _chapter.contentHTML?.outerHTML;
    }
    Vue.onMounted(async () => {
      await initBook(retryLimit);
      if (book) {
        const _chapter = await initChapter(book as Book);
        Object.assign(chapter, _chapter);
        const _metaData = {
          封面: book.additionalMetadate?.cover?.url ?? "",
          题名: book.bookname ?? "None",
          作者: book.author ?? "None",
          网址: book.bookUrl,
          简介: book.introductionHTML ?? "",
        };
        Object.assign(metaData, _metaData);
      }
    });

    return {
      metaData,
      getData,
      chapter,
      isSeenChapter,
      isChapterFailed,
      getChapterHtml,
    };
  },
  template: TestUIHtml,
});
export const style = createStyle(TestUICss);
