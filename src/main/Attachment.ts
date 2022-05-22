import { gfetch, GfetchRequestInit } from "../lib/http";
import { deepcopy, sleep } from "../lib/misc";
import { log } from "../log";
import { retryLimit } from "../setting";
import { ReferrerMode, Status } from "./main";

export class AttachmentClass {
  public readonly url: string;
  public name: string;
  public readonly mode: "naive" | "TM";

  public status: Status = Status.pending;
  public retryTime = 0;

  public Blob!: Blob | null | void;
  public comments?: string;

  private referrerMode: ReferrerMode;
  private _init: RequestInit;
  private _TMinit: GfetchRequestInit;

  public constructor(
    url: string,
    name: string,
    mode: "naive" | "TM",
    referrerMode: ReferrerMode = ReferrerMode.keep,
    customReferer = "",
    init?: {
      init: RequestInit;
      TMinit: GfetchRequestInit;
    }
  ) {
    this.url = url;
    this.name = name;
    this.mode = mode;
    this.referrerMode = referrerMode;

    const defaultInit: {
      init: RequestInit;
      TMinit: GfetchRequestInit;
    } = {
      init: {
        referrerPolicy: "strict-origin-when-cross-origin",
      },
      TMinit: {
        headers: { Referer: document.location.origin },
        responseType: "blob",
      },
    };
    if (!init) {
      ({ init: this._init, TMinit: this._TMinit } = defaultInit);
      if (this.referrerMode === ReferrerMode.none) {
        this._init.referrerPolicy = "no-referrer";
        this._TMinit.headers = {};
      }
      if (this.referrerMode === ReferrerMode.self) {
        this._TMinit.headers = { Referer: new URL(url).origin };
      }
      if (
        this.referrerMode === ReferrerMode.custom &&
        customReferer.startsWith("http")
      ) {
        this._TMinit.headers = { Referer: customReferer };
      }
    } else {
      ({ init: this._init, TMinit: this._TMinit } = deepcopy(init));
      this._TMinit.responseType = "blob";
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (this._init.responseType) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete this._init.responseType;
      }
    }
  }

  public async init() {
    if (this.mode === "naive") {
      this.Blob = await this.download();
    } else {
      this.Blob = await this.tmDownload();
    }
    if (this.Blob) {
      log.info(`[attachment] ${this.url} 下载完成。`);
    }
    return this.Blob;
  }

  private download(): Promise<Blob | null> {
    this.status = Status.downloading;

    return fetch(this.url, this._init)
      .then((response: Response) => {
        if (response.ok) {
          this.status = Status.finished;
          return response.blob();
        } else {
          if (response.status === 404) {
            this.status = Status.failed;
          }
          throw new Error(
            `Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`
          );
        }
      })
      .catch(async (err: Error) => {
        this.retryTime++;
        log.error(
          `[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1500);
          return this.download();
        } else {
          this.status = Status.failed;
          log.error(err);
          log.trace(err);
          return null;
        }
      });
  }

  private tmDownload(): Promise<Blob | null> {
    this.status = Status.downloading;

    return gfetch(this.url, this._TMinit)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          this.status = Status.finished;
          return response.response as Blob;
        } else {
          if (response.status === 404) {
            this.status = Status.failed;
          }
          throw new Error(
            `Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`
          );
        }
      })
      .catch(async (err: Error) => {
        this.retryTime++;
        log.error(
          `[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`
        );

        if (this.status !== Status.failed && this.retryTime < retryLimit) {
          await sleep(this.retryTime * 1000);
          return this.tmDownload();
        } else {
          this.status = Status.failed;
          log.error(err);
          log.trace(err);
          return null;
        }
      });
  }

  // noinspection JSUnusedLocalSymbols
  private toJSON() {
    return {
      url: this.url,
      name: this.name,
      mode: this.mode,
      status: this.status,
      retryTime: this.retryTime,
    };
  }
}
