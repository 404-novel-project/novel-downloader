import { cleanDOM } from "../../lib";
import { attachmentClass } from "../../main";

export function introDomHandle(
  introDom: (Element | HTMLElement) | null
): [string | null, HTMLElement | null, attachmentClass[] | null] {
  if (introDom === null) {
    return [null, null, null];
  } else {
    let {
      dom: introCleanDom,
      text: introCleantext,
      images: introCleanimages,
    } = cleanDOM(introDom, "TM");
    return [introCleantext, introCleanDom, introCleanimages];
  }
}
