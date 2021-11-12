import { log } from "../log";
import { Zip, ZipPassThrough, ZipDeflate, AsyncZipDeflate } from "fflate";
import { sleep } from "./misc";

export class fflateZip {
  private zcount: number;
  private count: number;
  private tcount: number;
  private filenameList: string[];
  private savedZip: Zip;
  private zipOut: ArrayBuffer[];
  private onUpdateId?: number;
  public memlimit: boolean;
  public onFinal?: (zipBlob: Blob) => any;
  public onFinalError?: (error: Error) => any;

  public constructor(memlimit: boolean = false) {
    this.count = 0;
    this.zcount = 0;
    this.tcount = 0;
    this.memlimit = memlimit;
    this.filenameList = [];
    this.zipOut = [];

    const self = this;
    this.savedZip = new Zip((err, dat, final) => {
      if (err) {
        log.error(err);
        log.trace(err);
        throw err;
      }

      self.zipOut.push(dat);
      self.zcount++;

      if (final) {
        const zipBlob = new Blob(self.zipOut, { type: "application/zip" });
        log.debug("[fflateZip][debug][zcount]" + self.zcount);
        log.debug("[fflateZip][debug][count]" + self.count);
        log.info("[fflateZip] ZIP生成完毕，文件大小：" + zipBlob.size);
        self.zipOut = [];

        if (typeof self.onFinal === "function") {
          if (typeof self.onUpdateId !== "undefined") {
            clearInterval(self.onUpdateId);
          }

          try {
            self.onFinal(zipBlob);
          } catch (error) {
            if (typeof self.onFinalError === "function") {
              self.onFinalError(error as Error);
            }
          }
        } else {
          throw "[fflateZip] 完成函数出错";
        }
      }
    });
  }

  public file(filename: string, file: Blob) {
    if (this.filenameList.includes(filename)) {
      log.error(`filename ${filename} has existed on zip.`);
      return;
    }
    this.count++;
    this.filenameList.push(filename);

    file
      .arrayBuffer()
      .then((buffer) => new Uint8Array(buffer))
      .then((chunk) => {
        if (this.memlimit || file.type.includes("image/")) {
          const nonStreamingFile = new ZipPassThrough(filename);
          this.addToSavedZip(this.savedZip, nonStreamingFile, chunk);
          this.tcount++;
        } else {
          const nonStreamingFile = new AsyncZipDeflate(filename, {
            level: 6,
          });
          this.addToSavedZip(this.savedZip, nonStreamingFile, chunk);
          this.tcount++;
        }
      })
      .catch((error) => log.error(error));
  }

  private addToSavedZip(
    savedZip: Zip,
    nonStreamingFile: ZipDeflate | AsyncZipDeflate | ZipPassThrough,
    chunk: Uint8Array
  ) {
    savedZip.add(nonStreamingFile);
    nonStreamingFile.push(chunk, true);
  }

  public async generateAsync(
    onUpdate: ((percent: number) => any) | undefined = undefined
  ): Promise<void> {
    while (this.tcount !== this.count) {
      await sleep(500);
    }

    const self = this;
    this.onUpdateId = window.setInterval(() => {
      const percent = (self.zcount / 3 / self.count) * 100;
      if (typeof onUpdate === "function") {
        onUpdate(percent);
      }
    }, 100);

    this.savedZip.end();
  }
}
