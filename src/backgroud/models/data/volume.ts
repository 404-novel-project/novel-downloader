// SPDX-License-Identifier: AGPL-3.0-or-later

import { DataBase, resumeFactory } from "./base";

import type { ResumeStatus } from "./base";
import type { ID } from "./id";
import type { Volume as VolumeMeta } from "../meta";

/**
 * Volume constructor 参数
 * @public
 */
export interface VolumeConstructor {
  /** volume ID */
  volumeID: number | string | null;
  /** 卷名 */
  volumeName: string | null;
  /** 简介 */
  introduction: string | null;
  /** 标签 */
  tags: string[];
  /** 身份标识 */
  ids: ID[] | null;
  /** 排序 */
  order: number;
  /** 卷创建时间 */
  createdTime: number | string | Date | null;
  /** 最后更新时间 */
  lastUpdateTime: number | string | Date | null;
}

export type VolumeInitHook = (args: VolumeConstructor, volume: Volume) => void;

export interface VolumeResumeStatus extends VolumeConstructor, ResumeStatus {
  createdTime: string | null;
  lastUpdateTime: string | null;
}

/**
 * 分卷
 * @public
 */
export class Volume extends DataBase implements VolumeConstructor {
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

  /**
   * Volume constructor
   * @param meta
   * @param args
   * @param initHooks
   */
  public constructor(meta: VolumeMeta, args: VolumeConstructor, initHooks: VolumeInitHook[] = []) {
    super(meta);
    Object.assign(this, args);
    this.init(args, initHooks);
  }

  /**
   * Volume 自定义初始化函数
   * @override
   */
  protected override init(args: VolumeConstructor, initHooks: VolumeInitHook[]): void {
    super.init();
    const task = initHooks.map((initHook) => initHook(args, this));
    Promise.allSettled(task);
  }

  /** 状态保存 */
  public override toJSON<VolumeResumeStatus>(): VolumeResumeStatus {
    return {
      volumeID: this.volumeID,
      volumeName: this.volumeName,
      introduction: this.introduction,
      tags: this.tags,
      ids: this.ids,
      order: this.order,
      createdTime: this.createdTime?.toISOString() ?? null,
      lastUpdateTime: this.lastUpdateTime?.toISOString() ?? null,
      ...super.toJSON(),
    } as VolumeResumeStatus;
  }

  static resume(
    meta: VolumeMeta,
    resumeStatus: VolumeResumeStatus,
    initHooks: VolumeInitHook[] = [],
  ) {
    return resumeFactory(meta, resumeStatus, initHooks, this);
  }
}
