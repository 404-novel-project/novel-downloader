import { GmWindow, UnsafeWindow } from "./global";
import { clearAttachmentClassCache } from "./lib/attachments";
import { concurrencyRun, saveToArchiveOrg, sleep } from "./lib/misc";
import { log, saveLogTextToFile } from "./log";
import { ExpectError, Status } from "./main/main";
import { AttachmentClass } from "./main/Attachment";
import { Chapter, ChapterAdditionalMetadate } from "./main/Chapter";
import { Book, saveType } from "./main/Book";
import { SaveBook } from "./save/save";
import { SaveOptions, saveOptionsValidate } from "./save/options";
import {
  enableCustomChapterFilter,
  enableCustomFinishCallback,
  enableCustomSaveOptions,
  enableSaveToArchiveOrg,
  getCustomEnableSaveToArchiveOrg,
} from "./setting";
import { failedPlus, printStat, successPlus } from "./stat";
import { ProgressVM, vm as progress } from "./ui/progress";
import { setStreamSaverSetting } from "./lib/zip";

interface BcMessage {
  type: "ping" | "pong" | "close";
  src?: string;
  workerId: string;
  url: string;
}

export interface ChapterParseObject {
  chapterName: string | null;

  contentRaw: HTMLElement | null;
  contentText: string | null;
  contentHTML: HTMLElement | null;
  contentImages: AttachmentClass[] | null;
  additionalMetadate: ChapterAdditionalMetadate | null;
}

export abstract class BaseRuleClass {
  public attachmentMode: "naive" | "TM" = "TM";
  public charset: string = document.characterSet;
  public concurrencyLimit = 10;
  public streamZip = false;
  public needLogin = false;
  public nsfw = false;
  public maxRunLimit?: number;
  public saveOptions?: SaveOptions;
  public book?: Book;
  protected saveType?: saveType;
  private bcWorker: BroadcastChannel = new BroadcastChannel(
    "novel-downloader-worker"
  );
  private bcWorkerMessages: BcMessage[] = [];
  private audio?: HTMLAudioElement;

  protected constructor() {
    const broadcastChannelWorker = this.bcWorker;
    const messages = this.bcWorkerMessages;
    broadcastChannelWorker.onmessage = (ev) => {
      const message = ev.data as BcMessage;

      if (message.type === "ping") {
        const pong: BcMessage = {
          type: "pong",
          src: message.workerId,
          workerId: (window as GmWindow).workerId,
          url: document.location.href,
        };
        broadcastChannelWorker.postMessage(pong);
      }
      if (message.type === "pong") {
        messages.push(message);
      }
      if (message.type === "close") {
        log.debug(`${(window as GmWindow).workerId} has closed!`);
      }
    };
  }

  public abstract bookParse(): Promise<Book>;

  public abstract chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: object
  ): Promise<ChapterParseObject>;

  public async run(): Promise<Book | undefined> {
    log.info(`[run]下载开始`);
    const self = this;

    try {
      await self.preHook();
      await initBook();
      const saveBookObj = initSave(self.book as Book);
      await saveHook();
      await self.initChapters(self.book as Book, saveBookObj).catch((error) => {
        if (error instanceof ExpectError) {
          console.warn(error);
        } else {
          throw error;
        }
      });
      await save(saveBookObj);
      self.postHook();
      return self.book;
    } catch (error) {
      self.catchError(error as Error);
    }

    async function initBook(): Promise<void> {
      if (
        (window as GmWindow)._book &&
        (window as GmWindow)._url === document.location.href
      ) {
        self.book = (window as GmWindow)._book;
      } else {
        self.book = await self.bookParse();
        (window as GmWindow)._book = self.book;
        (window as GmWindow)._url = document.location.href;
      }
      log.debug("[book]Book object:\n" + JSON.stringify(self.book));
    }

    function initSave(book: Book): SaveBook {
      log.debug("[run]保存数据");
      if (
        enableCustomSaveOptions &&
        typeof (unsafeWindow as UnsafeWindow).saveOptions === "object" &&
        saveOptionsValidate((unsafeWindow as UnsafeWindow).saveOptions)
      ) {
        const saveOptions = (unsafeWindow as UnsafeWindow).saveOptions;
        if (saveOptions) {
          log.info("[run]发现自定义保存参数，内容如下\n", saveOptions);
          return new SaveBook(book, self.streamZip, saveOptions);
        }
      }
      return new SaveBook(book, self.streamZip);
    }

    async function saveHook() {
      if (
        enableSaveToArchiveOrg &&
        !self.needLogin &&
        self.book?.bookUrl &&
        (window as GmWindow).localStorageExpired.get(
          `${self.book.bookUrl}_saveToArchiveOrg`
        ) === undefined &&
        (await getCustomEnableSaveToArchiveOrg())
      ) {
        console.log("[saveToArchiveOrg]保存当前书页至 archive.org");
        try {
          (window as GmWindow).localStorageExpired.set(
            `${self.book.bookUrl}_saveToArchiveOrg`,
            true,
            86400
          );
        } catch (error) {
          // pass
        }
        saveToArchiveOrg(self.book.bookUrl).then((r) => log.info(r));
        if (self.book.ToCUrl) {
          saveToArchiveOrg(self.book.ToCUrl).then((r) => log.info(r));
        }
      }
    }

    async function save(saveObj: SaveBook): Promise<void> {
      log.debug("[run]开始保存文件");
      await saveObj.save();
    }
  }

  protected async preHook(): Promise<void> {
    const self = this;
    if (!(await preTest())) {
      const alertText = `当前网站目前最多允许${self.maxRunLimit}个下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
      alert(alertText);
      log.info(`[run]${alertText}`);
      throw new ExpectError(alertText);
    }
    // await setStreamSaverSetting();

    self.audio = new Audio(
      "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjcxLjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhoaGvr6+vr6+8vLy8vLzKysrKysrX19fX19fX5eXl5eXl8vLy8vLy////////AAAAAExhdmM1Ny44OQAAAAAAAAAAAAAAACQCgAAAAAAAAAVY82AhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAALACwAAP/AADwQKVE9YWDGPkQWpT66yk4+zIiYPoTUaT3tnU487uNhOvEmQDaCm1Yz1c6DPjbs6zdZVBk0pdGpMzxF/+MYxA8L0DU0AP+0ANkwmYaAMkOKDDjmYoMtwNMyDxMzDHE/MEsLow9AtDnBlQgDhTx+Eye0GgMHoCyDC8gUswJcMVMABBGj/+MYxBoK4DVpQP8iAtVmDk7LPgi8wvDzI4/MWAwK1T7rxOQwtsItMMQBazAowc4wZMC5MF4AeQAGDpruNuMEzyfjLBJhACU+/+MYxCkJ4DVcAP8MAO9J9THVg6oxRMGNMIqCCTAEwzwwBkINOPAs/iwjgBnMepYyId0PhWo+80PXMVsBFzD/AiwwfcKGMEJB/+MYxDwKKDVkAP8eAF8wMwIxMlpU/OaDPLpNKkEw4dRoBh6qP2FC8jCJQFcweQIPMHOBtTBoAVcwOoCNMYDI0u0Dd8ANTIsy/+MYxE4KUDVsAP8eAFBVpgVVPjdGeTEWQr0wdcDtMCeBgDBkgRgwFYB7Pv/zqx0yQQMCCgKNgonHKj6RRVkxM0GwML0AhDAN/+MYxF8KCDVwAP8MAIHZMDDA3DArAQo3K+TF5WOBDQw0lgcKQUJxhT5sxRcwQQI+EIPWMA7AVBoTABgTgzfBN+ajn3c0lZMe/+MYxHEJyDV0AP7MAA4eEwsqP/PDmzC/gNcwXUGaMBVBIwMEsmB6gaxhVuGkpoqMZMQjooTBwM0+S8FTMC0BcjBTgPwwOQDm/+MYxIQKKDV4AP8WADAzAKQwI4CGPhWOEwCFAiBAYQnQMT+uwXUeGzjBWQVkwTcENMBzA2zAGgFEJfSPkPSZzPXgqFy2h0xB/+MYxJYJCDV8AP7WAE0+7kK7MQrATDAvQRIwOADKMBuA9TAYQNM3AiOSPjGxowgHMKFGcBNMQU1FMy45OS41VVU/31eYM4sK/+MYxKwJaDV8AP7SAI4y1Yq0MmOIADGwBZwwlgIJMztCM0qU5TQPG/MSkn8yEROzCdAxECVMQU1FMy45OS41VTe7Ohk+Pqcx/+MYxMEJMDWAAP6MADVLDFUx+4J6Mq7NsjN2zXo8V5fjVJCXNOhwM0vTCDAxFpMYYQU+RlVMQU1FMy45OS41VVVVVVVVVVVV/+MYxNcJADWAAP7EAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOsJwDWEAP7SAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPMLoDV8AP+eAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPQL0DVcAP+0AFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
    );
    self.audio.loop = true;
    await self.audio.play();

    window.onbeforeunload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      const confirmationText =
        "您正尝试离开本页面，当前页面有下载任务正在运行，是否确认离开？";
      return (e.returnValue = confirmationText);
    };
    (window as GmWindow).downloading = true;

    async function preTest(): Promise<boolean> {
      const broadcastChannelWorker = self.bcWorker;
      const messages = self.bcWorkerMessages;
      const ping: BcMessage = {
        type: "ping",
        workerId: (window as GmWindow).workerId,
        url: document.location.href,
      };
      broadcastChannelWorker.postMessage(ping);
      await sleep(300);
      const workers = messages
        .filter(
          (m) =>
            m.type === "pong" &&
            m.src === (window as GmWindow).workerId &&
            m.workerId !== (window as GmWindow).workerId
        )
        .map((m) => ({
          id: m.workerId,
          url: m.url,
        }));
      log.info(JSON.stringify(workers, undefined, 4));
      const nowRunning = workers.length;
      log.info(`[preTest]nowRunning: ${nowRunning}`);

      if (self.maxRunLimit) {
        return nowRunning < self.maxRunLimit;
      } else {
        return true;
      }
    }
  }

  protected async initChapters(
    book: Book,
    saveBookObj: SaveBook
  ): Promise<Chapter[]> {
    const self = this;
    log.info(`[initChapters]开始初始化章节`);
    Object.entries(self).forEach((kv) =>
      log.info(`[initChapters] ${kv[0]}: ${kv[1]}`)
    );
    const chapters = getChapters(book);
    if (chapters.length === 0) {
      log.error(`[initChapters]初始化章节出错，未找到需初始化章节`);
      return [];
    }
    (progress as ProgressVM).totalChapterNumber = chapters.length;

    if (self.concurrencyLimit === 1) {
      for (const chapter of chapters) {
        if ((window as GmWindow).failedCount > 10) {
          if (!(window as GmWindow).stopFlag.aborted) {
            (window as GmWindow).stopController.abort();
            console.error(
              "连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/404-novel-project/novel-downloader"
            );
            alert(
              "连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/404-novel-project/novel-downloader"
            );
            saveLogTextToFile();
          }
        }
        if ((window as GmWindow).stopFlag.aborted) {
          throw new ExpectError("[chapter]收到停止信号，停止继续下载。");
        }
        try {
          let chapterObj = await chapter.init();
          chapterObj = await postChapterParseHook(chapterObj, saveBookObj);
        } catch (error) {
          log.error(error);
          log.trace(error);
        }
      }
    } else {
      const asyncHandle = async (curChapter: Chapter) => {
        if ((window as GmWindow).failedCount > 10) {
          if (!(window as GmWindow).stopFlag.aborted) {
            (window as GmWindow).stopController.abort();
            console.error(
              "连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/404-novel-project/novel-downloader"
            );
            alert(
              "连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/404-novel-project/novel-downloader"
            );
            saveLogTextToFile();
          }
        }
        if (curChapter === undefined) {
          return null;
        }
        try {
          let chapterObj = await curChapter.init();
          chapterObj = await postChapterParseHook(chapterObj, saveBookObj);
          return chapterObj;
        } catch (error) {
          log.error(error);
          log.trace(error);
        }
      };
      await concurrencyRun(chapters, self.concurrencyLimit, asyncHandle, {
        signal: (window as GmWindow).stopFlag,
        reason: "[chapter]收到停止信号，停止继续下载。",
      });
    }
    log.info(`[initChapters]章节初始化完毕`);
    return chapters;

    function getChapters(_book: Book): Chapter[] {
      function isEnable(): boolean {
        if (
          enableCustomChapterFilter &&
          typeof (unsafeWindow as UnsafeWindow).chapterFilter === "function"
        ) {
          let text =
            "[initChapters]发现自定义筛选函数，自定义筛选函数内容如下：\n";
          text += (unsafeWindow as UnsafeWindow).chapterFilter?.toString();
          log.info(text);
          return true;
        } else {
          return false;
        }
      }

      function _filter(chapter: Chapter): boolean {
        let b = true;
        try {
          const u = (unsafeWindow as UnsafeWindow).chapterFilter?.(chapter);
          if (typeof u === "boolean") {
            b = u;
          }
        } catch (error) {
          log.error("运行自定义筛选函数时出错。", error);
          log.trace(error);
        }
        return b;
      }

      let _chapters = _book.chapters.filter(
        (chapter) => chapter.status === Status.pending
      );
      const enabled = isEnable();
      if (enabled) {
        log.debug("[initChapters]筛选需下载章节");
        _chapters = _chapters.filter((chapter) => _filter(chapter));
      }
      return _chapters;
    }

    async function postChapterParseHook(
      chapter: Chapter,
      saveObj: SaveBook
    ): Promise<Chapter> {
      if (chapter.contentHTML !== undefined) {
        await saveObj.addChapter(chapter);
        (progress as ProgressVM).finishedChapterNumber++;
      }
      return chapter;
    }
  }

  protected postHook(): void {
    const self = this;

    clearAttachmentClassCache();

    self.audio?.pause();
    self.audio?.remove();

    const closeMessage: BcMessage = {
      type: "close",
      workerId: (window as GmWindow).workerId,
      url: document.location.href,
    };
    self.bcWorker.postMessage(closeMessage);
    self.bcWorker.onmessage = null;
    self.bcWorker.close();
    self.bcWorkerMessages.splice(0, self.bcWorkerMessages.length);

    window.onbeforeunload = null;
    (window as GmWindow).downloading = false;

    (progress as ProgressVM).reset();

    (window as GmWindow)._book = undefined;
    (window as GmWindow)._url = undefined;

    postCallback();
    successPlus().then(() => {
      // noinspection JSIgnoredPromiseFromCall
      printStat();
    });

    function postCallback(): void {
      if (
        enableCustomFinishCallback &&
        typeof (unsafeWindow as UnsafeWindow).customFinishCallback ===
          "function"
      ) {
        const customFinishCallback = (unsafeWindow as UnsafeWindow)
          .customFinishCallback;
        if (customFinishCallback) {
          log.info(
            `发现自定义结束回调函数，内容如下：\n${customFinishCallback.toString()}`
          );
          customFinishCallback();
        }
      }
    }
  }

  protected catchError(error: Error): void {
    const self = this;
    log.error(error);
    log.trace(error);

    self.postHook();

    if (!(error instanceof ExpectError)) {
      document.getElementById("button-div")?.remove();
      log.error(
        "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/404-novel-project/novel-downloader"
      );

      // noinspection JSIgnoredPromiseFromCall
      failedPlus();
      alert(
        "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/404-novel-project/novel-downloader"
      );
      window.open(
        "https://github.com/404-novel-project/novel-downloader/issues"
      );
      saveLogTextToFile();
    }
  }
}
