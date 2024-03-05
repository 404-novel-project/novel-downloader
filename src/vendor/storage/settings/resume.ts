// SPDX-License-Identifier: AGPL-3.0-or-later

import { Book as BookMeta } from "backgroud/models/meta/book";

import { storage } from "../storage";

import type { ResumeStatus as DataResumeStatus, DataBase } from "backgroud/models/data/base";
import type { ResumeStatus as MetaResumeStatus, MetaBase } from "backgroud/models/meta/base";
import type { ResumeStatus as RuleResumeStatus, InitArgsType } from "backgroud/models/rule";

export type ResumeStorage = Record<string, ResumeStorageValue>;

interface ResumeStorageValue {
  tabID?: number;
  url: string;
  rule: RuleResumeStatus;
  book: MetaResumeStatus<InitArgsType>;
  data: Record<string, DataResumeStatus>;
  meta: Record<string, MetaResumeStatus<InitArgsType>>;
}

const resumeStatusTaskIdMap = new Map<string, ResumeStorageValue>();
/**
 * 从 extension storage 获取保存状态
 * @public
 */
export async function getResumeByTaskID(taskid: string) {
  const _r = resumeStatusTaskIdMap.get(taskid);
  if (_r) {
    return _r;
  }

  const r = await storage.local.resume[taskid];
  if (!r) {
    throw TypeError("Not Found Resume Status from local storage!");
  }
  resumeStatusTaskIdMap.set(taskid, r);
  return r;
}

/**
 * 从 extension storage 获取保存状态
 * @public
 */
export async function getDataByID(taskid: string, dataID: string) {
  const { data } = await getResumeByTaskID(taskid);
  const d = data[dataID];
  if (!d) {
    throw TypeError("Not Found DataResumeStatus Object!");
  }
  return d;
}

/**
 * 从 extension storage 获取保存状态
 * @public
 */
export async function getMetaByID(taskid: string, metaID: string) {
  const { meta } = await getResumeByTaskID(taskid);
  const m = meta[metaID];
  if (!m) {
    throw TypeError("Not Found MetaResumeStatus Object!");
  }
  return m;
}

function saveResume(taskid: string, obj: ResumeStorageValue) {
  storage.local.resume[taskid] = obj;
}

async function getResumeStorage(taskid: string) {
  let resumeStorage: ResumeStorageValue;
  try {
    resumeStorage = await getResumeByTaskID(taskid);
  } catch (error) {
    resumeStorage = {
      tabID: 0,
      url: "",
      // @ts-expect-error missing the following properties
      rule: {},
      // @ts-expect-error missing the following properties
      book: {},
      data: {},
      meta: {},
    };
  }
  return resumeStorage;
}

/**
 * 保存 Meta 对象状态至 extension storage
 * @internal
 */
export async function saveMeta(meta: MetaBase) {
  const taskid = meta.taskID;
  const metaid = meta.ID;

  const resumeStorage = await getResumeStorage(taskid);
  if (meta instanceof BookMeta) {
    resumeStorage.tabID = meta.tabID;
    resumeStorage.url = meta.url;
    resumeStorage.rule = meta.rule.toJSON();
    resumeStorage.book = meta.toJSON();
  }
  resumeStorage.meta[metaid] = meta.toJSON();
  saveResume(taskid, resumeStorage);
}

/**
 * 保存 Data 对象状态至 extension storage
 * @internal
 */
export async function saveData(data: DataBase) {
  const taskid = data.taskID;
  const dataid = data.ID;

  if (!taskid) {
    throw TypeError("saveData Error: Not Found taskID");
  }

  const resumeStorage = await getResumeStorage(taskid);
  resumeStorage.data[dataid] = await data.toJSON();
  saveResume(taskid, resumeStorage);
}

/**
 * 移除 extension storage 保存的状态
 * @public
 */
export async function deleteResumeStorage(taskid: string) {
  try {
    await getResumeByTaskID(taskid);
    delete storage.local.resume[taskid];
    resumeStatusTaskIdMap.delete(taskid);
  } catch (error) {
    // pass
  }
}
