// SPDX-License-Identifier: AGPL-3.0-or-later

import { MetaBase, resumeFactory } from "./base";

import type { getConstructorArgs, ResumeStatus } from "./base";
import type { AttachmentConstructor } from "../data/attachment";
import type { ID } from "../data/id";
import type { InitArgsType } from "../rule";

type AttachmentArgs = Pick<AttachmentConstructor, "attachmentID" | "url" | "ids" | "order">;

interface AttachmentInitArgs extends InitArgsType {
  attachmentArgs: AttachmentArgs;
}

export type AttachmentInitArgsOnResumeStatus = AttachmentInitArgs;

/**
 * 附件元数据
 * @public
 */
export class Attachment extends MetaBase implements AttachmentArgs {
  /** attachment ID */
  attachmentID!: number | string | null;
  /** 附件资源网址 */
  url!: string | null;
  /** 身份标识 */
  ids!: ID[] | null;
  /** 排序 */
  order!: number | null;

  public constructor(args: getConstructorArgs<AttachmentInitArgs>) {
    super(args);
    Object.assign(this, args.initArgs.attachmentArgs);
  }

  public override toJSON(): ResumeStatus<AttachmentInitArgsOnResumeStatus> {
    return super.toJSON() as ResumeStatus<AttachmentInitArgsOnResumeStatus>;
  }

  static async resume(
    parentMeta: MetaBase,
    resumeStatus: ResumeStatus<AttachmentInitArgsOnResumeStatus>,
  ) {
    const { Attachment: AttachmentData } = await import("../data/attachment");
    return await resumeFactory(
      parentMeta,
      resumeStatus,
      AttachmentData,
      this,
      parentMeta.Rule.attachmentParser,
      parentMeta.Rule.attachmentTaskCallback,
    );
  }
}
