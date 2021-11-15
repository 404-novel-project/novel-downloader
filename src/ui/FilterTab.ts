import type * as _vue from "vue";
declare const Vue: typeof _vue;
import "./injectVue";
import FilterTabHtml from "./FilterTab.html";
import FilterTabCss from "./FilterTab.css";
import { Chapter } from "../main";
import ChapterList from "./ChapterList";
import { createStyle } from "../lib/createEl";
import { vm as svm } from "./setting";
import { deepcopy } from "../lib/misc";

export function getFunctionBody(fn: Function) {
  return fn
    .toString()
    .replace("(arg) => {", "")
    .replace(/}$/, "")
    .split("\n")
    .map((l) => l.trim())
    .join(" ")
    .trim();
}
interface filterOption {
  raw: (arg: string) => ((chapter: Chapter) => boolean) | undefined;
  description: string;
  abbreviation: string;
}
interface filterOptionDict {
  [index: string]: filterOption;
}
export const filterOptionDict: filterOptionDict = {
  null: {
    raw: (arg: string) => {
      return (chapter: Chapter) => true;
    },
    description: "<p>不应用任何过滤器（默认）</p>",
    abbreviation: "无",
  },
  // 基于章节序号过滤
  number: {
    raw: (arg: string) => {
      function characterCheck() {
        return /^[\s\d\-,]+$/.test(arg);
      }
      function match(s: string, n: number) {
        switch (true) {
          // 13
          case /^\d+$/.test(s): {
            const _m = s.match(/^(\d+)$/);
            if (_m?.length === 2) {
              const m = Number(_m[1]);
              if (m === n) {
                return true;
              }
            }
            return false;
          }
          // 1-5
          case /^\d+\-\d+$/.test(s): {
            const _m = s.match(/^(\d+)\-(\d+)$/);
            if (_m?.length === 3) {
              const m = _m.map((_s) => Number(_s));
              if (n >= m[1] && n <= m[2]) {
                return true;
              }
            }
            return false;
          }
          // 2-
          case /^\d+\-$/.test(s): {
            const _m = s.match(/^(\d+)\-$/);
            if (_m?.length === 2) {
              const m = Number(_m[1]);
              if (n >= m) {
                return true;
              }
            }
            return false;
          }
          // -89
          case /^\-\d+$/.test(s): {
            const _m = s.match(/^\-(\d+)$/);
            if (_m?.length === 2) {
              const m = Number(_m[1]);
              if (n <= m) {
                return true;
              }
            }
            return false;
          }
          default: {
            return false;
          }
        }
      }

      if (!characterCheck()) {
        return;
      }

      return (chapter: Chapter) => {
        const n = chapter.chapterNumber;

        const ss = arg.split(",").map((s) => s.replace(/\s/g, "").trim());
        const booleans = [];
        for (const s of ss) {
          booleans.push(match(s, n));
        }
        return booleans.some((element) => element === true);
      };
    },
    description:
      "<p>基于章节序号过滤，章节序号可通过章节标题悬停查看。</p><p>支持以下格式：13, 1-5, 2-, -89。可通过分号（,）使用多个表达式。</p>",
    abbreviation: "章节序号",
  },
  //包含有相应名称章节
  baseOnString: {
    raw: (arg: string) => {
      return (chapter: Chapter) => {
        return (chapter && chapter.chapterName?.includes(arg)) || false;
      };
    },
    description: "<p>过滤出所有包含过滤条件字符的章节</p>",
    abbreviation: "章节标题",
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

export interface filterSetting {
  arg?: string;
  hiddenBad?: boolean;
  filterType?: string;
  functionBody?: string;
}
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
      hiddenBad: true,
      filterOptionDict: filterOptionDict,
      filterOptionList: Object.entries(filterOptionDict),
      filterType: "null",
    };
  },
  computed: {
    functionBody() {
      //@ts-ignore
      return getFunctionBody(this.filterOptionDict[this.filterType]["raw"]);
    },
    filterObj() {
      //@ts-ignore
      return [this.arg, this.functionBody];
    },
    filterDescription() {
      //@ts-ignore
      return this.filterOptionDict[this.filterType]["description"];
    },
    filterSetting(): filterSetting {
      return {
        arg: this.arg.toString(),
        hiddenBad: this.hiddenBad,
        filterType: this.filterType.toString(),
        functionBody: this.functionBody.toString(),
      };
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
    //@ts-ignore
    if (!svm.setting.filterSetting) {
      return;
    }
    //@ts-ignore
    for (const setting of Object.entries(deepcopy(svm.setting.filterSetting))) {
      //@ts-ignore
      this[setting[0]] = setting[1];
    }
  },
  watch: {
    filterSetting: {
      handler(newVal, oldVal) {
        this.$emit("filterupdate", this.filterSetting);
      },
      deep: true,
    },
  },
  template: FilterTabHtml,
});
createStyle(FilterTabCss);
