import { log } from "../log";
import { AttachmentClass } from "../main/Attachment";
import { ReferrerMode } from "../main/main";
import {
  getAttachmentClassCache,
  getImageAttachment,
  getRandomName,
} from "./attachments";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
// Array.from(document.querySelectorAll('.main-page-content > div:nth-child(14) > dl:nth-child(2) > dt > a > code:nth-child(1)')).map((code) => code.innerText.replace(/<|>/g,""))
const BlockElements = [
  "address",
  "article",
  "aside",
  "blockquote",
  "details",
  "dialog",
  "dd",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "ul",
];

// https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
// Array.from(document.querySelectorAll('.main-page-content > div:nth-child(14) > ul:nth-child(2) > li > a > code')).map((code) => code.innerText.replace(/<|>/g,""))
const InlineElements = [
  "a",
  "abbr",
  "acronym",
  "audio",
  "b",
  "bdi",
  "bdo",
  "big",
  "br",
  "button",
  "canvas",
  "cite",
  "code",
  "data",
  "datalist",
  "del",
  "dfn",
  "em",
  "embed",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "map",
  "mark",
  "meter",
  "noscript",
  "object",
  "output",
  "picture",
  "progress",
  "q",
  "ruby",
  "s",
  "samp",
  "script",
  "select",
  "slot",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "template",
  "textarea",
  "time",
  "u",
  "tt",
  "var",
  "video",
  "wbr",
];

const keepElements = [
  // aside 伴随内容
  // 元素表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者标注框（call-out boxes）。
  "aside",
  // blockquote 块引用
  // 代表其中的文字是引用内容
  // 通常在渲染时，这部分的内容会有一定的缩进（注 中说明了如何更改）。
  "blockquote",
  // dl 定义列表
  // 一个包含术语定义以及描述的列表，通常用于展示词汇表或者元数据 (键-值对列表)。
  // 内含 dt，dd
  // dt 列表描述
  // dd 解释内容，相较dt有一定缩进
  // "dl", // 不再保留 dl
  // details 详情展示组件
  // 仅在被切换成展开状态时，它才会显示内含的信息
  // summary 元素可为该部件提供概要或者标签
  "details",
  // figure 可附标题内容元素
  // 经常与说明（caption） <figcaption> 配合使用
  // figcaption 标题内容
  // 这个标签经常是在主文中引用的图片，插图，表格，代码段等等
  "figure",
  // Heading levels 1-6
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // The Thematic Break element
  "hr",
  // The Unordered List element
  "ul",
  // The Ordered List element
  "ol",
  // The List Item element
  "li",
  // The Preformatted Text element
  "pre",
];

const IgnoreElements = [
  // 注释
  "#comment",
  // fieldset 用于在web表单中组织多组label标签
  // legend 为 fieldset 提示
  "fieldset",
  // input, label, form 表单组件怱略
  "legend",
  "input",
  "label",
  "form",
  // The Embed Audio element
  "audio",
  // The Button element
  "button",
  // The Graphics Canvas element
  "canvas",
  // The HTML Data List element
  // recommended options available to choose from within other controls
  "datalist",
  // The Embed External Content element
  "embed",
  // The Inline Frame element
  "iframe",
  // The Image Map element
  "map",
  // The HTML Meter element
  "meter",
  // The Noscript element
  "noscript",
  // The External Object element
  "object",
  // The Output element
  "output",
  // The Progress Indicator element
  "progress",
  "script",
  "style",
  "link",
  // The HTML Select element
  "select",
  // The Web Component Slot element
  "slot",
  "svg",
  "template",
  "video",
  // The Line Break Opportunity element
  "wbr",
  // The Table element
  "table",
];

function isBaseElem(node: Element | Text) {
  const nodeName = node.nodeName.toLowerCase();
  // 节点为文本
  if (node instanceof Text) {
    return true;
  }
  // 节点不含子元素
  if (node.childElementCount === 0) {
    return true;
  }
  // 节点自身为行内元素
  if (InlineElements.includes(nodeName)) {
    return true;
  }
  // 节点所有子元素为行内元素
  return Array.from(node.children).every((child) => {
    const n = child.nodeName.toLowerCase();
    return InlineElements.includes(n);
  });
}

function isBaseElemWithKeep(node: Element | Text) {
  const nodeName = node.nodeName.toLowerCase();
  if (keepElements.includes(nodeName)) {
    return true;
  }
  return isBaseElem(node);
}

function* findBase(elem: Element, withKeep = true): Generator<Element | Text> {
  let is;
  if (withKeep) {
    is = isBaseElemWithKeep;
  } else {
    is = isBaseElem;
  }
  const childNodes = Array.from(elem.childNodes).filter((node) => {
    if (node instanceof Text) {
      const textContent = node.textContent;
      if (textContent === null) {
        return false;
      }
      if (textContent.trim() === "") {
        return false;
      }
    }
    return true;
  }) as (Element | Text)[];
  for (const child of childNodes) {
    const childNodeName = child.nodeName.toLowerCase();
    if (IgnoreElements.includes(childNodeName) === false) {
      if (is(child)) {
        yield child;
      } else {
        yield* findBase(child as Element, withKeep);
      }
    }
  }
}

export interface Options {
  keepImageName?: boolean;
  referrerMode?: ReferrerMode;
  customReferer?: string;
}
interface Output {
  dom: HTMLElement;
  text: string;
  images: AttachmentClass[];
}
//** 清理元素 */
export async function cleanDOM(
  elem: Element,
  imgMode: "naive" | "TM",
  options?: Options
): Promise<Output> {
  const baseNodes = [...findBase(elem)];
  const _obj = await loop(baseNodes, document.createElement("div"));
  const obj = await awaitImages(_obj);
  const output = postHook(obj);
  return output;

  interface SubOutput {
    dom: HTMLElement | Text;
    text: string;
    images: (Promise<AttachmentClass> | AttachmentClass)[];
  }
  async function blockElement(element: Element): Promise<SubOutput | null> {
    const map: Map<
      string,
      (elem: Element) => (SubOutput | null) | Promise<SubOutput | null>
    > = new Map();

    const divList = [
      "article",
      "dialog",
      "div",
      "footer",
      "header",
      "main",
      "section",
      "hgroup",
    ];
    function div(elem: Element) {
      if (elem instanceof HTMLElement) {
        if (elem.childElementCount === 0) {
          const div = document.createElement("div");
          div.innerText = elem.innerText.trim();
          return {
            dom: div,
            text: div.innerText,
            images: [],
          };
        } else {
          const nodes = [...findBase(elem)];
          return loop(nodes, document.createElement("div"));
        }
      }
      return null;
    }
    divList.forEach((n) => map.set(n, div));

    const pList = ["address", "p", "dd", "dt", "figcaption", "dl"];
    function p(elem: Element) {
      if (elem instanceof HTMLElement) {
        if (elem.childElementCount === 0) {
          const p = document.createElement("p");
          p.innerText = elem.innerText.trim();
          return {
            dom: p,
            text: p.innerText,
            images: [],
          };
        } else {
          const nodes = [...findBase(elem)];
          return loop(nodes, document.createElement("p"));
        }
      }
      return null;
    }
    pList.forEach((n) => map.set(n, p));

    const blockquoteList = ["aside", "blockquote"];
    async function blockquote(elem: Element) {
      if (elem instanceof HTMLElement) {
        const nodes = [...findBase(elem)];
        const { dom, text, images } = await loop(
          nodes,
          document.createElement("blockquote")
        );
        const outText = text
          .split("\n")
          .map((l) => l.replace(/^/, "> "))
          .join("\n");
        return {
          dom,
          text: outText,
          images,
        };
      }
      return null;
    }
    blockquoteList.forEach((n) => map.set(n, blockquote));

    const headerList = ["h1", "h2", "h3", "h4", "h5", "h6"];
    function header(elem: Element) {
      if (elem instanceof HTMLElement) {
        const nodeName = elem.nodeName.toLowerCase();
        const n = parseInt(nodeName.substring(1));

        const dom = document.createElement(nodeName);
        dom.innerText = elem.innerText;
        const text = "#".repeat(n) + " " + elem.innerText;
        const images = [] as AttachmentClass[];
        return {
          dom,
          text,
          images,
        };
      }
      return null;
    }
    headerList.forEach((n) => map.set(n, header));

    const preList = ["pre", "textarea"];
    function pre(elem: Element) {
      if (elem instanceof HTMLElement) {
        const dom = document.createElement("pre");
        dom.innerText = elem.innerText;
        const text = "```\n" + elem.innerText + "\n```";
        const images = [] as AttachmentClass[];
        return {
          dom,
          text,
          images,
        };
      }
      return null;
    }
    preList.forEach((n) => map.set(n, pre));

    function hr(elem: Element) {
      const dom = document.createElement("hr");
      const text = "-".repeat(20);
      const images = [] as AttachmentClass[];
      return {
        dom,
        text,
        images,
      };
    }
    map.set("hr", hr);

    async function common1(boldName: string, baseName: string, elem: Element) {
      const bold = elem.querySelector(boldName);
      let s;
      let sText = "";
      if (bold instanceof HTMLElement) {
        s = document.createElement(boldName);
        s.innerText = bold.innerText;
        sText = "**" + bold.innerText + "**";
        bold.remove();
      }

      const base = document.createElement(baseName);
      if (s) base.appendChild(s);

      const nodes = [...findBase(elem)];
      const { dom, text, images } = await loop(nodes, base);
      const outText = sText + "\n\n" + text;
      return {
        dom,
        text: outText,
        images,
      };
    }
    function details(elem: Element) {
      return common1("summary", "details", elem);
    }
    map.set("details", details);

    function figure(elem: Element) {
      return common1("figcaption", "figure", elem);
    }
    map.set("figure", figure);

    function listItem(elem: Element) {
      if (elem instanceof HTMLLIElement) {
        const dom = document.createElement("li");
        dom.innerText = elem.innerText;
        let prefix = "-   ";
        const parent = elem.parentNode;
        if (parent instanceof HTMLOListElement) {
          const start = parent.getAttribute("start");
          const index = Array.prototype.indexOf.call(parent.children, elem);
          prefix = (start ? Number(start) + index : index + 1) + ".  ";
        }
        const text = prefix + elem.innerText;
        const images = [] as AttachmentClass[];
        return {
          dom,
          text,
          images,
        };
      }
      return null;
    }
    map.set("li", listItem);

    const listList = ["ul", "ol"];
    function list(elem: Element) {
      const nodeName = elem.nodeName.toLowerCase();
      if (
        elem instanceof HTMLUListElement ||
        elem instanceof HTMLOListElement
      ) {
        const tdom = document.createElement(nodeName);
        const nodes = [...findBase(elem)];
        return loop(nodes, tdom);
      }
      return null;
    }
    listList.forEach((n) => map.set(n, list));

    const nodeName = element.nodeName.toLowerCase();
    const fn = map.get(nodeName);
    if (fn) {
      return fn(element);
    } else {
      return p(element);
    }
  }

  async function inlineElement(
    element: Element | Text
  ): Promise<SubOutput | null> {
    const map: Map<
      string,
      | ((elem: Element | Text) => SubOutput | null | Promise<SubOutput | null>)
      | ((elem: Element) => SubOutput | null | Promise<SubOutput | null>)
    > = new Map();

    // 默认处理，将元素转为纯文本
    const defaultList = [
      "abbr",
      "acronym",
      "bdi",
      "bdo",
      "cite",
      "data",
      "dfn",
      "span",
      "time",
      "u",
      "tt",
      "#text",
    ];
    async function defaultHandler(elem: Element | Text) {
      if (
        (elem instanceof HTMLElement && elem.childElementCount === 0) ||
        elem instanceof Text
      ) {
        let text;
        if (elem instanceof HTMLElement) {
          text = elem.innerText.trim();
        }
        if (elem instanceof Text) {
          text = elem.textContent?.trim() ?? "";
        }
        if (typeof text === "string") {
          const dom = new Text(text);
          const images = [] as AttachmentClass[];
          return {
            dom,
            text,
            images,
          };
        }
      }
      if (elem instanceof HTMLElement && elem.childElementCount !== 0) {
        const nodes = [...findBase(elem)];
        const { dom, text, images } = await loop(
          nodes,
          document.createElement(elem.nodeName.toLowerCase())
        );
        return {
          dom,
          text,
          images,
        };
      }
      return null;
    }
    defaultList.forEach((n) => map.set(n, defaultHandler));

    async function a(elem: Element) {
      if (elem instanceof HTMLAnchorElement) {
        if (elem.childElementCount === 0) {
          if (
            elem.href.startsWith("https://") ||
            elem.href.startsWith("http://")
          ) {
            const { href, textContent } = elem;
            const dom = document.createElement("a");
            dom.href = href;
            dom.textContent = textContent;
            const text = `[${textContent}](${href})`;
            const images = [] as AttachmentClass[];
            return {
              dom,
              text,
              images,
            };
          }
        } else {
          const outterA = document.createElement("a");
          if (
            elem.href.startsWith("https://") ||
            elem.href.startsWith("http://")
          ) {
            outterA.href = elem.href;
          }
          const nodes = [...findBase(elem)];
          const { dom, text, images } = await loop(nodes, outterA);
          return {
            dom,
            text,
            images,
          };
        }
      }
      return null;
    }
    map.set("a", a);

    function getImg(url: string) {
      const imgClassCache = getAttachmentClassCache(url);
      if (imgClassCache) {
        const dom = document.createElement("img");
        dom.setAttribute("data-src-address", imgClassCache.name);
        dom.alt = url;
        const text = `![${url}](${imgClassCache.name})`;
        const images = [imgClassCache];
        return {
          dom,
          text,
          images,
        };
      } else {
        const comments = getRandomName();
        const noMd5 = options?.keepImageName ?? false;
        const imgOptions = {
          referrerMode: options?.referrerMode,
          customReferer: options?.customReferer,
        };
        const imgClass = getImageAttachment(
          url,
          imgMode,
          "chapter-",
          noMd5,
          comments,
          imgOptions
        );

        const dom = document.createElement("img");
        dom.setAttribute("data-src-address", comments);
        dom.alt = url;
        const text = `![${url}](${comments})`;
        const images = [imgClass];
        return {
          dom,
          text,
          images,
        };
      }
    }

    function img(elem: Element) {
      if (elem instanceof HTMLImageElement) {
        const url = elem.src;
        return getImg(url);
      }
      return null;
    }
    map.set("img", img);

    function picture(elem: Element) {
      if (elem instanceof HTMLPictureElement) {
        // const sources = elem.querySelectorAll("source");
        const img = elem.querySelector("img");
        if (img) {
          const url = img.src;
          return getImg(url);
        } else {
          log.warn("[cleanDom][picture]未发现<img>", elem);
          return null;
        }
      }
      return null;
    }
    map.set("picture", picture);

    function ruby(elem: Element) {
      if (elem instanceof HTMLElement) {
        const dom = elem.cloneNode(true) as HTMLElement;
        const text = elem.innerText;
        const images = [] as AttachmentClass[];
        return {
          dom,
          text,
          images,
        };
      }
      return null;
    }
    map.set("ruby", ruby);

    function br(elem: Element) {
      const dom = document.createElement("br");
      const text = "\n";
      const images = [] as AttachmentClass[];
      return {
        dom,
        text,
        images,
      };
    }
    map.set("br", br);

    async function common(
      nodeName: string,
      getText: (textContent: string) => string,
      elem: Element
    ) {
      if (elem instanceof HTMLElement) {
        if (elem.childElementCount === 0) {
          const textContent = elem.innerText.trim();
          const dom = document.createElement(nodeName);
          dom.innerText = textContent;
          const text = getText(textContent);
          const images = [] as AttachmentClass[];
          return {
            dom,
            text,
            images,
          };
        } else {
          const nodes = [...findBase(elem)];
          const { dom, text, images } = await loop(
            nodes,
            document.createElement(nodeName)
          );
          return {
            dom,
            text,
            images,
          };
        }
      }
      return null;
    }

    const strongList = ["b", "big", "mark", "samp", "strong"];
    function strong(elem: Element) {
      return common(
        "strong",
        (textContent) => `**${textContent.replaceAll("\n", "**\n**")}**`,
        elem
      );
    }
    strongList.forEach((n) => map.set(n, strong));

    const codeList = ["code", "kbd"];
    function code(elem: Element) {
      return common("code", (textContent) => `\`${textContent}\``, elem);
    }
    codeList.forEach((n) => map.set(n, code));

    const sList = ["del", "s"];
    function s(elem: Element) {
      return common("s", (textContent) => `~~${textContent}~~`, elem);
    }
    sList.forEach((n) => map.set(n, s));

    const emList = ["em", "i", "q", "var"];
    function em(elem: Element) {
      return common("em", (textContent) => `*${textContent}*`, elem);
    }
    emList.forEach((n) => map.set(n, em));

    function ins(elem: Element) {
      return common("ins", (textContent) => `++${textContent}++`, elem);
    }
    map.set("ins", ins);

    function small(elem: Element) {
      return common(
        "small",
        (textContent) => `<small>${textContent}</small>`,
        elem
      );
    }
    map.set("small", small);

    function sup(elem: Element) {
      return common("sup", (textContent) => `<sup>${textContent}</sup>`, elem);
    }
    map.set("sup", sup);

    function sub(elem: Element) {
      return common("sub", (textContent) => `<sub>${textContent}</sub>`, elem);
    }
    map.set("sub", sub);

    const nodeName = element.nodeName.toLowerCase();
    const fn = map.get(nodeName) as (elem: Element | Text) => SubOutput | null;
    if (fn) {
      return fn(element);
    } else {
      const output = defaultHandler(element);
      log.warn("[cleanDom]发现未知行内元素！");
      log.warn([element.nodeName.toLowerCase(), element]);
      return output;
    }
  }

  async function loop(
    nodes: (Element | Text)[],
    _outDom: HTMLElement
  ): Promise<{
    dom: HTMLElement;
    text: string;
    images: (Promise<AttachmentClass> | AttachmentClass)[];
  }> {
    let _outText = "";
    let _outImages: (Promise<AttachmentClass> | AttachmentClass)[] = [];
    for (const node of nodes) {
      const bNname = node.nodeName.toLowerCase();
      // 文本 或 行内元素
      if (node instanceof Text || InlineElements.includes(bNname)) {
        const tobj = await inlineElement(node);
        if (tobj) {
          const { dom: tdom, text: ttext, images: timages } = tobj;
          _outDom.appendChild(tdom);
          _outText = _outText + ttext;
          _outImages = _outImages.concat(timages);
          continue;
        }
      }
      // 块元素
      if (bNname === "textarea" || BlockElements.includes(bNname)) {
        if (node instanceof HTMLElement) {
          const tobj = await blockElement(node);
          if (tobj) {
            const { dom: tdom, text: ttext, images: timages } = tobj;
            _outDom.appendChild(tdom);
            _outText = _outText + "\n" + ttext + "\n";
            _outImages = _outImages.concat(timages);
            continue;
          }
        }
      }
    }

    return {
      dom: _outDom,
      text: _outText,
      images: _outImages,
    };
  }

  async function awaitImages({
    dom,
    text,
    images,
  }: {
    dom: HTMLElement;
    text: string;
    images: (Promise<AttachmentClass> | AttachmentClass)[];
  }): Promise<Output> {
    const iImages = await Promise.all(images);
    iImages.forEach((image) => {
      dom.innerHTML = dom.innerHTML.replaceAll(image.comments, image.name);
      text = text.replaceAll(image.comments, image.name);
    });
    return {
      dom,
      text,
      images: iImages,
    };
  }

  //** 后处理 */
  function postHook({
    dom,
    text,
    images,
  }: {
    dom: HTMLElement;
    text: string;
    images: AttachmentClass[];
  }): Output {
    htmlTrim(dom);
    Array.from(dom.children).forEach((child) =>
      child.replaceWith(convertBr(child as HTMLElement))
    );
    text = text.trim();
    return {
      dom,
      text,
      images,
    };
  }
}

//** 移除文档首尾空白元素 */
export function htmlTrim(dom: HTMLElement) {
  const childNodes = Array.from(dom.childNodes);
  remove(childNodes);
  const childNodesR = Array.from(dom.childNodes).reverse();
  remove(childNodesR);

  function remove(nodes: ChildNode[]) {
    for (const node of nodes) {
      // 非空文本或非<br>元素
      if (
        node instanceof Text === false ||
        node instanceof HTMLBRElement === false
      ) {
        break;
      }
      // 文本
      if (node instanceof Text) {
        if (node.textContent?.trim() === "") {
          node.remove();
        } else {
          break;
        }
      }
      // <br>元素
      if (node instanceof HTMLBRElement) {
        node.remove();
      }
    }
  }
}

//** 将Text<br>Text转为<p> */
function convertBr(dom: HTMLElement) {
  if (onlyTextAndBr(dom) && countBr(dom) > 3) {
    const outDom = document.createElement("div");
    const childNodes = dom.childNodes;

    let brCount = 0;
    for (const node of Array.from(childNodes)) {
      if (node instanceof Text) {
        if (brCount > 3) {
          let brRemainder = brCount - 3;
          const brp = document.createElement("p");
          while (brRemainder > 0) {
            brRemainder--;
            const br = document.createElement("br");
            brp.appendChild(br);
          }
          outDom.appendChild(brp);
        }

        brCount = 0;
        const p = document.createElement("p");
        p.innerText = node.textContent ?? "";
        outDom.appendChild(p);
      }
      if (node instanceof HTMLBRElement) {
        brCount++;
      }
    }

    return outDom;
  } else {
    return dom;
  }

  function countBr(d: HTMLElement) {
    return Array.from(d.childNodes).filter((n) => n instanceof HTMLBRElement)
      .length;
  }
  function onlyTextAndBr(d: HTMLElement) {
    return Array.from(d.childNodes)
      .map((n) => n.nodeName.toLowerCase())
      .every((nn) => ["#text", "br"].includes(nn));
  }
}

//** 将固定宽度 Text 转为 div、p、br 元素 */
export function convertFixWidthText(node: Text) {
  const out = document.createElement("div");
  const ns = node.textContent?.split("\n").map((n) => n.trim()) ?? [];
  let text = "";
  for (const n of ns) {
    if (n === "") {
      out.appendChild(new Text(text));
      out.appendChild(document.createElement("br"));
      text = "";
    } else {
      text = text + n;
    }
  }
  return convertBr(out);
}
