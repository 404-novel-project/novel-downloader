// SPDX-License-Identifier: AGPL-3.0-or-later AND (MIT OR Apache-2.0)

import { getSfacgRules } from "./DNRR";
import { check } from "./types";
import { HttpClient, getUid } from "./utils";

import type {
  SfResp,
  NovelInfo,
  Catalog,
  Content,
  Login,
  Position,
  User,
  Search,
  Bookshelf,
  TagItem,
  NovelType,
  Novels as NovelItem,
} from "./types";

/**
 * SFACG 客户端 API
 *
 * 改写自 https://github.com/novel-rs/api/blob/main/src/sfacg/mod.rs
 * @public
 */
export class ApiClient extends HttpClient {
  public constructor(signal?: AbortSignal) {
    super(getUid, signal);
  }

  /**
   * 登录帐户
   *
   * SFACG 似乎只允许一个 Session 存活，新的登录将使旧有 Session 失效
   *
   * 浏览器环境中，无法读取 Set-Cookie Header，故返回值为空
   */
  public async login(username: string, password: string) {
    const response0 = await this.post("/sessions", { userName: username, passWord: password });
    const loginResponse = (await response0.json()) as SfResp<Login>;
    check(loginResponse);

    const positionResponse = (await this.get_json("/position")) as SfResp<Position>;
    check(positionResponse);

    const headers = [...response0.headers.entries()];
    const cookies = Object.fromEntries(
      headers
        .filter((kv) => kv[0].toLowerCase() === "set-cookie")
        .map((kv) => kv[1].split("; ")[0].split("=")),
    );
    return cookies;
  }

  /**
   * 获取当前登录用户信息
   *
   * 如果未登录或 Session 无效，将 throw Error 。
   */
  public async user_info() {
    const userResponse = await this.get_json("/user");
    check(userResponse);
    return userResponse.data as User;
  }

  /**
   * 获取书籍信息
   *
   * 原有实现中所对应的 novel_info 函数。
   */
  public async book_info(novelId: number): Promise<NovelInfo> {
    const novelInfoResponse = await this.get_query_json(
      `/novels/${novelId}`,
      new URLSearchParams({ expand: "intro,typeName,sysTags" }),
    );
    check(novelInfoResponse);
    return novelInfoResponse.data as NovelInfo;
  }

  /**
   * 获取目录信息
   *
   * 原有实现中所对应的 volume_infos 函数。
   */
  public async toc_info(novelId: number) {
    const volumeInfoResponse = await this.get_json(`/novels/${novelId}/dirs`);
    check(volumeInfoResponse);
    return volumeInfoResponse.data as Catalog;
  }

  /**
   * 获取章节信息
   *
   * 原有实现中所对应的 content_infos 函数。
   */
  public async content_info(chapId: number) {
    const contentInfoResponse = await this.get_query_json(
      `/Chaps/${chapId}`,
      new URLSearchParams({ expand: "content" }),
    );
    check(contentInfoResponse);
    return contentInfoResponse.data as Content;
  }

  /**
   * 下载图片
   * @param url - 图片 URL
   * @returns
   */
  public async image(url: string) {
    const response = await this.get_rss(url);
    return response.blob();
  }

  /**
   * 搜索小说
   * @param text
   * @param page
   * @param size
   * @returns
   */
  public async search_infos(text: string, page: number, size: number) {
    const searchResponse = await this.get_query_json(
      "/search/novels/result/new",
      new URLSearchParams({
        q: text,
        sort: "hot",
        page: page.toString(),
        size: size.toString(),
      }),
    );
    check(searchResponse);
    return searchResponse as Search;
  }

  /**
   * 获取用户书架信息
   * @returns
   */
  public async bookshelf_infos() {
    const bookshelfResponse = await this.get_query_json(
      "/user/Pockets",
      new URLSearchParams({
        expand: "novels,albums,comics",
      }),
    );
    check(bookshelfResponse);
    return bookshelfResponse as Bookshelf;
  }

  /**
   * 获取分类列表
   * @returns
   */
  public async categories() {
    const categoriesResponse = await this.get_json("/noveltypes");
    check(categoriesResponse);
    return categoriesResponse as NovelType[];
  }

  /**
   * 获取 Tag 列表
   * @returns
   */
  public async tags() {
    const tagsResponse = await this.get_json("/novels/0/sysTags");
    check(tagsResponse);
    return tagsResponse as TagItem[];
  }

  /**
   * 搜索分类
   * @param category_id
   * @param page
   * @param size
   * @param options
   * @returns
   */
  public async novels(
    category_id: NovelType["typeId"],
    page: number,
    size: number,
    options: {
      char_count_begin?: number;
      char_count_end?: number;
      is_finish?: boolean;
      is_free?: boolean;
      sys_tag_ids?: TagItem["sysTagId"][];
      not_exclude_sys_tag_ids?: TagItem["sysTagId"][];
      updatedays?: number;
    },
  ) {
    const _options = {
      fields: "novelId",
      sort: "viewtimes",
      page,
      size,
      ...options,
    };
    const query = new URLSearchParams(
      Object.entries(_options).map(([k, v]) => {
        if (Array.isArray(v)) {
          return [k, v.join(",")];
        } else {
          return [k, v.toString()];
        }
      }),
    );
    // 这里好像有一些问题，查询参数好像无效
    const novelsResponse = await this.get_query_json(
      `/novels/${category_id}/sysTags/novels`,
      query,
    );
    check(novelsResponse);
    return novelsResponse as NovelItem[];
  }
}

/**
 * 直接供规则调用的 API 接口
 * @public
 */
export class Client {
  public apiClient: ApiClient;

  public constructor(signal?: AbortSignal) {
    this.apiClient = new ApiClient(signal);
  }

  private getDNRR() {
    return getSfacgRules();
  }

  public login(username: string, password: string) {}
}
