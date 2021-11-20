// ==UserScript==
// @name           小说下载器
// @version        4.4.11.327
// @author         bgme
// @description    一个可扩展的通用型小说下载器。
// @supportURL     https://github.com/yingziwu/novel-downloader
// @match          *://www.ciweimao.com/chapter-list/*
// @match          *://book.sfacg.com/Novel/*/MainIndex/
// @match          *://book.qidian.com/info/*
// @match          *://www.jjwxc.net/onebook.php?novelid=*
// @match          *://www.gongzicp.com/novel-*.html
// @match          *://gongzicp.com/novel-*.html
// @match          *://book.zongheng.com/showchapter/*.html
// @match          *://huayu.zongheng.com/showchapter/*.html
// @match          *://www.linovel.net/book/*.html
// @match          *://www.17k.com/list/*.html
// @match          *://www.shuhai.com/book/*.htm
// @match          *://mm.shuhai.com/book/*.htm
// @match          *://www.tadu.com/book/*
// @match          *://www.qimao.com/shuku/*/
// @match          *://sosad.fun/threads/*/profile*
// @match          *://wenzhan.org/threads/*/profile*
// @match          *://sosadfun.com/threads/*/profile*
// @match          *://xn--pxtr7m5ny.com/threads/*/profile*
// @match          *://xn--pxtr7m.com/threads/*/profile*
// @match          *://xn--pxtr7m5ny.net/threads/*/profile*
// @match          *://xn--pxtr7m.net/threads/*/profile*
// @match          *://sosadfun.link/threads/*/profile*
// @match          *://www.sosad.fun/threads/*/profile*
// @match          *://www.wenzhan.org/threads/*/profile*
// @match          *://www.sosadfun.com/threads/*/profile*
// @match          *://www.xn--pxtr7m5ny.com/threads/*/profile*
// @match          *://www.xn--pxtr7m.com/threads/*/profile*
// @match          *://www.xn--pxtr7m5ny.net/threads/*/profile*
// @match          *://www.xn--pxtr7m.net/threads/*/profile*
// @match          *://www.sosadfun.link/threads/*/profile*
// @match          *://www.uukanshu.com/b/*/
// @match          *://www.yruan.com/article/*.html
// @match          *://www.biquwoo.com/bqw*/
// @match          *://www.biquwo.org/bqw*/
// @match          *://www.shuquge.com/txt/*/index.html
// @match          *://m.shuquge.com/s/*.html
// @match          *://m.shuquge.com/d/*.html
// @match          *://www.sizhicn.com/txt/*/index.html
// @match          *://www.dingdiann.net/ddk*/
// @match          *://www.xkzw.org/xkzw*/
// @match          *://www.lewenn.com/lw*/
// @match          *://www.klxs.la/info-*/
// @match          *://www.266ks.com/*_*/
// @match          *://www.266ks.com/*_*/index*.html
// @match          *://www.hetushu.com/book/*/index.html
// @match          *://hetushu.com/book/*/index.html
// @match          *://www.shouda8.com/*/
// @match          *://www.shouda88.com/*/
// @match          *://www.gebiqu.com/biquge_*/
// @match          *://www.meegoq.com/book*.html
// @match          *://www.viviyzw.com/book*.html
// @match          *://www.xiaoshuodaquan.com/*/
// @match          *://www.1pwx.com/*/
// @match          *://1pwx.com/*/
// @match          *://www.81book.com/book/*/
// @match          *://www.81zw.com/book/*/
// @match          *://m.yuzhaige.cc/*/*/
// @match          *://m.yushuge123.com/*/*/
// @match          *://www.xinwanben.com/*/
// @match          *://m.xinwanben.com/*/
// @match          *://www.idejian.com/book/*/
// @match          *://www.wenku8.net/novel/*/*/index.htm
// @match          *://www.dmzj.com/info/*.html
// @match          *://manhua.dmzj.com/*/
// @match          *://www.westnovel.com/*/*/
// @match          *://www.mht.tw/*/
// @match          *://www.mht99.com/*/
// @match          *://www.bz01.org/*_*/
// @match          *://www.banzhuer.org/*_*/
// @match          *://www.xbiquge.so/book/*/
// @match          *://www.hongyeshuzhai.com/shuzhai/*/
// @match          *://www.linovelib.com/novel/*/catalog
// @match          *://www.luoqiuzw.com/book/*/
// @match          *://www.yibige.la/*/
// @match          *://www.fushuwang.org/*/*/*/*.html
// @match          *://www.fushuwang.org/*/*/*/*.html?*
// @match          *://www.soxscc.net/*/
// @match          *://www.soxscc.org/*/
// @match          *://www.soxs.cc/*/
// @match          *://www.soshuw.com/*/
// @match          *://www.soshuwu.org/*/
// @match          *://www.soxscc.cc/*/
// @match          *://www.soshuwu.com/*/
// @match          *://www.kubiji.net/*/
// @match          *://www.shubaowa.org/*_*/
// @match          *://www.fuguoduxs.com/*_*/
// @match          *://www.xyqxs.cc/html/*/*/index.html
// @match          *://www.630shu.net/shu/*.html
// @match          *://www.qingoo.cn/details?bookId=*
// @match          *://www.trxs.cc/tongren/*.html
// @match          *://www.trxs123.com/tongren/*.html
// @match          *://www.jpxs123.com/*/*.html
// @match          *://trxs.cc/tongren/*.html
// @match          *://trxs123.com/tongren/*.html
// @match          *://jpxs123.com/*/*.html
// @match          *://www.tongrenquan.org/tongren/*.html
// @match          *://www.tongrenquan.me/tongren/*.html
// @match          *://tongrenquan.me/tongren/*.html
// @match          *://www.imiaobige.com/read/*/
// @match          *://www.256wxc.com/read/*/index.html
// @match          *://www.256wxc.com/read/*/
// @match          *://www.256wenku.com/read/*/index.html
// @match          *://www.256wenku.com/read/*/
// @match          *://www.biquge66.com/biquge*/
// @match          *://*.lofter.com/
// @match          *://*.lofter.com/?page=*
// @match          *://www.lwxs9.org/*/*/
// @match          *://www.shubl.com/book/book_detail/*
// @match          *://www.ujxs.net/read/*/
// @match          *://m.haitangtxt.net/*/*/
// @match          *://ebook.longmabook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.longmabookcn.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://ebook.lmbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.lmebooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.haitbook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.htwhbook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.myhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.lovehtbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.myhtebooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.myhtlmebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://jp.myhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://jp.myhtlmebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://ebook.urhtbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.urhtbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.newhtbook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.lvhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://jp.lvhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://www.htlvbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match          *://dijiubook.net/*_*/
// @match          *://www.biquwx.la/*_*/
// @match          *://www.25zw.com/*/
// @match          *://www.tycqxs.com/*_*/
// @name:en        novel-downloader
// @description:en An scalable universal novel downloader.
// @namespace      https://blog.bgme.me
// @icon           https://cdn.jsdelivr.net/gh/yingziwu/novel-downloader/assets/icon.png
// @license        AGPL-3.0
// @run-at         document-start
// @noframes       
// @compatible     Firefox 77+
// @compatible     Chrome 85+
// @compatible     Edge 85+
// @compatible     Opera 71+
// @compatible     Safari 13.1+
// @incompatible   Internet Explorer
// @exclude        *://www.jjwxc.net/onebook.php?novelid=*&chapterid=*
// @exclude        *://www.meegoq.com/book/*.html
// @exclude        *://www.viviyzw.com/book/*.html
// @exclude        *://www.yruan.com/article/*/*.html
// @exclude        *://m.yuzhaige.cc/tag/*/
// @exclude        *://m.yuzhaige.cc/sort/*/
// @exclude        *://m.yuzhaige.cc/top/*/
// @exclude        *://m.yuzhaige.cc/full/*/
// @exclude        *://m.yuzhaige.cc/book/*/
// @exclude        *://m.yushuge123.com/tag/*/
// @exclude        *://m.yushuge123.com/sort/*/
// @exclude        *://m.yushuge123.com/top/*/
// @exclude        *://m.yushuge123.com/full/*/
// @exclude        *://m.yushuge123.com/book/*/
// @exclude        *://www.linovel.net/book/*/*.html
// @exclude        *://www.qimao.com/shuku/*-*/
// @exclude        *://www.trxs.cc/tongren/*/*.html
// @exclude        *://www.trxs123.com/tongren/*/*.html
// @exclude        *://www.tongrenquan.org/tongren/*/*.html
// @exclude        *://tongrenquan.org/tongren/*/*.html
// @exclude        *://www.jpxs123.com/*/*/*.html
// @exclude        *://m.haitangtxt.net/tag/*/
// @exclude        *://m.haitangtxt.net/sort/*/
// @exclude        *://m.haitangtxt.net/top/*/
// @exclude        *://m.haitangtxt.net/full/*/
// @exclude        *://m.haitangtxt.net/book/*/
// @exclude        *://www.tadu.com/book/*/*/*
// @exclude        *://www.tadu.com/book/*/0*
// @exclude        *://www.tadu.com/book/*/1*
// @exclude        *://www.tadu.com/book/*/2*
// @exclude        *://www.tadu.com/book/*/3*
// @exclude        *://www.tadu.com/book/*/4*
// @exclude        *://www.tadu.com/book/*/5*
// @exclude        *://www.tadu.com/book/*/6*
// @exclude        *://www.tadu.com/book/*/7*
// @exclude        *://www.tadu.com/book/*/8*
// @exclude        *://www.tadu.com/book/*/9*
// @exclude        *://www.25zw.com/lastupdate/
// @exclude        *://www.25zw.com/postdate/
// @exclude        *://www.25zw.com/monthvisit/
// @exclude        *://www.25zw.com/goodnum/
// @exclude        *://www.25zw.com/goodnew/
// @grant          unsafeWindow
// @grant          GM_info
// @grant          GM_xmlhttpRequest
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM.info
// @grant          GM.xmlHttpRequest
// @grant          GM.setValue
// @grant          GM.getValue
// @grant          GM.deleteValue
// @connect        self
// @connect        shouda8.com
// @connect        shouda88.com
// @connect        qidian.com
// @connect        yuewen.com
// @connect        kuangxiangit.com
// @connect        sinaimg.cn
// @connect        jjwxc.net
// @connect        image.gebiqu.com
// @connect        qpic.cn
// @connect        zongheng.com
// @connect        17k.com
// @connect        img.uukanshu.com
// @connect        aliyuncs.com
// @connect        cdn.bcebos.com
// @connect        rs.sfacg.com
// @connect        shuhai.com
// @connect        ch-intel.com
// @connect        huluxia.com
// @connect        linovel.net
// @connect        ax1x.com
// @connect        tadu.com
// @connect        zhangyue01.com
// @connect        cdn.wtzw.com
// @connect        wenku8.com
// @connect        dmzj.com
// @connect        hongyeshuzhal.com
// @connect        hongyeshuzhai.com
// @connect        linovelib.com
// @connect        soxscc.net
// @connect        soxscc.org
// @connect        soxs.cc
// @connect        soshuw.com
// @connect        soxscc.cc
// @connect        soshuwu.com
// @connect        kubiji.net
// @connect        idejian.com
// @connect        img.imiaobige.com
// @connect        postimg.cc
// @connect        lofter.com
// @connect        lf127.net
// @connect        126.net
// @connect        shubl.com
// @connect        loli.net
// @connect        alicdn.com
// @connect        toutiaoimg.com
// @connect        imgdb.cn
// @connect        meego.cn
// @connect        poco.cn
// @connect        dijiuzww.com
// @connect        25zw.com
// @connect        sina.com.cn
// @connect        *
// @require        https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.js#sha512-NQVmLzNy4Lr5QTrmXvq/WzTMUnRHmv7nyIT/M6LyGPBS+TIeRxZ+YQaqWxjpRpvRMQSuYPQURZz/+pLi81xXeA==
// @require        https://cdn.jsdelivr.net/npm/fflate@0.7.1/umd/index.js#sha512-laBNdxeV48sttD1kBYahmdSXpSRitYmkte49ZUqm3KEOUK4cIJAjqt1MYwScWvBqqP4WDtEftDSPYE1ii/bxCg==
// @require        https://cdn.jsdelivr.net/npm/idb-keyval@6.0.3/dist/umd.js#sha512-+PXdWKx8apEQ52dxoVrQIwhLZj96Gde37eq+CXYQvG059IC5VF+nQ1DvD3JKqUVPL0k+TAJ8DDunVXjzKrlrHg==
// @require        https://cdn.jsdelivr.net/npm/loglevel@1.7.1/lib/loglevel.js#sha512-M8fjILtZEfPxVu6CCA2zI+oQL7hUMODvl7SshhQXHUGrxshEmr2hUoR5xrI0/OXDoAuTxQAkA258IQ4cH7RcVg==
// @require        https://cdn.jsdelivr.net/npm/nunjucks@3.2.3/browser/nunjucks.min.js#sha512-Uj8C5szr1tnKPNZb6ps5gFYtTGskzsUCiwY35QP/s2JIExZl7iYNletcmOJ8D6ocuaMRi9JGVrWRePaX9raujA==
// @require        https://cdn.jsdelivr.net/npm/vue@3.2.21/dist/vue.global.prod.js#sha512-mpjwM3OYBweZsR1BySj7jw3TuvKILFaLojtwYNBKKWuieiWiYByAgHddb1VX4+YO/NBe83cKW58k6ekhgfYgbQ==
// @downloadURL    https://github.com/yingziwu/novel-downloader/raw/gh-pages/bundle-greasyfork.user.js
// @updateURL      https://github.com/yingziwu/novel-downloader/raw/gh-pages/bundle-greasyfork.meta.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui/ChapterList.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --good-chapter-color: #41b883;\n  --bad-chapter-color: #e73838;\n  --warning-chapter-color: #ff9900;\n}\ndiv.chapter-list-loading {\n  padding-top: 5em;\n  padding-bottom: 5em;\n  text-align: center;\n}\ndiv.chapter-list {\n  max-height: 200px;\n  overflow-y: scroll;\n}\ndiv.chapter-list .section {\n  margin-top: 1.5em;\n  display: grid;\n  grid-template-columns: 32% 32% 32%;\n}\ndiv.chapter-list .section > h3:first-child {\n  grid-column-end: span 3;\n  text-align: center;\n}\ndiv.chapter-list .section > div.chapter {\n  text-align: center;\n  padding-top: 0.5em;\n  padding-bottom: 0.3em;\n  padding-left: 23px;\n  padding-right: 20px;\n  border: 1px solid #d9d9d9;\n  border-radius: 5px;\n  margin-left: 10px;\n  margin-top: 5px;\n  margin-right: 0;\n  margin-bottom: 0;\n}\ndiv.chapter-list .section a.disabled {\n  pointer-events: none;\n  cursor: default;\n}\ndiv.chapter-list .section a {\n  text-decoration: none;\n}\ndiv.chapter-list div.chapter.good {\n  background: var(--good-chapter-color);\n}\ndiv.chapter-list div.chapter.bad {\n  background: var(--bad-chapter-color);\n}\ndiv.chapter-list div.chapter.good.warning {\n  background: var(--warning-chapter-color);\n}\ndiv.chapter-list div.chapter.bad a,\ndiv.chapter-list div.chapter.good a {\n  color: white;\n}\n.nd-setting-body span.good {\n  color: var(--good-chapter-color);\n}\n.nd-setting-body span.bad {\n  color: var(--bad-chapter-color);\n}\n.nd-setting-body span.warning {\n  color: var(--warning-chapter-color);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/TestUI.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#test-page-div {\n  max-height: 300px;\n  overflow-y: scroll;\n}\n#test-page-div table {\n  text-align: center;\n}\n#test-page-div td {\n  all: revert;\n  padding-top: 0.3em;\n}\n#test-page-div td > img {\n  max-height: 15em;\n}\n#test-page-div tr > td:nth-child(1) {\n  font-weight: bold;\n  min-width: 7em;\n}\n#test-page-div tr > td:nth-child(2) div,\n#test-page-div tr > td:nth-child(2) p {\n  text-align: left;\n}\n#test-page-div hr {\n  margin-top: 1.5em;\n  margin-bottom: 1.5em;\n}\n#test-page-div h2 {\n  text-align: center;\n  margin-bottom: 1.3em;\n}\n#test-page-div h4 {\n  text-align: center;\n}\n#test-page-div .chapter p {\n  line-height: 1.4;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/button.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button-div {\n  position: fixed;\n  top: 15%;\n  right: 5%;\n  z-index: 5000;\n}\n.button-div button {\n  border-style: none;\n  text-align: center;\n  vertical-align: baseline;\n  background-color: rgba(128, 128, 128, 0.2);\n  padding: 3px;\n  border-radius: 12px;\n  min-width: auto;\n  min-height: auto;\n}\n.button-div img.start,\n.button-div img.jump {\n  height: 2em;\n}\n.button-div img.setting {\n  height: 1em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/save/main.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #f0f0f2;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\",\n    \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\ndiv.main {\n  width: 900px;\n  margin: 5em auto;\n  padding: 2em;\n  background-color: #fdfdff;\n  border-radius: 0.5em;\n  box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);\n}\n@media (max-width: 700px) {\n  div.main {\n    margin: 0 auto;\n    width: auto;\n  }\n}\nh1 {\n  line-height: 130%;\n  text-align: center;\n  font-weight: bold;\n  font-size: xxx-large;\n  margin-top: 3.2em;\n  margin-bottom: 3.3em;\n}\nh2 {\n  line-height: 130%;\n  text-align: center;\n  font-weight: bold;\n  font-size: x-large;\n  margin-top: 1.2em;\n  margin-bottom: 2.3em;\n}\ndiv {\n  margin: 0px;\n  padding: 0px;\n  text-align: justify;\n}\np {\n  text-indent: 2em;\n  display: block;\n  line-height: 1.3em;\n  margin-top: 0.4em;\n  margin-bottom: 0.4em;\n}\nimg {\n  vertical-align: text-bottom;\n  max-width: 90%;\n}\n.title {\n  margin-bottom: 0.7em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/save/toc.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "img {\n  max-width: 100%;\n  max-height: 15em;\n}\n.introduction {\n  font-size: smaller;\n  max-height: 18em;\n  overflow-y: scroll;\n}\n.introduction p {\n  text-indent: 0;\n}\n.bookurl {\n  text-align: center;\n  font-size: smaller;\n  padding-top: 1em;\n  padding-bottom: 0.5em;\n  margin-top: 0.4em;\n}\n.bookurl > a {\n  color: gray;\n}\n.info h3 {\n  padding-left: 0.5em;\n  margin-top: -1.2em;\n  margin-bottom: 0.5em;\n}\n.section {\n  margin-top: 1.5em;\n  display: grid;\n  grid-template-columns: 30% 30% 30%;\n}\n.section > h2:first-child {\n  grid-column-end: span 3;\n}\n.section > .chapter {\n  padding-bottom: 0.3em;\n  text-align: center;\n}\n.main > h1 {\n  margin-top: 1.5em;\n  margin-bottom: 1.5em;\n}\na.disabled {\n  pointer-events: none;\n  cursor: default;\n  color: gray;\n}\n.author::before {\n  content: \"作者：\";\n}\n.author {\n  text-align: center;\n  margin-top: -3em;\n  margin-bottom: 3em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/FilterTab.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".filter-setting {\n  padding-top: 0.4em;\n  padding-bottom: 0.8em;\n  text-align: center;\n}\n.filter-input + .filter-setter {\n  margin-top: 1em;\n}\n.filter-description {\n  font-size: larger;\n  color: cornflowerblue;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/dialog.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".overlay {\n  visibility: hidden;\n  opacity: 0;\n  z-index: 100000;\n  position: fixed;\n  top: -50%;\n  left: -50%;\n  height: 200%;\n  width: 200%;\n  background-color: black;\n}\n.overlay.open {\n  opacity: 0.8;\n  visibility: visible;\n  transition: opacity 0.2s ease-in;\n}\n.overlay:not(.open) {\n  transition: visibility 0.2s step-end, opacity 0.2s ease-in;\n}\n\n.out {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  z-index: 100001;\n}\n\n.dialog {\n  width: 720px;\n  max-height: 70%;\n  display: none;\n  opacity: 0;\n  z-index: 100100;\n  position: fixed;\n  margin: 0;\n  padding: 0;\n}\n.dialog.open {\n  opacity: 1;\n  display: block;\n  transition: opacity 0.2s ease-in;\n}\n\n.dialog > * {\n  box-sizing: border-box;\n}\n.dialog > .titlebar {\n  background-color: white;\n  min-height: 24px;\n  position: relative;\n}\n.dialog-title {\n  padding: 10px;\n  text-transform: uppercase;\n  background: #ff7bac;\n  color: #ffffff;\n  margin: 0;\n  font-size: 1.5em;\n  text-align: center;\n}\n.dialog-close {\n  background: #ff7bac;\n  color: #ffffff;\n\n  font-style: normal;\n  font-weight: 400;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  user-select: none;\n\n  cursor: pointer;\n  font-size: 120%;\n  margin: 0;\n  padding: 0;\n  width: 3.6em;\n  height: 92%;\n  border: 1px solid transparent;\n  transition-duration: 0.2s;\n  display: block;\n\n  position: absolute;\n  right: 0;\n  top: 0;\n  white-space: nowrap;\n}\n\n.dialog > .body {\n  background-color: white;\n  border: 1px solid rgb(255 125 175 / 80%);\n  text-align: left;\n\n  line-height: 1.5;\n  padding: 1em;\n\n  overflow: auto;\n  min-width: 280px;\n\n  height: calc(100% - 2.1em);\n  max-height: 900px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/progress.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#nd-progress {\n  position: fixed;\n  bottom: 8%;\n  right: 3%;\n  z-index: 2147483647;\n  border-style: none;\n  text-align: center;\n  vertical-align: baseline;\n  background-color: rgba(210, 210, 210, 0.2);\n  padding: 6px;\n  border-radius: 12px;\n}\n#chapter-progress {\n  --color: green;\n  --position: 0%;\n  width: 200px;\n  height: 10px;\n  border-radius: 30px;\n  background-color: #ccc;\n  background-image: radial-gradient(\n      closest-side circle at var(--position),\n      var(--color),\n      var(--color) 100%,\n      transparent\n    ),\n    linear-gradient(var(--color), var(--color));\n  background-image: -webkit-radial-gradient(\n      var(--position),\n      circle closest-side,\n      var(--color),\n      var(--color) 100%,\n      transparent\n    ),\n    -webkit-linear-gradient(var(--color), var(--color));\n  background-size: 100%, var(--position);\n  background-repeat: no-repeat;\n}\n#zip-progress {\n  --color: yellow;\n  --position: 0%;\n  width: 200px;\n  height: 10px;\n  border-radius: 30px;\n  background-color: #ccc;\n  background-image: radial-gradient(\n      closest-side circle at var(--position),\n      var(--color),\n      var(--color) 100%,\n      transparent\n    ),\n    linear-gradient(var(--color), var(--color));\n  background-image: -webkit-radial-gradient(\n      var(--position),\n      circle closest-side,\n      var(--color),\n      var(--color) 100%,\n      transparent\n    ),\n    -webkit-linear-gradient(var(--color), var(--color));\n  background-size: 100%, var(--position);\n  background-repeat: no-repeat;\n  margin-top: 5px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/setting.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".nd-setting-body input[type=\"checkbox\"],\n.nd-setting-body input[type=\"radio\"],\n.nd-setting-body input[type=\"text\"] {\n  position: static;\n  opacity: 1;\n  all: revert;\n}\n.nd-setting-body {\n  background: #e0e0e0;\n  padding: 1em;\n  border-top-right-radius: 3px;\n}\n.nd-setting-body hr {\n  margin-top: 0.8em;\n  margin-bottom: 0.8em;\n}\n\n.tab-button {\n  padding: 6px 10px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  background: #f0f0f0;\n  margin-bottom: -1px;\n  margin-right: -1px;\n}\n.tab-button:hover {\n  background: #e0e0e0;\n}\n.tab-button.active {\n  background: #e0e0e0;\n}\n\n.nd-setting-footer {\n  background: #e0e0e0;\n  padding-bottom: 0.7em;\n  text-align: center;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.nd-setting-footer > button {\n  all: revert;\n}\n\n/* 彩色斜纹 来自：https://www.zhangxinxu.com/wordpress/2021/05/css-html-hr/ */\n.hr-twill-colorful {\n  all: revert;\n  border: 0;\n  padding: 3px;\n  background: linear-gradient(135deg, red, orange, green, blue, purple);\n  --mask-image: repeating-linear-gradient(\n    135deg,\n    #000 0px,\n    #000 1px,\n    transparent 1px,\n    transparent 6px\n  );\n  -webkit-mask-image: var(--mask-image);\n  mask-image: var(--mask-image);\n}\n/* 两头虚 来自：https://www.zhangxinxu.com/wordpress/2021/05/css-html-hr/ */\n.hr-edge-weak {\n  all: revert;\n  border: 0;\n  padding-top: 1px;\n  background: linear-gradient(to right, transparent, #d0d0d5, transparent);\n}\n\n/* 日志页面 */\n#novel-downloader-log {\n  max-height: 300px;\n  overflow: scroll;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./src/save/chapter.html.j2":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html> <html> <head> <meta charset=\"UTF-8\"/> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/> <meta name=\"referrer\" content=\"same-origin\"/> <meta name=\"generator\" content=\"https://github.com/yingziwu/novel-downloader\"/> <meta name=\"source\" content=\"{{ chapterUrl }}\"/> <link href=\"style.css\" rel=\"stylesheet\"/> <title>{{ chapterName }}</title> </head> <body> <div class=\"main\"> <h2>{{ chapterName }}</h2> {{ outerHTML }} </div> </body> </html> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/save/index.html.j2":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html> <html> <head> <meta charset=\"UTF-8\"/> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/> <meta name=\"referrer\" content=\"same-origin\"/> <meta name=\"generator\" content=\"https://github.com/yingziwu/novel-downloader\"/> <meta name=\"date-creation\" content=\"{{ creationDate }}\"/> <link href=\"style.css\" rel=\"stylesheet\"/> <title>{{ bookname }}</title> <style></style> </head> <body> <div class=\"main\"> <h1>{{ bookname }}</h1> <h3 class=\"author\">{{ author }}</h3> <div class=\"info\"> {% if cover -%} <img class=\"cover\" data-src-address=\"{{ cover.name }}\"/> {%- endif %} {% if introductionHTML -%} <div> <h3>简介</h3> <div class=\"introduction\">{{ introductionHTML }}</div> </div> {%- endif %} </div> <div class=\"bookurl\"> <a href=\"{{ bookUrl }}\">打开原始网站</a> </div> <hr/> {% for sectionObj in sectionsObj -%} <div id=\"section{{ sectionObj.sectionNumber }}\" class=\"section\"> {% if sectionObj.sectionName %} <h2 class=\"section-label\">{{ sectionObj.sectionName }}</h2> {% endif %} {% for chapter in sectionObj.chpaters -%} <div class=\"chapter\"> {% if not (chapter.contentHTML or chapter.status === Status.saved) -%} <a class=\"disabled\" href=\"{{ chapter.chapterHtmlFileName }}\">{{ chapter.chapterName }}</a> {%- else -%} <a href=\"{{ chapter.chapterHtmlFileName }}\">{{ chapter.chapterName }}</a> {%- endif %} </div> {%- endfor %} </div> {%- endfor %} </div> </body> </html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/save/section.html.j2":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html> <html> <head> <meta charset=\"UTF-8\"/> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/> <meta name=\"referrer\" content=\"same-origin\"/> <meta name=\"generator\" content=\"https://github.com/yingziwu/novel-downloader\"/> <link href=\"style.css\" rel=\"stylesheet\"/> <title>{{ sectionName }}</title> </head> <body> <div class=\"main\"><h1>{{ sectionName }}</h1></div> </body> </html> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/ui/ChapterList.html":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div> <div v-if=\"loading\"> <div class=\"chapter-list-loading\"> <h2>正在载入章节列表中，请耐心等待……</h2> </div> </div> <div class=\"chapter-list\" v-else> <div v-for=\"sectionObj in sectionsObj\" v-show=\"isSectionSeen(sectionObj)\" v-bind:key=\"sectionObj.sectionNumber\" class=\"section\"> <h3 class=\"section-label\" v-if=\"sectionObj.sectionName\"> {{ sectionObj.sectionName }} </h3> <div v-for=\"chapter in sectionObj.chpaters\" v-show=\"isChapterSeen(chapter)\" v-bind:key=\"chapter.chapterNumber\" class=\"chapter\" v-bind:class=\"{\n              good: this.filter(chapter),\n              bad: !this.filter(chapter),\n              warning: this.warningFilter(chapter)\n            }\" v-bind:title=\"chapter.chapterNumber\"> <a v-bind:href=\"chapter.chapterUrl\" v-bind:class=\"{\n                disabled: this.isChapterDisabled(chapter),\n              }\" target=\"_blank\" rel=\"noopener noreferrer\">{{ chapter.chapterName }}</a> </div> </div> </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/ui/FilterTab.html":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div> <div class=\"filter-setting\"> <div v-if=\"filterType !== 'null'\" class=\"filter-input\"> <p>请输入过滤的条件：<input type=\"text\" v-model=\"arg\"/></p> </div> <div class=\"filter-setter\"> <div> <span>当前过滤方法：</span> <select v-model=\"filterType\"> <option v-for=\"filterOption in filterOptionList\" v-bind:value=\"filterOption[0]\"> {{ filterOption[1][\"abbreviation\"] }} </option> </select> </div> <input type=\"checkbox\" id=\"hiddenBad\" v-model=\"hiddenBad\"/> <label for=\"hiddenBad\">只显示符合条件章节</label> <div class=\"filter-description\" v-html=\"filterDescription\"></div> <div v-if=\"false\"> <span class=\"good\"></span> <span class=\"warning\"></span> <span class=\"bad\"></span> </div> </div> </div> <chapter-list/> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/ui/TestUI.html":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div> <div id=\"test-page-div\"> <h2>元数据</h2> <table> <tbody> <tr v-for=\"(value, key) in metaData\"> <td>{{ key }}</td> <td v-html=\"getData(key, value)\"></td> </tr> </tbody> </table> <hr class=\"hr-edge-weak\"/> <h2>章节测试</h2> <div v-if=\"this.isSeenChapter(chapter)\"> <h4> <a v-bind:href=\"chapter.chapterUrl\" target=\"_blank\" rel=\"noopener noreferrer\">{{ chapter.chapterName }}</a> </h4> <div class=\"chapter\" v-html=\"chapter.contentHTML.outerHTML\"></div> </div> <div v-else> <p v-if=\"this.isChapterFailed(chapter)\">章节加载失败！</p> <p v-else>正在加载章节中……</p> </div> </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/ui/button.html":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"button-div\" id=\"button-div\"> <div v-if=\"uiObj.type !== 'error'\"> <div class=\"jump\" v-if=\"uiObj.type === 'jump'\"> <button class=\"jump\"> <img class=\"jump\" v-bind:src=\"imgJump\" v-on:click=\"jumpButtonClick\"/> </button> </div> <div class=\"download\" v-if=\"uiObj.type === 'download'\"> <button class=\"start\"> <img class=\"start\" v-bind:src=\"imgStart\" v-on:click=\"startButtonClick\"/> </button> <button class=\"setting\" v-if=\"isSettingSeen\"> <img class=\"setting\" v-bind:src=\"imgSetting\" v-on:click=\"settingButtonClick\"/> </button> </div> </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/ui/dialog.html":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class=\"overlay\" v-bind:class=\"{ open: myPrivateStatus }\" v-if=\"myPrivateStatus\"></div> <div class=\"out\" v-if=\"myPrivateStatus\"> <div id=\"dialog\" class=\"dialog\" v-bind:class=\"{ open: myPrivateStatus }\"> <div class=\"titlebar\"> <h1 class=\"dialog-title\">{{ dialogTitle }}</h1> <button class=\"dialog-close\" v-on:click=\"dialogClose\">❌</button> </div> <div class=\"body\"> <slot></slot> </div> </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/ui/progress.html":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div> <div id=\"nd-progress\" v-if=\"ntProgressSeen\"> <div v-if=\"chapterProgressSeen\" id=\"chapter-progress\" v-bind:style=\"{'--position': chapterPercent+'%'}\" v-bind:title=\"chapterProgressTitle\"></div> <div v-if=\"zipProgressSeen\" id=\"zip-progress\" title=\"ZIP\" v-bind:style=\"{'--position': zipPercent+'%'}\"></div> </div> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/ui/setting.html":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div> <dialog-ui dialog-title=\"设置\" v-bind:status=\"openStatus\" v-on:dialogclose=\"closeSetting\" v-if=\"openStatus === 'true'\"> <div class=\"nd-setting\"> <div class=\"nd-setting-tab\"> <button v-bind:class=\"['tab-button', { active: currentTab === 'tab-1'}]\" v-on:click=\"currentTab = 'tab-1'\"> 基本设置 </button> <button v-bind:class=\"['tab-button', { active: currentTab === 'tab-2'}]\" v-on:click=\"currentTab = 'tab-2'\"> 自定义筛选条件 </button> <button v-if=\"setting.enableTestPage\" v-bind:class=\"['tab-button', { active: currentTab === 'tab-3'}]\" v-on:click=\"currentTab = 'tab-3'\"> 抓取测试 </button> <button v-if=\"setting.enableTestPage\" v-bind:class=\"['tab-button', { active: currentTab === 'tab-4'}]\" v-on:click=\"currentTab = 'tab-4'\"> 日志 </button> </div> <div class=\"nd-setting-body\"> <div id=\"nd-setting-tab-1\" class=\"tab-page\" v-show=\"currentTab === 'tab-1'\"> <div> <input type=\"checkbox\" id=\"debug\" v-model=\"setting.enableDebug\"/> <label for=\"debug\">启用调式模式。（输出更详细日志）</label> <input type=\"checkbox\" id=\"test-page\" v-model=\"setting.enableTestPage\"/> <label for=\"test-page\">启用测试视图</label> </div> <hr class=\"hr-twill-colorful\"/> <div> <h3>自定义保存参数</h3> <ul> <li v-for=\"item of saveOptions\"> <input type=\"radio\" v-bind:id=\"item.key\" v-bind:value=\"item.key\" v-model=\"setting.chooseSaveOption\"/> <label v-bind:for=\"item.key\">{{ item.value }}</label> </li> </ul> </div> </div> <div id=\"nd-setting-tab-2\" class=\"tab-page\" v-show=\"currentTab === 'tab-2'\"> <filter-tab v-on:filterupdate=\"saveFilter\"/> </div> <div v-if=\"setting.enableTestPage\" id=\"nd-setting-tab-3\" class=\"tab-page\" v-show=\"currentTab === 'tab-3'\"> <test-ui></test-ui> </div> <div v-if=\"setting.enableTestPage\" id=\"nd-setting-tab-4\" class=\"tab-page\" v-show=\"currentTab === 'tab-4'\"> <log-ui></log-ui> </div> </div> <div class=\"nd-setting-footer\"> <button v-on:click=\"closeAndSaveSetting\">Save</button> <button v-on:click=\"closeSetting\">Cancel</button> </div> </div> </dialog-ui> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/debug.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debug = void 0;
const file_saver_1 = __webpack_require__("./node_modules/file-saver/dist/FileSaver.min.js");
const download_1 = __webpack_require__("./src/router/download.ts");
async function debug() {
    const rule = await (0, download_1.getRule)();
    let book;
    if (typeof window._book !== "undefined") {
        book = window._book;
    }
    else {
        book = await rule.bookParse();
    }
    unsafeWindow.rule = rule;
    unsafeWindow.book = book;
    window._book = book;
    unsafeWindow.saveAs = file_saver_1.saveAs;
    return;
}
exports.debug = debug;


/***/ }),

/***/ "./src/detect.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environments = void 0;
const GM_1 = __webpack_require__("./src/lib/GM.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
function check(name) {
    const target = window[name];
    const targetLength = target.toString().length;
    const targetPrototype = target.prototype;
    const nativeFunctionRe = /function \w+\(\) {\n?(\s+)?\[native code\]\n?(\s+)?}/;
    try {
        if (targetPrototype === undefined ||
            Boolean(target.toString().match(nativeFunctionRe))) {
            return [true, targetLength].join(", ");
        }
    }
    catch {
        return [true, targetLength].join(", ");
    }
    return [false, targetLength].join(", ");
}
exports.environments = {
    当前时间: new Date().toISOString(),
    当前页URL: document.location.href,
    当前页Referrer: document.referrer,
    浏览器UA: navigator.userAgent,
    浏览器语言: navigator.languages,
    设备运行平台: navigator.platform,
    设备内存: navigator.deviceMemory ?? "",
    CPU核心数: navigator.hardwareConcurrency,
    eval: check("eval"),
    fetch: check("fetch"),
    XMLHttpRequest: check("XMLHttpRequest"),
    window: Object.keys(window).length,
    localStorage: (0, misc_1.storageAvailable)("localStorage"),
    sessionStorage: (0, misc_1.storageAvailable)("sessionStorage"),
    Cookie: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack ?? 0,
    ScriptHandler: GM_1._GM_info.scriptHandler,
    "ScriptHandler version": GM_1._GM_info.version,
    "Novel-downloader version": GM_1._GM_info.script.version,
    enableDebug: setting_1.enableDebug.value,
};


/***/ }),

/***/ "./src/global.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
const misc_1 = __webpack_require__("./src/lib/misc.ts");
function init() {
    window.downloading = false;
    window.customStorage =
        new misc_1.LocalStorageExpired();
    window.stopFlag = false;
}
exports.init = init;


/***/ }),

/***/ "./src/lib/GM.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._GM_deleteValue = exports._GM_getValue = exports._GM_setValue = exports._GM_xmlhttpRequest = exports._GM_info = void 0;
const log_1 = __webpack_require__("./src/log.ts");
if (typeof GM_info === "undefined") {
    if (typeof GM === "undefined") {
        throw new Error("未发现 GM_info");
    }
    else {
        if (typeof GM.info === "undefined") {
            throw new Error("未发现 GM_info");
        }
        else {
            exports._GM_info = GM.info;
        }
    }
}
else {
    exports._GM_info = GM_info;
}
if (typeof GM_xmlhttpRequest === "undefined") {
    if (typeof GM === "undefined") {
        throw new Error("未发现 GM_xmlhttpRequest");
    }
    else {
        if (typeof GM.xmlHttpRequest === "undefined") {
            throw new Error("未发现 GM_xmlhttpRequest");
        }
        else {
            exports._GM_xmlhttpRequest = GM.xmlHttpRequest;
        }
    }
}
else {
    exports._GM_xmlhttpRequest = GM_xmlhttpRequest;
}
if (typeof GM_setValue === "undefined") {
    if (typeof GM === "undefined") {
        log_1.log.warn("未发现 GM_setValue");
    }
    else {
        if (typeof GM.setValue === "undefined") {
            log_1.log.warn("未发现 GM_setValue");
        }
        else {
            exports._GM_setValue = GM.setValue;
        }
    }
}
else {
    exports._GM_setValue = GM_setValue;
}
if (typeof GM_getValue === "undefined") {
    if (typeof GM === "undefined") {
        log_1.log.warn("未发现 GM_getValue");
    }
    else {
        if (typeof GM.getValue === "undefined") {
            log_1.log.warn("未发现 GM_getValue");
        }
        else {
            exports._GM_getValue = GM.getValue;
        }
    }
}
else {
    exports._GM_getValue = GM_getValue;
}
if (typeof GM_deleteValue === "undefined") {
    if (typeof GM === "undefined") {
        log_1.log.warn("未发现 GM_deleteValue");
    }
    else {
        if (typeof GM.deleteValue === "undefined") {
            log_1.log.warn("未发现 GM_deleteValue");
        }
        else {
            exports._GM_deleteValue = GM.deleteValue;
        }
    }
}
else {
    exports._GM_deleteValue = GM_deleteValue;
}


/***/ }),

/***/ "./src/lib/attachments.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getImageAttachment = exports.clearAttachmentClassCache = exports.putAttachmentClassCache = exports.getAttachmentClassCache = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
let attachmentClassCache = [];
function getAttachmentClassCache(url) {
    const found = attachmentClassCache.find((attachmentClass) => attachmentClass.url === url);
    return found;
}
exports.getAttachmentClassCache = getAttachmentClassCache;
function putAttachmentClassCache(attachmentClass) {
    attachmentClassCache.push(attachmentClass);
    return true;
}
exports.putAttachmentClassCache = putAttachmentClassCache;
function clearAttachmentClassCache() {
    attachmentClassCache = [];
}
exports.clearAttachmentClassCache = clearAttachmentClassCache;
async function getImageAttachment(url, imgMode = "TM", prefix = "", noMD5 = false, comments) {
    const tmpImageName = Math.random().toString().replace("0.", "");
    let imgClass;
    const imgClassCache = getAttachmentClassCache(url);
    if (imgClassCache) {
        imgClass = imgClassCache;
    }
    else {
        imgClass = new main_1.AttachmentClass(url, tmpImageName, imgMode);
        const blob = await imgClass.init();
        if (blob) {
            const hash = await (0, misc_1.calculateMd5)(blob);
            const contentType = blob.type.split("/")[1];
            const contentTypeBlackList = ["octet-stream"];
            let ext = contentType;
            if (contentTypeBlackList.includes(contentType)) {
                const _ext = new URL(url).pathname
                    .split(".")
                    .slice(-1)[0]
                    .match(/(^[\d|\w]+)/);
                if (_ext) {
                    ext = _ext[0];
                }
                else {
                    ext = new URL(url).pathname.split(".").slice(-1)[0];
                }
            }
            let imageName;
            if (noMD5) {
                let _imageName = new URL(url).pathname.split("/").slice(-1)[0];
                if (attachmentClassCache.find((attachmentClass) => attachmentClass.name === _imageName && attachmentClass.url !== url)) {
                    _imageName = new URL(url).pathname.split("/").slice(-2).join("_");
                }
                imageName = [prefix, _imageName].join("");
            }
            else {
                imageName = [prefix, hash, ".", ext].join("");
            }
            imgClass.name = imageName;
            putAttachmentClassCache(imgClass);
        }
        else {
        }
    }
    if (comments) {
        imgClass.comments = comments;
    }
    return imgClass;
}
exports.getImageAttachment = getImageAttachment;


/***/ }),

/***/ "./src/lib/cleanDOM.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.htmlTrim = exports.cleanDOM = void 0;
const log_1 = __webpack_require__("./src/log.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const BlockElements = [
    "article",
    "aside",
    "footer",
    "form",
    "header",
    "main",
    "nav",
    "section",
    "figure",
    "div",
    "b",
    "strong",
    "i",
    "em",
    "dfn",
    "var",
    "cite",
    "span",
    "font",
    "u",
    "del",
    "sup",
    "sub",
    "strike",
    "small",
    "samp",
    "s",
];
const IgnoreElements = [
    "script",
    "meta",
    "link",
    "style",
    "#comment",
    "button",
    "input",
    "select",
];
function* findBase(dom, blockElements, ignoreElements) {
    const childNodes = Array.from(dom.childNodes);
    for (const node of childNodes) {
        const nodeName = node.nodeName.toLowerCase();
        if (blockElements.includes(nodeName)) {
            yield* findBase(node, blockElements, ignoreElements);
        }
        else if (nodeName === "#text") {
            if (node.parentElement?.childNodes.length === 1 &&
                blockElements.slice(9).includes(nodeName)) {
                yield node.parentElement;
            }
            else if (node.textContent?.trim()) {
                yield node;
            }
        }
        else if (!ignoreElements.includes(nodeName)) {
            yield node;
        }
    }
}
function getNextSibling(elem) {
    elem = elem.nextSibling;
    if (elem &&
        elem.nodeName.toLowerCase() === "#text" &&
        elem.textContent?.trim() === "") {
        return elem.nextSibling;
    }
    return elem;
}
function getPreviousSibling(elem) {
    elem = elem.previousSibling;
    if (elem &&
        elem.nodeName.toLowerCase() === "#text" &&
        elem.textContent?.trim() === "") {
        return elem.previousSibling;
    }
    return elem;
}
function getParentElement(elem) {
    const _elem = elem.parentElement;
    if (!_elem) {
        return null;
    }
    const nodename = _elem.nodeName.toLowerCase();
    if (["div", "p"].includes(nodename)) {
        return _elem;
    }
    else {
        return getParentElement(_elem);
    }
}
async function formatImage(elem, builder) {
    function temp0() {
        const pI = document.createElement("p");
        pI.appendChild(imgElem);
        builder.dom.appendChild(pI);
        builder.text = builder.text + imgText + "\n\n";
    }
    if (!elem.src) {
        return;
    }
    const tfi = await _formatImage(elem, builder);
    if (!tfi) {
        return;
    }
    const [imgElem, imgText, imgClass] = tfi;
    if (elem.parentElement?.childElementCount === 1) {
        temp0();
        return;
    }
    else {
        function temp1() {
            if (lastElement?.nodeName.toLowerCase() === "p") {
                lastElement.appendChild(imgElem);
                builder.text = builder.text + ` ${imgText} `;
                return;
            }
            else {
                const tpElem = document.createElement("p");
                tpElem.appendChild(imgElem);
                builder.dom.appendChild(tpElem);
                builder.text = builder.text + ` ${imgText} `;
                return;
            }
        }
        const lastElement = builder.dom.lastElementChild;
        const nextSibling = getNextSibling(elem);
        const previousSibling = getPreviousSibling(elem);
        if (elem.parentElement?.nodeName.toLowerCase() === "p" &&
            lastElement?.nodeName.toLowerCase() === "p") {
            if (previousSibling?.nodeName.toLowerCase() === "#text" ||
                nextSibling?.nodeName.toLowerCase() === "#text") {
                temp1();
                return;
            }
            if (previousSibling?.nodeName.toLowerCase() === "img" &&
                lastElement.lastElementChild?.nodeName.toLowerCase() === "img" &&
                lastElement.lastElementChild.alt ===
                    previousSibling.src) {
                temp1();
                return;
            }
        }
        else {
            temp0();
            return;
        }
    }
}
async function _formatImage(elem, builder) {
    if (!elem.src) {
        return;
    }
    const imgMode = builder.imgMode;
    const imageUrl = elem.src;
    let noMD5 = false;
    if (builder.option?.keepImageName) {
        noMD5 = true;
    }
    const imageName = `__imageName__${Math.random()
        .toString()
        .replace("0.", "")}__`;
    const imgClass = (0, attachments_1.getImageAttachment)(imageUrl, imgMode, "", noMD5, imageName);
    builder.images.push(imgClass);
    const imgElem = document.createElement("img");
    imgElem.setAttribute("data-src-address", imageName);
    imgElem.alt = imageUrl;
    const imgText = `![${imageUrl}](${imageName})`;
    return [imgElem, imgText, imgClass];
}
async function formatMisc(elem, builder) {
    if (elem.childElementCount === 0) {
        const lastElement = builder.dom.lastElementChild;
        const textContent = elem.innerText.trim();
        if (lastElement?.nodeName.toLowerCase() === "p") {
            const textElem = document.createTextNode(textContent);
            lastElement.appendChild(textElem);
            builder.text = builder.text + textContent;
        }
        else {
            const pElem = document.createElement("p");
            pElem.innerText = textContent;
            builder.dom.appendChild(pElem);
            builder.text = builder.text + "\n\n" + textContent;
        }
    }
    else {
        await walk(elem, builder);
        return;
    }
}
async function formatParagraph(elem, builder) {
    if (elem.childElementCount === 0) {
        const pElem = document.createElement("p");
        pElem.innerText = elem.innerText.trim();
        const pText = elem.innerText.trim() + "\n\n";
        builder.dom.appendChild(pElem);
        builder.text = builder.text + pText;
        return;
    }
    else {
        await walk(elem, builder);
        return;
    }
}
function formatText(elems, builder) {
    function temp0() {
        const tPElem = document.createElement("p");
        tPElem.innerText = textContent;
        builder.dom.appendChild(tPElem);
    }
    function temp1() {
        const lastElementTemp = builder.dom.lastElementChild;
        if (lastElementTemp?.nodeName.toLowerCase() === "p") {
            const textElem = document.createTextNode(textContent);
            lastElementTemp.appendChild(textElem);
            const tPText = textContent + "\n".repeat(brCount);
            builder.text = builder.text + tPText;
        }
        else {
            temp0();
            const tPText = textContent + "\n".repeat(brCount);
            builder.text = builder.text + tPText;
        }
    }
    const brCount = elems.filter((ele) => ele.nodeName.toLowerCase() === "br").length;
    const elem = elems[0];
    const textContent = elem.textContent ? elem.textContent.trim() : "";
    if (!textContent) {
        return;
    }
    const lastElement = builder.dom.lastElementChild;
    const previousSibling = getPreviousSibling(elem);
    if (elem.parentElement?.nodeName.toLowerCase() === "p" &&
        lastElement?.nodeName.toLowerCase() === "p" &&
        previousSibling?.nodeName.toLowerCase() === "img" &&
        lastElement.lastElementChild?.nodeName.toLowerCase() === "img" &&
        lastElement.lastElementChild.alt ===
            previousSibling.src) {
        temp1();
        return;
    }
    if (brCount === 0) {
        const nextSibling = getNextSibling(elem);
        const previousSiblingBr = getPreviousSibling(elem);
        if (nextSibling === null) {
            if (previousSiblingBr?.nodeName.toLowerCase() === "br") {
                temp0();
                const tPText = textContent + "\n\n";
                builder.text = builder.text + tPText;
                return;
            }
            else if (previousSiblingBr === null &&
                (() => {
                    const parentElement = getParentElement(elem);
                    if (parentElement?.childNodes.length === 1) {
                        return true;
                    }
                    return false;
                })()) {
                temp0();
                if (builder.text.endsWith("\n")) {
                    builder.text = builder.text + textContent + "\n\n";
                }
                else {
                    builder.text = builder.text + "\n\n" + textContent + "\n\n";
                }
                return;
            }
            else {
                temp1();
                return;
            }
        }
        else {
            if (previousSiblingBr === null) {
                temp0();
                const tPText = textContent;
                if (builder.text.endsWith("\n")) {
                    builder.text = builder.text + tPText;
                }
                else {
                    builder.text = builder.text + "\n\n" + tPText;
                }
                return;
            }
            else {
                temp1();
                return;
            }
        }
    }
    else if (brCount === 1) {
        const lastElementBr = builder.dom.lastElementChild;
        if (lastElementBr?.nodeName.toLowerCase() === "p") {
            const br = document.createElement("br");
            const textElem = document.createTextNode(textContent);
            lastElementBr.appendChild(br);
            lastElementBr.appendChild(textElem);
            const tPText = textContent + "\n";
            builder.text = builder.text + tPText;
            return;
        }
        else {
            temp0();
            const tPText = textContent + "\n";
            builder.text = builder.text + tPText;
            return;
        }
    }
    else if (brCount === 2 || brCount === 3) {
        temp0();
        const tPText = textContent + "\n".repeat(brCount);
        builder.text = builder.text + tPText;
        return;
    }
    else if (brCount > 3) {
        temp0();
        for (let i = Math.round((brCount - 2) / 3); i > 0; i--) {
            const tPBr = document.createElement("p");
            const br = document.createElement("br");
            tPBr.appendChild(br);
            builder.dom.appendChild(tPBr);
        }
        const tPText = textContent + "\n".repeat(brCount);
        builder.text = builder.text + tPText;
        return;
    }
}
function formatHr(elem, builder) {
    const hrElem = document.createElement("hr");
    const hrText = "-".repeat(20);
    builder.dom.appendChild(hrElem);
    builder.text = builder.text + "\n\n" + hrText + "\n\n";
    return;
}
async function formatA(elem, builder) {
    if (elem.childElementCount === 0) {
        if (elem.href) {
            const aElem = document.createElement("a");
            aElem.href = elem.href;
            aElem.innerText = elem.innerText;
            aElem.rel = "noopener noreferrer";
            const aText = `[${elem.innerText}](${elem.href})`;
            builder.dom.appendChild(aElem);
            builder.text = builder + "\n\n" + aText;
            return;
        }
        else {
            return;
        }
    }
    else {
        return await formatMisc(elem, builder);
    }
}
function formatVideo(elem, builder) {
    builder.dom.appendChild(elem.cloneNode(true));
    builder.text = builder.text + "\n\n" + elem.outerHTML;
}
async function walk(dom, builder) {
    const childNodes = [...findBase(dom, BlockElements, IgnoreElements)].filter((b) => b);
    for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i];
        if (node === undefined) {
            continue;
        }
        const nodeName = node.nodeName.toLowerCase();
        switch (nodeName) {
            case "u":
            case "del":
            case "sup":
            case "sub":
            case "strike":
            case "small":
            case "samp":
            case "s":
            case "b":
            case "strong":
            case "i":
            case "em":
            case "dfn":
            case "var":
            case "cite":
            case "span":
            case "font": {
                await formatMisc(node, builder);
                break;
            }
            case "div":
            case "p": {
                await formatParagraph(node, builder);
                break;
            }
            case "#text": {
                const elems = [node];
                let j = i + 1;
                let jnodeName = nodeName;
                do {
                    if (j >= childNodes.length) {
                        break;
                    }
                    const jnode = childNodes[j];
                    jnodeName = jnode.nodeName.toLowerCase();
                    if (jnodeName === "br") {
                        elems.push(jnode);
                        delete childNodes[j];
                        j++;
                    }
                } while (jnodeName === "br");
                formatText(elems, builder);
                break;
            }
            case "img": {
                await formatImage(node, builder);
                break;
            }
            case "hr": {
                formatHr(node, builder);
                break;
            }
            case "a": {
                await formatA(node, builder);
                break;
            }
            case "video": {
                formatVideo(node, builder);
                break;
            }
        }
    }
    return builder;
}
async function cleanDOM(DOM, imgMode, option = null) {
    const builder = {
        dom: document.createElement("div"),
        text: "",
        images: [],
        imgMode,
        option,
    };
    await walk(DOM, builder);
    const dom = builder.dom;
    let text = builder.text;
    const pImages = builder.images;
    let images;
    try {
        images = await Promise.all(pImages);
    }
    catch (error) {
        log_1.log.error(error);
        log_1.log.trace(error);
    }
    if (!images) {
        log_1.log.error("[cleanDom] images is undefined!");
        images = [];
    }
    for (const img of images) {
        const comments = img.comments;
        const blob = img.imageBlob;
        if (comments) {
            const _imgDom = dom.querySelector(`img[data-src-address="${comments}"]`);
            if (blob) {
                _imgDom?.setAttribute("data-src-address", img.name);
                text = text.replaceAll(comments, img.name);
            }
            else {
                _imgDom?.setAttribute("data-src-address", img.url);
                text = text.replaceAll(comments, img.url);
            }
        }
    }
    text = text.trim();
    return {
        dom,
        text,
        images,
    };
}
exports.cleanDOM = cleanDOM;
function htmlTrim(dom) {
    const childNodesR = Array.from(dom.childNodes).reverse();
    for (const node of childNodesR) {
        const ntype = node.nodeName.toLowerCase();
        const ntypes = ["#text", "br"];
        if (!ntypes.includes(ntype)) {
            return;
        }
        if (ntype === "#text") {
            if (node.textContent?.trim() === "") {
                node.remove();
            }
            else {
                return;
            }
        }
        if (ntype === "br") {
            node.remove();
        }
    }
}
exports.htmlTrim = htmlTrim;


/***/ }),

/***/ "./src/lib/createEl.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createStyle = exports.createEl = void 0;
function createEl(el) {
    const _el = document.createElement("div");
    _el.innerHTML = el;
    if (_el.childElementCount === 1 && _el.firstElementChild) {
        return _el.firstElementChild;
    }
    else {
        throw new Error("Create HTMLElement Failed!");
    }
}
exports.createEl = createEl;
function createStyle(style, id) {
    const el = createEl(`<style>${style}</style>`);
    if (id) {
        el.id = id;
    }
    return el;
}
exports.createStyle = createStyle;


/***/ }),

/***/ "./src/lib/http.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ggetHtmlDOM = exports.ggetText = exports.getHtmlDOM = exports.getText = exports.gfetch = void 0;
const log_1 = __webpack_require__("./src/log.ts");
const GM_1 = __webpack_require__("./src/lib/GM.ts");
function gfetch(url, { method = "GET", headers, data, cookie, binary, nocache, revalidate, timeout, context, responseType, overrideMimeType, anonymous, username, password, } = {}) {
    return new Promise((resolve, reject) => {
        if (GM_1._GM_xmlhttpRequest) {
            (0, GM_1._GM_xmlhttpRequest)({
                url,
                method,
                headers,
                data,
                cookie,
                binary,
                nocache,
                revalidate,
                timeout,
                context,
                responseType,
                overrideMimeType,
                anonymous,
                username,
                password,
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
async function getText(url, charset, init) {
    const _url = new URL(url);
    if (document.location.protocol === "https:" && _url.protocol === "http:") {
        _url.protocol = "https:";
        url = _url.toString();
    }
    if (charset === undefined) {
        return fetch(url, init)
            .then((response) => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error(`Bad response! ${url}`);
            }
        })
            .catch((error) => log_1.log.error(error));
    }
    else {
        return fetch(url, init)
            .then((response) => {
            if (response.ok) {
                return response.arrayBuffer();
            }
            else {
                throw new Error(`Bad response! ${url}`);
            }
        })
            .then((buffer) => {
            const decoder = new TextDecoder(charset);
            const text = decoder.decode(buffer);
            return text;
        })
            .catch((error) => log_1.log.error(error));
    }
}
exports.getText = getText;
async function getHtmlDOM(url, charset, init) {
    const htmlText = await getText(url, charset, init);
    if (!htmlText) {
        throw new Error("Fetch Content failed!");
    }
    return new DOMParser().parseFromString(htmlText, "text/html");
}
exports.getHtmlDOM = getHtmlDOM;
async function ggetText(url, charset, init) {
    if (charset === undefined) {
        return gfetch(url, init)
            .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.responseText;
            }
            else {
                throw new Error(`Bad response! ${url}`);
            }
        })
            .catch((error) => log_1.log.error(error));
    }
    else {
        if (init) {
            init.responseType = "arraybuffer";
        }
        else {
            init = { responseType: "arraybuffer" };
        }
        return gfetch(url, init)
            .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.response;
            }
            else {
                throw new Error(`Bad response! ${url}`);
            }
        })
            .then((buffer) => {
            const decoder = new TextDecoder(charset);
            const text = decoder.decode(buffer);
            return text;
        })
            .catch((error) => log_1.log.error(error));
    }
}
exports.ggetText = ggetText;
async function ggetHtmlDOM(url, charset, init) {
    const htmlText = await ggetText(url, charset, init);
    if (!htmlText) {
        throw new Error("Fetch Content failed!");
    }
    return new DOMParser().parseFromString(htmlText, "text/html");
}
exports.ggetHtmlDOM = ggetHtmlDOM;


/***/ }),

/***/ "./src/lib/misc.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.regexpEscape = exports.deepcopy = exports.LocalStorageExpired = exports.calculateMd5 = exports.storageAvailable = exports.sandboxed = exports.sleep = exports.concurrencyRun = exports.rm2 = exports.rm = void 0;
const CryptoJS = __webpack_require__("crypto-js");
function rm(selector, all = false, dom) {
    if (all) {
        const rs = dom.querySelectorAll(selector);
        rs.forEach((e) => e.remove());
    }
    else {
        const r = dom.querySelector(selector);
        if (r) {
            r.remove();
        }
    }
}
exports.rm = rm;
function rm2(content, filters) {
    Array.from(content.childNodes).forEach((node) => {
        let text = "";
        if (node.nodeName === "#text") {
            text = node.textContent ?? "";
        }
        else {
            text = node.innerText;
        }
        for (const filter of filters) {
            if (filter instanceof RegExp) {
                if (filter.test(text)) {
                    node.remove();
                }
            }
            if (typeof filter === "string") {
                if (text.includes(filter)) {
                    node.remove();
                }
            }
        }
    });
}
exports.rm2 = rm2;
function concurrencyRun(list, limit, asyncHandle) {
    async function recursion(arr) {
        const obj = await asyncHandle(arr.shift());
        if (arr.length !== 0) {
            return recursion(arr);
        }
        else {
            return "finish!";
        }
    }
    const listCopy = [...list];
    const asyncList = [];
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
function sandboxed(code) {
    const frame = document.createElement("iframe");
    document.body.appendChild(frame);
    if (frame.contentWindow) {
        const F = frame.contentWindow.Function;
        const args = Object.keys(frame.contentWindow).join();
        document.body.removeChild(frame);
        return F(args, code)();
    }
}
exports.sandboxed = sandboxed;
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return (e instanceof DOMException &&
            (e.code === 22 ||
                e.code === 1014 ||
                e.name === "QuotaExceededError" ||
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            storage &&
            storage.length !== 0);
    }
}
exports.storageAvailable = storageAvailable;
function calculateMd5(blob) {
    return new Promise((resolve, rejects) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = () => {
            if (reader.result) {
                const wordArray = CryptoJS.lib.WordArray.create(reader.result);
                const hash = CryptoJS.MD5(wordArray).toString();
                resolve(hash);
            }
            else {
                rejects(Error("计算MD5值出错"));
                return;
            }
        };
    });
}
exports.calculateMd5 = calculateMd5;
class LocalStorageExpired {
    constructor() {
        if (storageAvailable("localStorage")) {
            this.storage = window.localStorage;
            this.init();
        }
        else {
            throw new Error("当前浏览器不支持 localStorage");
        }
    }
    init() {
        const reg = new RegExp("__expires__$");
        const storage = this.storage;
        const keys = Object.keys(storage);
        keys.forEach((key) => {
            if (!reg.test(key)) {
                this.get(key);
            }
        });
    }
    set(key, value, expired) {
        const storage = this.storage;
        storage[key] = JSON.stringify(value);
        if (expired) {
            storage[`${key}__expires__`] = Date.now() + 1000 * expired;
        }
    }
    get(key) {
        const storage = this.storage;
        const expired = storage[`${key}__expires__`] ?? false;
        const now = Date.now();
        if (expired && now >= expired) {
            this.remove(key);
            return;
        }
        if (expired) {
            try {
                const value = JSON.parse(storage[key]);
                return value;
            }
            catch (error) {
                return storage[key];
            }
        }
        else {
            return storage[key];
        }
    }
    remove(key) {
        const storage = this.storage;
        if (storage[key]) {
            delete storage[key];
            if (storage[`${key}__expires__`]) {
                delete storage[`${key}__expires__`];
            }
        }
    }
}
exports.LocalStorageExpired = LocalStorageExpired;
function deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepcopy = deepcopy;
function regexpEscape(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
exports.regexpEscape = regexpEscape;


/***/ }),

/***/ "./src/lib/zip.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FflateZip = void 0;
const fflate_1 = __webpack_require__("fflate");
const log_1 = __webpack_require__("./src/log.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
class FflateZip {
    constructor(memlimit = false) {
        this.count = 0;
        this.zcount = 0;
        this.tcount = 0;
        this.memlimit = memlimit;
        this.filenameList = [];
        this.zipOut = [];
        const self = this;
        this.savedZip = new fflate_1.Zip((err, dat, final) => {
            if (err) {
                log_1.log.error(err);
                log_1.log.trace(err);
                throw err;
            }
            self.zipOut.push(dat);
            self.zcount++;
            if (final) {
                const zipBlob = new Blob(self.zipOut, { type: "application/zip" });
                log_1.log.debug("[fflateZip][debug][zcount]" + self.zcount);
                log_1.log.debug("[fflateZip][debug][count]" + self.count);
                log_1.log.info("[fflateZip] ZIP生成完毕，文件大小：" + zipBlob.size);
                self.zipOut = [];
                if (typeof self.onFinal === "function") {
                    if (typeof self.onUpdateId !== "undefined") {
                        clearInterval(self.onUpdateId);
                    }
                    try {
                        self.onFinal(zipBlob);
                    }
                    catch (error) {
                        if (typeof self.onFinalError === "function") {
                            self.onFinalError(error);
                        }
                    }
                }
                else {
                    throw new Error("[fflateZip] 完成函数出错");
                }
            }
        });
    }
    file(filename, file) {
        if (this.filenameList.includes(filename)) {
            log_1.log.error(`filename ${filename} has existed on zip.`);
            return;
        }
        this.count++;
        this.filenameList.push(filename);
        file
            .arrayBuffer()
            .then((buffer) => new Uint8Array(buffer))
            .then((chunk) => {
            if (this.memlimit || file.type.includes("image/")) {
                const nonStreamingFile = new fflate_1.ZipPassThrough(filename);
                this.addToSavedZip(this.savedZip, nonStreamingFile, chunk);
                this.tcount++;
            }
            else {
                const nonStreamingFile = new fflate_1.AsyncZipDeflate(filename, {
                    level: 6,
                });
                this.addToSavedZip(this.savedZip, nonStreamingFile, chunk);
                this.tcount++;
            }
        })
            .catch((error) => log_1.log.error(error));
    }
    addToSavedZip(savedZip, nonStreamingFile, chunk) {
        savedZip.add(nonStreamingFile);
        nonStreamingFile.push(chunk, true);
    }
    async generateAsync(onUpdate) {
        while (this.tcount !== this.count) {
            await (0, misc_1.sleep)(500);
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
exports.FflateZip = FflateZip;


/***/ }),

/***/ "./src/log.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.log = exports.saveLogTextToFile = exports.getLogText = exports.logText = void 0;
const file_saver_1 = __webpack_require__("./node_modules/file-saver/dist/FileSaver.min.js");
const loglevel_1 = __webpack_require__("loglevel");
exports.log = loglevel_1.default;
const setting_1 = __webpack_require__("./src/setting.ts");
if (setting_1.enableDebug.value) {
    loglevel_1.default.setLevel("trace");
}
else {
    loglevel_1.default.setLevel("info");
}
exports.logText = "";
function getLogText() {
    return exports.logText;
}
exports.getLogText = getLogText;
const originalFactory = loglevel_1.default.methodFactory;
loglevel_1.default.methodFactory = (methodName, logLevel, loggerName) => {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);
    return (message) => {
        try {
            if (typeof message === "object") {
                if (message instanceof Error) {
                    exports.logText += message.stack;
                }
                else {
                    exports.logText += JSON.stringify(message, undefined, 2) + "\n";
                }
            }
            else {
                exports.logText += message + "\n";
            }
        }
        catch (error) {
            loglevel_1.default.error(error);
        }
        rawMethod(message);
    };
};
loglevel_1.default.setLevel(loglevel_1.default.getLevel());
function saveLogTextToFile() {
    (0, file_saver_1.saveAs)(new Blob([exports.logText], { type: "text/plain; charset=UTF-8" }), `novel-downloader-${Date.now().toString()}.log`);
}
exports.saveLogTextToFile = saveLogTextToFile;


/***/ }),

/***/ "./src/main.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpectError = exports.AttachmentClass = exports.Chapter = exports.Book = exports.Status = void 0;
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
var Status;
(function (Status) {
    Status[Status["pending"] = 0] = "pending";
    Status[Status["downloading"] = 1] = "downloading";
    Status[Status["failed"] = 2] = "failed";
    Status[Status["finished"] = 3] = "finished";
    Status[Status["aborted"] = 4] = "aborted";
    Status[Status["saved"] = 5] = "saved";
})(Status = exports.Status || (exports.Status = {}));
class Book {
    constructor(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters) {
        this.bookUrl = bookUrl;
        this.bookname = bookname;
        this.author = author;
        this.introduction = introduction;
        this.introductionHTML = introductionHTML;
        this.additionalMetadate = additionalMetadate;
        this.chapters = chapters;
        log_1.log.debug("[Book]初始化完成");
    }
}
exports.Book = Book;
class Chapter {
    constructor(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, charset, options) {
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
        this.options = options;
        this.status = Status.pending;
        this.retryTime = 0;
    }
    async init() {
        const { chapterName, contentRaw, contentText, contentHTML, contentImages, additionalMetadate, } = await this.parse();
        this.chapterName = chapterName;
        this.contentRaw = contentRaw;
        this.contentText = contentText;
        this.contentHTML = contentHTML;
        this.contentImages = contentImages;
        this.additionalMetadate = additionalMetadate;
        if (this.status === Status.failed) {
            log_1.log.error(`[Chapter]章节名：${this.chapterName}, \
分卷名：${this.sectionName}, URL:${this.chapterUrl}, \
VIP:${this.isVIP}, Paid:${this.isPaid}, \
isNull:${!Boolean(this.contentHTML)} 解析出错。`);
        }
        else {
            log_1.log.info(`[Chapter]章节名：${this.chapterName}, \
分卷名：${this.sectionName}, URL:${this.chapterUrl}, \
VIP:${this.isVIP}, Paid:${this.isPaid}, \
isNull:${!Boolean(this.contentHTML)} 解析成功。`);
        }
        return this;
    }
    async parse() {
        this.status = Status.downloading;
        return this.chapterParse(this.chapterUrl, this.chapterName, this.isVIP, this.isPaid, this.charset, this.options)
            .then(async (obj) => {
            const contentImages = obj.contentImages;
            if (contentImages) {
                let downloadingImages = contentImages.filter((imgObj) => imgObj.status === Status.downloading);
                while (downloadingImages.length) {
                    await (0, misc_1.sleep)(500);
                    downloadingImages = contentImages.filter((imgObj) => imgObj.status === Status.downloading);
                }
            }
            this.status = Status.finished;
            return obj;
        })
            .catch(async (err) => {
            this.retryTime++;
            log_1.log.error(`[Chapter]${this.chapterName}解析出错，第${this.retryTime}次重试，章节地址：${this.chapterUrl}`);
            if (this.status !== Status.failed && this.retryTime < setting_1.retryLimit) {
                await (0, misc_1.sleep)(this.retryTime * 1500);
                return this.parse();
            }
            else {
                this.status = Status.failed;
                log_1.log.error(err);
                log_1.log.trace(err);
                return {
                    chapterName: this.chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        });
    }
}
exports.Chapter = Chapter;
class AttachmentClass {
    constructor(imageUrl, name, mode) {
        this.url = imageUrl;
        this.name = name;
        this.mode = mode;
        this.status = Status.pending;
        this.retryTime = 0;
        this.defaultHeader = {
            Referer: document.location.origin,
        };
    }
    async init() {
        if (this.mode === "naive") {
            this.imageBlob = await this.downloadImage();
        }
        else {
            this.imageBlob = await this.tmDownloadImage();
        }
        if (this.imageBlob) {
            log_1.log.info(`[attachment] ${this.url} 下载完成。`);
        }
        return this.imageBlob;
    }
    downloadImage() {
        const headers = Object.assign(this.defaultHeader, this.headers);
        const referer = headers.Referer;
        delete headers.Referer;
        this.status = Status.downloading;
        return fetch(this.url, {
            headers: { ...headers },
            referrer: referer,
        })
            .then((response) => {
            if (response.ok) {
                this.status = Status.finished;
                return response.blob();
            }
            else {
                if (response.status === 404) {
                    this.status = Status.failed;
                }
                throw new Error(`Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`);
            }
        })
            .catch(async (err) => {
            this.retryTime++;
            log_1.log.error(`[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`);
            if (this.status !== Status.failed && this.retryTime < setting_1.retryLimit) {
                await (0, misc_1.sleep)(this.retryTime * 1500);
                return this.downloadImage();
            }
            else {
                this.status = Status.failed;
                log_1.log.error(err);
                log_1.log.trace(err);
                return null;
            }
        });
    }
    tmDownloadImage() {
        const headers = Object.assign(this.defaultHeader, this.headers);
        this.status = Status.downloading;
        return (0, http_1.gfetch)(this.url, {
            headers: { ...headers },
            responseType: "blob",
        })
            .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                this.status = Status.finished;
                return response.response;
            }
            else {
                if (response.status === 404) {
                    this.status = Status.failed;
                }
                throw new Error(`Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`);
            }
        })
            .catch(async (err) => {
            this.retryTime++;
            log_1.log.error(`[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`);
            if (this.status !== Status.failed && this.retryTime < setting_1.retryLimit) {
                await (0, misc_1.sleep)(this.retryTime * 1000);
                return this.tmDownloadImage();
            }
            else {
                this.status = Status.failed;
                log_1.log.error(err);
                log_1.log.trace(err);
                return null;
            }
        });
    }
}
exports.AttachmentClass = AttachmentClass;
class ExpectError extends Error {
}
exports.ExpectError = ExpectError;


/***/ }),

/***/ "./src/router/download.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRule = void 0;
async function getRule() {
    const host = document.location.host;
    let ruleClass;
    switch (host) {
        case "www.ciweimao.com": {
            const { Ciweimao } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/ciweimao.ts"));
            ruleClass = Ciweimao;
            break;
        }
        case "www.uukanshu.com": {
            const { Uukanshu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/uukanshu.ts"));
            ruleClass = Uukanshu;
            break;
        }
        case "www.yruan.com": {
            const { Yrun } = await Promise.resolve().then(() => __webpack_require__("./src/rules/yruan.ts"));
            ruleClass = Yrun;
            break;
        }
        case "www.shuquge.com":
        case "www.sizhicn.com": {
            const { shuquge } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type2.ts"));
            ruleClass = shuquge();
            break;
        }
        case "www.dingdiann.net": {
            const { dingdiann } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type3.ts"));
            ruleClass = dingdiann();
            break;
        }
        case "www.biquge66.com":
        case "www.lewenn.com":
        case "www.klxs.la":
        case "www.xkzw.org": {
            const { Xkzw } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/xkzw.ts"));
            ruleClass = Xkzw;
            break;
        }
        case "www.266ks.com": {
            const { c226ks } = await Promise.resolve().then(() => __webpack_require__("./src/rules/onePageWithoutSectionWithMultiIndexPage/226ks.ts"));
            ruleClass = c226ks();
            break;
        }
        case "book.sfacg.com": {
            const { Sfacg } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/sfacg.ts"));
            ruleClass = Sfacg;
            break;
        }
        case "www.hetushu.com":
        case "hetushu.com": {
            const { Hetushu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/hetushu.ts"));
            ruleClass = Hetushu;
            break;
        }
        case "www.shouda8.com":
        case "www.shouda88.com": {
            const { Shouda8 } = await Promise.resolve().then(() => __webpack_require__("./src/rules/shouda8.ts"));
            ruleClass = Shouda8;
            break;
        }
        case "www.gebiqu.com": {
            const { gebiqu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = gebiqu();
            break;
        }
        case "www.meegoq.com":
        case "www.viviyzw.com": {
            const { Meegoq } = await Promise.resolve().then(() => __webpack_require__("./src/rules/meegoq.ts"));
            ruleClass = Meegoq;
            break;
        }
        case "www.xiaoshuodaquan.com":
        case "www.1pwx.com":
        case "1pwx.com": {
            const { Xiaoshuodaquan } = await Promise.resolve().then(() => __webpack_require__("./src/rules/xiaoshuodaquan.ts"));
            ruleClass = Xiaoshuodaquan;
            break;
        }
        case "book.qidian.com": {
            const { Qidian } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/qidian.ts"));
            ruleClass = Qidian;
            break;
        }
        case "www.jjwxc.net": {
            const { Jjwxc } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/jjwxc.ts"));
            ruleClass = Jjwxc;
            break;
        }
        case "www.banzhuer.org":
        case "www.biquwoo.com":
        case "www.biquwo.org":
        case "www.hongyeshuzhai.com": {
            const { common } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = common();
            break;
        }
        case "www.bz01.org": {
            const { common1 } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = common1();
            break;
        }
        case "www.81book.com":
        case "www.81zw.com": {
            const { c81book } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = c81book();
            break;
        }
        case "book.zongheng.com":
        case "huayu.zongheng.com": {
            const { Zongheng } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/zongheng.ts"));
            ruleClass = Zongheng;
            break;
        }
        case "www.17k.com": {
            const { C17k } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/17k.ts"));
            ruleClass = C17k;
            break;
        }
        case "www.shuhai.com":
        case "mm.shuhai.com": {
            const { Shuhai } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/shuhai.ts"));
            ruleClass = Shuhai;
            break;
        }
        case "www.gongzicp.com":
        case "gongzicp.com": {
            const { Gongzicp } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/gongzicp.ts"));
            ruleClass = Gongzicp;
            break;
        }
        case "m.yuzhaige.cc":
        case "m.yushuge123.com": {
            const { Yuzhaige } = await Promise.resolve().then(() => __webpack_require__("./src/rules/yuzhaige.ts"));
            ruleClass = Yuzhaige;
            break;
        }
        case "www.linovel.net": {
            const { Linovel } = await Promise.resolve().then(() => __webpack_require__("./src/rules/linovel.ts"));
            ruleClass = Linovel;
            break;
        }
        case "www.xinwanben.com": {
            const { xinwanben } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type3.ts"));
            ruleClass = xinwanben();
            break;
        }
        case "www.tadu.com": {
            const { Tadu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/tadu.ts"));
            ruleClass = Tadu;
            break;
        }
        case "www.idejian.com": {
            const { Idejian } = await Promise.resolve().then(() => __webpack_require__("./src/rules/idejian.ts"));
            ruleClass = Idejian;
            break;
        }
        case "www.qimao.com": {
            const { Qimao } = await Promise.resolve().then(() => __webpack_require__("./src/rules/qimao.ts"));
            ruleClass = Qimao;
            break;
        }
        case "www.wenku8.net": {
            const { Wenku8 } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/wenku8.ts"));
            ruleClass = Wenku8;
            break;
        }
        case "manhua.dmzj.com":
        case "www.dmzj.com": {
            const { Dmzj } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/dmzj.ts"));
            ruleClass = Dmzj;
            break;
        }
        case "sosad.fun":
        case "www.sosad.fun":
        case "wenzhan.org":
        case "www.wenzhan.org":
        case "sosadfun.com":
        case "www.sosadfun.com":
        case "xn--pxtr7m5ny.com":
        case "www.xn--pxtr7m5ny.com":
        case "xn--pxtr7m.com":
        case "www.xn--pxtr7m.com":
        case "xn--pxtr7m5ny.net":
        case "www.xn--pxtr7m5ny.net":
        case "xn--pxtr7m.net":
        case "www.xn--pxtr7m.net":
        case "sosadfun.link":
        case "www.sosadfun.link": {
            const { Sosadfun } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/sosadfun.ts"));
            ruleClass = Sosadfun;
            break;
        }
        case "www.westnovel.com": {
            const { Westnovel } = await Promise.resolve().then(() => __webpack_require__("./src/rules/westnovel.ts"));
            ruleClass = Westnovel;
            break;
        }
        case "www.mht.tw":
        case "www.mht99.com": {
            const { mht } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type3.ts"));
            ruleClass = mht();
            break;
        }
        case "www.xbiquge.so": {
            const { xbiquge } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = xbiquge();
            break;
        }
        case "www.linovelib.com": {
            const { Linovelib } = await Promise.resolve().then(() => __webpack_require__("./src/rules/linovelib.ts"));
            ruleClass = Linovelib;
            break;
        }
        case "www.luoqiuzw.com": {
            const { luoqiuzw } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = luoqiuzw();
            break;
        }
        case "www.yibige.la": {
            const { Yibige } = await Promise.resolve().then(() => __webpack_require__("./src/rules/yibige.ts"));
            ruleClass = Yibige;
            break;
        }
        case "www.fushuwang.org": {
            const { Fushuwang } = await Promise.resolve().then(() => __webpack_require__("./src/rules/fushuwang.ts"));
            ruleClass = Fushuwang;
            break;
        }
        case "www.soxscc.net":
        case "www.soxscc.org":
        case "www.soxs.cc":
        case "www.soshuw.com":
        case "www.soshuwu.org":
        case "www.soxscc.cc":
        case "www.soshuwu.com":
        case "www.kubiji.net": {
            const { Soxscc } = await Promise.resolve().then(() => __webpack_require__("./src/rules/soxscc.ts"));
            ruleClass = Soxscc;
            break;
        }
        case "www.fuguoduxs.com":
        case "www.shubaowa.org": {
            const { Shubaowa } = await Promise.resolve().then(() => __webpack_require__("./src/rules/shubaowa.ts"));
            ruleClass = Shubaowa;
            break;
        }
        case "www.xyqxs.cc": {
            const { xyqxs } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type2.ts"));
            ruleClass = xyqxs();
            break;
        }
        case "www.630shu.net": {
            const { c630shu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/onePageWithoutSection/630shu.ts"));
            ruleClass = c630shu;
            break;
        }
        case "www.qingoo.cn": {
            const { Qingoo } = await Promise.resolve().then(() => __webpack_require__("./src/rules/qingoo.ts"));
            ruleClass = Qingoo;
            break;
        }
        case "www.trxs.cc":
        case "www.trxs123.com":
        case "www.jpxs123.com":
        case "trxs.cc":
        case "trxs123.com":
        case "jpxs123.com": {
            const { trxs } = await Promise.resolve().then(() => __webpack_require__("./src/rules/onePageWithoutSection/trxs.ts"));
            ruleClass = trxs();
            break;
        }
        case "www.tongrenquan.org":
        case "www.tongrenquan.me":
        case "tongrenquan.me":
        case "tongrenquan.org": {
            const { tongrenquan } = await Promise.resolve().then(() => __webpack_require__("./src/rules/onePageWithoutSection/trxs.ts"));
            ruleClass = tongrenquan();
            break;
        }
        case "www.imiaobige.com": {
            const { Imiaobige } = await Promise.resolve().then(() => __webpack_require__("./src/rules/imiaobige.ts"));
            ruleClass = Imiaobige;
            break;
        }
        case "www.256wxc.com":
        case "www.256wenku.com": {
            const { c256wxc } = await Promise.resolve().then(() => __webpack_require__("./src/rules/onePageWithoutSection/256wxc.ts"));
            ruleClass = c256wxc;
            break;
        }
        case regExpMatch(/lofter\.com$/): {
            const { Lofter } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/lofter.ts"));
            ruleClass = Lofter;
            break;
        }
        case "www.lwxs9.org": {
            const { lwxs9 } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = lwxs9();
            break;
        }
        case "www.shubl.com": {
            const { Shubl } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/shubl.ts"));
            ruleClass = Shubl;
            break;
        }
        case "www.ujxs.net": {
            const { Ujxs } = await Promise.resolve().then(() => __webpack_require__("./src/rules/ujxs.ts"));
            ruleClass = Ujxs;
            break;
        }
        case "m.haitangtxt.net": {
            const { Haitangtxt } = await Promise.resolve().then(() => __webpack_require__("./src/rules/haitangtxt.ts"));
            ruleClass = Haitangtxt;
            break;
        }
        case "ebook.longmabook.com":
        case "www.longmabookcn.com":
        case "ebook.lmbooks.com":
        case "www.lmebooks.com":
        case "www.haitbook.com":
        case "www.htwhbook.com":
        case "www.myhtebook.com":
        case "www.lovehtbooks.com":
        case "www.myhtebooks.com":
        case "www.myhtlmebook.com":
        case "jp.myhtebook.com":
        case "jp.myhtlmebook.com":
        case "ebook.urhtbooks.com":
        case "www.urhtbooks.com":
        case "www.newhtbook.com":
        case "www.lvhtebook.com":
        case "jp.lvhtebook.com":
        case "www.htlvbooks.com": {
            const { Longmabook } = await Promise.resolve().then(() => __webpack_require__("./src/rules/special/longmabook.ts"));
            ruleClass = Longmabook;
            break;
        }
        case "dijiubook.net": {
            const { dijiubook } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = dijiubook();
            break;
        }
        case "www.biquwx.la": {
            const { biquwx } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = biquwx();
            break;
        }
        case "www.25zw.com": {
            const { c25zw } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = c25zw();
            break;
        }
        case "www.tycqxs.com": {
            const { tycqxs } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge/type1.ts"));
            ruleClass = tycqxs();
            break;
        }
        default: {
            throw new Error("Not Found Rule!");
        }
    }
    const rule = new ruleClass();
    return rule;
    function regExpMatch(regexp) {
        if (regexp.test(host)) {
            return host;
        }
    }
}
exports.getRule = getRule;


/***/ }),

/***/ "./src/router/ui.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUI = void 0;
const errorObject = {
    type: "error",
};
function getUI() {
    const host = document.location.host;
    switch (host) {
        case "m.shuquge.com": {
            const _pathname = document.location.pathname.split("/").slice(-1)[0];
            const _id = _pathname.match(/^(\d+)/);
            if (!_id) {
                return errorObject;
            }
            const id = _id[0];
            return {
                type: "jump",
                jumpFunction() {
                    document.location.href = `https://www.shuquge.com/txt/${id}/index.html`;
                },
            };
        }
        case "m.xinwanben.com": {
            return {
                type: "jump",
                jumpFunction() {
                    document.location.host = "www.xinwanben.com";
                },
            };
        }
        default: {
            return {
                type: "download",
            };
        }
    }
}
exports.getUI = getUI;


/***/ }),

/***/ "./src/rules.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseRuleClass = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const save_1 = __webpack_require__("./src/save/save.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const stat_1 = __webpack_require__("./src/stat.ts");
const progress_1 = __webpack_require__("./src/ui/progress.ts");
const workStatusKeyName = "novel-downloader-EaraVl9TtSM2405L";
class BaseRuleClass {
    constructor() {
        this.imageMode = "TM";
        this.charset = document.charset;
        this.concurrencyLimit = 10;
    }
    async run() {
        log_1.log.info(`[run]下载开始`);
        const self = this;
        try {
            if (!self.preHook())
                return;
            if (typeof window._book !==
                "undefined" &&
                window._book) {
                self.book = window._book;
            }
            else {
                self.book = await self.bookParse();
                window._book = self.book;
            }
            log_1.log.debug("[book]Book object:\n" + JSON.stringify(self.book));
            const saveBookObj = self.getSave(self.book);
            await self.initChapters(self.book, saveBookObj);
            log_1.log.debug("[run]开始保存文件");
            saveBookObj.saveTxt();
            await saveBookObj.saveZip(false);
            self.postHook();
            self.postCallback();
            (0, stat_1.successPlus)();
            (0, stat_1.printStat)();
            return self.book;
        }
        catch (error) {
            self.catchError(error);
        }
    }
    preTest() {
        const self = this;
        const storage = window.customStorage;
        let workStatus = storage.get(workStatusKeyName);
        if (workStatus) {
            const nowNumber = Object.keys(workStatus).length;
            if (self.maxRunLimit && nowNumber >= self.maxRunLimit) {
                return false;
            }
        }
        else {
            workStatus = {};
            workStatus[document.location.href] = true;
            storage.set(workStatusKeyName, workStatus, 20);
        }
        return true;
    }
    preWarning() {
        return true;
    }
    preHook() {
        const self = this;
        if (!self.preTest()) {
            const alertText = `当前网站目前最多允许${self.maxRunLimit}个下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
            alert(alertText);
            log_1.log.info(`[run]${alertText}`);
            return false;
        }
        if (!self.preWarning()) {
            return false;
        }
        self.audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjcxLjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhoaGvr6+vr6+8vLy8vLzKysrKysrX19fX19fX5eXl5eXl8vLy8vLy////////AAAAAExhdmM1Ny44OQAAAAAAAAAAAAAAACQCgAAAAAAAAAVY82AhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAALACwAAP/AADwQKVE9YWDGPkQWpT66yk4+zIiYPoTUaT3tnU487uNhOvEmQDaCm1Yz1c6DPjbs6zdZVBk0pdGpMzxF/+MYxA8L0DU0AP+0ANkwmYaAMkOKDDjmYoMtwNMyDxMzDHE/MEsLow9AtDnBlQgDhTx+Eye0GgMHoCyDC8gUswJcMVMABBGj/+MYxBoK4DVpQP8iAtVmDk7LPgi8wvDzI4/MWAwK1T7rxOQwtsItMMQBazAowc4wZMC5MF4AeQAGDpruNuMEzyfjLBJhACU+/+MYxCkJ4DVcAP8MAO9J9THVg6oxRMGNMIqCCTAEwzwwBkINOPAs/iwjgBnMepYyId0PhWo+80PXMVsBFzD/AiwwfcKGMEJB/+MYxDwKKDVkAP8eAF8wMwIxMlpU/OaDPLpNKkEw4dRoBh6qP2FC8jCJQFcweQIPMHOBtTBoAVcwOoCNMYDI0u0Dd8ANTIsy/+MYxE4KUDVsAP8eAFBVpgVVPjdGeTEWQr0wdcDtMCeBgDBkgRgwFYB7Pv/zqx0yQQMCCgKNgonHKj6RRVkxM0GwML0AhDAN/+MYxF8KCDVwAP8MAIHZMDDA3DArAQo3K+TF5WOBDQw0lgcKQUJxhT5sxRcwQQI+EIPWMA7AVBoTABgTgzfBN+ajn3c0lZMe/+MYxHEJyDV0AP7MAA4eEwsqP/PDmzC/gNcwXUGaMBVBIwMEsmB6gaxhVuGkpoqMZMQjooTBwM0+S8FTMC0BcjBTgPwwOQDm/+MYxIQKKDV4AP8WADAzAKQwI4CGPhWOEwCFAiBAYQnQMT+uwXUeGzjBWQVkwTcENMBzA2zAGgFEJfSPkPSZzPXgqFy2h0xB/+MYxJYJCDV8AP7WAE0+7kK7MQrATDAvQRIwOADKMBuA9TAYQNM3AiOSPjGxowgHMKFGcBNMQU1FMy45OS41VVU/31eYM4sK/+MYxKwJaDV8AP7SAI4y1Yq0MmOIADGwBZwwlgIJMztCM0qU5TQPG/MSkn8yEROzCdAxECVMQU1FMy45OS41VTe7Ohk+Pqcx/+MYxMEJMDWAAP6MADVLDFUx+4J6Mq7NsjN2zXo8V5fjVJCXNOhwM0vTCDAxFpMYYQU+RlVMQU1FMy45OS41VVVVVVVVVVVV/+MYxNcJADWAAP7EAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOsJwDWEAP7SAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPMLoDV8AP+eAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPQL0DVcAP+0AFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
        self.audio.loop = true;
        self.audio.play();
        const confirmExit = (e) => {
            e.preventDefault();
            const confirmationText = "您正尝试离开本页面，当前页面有下载任务正在运行，是否确认离开？";
            return (e.returnValue = confirmationText);
        };
        window.onbeforeunload = confirmExit;
        window.downloading = true;
        return true;
    }
    postCallback() {
        if (setting_1.enableCustomFinishCallback &&
            typeof unsafeWindow.customFinishCallback ===
                "function") {
            const customFinishCallback = unsafeWindow
                .customFinishCallback;
            if (customFinishCallback) {
                log_1.log.info(`发现自定义结束回调函数，内容如下：\n${customFinishCallback.toString()}`);
                customFinishCallback();
            }
        }
    }
    postHook() {
        const self = this;
        const storage = window.customStorage;
        const workStatus = storage.get(workStatusKeyName);
        if (workStatus) {
            delete workStatus[document.location.href];
        }
        (0, attachments_1.clearAttachmentClassCache)();
        self.audio?.pause();
        self.audio?.remove();
        window.onbeforeunload = null;
        window.downloading = false;
        progress_1.vm.reset();
        return true;
    }
    catchError(error) {
        const self = this;
        log_1.log.error(error);
        log_1.log.trace(error);
        self.postHook();
        if (!(error instanceof main_1.ExpectError)) {
            document.getElementById("button-div")?.remove();
            log_1.log.error("运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
            (0, stat_1.failedPlus)();
            alert("运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
            (0, log_1.saveLogTextToFile)();
        }
    }
    getSave(book) {
        log_1.log.debug("[run]保存数据");
        if (setting_1.enableCustomSaveOptions &&
            typeof unsafeWindow.saveOptions === "object" &&
            (0, save_1.saveOptionsValidate)(unsafeWindow.saveOptions)) {
            const saveOptionsInner = unsafeWindow.saveOptions;
            if (saveOptionsInner) {
                log_1.log.info("[run]发现自定义保存参数，内容如下\n", saveOptionsInner);
                return (0, save_1.getSaveBookObj)(book, saveOptionsInner);
            }
        }
        return (0, save_1.getSaveBookObj)(book, {});
    }
    getChapters(book) {
        function isEnable() {
            if (setting_1.enableCustomChapterFilter &&
                typeof unsafeWindow.chapterFilter === "function") {
                let text = "[initChapters]发现自定义筛选函数，自定义筛选函数内容如下：\n";
                text += unsafeWindow.chapterFilter.toString();
                log_1.log.info(text);
                return true;
            }
            else {
                return false;
            }
        }
        function _filter(chapter) {
            let b = true;
            try {
                const u = unsafeWindow.chapterFilter(chapter);
                if (typeof u === "boolean") {
                    b = u;
                }
            }
            catch (error) {
                log_1.log.error("运行自定义筛选函数时出错。", error);
                log_1.log.trace(error);
            }
            return b;
        }
        let chapters = book.chapters.filter((chapter) => chapter.status === main_1.Status.pending);
        const enabled = isEnable();
        if (enabled) {
            log_1.log.debug("[initChapters]筛选需下载章节");
            chapters = chapters.filter((chapter) => _filter(chapter));
        }
        return chapters;
    }
    async initChapters(book, saveBookObj) {
        const self = this;
        log_1.log.info(`[initChapters]开始初始化章节`);
        Object.entries(self).forEach((kv) => log_1.log.info(`[initChapters] ${kv[0]}: ${kv[1]}`));
        const chapters = self.getChapters(book);
        if (chapters.length === 0) {
            log_1.log.error(`[initChapters]初始化章节出错，未找到需初始化章节`);
            return [];
        }
        progress_1.vm.totalChapterNumber = chapters.length;
        if (self.concurrencyLimit === 1) {
            for (const chapter of chapters) {
                if (window.stopFlag) {
                    log_1.log.info("[chapter]收到停止信号，停止继续下载。");
                    break;
                }
                try {
                    let chapterObj = await chapter.init();
                    chapterObj = await self.postChapterParseHook(chapterObj, saveBookObj);
                }
                catch (error) {
                    log_1.log.error(error);
                    log_1.log.trace(error);
                }
            }
        }
        else {
            await (0, misc_1.concurrencyRun)(chapters, self.concurrencyLimit, async (curChapter) => {
                if (curChapter === undefined) {
                    return Promise.resolve();
                }
                if (window.stopFlag) {
                    log_1.log.info("[chapter]收到停止信号，停止继续下载。");
                    return Promise.resolve();
                }
                try {
                    let chapterObj = await curChapter.init();
                    chapterObj = await self.postChapterParseHook(chapterObj, saveBookObj);
                    return chapterObj;
                }
                catch (error) {
                    log_1.log.error(error);
                    log_1.log.trace(error);
                }
            });
        }
        log_1.log.info(`[initChapters]章节初始化完毕`);
        return chapters;
    }
    async postChapterParseHook(chapter, saveBookObj) {
        const storage = window.customStorage;
        let workStatus = storage.get(workStatusKeyName);
        if (workStatus) {
            workStatus[document.location.href] = true;
        }
        else {
            workStatus = {};
            workStatus[document.location.href] = true;
        }
        storage.set(workStatusKeyName, workStatus, 20);
        if (chapter.contentHTML !== undefined) {
            saveBookObj.addChapter(chapter);
            progress_1.vm.finishedChapterNumber++;
        }
        return chapter;
    }
}
exports.BaseRuleClass = BaseRuleClass;


/***/ }),

/***/ "./src/rules/biquge/template.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mkBiqugeClass3 = exports.mkBiqugeClass2 = exports.mkBiqugeClass = exports.chapterParseTemp = exports.bookParseTemp = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
async function bookParseTemp({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, chapterListSelector, charset, chapterParse, enableIgnore = true, }) {
    const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, introDomPatch);
    const additionalMetadate = {};
    if (coverUrl) {
        (0, attachments_1.getImageAttachment)(coverUrl, "TM", "cover-")
            .then((coverClass) => {
            additionalMetadate.cover = coverClass;
        })
            .catch((error) => log_1.log.error(error));
    }
    const dls = document.querySelectorAll(chapterListSelector);
    const dlc = [];
    Array.from(dls)
        .map((dl) => Array.from(dl.children))
        .forEach((dlcList) => dlcList.forEach((dl) => dlc.push(dl)));
    let i = 1;
    if (enableIgnore) {
        if (dlc[0].nodeName === "DT") {
            const dt = dlc[0];
            if (/最新(.+)?章节/.test(dt.innerText)) {
                delete dlc[0];
                for (; i < dlc.length; i++) {
                    const d = dlc[i];
                    if (d.nodeName === "DT") {
                        break;
                    }
                    else {
                        delete dlc[i];
                    }
                }
            }
        }
    }
    const chapters = [];
    const chapterList = dlc.filter((obj) => obj !== undefined);
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (const node of chapterList) {
        if (node.nodeName === "DT") {
            sectionNumber++;
            sectionChapterNumber = 0;
            if (node.innerText.includes("《")) {
                sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
            }
            else {
                sectionName = node.innerText.replace(`${bookname}`, "").trim();
            }
        }
        else if (node.nodeName === "DD") {
            if (node.childElementCount === 0) {
                continue;
            }
            chapterNumber++;
            sectionChapterNumber++;
            const a = node.firstElementChild;
            const chapterName = a.innerText;
            const chapterUrl = a.href;
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, charset, { bookname });
            chapters.push(chapter);
        }
    }
    const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
    return book;
}
exports.bookParseTemp = bookParseTemp;
async function chapterParseTemp({ dom, chapterUrl, chapterName, contenSelector, contentPatch, charset, options, }) {
    let content = dom.querySelector(contenSelector);
    if (content) {
        content = contentPatch(content, options);
        const { dom: domClean, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
        return {
            chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: domClean,
            contentImages: images,
            additionalMetadate: null,
        };
    }
    else {
        return {
            chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };
    }
}
exports.chapterParseTemp = chapterParseTemp;
function mkBiqugeClass(introDomPatch, contentPatch, concurrencyLimit, enableIgnore) {
    return class extends rules_1.BaseRuleClass {
        constructor() {
            super();
            if (typeof concurrencyLimit === "number") {
                this.concurrencyLimit = concurrencyLimit;
            }
            this.imageMode = "TM";
            this.charset = document.charset;
            this.overrideConstructor(this);
        }
        async bookParse() {
            const self = this;
            if (enableIgnore === undefined) {
                enableIgnore = true;
            }
            return bookParseTemp({
                bookUrl: document.location.href,
                bookname: document.querySelector("#info h1:nth-of-type(1)").innerText
                    .trim()
                    .replace(/最新章节$/, ""),
                author: document.querySelector("#info > p:nth-child(2)").innerText
                    .replace(/作(\s+)?者[：:]/, "")
                    .trim(),
                introDom: document.querySelector("#intro"),
                introDomPatch,
                coverUrl: document.querySelector("#fmimg > img")
                    .src,
                chapterListSelector: "#list>dl",
                charset: document.charset,
                chapterParse: self.chapterParse,
                enableIgnore,
            });
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            return chapterParseTemp({
                dom: doc,
                chapterUrl,
                chapterName: (doc.querySelector(".bookname > h1:nth-child(1)")?.innerText.trim() ||
                    chapterName) ??
                    "",
                contenSelector: "#content",
                contentPatch,
                charset,
                options,
            });
        }
        overrideConstructor(self) {
        }
    };
}
exports.mkBiqugeClass = mkBiqugeClass;
function mkBiqugeClass2(introDomPatch, contentPatch, concurrencyLimit) {
    return class extends rules_1.BaseRuleClass {
        constructor() {
            super();
            if (typeof concurrencyLimit === "number") {
                this.concurrencyLimit = concurrencyLimit;
            }
            this.imageMode = "TM";
            this.charset = document.charset;
            this.overrideConstructor(this);
        }
        async bookParse() {
            const self = this;
            return bookParseTemp({
                bookUrl: document.location.href,
                bookname: document.querySelector(".info > h2").innerText
                    .trim()
                    .replace(/最新章节$/, ""),
                author: document.querySelector(".small > span:nth-child(1)").innerText
                    .replace(/作(\s+)?者[：:]/, "")
                    .trim(),
                introDom: document.querySelector(".intro"),
                introDomPatch,
                coverUrl: document.querySelector(".info > .cover > img").src,
                chapterListSelector: ".listmain>dl",
                charset: document.charset,
                chapterParse: self.chapterParse,
            });
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            return chapterParseTemp({
                dom,
                chapterUrl,
                chapterName: dom.querySelector(".content > h1:nth-child(1)").innerText.trim(),
                contenSelector: "#content",
                contentPatch,
                charset,
                options,
            });
        }
        overrideConstructor(self) {
        }
    };
}
exports.mkBiqugeClass2 = mkBiqugeClass2;
function mkBiqugeClass3(introDomPatch, contentPatch, getNextPage, continueCondition, concurrencyLimit, enableIgnore) {
    return class extends rules_1.BaseRuleClass {
        constructor() {
            super();
            if (typeof concurrencyLimit === "number") {
                this.concurrencyLimit = concurrencyLimit;
            }
            this.imageMode = "TM";
            this.charset = document.charset;
            this.overrideConstructor(this);
        }
        async bookParse() {
            const self = this;
            if (enableIgnore === undefined) {
                enableIgnore = true;
            }
            return bookParseTemp({
                bookUrl: document.location.href,
                bookname: document.querySelector("#info h1:nth-of-type(1)").innerText
                    .trim()
                    .replace(/最新章节$/, ""),
                author: document.querySelector("#info > p:nth-child(2)").innerText
                    .replace(/作(\s+)?者[：:]/, "")
                    .trim(),
                introDom: document.querySelector("#intro"),
                introDomPatch,
                coverUrl: document.querySelector("#fmimg > img")
                    .src,
                chapterListSelector: "#list>dl",
                charset: document.charset,
                chapterParse: self.chapterParse,
                enableIgnore,
            });
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            return (0, common_1.nextPageParse)({
                chapterName,
                chapterUrl,
                charset,
                selector: "#content",
                contentPatch,
                getNextPage,
                continueCondition,
            });
        }
        overrideConstructor(self) {
        }
    };
}
exports.mkBiqugeClass3 = mkBiqugeClass3;


/***/ }),

/***/ "./src/rules/biquge/type1.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xbiquge = exports.c25zw = exports.dijiubook = exports.tycqxs = exports.biquwx = exports.lwxs9 = exports.luoqiuzw = exports.gebiqu = exports.c81book = exports.common1 = exports.common = void 0;
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const template_1 = __webpack_require__("./src/rules/biquge/template.ts");
const common = () => (0, template_1.mkBiqugeClass)((introDom) => introDom, (content) => content);
exports.common = common;
const common1 = () => (0, template_1.mkBiqugeClass)((introDom) => introDom, (content) => content, undefined, false);
exports.common1 = common1;
const c81book = () => (0, template_1.mkBiqugeClass)((introDom) => introDom, (content) => content);
exports.c81book = c81book;
const gebiqu = () => (0, template_1.mkBiqugeClass)((introDom) => {
    introDom.innerHTML = introDom.innerHTML.replace(/如果您喜欢.+，别忘记分享给朋友/g, "");
    (0, misc_1.rm)('a[href^="http://down.gebiqu.com"]', false, introDom);
    return introDom;
}, (content) => {
    content.innerHTML = content.innerHTML.replace(/"www.gebiqu.com"/g, "");
    return content;
});
exports.gebiqu = gebiqu;
const luoqiuzw = () => (0, template_1.mkBiqugeClass)((introDom) => introDom, (content) => {
    const ad = content.firstElementChild;
    if (ad.innerText.includes("天才一秒记住本站地址：")) {
        ad.remove();
    }
    const ads = ["记住网址m.luoqｉｕｘｚｗ．ｃｏｍ"];
    ads.forEach((adt) => (content.innerHTML = content.innerHTML.replace(adt, "")));
    return content;
});
exports.luoqiuzw = luoqiuzw;
const lwxs9 = () => (0, template_1.mkBiqugeClass)((introDom) => introDom, (content) => {
    (0, misc_1.rm)("div[align]", false, content);
    return content;
});
exports.lwxs9 = lwxs9;
const biquwx = () => (0, template_1.mkBiqugeClass)((introDom) => {
    introDom.innerHTML = introDom.innerHTML.replace(/本站提示：各位书友要是觉得《.+》还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！/, "");
    return introDom;
}, (content) => content, 1);
exports.biquwx = biquwx;
const tycqxs = () => (0, template_1.mkBiqugeClass)((introDom) => introDom, (content) => {
    content.innerHTML = content.innerHTML.replace(/推荐都市大神老施新书:<a href="https:\/\/www\.tycqxs\.com\/[\d_]+\/" target="_blank">.+<\/a>/, "");
    return content;
});
exports.tycqxs = tycqxs;
const dijiubook = () => {
    const c = (0, template_1.mkBiqugeClass)((introDom) => {
        introDom.innerHTML = introDom.innerHTML.replace("本书网址：", "");
        (0, misc_1.rm)('a[href^="https://dijiubook.net/"]', false, introDom);
        (0, misc_1.rm)("dl > dt:nth-of-type(2)", false, document.querySelector("#list"));
        document
            .querySelectorAll('#list a[href^="https://m.dijiubook.net"]')
            .forEach((elem) => elem.parentElement?.remove());
        document
            .querySelectorAll('#list a[href$=".apk"]')
            .forEach((elem) => elem.parentElement?.remove());
        return introDom;
    }, (content) => {
        (0, misc_1.rm)("a", true, content);
        return content;
    });
    c.prototype.overrideConstructor = (classThis) => {
        classThis.concurrencyLimit = 1;
        classThis.maxRunLimit = 1;
        classThis.postChapterParseHook = async (obj) => {
            await (0, misc_1.sleep)(3000 * Math.random());
            return obj;
        };
    };
    return c;
};
exports.dijiubook = dijiubook;
const c25zw = () => (0, template_1.mkBiqugeClass)((introDom) => {
    introDom.querySelector("font")?.parentElement?.remove();
    introDom.innerHTML = introDom.innerHTML.replace("简介:", "");
    return introDom;
}, (content) => {
    (0, misc_1.rm)(".bottem", false, content);
    return content;
});
exports.c25zw = c25zw;
const xbiquge = () => (0, template_1.mkBiqugeClass)((introDom) => introDom, (content, options) => {
    content.innerHTML = content.innerHTML.replace(`笔趣阁 www.xbiquge.so，最快更新${options.bookname} ！`, "");
    return content;
});
exports.xbiquge = xbiquge;


/***/ }),

/***/ "./src/rules/biquge/type2.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xyqxs = exports.shuquge = void 0;
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const template_1 = __webpack_require__("./src/rules/biquge/template.ts");
const shuquge = () => (0, template_1.mkBiqugeClass2)((introDom) => {
    document.querySelector(".noshow")?.classList.remove("noshow");
    if (document.querySelector(".showall")) {
        document.querySelector(".showall").innerHTML = "";
    }
    introDom.innerHTML = introDom.innerHTML
        .replace(/作者：.+所写的《.+》无弹窗免费全文阅读为转载作品,章节由网友发布。/, "")
        .replace(/推荐地址：https?:\/\/www.shuquge.com\/txt\/\d+\/index\.html/g, "");
    return introDom;
}, (content) => {
    content.innerHTML = content.innerHTML
        .replace("请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com", "")
        .replace(/https?:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
    return content;
}, 1);
exports.shuquge = shuquge;
const xyqxs = () => (0, template_1.mkBiqugeClass2)((introDom) => {
    introDom.innerHTML = introDom.innerHTML.replace(/推荐地址：https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/index\.html/g, "");
    return introDom;
}, (content) => {
    (0, misc_1.rm)("div[style]", true, content);
    (0, misc_1.rm)("script", true, content);
    (0, misc_1.rm)('div[align="center"]', false, content);
    content.innerHTML = content.innerHTML
        .replace("请记住本书首发域名：www.xyqxs.cc。笔趣阁手机版阅读网址：m.xyqxs.cc", "")
        .replace(/\(https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/\d+\.html\)/, "");
    return content;
});
exports.xyqxs = xyqxs;


/***/ }),

/***/ "./src/rules/biquge/type3.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xinwanben = exports.mht = exports.dingdiann = void 0;
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const template_1 = __webpack_require__("./src/rules/biquge/template.ts");
const dingdiann = () => (0, template_1.mkBiqugeClass3)((introDom) => introDom, (content, doc) => {
    (0, misc_1.rm)("div[align]", false, content);
    (0, misc_1.rm)("script", true, content);
    const removelist = [
        "一秒记住，精彩小说无弹窗免费阅读！",
        "&lt;/a　:&gt;",
        "--&gt;&gt;",
        "本章未完，点击下一页继续阅读",
    ];
    removelist.forEach((removeStr) => (content.innerHTML = content.innerHTML.replaceAll(removeStr, "")));
    (0, cleanDOM_1.htmlTrim)(content);
    return content;
}, (doc) => doc.querySelector(".bottem2 > a:nth-child(4)")
    .href, (_content, nextLink) => _content.innerText.includes("本章未完，点击下一页继续阅读"));
exports.dingdiann = dingdiann;
const mht = () => (0, template_1.mkBiqugeClass3)((introDom) => introDom, (content, doc) => {
    (0, misc_1.rm)("p[data-id]", true, content);
    (0, cleanDOM_1.htmlTrim)(content);
    return content;
}, (doc) => doc.querySelector(".bottem2 > a:nth-child(4)")
    .href, (_content, nextLink) => new URL(nextLink).pathname.includes("_"));
exports.mht = mht;
const xinwanben = () => (0, template_1.mkBiqugeClass3)((introDom) => {
    const _bookname = introDom.innerHTML.match(/《(.*)》/);
    let bookname;
    if (_bookname?.length === 2) {
        bookname = _bookname[1];
    }
    const adList = [
        "还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！",
        "小说免费阅读地址：",
    ];
    (0, misc_1.rm2)(introDom, adList);
    introDom.innerHTML = introDom.innerHTML.replace(`${bookname}小说简介：`, "");
    return introDom;
}, (content, doc) => {
    const filters = [
        "手机用户输入地址",
        "提示：浏览器搜索",
        "把本站分享那些需要的小伙伴！找不到书请留言！",
    ];
    (0, misc_1.rm2)(content, filters);
    (0, cleanDOM_1.htmlTrim)(content);
    return content;
}, (doc) => doc.querySelector("#next_url").href, (_content, nextLink) => new URL(nextLink).pathname.includes("_"), undefined, true);
exports.xinwanben = xinwanben;


/***/ }),

/***/ "./src/rules/fushuwang.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Fushuwang = void 0;
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
class Fushuwang extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
        this.maxRunLimit = 5;
        this.saveOptions = {
            genChapterText: (chapterName, contentText) => {
                return `${contentText}\n`;
            },
        };
    }
    async bookParse() {
        const bookUrl = (document.location.origin + document.location.pathname).replace(/(_\d+)\.html$/, ".html");
        const [bookname, author] = document.querySelector(".title_info > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > h1:nth-child(1)").innerText.split("——");
        const [introduction, introductionHTML] = [null, null];
        const additionalMetadate = {};
        const options = document.querySelectorAll("p.pageLink > select > option");
        const urls = Array.from(options).map((option) => document.location.origin + option.getAttribute("value"));
        const chapters = [];
        for (let i = 0; i < urls.length; i++) {
            const chapterUrl = urls[i];
            const chapterName = `page${i}`;
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, i + 1, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, this.charset, {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        book.saveOptions = this.saveOptions;
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const content = doc.querySelector("#text");
        if (content) {
            (0, misc_1.rm)("span", true, content);
            (0, misc_1.rm)("p.pageLink", true, content);
            (0, misc_1.rm)("script", true, content);
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Fushuwang = Fushuwang;


/***/ }),

/***/ "./src/rules/haitangtxt.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Haitangtxt = void 0;
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const haitangtxtImageDecode_1 = __webpack_require__("./src/rules/lib/haitangtxtImageDecode.ts");
class Haitangtxt extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.querySelector("div.currency_head > h1 > a").href;
        const bookId = bookUrl.split("/").slice(-2, -1)[0];
        log_1.log.debug(`[chapter]请求 ${bookUrl}`);
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, "UTF-8");
        const bookname = dom.querySelector("div.cataloginfo > h3").innerText.trim();
        const author = dom.querySelector(".infotype > p:nth-child(1) > a:nth-child(1)").innerText.trim();
        const introDom = dom.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            (0, misc_1.rm)("span:nth-child(1)", false, introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const chapters = [];
        const getMaxPageNumber = () => {
            const pageDom = document.querySelector("div.page:nth-child(6)");
            if (pageDom) {
                const childNodes = Array.from(pageDom.childNodes);
                const _maxPageNumber = childNodes
                    .slice(-1)[0]
                    .textContent?.match(/第\d+\/(\d+)页/);
                if (_maxPageNumber) {
                    return _maxPageNumber[1];
                }
            }
        };
        const getIndexUrls = () => {
            const indexUrlsI = [];
            const maxPageNumber = Number(getMaxPageNumber());
            for (let i = 1; i <= maxPageNumber; i++) {
                const indexUrl = [
                    document.location.origin,
                    document.location.pathname.split("/")[1],
                    `${bookId}_${i}`,
                ].join("/") + "/";
                indexUrlsI.push(indexUrl);
            }
            return indexUrlsI;
        };
        const indexUrls = getIndexUrls();
        let lis = [];
        for (const indexUrl of indexUrls) {
            log_1.log.debug(`[chapter]请求 ${indexUrl}`);
            const doc = await (0, http_1.getHtmlDOM)(indexUrl, "UTF-8");
            const ul = doc.querySelector("ul.chapters");
            if (ul?.childElementCount) {
                lis = lis.concat(Array.from(ul.children));
            }
        }
        const chapterList = lis.filter((obj) => obj !== undefined);
        let chapterNumber = 0;
        for (const node of chapterList) {
            chapterNumber++;
            const a = node.firstElementChild;
            const chapterName = a.innerText;
            const chapterUrl = a.href;
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function contentAppend() {
            function UpWz(m, i) {
                let k = Math.ceil((i + 1) % code);
                k = Math.ceil(m - k);
                return k;
            }
            const _e = dom.getElementsByTagName("meta")[7].getAttribute("content");
            const contentRaw = dom.querySelector("#articlecontent");
            let codeurl;
            let code;
            const _codeurl = dom
                .getElementsByTagName("script")[1]
                .innerText.trim()
                .match(/"(http.+)"/);
            if (_codeurl) {
                codeurl = _codeurl[1];
                code = Number(new URL(codeurl).searchParams.get("code"));
            }
            if (_e) {
                const e = atob(_e)
                    .split(/[A-Z]+%/)
                    .map((v) => Number(v));
                const childNode = [];
                if (Array.from(dom.querySelectorAll("script")).filter((s) => s.src.includes("/17mb/js/article.js")).length) {
                    for (let i = 0; i < e.length; i++) {
                        const k = UpWz(e[i], i);
                        childNode[k] = contentRaw.childNodes[i];
                    }
                    for (const node of childNode) {
                        if (node.nodeType !== 1) {
                            continue;
                        }
                        if (!(node.innerText.includes("本章尚未完结,请") ||
                            node.innerText.includes("本章已阅读完毕"))) {
                            content.appendChild(node);
                        }
                    }
                    return;
                }
            }
            for (const node of Array.from(contentRaw.childNodes)) {
                if (!(node.innerText.includes("本章尚未完结,请") ||
                    node.innerText.includes("本章已阅读完毕"))) {
                    content.appendChild(node);
                }
            }
            return;
        }
        let nowUrl = chapterUrl;
        let dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const content = document.createElement("div");
        let flag = false;
        do {
            contentAppend();
            const nextLink = dom.querySelector(".novelbutton .p1.p3 > a:nth-child(1)").href;
            if (new URL(nextLink).pathname.includes("_")) {
                if (nextLink !== nowUrl) {
                    flag = true;
                }
                else {
                    log_1.log.error("网站页面出错，URL： " + nowUrl);
                    flag = false;
                }
            }
            else {
                flag = false;
            }
            if (flag) {
                nowUrl = nextLink;
                dom = await (0, http_1.getHtmlDOM)(nextLink, charset);
            }
        } while (flag);
        if (content) {
            const { dom: oldDom, text: _text, images: finalImages, } = await (0, cleanDOM_1.cleanDOM)(content, "TM", { keepImageName: true });
            const _newDom = document.createElement("div");
            _newDom.innerHTML = (0, haitangtxtImageDecode_1.replaceHaitangtxtImage)(content.innerHTML);
            const { dom: newDom, text: finalText, images, } = await (0, cleanDOM_1.cleanDOM)(_newDom, "TM", { keepImageName: true });
            const fontStyleDom = document.createElement("style");
            fontStyleDom.innerHTML = `.hide { display: none; }`;
            oldDom.className = "hide";
            const finalDom = document.createElement("div");
            finalDom.appendChild(fontStyleDom);
            finalDom.appendChild(oldDom);
            finalDom.appendChild(newDom);
            return {
                chapterName,
                contentRaw: content,
                contentText: finalText,
                contentHTML: finalDom,
                contentImages: finalImages,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Haitangtxt = Haitangtxt;


/***/ }),

/***/ "./src/rules/idejian.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Idejian = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Idejian extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.maxRunLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const _bookID = bookUrl.match(/\/(\d+)\/$/);
        const bookID = _bookID && _bookID[1];
        const bookname = document.querySelector(".detail_bkname > a").innerText.trim();
        const _author = document.querySelector(".detail_bkauthor")
            .childNodes[0];
        let author = "佚名";
        if (_author && _author.textContent) {
            author = _author.textContent.trim();
        }
        const introDom = document.querySelector(".brief_con");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book_img > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.detail_bkgrade > span")).map((span) => span.innerText.trim());
        const chapters = [];
        const cos = document.querySelectorAll(".catelog_list > li > a");
        let chapterNumber = 0;
        for (const aElem of Array.from(cos)) {
            chapterNumber++;
            const chapterName = aElem.innerText;
            const chapterUrl = aElem.href;
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", { bookID });
            chapters.push(chapter);
        }
        document.cookie = "";
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const _chapterUrl = new URL(chapterUrl);
        _chapterUrl.hostname = "m.idejian.com";
        chapterUrl = _chapterUrl.toString();
        const referBaseUrl = "https://m.idejian.com/catalog";
        const _refer = new URL(referBaseUrl);
        _refer.searchParams.set("bookId", options.bookID);
        const referUrl = _refer.toString();
        const fakeUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Snapchat/10.77.5.59 (like Safari/604.1)";
        if (document.cookie === "") {
            await (0, http_1.ggetText)(referUrl, charset, { headers: { "User-Agent": fakeUA } });
            await (0, http_1.ggetText)(chapterUrl, charset, {
                headers: { "User-Agent": fakeUA, Referer: referUrl },
            });
        }
        log_1.log.debug(`[Chapter]请求 ${chapterUrl}，Refer：${referUrl}`);
        const doc = await (0, http_1.ggetHtmlDOM)(chapterUrl, charset, {
            headers: { "User-Agent": fakeUA, Referer: referUrl },
        });
        chapterName = doc.querySelector(".text-title-1").innerText.trim();
        let content;
        if (doc.querySelectorAll("div.h5_mainbody").length === 1) {
            content = doc.querySelector("div.h5_mainbody");
        }
        else {
            content = doc.querySelectorAll("div.h5_mainbody")[1];
        }
        if (content) {
            (0, misc_1.rm)("h1", false, content);
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Idejian = Idejian;


/***/ }),

/***/ "./src/rules/imiaobige.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Imiaobige = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Imiaobige extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
    }
    async bookParse() {
        const bookUrl = document.location.href
            .replace("/read/", "/novel/")
            .replace(/\/$/, ".html");
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, this.charset);
        const bookname = doc.querySelector(".booktitle > h1").innerText.trim();
        const author = doc.querySelector("#author > a").innerText.trim();
        const introDom = doc.querySelector("#bookintro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector("#bookimg > img")
            .src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const sections = document.querySelectorAll("#readerlists > ul");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1;
            const sectionName = s.querySelector("h3").innerText
                .replace(bookname, "")
                .trim();
            if (sectionName.includes("最新章节")) {
                continue;
            }
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll("li > a");
            for (const a of Array.from(cs)) {
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, false, false, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, { bookname });
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const bookname = options.bookname;
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector(".title > h1:nth-child(1)").innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            content.innerHTML = content.innerHTML.replace(`<p>您可以在百度里搜索“${bookname} 妙笔阁(imiaobige.com)”查找最新章节！</p>`, "");
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Imiaobige = Imiaobige;


/***/ }),

/***/ "./src/rules/lib/common.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nextPageParse = exports.introDomHandle = void 0;
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
async function introDomHandle(introDom, domPatch) {
    if (introDom === null) {
        return [null, null, null];
    }
    else {
        if (domPatch) {
            introDom = domPatch(introDom.cloneNode(true));
        }
        const { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = await (0, cleanDOM_1.cleanDOM)(introDom, "TM");
        return [introCleantext, introCleanDom, introCleanimages];
    }
}
exports.introDomHandle = introDomHandle;
async function nextPageParse(options) {
    const { chapterName, chapterUrl, charset, selector, contentPatch, getNextPage, continueCondition, enableCleanDOM, } = options;
    log_1.log.debug(`[Chapter]请求 ${chapterUrl}`);
    let nowUrl = chapterUrl;
    let doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
    const content = document.createElement("div");
    let flag = false;
    do {
        let _content = doc.querySelector(selector);
        const nextLink = getNextPage(doc);
        if (continueCondition(_content, nextLink)) {
            if (nextLink !== nowUrl) {
                flag = true;
            }
            else {
                log_1.log.error("网站页面出错，URL： " + nowUrl);
                flag = false;
            }
        }
        else {
            flag = false;
        }
        _content = contentPatch(_content, doc);
        for (const _c of Array.from(_content.childNodes)) {
            content.appendChild(_c.cloneNode(true));
        }
        if (flag) {
            log_1.log.debug(`[Chapter]请求 ${nextLink}`);
            nowUrl = nextLink;
            doc = await (0, http_1.getHtmlDOM)(nextLink, charset);
        }
    } while (flag);
    let dom, text, images;
    if (enableCleanDOM || enableCleanDOM === undefined) {
        const obj = await (0, cleanDOM_1.cleanDOM)(content, "TM");
        dom = obj.dom;
        text = obj.text;
        images = obj.images;
    }
    else {
        dom = null;
        text = null;
        images = null;
    }
    return {
        chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
    };
}
exports.nextPageParse = nextPageParse;


/***/ }),

/***/ "./src/rules/lib/haitangtxtImageDecode.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceHaitangtxtImage = void 0;
function replaceHaitangtxtImage(inputText) {
    let outputText = inputText;
    for (const imageFilename in imageTable) {
        if (Object.prototype.hasOwnProperty.call(imageTable, imageFilename)) {
            const normalCharacter = imageTable[imageFilename];
            const imageHTML = `<img src="${document.location.origin}/wzbodyimg/${imageFilename}">`;
            outputText = outputText.replaceAll(imageHTML, normalCharacter);
        }
    }
    return outputText;
}
exports.replaceHaitangtxtImage = replaceHaitangtxtImage;
const imageTable = {};


/***/ }),

/***/ "./src/rules/lib/jjwxcFontDecode.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceJjwxcCharacter = void 0;
const idb_keyval_1 = __webpack_require__("idb-keyval");
const log_1 = __webpack_require__("./src/log.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
async function replaceJjwxcCharacter(fontName, inputText) {
    let outputText = inputText;
    const jjwxcFontTable = await getJjwxcFontTable(fontName);
    if (jjwxcFontTable) {
        for (const jjwxcCharacter in jjwxcFontTable) {
            if (Object.prototype.hasOwnProperty.call(jjwxcFontTable, jjwxcCharacter)) {
                const normalCharacter = jjwxcFontTable[jjwxcCharacter];
                outputText = outputText.replaceAll(jjwxcCharacter, normalCharacter);
            }
        }
        outputText = outputText.replace(/\u200c/g, "");
    }
    return outputText;
}
exports.replaceJjwxcCharacter = replaceJjwxcCharacter;
async function getJjwxcFontTable(fontName) {
    const jjwxcFontTables = await getJjwxcFontTables();
    const jjwxcFontTableLocal = jjwxcFontTables[fontName];
    if (jjwxcFontTableLocal) {
        return jjwxcFontTableLocal;
    }
    else if (setting_1.enableJjwxcRemoteFont) {
        return await fetchRemoteFont(fontName);
    }
    else {
        return undefined;
    }
}
async function fetchRemoteFont(fontName) {
    const url = `https://jjwxc.bgme.bid/${fontName}.json`;
    try {
        log_1.log.info(`[jjwxc-font]开始请求远程字体对照表 ${fontName}`);
        const resp = await fetch(url);
        if (resp.status === 200) {
            log_1.log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载成功`);
            return (await resp.json());
        }
        else {
            log_1.log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
            return undefined;
        }
    }
    catch (error) {
        log_1.log.error(error);
        log_1.log.info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
        return undefined;
    }
}
async function getJjwxcFontTables() {
    const JjwxcFontTablesKeyName = "novel-downloader-jjwxcFontTables";
    const JjwxcFontTablesExpiresKeyName = "novel-downloader-jjwxcFontTables__expires__";
    const JjwxcFontTablesUrl = "https://cdn.jsdelivr.net/gh/yingziwu/jjwxcFontTables@gh-pages/bundle.json";
    async function fetchAndSave() {
        try {
            log_1.log.info("[jjwxc-font]开始下载字体对照表打包文件。");
            const resp = await fetch(JjwxcFontTablesUrl);
            _jjwxcFontTables = await resp.json();
            if (_jjwxcFontTables) {
                if (await (0, idb_keyval_1.get)(JjwxcFontTablesKeyName)) {
                    await (0, idb_keyval_1.update)(JjwxcFontTablesKeyName, (val) => _jjwxcFontTables);
                }
                else {
                    await (0, idb_keyval_1.set)(JjwxcFontTablesKeyName, _jjwxcFontTables);
                }
                if (await (0, idb_keyval_1.get)(JjwxcFontTablesExpiresKeyName)) {
                    await (0, idb_keyval_1.update)(JjwxcFontTablesExpiresKeyName, (val) => Date.now() + 1000 * 86400);
                }
                else {
                    await (0, idb_keyval_1.set)(JjwxcFontTablesExpiresKeyName, Date.now() + 1000 * 86400);
                }
                return _jjwxcFontTables;
            }
            else {
                return {};
            }
        }
        catch (error) {
            return {};
        }
    }
    let _jjwxcFontTables = await (0, idb_keyval_1.get)(JjwxcFontTablesKeyName);
    if (_jjwxcFontTables) {
        if ((await (0, idb_keyval_1.get)(JjwxcFontTablesExpiresKeyName)) &&
            (await (0, idb_keyval_1.get)(JjwxcFontTablesExpiresKeyName)) > Date.now()) {
            return _jjwxcFontTables;
        }
        else {
            return await fetchAndSave();
        }
    }
    else {
        return await fetchAndSave();
    }
}


/***/ }),

/***/ "./src/rules/lib/yuzhaigeImageDecode.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceYuzhaigeImage = void 0;
function replaceYuzhaigeImage(inputText) {
    let outputText = inputText;
    for (const imageFilename in imageTable) {
        if (Object.prototype.hasOwnProperty.call(imageTable, imageFilename)) {
            const normalCharacter = imageTable[imageFilename];
            const imageHTML = `<img src="${document.location.origin}/wzbodyimg/${imageFilename}">`;
            outputText = outputText.replaceAll(imageHTML, normalCharacter);
        }
    }
    return outputText;
}
exports.replaceYuzhaigeImage = replaceYuzhaigeImage;
const imageTable = {
    "wc5pDq.png": "\u52c3",
    "wEwIpN.png": "\u8404",
    "WFOBXF.png": "\u4f26",
    "WFuqEG.png": "\u6eda",
    "WNTyYB.png": "\u83ca",
    "WrI5St.png": "\u6234",
    "WSYLdq.png": "\u5ba0",
    "wvHBh4.png": "\u5976",
    "wWVoto.png": "\u5df4",
    "wz2cGb.png": "\u4e73",
    "wZicAt.png": "\u9053",
    "WzS8He.png": "\u6234",
    "X6QTS9.png": "\u80ef",
    "XBTII5.png": "\u817f",
    "XBv6rP.png": "\u8df3",
    "xFVZW9.png": "\u6b96",
    "XhuslD.png": "\u9e21",
    "xIFlai.png": "\u98df",
    "XK7taQ.png": "\u723d",
    "xljRqd.png": "\u9876",
    "xo18Yq.png": "\u5c3f",
    "xOIyuf.png": "\u585e",
    "xQ2ZWb.png": "\u80a1",
    "XqsaJY.png": "\u8f6f",
    "xrbxqL.png": "\u88f8",
    "xw7cLW.png": "\u868c",
    "xwkwQW.png": "\u7cbe",
    "XXlZMA.png": "\u6b96",
    "y3FgRm.png": "\u67f1",
    "y4Afmt.png": "\u817f",
    "Y4aXzR.png": "\u7c97",
    "Y7G6Lu.png": "\u547b",
    "YGnnuo.png": "\u871c",
    "ygqjgt.png": "\u634f",
    "yGwSy7.png": "\u9a9a",
    "yjX9oi.png": "\u63c9",
    "YNmgYJ.png": "\u809b",
    "yuo7sA.png": "\u6469",
    "yWAu0U.png": "\u50ac",
    "yWhRNI.png": "\u5a07",
    "YZ4EAh.png": "\u5589",
    "yzS8NJ.png": "\u80ef",
    "z0DZro.png": "\u542e",
    "Z7byDx.png": "\u6da6",
    "ZatUU6.png": "\u5974",
    "zCtJCx.png": "\u6da6",
    "ZDJHkT.png": "\u6ccc",
    "ZKDja5.png": "\u9f9f",
    "ZqyamF.png": "\u5c44",
    "ZzsV7x.png": "\u777e",
    "0bErVo.png": "\u6df1",
    "0ShNwM.png": "\u5439",
    "0uCAgc.png": "\u5f3a",
    "1AMfxw.png": "\u5e72",
    "1EmzV7.png": "\u6027",
    "1RbeKi.png": "\u5934",
    "1RIz6c.png": "\u611f",
    "1ZkZsI.png": "\u6b32",
    "2AXYPX.png": "\u6cc4",
    "2gwsiE.png": "\u6e7f",
    "2LQHtR.png": "\u6839",
    "2wePG6.png": "\u4f53",
    "2Xijao.png": "\u634f",
    "3ha4Fq.png": "\u6b22",
    "3RfcEA.png": "\u9ad8",
    "3uNZxG.png": "\u80f8",
    "4bu7Gr.png": "\u8482",
    "4T4DPM.png": "\u64e6",
    "4XjmUQ.png": "\u8fdb",
    "5hjo9r.png": "\u4e0b",
    "5ueElb.png": "\u5bab",
    "5yFlDm.png": "\u5bab",
    "6UsGer.png": "\u74e3",
    "6w928M.png": "\u633a",
    "6YavUk.png": "\u6696",
    "7dKm1T.png": "\u8fdb",
    "7tzEqy.png": "\u70b9",
    "8Q4cTQ.png": "\u90e8",
    "9Ns27O.png": "\u9633",
    "9pAfcz.png": "\u5934",
    "9Xkn86.png": "\u5507",
    "62TB7X.png": "\u7d27",
    "668QKT.png": "\u4e0b",
    "aedVOS.png": "\u9732",
    "AI15xh.png": "\u5a07",
    "AikKsW.png": "\u80a0",
    "AJcH1b.png": "\u51fa",
    "ALnkng.png": "\u5598",
    "anzcle.png": "\u9053",
    "apsw0Z.png": "\u5b50",
    "azRZNn.png": "\u6c34",
    "B38zEI.png": "\u6c34",
    "BAVYZd.png": "\u9634",
    "BBioQd.png": "\u6696",
    "BBZnCY.png": "\u5507",
    "bE6LV6.png": "\u7f8e",
    "bF30CY.png": "\u5438",
    "bihdjA.png": "\u5507",
    "BPQcCZ.png": "\u5177",
    "BpYip0.png": "\u7ba1",
    "BrY1ZI.png": "\u817f",
    "BvbcsW.png": "\u7d27",
    "bXRYQt.png": "\u5904",
    "Caqk3D.png": "\u773c",
    "CBylOX.png": "\u9053",
    "ClFBCD.png": "\u5904",
    "CLS5cG.png": "\u575a",
    "cPjFxZ.png": "\u79cd",
    "CUJkGk.png": "\u60c5",
    "CZL2OC.png": "\u76ae",
    "D3I7u1.png": "\u8482",
    "d5KjC5.png": "\u4f53",
    "d7fjCZ.png": "\u9732",
    "df6AnM.png": "\u51fa",
    "dhAaVT.png": "\u575a",
    "dkuDIk.png": "\u820c",
    "DSiSlL.png": "\u7231",
    "dTnQ9K.png": "\u9b54",
    "dXMpnD.png": "\u6655",
    "DXtzqf.png": "\u8eab",
    "DXXixh.png": "\u5957",
    "DZYaDR.png": "\u9633",
    "e5QAQ1.png": "\u5f3a",
    "ECcmqT.png": "\u6625",
    "eeYwrN.png": "\u6c34",
    "eGWHWT.png": "\u6170",
    "eOOKlp.png": "\u89e6",
    "EvHzor.png": "\u6b32",
    "ewwRMT.png": "\u903c",
    "EZW46f.png": "\u6df1",
    "FBosfH.png": "\u6027",
    "fC5MmR.png": "\u6237",
    "ffTW4v.png": "\u62bd",
    "ffZqua.png": "\u6027",
    "FgN2Tl.png": "\u4e71",
    "fHvZK9.png": "\u7f1d",
    "fj7veK.png": "\u957f",
    "fkPlzo.png": "\u98df",
    "fKWetR.png": "\u7ba1",
    "FUmeqN.png": "\u25a1",
    "Fus88J.png": "\u725b",
    "G4uOno.png": "\u55b7",
    "g7bVzL.png": "\u9ad8",
    "GBmlnw.png": "\u8df3",
    "gCWM61.png": "\u7cbe",
    "GdAidg.png": "\u7b4b",
    "GLZIqA.png": "\u5b50",
    "gqDVGg.png": "\u5de8",
    "gu5ykL.png": "\u8f6e",
    "GULUze.png": "\u9ad8",
    "h2FI8R.png": "\u80f8",
    "h4WPDX.png": "\u6655",
    "hCztH8.png": "\u9732",
    "hfI2uM.png": "\u575a",
    "hGHijB.png": "\u5668",
    "hIhWai.png": "\u9ad8",
    "HIUVkJ.png": "\u5c04",
    "HkcQea.png": "\u4ea4",
    "hm5O6l.png": "\u5957",
    "hpFE8s.png": "\u6d41",
    "HPxfmS.png": "\u542b",
    "hVxPKi.png": "\u89e6",
    "Ia3sI1.png": "\u4e71",
    "IA8APJ.png": "\u5df4",
    "IlUZRn.png": "\u575a",
    "iN7Lri.png": "\u98df",
    "iQMM3x.png": "\u611f",
    "ISfDuf.png": "\u4f53",
    "isWxov.png": "\u9a6c",
    "ITILdU.png": "\u6267",
    "IU731r.png": "\u9876",
    "IUanTB.png": "\u878d",
    "IUUwWq.png": "\u5165",
    "Ixqere.png": "\u6d41",
    "J9AEU9.png": "\u5165",
    "JBfhPp.png": "\u64cd",
    "jDxrrX.png": "\u5b50",
    "jE4V2B.png": "\u6df1",
    "jF1KPd.png": "\u25a1",
    "jFACnh.png": "\u6bdb",
    "jiyfGR.png": "\u6839",
    "JLkmp8.png": "\u80a1",
    "jWwTqU.png": "\u60c5",
    "K00hgA.png": "\u5165",
    "KaFnqe.png": "\u6eda",
    "Kaqaq0.png": "\u9634",
    "kDOkxJ.png": "\u957f",
    "kSkOOe.png": "\u6309",
    "KtjQU3.png": "\u634f",
    "kWmDQN.png": "\u5904",
    "kZQ8K6.png": "\u4e0b",
    "l0kRFF.png": "\u7269",
    "L9dqnM.png": "\u6b32",
    "Ldo3hW.png": "\u8089",
    "ljppnW.png": "\u611f",
    "lNGSuh.png": "\u80a0",
    "lRfqbE.png": "\u7cbe",
    "lUzsIi.png": "\u8f6e",
    "LZraJy.png": "\u6625",
    "mBpVnV.png": "\u4e71",
    "MEM8Wx.png": "\u5e72",
    "MO2VKV.png": "\u6db2",
    "ModDMS.png": "\u62bd",
    "mOZJWk.png": "\u9a6c",
    "mpgh5T.png": "\u51fa",
    "nj29a6.png": "\u6267",
    "NOEnvb.png": "\u8df3",
    "nrSIO8.png": "\u6df1",
    "o2xN3U.png": "\u82b1",
    "O3b3KR.png": "\u6696",
    "o5uSeU.png": "\u5bab",
    "OaBMS5.png": "\u62d4",
    "OB7KzU.png": "\u773c",
    "oCH7SV.png": "\u9b54",
    "oeeXig.png": "\u9a6c",
    "OgBVeb.png": "\u8f6f",
    "oHc3dE.png": "\u7269",
    "OLHWRr.png": "\u70b9",
    "onuRXa.png": "\u8482",
    "oqLfcR.png": "\u6ed1",
    "oUntUm.png": "\u6d53",
    "OXOdsf.png": "\u9053",
    "p3ARaM.png": "\u6d41",
    "p068ps.png": "\u5bab",
    "PLwxDG.png": "\u79cd",
    "PmCTBy.png": "\u8272",
    "pMlQBk.png": "\u6c41",
    "pQypTa.png": "\u8fdb",
    "PtUVdN.png": "\u62bd",
    "PW1WSi.png": "\u6e7f",
    "Pw3ezj.png": "\u914d",
    "pXy3UL.png": "\u4ea4",
    "Q7jy4x.png": "\u5185",
    "q07XV1.png": "\u5668",
    "Q9OBtA.png": "\u6f6e",
    "QbYFBI.png": "\u9634",
    "qEI00x.png": "\u4e0b",
    "qewOBk.png": "\u6ed1",
    "QfXoIi.png": "\u8089",
    "qJIAe3.png": "\u6309",
    "QkWjrV.png": "\u8eab",
    "QnFF9j.png": "\u6839",
    "qNFYq4.png": "\u5e72",
    "QU7Lcv.png": "\u25a1",
    "qwsVcX.png": "\u62bd",
    "qxb6Lz.png": "\u70b9",
    "QzP4Nz.png": "\u773c",
    "R8uNPt.png": "\u5185",
    "R9tjeh.png": "\u51fa",
    "rFr75w.png": "\u80f8",
    "rGA9Cq.png": "\u4ea4",
    "RjCFQu.png": "\u7d27",
    "RLNC0G.png": "\u70b9",
    "rocNQb.png": "\u505a",
    "Rpp7lC.png": "\u8482",
    "rUJMTx.png": "\u8272",
    "RZZBiZ.png": "\u773c",
    "S2Dvd4.png": "\u6cc4",
    "s8DZGN.png": "\u60c5",
    "s560YT.png": "\u5177",
    "SeKcc0.png": "\u8272",
    "sFFl4b.png": "\u5ba0",
    "SiAa7G.png": "\u5934",
    "slAZvO.png": "\u8272",
    "sTPB8l.png": "\u89e6",
    "sV6OrY.png": "\u957f",
    "syPCmu.png": "\u8f6e",
    "Sz5U6E.png": "\u5668",
    "SZn6xB.png": "\u7269",
    "T6sDn9.png": "\u60c5",
    "t9WGXQ.png": "\u903c",
    "TCRQtC.png": "\u6ed1",
    "TGkFFQ.png": "\u903c",
    "tNjFEZ.png": "\u82b1",
    "tOUYgC.png": "\u9b54",
    "TSjC0C.png": "\u5ead",
    "TSp4f1.png": "\u62d4",
    "TWIhpT.png": "\u7231",
    "TxaWbU.png": "\u878d",
    "ua2bew.png": "\u9876",
    "UbTLa5.png": "\u633a",
    "uDN4sP.png": "\u5165",
    "ueMquS.png": "\u8eab",
    "UEVcqG.png": "\u8eab",
    "UIFeaH.png": "\u914d",
    "unR6fo.png": "\u9633",
    "Upc9Pu.png": "\u4ea4",
    "UukBzP.png": "\u6d1e",
    "UvCU0f.png": "\u5ba0",
    "VAOIqQ.png": "\u7f8e",
    "vMf2zS.png": "\u914d",
    "VnXHdX.png": "\u505a",
    "vpHmyj.png": "\u5185",
    "Vql6Ev.png": "\u59d0",
    "vrkjXi.png": "\u79cd",
    "vtnLR7.png": "\u6c34",
    "wkUtOc.png": "\u25a1",
    "WOHLvx.png": "\u5976",
    "WppxBg.png": "\u7f8e",
    "WRtMHz.png": "\u56ca",
    "WTAi5O.png": "\u63c9",
    "wtwCbu.png": "\u725b",
    "WXf8jT.png": "\u5177",
    "xpWTjp.png": "\u7269",
    "XqFPrk.png": "\u505a",
    "XrHw7R.png": "\u4f53",
    "XskrJT.png": "\u9633",
    "xubhKq.png": "\u6bdb",
    "xxqGbU.png": "\u80f8",
    "y2rhls.png": "\u505a",
    "y8TJ26.png": "\u79cd",
    "YbmlHp.png": "\u82b1",
    "YpcoIg.png": "\u7f8e",
    "yruS8G.png": "\u8650",
    "YTWiNM.png": "\u82b1",
    "YvzoUL.png": "\u5589",
    "YY1gAh.png": "\u878d",
    "yYS2XJ.png": "\u8fdb",
    "ZaWg8Q.png": "\u6d53",
    "zbUsFu.png": "\u70ed",
    "zGqroA.png": "\u5b50",
    "zhogXd.png": "\u9732",
    "zM4vGZ.png": "\u6eda",
    "ZMyXfX.png": "\u786c",
    "Znemv4.png": "\u9a6c",
    "ZnORLb.png": "\u5934",
    "zovunx.png": "\u7a74",
    "ZpcLFr.png": "\u7231",
    "4KLtoP.png": "\u868c",
    "k2hzhi.png": "\u854a",
    "OpOeoc.png": "\u96cf",
    "D6GjNJ.png": "\u90a6",
    "nSh1y5.png": "\u90a6",
    "ZD1bga.png": "\u819c",
    "0JNnRt.png": "\u88c6",
    "0laGrG.png": "\u52c3",
    "0sEWeF.png": "\u723d",
    "0X07Oj.png": "\u957f",
    "0ZBaBv.png": "\u7a74",
    "1WoJda.png": "\u633a",
    "1yUGqq.png": "\u5957",
    "2ABT9u.png": "\u7ba1",
    "2BcI5e.png": "\u6838",
    "2dfEmL.png": "\u808f",
    "2LdPZ9.png": "\u5df4",
    "2VLZTT.png": "\u5438",
    "2WgKu9.png": "\u6625",
    "03PhNV.png": "\u6469",
    "3preuJ.png": "\u6f6e",
    "3tNh88.png": "\u63d2",
    "4m7wbi.png": "\u6655",
    "4mO3Bj.png": "\u5993",
    "4P4bWw.png": "\u70eb",
    "4qJrgq.png": "\u50ac",
    "4xMdlq.png": "\u6345",
    "5aHMLF.png": "\u6d53",
    "5caAaX.png": "\u542b",
    "5IL1sE.png": "\u817a",
    "5qxLLo.png": "\u8404",
    "5rXkkk.png": "\u5f04",
    "5uAxU4.png": "\u63c9",
    "5XAgwu.png": "\u5978",
    "6A9MvV.png": "\u52c3",
    "6jL6AP.png": "\u8361",
    "6ontyx.png": "\u8461",
    "6VRwjR.png": "\u7c97",
    "6zcWUT.png": "\u6cc4",
    "7aWXdF.png": "\u6f6e",
    "7Bz8yG.png": "\u68cd",
    "7fhmqV.png": "\u88e4",
    "7jKFaP.png": "\u5978",
    "7lNejO.png": "\u704c",
    "7pFdxn.png": "\u64b8",
    "7Q7Jrg.png": "\u5c4c",
    "8BNYPM.png": "\u6696",
    "8J5geS.png": "\u541f",
    "8Kf7GD.png": "\u830e",
    "8mHmVv.png": "\u830e",
    "8N16Hq.png": "\u8650",
    "8UniDu.png": "\u6237",
    "8w5K9T.png": "\u88f8",
    "8wm13p.png": "\u6655",
    "8ZNrSv.png": "\u786c",
    "9BRV3o.png": "\u5c4c",
    "9Nqw8t.png": "\u762b",
    "9RBhTJ.png": "\u9a9a",
    "9RvnBS.png": "\u8089",
    "9TaMmD.png": "\u6ccc",
    "9UaEDH.png": "\u6d1e",
    "9zWVtd.png": "\u59d0",
    "47FrvB.png": "\u4e73",
    "76gAv7.png": "\u723d",
    "77lL1M.png": "\u541f",
    "798jja.png": "\u76ae",
    "a0mCeq.png": "\u8f6f",
    "ACrPlr.png": "\u98df",
    "aFoXhJ.png": "\u75d2",
    "Afr6zx.png": "\u6b96",
    "aHuUcm.png": "\u83ca",
    "AiDkbY.png": "\u809b",
    "aOxG78.png": "\u8461",
    "AQZ08I.png": "\u809b",
    "ARAUs9.png": "\u5c41",
    "arEzdS.png": "\u5976",
    "axdkbW.png": "\u58c1",
    "aYGWo2.png": "\u83ca",
    "b1C6Pu.png": "\u75d2",
    "bCQ2nL.png": "\u654f",
    "BgJzfk.png": "\u6b22",
    "BhgFcH.png": "\u56ca",
    "bOoL0J.png": "\u6deb",
    "BqO1fa.png": "\u820c",
    "bqXZDH.png": "\u80a5",
    "BsU6ka.png": "\u854a",
    "Bu9FZQ.png": "\u6deb",
    "bufT6t.png": "\u819c",
    "bWdbXA.png": "\u6eda",
    "C4UN5R.png": "\u6deb",
    "CgqkFG.png": "\u8361",
    "CH67yh.png": "\u5a07",
    "CM7jpY.png": "\u5b55",
    "cNghja.png": "\u8361",
    "CnOBoo.png": "\u63d2",
    "CNQW3o.png": "\u70eb",
    "cow4Kc.png": "\u5f3a",
    "CXC9uz.png": "\u8089",
    "Cy7Ynb.png": "\u762b",
    "czWHZw.png": "\u96cf",
    "D0Lwo9.png": "\u871c",
    "dB0uJO.png": "\u820c",
    "dHuyiO.png": "\u5c4c",
    "DQWBph.png": "\u4e38",
    "DsEJTV.png": "\u547b",
    "dUrJvn.png": "\u819c",
    "Ea3lho.png": "\u81c0",
    "EboGWZ.png": "\u80a0",
    "eifoua.png": "\u5b55",
    "EiUhlF.png": "\u5957",
    "ENwWoX.png": "\u4e71",
    "EQEgJx.png": "\u6469",
    "EQiUab.png": "\u88e4",
    "er8NJ7.png": "\u542e",
    "F0WoiN.png": "\u5177",
    "f1YTv0.png": "\u6f6e",
    "f2N1vL.png": "\u5978",
    "F3nlmb.png": "\u88e4",
    "F6lW1R.png": "\u80bf",
    "f60BEY.png": "\u5c3f",
    "f461mD.png": "\u6839",
    "fd6C8F.png": "\u9e21",
    "Fdz1Vc.png": "\u58c1",
    "FetNxM.png": "\u5c4c",
    "FfxOzl.png": "\u88f8",
    "Fge27m.png": "\u8404",
    "fGpEWq.png": "\u547b",
    "Fl20Ip.png": "\u9f9f",
    "fNXZyj.png": "\u6234",
    "fRmx68.png": "\u90e8",
    "fSdsL1.png": "\u88c6",
    "FT9nI5.png": "\u83ca",
    "FVVqzv.png": "\u86cb",
    "FwjZJi.png": "\u5438",
    "fX4WIp.png": "\u4f26",
    "FXgFwc.png": "\u63d2",
    "FXmf8I.png": "\u647a",
    "fxPcW3.png": "\u6d1e",
    "g2jVxn.png": "\u808f",
    "gb3LOX.png": "\u80ef",
    "gDVng6.png": "\u5ba0",
    "gImiVY.png": "\u5f04",
    "gJDFQC.png": "\u8214",
    "gJDG8l.png": "\u5b55",
    "GJodYn.png": "\u62d4",
    "GmLjKa.png": "\u5c09",
    "gNlJMc.png": "\u68cd",
    "GppocX.png": "\u914d",
    "gsRjtr.png": "\u67f1",
    "GTOAc4.png": "\u633a",
    "GzjpTS.png": "\u7cbe",
    "h8zRxr.png": "\u80a1",
    "H17DtI.png": "\u5c41",
    "ha14XV.png": "\u89e6",
    "hatLmR.png": "\u81c0",
    "hbrRIS.png": "\u857e",
    "hC4NbQ.png": "\u777e",
    "hG0SRP.png": "\u64e6",
    "HhNUaw.png": "\u854a",
    "hKjWPG.png": "\u64b8",
    "Hn8Afh.png": "\u74e3",
    "hngWaZ.png": "\u5438",
    "htV3uv.png": "\u58c1",
    "hVaVng.png": "\u6309",
    "HVHPCy.png": "\u74e3",
    "hVwy7k.png": "\u8214",
    "i4tyrQ.png": "\u830e",
    "i5s28n.png": "\u4f26",
    "IAloq6.png": "\u542e",
    "ICHARH.png": "\u6237",
    "icI6Ey.png": "\u81c0",
    "iCRh88.png": "\u68d2",
    "Iej2pu.png": "\u5993",
    "IkqJmu.png": "\u8650",
    "imVjMj.png": "\u4e73",
    "iNIMEL.png": "\u86cb",
    "IOjnEP.png": "\u6b22",
    "ip6KUM.png": "\u79bd",
    "IPC2R8.png": "\u9e21",
    "ipVGiA.png": "\u6345",
    "IpYNG3.png": "\u5974",
    "ITUjFq.png": "\u76ae",
    "ixiion.png": "\u90e8",
    "IZcCzq.png": "\u871c",
    "IzJ4WG.png": "\u830e",
    "J1CBtB.png": "\u8df3",
    "j9C44i.png": "\u70eb",
    "JCQtUs.png": "\u4e73",
    "JEcz0E.png": "\u871c",
    "JfPEEe.png": "\u4f26",
    "jHi6Vu.png": "\u9f9f",
    "jjfR6D.png": "\u8461",
    "jktdia.png": "\u64e6",
    "JlkuRa.png": "\u8404",
    "jnAvXp.png": "\u5ead",
    "jnCCk9.png": "\u6cc4",
    "jvj3DG.png": "\u786c",
    "Jy4pAI.png": "\u74e3",
    "jZyPEL.png": "\u5b55",
    "K2AtMQ.png": "\u9a9a",
    "K2jjT6.png": "\u857e",
    "k6X0xy.png": "\u80bf",
    "k9h8DR.png": "\u903c",
    "k9zXwG.png": "\u723d",
    "KalRLt.png": "\u6da6",
    "kawcM7.png": "\u68cd",
    "kdsEv6.png": "\u5f04",
    "KdwL4R.png": "\u86cb",
    "kPG0vR.png": "\u704c",
    "KSqmoM.png": "\u6db2",
    "kTCaM9.png": "\u86cb",
    "kVLLjB.png": "\u8361",
    "kygbuo.png": "\u725b",
    "kZDlEj.png": "\u7ba1",
    "l0BNLC.png": "\u6ccc",
    "l1Dmft.png": "\u725b",
    "L1yl45.png": "\u5c04",
    "L3a5ft.png": "\u56ca",
    "L3LaNQ.png": "\u5439",
    "L9F6F8.png": "\u50ac",
    "LB1WMg.png": "\u64cd",
    "LBPqYj.png": "\u6d1e",
    "LDjbfQ.png": "\u5c3f",
    "ldo7FB.png": "\u7d27",
    "lErO3o.png": "\u67f1",
    "LFBZKA.png": "\u59d0",
    "lfGqdb.png": "\u68d2",
    "lGKjej.png": "\u5993",
    "LjemA3.png": "\u809b",
    "Ljh7qo.png": "\u63d2",
    "LJSiT5.png": "\u5c44",
    "Lk5uQy.png": "\u6838",
    "lngKEo.png": "\u55b7",
    "lOfDdC.png": "\u4e38",
    "Lsq92O.png": "\u541f",
    "LsyPdc.png": "\u541f",
    "lVbZkd.png": "\u634f",
    "lVMTQu.png": "\u654f",
    "LVmymH.png": "\u80a0",
    "lyYo4Y.png": "\u547b",
    "lZtabT.png": "\u9634",
    "M3VjF9.png": "\u64b8",
    "m4yvu3.png": "\u7a74",
    "M8bV3k.png": "\u56ca",
    "MBhDEi.png": "\u75d2",
    "MC5lZn.png": "\u585e",
    "Mc8JM6.png": "\u62d4",
    "mD7hPS.png": "\u5c41",
    "mExNDV.png": "\u704c",
    "MKapwC.png": "\u80a5",
    "mKxUHv.png": "\u64e6",
    "Mo31Ax.png": "\u6bdb",
    "mRFQJQ.png": "\u5589",
    "MsUFfR.png": "\u6b96",
    "mTzxxd.png": "\u7f1d",
    "n2ufBJ.png": "\u5978",
    "n3oOgA.png": "\u6345",
    "n9j6EC.png": "\u5ead",
    "n49ZFH.png": "\u88c6",
    "nCrl80.png": "\u762b",
    "NDlwhm.png": "\u817a",
    "nE1Y7y.png": "\u762b",
    "neIgqc.png": "\u5439",
    "NeKVfz.png": "\u6170",
    "NHH9A1.png": "\u777e",
    "NKN1rk.png": "\u542e",
    "NKUSkP.png": "\u58c1",
    "NlfTkc.png": "\u5c44",
    "NlZDDQ.png": "\u817f",
    "nmoPI2.png": "\u4e38",
    "NnfPEJ.png": "\u9f9f",
    "NP33MO.png": "\u6c41",
    "NQ7oga.png": "\u611f",
    "nsDzuq.png": "\u90a6",
    "NsIwni.png": "\u5de8",
    "oaLZIg.png": "\u777e",
    "oC3HDZ.png": "\u7c97",
    "OFx7ZU.png": "\u88f8",
    "OHU6tX.png": "\u6db2",
    "olFcqI.png": "\u5e72",
    "OMdbeV.png": "\u819c",
    "On4f9C.png": "\u7b4b",
    "oncaJq.png": "\u76ae",
    "Oo8iWN.png": "\u6309",
    "OUWXqz.png": "\u6625",
    "OuXWg2.png": "\u4e38",
    "ozF5Kr.png": "\u8650",
    "p0bqZi.png": "\u5c44",
    "p1H9RN.png": "\u5c04",
    "p5QCRV.png": "\u6ed1",
    "p5zEbo.png": "\u857e",
    "P43O6G.png": "\u6234",
    "PalsBW.png": "\u5974",
    "PcAvOY.png": "\u5ae9",
    "pHfPTa.png": "\u5de8",
    "pi2z0b.png": "\u7b4b",
    "plFlPb.png": "\u68cd",
    "pNPlu5.png": "\u704c",
    "PnZNBC.png": "\u6deb",
    "pQ1W2F.png": "\u88e4",
    "PX3jJ6.png": "\u6ccc",
    "q14YbK.png": "\u9876",
    "Qc9LRh.png": "\u5598",
    "qe2YZi.png": "\u63c9",
    "qEy1kT.png": "\u90e8",
    "Qfs9DA.png": "\u50ac",
    "Qg8Qwg.png": "\u857e",
    "qJ1X2h.png": "\u59d0",
    "qm0ZBO.png": "\u6170",
    "QmcP4w.png": "\u654f",
    "Qn3xBM.png": "\u5ae9",
    "qNGvlk.png": "\u5c3f",
    "qPhrVf.png": "\u5904",
    "qPX1Ef.png": "\u542b",
    "qr8InI.png": "\u80a5",
    "QtLIGq.png": "\u6db2",
    "QtSnzR.png": "\u5598",
    "Qv3JbY.png": "\u7f1d",
    "QYF65i.png": "\u7b4b",
    "Qz4Txd.png": "\u81c0",
    "qzdvCv.png": "\u5df4",
    "r7NsvF.png": "\u5f04",
    "r8oBsP.png": "\u9e21",
    "r9Gw4X.png": "\u6838",
    "R65BZO.png": "\u8214",
    "Rf7Jf6.png": "\u6469",
    "Rho2GL.png": "\u75d2",
    "rlVLx7.png": "\u7231",
    "Rm3wex.png": "\u55b7",
    "RmrhKk.png": "\u8214",
    "RMWsBY.png": "\u654f",
    "rn9y6F.png": "\u585e",
    "RnfJ8h.png": "\u67f1",
    "RP5Oud.png": "\u5598",
    "Rp5tmA.png": "\u64cd",
    "rpSSYK.png": "\u80ef",
    "rQKjMD.png": "\u6bdb",
    "RrXcE9.png": "\u5668",
    "RyL5jk.png": "\u6c41",
    "s67RPe.png": "\u70eb",
    "s95kq4.png": "\u6e7f",
    "sdXZMk.png": "\u52c3",
    "SGxBy7.png": "\u5c41",
    "smhB8j.png": "\u5c04",
    "Srgobp.png": "\u6237",
    "srlW2t.png": "\u6d41",
    "ST21xu.png": "\u6d53",
    "STzFJz.png": "\u7c97",
    "sugwEw.png": "\u5976",
    "SzADhL.png": "\u80bf",
    "T5yzvl.png": "\u6c41",
    "t6K8rK.png": "\u6027",
    "tAIV6q.png": "\u64cd",
    "TCFRca.png": "\u68d2",
    "te79V0.png": "\u68d2",
    "tjbhCV.png": "\u5ae9",
    "tNFwEz.png": "\u5589",
    "tPTX1h.png": "\u80a5",
    "tsQMiL.png": "\u5439",
    "TUZb1W.png": "\u6b32",
    "TWFykG.png": "\u5993",
    "twLxYU.png": "\u8f6f",
    "tXNaZ2.png": "\u878d",
    "U3bhkh.png": "\u9a9a",
    "u6K6ci.png": "\u6b22",
    "u9Tibu.png": "\u5185",
    "Ua2WwL.png": "\u5a07",
    "Uai2en.png": "\u5f3a",
    "UeWULF.png": "\u5ead",
    "UfXSsz.png": "\u540e",
    "ui0T5v.png": "\u79bd",
    "UqClGF.png": "\u80a1",
    "Urv1FM.png": "\u80bf",
    "uwXRHd.png": "\u55b7",
    "v4iqzP.png": "\u7f1d",
    "vAdmoL.png": "\u786c",
    "VhA8GI.png": "\u5ae9",
    "VHsdy1.png": "\u6838",
    "vjOssT.png": "\u585e",
    "vkYfGf.png": "\u9b54",
    "vMmUqq.png": "\u5974",
    "VnvOwV.png": "\u6da6",
    "VoAjiw.png": "\u6e7f",
    "vrtXeW.png": "\u88c6",
    "VUbefT.png": "\u8f6e",
    "vulCqw.png": "\u6267",
    "VYaPfX.png": "\u7a74",
    "VyJ2cS.png": "\u90a6",
    "W06Vg1.png": "\u5de8",
    "W7cCwn.png": "\u6345",
    "W9Y9vD.png": "\u820c",
    "wa54S5.png": "\u542b",
    "FNq1zS.png": "\u868C",
    "DDpMPK.png": "\u868C",
    "vDbU8w.png": "\u817A",
    "SSoXSL.png": "\u8461",
    "YB6iOy.png": "\u817A",
    "kMqpt6.png": "\u96CF",
    "5RwMUT.png": "\u854A",
    "b94JXX.png": "\u8114",
    "oxFS6J.png": "\u8114",
    "H53jMR.png": "\u96CF",
};


/***/ }),

/***/ "./src/rules/linovel.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Linovel = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Linovel extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".book-title").innerText.trim();
        const author = document.querySelector(".author-frame > .novelist > div:nth-child(3) > a").innerText.trim();
        const introDom = document.querySelector(".about-text");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const attachmentsUrlList = [];
        const coverUrl = document.querySelector(".book-cover > a").href;
        if (coverUrl) {
            attachmentsUrlList.push(coverUrl);
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.attachments = [];
        const volumeCoverUrlList = Array.from(document.querySelectorAll(".section-list > .section > .volume-info > .volume-cover a")).map((a) => a.href);
        for (const volumeCoverUrl of volumeCoverUrlList) {
            if (!attachmentsUrlList.includes(volumeCoverUrl)) {
                attachmentsUrlList.push(volumeCoverUrl);
                (0, attachments_1.getImageAttachment)(volumeCoverUrl, this.imageMode, "volumeCover-")
                    .then((volumeCoverObj) => {
                    additionalMetadate.attachments?.push(volumeCoverObj);
                })
                    .catch((error) => log_1.log.error(error));
            }
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.meta-info > div.book-cats.clearfix > a")).map((a) => a.innerText.trim());
        const chapters = [];
        const sections = document.querySelectorAll(".section-list > .section");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1;
            const sectionName = s.querySelector(".volume-info > h2.volume-title > a").innerText.trim();
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll(".chapter-list > .text-content-actual div.chapter");
            for (const div of Array.from(cs)) {
                const a = div.firstElementChild;
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const isVIP = () => {
                    if (div.className.includes("lock")) {
                        if (div.className.includes("unlock")) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    return false;
                };
                const isPaid = () => {
                    return false;
                };
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", {});
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            const ChapterName = doc.querySelector(".article-title").innerText.trim();
            const content = doc.querySelector(".article-text");
            if (content) {
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: ChapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: ChapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        async function vipChapter() {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Linovel = Linovel;


/***/ }),

/***/ "./src/rules/linovelib.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Linovelib = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Linovelib extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href.replace(/\/catalog$/, ".html");
        const bookname = document.querySelector(".book-meta > h1").innerText.trim();
        const author = document.querySelector(".book-meta > p:nth-child(2) > span:nth-child(1) > a:nth-child(2)").innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const introDom = doc.querySelector(".book-dec > p:nth-child(1)");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector(".book-img > img")
            .src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(doc.querySelectorAll(".book-label a")).map((a) => a.innerText.trim());
        const chapters = [];
        const chapterList = document.querySelector(".chapter-list");
        if (!chapterList) {
            throw new Error("获取章节失败！");
        }
        const liList = chapterList.children;
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const node of Array.from(liList)) {
            const nodeNmae = node.nodeName.toLowerCase();
            if (nodeNmae === "div") {
                sectionNumber++;
                sectionChapterNumber = 0;
                sectionName = node.innerText.trim();
            }
            else if (nodeNmae === "li") {
                chapterNumber++;
                sectionChapterNumber++;
                const a = node.firstElementChild;
                const isVIP = false;
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, null, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", {});
                if (chapterUrl.startsWith("javascript")) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        return (0, common_1.nextPageParse)({
            chapterName,
            chapterUrl,
            charset,
            selector: "#TextContent",
            contentPatch: (_content, doc) => {
                const ss = Array.from(doc.querySelectorAll("script")).find((s) => s.innerHTML.includes('document.getElementById("chapter_last")'));
                if (ss) {
                    const _domNr = ss.innerText.trim().match(/let dom_nr = '(.+)';/);
                    if (_domNr) {
                        const domNr = _domNr[1];
                        doc.getElementById("chapter_last").innerHTML =
                            domNr;
                    }
                }
                (0, misc_1.rm)(".tp", true, _content);
                (0, misc_1.rm)(".bd", true, _content);
                return _content;
            },
            getNextPage: (doc) => doc.querySelector(".mlfy_page > a:nth-child(5)")
                .href,
            continueCondition: (_content, nextLink) => new URL(nextLink).pathname.includes("_"),
        });
    }
}
exports.Linovelib = Linovelib;


/***/ }),

/***/ "./src/rules/meegoq.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Meegoq = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Meegoq extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 3;
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/book", "/info");
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, "GBK");
        const author = dom.querySelector("article.info > p.detail.pt20 > i:nth-child(1) > a").innerText.trim();
        const bookname = dom.querySelector("article.info > header > h1").innerText.trim();
        const introDom = dom.querySelector("article.info > p.desc");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            (0, misc_1.rm)("b", false, introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = dom.querySelector("article.info > div.cover > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const ul = document.querySelector("ul.mulu");
        if (ul?.childElementCount) {
            const ulc = Array.from(ul.children);
            if (Array.from(ulc[0].classList).includes("volumn") &&
                ulc[0].innerText.match(/最新.章/)) {
                for (let i = 0; i < ul?.childElementCount; i++) {
                    if (i !== 0 &&
                        Array.from(ulc[i].classList).includes("volumn") &&
                        ulc[i].innerText.trim() !== "全部章节") {
                        delete ulc[0];
                        break;
                    }
                    delete ulc[i];
                }
            }
            const chapterList = ulc.filter((obj) => obj !== undefined);
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionName = null;
            let sectionChapterNumber = 0;
            for (const li of chapterList) {
                if (Array.from(li.classList).includes("volumn")) {
                    sectionNumber++;
                    sectionChapterNumber = 0;
                    sectionName = li.innerText.trim();
                }
                else {
                    chapterNumber++;
                    sectionChapterNumber++;
                    const a = li.firstElementChild;
                    const chapterName = a.innerText;
                    const chapterUrl = a.href;
                    const isVIP = false;
                    const isPaid = false;
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector("article > header > h1").innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Meegoq = Meegoq;


/***/ }),

/***/ "./src/rules/onePageWithoutSection/256wxc.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c256wxc = void 0;
const template_1 = __webpack_require__("./src/rules/onePageWithoutSection/template.ts");
exports.c256wxc = (0, template_1.mkRuleClass)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".art_tit").innerText.trim(),
    author: (document.querySelector("span.bookinfo:nth-child(1) > a") ??
        document.querySelector("span.bookinfo:nth-child(1)")).innerText
        .replace(/^作者：/, "")
        .trim(),
    introDom: document.querySelector(".infotype > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: null,
    aList: document.querySelectorAll(".catalog > li > a"),
    getContent: (doc) => doc.querySelector(".book_con"),
    contentPatch: (content) => content,
});


/***/ }),

/***/ "./src/rules/onePageWithoutSection/630shu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c630shu = void 0;
const template_1 = __webpack_require__("./src/rules/onePageWithoutSection/template.ts");
exports.c630shu = (0, template_1.mkRuleClass)({
    bookUrl: document.location.href,
    bookname: document.querySelector("#info > h1").innerText.trim(),
    author: document.querySelector("div.options > span.item:nth-child(1) > a").innerText.trim(),
    introDom: document.querySelector("#intro"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".img_in > img").src,
    aList: document.querySelectorAll(".zjlist > dd > a"),
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => {
        content.innerHTML = content.innerHTML.replace(/恋上你看书网 WWW.630SHU.NET ，最快更新.+最新章节！/, "");
        return content;
    },
});


/***/ }),

/***/ "./src/rules/onePageWithoutSection/template.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mkRuleClass = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
function mkRuleClass(optionis) {
    const { bookUrl, bookname, author, introDom, introDomPatch, coverUrl, aList: cos, getContentFromUrl, getContent, contentPatch, } = optionis;
    return class extends rules_1.BaseRuleClass {
        constructor() {
            super();
            this.imageMode = "TM";
        }
        async bookParse() {
            const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, introDomPatch);
            const additionalMetadate = {};
            if (coverUrl) {
                (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => log_1.log.error(error));
            }
            const chapters = [];
            let chapterNumber = 0;
            for (const aElem of Array.from(cos)) {
                chapterNumber++;
                const chapterName = aElem.innerText;
                const chapterUrl = aElem.href;
                const isVIP = false;
                const isPaid = false;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, this.charset, { bookname });
                chapters.push(chapter);
            }
            const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
            return book;
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            let content;
            if (getContentFromUrl !== undefined) {
                content = await getContentFromUrl(chapterUrl, chapterName, charset);
            }
            else if (getContent !== undefined) {
                const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
                content = getContent(doc);
            }
            if (content) {
                content = contentPatch(content);
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    };
}
exports.mkRuleClass = mkRuleClass;


/***/ }),

/***/ "./src/rules/onePageWithoutSection/trxs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tongrenquan = exports.trxs = void 0;
const template_1 = __webpack_require__("./src/rules/onePageWithoutSection/template.ts");
const trxs = () => (0, template_1.mkRuleClass)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".infos > h1").innerText
        .split("(")[0]
        .trim(),
    author: document.querySelector(".date > span > a").innerText.trim(),
    introDom: document.querySelector(".infos > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".pic > img").src,
    aList: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) => doc.querySelector(".read_chapterDetail"),
    contentPatch: (content) => content,
});
exports.trxs = trxs;
const tongrenquan = () => (0, template_1.mkRuleClass)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".infos > h1").innerText
        .split("(")[0]
        .trim(),
    author: document.querySelector(".date > span").innerText
        .replace("作者：", "")
        .trim(),
    introDom: document.querySelector(".infos > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".pic > img").src,
    aList: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) => doc.querySelector(".read_chapterDetail"),
    contentPatch: (content) => content,
});
exports.tongrenquan = tongrenquan;


/***/ }),

/***/ "./src/rules/onePageWithoutSectionWithMultiIndexPage/226ks.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c226ks = void 0;
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const template_1 = __webpack_require__("./src/rules/onePageWithoutSectionWithMultiIndexPage/template.ts");
const c226ks = () => (0, template_1.mkRuleClass)({
    bookUrl: document.location.href.replace(/index_\d+\.html/, "index_1.html"),
    bookname: document.querySelector(".info > .top > h1").innerText.trim(),
    author: document.querySelector(".info > .top > .fix > p:nth-child(1)").innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
    introDom: document.querySelector(".desc"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".imgbox > img").src,
    getIndexUrls: () => Array.from(document.querySelectorAll('[name="pageselect"] > option')).map((opt) => document.location.origin + opt.getAttribute("value")),
    getAList: (doc) => doc.querySelectorAll("div.section-box:nth-child(4) > ul:nth-child(1) > li > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
        const { chapterName: _chapterName, contentRaw, contentText, contentHTML, contentImages, additionalMetadate, } = await (0, common_1.nextPageParse)({
            chapterName,
            chapterUrl,
            charset,
            selector: "#content",
            contentPatch: (content, doc) => {
                (0, misc_1.rm)("script", true, content);
                (0, misc_1.rm)("div.posterror", false, content);
                (0, misc_1.rm)("div[onclick]", true, content);
                const ad = '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
                content.innerHTML = content.innerHTML.replace(ad, "");
                return content;
            },
            getNextPage: (doc) => doc.querySelector("div.section-opt.m-bottom-opt > a:nth-child(5)").href,
            continueCondition: (_content, nextLink) => {
                const pathname = nextLink.split("/").slice(-1)[0];
                return pathname.includes("_");
            },
            enableCleanDOM: false,
        });
        return contentRaw;
    },
    contentPatch: (content) => content,
});
exports.c226ks = c226ks;


/***/ }),

/***/ "./src/rules/onePageWithoutSectionWithMultiIndexPage/template.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mkRuleClass = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
function mkRuleClass(optionis) {
    const { bookUrl, bookname, author, introDom, introDomPatch, coverUrl, getIndexUrls, getAList, getContentFromUrl, getContent, contentPatch, } = optionis;
    return class extends rules_1.BaseRuleClass {
        constructor() {
            super();
            this.imageMode = "TM";
        }
        async bookParse() {
            const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, introDomPatch);
            const additionalMetadate = {};
            if (coverUrl) {
                (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => log_1.log.error(error));
            }
            const indexUrls = getIndexUrls();
            const getIndexDom = (url, retry) => {
                return (0, http_1.getHtmlDOM)(url)
                    .then((dom) => dom)
                    .catch((error) => {
                    log_1.log.error(error);
                    log_1.log.error(`[bookParse][getIndexDom]抓取目录页失败: ${url}, 第${setting_1.retryLimit - retry}次重试`);
                    retry--;
                    if (retry > 0) {
                        return getIndexDom(url, retry);
                    }
                    else {
                        return null;
                    }
                });
            };
            const _indexPage = indexUrls.map((url) => getIndexDom(url, setting_1.retryLimit));
            const indexPage = await Promise.all(_indexPage);
            const _aListList = indexPage
                .map((doc) => {
                if (doc) {
                    return getAList(doc);
                }
                else {
                    log_1.log.error("[bookParse]部分目录页抓取失败！");
                    return null;
                }
            })
                .filter((a) => a !== null);
            const aListList = [];
            _aListList.forEach((alist) => Array.from(alist).forEach((a) => aListList.push(a)));
            const chapters = [];
            let chapterNumber = 0;
            for (const aElem of Array.from(aListList)) {
                chapterNumber++;
                const chapterName = aElem.innerText;
                const chapterUrl = aElem.href;
                const isVIP = false;
                const isPaid = false;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, this.charset, { bookname });
                chapters.push(chapter);
            }
            const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
            return book;
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            let content;
            if (getContentFromUrl !== undefined) {
                content = await getContentFromUrl(chapterUrl, chapterName, charset);
            }
            else if (getContent !== undefined) {
                const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
                content = getContent(doc);
            }
            if (content) {
                content = contentPatch(content);
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    };
}
exports.mkRuleClass = mkRuleClass;


/***/ }),

/***/ "./src/rules/qimao.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Qimao = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Qimao extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("h2.tit").innerText.trim();
        const author = document.querySelector(".p-name > a").innerHTML.trim();
        const introDom = document.querySelector(".book-introduction .article");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".poster-pic > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll(".qm-tags > a")).map((a) => a.innerText.trim());
        const chapters = [];
        const cos = document.querySelectorAll('.chapter-directory > dd > div[sort-type="ascending"] a');
        let chapterNumber = 0;
        for (const aElem of Array.from(cos)) {
            chapterNumber++;
            const chapterName = aElem.innerText;
            const chapterUrl = aElem.href;
            const isVIP = () => {
                if (aElem.childElementCount) {
                    return true;
                }
                else {
                    return false;
                }
            };
            const isPaid = () => {
                return false;
            };
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), null, null, null, this.chapterParse, "UTF-8", {});
            const isLogin = () => {
                return false;
            };
            if (isVIP() && !(isLogin() && chapter.isPaid)) {
                chapter.status = main_1.Status.aborted;
            }
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            log_1.log.debug(`[Chapter]请求 ${chapterUrl}`);
            const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector(".title").innerText.trim();
            const content = doc.querySelector(".article");
            if (content) {
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        async function vipChapter() {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Qimao = Qimao;


/***/ }),

/***/ "./src/rules/qingoo.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Qingoo = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Qingoo extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".title > dl > dd > h1").innerText.trim();
        const author = document.querySelector("#author").innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector("#allDesc");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".title > dl > dt > img:nth-child(1)").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const data = unsafeWindow.data;
        const _linkTemp = document.querySelector("#chapterItem")
            ?.firstElementChild?.href;
        const linkTemp = new URL(_linkTemp);
        for (const d of data) {
            const status = d.status;
            const chapterNumber = d.sn;
            const chapterName = d.name;
            linkTemp.searchParams.set("index", (chapterNumber - 1).toString());
            const chapterUrl = linkTemp.toString();
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, this.charset, {});
            if (!status) {
                chapter.status = main_1.Status.aborted;
            }
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector("#content > h1").innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            (0, misc_1.rm)("div.header", false, content);
            (0, misc_1.rm)("h1", false, content);
            (0, misc_1.rm)("h6", false, content);
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Qingoo = Qingoo;


/***/ }),

/***/ "./src/rules/shouda8.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shouda8 = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Shouda8 extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".bread-crumbs > li:nth-child(4)").innerText.trim();
        const author = document.querySelector("div.bookname > h1 > em").innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            (0, misc_1.rm)(".book_keywords", false, introDomI);
            (0, misc_1.rm)("script", true, introDomI);
            (0, misc_1.rm)("#cambrian0", false, introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".pic > img:nth-child(1)").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const chapterList = document.querySelectorAll(".link_14 > dl dd a");
        for (let i = 0; i < chapterList.length; i++) {
            const a = chapterList[i];
            const chapterName = a.innerText;
            const chapterUrl = a.href;
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, i + 1, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector(".kfyd > h2:nth-child(1)").innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            (0, misc_1.rm)("p:last-child", false, content);
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Shouda8 = Shouda8;


/***/ }),

/***/ "./src/rules/shubaowa.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shubaowa = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Shubaowa extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("#info > h1:nth-child(1)").innerText.trim();
        const author = document.querySelector("#info > p:nth-child(2)").innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img")?.src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const cos = document.querySelectorAll("#list > dl > dd > a");
        let chapterNumber = 0;
        for (const aElem of Array.from(cos)) {
            chapterNumber++;
            const chapterName = aElem.innerText;
            const chapterUrl = aElem.href;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, false, false, null, null, null, this.chapterParse, this.charset, {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector(".bookname > h1:nth-child(1)").innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Shubaowa = Shubaowa;


/***/ }),

/***/ "./src/rules/soxscc.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Soxscc = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Soxscc extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".xiaoshuo > h1").innerText.trim();
        const author = document.querySelector(".xiaoshuo > h6:nth-child(3) > a").innerText.trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            (0, misc_1.rm)("span.tags", false, introDomI);
            (0, misc_1.rm)("q", true, introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book_cover > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const novelList = document.querySelector("div.novel_list[id]");
        const sections = Array.from(novelList.children);
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionName = section.querySelector("dt > b")
                ?.innerText;
            const cos = Array.from(section.querySelectorAll("dd > a"));
            let sectionChapterNumber = 0;
            for (const a of cos) {
                chapterNumber++;
                sectionChapterNumber++;
                const chapterUrl = a.href;
                const chapterName = a.innerText;
                const isVIP = false;
                const isPaid = false;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, i + 1, sectionChapterNumber, this.chapterParse, "UTF-8", { bookname });
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const bookname = options.bookname;
        chapterName = doc.querySelector(".read_title > h1").innerText.trim();
        const content = doc.querySelector("div.content[id]");
        if (content) {
            const ad = `您可以在百度里搜索“${bookname} .+(${document.location.hostname})”查找最新章节！`;
            content.innerHTML = content.innerHTML.replaceAll(ad, "");
            Array.from(content.querySelectorAll("p")).forEach((p) => {
                const adwords = [
                    "最新章节地址：",
                    "全文阅读地址：",
                    "txt下载地址：",
                    "手机阅读：",
                    '为了方便下次阅读，你可以点击下方的"收藏"记录本次',
                    "请向你的朋友（QQ、博客、微信等方式）推荐本书",
                ];
                for (const adword of adwords) {
                    if (p.innerText.includes(adword)) {
                        p.remove();
                    }
                }
            });
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Soxscc = Soxscc;


/***/ }),

/***/ "./src/rules/special/17k.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C17k = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class C17k extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/list/", "/book/");
        const bookname = document.querySelector("h1.Title").innerText.trim();
        const author = document.querySelector("div.Author > a").innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const introDom = doc.querySelector("#bookInfo p.intro > a");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector("#bookCover img.book").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const sections = document.querySelectorAll("dl.Volume");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1;
            const sectionName = s.querySelector("dt > span.tit").innerText.trim();
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll("dd > a");
            for (const a of Array.from(cs)) {
                const span = a.firstElementChild;
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = span.innerText.trim();
                const chapterUrl = a.href;
                const isVIP = () => {
                    if (span?.className.includes("vip")) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                const isPaid = () => {
                    return false;
                };
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector("#readArea > div.readAreaBox.content > h1").innerText.trim();
            const content = doc.querySelector("#readArea > div.readAreaBox.content > div.p");
            if (content) {
                (0, misc_1.rm)("p.copy", false, content);
                (0, misc_1.rm)("#banner_content", false, content);
                (0, misc_1.rm)("div.qrcode", false, content);
                (0, misc_1.rm)("div.chapter_text_ad", false, content);
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        async function vipChapter() {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.C17k = C17k;


/***/ }),

/***/ "./src/rules/special/ciweimao.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ciweimao = void 0;
const CryptoJS = __webpack_require__("crypto-js");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Ciweimao extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }
    async bookParse() {
        const bookid = unsafeWindow.HB.book.book_id;
        const bookUrl = `https://www.ciweimao.com/book/${bookid}`;
        const bookname = document.querySelector(".book-catalog .hd h3").innerText.trim();
        const author = document.querySelector(".book-catalog .hd > p > a").innerText.trim();
        const dom = await (0, http_2.getHtmlDOM)(bookUrl, undefined);
        const introDom = dom.querySelector(".book-intro-cnt .book-desc");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = dom.querySelector(".cover > img")
            .src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(dom.querySelectorAll(".label-box > .label")).map((span) => span.innerText.trim());
        const chapters = [];
        const sections = document.querySelectorAll(".book-chapter > .book-chapter-box");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1;
            const sectionName = s.querySelector(".sub-tit")
                .innerText;
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll(".book-chapter-list > li > a");
            for (const c of Array.from(cs)) {
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = c.innerText.trim();
                const chapterUrl = c.href;
                let isVIP = false;
                let isPaid = false;
                if (c.childElementCount) {
                    isVIP = true;
                    if (c.firstElementChild?.className === "icon-unlock") {
                        isPaid = true;
                    }
                }
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                const isLogin = document.querySelector(".login-info.ly-fr")?.childElementCount === 1
                    ? true
                    : false;
                if (isVIP && !(isLogin && isPaid)) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function decrypt(item) {
            let message = item.content;
            const keys = item.keys;
            const len = item.keys.length;
            const accessKey = item.accessKey;
            const accessKeyList = accessKey.split("");
            const charsNotLatinNum = accessKeyList.length;
            const output = new Array();
            output.push(keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]);
            output.push(keys[accessKeyList[0].charCodeAt(0) % len]);
            for (let i = 0; i < output.length; i++) {
                message = atob(message);
                const data = output[i];
                const iv = btoa(message.substr(0, 16));
                const keys255 = btoa(message.substr(16));
                const pass = CryptoJS.format.OpenSSL.parse(keys255);
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
        async function getChapterAuthorSay() {
            const doc = await (0, http_2.getHtmlDOM)(chapterUrl, undefined);
            const chapterAuthorSays = doc.querySelectorAll("#J_BookCnt .chapter.author_say");
            let divChapterAuthorSay;
            if (chapterAuthorSays.length !== 0) {
                const hr = document.createElement("hr");
                divChapterAuthorSay = document.createElement("div");
                divChapterAuthorSay.appendChild(hr);
                for (const chapterAuthorSay of Array.from(chapterAuthorSays)) {
                    (0, misc_1.rm)("i", true, chapterAuthorSay);
                    divChapterAuthorSay.appendChild(chapterAuthorSay);
                }
            }
            return divChapterAuthorSay;
        }
        const chapterId = chapterUrl.split("/").slice(-1)[0];
        async function publicChapter() {
            async function chapterDecrypt(chapterIdt, refererUrl) {
                const rootPath = "https://www.ciweimao.com/";
                const accessKeyUrl = rootPath + "chapter/ajax_get_session_code";
                const chapterContentUrl = rootPath + "chapter/get_book_chapter_detail_info";
                log_1.log.debug(`[Chapter]请求 ${accessKeyUrl} Referer ${refererUrl}`);
                const accessKeyObj = await (0, http_1.gfetch)(accessKeyUrl, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/javascript, */*; q=0.01",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        Referer: refererUrl,
                        Origin: "https://www.ciweimao.com",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    data: `chapter_id=${chapterIdt}`,
                    responseType: "json",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                const chapter_access_key = accessKeyObj
                    .chapter_access_key;
                log_1.log.debug(`[Chapter]请求 ${chapterContentUrl} Referer ${refererUrl}`);
                const chapterContentObj = await (0, http_1.gfetch)(chapterContentUrl, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/javascript, */*; q=0.01",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        Referer: refererUrl,
                        Origin: "https://www.ciweimao.com",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    data: `chapter_id=${chapterIdt}&chapter_access_key=${chapter_access_key}`,
                    responseType: "json",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                if (chapterContentObj.code !== 100000) {
                    log_1.log.error(chapterContentObj);
                    throw new Error(`下载 ${refererUrl} 失败`);
                }
                return decrypt({
                    content: chapterContentObj.chapter_content,
                    keys: chapterContentObj.encryt_keys,
                    accessKey: chapter_access_key,
                });
            }
            const divChapterAuthorSay = await getChapterAuthorSay();
            const content = document.createElement("div");
            const decryptDate = await chapterDecrypt(chapterId, chapterUrl);
            content.innerHTML = decryptDate;
            (0, misc_1.rm)(".chapter span", true, content);
            if (divChapterAuthorSay) {
                content.appendChild(divChapterAuthorSay);
            }
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        async function vipChapter() {
            const isLogin = document.querySelector(".login-info.ly-fr")?.childElementCount === 1
                ? true
                : false;
            if (isLogin && isPaid) {
                async function vipChapterDecrypt(chapterIdi, refererUrl) {
                    const HB = unsafeWindow.HB;
                    const parentWidth = 871;
                    const setFontSize = "14";
                    const imageSessionCodeUrl = HB.config.rootPath + "chapter/ajax_get_image_session_code";
                    log_1.log.debug(`[Chapter]请求 ${imageSessionCodeUrl} Referer ${refererUrl}`);
                    const imageSessionCodeObject = await (0, http_1.gfetch)(imageSessionCodeUrl, {
                        method: "POST",
                        headers: {
                            Accept: "application/json, text/javascript, */*; q=0.01",
                            Referer: refererUrl,
                            Origin: "https://www.ciweimao.com",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        responseType: "json",
                    })
                        .then((response) => response.response)
                        .catch((error) => log_1.log.error(error));
                    if (imageSessionCodeObject.code !== 100000) {
                        log_1.log.error(imageSessionCodeObject);
                        throw new Error(`下载 ${refererUrl} 失败`);
                    }
                    const imageCode = decrypt({
                        content: imageSessionCodeObject
                            .image_code,
                        keys: imageSessionCodeObject
                            .encryt_keys,
                        accessKey: imageSessionCodeObject
                            .access_key,
                    });
                    const vipCHapterImageUrlI = HB.config.rootPath +
                        "chapter/book_chapter_image?chapter_id=" +
                        chapterIdi +
                        "&area_width=" +
                        parentWidth +
                        "&font=undefined" +
                        "&font_size=" +
                        setFontSize +
                        "&image_code=" +
                        imageCode +
                        "&bg_color_name=white" +
                        "&text_color_name=white";
                    return vipCHapterImageUrlI;
                }
                const divChapterAuthorSay = await getChapterAuthorSay();
                const vipCHapterImageUrl = await vipChapterDecrypt(chapterId, chapterUrl);
                log_1.log.debug(`[Chapter]请求 ${vipCHapterImageUrl} Referer ${chapterUrl}`);
                const vipCHapterImageBlob = await (0, http_1.gfetch)(vipCHapterImageUrl, {
                    method: "GET",
                    headers: {
                        Referer: chapterUrl,
                        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                    },
                    responseType: "blob",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                const vipCHapterName = `vipCHapter${chapterId}.png`;
                const vipCHapterImage = new main_1.AttachmentClass(vipCHapterImageUrl, vipCHapterName, "TM");
                if (vipCHapterImageBlob) {
                    vipCHapterImage.imageBlob = vipCHapterImageBlob;
                    vipCHapterImage.status = main_1.Status.finished;
                }
                const contentImages = [vipCHapterImage];
                let ddom;
                let dtext;
                let dimages;
                if (divChapterAuthorSay) {
                    const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(divChapterAuthorSay, "TM");
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
                    chapterName,
                    contentRaw: contentHTML,
                    contentText,
                    contentHTML,
                    contentImages,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Ciweimao = Ciweimao;


/***/ }),

/***/ "./src/rules/special/dmzj.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dmzj = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Dmzj extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const isWwwHost = document.location.host === "www.dmzj.com";
        const bookDom = isWwwHost
            ? document.querySelector(".comic_deCon > h1 > a")
            : document.querySelector(".anim_title_text > a > h1");
        const bookname = bookDom.innerText.trim();
        const authorDom = isWwwHost
            ? document.querySelector(".comic_deCon_liO > li:nth-child(1)")
            : document.querySelector(".anim-main_list > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > a:nth-child(1)");
        const author = authorDom.innerText
            .replace("作者：", "")
            .trim();
        const introDom = isWwwHost
            ? document.querySelector(".comic_deCon_d")
            : document.querySelector(".line_height_content");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverDom = isWwwHost
            ? document.querySelector(".comic_i_img > a > img")
            : document.querySelector("#cover_pic");
        const coverUrl = coverDom.src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const cos = isWwwHost
            ? document.querySelectorAll("div.zj_list_con:nth-child(4) > ul.list_con_li > li")
            : document.querySelectorAll(".cartoon_online_border > ul > li");
        let chapterNumber = 0;
        for (const co of Array.from(cos)) {
            chapterNumber++;
            const a = co.firstElementChild;
            let chapterName;
            if (isWwwHost) {
                const span = a.lastElementChild;
                chapterName = span.innerText;
            }
            else {
                chapterName = a.innerText;
            }
            const chapterUrl = a.href;
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function getpicUrlList(docI) {
            const imgPrefix = "https://images.dmzj.com/";
            const scriptElement = Array.from(docI.querySelectorAll("head > script")).filter((s) => s.innerHTML.includes("eval("))[0];
            let pages = (0, misc_1.sandboxed)(scriptElement.innerText + ";return pages;");
            pages = pages.replace(/\n/g, "");
            pages = pages.replace(/\r/g, "|");
            const info = (0, misc_1.sandboxed)("return (" + pages + ")");
            if (info) {
                let picUrlListI;
                if (isWwwHost) {
                    picUrlListI = info.page_url
                        .split("|")
                        .map((pic) => imgPrefix + pic);
                }
                else {
                    picUrlListI = info.map((pic) => imgPrefix + pic);
                }
                return picUrlListI;
            }
        }
        log_1.log.debug(`[Chapter]请求 ${chapterUrl}`);
        const isWwwHost = document.location.host === "www.dmzj.com";
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const picUrlList = getpicUrlList(doc);
        if (picUrlList) {
            const content = document.createElement("div");
            for (const picUrl of picUrlList) {
                const pElem = document.createElement("p");
                const imgElem = document.createElement("img");
                imgElem.src = picUrl;
                pElem.appendChild(imgElem);
                content.appendChild(pElem);
            }
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        return {
            chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };
    }
}
exports.Dmzj = Dmzj;


/***/ }),

/***/ "./src/rules/special/gongzicp.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gongzicp = void 0;
const CryptoJS = __webpack_require__("crypto-js");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Gongzicp extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookId = document.querySelector("span.id").innerText.replace("CP", "");
        if (!bookId) {
            throw new Error("获取bookID出错");
        }
        const novelGetInfoBaseUrl = "https://webapi.gongzicp.com/novel/novelGetInfo";
        const novelGetInfoUrl = new URL(novelGetInfoBaseUrl);
        novelGetInfoUrl.searchParams.set("id", bookId);
        log_1.log.debug(`请求地址: ${novelGetInfoUrl.toString()}`);
        const novelInfo = await fetch(novelGetInfoUrl.toString(), {
            credentials: "include",
            headers: {
                Accept: "application/json, text/plain, */*",
                Client: "pc",
                Lang: "cn",
                "Content-Type": "application/json;charset=utf-8",
            },
            referrer: bookUrl,
            method: "GET",
            mode: "cors",
        })
            .then((response) => response.json())
            .catch((error) => log_1.log.error(error));
        if (novelInfo.code !== 200) {
            throw new Error(`数据接口请求失败，URL:${novelGetInfoUrl.toString()}`);
        }
        const data = novelInfo.data;
        const bookname = data.novelInfo.novel_name;
        const author = data.novelInfo.author_nickname;
        const introDom = document.createElement("div");
        introDom.innerHTML = data.novelInfo.novel_info;
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = data.novelInfo.novel_cover;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = data.novelInfo.tag_list;
        async function isLogin() {
            const getUserInfoUrl = "https://webapi.gongzicp.com/user/getUserInfo";
            log_1.log.debug(`正在请求: ${getUserInfoUrl}`);
            const userInfo = await fetch(getUserInfoUrl, {
                headers: {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "x-requested-with": "XMLHttpRequest",
                },
                method: "GET",
                mode: "cors",
                credentials: "include",
            })
                .then((response) => response.json())
                .catch((error) => log_1.log.error(error));
            if (userInfo.code === 200) {
                return true;
            }
            return false;
        }
        const logined = await isLogin();
        const chapters = [];
        const _chapterList = data.chapterList;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const chapterObj of _chapterList) {
            if (chapterObj.type === "volume") {
                sectionNumber = chapterObj.vid;
                sectionName = chapterObj.name;
                sectionChapterNumber = 0;
            }
            else if (chapterObj.type === "item") {
                const chapterUrl = [
                    document.location.origin,
                    "v4",
                    `read-${chapterObj.id}.html`,
                ].join("/");
                const chapterNumber = Number(chapterObj.order);
                const chapterName = chapterObj.name;
                const isVIP = chapterObj.pay;
                const isPaid = chapterObj.is_sub;
                const isLock = chapterObj.lock;
                sectionChapterNumber++;
                const chapterOption = {
                    novel_id: data.novelInfo.novel_id,
                    chapter_id: chapterObj.id,
                };
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", chapterOption);
                if ((isVIP && !(logined && chapter.isPaid)) || isLock) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function cpDecrypt(contentOrig) {
            const setIv = (key) => {
                key = key + parseInt("165455", 14).toString(32);
                const iv = CryptoJS.enc.Utf8.parse("$h$b3!" + key);
                return iv;
            };
            const setKey = (value) => {
                value = value + parseInt("4d5a6c8", 14).toString(36);
                const key = CryptoJS.enc.Utf8.parse(value + "A");
                return key;
            };
            const setcfg = (iv) => {
                return {
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                    iv,
                };
            };
            const encrypt = (value, key, cfg) => {
                if ("string" !== typeof value) {
                    value = JSON.stringify(value);
                }
                const xml = CryptoJS.enc.Utf8.parse(value);
                return CryptoJS.AES.encrypt(xml, key, cfg).toString();
            };
            const decrypt = (secrets, key, cfg) => {
                const value = CryptoJS.AES.decrypt(secrets, key, cfg);
                return CryptoJS.enc.Utf8.stringify(value).toString();
            };
            let _CP_NUXT;
            let LCngpxaFSubstr;
            if (_CP_NUXT) {
                LCngpxaFSubstr = _CP_NUXT.state.CpST.LCngpxaF.substr(2, 10);
            }
            else {
                LCngpxaFSubstr = unsafeWindow.__NUXT__.state.CpST.LCngpxaF.substr(1, 10);
            }
            const ivG = setIv("iGzsYn");
            const keyG = setKey(LCngpxaFSubstr);
            const cfgG = setcfg(ivG);
            const content = decrypt(contentOrig, keyG, cfgG);
            return content;
        }
        function randomWalker() {
            log_1.log.info("[chapter]随机翻页中……");
            if (document.location.pathname.includes("novel")) {
                document.querySelector(".chapter-list > .chapter > a").click();
            }
            if (document.location.pathname.includes("read")) {
                const rightMenu = document.querySelector(".right-menu");
                if (rightMenu?.childElementCount === 6) {
                    document.querySelector(".right-menu > div:nth-child(3) > a:nth-child(1)").click();
                }
                else if (rightMenu?.childElementCount === 7) {
                    if (document.querySelector("div.content.unpaid")) {
                        document.querySelector(".right-menu > div:nth-child(3) > a:nth-child(1)").click();
                    }
                    else if (Math.random() < 0.3) {
                        document.querySelector(".right-menu > div:nth-child(3) > a:nth-child(1)").click();
                    }
                    else {
                        document.querySelector(".right-menu > div:nth-child(4) > a:nth-child(1)").click();
                    }
                }
            }
        }
        async function getChapter() {
            const nid = options.novel_id;
            const cid = options.chapter_id;
            const chapterGetInfoBaseUrl = "https://webapi.gongzicp.com/novel/chapterGetInfo";
            const chapterGetInfoUrl = new URL(chapterGetInfoBaseUrl);
            chapterGetInfoUrl.searchParams.set("cid", cid.toString());
            chapterGetInfoUrl.searchParams.set("nid", nid.toString());
            let retryTime = 0;
            async function getChapterInfo(url) {
                log_1.log.debug(`请求地址: ${url}, Referrer: ${chapterUrl}，retryTime：${retryTime}`);
                const resultI = await fetch(url, {
                    credentials: "include",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        Client: "pc",
                        Lang: "cn",
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    referrer: chapterUrl,
                    method: "GET",
                    mode: "cors",
                })
                    .then((resp) => resp.json())
                    .catch((error) => log_1.log.error(error));
                if (resultI.data.chapterInfo.content.length !== 0 &&
                    resultI.data.chapterInfo.content.length < 30) {
                    retryTime++;
                    if (setting_1.retryLimit > setting_1.retryLimit) {
                        log_1.log.error(`请求 ${url} 失败`);
                        throw new Error(`请求 ${url} 失败`);
                    }
                    log_1.log.warn("[chapter]疑似被阻断，进行随机翻页……");
                    randomWalker();
                    await (0, misc_1.sleep)(3000);
                    randomWalker();
                    await (0, misc_1.sleep)(7000);
                    randomWalker();
                    await (0, misc_1.sleep)(3000);
                    return getChapterInfo(url);
                }
                else {
                    retryTime = 0;
                    return resultI;
                }
            }
            const result = await getChapterInfo(chapterGetInfoUrl.toString());
            if (result.code === 200) {
                const chapterInfo = result.data.chapterInfo;
                if (chapterInfo.chapterPrice !== 0 &&
                    chapterInfo.content.length === 0) {
                    return {
                        chapterName,
                        contentRaw: null,
                        contentText: null,
                        contentHTML: null,
                        contentImages: null,
                        additionalMetadate: null,
                    };
                }
                else if (chapterInfo.chapterPrice === 0 ||
                    (chapterInfo.chapterPrice !== 0 && chapterInfo.content.length !== 0)) {
                    const content = cpDecrypt(chapterInfo.content);
                    const contentRaw = document.createElement("pre");
                    contentRaw.innerHTML = content;
                    let contentText = content
                        .split("\n")
                        .map((p) => p.trim())
                        .join("\n\n");
                    let contentHTML;
                    const _contentHTML = document.createElement("div");
                    _contentHTML.innerHTML = content
                        .split("\n")
                        .map((p) => p.trim())
                        .map((p) => {
                        if (p.length === 0) {
                            return "<p><br/></p>";
                        }
                        else {
                            return `<p>${p}</p>`;
                        }
                    })
                        .join("\n");
                    if (chapterInfo.postscript.length === 0) {
                        contentHTML = _contentHTML;
                    }
                    else {
                        contentHTML = document.createElement("div");
                        contentHTML.className = "main";
                        const hr = document.createElement("hr");
                        const authorSayDom = document.createElement("div");
                        authorSayDom.innerHTML = chapterInfo.postscript
                            .split("\n")
                            .map((p) => {
                            if (p.length === 0) {
                                return "<p><br/></p>";
                            }
                            else {
                                return `<p>${p}</p>`;
                            }
                        })
                            .join("\n");
                        contentHTML.appendChild(_contentHTML);
                        contentHTML.appendChild(hr);
                        contentHTML.appendChild(authorSayDom);
                        contentRaw.innerHTML = [
                            contentRaw.innerHTML,
                            "-".repeat(20),
                            chapterInfo.postscript,
                        ].join("\n\n");
                        contentText = [
                            contentText,
                            "-".repeat(20),
                            chapterInfo.postscript,
                        ].join("\n\n");
                    }
                    return {
                        chapterName,
                        contentRaw,
                        contentText,
                        contentHTML,
                        contentImages: null,
                        additionalMetadate: null,
                    };
                }
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        async function antiAntiCrawler() {
            if (Math.random() < 0.2) {
                randomWalker();
            }
            await (0, misc_1.sleep)(3000 + Math.round(Math.random() * 4000));
        }
        async function publicChapter() {
            await antiAntiCrawler();
            return getChapter();
        }
        async function vipChapter() {
            await antiAntiCrawler();
            return getChapter();
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Gongzicp = Gongzicp;


/***/ }),

/***/ "./src/rules/special/hetushu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Hetushu = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Hetushu extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".book_info > h2").innerText.trim();
        const author = document.querySelector(".book_info > div:nth-child(3) > a:nth-child(1)").innerText.trim();
        const introDom = document.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book_info > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const chapterList = document.querySelector("#dir")?.childNodes;
        if (chapterList && chapterList.length !== 0) {
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionName = null;
            let sectionChapterNumber = 0;
            for (const node of chapterList) {
                if (node.nodeName === "DT") {
                    sectionNumber++;
                    sectionChapterNumber = 0;
                    sectionName = node.innerText.trim();
                }
                else if (node.nodeName === "DD") {
                    chapterNumber++;
                    sectionChapterNumber++;
                    const a = node.firstElementChild;
                    const chapterName = a.innerText;
                    const chapterUrl = a.href;
                    const isVIP = false;
                    const isPaid = false;
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", {});
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function sorfPage() {
            let path;
            let bid;
            let sid;
            let position;
            if (/\/(book[0-9]?)\/([0-9]+)\/([0-9]+)\.html(\?position=([0-9]+))?$/.test(chapterUrl)) {
                path = RegExp.$1;
                bid = RegExp.$2;
                sid = RegExp.$3;
                position = RegExp.$5;
            }
            else {
                return false;
            }
            const url = [
                document.location.origin,
                path,
                bid,
                "r" + sid + ".json",
            ].join("/");
            log_1.log.debug(`[Chapter]请求 ${url} Referer ${chapterUrl}`);
            const token = await fetch(url, {
                headers: {
                    accept: "*/*",
                    "cache-control": "no-cache",
                    "content-type": "application/x-www-form-urlencoded",
                    pragma: "no-cache",
                    "x-requested-with": "XMLHttpRequest",
                },
                referrer: chapterUrl,
                method: "GET",
                mode: "cors",
                credentials: "include",
            })
                .then((response) => response.headers.get("token"))
                .catch((error) => log_1.log.error(error));
            if (token) {
                const tokenDict = atob(token)
                    .split(/[A-Z]+%/)
                    .map((v) => Number(v));
                const thisBody = doc.querySelector("#content");
                let b = 0;
                let star = 0;
                for (let i = 0; i < thisBody.childNodes.length; i++) {
                    if (thisBody.childNodes[i].nodeName === "H2") {
                        star = i + 1;
                    }
                    if (thisBody.childNodes[i].nodeName === "DIV" &&
                        thisBody.childNodes[i].className !== "chapter") {
                        break;
                    }
                }
                const thisChildNode = [];
                for (let i = 0; i < tokenDict.length; i++) {
                    if (tokenDict[i] < 5) {
                        thisChildNode[tokenDict[i]] = thisBody.childNodes[i + star];
                        b++;
                    }
                    else {
                        thisChildNode[tokenDict[i] - b] = thisBody.childNodes[i + star];
                    }
                }
                for (const childNode of thisChildNode) {
                    if (!childNode) {
                        continue;
                    }
                    thisBody.appendChild(childNode);
                }
            }
        }
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector("#content .h2").innerText.trim();
        await sorfPage();
        const content = doc.querySelector("#content");
        if (content) {
            const tagRemoved = "h2, acronym, bdo, big, cite, code, dfn, kbd, q, s, samp, strike, tt, u, var";
            tagRemoved.split(", ").forEach((s) => {
                (0, misc_1.rm)(s, true, content);
            });
            Array.from(content.querySelectorAll("div")).map((oldNode) => {
                const newNode = document.createElement("p");
                newNode.innerHTML = oldNode.innerHTML;
                oldNode.parentNode?.replaceChild(newNode, oldNode);
            });
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Hetushu = Hetushu;


/***/ }),

/***/ "./src/rules/special/jjwxc.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Jjwxc = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const jjwxcFontDecode_1 = __webpack_require__("./src/rules/lib/jjwxcFontDecode.ts");
class Jjwxc extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
        this.charset = "GB18030";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const getInformationBlocked = () => {
            const fl = Array.from(document.querySelectorAll(".smallreadbody")).filter((div) => div.innerText.includes("文案信息审核未通过，等待作者修改后重新审核"));
            if (fl.length !== 0) {
                return true;
            }
            else {
                return false;
            }
        };
        let bookname = "";
        const additionalMetadate = {};
        let author = "佚名";
        let introduction = null;
        let introductionHTML = null;
        let introCleanimages = null;
        if (!getInformationBlocked()) {
            bookname = document.querySelector('h1[itemprop="name"] > span').innerText.trim();
            author = document.querySelector("td.sptd h2 a span").innerText
                .replace(/作\s+者:/, "")
                .trim();
            const introDom = document.querySelector("#novelintro");
            [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
            if (introCleanimages) {
                additionalMetadate.attachments = [...introCleanimages];
            }
            const coverUrl = document.querySelector(".noveldefaultimage").src;
            if (coverUrl) {
                (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => log_1.log.error(error));
            }
            let tags = document.querySelector("table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(1) > span:nth-child(2)").innerText.split("-");
            tags = tags.concat(Array.from(document.querySelectorAll("div.smallreadbody:nth-child(3) > span > a")).map((a) => a.innerText));
            const perspective = document.querySelector("table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(2)").innerText.replace("\n", "");
            const workStyle = document.querySelector("table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(3)").innerText.replace("\n", "");
            tags.push(perspective);
            tags.push(workStyle);
            additionalMetadate.tags = tags;
        }
        else {
            window.scrollTo(0, document.body.scrollHeight);
            await (0, misc_1.sleep)(3000);
            bookname = document.querySelector("td[id^=comment_] span.coltext > a")?.innerText
                .trim()
                .replace(/《|》/g, "");
            window.scrollTo(0, 0);
            if (!bookname) {
                throw new Error("抓取书名出错");
            }
            const authorPageUrl = document.querySelector("#oneboolt > tbody > tr:nth-child(1) > td > div > h2 > a")?.href;
            if (authorPageUrl) {
                const authorPage = await (0, http_2.getHtmlDOM)(authorPageUrl, this.charset);
                author =
                    authorPage.querySelector('span[itemprop="name"]')
                        ?.innerText ?? author;
            }
        }
        const chapters = [];
        const trList = document.querySelectorAll("#oneboolt > tbody > tr");
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const tr of Array.from(trList)) {
            if (tr.getAttribute("bgcolor")) {
                sectionNumber++;
                sectionChapterNumber = 0;
                sectionName = tr.querySelector("b.volumnfont")?.innerText.trim();
            }
            else if (tr.getAttribute("itemprop")) {
                chapterNumber++;
                sectionChapterNumber++;
                const td = tr.querySelector("td:nth-child(2)");
                const a = td?.querySelector("a:nth-child(1)");
                const isLocked = () => {
                    if (td?.innerText.trim() === "[锁]") {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                const isVIP = () => {
                    if (a?.getAttribute("onclick")) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                if (!isLocked()) {
                    if (isVIP()) {
                        const chapterName = a.innerText.trim();
                        const chapterUrl = a.getAttribute("rel");
                        if (chapterUrl) {
                            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), null, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                            const isLogin = () => {
                                if (document.getElementById("jj_login")) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            };
                            if (isVIP() && !isLogin()) {
                                chapter.status = main_1.Status.aborted;
                            }
                            chapters.push(chapter);
                        }
                    }
                    else {
                        const chapterName = a.innerText.trim();
                        const chapterUrl = a.href;
                        const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), null, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                        const isLogin = () => {
                            if (document.getElementById("jj_login")) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        };
                        if (isVIP() && !isLogin()) {
                            chapter.status = main_1.Status.aborted;
                        }
                        chapters.push(chapter);
                    }
                }
                else {
                    const chapterName = "[锁]";
                    const chapterUrl = "";
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, false, null, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                    chapter.status = main_1.Status.aborted;
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0, http_2.getHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector("div.noveltext h2").innerText.trim();
            const content = doc.querySelector("div.noveltext");
            if (content) {
                (0, misc_1.rm)("hr", true, content);
                const rawAuthorSayDom = content.querySelector(".readsmall");
                let authorSayDom;
                let authorSayText;
                if (rawAuthorSayDom) {
                    const { dom: adom, text: atext, images: aimages, } = await (0, cleanDOM_1.cleanDOM)(rawAuthorSayDom, "TM");
                    [authorSayDom, authorSayText] = [adom, atext];
                }
                (0, misc_1.rm)("div", true, content);
                content.innerHTML = content.innerHTML.replaceAll("@无限好文，尽在晋江文学城", "");
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                if (rawAuthorSayDom && authorSayDom && authorSayText) {
                    const hr = document.createElement("hr");
                    authorSayDom.className = "authorSay";
                    dom.appendChild(hr);
                    dom.appendChild(authorSayDom);
                    text = text + "\n\n" + "-".repeat(20) + "\n\n" + authorSayText;
                }
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        async function vipChapter() {
            async function getFont() {
                function getFontInfo() {
                    const s = dom.querySelectorAll("body > style")[1];
                    let fontNameI;
                    let fontUrlI;
                    if (s.sheet) {
                        const f = s.sheet.cssRules[s.sheet.cssRules.length - 2];
                        const m1 = f.cssText.match(/jjwxcfont_[\d\w]+/);
                        const m2 = f.cssText.match(/{(.*)}/);
                        if (m1 && m2) {
                            fontNameI = m1[0];
                            const ft = m2[1];
                            for (const k of ft.split(",")) {
                                if (k.includes('format("woff2")')) {
                                    const m3 = k.match(/url\("(.*)"\)\s/);
                                    if (m3) {
                                        fontUrlI = document.location.protocol + m3[1];
                                        return [fontNameI, fontUrlI];
                                    }
                                }
                            }
                        }
                    }
                    const _fontName = document.querySelector("div.noveltext")?.classList[1];
                    if (_fontName) {
                        fontNameI = _fontName;
                        fontUrlI =
                            document.location.protocol +
                                `//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
                        return [fontNameI, fontUrlI];
                    }
                    return [null, null];
                }
                let retryTime = 0;
                function fetchFont(fontUrlI) {
                    log_1.log.debug(`[Chapter]请求 ${fontUrlI} Referer ${chapterUrl} 重试次数 ${retryTime}`);
                    return (0, http_1.gfetch)(fontUrlI, {
                        headers: {
                            accept: "*/*",
                            Referer: chapterUrl,
                        },
                        responseType: "blob",
                    })
                        .then((response) => {
                        if (response.status >= 200 && response.status <= 299) {
                            return response.response;
                        }
                        else {
                            log_1.log.error(`[Chapter]请求 ${fontUrlI} 失败 Referer ${chapterUrl}`);
                            if (retryTime < setting_1.retryLimit) {
                                retryTime++;
                                return fetchFont(fontUrlI);
                            }
                            else {
                                return null;
                            }
                        }
                    })
                        .catch((error) => log_1.log.error(error));
                }
                const [fontName, fontUrl] = getFontInfo();
                if (fontName && fontUrl) {
                    const fontFileName = `${fontName}.woff2`;
                    let fontClassObj;
                    const fontClassObjCache = (0, attachments_1.getAttachmentClassCache)(fontUrl);
                    if (fontClassObjCache) {
                        fontClassObj = fontClassObjCache;
                    }
                    else {
                        const fontBlob = await fetchFont(fontUrl);
                        fontClassObj = new main_1.AttachmentClass(fontUrl, fontFileName, "TM");
                        fontClassObj.imageBlob = fontBlob;
                        fontClassObj.status = main_1.Status.finished;
                        (0, attachments_1.putAttachmentClassCache)(fontClassObj);
                    }
                    const fontStyleDom = document.createElement("style");
                    fontStyleDom.innerHTML = `.${fontName} {
  font-family: ${fontName}, 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif !important;
}
@font-face {
  font-family: ${fontName};
  src: url('${fontFileName}') format('woff2');
}
.hide {
  display: none;
}`;
                    return [fontName, fontClassObj, fontStyleDom];
                }
                return [null, null, null];
            }
            const dom = await (0, http_2.ggetHtmlDOM)(chapterUrl, charset);
            const isPaidF = () => {
                if (!dom.querySelector("#buy_content") &&
                    dom.querySelector("div.noveltext")) {
                    return true;
                }
                else {
                    return false;
                }
            };
            if (isPaidF()) {
                const ChapterName = dom.querySelector("div.noveltext h2").innerText.trim();
                const content = dom.querySelector("div.noveltext");
                if (content) {
                    (0, misc_1.rm)("hr", true, content);
                    const rawAuthorSayDom = content.querySelector(".readsmall");
                    let authorSayDom;
                    let authorSayText;
                    if (rawAuthorSayDom) {
                        const { dom: adom, text: atext, images: aimages, } = await (0, cleanDOM_1.cleanDOM)(rawAuthorSayDom, "TM");
                        [authorSayDom, authorSayText] = [adom, atext];
                    }
                    (0, misc_1.rm)("div", true, content);
                    content.innerHTML = content.innerHTML.replaceAll("@无限好文，尽在晋江文学城", "");
                    let { dom: rawDom, text: rawText, images, } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                    if (rawAuthorSayDom && authorSayDom && authorSayText) {
                        const hr = document.createElement("hr");
                        authorSayDom.className = "authorSay";
                        rawDom.appendChild(hr);
                        rawDom.appendChild(authorSayDom);
                        rawText =
                            rawText + "\n\n" + "-".repeat(20) + "\n\n" + authorSayText;
                    }
                    let finalDom = rawDom;
                    let finalText = rawText;
                    const [fontName, fontClassObj, fontStyleDom] = await getFont();
                    if (fontName && fontClassObj && fontStyleDom) {
                        finalText = await (0, jjwxcFontDecode_1.replaceJjwxcCharacter)(fontName, rawText);
                        images.push(fontClassObj);
                        finalDom = document.createElement("div");
                        const replacedDom = document.createElement("div");
                        replacedDom.innerHTML = await (0, jjwxcFontDecode_1.replaceJjwxcCharacter)(fontName, rawDom.innerHTML);
                        finalDom.appendChild(fontStyleDom);
                        rawDom.className = `${fontName} hide`;
                        finalDom.appendChild(rawDom);
                        finalDom.appendChild(replacedDom);
                    }
                    return {
                        chapterName: ChapterName,
                        contentRaw: content,
                        contentText: finalText,
                        contentHTML: finalDom,
                        contentImages: images,
                        additionalMetadate: null,
                    };
                }
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Jjwxc = Jjwxc;


/***/ }),

/***/ "./src/rules/special/lofter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Lofter = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
class Lofter extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.origin;
        const author = JSON.parse('"' + unsafeWindow._ntes_ntit.replaceAll("%", "\\") + '"');
        const bookname = author + "的Lofter";
        const introduction = document
            .querySelector('meta[name="Description"]')
            ?.getAttribute("content")
            ?.replace(new RegExp(`^${author} - `), "") ?? null;
        let introductionHTML = null;
        if (introduction) {
            introductionHTML = document.createElement("p");
            introductionHTML.innerText = introduction;
        }
        const additionalMetadate = {};
        const _avatar = document
            .querySelector('link[rel="shortcut icon"]')
            ?.getAttribute("href");
        if (_avatar) {
            const avatar = new URL(_avatar);
            avatar.search = "";
            const avatarUrl = avatar.toString();
            (0, attachments_1.getImageAttachment)(avatarUrl, this.imageMode, "avatar-")
                .then((avatarClass) => {
                additionalMetadate.cover = avatarClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const pageUrlSet = new Set();
        const indexPageUrls = [];
        const getPageUrl = async (url) => {
            log_1.log.info(`[chapter]正在抓取目录页：${url}`);
            const doc = await (0, http_1.getHtmlDOM)(url, undefined);
            const selector = `a[href^="${[document.location.origin, "post"].join("/")}"]`;
            const urlSet = new Set(Array.from(doc.querySelectorAll(selector)).map((a) => a.href));
            urlSet.forEach((item) => pageUrlSet.add(item));
            const selectorl = `a[href^="https://www.lofter.com/lpost"]`;
            const urlSetl = new Set(Array.from(doc.querySelectorAll(selectorl)).map((a) => a.href));
            urlSetl.forEach((item) => pageUrlSet.add(item));
            const getIndexPageNumber = (urlI) => {
                const _pageNumber = new URL(urlI).searchParams.get("page") ?? "1";
                const indexPageNumber = Number(_pageNumber);
                return indexPageNumber;
            };
            const nowIndexPageNumber = getIndexPageNumber(url);
            const indexPages = doc.querySelectorAll('a[href^="?page"]');
            for (const indexPage of Array.from(indexPages)) {
                const indexPageUrl = indexPage.href;
                const _indexPageUrlFormat = new URL(indexPageUrl);
                _indexPageUrlFormat.searchParams.delete("t");
                const indexPageUrlFormat = _indexPageUrlFormat.toString();
                const indexPageNumber = getIndexPageNumber(indexPageUrl);
                if (indexPageNumber !== nowIndexPageNumber) {
                    if (!indexPageUrls.includes(indexPageUrlFormat)) {
                        indexPageUrls.push(indexPageUrlFormat);
                        await getPageUrl(indexPageUrl);
                    }
                }
            }
        };
        await getPageUrl(document.location.href);
        let i = 0;
        for (const pageUrl of Array.from(pageUrlSet)) {
            const chapter = new main_1.Chapter(bookUrl, bookname, pageUrl, i, null, false, false, null, null, null, this.chapterParse, "UTF-8", { author });
            chapters.push(chapter);
            i++;
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function post() {
            log_1.log.debug(`[chapter]请求页面：${chapterUrl}`);
            const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            chapterName =
                doc
                    .querySelector("title")
                    ?.innerText.replace(new RegExp(`-${options.author}$`), "")
                    .replace("\n", "")
                    .trim() ?? null;
            const selectors = [".ct .ctc", ".main .content", ".m-post .text"];
            let content;
            for (const selector of selectors) {
                const _content = doc.querySelector(selector);
                if (_content !== null) {
                    content = _content;
                    break;
                }
            }
            if (content) {
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                throw new Error(`[chapter]未发现内容，url：${chapterUrl}`);
            }
        }
        async function lpost() {
            log_1.log.debug(`[chapter]请求页面：${chapterUrl}`);
            const doc = await (0, http_1.ggetHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector("#title")?.innerText.trim();
            const content = doc.querySelector("#m-cnt .long-text");
            if (content) {
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                throw new Error(`[chapter]未发现内容，url：${chapterUrl}`);
            }
        }
        if (new URL(chapterUrl).pathname.startsWith("/lpost/")) {
            return lpost();
        }
        else {
            return post();
        }
    }
}
exports.Lofter = Lofter;


/***/ }),

/***/ "./src/rules/special/longmabook.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Longmabook = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Longmabook extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const isLogin = Boolean(document.querySelector('a[href="/?act=signinlst"]'));
        if (!isLogin) {
            alert("小说下载器：海棠文化线上文学城需登录后方可下载！请登录帐号。");
            throw new main_1.ExpectError("海棠文化线上文学城需登录后方可浏览！");
        }
        const self = this;
        const bookUrl = document.location.href;
        const bookname = document.querySelector("#mypages > div:nth-child(8) > div:nth-child(1) > h4").innerText;
        const author = document.querySelector("#writerinfos > a").innerText;
        const _urlSearch = new URLSearchParams(document.location.search);
        const bookId = _urlSearch.get("bookid");
        if (!bookId) {
            throw new Error("获取 bookid 出错");
        }
        const bookwritercode = _urlSearch.get("bookwritercode");
        const introDom = document
            .querySelector("#mypages > div:nth-child(8) > div:nth-child(1)")
            ?.cloneNode(true);
        let [introduction, introductionHTML, introCleanimages] = [null, null, null];
        if (introDom) {
            (0, misc_1.rm)("div", true, introDom);
            (0, misc_1.rm)("textarea", true, introDom);
            (0, misc_1.rm)("font", true, introDom);
            (0, misc_1.rm)("b", true, introDom);
            (0, misc_1.rm)("span", true, introDom);
            (0, misc_1.rm)("h4", true, introDom);
            (0, misc_1.rm)("img", true, introDom);
            introDom.innerHTML = introDom.innerHTML
                .replace(/【作品编号：\d+】|【作品編號：\d+】/, "")
                .replace("\n)\n", "");
            [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, undefined);
        }
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#mypages > div:nth-child(8) > div:nth-child(1) > img")?.src.replace("_s.", "_b.");
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags =
            document.querySelector('#mypages > div:nth-child(8) > div:nth-child(1) > font[color="#800080"]')?.innerText
                .split("/")
                .map((item) => item.trim()) ?? [];
        async function getLiList() {
            const showbooklistAPIUrl = document.location.origin + "/showbooklist.php";
            let flag = false;
            let page = 1;
            let pageMax = 0;
            const showbooklistParams = {
                ebookid: bookId,
                pages: page.toString(),
                showbooklisttype: "1",
            };
            const liListTemp = [];
            do {
                log_1.log.info(`[book]请求章节目录中，page: ${page}`);
                const doc = await (0, http_1.getHtmlDOM)(showbooklistAPIUrl, self.charset, {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    body: new URLSearchParams(showbooklistParams).toString(),
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
                if (doc.documentElement.innerText.includes("章節數量較多，採分頁顯示")) {
                    const pageLi = Array.from(doc.querySelectorAll(".uk-list.uk-list-divider > li")).filter((li) => li.innerHTML.includes("換頁：&nbsp;&nbsp;"))[0];
                    const pages = Array.from(pageLi.querySelectorAll("a"))
                        .map((a) => {
                        const _page = a
                            .getAttribute("onclick")
                            ?.match(/\('\d+','(\d+)'\)/);
                        if (_page?.length === 2) {
                            return Number(_page[1]);
                        }
                    })
                        .filter((p) => p);
                    pageMax = Math.max(...pages);
                    page++;
                    if (page !== 1 && page <= pageMax) {
                        showbooklistParams.pages = page.toString();
                        flag = true;
                    }
                    else {
                        flag = false;
                    }
                }
                else {
                    flag = false;
                }
                const _liList = Array.from(doc.querySelectorAll(".uk-list.uk-list-divider > li")).filter((li) => {
                    const filters = ["章節數量較多，採分頁顯示", "換頁：&nbsp;&nbsp;"];
                    for (const f of filters) {
                        if (li.innerHTML.includes(f)) {
                            return false;
                        }
                    }
                    return true;
                });
                _liList.push(..._liList);
            } while (flag);
            return liListTemp;
        }
        const chapters = [];
        const liList = await getLiList();
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const li of liList) {
            const ukIcon = li.querySelector("span")?.getAttribute("uk-icon");
            if (ukIcon === "folder") {
                const _sectionName = li.querySelector("b > font")?.innerText.trim();
                if (_sectionName !== sectionName) {
                    sectionName = _sectionName;
                    sectionNumber++;
                    sectionChapterNumber = 0;
                }
            }
            else if (ukIcon === "file-text") {
                chapterNumber++;
                sectionChapterNumber++;
                const a = li.querySelector("a");
                const chapterName = a?.innerText.trim();
                const chapterUrl = a?.href;
                const isVIP = Boolean(li.innerText.match(/\$[\d\.]+/));
                if (chapterUrl && chapterName) {
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, null, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, { bookId, bookwritercode });
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const self = this;
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        if (doc.body.innerHTML.includes("您目前正在海棠清水區，只能觀看清水認證文章。")) {
            if (!window.stopFlag) {
                alert("您目前正在海棠清水區，只能觀看清水認證文章。請使用海棠其他網址進入。");
                window.stopFlag = true;
            }
            throw new Error("您目前正在海棠清水區，只能觀看清水認證文章。請使用海棠其他網址進入。");
        }
        const nullObj = {
            chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };
        if (doc.querySelector("#paperbuybtm")) {
            log_1.log.info(`[chapter]付费章节 ${chapterName} 未购买。`);
            return nullObj;
        }
        const content = document.createElement("div");
        let contentText = "";
        let contentImages = [];
        const [imagesDom, imagesText, imagesImages] = await getImages();
        const [mainDom, mainText, mainImages] = await getMainContent();
        const [authorDom, authorText, authorImages] = await getAuthorSay();
        if (imagesDom) {
            content.appendChild(imagesDom);
            contentText += imagesText + "\n\n";
            if (imagesImages) {
                contentImages = contentImages.concat(imagesImages);
            }
        }
        if (mainDom) {
            content.appendChild(mainDom);
            contentText += mainText;
            if (mainImages) {
                contentImages = contentImages.concat(mainImages);
            }
        }
        if (authorDom) {
            const hr = document.createElement("hr");
            authorDom.className = "authorSay";
            content.appendChild(hr);
            content.appendChild(authorDom);
            contentText += "\n\n" + "-".repeat(20) + "\n\n" + authorText;
            if (authorImages) {
                contentImages = contentImages.concat(authorImages);
            }
        }
        return {
            chapterName,
            contentRaw: content,
            contentText,
            contentHTML: content,
            contentImages,
            additionalMetadate: null,
        };
        async function getImages() {
            const imageDom = document.createElement("div");
            Array.from(doc.querySelectorAll("#mypages > div:nth-child(10) > div:nth-child(2) > div:nth-child(6) > ul > li:nth-child(14) > img")).forEach((img) => imageDom.appendChild(img.cloneNode(true)));
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(imageDom, self.imageMode);
            return [dom, text, images];
        }
        async function getMainContent() {
            const getPaperidAndVercodechk = () => {
                const ss = Array.from(doc.querySelectorAll("script")).filter((s) => s.innerText.includes("vercodechk"))[0];
                const m = ss.innerText.match(/{\spaperid:\s'(\d+)',\svercodechk:\s'(\w+)'}/);
                if (m?.length === 3) {
                    const [paperidInner, vercodechkInner] = m.slice(1);
                    return [paperidInner, vercodechkInner];
                }
                return [null, null];
            };
            const [paperid, vercodechk] = getPaperidAndVercodechk();
            if (paperid && vercodechk) {
                const showpapercolorUrl = document.location.origin + "/showpapercolor.php";
                log_1.log.debug(`[chapter]正在请求${showpapercolorUrl}`);
                const resp = await fetch(showpapercolorUrl, {
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest",
                        "Cache-Control": "max-age=0",
                    },
                    referrer: chapterUrl,
                    body: new URLSearchParams({
                        paperid,
                        vercodechk,
                    }).toString(),
                    method: "POST",
                    mode: "cors",
                });
                const contentMain = document.createElement("div");
                contentMain.innerHTML = await resp.text();
                (0, misc_1.rm)('img[src="/images/fullcolor.png"]', true, contentMain);
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(contentMain, self.imageMode);
                return [dom, text, images];
            }
            else {
                return [null, null, null];
            }
        }
        async function getAuthorSay() {
            const authorSayDom = doc.querySelector("#colorpanelwritersay");
            if (authorSayDom) {
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(authorSayDom, self.imageMode);
                return [dom, text, images];
            }
            else {
                return [null, null, null];
            }
        }
        function getEgg() {
        }
    }
}
exports.Longmabook = Longmabook;


/***/ }),

/***/ "./src/rules/special/qidian.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Qidian = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Qidian extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        let bookId = document.getElementById("bookImg");
        if (bookId) {
            bookId = bookId.getAttribute("data-bid");
        }
        else {
            throw new Error("未发现 bookId");
        }
        const authorId = document
            .getElementById("authorId")
            ?.getAttribute("data-authorid");
        const _csrfToken = unsafeWindow.jQuery.ajaxSettings.data
            ._csrfToken;
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".book-info > h1 > em").innerText.trim();
        const author = document.querySelector(".book-info .writer").innerText
            .replace(/作\s+者:/, "")
            .trim();
        const introDom = document.querySelector(".book-info-detail .book-intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#bookImg > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll(".book-info > .tag > a, .tag-wrap > .tags")).map((a) => a.innerText.trim());
        const limitFree = Boolean(document.querySelector(".book-information .flag"));
        log_1.log.info(`[Book]限免书籍 ${limitFree}`);
        const chapters = [];
        const liLength = document.querySelectorAll("#j-catalogWrap li").length;
        const getChapterTotalNumber = () => {
            const span = document.querySelector("#J-catalogCount").innerText.match(/\d+/);
            if (span) {
                return Number(span[0]);
            }
        };
        if (!(liLength && getChapterTotalNumber() === liLength)) {
            await (0, misc_1.sleep)(3000);
        }
        const sections = document.querySelectorAll("#j-catalogWrap > .volume-wrap > .volume");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1;
            const sectionName = s.querySelector("h3").innerText
                .trim()
                .split("\n")
                .slice(-1)[0]
                .split("·")[0];
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll("ul.cf > li");
            for (const c of Array.from(cs)) {
                const a = c.querySelector("a");
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const isVIP = () => {
                    const host = new URL(chapterUrl).host;
                    if (host === "vipreader.qidian.com") {
                        return true;
                    }
                    return false;
                };
                const isPaid = () => {
                    if (isVIP()) {
                        if (c.childElementCount === 2) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    return false;
                };
                let chapterId;
                if (isVIP()) {
                    chapterId = chapterUrl.split("/").slice(-1)[0];
                }
                else {
                    chapterId = null;
                }
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", {
                    _csrfToken,
                    bookId,
                    authorId,
                    chapterId,
                    limitFree,
                });
                const isLogin = () => {
                    const signInDom = document.querySelector(".sign-in");
                    const signOutDom = document.querySelector(".sign-out");
                    if (signInDom && signOutDom) {
                        if (Array.from(signOutDom.classList).includes("hidden")) {
                            return true;
                        }
                    }
                    return false;
                };
                if (isVIP()) {
                    chapter.status = main_1.Status.aborted;
                    if (limitFree) {
                        chapter.status = main_1.Status.pending;
                    }
                    if (isLogin() && chapter.isPaid) {
                        chapter.status = main_1.Status.pending;
                    }
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const bookId = options.bookId;
        const authorId = options.authorId;
        const chapterId = options.chapterId;
        const limitFree = options.limitFree;
        const _csrfToken = options._csrfToken;
        async function publicChapter() {
            const doc = await (0, http_2.ggetHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector(".j_chapterName > .content-wrap").innerText.trim();
            const nullObj = {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
            if (doc.querySelector(".vip-limit-wrap")) {
                return nullObj;
            }
            const content = doc.querySelector(".read-content");
            const authorSayWrap = doc.querySelector(".author-say-wrap");
            if (content) {
                if (authorSayWrap) {
                    const authorSay = authorSayWrap.querySelector("div.author-say > p:nth-child(3)");
                    const hr = document.createElement("hr");
                    content.appendChild(hr);
                    content.appendChild(authorSay);
                }
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return nullObj;
            }
        }
        async function vipChapter() {
            async function getChapterInfo() {
                const baseUrl = "https://vipreader.qidian.com/ajax/chapter/chapterInfo";
                const search = new URLSearchParams({
                    _csrfToken,
                    bookId,
                    chapterId,
                    authorId,
                });
                const url = baseUrl + "?" + search.toString();
                log_1.log.debug(`[Chapter]请求 ${url} Referer ${chapterUrl}`);
                return (0, http_1.gfetch)(url, {
                    headers: {
                        accept: "application/json, text/javascript, */*; q=0.01",
                        "x-requested-with": "XMLHttpRequest",
                        Referer: chapterUrl,
                    },
                    responseType: "json",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
            }
            async function getByAPI() {
                const chapterInfo = await getChapterInfo();
                if (!chapterInfo) {
                    throw new Error("Request Api failed!");
                }
                if (chapterInfo.code === 0) {
                    const authorSay = chapterInfo.data.chapterInfo.authorSay;
                    const _content = chapterInfo.data.chapterInfo.content;
                    const content = document.createElement("div");
                    content.innerHTML = _content;
                    if (authorSay) {
                        const hr = document.createElement("hr");
                        content.appendChild(hr);
                        const authorSayDom = document.createElement("p");
                        authorSayDom.innerHTML = authorSay;
                        content.appendChild(authorSayDom);
                    }
                    const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                    return {
                        chapterName,
                        contentRaw: content,
                        contentText: text,
                        contentHTML: dom,
                        contentImages: images,
                        additionalMetadate: null,
                    };
                }
                else {
                    log_1.log.error(`[chapter]VIP章节API请求失败！\n${JSON.stringify(chapterInfo)}`);
                    return {
                        chapterName,
                        contentRaw: null,
                        contentText: null,
                        contentHTML: null,
                        contentImages: null,
                        additionalMetadate: null,
                    };
                }
            }
            if (limitFree || isPaid) {
                const _obj = await publicChapter();
                if (!_obj.contentHTML) {
                    return getByAPI();
                }
                else {
                    return _obj;
                }
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Qidian = Qidian;


/***/ }),

/***/ "./src/rules/special/sfacg.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sfacg = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Sfacg extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/MainIndex/", "");
        const bookname = document.querySelector("h1.story-title").innerText.trim();
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const author = dom.querySelector(".author-name").innerText.trim();
        const introDom = dom.querySelector(".introduce");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = dom.querySelector("#hasTicket div.pic img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(dom.querySelectorAll("ul.tag-list > li.tag > a")).map((a) => {
            (0, misc_1.rm)("span.icn", false, a);
            return a.innerText.trim().replace(/\(\d+\)$/, "");
        });
        if (dom.querySelector(".d-banner")) {
            const _beitouUrl = dom.querySelector(".d-banner")?.style.backgroundImage.split('"');
            if (_beitouUrl?.length === 3) {
                const beitouUrl = _beitouUrl[1];
                const beitou = new main_1.AttachmentClass(beitouUrl, `beitou.${beitouUrl.split(".").slice(-1)[0]}`, "TM");
                beitou.init();
                additionalMetadate.attachments = [beitou];
            }
        }
        const chapters = [];
        const sections = document.querySelectorAll(".story-catalog");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1;
            const sectionName = s.querySelector(".catalog-title").innerText
                .replace(`【${bookname}】`, "")
                .trim();
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll(".catalog-list > ul > li > a");
            for (const c of Array.from(cs)) {
                const _chapterName = c
                    .getAttribute("title")
                    ?.trim();
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = _chapterName ? _chapterName : "";
                const chapterUrl = c.href;
                let isVIP = false;
                const isPaid = null;
                if (c.childElementCount &&
                    c.firstElementChild?.getAttribute("class") === "icn_vip") {
                    isVIP = true;
                }
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", {});
                const isLogin = document.querySelector(".user-bar > .top-link > .normal-link")
                    ?.childElementCount === 3
                    ? true
                    : false;
                if (isVIP && !isLogin) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const chapterId = chapterUrl.split("/").slice(-2, -1)[0];
        async function publicChapter() {
            const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector("h1.article-title").innerText.trim();
            const content = doc.querySelector(".article-content");
            if (content) {
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        async function vipChapter() {
            async function getvipChapterImage(vipChapterImageUrl, vipChapterName) {
                let retryTime = 0;
                function fetchVipChapterImage(vipChapterImageUrlI) {
                    log_1.log.debug(`[Chapter]请求 ${vipChapterImageUrlI} Referer ${chapterUrl} 重试次数 ${retryTime}`);
                    return fetch(vipChapterImageUrlI, {
                        headers: {
                            accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                        },
                        referrer: chapterUrl,
                        body: null,
                        method: "GET",
                        mode: "cors",
                        credentials: "include",
                    })
                        .then((response) => response.blob())
                        .then((blob) => {
                        if (blob.size === 53658 || blob.size === 42356) {
                            log_1.log.error(`[Chapter]请求 ${vipChapterImageUrlI} 失败 Referer ${chapterUrl}`);
                            if (retryTime < setting_1.retryLimit) {
                                retryTime++;
                                return fetchVipChapterImage(vipChapterImageUrlI);
                            }
                            else {
                                return null;
                            }
                        }
                        else {
                            return blob;
                        }
                    })
                        .catch((error) => log_1.log.error(error));
                }
                const vipChapterImageBlob = await fetchVipChapterImage(vipChapterImageUrl);
                const vipChapterImage = new main_1.AttachmentClass(vipChapterImageUrl, vipChapterName, "naive");
                if (vipChapterImageBlob) {
                    vipChapterImage.imageBlob = vipChapterImageBlob;
                    vipChapterImage.status = main_1.Status.finished;
                }
                else {
                    vipChapterImage.status = main_1.Status.failed;
                }
                return vipChapterImage;
            }
            const isLogin = document.querySelector(".user-bar > .top-link > .normal-link")
                ?.childElementCount === 3
                ? true
                : false;
            if (isLogin) {
                const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
                const chapterNameI = dom.querySelector("h1.article-title").innerText.trim();
                isPaid = dom.querySelector(".pay-section") === null;
                if (isPaid) {
                    const vipChapterDom = dom.querySelector(".article-content > #vipImage");
                    if (vipChapterDom) {
                        const vipChapterImageUrl = vipChapterDom.src;
                        const vipChapterName = `vipCHapter${chapterId}.gif`;
                        const vipChapterImage = await getvipChapterImage(vipChapterImageUrl, vipChapterName);
                        const contentImages = [vipChapterImage];
                        const img = document.createElement("img");
                        img.src = vipChapterName;
                        img.alt = vipChapterImageUrl;
                        const contentHTML = document.createElement("div");
                        contentHTML.appendChild(img);
                        const contentText = `VIP章节，请打开HTML文件查看。\n![${vipChapterImageUrl}](${vipChapterName})`;
                        return {
                            chapterName: chapterNameI,
                            contentRaw: contentHTML,
                            contentText,
                            contentHTML,
                            contentImages,
                            additionalMetadate: null,
                        };
                    }
                    else {
                        return publicChapter();
                    }
                }
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Sfacg = Sfacg;


/***/ }),

/***/ "./src/rules/special/shubl.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shubl = void 0;
const CryptoJS = __webpack_require__("crypto-js");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Shubl extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".book-title > span").innerText.trim();
        const author = document.querySelector("div.username").innerText.trim();
        const introDom = document.querySelector(".book-brief");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            introDomI.innerHTML = introDomI.innerHTML.replace("简介：", "");
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book-img")
            .src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.row > span.tag")).map((span) => span.innerText.trim());
        const chapters = [];
        const chapterTitleList = Array.from(document.querySelectorAll("#chapter_list > div.chapter > div.chapter-title")).map((div) => div.innerText.trim());
        const articlesList = document.querySelectorAll("#chapter_list > div.chapter > div.articles");
        const sectionLength = chapterTitleList.length;
        let chapterNumber = 0;
        for (let i = 0; i < sectionLength; i++) {
            const s = articlesList[i];
            const sectionNumber = i + 1;
            const sectionName = chapterTitleList[i];
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll("span.chapter_item");
            for (const c of Array.from(cs)) {
                chapterNumber++;
                sectionChapterNumber++;
                const a = c.querySelector("a");
                if (a) {
                    const chapterName = a.innerText.trim();
                    const chapterUrl = a.href;
                    const isVIP = () => {
                        if (c.childElementCount === 2) {
                            return true;
                        }
                        return false;
                    };
                    const isPaid = () => {
                        if (isVIP() && c.querySelector("i")?.className === "unlock") {
                            return true;
                        }
                        return false;
                    };
                    const isLogin = () => {
                        if (document.querySelector("#header > div.container > div.right.pull-right")?.childElementCount === 3) {
                            return true;
                        }
                        return false;
                    };
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                    if (isVIP() && !(isLogin() && isPaid())) {
                        chapter.status = main_1.Status.aborted;
                    }
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function decrypt(item) {
            let message = item.content;
            const keys = item.keys;
            const len = item.keys.length;
            const accessKey = item.accessKey;
            const accessKeyList = accessKey.split("");
            const charsNotLatinNum = accessKeyList.length;
            const output = new Array();
            output.push(keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]);
            output.push(keys[accessKeyList[0].charCodeAt(0) % len]);
            for (let i = 0; i < output.length; i++) {
                message = atob(message);
                const data = output[i];
                const iv = btoa(message.substr(0, 16));
                const keys255 = btoa(message.substr(16));
                const pass = CryptoJS.format.OpenSSL.parse(keys255);
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
        const rootPath = "https://www.shubl.com/";
        const chapterId = chapterUrl.split("/").slice(-1)[0];
        async function publicChapter() {
            async function chapterDecrypt(chapterIdt, refererUrl) {
                const accessKeyUrl = rootPath + "chapter/ajax_get_session_code";
                const chapterContentUrl = rootPath + "chapter/get_book_chapter_detail_info";
                log_1.log.debug(`[Chapter]请求 ${accessKeyUrl} Referer ${refererUrl}`);
                const accessKeyObj = await (0, http_1.gfetch)(accessKeyUrl, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/javascript, */*; q=0.01",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        Referer: refererUrl,
                        Origin: document.location.origin,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    data: `chapter_id=${chapterIdt}`,
                    responseType: "json",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                const chapter_access_key = accessKeyObj
                    .chapter_access_key;
                log_1.log.debug(`[Chapter]请求 ${chapterContentUrl} Referer ${refererUrl}`);
                const chapterContentObj = await (0, http_1.gfetch)(chapterContentUrl, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/javascript, */*; q=0.01",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        Referer: refererUrl,
                        Origin: document.location.origin,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    data: `chapter_id=${chapterIdt}&chapter_access_key=${chapter_access_key}`,
                    responseType: "json",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                if (chapterContentObj.code !== 100000) {
                    log_1.log.error(chapterContentObj);
                    throw new Error(`下载 ${refererUrl} 失败`);
                }
                return decrypt({
                    content: chapterContentObj.chapter_content,
                    keys: chapterContentObj.encryt_keys,
                    accessKey: chapter_access_key,
                });
            }
            const content = document.createElement("div");
            const decryptDate = await chapterDecrypt(chapterId, chapterUrl);
            content.innerHTML = decryptDate;
            (0, misc_1.rm)(".chapter span", true, content);
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        async function vipChapter() {
            if (isPaid) {
                async function vipChapterDecrypt(chapterIdi, refererUrl) {
                    const parentWidth = 939.2;
                    const setFontSize = "18";
                    const imageSessionCodeUrl = rootPath + "chapter/ajax_get_image_session_code";
                    log_1.log.debug(`[Chapter]请求 ${imageSessionCodeUrl} Referer ${refererUrl}`);
                    const imageSessionCodeObject = await (0, http_1.gfetch)(imageSessionCodeUrl, {
                        method: "POST",
                        headers: {
                            Accept: "application/json, text/javascript, */*; q=0.01",
                            Referer: refererUrl,
                            Origin: document.location.origin,
                            "X-Requested-With": "XMLHttpRequest",
                        },
                        responseType: "json",
                    })
                        .then((response) => response.response)
                        .catch((error) => log_1.log.error(error));
                    if (imageSessionCodeObject.code !== 100000) {
                        log_1.log.error(imageSessionCodeObject);
                        throw new Error(`下载 ${refererUrl} 失败`);
                    }
                    const imageCode = decrypt({
                        content: imageSessionCodeObject
                            .image_code,
                        keys: imageSessionCodeObject
                            .encryt_keys,
                        accessKey: imageSessionCodeObject
                            .access_key,
                    });
                    const vipCHapterImageUrlI = rootPath +
                        "chapter/book_chapter_image?chapter_id=" +
                        chapterIdi +
                        "&area_width=" +
                        parentWidth +
                        "&font=undefined" +
                        "&font_size=" +
                        setFontSize +
                        "&image_code=" +
                        imageCode +
                        "&bg_color_name=white" +
                        "&text_color_name=white";
                    return vipCHapterImageUrlI;
                }
                const vipCHapterImageUrl = await vipChapterDecrypt(chapterId, chapterUrl);
                log_1.log.debug(`[Chapter]请求 ${vipCHapterImageUrl} Referer ${chapterUrl}`);
                const vipCHapterImageBlob = await (0, http_1.gfetch)(vipCHapterImageUrl, {
                    method: "GET",
                    headers: {
                        Referer: chapterUrl,
                        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                    },
                    responseType: "blob",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                const vipCHapterName = `vipCHapter${chapterId}.png`;
                const vipCHapterImage = new main_1.AttachmentClass(vipCHapterImageUrl, vipCHapterName, "TM");
                if (vipCHapterImageBlob) {
                    vipCHapterImage.imageBlob = vipCHapterImageBlob;
                    vipCHapterImage.status = main_1.Status.finished;
                }
                const contentImages = [vipCHapterImage];
                const img = document.createElement("img");
                img.src = vipCHapterName;
                img.alt = vipCHapterImageUrl;
                const contentHTML = document.createElement("div");
                contentHTML.appendChild(img);
                const contentText = `VIP章节，请打开HTML文件查看。\n![${vipCHapterImageUrl}](${vipCHapterName})`;
                return {
                    chapterName,
                    contentRaw: contentHTML,
                    contentText,
                    contentHTML,
                    contentImages,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Shubl = Shubl;


/***/ }),

/***/ "./src/rules/special/shuhai.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shuhai = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Shuhai extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("div.book-info-bookname > span:nth-child(1)").innerText.trim();
        const author = document.querySelector("div.book-info-bookname > span:nth-child(2)").innerText
            .replace("作者: ", "")
            .trim();
        const introDom = document.querySelector("div.book-info-bookintro") ||
            document.querySelector("div.book-info-bookintro-all");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book-cover-wrapper > img").getAttribute("data-original");
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll(".book-info-bookstate > .tag")).map((span) => span.innerText.trim());
        const chapters = [];
        if (document.querySelectorAll("#catalog > .chapter-item").length === 0) {
            await (0, misc_1.sleep)(3000);
        }
        const dsList = document.querySelectorAll("#catalog > .chapter-item");
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const node of Array.from(dsList)) {
            if (node.nodeName === "SPAN") {
                sectionNumber++;
                sectionChapterNumber = 0;
                sectionName = node?.innerText.trim();
            }
            else if (node.nodeName === "DIV") {
                chapterNumber++;
                sectionChapterNumber++;
                const a = node.querySelector("a");
                const isVIP = () => {
                    if (node.childElementCount === 2) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                const isPaid = () => {
                    return false;
                };
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0, http_1.ggetHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector("div.chapter-name").innerText
                .replace("正文 ", "")
                .trim();
            const content = doc.querySelector("#reader-content > div:nth-child(1)");
            if (content) {
                (0, misc_1.rm)("div.chaper-info", false, content);
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        async function vipChapter() {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Shuhai = Shuhai;


/***/ }),

/***/ "./src/rules/special/sosadfun.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sosadfun = void 0;
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
class Sosadfun extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.origin + document.location.pathname;
        const bookname = document.querySelector(".font-1").innerText.trim();
        const authorDom = document.querySelector("div.h5:nth-child(1) > div:nth-child(1) > a:nth-child(1)");
        let author;
        if (authorDom) {
            author = authorDom.innerText.trim();
        }
        else {
            author = "匿名咸鱼";
        }
        const needLogin = () => {
            const mainDom = document.querySelector(".col-xs-12 > .main-text.no-selection");
            if (mainDom.innerText.trim() === "主楼隐藏，请登录后查看") {
                return true;
            }
            else {
                return false;
            }
        };
        const additionalMetadate = {};
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.h5:nth-child(1) > div:nth-child(3) > a")).map((a) => a.innerText.trim());
        let introduction;
        let introductionHTML;
        let introDom;
        if (needLogin()) {
            alert("本小说需要登录后浏览！");
            throw new main_1.ExpectError("本小说需要登录后浏览！");
        }
        else {
            introDom = document.createElement("div");
            const shortIntroDom = document.querySelector("div.article-title div.h5");
            const longIntroDom = document.querySelector(".col-xs-12 > .main-text.no-selection");
            if (shortIntroDom) {
                const pElem = document.createElement("p");
                pElem.innerText = shortIntroDom.innerText;
                introDom.appendChild(pElem);
            }
            if (longIntroDom) {
                for (const elem of Array.from(longIntroDom.cloneNode(true).children)) {
                    introDom.appendChild(elem);
                }
            }
        }
        if (introDom === null) {
            introduction = null;
            introductionHTML = null;
        }
        else {
            const { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = await (0, cleanDOM_1.cleanDOM)(introDom, "TM");
            introduction = introCleantext;
            introductionHTML = introCleanDom;
            if (introCleanimages) {
                additionalMetadate.attachments = [...introCleanimages];
            }
        }
        const chapters = [];
        const aList = document.querySelectorAll(".table > tbody:nth-child(2) > tr > th:nth-child(1) > a");
        let chapterNumber = 0;
        for (const a of Array.from(aList)) {
            chapterNumber++;
            const chapterName = a.innerText.trim();
            const chapterUrl = a.href;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, false, false, null, null, null, this.chapterParse, "UTF-8", {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector("strong.h3").innerText.trim();
        const content = document.createElement("div");
        const _content = doc.querySelector(".main-text.no-selection > span[id^=full]");
        const _authorSay = doc.querySelector(".main-text.no-selection > .grayout");
        if (_content) {
            for (const elem of Array.from(_content.cloneNode(true).children)) {
                content.appendChild(elem);
            }
        }
        if (_content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            if (_authorSay) {
                const { dom: authorSayDom, text: authorySayText, images: authorSayImages, } = await (0, cleanDOM_1.cleanDOM)(_authorSay, "TM");
                const hrElem = document.createElement("hr");
                const authorSayDiv = document.createElement("div");
                authorSayDiv.className = "authorSay";
                for (const elem of Array.from(authorSayDom.cloneNode(true).children)) {
                    authorSayDiv.appendChild(elem);
                }
                content.appendChild(hrElem);
                content.appendChild(authorSayDiv);
                dom.appendChild(hrElem);
                dom.appendChild(authorSayDiv);
                text = text + "\n\n" + "-".repeat(20) + "\n\n" + authorySayText;
                authorSayImages.forEach((aImage) => images.push(aImage));
            }
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Sosadfun = Sosadfun;


/***/ }),

/***/ "./src/rules/special/tadu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tadu = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Tadu extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("div.bookNm > a.bkNm").innerText.trim();
        const author = document.querySelector("div.authorInfo > a.author > span").innerText.trim();
        const introDom = document.querySelector("div.boxCenter.boxT.clearfix > div.lf.lfO > p.intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("a.bookImg > img").getAttribute("data-src");
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const cos = document.querySelectorAll("div.lf.lfT > li > div > a");
        let chapterNumber = 0;
        for (const aElem of Array.from(cos)) {
            chapterNumber++;
            const chapterName = aElem.innerText;
            const chapterUrl = aElem.href;
            const isVIP = () => {
                if (aElem.childElementCount) {
                    return true;
                }
                else {
                    return false;
                }
            };
            const isPaid = () => {
                return false;
            };
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), null, null, null, this.chapterParse, "UTF-8", {});
            const isLogin = () => {
                return false;
            };
            if (isVIP() && !(isLogin() && chapter.isPaid)) {
                chapter.status = main_1.Status.aborted;
            }
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            log_1.log.debug(`[Chapter]请求 ${chapterUrl}`);
            const doc = await (0, http_2.getHtmlDOM)(chapterUrl, charset);
            const content = document.createElement("div");
            const _bookPartResourceUrl = doc
                .getElementById("bookPartResourceUrl")
                ?.getAttribute("value");
            if (_bookPartResourceUrl) {
                const bookPartResourceUrl = new URL(_bookPartResourceUrl);
                bookPartResourceUrl.searchParams.set("callback", "callback");
                log_1.log.debug(`[Chapter]请求 ${bookPartResourceUrl.toString()}`);
                const jsonpText = await (0, http_1.gfetch)(bookPartResourceUrl.toString(), {
                    headers: {
                        accept: "*/*",
                        Referer: document.location.origin,
                    },
                })
                    .then((response) => {
                    if (response.status >= 200 && response.status <= 299) {
                        return response.responseText;
                    }
                    else {
                        throw new Error(`Bad response! ${bookPartResourceUrl.toString()}`);
                    }
                })
                    .catch((error) => log_1.log.error(error));
                if (!jsonpText) {
                    throw new Error("jsonp request failed!");
                }
                const getContentObj = new Function(`function callback(obj) { return obj; } return ${jsonpText};`);
                const contentObj = getContentObj();
                if (typeof contentObj === "object") {
                    content.innerHTML = contentObj.content;
                    const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                    return {
                        chapterName,
                        contentRaw: content,
                        contentText: text,
                        contentHTML: dom,
                        contentImages: images,
                        additionalMetadate: null,
                    };
                }
            }
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        async function vipChapter() {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Tadu = Tadu;


/***/ }),

/***/ "./src/rules/special/wenku8.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wenku8 = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Wenku8 extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookId = document.location.pathname.split("/").slice(-2, -1)[0];
        const bookUrl = [document.location.origin, "book", `${bookId}.htm`].join("/");
        const bookname = document.querySelector("#title").innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, "GBK");
        const author = doc.querySelector("#content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)").innerText
            .replace("小说作者：", "")
            .trim();
        const introDom = doc.querySelector("#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(11)");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector("#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > img:nth-child(1)").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const tdList = Array.from(document.querySelectorAll(".css > tbody td")).filter((td) => td.innerText.trim());
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const td of Array.from(tdList)) {
            if (td.className === "vcss") {
                sectionNumber++;
                sectionChapterNumber = 0;
                sectionName = td.innerText.trim();
            }
            else if (td.className === "ccss") {
                chapterNumber++;
                sectionChapterNumber++;
                const a = td.firstElementChild;
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, false, false, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const content = doc.querySelector("#content");
        if (content) {
            (0, misc_1.rm)("#contentdp", true, content);
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Wenku8 = Wenku8;


/***/ }),

/***/ "./src/rules/special/xkzw.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Xkzw = void 0;
const CryptoJSGlobal = __webpack_require__("crypto-js");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Xkzw extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("#info > h1:nth-child(1)").innerText.trim();
        const author = document.querySelector("#info > p:nth-child(2)").innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const bookid = unsafeWindow.bookId;
        const apiUrl = [document.location.origin, "action.php"].join("/");
        log_1.log.debug(`[chapter]正在请求${apiUrl}`);
        const siteChapterList = await fetch(apiUrl, {
            headers: {
                accept: "application/json, text/javascript, */*",
                "content-type": "application/x-www-form-urlencoded",
                "x-requested-with": "XMLHttpRequest",
            },
            body: `action=clist&bookid=${bookid}`,
            method: "POST",
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .catch((error) => log_1.log.error(error));
        const dl1 = document.querySelector("#wrapper > div.box_con:nth-child(7) > div:nth-child(1) > dl:nth-child(1)");
        const dl2 = document.querySelector("#wrapper > div.box_con:nth-child(11) > div:nth-child(1) > dl:nth-child(1)");
        const mkList = (dl) => {
            let tmpColumnName = "";
            const ttmpColumnList = [];
            let ttmpChapterList = [];
            if (dl?.childElementCount) {
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
                            ttmpChapterList.push({
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
                                chapterlist: ttmpChapterList,
                            };
                            ttmpColumnList.push(tmpColumnObj);
                            tmpColumnName = node.innerText
                                .replace(`《${bookname}》`, "")
                                .trim();
                            ttmpChapterList = [];
                        }
                    }
                    else {
                        tmpColumnName = node.innerText
                            .replace(`《${bookname}》`, "")
                            .trim();
                    }
                }
            }
            return [ttmpColumnList, ttmpChapterList];
        };
        const [tmpColumnList, tmpChapterList] = mkList(dl1);
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
        const [tmpColumnList1, tmpChapterList1] = mkList(dl2);
        const tcl1 = tmpChapterList1.length;
        const cll = siteChapterList.columnlist.length;
        for (let i = 0; i < tcl1; i++) {
            const tmpChapterObject = tmpChapterList1.shift();
            if (tmpChapterObject) {
                siteChapterList.columnlist[cll - 1].chapterlist.push(tmpChapterObject);
            }
        }
        if (tmpColumnList1.length !== 0) {
            const tmpColumnListLenght = tmpColumnList1.length;
            for (let i = 0; i < tmpColumnListLenght; i++) {
                const tmpColumnObject = tmpColumnList1.shift();
                if (tmpColumnObject) {
                    siteChapterList.columnlist.push(tmpColumnObject);
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
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", {});
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function runEval(CryptoJS) {
            function gettt1(str, keyStr, ivStr) {
                const key = CryptoJS.enc.Utf8.parse(keyStr);
                const iv = CryptoJS.enc.Utf8.parse(ivStr);
                const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                const decrypt = CryptoJS.DES.decrypt(srcs, key, {
                    iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                });
                const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                return decryptedStr.toString();
            }
            function gettt2(str, keyStr, ivStr) {
                const key = CryptoJS.enc.Utf8.parse(keyStr);
                const iv = CryptoJS.enc.Utf8.parse(ivStr);
                const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                const decrypt = CryptoJS.AES.decrypt(srcs, key, {
                    iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                });
                const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                return decryptedStr.toString();
            }
            function gettt3(str, keyStr, ivStr) {
                const key = CryptoJS.enc.Utf8.parse(keyStr);
                const iv = CryptoJS.enc.Utf8.parse(ivStr);
                const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                const decrypt = CryptoJS.RC4.decrypt(srcs, key, {
                    iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                });
                const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                return decryptedStr.toString();
            }
            function getttn(str, keyStr, ivStr) {
                const key = CryptoJS.enc.Utf8.parse(keyStr);
                const iv = CryptoJS.enc.Utf8.parse(ivStr);
                const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
                const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                const decrypt = CryptoJS.TripleDES.decrypt(srcs, key, {
                    iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                });
                const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                return decryptedStr.toString();
            }
            function showttt1(dom) {
                const obj = dom.getElementById("other");
                const objTips = dom.getElementById("contenttips");
                if (obj) {
                    let content = obj.innerHTML.trim();
                    const type = parseInt(content.substring(0, 1), 10);
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
            showttt1(doc);
        }
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        runEval(CryptoJSGlobal);
        chapterName = doc.querySelector(".bookname > h1:nth-child(1)").innerText.trim();
        const contentG = doc.querySelector("#content");
        if (contentG) {
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(contentG, "TM");
            return {
                chapterName,
                contentRaw: contentG,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Xkzw = Xkzw;


/***/ }),

/***/ "./src/rules/special/zongheng.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Zongheng = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Zongheng extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/showchapter/", "/book/");
        const bookname = document.querySelector("div.book-meta > h1").innerText.trim();
        const author = document.querySelector("div.book-meta > p > span:nth-child(1) > a").innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const introDom = doc.querySelector("div.book-info > div.book-dec");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector("div.book-img > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        additionalMetadate.tags = Array.from(doc.querySelectorAll(".book-info>.book-label a")).map((a) => a.innerText.trim());
        const chapters = [];
        const sections = document.querySelectorAll(".volume-list");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            const sectionNumber = i + 1;
            const sectionLabel = s.querySelector("div.volume");
            Array.from(sectionLabel.children).forEach((ele) => ele.remove());
            const sectionName = sectionLabel.innerText.trim();
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll("ul.chapter-list > li");
            for (const c of Array.from(cs)) {
                const a = c.querySelector("a");
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const isVIP = () => {
                    if (c.className.includes("vip")) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                const isPaid = () => {
                    return false;
                };
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP(), isPaid(), sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", {});
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = main_1.Status.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0, http_1.ggetHtmlDOM)(chapterUrl, charset);
            const ChapterName = doc.querySelector("div.title_txtbox").innerText.trim();
            const content = doc.querySelector("div.content");
            if (content) {
                const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: ChapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: ChapterName,
                    contentRaw: null,
                    contentText: null,
                    contentHTML: null,
                    contentImages: null,
                    additionalMetadate: null,
                };
            }
        }
        async function vipChapter() {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        if (isVIP) {
            return vipChapter();
        }
        else {
            return publicChapter();
        }
    }
}
exports.Zongheng = Zongheng;


/***/ }),

/***/ "./src/rules/ujxs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ujxs = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Ujxs extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.origin +
            document.location.pathname.replace(/^\/read/, "/book");
        const bookname = document.querySelector("#smallcons > h1").innerText.trim();
        const author = document.querySelector("#smallcons > span:nth-child(3) > a").innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, this.charset);
        const introDom = doc.querySelector("#bookintro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector(".img > img")?.src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const liList = document.querySelectorAll("#readerlist > ul > li");
        const chapters = [];
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const li of Array.from(liList)) {
            if (li.getAttribute("class")) {
                sectionNumber++;
                sectionChapterNumber = 0;
                sectionName =
                    li.querySelector("h3")?.innerText.replace(bookname, "").trim() ??
                        null;
            }
            else {
                const aElem = li.firstElementChild;
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = aElem.innerText;
                const chapterUrl = aElem.href;
                const isVIP = false;
                const isPaid = false;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, { bookname });
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const content = doc.querySelector(".read-content");
        if (content) {
            (0, misc_1.rm)("script", true, content);
            const ads = [
                "【悠久小説網ωωω.ＵＪХＳ.ｎｅｔ】，免费小说无弹窗免费阅读！",
                "佰度搜索 【悠久小說網 ＷＷＷ.ＵＪХＳ．ＮＥＴ】 全集TXT电子书免费下载！",
            ];
            ads.forEach((ad) => (content.innerHTML = content.innerHTML.replaceAll(ad, "")));
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Ujxs = Ujxs;


/***/ }),

/***/ "./src/rules/uukanshu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Uukanshu = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Uukanshu extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("dd.jieshao_content > h1 > a").innerText
            .replace("最新章节", "")
            .trim();
        const author = document.querySelector("dd.jieshao_content > h2 > a").innerText.trim();
        const introDom = document.querySelector("dd.jieshao_content > h3");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            introDomI.innerHTML = introDomI.innerHTML
                .replace(/^.+简介：\s+www.uukanshu.com\s+/, "")
                .replace(/\s+https:\/\/www.uukanshu.com/, "")
                .replace(/－+/, "");
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = document.querySelector("a.bookImg > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const button = document.querySelector('span[onclick="javascript:reverse(this);"]');
        const reverse = unsafeWindow.reverse;
        if (button.innerText === "顺序排列") {
            reverse(button);
        }
        const chapterList = document.getElementById("chapterList")?.childNodes;
        if (chapterList && chapterList.length !== 0) {
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionName = null;
            let sectionChapterNumber = 0;
            for (const li of Array.from(chapterList)) {
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
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector("#timu").innerText.trim();
        const content = doc.querySelector("#contentbox");
        if (content) {
            (0, misc_1.rm)(".ad_content", true, content);
            const contentReplace = [
                /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[nｎ][eｅ][tｔ]/g,
                /[ＵｕUu]+看书\s*[wｗ]+.[ＵｕUu]+[kｋ][aａ][nｎ][ｓs][hｈ][ＵｕUu].[cＣｃ][oＯｏ][mＭｍ]/g,
                /[UＵ]*看书[（\\(].*?[）\\)]文字首发。/,
                /请记住本书首发域名：。?/g,
                /笔趣阁手机版阅读网址：/g,
                /小说网手机版阅读网址：/g,
                /https:\/\//g,
                /http:\/\//g,
                /UU看书\s+欢迎广大书友光临阅读，最新、最快、最火的连载作品尽在UU看书！UU看书。;?/g,
            ];
            for (const r of contentReplace) {
                content.innerHTML = content.innerHTML.replace(r, "");
            }
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Uukanshu = Uukanshu;


/***/ }),

/***/ "./src/rules/westnovel.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Westnovel = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Westnovel extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".btitle > h1 > a").innerText.trim();
        const author = document.querySelector(".btitle > em:nth-child(2)").innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector(".intro-p > p:nth-child(1)");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".img-img")
            .src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const aList = document.querySelectorAll(".chapterlist > dd > a");
        let chapterNumber = 0;
        for (const a of Array.from(aList)) {
            chapterNumber++;
            const chapterName = a.innerText.trim();
            const chapterUrl = a.href;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, false, false, null, null, null, this.chapterParse, "UTF-8", {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector("#BookCon > h1:nth-child(1)").innerText.trim();
        const content = doc.querySelector("#BookText");
        if (content) {
            (0, misc_1.rm)("div.ads", true, content);
            (0, misc_1.rm)("div.link", true, content);
            (0, misc_1.rm)("h4", true, content);
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Westnovel = Westnovel;


/***/ }),

/***/ "./src/rules/xiaoshuodaquan.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Xiaoshuodaquan = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Xiaoshuodaquan extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const ccount = document.querySelector(".crumbswrap")?.childElementCount;
        let bookUrl = document.location.href;
        if (ccount) {
            bookUrl = document.querySelector(`.crumbswrap > a:nth-child(${ccount - 2})`).href;
        }
        const bookname = document.querySelector("div.dirwraps > h1").innerText
            .replace("《", "")
            .replace("》", "")
            .trim();
        const author = document.querySelector(".smallcons > span:nth-child(1) > a:nth-child(1)").innerText.trim();
        const introDom = document.querySelector(".bookintro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            introDomI.innerHTML = introDomI.innerHTML.replace("内容简介:", "");
            return introDomI;
        });
        const additionalMetadate = {};
        let coverUrl;
        if (ccount) {
            const dom = await (0, http_1.getHtmlDOM)(bookUrl, "GBK");
            coverUrl = dom.querySelector(".con_limg > img").src;
        }
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const sectionNames = document.querySelectorAll(".dirwraps > div.dirtitone");
        const sections = document.querySelectorAll(".dirwraps > div.clearfix.dirconone");
        let chapterNumber = 0;
        for (let i = 0; i < sections.length; i++) {
            const sectionNameObj = sectionNames[i];
            const sectionObj = sections[i];
            const sectionNumber = i + 1;
            const sectionName = sectionNameObj.firstElementChild?.innerText
                .replace(bookname, "")
                .trim();
            let sectionChapterNumber = 0;
            const cos = sectionObj.querySelectorAll("ul>li>a");
            for (const a of Array.from(cos)) {
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = a.innerText;
                const chapterUrl = a.href;
                const isVIP = false;
                const isPaid = false;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector(".page-body > h1:nth-child(4)").innerText.trim();
        const _content = doc.querySelector("#content");
        if (_content) {
            (0, misc_1.rm)("div", true, _content);
            (0, misc_1.rm)("script", true, _content);
            const content = document.createElement("div");
            content.innerHTML = _content.innerHTML.replace(/\n/g, "<br/>");
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Xiaoshuodaquan = Xiaoshuodaquan;


/***/ }),

/***/ "./src/rules/yibige.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Yibige = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Yibige extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.querySelector("#list_hb > li:nth-child(2) > a:nth-child(1)").href;
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const bookname = doc.querySelector(".title > h1:nth-child(1)").innerText.trim();
        const author = doc.querySelector("div.xsxq_2:nth-child(2) > a:nth-child(1)").innerText.trim();
        const introDom = document.createElement("p");
        const _introDom = doc.querySelector(".nr");
        for (const node of Array.from(_introDom.childNodes)) {
            if (node.nodeName.toLowerCase() === "#text" &&
                node.textContent?.trim() === "相关：") {
                break;
            }
            introDom.appendChild(node.cloneNode(true));
        }
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector(".limg > img:nth-child(1)").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const dl = document.querySelector(".books_li");
        if (dl?.childElementCount) {
            const dlc = Array.from(dl.children);
            if (dlc[0].nodeName === "DT" &&
                dlc[0].innerText.includes("最新12章节")) {
                for (let i = 0; i < dl?.childElementCount; i++) {
                    if (i !== 0 && dlc[i].nodeName === "DT") {
                        delete dlc[0];
                        break;
                    }
                    delete dlc[i];
                }
            }
            const chapterList = dlc.filter((obj) => obj !== undefined && obj.getAttribute("style") === null);
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionName = null;
            let sectionChapterNumber = 0;
            for (const node of chapterList) {
                if (node.nodeName === "DT") {
                    sectionNumber++;
                    sectionChapterNumber = 0;
                    sectionName = node.innerText.replace(`《${bookname}》`, "").trim();
                }
                else if (node.nodeName === "DD") {
                    if (node.childElementCount === 0) {
                        continue;
                    }
                    chapterNumber++;
                    sectionChapterNumber++;
                    const a = node.firstElementChild;
                    const chapterName = a.innerText;
                    const chapterUrl = a.href;
                    const isVIP = false;
                    const isPaid = false;
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", { bookname });
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        return (0, common_1.nextPageParse)({
            chapterName,
            chapterUrl,
            charset,
            selector: "#fontsize",
            contentPatch: (_content, doc) => {
                (0, misc_1.rm)("div", true, _content);
                (0, misc_1.rm)("script", true, _content);
                _content.innerHTML = _content.innerHTML
                    .replaceAll("测试广告1", "")
                    .replaceAll("测试广告2", "");
                return _content;
            },
            getNextPage: (doc) => doc.querySelector(".nr_fy > a:nth-child(4)")
                .href,
            continueCondition: (_content, nextLink) => new URL(nextLink).pathname.includes("_"),
        });
    }
}
exports.Yibige = Yibige;


/***/ }),

/***/ "./src/rules/yruan.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Yrun = void 0;
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class Yrun extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("#info > h1:nth-child(1)").innerText.trim();
        const author = document.querySelector("#info > p:nth-child(2)").innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector("#intro > p");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img").src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const chapterList = document.querySelectorAll("#list>dl>dd>a");
        if (chapterList && chapterList.length !== 0) {
            for (let i = 0; i < chapterList.length; i++) {
                const a = chapterList[i];
                const chapterName = a.innerText;
                const chapterUrl = a.href;
                const isVIP = false;
                const isPaid = false;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, i, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", {});
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = doc.querySelector(".bookname > h1:nth-child(1)").innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            const { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Yrun = Yrun;


/***/ }),

/***/ "./src/rules/yuzhaige.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Yuzhaige = void 0;
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const yuzhaigeImageDecode_1 = __webpack_require__("./src/rules/lib/yuzhaigeImageDecode.ts");
class Yuzhaige extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.querySelector("div.currency_head > h1 > a").href;
        const bookId = bookUrl.split("/").slice(-2, -1)[0];
        log_1.log.debug(`[chapter]请求 ${bookUrl}`);
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, "UTF-8");
        const bookname = dom.querySelector("div.cataloginfo > h3").innerText.trim();
        const author = dom.querySelector(".infotype > p:nth-child(1) > a:nth-child(1)").innerText.trim();
        const introDom = dom.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDomI) => {
            (0, misc_1.rm)("span:nth-child(1)", false, introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const chapters = [];
        const getMaxPageNumber = () => {
            const pageDom = document.querySelector("div.page:nth-child(6)");
            if (pageDom) {
                const childNodes = Array.from(pageDom.childNodes);
                const _maxPageNumber = childNodes
                    .slice(-1)[0]
                    .textContent?.match(/第\d+\/(\d+)页/);
                if (_maxPageNumber) {
                    return _maxPageNumber[1];
                }
            }
        };
        const getIndexUrls = () => {
            const indexUrlsI = [];
            const maxPageNumber = Number(getMaxPageNumber());
            for (let i = 1; i <= maxPageNumber; i++) {
                const indexUrl = [
                    document.location.origin,
                    document.location.pathname.split("/")[1],
                    `${bookId}_${i}`,
                ].join("/") + "/";
                indexUrlsI.push(indexUrl);
            }
            return indexUrlsI;
        };
        const indexUrls = getIndexUrls();
        let lis = [];
        for (const indexUrl of indexUrls) {
            log_1.log.debug(`[chapter]请求 ${indexUrl}`);
            const doc = await (0, http_1.getHtmlDOM)(indexUrl, "UTF-8");
            const ul = doc.querySelector("ul.chapters");
            if (ul?.childElementCount) {
                lis = lis.concat(Array.from(ul.children));
            }
        }
        const chapterList = lis.filter((obj) => obj !== undefined);
        let chapterNumber = 0;
        for (const node of chapterList) {
            chapterNumber++;
            const a = node.firstElementChild;
            const chapterName = a.innerText;
            const chapterUrl = a.href;
            const isVIP = false;
            const isPaid = false;
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function contentAppend() {
            function UpWz(m, i) {
                let k = Math.ceil((i + 1) % code);
                k = Math.ceil(m - k);
                return k;
            }
            const _e = dom.getElementsByTagName("meta")[7].getAttribute("content");
            const contentRaw = dom.querySelector("#articlecontent");
            let codeurl;
            let code;
            const _codeurl = dom
                .getElementsByTagName("script")[1]
                .innerText.trim()
                .match(/"(http.+)"/);
            if (_codeurl) {
                codeurl = _codeurl[1];
                code = Number(new URL(codeurl).searchParams.get("code"));
            }
            if (_e) {
                const e = atob(_e)
                    .split(/[A-Z]+%/)
                    .map((v) => Number(v));
                const childNode = [];
                if (Array.from(dom.querySelectorAll("script")).filter((s) => s.src.includes("/17mb/js/article.js")).length) {
                    for (let i = 0; i < e.length; i++) {
                        const k = UpWz(e[i], i);
                        childNode[k] = contentRaw.childNodes[i];
                    }
                    for (const node of childNode) {
                        if (node.nodeType !== 1) {
                            continue;
                        }
                        if (!(node.innerText.includes("本章尚未完结,请") ||
                            node.innerText.includes("本章已阅读完毕"))) {
                            content.appendChild(node);
                        }
                    }
                    return;
                }
            }
            for (const node of Array.from(contentRaw.childNodes)) {
                if (!(node.innerText.includes("本章尚未完结,请") ||
                    node.innerText.includes("本章已阅读完毕"))) {
                    content.appendChild(node);
                }
            }
            return;
        }
        let nowUrl = chapterUrl;
        let dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const content = document.createElement("div");
        let flag = false;
        do {
            contentAppend();
            const nextLink = dom.querySelector(".novelbutton .p1.p3 > a:nth-child(1)").href;
            if (new URL(nextLink).pathname.includes("_")) {
                if (nextLink !== nowUrl) {
                    flag = true;
                }
                else {
                    log_1.log.error("网站页面出错，URL： " + nowUrl);
                    flag = false;
                }
            }
            else {
                flag = false;
            }
            if (flag) {
                nowUrl = nextLink;
                dom = await (0, http_1.getHtmlDOM)(nextLink, charset);
            }
        } while (flag);
        if (content) {
            const { dom: oldDom, text: _text, images: finalImages, } = await (0, cleanDOM_1.cleanDOM)(content, "TM", { keepImageName: true });
            const _newDom = document.createElement("div");
            _newDom.innerHTML = (0, yuzhaigeImageDecode_1.replaceYuzhaigeImage)(content.innerHTML);
            const { dom: newDom, text: finalText, images, } = await (0, cleanDOM_1.cleanDOM)(_newDom, "TM", { keepImageName: true });
            const fontStyleDom = document.createElement("style");
            fontStyleDom.innerHTML = `.hide { display: none; }`;
            oldDom.className = "hide";
            const finalDom = document.createElement("div");
            finalDom.appendChild(fontStyleDom);
            finalDom.appendChild(oldDom);
            finalDom.appendChild(newDom);
            return {
                chapterName,
                contentRaw: content,
                contentText: finalText,
                contentHTML: finalDom,
                contentImages: finalImages,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.Yuzhaige = Yuzhaige;


/***/ }),

/***/ "./src/save/save.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSaveBookObj = exports.saveOptionsValidate = exports.getSectionsObj = exports.SaveBook = void 0;
const file_saver_1 = __webpack_require__("./node_modules/file-saver/dist/FileSaver.min.js");
const zip_1 = __webpack_require__("./src/lib/zip.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const progress_1 = __webpack_require__("./src/ui/progress.ts");
const main_css_1 = __webpack_require__("./src/save/main.css");
const template_1 = __webpack_require__("./src/save/template.ts");
const toc_css_1 = __webpack_require__("./src/save/toc.css");
class SaveBook {
    constructor(book) {
        this.book = book;
        this.chapters = book.chapters;
        this.savedZip = new zip_1.FflateZip();
        this._sections = [];
        this.savedTextArray = [];
        this.saveFileNameBase = `[${this.book.author}]${this.book.bookname}`;
        this.mainStyleText = main_css_1.default;
        this.tocStyleText = toc_css_1.default;
    }
    saveTxt() {
        const metaDateText = this.genMetaDateTxt();
        this.savedTextArray.push(metaDateText);
        log_1.log.debug("[save]对 chapters 排序");
        this.chapters.sort(this.chapterSort);
        const sections = [];
        for (const chapterTemp of this.chapters) {
            const chapterName = this.getchapterName(chapterTemp);
            if (chapterTemp.sectionName &&
                !sections.includes(chapterTemp.sectionName)) {
                sections.push(chapterTemp.sectionName);
                const sectionText = this.genSectionText(chapterTemp.sectionName);
                this.savedTextArray.push(sectionText);
            }
            const chapterText = this.genChapterText(chapterName, chapterTemp.contentText ?? "");
            this.savedTextArray.push(chapterText);
            if (!setting_1.enableDebug.value) {
                chapterTemp.contentText = null;
            }
        }
        log_1.log.info("[save]保存TXT文件");
        const savedText = this.savedTextArray.join("\n").replaceAll("\n", "\r\n");
        (0, file_saver_1.saveAs)(new Blob([savedText], { type: "text/plain;charset=utf-8" }), `${this.saveFileNameBase}.txt`);
    }
    saveLog() {
        this.savedZip.file("debug.log", new Blob([log_1.logText], { type: "text/plain; charset=UTF-8" }));
    }
    saveZip(runSaveChapters = false) {
        log_1.log.debug("[save]保存元数据文本");
        const metaDateText = this.genMetaDateTxt();
        this.savedZip.file("info.txt", new Blob([metaDateText], { type: "text/plain;charset=utf-8" }));
        log_1.log.debug("[save]保存样式");
        this.savedZip.file("style.css", new Blob([this.mainStyleText], { type: "text/css;charset=utf-8" }));
        if (this.book.additionalMetadate.cover) {
            log_1.log.debug("[save]保存封面");
            this.addImageToZip(this.book.additionalMetadate.cover, this.savedZip);
        }
        if (this.book.additionalMetadate.attachments) {
            log_1.log.debug("[save]保存书籍附件");
            for (const bookAttachment of this.book.additionalMetadate.attachments) {
                this.addImageToZip(bookAttachment, this.savedZip);
            }
        }
        log_1.log.debug("[save]开始生成并保存卷文件");
        this.saveSections();
        log_1.log.debug("[save]开始生成并保存 index.html");
        this.saveToC();
        if (runSaveChapters) {
            log_1.log.debug("[save]开始保存章节文件");
            this.saveChapters();
        }
        else {
            log_1.log.debug("[save]保存仅标题章节文件");
            this.chapters
                .filter((c) => c.status !== main_1.Status.saved)
                .forEach((c) => this.addChapter(c, "Stub"));
        }
        log_1.log.info("[save]开始保存ZIP文件");
        const self = this;
        self.saveLog();
        return new Promise((resolve, reject) => {
            const finalHandle = (blob) => {
                (0, file_saver_1.saveAs)(blob, `${self.saveFileNameBase}.zip`);
                resolve();
            };
            const finalErrorHandle = (err) => {
                log_1.log.error("saveZip: " + err);
                log_1.log.trace(err);
                reject(err);
            };
            this.savedZip.onFinal = finalHandle;
            this.savedZip.onFinalError = finalErrorHandle;
            this.savedZip.generateAsync((percent) => {
                progress_1.vm.zipPercent = percent;
            });
        });
    }
    saveToC() {
        log_1.log.debug("[save]对 chapters 排序");
        this.chapters.sort(this.chapterSort);
        const self = this;
        const sectionsListObj = getSectionsObj(self.chapters);
        modifyTocStyleText();
        const indexHtmlText = template_1.index.render({
            creationDate: Date.now(),
            bookname: self.book.bookname,
            tocStyleText: self.tocStyleText,
            author: self.book.author,
            cover: self.book.additionalMetadate.cover,
            introductionHTML: self.book.introductionHTML?.outerHTML,
            bookUrl: self.book.bookUrl,
            sectionsObj: Object.values(sectionsListObj),
            Status: main_1.Status,
        });
        this.savedZip.file("index.html", new Blob([indexHtmlText.replaceAll("data-src-address", "src")], {
            type: "text/html; charset=UTF-8",
        }));
        function modifyTocStyleText() {
            if (self.book.additionalMetadate.cover) {
                self.tocStyleText = `${self.tocStyleText}
  .info {
    display: grid;
    grid-template-columns: 30% 70%;
  }`;
            }
            else {
                self.tocStyleText = `${self.tocStyleText}
  .info {
    display: grid;
    grid-template-columns: 100%;
  }`;
            }
        }
    }
    saveChapters() {
        for (const chapter of this.chapters) {
            this.addChapter(chapter);
        }
    }
    saveSections() {
        log_1.log.debug("[save]对 chapters 排序");
        this.chapters.sort(this.chapterSort);
        for (const chapter of this.chapters) {
            const chapterNumberToSave = this.getChapterNumberToSave(chapter);
            const sectionHtmlFileName = `No${chapterNumberToSave}Section.html`;
            if (chapter.sectionName) {
                if (!this._sections.includes(chapter.sectionName)) {
                    this._sections.push(chapter.sectionName);
                    log_1.log.debug(`[save]保存卷HTML文件：${chapter.sectionName}`);
                    const sectionHTMLBlob = this.genSectionHtmlFile(chapter);
                    this.savedZip.file(sectionHtmlFileName, sectionHTMLBlob);
                }
            }
        }
    }
    getChapterNumberToSave(chapter) {
        return `${"0".repeat(this.chapters.length.toString().length -
            chapter.chapterNumber.toString().length)}${chapter.chapterNumber.toString()}`;
    }
    addChapter(chapter, suffix = "") {
        const chapterName = this.getchapterName(chapter);
        const chapterNumberToSave = this.getChapterNumberToSave(chapter);
        const chapterHtmlFileName = `No${chapterNumberToSave}Chapter${suffix}.html`;
        log_1.log.debug(`[save]保存章HTML文件：${chapterName}`);
        const chapterHTMLBlob = this.genChapterHtmlFile(chapter);
        if (!setting_1.enableDebug.value) {
            chapter.contentRaw = null;
            chapter.contentHTML = null;
        }
        this.savedZip.file(chapterHtmlFileName, chapterHTMLBlob);
        chapter.chapterHtmlFileName = chapterHtmlFileName;
        chapter.status = main_1.Status.saved;
        if (chapter.contentImages && chapter.contentImages.length !== 0) {
            log_1.log.debug(`[save]保存章节附件：${chapterName}`);
            for (const attachment of chapter.contentImages) {
                this.addImageToZip(attachment, this.savedZip);
            }
            if (!setting_1.enableDebug.value) {
                chapter.contentImages = null;
            }
        }
    }
    getchapterName(chapter) {
        if (chapter.chapterName) {
            return chapter.chapterName;
        }
        else {
            return chapter.chapterNumber.toString();
        }
    }
    genMetaDateTxt() {
        let metaDateText = `题名：${this.book.bookname}\n作者：${this.book.author}`;
        if (this.book.additionalMetadate.tags) {
            metaDateText += `\nTag列表：${this.book.additionalMetadate.tags.join("、")}`;
        }
        metaDateText += `\n原始网址：${this.book.bookUrl}`;
        if (this.book.additionalMetadate.cover) {
            metaDateText += `\n封面图片地址：${this.book.additionalMetadate.cover.url}`;
        }
        if (this.book.introduction) {
            metaDateText += `\n简介：${this.book.introduction}`;
        }
        metaDateText += `\n下载时间：${new Date().toISOString()}\n本文件由小说下载器生成，软件地址：https://github.com/yingziwu/novel-downloader\n\n`;
        return metaDateText;
    }
    addImageToZip(attachment, zip) {
        if (attachment.status === main_1.Status.finished && attachment.imageBlob) {
            log_1.log.debug(`[save]添加附件，文件名：${attachment.name}，对象`, attachment.imageBlob);
            zip.file(attachment.name, attachment.imageBlob);
            attachment.status = main_1.Status.saved;
            if (!setting_1.enableDebug.value) {
                attachment.imageBlob = null;
            }
        }
        else if (attachment.status === main_1.Status.saved) {
            log_1.log.debug(`[save]附件${attachment.name}已添加`);
        }
        else {
            log_1.log.warn(`[save]添加附件${attachment.name}失败，该附件未完成或内容为空。`);
            log_1.log.warn(attachment);
        }
    }
    genSectionText(sectionName) {
        return (`${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}` +
            "\n\n");
    }
    genChapterText(chapterName, contentText) {
        return `## ${chapterName}\n\n${contentText}\n\n`;
    }
    genSectionHtmlFile(chapterObj) {
        const htmlText = template_1.section.render({ sectionName: chapterObj.sectionName });
        return new Blob([htmlText.replaceAll("data-src-address", "src")], {
            type: "text/html; charset=UTF-8",
        });
    }
    genChapterHtmlFile(chapterObj) {
        const htmlText = template_1.chapter.render({
            chapterUrl: chapterObj.chapterUrl,
            chapterName: chapterObj.chapterName,
            outerHTML: chapterObj.contentHTML?.outerHTML ?? "",
        });
        return new Blob([htmlText.replaceAll("data-src-address", "src")], {
            type: "text/html; charset=UTF-8",
        });
    }
    chapterSort(a, b) {
        if (a.chapterNumber > b.chapterNumber) {
            return 1;
        }
        if (a.chapterNumber === b.chapterNumber) {
            return 0;
        }
        if (a.chapterNumber < b.chapterNumber) {
            return -1;
        }
        return 0;
    }
}
exports.SaveBook = SaveBook;
function getSectionsObj(chapters) {
    const _sectionsObj = {};
    for (const chapter of chapters) {
        let sectionNumber = null;
        const sectionName = null;
        if (chapter.sectionNumber && chapter.sectionName) {
            sectionNumber = chapter.sectionNumber;
        }
        else {
            sectionNumber = -99999999;
        }
        if (_sectionsObj[sectionNumber]) {
            _sectionsObj[sectionNumber].chpaters.push(chapter);
        }
        else {
            _sectionsObj[sectionNumber] = {
                sectionName: chapter.sectionName,
                sectionNumber: chapter.sectionNumber,
                chpaters: [chapter],
            };
        }
    }
    const _sectionsListObj = Object.entries(_sectionsObj);
    function sectionListSort(a, b) {
        const aKey = Number(a[0]);
        const bKey = Number(b[0]);
        if (aKey > bKey) {
            return 1;
        }
        if (aKey === bKey) {
            return 0;
        }
        if (aKey < bKey) {
            return -1;
        }
        return 0;
    }
    _sectionsListObj.sort(sectionListSort);
    const sectionsListObj = _sectionsListObj.map((s) => s[1]);
    return sectionsListObj;
}
exports.getSectionsObj = getSectionsObj;
function saveOptionsValidate(data) {
    const keyNamesS = ["mainStyleText", "tocStyleText"];
    const keyNamesF = [
        "getchapterName",
        "genSectionText",
        "genChapterText",
        "genSectionHtmlFile",
        "genChapterHtmlFile",
        "chapterSort",
    ];
    function keyNametest(keyname) {
        const keyList = new Array().concat(keyNamesS).concat(keyNamesF);
        if (keyList.includes(keyname)) {
            return true;
        }
        return false;
    }
    function keyNamesStest(keyname) {
        if (keyNamesS.includes(keyname)) {
            if (typeof data[keyname] === "string") {
                return true;
            }
        }
        return false;
    }
    function keyNamesFtest(keyname) {
        if (keyNamesF.includes(keyname)) {
            if (typeof data[keyname] === "function") {
                return true;
            }
        }
        return false;
    }
    if (typeof data !== "object") {
        return false;
    }
    if (Object.keys(data).length === 0) {
        return false;
    }
    for (const keyname in data) {
        if (Object.prototype.hasOwnProperty.call(data, keyname)) {
            if (!keyNametest(keyname)) {
                return false;
            }
            if (!(keyNamesStest(keyname) || keyNamesFtest(keyname))) {
                return false;
            }
        }
    }
    return true;
}
exports.saveOptionsValidate = saveOptionsValidate;
function getSaveBookObj(book, options) {
    const saveBookObj = new SaveBook(book);
    if (setting_1.enableCustomSaveOptions && saveOptionsValidate(options)) {
        Object.assign(saveBookObj, options);
    }
    if (book.saveOptions !== undefined) {
        Object.assign(saveBookObj, book.saveOptions);
    }
    return saveBookObj;
}
exports.getSaveBookObj = getSaveBookObj;


/***/ }),

/***/ "./src/save/template.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.index = exports.chapter = exports.section = void 0;
const chapter_html_j2_1 = __webpack_require__("./src/save/chapter.html.j2");
const index_html_j2_1 = __webpack_require__("./src/save/index.html.j2");
const section_html_j2_1 = __webpack_require__("./src/save/section.html.j2");
const nunjucks = __webpack_require__("nunjucks");
const env = new nunjucks.Environment(undefined, { autoescape: false });
exports.section = new nunjucks.Template(section_html_j2_1.default, env, undefined, true);
exports.chapter = new nunjucks.Template(chapter_html_j2_1.default, env, undefined, true);
exports.index = new nunjucks.Template(index_html_j2_1.default, env, undefined, true);


/***/ }),

/***/ "./src/setting.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.r18SiteList = exports.iconJump = exports.iconSetting = exports.iconStart1 = exports.iconStart0 = exports.enableJjwxcRemoteFont = exports.enableR18SiteWarning = exports.enableCustomSaveOptions = exports.enableCustomChapterFilter = exports.enableCustomFinishCallback = exports.enableDebug = exports.retryLimit = void 0;
exports.retryLimit = 5;
exports.enableDebug = {
    value: false,
};
exports.enableCustomFinishCallback = true;
exports.enableCustomChapterFilter = true;
exports.enableCustomSaveOptions = true;
exports.enableR18SiteWarning = false;
exports.enableJjwxcRemoteFont = true;
exports.iconStart0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFYElEQVR4nO2dIUxkORyHP4XD4E6RYNZgUGvWonAnVqxDbbJiNWLNOsQ65Oo1CMQIFAnJJiQIcgY7YhIEbgTJiEkm4USPuyNh3pv2tf33tb9f8kl4fe3H0Pm37xXi50/gHJgBC+C5YB6Bv4AL4CuwH7872skBcI/9oA5lBpwAO1F7p/IcUf5fuy8L4AzYjthPVWYfeMJ+wFLxABxG660K8xv7QcrBWawOqykfsB+YnEzQv4RXOcV+UHJzD+zF6LwaMsF+QCyYo3kBALfYD4YVK+DL8C4cd+6wHwhrfgJbQztyrJEAjhvgj4F9OcrUKMA33Me778/NaLCUXKMA27ivt48BP7vArYU0k1oFAPeRHjrJPQ3u0ZGlZgHATe5+Bv6ecxooGtUuwEuOCVvsugd2vXp0ZGlFAHDL3bOA3zfHzSmqTEsCgNsjcBXwO5e4T5Hq0poA4OYFoWsg1RWNWhTgJZ8ImxdcUdFuo5YFADcvmAZcY0olRaPWBQD313wZcJ0n3Fa6UUcC/JfvAdda4TagjjYS4HWOcF/7fK/5i5FODmvcDzC0eveOsO3xt4xwRVECvJ1t3MMmvtd+AN5HuH62SIDunOC/tLxgREUjCdCf0HnBKFYUJcBm2SNsXnCZqD3RIgE2zzZuidi3PVPcxLLISAD/fMYtDvm0qdht6BIgLIf4zwuWOHmKigQIzy5hhbSiKocSYFi2cFVA3zZ+ytjGztQogMVS7Vf85gVPFLLVrEYBrGbcvlvRJzbNfJ0aBbDc1++7Fd28bFyjAOdRe8g/PlvOfhm18d/UKMCKMjZqHNM/L1hiXCmsUYBn3ILMZ+zX6N/jVgi72mr6KFqtArzwiJtsneE+li3oezLJdNGodgHGgOm3AQlgz03vKCWMBLDnrneUEkYC2CMBGkcCNI4EaBwJ0DgSYEMecE/mbkLIA59NCnCzplElEbqfLvTJXwlQGEN2z+zjv4GzKQFK/xewZPiCTumS6xOgg4cI9xiyZ08CFIIESBwJYI8E6EACJI4EsEcCdCABEkcC2CMBOpAAiSMB7JEAHUiAxJEA9kiADiRA4kgAeyRABxIgcSSAPRKgAwmQOBLAHgnQgQRIHAlgjwToQAIkjgSwRwJ0IAESRwLYYyrA7zWNKgUJkDgSwB4J0IEESBwJYE8zAqxwr0T7webv2Ivxbv2PHtc7xb1qNucDpc0I8DHTPcXIB/yPi5MAHcT4KM+dXH3ThADzXDcUMSHHxEmADr5kuqcYOSJfvzQjwIKCz8/7X3bof8O3BAjkDvtXuPcl5HBICeDB9yx3FpZj8vdHcwKsKOCsnDeyhzvNSwJkYEp5hypfY9MXTQrwjDtJo5ScYNcPzQrwTBmHOx1g+y7BpgV4xJ21Z5Ut8hV8JMAaLpPf5fqcdbRLAmTE4lj1wwHtlQCRyV0l3MHvnF8JkIGcVcLc1T4JsCE5qoQW1T4JsCGpq4RW1b5iBbhe0yhLUlYJS7xfCfAGKaqE3wq4LwngQcxTta2rfRIggDlxqoQlVPskQCAxqoQlVPskwACG7CUspdonAQYQWiUsqdonAQYSUiUsqdonASLgUyUsrdonASKwwj2y1ZcSq30SIBKbVAlLK29LgMh0VQlLrfZJgMi89aRxydU+CRCZOe5g6JfsMo6TwiVARJbABe7r3pgmfRJASAAhAQQSQCABmsdUgKs1jRL5uO0dpYSRAPZMekcpYS7WNErk47R3lBLmx5pGiXyYvi1lDFumaua6f4jS5w77jmiRBa/XM8zyjnHX0sfIkrjPPQzOAeNdTRsbUzbb2ZQ9W7i9dBNghltyjUHrny4r3JtHJ//0b9RH4P8GSxsCzEN/51YAAAAASUVORK5CYII=";
exports.iconStart1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAESElEQVR4nO2cLUxcQRSFv4QgEBiSKgQCh6pCouvQlbVVdaRuTFUNoqaqEkktCoVD4HBITBMMosmaVsxu+kL3l3lv7p13z5ccyc68OSf3sLtvHwghhBBCjJM/hRKNowAERwEIjgIQHAUgOApAcBSA4CgAwVEAgqMABEcBCI4CEBwFIDgKQHAUgOAoAMFRAIKjAARHAQiOAhAcBSA4CkBwFIDgKADBUQCCowAERwEIjgIQHAUgOApAcBSA4CgAzkmUm9SqUvHpjYSEvRky35iEvSky35iEvTky35iEvUky35iEvVky35iEvWky35iEvXky35iEvYky35iEvZky35iEvaky35iEvbky35iEvcky35iEvdky35iEveky35iEzA9PQuaHJyHzm2e78O8T7Zhfeq2j4i1wDvyi/GAT/s1P5Gs9J197SN4An4A7hjlgz+a/fM078lm8KXxt92wDp8BPYEL9g/ZoflcT8tmcMrKK6I54TwfueS/NV8SyEe/54D3uoZmK2GTEt2KA5dov5bYiXjvivRthsea6Mq+Ivka8V0NqrlWqahUx1IjfRGeF15DWWCMVrnG2xhpDaLCKqDHiV+ka+ADs9nA9ack6qYfX3yXv9XrJOkOruCIsRvxLPZANOXztRSwhzVkvDbDO4fR1H+asV0trV4SHEf8M/ABOVm22B1Jn3VRhvRPytT1jc7YLK8LTiN/Z/FyLSNT/Vm8HZxVhtYnZiD8oOc3GOcC+Iqou9gx8p86Ib40T8tnUrogqi1wB76k/4ltkh3xWVzQegHvgM7Df6/HEYp98hvc0EoAn8hg7HuAwonNMPtsnnAVggkZ8TboV0cfb9aIRf4ZGvCX7ZA9KKmLjEf8NjXiPHJO92bQiFICRUCUAqgBfVK+AedI/gXVx80/goorQ28BhcPs2cFlF6IOgMpr7IGiRVBHrM5qPguep5vf9rWF1v0DVxbrS18EBvw5epGv6u+fPOx7uGXQXgJnGXBHWt4Q1EYCuhrwptBYebgptNgBd3dBORcxG/A325zaaAMz0G7gA3gFbaxpSgy3yni7Ie7Q+p9EGoKtH4AtwtNqfwTia7uER+/MIF4CuboCPwN5Su/phb7pWKyM+RABmGqoiWh7xoQLQ1SPwlbKKOJq+RssjPmwAurpl/YqYjfhbB/tWAHrWBLjk/9/HzX4XeYnd7yIVgMqa/T7O+neR1jLfgKQASIYy34CkAEiGcvGACKmu5j5DKPJboQha9BZ4Lh4eEiX1o+LnCKoi2tMgTxJVRfjWRiO+FFWEH5k/TVwVUV/mD4ueh4cHTY5ZVUd8KaqI/mQ+4ktRRWwulyO+FFXEcjU14ktRRfxT8yO+lIgVMcoRX8rYP2gKNeJLGVNFhB/xpbRYERrxA+C9IjTiK+KpIjTijbGoCI14hwxdERrxDdFnRWjEN85rKkIjfoSsqgiN+EB0K0IjXgghhBDh+Avri3imoU6g/AAAAABJRU5ErkJggg==";
exports.iconSetting = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAIxElEQVR4nO2dW4wWRRbHfzArzAIioFxk4oMKjLgqug9k2UUi3g0YYwKId59UXnaj0ejDamLUxTWi8cEbglFJvL7hLfFuHBGNVxBXjFGZWVC8jIoDOzPLTPtwvk+GoafOqe6qntbpf1LJZKrr1L+quqtOnXOqPqhQoUKFChUqVKhQoUKF8uDvQBIoXVUwdzOGDzYBB44JKOtPAWUFRZkHYFZAWUcHlDUk0ADsJNwUtKsms3Qo6xcwAxgVUN4fgcMCyguGsg5AyPm/jlJOQ0NpAI6KIDM3yjoAIRfgOko5AGVFG+5F9fiUMqcrZT6Ozvp3goOAXtydOT6lXJNS5v9AY2Tuv2mcAKwCfsDdkVscMtqVsiuAA+PQ/+3iNGA9dp3+KYes1wzlfwZuASbm4LxfjrJRcASwGXnD5mJb3A8BnsF/U3WTQ+ZdHnI6gFuBA4xtbEBeljXIVzrTWK4QPMvejfsauA9ZGEekPH8x8BP+nZ8ASxw8lmWQtw041yFzFvJibetX7jlHmUKxAHcDfwQeARYDE4B7lOe11OzgMjeH3Bf7yG4CrgY2KGUW+HVVeIwAPsHeSE270dKnuG0643LK7wReB3qMz28m/QsvDFemkAqduoAngFOwrS0n157vKoBbUuuDQcFEdJUxa+pB3sQrgMkZ+U0GrgFaI3Gspx+BSRk55sJ9GchqaTdwP3BoQJ4jkcV5SwS+9bQyIF8TjkU6K2QjNgGzI3IeAVwGfBOYd/3FOTYi933wauAGPAqMLoj7OOBOwr9ALcCwIhqwyEDmv8Db2LSeFUWQTsFsRKuydG478K3hucWxSTcCXxiILKo9fwhwKWI+6E557vbYhBVMRqa+gaaVF4CLEO+c5cVrJawnbx/800DiddI/xQlIY55AzACD3fl1TEZM1X3XomtI12xeQW//dbGINiGGrBCLUZb5fixwHqIlvY0spt219E3tfyuBpcD+nrKbkI6boTxnUT46avKC42Gl4gS4N0K9zcBqJLLBuiDuREzb0yPwsajfa0JX+hdsC+pJAescBdyGOFKsHd8/dSMWz5COmAsN9fYCc0JVOAy7vb49UMXTgY3GOi3pTeDgALwuxf5CvEVAn/vV2A1pP5PvSziOOJulNrJHWwwDbvSs7w4CBz1cht1K2AmclaGO6cTp/L6D4Psl7Ac86FFHD2LDioKlpOvzaWk3cImH7EbgA6PsPOkdJFLOgjHs62zSXrylHm3OhDOB/xkJ9QCXG+XeZpQZIt1g4NMIvO8hs530cJkomA/sMBLrRY9EaMa2uPUCTwMXILGeo2rpcEQ7edrIqQOYonAajl31/ZJB8BHPBr43kNtqkLXaIKcV+KtB1lz0wK4EuNsg612DnPcIo2FlwlHs66zun9YqMsaih6K34tfIqeiD0IHM8S6sUWS04L/r3gt51aSPkFgcF95V8hfiNmAlyML2lQcvLdIBxByiOdU3KfmtiNqdGSH0VC3o9T0lf76S/wywzk7nV7QgGowLJyr52gDkPvoUYgCmKvmblXwtEvpxDy6+ZbW6Ne5a2wuBppJqlk/N0ZHnZMs0RfZ2pfxopfyuHNyCQdsda2eztPCRPA4OrQM7lfJ/UMrvzsENKOaARpKzfB4/ayE+2jwIMQBdSr4WObZDyc8aFwT6ZusnJX+kkt/twSUVIQagQ8nXOvBzJf9vHlx8y2p1a56tnR5cUhFiAFwHJkAPsvpQyT/Hg0t/aIYxrW5XIDDYdvlOhBgA7S06Usl/WclfgJgXfDEPCY934SUl/89K/n/sdOJgDOJtcmkKqxUZ+6ObItrw07mbkNikvKaItYqMHcCpHryCYgo2Y9UHBlmrDHLasH0J89A7P8EWz7nVIKcbP79HEMzEFqCVIGZmzQEyHbuj51kkvmgaouePrv19MXbnSRf6Bm+SUVaCmMmvV+QFw/HYzND19D42i+GtHjLzpuXGtl6L36GSVcjmLRrOxi8+50Xsh+Aa0deTEGkdun7fF4uwewAT4HnExB4c/8DulE+Ah/A/zjmFuAcqtpItam0+chDDWs+HGetJxXAkxMKnoTeS3QxwDDaPlm9qJd+NKUd78tpEIFPIMCTIyFLpbuxOeBcmYjt07TPtaGYJC6Zid9S7zjN7Yw62xejCgHU2ItELHYZ6B0pdwL/wm/M1nGCodzsR1gHNP5oggauhMQVxoPsMREeNS4xbsl4y1L8sQr00oXeCJTx9BhIK7rtIjUHsQvcisarbkTe8q/b3euQQ+BL0HW4aLCHzC9E7/2MiqqLXGQiknZUajwS2trBnKvuUSHH0GbAcUTVfQLS9tPWiAQlC0Nq/MCZRnyNKI5EoOteh6TIMwnLSv+QW5KTMtNpzlnsoXimC8GIDkW/R7+7pOwgxj6e6sMLAr5c9J3Jcz/WgW0+DIfQx1V7kBM5BBfEfAzwWuA0PFsQdiHNQO0HessuJewHGHMSOH5L3LuREaKFYGYD4QGkLMueG1N+nAQ8Q58W5OSBPMybhZx/JktqQhTDPhR1XAG/gZ8fySVE2XVYUcV1Nwp4ra042cBqOXG1T1JU1UTZdVoxAwvcsROtX0HQanx8ojXPwacB+/cBAycf+H3XTZYV2ZdkG5JBfXd9vRjY8WTvI5ZZsziE3QS79m4Co2o+g32sXddPlg+fYm9g2RMd2Bb8uxeZz9fnkl2SQlyBr2fkp8kYCZyAKx/Z+ZbRojkIxE7k9aw1ytaP1rv6xwL/xM7Td5ZB3k4ecelqLbTfegDj870BCcQrbdFmR5zLTiYhJwHLuzHUg5ClD+Xp6A9uiPqRwILp5oN1RXruW7Afkso95cej/PtCIfmIybcoYr5TppThThxll/P2ATuAz5Zm0Y1HaNQRtwHeZGA1BPEk+dXKgxbZ0KOMXAOL4CA0tEnpQMJQGYEMEmblR1gHYGEFmKQegrGjALwRSS9UPuXmih7CHHzbWZJYOZR0ACDsNlXIBhnIPQMiFuJr/K1SoUKFChQoVKlSoUBr8Ah3QujNKRJdpAAAAAElFTkSuQmCC";
exports.iconJump = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAG6wAABusBTDGeSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAeVSURBVHic7VpvTBNpHv6901L+yQU3nCfrByU9IRYrWrCVGkVzgu4ZCSFSMBDJrhcTP+iqMdlcLvFyl7sPftn9diZsiHterpYz8TxuCXsauBNy2VVoXIEIXV2hAYt/WqF/mMGZ6fzugwxXSjudlnYHWJ5kMm+n7/zmeZ55531/7ztDEBF+zKCUJqA01gxQmoDSWDNAaQJKY80ApQkojTUDlCawFNTU1Pzk3LlzzYQQkmiMFW0AABzRarVfXLx40UYISUjLijaA4zjNunXrQK/XWy5dutS5b98+dbwxVrQB4jwmIyMDtm/fXrV3796eQ4cOZcYTY0UbEAqNRgM6na7caDTeP3r0aI7c81aNAQAAaWlpsG3bNr3BYHhYW1v7npxzVpUBAABqtRoKCwu1er1+sK6uLj9W/RVtQLS1DJVKBVu3bn1fr9cPWCyWAqkYK9oAKVAUBVqtNq+kpORRQ0ODLlo9kooVoVOnTv0yOzv7F1J1Yl1XDi+e53++e/fu6uzs7AX1w8sTExPMo0eP9lmtVnt4jKQbQAhJv3z58rDBYJhveuI1pEjKLSd6nsvlYh8+fFhptVp7Qvmm4hFQAUDCqWmqkJ+frykrK+tubGz8IPR4SvqA5brQumHDBpXJZPqyqampTjy2KjvBYDAILMsCwzAQCATA5/OB1+uFqakpAACqsLDQ1tzcfAoAIO7cWQ5S3QIEQYDZ2VngOA6CwSDwPA88z8+XAQDECWKkfVZWFqXVaj9vaGiYTYkByQbP80DTNDAMAwzDAMuyABBZnJRwcY+IMDMz4x8eHuYTNoAQQk6fPn1yYmLi7x0dHb7Q/5baAliWBZqm5zc5d1WOcJGby+V6cevWrY+dTudXCRlACKHOnj17o6ioyPL8+XMGAP6WSBwRgiCAz+cDn88HDMNAMBiUJSYe4YQQCAaD4HQ6v2tra/vY7Xb3ICIdtwFms1l9/vz5DpPJVMXzPLAsqwmvg4goipj7vWAP8K6jCgQCMD09DYFAICJpKcQjnBACLMvCkydPHlit1osMw/Qj4luAODvBAwcOZJrN5i6j0Vienp4OPp8vUjX+7t27nz5+/NgoFSsZmWBWVtZPi4uLj6Snp0u2jtnZWRgaGuq02Wy/EQRhEBF5MYZsAw4fPpxjMpn+W1paqtdoNICIEUkiIksI+UtfX9+SHgs5OHjw4NHi4uIj4Y9CaDkQCEBfX9+f29vbrwCAAxGF0BiyDDh27Nh7ZWVlD0pKSrRpaWnz4qPdJUT0LkWYXFRWVnKi4Ej9gdfrFXp6ej7r7u7+EwCMYgTCMQ2oqanJ37lzZ79er39frVaDIPzfwNCyUiCEAEVR82URr1+/Zru6un53//79LxDRFe18SQNqa2sLdu3a9UCn0+VRFDUveLmkuiKP8DF+cnLS39nZ+cng4OBNRHRLxYhqwPHjx3UGg+GboqKiHACIKH65tADRAEEQYHx8/OXt27cvjI6OdiBixF46FBENsFgspaWlpb1arTYz1jR0y5YtdWfOnNkVSihSWeo/OWW/3/+v1tbWO+FcRQM4joPR0dHvb968ee7Vq1f/QUQ6suSFWGRAfX39/rKysrubN2/WSIlHRMjMzASz2Vw9PT0NDMNEHMfjGa+l9uPj45WEkN3i+B0an2VZcDgc9ra2tgt+v/9BeB3ZBtTX139gNBr/uWnTJlV4Lx9eRkSYmpoCv98fNXGJJSoezF1fFXYMaZqGp0+f3rHZbL8WBGEgdIyXg3kDTpw4Ubdnzx7bxo0bqdBnO5IJHMeBx+MBlmWXJE7u3Y8Gu93+Lcdxf+zt7bUCwEj4GC8HagCAxsbGX5WXl7fk5eWRaOJF0DQNHo8n5kiQzLsf7Ryv1+vo7e29AgCBSGO8HKgtFkvj/v37P8/NzY3Zq79582ZBk0+GqKXEmmvu/rgvHgJqeHiY93g8tJT4YDAILpcL/H7pay21SUvFEpOdZIMaGhrqvHbt2ocOh8MTOoMTEQwG4cWLF8BxXERiSt39ZIFCRJ/T6fyypaWlaWBgYEwUCrBYvBRS8cz/EMZQAACISLvd7n9fvXq1yW63f8uy7ALxUoRCJ0ZSm1g31h4RQRCERVuq0u8FL0YIIWqKovQnT568UlBQUBk+yQjfcxwHIyMjXzEM8zpicIlMMNrxaHXGxsa+7u/vb0VEVpYymVj0Zoi8+9SkqLq6+pMdO3Y0Z2RkLCAWSpDjOLh3795H3d3dHckkFQVvUzHNXpQKI6JACBlpb2///czMjNtkMl3Iyspa1AWLRqhUKg4RXyWb2A+FiJOhuaTiGSHk05mZmTcVFRW/zcnJ0SjRS6cakusBiOgihLTQND1VVVV1Zf369TkAyg5byUbMFSFEdBNC/hoIBKarq6s/y8vL+5lKpYp12oqBrPQKEX3Pnj37x40bNz6anJz8XhCEVXH3AeJ4OYqI9MuXL7uuX7/+4djYmF1OcrQSEFeCjYhv/X7/162tracdDseduXd0y2OBMFHIzeTCsjoKAHQVFRV/yM3NLU4kxnLZEv5EhrzrBNYBABPvKsxyQko+klpJWJVfiMSDNQOUJqA01gxQmoDSWDNAaQJK40dvwP8AKk+/HC2PJW8AAAAASUVORK5CYII=";
exports.r18SiteList = [
    "www.dierbanzhu1.com",
    "www.bz01.org",
    "m.yuzhaige.cc",
];


/***/ }),

/***/ "./src/stat.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetStat = exports.printStat = exports.failedPlus = exports.successPlus = void 0;
const GM_1 = __webpack_require__("./src/lib/GM.ts");
const log_1 = __webpack_require__("./src/log.ts");
const statKeyName = "novel-downloader-22932304826849026";
const domain = document.location.hostname;
async function getStatData() {
    const _data = await (0, GM_1._GM_getValue)(statKeyName);
    let statData;
    if (_data) {
        statData = JSON.parse(_data);
    }
    else {
        statData = { success: {}, failed: {} };
    }
    return statData;
}
const saveData = async (statData) => {
    const dataJSON = JSON.stringify(statData);
    await (0, GM_1._GM_setValue)(statKeyName, dataJSON);
    return statData;
};
const dataPlus = async (key) => {
    const statData = await getStatData();
    const tmpData = statData[key];
    if (tmpData[domain]) {
        tmpData[domain] = tmpData[domain] + 1;
    }
    else {
        tmpData[domain] = 1;
    }
    return saveData(statData);
};
const successPlus = () => {
    return dataPlus("success");
};
exports.successPlus = successPlus;
const failedPlus = () => {
    return dataPlus("failed");
};
exports.failedPlus = failedPlus;
const printStat = async () => {
    const statData = await getStatData();
    log_1.log.info("[stat]小说下载器脚本运行情况统计：");
    log_1.log.info(statData);
    for (const k in statData) {
        if (Object.prototype.hasOwnProperty.call(statData, k)) {
            log_1.log.info(`[stat]${k}:`);
            const subData = statData[k];
            for (const j in subData) {
                if (Object.prototype.hasOwnProperty.call(subData, j)) {
                    log_1.log.info(`  [stat]${j}: ${subData[j]}`);
                }
            }
        }
    }
};
exports.printStat = printStat;
const resetStat = () => {
    const statData = { success: {}, failed: {} };
    return saveData(statData);
};
exports.resetStat = resetStat;


/***/ }),

/***/ "./src/ui/ChapterList.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.style = void 0;
const Vue = __webpack_require__("vue");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const main_1 = __webpack_require__("./src/main.ts");
const download_1 = __webpack_require__("./src/router/download.ts");
const save_1 = __webpack_require__("./src/save/save.ts");
const ChapterList_html_1 = __webpack_require__("./src/ui/ChapterList.html");
const ChapterList_less_1 = __webpack_require__("./src/ui/ChapterList.less");
const FilterTab_1 = __webpack_require__("./src/ui/FilterTab.ts");
async function getSections() {
    if (window._sections) {
        return window._sections;
    }
    else {
        const rule = await (0, download_1.getRule)();
        const book = await rule.bookParse();
        window._book = book;
        window._sections = (0, save_1.getSectionsObj)(book.chapters);
        return window._sections;
    }
}
exports.style = (0, createEl_1.createStyle)(ChapterList_less_1.default);
exports["default"] = Vue.defineComponent({
    name: "ChapterList",
    setup(props, context) {
        const sectionsObj = Vue.reactive([]);
        const loading = Vue.ref(true);
        Vue.onMounted(async () => {
            if (sectionsObj.length === 0) {
                const _sectionsObj = await getSections();
                Object.assign(sectionsObj, _sectionsObj);
            }
            loading.value = false;
        });
        const filterSetting = Vue.inject("filterSetting");
        const filter = (chapter) => {
            if (chapter.status === main_1.Status.aborted) {
                return false;
            }
            if (filterSetting.value) {
                const filterFunction = (0, FilterTab_1.getFilterFunction)(filterSetting.value.arg, filterSetting.value.functionBody);
                if (typeof filterFunction === "function") {
                    return filterFunction(chapter);
                }
            }
            return true;
        };
        const warningFilter = (chapter) => {
            if (chapter.isVIP === true && chapter.isPaid !== true) {
                return true;
            }
            return false;
        };
        const isChapterDisabled = (chapter) => {
            if (!chapter?.chapterUrl) {
                return true;
            }
            return false;
        };
        const isChapterSeen = (chapter) => {
            if (filterSetting.value.hiddenBad && filter(chapter) === false) {
                return false;
            }
            else {
                return true;
            }
        };
        const isSectionSeen = (sectionObj) => {
            const chapters = sectionObj.chpaters;
            return chapters.some((chapter) => isChapterSeen(chapter) === true);
        };
        return {
            sectionsObj,
            loading,
            filter,
            warningFilter,
            isChapterDisabled,
            isChapterSeen,
            isSectionSeen,
        };
    },
    template: ChapterList_html_1.default,
});


/***/ }),

/***/ "./src/ui/FilterTab.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.style = exports.getFilterFunction = exports.getFunctionBody = exports.filterOptionDict = void 0;
const Vue = __webpack_require__("vue");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const ChapterList_1 = __webpack_require__("./src/ui/ChapterList.ts");
const FilterTab_css_1 = __webpack_require__("./src/ui/FilterTab.css");
const FilterTab_html_1 = __webpack_require__("./src/ui/FilterTab.html");
exports.filterOptionDict = {
    null: {
        raw: (arg) => {
            return (chapter) => true;
        },
        description: "<p>不应用任何过滤器（默认）</p>",
        abbreviation: "无",
    },
    number: {
        raw: (arg) => {
            function characterCheck() {
                return /^[\s\d\-,，]+$/.test(arg);
            }
            function match(s, n) {
                switch (true) {
                    case /^\d+$/.test(s): {
                        const _m = s.match(/^(\d+)$/);
                        if (_m?.length === 2) {
                            const m = Number(_m[1]);
                            if (m === n) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case /^\d+\-\d+$/.test(s): {
                        const _m = s.match(/^(\d+)\-(\d+)$/);
                        if (_m?.length === 3) {
                            const m = _m.map((_s) => Number(_s));
                            if (n >= m[1] && n <= m[2]) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case /^\d+\-$/.test(s): {
                        const _m = s.match(/^(\d+)\-$/);
                        if (_m?.length === 2) {
                            const m = Number(_m[1]);
                            if (n >= m) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case /^\-\d+$/.test(s): {
                        const _m = s.match(/^\-(\d+)$/);
                        if (_m?.length === 2) {
                            const m = Number(_m[1]);
                            if (n <= m) {
                                return true;
                            }
                        }
                        return false;
                    }
                    default: {
                        return false;
                    }
                }
            }
            if (!characterCheck()) {
                return;
            }
            return (chapter) => {
                const n = chapter.chapterNumber;
                const ss = arg.split(/,|，/).map((s) => s.replace(/\s/g, "").trim());
                return ss.map((s) => match(s, n)).some((b) => b === true);
            };
        },
        description: "<p>基于章节序号过滤，章节序号可通过章节标题悬停查看。</p><p>支持以下格式：13, 1-5, 2-, -89。可通过分号（,）使用多个表达式。</p>",
        abbreviation: "章节序号",
    },
    baseOnString: {
        raw: (arg) => {
            return (chapter) => {
                return (chapter && chapter.chapterName?.includes(arg)) || false;
            };
        },
        description: "<p>过滤出所有包含过滤条件字符的章节</p>",
        abbreviation: "章节标题",
    },
};
function getFunctionBody(fn) {
    return `return (${fn.toString()})(arg)`;
}
exports.getFunctionBody = getFunctionBody;
function getFilterFunction(arg, functionBody) {
    const filterFunctionFactor = new Function("arg", functionBody);
    const filterFunction = filterFunctionFactor(arg);
    if (typeof filterFunction === "function") {
        return filterFunction;
    }
    else {
        return undefined;
    }
}
exports.getFilterFunction = getFilterFunction;
exports["default"] = Vue.defineComponent({
    components: { "chapter-list": ChapterList_1.default },
    emits: ["filterupdate"],
    setup(props, { emit }) {
        const arg = Vue.ref("");
        const hiddenBad = Vue.ref(true);
        const filterType = Vue.ref("null");
        const filterOptionList = Object.entries(exports.filterOptionDict);
        const functionBody = Vue.computed(() => getFunctionBody(exports.filterOptionDict[filterType.value].raw));
        const filterDescription = Vue.computed(() => exports.filterOptionDict[filterType.value].description);
        const filterSetting = Vue.computed(() => ({
            arg: arg.value,
            hiddenBad: hiddenBad.value,
            filterType: filterType.value,
            functionBody: functionBody.value,
        }));
        Vue.provide("filterSetting", filterSetting);
        Vue.watch(filterSetting, () => {
            emit("filterupdate", filterSetting.value);
        }, {
            deep: true,
        });
        const getFilterSetting = Vue.inject("getFilterSetting");
        Vue.onMounted(() => {
            const faterFilterSetting = getFilterSetting();
            if (faterFilterSetting) {
                arg.value = faterFilterSetting.arg;
                hiddenBad.value = faterFilterSetting.hiddenBad;
                filterType.value = faterFilterSetting.filterType;
            }
        });
        return {
            arg,
            hiddenBad,
            filterType,
            filterOptionList,
            filterDescription,
        };
    },
    template: FilterTab_html_1.default,
});
exports.style = (0, createEl_1.createStyle)(FilterTab_css_1.default);


/***/ }),

/***/ "./src/ui/LogUI.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Vue = __webpack_require__("vue");
const log_1 = __webpack_require__("./src/log.ts");
exports["default"] = Vue.defineComponent({
    name: "LogUI",
    setup(props, context) {
        const logText = Vue.ref("");
        function onMount(fn) {
            Vue.onUnmounted(() => fn());
        }
        let intervalID;
        Vue.onMounted(() => {
            logText.value = (0, log_1.getLogText)();
            intervalID = globalThis.setInterval(() => {
                logText.value = (0, log_1.getLogText)();
            }, 100);
        });
        Vue.onUnmounted(() => {
            if (intervalID) {
                globalThis.clearInterval(intervalID);
            }
        });
        return { logText };
    },
    template: `<div class="log"><pre v-html="logText" id="novel-downloader-log"></per></div>`,
});


/***/ }),

/***/ "./src/ui/TestUI.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.style = void 0;
const Vue = __webpack_require__("vue");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const main_1 = __webpack_require__("./src/main.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const TestUI_html_1 = __webpack_require__("./src/ui/TestUI.html");
const TestUI_less_1 = __webpack_require__("./src/ui/TestUI.less");
exports["default"] = Vue.defineComponent({
    name: "TestUI",
    setup(props, context) {
        const book = Vue.reactive({});
        const chapter = Vue.reactive({});
        async function initBook(retry) {
            const _book = window._book;
            if (_book) {
                Object.assign(book, _book);
                return _book;
            }
            else {
                if (retry > 0) {
                    await (0, misc_1.sleep)(2 ** (setting_1.retryLimit - retry) * 500);
                    return initBook(retry);
                }
                else {
                    return;
                }
            }
        }
        const metaData = Vue.reactive({});
        function getData(key, value) {
            if (key === "封面") {
                return `<img src="${value}">`;
            }
            if (key === "简介") {
                return value.outerHTML;
            }
            if (key === "网址") {
                return `<a href="${value}">${value}</a>`;
            }
            return value;
        }
        async function initChapter(_book) {
            const chapters = _book.chapters;
            const n = Math.min(17, chapters.length);
            const _chapter = chapters[n];
            await _chapter.init();
            return _chapter;
        }
        function isSeenChapter(_chapter) {
            return _chapter.status === main_1.Status.finished;
        }
        function isChapterFailed(_chapter) {
            return _chapter.status === main_1.Status.failed;
        }
        Vue.onMounted(async () => {
            await initBook(setting_1.retryLimit);
            if (book) {
                const _chapter = await initChapter(book);
                Object.assign(chapter, _chapter);
                const _metaData = {
                    封面: book.additionalMetadate?.cover?.url ?? "",
                    题名: book.bookname ?? "None",
                    作者: book.author ?? "None",
                    网址: book.bookUrl,
                    简介: book.introductionHTML ?? "",
                };
                Object.assign(metaData, _metaData);
            }
        });
        return { metaData, getData, chapter, isSeenChapter, isChapterFailed };
    },
    template: TestUI_html_1.default,
});
exports.style = (0, createEl_1.createStyle)(TestUI_less_1.default);


/***/ }),

/***/ "./src/ui/button.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vm = exports.el = exports.style = void 0;
const Vue = __webpack_require__("vue");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const GM_1 = __webpack_require__("./src/lib/GM.ts");
const log_1 = __webpack_require__("./src/log.ts");
const download_1 = __webpack_require__("./src/router/download.ts");
const ui_1 = __webpack_require__("./src/router/ui.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const button_html_1 = __webpack_require__("./src/ui/button.html");
const button_less_1 = __webpack_require__("./src/ui/button.less");
const setting_2 = __webpack_require__("./src/ui/setting.ts");
exports.style = (0, createEl_1.createStyle)(button_less_1.default, "button-div-style");
exports.el = (0, createEl_1.createEl)("<div></div>");
exports.vm = Vue.createApp({
    data() {
        return {
            imgStart: setting_1.iconStart0,
            imgSetting: setting_1.iconSetting,
            isSettingSeen: GM_1._GM_info.scriptHandler !== "Greasemonkey",
            imgJump: setting_1.iconJump,
            uiObj: (0, ui_1.getUI)(),
        };
    },
    methods: {
        startButtonClick() {
            if (window.downloading) {
                alert("正在下载中，请耐心等待……");
                return;
            }
            const self = this;
            self.imgStart = setting_1.iconStart1;
            async function run() {
                const ruleClass = await (0, download_1.getRule)();
                await ruleClass.run();
            }
            run()
                .then(() => {
                self.imgStart = setting_1.iconStart0;
            })
                .catch((error) => log_1.log.error(error));
        },
        settingButtonClick() {
            setting_2.vm.openSetting();
        },
        jumpButtonClick() {
            this.uiObj.jumpFunction();
        },
    },
    template: button_html_1.default,
}).mount(exports.el);


/***/ }),

/***/ "./src/ui/dialog.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Vue = __webpack_require__("vue");
const dialog_css_1 = __webpack_require__("./src/ui/dialog.css");
const dialog_html_1 = __webpack_require__("./src/ui/dialog.html");
exports["default"] = Vue.defineCustomElement({
    name: "Dialog",
    props: {
        dialogTitle: String,
        status: String,
    },
    emits: ["dialogclose"],
    data() {
        return {
            myPrivateStatus: this.status === "true",
        };
    },
    methods: {
        dialogClose() {
            this.myPrivateStatus = false;
            this.$emit("dialogclose");
        },
    },
    mounted() {
        this.myPrivateStatus = this.status === "true";
    },
    watch: {
        status() {
            this.myPrivateStatus = this.status === "true";
        },
    },
    template: dialog_html_1.default,
    styles: [dialog_css_1.default],
});


/***/ }),

/***/ "./src/ui/fixVue.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Vue = __webpack_require__("vue");
const log_1 = __webpack_require__("./src/log.ts");
globalThis.Vue = Vue;
globalThis.Function = new Proxy(Function, {
    construct(target, args) {
        const code = args[args.length - 1];
        if (code.includes("Vue") && code.includes("_Vue")) {
            log_1.log.debug("Function hook:" + code);
            return hook();
        }
        else {
            return new target(...args);
        }
        function hook() {
            function getGlobalObjectKeys() {
                const _get = () => {
                    return Object.getOwnPropertyNames(window).filter((key) => window[key] === window);
                };
                const _f = new target(`return (${_get.toString()})()`);
                return _f();
            }
            const globalObjectKeys = getGlobalObjectKeys();
            const newArgs = [];
            newArgs.push(...globalObjectKeys);
            args[args.length - 1] = "with (window) {" + code + "}";
            newArgs.push(...args);
            const _newTarget = new target(...newArgs);
            const newTarget = new Proxy(_newTarget, {
                apply(targetI, thisArg, argumentsList) {
                    const newArgumentsList = [];
                    globalObjectKeys.forEach(() => newArgumentsList.push(window));
                    newArgumentsList.push(...argumentsList);
                    return Reflect.apply(targetI, window, newArgumentsList);
                },
            });
            return newTarget;
        }
    },
});


/***/ }),

/***/ "./src/ui/progress.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vm = exports.el = exports.style = void 0;
const Vue = __webpack_require__("vue");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const progress_css_1 = __webpack_require__("./src/ui/progress.css");
const progress_html_1 = __webpack_require__("./src/ui/progress.html");
exports.style = (0, createEl_1.createStyle)(progress_css_1.default);
exports.el = (0, createEl_1.createEl)(`<div id="progress-bar"></div>`);
exports.vm = Vue.createApp({
    data() {
        return {
            totalChapterNumber: 0,
            finishedChapterNumber: 0,
            zipPercent: 0,
        };
    },
    computed: {
        chapterPercent() {
            if (this.totalChapterNumber !== 0 && this.finishedChapterNumber !== 0) {
                return (this.finishedChapterNumber / this.totalChapterNumber) * 100;
            }
            else {
                return 0;
            }
        },
        chapterProgressSeen() {
            return this.chapterPercent !== 0;
        },
        zipProgressSeen() {
            return this.zipPercent !== 0;
        },
        ntProgressSeen() {
            if (this.chapterProgressSeen || this.zipProgressSeen) {
                return true;
            }
            else {
                return false;
            }
        },
        chapterProgressTitle() {
            return `章节：${this.finishedChapterNumber}/${this.totalChapterNumber}, ${this.chapterPercent}`;
        },
    },
    methods: {
        reset() {
            this.totalChapterNumber = 0;
            this.finishedChapterNumber = 0;
            this.zipPercent = 0;
        },
    },
    template: progress_html_1.default,
}).mount(exports.el);


/***/ }),

/***/ "./src/ui/setting.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vm = exports.el = exports.style = void 0;
const Vue = __webpack_require__("vue");
const debug_1 = __webpack_require__("./src/debug.ts");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_1 = __webpack_require__("./src/main.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const FilterTab_1 = __webpack_require__("./src/ui/FilterTab.ts");
const LogUI_1 = __webpack_require__("./src/ui/LogUI.ts");
const setting_css_1 = __webpack_require__("./src/ui/setting.css");
const setting_html_1 = __webpack_require__("./src/ui/setting.html");
const TestUI_1 = __webpack_require__("./src/ui/TestUI.ts");
exports.style = (0, createEl_1.createStyle)(setting_css_1.default);
exports.el = (0, createEl_1.createEl)(`<div id="setting"></div>`);
exports.vm = Vue.createApp({
    name: "nd-setting",
    components: { "filter-tab": FilterTab_1.default, "log-ui": LogUI_1.default, "test-ui": TestUI_1.default },
    setup(props, context) {
        const setting = Vue.reactive({});
        let settingBackup = {};
        const saveOptions = [
            { key: "null", value: "不使用自定义保存参数", options: {} },
            {
                key: "chapter_name",
                value: "将章节名称格式修改为 第xx章 xxxx",
                options: {
                    getchapterName: (chapter) => {
                        if (chapter.chapterName) {
                            return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
                        }
                        else {
                            return `第${chapter.chapterNumber.toString()}章`;
                        }
                    },
                },
            },
            {
                key: "txt_space",
                value: "txt文档每个自然段前加两个空格",
                options: {
                    genChapterText: (chapterName, contentText) => {
                        contentText = contentText
                            .split("\n")
                            .map((line) => {
                            if (line.trim() === "") {
                                return line;
                            }
                            else {
                                return line.replace(/^/, "    ");
                            }
                        })
                            .join("\n");
                        return `## ${chapterName}\n\n${contentText}\n\n`;
                    },
                },
            },
            {
                key: "reverse_chapters",
                value: "保存章节时倒序排列",
                options: {
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
                    },
                },
            },
        ];
        setting.enableDebug = setting_1.enableDebug.value;
        setting.chooseSaveOption = "null";
        setting.enableTestPage = false;
        const curSaveOption = () => {
            const _s = saveOptions.find((s) => s.key === setting.chooseSaveOption);
            if (_s) {
                return _s.options;
            }
            else {
                return saveOptions[0].options;
            }
        };
        const saveFilter = (filterSetting) => {
            setting.filterSetting = (0, misc_1.deepcopy)(filterSetting);
        };
        const getFilterSetting = () => {
            if (setting.filterSetting) {
                return setting.filterSetting;
            }
            else {
                return;
            }
        };
        Vue.provide("getFilterSetting", getFilterSetting);
        const setConfig = (config) => {
            setEnableDebug();
            setCustomSaveOption();
            setCustomFilter();
            function setEnableDebug() {
                if (typeof config.enableDebug === "boolean") {
                    config.enableDebug ? log_1.log.setLevel("trace") : log_1.log.setLevel("info");
                    setting_1.enableDebug.value = config.enableDebug;
                    if (config.enableDebug) {
                        (0, debug_1.debug)();
                    }
                    log_1.log.info(`[Init]enableDebug: ${setting_1.enableDebug.value}`);
                }
            }
            function setCustomSaveOption() {
                unsafeWindow.saveOptions = curSaveOption();
            }
            function setCustomFilter() {
                if (config.filterSetting) {
                    if (config.filterSetting.filterType === "null") {
                        unsafeWindow.chapterFilter = undefined;
                    }
                    else {
                        const filterFunction = (0, FilterTab_1.getFilterFunction)(config.filterSetting.arg, config.filterSetting.functionBody);
                        if (filterFunction) {
                            const chapterFilter = (chapter) => {
                                if (chapter.status === main_1.Status.aborted) {
                                    return false;
                                }
                                return filterFunction(chapter);
                            };
                            unsafeWindow.chapterFilter = chapterFilter;
                        }
                    }
                }
            }
        };
        const openStatus = Vue.ref("false");
        const currentTab = Vue.ref("tab-1");
        const openSetting = () => {
            settingBackup = (0, misc_1.deepcopy)(setting);
            openStatus.value = "true";
        };
        const closeSetting = (keep) => {
            if (keep === true) {
                settingBackup = (0, misc_1.deepcopy)(setting);
            }
            else {
                Object.assign(setting, settingBackup);
            }
            openStatus.value = "false";
        };
        const closeAndSaveSetting = async () => {
            closeSetting(true);
            await (0, misc_1.sleep)(30);
            setConfig((0, misc_1.deepcopy)(setting));
            log_1.log.info("[Init]自定义设置：" + JSON.stringify(setting));
        };
        return {
            openStatus,
            currentTab,
            openSetting,
            closeSetting,
            closeAndSaveSetting,
            saveFilter,
            setting,
            saveOptions,
        };
    },
    template: setting_html_1.default,
}).mount(exports.el);


/***/ }),

/***/ "./src/ui/ui.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
const button_1 = __webpack_require__("./src/ui/button.ts");
const ChapterList_1 = __webpack_require__("./src/ui/ChapterList.ts");
const dialog_1 = __webpack_require__("./src/ui/dialog.ts");
const FilterTab_1 = __webpack_require__("./src/ui/FilterTab.ts");
const progress_1 = __webpack_require__("./src/ui/progress.ts");
const setting_1 = __webpack_require__("./src/ui/setting.ts");
const TestUI_1 = __webpack_require__("./src/ui/TestUI.ts");
function register() {
    customElements.define("dialog-ui", dialog_1.default);
}
function init() {
    register();
    document.body.appendChild(button_1.el);
    document.body.appendChild(progress_1.el);
    document.body.appendChild(setting_1.el);
    document.head.appendChild(button_1.style);
    document.head.appendChild(progress_1.style);
    document.head.appendChild(setting_1.style);
    document.head.appendChild(FilterTab_1.style);
    document.head.appendChild(ChapterList_1.style);
    document.head.appendChild(TestUI_1.style);
}
exports.init = init;


/***/ }),

/***/ "crypto-js":
/***/ ((module) => {

"use strict";
module.exports = CryptoJS;

/***/ }),

/***/ "vue":
/***/ ((module) => {

"use strict";
module.exports = Vue;

/***/ }),

/***/ "fflate":
/***/ ((module) => {

"use strict";
module.exports = fflate;

/***/ }),

/***/ "idb-keyval":
/***/ ((module) => {

"use strict";
module.exports = idbKeyval;

/***/ }),

/***/ "loglevel":
/***/ ((module) => {

"use strict";
module.exports = log;

/***/ }),

/***/ "nunjucks":
/***/ ((module) => {

"use strict";
module.exports = nunjucks;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const debug_1 = __webpack_require__("./src/debug.ts");
const detect_1 = __webpack_require__("./src/detect.ts");
const global_1 = __webpack_require__("./src/global.ts");
const log_1 = __webpack_require__("./src/log.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
__webpack_require__("./src/ui/fixVue.ts");
const ui_1 = __webpack_require__("./src/ui/ui.ts");
function printEnvironments() {
    log_1.log.info("[Init]开始载入小说下载器……");
    Object.entries(detect_1.environments).forEach((kv) => log_1.log.info("[Init]" + kv.join("：")));
}
function main() {
    printEnvironments();
    (0, global_1.init)();
    (0, ui_1.init)();
    if (setting_1.enableDebug.value) {
        setTimeout(debug_1.debug, 3000);
    }
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", (event) => {
        main();
    });
}
else {
    main();
}

})();

/******/ })()
;