export enum Status {
  pending,
  downloading,
  failed,
  finished,
  aborted,
  saved,
}

export enum ReferrerMode {
  keep, // 不做修改
  none, // 不发送 Referer
  self, // 图片自身URL
  custom,
}

export class ExpectError extends Error {}
