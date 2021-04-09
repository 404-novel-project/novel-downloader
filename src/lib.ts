import { ImageClass } from "./main";

namespace Cleaner {
  export interface statusType {
    [status: string]: Function;
  }
}

class CleanerClass {
  private status: string;
  private statusType: Cleaner.statusType;
  private typeParagraph: string[];
  private typeInto: string[];

  private currentHtml: HTMLElement;
  private currentText: string;
  private br_count: number;

  private imgMode: "naive" | "TM";

  public images: ImageClass[];
  public doms: HTMLElement[];
  public texts: string[];

  public constructor(imgMode: "naive" | "TM") {
    this.imgMode = imgMode;

    this.statusType = {
      init: this.parse_init,
      p: this.parse_p,
      br: this.parse_br,
      hr: this.parse_hr,
    };
    this.typeParagraph = [
      "DIV",
      "P",
      "OL",
      "H1",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
    ];
    this.typeInto = ["IMG", "HR", "BR"];

    this.currentHtml = document.createElement("p");
    this.currentText = "";
    this.br_count = 0;

    this.images = [];
    this.doms = [];
    this.texts = [];

    this.status = "init";
  }

  private reset_current() {
    this.currentHtml = document.createElement("p");
    this.currentText = "";
  }

  private create_pbr() {
    const p = document.createElement("p");
    const br = document.createElement("br");
    p.appendChild(br);
    return p;
  }

  private parse_init(element: Element) {
    const nodeName = element.nodeName;
    if (nodeName === "#text" && element.textContent?.trim() !== "") {
      this.br_count = 0;
      this.status = "p";
      this.currentText += element.textContent?.trim();
    } else if (this.typeParagraph.includes(nodeName)) {
      this.meet_p(element, nodeName);
    } else if (nodeName === "BR") {
      this.br_count++;
      this.status = "br";
    } else if (nodeName === "IMG") {
      this.meet_img(<HTMLImageElement>element);
    } else if (nodeName === "HR") {
      this.meet_hr();
    }
  }

  private parse_p(element: Element) {
    const nodeName = element.nodeName;
    if (nodeName === "BR") {
      this.br_count++;
      this.status = "br";
      this.currentText += "\n";
    } else if (this.typeParagraph.includes(nodeName)) {
      this.meet_p(element, nodeName);
    } else if (nodeName === "IMG") {
      this.meet_img(<HTMLImageElement>element);
    } else if (nodeName === "HR") {
      this.meet_hr();
    }
  }

  private parse_br(element: Element) {
    const nodeName = element.nodeName;
    if (nodeName === "BR") {
      this.br_count++;
      if (this.br_count <= 4) {
        this.currentText += "\n";
      }
    } else if (nodeName === "#text" && element.textContent?.trim() !== "") {
      this.meet_br_push();
      this.status = "p";
      this.currentText += element.textContent?.trim();
    } else if (this.typeParagraph.includes(nodeName)) {
      if (this.br_count > 2) {
        this.doms.push(this.create_pbr());
      }
      this.meet_p(element, nodeName);
    } else if (nodeName === "HR") {
      this.meet_hr();
    }
  }

  private parse_hr(element: Element) {
    const nodeName = element.nodeName;
    if (nodeName === "#text" && element.textContent?.trim() !== "") {
      this.br_count = 0;
      this.status = "p";
      this.currentText += element.textContent?.trim();
      this.currentHtml.innerText = this.currentText;
    } else if (this.typeParagraph.includes(nodeName)) {
      this.meet_p(element, nodeName);
    }
  }

  private meet_p(element: Element, nodeName: string) {
    this.br_count = 0;
    const childrenNodeNamesSet = new Set(
      Array.from(element.children).map((ele) => ele.nodeName)
    );
    const typeParagraphSet = new Set(this.typeParagraph);
    const intersectParagraph = Array.from(childrenNodeNamesSet).filter((x) =>
      typeParagraphSet.has(x)
    );

    const typeIntoSet = new Set(this.typeInto);
    const intersectInto = Array.from(childrenNodeNamesSet).filter((x) =>
      typeIntoSet.has(x)
    );
    if (intersectParagraph.length !== 0 || intersectInto.length != 0) {
      this.meet_text_push();

      const subcleaner = new CleanerClass(this.imgMode);
      const subcleanerBound = subcleaner.clean.bind(this);
      subcleanerBound(element);
      this.status = "init";
    } else {
      this.status = "p";
      this.currentText += "\n".repeat(2);
      this.currentText += element.textContent?.trim();
      this.meet_text_push();
    }
  }

  private meet_img(element: HTMLImageElement) {
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

    this.meet_br_push();

    this.br_count = 0;
    const imageUrl = element.src;
    const imageName = genImageName(imageUrl);
    const image = new ImageClass(imageUrl, imageName, this.imgMode);
    image.init();
    this.images.push(image);

    const pimg = document.createElement("p");
    const img = document.createElement("img");
    img.src = imageName;
    img.alt = imageUrl;
    pimg.appendChild(img);
    this.doms.push(pimg);
    this.texts.push(`\n![${img.alt}](${img.src})\n`);
  }

  private meet_hr() {
    this.meet_br_push();

    this.br_count = 0;
    this.status = "hr";
    this.texts.push(`\n${"-".repeat(20)}\n`);
    const hr = document.createElement("hr");
    this.doms.push(hr);
  }

  private meet_text_push() {
    this.currentHtml.innerText = this.currentText.trim();
    this.doms.push(this.currentHtml);
    this.texts.push(this.currentText);
    this.reset_current();
  }

  private meet_br_push() {
    if (this.br_count === 1) {
      this.br_count = 0;
      this.meet_text_push();
    } else if (this.br_count === 2) {
      this.br_count = 0;
      this.meet_text_push();
    } else if (this.br_count >= 3) {
      this.br_count = 0;
      this.meet_text_push();
      this.doms.push(this.create_pbr());
    }
  }

  public clean(DOM: Element) {
    let i: number = 0;
    while (i < DOM.childNodes.length) {
      const fn = this.statusType[this.status].bind(this);
      fn(DOM.childNodes[i]);
      i++;
    }
    this.meet_text_push();
    return { doms: this.doms, texts: this.texts, images: this.images };
  }
}

export function cleanDOM(DOM: Element, imgMode: "naive" | "TM") {
  const cleaner = new CleanerClass(imgMode);
  const { doms, texts, images } = cleaner.clean(DOM);

  const outputDOM = document.createElement("div");
  for (const dom of doms) {
    outputDOM.appendChild(dom);
  }

  let outputText = "";
  for (const t of texts) {
    outputText += t;
  }
  outputText = outputText.trim();
  return { dom: outputDOM, text: outputText, images: images };
}

export async function getHtmlText(
  url: string,
  charset: string | undefined,
  retryTime = 0
) {
  if (charset === undefined) {
    return fetch(url).then((response) => response.text());
  } else {
    return fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const decoder = new TextDecoder(charset);
        const text = decoder.decode(buffer);
        return text;
      });
  }
}

export async function getHtmlDOM(url: string, charset: string | undefined) {
  const htmlText = await getHtmlText(url, charset);
  return new DOMParser().parseFromString(htmlText, "text/html");
}
export interface co {
  bookUrl: string;
  bookname: string;
  chapterUrl: string;
  chapterName: string | null;
  isVIP: boolean;
  isPaid: boolean;
  sectionName: string | null;
  sectionNumber: number | null;
  sectionChapterNumber: number | null;
}
export function cosCompare(a: co, b: co): -1 | 0 | 1 {
  if (a.sectionNumber !== null && b.sectionNumber != null) {
    if (a.sectionNumber > b.sectionNumber) {
      return 1;
    }
    if (a.sectionNumber == b.sectionNumber) {
      if (a.sectionChapterNumber !== null && b.sectionChapterNumber !== null) {
        if (a.sectionChapterNumber > b.sectionChapterNumber) {
          return 1;
        }
        if (a.sectionChapterNumber == b.sectionChapterNumber) {
          return 0;
        }
        if (a.sectionChapterNumber < b.sectionChapterNumber) {
          return -1;
        }
      }
    }
    if (a.sectionNumber < b.sectionNumber) {
      return -1;
    }
  }
  return 0;
}

export function rm(selector: string, all = false, dom: HTMLElement) {
  if (all) {
    let rs = dom.querySelectorAll(selector);
    rs.forEach((e) => e.remove());
  } else {
    let r = dom.querySelector(selector);
    if (r) {
      r.remove();
    }
  }
}

interface gfetch_request_options {
  method?: string;
  headers?: object;
  data?: string;
  cookie?: string;
  binary?: boolean;
  nocache?: boolean;
  revalidate?: boolean;
  timeout?: number;
  context?: object;
  responseType?: "arraybuffer" | "blob" | "json";
  overrideMimeType?: string;
  anonymous?: boolean;
  username?: string;
  password?: string;
}
export function gfetch(
  url: string,
  {
    method = "GET",
    headers,
    data,
    cookie,
    binary,
    nocache,
    revalidate,
    timeout,
    context,
    responseType,
    overrideMimeType,
    anonymous,
    username,
    password,
  }: gfetch_request_options = {}
): Promise<GM_xmlhttpResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url: url,
      method: method,
      headers: headers,
      data: data,
      cookie: cookie,
      binary: binary,
      nocache: nocache,
      revalidate: revalidate,
      timeout: timeout,
      context: context,
      responseType: responseType,
      overrideMimeType: overrideMimeType,
      anonymous: anonymous,
      username: username,
      password: password,
      onload: (obj: GM_xmlhttpResponse) => {
        resolve(obj);
      },
      onerror: (err: object) => {
        reject(err);
      },
    });
  });
}

// source: https://segmentfault.com/a/1190000013128649
export function concurrencyRun(
  list: object[],
  limit: number,
  asyncHandle: Function
) {
  function recursion(arr: object[]) {
    return asyncHandle(arr.shift()).then(function () {
      if (arr.length !== 0) {
        return recursion(arr);
      } else {
        return "finish!";
      }
    });
  }

  let listCopy = [...list];
  let asyncList: Function[] = [];
  while (limit--) {
    asyncList.push(recursion(listCopy));
  }
  return Promise.all(asyncList);
}
