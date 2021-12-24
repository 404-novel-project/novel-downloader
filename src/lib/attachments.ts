import { AttachmentClass as attachmentClassType } from "../main";
import { calculateMd5 } from "./misc";

let attachmentClassCache: attachmentClassType[] = [];
export function getAttachmentClassCache(url: string) {
  const found = attachmentClassCache.find(
    (attachmentClass) => attachmentClass.url === url
  );
  return found;
}

export function putAttachmentClassCache(attachmentClass: attachmentClassType) {
  attachmentClassCache.push(attachmentClass);
  return true;
}

export function clearAttachmentClassCache() {
  attachmentClassCache = [];
}

export async function getImageAttachment(
  url: string,
  imgMode: "naive" | "TM",
  prefix = "",
  noMD5 = false,
  comments = getRandomName()
): Promise<attachmentClassType> {
  const imgClassCache = getAttachmentClassCache(url);
  if (imgClassCache) {
    return imgClassCache;
  }

  const imgClass = new attachmentClassType(url, comments, imgMode);
  imgClass.comments = comments;
  const blob = await imgClass.init();
  if (blob) {
    if (noMD5) {
      imgClass.name = getLastPart(url);
    } else {
      const hash = await calculateMd5(blob);
      const ext = getExt(blob, url);
      imgClass.name = [prefix, hash, ".", ext].join("");
    }
  }
  putAttachmentClassCache(imgClass);
  return imgClass;

  function getExt(b: Blob, u: string) {
    const contentType = b.type.split("/")[1];
    const contentTypeBlackList = ["octet-stream"];
    if (contentTypeBlackList.includes(contentType)) {
      return getExtFromUrl(u);
    } else {
      return contentType;
    }
  }
  function getExtFromUrl(u: string) {
    const _u = new URL(u);
    const p = _u.pathname;
    return p.substring(p.lastIndexOf(".") + 1);
  }
  function getLastPart(u: string) {
    const _u = new URL(u);
    const p = _u.pathname;
    return p.substring(p.lastIndexOf("/") + 1);
  }
}

export function getRandomName() {
  return "__" + Math.random().toString().replace("0.", "") + "__";
}
