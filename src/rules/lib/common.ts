import { cleanDOM } from "../../lib";
import { attachmentClass } from "../../main";

export async function introDomHandle(
  introDom: (Element | HTMLElement) | null,
  domPatch: ((introDom: HTMLElement) => HTMLElement) | undefined = undefined
): Promise<[string | null, HTMLElement | null, attachmentClass[] | null]> {
  if (introDom === null) {
    return [null, null, null];
  } else {
    if (domPatch) {
      introDom = domPatch(introDom.cloneNode(true) as HTMLElement);
    }
    let {
      dom: introCleanDom,
      text: introCleantext,
      images: introCleanimages,
    } = await cleanDOM(introDom, "TM");
    return [introCleantext, introCleanDom, introCleanimages];
  }
}
