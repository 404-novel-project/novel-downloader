import { AttachmentClass as attachmentClassGlobal } from "../main";
import { calculateMd5 } from "./misc";

let attachmentClassCache: attachmentClassGlobal[] = [];
export function getAttachmentClassCache(url: string) {
  const found = attachmentClassCache.find(
    (attachmentClass) => attachmentClass.url === url
  );
  return found;
}

export function putAttachmentClassCache(
  attachmentClass: attachmentClassGlobal
) {
  attachmentClassCache.push(attachmentClass);
  return true;
}

export function clearAttachmentClassCache() {
  attachmentClassCache = [];
}

export async function getImageAttachment(
  url: string,
  imgMode: "naive" | "TM" = "TM",
  prefix: string = "",
  noMD5: boolean = false,
  comments?: string
) {
  const tmpImageName = Math.random().toString().replace("0.", "");

  let imgClass;
  const imgClassCache = getAttachmentClassCache(url);
  if (imgClassCache) {
    imgClass = imgClassCache;
  } else {
    imgClass = new attachmentClassGlobal(url, tmpImageName, imgMode);
    const blob = await imgClass.init();
    if (blob) {
      const hash = await calculateMd5(blob);
      const contentType = blob.type.split("/")[1];
      const contentTypeBlackList = ["octet-stream"];
      let ext = contentType;
      if (contentTypeBlackList.includes(contentType)) {
        const _ext = new URL(url).pathname
          .split(".")
          .slice(-1)[0]
          .match(/(^[\d|\w]+)/);
        if (_ext) {
          ext = _ext[0];
        } else {
          ext = new URL(url).pathname.split(".").slice(-1)[0];
        }
      }

      let imageName: string;
      if (noMD5) {
        let _imageName = new URL(url).pathname.split("/").slice(-1)[0];
        if (
          attachmentClassCache.find(
            (attachmentClass) =>
              attachmentClass.name === _imageName && attachmentClass.url !== url
          )
        ) {
          _imageName = new URL(url).pathname.split("/").slice(-2).join("_");
        }
        imageName = [prefix, _imageName].join("");
      } else {
        imageName = [prefix, hash, ".", ext].join("");
      }

      imgClass.name = imageName;
      putAttachmentClassCache(imgClass);
    } else {
      // throw new ExpectError("[getImageAttachment] Init Image failed!");
    }
  }
  if (comments) {
    imgClass.comments = comments;
  }
  return imgClass;
}
