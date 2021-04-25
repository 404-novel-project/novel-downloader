// ==UserScript==
// @name        小说下载器
// @version     3.4.0.1619361922519
// @author      bgme
// @description 一个可扩展的通用型小说下载器。
// @supportURL  https://github.com/yingziwu/novel-downloader
// @match       *://www.yruan.com/article/*.html
// @match       *://www.shuquge.com/txt/*/index.html
// @match       *://www.dingdiann.net/ddk*/
// @match       *://www.biquwoo.com/bqw*/
// @match       *://www.xkzw.org/xkzw*/
// @match       *://www.hetushu.com/book/*/index.html
// @match       *://www.shouda8.com/*/
// @match       *://book.qidian.com/info/*
// @match       *://www.ciweimao.com/chapter-list/*
// @match       *://www.jjwxc.net/onebook.php?novelid=*
// @match       *://book.sfacg.com/Novel/*/MainIndex/
// @match       *://www.gebiqu.com/biquge_*/
// @match       *://www.meegoq.com/book*.html
// @match       *://book.zongheng.com/showchapter/*.html
// @match       *://huayu.zongheng.com/showchapter/*.html
// @match       *://www.17k.com/list/*.html
// @match       *://www.shuhai.com/book/*.htm
// @match       *://mm.shuhai.com/book/*.htm
// @match       *://www.266ks.com/*/
// @match       *://www.266ks.com/*/index*.html
// @match       *://www.uukanshu.com/b/*/
// @match       *://www.xiaoshuodaquan.com/*/
// @namespace   https://blog.bgme.me
// @icon        data:image/png;base64,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
// @license     AGPL-3.0
// @run-at      document-end
// @noframes    true
// @exclude     *://www.jjwxc.net/onebook.php?novelid=*&chapterid=*
// @exclude     *://www.meegoq.com/book/*.html
// @exclude     *://www.yruan.com/article/*/*.html
// @grant       unsafeWindow
// @grant       GM_info
// @grant       GM_xmlhttpRequest
// @grant       GM_getTab
// @grant       GM_saveTab
// @grant       GM_getTabs
// @grant       GM.info
// @grant       GM.xmlHttpRequest
// @connect     img.shouda8.com
// @connect     read.qidian.com
// @connect     kuangxiangit.com
// @connect     sinaimg.cn
// @connect     jjwxc.net
// @connect     image.gebiqu.com
// @connect     qidian.qpic.cn
// @connect     static.zongheng.com
// @connect     book.zongheng.com
// @connect     cdn.static.17k.com
// @connect     www.shuhai.com
// @connect     img.uukanshu.com
// @connect     oss-accelerate.aliyuncs.com
// @connect     cdn.bcebos.com
// @require     https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js#sha512-Qlv6VSKh1gDKGoJbnyA5RMXYcvnpIqhO++MhIM2fStMcGT9i2T//tSwYFlcyoRRDcDZ+TYHpH8azBBCyhpSeqw==
// @require     https://cdn.jsdelivr.net/npm/jszip@3.6.0/dist/jszip.min.js#sha512-uVSVjE7zYsGz4ag0HEzfugJ78oHCI1KhdkivjQro8ABL/PRiEO4ROwvrolYAcZnky0Fl/baWKYilQfWvESliRA==
// @require     https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/crypto-js.min.js#sha512-s+p/j7+gSFJa1SUEwmPBAlitcUccgbaTTM3yRSmDHUp0UCcRdBMgI2toIT97ZKGKItfV3N66PEZbHcT/iS5thg==
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const rules_1 = __webpack_require__(489);
const main_1 = __webpack_require__(519);
const lib_1 = __webpack_require__(563);
function printEnvironments() {
    let _GM_info;
    try {
        _GM_info = GM_info;
    }
    catch (error) {
        try {
            _GM_info = GM.info;
        }
        catch (error) {
            console.error("未发现 _GM_info API");
        }
    }
    if (_GM_info) {
        console.log(`开始载入小说下载器……
当前浏览器UA：${navigator.userAgent}
当前脚本管理器：${_GM_info.scriptHandler}
当前脚本管理器版本：${_GM_info.version}
当前脚本名称：${_GM_info.script.name}
当前脚本版本：${_GM_info.script.version}
当前脚本最后更新时间：${_GM_info.script.lastModified}
是否处于隐私模式：${_GM_info.isIncognito}
是否启用调试：${enaleDebug}`);
    }
}
function initBook(rule) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookParse = rule.bookParse;
        const chapterParse = rule.chapterParse;
        return bookParse(chapterParse).then((obj) => {
            const { bookUrl, bookname, author, introduction, additionalMetadate, chapters, } = obj;
            const book = new main_1.Book(bookUrl, bookname, author, introduction, additionalMetadate, chapters);
            return book;
        });
    });
}
function initChapters(rule, book) {
    return __awaiter(this, void 0, void 0, function* () {
        let concurrencyLimit = 10;
        if (rule.concurrencyLimit !== undefined) {
            concurrencyLimit = rule.concurrencyLimit;
        }
        const chapters = book.chapters.filter((chapter) => chapter.status === main_1.Status.pending);
        if (concurrencyLimit === 1) {
            for (let chapter of chapters) {
                const obj = yield chapter.init();
                if (obj.contentHTML !== null) {
                    finishedChapterNumber++;
                    updateProgress(finishedChapterNumber, totalChapterNumber, null);
                }
            }
        }
        else {
            yield lib_1.concurrencyRun(chapters, concurrencyLimit, (curChapter) => {
                return curChapter.init().then((obj) => {
                    if (obj.contentHTML !== null) {
                        finishedChapterNumber++;
                        updateProgress(finishedChapterNumber, totalChapterNumber, null);
                    }
                    return obj;
                });
            });
        }
        return chapters;
    });
}
function save(book) {
    function chapterSort(a, b) {
        if (a.chapterNumber > b.chapterNumber) {
            return 1;
        }
        if ((a.chapterNumber = b.chapterNumber)) {
            return 0;
        }
        if (a.chapterNumber < b.chapterNumber) {
            return -1;
        }
        return 0;
    }
    function addImageToZip(image, zip) {
        if (image.status === main_1.Status.finished && image.imageBlob) {
            zip.file(image.name, image.imageBlob);
        }
        else {
            console.error("[save]图片下载失败！");
            console.error(image);
        }
    }
    function genSectionText(sectionName) {
        return `${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}`;
    }
    function genChapterText(chapterName, contentText) {
        return `## ${chapterName}\n\n${contentText}\n\n`;
    }
    function genSectionHtmlFile(sectionName) {
        let htmlFile = new DOMParser().parseFromString(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><link href="style.css" type="text/css" rel="stylesheet"/><title>${sectionName}</title></head><body><div class="main"><h1>${sectionName}</h1></div></body></html>`, "text/html");
        return new Blob([htmlFile.documentElement.outerHTML], {
            type: "text/html; charset=UTF-8",
        });
    }
    function genHtmlFile(chapterName, DOM) {
        var _a;
        let htmlFile = new DOMParser().parseFromString(`<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator" content="https://github.com/yingziwu/novel-downloader"><link href="style.css" type="text/css" rel="stylesheet"/><title>${chapterName}</title></head><body><div class="main"><h2>${chapterName}</h2></div></body></html>`, "text/html");
        (_a = htmlFile.querySelector(".main")) === null || _a === void 0 ? void 0 : _a.appendChild(DOM);
        return new Blob([htmlFile.documentElement.outerHTML], {
            type: "text/html; charset=UTF-8",
        });
    }
    const chapters = book.chapters;
    chapters.sort(chapterSort);
    let savedTextArray = [];
    let savedZip = new JSZip();
    let infoText = `题名：${book.bookname}\n作者：${book.author}\n简介：${book.introduction}\n来源：${book.bookUrl}\n下载时间：${new Date().toISOString()}\n本文件由小说下载器生成，软件地址：https://github.com/yingziwu/novel-downloader\n\n`;
    savedTextArray.push(infoText);
    if (book.additionalMetadate.cover) {
        const cover = book.additionalMetadate.cover;
        if (cover.imageBlob) {
            savedZip.file(`cover.${cover.imageBlob.type.split("/").slice(-1)[0]}`, cover.imageBlob);
        }
        else {
            console.error("[save]图片下载失败！");
            console.error(cover);
        }
    }
    savedZip.file("info.txt", new Blob([infoText], { type: "text/plain;charset=utf-8" }));
    const styleCSS = `body {
  background-color: #f0f0f2;
  margin: 0;
  padding: 0;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
div.main {
  width: 900px;
  margin: 5em auto;
  padding: 2em;
  background-color: #fdfdff;
  border-radius: 0.5em;
  box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);
}
@media (max-width: 700px) {
  div.main {
    margin: 0 auto;
    width: auto;
  }
}
h1 {
  line-height: 130%;
  text-align: center;
  font-weight: bold;
  font-size: xxx-large;
  margin-top: 3.2em;
  margin-bottom: 3.3em;
}
h2 {
  line-height: 130%;
  text-align: center;
  font-weight: bold;
  font-size: x-large;
  margin-top: 1.2em;
  margin-bottom: 2.3em;
}
div {
  margin: 0px;
  padding: 0px;
  text-align: justify;
}
p {
  text-indent: 2em;
  display: block;
  line-height: 1.3em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}`;
    savedZip.file("style.css", new Blob([styleCSS], { type: "text/css;charset=utf-8" }));
    let preSectionName = "";
    for (const c of chapters) {
        if (c.status === main_1.Status.finished) {
            const sectionName = c.sectionName;
            const chapterName = c.chapterName
                ? c.chapterName
                : c.chapterNumber.toString();
            const contentText = c.contentText;
            const contentHTML = c.contentHTML;
            const contentImages = c.contentImages;
            const fileNameBase = `${"0".repeat(chapters.length.toString().length - c.chapterNumber.toString().length)}${c.chapterNumber.toString()}.html`;
            if (sectionName && contentText && sectionName !== preSectionName) {
                savedTextArray.push(genSectionText(sectionName));
                savedZip.file(`Section${fileNameBase}`, genSectionHtmlFile(sectionName));
            }
            preSectionName = sectionName;
            if (contentText) {
                savedTextArray.push(genChapterText(chapterName, contentText));
            }
            if (contentHTML) {
                savedZip.file(`Chapter${fileNameBase}`, genHtmlFile(chapterName, contentHTML));
            }
            if (contentImages !== null) {
                for (const image of contentImages) {
                    addImageToZip(image, savedZip);
                }
            }
        }
    }
    console.debug("[save]开始保存");
    const saveFileNameBase = `[${book.author}]${book.bookname}`;
    const savedText = savedTextArray.join("\n");
    saveAs(new Blob([savedText], { type: "text/plain;charset=utf-8" }), `${saveFileNameBase}.txt`);
    savedZip
        .generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
            level: 6,
        },
    }, (metadata) => updateProgress(finishedChapterNumber, totalChapterNumber, metadata.percent))
        .then((blob) => {
        saveAs(blob, `${saveFileNameBase}.zip`);
    })
        .catch((err) => console.error("saveZip: " + err));
}
function setTabMark() {
    return new Promise((resolve, reject) => {
        GM_getTab((curTabObject) => {
            curTabObject.novel_downloader =
                document.location.href;
            GM_saveTab(curTabObject);
            resolve(curTabObject);
        });
    });
}
function getNowRunNumber() {
    return new Promise((resolve, reject) => {
        GM_getTabs((curTabObjects) => {
            let nowRunNumber = 0;
            for (let i in curTabObjects) {
                const novel_downloader_url = curTabObjects[i]
                    .novel_downloader;
                if (novel_downloader_url !== undefined &&
                    new URL(novel_downloader_url).hostname === document.location.hostname) {
                    nowRunNumber++;
                }
            }
            resolve(nowRunNumber);
        });
    });
}
function removeTabMark() {
    return new Promise((resolve, reject) => {
        GM_getTab((curTabObject) => {
            if (curTabObject.novel_downloader) {
                delete curTabObject.novel_downloader;
            }
            GM_saveTab(curTabObject);
            resolve(curTabObject);
        });
    });
}
let totalChapterNumber;
let finishedChapterNumber = 0;
function updateProgress(finishedChapterNumber, totalChapterNumber, zipPercent) {
    if (!document.querySelector("#nd-progress")) {
        console.debug("[progress]初始化进度条");
        let progress = document.createElement("div");
        progress.id = "nd-progress";
        progress.innerHTML = `
        <div id='chapter-progress' title="章节"></div>
        <div id='zip-progress' title="ZIP"></div>
        `;
        let progressStyle = document.createElement("style");
        progressStyle.innerHTML = `#nd-progress {
    position: fixed;
    bottom: 8%;
    right: 3%;
    z-index: 99;
    border-style: none;
    text-align: center;
    vertical-align: baseline;
    background-color: rgba(210, 210, 210, 0.2);
    padding: 6px;
    border-radius: 12px;
}
#chapter-progress{
    --color:green;
    --position:0%;
    width:200px;
    height:10px;
    border-radius:30px;
    background-color:#ccc;
    background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));
    background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));
    background-size:100% ,var(--position);
    background-repeat: no-repeat;
}
#zip-progress{
    --color:yellow;
    --position:0%;
    width:200px;
    height:10px;
    border-radius:30px;
    background-color:#ccc;
    background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));
    background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));
    background-size:100% ,var(--position);
    background-repeat: no-repeat;
    margin-top: 5px;
}`;
        document.head.appendChild(progressStyle);
        document.body.appendChild(progress);
    }
    let pagePercent = `${(finishedChapterNumber / totalChapterNumber) * 100}%`;
    document.querySelector("#chapter-progress").style.cssText = `--position:${pagePercent};`;
    if (zipPercent) {
        document.querySelector("#zip-progress").style.cssText = `--position:${zipPercent}%;`;
    }
    else {
        document.querySelector("#zip-progress").style.cssText =
            "display:none;";
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[run]下载开始`);
        const rule = rules_1.getRule();
        let maxRunLimit = null;
        let nowRunNumber;
        try {
            yield setTabMark();
            nowRunNumber = yield getNowRunNumber();
        }
        catch (error) { }
        if (rule.maxRunLimit !== undefined && nowRunNumber !== undefined) {
            maxRunLimit = rule.maxRunLimit;
            if (nowRunNumber > maxRunLimit) {
                const alertText = `当前网站目前已有${nowRunNumber - 1}个下载任务正在运行，当前站点最多允许${maxRunLimit}下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
                alert(alertText);
                console.log(`[run]${alertText}`);
                return;
            }
        }
        const book = yield initBook(rule);
        totalChapterNumber = book.chapters.filter((chapter) => chapter.status === main_1.Status.pending).length;
        yield initChapters(rule, book);
        save(book);
        try {
            yield removeTabMark();
        }
        catch (error) { }
        console.log(`[run]下载完毕`);
        return book;
    });
}
function catchError(error) {
    var _a;
    downloading = false;
    removeTabMark();
    (_a = document.getElementById("novel-downloader")) === null || _a === void 0 ? void 0 : _a.remove();
    console.error("运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
    console.error(error);
}
function addButton() {
    let button = document.createElement("button");
    button.id = "novel-downloader";
    button.style.cssText = `position: fixed; top: 15%; right: 5%; z-index: 99; border-style: none; text-align:center; vertical-align:baseline; background-color: rgba(128, 128, 128, 0.2); padding: 5px; border-radius: 12px;`;
    let img = document.createElement("img");
    img.src = rules_1.icon0;
    img.style.cssText = "height: 2em;";
    button.onclick = function () {
        if (downloading) {
            alert("正在下载中，请耐心等待……");
        }
        else {
            downloading = true;
            img.src = rules_1.icon1;
            try {
                run()
                    .then((book) => {
                    downloading = false;
                    img.src = rules_1.icon0;
                })
                    .catch(catchError);
            }
            catch (error) {
                catchError(error);
            }
        }
    };
    button.appendChild(img);
    document.body.appendChild(button);
}
function debug() {
    return __awaiter(this, void 0, void 0, function* () {
        const rule = rules_1.getRule();
        const book = yield initBook(rule);
        unsafeWindow.rule = rule;
        unsafeWindow.book = book;
        unsafeWindow.save = save;
        unsafeWindow.saveAs = saveAs;
        return;
    });
}
let downloading = false;
const enaleDebug = false;
window.addEventListener("DOMContentLoaded", () => {
    printEnvironments();
    addButton();
    if (enaleDebug) {
        debug();
    }
});


/***/ }),

/***/ 563:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sleep = exports.concurrencyRun = exports.gfetch = exports.rm = exports.cosCompare = exports.getHtmlDOM = exports.getHtmlText = exports.cleanDOM = void 0;
const main_1 = __webpack_require__(519);
class CleanerClass {
    constructor(imgMode) {
        this.imgMode = imgMode;
        this.statusType = {
            init: this.parse_init,
            p: this.parse_p,
            br: this.parse_br,
            hr: this.parse_hr,
        };
        this.typeParagraph = [
            "DIV",
            "P",
            "OL",
            "H1",
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
        ];
        this.typeInto = ["IMG", "HR", "BR"];
        this.currentHtml = document.createElement("p");
        this.currentText = "";
        this.br_count = 0;
        this.images = [];
        this.doms = [];
        this.texts = [];
        this.status = "init";
    }
    reset_current() {
        this.currentHtml = document.createElement("p");
        this.currentText = "";
    }
    create_pbr() {
        const p = document.createElement("p");
        const br = document.createElement("br");
        p.appendChild(br);
        return p;
    }
    parse_init(element) {
        var _a, _b;
        const nodeName = element.nodeName;
        if (nodeName === "#text" && ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== "") {
            this.br_count = 0;
            this.status = "p";
            this.currentText += (_b = element.textContent) === null || _b === void 0 ? void 0 : _b.trim();
        }
        else if (this.typeParagraph.includes(nodeName)) {
            this.meet_p(element, nodeName);
        }
        else if (nodeName === "BR") {
            this.br_count++;
            this.status = "br";
        }
        else if (nodeName === "IMG") {
            this.meet_img(element);
        }
        else if (nodeName === "HR") {
            this.meet_hr();
        }
    }
    parse_p(element) {
        const nodeName = element.nodeName;
        if (nodeName === "BR") {
            this.br_count++;
            this.status = "br";
            this.currentText += "\n";
        }
        else if (this.typeParagraph.includes(nodeName)) {
            this.meet_p(element, nodeName);
        }
        else if (nodeName === "IMG") {
            this.meet_img(element);
        }
        else if (nodeName === "HR") {
            this.meet_hr();
        }
    }
    parse_br(element) {
        var _a, _b;
        const nodeName = element.nodeName;
        if (nodeName === "BR") {
            this.br_count++;
            if (this.br_count <= 4) {
                this.currentText += "\n";
            }
        }
        else if (nodeName === "#text" && ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== "") {
            this.meet_br_push();
            this.status = "p";
            this.currentText += (_b = element.textContent) === null || _b === void 0 ? void 0 : _b.trim();
        }
        else if (this.typeParagraph.includes(nodeName)) {
            if (this.br_count > 2) {
                this.doms.push(this.create_pbr());
            }
            this.meet_p(element, nodeName);
        }
        else if (nodeName === "HR") {
            this.meet_hr();
        }
    }
    parse_hr(element) {
        var _a, _b;
        const nodeName = element.nodeName;
        if (nodeName === "#text" && ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== "") {
            this.br_count = 0;
            this.status = "p";
            this.currentText += (_b = element.textContent) === null || _b === void 0 ? void 0 : _b.trim();
            this.currentHtml.innerText = this.currentText;
        }
        else if (this.typeParagraph.includes(nodeName)) {
            this.meet_p(element, nodeName);
        }
    }
    meet_p(element, nodeName) {
        var _a;
        this.br_count = 0;
        const childrenNodeNamesSet = new Set(Array.from(element.children).map((ele) => ele.nodeName));
        const typeParagraphSet = new Set(this.typeParagraph);
        const intersectParagraph = Array.from(childrenNodeNamesSet).filter((x) => typeParagraphSet.has(x));
        const typeIntoSet = new Set(this.typeInto);
        const intersectInto = Array.from(childrenNodeNamesSet).filter((x) => typeIntoSet.has(x));
        if (intersectParagraph.length !== 0 || intersectInto.length != 0) {
            this.meet_text_push();
            const subcleaner = new CleanerClass(this.imgMode);
            const subcleanerBound = subcleaner.clean.bind(this);
            subcleanerBound(element);
            this.status = "init";
        }
        else {
            this.status = "p";
            this.currentText += "\n".repeat(2);
            this.currentText += (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim();
            this.meet_text_push();
        }
    }
    meet_img(element) {
        function genImageName(url) {
            let t = btoa(new URL(url).pathname.split("/").slice(-2).join("/")) +
                `.${url.split(".").slice(-1)[0]}`;
            if (t.length >= 125) {
                t =
                    btoa(new URL(url).pathname.split("/").slice(-1)[0]) +
                        `.${url.split(".").slice(-1)[0]}`;
            }
            return t;
        }
        this.meet_br_push();
        this.br_count = 0;
        const imageUrl = element.src;
        const imageName = genImageName(imageUrl);
        const image = new main_1.ImageClass(imageUrl, imageName, this.imgMode);
        image.init();
        this.images.push(image);
        const pimg = document.createElement("p");
        const img = document.createElement("img");
        img.src = imageName;
        img.alt = imageUrl;
        pimg.appendChild(img);
        this.doms.push(pimg);
        this.texts.push(`\n![${img.alt}](${img.src})\n`);
    }
    meet_hr() {
        this.meet_br_push();
        this.br_count = 0;
        this.status = "hr";
        this.texts.push(`\n${"-".repeat(20)}\n`);
        const hr = document.createElement("hr");
        this.doms.push(hr);
    }
    meet_text_push() {
        this.currentHtml.innerText = this.currentText.trim();
        this.doms.push(this.currentHtml);
        this.texts.push(this.currentText);
        this.reset_current();
    }
    meet_br_push() {
        if (this.br_count === 1) {
            this.br_count = 0;
            this.meet_text_push();
        }
        else if (this.br_count === 2) {
            this.br_count = 0;
            this.meet_text_push();
        }
        else if (this.br_count >= 3) {
            this.br_count = 0;
            this.meet_text_push();
            this.doms.push(this.create_pbr());
        }
    }
    clean(DOM) {
        let i = 0;
        while (i < DOM.childNodes.length) {
            const fn = this.statusType[this.status].bind(this);
            fn(DOM.childNodes[i]);
            i++;
        }
        this.meet_text_push();
        return { doms: this.doms, texts: this.texts, images: this.images };
    }
}
function cleanDOM(DOM, imgMode) {
    const cleaner = new CleanerClass(imgMode);
    const { doms, texts, images } = cleaner.clean(DOM);
    const outputDOM = document.createElement("div");
    for (const dom of doms) {
        outputDOM.appendChild(dom);
    }
    let outputText = "";
    for (const t of texts) {
        outputText += t;
    }
    outputText = outputText.trim();
    return { dom: outputDOM, text: outputText, images: images };
}
exports.cleanDOM = cleanDOM;
function getHtmlText(url, charset, retryTime = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        if (charset === undefined) {
            return fetch(url).then((response) => response.text());
        }
        else {
            return fetch(url)
                .then((response) => response.arrayBuffer())
                .then((buffer) => {
                const decoder = new TextDecoder(charset);
                const text = decoder.decode(buffer);
                return text;
            });
        }
    });
}
exports.getHtmlText = getHtmlText;
function getHtmlDOM(url, charset) {
    return __awaiter(this, void 0, void 0, function* () {
        const htmlText = yield getHtmlText(url, charset);
        return new DOMParser().parseFromString(htmlText, "text/html");
    });
}
exports.getHtmlDOM = getHtmlDOM;
function cosCompare(a, b) {
    if (a.sectionNumber !== null && b.sectionNumber != null) {
        if (a.sectionNumber > b.sectionNumber) {
            return 1;
        }
        if (a.sectionNumber == b.sectionNumber) {
            if (a.sectionChapterNumber !== null && b.sectionChapterNumber !== null) {
                if (a.sectionChapterNumber > b.sectionChapterNumber) {
                    return 1;
                }
                if (a.sectionChapterNumber == b.sectionChapterNumber) {
                    return 0;
                }
                if (a.sectionChapterNumber < b.sectionChapterNumber) {
                    return -1;
                }
            }
        }
        if (a.sectionNumber < b.sectionNumber) {
            return -1;
        }
    }
    return 0;
}
exports.cosCompare = cosCompare;
function rm(selector, all = false, dom) {
    if (all) {
        let rs = dom.querySelectorAll(selector);
        rs.forEach((e) => e.remove());
    }
    else {
        let r = dom.querySelector(selector);
        if (r) {
            r.remove();
        }
    }
}
exports.rm = rm;
function gfetch(url, { method = "GET", headers, data, cookie, binary, nocache, revalidate, timeout, context, responseType, overrideMimeType, anonymous, username, password, } = {}) {
    return new Promise((resolve, reject) => {
        let _GM_xmlhttpRequest;
        try {
            _GM_xmlhttpRequest = GM_xmlhttpRequest;
        }
        catch (error) {
            try {
                _GM_xmlhttpRequest = GM.xmlHttpRequest;
            }
            catch (error) {
                console.error("未发现 _GM_xmlhttpRequest API");
            }
        }
        if (_GM_xmlhttpRequest) {
            _GM_xmlhttpRequest({
                url: url,
                method: method,
                headers: headers,
                data: data,
                cookie: cookie,
                binary: binary,
                nocache: nocache,
                revalidate: revalidate,
                timeout: timeout,
                context: context,
                responseType: responseType,
                overrideMimeType: overrideMimeType,
                anonymous: anonymous,
                username: username,
                password: password,
                onload: (obj) => {
                    resolve(obj);
                },
                onerror: (err) => {
                    reject(err);
                },
            });
        }
        else {
            throw new Error("未发现 _GM_xmlhttpRequest API");
        }
    });
}
exports.gfetch = gfetch;
function concurrencyRun(list, limit, asyncHandle) {
    function recursion(arr) {
        return asyncHandle(arr.shift()).then(() => {
            if (arr.length !== 0) {
                return recursion(arr);
            }
            else {
                return "finish!";
            }
        });
    }
    let listCopy = [...list];
    let asyncList = [];
    while (limit--) {
        asyncList.push(recursion(listCopy));
    }
    return Promise.all(asyncList);
}
exports.concurrencyRun = concurrencyRun;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;


/***/ }),

/***/ 519:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageClass = exports.Chapter = exports.Book = exports.Status = void 0;
const rules_1 = __webpack_require__(489);
const lib_1 = __webpack_require__(563);
var Status;
(function (Status) {
    Status[Status["pending"] = 0] = "pending";
    Status[Status["downloading"] = 1] = "downloading";
    Status[Status["failed"] = 2] = "failed";
    Status[Status["finished"] = 3] = "finished";
    Status[Status["aborted"] = 4] = "aborted";
})(Status = exports.Status || (exports.Status = {}));
class Book {
    constructor(bookUrl, bookname, author, introduction, additionalMetadate, chapters) {
        this.bookUrl = bookUrl;
        this.bookname = bookname;
        this.author = author;
        this.introduction = introduction;
        this.additionalMetadate = additionalMetadate;
        this.chapters = chapters;
        console.debug("[Book]初始化完成");
    }
}
exports.Book = Book;
class Chapter {
    constructor(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, charset) {
        this.bookUrl = bookUrl;
        this.bookname = bookname;
        this.chapterUrl = chapterUrl;
        this.chapterNumber = chapterNumber;
        this.chapterName = chapterName;
        this.isVIP = isVIP;
        this.isPaid = isPaid;
        this.sectionName = sectionName;
        this.sectionNumber = sectionNumber;
        this.sectionChapterNumber = sectionChapterNumber;
        this.chapterParse = chapterParse;
        this.charset = charset;
        this.status = Status.pending;
        this.retryTime = 0;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.parse();
            const { chapterName, contentRaw, contentText, contentHTML, contentImages, } = obj;
            this.chapterName = chapterName;
            this.contentRaw = contentRaw;
            this.contentText = contentText;
            this.contentHTML = contentHTML;
            this.contentImages = contentImages;
            console.debug(`[Chapter]${this.chapterName} 解析完成。`);
            return obj;
        });
    }
    parse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = Status.downloading;
            return this.chapterParse(this.chapterUrl, this.chapterName, this.isVIP, this.isPaid, this.charset)
                .then((obj) => {
                this.status = Status.finished;
                return obj;
            })
                .catch((err) => {
                this.retryTime++;
                console.error(`[Chapter]${this.chapterName}解析出错，第${this.retryTime}次重试，章节地址：${this.chapterUrl}`);
                if (this.status !== Status.failed && this.retryTime < rules_1.retryLimit) {
                    return this.parse();
                }
                else {
                    this.status = Status.failed;
                    console.error(err);
                    return {
                        chapterName: this.chapterName,
                        contentRaw: null,
                        contentText: null,
                        contentHTML: null,
                        contentImages: null,
                    };
                }
            });
        });
    }
}
exports.Chapter = Chapter;
class ImageClass {
    constructor(imageUrl, name, mode) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.mode = mode;
        this.status = Status.pending;
        this.retryTime = 0;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mode === "naive") {
                this.imageBlob = yield this.downloadImage();
            }
            else {
                this.imageBlob = yield this.tmDownloadImage();
            }
            console.debug(`[Image] ${this.imageUrl} 下载完成。`);
            return this.imageBlob;
        });
    }
    downloadImage() {
        this.status = Status.downloading;
        return fetch(this.imageUrl)
            .then((response) => {
            if (response.ok) {
                this.status = Status.finished;
                return response.blob();
            }
            else {
                throw new Error(`Image request response is not ok!\nImage url: ${this.imageUrl} .`);
            }
        })
            .catch((err) => {
            this.retryTime++;
            console.error(`[Image]下载 ${this.imageUrl} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`);
            if (this.status !== Status.failed && this.retryTime < rules_1.retryLimit) {
                return this.downloadImage();
            }
            else {
                this.status = Status.failed;
                console.error(err);
                return null;
            }
        });
    }
    tmDownloadImage() {
        this.status = Status.downloading;
        return lib_1.gfetch(this.imageUrl, { responseType: "blob" })
            .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                this.status = Status.finished;
                return response.response;
            }
            else {
                throw new Error(`Bad response!\nRequest url: ${this.imageUrl}`);
            }
        })
            .catch((err) => {
            this.retryTime++;
            console.error(`[Image]下载 ${this.imageUrl} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`);
            if (this.status !== Status.failed && this.retryTime < rules_1.retryLimit) {
                return this.tmDownloadImage();
            }
            else {
                this.status = Status.failed;
                console.error(err);
                return null;
            }
        });
    }
}
exports.ImageClass = ImageClass;


/***/ }),

/***/ 489:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRule = exports.icon1 = exports.icon0 = exports.retryLimit = void 0;
const ciweimao_1 = __webpack_require__(444);
const uukanshu_1 = __webpack_require__(623);
const yruan_1 = __webpack_require__(514);
const biquge_1 = __webpack_require__(931);
const xkzw_1 = __webpack_require__(441);
exports.retryLimit = 5;
exports.icon0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFSQAABUkBt3pUAAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAbTSURBVHic7Z1ZqFZVFMd/V69zaY4lIagNoqXVbU4boEkbtCSDSMKSxEJfywahxyIrfMmMoIEyQhBMshIq8yGnBoqKZkyTMknKofR6r7eH3YVPu373nL33d/aw1g/2g9xvn7XO3n/3sM4emvBLD2AmMAu4GDgZ6OvZhi86gF3Ab8DPwHpgHfB1QJ+SpgX4AlOwKadtwCJgiNfSyZwbgQOErzyf6QCwFBjosZyyZCKwj/AV1qi0HZjqrbQyZAPhK6mKtBQzxlFqmEz4iqkyrSGzLsFV0TO8eJEONwEbgdNCO+ILVwFM8OJFWkwAtgDXhHbEB64CGO7Fi/QYArwNLAjtSGg+Jny/HDo9D/R2LchQ6KjWnXuB9zFRz+RQAfyfxUBbyTyTgU3AJP/uxE2OXcBAYArwq0Xe/ZhvIWLIVQAAp2KmfGXzHwEeR0jrmrMAAPoAyy2fsxIYYFOoKZG7ADq5C/jb4lmfA6PLFGhqbCV8hVUhADCfu7dZPG83cFXB8kwOSQIAGAa8Z/HMQ8A9hUo0MaQJAKAZM8izefZyoFd3hZoSEgXQyR3YLYJZBwwuaCN6JAsA4BzgRwsb35PJhzTpAgDzYehdCzt7geklbUWHCsDQE3gMEwQqY6sNeNDCXjSoAI5mOvCnhc0VQD8Hu8HYQvgKi0kAAOMwewvK2t0IjHS0XTkqgK45EVhlYXsncKEH+5WhAjg+TZj+vb2k/X8woeckUAF0zw3AnpI+JPNFUQVQjNOx2zb3FjCoAf54QwVQnBOANyz8+QYzsIwSFUB55gGtJX36A7i6wX5ZsZnwFZaaAMDsKdhd0q9WYH4FvpVCBWDPaOATC/8ersi/QqgA3OgHvGzh4+wKfaxLjgI4yWsJFWMh5cYF+4hkqdkmwleY73SG1xIqzuWUW4q+OoybR5OjAG7xWkLlKLsU/RJXg66RpiZXByIkZP+6E9MSPFHw9wsb6EshcmwB2oFpPgvJkrnAQer7ehDz4SkYOQqgA7MHYB7hd/1eBOygvq9OW9Fcm/BNmPMAc+V3zDtuxywADcEIYA7Hr6sngQdsH95sm1EII4h/3d54l8yug8AOx/yKO0NdMussIH2cxinRLzhQGosKQDg6BhCOtgDCUQEIR1Ic4BfgW4p1W6MxCzmzx1UAKYwB9gB3Au+UzNcCvA6c6d2jiJDQBSygfOUDfIqJs7f6dScucg8EtWK2aNnyFeYgrGzJfRq4C3M+jwvbPPgRLRK6AKUOKgDhqACEowIQjgpAOCoA4agAhJN7HEDpBm0BhKMCEI4KQDgqAOGoAISjAhCOCkA4GgcQjrYAwlEBCEcFIBwVgHBUAMJRAQhHp4HC0RZAOCoA4agAhJPS7uAjwFrMFu+2gnn+8mB3DeawxiI0AWOBm4E+HmxHzwaqO71zVkXv5IPLgMNUUy5Om1dT6QJ2ACtDO1GCjzAnjEZPKgLoj7mgOSWqvHnEmlQEMBRzeHMqTAMmhXaiCqocA+wnjeNaBmMOl66qXESMAQAGAK8BvUI70g3PAaNCO1GUlAQAcAGRXZt2DHOA20M7USVVdgGd6TAe7sppAGMwcYeqy0NMF9BJM6YrCHpVyjH0AF4kkZF/LSkKAEy0bUloJ2pYBFwZ2okQfEj1TV5tiuE2j/MwJ5GFKgNxXUAtLwCnBLTfF3iF8JdLWZO6AIZj+t5QB1YuAc4OZNsLqQsAYCphooTXAvcHsOuVHAQA8DQwrkJ7wzC3fsd+VG635CKA/lQbJXwWGFmRrYaSiwAAzgcercDO3aS1NqGhhJ4GdhUlvLSB7xsq2hftNLDDMb9vmoFXaUyUMNloXz1y6gI6GYsZFPrmIYRG++qxnvBN4PHSbR7fs4Ww0b5ou4CYWYafKGHy0b565CyAYcBLuM/VnwLOcvYmUnIWAMD1wHyH/NcB93nyJUpyFwCYeL1NlNBXCxI1uU0Du6I/sILyUcJson31kNACgBnFLy7x+7lotK8QHxB+GlQ0tQNXFHinMcDeCPzVaaBnemD69HqRvM7fxLTesKFIEgCY/93P1Pn7IxRrJZT/SKkLqE1d9e8tmKtmQ/uWVBfQ4Zg/FMuAiTX/HoXZfRz7riPvuB4QkSpDga2YW8UPYTZziun3a5EqADAneMwI7URopA0ClWNQAQhHBSAcFYBwpE4Dc6LokXldoi1A+uxyyewqAB8HMSpufOmS2VUAPznmV9x50yWzqwDWOuZX3FgPbA7pQBMmpBr6g4jEdIBIziIcT3zbpXJPB4GZRSqnKs4FfiB8wUhI3wFTilVL9/hc8dobmA3cijk1Y5Cn5/Yks/14JWnDTPU+A1ZhtsG3+nr4v9GhBc6CW0iCAAAAAElFTkSuQmCC";
exports.icon1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAANSAAADUgEQACRKAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAUdQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiYSOVQAAAGx0Uk5TAAECAwQFCAkKCwwNDhETFRkaHB0fICMkKCwwNTg5PD1AQUZKTk9QV1tcX2BjZGhtb3B2eHl6fX6AgYKHi4+QlJicnaChpamur7C3uru+v8LEyMzP0NXZ3N3f4OTn6uvt7/Hy8/T2+Pn6/P3+VI4wmgAAAyxJREFUeNrtmVdT4zAUhTFs6BB6Cb13WLpooffeQjW9hMT//3mVJbsT4li6ahbD6D4y5p5vzrGuFDkry5QpznLSygAYAANgAAyAATAABsAAGAADYAAMgAEwAD8XADlChTQTIM0eIM0pIM3vAdL8JiLNawFpXo1I8zxAmicS0jwTkeapjDTvC8r0gQQK9UEESvUBBIr1qQTK9SkESvR/wQkQ5V95KhS+Q1AC14N34ZCYenD0LGNjoH7ij2ejQV71QPd2lNQapI8rut0d4LMe0Bz4CHMUSetZCGgPMESRYj1cAGARMIqv1kMlgK8pNQq39TARBB8VhCgyW59S414y6frjxDYeUYTCNnnKHw4WeUxl1/wtGjwk97LToyBan6irmRrPfSHj/K+ZuSJ3TImCav3zaqvlvTN57T9W6+ozJAqa9fH9/gLS3kja/wr69+PUKMhGXUxVie0mVVMXZAUSwONys4ztvHn5kQcgttubJ+tEkde7G2MEiExUyD3VVExE4AAPS40qTlaNSw8QgI+dnlxVx8ncnp0PCsD5WJnaI23Z2Lk3wP1igx83jA2L998V4G8E5WrVy0kRfIeXMLkMm1TIN8GWYXIQTVbKVa+cjLCO4r2+fFnq+X17MZ7N6GmlxRJXt1pWnjh3Q1yX09Vi8tXTl/zb8eeB5GCgkFe9cOAgTutPBcD1stbGEYXVtvYCaA4BwHU9W8smXzt7DesMBMB1NFQMVS8eOgK3hQM4zut6ezZdPbt9/ZWhKQsArpu5OrJ83dwNW0dGAFzHwyVe6iXDx8zt2AEc522jI8etntOx8cbRjAcA1+18/Vf5+vlbvk6cALhORkr/qZeOnHC34QdwnPfNTvzjLtC5+S7QRAQg8eNuYcEW6yAIIF4GQD8A9W5IZX3eFQW6tqI61KNbXf9vy4K/T/2Wd90X+hqFnfHG1K8oUq1nuqpVZD3zjal865nvjBVY74pC/qpg/nYkNQqb6+uZrChYrFcQhcBnOwlR2KIfLoUGlIj1EgaUsPVCUcixnjcKmdZzRCHdeqYo1FgPjUKl9YAolFtPjMIf672i8NP6DFH4br2pH1d/AAm28mJJn9pPAAAAAElFTkSuQmCC";
function getRule() {
    const host = document.location.host;
    let ruleClass;
    switch (host) {
        case "www.ciweimao.com":
            ruleClass = ciweimao_1.ciweimao;
            break;
        case "www.uukanshu.com":
            ruleClass = uukanshu_1.uukanshu;
            break;
        case "www.yruan.com":
            ruleClass = yruan_1.yrun;
            break;
        case "www.biquwoo.com":
            ruleClass = biquge_1.biquwo;
            break;
        case "www.shuquge.com":
            ruleClass = biquge_1.shuquge;
            break;
        case "www.dingdiann.net":
            ruleClass = biquge_1.dingdiann;
            break;
        case "www.xkzw.org":
            ruleClass = xkzw_1.xkzw;
            break;
        case "www.266ks.com":
            ruleClass = biquge_1.c226ks;
            break;
        default:
            throw new Error("Not Found Rule!");
    }
    const rule = new ruleClass();
    return rule;
}
exports.getRule = getRule;


/***/ }),

/***/ 931:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c226ks = exports.dingdiann = exports.shuquge = exports.biquwo = void 0;
const main_1 = __webpack_require__(519);
const lib_1 = __webpack_require__(563);
class biquwo {
    constructor() {
        this.imageMode = "TM";
    }
    bookParse(chapterParse) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookUrl = document.location.href;
            const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
            const author = (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim();
            let introduction;
            const introDom = document.querySelector("#intro");
            if (introDom === null) {
                introduction = null;
            }
            else {
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "TM");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = document.querySelector("#fmimg > img")
                .src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "TM");
            additionalMetadate.cover.init();
            const chapters = [];
            const dl = document.querySelector("#list>dl");
            if (dl === null || dl === void 0 ? void 0 : dl.childElementCount) {
                const dlc = Array.from(dl.children);
                if (dlc[0].nodeName === "DT" &&
                    dlc[0].innerText.includes("最新章节")) {
                    for (let i = 0; i < (dl === null || dl === void 0 ? void 0 : dl.childElementCount); i++) {
                        if (i !== 0 && dlc[i].nodeName === "DT") {
                            delete dlc[0];
                            break;
                        }
                        delete dlc[i];
                    }
                }
                const chapterList = dlc.filter((obj) => obj !== undefined);
                let chapterNumber = 0;
                let sectionNumber = 0;
                let sectionName = null;
                let sectionChapterNumber = 0;
                for (let i = 0; i < chapterList.length; i++) {
                    const node = chapterList[i];
                    if (node.nodeName === "DT") {
                        sectionNumber++;
                        sectionChapterNumber = 0;
                        sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
                    }
                    else if (node.nodeName === "DD") {
                        chapterNumber++;
                        sectionChapterNumber++;
                        const a = node.firstElementChild;
                        const chapterName = a.innerText;
                        const chapterUrl = a.href;
                        const isVIP = false;
                        const isPaid = false;
                        const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, "UTF-8");
                        chapters.push(chapter);
                    }
                }
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = yield lib_1.getHtmlDOM(chapterUrl, charset);
            chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
            const content = dom.querySelector("#content");
            if (content) {
                let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                };
            }
            else {
                return {
                    chapterName: chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                };
            }
        });
    }
}
exports.biquwo = biquwo;
class shuquge {
    constructor() {
        this.imageMode = "TM";
    }
    bookParse(chapterParse) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookUrl = document.location.href;
            const bookname = (document.querySelector(".info > h2")).innerText.trim();
            const author = (document.querySelector(".small > span:nth-child(1)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim();
            let introduction;
            const introDom = document.querySelector(".intro");
            if (introDom === null) {
                introduction = null;
            }
            else {
                introDom.innerHTML = introDom.innerHTML.replace(/推荐地址：http:\/\/www.shuquge.com\/txt\/\d+\/index\.html/, "");
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "TM");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = (document.querySelector(".info > .cover > img")).src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "TM");
            additionalMetadate.cover.init();
            const chapters = [];
            const dl = document.querySelector(".listmain>dl");
            if (dl === null || dl === void 0 ? void 0 : dl.childElementCount) {
                const dlc = Array.from(dl.children);
                if (dlc[0].nodeName === "DT" &&
                    dlc[0].innerText.includes("最新章节")) {
                    for (let i = 0; i < (dl === null || dl === void 0 ? void 0 : dl.childElementCount); i++) {
                        if (i !== 0 && dlc[i].nodeName === "DT") {
                            delete dlc[0];
                            break;
                        }
                        delete dlc[i];
                    }
                }
                const chapterList = dlc.filter((obj) => obj !== undefined);
                let chapterNumber = 0;
                let sectionNumber = 0;
                let sectionName = null;
                let sectionChapterNumber = 0;
                for (let i = 0; i < chapterList.length; i++) {
                    const node = chapterList[i];
                    if (node.nodeName === "DT") {
                        sectionNumber++;
                        sectionChapterNumber = 0;
                        sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
                    }
                    else if (node.nodeName === "DD") {
                        chapterNumber++;
                        sectionChapterNumber++;
                        const a = node.firstElementChild;
                        const chapterName = a.innerText;
                        const chapterUrl = a.href;
                        const isVIP = false;
                        const isPaid = false;
                        const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, "UTF-8");
                        chapters.push(chapter);
                    }
                }
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = yield lib_1.getHtmlDOM(chapterUrl, charset);
            chapterName = (dom.querySelector(".content > h1:nth-child(1)")).innerText.trim();
            const content = dom.querySelector("#content");
            if (content) {
                content.innerHTML = content.innerHTML
                    .replace("请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com", "")
                    .replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
                let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                };
            }
            else {
                return {
                    chapterName: chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                };
            }
        });
    }
}
exports.shuquge = shuquge;
class dingdiann {
    constructor() {
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    bookParse(chapterParse) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookUrl = document.location.href;
            const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
            const author = (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim();
            let introduction;
            const introDom = document.querySelector("#intro");
            if (introDom === null) {
                introduction = null;
            }
            else {
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "TM");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = document.querySelector("#fmimg > img")
                .src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "TM");
            additionalMetadate.cover.init();
            const chapters = [];
            const dl = document.querySelector("#list>dl");
            if (dl === null || dl === void 0 ? void 0 : dl.childElementCount) {
                const dlc = Array.from(dl.children);
                if (dlc[0].nodeName === "DT" &&
                    dlc[0].innerText.includes("最新章节")) {
                    for (let i = 0; i < (dl === null || dl === void 0 ? void 0 : dl.childElementCount); i++) {
                        if (i !== 0 && dlc[i].nodeName === "DT") {
                            delete dlc[0];
                            break;
                        }
                        delete dlc[i];
                    }
                }
                const chapterList = dlc.filter((obj) => obj !== undefined);
                let chapterNumber = 0;
                let sectionNumber = 0;
                let sectionName = null;
                let sectionChapterNumber = 0;
                for (let i = 0; i < chapterList.length; i++) {
                    const node = chapterList[i];
                    if (node.nodeName === "DT") {
                        sectionNumber++;
                        sectionChapterNumber = 0;
                        sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
                    }
                    else if (node.nodeName === "DD") {
                        chapterNumber++;
                        sectionChapterNumber++;
                        const a = node.firstElementChild;
                        const chapterName = a.innerText;
                        const chapterUrl = a.href;
                        const isVIP = false;
                        const isPaid = false;
                        const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, "UTF-8");
                        chapters.push(chapter);
                    }
                }
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = yield lib_1.getHtmlDOM(chapterUrl, charset);
            chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
            const content = dom.querySelector("#content");
            const ad = '<div align="center"><a href="javascript:postError();" style="text-align:center;color:red;">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
            content.innerHTML = content.innerHTML
                .replace(ad, "")
                .replace(/http:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
            if (content) {
                let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                };
            }
            else {
                return {
                    chapterName: chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                };
            }
        });
    }
}
exports.dingdiann = dingdiann;
class c226ks {
    constructor() {
        this.imageMode = "TM";
    }
    bookParse(chapterParse) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookUrl = document.location.href.replace(/index_\d+\.html/, "index_1.html");
            const bookname = (document.querySelector(".info > .top > h1")).innerText.trim();
            const author = (document.querySelector(".info > .top > .fix > p:nth-child(1)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim();
            let introduction;
            const introDom = document.querySelector(".desc");
            if (introDom === null) {
                introduction = null;
            }
            else {
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "TM");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = document.querySelector(".imgbox > img")
                .src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "TM");
            additionalMetadate.cover.init();
            const chapters = [];
            const indexUrls = Array.from(document.querySelectorAll('[name="pageselect"] > option')).map((opt) => document.location.origin + opt.getAttribute("value"));
            let lis = [];
            for (const indexUrl of indexUrls) {
                const dom = yield lib_1.getHtmlDOM(indexUrl, "UTF-8");
                const ul = dom.querySelector("div.row.row-section > div > div:nth-child(4) > ul");
                if (ul === null || ul === void 0 ? void 0 : ul.childElementCount) {
                    lis = lis.concat(Array.from(ul.children));
                }
            }
            const chapterList = lis.filter((obj) => obj !== undefined);
            let chapterNumber = 0;
            for (let i = 0; i < chapterList.length; i++) {
                const node = chapterList[i];
                chapterNumber++;
                const a = node.firstElementChild;
                const chapterName = a.innerText;
                const chapterUrl = a.href;
                const isVIP = false;
                const isPaid = false;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, chapterParse, "UTF-8");
                chapters.push(chapter);
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = yield lib_1.getHtmlDOM(chapterUrl, charset);
            chapterName = dom.querySelector("h1.title").innerText.trim();
            const content = dom.querySelector("#content");
            const ad = '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
            content.innerHTML = content.innerHTML.replace(ad, "");
            if (content) {
                let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                };
            }
            else {
                return {
                    chapterName: chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                };
            }
        });
    }
}
exports.c226ks = c226ks;


/***/ }),

/***/ 444:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ciweimao = void 0;
const main_1 = __webpack_require__(519);
const lib_1 = __webpack_require__(563);
class ciweimao {
    constructor() {
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }
    bookParse(chapterParse) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const bookid = unsafeWindow.HB.book.book_id;
            const bookUrl = `https://www.ciweimao.com/book/${bookid}`;
            const bookname = (document.querySelector(".book-catalog .hd h3")).innerText.trim();
            const author = (document.querySelector(".book-catalog .hd > p > a")).innerText.trim();
            let introduction;
            const dom = yield lib_1.getHtmlDOM(bookUrl, undefined);
            const introDom = dom.querySelector(".book-intro-cnt .book-desc");
            if (introDom === null) {
                introduction = null;
            }
            else {
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "TM");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = dom.querySelector(".cover > img").src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "TM");
            additionalMetadate.cover.init();
            additionalMetadate.tags = Array.from(dom.querySelectorAll(".label-box > .label")).map((span) => span.innerText.trim());
            const chapters = [];
            const sections = document.querySelectorAll(".book-chapter > .book-chapter-box");
            const cos = [];
            for (let i = 0; i < sections.length; i++) {
                const s = sections[i];
                const sectionNumber = i + 1;
                const sectionName = s.querySelector(".sub-tit").innerText;
                const cs = s.querySelectorAll(".book-chapter-list > li > a");
                for (let j = 0; j < cs.length; j++) {
                    const c = cs[j];
                    const chapterName = c.innerText.trim();
                    const chapterUrl = c.href;
                    let isVIP = false;
                    let isPaid = false;
                    if (c.childElementCount) {
                        isVIP = true;
                        if (((_a = c.firstElementChild) === null || _a === void 0 ? void 0 : _a.className) === "icon-unlock") {
                            isPaid = true;
                        }
                    }
                    const co = {
                        bookUrl: bookUrl,
                        bookname: bookname,
                        chapterUrl: chapterUrl,
                        chapterName: chapterName,
                        isVIP: isVIP,
                        isPaid: isPaid,
                        sectionName: sectionName,
                        sectionNumber: sectionNumber,
                        sectionChapterNumber: j,
                    };
                    cos.push(co);
                }
            }
            cos.sort(lib_1.cosCompare);
            for (let i = 0; i < cos.length; i++) {
                const chapterNumber = i + 1;
                let { bookUrl, bookname, chapterUrl, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, } = cos[i];
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, "UTF-8");
                const isLogin = ((_b = document.querySelector(".login-info.ly-fr")) === null || _b === void 0 ? void 0 : _b.childElementCount) === 1
                    ? true
                    : false;
                if (isVIP && !(isLogin && isPaid)) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            function decrypt(item) {
                let message = item.content;
                let keys = item.keys;
                let len = item.keys.length;
                let accessKey = item.accessKey;
                let accessKeyList = accessKey.split("");
                let charsNotLatinNum = accessKeyList.length;
                let output = new Array();
                output.push(keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]);
                output.push(keys[accessKeyList[0].charCodeAt(0) % len]);
                for (let i = 0; i < output.length; i++) {
                    message = atob(message);
                    let data = output[i];
                    let iv = btoa(message.substr(0, 16));
                    let keys255 = btoa(message.substr(16));
                    let pass = CryptoJS.format.OpenSSL.parse(keys255);
                    message = CryptoJS.AES.decrypt(pass, CryptoJS.enc.Base64.parse(data), {
                        iv: CryptoJS.enc.Base64.parse(iv),
                        format: CryptoJS.format.OpenSSL,
                    });
                    if (i < output.length - 1) {
                        message = message.toString(CryptoJS.enc.Base64);
                        message = atob(message);
                    }
                }
                return message.toString(CryptoJS.enc.Utf8);
            }
            function getChapterAuthorSay() {
                return __awaiter(this, void 0, void 0, function* () {
                    const doc = yield lib_1.getHtmlDOM(chapterUrl, undefined);
                    const _chapter_author_says = doc.querySelectorAll("#J_BookCnt .chapter.author_say");
                    let div_chapter_author_say;
                    if (_chapter_author_says.length !== 0) {
                        let hr = document.createElement("hr");
                        div_chapter_author_say = document.createElement("div");
                        div_chapter_author_say.appendChild(hr);
                        for (let _chapter_author_say of Array.from(_chapter_author_says)) {
                            lib_1.rm("i", true, _chapter_author_say);
                            div_chapter_author_say.appendChild(_chapter_author_say);
                        }
                    }
                    return div_chapter_author_say;
                });
            }
            const chapter_id = chapterUrl.split("/").slice(-1)[0];
            function publicChapter() {
                return __awaiter(this, void 0, void 0, function* () {
                    function chapterDecrypt(chapter_id, refererUrl) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const rootPath = "https://www.ciweimao.com/";
                            const access_key_url = rootPath + "chapter/ajax_get_session_code";
                            const chapter_content_url = rootPath + "chapter/get_book_chapter_detail_info";
                            console.debug(`[Chapter]请求 ${access_key_url} Referer ${refererUrl}`);
                            const access_key_obj = yield lib_1.gfetch(access_key_url, {
                                method: "POST",
                                headers: {
                                    Accept: "application/json, text/javascript, */*; q=0.01",
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                    Referer: refererUrl,
                                    Origin: "https://www.ciweimao.com",
                                    "X-Requested-With": "XMLHttpRequest",
                                },
                                data: `chapter_id=${chapter_id}`,
                                responseType: "json",
                            }).then((response) => response.response);
                            const chapter_access_key = access_key_obj
                                .chapter_access_key;
                            console.debug(`[Chapter]请求 ${chapter_content_url} Referer ${refererUrl}`);
                            const chapter_content_obj = yield lib_1.gfetch(chapter_content_url, {
                                method: "POST",
                                headers: {
                                    Accept: "application/json, text/javascript, */*; q=0.01",
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                    Referer: refererUrl,
                                    Origin: "https://www.ciweimao.com",
                                    "X-Requested-With": "XMLHttpRequest",
                                },
                                data: `chapter_id=${chapter_id}&chapter_access_key=${chapter_access_key}`,
                                responseType: "json",
                            }).then((response) => response.response);
                            if (chapter_content_obj.code !== 100000) {
                                console.error(chapter_content_obj);
                                throw new Error(`下载 ${refererUrl} 失败`);
                            }
                            return decrypt({
                                content: chapter_content_obj.chapter_content,
                                keys: chapter_content_obj.encryt_keys,
                                accessKey: chapter_access_key,
                            });
                        });
                    }
                    const div_chapter_author_say = yield getChapterAuthorSay();
                    let content = document.createElement("div");
                    let decryptDate = yield chapterDecrypt(chapter_id, chapterUrl);
                    content.innerHTML = decryptDate;
                    lib_1.rm(".chapter span", true, content);
                    if (div_chapter_author_say) {
                        content.appendChild(div_chapter_author_say);
                    }
                    let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                    return {
                        chapterName: chapterName,
                        contentRaw: content,
                        contentText: text,
                        contentHTML: dom,
                        contentImages: images,
                    };
                });
            }
            function vipChapter() {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    const isLogin = ((_a = document.querySelector(".login-info.ly-fr")) === null || _a === void 0 ? void 0 : _a.childElementCount) === 1
                        ? true
                        : false;
                    if (isLogin && isPaid) {
                        function vipChapterDecrypt(chapter_id, refererUrl) {
                            return __awaiter(this, void 0, void 0, function* () {
                                const HB = unsafeWindow.HB;
                                const parentWidth = 871;
                                const setFontSize = "14";
                                const image_session_code_url = HB.config.rootPath + "chapter/ajax_get_image_session_code";
                                console.debug(`[Chapter]请求 ${image_session_code_url} Referer ${refererUrl}`);
                                const image_session_code_object = yield lib_1.gfetch(image_session_code_url, {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json, text/javascript, */*; q=0.01",
                                        Referer: refererUrl,
                                        Origin: "https://www.ciweimao.com",
                                        "X-Requested-With": "XMLHttpRequest",
                                    },
                                    responseType: "json",
                                }).then((response) => response.response);
                                if (image_session_code_object.code !==
                                    100000) {
                                    console.error(image_session_code_object);
                                    throw new Error(`下载 ${refererUrl} 失败`);
                                }
                                const imageCode = decrypt({
                                    content: image_session_code_object
                                        .image_code,
                                    keys: image_session_code_object
                                        .encryt_keys,
                                    accessKey: image_session_code_object
                                        .access_key,
                                });
                                const vipCHapterImageUrl = HB.config.rootPath +
                                    "chapter/book_chapter_image?chapter_id=" +
                                    chapter_id +
                                    "&area_width=" +
                                    parentWidth +
                                    "&font=undefined" +
                                    "&font_size=" +
                                    setFontSize +
                                    "&image_code=" +
                                    imageCode +
                                    "&bg_color_name=white" +
                                    "&text_color_name=white";
                                return vipCHapterImageUrl;
                            });
                        }
                        const div_chapter_author_say = yield getChapterAuthorSay();
                        const vipCHapterImageUrl = yield vipChapterDecrypt(chapter_id, chapterUrl);
                        console.debug(`[Chapter]请求 ${vipCHapterImageUrl} Referer ${chapterUrl}`);
                        const vipCHapterImageBlob = yield lib_1.gfetch(vipCHapterImageUrl, {
                            method: "GET",
                            headers: {
                                Referer: chapterUrl,
                                Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                            },
                            responseType: "blob",
                        }).then((response) => response.response);
                        const vipCHapterName = `vipCHapter${chapter_id}.png`;
                        const vipCHapterImage = new main_1.ImageClass(vipCHapterImageUrl, vipCHapterName, "TM");
                        if (vipCHapterImageBlob) {
                            vipCHapterImage.imageBlob = vipCHapterImageBlob;
                            vipCHapterImage.status = main_1.Status.finished;
                        }
                        const contentImages = [vipCHapterImage];
                        let ddom, dtext, dimages;
                        if (div_chapter_author_say) {
                            let { dom, text, images } = lib_1.cleanDOM(div_chapter_author_say, "TM");
                            [ddom, dtext, dimages] = [dom, text, images];
                        }
                        const img = document.createElement("img");
                        img.src = vipCHapterName;
                        img.alt = vipCHapterImageUrl;
                        const contentHTML = document.createElement("div");
                        contentHTML.appendChild(img);
                        if (ddom) {
                            contentHTML.appendChild(ddom);
                        }
                        let contentText = `VIP章节，请打开HTML文件查看。\n![${vipCHapterImageUrl}](${vipCHapterName})`;
                        if (dtext) {
                            contentText = contentText + "\n\n" + dtext;
                        }
                        return {
                            chapterName: chapterName,
                            contentRaw: contentHTML,
                            contentText: contentText,
                            contentHTML: contentHTML,
                            contentImages: contentImages,
                        };
                    }
                    else {
                        return {
                            chapterName: chapterName,
                            contentRaw: null,
                            contentText: null,
                            contentHTML: null,
                            contentImages: null,
                        };
                    }
                });
            }
            if (isVIP) {
                return vipChapter();
            }
            else {
                return publicChapter();
            }
        });
    }
}
exports.ciweimao = ciweimao;


/***/ }),

/***/ 623:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uukanshu = void 0;
const main_1 = __webpack_require__(519);
const lib_1 = __webpack_require__(563);
class uukanshu {
    constructor() {
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    bookParse(chapterParse) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const bookUrl = document.location.href;
            const bookname = (document.querySelector("dd.jieshao_content > h1 > a")).innerText
                .replace("最新章节", "")
                .trim();
            const author = (document.querySelector("dd.jieshao_content > h2 > a")).innerText.trim();
            let introduction;
            const introDom = (document.querySelector("dd.jieshao_content > h3"));
            if (introDom === null) {
                introduction = null;
            }
            else {
                introDom.innerHTML = introDom.innerHTML
                    .replace(/^.+简介：\s+www.uukanshu.com\s+/, "")
                    .replace(/\s+https:\/\/www.uukanshu.com/, "")
                    .replace(/－+/, "");
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "TM");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = (document.querySelector("a.bookImg > img")).src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "TM");
            additionalMetadate.cover.init();
            const chapters = [];
            const button = (document.querySelector('span[onclick="javascript:reverse(this);"]'));
            const reverse = unsafeWindow.reverse;
            if (button.innerText === "顺序排列") {
                reverse(button);
            }
            const chapterList = ((_a = document.getElementById("chapterList")) === null || _a === void 0 ? void 0 : _a.childNodes);
            if (chapterList && chapterList.length !== 0) {
                let chapterNumber = 0;
                let sectionNumber = 0;
                let sectionName = null;
                let sectionChapterNumber = 0;
                for (let i = 0; i < chapterList.length; i++) {
                    const li = chapterList[i];
                    if (li.className === "volume") {
                        sectionNumber++;
                        sectionChapterNumber = 0;
                        sectionName = li.innerText;
                    }
                    else {
                        chapterNumber++;
                        sectionChapterNumber++;
                        const a = li.firstElementChild;
                        const chapterName = a.innerText;
                        const chapterUrl = a.href;
                        const isVIP = false;
                        const isPaid = false;
                        const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, "GBK");
                        chapters.push(chapter);
                    }
                }
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = yield lib_1.getHtmlDOM(chapterUrl, charset);
            chapterName = dom.querySelector("#timu").innerText.trim();
            const content = dom.querySelector("#contentbox");
            if (content) {
                lib_1.rm(".ad_content", true, content);
                const contentReplace = [
                    /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[nｎ][eｅ][tｔ]/g,
                    /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[cＣｃ][oＯｏ][mＭｍ]/g,
                    /[UＵ]*看书[（\\(].*?[）\\)]文字首发。/,
                    "请记住本书首发域名：。",
                    "笔趣阁手机版阅读网址：",
                    "小说网手机版阅读网址：",
                    "https://",
                    "http://",
                ];
                for (let r of contentReplace) {
                    content.innerHTML = content.innerHTML.replace(r, "");
                }
                let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                };
            }
            else {
                return {
                    chapterName: chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                };
            }
        });
    }
}
exports.uukanshu = uukanshu;


/***/ }),

/***/ 441:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xkzw = void 0;
const main_1 = __webpack_require__(519);
const lib_1 = __webpack_require__(563);
class xkzw {
    constructor() {
        this.imageMode = "TM";
    }
    bookParse(chapterParse) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookUrl = document.location.href;
            const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
            const author = (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim();
            let introduction;
            const introDom = document.querySelector("#intro");
            if (introDom === null) {
                introduction = null;
            }
            else {
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "TM");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = document.querySelector("#fmimg > img")
                .src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "TM");
            additionalMetadate.cover.init();
            const chapters = [];
            const bookid = unsafeWindow.bookId;
            const siteChapterList = yield fetch("http://www.xkzw.org/action.php", {
                headers: {
                    accept: "application/json, text/javascript, */*",
                    "content-type": "application/x-www-form-urlencoded",
                    "x-requested-with": "XMLHttpRequest",
                },
                body: `action=clist&bookid=${bookid}`,
                method: "POST",
                mode: "cors",
                credentials: "include",
            }).then((response) => response.json());
            const dl = document.querySelector("#wrapper > div.box_con:nth-child(7) > div:nth-child(1) > dl:nth-child(1)");
            let tmpColumnName = "";
            let tmpColumnList = [];
            let tmpChapterList = [];
            if (dl === null || dl === void 0 ? void 0 : dl.childElementCount) {
                const dlc = Array.from(dl.children);
                for (let i = 0; i < dl.childElementCount; i++) {
                    const node = dlc[i];
                    if (i !== 0) {
                        if (node.nodeName === "DD") {
                            const a = node.firstElementChild;
                            const chapterName = a.innerText;
                            const chapterUrl = a.href;
                            const chapterid = chapterUrl
                                .split("/")
                                .slice(-1)[0]
                                .replace(".html", "");
                            tmpChapterList.push({
                                chapterid: Number(chapterid) - bookid * 11,
                                chaptername: chapterName,
                                isempty: 0,
                                originalurl: "",
                                currenturl: "",
                            });
                        }
                        else if (node.nodeName === "DT") {
                            const tmpColumnObj = {
                                columnname: tmpColumnName,
                                columnid: 0,
                                chapterlist: tmpChapterList,
                            };
                            tmpColumnList.push(tmpColumnObj);
                            tmpColumnName = node.innerText
                                .replace(`《${bookname}》`, "")
                                .trim();
                            tmpChapterList = [];
                        }
                    }
                    else {
                        tmpColumnName = node.innerText
                            .replace(`《${bookname}》`, "")
                            .trim();
                    }
                }
            }
            const tcl = tmpChapterList.length;
            for (let i = 0; i < tcl; i++) {
                const tmpChapterObject = tmpChapterList.pop();
                if (tmpChapterObject) {
                    siteChapterList.columnlist[0].chapterlist.unshift(tmpChapterObject);
                }
            }
            if (tmpColumnList.length !== 0) {
                const tmpColumnListLenght = tmpColumnList.length;
                for (let i = 0; i < tmpColumnListLenght; i++) {
                    const tmpColumnObject = tmpColumnList.pop();
                    if (tmpColumnObject) {
                        siteChapterList.columnlist.unshift(tmpColumnObject);
                    }
                }
            }
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionName = null;
            let sectionChapterNumber = 0;
            for (const column of siteChapterList.columnlist) {
                sectionNumber++;
                sectionName = column.columnname;
                for (const sitechapter of column.chapterlist) {
                    chapterNumber++;
                    sectionChapterNumber++;
                    const chapterName = sitechapter.chaptername;
                    const chapterUrl = bookUrl + (sitechapter.chapterid + bookid * 11) + ".html";
                    const isVIP = false;
                    const isPaid = false;
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, "UTF-8");
                    chapters.push(chapter);
                }
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            function runEval(CryptoJS) {
                function gettt1(str, keyStr, ivStr) {
                    let key = CryptoJS.enc.Utf8.parse(keyStr);
                    let iv = CryptoJS.enc.Utf8.parse(ivStr);
                    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                    let decrypt = CryptoJS.DES.decrypt(srcs, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7,
                    });
                    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                    return decryptedStr.toString();
                }
                function gettt2(str, keyStr, ivStr) {
                    let key = CryptoJS.enc.Utf8.parse(keyStr);
                    let iv = CryptoJS.enc.Utf8.parse(ivStr);
                    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7,
                    });
                    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                    return decryptedStr.toString();
                }
                function gettt3(str, keyStr, ivStr) {
                    let key = CryptoJS.enc.Utf8.parse(keyStr);
                    let iv = CryptoJS.enc.Utf8.parse(ivStr);
                    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                    let decrypt = CryptoJS.RC4.decrypt(srcs, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7,
                    });
                    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                    return decryptedStr.toString();
                }
                function getttn(str, keyStr, ivStr) {
                    let key = CryptoJS.enc.Utf8.parse(keyStr);
                    let iv = CryptoJS.enc.Utf8.parse(ivStr);
                    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                    let decrypt = CryptoJS.TripleDES.decrypt(srcs, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7,
                    });
                    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                    return decryptedStr.toString();
                }
                function showttt1(dom) {
                    let obj = dom.getElementById("other");
                    let objTips = dom.getElementById("contenttips");
                    if (obj) {
                        let content = obj.innerHTML.trim();
                        let type = parseInt(content.substring(0, 1));
                        let key;
                        let iv;
                        if (type === 1) {
                            key = content.substring(1, 9);
                            iv = content.substring(9, 17);
                            content = content.substring(17);
                            obj.innerHTML = gettt1(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) {
                                objTips.remove();
                            }
                        }
                        else if (type === 2) {
                            key = content.substring(1, 33);
                            iv = content.substring(33, 49);
                            content = content.substring(49);
                            obj.innerHTML = gettt2(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) {
                                objTips.remove();
                            }
                        }
                        else if (type === 3) {
                            key = content.substring(1, 9);
                            iv = content.substring(9, 17);
                            content = content.substring(17);
                            obj.innerHTML = gettt3(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) {
                                objTips.remove();
                            }
                        }
                        else {
                            key = content.substring(1, 25);
                            iv = content.substring(25, 33);
                            content = content.substring(33);
                            obj.innerHTML = getttn(content, key, iv);
                            obj.style.display = "block";
                            if (objTips) {
                                objTips.remove();
                            }
                        }
                    }
                }
                showttt1(dom);
            }
            const dom = yield lib_1.getHtmlDOM(chapterUrl, charset);
            runEval(CryptoJS);
            chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
            const content = dom.querySelector("#content");
            if (content) {
                let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                };
            }
            else {
                return {
                    chapterName: chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                };
            }
        });
    }
}
exports.xkzw = xkzw;


/***/ }),

/***/ 514:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.yrun = void 0;
const main_1 = __webpack_require__(519);
const lib_1 = __webpack_require__(563);
class yrun {
    constructor() {
        this.imageMode = "naive";
    }
    bookParse(chapterParse) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookUrl = document.location.href;
            const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
            const author = (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim();
            let introduction;
            const introDom = document.querySelector("#intro > p");
            if (introDom === null) {
                introduction = null;
            }
            else {
                let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = lib_1.cleanDOM(introDom, "naive");
                introduction = introCleantext;
            }
            const additionalMetadate = {};
            const coverUrl = document.querySelector("#fmimg > img")
                .src;
            additionalMetadate.cover = new main_1.ImageClass(coverUrl, `cover.${coverUrl.split(".").slice(-1)[0]}`, "naive");
            additionalMetadate.cover.init();
            const chapters = [];
            const chapterList = document.querySelectorAll("#list>dl>dd>a");
            if (chapterList && chapterList.length !== 0) {
                for (let i = 0; i < chapterList.length; i++) {
                    const a = chapterList[i];
                    const chapterName = a.innerText;
                    const chapterUrl = a.href;
                    const isVIP = false;
                    const isPaid = false;
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, i, chapterName, isVIP, isPaid, null, null, null, chapterParse, "UTF-8");
                    chapters.push(chapter);
                }
            }
            return {
                bookUrl: bookUrl,
                bookname: bookname,
                author: author,
                introduction: introduction,
                additionalMetadate: additionalMetadate,
                chapters: chapters,
            };
        });
    }
    chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset) {
        return __awaiter(this, void 0, void 0, function* () {
            const dom = yield lib_1.getHtmlDOM(chapterUrl, charset);
            chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
            const content = dom.querySelector("#content");
            if (content) {
                let { dom, text, images } = lib_1.cleanDOM(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                };
            }
            else {
                return {
                    chapterName: chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                };
            }
        });
    }
}
exports.yrun = yrun;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;