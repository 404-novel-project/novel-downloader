// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * 身份标识基类
 * @public
 */

export interface ID {
  type: string;
  value: string;
}

/**
 * ISBN
 * @public
 * @example
 * {
 *    type: "ISBN",
 *    value: "9787806981009"
 * }
 *
 */
export interface ISBN extends ID {
  type: "ISBN";
  value: string;
}

/**
 * ISSN
 * @public
 */
export interface ISSN extends ID {
  type: "ISSN";
  value: string;
}

/**
 * Amazon ASIN
 * @public
 */
export interface ASIN extends ID {
  type: "ASIN";
  value: string;
}

/**
 * DOI
 * @public
 */
export interface DOI extends ID {
  type: "DOI";
  value: string;
}

/**
 * UUID
 * @public
 */
export interface UUID extends ID {
  type: "UUID";
  value: string;
}

/**
 * URL
 * @public
 * @example
 * {
 *    type: "URL",
 *    value: "https://book.sfacg.com/Novel/659729/"
 * }
 */
export interface URL extends ID {
  type: "URL";
  value: string;
}
