// noinspection UnnecessaryContinueJS

import { log } from "../log";
import { AttachmentClass } from "../main/Attachment";
import { ReferrerMode } from "../main/main";
import {
  getAttachment,
  getAttachmentClassCache,
  getRandomName,
} from "./attachments";
import {
  fullWidthLength,
  getNextSibling,
  getPreviousBrCount,
  getPreviousSibling,
  removePreviousBr,
} from "./dom";

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
  "font",
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
    if (!IgnoreElements.includes(childNodeName)) {
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

//** 清理元素
//*
//* 可通过设置 ``data-keep`` 属性指定需保留的属性值。
//* 如 ``<hr id="page2" data-keep="id" />`` 即保留名称为 ``id`` 的属性值。
//* 如需保留多个值，可使用 ``,`` 分隔
//**/
export async function cleanDOM(
  elem: Element,
  imgMode: "naive" | "TM",
  options?: Options
): Promise<Output> {
  interface SubOutput {
    dom: HTMLElement | Text;
    text: string;
    images: (Promise<AttachmentClass> | AttachmentClass)[];
  }

  const baseNodes = [...findBase(elem)];
  const _obj = await loop(baseNodes, document.createElement("div"));
  const obj = await awaitAttachments(_obj);
  return postHook(obj);

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
        const nodes = [...findBase(elem)];
        return loop(nodes, document.createElement("div"));
      }
      return null;
    }

    divList.forEach((n) => map.set(n, div));

    const pList = ["address", "p", "dd", "dt", "figcaption", "dl"];

    function p(elem: Element) {
      if (elem instanceof HTMLElement) {
        const nodes = [...findBase(elem)];
        return loop(nodes, document.createElement("p"));
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
        dom.innerHTML = elem.innerHTML;
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
        dom.innerHTML = elem.innerHTML;
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
      if (elem instanceof HTMLHRElement) {
        const dom = document.createElement("hr");
        const text = "-".repeat(20);
        const images = [] as AttachmentClass[];
        return {
          dom,
          text,
          images,
        };
      }
      return null;
    }

    map.set("hr", hr);

    async function common1(boldName: string, baseName: string, elem: Element) {
      const bold = elem.querySelector(boldName);
      let s;
      let sText = "";
      if (bold instanceof HTMLElement) {
        s = document.createElement(boldName);
        s.innerHTML = bold.innerHTML;
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
        dom.innerHTML = elem.innerHTML;
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

    function table(elem: Element) {
      if (elem instanceof HTMLTableElement) {
        const dom = elem.cloneNode(true) as HTMLTableElement;
        const text = processTable(elem);
        const images = [] as AttachmentClass[];
        return { dom, text, images };
      }
      return null;

      // HTML Table to Markdown
      // https://jmalarcon.github.io/markdowntables/scripts/code.js
      function fixText(text: string) {
        //Remove tabs (it's HTML, so they don't affect the final render, but in Markdown, they do.)
        return text.trim().replaceAll("\t", "");
      }

      function processTable(tableDom: HTMLTableElement) {
        // set the strings to hold the data
        let markdown_string = "";
        let table_header = "|";
        let table_header_footer = "|";
        let table_rows = "";
        let table_header_found = false;
        let table_header_cell_count = 0;
        let prev_row_cell_count = 0; //To allow only same number of cells per row

        // if there is a thead we append
        Array.from(
          tableDom.querySelectorAll<HTMLTableCellElement>("thead > tr > td")
        ).forEach((td) => {
          table_header_cell_count++;
          table_header = table_header + fixText(td.innerText) + "|";
          table_header_footer = table_header_footer + "--- |";
          table_header_found = true;
        });

        // loop all the rows
        Array.from(
          tableDom.querySelectorAll<HTMLTableRowElement>("tr")
        ).forEach((tr) => {
          // get the header if it was not present as thead
          if (!table_header_found) {
            Array.from(
              tr.querySelectorAll<HTMLTableHeaderCellElement>("th")
            ).forEach((th) => {
              table_header_cell_count++;
              table_header = table_header + fixText(th.innerText) + "|";
              table_header_footer = table_header_footer + "--- |";
              table_header_found = true;
            });
          }

          // get the cells if they are not in thead
          let table_row = "";
          let curr_row_cell_count = 0;
          Array.from(tr.querySelectorAll("td"))
            .filter(
              (td) =>
                !Array.from(
                  tableDom.querySelectorAll<HTMLTableCellElement>(
                    "thead > tr > td"
                  )
                ).includes(td)
            )
            .forEach((td) => {
              curr_row_cell_count++;
              table_row = table_row + fixText(td.innerText) + "|";
            });

          //Check that the number of cells match in all the rows
          if (
            prev_row_cell_count != 0 &&
            curr_row_cell_count != prev_row_cell_count
          ) {
            //Show error and exit forEach
            markdown_string =
              "ERROR: Your HTML table rows don't have the same number of cells. Colspan not supported.";
            return false;
          }

          // only add row if it has data
          if (curr_row_cell_count) {
            table_rows += "|" + table_row + "\n";
            prev_row_cell_count = curr_row_cell_count;
          }
        });

        //Only do the rest of the processing if there hasn't been an error processing the rows
        if (markdown_string == "") {
          // if table header exists
          if (table_header_found) {
            //Check if the number of cells in header is the same as in rows
            if (table_header_cell_count != prev_row_cell_count) {
              throw new Error(
                "ERROR: The number of cells in your header doesn't match the number of cells in your rows."
              );
            }
          } else {
            //It it's missing, add an empty header, since most of the Markdown processors can't render a table without a header
            for (let i = 0; i < prev_row_cell_count; i++) {
              table_header = table_header + "|";
              table_header_footer = table_header_footer + "--- |";
            }
          }

          //Append header at the beggining
          markdown_string += table_header + "\n";
          markdown_string += table_header_footer + "\n";

          //add all the rows
          markdown_string += table_rows;
        }

        return markdown_string;
      }
    }

    map.set("table", table);

    const nodeName = element.nodeName.toLowerCase();
    const fn = map.get(nodeName) ?? p;
    const obj = await fn(element);
    if (!obj) {
      return null;
    }
    const { dom, text, images } = obj;
    if (element.getAttribute("data-keep")) {
      const dk = element.getAttribute("data-keep") as string;
      const keeps = dk.split(",").map((k) => k.trim());
      keeps.forEach((k) => {
        if (dom instanceof HTMLElement && element.getAttribute(k)) {
          dom.setAttribute(k, element.getAttribute(k) as string);
        }
      });
    }
    return { dom, text, images };
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
      "font",
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
            text: text.replaceAll("\n", ""),
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
            if (elem.getAttribute("href")?.startsWith("#")) {
              dom.href = elem.getAttribute("href") as string;
            } else {
              dom.href = href;
            }
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
        dom.title = url;
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
        const imgClass = getAttachment(
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
        dom.title = url;
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

    function audio(elem: Element) {
      if (elem instanceof HTMLAudioElement) {
        const url = elem.src;
        const attachmentCache = getAttachmentClassCache(url);
        if (attachmentCache) {
          const dom = document.createElement("audio");
          dom.innerText = "Your browser does not support the audio element.";
          dom.setAttribute("data-src-address", attachmentCache.name);
          dom.setAttribute("controls", "");
          dom.setAttribute("preload", "metadata");
          dom.title = url;

          const text = dom.outerHTML;
          const images = [attachmentCache];
          return {
            dom,
            text,
            images,
          };
        } else {
          const comments = getRandomName();
          const noMd5 = options?.keepImageName ?? false;
          const attachmentOptions = {
            referrerMode: options?.referrerMode,
            customReferer: options?.customReferer,
          };
          const attachment = getAttachment(
            url,
            imgMode,
            "chapter-",
            noMd5,
            comments,
            attachmentOptions
          );

          const dom = document.createElement("audio");
          dom.innerText = "Your browser does not support the audio element.";
          dom.setAttribute("data-src-address", comments);
          dom.setAttribute("controls", "");
          dom.setAttribute("preload", "metadata");
          dom.title = url;

          const text = dom.outerHTML;
          const images = [attachment];
          return {
            dom,
            text,
            images,
          };
        }
      }
      return null;
    }

    map.set("audio", audio);

    function picture(elem: Element) {
      if (elem instanceof HTMLPictureElement) {
        // const sources = elem.querySelectorAll("source");
        const img = elem.querySelector("img");
        if (img) {
          const url = img.src;
          return getImg(url);
        } else {
          log.warn("[cleanDom][picture]未发现 img", elem);
          return null;
        }
      }
      return null;
    }

    map.set("picture", picture);

    function ruby(elem: Element) {
      if (elem instanceof HTMLElement) {
        const nodeArray = Array.from(elem.childNodes).map((node) => {
          if (node instanceof Text && node.textContent?.trim()) {
            const rb = document.createElement("rb");
            rb.innerText = node.textContent.trim();
            return rb;
          } else {
            return node.cloneNode(true);
          }
        });

        const dom = document.createElement("ruby");
        nodeArray.forEach((node) => dom.appendChild(node));

        let text: string;
        if (
          nodeArray.some((node) => node.nodeName.toLowerCase() === "rt") &&
          nodeArray.some((node) => node.nodeName.toLowerCase() === "rb")
        ) {
          text =
            nodeArray
              .filter((node) => node.nodeName.toLowerCase() === "rb")
              .map((n) => (n as HTMLElement).innerText)
              .join() +
            "(" +
            nodeArray
              .filter((node) => node.nodeName.toLowerCase() === "rt")
              .map((n) => (n as HTMLElement).innerText)
              .join() +
            ")";
        } else {
          text = elem.innerText;
        }

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

    function br() {
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
      const obj = await fn(element);
      if (!obj) {
        return null;
      }
      const { dom, text, images } = obj;
      if (element instanceof Element && element.getAttribute("data-keep")) {
        const dk = element.getAttribute("data-keep") as string;
        const keeps = dk.split(",").map((k) => k.trim());
        keeps.forEach((k) => {
          if (dom instanceof HTMLElement && element.getAttribute(k)) {
            dom.setAttribute(k, element.getAttribute(k) as string);
          }
        });
      }
      return { dom, text, images };
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
      // 块元素
      if (bNname === "textarea" || BlockElements.includes(bNname)) {
        if (node instanceof HTMLElement) {
          const tobj = await blockElement(node);
          if (tobj) {
            const { dom: tdom, text: ttext, images: timages } = tobj;
            _outDom.appendChild(tdom);
            _outText = _outText + "\n" + ttext + "\n";
            if (timages.length > 0)
              _outImages = _outImages.concat(timages);
            continue;
          }
        }
      }
      // 文本 或 行内元素
      if (node instanceof Text || InlineElements.includes(bNname)) {
        const tobj = await inlineElement(node);
        if (tobj) {
          const { dom: tdom, text: ttext, images: timages } = tobj;
          _outDom.appendChild(tdom);
          _outText = _outText + ttext;
          if (timages.length > 0)
            _outImages = _outImages.concat(timages);
          continue;
        }
      }
    }

    return {
      dom: _outDom,
      text: _outText,
      images: _outImages,
    };
  }

  async function awaitAttachments({
    dom,
    text,
    images,
  }: {
    dom: HTMLElement;
    text: string;
    images: (Promise<AttachmentClass> | AttachmentClass)[];
  }): Promise<Output> {
    const attachments = await Promise.all(images);
    attachments.forEach((attach) => {
      if (attach.comments) {
        dom.innerHTML = dom.innerHTML.replaceAll(attach.comments, attach.name);
        text = text.replaceAll(attach.comments, attach.name);
      }
    });
    return {
      dom,
      text,
      images: attachments,
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

    dom = convertBr(dom);
    Array.from(dom.children).forEach((child) =>
      child.replaceWith(convertBr(child as HTMLElement))
    );

    convertBlankParagraphElement(dom);

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
      // 文本
      if (node instanceof Text) {
        if (node.textContent?.trim() === "") {
          node.remove();
          continue;
        } else {
          break;
        }
      }
      // <br>元素
      if (node instanceof HTMLBRElement) {
        node.remove();
        continue;
      }
      // 空白<p>元素
      if (node instanceof HTMLParagraphElement && isBlankParagraph(node)) {
        node.remove();
        continue;
      }
      // 非<br>元素
      if (node instanceof HTMLElement && node.nodeName.toLowerCase() !== "br") {
        break;
      }
    }
  }
}

function isBlankParagraph(node: Element) {
  return (
    node instanceof HTMLParagraphElement &&
    node.innerText.trim() === "" &&
    Array.from(node.childNodes).every((n) => n instanceof Text)
  );
}

//** 将Text<br>Text转为<p> */
export function convertBr(dom: HTMLElement, force = false) {
  if (onlyTextAndBr(dom) && (countBr(dom) > 4 || force)) {
    const outDom = document.createElement("div");
    const childNodes = dom.childNodes;

    let brCount = 0;
    let buffer = [];
    for (const node of Array.from(childNodes)) {
      if (node instanceof HTMLBRElement) {
        if (brCount === 0 && buffer.length !== 0) {
          const p = document.createElement("p");
          buffer.forEach((n) => p.appendChild(n));
          outDom.appendChild(p);
          buffer = [];
        }
        brCount++;
        continue;
      }
      if (node instanceof HTMLHRElement) {
        brCount = 0;
        if (buffer.length !== 0) {
          const p = document.createElement("p");
          buffer.forEach((n) => p.appendChild(n));
          outDom.appendChild(p);
          buffer = [];
        }
        const hr = document.createElement("hr");
        outDom.appendChild(hr);
        continue;
      }
      if (brCount === 0) {
        buffer.push(node);
        continue;
      } else {
        if (brCount > 2) {
          let brRemainder = brCount - 2;
          const brp = document.createElement("p");
          while (brRemainder > 0) {
            brRemainder--;
            const br = document.createElement("br");
            brp.appendChild(br);
          }
          outDom.appendChild(brp);
        }

        brCount = 0;
        buffer.push(node);
        continue;
      }
    }
    brCount = 0;
    if (buffer.length !== 0) {
      const p = document.createElement("p");
      buffer.forEach((n) => p.appendChild(n));
      outDom.appendChild(p);
      buffer = [];
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
      .every((nn) => ["#text", "hr", ...InlineElements].includes(nn));
  }
}

//** 合并空白 <p> 元素 */
function convertBlankParagraphElement(dom: HTMLElement) {
  const nodes = Array.from(dom.children);
  let count = 0;
  let buffer: Element[] = [];
  for (const node of nodes) {
    if (isBlankParagraph(node)) {
      count++;
      buffer.push(node);
    } else if (count !== 0) {
      const p = document.createElement("p");
      while (count > 0) {
        count--;
        const br = document.createElement("br");
        p.appendChild(br);
      }
      buffer[0].replaceWith(p);
      buffer.forEach((n) => n.remove());

      count = 0;
      buffer = [];
    }
  }
}

//** 将固定宽度 Text 转为 div、p、br 元素 */
export function convertFixWidthText(
  node: Text,
  width = 35,
  out = document.createElement("div")
) {
  const ns = node.textContent?.split("\n") ?? [];
  let text = "";
  for (const n of ns) {
    if (n === "") {
      out.appendChild(new Text(text));
      out.appendChild(document.createElement("br"));
      text = "";
      continue;
    }
    if (fullWidthLength(n) > width - 5 && fullWidthLength(n) < width + 5) {
      text = text + n;
      continue;
    } else {
      if (text !== "") {
        text = text + n;
        out.appendChild(new Text(text));
        out.appendChild(document.createElement("br"));
        text = "";
        continue;
      } else {
        out.appendChild(new Text(n));
        out.appendChild(document.createElement("br"));
        continue;
      }
    }
  }
  if (text !== "") {
    out.appendChild(new Text(text));
    out.appendChild(document.createElement("br"));
    text = "";
  }
  htmlTrim(out);
  return convertBr(out);
}

//** 转化固定宽度元素 */
export function convertFixWidth(node: HTMLElement, width = 35) {
  Array.from(node.querySelectorAll("br")).forEach((node) => {
    const previous = node.previousSibling;
    const next = node.nextSibling;
    if (
      previous instanceof Text &&
      next instanceof Text &&
      (previous.textContent ? fullWidthLength(previous.textContent) : 0) >
        width - 5 &&
      (previous.textContent ? fullWidthLength(previous.textContent) : 0) <
        width + 5
    ) {
      node.remove();
    }
  });

  // 合并 Text
  const group = (texts: Text[]) => {
    const out: Text[][] = [];

    let group: Text[] = [];
    let whole = "";
    for (const text of texts) {
      const w = text.wholeText;
      if (whole !== w) {
        if (group.length !== 0) {
          out.push(group);
        }

        whole = w;
        group = [text];
      } else {
        group.push(text);
      }
    }
    if (group.length !== 0) {
      out.push(group);
    }
    return out;
  };
  const merge = (groups: Text[][]) => {
    for (const g of groups) {
      const old = g[0];
      const newText = new Text(old.wholeText);
      old.replaceWith(newText);

      g.forEach((t) => t.remove());
    }
  };
  const ts = Array.from(node.childNodes).filter(
    (node) => node instanceof Text && node.wholeText !== node.textContent
  ) as Text[];
  const gts = group(ts);
  merge(gts);

  // 将 Text 转换为 <p>
  Array.from(node.childNodes)
    .filter((node) => node instanceof Text)
    .forEach((text) => {
      const p = convertFixWidthText(text as Text, width);
      text.replaceWith(p);
    });

  // 移除分隔空白<p>
  Array.from(node.querySelectorAll("p"))
    .filter(
      (p) =>
        p.innerText.trim() === "" &&
        getPreviousSibling(p) instanceof HTMLElement &&
        getNextSibling(p) instanceof HTMLElement
    )
    .forEach((p) => p.remove());

  // 移除分隔<br>
  Array.from(node.querySelectorAll("p"))
    .filter((p) => getPreviousBrCount(p) === 2)
    .forEach((p) => removePreviousBr(p));

  if (isFixWidthP(node)) {
    // 合并固定字符宽 <p>
    const ps = Array.from(node.querySelectorAll("p"));
    let text = "";
    for (const node of ps) {
      const n = node.innerText.trim();
      if (fullWidthLength(n) > width - 5 && fullWidthLength(n) < width + 5) {
        text = text + n;
        node.remove();
        continue;
      } else {
        if (text !== "") {
          text = text + n;
          const newP = document.createElement("p");
          newP.innerText = text;
          node.replaceWith(newP);
          text = "";
          continue;
        } else {
          continue;
        }
      }
    }
  }

  function isFixWidthP(node: HTMLElement) {
    const lengths = Array.from(node.querySelectorAll("p")).map((p) =>
      fullWidthLength(p.innerText.trim())
    );
    const lt = lengths.filter((i) => i > width + 5).length;
    return lt < 5;
  }
}

export function isFixWidth(node: Text | HTMLElement, width = 35) {
  let ns: string[] | undefined;
  if (node instanceof Text) {
    ns = node.textContent?.split("\n").map((n) => n.trim()) ?? [];
  }
  if (node instanceof HTMLElement) {
    const reducer = (out: string[], cur: ChildNode) => {
      if (cur instanceof Text) {
        const t = cur.textContent?.trim() ?? "";
        if (t.includes("\n")) {
          t.split("\n")
            .map((n) => n.trim())
            .forEach((n) => out.push(n));
          return out;
        } else {
          out.push(t);
          return out;
        }
      } else {
        return out;
      }
    };
    ns = Array.from(node.childNodes).reduce(reducer, []);
  }
  if (!ns) {
    throw new Error("ns is null");
  }
  const lengths = ns.map((l) => fullWidthLength(l));
  const lt = lengths.filter((i) => i > width + 5).length;
  return lt < 5;
}
