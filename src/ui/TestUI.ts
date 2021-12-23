import { defineComponent, onMounted, reactive, ref, Ref, watch } from "vue";
import { GmWindow } from "../global";
import { createStyle } from "../lib/createEl";
import { sleep } from "../lib/misc";
import { Book, Chapter, Status } from "../main";
import TestUIHtml from "./TestUI.html";
import TestUICss from "./TestUI.less";

export default defineComponent({
  name: "TestUI",
  setup() {
    const book = reactive({} as Book);
    async function waitBook() {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await sleep(500);
        if ((window as GmWindow)._book) {
          return (window as GmWindow)._book;
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
    const metaData = reactive({} as MetaData);
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

    const chapter = reactive({});
    const chapterNumber: Ref<number | string> = ref(-99);
    function getInitChapterNumber() {
      if (book) {
        const chapters = book.chapters;
        const cns = chapters
          .filter((c) => c.status !== Status.aborted)
          .map((c) => c.chapterNumber);
        cns.sort();
        return cns.slice(-3)[0];
      }
    }
    async function initChapter(n: number) {
      const chapters = book.chapters;
      const _chapter = chapters.filter((c) => c.chapterNumber === n)[0];
      if (_chapter) {
        if (_chapter.status === Status.pending) {
          await _chapter.init();
          Object.assign(chapter, _chapter);
        } else {
          Object.assign(chapter, _chapter);
        }
      }
    }
    watch(chapterNumber, (value, oldValue) => {
      if (typeof value === "string") {
        value = parseInt(value, 10);
      }
      if (typeof oldValue === "string") {
        oldValue = parseInt(oldValue, 10);
      }
      if (oldValue !== value) {
        if (value !== -99) {
          initChapter(value);
        }
      }
    });
    function isSeenChapter(_chapter: Chapter) {
      return _chapter.status === Status.finished;
    }
    function isChapterFailed(_chapter: Chapter) {
      return (
        _chapter.status === Status.failed || _chapter.status === Status.aborted
      );
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

    onMounted(async () => {
      const _book = await waitBook();
      Object.assign(book, _book);
      const _metaData = {
        封面: book.additionalMetadate?.cover?.url ?? "",
        题名: book.bookname ?? "None",
        作者: book.author ?? "None",
        网址: book.bookUrl,
        简介: book.introductionHTML ?? "",
      };
      Object.assign(metaData, _metaData);
      const cn = getInitChapterNumber();
      if (cn) {
        chapterNumber.value = cn;
      }
    });

    return {
      metaData,
      getData,
      chapter,
      isSeenChapter,
      isChapterFailed,
      getChapterHtml,
      chapterNumber,
    };
  },
  template: TestUIHtml,
});
export const style = createStyle(TestUICss);
