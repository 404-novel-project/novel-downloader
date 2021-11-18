import * as Vue from "vue";
import { NewWindow } from "../global";
import { createStyle } from "../lib/createEl";
import { Chapter, Status } from "../main";
import { getRule } from "../router/download";
import { getSectionsObj, SectionObj } from "../save/save";
import ChapterListCss from "./ChapterList.css";
import ChapterListHtml from "./ChapterList.html";
import {
  FilterSetting as filterSettingGlobal,
  getFilterFunction,
} from "./FilterTab";

async function getSections() {
  if ((window as NewWindow & typeof globalThis)._sections) {
    return (window as NewWindow & typeof globalThis)._sections;
  } else {
    const rule = await getRule();
    const book = await rule.bookParse();
    (window as NewWindow & typeof globalThis)._sections = getSectionsObj(
      book.chapters
    );
    return (window as NewWindow & typeof globalThis)._sections;
  }
}

createStyle(ChapterListCss);
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
      isChapterDisabled,
      isChapterSeen,
      isSectionSeen,
    };
  },
  template: ChapterListHtml,
});
