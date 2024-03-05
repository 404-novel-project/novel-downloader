// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/no-explicit-any */

type OptionalPropertyNames<T> = {
  [K in keyof T]-?: Record<string, never> extends { [P in K]: T[K] } ? K : never;
}[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>>
  : unknown;

/**
 * 合并对象
 *
 * 详情参见： https://stackoverflow.com/a/49683575
 *
 * @example
 * ```
 * const merged = merge(
 *  { a: 42 },
 *  { b: "foo", a: "bar" },
 *  { c: true, b: 123 }
 * );
 *
 * // const merged: {
 * //   a: string;
 * //   b: number;
 * //   c: boolean;
 * // }
 * ```
 *
 * @public
 */
export function merge<A extends object[]>(...a: [...A]) {
  return Object.assign({}, ...a) as Spread<A>;
}

/**
 * 带类型支持的 Object.entries
 *
 * 详情参见：https://stackoverflow.com/a/74891854
 *
 * @public
 */
export function objectEntries<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T,
  V extends T[K],
>(o: T) {
  return Object.entries(o) as [K, V][];
}

/**
 * 从 union 类型中的每一项中移除某属性
 *
 * 详情参见：https://stackoverflow.com/a/57103940
 *
 * @public
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

/**
 * 可能为 Promise
 * @public
 */
export type mayPromise<T> = T | Promise<T>;

export { ISO_639_1, ISO_639_2B, ISO_639_2T, ISO_639_3 } from "./ISO_639";

export { ISO_3166_1_A2, ISO_3166_1_A3, ISO_3166_1_NC } from "./ISO_3166";
