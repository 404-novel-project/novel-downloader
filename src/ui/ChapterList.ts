import {
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
} from "vue";
import { GmWindow } from "../global";
import { createStyle } from "../lib/createEl";
import { log } from "../log";
import { Chapter, Status } from "../main";
import { getRule } from "../router/download";
import { getSectionsObj, SectionObj } from "../save/misc";
import ChapterListHtml from "./ChapterList.html";
import ChapterListCss from "./ChapterList.less";
import {
  FilterSetting as filterSettingGlobal,
  getFilterFunction,
} from "./FilterTab";

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
    (window as GmWindow)._sections = getSectionsObj(book.chapters);
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
      if (chapter.isVIP === true && chapter.isPaid !== true) {
        return true;
      }
      return false;
    };

    const isChapterDisabled = (chapter: Chapter) => {
      if (!chapter?.chapterUrl) {
        return true;
      }
      return false;
    };
    const isChapterSeen = (chapter: Chapter) => {
      if (filterSetting.value.hiddenBad && filter(chapter) === false) {
        return false;
      } else {
        return true;
      }
    };
    const isSectionSeen = (sectionObj: SectionObj) => {
      const chapters = sectionObj.chpaters;
      return chapters.some((chapter) => isChapterSeen(chapter) === true);
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
