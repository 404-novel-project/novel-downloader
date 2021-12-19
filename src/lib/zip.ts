import { AsyncZipDeflate, Zip, ZipPassThrough } from "fflate";
import { log } from "../log";
import { sleep } from "./misc";

export class FflateZip {
  private zcount: number;
  private count: number;
  private filenameList: string[];
  private zipOut: ArrayBuffer[];
  private savedZip: Zip;
  public onFinal?: (zipBlob: Blob) => void;
  public onFinalError?: (error: Error) => void;

  public constructor() {
    const self = this;
    this.zcount = 0;
    this.count = 0;
    this.filenameList = [];
    this.zipOut = [];
    this.savedZip = new Zip((err, dat, final) => {
      if (err) {
        log.error(err);
        log.trace(err);
        throw err;
      }

      self.zipOut.push(dat);

      if (final) {
        const zipBlob = new Blob(self.zipOut, { type: "application/zip" });
        log.info("[fflateZip] ZIP生成完毕，文件大小：" + zipBlob.size);
        self.zipOut = [];
        if (
          typeof self.onFinal === "function" &&
          typeof self.onFinalError === "function"
        ) {
          try {
            self.onFinal(zipBlob);
          } catch (error) {
            self.onFinalError(error as Error);
          }
        } else {
          throw new Error("[fflateZip] 未发现保存函数");
        }
      }
    });
  }

  public async file(filename: string, fileBlob: Blob) {
    if (this.filenameList.includes(filename)) {
      log.warn(`filename ${filename} has existed on zip.`);
      return;
    }
    this.filenameList.push(filename);
    this.count++;

    const buffer = await fileBlob.arrayBuffer();
    const chunk = new Uint8Array(buffer);
    if (fileBlob.type.includes("image/")) {
      const nonStreamingFile = new ZipPassThrough(filename);
      this.savedZip.add(nonStreamingFile);
      nonStreamingFile.push(chunk, true);
      this.zcount++;
    } else {
      const nonStreamingFile = new AsyncZipDeflate(filename, {
        level: 9,
      });
      this.savedZip.add(nonStreamingFile);
      nonStreamingFile.push(chunk, true);
      this.zcount++;
    }
  }

  public async generateAsync() {
    while (this.count !== this.zcount) {
      await sleep(100);
    }
    this.savedZip.end();
  }
}
