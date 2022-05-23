import { mkBiqugeMultiIndexNextPage } from "./template";

// export const znlzd = () =>
//   mkBiqugeMultiIndexNextPage(
//     (dom) => dom,
//     (content) => {
//       rm("div", true, content);
//       return content;
//     },
//       (doc) =>
//   );

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
