import {
  getSaveBookObj,
  saveBook,
  saveOptions,
  saveOptionsValidate,
} from "./save";
import {
  attachmentClass,
  ChapterAdditionalMetadate,
  Book,
  Status,
  Chapter,
  ExpectError,
} from "./main";
import { log, saveLogTextToFile } from "./log";
import {
  enableCustomChapterFilter,
  enableCustomFinishCallback,
  enableCustomSaveOptions,
} from "./setting";
import { concurrencyRun, storageAvailable } from "./lib/misc";
import { newUnsafeWindow, newWindow } from "./global";
import { clearAttachmentClassCache } from "./lib/attachments";
import { successPlus, failedPlus, printStat } from "./stat";
export interface chapterParseObject {
  chapterName: string | null;

  contentRaw: HTMLElement | null;
  contentText: string | null;
  contentHTML: HTMLElement | null;
  contentImages: attachmentClass[] | null;
  additionalMetadate: ChapterAdditionalMetadate | null;
}

export abstract class BaseRuleClass {
  public imageMode: "naive" | "TM";
  public charset: string;
  public concurrencyLimit: number;
  public maxRunLimit?: number;
  public saveOptions?: saveOptions;

  private audio?: HTMLAudioElement;
  public book?: Book;

  public constructor() {
    this.imageMode = "TM";
    this.charset = document.charset;
    this.concurrencyLimit = 10;
  }

  public abstract bookParse(): Promise<Book>;

  public abstract chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: object
  ): Promise<chapterParseObject>;

  public async run() {
    log.info(`[run]下载开始`);
    const self = this;
    const workStatusKeyName = "novel-downloader-EaraVl9TtSM2405L";
    interface workStatusObj {
      [index: string]: boolean;
    }

    function preTest() {
      const storage = (window as newWindow & typeof globalThis).customStorage;
      let workStatus: workStatusObj | undefined = storage.get(
        workStatusKeyName
      );
      if (workStatus) {
        const nowNumber = Object.keys(workStatus).length;
        if (self.maxRunLimit && nowNumber > self.maxRunLimit) {
          return false;
        }
      } else {
        workStatus = {};
        workStatus[document.location.href] = true;
        storage.set(workStatusKeyName, workStatus, 20);
      }
      return true;
    }
    function preWarning() {
      return true;
    }
    function preHook() {
      if (!preTest()) {
        const alertText = `当前网站目前最多允许${self.maxRunLimit}个下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
        alert(alertText);
        log.info(`[run]${alertText}`);
        return false;
      }
      if (!preWarning()) {
        return false;
      }

      self.audio = new Audio(
        "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjcxLjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhoaGvr6+vr6+8vLy8vLzKysrKysrX19fX19fX5eXl5eXl8vLy8vLy////////AAAAAExhdmM1Ny44OQAAAAAAAAAAAAAAACQCgAAAAAAAAAVY82AhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAALACwAAP/AADwQKVE9YWDGPkQWpT66yk4+zIiYPoTUaT3tnU487uNhOvEmQDaCm1Yz1c6DPjbs6zdZVBk0pdGpMzxF/+MYxA8L0DU0AP+0ANkwmYaAMkOKDDjmYoMtwNMyDxMzDHE/MEsLow9AtDnBlQgDhTx+Eye0GgMHoCyDC8gUswJcMVMABBGj/+MYxBoK4DVpQP8iAtVmDk7LPgi8wvDzI4/MWAwK1T7rxOQwtsItMMQBazAowc4wZMC5MF4AeQAGDpruNuMEzyfjLBJhACU+/+MYxCkJ4DVcAP8MAO9J9THVg6oxRMGNMIqCCTAEwzwwBkINOPAs/iwjgBnMepYyId0PhWo+80PXMVsBFzD/AiwwfcKGMEJB/+MYxDwKKDVkAP8eAF8wMwIxMlpU/OaDPLpNKkEw4dRoBh6qP2FC8jCJQFcweQIPMHOBtTBoAVcwOoCNMYDI0u0Dd8ANTIsy/+MYxE4KUDVsAP8eAFBVpgVVPjdGeTEWQr0wdcDtMCeBgDBkgRgwFYB7Pv/zqx0yQQMCCgKNgonHKj6RRVkxM0GwML0AhDAN/+MYxF8KCDVwAP8MAIHZMDDA3DArAQo3K+TF5WOBDQw0lgcKQUJxhT5sxRcwQQI+EIPWMA7AVBoTABgTgzfBN+ajn3c0lZMe/+MYxHEJyDV0AP7MAA4eEwsqP/PDmzC/gNcwXUGaMBVBIwMEsmB6gaxhVuGkpoqMZMQjooTBwM0+S8FTMC0BcjBTgPwwOQDm/+MYxIQKKDV4AP8WADAzAKQwI4CGPhWOEwCFAiBAYQnQMT+uwXUeGzjBWQVkwTcENMBzA2zAGgFEJfSPkPSZzPXgqFy2h0xB/+MYxJYJCDV8AP7WAE0+7kK7MQrATDAvQRIwOADKMBuA9TAYQNM3AiOSPjGxowgHMKFGcBNMQU1FMy45OS41VVU/31eYM4sK/+MYxKwJaDV8AP7SAI4y1Yq0MmOIADGwBZwwlgIJMztCM0qU5TQPG/MSkn8yEROzCdAxECVMQU1FMy45OS41VTe7Ohk+Pqcx/+MYxMEJMDWAAP6MADVLDFUx+4J6Mq7NsjN2zXo8V5fjVJCXNOhwM0vTCDAxFpMYYQU+RlVMQU1FMy45OS41VVVVVVVVVVVV/+MYxNcJADWAAP7EAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOsJwDWEAP7SAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPMLoDV8AP+eAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPQL0DVcAP+0AFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
      );
      self.audio.loop = true;
      self.audio.play();

      const confirmExit = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        const confirmationText =
          "您正尝试离开本页面，当前页面有下载任务正在运行，是否确认离开？";
        return (e.returnValue = confirmationText);
      };
      window.onbeforeunload = confirmExit;

      (window as newWindow & typeof globalThis).downloading = true;

      return true;
    }
    function postCallback() {
      if (
        enableCustomFinishCallback &&
        typeof (<newUnsafeWindow>unsafeWindow).customFinishCallback ===
          "function"
      ) {
        const customFinishCallback = (<newUnsafeWindow>unsafeWindow)
          .customFinishCallback;
        log.info(
          `发现自定义结束回调函数，内容如下：\n${customFinishCallback.toString()}`
        );
        customFinishCallback();
      }
    }
    function postHook() {
      const storage = (window as newWindow & typeof globalThis).customStorage;
      const workStatus: workStatusObj | null = storage.get(workStatusKeyName);
      if (workStatus) {
        delete workStatus[document.location.href];
      }

      clearAttachmentClassCache();

      self.audio?.pause();
      self.audio?.remove();

      window.onbeforeunload = null;
      (window as newWindow & typeof globalThis).downloading = false;

      const progress = (window as newWindow & typeof globalThis).progress;
      if (progress) {
        progress.reset();
      }

      return true;
    }
    function catchError(error: Error) {
      log.error(error);
      log.trace(error);

      postHook();

      if (!(error instanceof ExpectError)) {
        document.getElementById("novel-downloader")?.remove();
        log.error(
          "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader"
        );

        failedPlus();
        alert(
          "运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader"
        );
        saveLogTextToFile();
      }
    }
    function getSave(book: Book) {
      log.debug("[run]保存数据");
      if (
        enableCustomSaveOptions &&
        typeof (<newUnsafeWindow>unsafeWindow).saveOptions === "object" &&
        saveOptionsValidate((<newUnsafeWindow>unsafeWindow).saveOptions)
      ) {
        const saveOptions = (<newUnsafeWindow>unsafeWindow).saveOptions;
        log.info("[run]发现自定义保存参数，内容如下\n", saveOptions);
        return getSaveBookObj(book, saveOptions);
      } else {
        return getSaveBookObj(book, {});
      }
    }
    function getChapters(book: Book) {
      function isEnable() {
        if (
          enableCustomChapterFilter &&
          typeof (<newUnsafeWindow>unsafeWindow).chapterFilter === "function"
        ) {
          let text =
            "[initChapters]发现自定义筛选函数，自定义筛选函数内容如下：\n";
          text += (<newUnsafeWindow>unsafeWindow).chapterFilter.toString();
          log.info(text);
          return true;
        } else {
          return false;
        }
      }

      function _filter(chapter: Chapter) {
        let b = true;
        try {
          const u = (<newUnsafeWindow>unsafeWindow).chapterFilter(chapter);
          if (typeof u === "boolean") {
            b = u;
          }
        } catch (error) {
          log.error("运行自定义筛选函数时出错。", error);
          log.trace(error);
        }
        return b;
      }

      let chapters = book.chapters.filter(
        (chapter) => chapter.status === Status.pending
      );
      const enabled = isEnable();
      if (enabled) {
        log.debug("[initChapters]筛选需下载章节");
        chapters = chapters.filter((chapter) => _filter(chapter));
      }
      return chapters;
    }
    async function initChapters(book: Book, saveBookObj: saveBook) {
      log.info(`[initChapters]开始初始化章节`);
      const chapters = getChapters(book);
      if (chapters.length === 0) {
        log.error(`[initChapters]初始化章节出错，未找到需初始化章节`);
        return [];
      }
      const progress = (window as newWindow & typeof globalThis).progress;
      if (progress) {
        progress.totalChapterNumber = chapters.length;
      }

      if (self.concurrencyLimit === 1) {
        for (let chapter of chapters) {
          try {
            const obj = await chapter.init();
            afterGetChpater(obj);
          } catch (error) {
            log.error(error);
            log.trace(error);
          }
        }
      } else {
        await concurrencyRun(
          chapters,
          self.concurrencyLimit,
          (curChapter: Chapter) => {
            if (curChapter === undefined) {
              return Promise.resolve();
            }
            return curChapter
              .init()
              .then((obj) => {
                afterGetChpater(obj);
              })
              .catch((error) => {
                log.error(error);
                log.trace(error);
              });
          }
        );
      }
      log.info(`[initChapters]章节初始化完毕`);
      return chapters;

      function afterGetChpater(chapter: Chapter) {
        const storage = (window as newWindow & typeof globalThis).customStorage;
        let workStatus: workStatusObj = storage.get(workStatusKeyName);
        if (workStatus) {
          workStatus[document.location.href] = true;
        } else {
          workStatus = {};
          workStatus[document.location.href] = true;
        }
        storage.set(workStatusKeyName, workStatus, 20);

        if (chapter.contentHTML !== undefined) {
          saveBookObj.addChapter(chapter);
          const progress = (window as newWindow & typeof globalThis).progress;
          if (progress) {
            progress.finishedChapterNumber++;
          }
        }
        return chapter;
      }
    }

    try {
      const _ = preHook();
      if (!_) return;

      self.book = await self.bookParse();
      const saveBookObj = getSave(self.book);
      await initChapters(self.book, saveBookObj);

      log.debug("[run]开始保存文件");
      saveBookObj.saveTxt();
      await saveBookObj.saveZip(false);

      postHook();
      postCallback();
      successPlus();
      printStat();
      return self.book;
    } catch (error) {
      catchError(error);
    }
  }
}
