import {
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
} from "vue";
import { GmWindow, UnsafeWindow } from "../global";
import { log } from "../log";
import { Status } from "../main/main";
import { Chapter } from "../main/Chapter";
import { getRule } from "../router/download";
import { getSectionsObj, SectionObj } from "../save/misc";
import ChapterListHtml from "./ChapterList.html";
import ChapterListCss from "./ChapterList.less";
import {
  FilterSetting as filterSettingGlobal,
  getFilterFunction,
} from "./FilterTab";
import { createStyle } from "../lib/dom";

async function getSections() {
  if (
    (window as GmWindow)._sections &&
    (window as GmWindow)._url === document.location.href
  ) {
    return (window as GmWindow)._sections;
  } else {
    const rule = await getRule();
    const book = await rule.bookParse();
    (window as GmWindow)._book = book;
    (window as GmWindow)._url = document.location.href;
    if ((unsafeWindow as UnsafeWindow).saveOptions?.chapterSort) {
      (window as GmWindow)._sections = getSectionsObj(
        book.chapters,
        (unsafeWindow as UnsafeWindow).saveOptions?.chapterSort
      );
    } else {
      (window as GmWindow)._sections = getSectionsObj(book.chapters);
    }
    return (window as GmWindow)._sections;
  }
}

export const style = createStyle(ChapterListCss);
export default defineComponent({
  name: "ChapterList",
  setup() {
    const sectionsObj = reactive([]);
    const loading = ref(true);
    const failed = ref(false);
    onMounted(async () => {
      if (sectionsObj.length === 0) {
        try {
          const _sectionsObj = await getSections();
          Object.assign(sectionsObj, _sectionsObj);
          loading.value = false;
        } catch (error) {
          log.error(error);
          failed.value = true;
        }
      }
    });

    const filterSetting = inject(
      "filterSetting"
    ) as ComputedRef<filterSettingGlobal>;
    const filter = (chapter: Chapter) => {
      if (chapter.status === Status.aborted) {
        return false;
      }

      if (filterSetting.value) {
        const filterFunction = getFilterFunction(
          filterSetting.value.arg,
          filterSetting.value.functionBody
        );
        if (typeof filterFunction === "function") {
          return filterFunction(chapter);
        }
      }
      return true;
    };
    const warningFilter = (chapter: Chapter) => {
      return chapter.isVIP && chapter.isPaid !== true;
    };

    const isChapterDisabled = (chapter: Chapter) => {
      return !chapter?.chapterUrl;
    };
    const isChapterSeen = (chapter: Chapter) => {
      return !(filterSetting.value.hiddenBad && !filter(chapter));
    };
    const isSectionSeen = (sectionObj: SectionObj) => {
      const chapters = sectionObj.chpaters;
      return chapters.some((chapter) => isChapterSeen(chapter));
    };

    return {
      sectionsObj,
      loading,
      failed,
      filter,
      warningFilter,
      isChapterDisabled,
      isChapterSeen,
      isSectionSeen,
    };
  },
  template: ChapterListHtml,
});
