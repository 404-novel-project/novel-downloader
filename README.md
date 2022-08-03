# 小说下载器

一个**可扩展的**通用型小说下载器。

## 关于404小说文库项目

在这个404时代，由于种种原因，起点、晋江、刺猬猫、SF等小说网站上的小说经常毫无征兆的消失。即使该小说已经入V，即使你已经订阅了该小说。

这样的例子数不胜数。随便打开笔趣阁等转载网站，首发于起点，但现在起点上找不到该小说的情形比比皆是。像轻文轻小说这种整个网站都上天了的情况也不是没有。

如果小说消失时被笔趣阁等转载网站转载了，后来的读者尚且能一睹其风采，但如果小说发布的网站不是起点，小说也不够热，根本就没有转载网站转载，那后来者想一睹该小说的风采，就相当困难了。

404小说文库项的目的是：保存这些质量上乘，但不够热门，没有被其他网站转载，彻底从互联网上消失的作品。 

本脚本为404小说文库项目的组成部分之一，对于无登录墙的小说网站，**如您同意**，本脚本将会尝试将当前书籍详情页及目录页（如果存在）存档至互联网档案馆（[archive.org](https://archive.org/)），以备日后（被删除后）查看。

存档过程中将会搜集并上报您如下信息：IP地址、User-Agent、Referer、当前书籍详情页URL、当前书籍目录页URL（如果存在）、当前小说下载器脚本版本、当前脚本管理器版本。除上述信息外，不会搜集您任何其他信息。

# 安装

本软件为油猴脚本，需先在浏览器安装脚本管理器（Greasemonkey、Violentmonkey、Tampermonkey），再安装本脚本。具体可参见：[如何安装用户脚本](https://greasyfork.org/zh-CN/help/installing-user-scripts)。

本脚本地址：

- [github版](https://github.com/404-novel-project/novel-downloader/raw/gh-pages/bundle.user.js)：启用代码压缩，更新最快。
- [greasyfork版](https://greasyfork.org/scripts/406070-%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8/code/%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8.user.js)：无代码压缩，更新可能有延迟。

## 使用方法

**本脚本执行下载任务时将播放无声音频，以保证脚本后台运行时不被休眠。**

如果本脚本支持该小说网站，当打开小说目录页时，网页右上角会出现下载图标，点击该图标即可开始下载。

如果你要下载的小说章节较多，等待时间可能较长，此时请耐心等待。

你通过右下角进度条了解当前下载进度，或者按下 F12，打开网页控制台查看当前下载状态。

下载完成后，本脚本将会自动下载一个TXT文档及EPUB文件。

TXT文档请使用记事本或其它阅读软件进行阅读。

EPUB文件请使用相应阅读器阅读。

## 常见问题

- Q：脚本运行出错了！

    A：在反馈之前，请**保证您当前运行的脚本版本为最新版**，如不是最新版，请更新脚本。
    
    如最新版脚本仍出现错误，请说明具体网址，有无特殊操作以及其他附加说明，并附上调试日志，协助开发者明确出错原因。调试日志为下载生成的zip文件中的 `debug.log` 文件。
    
    如需反馈问题，请至[本项目支持页面](https://github.com/yingziwu/novel-downloader/issues)提交issue， 对于greasyfork评论区的反馈跟进不及时敬请谅解。
    
    文件上传可使用： https://send.bgme.bid/

- Q：希望支持某某网站。

    A：请提交issue并附上以上信息，网站URL，原创网站或转载网站，有无收费章节，有无如登录墙等额外限制，希望添加的理由等。开发者将视情况，酌情添加。

## 目前支持小说网站

**特别提醒：如欲下载支持列表中网站的付费章节，请登录相应网站帐户，并确定已购买相应付费章节。未登录网站帐户，或未购买的付费章节，下载时将直接忽略，无法进行下载。**

| 站点                                         |公共章节|付费章节| 备注                                                                                                                                             |
|--------------------------------------------|-------|------|------------------------------------------------------------------------------------------------------------------------------------------------|
| [刺猬猫](https://www.ciweimao.com/)           |✅|✅| VIP章节仅支持图片版。                                                                                                                                   |
| [SF轻小说](https://book.sfacg.com/)           |✅\*|✅\*\*| \*不支持对话小说，例：[224282](https://book.sfacg.com/Novel/224282/)。 \*\*VIP章节仅支持图片版。                                                                   |
| [起点中文网](https://www.qidian.com/)           |✅|✅|部分小说VIP章节可能出现乱码无法下载。|
| [起点女生网](https://www.qdmm.com/)             |✅|✅||
| [晋江文学城](http://www.jjwxc.net/)             |✅|✅| VIP章节使用[晋江防盗字体对照表](https://github.com/yingziwu/jjwxcFontTables)去除空格。<br>脚本将向云端请求数据，远程字体功能可通过 `enableJjwxcRemoteFont` 配置项手动关闭。                  |
| [长佩文学](https://www.gongzicp.com/)          |✅|✅| 反爬较严，限制下载速度，每分钟约可下载6章，请耐心等待。<br>长佩文学为单页应用，如打开书籍详情页右上角未出现下载图标，请按下F5重新加载当前页面。                                                                    |
| [书耽](https://www.shubl.com/)               |✅|✅| VIP章节仅支持图片版。                                                                                                                                   |
| [海棠文化线上文学城](https://ebook.longmabook.com/) |✅|✅||
| [次元姬](https://www.ciyuanji.com/)           |✅|✅||
| [米国度](https://www.myrics.com/)             |✅|✅||
| [寒武纪年原创网](https://www.hanwujinian.com/)    |✅|✅||
| [哔哩哔哩漫画](https://manga.bilibili.com/)      |✅|✅||
| [息壤中文网](https://www.xrzww.com/)            |✅|✅||
| [独阅读](https://www.duread8.com/)            |✅|✅||
| [轻之文库轻小说](https://www.linovel.net/)        |✅|❌| VIP章节仅支持APP查看                                                                                                                                  |
| [纵横中文网](http://www.zongheng.com/)          |✅|❌||
| [花语女生网](http://huayu.zongheng.com/)        |✅|❌||
| [17K小说网](https://www.17k.com/)             |✅|❌||
| [书海小说网](http://www.shuhai.com/)            |✅|❌||
| [塔读文学](https://www.tadu.com/)              |✅|❌||
| [七猫中文网](https://www.qimao.com/)            |✅|❌||
| [废文网](https://sosad.fun/)                  |✅|❎| 部分小说或章节需登录后查看。                                                                                                                                 |
| [pixiv](https://www.pixiv.net/novel/)      |✅|❎|单页应用，如打开书籍详情页右上角未出现下载图标，请按下F5重新加载当前页面。|
| [动漫之家](https://www.dmzj.com/)              |✅|❎| 需下载大量图片，速度较慢，请耐心等待。<br>需占用大量内存，请保证最终生成文件4倍以上内存，即最终下载生成500MB ZIP文件，运行时请保证至少2GB内存空间。可使用筛选函数，分次下载。                                                |
| [Lofter](https://www.lofter.com/)          |✅|❎| 因本脚本会将博文中的图片也一同下载下来，对于图片特别多的博客，下载时请注意内存用量（800MB限制），根据实际情况使用筛选函数分次下载。<br>部分博文内含视频内容，为节省内存使用，加快下载速度，本脚本将跳过视频内容。<br>如您使用广告屏蔽器，可能会影响本脚本在Lofter的工作。 |
| [努努书坊](https://www.kanunu8.com/)           |✅|❎| 格式众多，如发现不支持页面敬请反馈。                                                                                                                             |
| [真白萌](https://masiro.me/)                  |✅|❎||
| [天涯书库](https://www.tianyabooks.com/)       |✅|❎||
| [爱青果](https://www.iqingguo.com/)           |✅|❎||
| [カクヨム](https://kakuyomu.jp/)               |✅|❎||
| [小説家になろう](https://syosetu.com/)            |✅|❎||
| [ハーメルン](https://syosetu.org/)              |✅|❎||
| [暁](https://www.akatsuki-novels.com/)      |✅|❎||
| [ファンタジー小説](https://www.alphapolis.co.jp/)  |✅|❌||
| [Novel Up Plus](https://novelup.plus/)     |✅|❎||

<details>
<summary>点击查看全部支持网站</summary>

| 站点                                            |公共章节|付费章节|备注|
|-----------------------------------------------|-------|------|----|
| [禁忌书屋](https://www.cool18.com/bbs4/index.php) |✅|❎||
| [读书369](http://www.dushu369.com/)             |✅|❎||
| [UU看书网](https://www.uukanshu.com/)            |✅|❎||
| [亿软网](http://www.yruan.com/)                  |✅|❎|网站性能差，降低抓取频率，请耐心等待。|
| [书趣阁](http://www.shuquge.com/)                |✅|❎|网站性能差，降低抓取频率，请耐心等待。|
| [顶点小说](https://www.dingdiann.net/)            |✅|❎||
| [星空中文](http://www.xkzw.org/)                  |✅|❎||
| [乐文小说网](https://www.lewenn.com/)              |✅|❎||
| [266看书](http://www.266ks.com/)                |✅|❎||
| [和图书](https://www.hetushu.com/index.php)      |✅|❎||
| [手打吧](https://www.shouda88.com/)              |✅|❎||
| [阁笔趣](http://www.gebiqu.com/)                 |✅|❎||
| [米趣小说](http://www.viviyzw.com/)               |✅|❎||
| [书书网](https://www.1pwx.com/)                  |✅|❎||
| [八一中文网](https://www.81book.com/)              |✅|❎|抓取速度慢，请耐心等待。|
| [御书阁](http://m.yushuge123.com/)               |✅|❎|部分文字被图片替换，请使用HTML版查看。|
| [完本神站](https://www.xinwanben.com/)            |✅|❎||
| [得间小说](https://www.idejian.com/)              |✅|❎||
| [轻小说文库](https://www.wenku8.net/)              |✅|❎||
| [西方奇幻小说网](https://www.westnovel.com/)         |✅|❎||
| [棉花糖小说网](https://www.mht99.com/)              |✅|❎||
| [第一版主网](https://www.bz01.org/)                |✅|❎||
| [笔趣阁](https://www.xbiquge.so/)                |✅|❎||
| [红叶书斋](https://www.hongyeshuzhal.com/)        |✅|❎||
| [哩哔轻小说](https://www.linovelib.com/)           |✅|❎||
| [落秋中文](https://www.luoqiuzw.com/)             |✅|❎||
| [一笔阁](https://www.yibige.cc/)                 |✅|❎||
| [腐书网](https://www.fushuwang.org/)             |✅|❎||
| [搜小说](https://www.soxscc.net/)                |✅|❎||
| [腐国度](https://www.fuguoduxs.com/)             |✅|❎||
| [书包网](http://www.shubaowa.org/)               |✅|❎||
| [言情小说笔趣阁](https://www.yqbiqu.com/)            |✅|❎||
| [恋上你看书](https://www.630shu.net/)              |✅|❎||
| [同人小说网](https://www.trxs123.com/)             |✅|❎||
| [同人圈](http://www.tongrenquan.org/)            |✅|❎||
| [精品小说网](http://www.jpxs123.com/)              |✅|❎||
| [妙笔阁](https://www.imiaobige.com/)             |✅|❎||
| [256文学](https://www.256wenku.com/)            |✅|❎||
| [笔趣阁小说网](http://www.biquge66.com/)            |✅|❎||
| [乐文小说网](http://www.lwxs9.org/)                |✅|❎||
| [海棠小说网](http://m.haitangtxt.net/)             |✅|❎|部分文字被图片替换，请使用HTML版查看。<br>如需替换清理图片，请自行生成图片文字对照表。|
| [小说酷笔记](https://www.kubiji.net/)              |✅|❎||
| [笔趣阁](https://www.xbiquwx.la/)                |✅|❎||
| [25中文网](http://www.25zw.com/)                 |✅|❎||
| [天域小说网](https://www.zmccx.com/)               |✅|❎||
| [完本神站](https://www.wanben.org/)               |✅|❎||
| [燃文小说](https://www.ranwen.la)                 |✅|❎||
| [望书阁](https://www.wangshuge.com/)             |✅|❎||
| [百合小说网](https://m.baihexs.com/)               |✅|❎||
| [全书斋](https://www.quanshuzhai.com/)           |✅|❎||
| [蔷薇后花园](https://houhuayuan.xyz/)              |✅|❎||
| [黑沼泽俱乐部](https://houhuayuan.xyz/)             |✅|❎||
| [绿色小说网](https://www.lstxt.cc/)                |✅|❎||
| [笔趣阁](https://www.a7xs.com/)                  |✅|❎||
| [神凑轻小说](http://www.shencou.com/)              |✅|❎||
| [爱下书小说网](https://www.aixiawx.com/)            |✅|❎||
| [精彩小说网](https://jingcaiyuedu6.com/)           |✅|❎||
| [笔趣读](https://www.biqu55.net/)                |✅|❎||
| [爱下电子书](https://www.aixdzs.com/)              |✅|❎||
| [56书库](https://www.liuxs.la/)                 |✅|❎||
| [笔趣阁](http://www.b5200.net/)                  |✅|❎||
| [言情小说](https://www.xsyq.cc/)                  |✅|❎||
| [18看书](https://www.18kanshu.com/)             |✅|❎||
| [笔下文学333](http://www.bxwx888.org/)            |✅|❎||
| [小说屋](http://www.xiaoshuowu.com/)             |✅|❎||
| [缤纷幻想](https://colorful-fantasybooks.com/)    |✅|❎||
| [弟子小说网](https://www.dizishu.com/xiaoshuo/)    |✅|❎||
| [新笔趣阁](https://www.xbiquge.la/)               |✅|❎||
| [69书吧](https://www.69shu.com/)                |✅|❎||
| [笔下文学](https://www.ywggzy.com/)               |✅|❎||
| [飘天文学](https://www.ptwxz.net/)                |✅|❎||
| [红袖招](https://hongxiuzhao.me/)                |✅|❎||
| [38看书](https://www.mijiashe.com/)             |✅|❎||

</details>

## 特殊权限说明

- `unsafeWindow`：用于获取自定义筛选函数、自定义保存参数等设置。
- `GM_info`/`GM.info`： 获取并输出脚本运行环境。
- `GM_xmlhttpRequest`/`GM.xmlHttpRequest`：用于跨域HTTP请求。
- `GM_setValue`/`GM.setValue`、`GM_getValue`/`GM.getValue`、`GM_deleteValue`/`GM.deleteValue`： 用于统计模块，本地统计运行次数。

## 高阶使用技巧

### 启用调试功能

设置菜单中按击开启。

### 自定义筛选函数

如欲只下载部分章节，请在点击运行按钮前，按下 F12 打开开发者工具，在 `window` 下创建 `chapterFilter` 函数，具体格式如下：

```typescript
declare enum Status {
    pending = 0,
    downloading = 1,
    failed = 2,
    finished = 3,
    aborted = 4,
    saved = 5
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
    chapterParse: BaseRuleClass["chapterParse"];
    charset: string;
    options: object;
    status: Status;
    retryTime: number;
    contentRaw: HTMLElement | null;
    contentText: string | null;
    contentHTML: HTMLElement | null;
    contentImages: attachmentClass[] | null;
    additionalMetadate: ChapterAdditionalMetadate | null;
    chapterHtmlFileName: string | number;
    constructor(bookUrl: string, bookname: string, chapterUrl: string, chapterNumber: number, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, sectionName: string | null, sectionNumber: number | null, sectionChapterNumber: number | null, chapterParse: BaseRuleClass["chapterParse"], charset: string, options: object);
    init(): Promise<this>;
    private parse;
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
    imageBlob: Blob | null | void;
    constructor(imageUrl: string, name: string, mode: "naive" | "TM");
    init(): Promise<Blob | null>;
    private downloadImage;
    private tmDownloadImage;
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

使用方法大致同自定义筛选函数，即在 `window` 下创建 `saveOptions` 对象，具体格式如下：

```typescript
declare class saveBook {
    protected book: Book;
    mainStyleText: string;
    tocStyleText: string;
    constructor(book: Book);
    saveTxt(): void;
    saveLog(): void;
    saveZip(runSaveChapters?: boolean): Promise<void>;
    addChapter(chapter: Chapter): void;
    getchapterName(chapter: Chapter): string;
    genSectionText(sectionName: string): string;
    genChapterText(chapterName: string, contentText: string): string;
    genSectionHtmlFile(chapterObj: Chapter): Blob;
    genChapterHtmlFile(chapterObj: Chapter): Blob;
    chapterSort(a: Chapter, b: Chapter): 0 | 1 | -1;
}
interface saveOptions {
    mainStyleText?: saveBook["mainStyleText"];
    tocStyleText?: saveBook["tocStyleText"];
    getchapterName?: saveBook["getchapterName"];
    genSectionText?: saveBook["genSectionText"];
    genChapterText?: saveBook["genChapterText"];
    genSectionHtmlFile?: saveBook["genSectionHtmlFile"];
    genChapterHtmlFile?: saveBook["genChapterHtmlFile"];
    chapterSort?: saveBook["chapterSort"];
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

txt文档每个自然段前加两个空格

```javascript
const saveOptions = {
    genChapterText: (chapterName, contentText) => {
        contentText = contentText
                    .split('\n')
                    .map(line => {
                            if (line.trim() === "") {
                                return line
                            } else {
                                return line.replace(/^/,'    ')
                            }
                        })
                    .join('\n')
        return `## ${chapterName}\n\n${contentText}\n\n`;
    }
}
window.saveOptions = saveOptions
```

保存章节时倒序排列

```javascript
const saveOptions = {
    chapterSort: (a, b) => {
        if (a.chapterNumber > b.chapterNumber) {
            return -1;
        }
        if (a.chapterNumber === b.chapterNumber) {
            return 0;
        }
        if (a.chapterNumber < b.chapterNumber) {
            return 1;
        }
            return 0;
    }
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
// @grant        none
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
    window.saveOptions = saveOptions
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
1. `yarn install` 安装依赖。
1. 继承 `BaseRuleClass` 类，实现 `bookParse`、`chapterParse` 抽象方法，在 `router/download.ts` 文件中添加相应选择规则，在 `header.json` 文件 `match`
   字段添加相应的匹配规则。
1. `yarn run build` 编译生成最终脚本文件 `dist/bundle.user.js`。

## License

AGPL-3.0

## 致谢

感谢 [JetBrains](https://www.jetbrains.com/community/opensource/) 向本项目提供 WebStorm IDE。