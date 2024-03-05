// SPDX-License-Identifier: AGPL-3.0-or-later

import { default as SFACG, WebType } from "../com.sfacg";

import type { getBookInitArgsType } from ".";

export const getBookInitArgs: getBookInitArgsType = ({
  _Rule,
  url,
  baseOrigin,
  hostname,
  basePathname,
  pathname,
}) => {
  const getBookid = (pathname: string) => {
    let bookid: string | null = null;
    for (const match of (_Rule as typeof SFACG).Match) {
      const mm = pathname.match(match);
      if (mm !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        bookid = mm.groups!["bookid"] ?? null;
      }
    }
    return bookid;
  };
  const getWebType = (hostname: string) => {
    if (hostname === "book.sfacg.com") {
      return WebType.PC;
    } else if (hostname === "m.sfacg.com") {
      return WebType.Mobile;
    }
    return null;
  };

  const bookid = getBookid(pathname);
  const webType = getWebType(hostname);
  if (bookid && webType) {
    const initArgs = {
      bookid,
      webType,
      useApi: false,
      isWebLogin: false,
      isApiLogin: false,

      baseOrigin,
      basePathname,
      url,
    };
    return initArgs;
  } else {
    return null;
  }
};
