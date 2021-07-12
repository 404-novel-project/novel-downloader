# 小说下载器

一个**可扩展的**通用型小说下载器。
## 使用方法

**本脚本执行下载任务时将播放无声音频，以保证脚本后台运行时不被休眠。**

如果本脚本支持该小说网站，当打开小说目录页时，网页右上角会出现下载图标，点击该图标即可开始下载。

如果你要下载的小说章节较多，等待时间可能较长，此时请耐心等待。

你通过右下角进度条了解当前下载进度，或者按下 F12，打开网页控制台查看当前下载状态。

下载完成后，本脚本将会自动下载一个TXT文档及由HTML文件及图片组成的ZIP压缩包。

TXT文档请使用记事本或其它阅读软件进行阅读。

ZIP压缩包，请在解压后，直接双击打开HTML文件（`ToC.html` 为目录文件）进行阅读。
## 目前支持小说网站

**特别提醒：如欲下载支持列表中网站的付费章节，请登录相应网站帐户，并确定已购买相应付费章节。未登录网站帐户，或未购买的付费章节，下载时将直接忽略，无法进行下载。**

|站点|公共章节|付费章节|备注|
|---|-------|------|----|
|[刺猬猫](https://www.ciweimao.com/)|✅|✅\*|\*VIP章节仅支持图片版。|
|[SF轻小说](https://book.sfacg.com/)|✅\*|✅\*\*|\*不支持对话小说，例：[224282](https://book.sfacg.com/Novel/224282/)。 \*\*VIP章节仅支持图片版。|
|[起点中文网](https://book.qidian.com/)|✅|✅||
|[起点女生网](https://www.qdmm.com/)|✅|✅||
|[晋江文学城](http://www.jjwxc.net/)|✅|✅\*|\*VIP章节已使用[防盗字体对照表](https://github.com/7325156/jjwxcNovelCrawler/tree/master/%E5%8F%8D%E7%88%AC%E8%99%AB%E5%AF%B9%E7%85%A7%E8%A1%A8)去除空格，如在使用中发现VIP章节仍存在空格，请附上所下载的文件进行反馈。|
|[长佩文学](https://www.gongzicp.com/)|✅|✅|反爬较严，限制下载速度，每分钟约可下载6章，请耐心等待。|
|[轻之文库轻小说](https://www.linovel.net/)|✅|❌|VIP章节仅支持APP查看|
|[纵横中文网](http://www.zongheng.com/)|✅|❌||
|[花语女生网](http://huayu.zongheng.com/)|✅|❌||
|[17K小说网](https://www.17k.com/)|✅|❌||
|[书海小说网](http://www.shuhai.com/)|✅|❌||
|[废文网](https://sosad.fun/)|✅|❎|部分小说或章节需登录后查看。|
|[动漫之家](https://www.dmzj.com/)|✅|❎|需下载大量图片，速度较慢，请耐心等待。<br>需占用大量内存，请保证最终生成文件4倍以上内存，即最终下载生成500MB ZIP文件，运行时请保证至少2GB内存空间。可使用筛选函数，分次下载。|

<details>
<summary>点击查看全部支持网站</summary>

|站点|公共章节|付费章节|备注|
|---|-------|------|----|
|[塔读文学](https://www.tadu.com/)|✅|❌||
|[七猫中文网](https://www.qimao.com/)|✅|❌||
|[UU看书网](https://www.uukanshu.com/)|✅|❎||
|[亿软网](http://www.yruan.com/)|✅|❎||
|[笔趣窝](http://www.biquwoo.com/)|✅|❎||
|[书趣阁](http://www.shuquge.com/)|✅|❎||
|[顶点小说](https://www.dingdiann.net/)|✅|❎||
|[星空中文](http://www.xkzw.org/)|✅|❎||
|[乐文小说网](https://www.lewenn.com/)|✅|❎||
|[可乐小说网](https://www.klxs.la/)|✅|❎||
|[266看书](https://www.266ks.com/)|✅|❎||
|[和图书](https://www.hetushu.com/index.php)|✅|❎||
|[手打吧](https://www.shouda88.com/)|✅|❎||
|[阁笔趣](http://www.gebiqu.com/)|✅|❎||
|[米趣小说](http://www.viviyzw.com/)|✅|❎||
|[书书网](https://www.xiaoshuodaquan.com/)|✅|❎||
|[八一中文网](https://www.81book.com/)|✅|❎||
|[御书阁](http://m.yuzhaige.cc/)|✅|❎|部分文字被图片替换，请使用HTML版查看。|
|[完本神站](https://www.xinwanben.com/)|✅|❎||
|[得间小说](https://www.idejian.com/)|✅|❎||
|[轻小说文库](https://www.wenku8.net/)|✅|❎||
|[西方奇幻小说网](https://www.westnovel.com/)|✅|❎||
|[棉花糖小说网](https://www.mht.tw/)|✅|❎||
|[第二版主网](http://www.dierbanzhu1.com/)|✅|❎||
|[笔趣阁](https://www.xbiquge.so/)|✅|❎||
|[红叶书斋](https://www.hongyeshuzhai.com/)|✅|❎||
|[哩哔轻小说](https://www.linovelib.com/)|✅|❎||
|[落秋中文](https://www.luoqiuzw.com/)|✅|❎||
|[一笔阁](https://www.yibige.la/)|✅|❎||
|[腐书网](https://www.fushuwang.org/)|✅|❎||
|[搜小说](https://www.soxscc.net/)|✅|❎||
|[腐国度](https://www.fuguoduxs.com/)|✅|❎||
|[书包网](http://www.shubaowa.org/)|✅|❎||
|[言情小说笔趣阁](https://www.xyqxs.cc/)|✅|❎||
|[恋上你看书](https://www.630shu.net/)|✅|❎||
|[青果阅读](https://www.qingoo.cn/)|✅|❎||
|[同人小说网](https://www.trxs123.com/)|✅|❎||
|[同人圈](http://www.tongrenquan.org/)|✅|❎||
|[精品小说网](http://www.jpxs123.com/)|✅|❎||
|[妙笔阁](https://www.imiaobige.com/)|✅|❎||
|[256文学](https://www.256wxc.com/)|✅|❎||

</details>

## 特殊权限说明

- `unsafeWindow`：用于获取自定义筛选函数、自定义保存参数等设置。
- `GM_info`/`GM.info`： 获取并输出脚本运行环境。
- `GM_xmlhttpRequest`/`GM.xmlHttpRequest`：用于跨域HTTP请求。
- `GM_getTab`、`GM_saveTab`、`GM_getTabs` (可禁用)： 用于全局并发限制，例如：刺猬猫只允许同时运行一下载线程。
- `GM_setValue`/`GM.setValue`、`GM_getValue`/`GM.getValue`、`GM_deleteValue`/`GM.deleteValue` (可禁用)： 用于统计模块，本地统计运行次数。

## 高阶使用技巧

### 启用调试功能

如果你需要启用脚本调试功能，请打开脚本管理器的脚本编辑界面，搜索 `enaleDebug =` 字符串，并将 `false` 更改为 `true` 即可启用调试功能。
### 自定义筛选函数

如欲只下载部分章节，请在点击运行按钮前，按下 F12 打开开发者工具，在 `Window` 下创建自定义筛选函数 `chapterFilter` 。

```typescript
declare enum Status {
    pending = 0,
    downloading = 1,
    failed = 2,
    finished = 3,
    aborted = 4
}
interface ChapterAdditionalMetadate {
    lastModified?: number;
}
declare class Chapter {
    bookUrl: string;
    bookname: string;
    chapterUrl: string;
    chapterNumber: number;
    chapterName: string | null;
    isVIP: boolean;
    isPaid: boolean | null;
    sectionName: string | null;
    sectionNumber: number | null;
    sectionChapterNumber: number | null;
    chapterParse: ruleClass["chapterParse"];
    charset: string;
    options: object;
    status: Status;
    retryTime: number;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: attachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
    constructor(bookUrl: string, bookname: string, chapterUrl: string, chapterNumber: number, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, sectionName: string | null, sectionNumber: number | null, sectionChapterNumber: number | null, chapterParse: ruleClass["chapterParse"], charset: string, options: object);
    init(): Promise<chapterParseObject>;
    private parse;
}

interface chapterFilter {
    (chapter: Chapter): boolean;
}
```

**自定义筛选函数示例：**

只下载该本小说前100章内容：

```javascript
function chapterFilter(chapter) {
  return chapter.chapterNumber <= 100
}
```

只下载第一卷内容：

```javascript
function chapterFilter(chapter) {
  return chapter.sectionNumber === 1
}
```

只下载章节名称中含有“武器”的章节：

```javascript
function chapterFilter(chapter) {
  return chapter.chapterName.includes("武器")
}
```

### 自定义保存参数

自定义保存参数允许您修改保存文件的样式，章节标题等内容。

使用方法大致同自定义筛选函数，即在 `Window` 下创建如下对象 `saveOptions` 。

```typescript
interface saveOptions {
    mainStyleText?: string;
    tocStyleText?: string;
    getchapterName?: (chapter: Chapter) => string;
}
```

**自定义保存参数示例：**

将章节名称格式修改为 `第xx章 xxxx` ：

```javascript
const saveOptions = {
    getchapterName: (chapter) => {
        if (chapter.chapterName) {
            return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
        } else {
            return `第${chapter.chapterNumber.toString()}章`;
        }
    }
}
window.saveOptions = saveOptions
```

更改ZIP文档中章节HTML文件样式：

```javascript
const saveOptions = {
    "mainStyleText": `p {
  text-indent: 4em;
  display: block;
  line-height: 1.3em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}`
}
window.saveOptions = saveOptions
```

**使用用户脚本自动注入自定义保存参数：**

如您总是想使用某一自定义保存参数，你可以使用如下用户脚本（根据实际需要修改相应数值），自动向页面注入自定义保存参数。

```javascript
// ==UserScript==
// @name         auto inject saveOptions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto inject saveOptions
// @author       You
// @match        *://*/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    const saveOptions = {
        getchapterName: (chapter) => {
            if (chapter.chapterName) {
                return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
            } else {
                return `第${chapter.chapterNumber.toString()}章`;
            }
        }
    }
    unsafeWindow.saveOptions = saveOptions
})();
```

自定义筛选函数同理也可使用用户脚本自动注入。


### 自定义完成回调函数

```typescript
interface customFinishCallback {
    (): void;
}
```

自定义完成回调函数将在下载完成并生成ZIP文件后自动执行。

使用自定义完成回调函数可在下载完成后自动完成某些工作，例如：关闭当前窗口。

```javascript
function customFinishCallback(book: Book) {
    window.close();
}
window.customFinishCallback = customFinishCallback;
```

## 开发

1. `git clone https://github.com/yingziwu/novel-downloader.git` 将项目克隆至本地（访问github可能需要使用代理）。
1. `npm install` 安装依赖。
1. 根据 `ruleClass` 接口实现相应网站解析规则 Class，并在 `rules.ts` 中添加相应选择规则。

    ```typescript
    interface BookAdditionalMetadate {
        cover?: attachmentClass;
        attachments?: attachmentClass[];
        tags?: string[];
        lastModified?: number;
        serires?: string;
        seriresNumber?: number;
        ids?: string[] | string;
        publisher?: string;
        languages?: string;
    }
    declare class attachmentClass {
        url: string;
        name: string;
        mode: "naive" | "TM";
        headers?: {
            [index: string]: string;
        };
        private defaultHeader;
        status: Status;
        retryTime: number;
        imageBlob: Blob | null;
        constructor(imageUrl: string, name: string, mode: "naive" | "TM");
        init(): Promise<Blob | null>;
        private downloadImage;
        private tmDownloadImage;
    } 
    interface chapterParseObject {
        chapterName: string | null;
        contentRaw: HTMLElement | null;
        contentText: string | null;
        contentHTML: HTMLElement | null;
        contentImages: attachmentClass[] | null;
        additionalMetadate: ChapterAdditionalMetadate | null;
    }
    interface ruleClass {
        imageMode: "naive" | "TM";
        charset?: string;
        concurrencyLimit?: number;
        maxRunLimit?: number;
        saveOptions?: saveOptions;
        bookParse(): Promise<Book>;
        chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: object): Promise<chapterParseObject>;
    }
    ```

1. `npm run build` 编译生成最终脚本文件 `dist/bundle.user.js`。

## Todo

|网站|实现难度|
|---|----|
|[悠久小说网](https://www.ujxs.net/)|2|
|[百合小说网](https://m.baihexs.com/)|3|
|[微信读书](https://weread.qq.com/)|9|
|[网易云阅读](https://yuedu.163.com/)|5|
|[豆瓣阅读](https://read.douban.com/)|5|

## License

AGPL-3.0
