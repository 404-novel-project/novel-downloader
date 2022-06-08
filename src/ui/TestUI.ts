// noinspection NonAsciiCharacters

import {defineComponent, onMounted, reactive, Ref, ref, watch} from "vue";
import {GmWindow} from "../global";
import {getAttachmentClassCache} from "../lib/attachments";
import {sleep} from "../lib/misc";
import {Status} from "../main/main";
import {Chapter} from "../main/Chapter";
import {Book} from "../main/Book";
import TestUIHtml from "./TestUI.html";
import TestUICss from "./TestUI.less";
import {createStyle} from "../lib/dom";

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

    function getData(
      key: string,
      value: string | HTMLElement | [string, string]
    ) {
      if (key === "封面") {
        return `<img src="${(value as [string, string])[0]}" alt="${
          (value as [string, string])[1]
        }">`;
      }
      if (key === "简介" && value instanceof HTMLElement) {
        return value.outerHTML;
      }
      if (key === "网址" && typeof value === "string") {
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
      const html = _chapter.contentHTML?.cloneNode(true) as HTMLElement;
      const nodes = html.querySelectorAll<HTMLImageElement | HTMLAudioElement>(
        "img, audio"
      );
      if (nodes) {
        Array.from(nodes).forEach((node) => {
          const url = node.title || (node as HTMLImageElement).alt;
          node.src = getObjectUrl(url);
        });
      }
      return html.outerHTML;
    }

    onMounted(async () => {
      const _book = await waitBook();
      Object.assign(book, _book);
      const coverUrl = _book?.additionalMetadate?.cover?.url ?? "";
      const coverSrc = coverUrl ? getObjectUrl(coverUrl) : "";
      const _metaData = {
        封面: [coverSrc, coverUrl],
        题名: _book?.bookname ?? "None",
        作者: _book?.author ?? "None",
        网址: _book?.bookUrl,
        简介: _book?.introductionHTML ?? "",
      };
      Object.assign(metaData, _metaData);
      const cn = getInitChapterNumber();
      if (cn) {
        chapterNumber.value = cn;
      }
    });

    function getObjectUrl(url: string) {
      const attachment = getAttachmentClassCache(url);
      if (attachment?.Blob) {
        const blob = attachment.Blob;
        // noinspection UnnecessaryLocalVariableJS
        const src = URL.createObjectURL(blob);
        return src;
      }
      return "";
    }

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
