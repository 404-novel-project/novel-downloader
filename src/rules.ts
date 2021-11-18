import {
  getSaveBookObj,
  SaveBook,
  SaveOptions,
  saveOptionsValidate,
} from "./save/save";
import {
  AttachmentClass,
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
import { concurrencyRun } from "./lib/misc";
import { NewUnsafeWindow, NewWindow } from "./global";
import { clearAttachmentClassCache } from "./lib/attachments";
import { successPlus, failedPlus, printStat } from "./stat";
import { vm as progress, ProgressVM } from "./ui/progress";

interface WorkStatusObj {
  [index: string]: boolean;
}
const workStatusKeyName = "novel-downloader-EaraVl9TtSM2405L";

export interface ChapterParseObject {
  chapterName: string | null;

  contentRaw: HTMLElement | null;
  contentText: string | null;
  contentHTML: HTMLElement | null;
  contentImages: AttachmentClass[] | null;
  additionalMetadate: ChapterAdditionalMetadate | null;
}

export abstract class BaseRuleClass {
  public imageMode: "naive" | "TM";
  public charset: string;
  public concurrencyLimit: number;
  public maxRunLimit?: number;
  public saveOptions?: SaveOptions;

  public book?: Book;

  private audio?: HTMLAudioElement;

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
  ): Promise<ChapterParseObject>;

  public async run() {
    log.info(`[run]下载开始`);
    const self = this;

    try {
      if (!self.preHook()) return;

      self.book = await self.bookParse();
      log.debug("[book]Book object:\n" + JSON.stringify(self.book));
      const saveBookObj = self.getSave(self.book);
      await self.initChapters(self.book, saveBookObj);

      log.debug("[run]开始保存文件");
      saveBookObj.saveTxt();
      await saveBookObj.saveZip(false);

      self.postHook();
      self.postCallback();
      successPlus();
      printStat();
      return self.book;
    } catch (error) {
      self.catchError(error as Error);
    }
  }

  protected preTest() {
    const self = this;
    const storage = (window as NewWindow & typeof globalThis).customStorage;
    let workStatus: WorkStatusObj | undefined = storage.get(workStatusKeyName);
    if (workStatus) {
      const nowNumber = Object.keys(workStatus).length;
      if (self.maxRunLimit && nowNumber >= self.maxRunLimit) {
        return false;
      }
    } else {
      workStatus = {};
      workStatus[document.location.href] = true;
      storage.set(workStatusKeyName, workStatus, 20);
    }
    return true;
  }

  protected preWarning() {
    return true;
  }

  protected preHook() {
    const self = this;
    if (!self.preTest()) {
      const alertText = `当前网站目前最多允许${self.maxRunLimit}个下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
      alert(alertText);
      log.info(`[run]${alertText}`);
      return false;
    }
    if (!self.preWarning()) {
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

    (window as NewWindow & typeof globalThis).downloading = true;

    return true;
  }

  protected postCallback() {
    if (
      enableCustomFinishCallback &&
      typeof (unsafeWindow as NewUnsafeWindow).customFinishCallback ===
        "function"
    ) {
      const customFinishCallback = (unsafeWindow as NewUnsafeWindow)
        .customFinishCallback;
      log.info(
        `发现自定义结束回调函数，内容如下：\n${customFinishCallback.toString()}`
      );
      customFinishCallback();
    }
  }

  protected postHook() {
    const self = this;
    const storage = (window as NewWindow & typeof globalThis).customStorage;
    const workStatus: WorkStatusObj | null = storage.get(workStatusKeyName);
    if (workStatus) {
      delete workStatus[document.location.href];
    }

    clearAttachmentClassCache();

    self.audio?.pause();
    self.audio?.remove();

    window.onbeforeunload = null;
    (window as NewWindow & typeof globalThis).downloading = false;

    (progress as ProgressVM).reset();

    return true;
  }

  protected catchError(error: Error) {
    const self = this;
    log.error(error);
    log.trace(error);

    self.postHook();

    if (!(error instanceof ExpectError)) {
      document.getElementById("button-div")?.remove();
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

  protected getSave(book: Book) {
    log.debug("[run]保存数据");
    if (
      enableCustomSaveOptions &&
      typeof (unsafeWindow as NewUnsafeWindow).saveOptions === "object" &&
      saveOptionsValidate((unsafeWindow as NewUnsafeWindow).saveOptions)
    ) {
      const saveOptionsInner = (unsafeWindow as NewUnsafeWindow).saveOptions;
      log.info("[run]发现自定义保存参数，内容如下\n", saveOptionsInner);
      return getSaveBookObj(book, saveOptionsInner);
    } else {
      return getSaveBookObj(book, {});
    }
  }

  protected getChapters(book: Book) {
    function isEnable() {
      if (
        enableCustomChapterFilter &&
        typeof (unsafeWindow as NewUnsafeWindow).chapterFilter === "function"
      ) {
        let text =
          "[initChapters]发现自定义筛选函数，自定义筛选函数内容如下：\n";
        // @ts-expect-error
        text += (unsafeWindow as NewUnsafeWindow).chapterFilter.toString();
        log.info(text);
        return true;
      } else {
        return false;
      }
    }

    function _filter(chapter: Chapter) {
      let b = true;
      try {
        // @ts-expect-error
        const u = (unsafeWindow as NewUnsafeWindow).chapterFilter(chapter);
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

  protected async initChapters(book: Book, saveBookObj: SaveBook) {
    const self = this;
    log.info(`[initChapters]开始初始化章节`);
    Object.entries(self).forEach((kv) =>
      log.info(`[initChapters] ${kv[0]}: ${kv[1]}`)
    );
    const chapters = self.getChapters(book);
    if (chapters.length === 0) {
      log.error(`[initChapters]初始化章节出错，未找到需初始化章节`);
      return [];
    }
    (progress as ProgressVM).totalChapterNumber = chapters.length;

    if (self.concurrencyLimit === 1) {
      for (const chapter of chapters) {
        if ((window as NewWindow & typeof globalThis).stopFlag) {
          log.info("[chapter]收到停止信号，停止继续下载。");
          break;
        }
        try {
          let chapterObj = await chapter.init();
          chapterObj = await self.postChapterParseHook(chapterObj, saveBookObj);
        } catch (error) {
          log.error(error);
          log.trace(error);
        }
      }
    } else {
      await concurrencyRun(
        chapters,
        self.concurrencyLimit,
        async (curChapter: Chapter) => {
          if (curChapter === undefined) {
            return Promise.resolve();
          }
          if ((window as NewWindow & typeof globalThis).stopFlag) {
            log.info("[chapter]收到停止信号，停止继续下载。");
            return Promise.resolve();
          }
          try {
            let chapterObj = await curChapter.init();
            chapterObj = await self.postChapterParseHook(
              chapterObj,
              saveBookObj
            );
            return chapterObj;
          } catch (error) {
            log.error(error);
            log.trace(error);
          }
        }
      );
    }
    log.info(`[initChapters]章节初始化完毕`);
    return chapters;
  }

  public async postChapterParseHook(
    chapter: Chapter,
    saveBookObj: SaveBook
  ): Promise<Chapter> {
    const storage = (window as NewWindow & typeof globalThis).customStorage;
    let workStatus: WorkStatusObj = storage.get(workStatusKeyName);
    if (workStatus) {
      workStatus[document.location.href] = true;
    } else {
      workStatus = {};
      workStatus[document.location.href] = true;
    }
    storage.set(workStatusKeyName, workStatus, 20);

    if (chapter.contentHTML !== undefined) {
      saveBookObj.addChapter(chapter);
      (progress as ProgressVM).finishedChapterNumber++;
    }
    return chapter;
  }
}
