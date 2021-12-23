import { AsyncZipDeflate, Zip, ZipPassThrough } from "fflate";
import { saveAs } from "file-saver";
import streamSaver from "streamsaver";
import { log } from "../log";
import { sleep } from "./misc";

const rawMitm = new URL(streamSaver.mitm);
const mitm = new URL("https://cors.bgme.me/");
mitm.pathname = rawMitm.origin + rawMitm.pathname;
streamSaver.mitm = mitm.href;

export function streamSupport() {
  return (
    typeof ReadableStream !== "undefined" &&
    typeof WritableStream !== "undefined" &&
    typeof TransformStream !== "undefined"
  );
}
streamSaver.supported = streamSupport();
export class FflateZip {
  public filename: string;
  public stream: boolean;
  private zcount: number;
  private count: number;
  private filenameList: string[];
  private zipOut: Blob;
  private savedZip: Zip;
  public onFinal?: (zipBlob: Blob) => void;
  public onFinalError?: (error: Error) => void;

  public constructor(filename: string, stream: boolean) {
    log.info(
      `[fflateZip] filename: ${filename}, stream: ${stream}, streamSaver.supported: ${streamSaver.supported}`
    );
    const self = this;

    this.filename = filename;
    if (streamSaver.supported) {
      this.stream = stream;
    } else {
      this.stream = false;
    }

    let writer: WritableStreamDefaultWriter<Uint8Array>;
    if (this.stream) {
      const fileStream = streamSaver.createWriteStream(self.filename);
      writer =
        fileStream.getWriter() as WritableStreamDefaultWriter<Uint8Array>;
    }

    this.zcount = 0;
    this.count = 0;
    this.filenameList = [];
    this.zipOut = new Blob([], { type: "application/zip" });

    this.savedZip = new Zip((err, dat, final) => {
      if (err) {
        log.error(err);
        log.trace(err);
        if (self.stream) {
          writer.abort();
        }
        throw err;
      }

      if (self.stream) {
        writer.write(dat);
      } else {
        self.zipOut = new Blob([self.zipOut, dat], { type: "application/zip" });
      }

      if (final) {
        if (self.stream) {
          writer.close();
          log.info("[fflateZip] ZIP生成完毕");
        } else {
          nonStream();
        }
      }
      function nonStream() {
        log.info("[fflateZip] ZIP生成完毕，文件大小：" + self.zipOut.size);
        try {
          saveAs(self.zipOut, self.filename);
          self.zipOut = new Blob([], { type: "application/zip" });
        } catch (error) {
          log.error("[fflateZip]" + error);
          log.trace(error);
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
