import { mkBiqugeMultiIndexNextPage } from "./template";
import { rm } from "../../lib/dom";

export const znlzd = () =>
  mkBiqugeMultiIndexNextPage(
    (dom) => dom,
    (content) => {
      rm("div", true, content);
      return content;
    },
    (doc) =>
      doc.querySelector<HTMLAnchorElement>(
        "div.section-opt:nth-child(1) > a:nth-child(5)"
      )?.href ?? "",
    (_content, nextLink) => {
      if (nextLink === "") {
        return false;
      }
      const pathname = nextLink.split("/").slice(-1)[0];
      return pathname.includes("_");
    }
  );

export const c226ks = () =>
  mkBiqugeMultiIndexNextPage(
    (introDom) => introDom,
    (content) => content,
    (doc) =>
      (
        doc.querySelector(
          "section.g-content-nav > a:nth-child(3)"
        ) as HTMLAnchorElement
      ).href,
    (_content, nextLink) => {
      const pathname = nextLink.split("/").slice(-1)[0];
      return pathname.includes("_");
    }
  );
