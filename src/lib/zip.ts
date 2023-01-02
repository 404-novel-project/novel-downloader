import { AsyncZipDeflate, Zip, ZipPassThrough } from "fflate";
import { saveAs } from "file-saver";
import streamSaver from "streamsaver";
import { mitmPageAvailability, streamSupport } from "../detect";
import { log } from "../log";
import { extensionToMimetype, mimetyepToCompressible, sleep } from "./misc";

export async function setStreamSaverSetting() {
  const rawMitm = new URL(streamSaver.mitm);
  const mitm = new URL("https://cors.bgme.bid/");
  mitm.pathname = rawMitm.origin + rawMitm.pathname;
  streamSaver.mitm = mitm.href;
  streamSaver.supported =
    streamSupport() && (await mitmPageAvailability(mitm.href));
}

export class FflateZip {
  public filename: string;
  public stream: boolean;

  private zcount = 0;
  private count = 0;
  private filenameList: string[] = [];
  private zipOut: Blob = new Blob([], { type: "application/zip" });
  private savedZip: Zip;

  public constructor(
    filename: string,
    stream: boolean,
    mimetype = "application/zip"
  ) {
    log.info(
      `[fflateZip] filename: ${filename}, stream: ${stream}, streamSaver.supported: ${streamSaver.supported}`
    );
    const self = this;

    this.filename = filename;
    this.stream = false;
    // if (streamSaver.supported) {
    //   this.stream = stream;
    // } else {
    //   this.stream = false;
    // }

    let writer: WritableStreamDefaultWriter<Uint8Array>;
    if (this.stream) {
      const fileStream = streamSaver.createWriteStream(self.filename);
      writer =
        fileStream.getWriter() as WritableStreamDefaultWriter<Uint8Array>;
    }

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
        self.zipOut = new Blob([self.zipOut, dat], { type: mimetype });
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

  public async file(filename: string, fileBlob: Blob, nocompress = false) {
    if (this.filenameList.includes(filename)) {
      log.warn(`filename ${filename} has existed on zip.`);
      return;
    }
    this.filenameList.push(filename);
    this.count++;

    const buffer = await fileBlob.arrayBuffer();
    const chunk = new Uint8Array(buffer);
    if (
      !(
        mimetyepToCompressible(
          extensionToMimetype(filename.split(".").slice(-1)[0])
        ) || mimetyepToCompressible(fileBlob.type)
      ) ||
      nocompress
    ) {
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
