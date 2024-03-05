// SPDX-License-Identifier: AGPL-3.0-or-later

export interface RateLimitConstructor {
  limit: number;
  interval: number;
}

/**
 * 频率限制
 *
 * @public
 */
export class RateLimit {
  /** 计数器 */
  private count = 0;
  /** 时间窗口开始时间 */
  private refreshTime = this.getNow();
  /** 单位时间窗口最大请求频次 */
  private limit: number;
  /**
   * 单位时间窗口长度
   *
   * 单位毫秒（ms）
   */
  private interval: number;

  public constructor({ limit, interval }: RateLimitConstructor) {
    this.limit = limit;
    this.interval = interval;
  }

  public rateLimit(): boolean {
    if (this.getNow() < this.refreshTime + this.interval) {
      this.count = this.count + 1;
      return this.count < this.limit;
    } else {
      this.refreshTime = this.getNow();
      this.count = 0;
      return true;
    }
  }

  private getNow() {
    return new Date().getTime();
  }
}
