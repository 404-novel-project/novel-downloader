// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Content 基类
 * @public
 */

export interface ContentBase {
  type: string;
}
/**
 * 正文
 * @public
 */

export interface Content extends ContentBase {
  type: "content";
  /**
   * 内容
   * 可以普通文本或HTML字符串
   */
  value: string;
  /**
   * 附件 Meta ID
   */
  attachmentMeta: string[];
}
/**
 * 作者的话
 * @public
 */

export interface AuthorTalk extends ContentBase {
  type: "authorTalk";
  /**
   * 内容
   * 可以普通文本或HTML字符串
   */
  value: string;
  /**
   * 作话位置
   * - head 章节开头
   * - tail 章节结尾
   */
  postitionn: "head" | "tail";
  /**
   * 附件 Meta ID
   */
  attachmentMeta: string[];
}

export interface Image extends ContentBase {
  type: "image";
  /** 图片URL */
  url: string;
  /** 附件 Meta ID */
  meta: string;
}

export interface Video extends ContentBase {
  type: "video";
  /** 视频URL */
  url: string;
  /** 附件 Meta ID */
  meta: string;
}
