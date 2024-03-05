// SPDX-License-Identifier: AGPL-3.0-or-later

import { blobToDataUrl, dataUrlToBlob } from "vendor/utils/dataUrl";

import { DataBase, resumeFactory } from "./base";

import type { ResumeStatus } from "./base";
import type { ID } from "./id";
import type { Attachment as AttachmentMeta } from "../meta";

/**
 * Attachment constructor 参数
 * @public
 */
export interface AttachmentConstructor {
  /** attachment ID */
  attachmentID: number | string | null;
  /** 附件资源网址 */
  url: string | null;
  /** 附件数据 */
  data: string | Blob | null;
  hash: string | null;
  "content-length": number | null;
  "content-type": string | null;
  "last-modified": number | string | Date | null;
  etag: string | null;
  /** 身份标识 */
  ids: ID[] | null;
  /** 排序 */
  order: number | null;
}

export type AttachmentInitHook = (args: AttachmentConstructor, attachment: Attachment) => void;

export interface AttachmentResumeStatus extends AttachmentConstructor, ResumeStatus {
  data: string | null;
  "last-modified": number | null;
}

/**
 * 附件
 * @public
 */
export class Attachment extends DataBase implements AttachmentConstructor {
  /** attachment ID */
  attachmentID!: number | string | null;
  /** 附件资源网址 */
  url!: string | null;
  /** 附件数据 */
  public set data(input: string | Blob | null) {
    if (typeof input === "string") {
      dataUrlToBlob(input).then((blob) => (this._data = blob));
    } else {
      this._data = input;
    }
  }
  public get data(): Blob | null {
    return this._data;
  }
  private _data!: Blob | null;
  hash!: string | null;
  "content-length"!: number | null;
  "content-type"!: string | null;
  public set "last-modified"(input: number | string | Date | null) {
    if (input === null) {
      this._last_modified = input;
    } else {
      this._last_modified = new Date(input);
    }
  }
  public get "last-modified"(): Date | null {
    return this._last_modified;
  }
  private _last_modified!: Date | null;
  etag!: string | null;
  /** 身份标识 */
  ids!: ID[] | null;
  /** 排序 */
  order!: number | null;

  /**
   * Attachment constructor
   * @param meta
   * @param args
   * @param initHooks
   */
  public constructor(
    meta: AttachmentMeta,
    args: AttachmentConstructor,
    initHooks: AttachmentInitHook[] = [],
  ) {
    super(meta);
    Object.assign(this, args);
    this.init(args, initHooks);
  }

  /**
   * Attachment 自定义初始化函数
   * @override
   */
  protected override init(args: AttachmentConstructor, initHooks: AttachmentInitHook[]): void {
    super.init();
    const task = initHooks.map((initHook) => initHook(args, this));
    Promise.allSettled(task);
  }

  /** 状态保存 */
  public override async toJSON<AttachmentResumeStatus>(): Promise<AttachmentResumeStatus> {
    return {
      attachmentID: this.attachmentID,
      url: this.url,
      data: this.data ? await blobToDataUrl(this.data) : null,
      hash: this.hash,
      "content-length": this["content-length"],
      "content-type": this["content-type"],
      "last-modified": this["last-modified"]?.toISOString() ?? null,
      etag: this.etag,
      ids: this.ids,
      order: this.order,
      ...super.toJSON(),
    } as AttachmentResumeStatus;
  }

  static resume(
    meta: AttachmentMeta,
    resumeStatus: AttachmentResumeStatus,
    initHooks: AttachmentInitHook[] = [],
  ) {
    return resumeFactory(meta, resumeStatus, initHooks, this);
  }
}
