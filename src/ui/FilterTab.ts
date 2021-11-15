import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";
import FilterTabHtml from "./FilterTab.html";
import FilterTabCss from "./FilterTab.css";
import { Chapter } from "../main";
import ChapterList from "./ChapterList";
import { createStyle } from "../lib/createEl";

interface filterOption {
  raw: (arg: string) => (chapter: Chapter) => boolean;
  functionBody: string;
  validator: (arg: string) => boolean;
  description: string;
  abbreviation: string;
}
interface filterOptionDict {
  [index: string]: filterOption;
}
export const filterOptionDict: filterOptionDict = {
  null: {
    raw: (arg: string) => {
      return function (chapter: Chapter) {
        return true;
      };
    },
    functionBody: "return function(chapter) { return true }",
    validator: (arg: string) => true,
    description: "<p>不应用任何过滤器（默认）</p>",
    abbreviation: "无",
  },
  //包含有相应名称章节
  baseOnString: {
    raw: (arg: string) => {
      return function (chapter: Chapter) {
        return (chapter && chapter.chapterName?.includes(arg)) || false;
      };
    },
    functionBody:
      "return function (chapter) { return (chapter && chapter.chapterName?.includes(arg)) || false; }",
    validator: (arg: string) => {
      if (typeof arg === "string") {
        return true;
      } else {
        return false;
      }
    },
    description: "<p>过滤出所有包含过滤条件字符的章节</p>",
    abbreviation: "文本",
  },
};
export function getFilterFunction(arg: string, functionBody: string) {
  const filterFunctionFactor = new Function("arg", functionBody);
  const filterFunction = filterFunctionFactor(arg);
  if (typeof filterFunction === "function") {
    return filterFunction as unknown as (chapter: Chapter) => boolean;
  } else {
    return undefined;
  }
}

interface filterSetting {
  arg?: string;
  hiddenBad?: boolean;
  filterType?: string;
}
export const filterSetting: filterSetting = {};
export default Vue.defineComponent({
  provide() {
    return {
      //@ts-ignore
      getFilterOption: this.getFilterOption,
      //@ts-ignore
      getHiddenBad: this.getHiddenBad,
    };
  },
  components: { "chapter-list": ChapterList },
  emits: ["filterupdate"],
  data() {
    return {
      arg: "",
      hiddenBad: false,
      filterOptionDict: filterOptionDict,
      filterOptionList: Object.entries(filterOptionDict),
      filterType: "null",
    };
  },
  computed: {
    functionBody() {
      //@ts-ignore
      return this.filterOptionDict[this.filterType]["functionBody"];
    },
    filterObj() {
      //@ts-ignore
      return [this.arg, this.functionBody];
    },
    filterDescription() {
      //@ts-ignore
      return this.filterOptionDict[this.filterType]["description"];
    },
  },
  methods: {
    getFilterOption() {
      return this.filterObj;
    },
    getHiddenBad() {
      return this.hiddenBad;
    },
  },
  mounted() {
    for (const setting of Object.entries(filterSetting)) {
      //@ts-ignore
      this[setting[0]] = setting[1];
    }
  },
  beforeUnmount() {
    filterSetting["arg"] = this.arg.toString();
    filterSetting["hiddenBad"] = this.hiddenBad;
    filterSetting["filterType"] = this.filterType.toString();
    this.$emit("filterupdate", this.functionBody, this.arg);
  },
  watch: {
    filterType() {
      this.arg = "";
    },
  },
  template: FilterTabHtml,
});
createStyle(FilterTabCss);
