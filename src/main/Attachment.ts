import { GfetchRequestInit, gfetch } from "../lib/http";
import { sleep } from "../lib/misc";
import { log } from "../log";
import { retryLimit } from "../setting";
import { ReferrerMode, Status } from "./main";

export class AttachmentClass {
  public url: string;
  public name: string;
  public mode: "naive" | "TM";
  public referrerMode: ReferrerMode;
  public customReferer: string;

  public status: Status = Status.pending;
  public retryTime = 0;
  private defaultHeader: Record<string, string> = {
    Referer: document.location.origin,
  };

  public imageBlob!: Blob | null | void;
  public comments!: string;

  public constructor(
    url: string,
    name: string,
    mode: "naive" | "TM",
    referrerMode: ReferrerMode = ReferrerMode.keep,
    customReferer = ""
  ) {
    this.url = url;
    this.name = name;
    this.mode = mode;
    this.referrerMode = referrerMode;
    this.customReferer = customReferer;
  }

  public async init() {
    if (this.mode === "naive") {
      this.imageBlob = await this.downloadImage();
    } else {
      this.imageBlob = await this.tmDownloadImage();
    }
    if (this.imageBlob) {
      log.info(`[attachment] ${this.url} 下载完成。`);
    }
    return this.imageBlob;
  }

  private downloadImage(): Promise<Blob | null> {
    this.status = Status.downloading;
    const init = {
      headers: this.defaultHeader,
    } as RequestInit;
    if (this.referrerMode === ReferrerMode.none) {
      init.headers = {};
      init.referrerPolicy = "no-referrer";
    }
    return fetch(this.url, init)
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
          return this.downloadImage();
        } else {
          this.status = Status.failed;
          log.error(err);
          log.trace(err);
          return null;
        }
      });
  }

  private tmDownloadImage(): Promise<Blob | null> {
    this.status = Status.downloading;
    let headers = this.defaultHeader;
    if (this.referrerMode === ReferrerMode.none) {
      headers = {};
    }
    if (this.referrerMode === ReferrerMode.self) {
      const imgOrigin = new URL(this.url).origin;
      headers["Referer"] = imgOrigin;
    }
    if (
      this.referrerMode === ReferrerMode.custom &&
      this.customReferer.startsWith("http")
    ) {
      headers["Referer"] = this.customReferer;
    }
    const init = {
      headers: this.defaultHeader,
      responseType: "blob",
    } as GfetchRequestInit;
    return gfetch(this.url, init)
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
          return this.tmDownloadImage();
        } else {
          this.status = Status.failed;
          log.error(err);
          log.trace(err);
          return null;
        }
      });
  }

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
