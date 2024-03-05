// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import * as browser from "webextension-polyfill";

import { deepcopy, saveBlob } from "vendor/utils";

/**
 * 导出 Cookie 格式
 * @public
 */
export interface Cookie {
  domain: string;
  path: string;
  name: string;
  value: string;
  expires: string;
  httpOnly: boolean;
  sameSite: "None" | "Lax" | "Strict";
  secure: boolean;
}

function cookiesJsonMapper({
  domain,
  path,
  name,
  value,
  expirationDate,
  httpOnly,
  sameSite,
  secure,
}: browser.Cookies.Cookie): Cookie {
  const sameSiteMapper = new Map([
    ["no_restriction", "None"],
    ["lax", "Lax"],
    ["strict", "Strict"],
  ]);

  return {
    domain,
    path,
    name,
    value,
    expires: expirationDate ? new Date(expirationDate * 1000).toUTCString() : "Session",
    httpOnly,
    sameSite: sameSiteMapper.get(sameSite) as "None" | "Lax" | "Strict",
    secure,
  };
}

function cookiesTxtMapper(co: browser.Cookies.Cookie) {
  return [
    [
      co.httpOnly ? "#HttpOnly_" : "",
      !co.hostOnly && co.domain && !co.domain.startsWith(".") ? "." : "",
      co.domain,
    ].join(""),
    co.hostOnly ? "FALSE" : "TRUE",
    co.path,
    co.secure ? "TRUE" : "FALSE",
    co.session || !co.expirationDate ? 0 : co.expirationDate,
    co.name,
    co.value + "\n",
  ].join("\t");
}

/**
 * 获取 cookies.txt
 *
 * 参考了插件 {@link https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/ |cookies.txt}
 *
 * Author: hrdl-github
 *
 * Licence: GPL-3.0 license
 * @public
 */
export function getCookiesTxt(cookies: browser.Cookies.Cookie[]) {
  const header = [
    "# Netscape HTTP Cookie File\n",
    "# https://curl.haxx.se/rfc/cookie_spec.html\n",
    "# This is a generated file! Do not edit.\n\n",
  ];
  const body = cookies.map(cookiesTxtMapper).join("");
  return header + body;
}

/**
 * 获取导出 Cookies 对象
 * @public
 */
export async function getExportCookies(url: string, storeId?: string) {
  let query: browser.Cookies.GetAllDetailsType = storeId ? { url, storeId } : { url };

  try {
    const { name: browserName } = await browser.runtime.getBrowserInfo();
    if (browserName === "Firefox") {
      query = { firstPartyDomain: null, ...query };
    }
  } catch (error) {
    // pass
  }

  const cookies = await browser.cookies.getAll(query);
  const exportCookies = {
    json: cookies.map(cookiesJsonMapper),
    txt: getCookiesTxt(cookies),
  };
  return exportCookies;
}

/**
 * 获取导出Cookies对象并移除已导出的Cookies
 * @param url
 * @param storeId
 * @returns
 * @public
 */
export async function getExportAndRemoveCookies(url: string, storeId?: string) {
  const exportCookies = await getExportCookies(url, storeId);

  let query: browser.Cookies.GetAllDetailsType = storeId ? { url, storeId } : { url };

  let browserName = "";
  try {
    ({ name: browserName } = await browser.runtime.getBrowserInfo());
    if (browserName === "Firefox") {
      query = { firstPartyDomain: null, ...query };
    }
  } catch (error) {
    // pass
  }

  const cookies = await browser.cookies.getAll(query);
  cookies.forEach((c) => {
    let removeDetail: browser.Cookies.RemoveDetailsType = {
      storeId: c.storeId,
      url,
      name: c.name,
    };

    if (browserName === "Firefox") {
      removeDetail = {
        firstPartyDomain: c.firstPartyDomain,
        partitionKey: c.partitionKey,
        ...removeDetail,
      };
    }
    browser.cookies.remove(removeDetail);
  });

  return exportCookies;
}

/**
 * 导出 Cookies
 * @public
 */
export async function exportCookies(url: string, storeId?: string) {
  const { hostname } = new URL(url as string);
  const exportCookies = await getExportCookies(url, storeId);

  const cookiesJsonBlob = new Blob([JSON.stringify(exportCookies.json, undefined, 2)], {
    type: "application/json",
  });
  const cookiesTxtBlob = new Blob([exportCookies.txt], { type: "text/plain" });

  let baseName: string;
  if (storeId) {
    let containerName = storeId;
    try {
      containerName = (await browser.contextualIdentities.get(storeId)).name;
    } catch (error) {
      // pass
    }
    const containerNameSafe = containerName.replaceAll(/[/\\]/g, "_");
    baseName = `cookies_${containerNameSafe}_${hostname}`;
  } else {
    baseName = `cookies_${hostname}`;
  }

  saveBlob({ blob: cookiesJsonBlob, filename: baseName + ".json" });
  saveBlob({ blob: cookiesTxtBlob, filename: baseName + ".txt" });
}

/**
 * 导入 Cookies
 * @param cookies - Cookies 对象
 * @param storeId - 存储区域ID
 * @returns
 * @public
 */
export async function importCookies(cookies: Cookie[], storeId?: string) {
  const sameSiteMapper = new Map([
    ["None", "no_restriction"],
    ["Lax", "lax"],
    ["Strict", "strict"],
  ]);

  const _cookies = cookies.map((co) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _co: any = deepcopy(co);
    _co.sameSite = sameSiteMapper.get(_co.sameSite) as string;
    if (_co.expires) {
      if (_co.expires === "Session") {
        delete _co.expires;
      } else {
        _co.expirationDate = Math.round(new Date(_co.expires).getTime() / 1000);
        delete _co.expires;
      }
    }

    if (storeId) {
      _co.storeId = storeId;
    }

    if (_co.sameSite === "no_restriction") {
      delete _co.sameSite;
    }

    return _co;
  });

  function getUrl(co: Cookie) {
    let url = co.secure ? "https://" : "http://";
    if (co.domain.startsWith(".")) {
      url = url + co.domain.substring(1);
    } else {
      url = url + co.domain;
    }
    url = url + co.path;
    return url;
  }

  log.debug("importCookies", _cookies);
  let succeed = true;
  for (const _co of _cookies) {
    try {
      await browser.cookies.set({
        url: getUrl(_co),
        ..._co,
      });
    } catch (error) {
      log.error(error, _co, getUrl(_co));
      succeed = false;
    }
  }
  return succeed;
}
