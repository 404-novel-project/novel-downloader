// SPDX-License-Identifier: AGPL-3.0-or-later

import { MetaBase, resumeFactory } from "./base";

import type { getConstructorArgs, ResumeStatus } from "./base";
import type { ID } from "../data/id";
import type { VolumeConstructor, VolumeResumeStatus } from "../data/volume";
import type { InitArgsType } from "../rule";

type VolumeArgs = VolumeConstructor;

interface VolumeInitArgs extends InitArgsType {
  volumeArgs: VolumeArgs;
}

type VolumeArgsOnResumeStatus = VolumeResumeStatus;

export interface VolumeInitArgsOnResumeStatus extends InitArgsType {
  volumeArgs: VolumeArgsOnResumeStatus;
}

/**
 * 分卷元数据
 * @public
 */
export class Volume extends MetaBase implements VolumeArgs {
  /** volumeID */
  volumeID!: number | string | null;
  /** 卷名 */
  volumeName!: string | null;
  /** 简介 */
  introduction!: string | null;
  /** 标签 */
  tags!: string[];
  /** 身份标识 */
  ids!: ID[] | null;
  /** 排序 */
  order!: number;
  /** 卷创建时间 */
  public set createdTime(input: number | string | Date | null) {
    if (input === null) {
      this._createdTime = input;
    } else {
      this._createdTime = new Date(input);
    }
  }
  public get createdTime(): Date | null {
    return this._createdTime;
  }
  private _createdTime!: Date | null;
  /** 最后更新时间 */
  public set lastUpdateTime(input: number | string | Date) {
    if (input === null) {
      this._createdTime = input;
    } else {
      this._createdTime = new Date(input);
    }
  }
  public get lastUpdateTime(): Date | null {
    return this._lastUpdateTime;
  }
  private _lastUpdateTime!: Date | null;

  public constructor(args: getConstructorArgs<VolumeInitArgs>) {
    super(args);
    Object.assign(this, args.initArgs.volumeArgs);
  }

  public override toJSON(): ResumeStatus<VolumeInitArgsOnResumeStatus> {
    const out = super.toJSON() as ResumeStatus<VolumeInitArgs>;
    Object.assign(out.initArgs.chapterArgs, {
      createdTime: this.createdTime?.toISOString() ?? null,
      lastUpdateTime: this.created?.toISOString() ?? null,
    });
    return out as ResumeStatus<VolumeInitArgsOnResumeStatus>;
  }

  static async resume(
    parentMeta: MetaBase,
    resumeStatus: ResumeStatus<VolumeInitArgsOnResumeStatus>,
  ) {
    const { Volume: VolumeData } = await import("../data/volume");
    return await resumeFactory(
      parentMeta,
      resumeStatus,
      VolumeData,
      this,
      parentMeta.Rule.volumeParser,
      parentMeta.Rule.volumeTaskCallback,
    );
  }
}
