import { attachmentClass } from "./main";
import { getAttachmentClassCache, putAttachmentClassCache } from "./lib";

const blockElements = [
  "article",
  "aside",
  "div",
  "footer",
  "form",
  "header",
  "main",
  "nav",
  "section",
  "figure",
  "a", // 忽略超链接
];
const ignoreElements = [
  "script",
  "meta",
  "link",
  "style",
  "#comment",
  "button",
  "input",
  "select",
];
function* findBase(
  dom: HTMLElement | ChildNode,
  blockElements: string[],
  ignoreElements: string[]
): Generator<HTMLElement | Text> {
  const childNodes = Array.from(dom.childNodes);
  for (const node of childNodes) {
    const nodeName = node.nodeName.toLowerCase();
    if (blockElements.includes(nodeName)) {
      yield* findBase(node, blockElements, ignoreElements);
    } else if (nodeName === "#text") {
      if (node.parentElement?.childNodes.length === 1) {
        yield node.parentElement as HTMLElement;
      } else if (node.textContent?.trim()) {
        yield node as Text;
      }
    } else if (!ignoreElements.includes(nodeName)) {
      yield node as HTMLElement;
    }
  }
}

function getNextSibling(elem: HTMLElement | Text) {
  (<ChildNode | null>elem) = elem.nextSibling;
  if (
    elem &&
    elem.nodeName.toLowerCase() === "#text" &&
    elem.textContent?.trim() === ""
  ) {
    return elem.nextSibling;
  }

  return elem;
}

function getPreviousSibling(elem: HTMLElement | Text) {
  (<ChildNode | null>elem) = elem.previousSibling;
  if (
    elem &&
    elem.nodeName.toLowerCase() === "#text" &&
    elem.textContent?.trim() === ""
  ) {
    return elem.previousSibling;
  }

  return elem;
}

function formatImage(elem: HTMLImageElement, builder: Builder): void {
  function temp0() {
    const pI = document.createElement("p");
    pI.appendChild(imgElem);
    builder.dom.appendChild(pI);

    builder.text = builder.text + imgText + "\n\n";
  }

  if (!elem.src) {
    return;
  }

  let tfi = _formatImage(elem, builder);
  if (!tfi) {
    return;
  }
  let [imgElem, imgText, imgClass] = tfi;

  if (elem.parentElement?.childElementCount === 0) {
    temp0();
    return;
  } else {
    function temp1() {
      if (lastElement?.nodeName.toLowerCase() === "p") {
        lastElement.appendChild(imgElem);

        builder.text = builder.text + ` ${imgText} `;
        return;
      } else {
        const tpElem = document.createElement("p");
        tpElem.appendChild(imgElem);
        builder.dom.appendChild(tpElem);

        builder.text = builder.text + ` ${imgText} `;
        return;
      }
    }

    const lastElement = builder.dom.lastElementChild;
    const nextSibling = getNextSibling(elem);
    const previousSibling = getPreviousSibling(elem);

    if (
      elem.parentElement?.nodeName.toLowerCase() === "p" &&
      lastElement?.nodeName.toLowerCase() === "p"
    ) {
      if (
        previousSibling?.nodeName.toLowerCase() === "#text" ||
        nextSibling?.nodeName.toLowerCase() === "#text"
      ) {
        // 段落内前方或后方有文本
        temp1();
        return;
      }
      if (
        previousSibling?.nodeName.toLowerCase() === "img" &&
        lastElement.lastElementChild?.nodeName.toLowerCase() === "img" &&
        (<HTMLImageElement>lastElement.lastElementChild).alt ===
          (<HTMLImageElement>previousSibling).src
      ) {
        // 段落内连续图片
        temp1();
        return;
      }
    } else {
      temp0();
      return;
    }
  }
}

function _formatImage(
  elem: HTMLImageElement,
  builder: Builder
): [HTMLImageElement, string, attachmentClass] | void {
  function genImageName(url: string) {
    let t =
      btoa(new URL(url).pathname.split("/").slice(-2).join("/")) +
      `.${url.split(".").slice(-1)[0]}`;
    if (t.length >= 125) {
      t =
        btoa(new URL(url).pathname.split("/").slice(-1)[0]) +
        `.${url.split(".").slice(-1)[0]}`;
    }
    return t;
  }

  if (!elem.src) {
    return;
  }

  const imgMode = builder.imgMode;
  const imageUrl = elem.src;
  const imageName = genImageName(imageUrl);

  let imgClass;
  const imgClassCache = getAttachmentClassCache(imageUrl, imageName);
  if (imgClassCache) {
    imgClass = imgClassCache;
  } else {
    imgClass = new attachmentClass(imageUrl, imageName, imgMode);
    imgClass.init();
    putAttachmentClassCache(imgClass);
  }

  const filterdImages = builder.images.filter(
    (imgClass) => imgClass.imageUrl === elem.src
  );
  if (filterdImages.length === 0) {
    builder.images.push(imgClass);
  }

  const imgElem = document.createElement("img");
  imgElem.setAttribute("data-src-address", imageName);
  imgElem.alt = imageUrl;

  const imgText = `![${imageUrl}](${imageName})`;
  return [imgElem, imgText, imgClass];
}

function formatParagraph(elem: HTMLParagraphElement, builder: Builder) {
  if (elem.childElementCount === 0) {
    const pElem = document.createElement("p");
    pElem.innerText = elem.innerText.trim();

    const pText = elem.innerText.trim() + "\n\n";

    builder.dom.appendChild(pElem);
    builder.text = builder.text + pText;
    return;
  } else {
    walk(elem, builder);
    return;
  }
}

function formatText(elems: (Text | HTMLBRElement)[], builder: Builder) {
  function temp0() {
    const tPElem = document.createElement("p");
    tPElem.innerText = textContent;
    builder.dom.appendChild(tPElem);
  }
  function temp1() {
    const lastElement = builder.dom.lastElementChild;
    if (lastElement?.nodeName.toLowerCase() === "p") {
      const textElem = document.createTextNode(textContent);
      lastElement.appendChild(textElem);

      const tPText = textContent + "\n".repeat(brCount);
      builder.text = builder.text + tPText;
    } else {
      temp0();

      const tPText = textContent + "\n";
      builder.text = builder.text + tPText;
    }
  }

  const brCount = elems.filter((elem) => elem.nodeName.toLowerCase() === "br")
    .length;
  const elem = elems[0] as Text;
  const textContent = elem.textContent ? elem.textContent.trim() : "";
  if (!textContent) {
    return;
  }

  //段落内，文字位于<img>后
  const lastElement = builder.dom.lastElementChild;
  const previousSibling = getPreviousSibling(elem);

  if (
    elem.parentElement?.nodeName.toLowerCase() === "p" &&
    lastElement?.nodeName.toLowerCase() === "p" &&
    previousSibling?.nodeName.toLowerCase() === "img" &&
    lastElement.lastElementChild?.nodeName.toLowerCase() === "img" &&
    (<HTMLImageElement>lastElement.lastElementChild).alt ===
      (<HTMLImageElement>previousSibling).src
  ) {
    temp1();
    return;
  }

  //按brCount进行处理
  if (brCount === 0) {
    const nextSibling = getNextSibling(elem);
    const previousSibling = getPreviousSibling(elem);

    if (nextSibling === null) {
      // previousSibling !== null
      if (previousSibling?.nodeName.toLowerCase() === "br") {
        // 文本位于最后
        temp0();

        const tPText = textContent + "\n\n";
        builder.text = builder.text + tPText;
        return;
      } else {
        // 文本位于最后，但前一节点并非<br>节点
        temp1();
        return;
      }
    } else {
      // nextSibling.nodeName.toLowerCase() !== "br"
      // 文本后跟非<br>节点
      if (previousSibling === null) {
        // 文本位于最前
        temp0();

        const tPText = textContent;
        builder.text = builder.text + tPText;
        return;
      } else {
        // 文本不位于最前
        temp1();
        return;
      }
    }
  } else if (brCount === 1) {
    const lastElement = builder.dom.lastElementChild;
    if (lastElement?.nodeName.toLowerCase() === "p") {
      const br = document.createElement("br");
      const textElem = document.createTextNode(textContent);

      lastElement.appendChild(br);
      lastElement.appendChild(textElem);

      const tPText = textContent + "\n";
      builder.text = builder.text + tPText;
      return;
    } else {
      temp0();

      const tPText = textContent + "\n";
      builder.text = builder.text + tPText;
      return;
    }
  } else if (brCount === 2 || brCount === 3) {
    temp0();

    const tPText = textContent + "\n".repeat(brCount);
    builder.text = builder.text + tPText;
    return;
  } else if (brCount > 3) {
    temp0();

    for (let i = Math.round((brCount - 2) / 3); i > 0; i--) {
      const tPBr = document.createElement("p");
      const br = document.createElement("br");
      tPBr.appendChild(br);
      builder.dom.appendChild(tPBr);
    }

    const tPText = textContent + "\n".repeat(brCount);
    builder.text = builder.text + tPText;
    return;
  }
}

function formatHr(elem: HTMLHRElement, builder: Builder) {
  const hrElem = document.createElement("hr");
  const hrText = "-".repeat(20);

  builder.dom.appendChild(hrElem);
  builder.text = builder.text + "\n\n" + hrText + "\n\n";
  return;
}

export interface Builder {
  dom: HTMLElement;
  text: string;
  images: attachmentClass[];
  imgMode: "naive" | "TM";
}
export function walk(dom: HTMLElement, builder: Builder) {
  const childNodes = [...findBase(dom, blockElements, ignoreElements)].filter(
    (b) => b
  );
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    if (node === undefined) {
      continue;
    }
    const nodeName = node.nodeName.toLowerCase();
    switch (nodeName) {
      case "p": {
        formatParagraph(node as HTMLParagraphElement, builder);
        break;
      }
      case "#text": {
        let elems: (Text | HTMLBRElement)[] = [node as Text];

        let j = i + 1;
        let jnodeName = nodeName as string;
        do {
          if (j >= childNodes.length) {
            break;
          }
          let jnode = childNodes[j];
          jnodeName = jnode.nodeName.toLowerCase();
          if (jnodeName === "br") {
            elems.push(jnode as HTMLBRElement);
            delete childNodes[j];
            j++;
          }
        } while (jnodeName === "br");

        formatText(elems, builder);
        break;
      }
      case "img": {
        formatImage(node as HTMLImageElement, builder);
        break;
      }
      case "hr": {
        formatHr(node as HTMLHRElement, builder);
        break;
      }
    }
  }
  return builder;
}
