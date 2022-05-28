import { AttachmentClass } from "../main/Attachment";
import { ReferrerMode } from "../main/main";
import { calculateSha1 } from "./hash";
import { log } from "../log";
import { randomUUID } from "./misc";

import { filetypeextension } from "magic-bytes.js";

let attachmentClassCache: AttachmentClass[] = [];

export function getAttachmentClassCache(url: string) {
  return attachmentClassCache.find(
    (attachmentClass) => attachmentClass.url === url
  );
}

export function putAttachmentClassCache(attachmentClass: AttachmentClass) {
  attachmentClassCache.push(attachmentClass);
  return true;
}

export function clearAttachmentClassCache() {
  attachmentClassCache = [];
}

export async function getAttachment(
  url: string,
  mode: "naive" | "TM",
  prefix = "",
  noMD5 = false,
  comments = getRandomName(),
  options?: {
    referrerMode?: ReferrerMode;
    customReferer?: string;
  }
): Promise<AttachmentClass> {
  if (mode === "naive") {
    const u = new URL(url);
    if (document.location.protocol === "https:" && u.protocol === "http:") {
      u.protocol = document.location.protocol;
      url = u.href;
    }
  }

  const imgClassCache = getAttachmentClassCache(url);
  if (imgClassCache) {
    return imgClassCache;
  }
  const imgClass = new AttachmentClass(
    url,
    comments,
    mode,
    options?.referrerMode,
    options?.customReferer
  );
  imgClass.comments = comments;
  const blob = await imgClass.init();
  if (blob) {
    if (noMD5) {
      imgClass.name = getLastPart(url);
    } else {
      const hash = await calculateSha1(blob);
      const ext = await getExt(blob, url);
      imgClass.name = [prefix, hash, ".", ext].join("");
    }
  }
  putAttachmentClassCache(imgClass);
  log.debug(
    `[attachment]下载附件完成！ url:${imgClass.url}, name: ${imgClass.name}`
  );
  return imgClass;
}

export function getRandomName() {
  return `__${randomUUID()}__`;
}

export async function getExt(b: Blob, u: string): Promise<string> {
  const ext = filetypeextension(new Uint8Array(await b.arrayBuffer()) as any);
  if (ext.length !== 0) {
    return ext[0];
  }

  const contentType = b.type.split(";")[0].split("/")[1];
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
