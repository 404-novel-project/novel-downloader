import * as Vue from "vue";
import { GmWindow, NewWindow } from "../global";
import { createStyle } from "../lib/createEl";
import { Chapter, Status } from "../main";
import { getRule } from "../router/download";
import { getSectionsObj, SectionObj } from "../save/save";
import ChapterListHtml from "./ChapterList.html";
import ChapterListCss from "./ChapterList.less";
import {
  FilterSetting as filterSettingGlobal,
  getFilterFunction,
} from "./FilterTab";

async function getSections() {
  if ((window as GmWindow)._sections) {
    return (window as GmWindow)._sections;
  } else {
    const rule = await getRule();
    const book = await rule.bookParse();
    (window as GmWindow)._book = book;
    (window as GmWindow)._sections = getSectionsObj(book.chapters);
    return (window as GmWindow)._sections;
  }
}

export const style = createStyle(ChapterListCss);
export default Vue.defineComponent({
  name: "ChapterList",
  setup(props, context) {
    const sectionsObj = Vue.reactive([]);
    const loading = Vue.ref(true);
    Vue.onMounted(async () => {
      if (sectionsObj.length === 0) {
        const _sectionsObj = await getSections();
        Object.assign(sectionsObj, _sectionsObj);
      }
      loading.value = false;
    });

    const filterSetting = Vue.inject(
      "filterSetting"
    ) as Vue.ComputedRef<filterSettingGlobal>;
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
      filter,
      warningFilter,
      isChapterDisabled,
      isChapterSeen,
      isSectionSeen,
    };
  },
  template: ChapterListHtml,
});
