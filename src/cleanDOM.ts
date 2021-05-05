import { attachmentClass } from "./main";

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

function formatAnchor(elem: HTMLAnchorElement, builder: Builder): void {
  if (!elem.href || !elem.href.startsWith("http")) {
    return;
  }
  const aElem = document.createElement("a");
  let aText: string;
  aElem.href = elem.href;

  if (elem.childElementCount === 0) {
    if (elem.innerText) {
      aElem.innerText = elem.innerText;
      aText = `[${elem.innerText}](${elem.href})`;
    } else {
      aText = `[](${elem.href})`;
    }
  } else {
    const nodes = [...findBase(elem, blockElements, ignoreElements)].filter(
      (b) => b
    );
    const nodesNames = nodes.map((node) => node.nodeName.toLowerCase());
    if (nodesNames.includes("img")) {
      let imgTexts = "";
      const imgNodes = nodes.filter(
        (node) => node.nodeName.toLowerCase() === "img"
      );
      for (const imgNode of imgNodes) {
        let tfi = formatImage(imgNode as HTMLImageElement, builder.imgMode);
        if (tfi) {
          let [imgElem, imgText, imgClass] = tfi;

          aElem.appendChild(imgElem);
          imgTexts = imgTexts + imgText + " ";
          builder.images.push(imgClass);
        }
      }

      if (elem.innerText) {
        aElem.innerText = elem.innerText;
        aText = `[${elem.innerText} ${imgTexts}](${elem.href})`;
      } else {
        aText = `[${imgTexts}](${elem.href})`;
      }
    } else {
      if (elem.innerText) {
        aElem.innerText = elem.innerText;
        aText = `[${elem.innerText}](${elem.href})`;
      } else {
        aText = `[](${elem.href})`;
      }
    }
  }

  builder.dom.appendChild(aElem);
  builder.text = builder.text + aText;
}

function formatImage(
  elem: HTMLImageElement,
  imgMode: "naive" | "TM"
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

  const imageUrl = elem.src;
  const imageName = genImageName(imageUrl);
  const imgClass = new attachmentClass(imageUrl, imageName, imgMode);
  imgClass.init();

  const imgElem = document.createElement("img");
  imgElem.src = imageName;
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
  } else {
    walk(elem, builder);
  }
}

function formatText(elems: (Text | HTMLBRElement)[], builder: Builder) {
  const brCount = elems.filter((elem) => elem.nodeName.toLowerCase() === "br")
    .length;
  const elem = elems[0] as Text;
  const textContent = elem.textContent ? elem.textContent.trim() : "";
  if (!textContent) {
    return;
  }
  if (brCount > 3) {
    const tPElem = document.createElement("p");
    tPElem.innerText = textContent;

    const tPBr = document.createElement("p");
    const br = document.createElement("br");
    tPBr.appendChild(br);

    builder.dom.appendChild(tPElem);
    builder.dom.appendChild(tPBr);

    const tPText = textContent + "\n".repeat(brCount);
    builder.text = builder.text + tPText;
  } else if (brCount === 1) {
    const lastElement = builder.dom.lastElementChild;
    if (lastElement?.nodeName.toLowerCase() === "p") {
      const br = document.createElement("br");
      const textElem = document.createTextNode(textContent);

      lastElement.appendChild(br);
      lastElement.appendChild(textElem);

      const tPText = textContent + "\n";
      builder.text = builder.text + tPText;
    } else {
      const tPElem = document.createElement("p");
      tPElem.innerText = textContent;
      builder.dom.appendChild(tPElem);

      const tPText = textContent + "\n";
      builder.text = builder.text + tPText;
    }
  } else {
    const tPElem = document.createElement("p");
    tPElem.innerText = textContent;
    builder.dom.appendChild(tPElem);

    const tPText = textContent + "\n".repeat(brCount);
    builder.text = builder.text + tPText;
  }
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
      case "a": {
        formatAnchor(node as HTMLAnchorElement, builder);
        break;
      }
      case "img": {
        let tfi = formatImage(node as HTMLImageElement, builder.imgMode);
        if (tfi) {
          let [imgElem, imgText, imgClass] = tfi;

          const pI = document.createElement("p");
          pI.appendChild(imgElem);

          builder.dom.appendChild(pI);
          builder.text = builder.text + imgText + "\n\n";
          builder.images.push(imgClass);
        }
        break;
      }
      case "hr": {
        const hrElem = document.createElement("hr");
        const hrText = "-".repeat(20);

        builder.dom.appendChild(hrElem);
        builder.text = builder.text + "\n\n" + hrText + "\n\n";
        break;
      }
    }
  }
  return builder;
}
