// SPDX-License-Identifier: AGPL-3.0-or-later

import { parseHTML as _parseHTML } from "linkedom";

/**
 * 将 HTML 字符串解析为 Document 对象
 * @public
 */
export function parseHTML(html: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TS2552: Cannot find name 'DOMParser'.
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc;
  } catch (error) {
    const { document: doc } = _parseHTML(html);
    return doc;
  }
}
