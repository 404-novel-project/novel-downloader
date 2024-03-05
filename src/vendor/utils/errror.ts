// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * 将 Error 对象转换为自定义格式化对象
 * @param error -
 * @returns
 * @public
 */
export function errorToObject(error: Error): errorToObjectReturn {
  return {
    name: error.name,
    message: error.message,
    cause: error.cause,
    stack: error.stack,
  };
}

/**
 * 自定义 Error 格式化对象
 * @public
 */
export type errorToObjectReturn = {
  name: string;
  message: string;
  cause: unknown;
  stack: string | undefined;
};
