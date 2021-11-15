import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";
import { getRule } from "../routers";
import { Chapter, Status } from "../main";
import { getSectionsObj } from "../save/save";
import { newWindow } from "../global";
import ChapterListHtml from "./ChapterList.html";
import ChapterListCss from "./ChapterList.css";
import { createStyle } from "../lib/createEl";
import { getFilterFunction } from "./FilterTab";

async function getSections() {
  if ((window as newWindow & typeof globalThis)._sections) {
    return (window as newWindow & typeof globalThis)._sections;
  } else {
    const rule = await getRule();
    const book = await rule.bookParse();
    (window as newWindow & typeof globalThis)._sections = getSectionsObj(
      book.chapters
    );
    return (window as newWindow & typeof globalThis)._sections;
  }
}

createStyle(ChapterListCss);
export default Vue.defineComponent({
  name: "ChapterList",
  inject: ["getHiddenBad", "getFilterOption"],
  data() {
    return {
      Status: Status,
      sectionsObj: Vue.reactive({}),
      loading: true,
      filterObj: Vue.reactive([]),
      hiddenBad: false,
    };
  },
  methods: {
    filter(chapter: Chapter) {
      if (chapter.status == this.Status.aborted) {
        return false;
      }
      if (this.filterObj && this.filterObj.length === 2) {
        const filterFunction = getFilterFunction(
          this.filterObj[0],
          this.filterObj[1]
        );
        if (typeof filterFunction === "function") {
          return filterFunction(chapter);
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    isDisabled(chapter: Chapter) {
      if (!chapter.chapterUrl) {
        return true;
      }
      return false;
    },
    isSeen(chapter: Chapter) {
      if (this.hiddenBad && !this.filter(chapter)) {
        return false;
      } else {
        return true;
      }
    },
    updateInject() {
      this.updateHiddenBad();
      this.updateFilterObj();
    },
    updateHiddenBad() {
      //@ts-ignore
      this.hiddenBad = this.getHiddenBad();
    },
    updateFilterObj() {
      //@ts-ignore
      this.filterObj = this.getFilterOption();
    },
  },
  async mounted() {
    this.sectionsObj = await getSections();
    this.loading = false;
    setInterval(() => {
      this.updateInject();
    }, 300);
  },
  template: ChapterListHtml,
});
