/* 移除匹配选择器的元素 */
export function rm(selector: string, all = false, dom: HTMLElement) {
  if (all) {
    const rs = dom.querySelectorAll(selector);
    rs.forEach((e) => e.remove());
  } else {
    const r = dom.querySelector(selector);
    if (r) {
      r.remove();
    }
  }
}

/* 移除包含相应文本或匹配相应正则的段落元素 */
export function rm2(filters: (string | RegExp)[], dom: HTMLElement) {
  function doRemove(nodes: HTMLElement | Text) {
    Array.from(nodes.childNodes).forEach((node) => {
      let text: string;
      if (node.nodeName === "#text") {
        text = (node as Text).textContent ?? "";
      } else {
        text = (node as HTMLElement).innerText ?? "";
      }
      if (text.length < 200 || node instanceof Text) {
        for (const filter of filters) {
          if (filter instanceof RegExp) {
            if (filter.test(text)) {
              node.remove();
            }
          }
          if (typeof filter === "string") {
            if (text.includes(filter)) {
              node.remove();
            }
          }
        }
      } else {
        doRemove(node as HTMLElement | Text);
      }
    });
  }

  doRemove(dom);
}

/* 替换HTML源码 */
export function rms(filters: (string | RegExp)[], dom: HTMLElement) {
  for (const ad of filters) {
    if (typeof ad === "string") {
      dom.innerHTML = dom.innerHTML.replaceAll(ad, "");
    } else if (ad instanceof RegExp) {
      dom.innerHTML = dom.innerHTML.replace(ad, "");
    }
  }
  return dom;
}

/* 将某元素下的所有子元素拷备至另一元素下 */
export function childNodesCopy(src: Element, dest: Element) {
  const childrens = Array.from(src.childNodes);
  childrens.forEach((node) => dest.appendChild(node));
}

/* 获取元素最大深度 */
export function getMaxDepth(element: Element) {
  const descendants = element.querySelectorAll("*");
  const depths = Array.from(descendants)
    .filter((elem) => elem.childElementCount === 0)
    .map((elem) => getDepth(elem, 0));
  return Math.max(...depths);

  function getDepth(elem: Element, depth: number): number {
    if (element.isSameNode(elem)) {
      return depth;
    } else {
      const parentElement = elem.parentElement;
      if (parentElement) {
        return getDepth(parentElement, depth + 1);
      } else {
        return depth;
      }
    }
  }
}

/* 获取该元素下文本总长度 */
export function getNodeTextLength(element: Element) {
  return Array.from(element.childNodes)
    .filter((node) => node.nodeName === "#text")
    .reduce((sum, curNode) => {
      if (!sum) {
        sum = 0;
      }
      sum = sum + ((curNode as Text).textContent?.trim().length ?? 0);
      return sum;
    }, 0);
}

// https://stackoverflow.com/questions/11869582/make-sandbox-around-function-in-javascript
/* 代码运行沙箱 */
export function sandboxed(code: string) {
  const frame = document.createElement("iframe");
  document.body.appendChild(frame);
  const argVerify = /^[$A-Z_][0-9A-Z_$]*$/i;

  if (frame.contentWindow) {
    // @ts-expect-error Property 'Function' does not exist on type 'Window'.ts(2339)
    const F = frame.contentWindow.Function;
    const args = Object.keys(frame.contentWindow)
      .filter((it) => argVerify.test(it))
      .join();

    document.body.removeChild(frame);

    return F(args, code)();
  }
}

/* 获取 Cookie */
export function getCookie(name: string) {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg);
  if (arr) {
    return arr[2];
  } else {
    return null;
  }
}

/* 创建元素 */
export function createEl(el: string): HTMLElement {
  const _el = document.createElement("div");
  _el.innerHTML = el;
  if (_el.childElementCount === 1 && _el.firstElementChild) {
    return _el.firstElementChild as HTMLElement;
  } else {
    throw new Error("Create HTMLElement Failed!");
  }
}

/* 创建 style 元素 */
export function createStyle(style: string, id?: string) {
  const el = createEl(`<style>${style}</style>`);
  if (id) {
    el.id = id;
  }
  return el;
}

/* 获取下一非空领居 */
export function getNextSibling(node: Element | Text) {
  if (node.nextSibling instanceof HTMLElement) {
    return node.nextSibling;
  }
  if (node.nextSibling instanceof Text) {
    if (node.nextSibling.textContent?.trim() !== "") {
      return node.nextSibling;
    } else {
      return node.nextSibling.nextSibling;
    }
  }
}

/* 获取前一非空领居 */
export function getPreviousSibling(node: Element | Text) {
  if (node.previousSibling instanceof HTMLElement) {
    return node.previousSibling;
  }
  if (node.previousSibling instanceof Text) {
    if (node.previousSibling.textContent?.trim() !== "") {
      return node.previousSibling;
    } else {
      return node.previousSibling.previousSibling;
    }
  }
}

/* 获取前一非空领居元素至当前元素之间的 <br> 数量 */
export function getPreviousBrCount(node: Element | Text): number {
  const previous = getPreviousSibling(node);
  if (previous instanceof HTMLBRElement) {
    return getPreviousBrCount(previous) + 1;
  } else {
    return 0;
  }
}

/* 移除元素前 <br> */
export function removePreviousBr(node: Element | Text): void {
  const previous = getPreviousSibling(node);

  if (node instanceof HTMLBRElement) {
    node.remove();
  }

  if (previous instanceof HTMLBRElement) {
    return removePreviousBr(previous);
  } else {
    return;
  }
}

/* 输出全角字符宽度 */
export function fullWidthLength(input: string) {
  // noinspection UnnecessaryLocalVariableJS
  const length = Array.from(input).reduce((p: number, c: string) => {
    const code = c.codePointAt(0);
    if (code === undefined) {
      return p;
    }
    if (code < 128) {
      return p + 0.5;
    } else {
      return p + 1;
    }
  }, 0);
  return length;
}

/* HTML 转 XHMTL */
export function convertHTMLtoXHTML(input: string | Document) {
  let doc;
  if (typeof input === "string") {
    doc = new DOMParser().parseFromString(input, "text/html");
  }
  if (input instanceof Document) {
    doc = input;
  }
  if (doc instanceof Document) {
    return new XMLSerializer().serializeToString(doc);
  } else {
    throw new Error("input format error!");
  }
}

/* Text 前插入 <br> */
export function insertBrBeforeText(elem: HTMLElement) {
  for (const node of Array.from(elem.childNodes)) {
    if (node instanceof Text && node.textContent?.trim() !== "") {
      node.parentElement?.insertBefore(document.createElement("br"), node);
    }
  }
}

// https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
/* 元素可见性测试 */
export function isHidden(el: HTMLElement): boolean {
  return el.offsetParent === null;
}

export function escapeHTML(str: string) {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}
