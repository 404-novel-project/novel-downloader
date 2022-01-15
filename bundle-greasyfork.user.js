// ==UserScript==
// @name           小说下载器
// @version        4.8.2.527
// @author         bgme
// @description    一个可扩展的通用型小说下载器。
// @supportURL     https://github.com/yingziwu/novel-downloader
// @match          *://www.ciweimao.com/chapter-list/*
// @match          *://www.ciweimao.com/book/*
// @match          *://book.sfacg.com/Novel/*/MainIndex/
// @match          *://book.sfacg.com/Novel/*/
// @match          *://m.sfacg.com/b/*/
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
// @match          *://wap.shuquge.com/s/*.html
// @match          *://wap.shuquge.com/d/*.html
// @match          *://www.sizhicn.com/txt/*/index.html
// @match          *://www.dingdiann.net/ddk*/
// @match          *://www.xkzw.org/xkzw*/
// @match          *://www.lewenn.com/lw*/
// @match          *://www.klxs.la/info-*/
// @match          *://www.266ks.com/*_*/
// @match          *://www.266ks.com/*_*/index*.html
// @match          *://www.hetushu.com/book/*/index.html
// @match          *://hetushu.com/book/*/index.html
// @match          *://www.shouda88.com/*/
// @match          *://www.gebiqu.com/biquge_*/
// @match          *://www.viviyzw.com/book*.html
// @match          *://www.1pwx.com/*.htm
// @match          *://www.81book.com/book/*/
// @match          *://www.81zw.com/book/*/
// @match          *://m.yuzhaige.cc/*/*/
// @match          *://m.yushuge123.com/*/*/
// @match          *://www.xinwanben.com/*/
// @match          *://m.xinwanben.com/*/
// @match          *://www.idejian.com/book/*/
// @match          *://www.wenku8.net/novel/*/*/index.htm
// @match          *://www.dmzj.com/info/*.html
// @match          *://manhua.dmzj.com/*
// @match          *://www.westnovel.com/*/*/
// @match          *://www.mht99.com/*/
// @match          *://www.bz01.org/*_*/
// @match          *://www.banzhuer.org/*_*/
// @match          *://www.xbiquge.so/book/*/
// @match          *://www.hongyeshuzhai.com/shuzhai/*/
// @match          *://www.linovelib.com/novel/*/catalog
// @match          *://www.luoqiuzw.com/book/*/
// @match          *://www.yibige.cc/*/
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
// @match          *://ebook.longmabook.com/*
// @match          *://www.longmabookcn.com/*
// @match          *://ebook.lmbooks.com/*
// @match          *://www.lmebooks.com/*
// @match          *://www.haitbook.com/*
// @match          *://www.htwhbook.com/*
// @match          *://www.myhtebook.com/*
// @match          *://www.lovehtbooks.com/*
// @match          *://www.myhtebooks.com/*
// @match          *://www.myhtlmebook.com/*
// @match          *://jp.myhtebook.com/*
// @match          *://jp.myhtlmebook.com/*
// @match          *://ebook.urhtbooks.com/*
// @match          *://www.urhtbooks.com/*
// @match          *://www.newhtbook.com/*
// @match          *://www.lvhtebook.com/*
// @match          *://jp.lvhtebook.com/*
// @match          *://www.htlvbooks.com/*
// @match          *://dijiubook.net/*_*
// @match          *://www.biquwx.la/*_*/
// @match          *://www.25zw.com/*/
// @match          *://www.tycqxs.com/*_*/
// @match          *://www.kanunu8.com/*
// @match          *://www.ciyuanji.com/bookDetails/*
// @match          *://ciyuanji.com/bookDetails/*
// @match          *://m.wanben.org/*/
// @match          *://www.wanben.org/*/
// @match          *://www.ranwen.la/files/article/*/*/
// @match          *://www.washuge.com/books/*/*/
// @match          *://m.baihexs.com/info-*/
// @match          *://www.quanshuzhai.com/book/*.html
// @match          *://masiro.me/admin/novelView?novel_id=*
// @match          *://www.pixiv.net/novel/show.php?*
// @match          *://www.pixiv.net/novel/series/*
// @match          *://kakuyomu.jp/works/*
// @match          *://ncode.syosetu.com/*/
// @match          *://ncode.syosetu.com/*
// @match          *://novel18.syosetu.com/*/
// @match          *://novel18.syosetu.com/*
// @match          *://syosetu.org/novel/*/
// @match          *://houhuayuan.xyz/*
// @match          *://zhaoze.art/*/
// @match          *://www.myrics.com/novels/*
// @match          *://m.lusetxt.com/ebook/*.html
// @match          *://www.lstxt.cc/ebook/*.html
// @match          *://www.a7xs.com/*/*/
// @match          *://www.shencou.com/books/read_*.html
// @match          *://www.tianyabooks.com/*/*/
// @match          *://www.aixiawx.com/*/*/
// @match          *://jingcaiyuedu6.com/novel/*.html
// @match          *://www.hanwujinian.com/book/*
// @match          *://www.biqu55.com/*_*/
// @match          *://manga.bilibili.com/detail/mc*
// @match          *://www.aixdzs.com/novel/*
// @match          *://www.liuxs.la/bookinfo-*/
// @match          *://www.cool18.com/bbs4/index.php?*
// @match          *://www.b5200.net/*_*/
// @match          *://www.yqxs.cc/html/*/*/index.html
// @match          *://www.dushu369.com/*/*/
// @match          *://www.18kanshu.com/*/*/info.html
// @match          *://www.18kanshu.com/module/novel/info.php?*
// @match          *://www.bxwx333.org/txt/*/
// @match          *://www.xiaoshuowu.com/html/*/*/
// @match          *://www.xrzww.com/bookdetail/*
// @match          *://colorful-fantasybooks.com/module/novel/info.php?*
// @name:en        novel-downloader
// @name:ja        小説ダウンローダー
// @description:en An scalable universal novel downloader.
// @description:ja スケーラブルなユニバーサル小説ダウンローダー。
// @namespace      https://blog.bgme.me
// @homepageURL    https://github.com/yingziwu/novel-downloader
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
// @exclude        *://m.haitangtxt.net/tag/*/
// @exclude        *://m.haitangtxt.net/sort/*/
// @exclude        *://m.haitangtxt.net/top/*/
// @exclude        *://m.haitangtxt.net/full/*/
// @exclude        *://m.haitangtxt.net/book/*/
// @exclude        *://www.linovel.net/book/*/*.html
// @exclude        *://www.qimao.com/shuku/*-*/
// @exclude        *://www.trxs.cc/tongren/*/*.html
// @exclude        *://www.trxs123.com/tongren/*/*.html
// @exclude        *://www.tongrenquan.org/tongren/*/*.html
// @exclude        *://tongrenquan.org/tongren/*/*.html
// @exclude        *://www.jpxs123.com/*/*/*.html
// @exclude        *://www.25zw.com/lastupdate/
// @exclude        *://www.25zw.com/postdate/
// @exclude        *://www.25zw.com/monthvisit/
// @exclude        *://www.25zw.com/goodnum/
// @exclude        *://www.25zw.com/goodnew/
// @exclude        *://www.myrics.com/novels/*/chapters/*
// @exclude        *://dijiubook.net/*_*/*.html
// @exclude        *://ncode.syosetu.com/*/*/
// @exclude        *://novel18.syosetu.com/*/*/
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
// @connect        ciyuanji.com
// @connect        wanben.org
// @connect        baihexs.com
// @connect        masiro.me
// @connect        pximg.net
// @connect        mitemin.net
// @connect        myrics.com
// @connect        a7xs.com
// @connect        jingcaiyuedu6.com
// @connect        aixdzs.com
// @connect        b5200.net
// @connect        xrzww.com
// @connect        *
// @require        https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.js#sha512-NQVmLzNy4Lr5QTrmXvq/WzTMUnRHmv7nyIT/M6LyGPBS+TIeRxZ+YQaqWxjpRpvRMQSuYPQURZz/+pLi81xXeA==
// @require        https://cdn.jsdelivr.net/npm/fflate@0.7.2/umd/index.js#sha512-b4i2Ut2Tho5Qrzt3pWKCkt9Q+4ECSNPdX0JsVzudNFXR2kIbV0ndgkm3fDlGvp2A6JG9tcH3ND38y+y0DrM/jQ==
// @require        https://cdn.jsdelivr.net/npm/idb-keyval@6.0.3/dist/umd.js#sha512-+PXdWKx8apEQ52dxoVrQIwhLZj96Gde37eq+CXYQvG059IC5VF+nQ1DvD3JKqUVPL0k+TAJ8DDunVXjzKrlrHg==
// @require        https://cdn.jsdelivr.net/npm/loglevel@1.8.0/lib/loglevel.js#sha512-95U0EjHdDBH1jc1rMsOaY4CV3tVISgHr+7i5rFVvhWDRbsj2o0RlEdWMmDmQzoR8lJV7/6VbPZT6c3pQvkW+0Q==
// @require        https://cdn.jsdelivr.net/npm/nunjucks@3.2.3/browser/nunjucks.min.js#sha512-Uj8C5szr1tnKPNZb6ps5gFYtTGskzsUCiwY35QP/s2JIExZl7iYNletcmOJ8D6ocuaMRi9JGVrWRePaX9raujA==
// @require        https://cdn.jsdelivr.net/npm/vue@3.2.26/dist/vue.global.prod.js#sha512-IBbcf9iFu71zDGm4uuX3WOKuWTBZSFOaj9YWTZzCytQ15Ku3MfyOxxeJWQBwOOI/Fbc80FLXEFKrfMjj6MAw+Q==
// @downloadURL    https://github.com/yingziwu/novel-downloader/raw/gh-pages/bundle-greasyfork.user.js
// @updateURL      https://github.com/yingziwu/novel-downloader/raw/gh-pages/bundle-greasyfork.meta.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@mozilla/readability/Readability-readerable.js":
/***/ ((module) => {

/* eslint-env es6:false */
/*
 * Copyright (c) 2010 Arc90 Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This code is heavily based on Arc90's readability.js (1.7.1) script
 * available at: http://code.google.com/p/arc90labs-readability
 */

var REGEXPS = {
  // NOTE: These two regular expressions are duplicated in
  // Readability.js. Please keep both copies in sync.
  unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
  okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
};

function isNodeVisible(node) {
  // Have to null-check node.style and node.className.indexOf to deal with SVG and MathML nodes.
  return (!node.style || node.style.display != "none")
    && !node.hasAttribute("hidden")
    //check for "fallback-image" so that wikimedia math images are displayed
    && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || (node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1));
}

/**
 * Decides whether or not the document is reader-able without parsing the whole thing.
 * @param {Object} options Configuration object.
 * @param {number} [options.minContentLength=140] The minimum node content length used to decide if the document is readerable.
 * @param {number} [options.minScore=20] The minumum cumulated 'score' used to determine if the document is readerable.
 * @param {Function} [options.visibilityChecker=isNodeVisible] The function used to determine if a node is visible.
 * @return {boolean} Whether or not we suspect Readability.parse() will suceeed at returning an article object.
 */
function isProbablyReaderable(doc, options = {}) {
  // For backward compatibility reasons 'options' can either be a configuration object or the function used
  // to determine if a node is visible.
  if (typeof options == "function") {
    options = { visibilityChecker: options };
  }

  var defaultOptions = { minScore: 20, minContentLength: 140, visibilityChecker: isNodeVisible };
  options = Object.assign(defaultOptions, options);

  var nodes = doc.querySelectorAll("p, pre");

  // Get <div> nodes which have <br> node(s) and append them into the `nodes` variable.
  // Some articles' DOM structures might look like
  // <div>
  //   Sentences<br>
  //   <br>
  //   Sentences<br>
  // </div>
  var brNodes = doc.querySelectorAll("div > br");
  if (brNodes.length) {
    var set = new Set(nodes);
    [].forEach.call(brNodes, function (node) {
      set.add(node.parentNode);
    });
    nodes = Array.from(set);
  }

  var score = 0;
  // This is a little cheeky, we use the accumulator 'score' to decide what to return from
  // this callback:
  return [].some.call(nodes, function (node) {
    if (!options.visibilityChecker(node)) {
      return false;
    }

    var matchString = node.className + " " + node.id;
    if (REGEXPS.unlikelyCandidates.test(matchString) &&
        !REGEXPS.okMaybeItsACandidate.test(matchString)) {
      return false;
    }

    if (node.matches("li p")) {
      return false;
    }

    var textContentLength = node.textContent.trim().length;
    if (textContentLength < options.minContentLength) {
      return false;
    }

    score += Math.sqrt(textContentLength - options.minContentLength);

    if (score > options.minScore) {
      return true;
    }
    return false;
  });
}

if (true) {
  module.exports = isProbablyReaderable;
}


/***/ }),

/***/ "./node_modules/@mozilla/readability/Readability.js":
/***/ ((module) => {

/*eslint-env es6:false*/
/*
 * Copyright (c) 2010 Arc90 Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This code is heavily based on Arc90's readability.js (1.7.1) script
 * available at: http://code.google.com/p/arc90labs-readability
 */

/**
 * Public constructor.
 * @param {HTMLDocument} doc     The document to parse.
 * @param {Object}       options The options object.
 */
function Readability(doc, options) {
  // In some older versions, people passed a URI as the first argument. Cope:
  if (options && options.documentElement) {
    doc = options;
    options = arguments[2];
  } else if (!doc || !doc.documentElement) {
    throw new Error("First argument to Readability constructor should be a document object.");
  }
  options = options || {};

  this._doc = doc;
  this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
  this._articleTitle = null;
  this._articleByline = null;
  this._articleDir = null;
  this._articleSiteName = null;
  this._attempts = [];

  // Configurable options
  this._debug = !!options.debug;
  this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
  this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
  this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
  this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
  this._keepClasses = !!options.keepClasses;
  this._serializer = options.serializer || function(el) {
    return el.innerHTML;
  };
  this._disableJSONLD = !!options.disableJSONLD;

  // Start with all flags set
  this._flags = this.FLAG_STRIP_UNLIKELYS |
                this.FLAG_WEIGHT_CLASSES |
                this.FLAG_CLEAN_CONDITIONALLY;


  // Control whether log messages are sent to the console
  if (this._debug) {
    let logNode = function(node) {
      if (node.nodeType == node.TEXT_NODE) {
        return `${node.nodeName} ("${node.textContent}")`;
      }
      let attrPairs = Array.from(node.attributes || [], function(attr) {
        return `${attr.name}="${attr.value}"`;
      }).join(" ");
      return `<${node.localName} ${attrPairs}>`;
    };
    this.log = function () {
      if (typeof dump !== "undefined") {
        var msg = Array.prototype.map.call(arguments, function(x) {
          return (x && x.nodeName) ? logNode(x) : x;
        }).join(" ");
        dump("Reader: (Readability) " + msg + "\n");
      } else if (typeof console !== "undefined") {
        let args = Array.from(arguments, arg => {
          if (arg && arg.nodeType == this.ELEMENT_NODE) {
            return logNode(arg);
          }
          return arg;
        });
        args.unshift("Reader: (Readability)");
        console.log.apply(console, args);
      }
    };
  } else {
    this.log = function () {};
  }
}

Readability.prototype = {
  FLAG_STRIP_UNLIKELYS: 0x1,
  FLAG_WEIGHT_CLASSES: 0x2,
  FLAG_CLEAN_CONDITIONALLY: 0x4,

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,

  // Max number of nodes supported by this parser. Default: 0 (no limit)
  DEFAULT_MAX_ELEMS_TO_PARSE: 0,

  // The number of top candidates to consider when analysing how
  // tight the competition is among candidates.
  DEFAULT_N_TOP_CANDIDATES: 5,

  // Element tags to score by default.
  DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),

  // The default number of chars an article must have in order to return a result
  DEFAULT_CHAR_THRESHOLD: 500,

  // All of the regular expressions in use within readability.
  // Defined up here so we don't instantiate them repeatedly in loops.
  REGEXPS: {
    // NOTE: These two regular expressions are duplicated in
    // Readability-readerable.js. Please keep both copies in sync.
    unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
    okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,

    positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
    negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
    extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
    byline: /byline|author|dateline|writtenby|p-author/i,
    replaceFonts: /<(\/?)font[^>]*>/gi,
    normalize: /\s{2,}/g,
    videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
    shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
    nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
    prevLink: /(prev|earl|old|new|<|«)/i,
    tokenize: /\W+/g,
    whitespace: /^\s*$/,
    hasContent: /\S$/,
    hashUrl: /^#.+/,
    srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
    b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
    // See: https://schema.org/Article
    jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/
  },

  UNLIKELY_ROLES: [ "menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog" ],

  DIV_TO_P_ELEMS: new Set([ "BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL" ]),

  ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],

  PRESENTATIONAL_ATTRIBUTES: [ "align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace" ],

  DEPRECATED_SIZE_ATTRIBUTE_ELEMS: [ "TABLE", "TH", "TD", "HR", "PRE" ],

  // The commented out elements qualify as phrasing content but tend to be
  // removed by readability when put into paragraphs, so we ignore them here.
  PHRASING_ELEMS: [
    // "CANVAS", "IFRAME", "SVG", "VIDEO",
    "ABBR", "AUDIO", "B", "BDO", "BR", "BUTTON", "CITE", "CODE", "DATA",
    "DATALIST", "DFN", "EM", "EMBED", "I", "IMG", "INPUT", "KBD", "LABEL",
    "MARK", "MATH", "METER", "NOSCRIPT", "OBJECT", "OUTPUT", "PROGRESS", "Q",
    "RUBY", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN", "STRONG", "SUB",
    "SUP", "TEXTAREA", "TIME", "VAR", "WBR"
  ],

  // These are the classes that readability sets itself.
  CLASSES_TO_PRESERVE: [ "page" ],

  // These are the list of HTML entities that need to be escaped.
  HTML_ESCAPE_MAP: {
    "lt": "<",
    "gt": ">",
    "amp": "&",
    "quot": '"',
    "apos": "'",
  },

  /**
   * Run any post-process modifications to article content as necessary.
   *
   * @param Element
   * @return void
  **/
  _postProcessContent: function(articleContent) {
    // Readability cannot open relative uris so we convert them to absolute uris.
    this._fixRelativeUris(articleContent);

    this._simplifyNestedElements(articleContent);

    if (!this._keepClasses) {
      // Remove classes.
      this._cleanClasses(articleContent);
    }
  },

  /**
   * Iterates over a NodeList, calls `filterFn` for each node and removes node
   * if function returned `true`.
   *
   * If function is not passed, removes all the nodes in node list.
   *
   * @param NodeList nodeList The nodes to operate on
   * @param Function filterFn the function to use as a filter
   * @return void
   */
  _removeNodes: function(nodeList, filterFn) {
    // Avoid ever operating on live node lists.
    if (this._docJSDOMParser && nodeList._isLiveNodeList) {
      throw new Error("Do not pass live node lists to _removeNodes");
    }
    for (var i = nodeList.length - 1; i >= 0; i--) {
      var node = nodeList[i];
      var parentNode = node.parentNode;
      if (parentNode) {
        if (!filterFn || filterFn.call(this, node, i, nodeList)) {
          parentNode.removeChild(node);
        }
      }
    }
  },

  /**
   * Iterates over a NodeList, and calls _setNodeTag for each node.
   *
   * @param NodeList nodeList The nodes to operate on
   * @param String newTagName the new tag name to use
   * @return void
   */
  _replaceNodeTags: function(nodeList, newTagName) {
    // Avoid ever operating on live node lists.
    if (this._docJSDOMParser && nodeList._isLiveNodeList) {
      throw new Error("Do not pass live node lists to _replaceNodeTags");
    }
    for (const node of nodeList) {
      this._setNodeTag(node, newTagName);
    }
  },

  /**
   * Iterate over a NodeList, which doesn't natively fully implement the Array
   * interface.
   *
   * For convenience, the current object context is applied to the provided
   * iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return void
   */
  _forEachNode: function(nodeList, fn) {
    Array.prototype.forEach.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, and return the first node that passes
   * the supplied test function
   *
   * For convenience, the current object context is applied to the provided
   * test function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The test function.
   * @return void
   */
  _findNode: function(nodeList, fn) {
    return Array.prototype.find.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, return true if any of the provided iterate
   * function calls returns true, false otherwise.
   *
   * For convenience, the current object context is applied to the
   * provided iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return Boolean
   */
  _someNode: function(nodeList, fn) {
    return Array.prototype.some.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, return true if all of the provided iterate
   * function calls return true, false otherwise.
   *
   * For convenience, the current object context is applied to the
   * provided iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return Boolean
   */
  _everyNode: function(nodeList, fn) {
    return Array.prototype.every.call(nodeList, fn, this);
  },

  /**
   * Concat all nodelists passed as arguments.
   *
   * @return ...NodeList
   * @return Array
   */
  _concatNodeLists: function() {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments);
    var nodeLists = args.map(function(list) {
      return slice.call(list);
    });
    return Array.prototype.concat.apply([], nodeLists);
  },

  _getAllNodesWithTag: function(node, tagNames) {
    if (node.querySelectorAll) {
      return node.querySelectorAll(tagNames.join(","));
    }
    return [].concat.apply([], tagNames.map(function(tag) {
      var collection = node.getElementsByTagName(tag);
      return Array.isArray(collection) ? collection : Array.from(collection);
    }));
  },

  /**
   * Removes the class="" attribute from every element in the given
   * subtree, except those that match CLASSES_TO_PRESERVE and
   * the classesToPreserve array from the options object.
   *
   * @param Element
   * @return void
   */
  _cleanClasses: function(node) {
    var classesToPreserve = this._classesToPreserve;
    var className = (node.getAttribute("class") || "")
      .split(/\s+/)
      .filter(function(cls) {
        return classesToPreserve.indexOf(cls) != -1;
      })
      .join(" ");

    if (className) {
      node.setAttribute("class", className);
    } else {
      node.removeAttribute("class");
    }

    for (node = node.firstElementChild; node; node = node.nextElementSibling) {
      this._cleanClasses(node);
    }
  },

  /**
   * Converts each <a> and <img> uri in the given element to an absolute URI,
   * ignoring #ref URIs.
   *
   * @param Element
   * @return void
   */
  _fixRelativeUris: function(articleContent) {
    var baseURI = this._doc.baseURI;
    var documentURI = this._doc.documentURI;
    function toAbsoluteURI(uri) {
      // Leave hash links alone if the base URI matches the document URI:
      if (baseURI == documentURI && uri.charAt(0) == "#") {
        return uri;
      }

      // Otherwise, resolve against base URI:
      try {
        return new URL(uri, baseURI).href;
      } catch (ex) {
        // Something went wrong, just return the original:
      }
      return uri;
    }

    var links = this._getAllNodesWithTag(articleContent, ["a"]);
    this._forEachNode(links, function(link) {
      var href = link.getAttribute("href");
      if (href) {
        // Remove links with javascript: URIs, since
        // they won't work after scripts have been removed from the page.
        if (href.indexOf("javascript:") === 0) {
          // if the link only contains simple text content, it can be converted to a text node
          if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
            var text = this._doc.createTextNode(link.textContent);
            link.parentNode.replaceChild(text, link);
          } else {
            // if the link has multiple children, they should all be preserved
            var container = this._doc.createElement("span");
            while (link.childNodes.length > 0) {
              container.appendChild(link.childNodes[0]);
            }
            link.parentNode.replaceChild(container, link);
          }
        } else {
          link.setAttribute("href", toAbsoluteURI(href));
        }
      }
    });

    var medias = this._getAllNodesWithTag(articleContent, [
      "img", "picture", "figure", "video", "audio", "source"
    ]);

    this._forEachNode(medias, function(media) {
      var src = media.getAttribute("src");
      var poster = media.getAttribute("poster");
      var srcset = media.getAttribute("srcset");

      if (src) {
        media.setAttribute("src", toAbsoluteURI(src));
      }

      if (poster) {
        media.setAttribute("poster", toAbsoluteURI(poster));
      }

      if (srcset) {
        var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, function(_, p1, p2, p3) {
          return toAbsoluteURI(p1) + (p2 || "") + p3;
        });

        media.setAttribute("srcset", newSrcset);
      }
    });
  },

  _simplifyNestedElements: function(articleContent) {
    var node = articleContent;

    while (node) {
      if (node.parentNode && ["DIV", "SECTION"].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
        if (this._isElementWithoutContent(node)) {
          node = this._removeAndGetNext(node);
          continue;
        } else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
          var child = node.children[0];
          for (var i = 0; i < node.attributes.length; i++) {
            child.setAttribute(node.attributes[i].name, node.attributes[i].value);
          }
          node.parentNode.replaceChild(child, node);
          node = child;
          continue;
        }
      }

      node = this._getNextNode(node);
    }
  },

  /**
   * Get the article title as an H1.
   *
   * @return string
   **/
  _getArticleTitle: function() {
    var doc = this._doc;
    var curTitle = "";
    var origTitle = "";

    try {
      curTitle = origTitle = doc.title.trim();

      // If they had an element with id "title" in their HTML
      if (typeof curTitle !== "string")
        curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
    } catch (e) {/* ignore exceptions setting the title. */}

    var titleHadHierarchicalSeparators = false;
    function wordCount(str) {
      return str.split(/\s+/).length;
    }

    // If there's a separator in the title, first remove the final part
    if ((/ [\|\-\\\/>»] /).test(curTitle)) {
      titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
      curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");

      // If the resulting title is too short (3 words or fewer), remove
      // the first part instead:
      if (wordCount(curTitle) < 3)
        curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
    } else if (curTitle.indexOf(": ") !== -1) {
      // Check if we have an heading containing this exact string, so we
      // could assume it's the full title.
      var headings = this._concatNodeLists(
        doc.getElementsByTagName("h1"),
        doc.getElementsByTagName("h2")
      );
      var trimmedTitle = curTitle.trim();
      var match = this._someNode(headings, function(heading) {
        return heading.textContent.trim() === trimmedTitle;
      });

      // If we don't, let's extract the title out of the original title string.
      if (!match) {
        curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);

        // If the title is now too short, try the first colon instead:
        if (wordCount(curTitle) < 3) {
          curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
          // But if we have too many words before the colon there's something weird
          // with the titles and the H tags so let's just use the original title instead
        } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
          curTitle = origTitle;
        }
      }
    } else if (curTitle.length > 150 || curTitle.length < 15) {
      var hOnes = doc.getElementsByTagName("h1");

      if (hOnes.length === 1)
        curTitle = this._getInnerText(hOnes[0]);
    }

    curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
    // If we now have 4 words or fewer as our title, and either no
    // 'hierarchical' separators (\, /, > or ») were found in the original
    // title or we decreased the number of words by more than 1 word, use
    // the original title.
    var curTitleWordCount = wordCount(curTitle);
    if (curTitleWordCount <= 4 &&
        (!titleHadHierarchicalSeparators ||
         curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
      curTitle = origTitle;
    }

    return curTitle;
  },

  /**
   * Prepare the HTML document for readability to scrape it.
   * This includes things like stripping javascript, CSS, and handling terrible markup.
   *
   * @return void
   **/
  _prepDocument: function() {
    var doc = this._doc;

    // Remove all style tags in head
    this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));

    if (doc.body) {
      this._replaceBrs(doc.body);
    }

    this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
  },

  /**
   * Finds the next node, starting from the given node, and ignoring
   * whitespace in between. If the given node is an element, the same node is
   * returned.
   */
  _nextNode: function (node) {
    var next = node;
    while (next
        && (next.nodeType != this.ELEMENT_NODE)
        && this.REGEXPS.whitespace.test(next.textContent)) {
      next = next.nextSibling;
    }
    return next;
  },

  /**
   * Replaces 2 or more successive <br> elements with a single <p>.
   * Whitespace between <br> elements are ignored. For example:
   *   <div>foo<br>bar<br> <br><br>abc</div>
   * will become:
   *   <div>foo<br>bar<p>abc</p></div>
   */
  _replaceBrs: function (elem) {
    this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function(br) {
      var next = br.nextSibling;

      // Whether 2 or more <br> elements have been found and replaced with a
      // <p> block.
      var replaced = false;

      // If we find a <br> chain, remove the <br>s until we hit another node
      // or non-whitespace. This leaves behind the first <br> in the chain
      // (which will be replaced with a <p> later).
      while ((next = this._nextNode(next)) && (next.tagName == "BR")) {
        replaced = true;
        var brSibling = next.nextSibling;
        next.parentNode.removeChild(next);
        next = brSibling;
      }

      // If we removed a <br> chain, replace the remaining <br> with a <p>. Add
      // all sibling nodes as children of the <p> until we hit another <br>
      // chain.
      if (replaced) {
        var p = this._doc.createElement("p");
        br.parentNode.replaceChild(p, br);

        next = p.nextSibling;
        while (next) {
          // If we've hit another <br><br>, we're done adding children to this <p>.
          if (next.tagName == "BR") {
            var nextElem = this._nextNode(next.nextSibling);
            if (nextElem && nextElem.tagName == "BR")
              break;
          }

          if (!this._isPhrasingContent(next))
            break;

          // Otherwise, make this node a child of the new <p>.
          var sibling = next.nextSibling;
          p.appendChild(next);
          next = sibling;
        }

        while (p.lastChild && this._isWhitespace(p.lastChild)) {
          p.removeChild(p.lastChild);
        }

        if (p.parentNode.tagName === "P")
          this._setNodeTag(p.parentNode, "DIV");
      }
    });
  },

  _setNodeTag: function (node, tag) {
    this.log("_setNodeTag", node, tag);
    if (this._docJSDOMParser) {
      node.localName = tag.toLowerCase();
      node.tagName = tag.toUpperCase();
      return node;
    }

    var replacement = node.ownerDocument.createElement(tag);
    while (node.firstChild) {
      replacement.appendChild(node.firstChild);
    }
    node.parentNode.replaceChild(replacement, node);
    if (node.readability)
      replacement.readability = node.readability;

    for (var i = 0; i < node.attributes.length; i++) {
      try {
        replacement.setAttribute(node.attributes[i].name, node.attributes[i].value);
      } catch (ex) {
        /* it's possible for setAttribute() to throw if the attribute name
         * isn't a valid XML Name. Such attributes can however be parsed from
         * source in HTML docs, see https://github.com/whatwg/html/issues/4275,
         * so we can hit them here and then throw. We don't care about such
         * attributes so we ignore them.
         */
      }
    }
    return replacement;
  },

  /**
   * Prepare the article node for display. Clean out any inline styles,
   * iframes, forms, strip extraneous <p> tags, etc.
   *
   * @param Element
   * @return void
   **/
  _prepArticle: function(articleContent) {
    this._cleanStyles(articleContent);

    // Check for data tables before we continue, to avoid removing items in
    // those tables, which will often be isolated even though they're
    // visually linked to other content-ful elements (text, images, etc.).
    this._markDataTables(articleContent);

    this._fixLazyImages(articleContent);

    // Clean out junk from the article content
    this._cleanConditionally(articleContent, "form");
    this._cleanConditionally(articleContent, "fieldset");
    this._clean(articleContent, "object");
    this._clean(articleContent, "embed");
    this._clean(articleContent, "footer");
    this._clean(articleContent, "link");
    this._clean(articleContent, "aside");

    // Clean out elements with little content that have "share" in their id/class combinations from final top candidates,
    // which means we don't remove the top candidates even they have "share".

    var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;

    this._forEachNode(articleContent.children, function (topCandidate) {
      this._cleanMatchedNodes(topCandidate, function (node, matchString) {
        return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
      });
    });

    this._clean(articleContent, "iframe");
    this._clean(articleContent, "input");
    this._clean(articleContent, "textarea");
    this._clean(articleContent, "select");
    this._clean(articleContent, "button");
    this._cleanHeaders(articleContent);

    // Do these last as the previous stuff may have removed junk
    // that will affect these
    this._cleanConditionally(articleContent, "table");
    this._cleanConditionally(articleContent, "ul");
    this._cleanConditionally(articleContent, "div");

    // replace H1 with H2 as H1 should be only title that is displayed separately
    this._replaceNodeTags(this._getAllNodesWithTag(articleContent, ["h1"]), "h2");

    // Remove extra paragraphs
    this._removeNodes(this._getAllNodesWithTag(articleContent, ["p"]), function (paragraph) {
      var imgCount = paragraph.getElementsByTagName("img").length;
      var embedCount = paragraph.getElementsByTagName("embed").length;
      var objectCount = paragraph.getElementsByTagName("object").length;
      // At this point, nasty iframes have been removed, only remain embedded video ones.
      var iframeCount = paragraph.getElementsByTagName("iframe").length;
      var totalCount = imgCount + embedCount + objectCount + iframeCount;

      return totalCount === 0 && !this._getInnerText(paragraph, false);
    });

    this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function(br) {
      var next = this._nextNode(br.nextSibling);
      if (next && next.tagName == "P")
        br.parentNode.removeChild(br);
    });

    // Remove single-cell tables
    this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function(table) {
      var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
      if (this._hasSingleTagInsideElement(tbody, "TR")) {
        var row = tbody.firstElementChild;
        if (this._hasSingleTagInsideElement(row, "TD")) {
          var cell = row.firstElementChild;
          cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
          table.parentNode.replaceChild(cell, table);
        }
      }
    });
  },

  /**
   * Initialize a node with the readability object. Also checks the
   * className/id for special names to add to its score.
   *
   * @param Element
   * @return void
  **/
  _initializeNode: function(node) {
    node.readability = {"contentScore": 0};

    switch (node.tagName) {
      case "DIV":
        node.readability.contentScore += 5;
        break;

      case "PRE":
      case "TD":
      case "BLOCKQUOTE":
        node.readability.contentScore += 3;
        break;

      case "ADDRESS":
      case "OL":
      case "UL":
      case "DL":
      case "DD":
      case "DT":
      case "LI":
      case "FORM":
        node.readability.contentScore -= 3;
        break;

      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
      case "TH":
        node.readability.contentScore -= 5;
        break;
    }

    node.readability.contentScore += this._getClassWeight(node);
  },

  _removeAndGetNext: function(node) {
    var nextNode = this._getNextNode(node, true);
    node.parentNode.removeChild(node);
    return nextNode;
  },

  /**
   * Traverse the DOM from node to node, starting at the node passed in.
   * Pass true for the second parameter to indicate this node itself
   * (and its kids) are going away, and we want the next node over.
   *
   * Calling this in a loop will traverse the DOM depth-first.
   */
  _getNextNode: function(node, ignoreSelfAndKids) {
    // First check for kids if those aren't being ignored
    if (!ignoreSelfAndKids && node.firstElementChild) {
      return node.firstElementChild;
    }
    // Then for siblings...
    if (node.nextElementSibling) {
      return node.nextElementSibling;
    }
    // And finally, move up the parent chain *and* find a sibling
    // (because this is depth-first traversal, we will have already
    // seen the parent nodes themselves).
    do {
      node = node.parentNode;
    } while (node && !node.nextElementSibling);
    return node && node.nextElementSibling;
  },

  // compares second text to first one
  // 1 = same text, 0 = completely different text
  // works the way that it splits both texts into words and then finds words that are unique in second text
  // the result is given by the lower length of unique parts
  _textSimilarity: function(textA, textB) {
    var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
    var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
    if (!tokensA.length || !tokensB.length) {
      return 0;
    }
    var uniqTokensB = tokensB.filter(token => !tokensA.includes(token));
    var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
    return 1 - distanceB;
  },

  _checkByline: function(node, matchString) {
    if (this._articleByline) {
      return false;
    }

    if (node.getAttribute !== undefined) {
      var rel = node.getAttribute("rel");
      var itemprop = node.getAttribute("itemprop");
    }

    if ((rel === "author" || (itemprop && itemprop.indexOf("author") !== -1) || this.REGEXPS.byline.test(matchString)) && this._isValidByline(node.textContent)) {
      this._articleByline = node.textContent.trim();
      return true;
    }

    return false;
  },

  _getNodeAncestors: function(node, maxDepth) {
    maxDepth = maxDepth || 0;
    var i = 0, ancestors = [];
    while (node.parentNode) {
      ancestors.push(node.parentNode);
      if (maxDepth && ++i === maxDepth)
        break;
      node = node.parentNode;
    }
    return ancestors;
  },

  /***
   * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
   *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
   *
   * @param page a document to run upon. Needs to be a full document, complete with body.
   * @return Element
  **/
  _grabArticle: function (page) {
    this.log("**** grabArticle ****");
    var doc = this._doc;
    var isPaging = page !== null;
    page = page ? page : this._doc.body;

    // We can't grab an article if we don't have a page!
    if (!page) {
      this.log("No body found in document. Abort.");
      return null;
    }

    var pageCacheHtml = page.innerHTML;

    while (true) {
      this.log("Starting grabArticle loop");
      var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);

      // First, node prepping. Trash nodes that look cruddy (like ones with the
      // class name "comment", etc), and turn divs into P tags where they have been
      // used inappropriately (as in, where they contain no other block level elements.)
      var elementsToScore = [];
      var node = this._doc.documentElement;

      let shouldRemoveTitleHeader = true;

      while (node) {
        var matchString = node.className + " " + node.id;

        if (!this._isProbablyVisible(node)) {
          this.log("Removing hidden node - " + matchString);
          node = this._removeAndGetNext(node);
          continue;
        }

        // Check to see if this node is a byline, and remove it if it is.
        if (this._checkByline(node, matchString)) {
          node = this._removeAndGetNext(node);
          continue;
        }

        if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
          this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
          shouldRemoveTitleHeader = false;
          node = this._removeAndGetNext(node);
          continue;
        }

        // Remove unlikely candidates
        if (stripUnlikelyCandidates) {
          if (this.REGEXPS.unlikelyCandidates.test(matchString) &&
              !this.REGEXPS.okMaybeItsACandidate.test(matchString) &&
              !this._hasAncestorTag(node, "table") &&
              !this._hasAncestorTag(node, "code") &&
              node.tagName !== "BODY" &&
              node.tagName !== "A") {
            this.log("Removing unlikely candidate - " + matchString);
            node = this._removeAndGetNext(node);
            continue;
          }

          if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
            this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
            node = this._removeAndGetNext(node);
            continue;
          }
        }

        // Remove DIV, SECTION, and HEADER nodes without any content(e.g. text, image, video, or iframe).
        if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" ||
             node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" ||
             node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") &&
            this._isElementWithoutContent(node)) {
          node = this._removeAndGetNext(node);
          continue;
        }

        if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
          elementsToScore.push(node);
        }

        // Turn all divs that don't have children block level elements into p's
        if (node.tagName === "DIV") {
          // Put phrasing content into paragraphs.
          var p = null;
          var childNode = node.firstChild;
          while (childNode) {
            var nextSibling = childNode.nextSibling;
            if (this._isPhrasingContent(childNode)) {
              if (p !== null) {
                p.appendChild(childNode);
              } else if (!this._isWhitespace(childNode)) {
                p = doc.createElement("p");
                node.replaceChild(p, childNode);
                p.appendChild(childNode);
              }
            } else if (p !== null) {
              while (p.lastChild && this._isWhitespace(p.lastChild)) {
                p.removeChild(p.lastChild);
              }
              p = null;
            }
            childNode = nextSibling;
          }

          // Sites like http://mobile.slate.com encloses each paragraph with a DIV
          // element. DIVs with only a P element inside and no text content can be
          // safely converted into plain P elements to avoid confusing the scoring
          // algorithm with DIVs with are, in practice, paragraphs.
          if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < 0.25) {
            var newNode = node.children[0];
            node.parentNode.replaceChild(newNode, node);
            node = newNode;
            elementsToScore.push(node);
          } else if (!this._hasChildBlockElement(node)) {
            node = this._setNodeTag(node, "P");
            elementsToScore.push(node);
          }
        }
        node = this._getNextNode(node);
      }

      /**
       * Loop through all paragraphs, and assign a score to them based on how content-y they look.
       * Then add their score to their parent node.
       *
       * A score is determined by things like number of commas, class names, etc. Maybe eventually link density.
      **/
      var candidates = [];
      this._forEachNode(elementsToScore, function(elementToScore) {
        if (!elementToScore.parentNode || typeof(elementToScore.parentNode.tagName) === "undefined")
          return;

        // If this paragraph is less than 25 characters, don't even count it.
        var innerText = this._getInnerText(elementToScore);
        if (innerText.length < 25)
          return;

        // Exclude nodes with no ancestor.
        var ancestors = this._getNodeAncestors(elementToScore, 5);
        if (ancestors.length === 0)
          return;

        var contentScore = 0;

        // Add a point for the paragraph itself as a base.
        contentScore += 1;

        // Add points for any commas within this paragraph.
        contentScore += innerText.split(",").length;

        // For every 100 characters in this paragraph, add another point. Up to 3 points.
        contentScore += Math.min(Math.floor(innerText.length / 100), 3);

        // Initialize and score ancestors.
        this._forEachNode(ancestors, function(ancestor, level) {
          if (!ancestor.tagName || !ancestor.parentNode || typeof(ancestor.parentNode.tagName) === "undefined")
            return;

          if (typeof(ancestor.readability) === "undefined") {
            this._initializeNode(ancestor);
            candidates.push(ancestor);
          }

          // Node score divider:
          // - parent:             1 (no division)
          // - grandparent:        2
          // - great grandparent+: ancestor level * 3
          if (level === 0)
            var scoreDivider = 1;
          else if (level === 1)
            scoreDivider = 2;
          else
            scoreDivider = level * 3;
          ancestor.readability.contentScore += contentScore / scoreDivider;
        });
      });

      // After we've calculated scores, loop through all of the possible
      // candidate nodes we found and find the one with the highest score.
      var topCandidates = [];
      for (var c = 0, cl = candidates.length; c < cl; c += 1) {
        var candidate = candidates[c];

        // Scale the final candidates score based on link density. Good content
        // should have a relatively small link density (5% or less) and be mostly
        // unaffected by this operation.
        var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
        candidate.readability.contentScore = candidateScore;

        this.log("Candidate:", candidate, "with score " + candidateScore);

        for (var t = 0; t < this._nbTopCandidates; t++) {
          var aTopCandidate = topCandidates[t];

          if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
            topCandidates.splice(t, 0, candidate);
            if (topCandidates.length > this._nbTopCandidates)
              topCandidates.pop();
            break;
          }
        }
      }

      var topCandidate = topCandidates[0] || null;
      var neededToCreateTopCandidate = false;
      var parentOfTopCandidate;

      // If we still have no top candidate, just use the body as a last resort.
      // We also have to copy the body node so it is something we can modify.
      if (topCandidate === null || topCandidate.tagName === "BODY") {
        // Move all of the page's children into topCandidate
        topCandidate = doc.createElement("DIV");
        neededToCreateTopCandidate = true;
        // Move everything (not just elements, also text nodes etc.) into the container
        // so we even include text directly in the body:
        var kids = page.childNodes;
        while (kids.length) {
          this.log("Moving child out:", kids[0]);
          topCandidate.appendChild(kids[0]);
        }

        page.appendChild(topCandidate);

        this._initializeNode(topCandidate);
      } else if (topCandidate) {
        // Find a better top candidate node if it contains (at least three) nodes which belong to `topCandidates` array
        // and whose scores are quite closed with current `topCandidate` node.
        var alternativeCandidateAncestors = [];
        for (var i = 1; i < topCandidates.length; i++) {
          if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= 0.75) {
            alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
          }
        }
        var MINIMUM_TOPCANDIDATES = 3;
        if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
          parentOfTopCandidate = topCandidate.parentNode;
          while (parentOfTopCandidate.tagName !== "BODY") {
            var listsContainingThisAncestor = 0;
            for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
              listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
            }
            if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
              topCandidate = parentOfTopCandidate;
              break;
            }
            parentOfTopCandidate = parentOfTopCandidate.parentNode;
          }
        }
        if (!topCandidate.readability) {
          this._initializeNode(topCandidate);
        }

        // Because of our bonus system, parents of candidates might have scores
        // themselves. They get half of the node. There won't be nodes with higher
        // scores than our topCandidate, but if we see the score going *up* in the first
        // few steps up the tree, that's a decent sign that there might be more content
        // lurking in other places that we want to unify in. The sibling stuff
        // below does some of that - but only if we've looked high enough up the DOM
        // tree.
        parentOfTopCandidate = topCandidate.parentNode;
        var lastScore = topCandidate.readability.contentScore;
        // The scores shouldn't get too low.
        var scoreThreshold = lastScore / 3;
        while (parentOfTopCandidate.tagName !== "BODY") {
          if (!parentOfTopCandidate.readability) {
            parentOfTopCandidate = parentOfTopCandidate.parentNode;
            continue;
          }
          var parentScore = parentOfTopCandidate.readability.contentScore;
          if (parentScore < scoreThreshold)
            break;
          if (parentScore > lastScore) {
            // Alright! We found a better parent to use.
            topCandidate = parentOfTopCandidate;
            break;
          }
          lastScore = parentOfTopCandidate.readability.contentScore;
          parentOfTopCandidate = parentOfTopCandidate.parentNode;
        }

        // If the top candidate is the only child, use parent instead. This will help sibling
        // joining logic when adjacent content is actually located in parent's sibling node.
        parentOfTopCandidate = topCandidate.parentNode;
        while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
          topCandidate = parentOfTopCandidate;
          parentOfTopCandidate = topCandidate.parentNode;
        }
        if (!topCandidate.readability) {
          this._initializeNode(topCandidate);
        }
      }

      // Now that we have the top candidate, look through its siblings for content
      // that might also be related. Things like preambles, content split by ads
      // that we removed, etc.
      var articleContent = doc.createElement("DIV");
      if (isPaging)
        articleContent.id = "readability-content";

      var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
      // Keep potential top candidate's parent node to try to get text direction of it later.
      parentOfTopCandidate = topCandidate.parentNode;
      var siblings = parentOfTopCandidate.children;

      for (var s = 0, sl = siblings.length; s < sl; s++) {
        var sibling = siblings[s];
        var append = false;

        this.log("Looking at sibling node:", sibling, sibling.readability ? ("with score " + sibling.readability.contentScore) : "");
        this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");

        if (sibling === topCandidate) {
          append = true;
        } else {
          var contentBonus = 0;

          // Give a bonus if sibling nodes and top candidates have the example same classname
          if (sibling.className === topCandidate.className && topCandidate.className !== "")
            contentBonus += topCandidate.readability.contentScore * 0.2;

          if (sibling.readability &&
              ((sibling.readability.contentScore + contentBonus) >= siblingScoreThreshold)) {
            append = true;
          } else if (sibling.nodeName === "P") {
            var linkDensity = this._getLinkDensity(sibling);
            var nodeContent = this._getInnerText(sibling);
            var nodeLength = nodeContent.length;

            if (nodeLength > 80 && linkDensity < 0.25) {
              append = true;
            } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 &&
                       nodeContent.search(/\.( |$)/) !== -1) {
              append = true;
            }
          }
        }

        if (append) {
          this.log("Appending node:", sibling);

          if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
            // We have a node that isn't a common block level element, like a form or td tag.
            // Turn it into a div so it doesn't get filtered out later by accident.
            this.log("Altering sibling:", sibling, "to div.");

            sibling = this._setNodeTag(sibling, "DIV");
          }

          articleContent.appendChild(sibling);
          // siblings is a reference to the children array, and
          // sibling is removed from the array when we call appendChild().
          // As a result, we must revisit this index since the nodes
          // have been shifted.
          s -= 1;
          sl -= 1;
        }
      }

      if (this._debug)
        this.log("Article content pre-prep: " + articleContent.innerHTML);
      // So we have all of the content that we need. Now we clean it up for presentation.
      this._prepArticle(articleContent);
      if (this._debug)
        this.log("Article content post-prep: " + articleContent.innerHTML);

      if (neededToCreateTopCandidate) {
        // We already created a fake div thing, and there wouldn't have been any siblings left
        // for the previous loop, so there's no point trying to create a new div, and then
        // move all the children over. Just assign IDs and class names here. No need to append
        // because that already happened anyway.
        topCandidate.id = "readability-page-1";
        topCandidate.className = "page";
      } else {
        var div = doc.createElement("DIV");
        div.id = "readability-page-1";
        div.className = "page";
        var children = articleContent.childNodes;
        while (children.length) {
          div.appendChild(children[0]);
        }
        articleContent.appendChild(div);
      }

      if (this._debug)
        this.log("Article content after paging: " + articleContent.innerHTML);

      var parseSuccessful = true;

      // Now that we've gone through the full algorithm, check to see if
      // we got any meaningful content. If we didn't, we may need to re-run
      // grabArticle with different flags set. This gives us a higher likelihood of
      // finding the content, and the sieve approach gives us a higher likelihood of
      // finding the -right- content.
      var textLength = this._getInnerText(articleContent, true).length;
      if (textLength < this._charThreshold) {
        parseSuccessful = false;
        page.innerHTML = pageCacheHtml;

        if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
          this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
          this._attempts.push({articleContent: articleContent, textLength: textLength});
        } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
          this._removeFlag(this.FLAG_WEIGHT_CLASSES);
          this._attempts.push({articleContent: articleContent, textLength: textLength});
        } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
          this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
          this._attempts.push({articleContent: articleContent, textLength: textLength});
        } else {
          this._attempts.push({articleContent: articleContent, textLength: textLength});
          // No luck after removing flags, just return the longest text we found during the different loops
          this._attempts.sort(function (a, b) {
            return b.textLength - a.textLength;
          });

          // But first check if we actually have something
          if (!this._attempts[0].textLength) {
            return null;
          }

          articleContent = this._attempts[0].articleContent;
          parseSuccessful = true;
        }
      }

      if (parseSuccessful) {
        // Find out text direction from ancestors of final top candidate.
        var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
        this._someNode(ancestors, function(ancestor) {
          if (!ancestor.tagName)
            return false;
          var articleDir = ancestor.getAttribute("dir");
          if (articleDir) {
            this._articleDir = articleDir;
            return true;
          }
          return false;
        });
        return articleContent;
      }
    }
  },

  /**
   * Check whether the input string could be a byline.
   * This verifies that the input is a string, and that the length
   * is less than 100 chars.
   *
   * @param possibleByline {string} - a string to check whether its a byline.
   * @return Boolean - whether the input string is a byline.
   */
  _isValidByline: function(byline) {
    if (typeof byline == "string" || byline instanceof String) {
      byline = byline.trim();
      return (byline.length > 0) && (byline.length < 100);
    }
    return false;
  },

  /**
   * Converts some of the common HTML entities in string to their corresponding characters.
   *
   * @param str {string} - a string to unescape.
   * @return string without HTML entity.
   */
  _unescapeHtmlEntities: function(str) {
    if (!str) {
      return str;
    }

    var htmlEscapeMap = this.HTML_ESCAPE_MAP;
    return str.replace(/&(quot|amp|apos|lt|gt);/g, function(_, tag) {
      return htmlEscapeMap[tag];
    }).replace(/&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi, function(_, hex, numStr) {
      var num = parseInt(hex || numStr, hex ? 16 : 10);
      return String.fromCharCode(num);
    });
  },

  /**
   * Try to extract metadata from JSON-LD object.
   * For now, only Schema.org objects of type Article or its subtypes are supported.
   * @return Object with any metadata that could be extracted (possibly none)
   */
  _getJSONLD: function (doc) {
    var scripts = this._getAllNodesWithTag(doc, ["script"]);

    var jsonLdElement = this._findNode(scripts, function(el) {
      return el.getAttribute("type") === "application/ld+json";
    });

    if (jsonLdElement) {
      try {
        // Strip CDATA markers if present
        var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
        var parsed = JSON.parse(content);
        var metadata = {};
        if (
          !parsed["@context"] ||
          !parsed["@context"].match(/^https?\:\/\/schema\.org$/)
        ) {
          return metadata;
        }

        if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
          parsed = parsed["@graph"].find(function(it) {
            return (it["@type"] || "").match(
              this.REGEXPS.jsonLdArticleTypes
            );
          });
        }

        if (
          !parsed ||
          !parsed["@type"] ||
          !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)
        ) {
          return metadata;
        }
        if (typeof parsed.name === "string") {
          metadata.title = parsed.name.trim();
        } else if (typeof parsed.headline === "string") {
          metadata.title = parsed.headline.trim();
        }
        if (parsed.author) {
          if (typeof parsed.author.name === "string") {
            metadata.byline = parsed.author.name.trim();
          } else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") {
            metadata.byline = parsed.author
              .filter(function(author) {
                return author && typeof author.name === "string";
              })
              .map(function(author) {
                return author.name.trim();
              })
              .join(", ");
          }
        }
        if (typeof parsed.description === "string") {
          metadata.excerpt = parsed.description.trim();
        }
        if (
          parsed.publisher &&
          typeof parsed.publisher.name === "string"
        ) {
          metadata.siteName = parsed.publisher.name.trim();
        }
        return metadata;
      } catch (err) {
        this.log(err.message);
      }
    }
    return {};
  },

  /**
   * Attempts to get excerpt and byline metadata for the article.
   *
   * @param {Object} jsonld — object containing any metadata that
   * could be extracted from JSON-LD object.
   *
   * @return Object with optional "excerpt" and "byline" properties
   */
  _getArticleMetadata: function(jsonld) {
    var metadata = {};
    var values = {};
    var metaElements = this._doc.getElementsByTagName("meta");

    // property is a space-separated list of values
    var propertyPattern = /\s*(dc|dcterm|og|twitter)\s*:\s*(author|creator|description|title|site_name)\s*/gi;

    // name is a single value
    var namePattern = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;

    // Find description tags.
    this._forEachNode(metaElements, function(element) {
      var elementName = element.getAttribute("name");
      var elementProperty = element.getAttribute("property");
      var content = element.getAttribute("content");
      if (!content) {
        return;
      }
      var matches = null;
      var name = null;

      if (elementProperty) {
        matches = elementProperty.match(propertyPattern);
        if (matches) {
          // Convert to lowercase, and remove any whitespace
          // so we can match below.
          name = matches[0].toLowerCase().replace(/\s/g, "");
          // multiple authors
          values[name] = content.trim();
        }
      }
      if (!matches && elementName && namePattern.test(elementName)) {
        name = elementName;
        if (content) {
          // Convert to lowercase, remove any whitespace, and convert dots
          // to colons so we can match below.
          name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
          values[name] = content.trim();
        }
      }
    });

    // get title
    metadata.title = jsonld.title ||
                     values["dc:title"] ||
                     values["dcterm:title"] ||
                     values["og:title"] ||
                     values["weibo:article:title"] ||
                     values["weibo:webpage:title"] ||
                     values["title"] ||
                     values["twitter:title"];

    if (!metadata.title) {
      metadata.title = this._getArticleTitle();
    }

    // get author
    metadata.byline = jsonld.byline ||
                      values["dc:creator"] ||
                      values["dcterm:creator"] ||
                      values["author"];

    // get description
    metadata.excerpt = jsonld.excerpt ||
                       values["dc:description"] ||
                       values["dcterm:description"] ||
                       values["og:description"] ||
                       values["weibo:article:description"] ||
                       values["weibo:webpage:description"] ||
                       values["description"] ||
                       values["twitter:description"];

    // get site name
    metadata.siteName = jsonld.siteName ||
                        values["og:site_name"];

    // in many sites the meta value is escaped with HTML entities,
    // so here we need to unescape it
    metadata.title = this._unescapeHtmlEntities(metadata.title);
    metadata.byline = this._unescapeHtmlEntities(metadata.byline);
    metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
    metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);

    return metadata;
  },

  /**
   * Check if node is image, or if node contains exactly only one image
   * whether as a direct child or as its descendants.
   *
   * @param Element
  **/
  _isSingleImage: function(node) {
    if (node.tagName === "IMG") {
      return true;
    }

    if (node.children.length !== 1 || node.textContent.trim() !== "") {
      return false;
    }

    return this._isSingleImage(node.children[0]);
  },

  /**
   * Find all <noscript> that are located after <img> nodes, and which contain only one
   * <img> element. Replace the first image with the image from inside the <noscript> tag,
   * and remove the <noscript> tag. This improves the quality of the images we use on
   * some sites (e.g. Medium).
   *
   * @param Element
  **/
  _unwrapNoscriptImages: function(doc) {
    // Find img without source or attributes that might contains image, and remove it.
    // This is done to prevent a placeholder img is replaced by img from noscript in next step.
    var imgs = Array.from(doc.getElementsByTagName("img"));
    this._forEachNode(imgs, function(img) {
      for (var i = 0; i < img.attributes.length; i++) {
        var attr = img.attributes[i];
        switch (attr.name) {
          case "src":
          case "srcset":
          case "data-src":
          case "data-srcset":
            return;
        }

        if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
          return;
        }
      }

      img.parentNode.removeChild(img);
    });

    // Next find noscript and try to extract its image
    var noscripts = Array.from(doc.getElementsByTagName("noscript"));
    this._forEachNode(noscripts, function(noscript) {
      // Parse content of noscript and make sure it only contains image
      var tmp = doc.createElement("div");
      tmp.innerHTML = noscript.innerHTML;
      if (!this._isSingleImage(tmp)) {
        return;
      }

      // If noscript has previous sibling and it only contains image,
      // replace it with noscript content. However we also keep old
      // attributes that might contains image.
      var prevElement = noscript.previousElementSibling;
      if (prevElement && this._isSingleImage(prevElement)) {
        var prevImg = prevElement;
        if (prevImg.tagName !== "IMG") {
          prevImg = prevElement.getElementsByTagName("img")[0];
        }

        var newImg = tmp.getElementsByTagName("img")[0];
        for (var i = 0; i < prevImg.attributes.length; i++) {
          var attr = prevImg.attributes[i];
          if (attr.value === "") {
            continue;
          }

          if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
            if (newImg.getAttribute(attr.name) === attr.value) {
              continue;
            }

            var attrName = attr.name;
            if (newImg.hasAttribute(attrName)) {
              attrName = "data-old-" + attrName;
            }

            newImg.setAttribute(attrName, attr.value);
          }
        }

        noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
      }
    });
  },

  /**
   * Removes script tags from the document.
   *
   * @param Element
  **/
  _removeScripts: function(doc) {
    this._removeNodes(this._getAllNodesWithTag(doc, ["script"]), function(scriptNode) {
      scriptNode.nodeValue = "";
      scriptNode.removeAttribute("src");
      return true;
    });
    this._removeNodes(this._getAllNodesWithTag(doc, ["noscript"]));
  },

  /**
   * Check if this node has only whitespace and a single element with given tag
   * Returns false if the DIV node contains non-empty text nodes
   * or if it contains no element with given tag or more than 1 element.
   *
   * @param Element
   * @param string tag of child element
  **/
  _hasSingleTagInsideElement: function(element, tag) {
    // There should be exactly 1 element child with given tag
    if (element.children.length != 1 || element.children[0].tagName !== tag) {
      return false;
    }

    // And there should be no text nodes with real content
    return !this._someNode(element.childNodes, function(node) {
      return node.nodeType === this.TEXT_NODE &&
             this.REGEXPS.hasContent.test(node.textContent);
    });
  },

  _isElementWithoutContent: function(node) {
    return node.nodeType === this.ELEMENT_NODE &&
      node.textContent.trim().length == 0 &&
      (node.children.length == 0 ||
       node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
  },

  /**
   * Determine whether element has any children block level elements.
   *
   * @param Element
   */
  _hasChildBlockElement: function (element) {
    return this._someNode(element.childNodes, function(node) {
      return this.DIV_TO_P_ELEMS.has(node.tagName) ||
             this._hasChildBlockElement(node);
    });
  },

  /***
   * Determine if a node qualifies as phrasing content.
   * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
  **/
  _isPhrasingContent: function(node) {
    return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 ||
      ((node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") &&
        this._everyNode(node.childNodes, this._isPhrasingContent));
  },

  _isWhitespace: function(node) {
    return (node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0) ||
           (node.nodeType === this.ELEMENT_NODE && node.tagName === "BR");
  },

  /**
   * Get the inner text of a node - cross browser compatibly.
   * This also strips out any excess whitespace to be found.
   *
   * @param Element
   * @param Boolean normalizeSpaces (default: true)
   * @return string
  **/
  _getInnerText: function(e, normalizeSpaces) {
    normalizeSpaces = (typeof normalizeSpaces === "undefined") ? true : normalizeSpaces;
    var textContent = e.textContent.trim();

    if (normalizeSpaces) {
      return textContent.replace(this.REGEXPS.normalize, " ");
    }
    return textContent;
  },

  /**
   * Get the number of times a string s appears in the node e.
   *
   * @param Element
   * @param string - what to split on. Default is ","
   * @return number (integer)
  **/
  _getCharCount: function(e, s) {
    s = s || ",";
    return this._getInnerText(e).split(s).length - 1;
  },

  /**
   * Remove the style attribute on every e and under.
   * TODO: Test if getElementsByTagName(*) is faster.
   *
   * @param Element
   * @return void
  **/
  _cleanStyles: function(e) {
    if (!e || e.tagName.toLowerCase() === "svg")
      return;

    // Remove `style` and deprecated presentational attributes
    for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
      e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
    }

    if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
      e.removeAttribute("width");
      e.removeAttribute("height");
    }

    var cur = e.firstElementChild;
    while (cur !== null) {
      this._cleanStyles(cur);
      cur = cur.nextElementSibling;
    }
  },

  /**
   * Get the density of links as a percentage of the content
   * This is the amount of text that is inside a link divided by the total text in the node.
   *
   * @param Element
   * @return number (float)
  **/
  _getLinkDensity: function(element) {
    var textLength = this._getInnerText(element).length;
    if (textLength === 0)
      return 0;

    var linkLength = 0;

    // XXX implement _reduceNodeList?
    this._forEachNode(element.getElementsByTagName("a"), function(linkNode) {
      var href = linkNode.getAttribute("href");
      var coefficient = href && this.REGEXPS.hashUrl.test(href) ? 0.3 : 1;
      linkLength += this._getInnerText(linkNode).length * coefficient;
    });

    return linkLength / textLength;
  },

  /**
   * Get an elements class/id weight. Uses regular expressions to tell if this
   * element looks good or bad.
   *
   * @param Element
   * @return number (Integer)
  **/
  _getClassWeight: function(e) {
    if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES))
      return 0;

    var weight = 0;

    // Look for a special classname
    if (typeof(e.className) === "string" && e.className !== "") {
      if (this.REGEXPS.negative.test(e.className))
        weight -= 25;

      if (this.REGEXPS.positive.test(e.className))
        weight += 25;
    }

    // Look for a special ID
    if (typeof(e.id) === "string" && e.id !== "") {
      if (this.REGEXPS.negative.test(e.id))
        weight -= 25;

      if (this.REGEXPS.positive.test(e.id))
        weight += 25;
    }

    return weight;
  },

  /**
   * Clean a node of all elements of type "tag".
   * (Unless it's a youtube/vimeo video. People love movies.)
   *
   * @param Element
   * @param string tag to clean
   * @return void
   **/
  _clean: function(e, tag) {
    var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;

    this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(element) {
      // Allow youtube and vimeo videos through as people usually want to see those.
      if (isEmbed) {
        // First, check the elements attributes to see if any of them contain youtube or vimeo
        for (var i = 0; i < element.attributes.length; i++) {
          if (this.REGEXPS.videos.test(element.attributes[i].value)) {
            return false;
          }
        }

        // For embed with <object> tag, check inner HTML as well.
        if (element.tagName === "object" && this.REGEXPS.videos.test(element.innerHTML)) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * Check if a given node has one of its ancestor tag name matching the
   * provided one.
   * @param  HTMLElement node
   * @param  String      tagName
   * @param  Number      maxDepth
   * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
   * @return Boolean
   */
  _hasAncestorTag: function(node, tagName, maxDepth, filterFn) {
    maxDepth = maxDepth || 3;
    tagName = tagName.toUpperCase();
    var depth = 0;
    while (node.parentNode) {
      if (maxDepth > 0 && depth > maxDepth)
        return false;
      if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode)))
        return true;
      node = node.parentNode;
      depth++;
    }
    return false;
  },

  /**
   * Return an object indicating how many rows and columns this table has.
   */
  _getRowAndColumnCount: function(table) {
    var rows = 0;
    var columns = 0;
    var trs = table.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
      var rowspan = trs[i].getAttribute("rowspan") || 0;
      if (rowspan) {
        rowspan = parseInt(rowspan, 10);
      }
      rows += (rowspan || 1);

      // Now look for column-related info
      var columnsInThisRow = 0;
      var cells = trs[i].getElementsByTagName("td");
      for (var j = 0; j < cells.length; j++) {
        var colspan = cells[j].getAttribute("colspan") || 0;
        if (colspan) {
          colspan = parseInt(colspan, 10);
        }
        columnsInThisRow += (colspan || 1);
      }
      columns = Math.max(columns, columnsInThisRow);
    }
    return {rows: rows, columns: columns};
  },

  /**
   * Look for 'data' (as opposed to 'layout') tables, for which we use
   * similar checks as
   * https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
   */
  _markDataTables: function(root) {
    var tables = root.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      var role = table.getAttribute("role");
      if (role == "presentation") {
        table._readabilityDataTable = false;
        continue;
      }
      var datatable = table.getAttribute("datatable");
      if (datatable == "0") {
        table._readabilityDataTable = false;
        continue;
      }
      var summary = table.getAttribute("summary");
      if (summary) {
        table._readabilityDataTable = true;
        continue;
      }

      var caption = table.getElementsByTagName("caption")[0];
      if (caption && caption.childNodes.length > 0) {
        table._readabilityDataTable = true;
        continue;
      }

      // If the table has a descendant with any of these tags, consider a data table:
      var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
      var descendantExists = function(tag) {
        return !!table.getElementsByTagName(tag)[0];
      };
      if (dataTableDescendants.some(descendantExists)) {
        this.log("Data table because found data-y descendant");
        table._readabilityDataTable = true;
        continue;
      }

      // Nested tables indicate a layout table:
      if (table.getElementsByTagName("table")[0]) {
        table._readabilityDataTable = false;
        continue;
      }

      var sizeInfo = this._getRowAndColumnCount(table);
      if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
        table._readabilityDataTable = true;
        continue;
      }
      // Now just go by size entirely:
      table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
    }
  },

  /* convert images and figures that have properties like data-src into images that can be loaded without JS */
  _fixLazyImages: function (root) {
    this._forEachNode(this._getAllNodesWithTag(root, ["img", "picture", "figure"]), function (elem) {
      // In some sites (e.g. Kotaku), they put 1px square image as base64 data uri in the src attribute.
      // So, here we check if the data uri is too short, just might as well remove it.
      if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
        // Make sure it's not SVG, because SVG can have a meaningful image in under 133 bytes.
        var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
        if (parts[1] === "image/svg+xml") {
          return;
        }

        // Make sure this element has other attributes which contains image.
        // If it doesn't, then this src is important and shouldn't be removed.
        var srcCouldBeRemoved = false;
        for (var i = 0; i < elem.attributes.length; i++) {
          var attr = elem.attributes[i];
          if (attr.name === "src") {
            continue;
          }

          if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
            srcCouldBeRemoved = true;
            break;
          }
        }

        // Here we assume if image is less than 100 bytes (or 133B after encoded to base64)
        // it will be too small, therefore it might be placeholder image.
        if (srcCouldBeRemoved) {
          var b64starts = elem.src.search(/base64\s*/i) + 7;
          var b64length = elem.src.length - b64starts;
          if (b64length < 133) {
            elem.removeAttribute("src");
          }
        }
      }

      // also check for "null" to work around https://github.com/jsdom/jsdom/issues/2580
      if ((elem.src || (elem.srcset && elem.srcset != "null")) && elem.className.toLowerCase().indexOf("lazy") === -1) {
        return;
      }

      for (var j = 0; j < elem.attributes.length; j++) {
        attr = elem.attributes[j];
        if (attr.name === "src" || attr.name === "srcset") {
          continue;
        }
        var copyTo = null;
        if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
          copyTo = "srcset";
        } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
          copyTo = "src";
        }
        if (copyTo) {
          //if this is an img or picture, set the attribute directly
          if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
            elem.setAttribute(copyTo, attr.value);
          } else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, ["img", "picture"]).length) {
            //if the item is a <figure> that does not contain an image or picture, create one and place it inside the figure
            //see the nytimes-3 testcase for an example
            var img = this._doc.createElement("img");
            img.setAttribute(copyTo, attr.value);
            elem.appendChild(img);
          }
        }
      }
    });
  },

  _getTextDensity: function(e, tags) {
    var textLength = this._getInnerText(e, true).length;
    if (textLength === 0) {
      return 0;
    }
    var childrenLength = 0;
    var children = this._getAllNodesWithTag(e, tags);
    this._forEachNode(children, (child) => childrenLength += this._getInnerText(child, true).length);
    return childrenLength / textLength;
  },

  /**
   * Clean an element of all tags of type "tag" if they look fishy.
   * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
   *
   * @return void
   **/
  _cleanConditionally: function(e, tag) {
    if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY))
      return;

    // Gather counts for other typical elements embedded within.
    // Traverse backwards so we can remove nodes at the same time
    // without effecting the traversal.
    //
    // TODO: Consider taking into account original contentScore here.
    this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(node) {
      // First check if this node IS data table, in which case don't remove it.
      var isDataTable = function(t) {
        return t._readabilityDataTable;
      };

      var isList = tag === "ul" || tag === "ol";
      if (!isList) {
        var listLength = 0;
        var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
        this._forEachNode(listNodes, (list) => listLength += this._getInnerText(list).length);
        isList = listLength / this._getInnerText(node).length > 0.9;
      }

      if (tag === "table" && isDataTable(node)) {
        return false;
      }

      // Next check if we're inside a data table, in which case don't remove it as well.
      if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
        return false;
      }

      if (this._hasAncestorTag(node, "code")) {
        return false;
      }

      var weight = this._getClassWeight(node);

      this.log("Cleaning Conditionally", node);

      var contentScore = 0;

      if (weight + contentScore < 0) {
        return true;
      }

      if (this._getCharCount(node, ",") < 10) {
        // If there are not very many commas, and the number of
        // non-paragraph elements is more than paragraphs or other
        // ominous signs, remove the element.
        var p = node.getElementsByTagName("p").length;
        var img = node.getElementsByTagName("img").length;
        var li = node.getElementsByTagName("li").length - 100;
        var input = node.getElementsByTagName("input").length;
        var headingDensity = this._getTextDensity(node, ["h1", "h2", "h3", "h4", "h5", "h6"]);

        var embedCount = 0;
        var embeds = this._getAllNodesWithTag(node, ["object", "embed", "iframe"]);

        for (var i = 0; i < embeds.length; i++) {
          // If this embed has attribute that matches video regex, don't delete it.
          for (var j = 0; j < embeds[i].attributes.length; j++) {
            if (this.REGEXPS.videos.test(embeds[i].attributes[j].value)) {
              return false;
            }
          }

          // For embed with <object> tag, check inner HTML as well.
          if (embeds[i].tagName === "object" && this.REGEXPS.videos.test(embeds[i].innerHTML)) {
            return false;
          }

          embedCount++;
        }

        var linkDensity = this._getLinkDensity(node);
        var contentLength = this._getInnerText(node).length;

        var haveToRemove =
          (img > 1 && p / img < 0.5 && !this._hasAncestorTag(node, "figure")) ||
          (!isList && li > p) ||
          (input > Math.floor(p/3)) ||
          (!isList && headingDensity < 0.9 && contentLength < 25 && (img === 0 || img > 2) && !this._hasAncestorTag(node, "figure")) ||
          (!isList && weight < 25 && linkDensity > 0.2) ||
          (weight >= 25 && linkDensity > 0.5) ||
          ((embedCount === 1 && contentLength < 75) || embedCount > 1);
        return haveToRemove;
      }
      return false;
    });
  },

  /**
   * Clean out elements that match the specified conditions
   *
   * @param Element
   * @param Function determines whether a node should be removed
   * @return void
   **/
  _cleanMatchedNodes: function(e, filter) {
    var endOfSearchMarkerNode = this._getNextNode(e, true);
    var next = this._getNextNode(e);
    while (next && next != endOfSearchMarkerNode) {
      if (filter.call(this, next, next.className + " " + next.id)) {
        next = this._removeAndGetNext(next);
      } else {
        next = this._getNextNode(next);
      }
    }
  },

  /**
   * Clean out spurious headers from an Element.
   *
   * @param Element
   * @return void
  **/
  _cleanHeaders: function(e) {
    let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
    this._removeNodes(headingNodes, function(node) {
      let shouldRemove = this._getClassWeight(node) < 0;
      if (shouldRemove) {
        this.log("Removing header with low class weight:", node);
      }
      return shouldRemove;
    });
  },

  /**
   * Check if this node is an H1 or H2 element whose content is mostly
   * the same as the article title.
   *
   * @param Element  the node to check.
   * @return boolean indicating whether this is a title-like header.
   */
  _headerDuplicatesTitle: function(node) {
    if (node.tagName != "H1" && node.tagName != "H2") {
      return false;
    }
    var heading = this._getInnerText(node, false);
    this.log("Evaluating similarity of header:", heading, this._articleTitle);
    return this._textSimilarity(this._articleTitle, heading) > 0.75;
  },

  _flagIsActive: function(flag) {
    return (this._flags & flag) > 0;
  },

  _removeFlag: function(flag) {
    this._flags = this._flags & ~flag;
  },

  _isProbablyVisible: function(node) {
    // Have to null-check node.style and node.className.indexOf to deal with SVG and MathML nodes.
    return (!node.style || node.style.display != "none")
      && !node.hasAttribute("hidden")
      //check for "fallback-image" so that wikimedia math images are displayed
      && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || (node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1));
  },

  /**
   * Runs readability.
   *
   * Workflow:
   *  1. Prep the document by removing script tags, css, etc.
   *  2. Build readability's DOM tree.
   *  3. Grab the article content from the current dom tree.
   *  4. Replace the current DOM tree with the new one.
   *  5. Read peacefully.
   *
   * @return void
   **/
  parse: function () {
    // Avoid parsing too large documents, as per configuration option
    if (this._maxElemsToParse > 0) {
      var numTags = this._doc.getElementsByTagName("*").length;
      if (numTags > this._maxElemsToParse) {
        throw new Error("Aborting parsing document; " + numTags + " elements found");
      }
    }

    // Unwrap image from noscript
    this._unwrapNoscriptImages(this._doc);

    // Extract JSON-LD metadata before removing scripts
    var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);

    // Remove script tags from the document.
    this._removeScripts(this._doc);

    this._prepDocument();

    var metadata = this._getArticleMetadata(jsonLd);
    this._articleTitle = metadata.title;

    var articleContent = this._grabArticle();
    if (!articleContent)
      return null;

    this.log("Grabbed: " + articleContent.innerHTML);

    this._postProcessContent(articleContent);

    // If we haven't found an excerpt in the article's metadata, use the article's
    // first paragraph as the excerpt. This is used for displaying a preview of
    // the article's content.
    if (!metadata.excerpt) {
      var paragraphs = articleContent.getElementsByTagName("p");
      if (paragraphs.length > 0) {
        metadata.excerpt = paragraphs[0].textContent.trim();
      }
    }

    var textContent = articleContent.textContent;
    return {
      title: this._articleTitle,
      byline: metadata.byline || this._articleByline,
      dir: this._articleDir,
      content: this._serializer(articleContent),
      textContent: textContent,
      length: textContent.length,
      excerpt: metadata.excerpt,
      siteName: metadata.siteName || this._articleSiteName
    };
  }
};

if (true) {
  module.exports = Readability;
}


/***/ }),

/***/ "./node_modules/@mozilla/readability/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Readability = __webpack_require__("./node_modules/@mozilla/readability/Readability.js");
var isProbablyReaderable = __webpack_require__("./node_modules/@mozilla/readability/Readability-readerable.js");

module.exports = {
  Readability: Readability,
  isProbablyReaderable: isProbablyReaderable
};


/***/ }),

/***/ "./src/ui/ChapterList.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#test-page-div {\n  max-height: 300px;\n  overflow-y: scroll;\n}\n#test-page-div table {\n  text-align: center;\n}\n#test-page-div td {\n  all: revert;\n  padding-top: 0.3em;\n}\n#test-page-div td > img {\n  max-height: 15em;\n}\n#test-page-div tr > td:nth-child(1) {\n  font-weight: bold;\n  min-width: 7em;\n}\n#test-page-div tr > td:nth-child(2) div,\n#test-page-div tr > td:nth-child(2) p {\n  text-align: left;\n}\n#test-page-div hr {\n  margin-top: 1.5em;\n  margin-bottom: 1.5em;\n}\n#test-page-div h2 {\n  text-align: center;\n  margin-bottom: 1.3em;\n}\n#test-page-div h4 {\n  text-align: center;\n}\n#test-page-div .chapter p {\n  line-height: 1.4;\n}\n#test-page-div .chapter img {\n  max-width: 95%;\n}\n#test-page-div .preview-chapter-setting {\n  text-align: center;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/button.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button-div {\n  position: fixed;\n  top: 15%;\n  right: 5%;\n  z-index: 10000;\n}\n.button-div button {\n  border-style: none;\n  text-align: center;\n  vertical-align: baseline;\n  background-color: rgba(128, 128, 128, 0.2);\n  padding: 3px;\n  border-radius: 12px;\n  min-width: auto;\n  min-height: auto;\n}\n.button-div img.start,\n.button-div img.jump {\n  height: 2em;\n}\n.button-div img.setting {\n  height: 1em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/setting.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".nd-setting-body {\n  background: #e0e0e0;\n  padding: 1em;\n  border-top-right-radius: 3px;\n}\n.nd-setting-body hr {\n  margin-top: 0.8em;\n  margin-bottom: 0.8em;\n}\n.nd-setting-body input[type=\"checkbox\"],\n.nd-setting-body input[type=\"radio\"],\n.nd-setting-body input[type=\"text\"] {\n  position: static;\n  opacity: 1;\n  all: revert;\n}\ndialog-ui .tab-button {\n  padding: 6px 10px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  background: #f0f0f0;\n  margin-bottom: -1px;\n  margin-right: -1px;\n  color: black;\n  line-height: normal;\n  display: inline-block;\n  text-align: center;\n  font-weight: bold;\n  max-width: 9em;\n  box-sizing: initial;\n}\ndialog-ui .tab-button:hover {\n  background: #e0e0e0;\n}\ndialog-ui .tab-button.active {\n  background: #e0e0e0;\n}\ndialog-ui #nd-setting-tab-1 input + label {\n  all: revert;\n}\ndialog-ui #nd-setting-tab-2 select {\n  all: revert;\n}\n.nd-setting-footer {\n  background: #e0e0e0;\n  padding-bottom: 0.7em;\n  text-align: center;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.nd-setting-footer > button {\n  all: revert;\n}\n/* 日志页面 */\n#novel-downloader-log {\n  max-height: 300px;\n  overflow: scroll;\n}\n/* 彩色斜纹 来自：https://www.zhangxinxu.com/wordpress/2021/05/css-html-hr/ */\n.hr-twill-colorful {\n  all: revert;\n  border: 0;\n  padding: 3px;\n  background: linear-gradient(135deg, red, orange, green, blue, purple);\n  --mask-image: repeating-linear-gradient(135deg, #000 0px, #000 1px, transparent 1px, transparent 6px);\n  -webkit-mask-image: var(--mask-image);\n  mask-image: var(--mask-image);\n}\n/* 两头虚 来自：https://www.zhangxinxu.com/wordpress/2021/05/css-html-hr/ */\n.hr-edge-weak {\n  all: revert;\n  border: 0;\n  padding-top: 1px;\n  background: linear-gradient(to right, transparent, #d0d0d5, transparent);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/save/main.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "h1 {\n  line-height: 130%;\n  text-align: center;\n  font-weight: bold;\n  font-size: xxx-large;\n  margin-top: 3.2em;\n  margin-bottom: 3.3em;\n}\nh2 {\n  line-height: 130%;\n  text-align: center;\n  font-weight: bold;\n  font-size: x-large;\n  margin-top: 1.2em;\n  margin-bottom: 2.3em;\n}\ndiv {\n  margin: 0px;\n  padding: 0px;\n  text-align: justify;\n}\np {\n  text-indent: 2em;\n  display: block;\n  line-height: 1.3em;\n  margin-top: 0.4em;\n  margin-bottom: 0.4em;\n}\nimg {\n  vertical-align: text-bottom;\n  max-width: 90%;\n}\n.title {\n  margin-bottom: 0.7em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/save/sgc-toc.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div.sgc-toc-title {\n  font-size: 2em;\n  font-weight: bold;\n  margin-bottom: 1em;\n  text-align: center;\n}\n\ndiv.sgc-toc-level-1 {\n  margin-left: 0em;\n}\n\ndiv.sgc-toc-level-2 {\n  margin-left: 2em;\n}\n\ndiv.sgc-toc-level-3 {\n  margin-left: 2em;\n}\n\ndiv.sgc-toc-level-4 {\n  margin-left: 2em;\n}\n\ndiv.sgc-toc-level-5 {\n  margin-left: 2em;\n}\n\ndiv.sgc-toc-level-6 {\n  margin-left: 2em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/save/toc.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "img {\n  max-width: 100%;\n  max-height: 15em;\n}\n.introduction {\n  font-size: smaller;\n  max-height: 18em;\n  overflow-y: scroll;\n}\n.introduction p {\n  text-indent: 0;\n}\n.bookurl {\n  text-align: center;\n  font-size: smaller;\n  padding-top: 1em;\n  padding-bottom: 0.5em;\n  margin-top: 0.4em;\n}\n.bookurl > a {\n  color: gray;\n}\n.info h3 {\n  padding-left: 0.5em;\n  margin-top: -1.2em;\n  margin-bottom: 0.5em;\n}\n.section {\n  margin-top: 1.5em;\n  display: grid;\n  grid-template-columns: 33% 33% 33%;\n}\n.section > h2:first-child {\n  grid-column-end: span 3;\n}\n.section > .chapter {\n  padding-bottom: 0.3em;\n  text-align: center;\n}\n.main > h1 {\n  margin-top: 1.5em;\n  margin-bottom: 1.5em;\n}\na.disabled {\n  pointer-events: none;\n  cursor: default;\n  color: gray;\n}\n.author::before {\n  content: \"作者：\";\n}\n.author {\n  text-align: center;\n  margin-top: -3em;\n  margin-bottom: 3em;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/save/web.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #f0f0f2;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\",\n    \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\ndiv.main {\n  width: 900px;\n  margin: 5em auto;\n  padding: 2em;\n  background-color: #fdfdff;\n  border-radius: 0.5em;\n  box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);\n}\n@media (max-width: 700px) {\n  div.main {\n    margin: 0 auto;\n    width: auto;\n  }\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/FilterTab.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
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

/***/ "./node_modules/mime-db/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __webpack_require__("./node_modules/mime-db/db.json")


/***/ }),

/***/ "./node_modules/streamsaver/StreamSaver.js":
/***/ (function(module) {

/* global chrome location ReadableStream define MessageChannel TransformStream */

;((name, definition) => {
   true
    ? module.exports = definition()
    : 0
})('streamSaver', () => {
  'use strict'

  const global = typeof window === 'object' ? window : this
  if (!global.HTMLElement) console.warn('streamsaver is meant to run on browsers main thread')

  let mitmTransporter = null
  let supportsTransferable = false
  const test = fn => { try { fn() } catch (e) {} }
  const ponyfill = global.WebStreamsPolyfill || {}
  const isSecureContext = global.isSecureContext
  // TODO: Must come up with a real detection test (#69)
  let useBlobFallback = /constructor/i.test(global.HTMLElement) || !!global.safari || !!global.WebKitPoint
  const downloadStrategy = isSecureContext || 'MozAppearance' in document.documentElement.style
    ? 'iframe'
    : 'navigate'

  const streamSaver = {
    createWriteStream,
    WritableStream: global.WritableStream || ponyfill.WritableStream,
    supported: true,
    version: { full: '2.0.5', major: 2, minor: 0, dot: 5 },
    mitm: 'https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0'
  }

  /**
   * create a hidden iframe and append it to the DOM (body)
   *
   * @param  {string} src page to load
   * @return {HTMLIFrameElement} page to load
   */
  function makeIframe (src) {
    if (!src) throw new Error('meh')
    const iframe = document.createElement('iframe')
    iframe.hidden = true
    iframe.src = src
    iframe.loaded = false
    iframe.name = 'iframe'
    iframe.isIframe = true
    iframe.postMessage = (...args) => iframe.contentWindow.postMessage(...args)
    iframe.addEventListener('load', () => {
      iframe.loaded = true
    }, { once: true })
    document.body.appendChild(iframe)
    return iframe
  }

  /**
   * create a popup that simulates the basic things
   * of what a iframe can do
   *
   * @param  {string} src page to load
   * @return {object}     iframe like object
   */
  function makePopup (src) {
    const options = 'width=200,height=100'
    const delegate = document.createDocumentFragment()
    const popup = {
      frame: global.open(src, 'popup', options),
      loaded: false,
      isIframe: false,
      isPopup: true,
      remove () { popup.frame.close() },
      addEventListener (...args) { delegate.addEventListener(...args) },
      dispatchEvent (...args) { delegate.dispatchEvent(...args) },
      removeEventListener (...args) { delegate.removeEventListener(...args) },
      postMessage (...args) { popup.frame.postMessage(...args) }
    }

    const onReady = evt => {
      if (evt.source === popup.frame) {
        popup.loaded = true
        global.removeEventListener('message', onReady)
        popup.dispatchEvent(new Event('load'))
      }
    }

    global.addEventListener('message', onReady)

    return popup
  }

  try {
    // We can't look for service worker since it may still work on http
    new Response(new ReadableStream())
    if (isSecureContext && !('serviceWorker' in navigator)) {
      useBlobFallback = true
    }
  } catch (err) {
    useBlobFallback = true
  }

  test(() => {
    // Transfariable stream was first enabled in chrome v73 behind a flag
    const { readable } = new TransformStream()
    const mc = new MessageChannel()
    mc.port1.postMessage(readable, [readable])
    mc.port1.close()
    mc.port2.close()
    supportsTransferable = true
    // Freeze TransformStream object (can only work with native)
    Object.defineProperty(streamSaver, 'TransformStream', {
      configurable: false,
      writable: false,
      value: TransformStream
    })
  })

  function loadTransporter () {
    if (!mitmTransporter) {
      mitmTransporter = isSecureContext
        ? makeIframe(streamSaver.mitm)
        : makePopup(streamSaver.mitm)
    }
  }

  /**
   * @param  {string} filename filename that should be used
   * @param  {object} options  [description]
   * @param  {number} size     depricated
   * @return {WritableStream<Uint8Array>}
   */
  function createWriteStream (filename, options, size) {
    let opts = {
      size: null,
      pathname: null,
      writableStrategy: undefined,
      readableStrategy: undefined
    }

    let bytesWritten = 0 // by StreamSaver.js (not the service worker)
    let downloadUrl = null
    let channel = null
    let ts = null

    // normalize arguments
    if (Number.isFinite(options)) {
      [ size, options ] = [ options, size ]
      console.warn('[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream')
      opts.size = size
      opts.writableStrategy = options
    } else if (options && options.highWaterMark) {
      console.warn('[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream')
      opts.size = size
      opts.writableStrategy = options
    } else {
      opts = options || {}
    }
    if (!useBlobFallback) {
      loadTransporter()

      channel = new MessageChannel()

      // Make filename RFC5987 compatible
      filename = encodeURIComponent(filename.replace(/\//g, ':'))
        .replace(/['()]/g, escape)
        .replace(/\*/g, '%2A')

      const response = {
        transferringReadable: supportsTransferable,
        pathname: opts.pathname || Math.random().toString().slice(-6) + '/' + filename,
        headers: {
          'Content-Type': 'application/octet-stream; charset=utf-8',
          'Content-Disposition': "attachment; filename*=UTF-8''" + filename
        }
      }

      if (opts.size) {
        response.headers['Content-Length'] = opts.size
      }

      const args = [ response, '*', [ channel.port2 ] ]

      if (supportsTransferable) {
        const transformer = downloadStrategy === 'iframe' ? undefined : {
          // This transformer & flush method is only used by insecure context.
          transform (chunk, controller) {
            if (!(chunk instanceof Uint8Array)) {
              throw new TypeError('Can only wirte Uint8Arrays')
            }
            bytesWritten += chunk.length
            controller.enqueue(chunk)

            if (downloadUrl) {
              location.href = downloadUrl
              downloadUrl = null
            }
          },
          flush () {
            if (downloadUrl) {
              location.href = downloadUrl
            }
          }
        }
        ts = new streamSaver.TransformStream(
          transformer,
          opts.writableStrategy,
          opts.readableStrategy
        )
        const readableStream = ts.readable

        channel.port1.postMessage({ readableStream }, [ readableStream ])
      }

      channel.port1.onmessage = evt => {
        // Service worker sent us a link that we should open.
        if (evt.data.download) {
          // Special treatment for popup...
          if (downloadStrategy === 'navigate') {
            mitmTransporter.remove()
            mitmTransporter = null
            if (bytesWritten) {
              location.href = evt.data.download
            } else {
              downloadUrl = evt.data.download
            }
          } else {
            if (mitmTransporter.isPopup) {
              mitmTransporter.remove()
              mitmTransporter = null
              // Special case for firefox, they can keep sw alive with fetch
              if (downloadStrategy === 'iframe') {
                makeIframe(streamSaver.mitm)
              }
            }

            // We never remove this iframes b/c it can interrupt saving
            makeIframe(evt.data.download)
          }
        }
      }

      if (mitmTransporter.loaded) {
        mitmTransporter.postMessage(...args)
      } else {
        mitmTransporter.addEventListener('load', () => {
          mitmTransporter.postMessage(...args)
        }, { once: true })
      }
    }

    let chunks = []

    return (!useBlobFallback && ts && ts.writable) || new streamSaver.WritableStream({
      write (chunk) {
        if (!(chunk instanceof Uint8Array)) {
          throw new TypeError('Can only wirte Uint8Arrays')
        }
        if (useBlobFallback) {
          // Safari... The new IE6
          // https://github.com/jimmywarting/StreamSaver.js/issues/69
          //
          // even doe it has everything it fails to download anything
          // that comes from the service worker..!
          chunks.push(chunk)
          return
        }

        // is called when a new chunk of data is ready to be written
        // to the underlying sink. It can return a promise to signal
        // success or failure of the write operation. The stream
        // implementation guarantees that this method will be called
        // only after previous writes have succeeded, and never after
        // close or abort is called.

        // TODO: Kind of important that service worker respond back when
        // it has been written. Otherwise we can't handle backpressure
        // EDIT: Transfarable streams solvs this...
        channel.port1.postMessage(chunk)
        bytesWritten += chunk.length

        if (downloadUrl) {
          location.href = downloadUrl
          downloadUrl = null
        }
      },
      close () {
        if (useBlobFallback) {
          const blob = new Blob(chunks, { type: 'application/octet-stream; charset=utf-8' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = filename
          link.click()
        } else {
          channel.port1.postMessage('end')
        }
      },
      abort () {
        chunks = []
        channel.port1.postMessage('abort')
        channel.port1.onmessage = null
        channel.port1.close()
        channel.port2.close()
        channel = null
      }
    }, opts.writableStrategy)
  }

  return streamSaver
})


/***/ }),

/***/ "./src/detect.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "yt": () => (/* binding */ streamSupport),
/* harmony export */   "Cm": () => (/* binding */ mitmPageAvailability),
/* harmony export */   "Ty": () => (/* binding */ environments)
/* harmony export */ });
/* harmony import */ var _lib_GM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/GM.ts");
/* harmony import */ var _lib_localStorageExpired__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/lib/localStorageExpired.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/setting.ts");



function checkObjct(name) {
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
function streamSupport() {
    return (typeof ReadableStream !== "undefined" &&
        typeof WritableStream !== "undefined" &&
        typeof TransformStream !== "undefined");
}
function mitmPageAvailability(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((resp) => resolve(true))
            .catch((error) => resolve(false));
    });
}
const environments = async () => ({
    当前时间: new Date().toISOString(),
    当前页URL: document.location.href,
    workerId: window.workerId,
    当前页Referrer: document.referrer,
    浏览器UA: navigator.userAgent,
    浏览器语言: navigator.languages,
    设备运行平台: navigator.platform,
    设备内存: navigator.deviceMemory ?? "",
    CPU核心数: navigator.hardwareConcurrency,
    eval: checkObjct("eval"),
    fetch: checkObjct("fetch"),
    XMLHttpRequest: checkObjct("XMLHttpRequest"),
    streamSupport: streamSupport(),
    window: Object.keys(window).length,
    localStorage: (0,_lib_localStorageExpired__WEBPACK_IMPORTED_MODULE_0__/* .storageAvailable */ .o)("localStorage"),
    sessionStorage: (0,_lib_localStorageExpired__WEBPACK_IMPORTED_MODULE_0__/* .storageAvailable */ .o)("sessionStorage"),
    Cookie: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack ?? 0,
    enableDebug: _setting__WEBPACK_IMPORTED_MODULE_1__/* .enableDebug.value */ .Cy.value,
    ScriptHandler: _lib_GM__WEBPACK_IMPORTED_MODULE_2__/* ._GM_info.scriptHandler */ ._p.scriptHandler,
    "ScriptHandler version": _lib_GM__WEBPACK_IMPORTED_MODULE_2__/* ._GM_info.version */ ._p.version,
    "Novel-downloader version": _lib_GM__WEBPACK_IMPORTED_MODULE_2__/* ._GM_info.script.version */ ._p.script.version,
});


/***/ }),

/***/ "./src/lib/GM.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_p": () => (/* binding */ _GM_info),
/* harmony export */   "UX": () => (/* binding */ _GM_xmlhttpRequest),
/* harmony export */   "_u": () => (/* binding */ _GM_setValue),
/* harmony export */   "QG": () => (/* binding */ _GM_getValue),
/* harmony export */   "jF": () => (/* binding */ _GM_deleteValue)
/* harmony export */ });
function get_GM_info() {
    if (typeof GM_info !== "undefined") {
        return GM_info;
    }
    if (typeof GM !== "undefined" && typeof GM.info !== "undefined") {
        return GM.info;
    }
    throw new Error("Not found: GM_info and GM.info!");
}
const _GM_info = get_GM_info();
function _GM_xmlhttpRequest(details) {
    if (typeof GM_xmlhttpRequest === "function") {
        GM_xmlhttpRequest(details);
        return;
    }
    if (typeof GM !== "undefined" && typeof GM.xmlHttpRequest === "function") {
        GM.xmlHttpRequest(details);
        return;
    }
    throw new Error("Not found: GM_xmlhttpRequest or GM.xmlHttpRequest!");
}
async function _GM_setValue(name, value) {
    if (typeof GM_setValue === "function") {
        return GM_setValue(name, value);
    }
    if (typeof GM !== "undefined" && typeof GM.setValue === "function") {
        return await GM.setValue(name, value);
    }
    throw new Error("Not found: GM_setValue or GM.setValue!");
}
async function _GM_getValue(name, defaultValue) {
    if (typeof GM_getValue === "function") {
        return GM_getValue(name, defaultValue);
    }
    if (typeof GM !== "undefined" && typeof GM.getValue === "function") {
        return await GM.getValue(name, defaultValue);
    }
    throw new Error("Not found: GM_getValue or GM.getValue!");
}
async function _GM_deleteValue(name) {
    if (typeof GM_deleteValue === "function") {
        return GM_deleteValue(name);
    }
    if (typeof GM !== "undefined" && typeof GM.deleteValue === "function") {
        return await GM.deleteValue(name);
    }
    throw new Error("Not found: GM_deleteValue or GM.deleteValue!");
}


/***/ }),

/***/ "./src/lib/attachments.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gc": () => (/* binding */ getAttachmentClassCache),
/* harmony export */   "dK": () => (/* binding */ putAttachmentClassCache),
/* harmony export */   "pN": () => (/* binding */ clearAttachmentClassCache),
/* harmony export */   "CE": () => (/* binding */ getImageAttachment),
/* harmony export */   "VO": () => (/* binding */ getRandomName),
/* harmony export */   "r6": () => (/* binding */ getExt)
/* harmony export */ });
/* harmony import */ var _main_Attachment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/main/Attachment.ts");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/hash.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/misc.ts");




let attachmentClassCache = [];
function getAttachmentClassCache(url) {
    const found = attachmentClassCache.find((attachmentClass) => attachmentClass.url === url);
    return found;
}
function putAttachmentClassCache(attachmentClass) {
    attachmentClassCache.push(attachmentClass);
    return true;
}
function clearAttachmentClassCache() {
    attachmentClassCache = [];
}
async function getImageAttachment(url, imgMode, prefix = "", noMD5 = false, comments = getRandomName(), options) {
    if (imgMode === "naive") {
        const u = new URL(url);
        if (document.location.protocol === "https:" && u.protocol === "http:") {
            u.protocol = document.location.protocol;
            url = u.href;
        }
    }
    const imgClassCache = getAttachmentClassCache(url);
    if (imgClassCache) {
        return imgClassCache;
    }
    const imgClass = new _main_Attachment__WEBPACK_IMPORTED_MODULE_0__/* .AttachmentClass */ .J(url, comments, imgMode, options?.referrerMode, options?.customReferer);
    imgClass.comments = comments;
    const blob = await imgClass.init();
    if (blob) {
        if (noMD5) {
            imgClass.name = getLastPart(url);
        }
        else {
            const hash = await (0,_hash__WEBPACK_IMPORTED_MODULE_1__/* .calculateSha1 */ .K)(blob);
            const ext = getExt(blob, url);
            imgClass.name = [prefix, hash, ".", ext].join("");
        }
    }
    putAttachmentClassCache(imgClass);
    _log__WEBPACK_IMPORTED_MODULE_2___default().debug(`[attachment]下载附件完成！ url:${imgClass.url}, name: ${imgClass.name}`);
    return imgClass;
}
function getRandomName() {
    return `__${(0,_misc__WEBPACK_IMPORTED_MODULE_3__/* .randomUUID */ .HP)()}__`;
}
function getExt(b, u) {
    const contentType = b.type.split(";")[0].split("/")[1];
    const contentTypeBlackList = ["octet-stream"];
    if (contentTypeBlackList.includes(contentType)) {
        return getExtFromUrl(u);
    }
    else {
        return contentType;
    }
}
function getExtFromUrl(u) {
    const _u = new URL(u);
    const p = _u.pathname;
    return p.substring(p.lastIndexOf(".") + 1);
}
function getLastPart(u) {
    const _u = new URL(u);
    const p = _u.pathname;
    return p.substring(p.lastIndexOf("/") + 1);
}


/***/ }),

/***/ "./src/lib/cleanDOM.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zM": () => (/* binding */ cleanDOM),
/* harmony export */   "iA": () => (/* binding */ htmlTrim),
/* harmony export */   "d1": () => (/* binding */ convertFixWidthText),
/* harmony export */   "FZ": () => (/* binding */ convertFixWidth),
/* harmony export */   "Kg": () => (/* binding */ isFixWidth)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _attachments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");



const BlockElements = [
    "address",
    "article",
    "aside",
    "blockquote",
    "details",
    "dialog",
    "dd",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul",
];
const InlineElements = [
    "a",
    "abbr",
    "acronym",
    "audio",
    "b",
    "bdi",
    "bdo",
    "big",
    "br",
    "button",
    "canvas",
    "cite",
    "code",
    "data",
    "datalist",
    "del",
    "dfn",
    "em",
    "embed",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "map",
    "mark",
    "meter",
    "noscript",
    "object",
    "output",
    "picture",
    "progress",
    "q",
    "ruby",
    "s",
    "samp",
    "script",
    "select",
    "slot",
    "small",
    "span",
    "font",
    "strong",
    "sub",
    "sup",
    "svg",
    "template",
    "textarea",
    "time",
    "u",
    "tt",
    "var",
    "video",
    "wbr",
];
const keepElements = [
    "aside",
    "blockquote",
    "details",
    "figure",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "ul",
    "ol",
    "li",
    "pre",
];
const IgnoreElements = [
    "#comment",
    "fieldset",
    "legend",
    "input",
    "label",
    "form",
    "audio",
    "button",
    "canvas",
    "datalist",
    "embed",
    "iframe",
    "map",
    "meter",
    "noscript",
    "object",
    "output",
    "progress",
    "script",
    "style",
    "link",
    "select",
    "slot",
    "svg",
    "template",
    "video",
    "wbr",
    "table",
];
function isBaseElem(node) {
    const nodeName = node.nodeName.toLowerCase();
    if (node instanceof Text) {
        return true;
    }
    if (node.childElementCount === 0) {
        return true;
    }
    if (InlineElements.includes(nodeName)) {
        return true;
    }
    return Array.from(node.children).every((child) => {
        const n = child.nodeName.toLowerCase();
        return InlineElements.includes(n);
    });
}
function isBaseElemWithKeep(node) {
    const nodeName = node.nodeName.toLowerCase();
    if (keepElements.includes(nodeName)) {
        return true;
    }
    return isBaseElem(node);
}
function* findBase(elem, withKeep = true) {
    let is;
    if (withKeep) {
        is = isBaseElemWithKeep;
    }
    else {
        is = isBaseElem;
    }
    const childNodes = Array.from(elem.childNodes).filter((node) => {
        if (node instanceof Text) {
            const textContent = node.textContent;
            if (textContent === null) {
                return false;
            }
            if (textContent.trim() === "") {
                return false;
            }
        }
        return true;
    });
    for (const child of childNodes) {
        const childNodeName = child.nodeName.toLowerCase();
        if (IgnoreElements.includes(childNodeName) === false) {
            if (is(child)) {
                yield child;
            }
            else {
                yield* findBase(child, withKeep);
            }
        }
    }
}
async function cleanDOM(elem, imgMode, options) {
    const baseNodes = [...findBase(elem)];
    const _obj = await loop(baseNodes, document.createElement("div"));
    const obj = await awaitImages(_obj);
    const output = postHook(obj);
    return output;
    async function blockElement(element) {
        const map = new Map();
        const divList = [
            "article",
            "dialog",
            "div",
            "footer",
            "header",
            "main",
            "section",
            "hgroup",
        ];
        function div(elem) {
            if (elem instanceof HTMLElement) {
                const nodes = [...findBase(elem)];
                return loop(nodes, document.createElement("div"));
            }
            return null;
        }
        divList.forEach((n) => map.set(n, div));
        const pList = ["address", "p", "dd", "dt", "figcaption", "dl"];
        function p(elem) {
            if (elem instanceof HTMLElement) {
                const nodes = [...findBase(elem)];
                return loop(nodes, document.createElement("p"));
            }
            return null;
        }
        pList.forEach((n) => map.set(n, p));
        const blockquoteList = ["aside", "blockquote"];
        async function blockquote(elem) {
            if (elem instanceof HTMLElement) {
                const nodes = [...findBase(elem)];
                const { dom, text, images } = await loop(nodes, document.createElement("blockquote"));
                const outText = text
                    .split("\n")
                    .map((l) => l.replace(/^/, "> "))
                    .join("\n");
                return {
                    dom,
                    text: outText,
                    images,
                };
            }
            return null;
        }
        blockquoteList.forEach((n) => map.set(n, blockquote));
        const headerList = ["h1", "h2", "h3", "h4", "h5", "h6"];
        function header(elem) {
            if (elem instanceof HTMLElement) {
                const nodeName = elem.nodeName.toLowerCase();
                const n = parseInt(nodeName.substring(1));
                const dom = document.createElement(nodeName);
                dom.innerHTML = elem.innerHTML;
                const text = "#".repeat(n) + " " + elem.innerText;
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        headerList.forEach((n) => map.set(n, header));
        const preList = ["pre", "textarea"];
        function pre(elem) {
            if (elem instanceof HTMLElement) {
                const dom = document.createElement("pre");
                dom.innerHTML = elem.innerHTML;
                const text = "```\n" + elem.innerText + "\n```";
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        preList.forEach((n) => map.set(n, pre));
        function hr(elem) {
            const dom = document.createElement("hr");
            const text = "-".repeat(20);
            const images = [];
            return {
                dom,
                text,
                images,
            };
        }
        map.set("hr", hr);
        async function common1(boldName, baseName, elem) {
            const bold = elem.querySelector(boldName);
            let s;
            let sText = "";
            if (bold instanceof HTMLElement) {
                s = document.createElement(boldName);
                s.innerHTML = bold.innerHTML;
                sText = "**" + bold.innerText + "**";
                bold.remove();
            }
            const base = document.createElement(baseName);
            if (s)
                base.appendChild(s);
            const nodes = [...findBase(elem)];
            const { dom, text, images } = await loop(nodes, base);
            const outText = sText + "\n\n" + text;
            return {
                dom,
                text: outText,
                images,
            };
        }
        function details(elem) {
            return common1("summary", "details", elem);
        }
        map.set("details", details);
        function figure(elem) {
            return common1("figcaption", "figure", elem);
        }
        map.set("figure", figure);
        function listItem(elem) {
            if (elem instanceof HTMLLIElement) {
                const dom = document.createElement("li");
                dom.innerHTML = elem.innerHTML;
                let prefix = "-   ";
                const parent = elem.parentNode;
                if (parent instanceof HTMLOListElement) {
                    const start = parent.getAttribute("start");
                    const index = Array.prototype.indexOf.call(parent.children, elem);
                    prefix = (start ? Number(start) + index : index + 1) + ".  ";
                }
                const text = prefix + elem.innerText;
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        map.set("li", listItem);
        const listList = ["ul", "ol"];
        function list(elem) {
            const nodeName = elem.nodeName.toLowerCase();
            if (elem instanceof HTMLUListElement ||
                elem instanceof HTMLOListElement) {
                const tdom = document.createElement(nodeName);
                const nodes = [...findBase(elem)];
                return loop(nodes, tdom);
            }
            return null;
        }
        listList.forEach((n) => map.set(n, list));
        const nodeName = element.nodeName.toLowerCase();
        const fn = map.get(nodeName);
        if (fn) {
            return fn(element);
        }
        else {
            return p(element);
        }
    }
    async function inlineElement(element) {
        const map = new Map();
        const defaultList = [
            "abbr",
            "acronym",
            "bdi",
            "bdo",
            "cite",
            "data",
            "dfn",
            "span",
            "font",
            "time",
            "u",
            "tt",
            "#text",
        ];
        async function defaultHandler(elem) {
            if ((elem instanceof HTMLElement && elem.childElementCount === 0) ||
                elem instanceof Text) {
                let text;
                if (elem instanceof HTMLElement) {
                    text = elem.innerText.trim();
                }
                if (elem instanceof Text) {
                    text = elem.textContent?.trim() ?? "";
                }
                if (typeof text === "string") {
                    const dom = new Text(text);
                    const images = [];
                    return {
                        dom,
                        text: text.replaceAll("\n", ""),
                        images,
                    };
                }
            }
            if (elem instanceof HTMLElement && elem.childElementCount !== 0) {
                const nodes = [...findBase(elem)];
                const { dom, text, images } = await loop(nodes, document.createElement(elem.nodeName.toLowerCase()));
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        defaultList.forEach((n) => map.set(n, defaultHandler));
        async function a(elem) {
            if (elem instanceof HTMLAnchorElement) {
                if (elem.childElementCount === 0) {
                    if (elem.href.startsWith("https://") ||
                        elem.href.startsWith("http://")) {
                        const { href, textContent } = elem;
                        const dom = document.createElement("a");
                        dom.href = href;
                        dom.textContent = textContent;
                        const text = `[${textContent}](${href})`;
                        const images = [];
                        return {
                            dom,
                            text,
                            images,
                        };
                    }
                }
                else {
                    const outterA = document.createElement("a");
                    if (elem.href.startsWith("https://") ||
                        elem.href.startsWith("http://")) {
                        outterA.href = elem.href;
                    }
                    const nodes = [...findBase(elem)];
                    const { dom, text, images } = await loop(nodes, outterA);
                    return {
                        dom,
                        text,
                        images,
                    };
                }
            }
            return null;
        }
        map.set("a", a);
        function getImg(url) {
            const imgClassCache = (0,_attachments__WEBPACK_IMPORTED_MODULE_0__/* .getAttachmentClassCache */ .gc)(url);
            if (imgClassCache) {
                const dom = document.createElement("img");
                dom.setAttribute("data-src-address", imgClassCache.name);
                dom.alt = url;
                const text = `![${url}](${imgClassCache.name})`;
                const images = [imgClassCache];
                return {
                    dom,
                    text,
                    images,
                };
            }
            else {
                const comments = (0,_attachments__WEBPACK_IMPORTED_MODULE_0__/* .getRandomName */ .VO)();
                const noMd5 = options?.keepImageName ?? false;
                const imgOptions = {
                    referrerMode: options?.referrerMode,
                    customReferer: options?.customReferer,
                };
                const imgClass = (0,_attachments__WEBPACK_IMPORTED_MODULE_0__/* .getImageAttachment */ .CE)(url, imgMode, "chapter-", noMd5, comments, imgOptions);
                const dom = document.createElement("img");
                dom.setAttribute("data-src-address", comments);
                dom.alt = url;
                const text = `![${url}](${comments})`;
                const images = [imgClass];
                return {
                    dom,
                    text,
                    images,
                };
            }
        }
        function img(elem) {
            if (elem instanceof HTMLImageElement) {
                const url = elem.src;
                return getImg(url);
            }
            return null;
        }
        map.set("img", img);
        function picture(elem) {
            if (elem instanceof HTMLPictureElement) {
                const img = elem.querySelector("img");
                if (img) {
                    const url = img.src;
                    return getImg(url);
                }
                else {
                    _log__WEBPACK_IMPORTED_MODULE_1___default().warn("[cleanDom][picture]未发现<img>", elem);
                    return null;
                }
            }
            return null;
        }
        map.set("picture", picture);
        function ruby(elem) {
            if (elem instanceof HTMLElement) {
                const dom = elem.cloneNode(true);
                const text = elem.innerText;
                const images = [];
                return {
                    dom,
                    text,
                    images,
                };
            }
            return null;
        }
        map.set("ruby", ruby);
        function br(elem) {
            const dom = document.createElement("br");
            const text = "\n";
            const images = [];
            return {
                dom,
                text,
                images,
            };
        }
        map.set("br", br);
        async function common(nodeName, getText, elem) {
            if (elem instanceof HTMLElement) {
                if (elem.childElementCount === 0) {
                    const textContent = elem.innerText.trim();
                    const dom = document.createElement(nodeName);
                    dom.innerText = textContent;
                    const text = getText(textContent);
                    const images = [];
                    return {
                        dom,
                        text,
                        images,
                    };
                }
                else {
                    const nodes = [...findBase(elem)];
                    const { dom, text, images } = await loop(nodes, document.createElement(nodeName));
                    return {
                        dom,
                        text,
                        images,
                    };
                }
            }
            return null;
        }
        const strongList = ["b", "big", "mark", "samp", "strong"];
        function strong(elem) {
            return common("strong", (textContent) => `**${textContent.replaceAll("\n", "**\n**")}**`, elem);
        }
        strongList.forEach((n) => map.set(n, strong));
        const codeList = ["code", "kbd"];
        function code(elem) {
            return common("code", (textContent) => `\`${textContent}\``, elem);
        }
        codeList.forEach((n) => map.set(n, code));
        const sList = ["del", "s"];
        function s(elem) {
            return common("s", (textContent) => `~~${textContent}~~`, elem);
        }
        sList.forEach((n) => map.set(n, s));
        const emList = ["em", "i", "q", "var"];
        function em(elem) {
            return common("em", (textContent) => `*${textContent}*`, elem);
        }
        emList.forEach((n) => map.set(n, em));
        function ins(elem) {
            return common("ins", (textContent) => `++${textContent}++`, elem);
        }
        map.set("ins", ins);
        function small(elem) {
            return common("small", (textContent) => `<small>${textContent}</small>`, elem);
        }
        map.set("small", small);
        function sup(elem) {
            return common("sup", (textContent) => `<sup>${textContent}</sup>`, elem);
        }
        map.set("sup", sup);
        function sub(elem) {
            return common("sub", (textContent) => `<sub>${textContent}</sub>`, elem);
        }
        map.set("sub", sub);
        const nodeName = element.nodeName.toLowerCase();
        const fn = map.get(nodeName);
        if (fn) {
            return fn(element);
        }
        else {
            const output = defaultHandler(element);
            _log__WEBPACK_IMPORTED_MODULE_1___default().warn("[cleanDom]发现未知行内元素！");
            _log__WEBPACK_IMPORTED_MODULE_1___default().warn([element.nodeName.toLowerCase(), element]);
            return output;
        }
    }
    async function loop(nodes, _outDom) {
        let _outText = "";
        let _outImages = [];
        for (const node of nodes) {
            const bNname = node.nodeName.toLowerCase();
            if (bNname === "textarea" || BlockElements.includes(bNname)) {
                if (node instanceof HTMLElement) {
                    const tobj = await blockElement(node);
                    if (tobj) {
                        const { dom: tdom, text: ttext, images: timages } = tobj;
                        _outDom.appendChild(tdom);
                        _outText = _outText + "\n" + ttext + "\n";
                        _outImages = _outImages.concat(timages);
                        continue;
                    }
                }
            }
            if (node instanceof Text || InlineElements.includes(bNname)) {
                const tobj = await inlineElement(node);
                if (tobj) {
                    const { dom: tdom, text: ttext, images: timages } = tobj;
                    _outDom.appendChild(tdom);
                    _outText = _outText + ttext;
                    _outImages = _outImages.concat(timages);
                    continue;
                }
            }
        }
        return {
            dom: _outDom,
            text: _outText,
            images: _outImages,
        };
    }
    async function awaitImages({ dom, text, images, }) {
        const iImages = await Promise.all(images);
        iImages.forEach((image) => {
            dom.innerHTML = dom.innerHTML.replaceAll(image.comments, image.name);
            text = text.replaceAll(image.comments, image.name);
        });
        return {
            dom,
            text,
            images: iImages,
        };
    }
    function postHook({ dom, text, images, }) {
        htmlTrim(dom);
        dom = convertBr(dom);
        Array.from(dom.children).forEach((child) => child.replaceWith(convertBr(child)));
        text = text.trim();
        return {
            dom,
            text,
            images,
        };
    }
}
function htmlTrim(dom) {
    const childNodes = Array.from(dom.childNodes);
    remove(childNodes);
    const childNodesR = Array.from(dom.childNodes).reverse();
    remove(childNodesR);
    function remove(nodes) {
        for (const node of nodes) {
            if (node instanceof Text) {
                if (node.textContent?.trim() === "") {
                    node.remove();
                    continue;
                }
                else {
                    break;
                }
            }
            if (node instanceof HTMLBRElement) {
                node.remove();
                continue;
            }
            if (node instanceof HTMLElement && node.nodeName.toLowerCase() !== "br") {
                break;
            }
        }
    }
}
function convertBr(dom) {
    if (onlyTextAndBr(dom) && countBr(dom) > 4) {
        const outDom = document.createElement("div");
        const childNodes = dom.childNodes;
        let brCount = 0;
        let buffer = [];
        for (const node of Array.from(childNodes)) {
            if (node instanceof HTMLBRElement) {
                if (brCount === 0 && buffer.length !== 0) {
                    const p = document.createElement("p");
                    buffer.forEach((n) => p.appendChild(n));
                    outDom.appendChild(p);
                    buffer = [];
                }
                brCount++;
                continue;
            }
            if (node instanceof HTMLHRElement) {
                brCount = 0;
                if (buffer.length !== 0) {
                    const p = document.createElement("p");
                    buffer.forEach((n) => p.appendChild(n));
                    outDom.appendChild(p);
                    buffer = [];
                }
                const hr = document.createElement("hr");
                outDom.appendChild(hr);
                continue;
            }
            if (brCount === 0) {
                buffer.push(node);
                continue;
            }
            else {
                if (brCount > 2) {
                    let brRemainder = brCount - 2;
                    const brp = document.createElement("p");
                    while (brRemainder > 0) {
                        brRemainder--;
                        const br = document.createElement("br");
                        brp.appendChild(br);
                    }
                    outDom.appendChild(brp);
                }
                brCount = 0;
                buffer.push(node);
                continue;
            }
        }
        brCount = 0;
        if (buffer.length !== 0) {
            const p = document.createElement("p");
            buffer.forEach((n) => p.appendChild(n));
            outDom.appendChild(p);
            buffer = [];
        }
        return outDom;
    }
    else {
        return dom;
    }
    function countBr(d) {
        return Array.from(d.childNodes).filter((n) => n instanceof HTMLBRElement)
            .length;
    }
    function onlyTextAndBr(d) {
        return Array.from(d.childNodes)
            .map((n) => n.nodeName.toLowerCase())
            .every((nn) => ["#text", "hr", ...InlineElements].includes(nn));
    }
}
function removeBlankParagraphElement(dom) {
    const nodes = Array.from(dom.querySelectorAll("p"));
    nodes
        .filter((p) => p.innerText.trim() === "" && p.childElementCount === 0)
        .forEach((p) => p.remove());
}
function convertFixWidthText(node, width = 35, out = document.createElement("div")) {
    const ns = node.textContent?.split("\n") ?? [];
    let text = "";
    for (const n of ns) {
        if (n === "") {
            out.appendChild(new Text(text));
            out.appendChild(document.createElement("br"));
            text = "";
            continue;
        }
        if ((0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(n) > width - 5 && (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(n) < width + 5) {
            text = text + n;
            continue;
        }
        else {
            if (text !== "") {
                text = text + n;
                out.appendChild(new Text(text));
                out.appendChild(document.createElement("br"));
                text = "";
                continue;
            }
            else {
                out.appendChild(new Text(n));
                out.appendChild(document.createElement("br"));
                continue;
            }
        }
    }
    if (text !== "") {
        out.appendChild(new Text(text));
        out.appendChild(document.createElement("br"));
        text = "";
    }
    htmlTrim(out);
    return convertBr(out);
}
function convertFixWidth(node, width = 35) {
    Array.from(node.querySelectorAll("br")).forEach((node) => {
        const previous = node.previousSibling;
        const next = node.nextSibling;
        if (previous instanceof Text &&
            next instanceof Text &&
            (previous.textContent ? (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(previous.textContent) : 0) >
                width - 5 &&
            (previous.textContent ? (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(previous.textContent) : 0) <
                width + 5) {
            node.remove();
        }
    });
    const group = (texts) => {
        const out = [];
        let group = [];
        let whole = "";
        for (const text of texts) {
            const w = text.wholeText;
            if (whole !== w) {
                if (group.length !== 0) {
                    out.push(group);
                }
                whole = w;
                group = [text];
            }
            else {
                group.push(text);
            }
        }
        if (group.length !== 0) {
            out.push(group);
        }
        return out;
    };
    const merge = (groups) => {
        for (const g of groups) {
            const old = g[0];
            const newText = new Text(old.wholeText);
            old.replaceWith(newText);
            g.forEach((t) => t.remove());
        }
    };
    const ts = Array.from(node.childNodes).filter((node) => node instanceof Text && node.wholeText !== node.textContent);
    const gts = group(ts);
    merge(gts);
    Array.from(node.childNodes)
        .filter((node) => node instanceof Text)
        .forEach((text) => {
        const p = document.createElement("p");
        convertFixWidthText(text, width, p);
        text.replaceWith(p);
    });
    Array.from(node.querySelectorAll("p"))
        .filter((p) => p.innerText.trim() === "" &&
        (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .getPreviousSibling */ .U)(p) instanceof HTMLElement &&
        (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .getNextSibling */ .d9)(p) instanceof HTMLElement)
        .forEach((p) => p.remove());
    Array.from(node.querySelectorAll("p"))
        .filter((p) => (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .getPreviousBrCount */ .$N)(p) === 2)
        .forEach((p) => (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .removePreviousBr */ .Fe)(p));
    if (isFixWidthP(node)) {
        const ps = Array.from(node.querySelectorAll("p"));
        let text = "";
        for (const node of ps) {
            const n = node.innerText.trim();
            if ((0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(n) > width - 5 && (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(n) < width + 5) {
                text = text + n;
                node.remove();
                continue;
            }
            else {
                if (text !== "") {
                    text = text + n;
                    const newP = document.createElement("p");
                    newP.innerText = text;
                    node.replaceWith(newP);
                    text = "";
                    continue;
                }
                else {
                    continue;
                }
            }
        }
    }
    function isFixWidthP(node) {
        const lengths = Array.from(node.querySelectorAll("p")).map((p) => (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(p.innerText.trim()));
        const lt = lengths.filter((i) => i > width + 5).length;
        if (lt < 5) {
            return true;
        }
        return false;
    }
}
function isFixWidth(node, width = 35) {
    let ns;
    if (node instanceof Text) {
        ns = node.textContent?.split("\n").map((n) => n.trim()) ?? [];
    }
    if (node instanceof HTMLElement) {
        const reducer = (out, cur) => {
            if (cur instanceof Text) {
                const t = cur.textContent?.trim() ?? "";
                if (t.includes("\n")) {
                    t.split("\n")
                        .map((n) => n.trim())
                        .forEach((n) => out.push(n));
                    return out;
                }
                else {
                    out.push(t);
                    return out;
                }
            }
            else {
                return out;
            }
        };
        ns = Array.from(node.childNodes).reduce(reducer, []);
    }
    if (!ns) {
        throw new Error("ns is null");
    }
    const lengths = ns.map((l) => (0,_dom__WEBPACK_IMPORTED_MODULE_2__/* .fullWidthLength */ .sp)(l));
    const lt = lengths.filter((i) => i > width + 5).length;
    if (lt < 5) {
        return true;
    }
    return false;
}


/***/ }),

/***/ "./src/lib/dom.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rm": () => (/* binding */ rm),
/* harmony export */   "vS": () => (/* binding */ rm2),
/* harmony export */   "up": () => (/* binding */ rms),
/* harmony export */   "vR": () => (/* binding */ childNodesCopy),
/* harmony export */   "wd": () => (/* binding */ getMaxDepth),
/* harmony export */   "MK": () => (/* binding */ getNodeTextLength),
/* harmony export */   "J0": () => (/* binding */ sandboxed),
/* harmony export */   "ut": () => (/* binding */ createEl),
/* harmony export */   "wj": () => (/* binding */ createStyle),
/* harmony export */   "d9": () => (/* binding */ getNextSibling),
/* harmony export */   "U": () => (/* binding */ getPreviousSibling),
/* harmony export */   "$N": () => (/* binding */ getPreviousBrCount),
/* harmony export */   "Fe": () => (/* binding */ removePreviousBr),
/* harmony export */   "sp": () => (/* binding */ fullWidthLength),
/* harmony export */   "fI": () => (/* binding */ convertHTMLtoXHTML)
/* harmony export */ });
/* unused harmony export getCookie */
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
function rm2(content, filters) {
    function doRemove(nodes) {
        Array.from(nodes.childNodes).forEach((node) => {
            let text = "";
            if (node.nodeName === "#text") {
                text = node.textContent ?? "";
            }
            else {
                text = node.innerText;
            }
            if (text.length < 200 || node instanceof Text) {
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
            }
            else {
                doRemove(node);
            }
        });
    }
    doRemove(content);
}
function rms(ads, dom) {
    for (const ad of ads) {
        if (typeof ad === "string") {
            dom.innerHTML = dom.innerHTML.replaceAll(ad, "");
        }
        else if (ad instanceof RegExp) {
            dom.innerHTML = dom.innerHTML.replace(ad, "");
        }
    }
    return dom;
}
function childNodesCopy(src, dest) {
    const childrens = Array.from(src.childNodes);
    childrens.forEach((node) => dest.appendChild(node));
}
function getMaxDepth(element) {
    const descendants = element.querySelectorAll("*");
    const depths = Array.from(descendants)
        .filter((elem) => elem.childElementCount === 0)
        .map((elem) => getDepth(elem, 0));
    return Math.max(...depths);
    function getDepth(elem, depth) {
        if (element.isSameNode(elem)) {
            return depth;
        }
        else {
            const parentElement = elem.parentElement;
            if (parentElement) {
                return getDepth(parentElement, depth + 1);
            }
            else {
                return depth;
            }
        }
    }
}
function getNodeTextLength(element) {
    return Array.from(element.childNodes)
        .filter((node) => node.nodeName === "#text")
        .reduce((sum, curNode) => {
        if (!sum) {
            sum = 0;
        }
        sum = sum + (curNode.textContent?.trim().length ?? 0);
        return sum;
    }, 0);
}
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
function getCookie(name) {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    const arr = document.cookie.match(reg);
    if (arr) {
        return arr[2];
    }
    else {
        return null;
    }
}
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
function createStyle(style, id) {
    const el = createEl(`<style>${style}</style>`);
    if (id) {
        el.id = id;
    }
    return el;
}
function getNextSibling(node) {
    if (node.nextSibling instanceof HTMLElement) {
        return node.nextSibling;
    }
    if (node.nextSibling instanceof Text) {
        if (node.nextSibling.textContent?.trim() !== "") {
            return node.nextSibling;
        }
        else {
            return node.nextSibling.nextSibling;
        }
    }
}
function getPreviousSibling(node) {
    if (node.previousSibling instanceof HTMLElement) {
        return node.previousSibling;
    }
    if (node.previousSibling instanceof Text) {
        if (node.previousSibling.textContent?.trim() !== "") {
            return node.previousSibling;
        }
        else {
            return node.previousSibling.previousSibling;
        }
    }
}
function getPreviousBrCount(node) {
    const previous = getPreviousSibling(node);
    if (previous instanceof HTMLBRElement) {
        return getPreviousBrCount(previous) + 1;
    }
    else {
        return 0;
    }
}
function removePreviousBr(node) {
    const previous = getPreviousSibling(node);
    if (node instanceof HTMLBRElement) {
        node.remove();
    }
    if (previous instanceof HTMLBRElement) {
        return removePreviousBr(previous);
    }
    else {
        return;
    }
}
function fullWidthLength(input) {
    const length = Array.from(input).reduce((p, c) => {
        const code = c.codePointAt(0);
        if (code === undefined) {
            return p;
        }
        if (code < 128) {
            return p + 0.5;
        }
        else {
            return p + 1;
        }
    }, 0);
    return length;
}
function convertHTMLtoXHTML(input) {
    let doc;
    if (typeof input === "string") {
        doc = new DOMParser().parseFromString(input, "text/html");
    }
    if (input instanceof Document) {
        doc = input;
    }
    if (doc instanceof Document) {
        return new XMLSerializer().serializeToString(doc);
    }
    else {
        throw new Error("input format error!");
    }
}


/***/ }),

/***/ "./src/lib/hash.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ calculateSha1)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);

async function calculateSha1(blob) {
    if (typeof crypto?.subtle?.digest === "function") {
        const arrayBuffer = await blob.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-1", arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    }
    else {
        return new Promise((resolve, rejects) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onloadend = () => {
                if (reader.result) {
                    const wordArray = crypto_js__WEBPACK_IMPORTED_MODULE_0__.lib.WordArray.create(reader.result);
                    const hash = crypto_js__WEBPACK_IMPORTED_MODULE_0__.SHA1(wordArray).toString();
                    resolve(hash);
                }
                else {
                    rejects(Error("计算MD5值出错"));
                    return;
                }
            };
        });
    }
}


/***/ }),

/***/ "./src/lib/http.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q4": () => (/* binding */ fetchWithRetry),
/* harmony export */   "GF": () => (/* binding */ gfetch),
/* harmony export */   "dL": () => (/* binding */ getHtmlDOM),
/* harmony export */   "rf": () => (/* binding */ getHtmlDomWithRetry),
/* harmony export */   "_7": () => (/* binding */ ggetText),
/* harmony export */   "Fz": () => (/* binding */ ggetHtmlDOM),
/* harmony export */   "jt": () => (/* binding */ getFrameContent)
/* harmony export */ });
/* unused harmony exports getText, ggetHtmlDomWithRetry */
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/setting.ts");
/* harmony import */ var _GM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/GM.ts");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/misc.ts");




globalThis.fetch = new Proxy(globalThis.fetch, {
    apply(target, thisArg, argArray) {
        _log__WEBPACK_IMPORTED_MODULE_0___default().debug("[debug]fetch:");
        _log__WEBPACK_IMPORTED_MODULE_0___default().debug(argArray);
        return Reflect.apply(target, thisArg, argArray);
    },
});
async function fetchWithRetry(input, init) {
    let retry = _setting__WEBPACK_IMPORTED_MODULE_1__/* .retryLimit */ .o5;
    while (retry > 0) {
        const resp = await fetch(input, init);
        if (resp.ok) {
            return resp;
        }
        else {
            await (0,_misc__WEBPACK_IMPORTED_MODULE_2__/* .sleep */ ._v)(1000 * (_setting__WEBPACK_IMPORTED_MODULE_1__/* .retryLimit */ .o5 - retry));
            retry--;
        }
    }
    throw new Error(`Fetch with retry failed! Url: ${input}`);
}
function gfetch(url, { method = "GET", headers, data, cookie, binary, nocache, revalidate, timeout, context, responseType, overrideMimeType, anonymous, user, password, } = {}) {
    return new Promise((resolve, reject) => {
        _log__WEBPACK_IMPORTED_MODULE_0___default().debug("[debug]gfetch:");
        _log__WEBPACK_IMPORTED_MODULE_0___default().debug(Array.from(arguments));
        (0,_GM__WEBPACK_IMPORTED_MODULE_3__/* ._GM_xmlhttpRequest */ .UX)({
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
            user,
            password,
            onload: (obj) => {
                resolve(obj);
            },
            onerror: (err) => {
                reject(err);
            },
        });
    });
}
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
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_0___default().error(error));
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
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_0___default().error(error));
    }
}
async function getHtmlDOM(url, charset, init) {
    const htmlText = await getText(url, charset, init);
    if (!htmlText) {
        throw new Error("Fetch Content failed!");
    }
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    if (!doc.querySelector("base")) {
        const base = doc.createElement("base");
        base.href = url;
        doc.head.appendChild(base);
    }
    return doc;
}
async function getHtmlDomWithRetry(url, charset, init) {
    let retry = _setting__WEBPACK_IMPORTED_MODULE_1__/* .retryLimit */ .o5;
    let doc = null;
    while (retry > 0) {
        try {
            doc = await getHtmlDOM(url, charset, init);
            retry = 0;
        }
        catch (error) {
            _log__WEBPACK_IMPORTED_MODULE_0___default().error(`抓取${url}失败，重试第${_setting__WEBPACK_IMPORTED_MODULE_1__/* .retryLimit */ .o5 - retry}次。`);
            _log__WEBPACK_IMPORTED_MODULE_0___default().error(error);
            retry--;
            await (0,_misc__WEBPACK_IMPORTED_MODULE_2__/* .sleep */ ._v)(1000 * (_setting__WEBPACK_IMPORTED_MODULE_1__/* .retryLimit */ .o5 - retry));
        }
    }
    return doc;
}
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
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_0___default().error(error));
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
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_0___default().error(error));
    }
}
async function ggetHtmlDOM(url, charset, init) {
    const htmlText = await ggetText(url, charset, init);
    if (!htmlText) {
        throw new Error("Fetch Content failed!");
    }
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    if (!doc.querySelector("base")) {
        const base = doc.createElement("base");
        base.href = url;
        doc.head.appendChild(base);
    }
    return doc;
}
async function ggetHtmlDomWithRetry(url, charset, init) {
    let retry = retryLimit;
    let doc = null;
    while (retry > 0) {
        try {
            doc = await ggetHtmlDOM(url, charset, init);
            retry = 0;
        }
        catch (error) {
            log.error(`抓取${url}失败，重试第${retryLimit - retry}次。`);
            retry--;
            await sleep(1000 * (retryLimit - retry));
        }
    }
    return doc;
}
async function getFrameContent(url) {
    const frame = document.createElement("iframe");
    frame.src = url;
    frame.width = "1";
    frame.height = "1";
    const promise = new Promise((resolve, reject) => {
        frame.addEventListener("load", function (event) {
            const doc = this.contentWindow?.document ?? null;
            this.remove();
            resolve(doc);
        });
    });
    _log__WEBPACK_IMPORTED_MODULE_0___default().debug("[debug]getFrameContent:" + url);
    document.body.appendChild(frame);
    return promise;
}


/***/ }),

/***/ "./src/lib/localStorageExpired.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ storageAvailable),
/* harmony export */   "Z": () => (/* binding */ LocalStorageExpired)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_0__);

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
class LocalStorageExpired {
    storage;
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
        try {
            storage[key] = JSON.stringify(value);
            if (expired) {
                storage[`${key}__expires__`] = Date.now() + 1000 * expired;
            }
        }
        catch (error) {
            _log__WEBPACK_IMPORTED_MODULE_0___default().error(error);
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


/***/ }),

/***/ "./src/lib/misc.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C1": () => (/* binding */ concurrencyRun),
/* harmony export */   "_v": () => (/* binding */ sleep),
/* harmony export */   "X8": () => (/* binding */ deepcopy),
/* harmony export */   "K$": () => (/* binding */ saveToArchiveOrg),
/* harmony export */   "HP": () => (/* binding */ randomUUID),
/* harmony export */   "z9": () => (/* binding */ extensionToMimetype)
/* harmony export */ });
/* unused harmony exports regexpEscape, mean, sd */
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _GM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/GM.ts");
/* harmony import */ var mime_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/mime-db/index.js");



function concurrencyRun(list, limit, asyncHandle, options = {}) {
    const { signal, reason } = options;
    const listCopy = [...list];
    const asyncList = [];
    while (limit--) {
        asyncList.push(recursion(listCopy));
    }
    return Promise.all(asyncList);
    async function recursion(arr) {
        if (signal?.aborted) {
            if (reason) {
                throw new _main_main__WEBPACK_IMPORTED_MODULE_1__/* .ExpectError */ .K2(reason);
            }
            else {
                throw new _main_main__WEBPACK_IMPORTED_MODULE_1__/* .ExpectError */ .K2("concurrencyRun was aborted!");
            }
        }
        await asyncHandle(arr.shift());
        if (arr.length !== 0) {
            return recursion(arr);
        }
        else {
            return "finish!";
        }
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function regexpEscape(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
async function saveToArchiveOrg(url) {
    const req = await fetch("https://save.bgme.bid/save", {
        body: JSON.stringify({
            url,
        }),
        headers: {
            "content-type": "application/json; charset=utf-8",
            "x-requested-with": `novel-downloader ${_GM__WEBPACK_IMPORTED_MODULE_2__/* ._GM_info.script.version */ ._p.script.version}; ${_GM__WEBPACK_IMPORTED_MODULE_2__/* ._GM_info.scriptHandler */ ._p.scriptHandler} ${_GM__WEBPACK_IMPORTED_MODULE_2__/* ._GM_info.version */ ._p.version}`,
        },
        method: "POST",
    });
    const data = await req.json();
    return data;
}
function mean(list) {
    if (list.length === 0) {
        return 0;
    }
    const sum = list.reduce((p, c) => p + c);
    return sum / list.length;
}
function sd(list) {
    if (list.length === 0) {
        return 0;
    }
    const m = mean(list);
    const variance = list.map((x) => Math.pow(x - m, 2)).reduce((p, c) => p + c) / list.length;
    const sd = Math.sqrt(variance);
    return sd;
}
function createUUID() {
    const s = new Array(36);
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    const uuid = s.join("");
    return uuid;
}
function randomUUID() {
    if (typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    else {
        return createUUID();
    }
}
function extensionToMimetype(ext) {
    for (const [mimetype, entry] of Object.entries(mime_db__WEBPACK_IMPORTED_MODULE_0__)) {
        if (entry.extensions?.includes(ext)) {
            return mimetype;
        }
    }
    return "application/octet-stream";
}


/***/ }),

/***/ "./src/lib/readability.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "fetchAndParse": () => (/* binding */ fetchAndParse),
/* harmony export */   "gfetchAndParse": () => (/* binding */ gfetchAndParse)
/* harmony export */ });
/* harmony import */ var _mozilla_readability__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@mozilla/readability/index.js");
/* harmony import */ var _mozilla_readability__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mozilla_readability__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/http.ts");



function parse(doc, options) {
    const obj = new _mozilla_readability__WEBPACK_IMPORTED_MODULE_0__.Readability(doc, options).parse();
    if (obj) {
        if (typeof obj.content === "string") {
            obj.content = (0,_dom__WEBPACK_IMPORTED_MODULE_1__/* .createEl */ .ut)(obj.content);
        }
    }
    return obj;
}
async function fetchAndParse(url, charset, init, patch, options) {
    let doc = await (0,_http__WEBPACK_IMPORTED_MODULE_2__/* .getHtmlDOM */ .dL)(url, charset, init);
    if (typeof patch === "function") {
        doc = patch(doc);
    }
    return parse(doc, options);
}
async function gfetchAndParse(url, charset, init, patch, options) {
    let doc = await (0,_http__WEBPACK_IMPORTED_MODULE_2__/* .ggetHtmlDOM */ .Fz)(url, charset, init);
    if (typeof patch === "function") {
        doc = patch(doc);
    }
    return parse(doc, options);
}


/***/ }),

/***/ "./src/lib/rule.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SN": () => (/* binding */ introDomHandle),
/* harmony export */   "I2": () => (/* binding */ nextPageParse),
/* harmony export */   "$d": () => (/* binding */ getSectionName),
/* harmony export */   "$4": () => (/* binding */ centerDetct),
/* harmony export */   "uh": () => (/* binding */ deDuplicate)
/* harmony export */ });
/* unused harmony export reIndex */
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cleanDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/http.ts");



async function introDomHandle(introDom, domPatch) {
    if (introDom === null) {
        return [null, null, null];
    }
    else {
        if (domPatch) {
            introDom = domPatch(introDom.cloneNode(true));
        }
        const { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = await (0,_cleanDOM__WEBPACK_IMPORTED_MODULE_0__/* .cleanDOM */ .zM)(introDom, "TM");
        return [introCleantext, introCleanDom, introCleanimages];
    }
}
async function nextPageParse({ chapterName, chapterUrl, charset, selector, contentPatch, getNextPage, continueCondition, enableCleanDOM, }) {
    _log__WEBPACK_IMPORTED_MODULE_1___default().debug(`[Chapter]请求 ${chapterUrl}`);
    let nowUrl = chapterUrl;
    let doc = await (0,_http__WEBPACK_IMPORTED_MODULE_2__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
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
                _log__WEBPACK_IMPORTED_MODULE_1___default().error("网站页面出错，URL： " + nowUrl);
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
            _log__WEBPACK_IMPORTED_MODULE_1___default().debug(`[Chapter]请求 ${nextLink}`);
            nowUrl = nextLink;
            doc = await (0,_http__WEBPACK_IMPORTED_MODULE_2__/* .getHtmlDOM */ .dL)(nextLink, charset);
        }
    } while (flag);
    let dom, text, images;
    if (enableCleanDOM || enableCleanDOM === undefined) {
        const obj = await (0,_cleanDOM__WEBPACK_IMPORTED_MODULE_0__/* .cleanDOM */ .zM)(content, "TM");
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
function getSectionName(chapterElement, sections, getName) {
    const _sections = Array.from(sections);
    let sectionName = "";
    for (const sElem of _sections) {
        const position = chapterElement.compareDocumentPosition(sElem);
        if (position & Node.DOCUMENT_POSITION_DISCONNECTED) {
            return null;
        }
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
            sectionName = getName(sElem);
        }
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
            break;
        }
    }
    return sectionName;
}
function centerDetct(element) {
    const docEl = document.documentElement;
    const bodyEl = document.body;
    const vw = Math.min(docEl.clientWidth, window.innerWidth);
    const tolx = vw * 0.15;
    const toly = bodyEl.scrollHeight * 0.1;
    const rect = element.getBoundingClientRect();
    const distanceToTop = window.scrollY + rect.top;
    const distanceToBottom = bodyEl.scrollHeight - distanceToTop;
    const distanceToRight = Math.abs(vw - rect.right);
    const percentY = element.scrollHeight / bodyEl.scrollHeight;
    if (rect.left < tolx ||
        distanceToRight < tolx ||
        distanceToTop < toly ||
        distanceToBottom < toly) {
        return [false, element, percentY];
    }
    return [true, element, percentY];
}
function reIndex(chapters) {
    let i = 0;
    chapters = chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
    for (const chapter of chapters) {
        i++;
        chapter.chapterNumber = i;
    }
    return chapters;
}
function deDuplicate(chapters) {
    const obj = chapters.reduce((obj, cur) => {
        const url = cur.chapterUrl;
        if (obj[url] === undefined) {
            obj[url] = cur;
        }
        else if (Array.isArray(obj[url])) {
            obj[url].push(cur);
        }
        else {
            obj[url] = [obj[url], cur];
        }
        return obj;
    }, {});
    const reducer = (out, cur) => {
        if (Array.isArray(cur)) {
            const url = cur[0].chapterUrl;
            if (url === "") {
                out.push(...cur);
            }
            else {
                out.push(cur.sort((a, b) => a.chapterNumber - b.chapterNumber).slice(-1)[0]);
            }
        }
        else {
            out.push(cur);
        }
        return out;
    };
    const results = Object.values(obj).reduce(reducer, []);
    reIndex(results);
    return results;
}


/***/ }),

/***/ "./src/log.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KC": () => (/* binding */ logText),
/* harmony export */   "mZ": () => (/* binding */ getLogText),
/* harmony export */   "qS": () => (/* binding */ saveLogTextToFile)
/* harmony export */ });
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("loglevel");
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(loglevel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/setting.ts");



if (_setting__WEBPACK_IMPORTED_MODULE_2__/* .enableDebug.value */ .Cy.value) {
    loglevel__WEBPACK_IMPORTED_MODULE_1___default().setLevel("trace");
}
else {
    loglevel__WEBPACK_IMPORTED_MODULE_1___default().setLevel("info");
}
let logText = "";
function getLogText() {
    return logText;
}
const originalFactory = (loglevel__WEBPACK_IMPORTED_MODULE_1___default().methodFactory);
(loglevel__WEBPACK_IMPORTED_MODULE_1___default().methodFactory) = (methodName, logLevel, loggerName) => {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);
    return (message) => {
        try {
            if (typeof message === "object") {
                if (message instanceof Error) {
                    logText += message.name;
                    logText += message.message;
                    logText += message.stack;
                }
                else {
                    logText += JSON.stringify(message, undefined, 2) + "\n";
                }
            }
            else {
                logText += message + "\n";
            }
        }
        catch (error) {
            loglevel__WEBPACK_IMPORTED_MODULE_1___default().error(error);
        }
        rawMethod(message);
    };
};
loglevel__WEBPACK_IMPORTED_MODULE_1___default().setLevel(loglevel__WEBPACK_IMPORTED_MODULE_1___default().getLevel());
function saveLogTextToFile() {
    (0,file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(new Blob([logText], { type: "text/plain; charset=UTF-8" }), `novel-downloader-${Date.now().toString()}.log`);
}



/***/ }),

/***/ "./src/main/Attachment.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ AttachmentClass)
/* harmony export */ });
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/setting.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/main/main.ts");





class AttachmentClass {
    url;
    name;
    mode;
    referrerMode;
    customReferer;
    status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.pending */ .qb.pending;
    retryTime = 0;
    defaultHeader = {
        Referer: document.location.origin,
    };
    imageBlob;
    comments;
    constructor(url, name, mode, referrerMode = _main__WEBPACK_IMPORTED_MODULE_0__/* .ReferrerMode.keep */ .n6.keep, customReferer = "") {
        this.url = url;
        this.name = name;
        this.mode = mode;
        this.referrerMode = referrerMode;
        this.customReferer = customReferer;
    }
    async init() {
        if (this.mode === "naive") {
            this.imageBlob = await this.downloadImage();
        }
        else {
            this.imageBlob = await this.tmDownloadImage();
        }
        if (this.imageBlob) {
            _log__WEBPACK_IMPORTED_MODULE_1___default().info(`[attachment] ${this.url} 下载完成。`);
        }
        return this.imageBlob;
    }
    downloadImage() {
        this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.downloading */ .qb.downloading;
        const init = {
            headers: this.defaultHeader,
        };
        if (this.referrerMode === _main__WEBPACK_IMPORTED_MODULE_0__/* .ReferrerMode.none */ .n6.none) {
            init.headers = {};
            init.referrerPolicy = "no-referrer";
        }
        return fetch(this.url, init)
            .then((response) => {
            if (response.ok) {
                this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.finished */ .qb.finished;
                return response.blob();
            }
            else {
                if (response.status === 404) {
                    this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed;
                }
                throw new Error(`Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`);
            }
        })
            .catch(async (err) => {
            this.retryTime++;
            _log__WEBPACK_IMPORTED_MODULE_1___default().error(`[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`);
            if (this.status !== _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed && this.retryTime < _setting__WEBPACK_IMPORTED_MODULE_2__/* .retryLimit */ .o5) {
                await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_3__/* .sleep */ ._v)(this.retryTime * 1500);
                return this.downloadImage();
            }
            else {
                this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed;
                _log__WEBPACK_IMPORTED_MODULE_1___default().error(err);
                _log__WEBPACK_IMPORTED_MODULE_1___default().trace(err);
                return null;
            }
        });
    }
    tmDownloadImage() {
        this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.downloading */ .qb.downloading;
        let headers = this.defaultHeader;
        if (this.referrerMode === _main__WEBPACK_IMPORTED_MODULE_0__/* .ReferrerMode.none */ .n6.none) {
            headers = {};
        }
        if (this.referrerMode === _main__WEBPACK_IMPORTED_MODULE_0__/* .ReferrerMode.self */ .n6.self) {
            const imgOrigin = new URL(this.url).origin;
            headers["Referer"] = imgOrigin;
        }
        if (this.referrerMode === _main__WEBPACK_IMPORTED_MODULE_0__/* .ReferrerMode.custom */ .n6.custom &&
            this.customReferer.startsWith("http")) {
            headers["Referer"] = this.customReferer;
        }
        const init = {
            headers: this.defaultHeader,
            responseType: "blob",
        };
        return (0,_lib_http__WEBPACK_IMPORTED_MODULE_4__/* .gfetch */ .GF)(this.url, init)
            .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.finished */ .qb.finished;
                return response.response;
            }
            else {
                if (response.status === 404) {
                    this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed;
                }
                throw new Error(`Bad response!\nRequest url: ${this.url}\nStatus code: ${response.status}`);
            }
        })
            .catch(async (err) => {
            this.retryTime++;
            _log__WEBPACK_IMPORTED_MODULE_1___default().error(`[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`);
            if (this.status !== _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed && this.retryTime < _setting__WEBPACK_IMPORTED_MODULE_2__/* .retryLimit */ .o5) {
                await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_3__/* .sleep */ ._v)(this.retryTime * 1000);
                return this.tmDownloadImage();
            }
            else {
                this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed;
                _log__WEBPACK_IMPORTED_MODULE_1___default().error(err);
                _log__WEBPACK_IMPORTED_MODULE_1___default().trace(err);
                return null;
            }
        });
    }
    toJSON() {
        return {
            url: this.url,
            name: this.name,
            mode: this.mode,
            status: this.status,
            retryTime: this.retryTime,
        };
    }
}


/***/ }),

/***/ "./src/main/Book.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "f": () => (/* binding */ Book)
});

;// CONCATENATED MODULE: ./src/lib/removeTrackParam.ts
const general = [
    "nx_source",
    "_zucks_suid",
    "cmpid",
    "asgtbndr",
    "guccounter",
    "guce_referrer",
    "guce_referrer_sig",
    "_openstat",
    "action_object_map",
    "action_ref_map",
    "action_type_map",
    "fb_action_ids",
    "fb_action_types",
    "fb_comment_id",
    "fb_ref",
    "fb_source",
    "fbclid",
    "xtor",
    "utm_campaign",
    "utm_channel",
    "utm_cid",
    "utm_content",
    "utm_id",
    "utm_medium",
    "utm_name",
    "utm_place",
    "utm_pubreferrer",
    "utm_reader",
    "utm_referrer",
    "utm_serial",
    "utm_social",
    "utm_social-type",
    "utm_source",
    "utm_swu",
    "utm_term",
    "utm_userid",
    "utm_viz_id",
    "utm_product",
    "utm_campaignid",
    "utm_ad",
    "utm_brand",
    "utm_emcid",
    "utm_emmid",
    "utm_umguk",
    "gbraid",
    "wbraid",
    "gclsrc",
    "gclid",
    "yclid",
    "dpg_source",
    "dpg_campaign",
    "dpg_medium",
    "dpg_content",
    "admitad_uid",
    "adjust_tracker",
    "adjust_adgroup",
    "adjust_campaign",
    "bsft_clkid",
    "bsft_eid",
    "bsft_mid",
    "bsft_uid",
    "bsft_aaid",
    "bsft_ek",
    "mtm_campaign",
    "mtm_cid",
    "mtm_content",
    "mtm_group",
    "mtm_keyword",
    "mtm_medium",
    "mtm_placement",
    "mtm_source",
    "pk_campaign",
    "pk_medium",
    "pk_source",
    "_branch_match_id",
    "vc_lpp",
    "ml_subscriber",
    "ml_subscriber_hash",
    "rb_clickid",
    "oly_anon_id",
    "oly_enc_id",
    "dt_dapp",
    "dt_platform",
    "spm",
    "scm",
];
const specific = {
    "bilibili.com": [
        "from",
        "seid",
        "share_source",
        "spm_id_from",
        "from_spm_id",
        "share_medium",
        "share_plat",
        "share_session_id",
        "share_source",
        "share_tag",
        "timestamp",
        "unique_k",
        "from_source",
        "refer_from",
    ],
};
function findSpecial(host) {
    let lastPos = 0;
    let domain = host;
    while (lastPos >= 0) {
        if (specific[domain]) {
            return specific[domain];
        }
        lastPos = host.indexOf(".", lastPos + 1);
        domain = host.slice(lastPos + 1);
    }
}
function removeTrackParm(_url) {
    const url = new URL(_url);
    const host = url.hostname;
    const search = url.searchParams;
    general.forEach((s) => search.delete(s));
    const special = findSpecial(host);
    if (special) {
        special.forEach((s) => search.delete(s));
    }
    url.hash = "";
    return url.href;
}

// EXTERNAL MODULE: external "log"
var external_log_ = __webpack_require__("loglevel");
var external_log_default = /*#__PURE__*/__webpack_require__.n(external_log_);
;// CONCATENATED MODULE: ./src/main/Book.ts


class Book {
    _bookUrl = "";
    _ToCUrl;
    bookname;
    author;
    introduction;
    introductionHTML;
    additionalMetadate;
    chapters;
    saveOptions;
    constructor({ bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters, }) {
        this.bookUrl = bookUrl;
        this.bookname = bookname;
        this.author = author;
        this.introduction = introduction;
        this.introductionHTML = introductionHTML;
        this.additionalMetadate = additionalMetadate;
        this.chapters = chapters;
        external_log_default().debug("[Book]初始化完成");
    }
    set bookUrl(v) {
        this._bookUrl = removeTrackParm(v);
    }
    get bookUrl() {
        return this._bookUrl;
    }
    set ToCUrl(v) {
        if (v) {
            this._ToCUrl = removeTrackParm(v);
        }
    }
    get ToCUrl() {
        return this._ToCUrl;
    }
    toJSON() {
        return {
            bookUrl: this.bookUrl,
            ToCUrl: this.ToCUrl,
            bookname: this.bookname,
            author: this.author,
            introduction: this.introduction,
            introductionHTML: this.introductionHTML
                ? this.introductionHTML.outerHTML
                : this.introductionHTML,
            additionalMetadate: this.additionalMetadate,
        };
    }
}


/***/ }),

/***/ "./src/main/Chapter.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ Chapter)
/* harmony export */ });
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/setting.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/main/main.ts");




class Chapter {
    bookUrl;
    bookname;
    chapterUrl;
    chapterNumber;
    chapterName;
    isVIP;
    isPaid;
    sectionName;
    sectionNumber;
    sectionChapterNumber;
    chapterParse;
    charset;
    options;
    status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.pending */ .qb.pending;
    retryTime = 0;
    contentRaw;
    contentText;
    contentHTML;
    contentImages;
    additionalMetadate;
    chapterHtmlFileName;
    book;
    constructor({ bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, charset, options, }) {
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
    }
    async init() {
        const { chapterName, contentRaw, contentText, contentHTML, contentImages, additionalMetadate, } = await this.parse();
        this.chapterName = chapterName;
        this.contentRaw = contentRaw;
        this.contentText = contentText;
        this.contentHTML = contentHTML;
        this.contentImages = contentImages;
        this.additionalMetadate = additionalMetadate;
        if (this.status === _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed) {
            _log__WEBPACK_IMPORTED_MODULE_1___default().error(`[Chapter]章节名：${this.chapterName}, \
分卷名：${this.sectionName}, URL:${this.chapterUrl}, \
VIP:${this.isVIP}, Paid:${this.isPaid}, \
isNull:${!this.contentHTML} 解析出错。`);
        }
        else {
            _log__WEBPACK_IMPORTED_MODULE_1___default().info(`[Chapter]章节名：${this.chapterName}, \
分卷名：${this.sectionName}, URL:${this.chapterUrl}, \
VIP:${this.isVIP}, Paid:${this.isPaid}, \
isNull:${!this.contentHTML} 解析成功。`);
        }
        return this;
    }
    async parse() {
        this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.downloading */ .qb.downloading;
        return this.chapterParse(this.chapterUrl, this.chapterName, this.isVIP, this.isPaid, this.charset, this.options)
            .then(async (obj) => {
            const contentImages = obj.contentImages;
            if (contentImages) {
                let downloadingImages = contentImages.filter((imgObj) => imgObj.status === _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.downloading */ .qb.downloading);
                while (downloadingImages.length) {
                    await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_2__/* .sleep */ ._v)(500);
                    downloadingImages = contentImages.filter((imgObj) => imgObj.status === _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.downloading */ .qb.downloading);
                }
            }
            this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.finished */ .qb.finished;
            return obj;
        })
            .catch(async (err) => {
            this.retryTime++;
            _log__WEBPACK_IMPORTED_MODULE_1___default().error(`[Chapter]${this.chapterName}解析出错，第${this.retryTime}次重试，章节地址：${this.chapterUrl}`);
            if (this.status !== _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed && this.retryTime < _setting__WEBPACK_IMPORTED_MODULE_3__/* .retryLimit */ .o5) {
                await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_2__/* .sleep */ ._v)(this.retryTime * 1500);
                return this.parse();
            }
            else {
                this.status = _main__WEBPACK_IMPORTED_MODULE_0__/* .Status.failed */ .qb.failed;
                _log__WEBPACK_IMPORTED_MODULE_1___default().error(err);
                _log__WEBPACK_IMPORTED_MODULE_1___default().trace(err);
                window.failedCount++;
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
    toJSON() {
        return {
            bookUrl: this.bookUrl,
            bookname: this.bookname,
            chapterUrl: this.chapterUrl,
            chapterNumber: this.chapterNumber,
            chapterName: this.chapterName,
            isVIP: this.isPaid,
            isPaid: this.isPaid,
            sectionName: this.sectionName,
            sectionNumber: this.sectionNumber,
            sectionChapterNumber: this.sectionChapterNumber,
            status: this.status,
            retryTime: this.retryTime,
            chapterHtmlFileName: this.chapterHtmlFileName,
        };
    }
}


/***/ }),

/***/ "./src/main/main.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "qb": () => (/* binding */ Status),
/* harmony export */   "n6": () => (/* binding */ ReferrerMode),
/* harmony export */   "K2": () => (/* binding */ ExpectError)
/* harmony export */ });
var Status;
(function (Status) {
    Status[Status["pending"] = 0] = "pending";
    Status[Status["downloading"] = 1] = "downloading";
    Status[Status["failed"] = 2] = "failed";
    Status[Status["finished"] = 3] = "finished";
    Status[Status["aborted"] = 4] = "aborted";
    Status[Status["saved"] = 5] = "saved";
})(Status || (Status = {}));
var ReferrerMode;
(function (ReferrerMode) {
    ReferrerMode[ReferrerMode["keep"] = 0] = "keep";
    ReferrerMode[ReferrerMode["none"] = 1] = "none";
    ReferrerMode[ReferrerMode["self"] = 2] = "self";
    ReferrerMode[ReferrerMode["custom"] = 3] = "custom";
})(ReferrerMode || (ReferrerMode = {}));
class ExpectError extends Error {
}


/***/ }),

/***/ "./src/rules.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "c": () => (/* binding */ BaseRuleClass)
});

// EXTERNAL MODULE: ./src/lib/attachments.ts
var attachments = __webpack_require__("./src/lib/attachments.ts");
// EXTERNAL MODULE: ./src/lib/misc.ts
var misc = __webpack_require__("./src/lib/misc.ts");
// EXTERNAL MODULE: ./src/log.ts
var log = __webpack_require__("./src/log.ts");
// EXTERNAL MODULE: external "log"
var external_log_ = __webpack_require__("loglevel");
var external_log_default = /*#__PURE__*/__webpack_require__.n(external_log_);
// EXTERNAL MODULE: ./src/main/main.ts
var main = __webpack_require__("./src/main/main.ts");
// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__("./node_modules/file-saver/dist/FileSaver.min.js");
// EXTERNAL MODULE: ./src/setting.ts
var setting = __webpack_require__("./src/setting.ts");
// EXTERNAL MODULE: ./src/save/sgc-toc.css
var sgc_toc = __webpack_require__("./src/save/sgc-toc.css");
// EXTERNAL MODULE: ./src/save/web.css
var web = __webpack_require__("./src/save/web.css");
// EXTERNAL MODULE: ./src/lib/GM.ts
var GM = __webpack_require__("./src/lib/GM.ts");
;// CONCATENATED MODULE: external "fflate"
const external_fflate_namespaceObject = fflate;
// EXTERNAL MODULE: ./node_modules/streamsaver/StreamSaver.js
var StreamSaver = __webpack_require__("./node_modules/streamsaver/StreamSaver.js");
var StreamSaver_default = /*#__PURE__*/__webpack_require__.n(StreamSaver);
// EXTERNAL MODULE: ./src/detect.ts
var detect = __webpack_require__("./src/detect.ts");
;// CONCATENATED MODULE: ./src/lib/zip.ts






async function setStreamSaverSetting() {
    const rawMitm = new URL((StreamSaver_default()).mitm);
    const mitm = new URL("https://cors.bgme.me/");
    mitm.pathname = rawMitm.origin + rawMitm.pathname;
    (StreamSaver_default()).mitm = mitm.href;
    (StreamSaver_default()).supported =
        (0,detect/* streamSupport */.yt)() && (await (0,detect/* mitmPageAvailability */.Cm)(mitm.href));
}
class FflateZip {
    filename;
    stream;
    zcount = 0;
    count = 0;
    filenameList = [];
    zipOut = new Blob([], { type: "application/zip" });
    savedZip;
    constructor(filename, stream, mimetype = "application/zip") {
        external_log_default().info(`[fflateZip] filename: ${filename}, stream: ${stream}, streamSaver.supported: ${(StreamSaver_default()).supported}`);
        const self = this;
        this.filename = filename;
        if ((StreamSaver_default()).supported) {
            this.stream = stream;
        }
        else {
            this.stream = false;
        }
        let writer;
        if (this.stream) {
            const fileStream = StreamSaver_default().createWriteStream(self.filename);
            writer =
                fileStream.getWriter();
        }
        this.savedZip = new external_fflate_namespaceObject.Zip((err, dat, final) => {
            if (err) {
                external_log_default().error(err);
                external_log_default().trace(err);
                if (self.stream) {
                    writer.abort();
                }
                throw err;
            }
            if (self.stream) {
                writer.write(dat);
            }
            else {
                self.zipOut = new Blob([self.zipOut, dat], { type: mimetype });
            }
            if (final) {
                if (self.stream) {
                    writer.close();
                    external_log_default().info("[fflateZip] ZIP生成完毕");
                }
                else {
                    nonStream();
                }
            }
            function nonStream() {
                external_log_default().info("[fflateZip] ZIP生成完毕，文件大小：" + self.zipOut.size);
                try {
                    (0,FileSaver_min.saveAs)(self.zipOut, self.filename);
                    self.zipOut = new Blob([], { type: "application/zip" });
                }
                catch (error) {
                    external_log_default().error("[fflateZip]" + error);
                    external_log_default().trace(error);
                }
            }
        });
    }
    async file(filename, fileBlob, nocompress = false) {
        if (this.filenameList.includes(filename)) {
            external_log_default().warn(`filename ${filename} has existed on zip.`);
            return;
        }
        this.filenameList.push(filename);
        this.count++;
        const buffer = await fileBlob.arrayBuffer();
        const chunk = new Uint8Array(buffer);
        if (fileBlob.type.includes("image/") || nocompress) {
            const nonStreamingFile = new external_fflate_namespaceObject.ZipPassThrough(filename);
            this.savedZip.add(nonStreamingFile);
            nonStreamingFile.push(chunk, true);
            this.zcount++;
        }
        else {
            const nonStreamingFile = new external_fflate_namespaceObject.AsyncZipDeflate(filename, {
                level: 9,
            });
            this.savedZip.add(nonStreamingFile);
            nonStreamingFile.push(chunk, true);
            this.zcount++;
        }
    }
    async generateAsync() {
        while (this.count !== this.zcount) {
            await (0,misc/* sleep */._v)(100);
        }
        this.savedZip.end();
    }
}

// EXTERNAL MODULE: ./src/save/main.css
var save_main = __webpack_require__("./src/save/main.css");
// EXTERNAL MODULE: ./src/save/toc.css
var toc = __webpack_require__("./src/save/toc.css");
// EXTERNAL MODULE: ./src/lib/dom.ts
var dom = __webpack_require__("./src/lib/dom.ts");
;// CONCATENATED MODULE: ./src/save/options.ts



class Common {
    genMetaDateTxt(book) {
        let metaDateText = `题名：${book.bookname}\n作者：${book.author}`;
        if (book.additionalMetadate.tags) {
            metaDateText += `\nTag列表：${book.additionalMetadate.tags.join("、")}`;
        }
        metaDateText += `\n原始网址：${book.bookUrl}`;
        if (book.additionalMetadate.cover) {
            metaDateText += `\n封面图片地址：${book.additionalMetadate.cover.url}`;
        }
        if (book.introduction) {
            metaDateText += `\n简介：${book.introduction}`;
        }
        metaDateText += `\n下载时间：${new Date().toISOString()}\n本文件由小说下载器生成，软件地址：https://github.com/yingziwu/novel-downloader\n\n`;
        return metaDateText;
    }
    getChapterNumberToSave(chapter, chapters) {
        return `${"0".repeat(chapters.length.toString().length -
            Math.trunc(chapter.chapterNumber).toString().length)}${chapter.chapterNumber.toString()}`;
    }
}
function saveOptionsValidate(data) {
    const keyNamesS = ["mainStyleText", "tocStyleText"];
    const keyNamesF = [
        "getchapterName",
        "genSectionText",
        "genChapterText",
        "chapterSort",
    ];
    function keyNametest(keyname) {
        const keyList = [...keyNamesS, ...keyNamesF];
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
class Options extends Common {
    mainStyleText = save_main/* default */.Z;
    tocStyleText = toc/* default */.Z;
    getchapterName(chapter) {
        if (chapter.chapterName) {
            return chapter.chapterName;
        }
        else {
            return chapter.chapterNumber.toString();
        }
    }
    genSectionText(sectionName) {
        return (`${"=".repeat(20)}\n\n\n\n# ${sectionName}\n\n\n\n${"=".repeat(20)}` +
            "\n\n");
    }
    genChapterText(chapterName, contentText) {
        return `${chapterName}\n${"=".repeat((0,dom/* fullWidthLength */.sp)(chapterName) * 2 + 10)}\n\n${contentText}\n\n`;
    }
    chapterSort(a, b) {
        return a.chapterNumber - b.chapterNumber;
    }
}

// EXTERNAL MODULE: ./src/save/misc.ts
var save_misc = __webpack_require__("./src/save/misc.ts");
;// CONCATENATED MODULE: ./src/save/chapter.html.j2
// Module
var code = "<!DOCTYPE html> <html> <head> <meta charset=\"UTF-8\"/> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/> <meta name=\"referrer\" content=\"same-origin\"/> <meta name=\"generator\" content=\"https://github.com/yingziwu/novel-downloader\"/> <meta name=\"source\" content=\"{{ chapterUrl }}\"/> <link href=\"style.css\" rel=\"stylesheet\"/> <title>{{ chapterName }}</title> </head> <body> <div class=\"main\"> <h2>{{ chapterName }}</h2> {{ outerHTML }} </div> </body> </html> ";
// Exports
/* harmony default export */ const chapter_html = (code);
;// CONCATENATED MODULE: ./src/save/index.html.j2
// Module
var index_html_code = "<!DOCTYPE html> <html> <head> <meta charset=\"UTF-8\"/> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/> <meta name=\"referrer\" content=\"same-origin\"/> <meta name=\"generator\" content=\"https://github.com/yingziwu/novel-downloader\"/> <meta name=\"date-creation\" content=\"{{ creationDate }}\"/> <link href=\"style.css\" rel=\"stylesheet\"/> <link href=\"web.css\" rel=\"stylesheet\"/> <link href=\"toc.css\" rel=\"stylesheet\"/> <title>{{ bookname }}</title> </head> <body> <div class=\"main\"> <h1>{{ bookname }}</h1> <h3 class=\"author\">{{ author }}</h3> <div class=\"info\"> {% if cover -%} <img class=\"cover\" data-src-address=\"{{ cover.name }}\"/> {%- endif %} {% if introductionHTML -%} <div> <h3>简介</h3> <div class=\"introduction\">{{ introductionHTML }}</div> </div> {%- endif %} </div> <div class=\"bookurl\"> <a href=\"{{ bookUrl }}\">打开原始网站</a> </div> <hr/> {% for sectionObj in sectionsObj -%} <div id=\"section{{ sectionObj.sectionNumber }}\" class=\"section\"> {% if sectionObj.sectionName %} <h2 class=\"section-label\">{{ sectionObj.sectionName }}</h2> {% endif %} {% for chapter in sectionObj.chpaters -%} <div class=\"chapter\"> {% if not (chapter.contentHTML or chapter.status === Status.saved) -%} <a class=\"disabled\" href=\"{{ chapter.chapterHtmlFileName }}\">{{ chapter.chapterName }}</a> {%- else -%} <a href=\"{{ chapter.chapterHtmlFileName }}\">{{ chapter.chapterName }}</a> {%- endif %} </div> {%- endfor %} </div> {%- endfor %} </div> </body> </html>";
// Exports
/* harmony default export */ const index_html = (index_html_code);
;// CONCATENATED MODULE: ./src/save/section.html.j2
// Module
var section_html_code = "<!DOCTYPE html> <html> <head> <meta charset=\"UTF-8\"/> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/> <meta name=\"referrer\" content=\"same-origin\"/> <meta name=\"generator\" content=\"https://github.com/yingziwu/novel-downloader\"/> <link href=\"style.css\" rel=\"stylesheet\"/> <title>{{ sectionName }}</title> </head> <body> <div class=\"main\"><h1>{{ sectionName }}</h1></div> </body> </html> ";
// Exports
/* harmony default export */ const section_html = (section_html_code);
;// CONCATENATED MODULE: external "nunjucks"
const external_nunjucks_namespaceObject = nunjucks;
;// CONCATENATED MODULE: ./src/save/epub.ts














const env = new external_nunjucks_namespaceObject.Environment(undefined, { autoescape: false });
const section = new external_nunjucks_namespaceObject.Template(section_html, env, undefined, true);
const chapterTemplt = new external_nunjucks_namespaceObject.Template(chapter_html, env, undefined, true);
const index = new external_nunjucks_namespaceObject.Template(index_html, env, undefined, true);
function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const _monty = new Date().getMonth() + 1;
    const monty = _monty < 10 ? `0${_monty}` : _monty;
    const _day = date.getDate();
    const day = _day < 10 ? `0${_day}` : _day;
    return `${year}-${monty}-${day}`;
}
const uuid = (0,misc/* randomUUID */.HP)();
const content_opf = `<?xml version="1.0" encoding="utf-8"?>
<package version="2.0" unique-identifier="BookId" xmlns="http://www.idpf.org/2007/opf">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:identifier id="BookId" opf:scheme="UUID">urn:uuid:${uuid}</dc:identifier>
    <meta content="${GM/* _GM_info.script.version */._p.script.version}" name="novel-downloader version"/>
    <meta content="https://github.com/yingziwu/novel-downloader" name="generator"/>
    <dc:date opf:event="creation">${getDateString()}</dc:date>
    <dc:date opf:event="modification" xmlns:opf="http://www.idpf.org/2007/opf">${getDateString()}</dc:date>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="sgc-toc.css" href="sgc-toc.css" media-type="text/css"/>
    <item id="style.css" href="style.css" media-type="text/css"/>
    <item id="cover.xhtml" href="cover.xhtml" media-type="application/xhtml+xml"/>
    <item id="info.xhtml" href="info.xhtml" media-type="application/xhtml+xml"/>
    <item id="message.xhtml" href="message.xhtml" media-type="application/xhtml+xml"/>
    <item id="TOC.xhtml" href="TOC.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="cover.xhtml"/>
    <itemref idref="info.xhtml"/>
    <itemref idref="message.xhtml"/>
    <itemref idref="TOC.xhtml"/>
  </spine>
  <guide>
    <reference type="cover" title="Cover" href="cover.xhtml"/>
    <reference type="toc" title="Table of Contents" href="TOC.xhtml"/>
  </guide>
</package>`;
const toc_ncx = `<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN"
 "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx version="2005-1" xmlns="http://www.daisy.org/z3986/2005/ncx/">
  <head>
    <meta content="urn:uuid:${uuid}" name="dtb:uid"/>
    <meta content="2" name="dtb:depth"/>
    <meta content="0" name="dtb:totalPageCount"/>
    <meta content="0" name="dtb:maxPageNumber"/>
  </head>
  <docTitle>
    <text></text>
  </docTitle>
  <navMap>
  </navMap>
</ncx>`;
const TOC_xhtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Table of Contents</title>
  <link href="sgc-toc.css" rel="stylesheet" type="text/css"/>
</head>
<body>
  <div class="sgc-toc-title">
    目录
  </div>
</body>
</html>`;
const getCoverXhtml = (coverName) => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Cover</title>
</head>

<body>
  <div style="text-align: center; padding: 0pt; margin: 0pt;">
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" preserveAspectRatio="xMidYMid meet" version="1.1" viewBox="0 0 368 460" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink"><image width="368" height="460" xlink:href="${coverName}"/></svg>
  </div>
</body>
</html>`;
const getInfoXhtml = (title, author) => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>信息页</title>
  <link href="style.css" type="text/css" rel="stylesheet"/>
</head>

<body>
  <div class="main">
    <h1>${title}</h1>

    ${author ? `<h2>作者：${author}</h2>` : ""}
  </div>
</body>
</html>`;
const getMessageXhtml = (book) => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>信息页</title>
  <link href="style.css" type="text/css" rel="stylesheet"/>
</head>

<body>
  <div class="main">
    <div><strong>制作信息</strong></div>
    <hr/>
    <div>题名：${book.bookname}</div>
    <div>作者：${book.author}</div>
    <div>原始地址：<a href="${book.bookUrl}">${book.bookUrl}</a></div>
    <div>本文件由<a href="https://github.com/yingziwu/novel-downloader">小说下载器</a>生成。</div>
    ${book.introductionHTML
    ? `<hr/><span>简介：</span>${book.introductionHTML.outerHTML}`
    : ""}
  </div>
</body>
</html>`;
class EPUB extends Options {
    contentOpf = new DOMParser().parseFromString(content_opf, "application/xml");
    metadata = this.contentOpf.querySelector("metadata");
    manifest = this.contentOpf.querySelector("manifest");
    spine = this.contentOpf.querySelector("spine");
    guide = this.contentOpf.querySelector("guide");
    ncx = new DOMParser().parseFromString(toc_ncx, "application/xml");
    navMap = this.ncx.querySelector("navMap");
    toc = new DOMParser().parseFromString(TOC_xhtml, "application/xhtml+xml");
    tocBody = this.toc.body;
    book;
    chapters;
    epubZip;
    constructor(book, streamZip, options) {
        super();
        this.book = book;
        this.chapters = this.book.chapters;
        const zipFilename = `[${this.book.author}]${this.book.bookname}.epub`;
        this.epubZip = new FflateZip(zipFilename, streamZip, "application/epub+zip");
        if (options) {
            Object.assign(this, options);
        }
    }
    async addAttachment(attachment) {
        if (attachment.status === main/* Status.finished */.qb.finished && attachment.imageBlob) {
            external_log_default().debug(`[save-epub]添加附件，文件名：${attachment.name}，对象`, attachment.imageBlob);
            await this.epubZip.file(`OEBPS/${attachment.name}`, attachment.imageBlob);
            const item = this.contentOpf.createElement("item");
            item.id = attachment.name;
            item.setAttribute("href", attachment.name);
            const mimetype = (0,misc/* extensionToMimetype */.z9)(attachment.name.substring(attachment.name.lastIndexOf(".") + 1));
            item.setAttribute("media-type", mimetype);
            if (!this.manifest.querySelector(`itme[id="${attachment.name}"]`)) {
                this.manifest.appendChild(item);
            }
        }
        else if (attachment.status === main/* Status.saved */.qb.saved) {
            external_log_default().debug(`[save-epub]附件${attachment.name}已添加`);
        }
        else {
            external_log_default().warn(`[save-epub]添加附件${attachment.name}失败，该附件未完成或内容为空。`);
            external_log_default().warn(attachment);
        }
    }
    async addChapter(chapter, suffix = "") {
        const chapterName = this.getchapterName(chapter);
        const chapterNumberToSave = this.getChapterNumberToSave(chapter, this.chapters);
        const chapterHtmlFileName = `No${chapterNumberToSave}Chapter${suffix}.xhtml`;
        chapter.chapterHtmlFileName = chapterHtmlFileName;
        external_log_default().debug(`[save-epub]保存章HTML文件：${chapterName}`);
        const chapterHTMLBlob = this.genChapterHtmlFile(chapter);
        await this.epubZip.file(`OEBPS/${chapterHtmlFileName}`, chapterHTMLBlob);
        const item = this.contentOpf.createElement("item");
        item.id = chapterHtmlFileName;
        item.setAttribute("href", chapterHtmlFileName);
        item.setAttribute("media-type", "application/xhtml+xml");
        if (!this.manifest.querySelector(`itme[id="${chapterHtmlFileName}"]`)) {
            this.manifest.appendChild(item);
        }
        if (chapter.contentImages && chapter.contentImages.length !== 0) {
            external_log_default().debug(`[save-epub]保存章节附件：${chapterName}`);
            for (const attachment of chapter.contentImages) {
                await this.addAttachment(attachment);
            }
        }
    }
    genChapterHtmlFile(chapterObj) {
        const _htmlText = chapterTemplt.render({
            chapterUrl: chapterObj.chapterUrl,
            chapterName: chapterObj.chapterName,
            outerHTML: chapterObj.contentHTML?.outerHTML ?? "",
        });
        const htmlText = (0,dom/* convertHTMLtoXHTML */.fI)(_htmlText);
        return new Blob([
            `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
      "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`,
            htmlText
                .replaceAll("data-src-address", "src")
                .replace("<!DOCTYPE html>", ""),
        ], {
            type: "application/xhtml+xml",
        });
    }
    async saveEpub() {
        const self = this;
        external_log_default().debug("[save-epub]保存epub基本文件");
        await saveEpubMimetype();
        external_log_default().debug("[save-epub]保存样式文件");
        await saveStyle();
        external_log_default().debug("[save-epub]更新Metadata");
        await updateMetadata();
        if (this.book.additionalMetadate.attachments) {
            external_log_default().debug("[save]保存书籍附件");
            for (const bookAttachment of this.book.additionalMetadate.attachments) {
                await this.addAttachment(bookAttachment);
            }
        }
        external_log_default().debug("[save-epub]保存仅标题章节文件");
        await saveStubChapters(this.chapters);
        external_log_default().debug("[save-epub]保存目录文件");
        await saveToC();
        await saveZipFiles();
        await this.epubZip.generateAsync();
        async function saveEpubMimetype() {
            await self.epubZip.file("mimetype", new Blob(["application/epub+zip"]), true);
            await self.epubZip.file("META-INF/container.xml", new Blob([
                `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
    </rootfiles>
</container>`,
            ]));
        }
        async function saveStyle() {
            await self.epubZip.file("OEBPS/style.css", new Blob([self.mainStyleText]));
            await self.epubZip.file("OEBPS/sgc-toc.css", new Blob([sgc_toc/* default */.Z]));
        }
        async function updateMetadata() {
            const title = self.contentOpf.createElement("dc:title");
            title.textContent = self.book.bookname;
            self.metadata.appendChild(title);
            self.ncx.querySelector("docTitle > text").innerHTML =
                self.book.bookname;
            const author = self.contentOpf.createElement("dc:creator");
            author.setAttribute("opf:role", "");
            author.textContent = self.book.author;
            self.metadata.appendChild(author);
            const source = self.contentOpf.createElement("dc:source");
            source.textContent = self.book.bookUrl;
            self.metadata.appendChild(source);
            if (self.book.additionalMetadate.language) {
                const language = self.contentOpf.createElement("dc:language");
                language.textContent = self.book.additionalMetadate.language;
                self.metadata.appendChild(language);
            }
            if (self.book.introduction) {
                const introduction = self.contentOpf.createElement("dc:description");
                introduction.textContent = self.book.introduction;
                self.metadata.appendChild(introduction);
            }
            if (self.book.additionalMetadate.cover) {
                await self.addAttachment(self.book.additionalMetadate.cover);
                const cover = self.contentOpf.createElement("meta");
                cover.name = "cover";
                cover.content = self.book.additionalMetadate.cover.name;
                await self.epubZip.file("OEBPS/cover.xhtml", new Blob([getCoverXhtml(self.book.additionalMetadate.cover.name)]));
            }
            else {
                self.manifest.querySelector('item[id="cover.xhtml"]')?.remove();
                self.spine.querySelector('itemref[idref="cover.xhtml"]')?.remove();
                self.guide.querySelector('reference[type="cover"]')?.remove();
            }
            if (self.book.additionalMetadate.tags) {
                for (const _tag of self.book.additionalMetadate.tags) {
                    const tag = self.contentOpf.createElement("dc:subject");
                    tag.textContent = _tag;
                    self.metadata.appendChild(tag);
                }
            }
            await self.epubZip.file("OEBPS/info.xhtml", new Blob([getInfoXhtml(self.book.bookname, self.book.author)]));
            await self.epubZip.file("OEBPS/message.xhtml", new Blob([(0,dom/* convertHTMLtoXHTML */.fI)(getMessageXhtml(self.book))]));
        }
        async function saveStubChapters(chapters) {
            chapters = chapters.filter((c) => c.status !== main/* Status.saved */.qb.saved);
            for (const c of chapters) {
                if (c.status === main/* Status.finished */.qb.finished) {
                    await self.addChapter(c);
                }
                else {
                    await self.addChapter(c, "Stub");
                }
            }
        }
        async function saveToC() {
            external_log_default().debug("[save-epub]对 chapters 排序");
            self.chapters.sort(self.chapterSort);
            const sectionsListObj = (0,save_misc/* getSectionsObj */.f)(self.chapters, self.chapterSort);
            let i = 0;
            let sectionNumberG;
            let sectionNavPoint;
            let sectionTOCDiv;
            for (const sectionObj of sectionsListObj) {
                const { sectionName, sectionNumber, chpaters } = sectionObj;
                if (sectionNumber !== sectionNumberG) {
                    const sectionNumberToSave = self.getChapterNumberToSave(chpaters[0], self.chapters);
                    const sectionHtmlFileName = `No${sectionNumberToSave}Section.xhtml`;
                    if (sectionName) {
                        sectionNumberG = sectionNumber;
                        external_log_default().debug(`[save-epub]保存卷HTML文件：${sectionName}`);
                        const sectionHTMLBlob = genSectionHtmlFile(sectionName);
                        await self.epubZip.file(`OEBPS/${sectionHtmlFileName}`, sectionHTMLBlob);
                        appendManifest(sectionHtmlFileName);
                        appendSpine(sectionHtmlFileName);
                        i++;
                        const navPoint = genNavPoint(i, sectionName, sectionHtmlFileName);
                        if (sectionNavPoint) {
                            self.navMap.appendChild(sectionNavPoint);
                        }
                        sectionNavPoint = navPoint;
                        const div = genTocDiv("sgc-toc-level-1", sectionName, sectionHtmlFileName);
                        if (sectionTOCDiv) {
                            self.tocBody.appendChild(sectionTOCDiv);
                        }
                        sectionTOCDiv = div;
                    }
                }
                for (const chpater of chpaters) {
                    const chapterHtmlFileName = chpater.chapterHtmlFileName;
                    if (sectionName) {
                        appendSpine(chapterHtmlFileName);
                        i++;
                        const navPoint = genNavPoint(i, chpater.chapterName ?? "", chapterHtmlFileName);
                        sectionNavPoint?.appendChild(navPoint);
                        const div = genTocDiv("sgc-toc-level-2", chpater.chapterName ?? "", chapterHtmlFileName);
                        sectionTOCDiv?.appendChild(div);
                    }
                    else {
                        appendSpine(chapterHtmlFileName);
                        i++;
                        const navPoint = genNavPoint(i, chpater.chapterName ?? "", chapterHtmlFileName);
                        self.navMap.appendChild(navPoint);
                        const div = genTocDiv("sgc-toc-level-2", chpater.chapterName ?? "", chapterHtmlFileName);
                        self.tocBody.appendChild(div);
                    }
                }
            }
            if (sectionNavPoint) {
                self.navMap.appendChild(sectionNavPoint);
            }
            if (sectionTOCDiv) {
                self.tocBody.appendChild(sectionTOCDiv);
            }
            await self.epubZip.file("OEBPS/content.opf", new Blob([
                new XMLSerializer()
                    .serializeToString(self.contentOpf)
                    .replaceAll('xmlns=""', ""),
            ]));
            await self.epubZip.file("OEBPS/toc.ncx", new Blob([
                new XMLSerializer()
                    .serializeToString(self.ncx)
                    .replaceAll('xmlns=""', ""),
            ]));
            await self.epubZip.file("OEBPS/TOC.xhtml", new Blob([new XMLSerializer().serializeToString(self.toc)]));
            function appendManifest(htmlFileName) {
                const item = self.contentOpf.createElement("item");
                item.id = htmlFileName;
                item.setAttribute("href", htmlFileName);
                item.setAttribute("media-type", "application/xhtml+xml");
                if (!self.manifest.querySelector(`itme[id="${htmlFileName}"]`)) {
                    self.manifest.appendChild(item);
                }
            }
            function appendSpine(htmlFileName) {
                const itemref = self.contentOpf.createElement("itemref");
                itemref.setAttribute("idref", htmlFileName);
                self.spine.appendChild(itemref);
            }
            function genNavPoint(num, name, htmlFileName) {
                const navPoint = self.ncx.createElement("navPoint");
                navPoint.id = `navPoint-${num}`;
                navPoint.setAttribute("playOrder", num.toString());
                const navLabel = self.ncx.createElement("navLabel");
                const text = self.ncx.createElement("text");
                text.textContent = name;
                const content = self.ncx.createElement("content");
                content.setAttribute("src", htmlFileName);
                navLabel.appendChild(text);
                navPoint.appendChild(navLabel);
                navPoint.appendChild(content);
                return navPoint;
            }
            function genTocDiv(className, name, htmlFileName) {
                const div = self.toc.createElement("div");
                div.className = className;
                const a = self.toc.createElement("a");
                a.href = htmlFileName;
                a.innerText = name;
                div.appendChild(a);
                return div;
            }
            function genSectionHtmlFile(sectionName) {
                const _htmlText = section.render({ sectionName: sectionName });
                const htmlText = (0,dom/* convertHTMLtoXHTML */.fI)(_htmlText);
                return new Blob([
                    `<?xml version="1.0" encoding="utf-8"?>
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
          "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`,
                    htmlText
                        .replaceAll("data-src-address", "src")
                        .replace("<!DOCTYPE html>", ""),
                ], {
                    type: "application/xhtml+xml",
                });
            }
        }
        async function saveZipFiles() {
            external_log_default().debug("[save-zip]保存元数据文本");
            const metaDateText = self.genMetaDateTxt(self.book);
            await self.epubZip.file("OEBPS/info.txt", new Blob([metaDateText], { type: "text/plain;charset=utf-8" }));
            external_log_default().debug("[save-zip]保存web样式");
            await self.epubZip.file("OEBPS/web.css", new Blob([web/* default */.Z], { type: "text/css;charset=utf-8" }));
            modifyTocStyleText();
            await self.epubZip.file("OEBPS/toc.css", new Blob([self.tocStyleText], { type: "text/css;charset=utf-8" }));
            external_log_default().debug("[save-zip]开始生成并保存 index.html");
            await saveIndex();
            external_log_default().debug("[save-zip]开始保存 Meta Data Json");
            await saveMetaJson();
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
            async function saveIndex() {
                external_log_default().debug("[save]对 chapters 排序");
                self.chapters.sort(self.chapterSort);
                const sectionsListObj = (0,save_misc/* getSectionsObj */.f)(self.chapters, self.chapterSort);
                const _indexHtmlText = index.render({
                    creationDate: Date.now(),
                    bookname: self.book.bookname,
                    author: self.book.author,
                    cover: self.book.additionalMetadate.cover,
                    introductionHTML: self.book.introductionHTML?.outerHTML,
                    bookUrl: self.book.bookUrl,
                    sectionsObj: Object.values(sectionsListObj),
                    Status: main/* Status */.qb,
                });
                const indexHtmlText = (0,dom/* convertHTMLtoXHTML */.fI)(_indexHtmlText);
                await self.epubZip.file("OEBPS/index.xhtml", new Blob([indexHtmlText.replaceAll("data-src-address", "src")], {
                    type: "application/xhtml+xml; charset=UTF-8",
                }));
            }
            async function saveMetaJson() {
                await self.epubZip.file("OEBPS/book.json", new Blob([JSON.stringify(self.book)], {
                    type: "application/json; charset=utf-8",
                }));
                await self.epubZip.file("OEBPS/chapters.json", new Blob([JSON.stringify(self.book.chapters)], {
                    type: "application/json; charset=utf-8",
                }));
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/save/txt.ts




class TXT extends Options {
    book;
    savedTextArray = [];
    saveFileNameBase;
    constructor(book, options) {
        super();
        this.book = book;
        this.saveFileNameBase = `[${this.book.author}]${this.book.bookname}`;
        if (options) {
            Object.assign(this, options);
        }
    }
    saveTxt() {
        const chapters = this.book.chapters;
        const metaDateText = this.genMetaDateTxt(this.book);
        this.savedTextArray.push(metaDateText);
        external_log_default().debug("[save]对 chapters 排序");
        chapters.sort(this.chapterSort);
        const sections = [];
        for (const chapterTemp of chapters) {
            const chapterName = this.getchapterName(chapterTemp);
            if (chapterTemp.sectionName &&
                !sections.includes(chapterTemp.sectionName)) {
                sections.push(chapterTemp.sectionName);
                const sectionText = this.genSectionText(chapterTemp.sectionName);
                this.savedTextArray.push(sectionText);
            }
            const chapterText = this.genChapterText(chapterName, chapterTemp.contentText ?? "");
            this.savedTextArray.push(chapterText);
            if (!setting/* enableDebug.value */.Cy.value) {
                chapterTemp.contentText = null;
            }
        }
        external_log_default().info("[save]保存TXT文件");
        const savedText = this.savedTextArray.join("\n").replaceAll("\n", "\r\n");
        (0,FileSaver_min.saveAs)(new Blob([savedText], { type: "text/plain;charset=utf-8" }), `${this.saveFileNameBase}.txt`);
    }
}

;// CONCATENATED MODULE: ./src/save/save.ts






class SaveBook {
    txt;
    epub;
    constructor(book, streamZip, options) {
        const _options = {};
        if (options !== undefined) {
            Object.assign(_options, options);
        }
        if (book.saveOptions !== undefined) {
            Object.assign(_options, book.saveOptions);
        }
        this.txt = new TXT(book, _options);
        this.epub = new EPUB(book, streamZip, _options);
    }
    async addChapter(chapter) {
        await this.epub.addChapter(chapter);
        if (!setting/* enableDebug.value */.Cy.value) {
            chapter.contentRaw = null;
            chapter.contentHTML = null;
            chapter.contentImages = null;
        }
        if (chapter.contentImages && chapter.contentImages.length !== 0) {
            for (const attachment of chapter.contentImages) {
                attachment.status = main/* Status.saved */.qb.saved;
                if (!setting/* enableDebug.value */.Cy.value) {
                    attachment.imageBlob = null;
                }
            }
        }
        chapter.status = main/* Status.saved */.qb.saved;
    }
    saveTxt() {
        this.txt.saveTxt();
    }
    async saveEpub() {
        await this.epub.saveEpub();
    }
    saveLog() {
        (0,FileSaver_min.saveAs)(new Blob([log/* logText */.KC], { type: "text/plain; charset=UTF-8" }), "debug.log");
    }
    async save() {
        this.saveTxt();
        if (setting/* enableDebug.value */.Cy.value) {
            this.saveLog();
        }
        await this.saveEpub();
    }
}

;// CONCATENATED MODULE: ./src/stat.ts


const statKeyName = "novel-downloader-22932304826849026";
const domain = document.location.hostname;
async function getStatData() {
    const _data = (await (0,GM/* _GM_getValue */.QG)(statKeyName));
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
    await (0,GM/* _GM_setValue */._u)(statKeyName, dataJSON);
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
const failedPlus = () => {
    return dataPlus("failed");
};
const printStat = async () => {
    const statData = await getStatData();
    external_log_default().info("[stat]小说下载器脚本运行情况统计：");
    external_log_default().info(statData);
    for (const k in statData) {
        if (Object.prototype.hasOwnProperty.call(statData, k)) {
            external_log_default().info(`[stat]${k}:`);
            const subData = statData[k];
            for (const j in subData) {
                if (Object.prototype.hasOwnProperty.call(subData, j)) {
                    external_log_default().info(`    ${j}: ${subData[j]}`);
                }
            }
        }
    }
};
const resetStat = () => {
    const statData = { success: {}, failed: {} };
    return saveData(statData);
};

// EXTERNAL MODULE: ./src/ui/progress.ts + 1 modules
var progress = __webpack_require__("./src/ui/progress.ts");
;// CONCATENATED MODULE: ./src/rules.ts










class BaseRuleClass {
    imageMode = "TM";
    charset = document.characterSet;
    concurrencyLimit = 10;
    streamZip = false;
    needLogin = false;
    nsfw = false;
    maxRunLimit;
    saveOptions;
    bcWorker = new BroadcastChannel("novel-downloader-worker");
    bcWorkerMessages = [];
    book;
    audio;
    constructor() {
        const broadcastChannelWorker = this.bcWorker;
        const messages = this.bcWorkerMessages;
        broadcastChannelWorker.onmessage = (ev) => {
            const message = ev.data;
            if (message.type === "ping") {
                const pong = {
                    type: "pong",
                    src: message.workerId,
                    workerId: window.workerId,
                    url: document.location.href,
                };
                broadcastChannelWorker.postMessage(pong);
            }
            if (message.type === "pong") {
                messages.push(message);
            }
            if (message.type === "close") {
            }
        };
    }
    async run() {
        external_log_default().info(`[run]下载开始`);
        const self = this;
        try {
            await self.preHook();
            await initBook();
            const saveBookObj = initSave(self.book);
            saveHook();
            await self.initChapters(self.book, saveBookObj).catch((error) => {
                if (error instanceof main/* ExpectError */.K2) {
                    console.warn(error);
                }
                else {
                    throw error;
                }
            });
            await save(saveBookObj);
            self.postHook();
            return self.book;
        }
        catch (error) {
            self.catchError(error);
        }
        async function initBook() {
            if (window._book &&
                window._url === document.location.href) {
                self.book = window._book;
            }
            else {
                self.book = await self.bookParse();
                window._book = self.book;
                window._url = document.location.href;
            }
            external_log_default().debug("[book]Book object:\n" + JSON.stringify(self.book));
        }
        function initSave(book) {
            external_log_default().debug("[run]保存数据");
            if (setting/* enableCustomSaveOptions */.EI &&
                typeof unsafeWindow.saveOptions === "object" &&
                saveOptionsValidate(unsafeWindow.saveOptions)) {
                const saveOptions = unsafeWindow.saveOptions;
                if (saveOptions) {
                    external_log_default().info("[run]发现自定义保存参数，内容如下\n", saveOptions);
                    return new SaveBook(book, self.streamZip, saveOptions);
                }
            }
            return new SaveBook(book, self.streamZip);
        }
        async function saveHook() {
            if (setting/* enableSaveToArchiveOrg */.CA &&
                self.needLogin === false &&
                self.book?.bookUrl &&
                window.localStorageExpired.get(`${self.book.bookUrl}_saveToArchiveOrg`) === undefined &&
                (await (0,setting/* getCustomEnableSaveToArchiveOrg */.Qd)())) {
                console.log("[saveToArchiveOrg]保存当前书页至 archive.org");
                try {
                    window.localStorageExpired.set(`${self.book.bookUrl}_saveToArchiveOrg`, true, 86400);
                }
                catch (error) {
                }
                (0,misc/* saveToArchiveOrg */.K$)(self.book.bookUrl);
                if (self.book.ToCUrl) {
                    (0,misc/* saveToArchiveOrg */.K$)(self.book.ToCUrl);
                }
            }
        }
        async function save(saveObj) {
            external_log_default().debug("[run]开始保存文件");
            await saveObj.save();
        }
    }
    async preHook() {
        const self = this;
        if (!(await preTest())) {
            const alertText = `当前网站目前最多允许${self.maxRunLimit}个下载任务同时进行。\n请待其它下载任务完成后，再行尝试。`;
            alert(alertText);
            external_log_default().info(`[run]${alertText}`);
            throw new main/* ExpectError */.K2(alertText);
        }
        await setStreamSaverSetting();
        self.audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjcxLjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhoaGvr6+vr6+8vLy8vLzKysrKysrX19fX19fX5eXl5eXl8vLy8vLy////////AAAAAExhdmM1Ny44OQAAAAAAAAAAAAAAACQCgAAAAAAAAAVY82AhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAALACwAAP/AADwQKVE9YWDGPkQWpT66yk4+zIiYPoTUaT3tnU487uNhOvEmQDaCm1Yz1c6DPjbs6zdZVBk0pdGpMzxF/+MYxA8L0DU0AP+0ANkwmYaAMkOKDDjmYoMtwNMyDxMzDHE/MEsLow9AtDnBlQgDhTx+Eye0GgMHoCyDC8gUswJcMVMABBGj/+MYxBoK4DVpQP8iAtVmDk7LPgi8wvDzI4/MWAwK1T7rxOQwtsItMMQBazAowc4wZMC5MF4AeQAGDpruNuMEzyfjLBJhACU+/+MYxCkJ4DVcAP8MAO9J9THVg6oxRMGNMIqCCTAEwzwwBkINOPAs/iwjgBnMepYyId0PhWo+80PXMVsBFzD/AiwwfcKGMEJB/+MYxDwKKDVkAP8eAF8wMwIxMlpU/OaDPLpNKkEw4dRoBh6qP2FC8jCJQFcweQIPMHOBtTBoAVcwOoCNMYDI0u0Dd8ANTIsy/+MYxE4KUDVsAP8eAFBVpgVVPjdGeTEWQr0wdcDtMCeBgDBkgRgwFYB7Pv/zqx0yQQMCCgKNgonHKj6RRVkxM0GwML0AhDAN/+MYxF8KCDVwAP8MAIHZMDDA3DArAQo3K+TF5WOBDQw0lgcKQUJxhT5sxRcwQQI+EIPWMA7AVBoTABgTgzfBN+ajn3c0lZMe/+MYxHEJyDV0AP7MAA4eEwsqP/PDmzC/gNcwXUGaMBVBIwMEsmB6gaxhVuGkpoqMZMQjooTBwM0+S8FTMC0BcjBTgPwwOQDm/+MYxIQKKDV4AP8WADAzAKQwI4CGPhWOEwCFAiBAYQnQMT+uwXUeGzjBWQVkwTcENMBzA2zAGgFEJfSPkPSZzPXgqFy2h0xB/+MYxJYJCDV8AP7WAE0+7kK7MQrATDAvQRIwOADKMBuA9TAYQNM3AiOSPjGxowgHMKFGcBNMQU1FMy45OS41VVU/31eYM4sK/+MYxKwJaDV8AP7SAI4y1Yq0MmOIADGwBZwwlgIJMztCM0qU5TQPG/MSkn8yEROzCdAxECVMQU1FMy45OS41VTe7Ohk+Pqcx/+MYxMEJMDWAAP6MADVLDFUx+4J6Mq7NsjN2zXo8V5fjVJCXNOhwM0vTCDAxFpMYYQU+RlVMQU1FMy45OS41VVVVVVVVVVVV/+MYxNcJADWAAP7EAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOsJwDWEAP7SAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPMLoDV8AP+eAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPQL0DVcAP+0AFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
        self.audio.loop = true;
        self.audio.play();
        window.onbeforeunload = (e) => {
            e.preventDefault();
            const confirmationText = "您正尝试离开本页面，当前页面有下载任务正在运行，是否确认离开？";
            return (e.returnValue = confirmationText);
        };
        window.downloading = true;
        async function preTest() {
            const broadcastChannelWorker = self.bcWorker;
            const messages = self.bcWorkerMessages;
            const ping = {
                type: "ping",
                workerId: window.workerId,
                url: document.location.href,
            };
            broadcastChannelWorker.postMessage(ping);
            await (0,misc/* sleep */._v)(300);
            const workers = messages
                .filter((m) => m.type === "pong" &&
                m.src === window.workerId &&
                m.workerId !== window.workerId)
                .map((m) => ({
                id: m.workerId,
                url: m.url,
            }));
            external_log_default().info(JSON.stringify(workers, undefined, 4));
            const nowRunning = workers.length;
            external_log_default().info(`[preTest]nowRunning: ${nowRunning}`);
            if (self.maxRunLimit) {
                return nowRunning < self.maxRunLimit;
            }
            else {
                return true;
            }
        }
    }
    async initChapters(book, saveBookObj) {
        const self = this;
        external_log_default().info(`[initChapters]开始初始化章节`);
        Object.entries(self).forEach((kv) => external_log_default().info(`[initChapters] ${kv[0]}: ${kv[1]}`));
        const chapters = getChapters(book);
        if (chapters.length === 0) {
            external_log_default().error(`[initChapters]初始化章节出错，未找到需初始化章节`);
            return [];
        }
        progress.vm.totalChapterNumber = chapters.length;
        if (self.concurrencyLimit === 1) {
            for (const chapter of chapters) {
                if (window.failedCount > 10) {
                    if (!window.stopFlag.aborted) {
                        window.stopController.abort();
                        console.error("连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
                        alert("连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
                        (0,log/* saveLogTextToFile */.qS)();
                    }
                }
                if (window.stopFlag.aborted) {
                    throw new main/* ExpectError */.K2("[chapter]收到停止信号，停止继续下载。");
                }
                try {
                    let chapterObj = await chapter.init();
                    chapterObj = await postChapterParseHook(chapterObj, saveBookObj);
                }
                catch (error) {
                    external_log_default().error(error);
                    external_log_default().trace(error);
                }
            }
        }
        else {
            const asyncHandle = async (curChapter) => {
                if (window.failedCount > 10) {
                    if (!window.stopFlag.aborted) {
                        window.stopController.abort();
                        console.error("连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
                        alert("连续十章下载失败，放弃本次下载。\n请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
                        (0,log/* saveLogTextToFile */.qS)();
                    }
                }
                if (curChapter === undefined) {
                    return null;
                }
                try {
                    let chapterObj = await curChapter.init();
                    chapterObj = await postChapterParseHook(chapterObj, saveBookObj);
                    return chapterObj;
                }
                catch (error) {
                    external_log_default().error(error);
                    external_log_default().trace(error);
                }
            };
            await (0,misc/* concurrencyRun */.C1)(chapters, self.concurrencyLimit, asyncHandle, {
                signal: window.stopFlag,
                reason: "[chapter]收到停止信号，停止继续下载。",
            });
        }
        external_log_default().info(`[initChapters]章节初始化完毕`);
        return chapters;
        function getChapters(_book) {
            function isEnable() {
                if (setting/* enableCustomChapterFilter */.Td &&
                    typeof unsafeWindow.chapterFilter === "function") {
                    let text = "[initChapters]发现自定义筛选函数，自定义筛选函数内容如下：\n";
                    text += unsafeWindow.chapterFilter?.toString();
                    external_log_default().info(text);
                    return true;
                }
                else {
                    return false;
                }
            }
            function _filter(chapter) {
                let b = true;
                try {
                    const u = unsafeWindow.chapterFilter?.(chapter);
                    if (typeof u === "boolean") {
                        b = u;
                    }
                }
                catch (error) {
                    external_log_default().error("运行自定义筛选函数时出错。", error);
                    external_log_default().trace(error);
                }
                return b;
            }
            let _chapters = _book.chapters.filter((chapter) => chapter.status === main/* Status.pending */.qb.pending);
            const enabled = isEnable();
            if (enabled) {
                external_log_default().debug("[initChapters]筛选需下载章节");
                _chapters = _chapters.filter((chapter) => _filter(chapter));
            }
            return _chapters;
        }
        async function postChapterParseHook(chapter, saveObj) {
            if (chapter.contentHTML !== undefined) {
                await saveObj.addChapter(chapter);
                progress.vm.finishedChapterNumber++;
            }
            return chapter;
        }
    }
    postHook() {
        const self = this;
        (0,attachments/* clearAttachmentClassCache */.pN)();
        self.audio?.pause();
        self.audio?.remove();
        const closeMessage = {
            type: "close",
            workerId: window.workerId,
            url: document.location.href,
        };
        self.bcWorker?.postMessage(closeMessage);
        self.bcWorker?.close();
        self.bcWorkerMessages.splice(0, self.bcWorkerMessages.length);
        window.onbeforeunload = null;
        window.downloading = false;
        progress.vm.reset();
        window._book = undefined;
        window._url = undefined;
        postCallback();
        successPlus();
        printStat();
        function postCallback() {
            if (setting/* enableCustomFinishCallback */.Vo &&
                typeof unsafeWindow.customFinishCallback ===
                    "function") {
                const customFinishCallback = unsafeWindow
                    .customFinishCallback;
                if (customFinishCallback) {
                    external_log_default().info(`发现自定义结束回调函数，内容如下：\n${customFinishCallback.toString()}`);
                    customFinishCallback();
                }
            }
        }
    }
    catchError(error) {
        const self = this;
        external_log_default().error(error);
        external_log_default().trace(error);
        self.postHook();
        if (!(error instanceof main/* ExpectError */.K2)) {
            document.getElementById("button-div")?.remove();
            external_log_default().error("运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
            failedPlus();
            alert("运行过程出错，请附上相关日志至支持地址进行反馈。\n支持地址：https://github.com/yingziwu/novel-downloader");
            (0,log/* saveLogTextToFile */.qS)();
        }
    }
}


/***/ }),

/***/ "./src/rules/biquge/template.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ mkBiqugeClass),
/* harmony export */   "y": () => (/* binding */ mkBiqugeClassNextPage)
/* harmony export */ });
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _onePage_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");


function mkBiqugeClass(introDomPatch, contentPatch, concurrencyLimit, overRide, postHook, chapterContenSelector = "#content") {
    return (0,_onePage_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl: document.location.href,
        bookname: document.querySelector("#info h1, .info > h2").innerText
            .trim()
            .replace(/最新章节$/, ""),
        author: document.querySelector("#info > p:nth-child(2), #info > div:nth-child(2), .small > span:nth-child(1)").innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim(),
        introDom: document.querySelector("#intro, .intro"),
        introDomPatch,
        coverUrl: document.querySelector("#fmimg > img, .info > .cover > img")?.src ?? null,
        aList: document.querySelectorAll("#list a, .listmain a"),
        sections: document.querySelectorAll("#list dt, .listmain dt"),
        getSName: (sElem) => {
            const b = sElem.querySelector("b");
            if (b) {
                return b.innerText;
            }
            return sElem.innerText;
        },
        postHook: (chapter) => {
            if (chapter.sectionName) {
                if (chapter.sectionName.includes("《")) {
                    chapter.sectionName = chapter.sectionName
                        .replace(`《${chapter.bookname}》`, "")
                        .trim();
                }
                else {
                    chapter.sectionName = chapter.sectionName
                        .replace(chapter.bookname, "")
                        .trim();
                }
            }
            if (postHook) {
                const out = postHook(chapter);
                return out;
            }
            return chapter;
        },
        getContent: (doc) => doc.querySelector(chapterContenSelector),
        contentPatch,
        concurrencyLimit,
        overrideConstructor: (classThis) => {
            const rawBookParse = classThis.bookParse;
            classThis.bookParse = async () => {
                const book = (await Reflect.apply(rawBookParse, classThis, []));
                const chapters = book.chapters;
                book.chapters = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .deDuplicate */ .uh)(chapters);
                return book;
            };
            if (overRide) {
                overRide(classThis);
            }
            return classThis;
        },
    });
}
function mkBiqugeClassNextPage(introDomPatch, contentPatch, getNextPage, continueCondition, concurrencyLimit, overRide, postHook, chapterContenSelector = "#content") {
    return (0,_onePage_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl: document.location.href,
        bookname: document.querySelector("#info h1, .info > h2").innerText
            .trim()
            .replace(/最新章节$/, ""),
        author: document.querySelector("#info > p:nth-child(2), #info > div:nth-child(2), .small > span:nth-child(1)").innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim(),
        introDom: document.querySelector("#intro, .intro"),
        introDomPatch,
        coverUrl: document.querySelector("#fmimg > img, .info > .cover > img")?.src ?? null,
        aList: document.querySelectorAll("#list a, .listmain a"),
        sections: document.querySelectorAll("#list dt, .listmain dt"),
        getSName: (sElem) => {
            const b = sElem.querySelector("b");
            if (b) {
                return b.innerText;
            }
            return sElem.innerText;
        },
        postHook: (chapter) => {
            if (chapter.sectionName) {
                if (chapter.sectionName.includes("《")) {
                    chapter.sectionName = chapter.sectionName
                        .replace(`《${chapter.bookname}》`, "")
                        .trim();
                }
                else {
                    chapter.sectionName = chapter.sectionName
                        .replace(chapter.bookname, "")
                        .trim();
                }
            }
            if (postHook) {
                const out = postHook(chapter);
                return out;
            }
            return chapter;
        },
        getContentFromUrl: async (chapterUrl, chapterName, charset) => {
            const { contentRaw } = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .nextPageParse */ .I2)({
                chapterName,
                chapterUrl,
                charset,
                selector: chapterContenSelector,
                contentPatch,
                getNextPage,
                continueCondition,
                enableCleanDOM: false,
            });
            return contentRaw;
        },
        contentPatch: (dom) => dom,
        concurrencyLimit,
        overrideConstructor: (classThis) => {
            const rawBookParse = classThis.bookParse;
            classThis.bookParse = async () => {
                const book = (await Reflect.apply(rawBookParse, classThis, []));
                const chapters = book.chapters;
                book.chapters = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .deDuplicate */ .uh)(chapters);
                return book;
            };
            if (overRide) {
                overRide(classThis);
            }
            return classThis;
        },
    });
}


/***/ }),

/***/ "./src/rules/biquge/type1.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "common": () => (/* binding */ common),
/* harmony export */   "gebiqu": () => (/* binding */ gebiqu),
/* harmony export */   "luoqiuzw": () => (/* binding */ luoqiuzw),
/* harmony export */   "lwxs9": () => (/* binding */ lwxs9),
/* harmony export */   "biquwx": () => (/* binding */ biquwx),
/* harmony export */   "tycqxs": () => (/* binding */ tycqxs),
/* harmony export */   "dijiubook": () => (/* binding */ dijiubook),
/* harmony export */   "c25zw": () => (/* binding */ c25zw),
/* harmony export */   "xbiquge": () => (/* binding */ xbiquge),
/* harmony export */   "yruan": () => (/* binding */ yruan),
/* harmony export */   "ranwen": () => (/* binding */ ranwen),
/* harmony export */   "b5200": () => (/* binding */ b5200),
/* harmony export */   "bxwx333": () => (/* binding */ bxwx333)
/* harmony export */ });
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/biquge/template.ts");



const common = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => introDom, (content) => content);
const gebiqu = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([/如果您喜欢.+，别忘记分享给朋友/g], introDom);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)('a[href^="http://down.gebiqu.com"]', false, introDom);
    return introDom;
}, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([/"www.gebiqu.com"/g], content);
    return content;
});
const luoqiuzw = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => introDom, (content) => {
    const ad = content.firstElementChild;
    if (ad.innerText.includes("天才一秒记住本站地址：")) {
        ad.remove();
    }
    const ads = ["记住网址m.luoqｉｕｘｚｗ．ｃｏｍ"];
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)(ads, content);
    return content;
});
const lwxs9 = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => introDom, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[align]", false, content);
    return content;
});
const biquwx = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([
        /本站提示：各位书友要是觉得《.+》还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！/,
    ], introDom);
    return introDom;
}, (content) => content, 1);
const tycqxs = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => introDom, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([
        /推荐都市大神老施新书:<a href="https:\/\/www\.tycqxs\.com\/[\d_]+\/" target="_blank">.+<\/a>/,
    ], content);
    return content;
});
const dijiubook = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)(["本书网址："], introDom);
    return introDom;
}, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("a", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)('img[src$="alipay.png"]', true, content);
    return content;
}, 1, (classThis) => {
    classThis.maxRunLimit = 1;
    const chapterParse = classThis.chapterParse;
    classThis.chapterParse = async (...args) => {
        const obj = await chapterParse(...args);
        await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_2__/* .sleep */ ._v)(3000 * Math.random());
        return obj;
    };
}, (chapter) => {
    const url = new URL(chapter.chapterUrl);
    if (url.host === "m.dijiubook.net" || url.href.endsWith(".apk")) {
        return;
    }
    return chapter;
});
const c25zw = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    introDom.querySelector("font")?.parentElement?.remove();
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)(["简介:"], introDom);
    return introDom;
}, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)(".bottem", false, content);
    return content;
});
const xbiquge = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => introDom, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([`笔趣阁 www.xbiquge.so，最快更新.+ ！`], content);
    return content;
});
const yruan = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(introDom, ["本站提示：各位书友要是觉得"]);
    return introDom;
}, (content) => content, 3);
const ranwen = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(introDom, ["还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！"]);
    return introDom;
}, (content) => content);
const b5200 = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => introDom, (content) => content, 1);
const bxwx333 = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => introDom, (content) => {
    content.querySelector("#xuanchuan")?.parentElement?.remove();
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[style]", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)(".bottem2", true, content);
    return content;
}, undefined, undefined, undefined, "#zjneirong");


/***/ }),

/***/ "./src/rules/biquge/type2.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shuquge": () => (/* binding */ shuquge),
/* harmony export */   "xyqxs": () => (/* binding */ xyqxs),
/* harmony export */   "lusetxt": () => (/* binding */ lusetxt),
/* harmony export */   "yqxs": () => (/* binding */ yqxs)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/biquge/template.ts");



const shuquge = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    document.querySelector(".noshow")?.classList.remove("noshow");
    if (document.querySelector(".showall")) {
        document.querySelector(".showall").innerHTML = "";
    }
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([
        /作者：.+所写的《.+》无弹窗免费全文阅读为转载作品,章节由网友发布。/,
        /推荐地址：https?:\/\/www\.shuquge\.com\/txt\/\d+\/index\.html/g,
    ], introDom);
    return introDom;
}, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ["请记住本书首发域名：", "www.shuquge.com"]);
    return content;
}, 1);
const xyqxs = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([/推荐地址：https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/index\.html/g], introDom);
    return introDom;
}, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[style]", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("script", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)('div[align="center"]', false, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([
        "请记住本书首发域名：www.xyqxs.cc。笔趣阁手机版阅读网址：m.xyqxs.cc",
        /\(https:\/\/www.xyqxs.cc\/html\/\d+\/\d+\/\d+\.html\)/,
    ], content);
    return content;
});
const lusetxt = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(introDom, [
        "无弹窗免费全文阅读为转载作品",
        "无弹窗推荐地址",
        "简介：",
    ]);
    return introDom;
}, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("script", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[style]", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[align]", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ["https://www.lusetxt.com/books", "请记住本书首发域名"]);
    (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .htmlTrim */ .iA)(content);
    return content;
});
const yqxs = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClass */ .R)((introDom) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)(["<span>简介：</span>"], introDom);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(introDom, ["推荐地址："]);
    return introDom;
}, (content) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("script", true, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)('div[align="center"]', false, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ["//www.yqxs.cc/html/", "请记住本书首发域名"]);
    return content;
});


/***/ }),

/***/ "./src/rules/biquge/type3.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dingdiann": () => (/* binding */ dingdiann),
/* harmony export */   "mht": () => (/* binding */ mht),
/* harmony export */   "xinwanben": () => (/* binding */ xinwanben),
/* harmony export */   "biqu55": () => (/* binding */ biqu55)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/biquge/template.ts");



const dingdiann = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClassNextPage */ .y)((introDom) => introDom, (content, doc) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[align]", false, content);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("script", true, content);
    const removelist = [
        "一秒记住，精彩小说无弹窗免费阅读！",
        "&lt;/a　:&gt;",
        "--&gt;&gt;",
        "本章未完，点击下一页继续阅读",
    ];
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)(removelist, content);
    (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .htmlTrim */ .iA)(content);
    return content;
}, (doc) => doc.querySelector(".bottem2 > a:nth-child(4)")
    .href, (_content, nextLink) => _content.innerText.includes("本章未完，点击下一页继续阅读"));
const mht = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClassNextPage */ .y)((introDom) => introDom, (content, doc) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("p[data-id]", true, content);
    (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .htmlTrim */ .iA)(content);
    return content;
}, (doc) => doc.querySelector(".bottem2 > a:nth-child(4)")
    .href, (_content, nextLink) => new URL(nextLink).pathname.includes("_"));
const xinwanben = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClassNextPage */ .y)((introDom) => {
    const _bookname = introDom.innerHTML.match(/《(.*)》/);
    let bookname;
    if (_bookname?.length === 2) {
        bookname = _bookname[1];
    }
    const adList = [
        "还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！",
        "小说免费阅读地址：",
    ];
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(introDom, adList);
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([`${bookname}小说简介：`], introDom);
    return introDom;
}, (content, doc) => {
    const filters = [
        "手机用户输入地址",
        "提示：浏览器搜索",
        "把本站分享那些需要的小伙伴！找不到书请留言！",
    ];
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, filters);
    (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .htmlTrim */ .iA)(content);
    return content;
}, (doc) => doc.querySelector("#next_url").href, (_content, nextLink) => new URL(nextLink).pathname.includes("_"));
const biqu55 = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkBiqugeClassNextPage */ .y)((introDom) => introDom, (content, doc) => {
    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ["精彩小说无弹窗免费阅读！"]);
    (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .htmlTrim */ .iA)(content);
    return content;
}, (doc) => doc.querySelector('div.bottem2 > a[rel="next"]:nth-child(3)').href, (_content, nextLink) => /[\d_]+\.html$/.exec(nextLink)?.[0].includes("_") ?? false);


/***/ }),

/***/ "./src/rules/onePage/256wxc.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c256wxc": () => (/* binding */ c256wxc)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");

const c256wxc = (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
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

/***/ "./src/rules/onePage/630shu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c630shu": () => (/* binding */ c630shu)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");


const c630shu = (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector("#info > h1").innerText.trim(),
    author: document.querySelector("div.options > span.item:nth-child(1) > a").innerText.trim(),
    introDom: document.querySelector("#intro"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".img_in > img").src,
    aList: document.querySelectorAll(".zjlist > dd > a"),
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)([/恋上你看书网 WWW.630SHU.NET ，最快更新.+最新章节！/], content);
        return content;
    },
});


/***/ }),

/***/ "./src/rules/onePage/a7xs.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a7xs": () => (/* binding */ a7xs)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");




const a7xs = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector("#info > h1").innerText.trim(),
    author: document.querySelector("span.item:nth-child(1)").innerText.trim(),
    introDom: document.querySelector(".bookinfo_intro"),
    introDomPatch: (dom) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("strong", true, dom);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(dom, [
            "您要是觉得《",
            "请不要忘记向您QQ群和微博微信里的朋友推荐哦！",
        ]);
        return dom;
    },
    coverUrl: document.querySelector(".pic > img").src,
    aList: document.querySelectorAll(".book_list > ul > li > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
        const { contentRaw } = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .nextPageParse */ .I2)({
            chapterName,
            chapterUrl,
            charset,
            selector: "#htmlContent",
            contentPatch: (content, doc) => {
                const ads = ["免费追书小说网手机版阅读网址"];
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ads);
                (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_3__/* .htmlTrim */ .iA)(content);
                return content;
            },
            getNextPage: (doc) => doc.querySelector("a.next.pager_next").href,
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


/***/ }),

/***/ "./src/rules/onePage/aixdzs.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aixdzs": () => (/* binding */ aixdzs)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");

const aixdzs = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".d_info > h1").innerText.trim(),
    author: document.querySelector(".d_ac > ul:nth-child(1) > li:nth-child(1) > a:nth-child(2)").innerText.trim(),
    introDom: document.querySelector(".d_co"),
    introDomPatch: (dom) => dom,
    coverUrl: document.querySelector(".d_af > img").src,
    aList: document.querySelectorAll("#i-chapter li.chapter > a"),
    sections: document.querySelectorAll("#i-chapter li.volume"),
    getSName: (dom) => dom.innerText.trim(),
    getContent: (doc) => doc.querySelector(".content"),
    contentPatch: (dom) => dom,
});


/***/ }),

/***/ "./src/rules/onePage/colorful-fantasybooks.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fantasybooks": () => (/* binding */ fantasybooks)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");

const fantasybooks = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".works-intro-title > strong").innerText.trim(),
    author: document.querySelector(".works-intro-digi > span:nth-child(1) > em:nth-child(1)").innerText.trim(),
    introDom: document.querySelector(".works-intro-short"),
    introDomPatch: (dom) => dom,
    coverUrl: document.querySelector(".works-cover > img")
        .src,
    aList: document.querySelectorAll(".works-chapter-list .works-chapter-item > a"),
    sections: document.querySelectorAll(".vloume"),
    getSName: (sElem) => sElem.innerText.trim(),
    getContent: (doc) => doc.querySelector("#content_cust"),
    contentPatch: (content) => {
        Array.from(content.children)
            .filter((node) => node.nodeName === "SPAN" && node.childNodes.length > 15)
            .map((span) => {
            const div = document.createElement("div");
            div.innerHTML = span.innerHTML;
            Array.from(div.querySelectorAll("p"))
                .filter((node) => node.childElementCount === 1 &&
                node.children[0].nodeName === "BR")
                .forEach((pbrp) => pbrp.remove());
            span.replaceWith(div);
        });
        return content;
    },
    concurrencyLimit: 3,
    nsfw: true,
});


/***/ }),

/***/ "./src/rules/onePage/dushu369.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dushu369": () => (/* binding */ dushu369)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");

const dushu369 = () => {
    const title = document.querySelector(".cntitle");
    const [author, bookname] = /(.+)《(.+)》/
        .exec(title.innerText.trim())
        ?.slice(1) ?? ["", title.innerText.trim()];
    return (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl: document.location.href,
        bookname,
        author,
        introDom: document.querySelector(".Readme"),
        introDomPatch: (dom) => dom,
        aList: document.querySelectorAll(".content a.a0"),
        getContent: (doc) => doc.querySelector(".content"),
        contentPatch: (dom) => dom,
    });
};


/***/ }),

/***/ "./src/rules/onePage/houhuayuan.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "houhuayuan": () => (/* binding */ houhuayuan)
/* harmony export */ });
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");



const houhuayuan = () => {
    const seriesbox = document.querySelector(".seriesbox");
    let bookUrl;
    let bookname;
    let author = document.querySelector("h3.author")?.innerText
        .replace(/♥|作者: /g, "")
        .trim();
    if (author === "") {
        author = "佚名";
    }
    const aList = [];
    if (seriesbox) {
        const lis = seriesbox.querySelectorAll("ul.serieslist-ul > li");
        for (const li of Array.from(lis)) {
            if (li.className === "serieslist-li") {
                const a = li.querySelector("a");
                if (a) {
                    aList.push(a);
                }
            }
            else if (li.className === "serieslist-li-current") {
                const a = document.createElement("a");
                a.innerText = document.querySelector(".entry-title").innerText.trim();
                a.href = document.location.href;
                aList.push(a);
            }
        }
        const aFirst = aList[0];
        bookname = aFirst.innerText
            .replace(/第.+章$|\s序$/, "")
            .trim();
        bookUrl = aFirst.href;
    }
    else {
        bookUrl = document.location.href;
        bookname = document.querySelector(".entry-title").innerText.trim();
        const a = document.createElement("a");
        a.innerText = bookname;
        a.href = bookUrl;
        aList.push(a);
    }
    return (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl,
        bookname,
        author,
        aList,
        getContentFromUrl: async (chapterUrl, chapterName, charset) => {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
            const pageLinks = doc.querySelectorAll(".page-links > a.post-page-numbers");
            if (pageLinks) {
                const content = document.createElement("div");
                const _content0 = doc.querySelector("header + div.entry-content");
                if (_content0) {
                    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .childNodesCopy */ .vR)(_content0, content);
                }
                const pageUrls = Array.from(pageLinks).map((a) => a.href);
                for (const url of pageUrls) {
                    const docc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(url, charset);
                    const _content1 = docc.querySelector("header + div.entry-content");
                    if (_content1) {
                        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .childNodesCopy */ .vR)(_content1, content);
                    }
                }
                return content;
            }
            else {
                return doc.querySelector("header + div.entry-content");
            }
        },
        contentPatch: (dom) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)('div[id^="stage-"]', true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)('div[id^="zhaoz-"]', true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("div.seriesbox", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("fieldset", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("div.wpulike", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)(".simplefavorite-button", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)(".page-links", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rm2 */ .vS)(dom, [" – 蔷薇后花园", " – 黑沼泽俱乐部"]);
            Array.from(dom.querySelectorAll("img")).forEach((img) => (img.src = img.getAttribute("data-src") ?? ""));
            return dom;
        },
        nsfw: true,
    });
};


/***/ }),

/***/ "./src/rules/onePage/kakuyomu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "kakuyomu": () => (/* binding */ kakuyomu)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");

const kakuyomu = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector("#workTitle > a").innerText.trim(),
    author: document.querySelector("#workAuthor-activityName > a").innerText.trim(),
    introDom: document.querySelector("#introduction"),
    introDomPatch: (dom) => dom,
    coverUrl: null,
    additionalMetadatePatch: (additionalMetadate) => {
        additionalMetadate.tags = Array.from(document.querySelectorAll("#workMeta-tags > li > a")).map((a) => a.innerText);
        return additionalMetadate;
    },
    aList: document.querySelectorAll("li.widget-toc-episode > a"),
    getAName: (dom) => dom.querySelector("span.widget-toc-episode-titleLabel").innerText.trim(),
    sections: document.querySelectorAll("li.widget-toc-chapter > span"),
    getSName: (dom) => dom.innerText.trim(),
    getContent: (dom) => dom.querySelector(".widget-episodeBody"),
    contentPatch: (dom) => dom,
});


/***/ }),

/***/ "./src/rules/onePage/masiro.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "masiro": () => (/* binding */ masiro)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");


const masiro = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".novel-title").innerText.trim(),
    author: document.querySelector(".author > a").innerText.trim(),
    introDom: document.querySelector(".brief"),
    introDomPatch: (dom) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)(["简介："], dom);
        return dom;
    },
    coverUrl: document.querySelector("div.mailbox-attachment-icon > a > img.img").src,
    additionalMetadatePatch: (additionalMetadate) => {
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.n-detail > div.tags a")).map((a) => a.innerText);
        return additionalMetadate;
    },
    aList: document.querySelectorAll("a.to-read"),
    getAName: (aElem) => aElem.querySelector('span[style^="overflow: hidden;"]').innerText.trim(),
    getIsVIP: (aElem) => {
        let isVIP = false;
        let isPaid = false;
        const small = aElem.querySelector("small");
        if (small) {
            const text = small.innerText.trim();
            if (text !== "") {
                isVIP = true;
                if (text === "已购") {
                    isPaid = true;
                }
            }
        }
        return { isVIP, isPaid };
    },
    sections: document.querySelectorAll("li.chapter-box > span + b"),
    getSName: (dom) => dom.innerText.trim(),
    getContent: (dom) => dom.querySelector("div.box-body.nvl-content"),
    contentPatch: (dom) => dom,
    concurrencyLimit: 3,
    needLogin: true,
});


/***/ }),

/***/ "./src/rules/onePage/quanshuzhai.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quanshuzhai": () => (/* binding */ quanshuzhai)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");

const quanshuzhai = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".booktitle").innerText.trim(),
    author: document.querySelector("a.red").innerText.trim(),
    introDom: document.querySelector(".bookintro"),
    introDomPatch: (dom) => dom,
    coverUrl: null,
    aList: document.querySelectorAll("#list-chapterAll > dd > a"),
    getContent: (doc) => doc.querySelector(".readcontent"),
    contentPatch: (dom) => dom,
});


/***/ }),

/***/ "./src/rules/onePage/shouda8.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shouda8": () => (/* binding */ shouda8)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");


const shouda8 = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".bread-crumbs > li:nth-child(4)").innerText.trim(),
    author: document.querySelector("div.bookname > h1 > em").innerText
        .replace("作者：", "")
        .trim(),
    introDom: document.querySelector(".intro"),
    introDomPatch: (introDom) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)(".book_keywords", true, introDom);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("script", true, introDom);
        return introDom;
    },
    coverUrl: document.querySelector(".pic > img:nth-child(1)").src,
    aList: document.querySelectorAll(".link_14 dd > a"),
    sections: document.querySelectorAll(".link_14 dt > b"),
    getSName: (sElem) => sElem.innerText.trim(),
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => {
        const ads = ["手打吧更新速度最快。", "www.shouda88.com"];
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ads);
        return content;
    },
});


/***/ }),

/***/ "./src/rules/onePage/syosetu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "syosetu": () => (/* binding */ syosetu),
/* harmony export */   "syosetuOrg": () => (/* binding */ syosetuOrg)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");


const syosetu = () => {
    const getIntroDom = () => {
        const a = document.querySelector("#novel_ex > .more");
        if (a) {
            a.click();
        }
        return document.querySelector("#novel_ex");
    };
    const getAList = () => {
        const _aList = document.querySelectorAll("dl.novel_sublist2 dd.subtitle > a");
        if (_aList.length !== 0) {
            return _aList;
        }
        else {
            const a = document.createElement("a");
            a.href = document.location.href;
            a.innerText = document.querySelector(".novel_title")?.innerText;
            return [a];
        }
    };
    const getNsfw = () => {
        const host = document.location.host;
        if (host === "novel18.syosetu.com") {
            return true;
        }
        else {
            return false;
        }
    };
    return (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl: document.location.href,
        bookname: document.querySelector(".novel_title").innerText.trim(),
        author: document.querySelector(".novel_writername > a").innerText.trim(),
        introDom: getIntroDom(),
        introDomPatch: (dom) => dom,
        coverUrl: null,
        aList: getAList(),
        sections: document.querySelectorAll("div.chapter_title"),
        getSName: (dom) => dom.innerText.trim(),
        getContent: (dom) => {
            const content = document.createElement("div");
            const novelP = dom.querySelector("#novel_p");
            const novelHonbun = dom.querySelector("#novel_honbun");
            const novelA = dom.querySelector("#novel_a");
            if (novelP) {
                content.appendChild(novelP);
                const hr = dom.createElement("hr");
                content.appendChild(hr);
            }
            if (novelHonbun) {
                content.appendChild(novelHonbun);
            }
            if (novelA) {
                const hr = dom.createElement("hr");
                content.appendChild(hr);
                content.appendChild(novelA);
            }
            return content;
        },
        contentPatch: (dom) => dom,
        nsfw: getNsfw(),
        needLogin: getNsfw(),
    });
};
const syosetuOrg = () => {
    const getAList = () => {
        const _aList = document.querySelectorAll('tr[class^="bgcolor"] > td > a');
        if (_aList.length !== 0) {
            return _aList;
        }
        else {
            const a = document.createElement("a");
            a.href = document.location.href;
            a.innerText = document.querySelector("div.ss:nth-child(1) > p:nth-child(1) > span:nth-child(1) > a:nth-child(1)")?.innerText;
            return [a];
        }
    };
    const aList = getAList();
    const getIntroDom = () => {
        if (aList.length === 1 &&
            aList[0].href === document.location.href) {
            return undefined;
        }
        return document.querySelector("div.ss:nth-child(2)");
    };
    return (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl: document.location.href,
        bookname: document.querySelector('div.ss > span[itemprop="name"], div.ss:nth-child(1) > p:nth-child(1) > span:nth-child(1) > a:nth-child(1)').innerText.trim(),
        author: document.querySelector('div.ss span[itemprop="author"] > a, div.ss:nth-child(1) > p:nth-child(1) > a:nth-child(2)')?.innerText.trim(),
        introDom: getIntroDom(),
        introDomPatch: (dom) => dom,
        coverUrl: null,
        additionalMetadatePatch: (additionalMetadate) => {
            additionalMetadate.tags = Array.from(document.querySelectorAll('span[itemprop="keywords"] > a, a.alert_color')).map((a) => a.innerText);
            return additionalMetadate;
        },
        aList,
        sections: document.querySelectorAll('div.ss > table > tbody > tr > td[colspan="2"] > strong'),
        getSName: (dom) => dom.innerText.trim(),
        getContent: (doc) => {
            if (aList.length === 1 &&
                aList[0].href === document.location.href) {
                return doc.querySelector("div#maind > div.ss:nth-child(2)");
            }
            return doc.querySelector("div#maind > div.ss:nth-child(1)");
        },
        contentPatch: (dom) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("p:nth-child(1)", false, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div.novelnavi", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)('div[style*="text-align:right;"]', true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div#maegaki_open", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div#atogaki_open", true, dom);
            dom.querySelectorAll('a[name="img"]').forEach((a) => {
                const img = document.createElement("img");
                img.src = a.href;
                img.alt = a.innerText;
                a.replaceWith(img);
            });
            return dom;
        },
    });
};


/***/ }),

/***/ "./src/rules/onePage/template.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ mkRuleClass)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/main.ts");









function mkRuleClass({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, additionalMetadatePatch, aList, getAName, getIsVIP, sections, getSName: _getSectionName, postHook, getContentFromUrl, getContent, contentPatch, concurrencyLimit, needLogin, nsfw, cleanDomOptions, overrideConstructor, }) {
    return class extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
        constructor() {
            super();
            this.imageMode = "TM";
            if (concurrencyLimit) {
                this.concurrencyLimit = concurrencyLimit;
            }
            if (needLogin) {
                this.needLogin = needLogin;
            }
            if (nsfw) {
                this.nsfw = nsfw;
            }
            if (overrideConstructor) {
                overrideConstructor(this);
            }
        }
        async bookParse() {
            let introduction = null;
            let introductionHTML = null;
            if (introDom && introDomPatch) {
                [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom, introDomPatch);
            }
            const additionalMetadate = {};
            if (coverUrl) {
                (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
            }
            if (additionalMetadatePatch) {
                Object.assign(additionalMetadate, additionalMetadatePatch(additionalMetadate));
            }
            const chapters = [];
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionChapterNumber = 0;
            let sectionName = null;
            let hasSection = false;
            if (sections &&
                sections instanceof NodeList &&
                typeof _getSectionName === "function") {
                hasSection = true;
            }
            for (const aElem of Array.from(aList)) {
                let chapterName;
                if (getAName) {
                    chapterName = getAName(aElem);
                }
                else {
                    chapterName = aElem.innerText;
                }
                const chapterUrl = aElem.href;
                if (hasSection && sections && _getSectionName) {
                    const _sectionName = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .getSectionName */ .$d)(aElem, sections, _getSectionName);
                    if (_sectionName !== sectionName) {
                        sectionName = _sectionName;
                        sectionNumber++;
                        sectionChapterNumber = 0;
                    }
                }
                chapterNumber++;
                sectionChapterNumber++;
                let isVIP = false;
                let isPaid = false;
                if (getIsVIP) {
                    ({ isVIP, isPaid } = getIsVIP(aElem));
                }
                let chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName,
                    sectionNumber: hasSection ? sectionNumber : null,
                    sectionChapterNumber: hasSection ? sectionChapterNumber : null,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: { bookname },
                });
                if (isVIP === true && isPaid === false) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_5__/* .Status.aborted */ .qb.aborted;
                }
                if (typeof postHook === "function") {
                    chapter = postHook(chapter);
                }
                if (chapter) {
                    chapters.push(chapter);
                }
            }
            const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
                bookUrl,
                bookname,
                author,
                introduction,
                introductionHTML,
                additionalMetadate,
                chapters,
            });
            return book;
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            let content;
            if (getContentFromUrl !== undefined) {
                content = await getContentFromUrl(chapterUrl, chapterName, charset);
            }
            else if (getContent !== undefined) {
                const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
                content = getContent(doc);
            }
            if (content) {
                content = contentPatch(content);
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM", cleanDomOptions);
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


/***/ }),

/***/ "./src/rules/onePage/tianyabooks.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tianyabooks": () => (/* binding */ tianyabooks)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");


const tianyabooks = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".book > h1")?.innerText
        .replace(/《|》/g, "")
        .trim(),
    author: document.querySelector(".book > h2 > a").innerText.trim(),
    introDom: document.querySelector(".description"),
    introDomPatch: (dom) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("h3", false, dom);
        return dom;
    },
    coverUrl: null,
    aList: document.querySelectorAll(".book > dl > dd > a"),
    sections: document.querySelectorAll(".book > dl > dt"),
    getSName: (dom) => dom.innerText.trim(),
    getContent: (doc) => doc.querySelector("#main"),
    contentPatch: (dom) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div.crumb", false, dom);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("h1", false, dom);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)('p[align="center"]', false, dom);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("table", true, dom);
        return dom;
    },
});


/***/ }),

/***/ "./src/rules/onePage/trxs.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trxs": () => (/* binding */ trxs),
/* harmony export */   "tongrenquan": () => (/* binding */ tongrenquan)
/* harmony export */ });
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");

const trxs = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
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
const tongrenquan = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
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


/***/ }),

/***/ "./src/rules/onePage/wanben.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wanben": () => (/* binding */ wanben)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");




const wanben = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".detailTitle > h1").innerText.trim(),
    author: document.querySelector(".writer > a").innerText.trim(),
    introDom: document.querySelector(".detailTopMid > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".detailTopLeft > img")?.src,
    aList: document.querySelectorAll(".chapter li > a"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
        const { contentRaw } = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .nextPageParse */ .I2)({
            chapterName,
            chapterUrl,
            charset,
            selector: "div.readerCon",
            contentPatch: (content, doc) => {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("script", true, content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("div[style]", true, content);
                const ads = [
                    "【提示】：如果觉得此文不错，请推荐给更多小伙伴吧！分享也是一种享受。",
                    "【看书助手】",
                    "百万热门书籍终身无广告免费阅读",
                ];
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rm2 */ .vS)(content, ads);
                (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_3__/* .htmlTrim */ .iA)(content);
                return content;
            },
            getNextPage: (doc) => doc.querySelector(".readPage > a:nth-child(3)")
                .href,
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


/***/ }),

/***/ "./src/rules/onePage/westnovel.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "westnovel": () => (/* binding */ westnovel)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePage/template.ts");


const westnovel = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".btitle > h1 > a").innerText.trim(),
    author: document.querySelector(".btitle > em:nth-child(2)").innerText
        .replace("作者：", "")
        .trim(),
    introDom: document.querySelector(".intro-p > p:nth-child(1)"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".img-img")?.src,
    aList: document.querySelectorAll(".chapterlist > dd > a"),
    getContent: (doc) => doc.querySelector("#BookText"),
    contentPatch: (content) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div.ads", true, content);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div.link", true, content);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("h4", true, content);
        return content;
    },
});


/***/ }),

/***/ "./src/rules/onePageWithMultiIndexPage/226ks.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c226ks": () => (/* binding */ c226ks)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePageWithMultiIndexPage/template.ts");



const c226ks = () => (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
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
        const { contentRaw } = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .nextPageParse */ .I2)({
            chapterName,
            chapterUrl,
            charset,
            selector: "#content",
            contentPatch: (content, doc) => {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("script", true, content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("div.posterror", false, content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("div[onclick]", true, content);
                const ad = '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rms */ .up)([ad], content);
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


/***/ }),

/***/ "./src/rules/onePageWithMultiIndexPage/baihexs.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baihexs": () => (/* binding */ baihexs)
/* harmony export */ });
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePageWithMultiIndexPage/template.ts");



const baihexs = () => {
    const bookUrl = document.location.href;
    const bookId = /(\d+)\/?$/.exec(document.location.href)?.[1];
    if (!bookId) {
        throw Error("获取书籍信息出错！");
    }
    return (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl,
        bookname: document.querySelector(".block_txt2 > h2 > a").innerText.trim(),
        author: document.querySelector(".block_txt2 > p:nth-child(4)").innerText
            .replace("作者：", "")
            .trim(),
        introDom: document.querySelector(".intro_info"),
        introDomPatch: (dom) => dom,
        coverUrl: document.querySelector(".block_img2 > img")
            ?.src,
        getIndexUrls: async () => {
            const contentPageUrl = `${document.location.origin}/wapbook-${bookId}`;
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(contentPageUrl + "/", document.characterSet);
            const a = doc.querySelector("div.page > a:nth-last-child(1)");
            const maxNumber = /(\d+)\/?$/.exec(a.href)?.[1];
            if (!maxNumber) {
                throw Error("获取章节列表时出错！");
            }
            const indexUrls = [];
            for (let i = 1; i <= parseInt(maxNumber, 10); i++) {
                const url = contentPageUrl + `_${i}/`;
                indexUrls.push(url);
            }
            return indexUrls;
        },
        getAList: (doc) => doc.querySelectorAll(".chapter > li > a"),
        getContent: (doc) => doc.querySelector("#nr1"),
        contentPatch: (dom) => {
            const ads = [
                /请牢记：百合小说网.+免费最快更新无防盗无防盗/,
            ];
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rms */ .up)(ads, dom);
            return dom;
        },
        concurrencyLimit: 3,
    });
};


/***/ }),

/***/ "./src/rules/onePageWithMultiIndexPage/template.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ mkRuleClass)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/main.ts");










function mkRuleClass({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, getIndexUrls, getAList, getAName, getIsVIP, postHook, getContentFromUrl, getContent, contentPatch, concurrencyLimit, needLogin, nsfw, cleanDomOptions, overrideConstructor, }) {
    return class extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
        constructor() {
            super();
            this.imageMode = "TM";
            if (concurrencyLimit) {
                this.concurrencyLimit = concurrencyLimit;
            }
            if (needLogin) {
                this.needLogin = needLogin;
            }
            if (nsfw) {
                this.nsfw = nsfw;
            }
            if (overrideConstructor) {
                overrideConstructor(this);
            }
        }
        async bookParse() {
            const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom, introDomPatch);
            const additionalMetadate = {};
            if (coverUrl) {
                (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
            }
            const indexUrls = await getIndexUrls();
            const _indexPage = [];
            await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_4__/* .concurrencyRun */ .C1)(indexUrls, this.concurrencyLimit, async (url) => {
                _log__WEBPACK_IMPORTED_MODULE_3___default().info(`[BookParse]抓取目录页：${url}`);
                const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_5__/* .getHtmlDomWithRetry */ .rf)(url);
                _indexPage.push([doc, url]);
                return doc;
            });
            const indexPage = _indexPage
                .sort((a, b) => {
                const aUrl = a[1];
                const bUrl = b[1];
                return indexUrls.indexOf(aUrl) - indexUrls.indexOf(bUrl);
            })
                .map((l) => l[0]);
            const _aListList = indexPage
                .map((doc) => {
                if (doc) {
                    return getAList(doc);
                }
                else {
                    _log__WEBPACK_IMPORTED_MODULE_3___default().error("[bookParse]部分目录页抓取失败！");
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
                let chapterName;
                if (getAName) {
                    chapterName = getAName(aElem);
                }
                else {
                    chapterName = aElem.innerText;
                }
                const chapterUrl = aElem.href;
                let isVIP = false;
                let isPaid = false;
                if (getIsVIP) {
                    ({ isVIP, isPaid } = getIsVIP(aElem));
                }
                let chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_6__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName: null,
                    sectionChapterNumber: null,
                    sectionNumber: null,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: { bookname },
                });
                if (isVIP === true && isPaid === false) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_7__/* .Status.aborted */ .qb.aborted;
                }
                if (typeof postHook === "function") {
                    chapter = postHook(chapter);
                }
                if (chapter) {
                    chapters.push(chapter);
                }
            }
            const book = new _main_Book__WEBPACK_IMPORTED_MODULE_8__/* .Book */ .f({
                bookUrl,
                bookname,
                author,
                introduction,
                introductionHTML,
                additionalMetadate,
                chapters,
            });
            return book;
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            let content;
            if (getContentFromUrl !== undefined) {
                content = await getContentFromUrl(chapterUrl, chapterName, charset);
            }
            else if (getContent !== undefined) {
                const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_5__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
                content = getContent(doc);
            }
            if (content) {
                content = contentPatch(content);
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_9__/* .cleanDOM */ .zM)(content, "TM", cleanDomOptions);
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


/***/ }),

/***/ "./src/rules/onePageWithMultiIndexPage/wanben.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wanben": () => (/* binding */ wanben)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/onePageWithMultiIndexPage/template.ts");





const wanben = () => {
    const getIntroDom = () => {
        const a = document.querySelector(".bookInfo > a");
        if (a) {
            a.click();
            a.remove();
        }
        return document.querySelector(".bookInfo");
    };
    return (0,_template__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl: document.location.href,
        bookname: document.querySelector("div.bookPhr > h2").innerText.trim(),
        author: document.querySelector("div.bookPhrMid > p:nth-child(1)").innerText
            .replace("作者：", "")
            .trim(),
        introDom: getIntroDom(),
        introDomPatch: (dom) => dom,
        coverUrl: document.querySelector("div.bookImg > img")
            ?.src,
        getIndexUrls: async () => {
            const contentPageUrl = document.querySelector("#contentbox > div.detailDiv > div.category > a").href;
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(contentPageUrl, document.characterSet);
            const aList = doc.querySelectorAll("div.pageBg div.pagenum a");
            const indexUrls = Array.from(aList).map((a) => a.href);
            return indexUrls;
        },
        getAList: (doc) => doc.querySelectorAll("div.chapterDiv > div.chapterList > ul > a"),
        getContentFromUrl: async (chapterUrl, chapterName, charset) => {
            const { contentRaw } = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .nextPageParse */ .I2)({
                chapterName,
                chapterUrl,
                charset,
                selector: "div.raderCon",
                contentPatch: (content, doc) => {
                    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_3__.rm)("script", true, content);
                    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_3__.rm)("[style]", true, content);
                    const ads = [
                        "【提示】：如果觉得此文不错，请推荐给更多小伙伴吧！分享也是一种享受。",
                        "【看书助手】",
                        "【完本神站】",
                        "百万热门书籍终身无广告免费阅读",
                    ];
                    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_3__/* .rm2 */ .vS)(content, ads);
                    (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_4__/* .htmlTrim */ .iA)(content);
                    return content;
                },
                getNextPage: (doc) => doc.querySelector("div.page > a:nth-child(3)")
                    .href,
                continueCondition: (_content, nextLink) => {
                    const pathname = nextLink.split("/").slice(-1)[0];
                    return pathname.includes("_");
                },
                enableCleanDOM: false,
            });
            return contentRaw;
        },
        contentPatch: (dom) => dom,
    });
};


/***/ }),

/***/ "./src/rules/special/duplicate/haitangtxt.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "haitangtxt": () => (/* binding */ haitangtxt),
  "yuzhaige": () => (/* binding */ yuzhaige)
});

// EXTERNAL MODULE: ./src/lib/cleanDOM.ts
var cleanDOM = __webpack_require__("./src/lib/cleanDOM.ts");
// EXTERNAL MODULE: ./src/lib/http.ts
var http = __webpack_require__("./src/lib/http.ts");
// EXTERNAL MODULE: ./src/lib/dom.ts
var lib_dom = __webpack_require__("./src/lib/dom.ts");
// EXTERNAL MODULE: ./src/lib/rule.ts
var rule = __webpack_require__("./src/lib/rule.ts");
// EXTERNAL MODULE: external "log"
var external_log_ = __webpack_require__("loglevel");
var external_log_default = /*#__PURE__*/__webpack_require__.n(external_log_);
// EXTERNAL MODULE: ./src/main/Chapter.ts
var Chapter = __webpack_require__("./src/main/Chapter.ts");
// EXTERNAL MODULE: ./src/main/Book.ts + 1 modules
var Book = __webpack_require__("./src/main/Book.ts");
// EXTERNAL MODULE: ./src/rules.ts + 11 modules
var rules = __webpack_require__("./src/rules.ts");
;// CONCATENATED MODULE: ./src/rules/lib/haitangtxtImageDecode.ts
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
const imageTable = {};

;// CONCATENATED MODULE: ./src/rules/lib/yuzhaigeImageDecode.ts
function replaceYuzhaigeImage(inputText) {
    let outputText = inputText;
    for (const imageFilename in yuzhaigeImageDecode_imageTable) {
        if (Object.prototype.hasOwnProperty.call(yuzhaigeImageDecode_imageTable, imageFilename)) {
            const normalCharacter = yuzhaigeImageDecode_imageTable[imageFilename];
            const imageHTML = `<img src="${document.location.origin}/wzbodyimg/${imageFilename}">`;
            outputText = outputText.replaceAll(imageHTML, normalCharacter);
        }
    }
    return outputText;
}
const yuzhaigeImageDecode_imageTable = {
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

;// CONCATENATED MODULE: ./src/rules/special/duplicate/haitangtxt.ts










function getClass(replaceFunction) {
    return class extends rules/* BaseRuleClass */.c {
        constructor() {
            super();
            this.imageMode = "TM";
            this.nsfw = true;
        }
        async bookParse() {
            const bookUrl = document.querySelector("div.currency_head > h1 > a").href;
            const bookId = bookUrl.split("/").slice(-2, -1)[0];
            external_log_default().debug(`[chapter]请求 ${bookUrl}`);
            const dom = await (0,http/* getHtmlDOM */.dL)(bookUrl, "UTF-8");
            const bookname = dom.querySelector("div.cataloginfo > h3").innerText.trim();
            const author = dom.querySelector(".infotype > p:nth-child(1) > a:nth-child(1)").innerText.trim();
            const introDom = dom.querySelector(".intro");
            const [introduction, introductionHTML] = await (0,rule/* introDomHandle */.SN)(introDom, (introDomI) => {
                (0,lib_dom.rm)("span:nth-child(1)", false, introDomI);
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
                const _maxPageNumber = getMaxPageNumber();
                if (_maxPageNumber === undefined) {
                    throw new Error("getMaxPageNumber return null ");
                }
                const maxPageNumber = parseInt(_maxPageNumber);
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
                external_log_default().debug(`[chapter]请求 ${indexUrl}`);
                const doc = await (0,http/* getHtmlDOM */.dL)(indexUrl, "UTF-8");
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
                const chapter = new Chapter/* Chapter */.W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName: null,
                    sectionNumber: null,
                    sectionChapterNumber: null,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                chapters.push(chapter);
            }
            const book = new Book/* Book */.f({
                bookUrl,
                bookname,
                author,
                introduction,
                introductionHTML,
                additionalMetadate,
                chapters,
            });
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
                    const _code = new URL(codeurl).searchParams.get("code");
                    if (_code) {
                        code = parseInt(_code);
                    }
                }
                if (_e) {
                    const e = atob(_e)
                        .split(/[A-Z]+%/)
                        .map((v) => parseInt(v));
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
            let dom = await (0,http/* getHtmlDOM */.dL)(chapterUrl, charset);
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
                        external_log_default().error("网站页面出错，URL： " + nowUrl);
                        flag = false;
                    }
                }
                else {
                    flag = false;
                }
                if (flag) {
                    nowUrl = nextLink;
                    dom = await (0,http/* getHtmlDOM */.dL)(nextLink, charset);
                }
            } while (flag);
            if (content) {
                const { dom: oldDom, images: finalImages } = await (0,cleanDOM/* cleanDOM */.zM)(content, "TM", { keepImageName: true });
                const _newDom = document.createElement("div");
                _newDom.innerHTML = replaceFunction(content.innerHTML);
                const { dom: newDom, text: finalText } = await (0,cleanDOM/* cleanDOM */.zM)(_newDom, "TM", {
                    keepImageName: true,
                });
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
    };
}
const haitangtxt = () => getClass(replaceHaitangtxtImage);
const yuzhaige = () => getClass(replaceYuzhaigeImage);


/***/ }),

/***/ "./src/rules/special/original/17k.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C17k": () => (/* binding */ C17k)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");










class C17k extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
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
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(bookUrl, undefined);
        const introDom = doc.querySelector("#bookInfo p.intro > a");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector("#bookCover img.book").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: isVIP(),
                    isPaid: isPaid(),
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        book.ToCUrl = document.location.href;
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
            chapterName = doc.querySelector("#readArea > div.readAreaBox.content > h1").innerText.trim();
            const content = doc.querySelector("#readArea > div.readAreaBox.content > div.p");
            if (content) {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)("p.copy", false, content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)("#banner_content", false, content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)("div.qrcode", false, content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)("div.chapter_text_ad", false, content);
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_9__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/bilibili.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MangaBilibili": () => (/* binding */ MangaBilibili)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _lib_hash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/hash.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _main_Attachment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/main/Attachment.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");










class MangaBilibili extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "naive";
        this.concurrencyLimit = 1;
        this.streamZip = true;
    }
    async bookParse() {
        const _comic_id = /\/mc(\d+)$/.exec(document.location.pathname)?.[1];
        if (!_comic_id) {
            throw new Error("获取 comic_id 失败！");
        }
        const comic_id = parseInt(_comic_id);
        const signIn = await isSignin(comic_id);
        const detail = await getDetail(comic_id);
        const bookUrl = document.location.href;
        const bookname = detail.title;
        const author = detail.author_name.join(", ");
        const introduction = detail.evaluate;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerText = detail.evaluate;
        const additionalMetadate = {};
        (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .getImageAttachment */ .CE)(detail.vertical_cover, this.imageMode, "vertical_cover-")
            .then((coverClass) => {
            additionalMetadate.cover = coverClass;
        })
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
        additionalMetadate.tags = detail.styles;
        additionalMetadate.attachments = [];
        (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .getImageAttachment */ .CE)(detail.horizontal_cover, this.imageMode, "horizontal_cover-")
            .then((coverClass) => {
            additionalMetadate.attachments?.push(coverClass);
        })
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
        const chapters = detail.ep_list.map((ep) => {
            const chapterUrl = `https://manga.bilibili.com/mc${comic_id}/${ep.id}?from=manga_detail`;
            const chapterNumber = ep.ord;
            const chapterName = [ep.short_title.trim(), ep.title.trim()].join(" ");
            const isVIP = ep.pay_gold !== 0;
            const isPaid = isVIP ? !ep.is_locked : true;
            const options = {
                comic_id,
                ep_id: ep.id,
            };
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_3__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options,
            });
            if (ep.is_locked || ep.type === 6) {
                chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_4__/* .Status.aborted */ .qb.aborted;
            }
            return chapter;
        });
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_5__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
        async function isSignin(comic_id) {
            const body = { comic_id };
            const resp = await fetch("https://manga.bilibili.com/twirp/bookshelf.v1.Bookshelf/HasFavorite?device=pc&platform=web", {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(body),
                method: "POST",
            });
            return resp.ok;
        }
        async function getDetail(comic_id) {
            const url = "https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail?device=pc&platform=web";
            const body = {
                comic_id,
            };
            const headers = {
                accept: "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
            };
            const init = {
                headers,
                body: JSON.stringify(body),
                method: "POST",
            };
            const resp = await fetch(url, init);
            const data = (await resp.json());
            if (data.code === 0) {
                return data.data;
            }
            else {
                throw new Error("获取目录失败！");
            }
        }
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const paths = await getImageIndex(options.ep_id);
        const _outs = [];
        const worker = async (path) => {
            const obj = await getImage(path);
            const out = {
                path,
                obj,
            };
            _outs.push(out);
            return out;
        };
        await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_6__/* .concurrencyRun */ .C1)(paths, 3, worker);
        _outs.sort((a, b) => paths.indexOf(a.path) - paths.indexOf(b.path));
        const outs = _outs.map((out) => out.obj);
        const dom = document.createElement("div");
        outs.forEach((o) => {
            const p = document.createElement("p");
            p.appendChild(o.dom);
            dom.appendChild(p);
        });
        const text = outs.map((o) => o.text).join("\n\n");
        const images = outs.map((o) => o.images);
        return {
            chapterName,
            contentRaw: dom,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
        };
        async function getImageIndex(ep_id) {
            const url = "https://manga.bilibili.com/twirp/comic.v1.Comic/GetImageIndex?device=pc&platform=web";
            const body = {
                ep_id,
            };
            const headers = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json;charset=utf-8",
            };
            const init = {
                headers,
                body: JSON.stringify(body),
                method: "POST",
                mode: "cors",
                credentials: "include",
            };
            const resp = await fetch(url, init);
            const data = (await resp.json());
            if (data.code === 0) {
                const images = data.data.images;
                return images.map((i) => i.path);
            }
            else {
                throw new Error(`抓取章节图片索引失败！ ep_id： ${ep_id}, code: ${data.code}, mes: ${data.msg}`);
            }
        }
        async function getImage(path) {
            const token = await getImageToken(path);
            if (token) {
                const img = await getImage(token);
                const _dom = document.createElement("img");
                _dom.setAttribute("data-src-address", img.name);
                _dom.alt = img.url;
                const _text = `![${img.url}](${img.name})`;
                _log__WEBPACK_IMPORTED_MODULE_2___default().info(`ep_id: ${options.ep_id}, path: ${path} 抓取成功！`);
                return {
                    dom: _dom,
                    text: _text,
                    images: img,
                };
            }
            throw new Error("获取图片 " + path + " 失败！");
            async function getImageToken(path) {
                const url = "https://manga.bilibili.com/twirp/comic.v1.Comic/ImageToken?device=pc&platform=web";
                const body = {
                    urls: JSON.stringify([path]),
                };
                const headers = {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json;charset=utf-8",
                };
                const init = {
                    headers,
                    body: JSON.stringify(body),
                    method: "POST",
                    referrer: chapterUrl,
                };
                const resp = await fetch(url, init);
                const data = (await resp.json());
                if (data.code === 0) {
                    return data.data[0];
                }
            }
            async function getImage(_token) {
                const url = _token.url + "?token=" + _token.token;
                const headers = {
                    Accept: "application/json, text/plain, */*",
                };
                const init = {
                    headers,
                    method: "GET",
                };
                const resp = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .fetchWithRetry */ .q4)(url, init);
                const blob = await resp.blob();
                const hash = await (0,_lib_hash__WEBPACK_IMPORTED_MODULE_8__/* .calculateSha1 */ .K)(blob);
                const ext = (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .getExt */ .r6)(blob, url);
                const name = ["cm-", hash, ".", ext].join("");
                const imgClass = new _main_Attachment__WEBPACK_IMPORTED_MODULE_9__/* .AttachmentClass */ .J(url, name, "naive");
                imgClass.imageBlob = blob;
                imgClass.status = _main_main__WEBPACK_IMPORTED_MODULE_4__/* .Status.finished */ .qb.finished;
                (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .putAttachmentClassCache */ .dK)(imgClass);
                return imgClass;
            }
        }
    }
}


/***/ }),

/***/ "./src/rules/special/original/ciweimao.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ciweimao": () => (/* binding */ Ciweimao)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Attachment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/main/Attachment.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/rules.ts");













class Ciweimao extends _rules__WEBPACK_IMPORTED_MODULE_1__/* .BaseRuleClass */ .c {
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
        const dom = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .getHtmlDOM */ .dL)(bookUrl, undefined);
        const introDom = dom.querySelector(".book-intro-cnt .book-desc");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_3__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = dom.querySelector(".cover > img")
            .src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_4__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_6__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                const isLogin = document.querySelector(".login-info.ly-fr")?.childElementCount === 1
                    ? true
                    : false;
                if (isVIP && !(isLogin && isPaid)) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_7__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_8__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        book.ToCUrl = document.location.href;
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
            const output = [];
            output.push(keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]);
            output.push(keys[accessKeyList[0].charCodeAt(0) % len]);
            for (let i = 0; i < output.length; i++) {
                message = atob(message);
                const data = output[i];
                const iv = btoa(message.substr(0, 16));
                const keys255 = btoa(message.substr(16));
                const pass = crypto_js__WEBPACK_IMPORTED_MODULE_0__.format.OpenSSL.parse(keys255);
                message = crypto_js__WEBPACK_IMPORTED_MODULE_0__.AES.decrypt(pass, crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Base64.parse(data), {
                    iv: crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Base64.parse(iv),
                    format: crypto_js__WEBPACK_IMPORTED_MODULE_0__.format.OpenSSL,
                });
                if (i < output.length - 1) {
                    message = message.toString(crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Base64);
                    message = atob(message);
                }
            }
            return message.toString(crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8);
        }
        async function getChapterAuthorSay() {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .getHtmlDOM */ .dL)(chapterUrl, undefined);
            const chapterAuthorSays = doc.querySelectorAll("#J_BookCnt .chapter.author_say");
            let divChapterAuthorSay;
            if (chapterAuthorSays.length !== 0) {
                const hr = document.createElement("hr");
                divChapterAuthorSay = document.createElement("div");
                divChapterAuthorSay.appendChild(hr);
                for (const chapterAuthorSay of Array.from(chapterAuthorSays)) {
                    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__.rm)("i", true, chapterAuthorSay);
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
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${accessKeyUrl} Referer ${refererUrl}`);
                const accessKeyObj = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .gfetch */ .GF)(accessKeyUrl, {
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
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                const chapter_access_key = accessKeyObj
                    .chapter_access_key;
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${chapterContentUrl} Referer ${refererUrl}`);
                const chapterContentObj = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .gfetch */ .GF)(chapterContentUrl, {
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
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                if (chapterContentObj.code !== 100000) {
                    _log__WEBPACK_IMPORTED_MODULE_5___default().error(chapterContentObj);
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
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__.rm)(".chapter span", true, content);
            if (divChapterAuthorSay) {
                content.appendChild(divChapterAuthorSay);
            }
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(content, "TM");
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
            async function vipChapterDecrypt(chapterIdi, refererUrl) {
                const HB = unsafeWindow.HB;
                const parentWidth = 871;
                const setFontSize = "14";
                const imageSessionCodeUrl = HB.config.rootPath + "chapter/ajax_get_image_session_code";
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${imageSessionCodeUrl} Referer ${refererUrl}`);
                const imageSessionCodeObject = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .gfetch */ .GF)(imageSessionCodeUrl, {
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
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                if (imageSessionCodeObject.code !== 100000) {
                    _log__WEBPACK_IMPORTED_MODULE_5___default().error(imageSessionCodeObject);
                    throw new Error(`下载 ${refererUrl} 失败`);
                }
                const imageCode = decrypt({
                    content: imageSessionCodeObject
                        .image_code,
                    keys: imageSessionCodeObject.encryt_keys,
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
            const isLogin = document.querySelector(".login-info.ly-fr")?.childElementCount === 1
                ? true
                : false;
            if (isLogin && isPaid) {
                const divChapterAuthorSay = await getChapterAuthorSay();
                const vipCHapterImageUrl = await vipChapterDecrypt(chapterId, chapterUrl);
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${vipCHapterImageUrl} Referer ${chapterUrl}`);
                const vipCHapterImageBlob = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .gfetch */ .GF)(vipCHapterImageUrl, {
                    method: "GET",
                    headers: {
                        Referer: chapterUrl,
                        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                    },
                    responseType: "blob",
                })
                    .then((response) => response.response)
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                const vipCHapterName = `vipCHapter${chapterId}.png`;
                const vipCHapterImage = new _main_Attachment__WEBPACK_IMPORTED_MODULE_11__/* .AttachmentClass */ .J(vipCHapterImageUrl, vipCHapterName, "TM");
                if (vipCHapterImageBlob) {
                    vipCHapterImage.imageBlob = vipCHapterImageBlob;
                    vipCHapterImage.status = _main_main__WEBPACK_IMPORTED_MODULE_7__/* .Status.finished */ .qb.finished;
                }
                const contentImages = [vipCHapterImage];
                let ddom;
                let dtext;
                if (divChapterAuthorSay) {
                    const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(divChapterAuthorSay, "TM");
                    [ddom, dtext] = [dom, text, images];
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


/***/ }),

/***/ "./src/rules/special/original/ciyuanji.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ciyuanji": () => (/* binding */ Ciyuanji)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/dom.ts");











class Ciyuanji extends _rules__WEBPACK_IMPORTED_MODULE_1__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookObject = unsafeWindow.__NUXT__.data[0].book;
        const bookId = bookObject.bookId;
        const bookname = bookObject.bookName;
        const author = bookObject.authorName;
        const introDom = document.createElement("div");
        introDom.innerHTML = bookObject.notes.replace("/\n/g", "<br/><br/>");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = bookObject.imgUrl;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
        }
        additionalMetadate.tags = bookObject.tagList.map((tagobj) => tagobj.tagName);
        const bookChapterObject = unsafeWindow.__NUXT__
            .data[1].bookChapter;
        const chapterList = bookChapterObject.chapterList;
        const chapters = [];
        let chapterNumber = 0;
        let sectionName = null;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        for (const chapterObj of chapterList) {
            const chapterId = chapterObj.chapterId;
            const chapterUrl = `${document.location.origin}/chapter/${chapterId}?bookId=${bookId}`;
            const chapterName = chapterObj.chapterName;
            const _sectionName = chapterObj.title;
            if (sectionName !== _sectionName) {
                sectionName = _sectionName;
                sectionNumber++;
                sectionChapterNumber = 0;
            }
            chapterNumber++;
            sectionChapterNumber++;
            const isVIP = chapterObj.isFee === "1";
            const isPaid = chapterObj.isBuy === "1";
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            if (chapter.isVIP === true && chapter.isPaid === false) {
                chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const data = {
            key: "ZUreQN0Epkpxh3pooWOgixjTfPwumCTYWzYTQ7SMgDnqFLQ1s9tqpVhkGf02we89moQwhSQ07DVzc3LWupRgbVvm29aYeY7zyFN",
            type1: "PC-Token",
            type2: "PC-UserInfo",
            type3: "PC-Enum",
            type4: "PC-IsActivityStart",
            f: "NpkTYvpvhJjEog8Y051gQDHmReY54z5t3F0zSd9QEFuxWGqfC8g8Y4GPuabq0KPdxArlji4dSnnHCARHnkqYBLu7iIw55ibTo18",
        };
        function encrypt(input) {
            if (input && "string" === typeof input) {
                const key = crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8.parse(data.key);
                return crypto_js__WEBPACK_IMPORTED_MODULE_0__.DES.encrypt(input, key, {
                    mode: crypto_js__WEBPACK_IMPORTED_MODULE_0__.mode.ECB,
                    padding: crypto_js__WEBPACK_IMPORTED_MODULE_0__.pad.Pkcs7,
                }).toString();
            }
        }
        function decrypt(input) {
            if (input && "string" === typeof input) {
                input = input.replace(/\n/g, "");
                const key = crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8.parse(data.key);
                return crypto_js__WEBPACK_IMPORTED_MODULE_0__.DES.decrypt(input, key, {
                    mode: crypto_js__WEBPACK_IMPORTED_MODULE_0__.mode.ECB,
                    padding: crypto_js__WEBPACK_IMPORTED_MODULE_0__.pad.Pkcs7,
                }).toString(crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8);
            }
        }
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_8__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        const _script = Array.from(doc.querySelectorAll("script")).filter((s) => /^window\.__NUXT__/.test(s.innerHTML));
        if (_script.length === 1) {
            const script = _script[0];
            const scriptText = script.innerHTML.replace(/^window\./, "const ");
            const __NUXT__ = (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__/* .sandboxed */ .J0)(`${scriptText}; return __NUXT__`);
            const chapterObj = __NUXT__.data[0].chapter;
            const content = document.createElement("div");
            const chapterContent = decrypt(chapterObj.chapterContentFormat);
            if (chapterContent) {
                content.innerHTML = chapterContent;
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(content, "TM");
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
}


/***/ }),

/***/ "./src/rules/special/original/cool18.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cool18": () => (/* binding */ Cool18)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");






class Cool18 extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.nsfw = true;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(bookUrl, this.charset);
        const title = doc.querySelector('.show_content > center > font[size="6"] > b').innerText.trim();
        const matchs = /[【《](.+)[】》](.+)?作者：([^\s-]+)/.exec(title);
        let bookname = title;
        let author = "";
        if (matchs) {
            bookname = matchs[1];
            author = matchs[3];
        }
        const introduction = null;
        const introductionHTML = null;
        const additionalMetadate = {};
        const _aElems = Array.from(document.querySelectorAll(".show_content > pre a, body > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > ul:nth-child(2) > li > a"));
        const _a = document.createElement("a");
        _a.href = document.location.href;
        _a.innerText = title;
        _aElems.push(_a);
        const aElems = _aElems
            .filter((a) => {
            const href = a.href;
            const url = new URL(href);
            return (url.searchParams.get("act") === "threadview" &&
                url.searchParams.has("tid"));
        })
            .filter((a) => a.innerText.includes("(无内容)") === false)
            .filter((item, pos, self) => {
            const urls = self.map((a) => a.href);
            const url = item.href;
            return urls.indexOf(url) === pos;
        })
            .sort((a, b) => {
            const _aTid = new URL(a.href).searchParams.get("tid");
            const _bTid = new URL(b.href).searchParams.get("tid");
            const aTid = parseInt(_aTid);
            const bTid = parseInt(_bTid);
            return aTid - bTid;
        });
        const chapters = aElems.map((a) => {
            const chapterUrl = a.href;
            const chapterNumber = -1;
            const chapterName = a.innerText
                .replace(`【${bookname}】`, "")
                .replace(`《${bookname}》`, "")
                .replace(`作者：${author}`, "")
                .trim();
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_2__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: false,
                isPaid: false,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: { bookname, author },
            });
            return chapter;
        });
        let i = 0;
        for (const chapter of chapters) {
            i++;
            chapter.chapterNumber = i;
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_3__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        chapterName = doc.querySelector('.show_content > center > font[size="6"] > b').innerText
            .replace(`【${options.bookname}】`, "")
            .replace(`《${options.bookname}》`, "")
            .replace(`作者：${options.author}`, "")
            .trim();
        const dom = doc.querySelector(".show_content > pre, .show_content > div");
        if (dom) {
            Array.from(dom.querySelectorAll('font[color*="E6E6DD"]')).forEach((f) => f.remove());
            const contentRaw = document.createElement("div");
            const nodes = Array.from(dom.childNodes);
            if (nodes.length > 10) {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_4__/* .childNodesCopy */ .vR)(dom, contentRaw);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_4__.rm)("a", true, contentRaw);
                (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__/* .convertFixWidth */ .FZ)(contentRaw);
            }
            else {
                for (const node of nodes) {
                    if (node instanceof Text && (node.textContent?.length ?? 0) > 200) {
                        if ((0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__/* .isFixWidth */ .Kg)(node)) {
                            contentRaw.appendChild((0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__/* .convertFixWidthText */ .d1)(node));
                            continue;
                        }
                        else {
                            const div = document.createElement("div");
                            div.innerText = node.textContent?.trim() ?? "";
                            contentRaw.appendChild(div);
                            continue;
                        }
                    }
                    contentRaw.appendChild(node);
                }
                Array.from(contentRaw.querySelectorAll("p"))
                    .filter((p) => p.innerText.trim() === "" &&
                    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_4__/* .getPreviousSibling */ .U)(p) instanceof HTMLElement &&
                    (0,_lib_dom__WEBPACK_IMPORTED_MODULE_4__/* .getNextSibling */ .d9)(p) instanceof HTMLElement)
                    .forEach((p) => p.remove());
            }
            const { dom: contentHTML, text: contentText, images: contentImages, } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__/* .cleanDOM */ .zM)(contentRaw, "TM");
            return {
                chapterName,
                contentRaw,
                contentText,
                contentHTML,
                contentImages,
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


/***/ }),

/***/ "./src/rules/special/original/gongzicp.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gongzicp": () => (/* binding */ Gongzicp)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/setting.ts");










class Gongzicp extends _rules__WEBPACK_IMPORTED_MODULE_1__/* .BaseRuleClass */ .c {
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
        _log__WEBPACK_IMPORTED_MODULE_2___default().debug(`请求地址: ${novelGetInfoUrl.toString()}`);
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
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
        if (novelInfo.code !== 200) {
            throw new Error(`数据接口请求失败，URL:${novelGetInfoUrl.toString()}`);
        }
        const data = novelInfo.data;
        const bookname = data.novelInfo.novel_name;
        const author = data.novelInfo.author_nickname;
        const introDom = document.createElement("div");
        introDom.innerHTML = data.novelInfo.novel_info;
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_3__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = data.novelInfo.novel_cover;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_4__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
        }
        additionalMetadate.tags = data.novelInfo.tag_list;
        async function isLogin() {
            const getUserInfoUrl = "https://webapi.gongzicp.com/user/getUserInfo";
            _log__WEBPACK_IMPORTED_MODULE_2___default().debug(`正在请求: ${getUserInfoUrl}`);
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
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
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
                const chapterNumber = parseInt(chapterObj.order);
                const chapterName = chapterObj.name;
                const isVIP = chapterObj.pay;
                const isPaid = chapterObj.is_sub;
                const isLock = chapterObj.lock;
                sectionChapterNumber++;
                const chapterOption = {
                    novel_id: data.novelInfo.novel_id,
                    chapter_id: chapterObj.id,
                };
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: chapterOption,
                });
                if ((isVIP && !(logined && chapter.isPaid)) || isLock) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function cpDecrypt(input) {
            class CP {
                iv;
                key;
                constructor(iv, key) {
                    iv += parseInt("165455", 14).toString(32);
                    this.iv = crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8.parse("$h$b3!" + iv);
                    key = atob(key) + parseInt("4d5a6c8", 14).toString(36);
                    this.key = crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8.parse(key + "A");
                }
                encrypt(input) {
                    if (typeof input === "string") {
                        const str = JSON.stringify(input);
                        const byte = crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8.parse(str);
                        return crypto_js__WEBPACK_IMPORTED_MODULE_0__.AES.encrypt(byte, this.key, {
                            mode: crypto_js__WEBPACK_IMPORTED_MODULE_0__.mode.CBC,
                            padding: crypto_js__WEBPACK_IMPORTED_MODULE_0__.pad.Pkcs7,
                            iv: this.iv,
                        });
                    }
                }
                decrypt(input) {
                    const byte = crypto_js__WEBPACK_IMPORTED_MODULE_0__.AES.decrypt(input, this.key, {
                        mode: crypto_js__WEBPACK_IMPORTED_MODULE_0__.mode.CBC,
                        padding: crypto_js__WEBPACK_IMPORTED_MODULE_0__.pad.Pkcs7,
                        iv: this.iv,
                    });
                    return crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8.stringify(byte).toString();
                }
            }
            const cp = new CP("iGzsYn", "dTBMUnJidSRFbg==");
            const content = cp.decrypt(input);
            return content;
        }
        function randomWalker() {
            _log__WEBPACK_IMPORTED_MODULE_2___default().info("[chapter]随机翻页中……");
            if (document.location.pathname.includes("novel")) {
                document.querySelector(".chapter-list .chapter a").click();
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
            const cid = options.chapter_id;
            const chapterGetInfoBaseUrl = "https://webapi.gongzicp.com/novel/chapterGetInfo";
            const chapterGetInfoUrl = new URL(chapterGetInfoBaseUrl);
            chapterGetInfoUrl.searchParams.set("cid", cid.toString());
            chapterGetInfoUrl.searchParams.set("server", "0");
            let retryTime = 0;
            async function getChapterInfo(url) {
                _log__WEBPACK_IMPORTED_MODULE_2___default().debug(`请求地址: ${url}, Referrer: ${chapterUrl}，retryTime：${retryTime}`);
                const resultI = await fetch(url, {
                    credentials: "include",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        Client: "pc",
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    referrer: chapterUrl,
                    method: "GET",
                    mode: "cors",
                })
                    .then((resp) => resp.json())
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
                if (resultI.data.chapterInfo.content.length !== 0 &&
                    resultI.data.chapterInfo.content.length < 30) {
                    retryTime++;
                    if (_setting__WEBPACK_IMPORTED_MODULE_8__/* .retryLimit */ .o5 > _setting__WEBPACK_IMPORTED_MODULE_8__/* .retryLimit */ .o5) {
                        _log__WEBPACK_IMPORTED_MODULE_2___default().error(`请求 ${url} 失败`);
                        throw new Error(`请求 ${url} 失败`);
                    }
                    _log__WEBPACK_IMPORTED_MODULE_2___default().warn("[chapter]疑似被阻断，进行随机翻页……");
                    randomWalker();
                    await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_9__/* .sleep */ ._v)(3000);
                    randomWalker();
                    await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_9__/* .sleep */ ._v)(7000);
                    randomWalker();
                    await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_9__/* .sleep */ ._v)(3000);
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
            await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_9__/* .sleep */ ._v)(3000 + Math.round(Math.random() * 4000));
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


/***/ }),

/***/ "./src/rules/special/original/hanwujinian.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hanwujinian": () => (/* binding */ Hanwujinian)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/rules.ts");











class Hanwujinian extends _rules__WEBPACK_IMPORTED_MODULE_1__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const anotherPageUrl = document.querySelector("a.titleText_3").href;
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .getHtmlDOM */ .dL)(anotherPageUrl, this.charset);
        const bookname = document.querySelector("span.titleText_1").innerText.trim();
        const author = document.querySelector("span.authorText_1").innerText.trim();
        const introDom = document.querySelector("#introtext");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_3__/* .introDomHandle */ .SN)(introDom);
        const coverUrl = document.querySelector(".wR_JSAS > img").src;
        const additionalMetadate = {};
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_4__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll("div.labelBox_1 > span")).map((span) => span?.innerText.trim());
        const chapters = [];
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        let sectionName = null;
        const signIn = document.querySelector("#userMeun") !== null;
        const sections = doc.querySelectorAll('div.wR_JS > div.wR_JC[style*="margin: 30px auto;"]');
        const divList = doc.querySelectorAll("div.wR_JS > div.wR_JC > div.wR_JSAC");
        for (const divElem of Array.from(divList)) {
            const aElem = divElem.querySelector("a");
            const chapterName = aElem.innerText.trim();
            const chapterUrl = aElem.href;
            if (sections.length !== 0) {
                const _sectionName = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_3__/* .getSectionName */ .$d)(aElem, sections, (dom) => dom.innerText.trim());
                if (_sectionName !== sectionName) {
                    sectionName = _sectionName;
                    sectionNumber++;
                    sectionChapterNumber = 0;
                }
            }
            chapterNumber++;
            sectionChapterNumber++;
            const icon = divElem.querySelector("img");
            const isVIP = icon !== null;
            const isPaid = isVIP ? icon.src.includes("lock_2_off.png") : false;
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_6__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: { bookname },
            });
            if (chapter.isVIP) {
                if (signIn) {
                    if (chapter.isPaid === false) {
                        chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_7__/* .Status.aborted */ .qb.aborted;
                    }
                }
                else {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_7__/* .Status.aborted */ .qb.aborted;
                }
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_8__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        book.ToCUrl = anotherPageUrl;
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_2__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        const script = Array.from(doc.querySelectorAll("script")).filter((s) => s.innerHTML.includes("var chapterContent"))?.[0];
        const getContent = (CryptoJS, chapterContent) => {
            function AesDecrypt(content) {
                const keys = {
                    key: "2018122911430000",
                    iv: "048fe2a99140c0e6",
                };
                const key = CryptoJS.enc.Latin1.parse(keys.key);
                const iv = CryptoJS.enc.Latin1.parse(keys.iv);
                const d = CryptoJS.AES.decrypt(content, key, {
                    iv,
                    padding: CryptoJS.pad.ZeroPadding,
                });
                return d.toString(CryptoJS.enc.Utf8);
            }
            const text = decodeURI(AesDecrypt(chapterContent));
            const div = document.createElement("div");
            div.innerText = text;
            return div;
        };
        if (script) {
            const chapterContentLine = script.innerHTML
                .split("\n")
                .filter((l) => l.includes("var chapterContent"))?.[0];
            const content = new Function("CryptoJS", `${chapterContentLine};return (${getContent.toString()})(CryptoJS, chapterContent);`)(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__/* .rm2 */ .vS)(content, ["更多优惠快去下载寒武纪年小说APP哦"]);
            content.innerHTML = content.innerHTML.replaceAll("%3A", "：");
            content.innerHTML = content.innerHTML.replaceAll("++++【", "【");
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/jjwxc.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Jjwxc": () => (/* binding */ Jjwxc)
});

// EXTERNAL MODULE: ./src/lib/attachments.ts
var attachments = __webpack_require__("./src/lib/attachments.ts");
// EXTERNAL MODULE: ./src/lib/cleanDOM.ts
var cleanDOM = __webpack_require__("./src/lib/cleanDOM.ts");
// EXTERNAL MODULE: ./src/lib/http.ts
var http = __webpack_require__("./src/lib/http.ts");
// EXTERNAL MODULE: ./src/lib/misc.ts
var misc = __webpack_require__("./src/lib/misc.ts");
// EXTERNAL MODULE: ./src/lib/dom.ts
var lib_dom = __webpack_require__("./src/lib/dom.ts");
// EXTERNAL MODULE: ./src/lib/rule.ts
var rule = __webpack_require__("./src/lib/rule.ts");
// EXTERNAL MODULE: external "log"
var external_log_ = __webpack_require__("loglevel");
var external_log_default = /*#__PURE__*/__webpack_require__.n(external_log_);
// EXTERNAL MODULE: ./src/main/main.ts
var main = __webpack_require__("./src/main/main.ts");
// EXTERNAL MODULE: ./src/main/Attachment.ts
var Attachment = __webpack_require__("./src/main/Attachment.ts");
// EXTERNAL MODULE: ./src/main/Chapter.ts
var Chapter = __webpack_require__("./src/main/Chapter.ts");
// EXTERNAL MODULE: ./src/main/Book.ts + 1 modules
var Book = __webpack_require__("./src/main/Book.ts");
// EXTERNAL MODULE: ./src/rules.ts + 11 modules
var rules = __webpack_require__("./src/rules.ts");
// EXTERNAL MODULE: ./src/setting.ts
var setting = __webpack_require__("./src/setting.ts");
;// CONCATENATED MODULE: external "idbKeyval"
const external_idbKeyval_namespaceObject = idbKeyval;
;// CONCATENATED MODULE: ./src/rules/lib/jjwxcFontDecode.ts




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
async function getJjwxcFontTable(fontName) {
    const jjwxcFontTableLocal = false;
    if (jjwxcFontTableLocal) {
        return jjwxcFontTableLocal;
    }
    else if (setting/* enableJjwxcRemoteFont */.Z3) {
        return await fetchRemoteFont(fontName);
    }
    else {
        return undefined;
    }
}
async function fetchRemoteFont(fontName) {
    const url = `https://jjwxc.bgme.bid/${fontName}.json`;
    external_log_default().info(`[jjwxc-font]开始请求远程字体对照表 ${fontName}`);
    let retry = setting/* retryLimit */.o5;
    while (retry > 0) {
        let resp;
        try {
            resp = await fetch(url);
        }
        catch (error) {
            external_log_default().error(error);
            retry--;
            if (retry > 0) {
                await (0,misc/* sleep */._v)(5000);
                continue;
            }
            else {
                external_log_default().info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
                return undefined;
            }
        }
        if (resp.ok) {
            external_log_default().info(`[jjwxc-font]远程字体对照表 ${fontName} 下载成功`);
            return (await resp.json());
        }
        else {
            retry--;
            if (retry > 0) {
                await (0,misc/* sleep */._v)(5000);
            }
            else {
                external_log_default().info(`[jjwxc-font]远程字体对照表 ${fontName} 下载失败`);
                return undefined;
            }
        }
    }
}
async function getJjwxcFontTables() {
    const JjwxcFontTablesKeyName = "novel-downloader-jjwxcFontTables";
    const JjwxcFontTablesExpiresKeyName = "novel-downloader-jjwxcFontTables__expires__";
    const JjwxcFontTablesUrl = "https://cdn.jsdelivr.net/gh/yingziwu/jjwxcFontTables@gh-pages/bundle.json";
    async function fetchAndSave() {
        try {
            log.info("[jjwxc-font]开始下载字体对照表打包文件。");
            const resp = await fetch(JjwxcFontTablesUrl);
            _jjwxcFontTables = await resp.json();
            if (_jjwxcFontTables) {
                if (await get(JjwxcFontTablesKeyName)) {
                    await update(JjwxcFontTablesKeyName, (val) => _jjwxcFontTables);
                }
                else {
                    await set(JjwxcFontTablesKeyName, _jjwxcFontTables);
                }
                if (await get(JjwxcFontTablesExpiresKeyName)) {
                    await update(JjwxcFontTablesExpiresKeyName, (val) => Date.now() + 1000 * 86400);
                }
                else {
                    await set(JjwxcFontTablesExpiresKeyName, Date.now() + 1000 * 86400);
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
    let _jjwxcFontTables = await get(JjwxcFontTablesKeyName);
    if (_jjwxcFontTables) {
        if ((await get(JjwxcFontTablesExpiresKeyName)) &&
            (await get(JjwxcFontTablesExpiresKeyName)) > Date.now()) {
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

;// CONCATENATED MODULE: ./src/rules/special/original/jjwxc.ts















class Jjwxc extends rules/* BaseRuleClass */.c {
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
        let author = "";
        let introduction = null;
        let introductionHTML = null;
        let introCleanimages = null;
        if (!getInformationBlocked()) {
            bookname = document.querySelector('h1[itemprop="name"] > span').innerText.trim();
            author = document.querySelector("td.sptd h2 a span").innerText
                .replace(/作\s+者:/, "")
                .trim();
            const introDom = document.querySelector("#novelintro");
            [introduction, introductionHTML, introCleanimages] = await (0,rule/* introDomHandle */.SN)(introDom);
            if (introCleanimages) {
                additionalMetadate.attachments = [...introCleanimages];
            }
            const coverUrl = document.querySelector(".noveldefaultimage").src;
            if (coverUrl) {
                (0,attachments/* getImageAttachment */.CE)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => external_log_default().error(error));
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
            await (0,misc/* sleep */._v)(3000);
            bookname = document.querySelector("td[id^=comment_] span.coltext > a")?.innerText
                .trim()
                .replace(/《|》/g, "");
            window.scrollTo(0, 0);
            if (!bookname) {
                throw new Error("抓取书名出错");
            }
            const authorPageUrl = document.querySelector("#oneboolt > tbody > tr:nth-child(1) > td > div > h2 > a")?.href;
            if (authorPageUrl) {
                const authorPage = await (0,http/* getHtmlDOM */.dL)(authorPageUrl, this.charset);
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
                            const chapter = new Chapter/* Chapter */.W({
                                bookUrl,
                                bookname,
                                chapterUrl,
                                chapterNumber,
                                chapterName,
                                isVIP: isVIP(),
                                isPaid: null,
                                sectionName,
                                sectionNumber,
                                sectionChapterNumber,
                                chapterParse: this.chapterParse,
                                charset: this.charset,
                                options: {},
                            });
                            const isLogin = () => {
                                if (document.getElementById("jj_login")) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            };
                            if (isVIP() && !isLogin()) {
                                chapter.status = main/* Status.aborted */.qb.aborted;
                            }
                            chapters.push(chapter);
                        }
                    }
                    else {
                        const chapterName = a.innerText.trim();
                        const chapterUrl = a.href;
                        const chapter = new Chapter/* Chapter */.W({
                            bookUrl,
                            bookname,
                            chapterUrl,
                            chapterNumber,
                            chapterName,
                            isVIP: isVIP(),
                            isPaid: null,
                            sectionName,
                            sectionNumber,
                            sectionChapterNumber,
                            chapterParse: this.chapterParse,
                            charset: this.charset,
                            options: {},
                        });
                        const isLogin = () => {
                            if (document.getElementById("jj_login")) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        };
                        if (isVIP() && !isLogin()) {
                            chapter.status = main/* Status.aborted */.qb.aborted;
                        }
                        chapters.push(chapter);
                    }
                }
                else {
                    const chapterName = "[锁]";
                    const chapterUrl = "";
                    const chapter = new Chapter/* Chapter */.W({
                        bookUrl,
                        bookname,
                        chapterUrl,
                        chapterNumber,
                        chapterName,
                        isVIP: false,
                        isPaid: null,
                        sectionName,
                        sectionNumber,
                        sectionChapterNumber,
                        chapterParse: this.chapterParse,
                        charset: this.charset,
                        options: {},
                    });
                    chapter.status = main/* Status.aborted */.qb.aborted;
                    chapters.push(chapter);
                }
            }
        }
        const book = new Book/* Book */.f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0,http/* getHtmlDOM */.dL)(chapterUrl, charset);
            chapterName = doc.querySelector("div.noveltext h2").innerText.trim();
            const content = doc.querySelector("div.noveltext");
            if (content) {
                (0,lib_dom.rm)("hr", true, content);
                const rawAuthorSayDom = content.querySelector(".readsmall");
                let authorSayDom;
                let authorSayText;
                if (rawAuthorSayDom) {
                    const { dom: adom, text: atext } = await (0,cleanDOM/* cleanDOM */.zM)(rawAuthorSayDom, "TM");
                    [authorSayDom, authorSayText] = [adom, atext];
                }
                (0,lib_dom.rm)("div", true, content);
                (0,lib_dom/* rms */.up)(["@无限好文，尽在晋江文学城"], content);
                let { dom, text, images } = await (0,cleanDOM/* cleanDOM */.zM)(content, "TM");
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
                    external_log_default().debug(`[Chapter]请求 ${fontUrlI} Referer ${chapterUrl} 重试次数 ${retryTime}`);
                    return (0,http/* gfetch */.GF)(fontUrlI, {
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
                            external_log_default().error(`[Chapter]请求 ${fontUrlI} 失败 Referer ${chapterUrl}`);
                            if (retryTime < setting/* retryLimit */.o5) {
                                retryTime++;
                                return fetchFont(fontUrlI);
                            }
                            else {
                                return null;
                            }
                        }
                    })
                        .catch((error) => external_log_default().error(error));
                }
                const [fontName, fontUrl] = getFontInfo();
                if (fontName && fontUrl) {
                    const fontFileName = `${fontName}.woff2`;
                    let fontClassObj;
                    const fontClassObjCache = (0,attachments/* getAttachmentClassCache */.gc)(fontUrl);
                    if (fontClassObjCache) {
                        fontClassObj = fontClassObjCache;
                    }
                    else {
                        const fontBlob = await fetchFont(fontUrl);
                        fontClassObj = new Attachment/* AttachmentClass */.J(fontUrl, fontFileName, "TM");
                        fontClassObj.imageBlob = fontBlob;
                        fontClassObj.status = main/* Status.finished */.qb.finished;
                        (0,attachments/* putAttachmentClassCache */.dK)(fontClassObj);
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
            const dom = await (0,http/* ggetHtmlDOM */.Fz)(chapterUrl, charset);
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
                    (0,lib_dom.rm)("hr", true, content);
                    const rawAuthorSayDom = content.querySelector(".readsmall");
                    let authorSayDom;
                    let authorSayText;
                    if (rawAuthorSayDom) {
                        const { dom: adom, text: atext } = await (0,cleanDOM/* cleanDOM */.zM)(rawAuthorSayDom, "TM");
                        [authorSayDom, authorSayText] = [adom, atext];
                    }
                    (0,lib_dom.rm)("div", true, content);
                    (0,lib_dom/* rms */.up)(["@无限好文，尽在晋江文学城"], content);
                    let { dom: rawDom, text: rawText, images, } = await (0,cleanDOM/* cleanDOM */.zM)(content, "TM");
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
                        finalText = await replaceJjwxcCharacter(fontName, rawText);
                        images.push(fontClassObj);
                        finalDom = document.createElement("div");
                        const replacedDom = document.createElement("div");
                        replacedDom.innerHTML = await replaceJjwxcCharacter(fontName, rawDom.innerHTML);
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


/***/ }),

/***/ "./src/rules/special/original/linovel.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Linovel": () => (/* binding */ Linovel)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Linovel extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const attachmentsUrlList = [];
        const coverUrl = document.querySelector(".book-cover > a").href;
        if (coverUrl) {
            attachmentsUrlList.push(coverUrl);
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
        }
        additionalMetadate.attachments = [];
        const volumeCoverUrlList = Array.from(document.querySelectorAll(".section-list > .section > .volume-info > .volume-cover a")).map((a) => a.href);
        for (const volumeCoverUrl of volumeCoverUrlList) {
            if (!attachmentsUrlList.includes(volumeCoverUrl)) {
                attachmentsUrlList.push(volumeCoverUrl);
                (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(volumeCoverUrl, this.imageMode, "volumeCover-")
                    .then((volumeCoverObj) => {
                    additionalMetadate.attachments?.push(volumeCoverObj);
                })
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: isVIP(),
                    isPaid: isPaid(),
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_5__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
            const ChapterName = doc.querySelector(".article-title").innerText.trim();
            const content = doc.querySelector(".article-text");
            if (content) {
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/lofter.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lofter": () => (/* binding */ Lofter)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/dom.ts");








class Lofter extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
        this.streamZip = true;
    }
    async bookParse() {
        const bookUrl = document.location.origin;
        const author = document.title;
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
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .getImageAttachment */ .CE)(avatarUrl, this.imageMode, "avatar-")
                .then((avatarClass) => {
                additionalMetadate.cover = avatarClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
        }
        const chapters = [];
        const pageUrlSet = new Set();
        const indexPageUrls = [];
        const getPageUrl = async (url) => {
            _log__WEBPACK_IMPORTED_MODULE_2___default().info(`[chapter]正在抓取目录页：${url}`);
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_3__/* .getHtmlDOM */ .dL)(url, undefined);
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl: pageUrl,
                chapterNumber: i,
                chapterName: null,
                isVIP: false,
                isPaid: false,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: { author },
            });
            chapters.push(chapter);
            i++;
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_5__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function post() {
            _log__WEBPACK_IMPORTED_MODULE_2___default().debug(`[chapter]请求页面：${chapterUrl}`);
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_3__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
            chapterName =
                doc
                    .querySelector("title")
                    ?.innerText.replace(new RegExp(`-${options.author}$`), "")
                    .replaceAll("\n", "")
                    .trim() ?? null;
            const selectors = [
                ".ct .ctc",
                ".main .content",
                ".m-post .text",
                ".content",
            ];
            let content;
            for (const selector of selectors) {
                const _content = doc.querySelector(selector);
                if (_content !== null) {
                    content = _content;
                    break;
                }
            }
            if (content) {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_6__.rm)(".otherinfo", true, content);
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_7__/* .cleanDOM */ .zM)(content, "TM");
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
            _log__WEBPACK_IMPORTED_MODULE_2___default().debug(`[chapter]请求页面：${chapterUrl}`);
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_3__/* .ggetHtmlDOM */ .Fz)(chapterUrl, charset);
            chapterName = doc.querySelector("#title")?.innerText.trim();
            const content = doc.querySelector("#m-cnt .long-text");
            if (content) {
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_7__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/longmabook.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Longmabook": () => (/* binding */ Longmabook)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");











class Longmabook extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
        this.nsfw = true;
    }
    async bookParse() {
        const isLogin = Boolean(document.querySelector('a[href="/?act=signinlst"]'));
        if (!isLogin) {
            alert("小说下载器：海棠文化线上文学城需登录后方可下载！请登录帐号。");
            throw new _main_main__WEBPACK_IMPORTED_MODULE_1__/* .ExpectError */ .K2("海棠文化线上文学城需登录后方可浏览！");
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
        let [introduction, introductionHTML] = [null, null, null];
        if (introDom) {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("div", true, introDom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("textarea", true, introDom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("font", true, introDom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("b", true, introDom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("span", true, introDom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("h4", true, introDom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("img", true, introDom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rms */ .up)([/【作品编号：\d+】|【作品編號：\d+】/, "\n)\n"], introDom);
            [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_3__/* .introDomHandle */ .SN)(introDom, undefined);
        }
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#mypages > div:nth-child(8) > div:nth-child(1) > img")?.src.replace("_s.", "_b.");
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_4__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
        }
        additionalMetadate.tags =
            document.querySelector('#mypages > div:nth-child(8) > div:nth-child(1) > font[color="#800080"]')?.innerText
                .split("/")
                .map((item) => item.trim()) ?? [];
        const showbooklistAPIUrl = document.location.origin + "/showbooklist.php";
        const initShowbooklistParams = {
            ebookid: bookId,
            pages: "1",
            showbooklisttype: "1",
        };
        const getInitObj = (showbooklistParams) => ({
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
            },
            body: new URLSearchParams(showbooklistParams).toString(),
            method: "POST",
            mode: "cors",
            credentials: "include",
        });
        const getPages = (doc) => {
            const aList = doc.querySelectorAll("a[onclick^=showbooklist]");
            const getPageNumber = (a) => {
                const s = a.getAttribute("onclick");
                if (s) {
                    const n = /'(\d+)'\)/.exec(s)?.slice(-1)[0];
                    if (n) {
                        return parseInt(n, 10);
                    }
                }
            };
            const _ns = Array.from(aList)
                .map(getPageNumber)
                .filter((n) => n !== undefined);
            return Array.from(new Set(_ns)).sort();
        };
        const getChapters = (doc) => doc.querySelectorAll('span[uk-icon="file-text"] + a');
        const getSections = (doc) => doc.querySelectorAll('span[uk-icon="folder"] + b > font');
        const getSName = (sElem) => sElem.innerText.trim();
        const getIsVip = (a) => a.parentElement?.innerText.includes("$") ?? false;
        const getIsPaid = (a) => a.parentElement?.innerText.includes("已購買，三年內可直接閱讀") ?? false;
        const getChapterObjs = (doc) => {
            const chapterAList = getChapters(doc);
            const sections = getSections(doc);
            const _chapterObjs = Array.from(chapterAList).map((a) => {
                const chapterName = a.innerText;
                const chapterUrl = a.href;
                const _sectionName = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_3__/* .getSectionName */ .$d)(a, sections, getSName);
                const isVip = getIsVip(a);
                let isPaid = false;
                if (isVip) {
                    isPaid = getIsPaid(a);
                }
                return {
                    chapterName,
                    chapterUrl,
                    _sectionName,
                    isVip,
                    isPaid,
                };
            });
            return _chapterObjs;
        };
        const chapterObjs = [];
        const initDoc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_6__/* .getHtmlDomWithRetry */ .rf)(showbooklistAPIUrl, self.charset, getInitObj(initShowbooklistParams));
        if (initDoc) {
            chapterObjs.push(...getChapterObjs(initDoc));
            const pages = getPages(initDoc);
            if (pages.length !== 0) {
                for (const page of pages) {
                    const showbooklistParams = (0,_lib_misc__WEBPACK_IMPORTED_MODULE_7__/* .deepcopy */ .X8)(initShowbooklistParams);
                    showbooklistParams.pages = page.toString();
                    const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_6__/* .getHtmlDomWithRetry */ .rf)(showbooklistAPIUrl, self.charset, getInitObj(showbooklistParams));
                    if (doc) {
                        chapterObjs.push(...getChapterObjs(doc));
                    }
                }
            }
        }
        const chapters = [];
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (const { chapterName, chapterUrl, _sectionName, isVip: isVIP, isPaid, } of chapterObjs) {
            if (_sectionName !== sectionName) {
                sectionName = _sectionName;
                sectionNumber++;
                sectionChapterNumber = 0;
            }
            chapterNumber++;
            sectionChapterNumber++;
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_8__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: { bookId, bookwritercode },
            });
            if (chapter.isVIP === true && chapter.isPaid === false) {
                chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_1__/* .Status.aborted */ .qb.aborted;
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_9__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const self = this;
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_6__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        if (doc.body.innerHTML.includes("您目前正在海棠清水區，只能觀看清水認證文章。")) {
            if (!window.stopFlag) {
                alert("您目前正在海棠清水區，只能觀看清水認證文章。請使用海棠其他網址進入。");
                window.stopController.abort();
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
            _log__WEBPACK_IMPORTED_MODULE_5___default().info(`[chapter]付费章节 ${chapterName} 未购买。`);
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
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(imageDom, self.imageMode);
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
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[chapter]正在请求${showpapercolorUrl}`);
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
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)('img[src="/images/fullcolor.png"]', true, contentMain);
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(contentMain, self.imageMode);
                return [dom, text, images];
            }
            else {
                return [null, null, null];
            }
        }
        async function getAuthorSay() {
            const authorSayDom = doc.querySelector("#colorpanelwritersay");
            if (authorSayDom) {
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(authorSayDom, self.imageMode);
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


/***/ }),

/***/ "./src/rules/special/original/myrics.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Myrics": () => (/* binding */ Myrics)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");








class Myrics extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookId = /^\/novels\/(\d+)/.exec(document.location.pathname)?.[1];
        if (!bookId) {
            throw new Error("获取书籍信息出错！");
        }
        const mWindow = unsafeWindow;
        const initialState = mWindow.__INITIAL_STATE__;
        const lang = navigator.languages.join(", ");
        const country = initialState.global.country;
        const signIn = initialState.global.signIn.status === "SUCCESS";
        const accessToken = initialState.global.signIn.user?.accessToken ?? null;
        const infoApi = `https://api.myrics.com/v1/novels/${bookId}`;
        const chapterApiBase = `https://api.myrics.com/v1/novels/${bookId}/chapters`;
        const headers = {
            Authority: "api.myrics.com",
            Accept: "application/json",
            Origin: "https://www.myrics.com",
            Referer: "https://www.myrics.com/",
            "X-Platform": "FRONT",
            "X-Lang": lang,
            "X-Country": country,
        };
        if (accessToken) {
            headers.Authorization = accessToken;
        }
        const init = {
            headers,
            method: "GET",
            responseType: "json",
        };
        const respI = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .gfetch */ .GF)(infoApi, init);
        const info = respI.response;
        if (info.status_code !== 200) {
            throw new Error("获取书籍信息出错！");
        }
        const bookUrl = `https://www.myrics.com/novels/${bookId}`;
        const bookname = info.result.title;
        const author = info.result.author.pen_name;
        const introduction = info.result.long_summary;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerText = introduction;
        const additionalMetadate = {};
        const coverUrl = info.result.cover_image;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
        }
        additionalMetadate.tags = info.result.genres.map((g) => g.name);
        const chapters = [];
        let pages = 0;
        let page = 1;
        const getChapterSearch = (p) => ({ page: p.toString() });
        while (pages === 0 || page <= pages) {
            const chapterApiUrl = chapterApiBase +
                `?${new URLSearchParams(getChapterSearch(page)).toString()}`;
            const respC = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .gfetch */ .GF)(chapterApiUrl, init);
            const chaptersPage = respC.response;
            if (chaptersPage.status_code !== 200) {
                throw new Error("获取书籍信息出错！");
            }
            pages = chaptersPage.result.pages;
            page++;
            for (const item of chaptersPage.result.items) {
                const chapterId = item.id;
                const chapterUrl = `https://www.myrics.com/novels/${bookId}/chapters/${chapterId}`;
                const chapterNumber = item.order;
                const chapterName = `${item.order} - ${item.title}`;
                const isVIP = item.coin !== 0;
                const isPaid = item.is_purchased;
                const sectionNumber = item.part;
                const sectionName = `卷${sectionNumber}`;
                const sectionChapterNumber = item.order;
                const isAdult = item.is_adult;
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: { bookId, chapterId, init },
                });
                if (chapter.isVIP === true && chapter.isPaid === false) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_5__/* .Status.aborted */ .qb.aborted;
                }
                if (signIn === false && isAdult === true) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_5__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        chapters.sort((a, b) => {
            if (a.sectionNumber && b.sectionNumber) {
                if (a.sectionNumber !== b.sectionNumber) {
                    return a.sectionNumber - b.sectionNumber;
                }
                else {
                    if (a.sectionChapterNumber && b.sectionChapterNumber) {
                        return a.sectionChapterNumber - b.sectionChapterNumber;
                    }
                }
            }
            else {
                return a.chapterNumber - b.chapterNumber;
            }
            return 0;
        });
        let i = 0;
        for (const c of chapters) {
            i++;
            c.chapterNumber = i;
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const { bookId, chapterId, init } = options;
        const url = `https://api.myrics.com/v1/novels/${bookId}/chapters/${chapterId}`;
        const resp = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .gfetch */ .GF)(url, init);
        const chapter = resp.response;
        if (chapter.status_code !== 200) {
            throw new Error("获取章节失败！");
        }
        const contentRaw = document.createElement("div");
        contentRaw.innerHTML = chapter.result.content;
        const { dom: contentHTML, text: contentText, images: contentImages, } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_7__/* .cleanDOM */ .zM)(contentRaw, "TM");
        return {
            chapterName,
            contentRaw,
            contentText,
            contentHTML,
            contentImages,
            additionalMetadate: null,
        };
    }
}


/***/ }),

/***/ "./src/rules/special/original/pixiv.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pixiv": () => (/* binding */ Pixiv)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");








class Pixiv extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.needLogin = true;
    }
    async bookParse() {
        const self = this;
        const _lang = document.documentElement.getAttribute("lang");
        const lang = _lang ? { lang: _lang } : {};
        const userId = await getUserId();
        let bookG;
        if (document.location.pathname.startsWith("/novel/series")) {
            const _seriesID = /(\d+)\/?$/.exec(document.location.pathname)?.[0];
            if (_seriesID) {
                const seriesID = parseInt(_seriesID, 10);
                bookG = await series(seriesID);
            }
        }
        else {
            const obj = await getPreloadData(document.location.href, self.charset);
            if (obj) {
                const { novel } = obj;
                if (novel) {
                    const seriesNavData = novel.seriesNavData;
                    if (seriesNavData) {
                        const seriesID = seriesNavData.seriesId;
                        bookG = await series(seriesID);
                    }
                    else {
                        bookG = await onePage(novel);
                    }
                }
            }
        }
        if (!bookG) {
            throw new Error("初始化图书信息失败！");
        }
        return bookG;
        async function getUserId() {
            const resp = await fetch("https://www.pixiv.net/ajax/linked_service/tumeng", {
                credentials: "include",
                headers: {
                    Accept: "application/json",
                },
                method: "GET",
                mode: "cors",
            });
            const tumeng = (await resp.json());
            if (tumeng.error === false) {
                return tumeng.body.page.user.id;
            }
        }
        async function series(id) {
            const seriesMetaBody = await getSeriesMeta(id);
            if (seriesMetaBody) {
                const bookUrl = "https://www.pixiv.net/novel/series/" + id.toString();
                const bookname = seriesMetaBody.title;
                const author = seriesMetaBody.userName;
                const introduction = seriesMetaBody.caption;
                const introductionHTML = document.createElement("div");
                introductionHTML.innerText = introduction;
                const additionalMetadate = {};
                const coverUrl = seriesMetaBody.firstEpisode.url;
                if (coverUrl) {
                    (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .getImageAttachment */ .CE)(coverUrl, self.imageMode, "cover-")
                        .then((coverClass) => {
                        additionalMetadate.cover = coverClass;
                    })
                        .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
                }
                additionalMetadate.lastModified = seriesMetaBody.updatedTimestamp;
                const seriesContents = await getSeriesContents(id, seriesMetaBody.publishedContentCount);
                const chapters = [];
                const chapterUrlBase = "https://www.pixiv.net/novel/show.php?id=";
                for (const sc of seriesContents) {
                    const chapterUrl = chapterUrlBase + sc.id;
                    const chapterNumber = sc.series.contentOrder;
                    const chapterName = `#${sc.series.contentOrder} ${sc.title}`;
                    const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_3__/* .Chapter */ .W({
                        bookUrl,
                        bookname,
                        chapterUrl,
                        chapterNumber,
                        chapterName,
                        isVIP: false,
                        isPaid: false,
                        sectionName: null,
                        sectionNumber: null,
                        sectionChapterNumber: null,
                        chapterParse: self.chapterParse,
                        charset: self.charset,
                        options: { id: sc.id, lang: _lang, userId },
                    });
                    chapters.push(chapter);
                }
                const book = new _main_Book__WEBPACK_IMPORTED_MODULE_4__/* .Book */ .f({
                    bookUrl,
                    bookname,
                    author,
                    introduction,
                    introductionHTML,
                    additionalMetadate,
                    chapters,
                });
                return book;
            }
        }
        async function getSeriesMeta(id) {
            const referrer = "https://www.pixiv.net/novel/series/" + id.toString();
            const apiMetaBase = "https://www.pixiv.net/ajax/novel/series/";
            const apiMeta = apiMetaBase +
                id.toString() +
                "?" +
                new URLSearchParams(lang).toString();
            const respMeta = await fetch(apiMeta, {
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    Pragma: "no-cache",
                    "Cache-Control": "no-cache",
                },
                referrer,
                method: "GET",
                mode: "cors",
            });
            const seriesMeta = (await respMeta.json());
            if (seriesMeta.error === false) {
                return seriesMeta.body;
            }
        }
        async function getSeriesContents(id, publishedContentCount) {
            const referrer = "https://www.pixiv.net/novel/series/" + id.toString();
            const apiBase = "https://www.pixiv.net/ajax/novel/series_content/";
            const api = apiBase + id.toString();
            let lastOrder = 0;
            const getSearchParams = () => ({
                limit: "10",
                last_order: lastOrder.toString(),
                order_by: "asc",
                ...lang,
            });
            const seriesContents = [];
            while (lastOrder < publishedContentCount) {
                const url = api + "?" + new URLSearchParams(getSearchParams()).toString();
                const resp = await fetch(url, {
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                    },
                    referrer,
                    method: "GET",
                    mode: "cors",
                });
                const _seriesContents = (await resp.json());
                if (_seriesContents.error === false) {
                    seriesContents.push(..._seriesContents.body.seriesContents);
                }
                lastOrder = lastOrder + 10;
            }
            return seriesContents;
        }
        async function onePage(novel) {
            const bookUrl = document.location.href;
            const bookId = new URL(document.location.href).searchParams.get("id");
            const bookname = novel.title;
            const author = novel.userName;
            const introductionHTML = document.createElement("div");
            introductionHTML.innerHTML = novel.description;
            const introduction = introductionHTML.innerText;
            const additionalMetadate = {};
            const coverUrl = novel.coverUrl;
            if (coverUrl) {
                (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .getImageAttachment */ .CE)(coverUrl, self.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
            }
            additionalMetadate.lastModified = new Date(novel.uploadDate).getTime();
            additionalMetadate.tags = novel.tags.tags.map((t) => t.tag);
            additionalMetadate.language = novel.language;
            const chapterUrl = bookUrl;
            const chapterName = bookname;
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_3__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber: 1,
                chapterName,
                isVIP: false,
                isPaid: false,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: self.chapterParse,
                charset: self.charset,
                options: {},
            });
            const contentRaw = document.createElement("div");
            contentRaw.innerHTML = novel.content.replace(/\n/g, "<br/>");
            await loadPixivimage({
                dom: contentRaw,
                nid: bookId,
                lang: _lang,
                userId,
                textEmbeddedImages: novel.textEmbeddedImages,
            });
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__/* .cleanDOM */ .zM)(contentRaw, "TM");
            chapter.contentRaw = contentRaw;
            chapter.contentHTML = dom;
            chapter.contentText = text;
            chapter.contentImages = images;
            chapter.additionalMetadate = {
                lastModified: new Date(novel.uploadDate).getTime(),
                tags: novel.tags.tags.map((t) => t.tag),
            };
            chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.finished */ .qb.finished;
            const chapters = [chapter];
            const book = new _main_Book__WEBPACK_IMPORTED_MODULE_4__/* .Book */ .f({
                bookUrl,
                bookname,
                author,
                introduction,
                introductionHTML,
                additionalMetadate,
                chapters,
            });
            return book;
        }
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const obj = await getPreloadData(chapterUrl, charset);
        if (obj) {
            const { novel } = obj;
            if (novel) {
                const contentRaw = document.createElement("div");
                contentRaw.innerHTML = novel.content.replace(/\n/g, "<br/>");
                await loadPixivimage({
                    dom: contentRaw,
                    nid: options.id,
                    lang: options.lang,
                    userId: options.userId,
                    textEmbeddedImages: novel.textEmbeddedImages,
                });
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__/* .cleanDOM */ .zM)(contentRaw, "TM");
                const additionalMetadate = {
                    lastModified: new Date(novel.uploadDate).getTime(),
                    tags: novel.tags.tags.map((t) => t.tag),
                };
                return {
                    chapterName,
                    contentRaw,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate,
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
}
async function getPreloadData(chapterUrl, charset) {
    const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
    const _preloadData = doc
        .querySelector("meta#meta-preload-data")
        ?.getAttribute("content");
    if (_preloadData) {
        const preloadData = JSON.parse(_preloadData);
        let novel;
        const _novel = Object.entries(preloadData.novel);
        if (_novel.length !== 0) {
            novel = _novel[0][1];
        }
        let user;
        const _user = Object.entries(preloadData.user);
        if (_user.length !== 0) {
            user = _user[0][1];
        }
        return { preloadData, novel, user };
    }
}
async function loadPixivimage({ dom, nid, lang, userId, textEmbeddedImages, }) {
    const pixivImages = dom.innerHTML.matchAll(/\[pixivimage:(\d+)\]/g);
    for (const match of pixivImages) {
        await mapperPixivImage(match);
    }
    const uploadedImages = dom.innerHTML.matchAll(/\[uploadedimage:(\d+)\]/g);
    for (const match of uploadedImages) {
        mapperUploadedImage(match);
    }
    return dom;
    async function mapperPixivImage([str, id]) {
        const imgSrc = await getPixivImage(id);
        if (imgSrc) {
            const img = document.createElement("img");
            img.src = imgSrc;
            const a = document.createElement("a");
            a.href = `https://www.pixiv.net/artworks/${id}`;
            a.appendChild(img);
            dom.innerHTML = dom.innerHTML.replaceAll(str, a.outerHTML);
        }
    }
    async function getPixivImage(id) {
        const baseUrl = `https://www.pixiv.net/ajax/novel/${nid}/insert_illusts`;
        const url = new URL(baseUrl);
        url.searchParams.set("id[]", `${id}-1`);
        if (lang) {
            url.searchParams.set("lang", lang);
        }
        const headers = {
            Accept: "application/json",
        };
        if (userId) {
            headers["x-user-id"] = userId;
        }
        const resp = await fetch(url.href, {
            credentials: "include",
            headers,
            method: "GET",
            mode: "cors",
        });
        const illusts = (await resp.json());
        if (illusts.error === false) {
            const originalUrl = illusts.body[`${id}-1`].illust.images.original;
            return originalUrl;
        }
        else {
            console.error(`获取插图失败: pixivimage:${id}`);
            return;
        }
    }
    function mapperUploadedImage([str, id]) {
        const imgSrc = textEmbeddedImages?.[id].urls.original;
        if (imgSrc) {
            const img = document.createElement("img");
            img.src = imgSrc;
            dom.innerHTML = dom.innerHTML.replaceAll(str, img.outerHTML);
        }
    }
}


/***/ }),

/***/ "./src/rules/special/original/qidian.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Qidian": () => (/* binding */ Qidian)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");











class Qidian extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 3;
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#bookImg > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll(".book-info > .tag > a, .tag-wrap > .tags")).map((a) => a.innerText.trim());
        const limitFree = Boolean(document.querySelector(".book-information .flag"));
        _log__WEBPACK_IMPORTED_MODULE_3___default().info(`[Book]限免书籍 ${limitFree}`);
        const chapters = [];
        const liLength = document.querySelectorAll("#j-catalogWrap li").length;
        const getChapterTotalNumber = () => {
            const span = document.querySelector("#J-catalogCount").innerText.match(/\d+/);
            if (span) {
                return parseInt(span[0]);
            }
        };
        if (!(liLength && getChapterTotalNumber() === liLength)) {
            await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_4__/* .sleep */ ._v)(3000);
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
                .split("·")[0]
                .trim();
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
                    chapterId = /(\d+)\/?$/.exec(chapterUrl)?.slice(-1)[0] ?? null;
                }
                else {
                    chapterId = null;
                }
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: isVIP(),
                    isPaid: isPaid(),
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {
                        _csrfToken,
                        bookId,
                        authorId,
                        chapterId,
                        limitFree,
                    },
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
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
                    if (limitFree) {
                        chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.pending */ .qb.pending;
                    }
                    if (isLogin() && chapter.isPaid) {
                        chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.pending */ .qb.pending;
                    }
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const nullObj = {
            chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };
        async function getChapter() {
            let doc;
            if (isVIP) {
                doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_8__/* .ggetHtmlDOM */ .Fz)(chapterUrl, charset);
                if (!doc.querySelector(".read-content") ||
                    (doc.querySelector(".read-content")?.childElementCount ?? 0) < 10) {
                    doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_8__/* .getFrameContent */ .jt)(chapterUrl);
                    if (doc) {
                        doc = new DOMParser().parseFromString(doc.documentElement.outerHTML, "text/html");
                    }
                }
            }
            else {
                doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_8__/* .ggetHtmlDOM */ .Fz)(chapterUrl, charset);
            }
            if (doc) {
                chapterName = doc.querySelector(".j_chapterName > .content-wrap").innerText.trim();
                if (doc.querySelector(".vip-limit-wrap")) {
                    return nullObj;
                }
                const content = document.createElement("div");
                let contentText = "";
                const contentMain = doc.querySelector(".read-content");
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__.rm)("span.review-count", true, contentMain);
                Array.from(contentMain.querySelectorAll("span.content-wrap")).forEach((span) => {
                    const parentEl = span.parentElement;
                    if (parentEl) {
                        parentEl.innerHTML = span.innerHTML;
                    }
                });
                const authorSayWrap = doc.querySelector(".author-say-wrap");
                if (contentMain) {
                    const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(contentMain, "TM");
                    (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .htmlTrim */ .iA)(dom);
                    content.appendChild(dom);
                    contentText = contentText + text;
                    if (authorSayWrap) {
                        const authorSay = authorSayWrap.querySelector("div.author-say");
                        if (authorSay) {
                            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__.rm)("a.avatar", false, authorSay);
                            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__.rm)("h4", false, authorSay);
                            const { dom: authorDom, text: authorText, images: authorImages, } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(authorSayWrap, "TM");
                            (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .htmlTrim */ .iA)(authorDom);
                            authorDom.className = "authorSay";
                            const hr = document.createElement("hr");
                            content.appendChild(hr);
                            content.appendChild(authorSay);
                            contentText =
                                contentText + "\n\n" + "-".repeat(10) + "\n\n" + authorText;
                            images.push(...authorImages);
                        }
                    }
                    return {
                        chapterName,
                        contentRaw: content,
                        contentText,
                        contentHTML: content,
                        contentImages: images,
                        additionalMetadate: null,
                    };
                }
            }
            return nullObj;
        }
        return getChapter();
    }
}


/***/ }),

/***/ "./src/rules/special/original/qimao.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Qimao": () => (/* binding */ Qimao)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Qimao extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector("h2.tit").innerText.trim();
        const author = document.querySelector(".p-name > a").innerHTML.trim();
        const introDom = document.querySelector(".book-introduction .article");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".poster-pic > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVIP(),
                isPaid: isPaid(),
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            const isLogin = () => {
                return false;
            };
            if (isVIP() && !(isLogin() && chapter.isPaid)) {
                chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_5__/* .Status.aborted */ .qb.aborted;
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            _log__WEBPACK_IMPORTED_MODULE_3___default().debug(`[Chapter]请求 ${chapterUrl}`);
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
            chapterName = doc.querySelector(".title").innerText.trim();
            const content = doc.querySelector(".article");
            if (content) {
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/qingoo.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Qingoo": () => (/* binding */ Qingoo)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");










class Qingoo extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".title > dl > dd > h1").innerText.trim();
        const author = document.querySelector("#author").innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector("#allDesc");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".title > dl > dt > img:nth-child(1)").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            if (!status) {
                chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_5__/* .Status.aborted */ .qb.aborted;
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        chapterName = doc.querySelector("#content > h1").innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)("div.header", false, content);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)("h1", false, content);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)("h6", false, content);
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_9__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/sfacg.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sfacg": () => (/* binding */ Sfacg)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Attachment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Attachment.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/setting.ts");












class Sfacg extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/MainIndex/", "");
        const bookname = document.querySelector("h1.story-title").innerText.trim();
        const dom = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(bookUrl, undefined);
        const author = dom.querySelector(".author-name").innerText.trim();
        const introDom = dom.querySelector(".introduce");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = dom.querySelector("#hasTicket div.pic img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
        }
        additionalMetadate.tags = Array.from(dom.querySelectorAll("ul.tag-list > li.tag > a")).map((a) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_5__.rm)("span.icn", false, a);
            return a.innerText.trim().replace(/\(\d+\)$/, "");
        });
        if (dom.querySelector(".d-banner")) {
            const _beitouUrl = dom.querySelector(".d-banner")?.style.backgroundImage.split('"');
            if (_beitouUrl?.length === 3) {
                const beitouUrl = _beitouUrl[1];
                const beitou = new _main_Attachment__WEBPACK_IMPORTED_MODULE_6__/* .AttachmentClass */ .J(beitouUrl, `beitou.${beitouUrl.split(".").slice(-1)[0]}`, "TM");
                beitou.init();
                additionalMetadate.attachments = [beitou];
            }
        }
        const chapters = [];
        const sections = document.querySelectorAll(".story-catalog");
        const chapterElems = document.querySelectorAll(".catalog-list a");
        const getName = (sElem) => sElem.querySelector(".catalog-title").innerText
            .replace(`【${bookname}】`, "")
            .trim();
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        let _sectionName = "";
        for (const elem of Array.from(chapterElems)) {
            const chapterName = elem.getAttribute("title")?.trim() ?? "";
            const chapterUrl = elem.href;
            const sectionName = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .getSectionName */ .$d)(elem, sections, getName);
            if (sectionName && _sectionName !== sectionName) {
                _sectionName = sectionName;
                sectionNumber++;
                sectionChapterNumber = 0;
            }
            chapterNumber++;
            sectionChapterNumber++;
            const isVip = () => {
                if (elem.childElementCount !== 0 &&
                    elem.firstElementChild?.getAttribute("class") === "icn_vip") {
                    return true;
                }
                else {
                    return false;
                }
            };
            const isPaid = null;
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_7__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVip(),
                isPaid,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            const isLogin = !document
                .querySelector(".user-bar > .top-link > .normal-link")
                ?.innerHTML.includes("您好，SF游客");
            if (chapter.isVIP && isLogin === false) {
                chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_8__/* .Status.aborted */ .qb.aborted;
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_9__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        book.ToCUrl = document.location.href;
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const chapterId = chapterUrl.split("/").slice(-2, -1)[0];
        async function publicChapter() {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
            chapterName = doc.querySelector("h1.article-title").innerText.trim();
            const content = doc.querySelector(".article-content");
            if (content) {
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(content, "TM");
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
                    _log__WEBPACK_IMPORTED_MODULE_4___default().debug(`[Chapter]请求 ${vipChapterImageUrlI} Referer ${chapterUrl} 重试次数 ${retryTime}`);
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
                            _log__WEBPACK_IMPORTED_MODULE_4___default().error(`[Chapter]请求 ${vipChapterImageUrlI} 失败 Referer ${chapterUrl}`);
                            if (retryTime < _setting__WEBPACK_IMPORTED_MODULE_11__/* .retryLimit */ .o5) {
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
                        .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
                }
                const vipChapterImageBlob = await fetchVipChapterImage(vipChapterImageUrl);
                const vipChapterImage = new _main_Attachment__WEBPACK_IMPORTED_MODULE_6__/* .AttachmentClass */ .J(vipChapterImageUrl, vipChapterName, "naive");
                if (vipChapterImageBlob) {
                    vipChapterImage.imageBlob = vipChapterImageBlob;
                    vipChapterImage.status = _main_main__WEBPACK_IMPORTED_MODULE_8__/* .Status.finished */ .qb.finished;
                }
                else {
                    vipChapterImage.status = _main_main__WEBPACK_IMPORTED_MODULE_8__/* .Status.failed */ .qb.failed;
                }
                return vipChapterImage;
            }
            const isLogin = document.querySelector(".user-bar > .top-link > .normal-link")
                ?.childElementCount === 3
                ? true
                : false;
            if (isLogin) {
                const dom = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
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


/***/ }),

/***/ "./src/rules/special/original/shubl.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shubl": () => (/* binding */ Shubl)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Attachment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/main/Attachment.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/rules.ts");












class Shubl extends _rules__WEBPACK_IMPORTED_MODULE_1__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".book-title > span").innerText.trim();
        const author = document.querySelector("div.username").innerText.trim();
        const introDom = document.querySelector(".book-brief");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom, (introDomI) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_3__/* .rms */ .up)(["简介："], introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book-img")
            .src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_4__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
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
                    const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_6__/* .Chapter */ .W({
                        bookUrl,
                        bookname,
                        chapterUrl,
                        chapterNumber,
                        chapterName,
                        isVIP: isVIP(),
                        isPaid: isPaid(),
                        sectionName,
                        sectionNumber,
                        sectionChapterNumber,
                        chapterParse: this.chapterParse,
                        charset: this.charset,
                        options: {},
                    });
                    if (isVIP() && !(isLogin() && isPaid())) {
                        chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_7__/* .Status.aborted */ .qb.aborted;
                    }
                    chapters.push(chapter);
                }
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_8__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
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
            const output = [];
            output.push(keys[accessKeyList[charsNotLatinNum - 1].charCodeAt(0) % len]);
            output.push(keys[accessKeyList[0].charCodeAt(0) % len]);
            for (let i = 0; i < output.length; i++) {
                message = atob(message);
                const data = output[i];
                const iv = btoa(message.substr(0, 16));
                const keys255 = btoa(message.substr(16));
                const pass = crypto_js__WEBPACK_IMPORTED_MODULE_0__.format.OpenSSL.parse(keys255);
                message = crypto_js__WEBPACK_IMPORTED_MODULE_0__.AES.decrypt(pass, crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Base64.parse(data), {
                    iv: crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Base64.parse(iv),
                    format: crypto_js__WEBPACK_IMPORTED_MODULE_0__.format.OpenSSL,
                });
                if (i < output.length - 1) {
                    message = message.toString(crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Base64);
                    message = atob(message);
                }
            }
            return message.toString(crypto_js__WEBPACK_IMPORTED_MODULE_0__.enc.Utf8);
        }
        const rootPath = "https://www.shubl.com/";
        const chapterId = chapterUrl.split("/").slice(-1)[0];
        async function publicChapter() {
            async function chapterDecrypt(chapterIdt, refererUrl) {
                const accessKeyUrl = rootPath + "chapter/ajax_get_session_code";
                const chapterContentUrl = rootPath + "chapter/get_book_chapter_detail_info";
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${accessKeyUrl} Referer ${refererUrl}`);
                const accessKeyObj = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_9__/* .gfetch */ .GF)(accessKeyUrl, {
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
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                const chapter_access_key = accessKeyObj
                    .chapter_access_key;
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${chapterContentUrl} Referer ${refererUrl}`);
                const chapterContentObj = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_9__/* .gfetch */ .GF)(chapterContentUrl, {
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
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                if (chapterContentObj.code !== 100000) {
                    _log__WEBPACK_IMPORTED_MODULE_5___default().error(chapterContentObj);
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
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_3__.rm)(".chapter span", true, content);
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(content, "TM");
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
            async function vipChapterDecrypt(chapterIdi, refererUrl) {
                const parentWidth = 939.2;
                const setFontSize = "18";
                const imageSessionCodeUrl = rootPath + "chapter/ajax_get_image_session_code";
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${imageSessionCodeUrl} Referer ${refererUrl}`);
                const imageSessionCodeObject = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_9__/* .gfetch */ .GF)(imageSessionCodeUrl, {
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
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                if (imageSessionCodeObject.code !== 100000) {
                    _log__WEBPACK_IMPORTED_MODULE_5___default().error(imageSessionCodeObject);
                    throw new Error(`下载 ${refererUrl} 失败`);
                }
                const imageCode = decrypt({
                    content: imageSessionCodeObject
                        .image_code,
                    keys: imageSessionCodeObject.encryt_keys,
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
            if (isPaid) {
                const vipCHapterImageUrl = await vipChapterDecrypt(chapterId, chapterUrl);
                _log__WEBPACK_IMPORTED_MODULE_5___default().debug(`[Chapter]请求 ${vipCHapterImageUrl} Referer ${chapterUrl}`);
                const vipCHapterImageBlob = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_9__/* .gfetch */ .GF)(vipCHapterImageUrl, {
                    method: "GET",
                    headers: {
                        Referer: chapterUrl,
                        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                    },
                    responseType: "blob",
                })
                    .then((response) => response.response)
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_5___default().error(error));
                const vipCHapterName = `vipCHapter${chapterId}.png`;
                const vipCHapterImage = new _main_Attachment__WEBPACK_IMPORTED_MODULE_11__/* .AttachmentClass */ .J(vipCHapterImageUrl, vipCHapterName, "TM");
                if (vipCHapterImageBlob) {
                    vipCHapterImage.imageBlob = vipCHapterImageBlob;
                    vipCHapterImage.status = _main_main__WEBPACK_IMPORTED_MODULE_7__/* .Status.finished */ .qb.finished;
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


/***/ }),

/***/ "./src/rules/special/original/shuhai.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shuhai": () => (/* binding */ Shuhai)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_misc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/misc.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");











class Shuhai extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book-cover-wrapper > img").getAttribute("data-original");
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
        }
        additionalMetadate.tags = Array.from(document.querySelectorAll(".book-info-bookstate > .tag")).map((span) => span.innerText.trim());
        const chapters = [];
        if (document.querySelectorAll("#catalog > .chapter-item").length === 0) {
            await (0,_lib_misc__WEBPACK_IMPORTED_MODULE_4__/* .sleep */ ._v)(3000);
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: isVIP(),
                    isPaid: isPaid(),
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_8__/* .ggetHtmlDOM */ .Fz)(chapterUrl, charset);
            chapterName = doc.querySelector("div.chapter-name").innerText
                .replace("正文 ", "")
                .trim();
            const content = doc.querySelector("#reader-content > div:nth-child(1)");
            if (content) {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_9__.rm)("div.chaper-info", false, content);
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_10__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/sosadfun.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sosadfun": () => (/* binding */ Sosadfun)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");






class Sosadfun extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
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
            throw new _main_main__WEBPACK_IMPORTED_MODULE_1__/* .ExpectError */ .K2("本小说需要登录后浏览！");
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
            const { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .cleanDOM */ .zM)(introDom, "TM");
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_3__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: false,
                isPaid: false,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_4__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_5__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
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
            let { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .cleanDOM */ .zM)(content, "TM");
            if (_authorSay) {
                const { dom: authorSayDom, text: authorySayText, images: authorSayImages, } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_2__/* .cleanDOM */ .zM)(_authorSay, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/tadu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tadu": () => (/* binding */ Tadu)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");










class Tadu extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("a.bookImg > img").getAttribute("data-src");
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVIP(),
                isPaid: isPaid(),
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            const isLogin = () => {
                return false;
            };
            if (isVIP() && !(isLogin() && chapter.isPaid)) {
                chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_5__/* .Status.aborted */ .qb.aborted;
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            _log__WEBPACK_IMPORTED_MODULE_3___default().debug(`[Chapter]请求 ${chapterUrl}`);
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
            const content = document.createElement("div");
            const _bookPartResourceUrl = doc
                .getElementById("bookPartResourceUrl")
                ?.getAttribute("value");
            if (_bookPartResourceUrl) {
                const bookPartResourceUrl = new URL(_bookPartResourceUrl);
                bookPartResourceUrl.searchParams.set("callback", "callback");
                _log__WEBPACK_IMPORTED_MODULE_3___default().debug(`[Chapter]请求 ${bookPartResourceUrl.toString()}`);
                const jsonpText = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .gfetch */ .GF)(bookPartResourceUrl.toString(), {
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
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
                if (!jsonpText) {
                    throw new Error("jsonp request failed!");
                }
                const getContentObj = new Function(`function callback(obj) { return obj; } return ${jsonpText};`);
                const contentObj = getContentObj();
                if (typeof contentObj === "object") {
                    content.innerHTML = contentObj.content;
                    const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/original/xrzww.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xrzww": () => (/* binding */ Xrzww)
/* harmony export */ });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/cleanDOM.ts");







class Xrzww extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookId = bookUrl.substring(bookUrl.lastIndexOf("/") + 1);
        const apiBase = "https://pre-api.xrzww.com";
        const ossBase = "https://oss.xrzww.com";
        const token = localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "";
        const site = 1;
        const baseHeader = {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
            Site: site.toString(),
        };
        const signIn = token !== "";
        const webNovelDetailUrl = new URL(`${apiBase}/api/webNovelDetail`);
        webNovelDetailUrl.searchParams.set("novel_id", bookId);
        const respW = await fetch(webNovelDetailUrl.href, {
            credentials: "include",
            headers: {
                "Cache-Control": "max-age=0",
                ...baseHeader,
            },
            method: "GET",
            mode: "cors",
        });
        const webNovelDetail = (await respW.json());
        if (webNovelDetail.code !== 200) {
            throw new Error("获取书籍信息出错！");
        }
        const bookname = webNovelDetail.data.novel_name;
        const author = webNovelDetail.data.novel_author;
        const introduction = webNovelDetail.data.novel_info;
        const introductionHTML = document.createElement("div");
        introductionHTML.innerText = introduction;
        const additionalMetadate = {};
        const coverUrl = `${ossBase}${webNovelDetail.data.novel_cover}`;
        (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_1__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
            .then((coverClass) => {
            additionalMetadate.cover = coverClass;
        })
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_2___default().error(error));
        additionalMetadate.tags = webNovelDetail.data.novel_tags
            .split(",")
            .map((t) => t.trim());
        additionalMetadate.tags.push(webNovelDetail.data.type_name);
        additionalMetadate.lastModified = webNovelDetail.data.novel_uptime;
        const directoryListUrl = new URL(`${apiBase}/api/directoryList`);
        directoryListUrl.searchParams.set("nid", bookId);
        directoryListUrl.searchParams.set("orderBy", "0");
        const respD = await fetch(directoryListUrl.href, {
            credentials: "include",
            headers: baseHeader,
            method: "GET",
            mode: "cors",
        });
        const directoryList = (await respD.json());
        if (directoryList.code !== 200) {
            throw new Error("获取目录信息失败！");
        }
        const volumes = directoryList.data.volume.reduce((obj, vol) => {
            obj[vol.volume_id] = {
                name: vol.volume_name,
                order: vol.volume_order,
                desc: vol.volume_desc,
            };
            return obj;
        }, {});
        const chapters = [];
        let i = 0;
        let tSectionName;
        let s = 0;
        let sc = 0;
        for (const c of directoryList.data.data) {
            i++;
            const chapterUrl = "";
            const chapterName = c.chapter_name;
            const chapterNumber = i;
            const isVIP = c.chapter_ispay === 1;
            const isPaid = c.is_subscribe === 1;
            const sectionName = volumes[c.chapter_vid].name;
            if (tSectionName !== sectionName) {
                tSectionName = sectionName;
                s++;
                sc = 0;
            }
            const sectionNumber = s;
            sc++;
            const sectionChapterNumber = sc;
            const options = {
                nid: c.chapter_nid,
                vid: c.chapter_vid,
                chapter_id: c.chapter_id,
                chapter_order: c.chapter_order,
                apiBase,
                headers: baseHeader,
            };
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_3__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options,
            });
            if (signIn) {
                if (chapter.isVIP && chapter.isPaid === false) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_4__/* .Status.aborted */ .qb.aborted;
                }
            }
            else {
                if (chapter.isVIP) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_4__/* .Status.aborted */ .qb.aborted;
                }
            }
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_5__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const readNewUrl = new URL(`${options.apiBase}/api/readNew`);
        readNewUrl.searchParams.set("nid", options.nid.toString());
        readNewUrl.searchParams.set("vid", options.vid.toString());
        readNewUrl.searchParams.set("chapter_id", options.chapter_id.toString());
        readNewUrl.searchParams.set("chapter_order", options.chapter_order.toString());
        readNewUrl.searchParams.set("showpic", false.toString());
        readNewUrl.searchParams.set("is_cut", "");
        const resp = await fetch(readNewUrl.href, {
            credentials: "include",
            headers: options.headers,
            method: "GET",
            mode: "cors",
        });
        const readNew = (await resp.json());
        if (readNew.code !== 200) {
            throw new Error("获取章节内容失败！ " + JSON.stringify(options));
        }
        const contentRaw = document.createElement("p");
        contentRaw.innerText = readNew.data.content;
        const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_6__/* .cleanDOM */ .zM)(contentRaw, "TM");
        return {
            chapterName,
            contentRaw,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: { lastModified: readNew.data.chapter_uptime },
        };
    }
}


/***/ }),

/***/ "./src/rules/special/original/zongheng.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Zongheng": () => (/* binding */ Zongheng)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Zongheng extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/showchapter/", "/book/");
        const bookname = document.querySelector("div.book-meta > h1").innerText.trim();
        const author = document.querySelector("div.book-meta > p > span:nth-child(1) > a").innerText.trim();
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(bookUrl, undefined);
        const introDom = doc.querySelector("div.book-info > div.book-dec");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector("div.book-img > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: isVIP(),
                    isPaid: isPaid(),
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                const isLogin = () => {
                    return false;
                };
                if (isVIP() && !(isLogin() && chapter.isPaid)) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function publicChapter() {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .ggetHtmlDOM */ .Fz)(chapterUrl, charset);
            const ChapterName = doc.querySelector("div.title_txtbox").innerText.trim();
            const content = doc.querySelector("div.content");
            if (content) {
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/dmzj.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dmzj": () => (/* binding */ Dmzj)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/dom.ts");









class Dmzj extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.streamZip = true;
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverDom = isWwwHost
            ? document.querySelector(".comic_i_img > a > img")
            : document.querySelector("#cover_pic");
        const coverUrl = coverDom.src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_5__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        function getpicUrlList(docI) {
            const imgPrefix = "https://images.dmzj.com/";
            const scriptElement = Array.from(docI.querySelectorAll("head > script")).filter((s) => s.innerHTML.includes("eval("))[0];
            let pages = (0,_lib_dom__WEBPACK_IMPORTED_MODULE_6__/* .sandboxed */ .J0)(scriptElement.innerText + ";return pages;");
            pages = pages.replace(/\n/g, "");
            pages = pages.replace(/\r/g, "|");
            const info = (0,_lib_dom__WEBPACK_IMPORTED_MODULE_6__/* .sandboxed */ .J0)("return (" + pages + ")");
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
        _log__WEBPACK_IMPORTED_MODULE_3___default().debug(`[Chapter]请求 ${chapterUrl}`);
        const isWwwHost = document.location.host === "www.dmzj.com";
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
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
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/fushuwang.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fushuwang": () => (/* binding */ Fushuwang)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");






class Fushuwang extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    saveOptions;
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_1__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber: i + 1,
                chapterName,
                isVIP,
                isPaid,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_2__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        book.saveOptions = this.saveOptions;
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_3__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        const content = doc.querySelector("#text");
        if (content) {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_4__.rm)("span", true, content);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_4__.rm)("p.pageLink", true, content);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_4__.rm)("script", true, content);
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_5__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/hetushu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hetushu": () => (/* binding */ Hetushu)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Hetushu extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".book_info > h2").innerText.trim();
        const author = document.querySelector(".book_info > div:nth-child(3) > a:nth-child(1)").innerText.trim();
        const introDom = document.querySelector(".intro");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book_info > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
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
                    const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                        bookUrl,
                        bookname,
                        chapterUrl,
                        chapterNumber,
                        chapterName,
                        isVIP,
                        isPaid,
                        sectionName,
                        sectionNumber,
                        sectionChapterNumber,
                        chapterParse: this.chapterParse,
                        charset: this.charset,
                        options: {},
                    });
                    chapters.push(chapter);
                }
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_5__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        async function sorfPage() {
            let path;
            let bid;
            let sid;
            if (/\/(book[0-9]?)\/([0-9]+)\/([0-9]+)\.html(\?position=([0-9]+))?$/.test(chapterUrl)) {
                path = RegExp.$1;
                bid = RegExp.$2;
                sid = RegExp.$3;
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
            _log__WEBPACK_IMPORTED_MODULE_3___default().debug(`[Chapter]请求 ${url} Referer ${chapterUrl}`);
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
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
            if (token) {
                const tokenDict = atob(token)
                    .split(/[A-Z]+%/)
                    .map((v) => parseInt(v));
                const thisBody = doc.querySelector("#content");
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_6__.rm)(".mask.mask2", false, thisBody);
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
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        chapterName = doc.querySelector("#content .h2").innerText.trim();
        await sorfPage();
        const content = doc.querySelector("#content");
        if (content) {
            const tagRemoved = "h2, acronym, bdo, big, cite, code, dfn, kbd, q, s, samp, strike, tt, u, var";
            tagRemoved.split(", ").forEach((s) => {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_6__.rm)(s, true, content);
            });
            Array.from(content.querySelectorAll("div")).map((oldNode) => {
                const newNode = document.createElement("p");
                newNode.innerHTML = oldNode.innerHTML;
                oldNode.parentNode?.replaceChild(newNode, oldNode);
            });
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/idejian.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Idejian": () => (/* binding */ Idejian)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Idejian extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book_img > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_2__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_3___default().error(error));
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
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_4__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName: null,
                sectionNumber: null,
                sectionChapterNumber: null,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: { bookID },
            });
            chapters.push(chapter);
        }
        document.cookie = "";
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_5__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
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
            await (0,_lib_http__WEBPACK_IMPORTED_MODULE_6__/* .ggetText */ ._7)(referUrl, charset, { headers: { "User-Agent": fakeUA } });
            await (0,_lib_http__WEBPACK_IMPORTED_MODULE_6__/* .ggetText */ ._7)(chapterUrl, charset, {
                headers: { "User-Agent": fakeUA, Referer: referUrl },
            });
        }
        _log__WEBPACK_IMPORTED_MODULE_3___default().debug(`[Chapter]请求 ${chapterUrl}，Refer：${referUrl}`);
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_6__/* .ggetHtmlDOM */ .Fz)(chapterUrl, charset, {
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
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_7__.rm)("h1", false, content);
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/kanunu8.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kanunu8": () => (/* binding */ Kanunu8)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_readability__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/readability.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Kanunu8 extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.title.split(" ")[0];
        const _authorAList = Array.from(document.querySelectorAll("a")).filter((a) => (a.href.includes("writer") || a.href.includes("/zj/")) &&
            a.href.includes(".html"));
        const authorElem = _authorAList
            .map((a) => [a, a.getBoundingClientRect().top])
            .sort(softByValue)?.[0][0];
        const author = authorElem?.innerText
            .replace("作品集", "")
            .replace("→", "")
            .trim() ?? "";
        const introDom = Array.from(document.body.querySelectorAll("td, p"))
            .filter((elem) => elem.innerText.length !== 0)
            .map((elem) => [elem, (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .getNodeTextLength */ .MK)(elem)])
            .sort(softByValue)
            .slice(-1)?.[0][0];
        let introduction = null, introductionHTML = null;
        if (introDom) {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("a", true, introDom);
            [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        }
        let aList = null;
        let sections = null;
        let getName = null;
        function aListFilter(a) {
            const filters = ["writer", "/zj/", "index.html"];
            for (const f of filters) {
                if (a.href.includes(f)) {
                    return false;
                }
            }
            return true;
        }
        if (document.querySelector("div.book")) {
            aList = Array.from(document.querySelectorAll("div.book a")).filter(aListFilter);
            sections = document.querySelectorAll("div.book dl > dt, div.book td > strong");
            getName = (sElem) => sElem.innerText;
        }
        else {
            const tables = document.querySelectorAll("table");
            const _table = Array.from(tables)
                .map((tb) => [tb, (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .getMaxDepth */ .wd)(tb)])
                .filter((ds) => ds[1] === 4)
                .filter((ds) => (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .centerDetct */ .$4)(ds[0])[0])
                .map((ds) => [
                ds[0],
                Array.from(ds[0].querySelectorAll("a")).filter(aListFilter)
                    .length,
            ])
                .sort(softByValue);
            if (_table.length !== 0) {
                const table = _table.slice(-1)[0][0];
                aList = table.querySelectorAll("a");
                sections = table.querySelectorAll('td[align="center"]');
                getName = (sElem) => sElem.innerText;
            }
        }
        const additionalMetadate = {};
        const _cover = Array.from(document.querySelectorAll("img")).filter((img) => new URL(img.src).host === document.location.host);
        if (_cover.length === 1) {
            const coverUrl = _cover[0].src;
            if (coverUrl) {
                (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
            }
        }
        const chapters = [];
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        let sectionName = "";
        if (!aList) {
            throw Error("[BookParse]获取章节信息失败！");
        }
        for (const elem of Array.from(aList)) {
            const chapterName = elem.innerText.trim();
            const chapterUrl = elem.href;
            if (sections && getName) {
                const _sectionName = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .getSectionName */ .$d)(elem, sections, getName);
                if (_sectionName && sectionName !== _sectionName) {
                    sectionName = _sectionName;
                    sectionNumber++;
                    sectionChapterNumber = 0;
                }
                chapterNumber++;
                sectionChapterNumber++;
            }
            const isVIP = false;
            const isPaid = false;
            const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP,
                isPaid,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
            });
            chapters.push(chapter);
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const obj = await (0,_lib_readability__WEBPACK_IMPORTED_MODULE_7__.fetchAndParse)(chapterUrl, this.charset);
        if (obj) {
            const content = obj.content;
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("a", true, content);
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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
function softByValue(a, b) {
    return a[1] - b[1];
}


/***/ }),

/***/ "./src/rules/special/reprint/linovelib.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Linovelib": () => (/* binding */ Linovelib)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Linovelib extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href.replace(/\/catalog$/, ".html");
        const bookname = document.querySelector(".book-meta > h1").innerText.trim();
        const author = document.querySelector(".book-meta > p:nth-child(2) > span:nth-child(1) > a:nth-child(2)").innerText.trim();
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(bookUrl, undefined);
        const introDom = doc.querySelector(".book-dec > p:nth-child(1)");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector(".book-img > img")
            .src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
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
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: false,
                    isPaid: false,
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                if (chapterUrl.startsWith("javascript")) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
                }
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        book.ToCUrl = document.location.href;
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        return (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .nextPageParse */ .I2)({
            chapterName,
            chapterUrl,
            charset,
            selector: "#TextContent",
            contentPatch: (_content, doc) => {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)(".tp", true, _content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_8__.rm)(".bd", true, _content);
                return _content;
            },
            getNextPage: (doc) => doc.querySelector(".mlfy_page > a:nth-child(5)")
                .href,
            continueCondition: (_content, nextLink) => new URL(nextLink).pathname.includes("_"),
        });
    }
}


/***/ }),

/***/ "./src/rules/special/reprint/soxscc.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Soxscc": () => (/* binding */ Soxscc)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Soxscc extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = document.querySelector(".xiaoshuo > h1").innerText.trim();
        const author = document.querySelector(".xiaoshuo > h6:nth-child(3) > a").innerText.trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom, (introDomI) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("span.tags", false, introDomI);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("q", true, introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".book_cover > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName,
                    sectionNumber: i + 1,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: { bookname },
                });
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        const bookname = options.bookname;
        chapterName = doc.querySelector(".read_title > h1").innerText.trim();
        const content = doc.querySelector("div.content[id]");
        if (content) {
            const ad = `您可以在百度里搜索“${bookname} .+(${document.location.hostname})”查找最新章节！`;
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rms */ .up)([ad], content);
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
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/uukanshu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uukanshu": () => (/* binding */ Uukanshu)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Uukanshu extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .introDomHandle */ .SN)(introDom, (introDomI) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rms */ .up)([
                /^.+简介：\s+www\.uukanshu\.com\s+/,
                /\s+https:\/\/www\.uukanshu\.com/,
                /－+/,
            ], introDomI);
            return introDomI;
        });
        const additionalMetadate = {};
        const coverUrl = document.querySelector("a.bookImg > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
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
                    const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                        bookUrl,
                        bookname,
                        chapterUrl,
                        chapterNumber,
                        chapterName,
                        isVIP,
                        isPaid,
                        sectionName,
                        sectionNumber,
                        sectionChapterNumber,
                        chapterParse: this.chapterParse,
                        charset: this.charset,
                        options: {},
                    });
                    chapters.push(chapter);
                }
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        chapterName = doc.querySelector("#timu").innerText.trim();
        const content = doc.querySelector("#contentbox");
        if (content) {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)(".ad_content", true, content);
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
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__/* .rms */ .up)(contentReplace, content);
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/wenku8.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wenku8": () => (/* binding */ Wenku8)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");









class Wenku8 extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookId = document.location.pathname.split("/").slice(-2, -1)[0];
        const bookUrl = [document.location.origin, "book", `${bookId}.htm`].join("/");
        const bookname = document.querySelector("#title").innerText.trim();
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(bookUrl, "GBK");
        const author = doc.querySelector("#content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)").innerText
            .replace("小说作者：", "")
            .trim();
        const introDom = doc.querySelector("#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(11)");
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = doc.querySelector("#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > img:nth-child(1)").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP: false,
                    isPaid: false,
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
        book.ToCUrl = document.location.href;
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        const content = doc.querySelector("#content");
        if (content) {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_7__.rm)("#contentdp", true, content);
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM");
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


/***/ }),

/***/ "./src/rules/special/reprint/xkzw.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Xkzw": () => (/* binding */ Xkzw)
/* harmony export */ });
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("crypto-js");
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/rules.ts");









class Xkzw extends _rules__WEBPACK_IMPORTED_MODULE_1__/* .BaseRuleClass */ .c {
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
        const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img").src;
        if (coverUrl) {
            (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
        }
        const chapters = [];
        const bookid = unsafeWindow.bookId;
        const apiUrl = [document.location.origin, "action.php"].join("/");
        _log__WEBPACK_IMPORTED_MODULE_4___default().debug(`[chapter]正在请求${apiUrl}`);
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
            .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
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
                                chapterid: parseInt(chapterid) - bookid * 11,
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
                const chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName,
                    sectionNumber,
                    sectionChapterNumber,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                });
                chapters.push(chapter);
            }
        }
        const book = new _main_Book__WEBPACK_IMPORTED_MODULE_6__/* .Book */ .f({
            bookUrl,
            bookname,
            author,
            introduction,
            introductionHTML,
            additionalMetadate,
            chapters,
        });
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
        const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_7__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
        runEval(crypto_js__WEBPACK_IMPORTED_MODULE_0__);
        chapterName = doc.querySelector(".bookname > h1:nth-child(1)").innerText.trim();
        const contentG = doc.querySelector("#content");
        if (contentG) {
            const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(contentG, "TM");
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


/***/ }),

/***/ "./src/rules/twoPage/18kanshu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c18kanshu": () => (/* binding */ c18kanshu)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");


const c18kanshu = () => (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    anotherPageUrl: document.querySelector("div.menu_more_black > a").href,
    getBookname: (doc) => document.querySelector(".in_textone").innerText.trim(),
    getAuthor: (doc) => {
        const authorElem = document.querySelector("div.in_texttwo:nth-child(2)");
        const author = /作者：(.+)$/.exec(authorElem.innerText.trim())?.[1] ?? "";
        return author;
    },
    getIntroDom: (doc) => document.querySelector(".janjie"),
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) => document.querySelector(".book_top > div.img > img")
        .src,
    getAList: (doc) => {
        const _aList = doc.querySelectorAll("div.list_main.book_list");
        const reducer = (out, div) => {
            const onclick = div.getAttribute("onclick");
            const href = onclick?.substring(onclick.indexOf("'") + 1, onclick.lastIndexOf("'")) ?? "";
            const a = document.createElement("a");
            a.href = href;
            a.innerHTML = div.innerHTML.trim();
            out.push(a);
            return out;
        };
        const aList = Array.from(_aList).reduce(reducer, []);
        return aList;
    },
    getContent: (doc) => doc.querySelector(".readcontent"),
    contentPatch: (dom) => {
        Array.from(dom.childNodes)
            .filter((node) => node instanceof Text)
            .forEach((text) => {
            if (text.textContent?.includes("　　")) {
                text.parentNode?.insertBefore(document.createElement("br"), text);
            }
        });
        if ((0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_1__/* .isFixWidth */ .Kg)(dom)) {
            (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_1__/* .convertFixWidth */ .FZ)(dom);
        }
        return dom;
    },
    nsfw: true,
});


/***/ }),

/***/ "./src/rules/twoPage/1pwx.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xiaoshuodaquan": () => (/* binding */ xiaoshuodaquan)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");


const xiaoshuodaquan = () => (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    anotherPageUrl: document.querySelector(".viewalllinks").href,
    getBookname: (doc) => document.querySelector(".r420 > h1").innerText.trim(),
    getAuthor: (doc) => document.querySelector(".author a").innerText.trim(),
    getIntroDom: (doc) => doc.querySelector(".bookintro"),
    introDomPatch: (introDom) => introDom,
    getCoverUrl: (doc) => document.querySelector(".con_limg > img")?.src,
    getAList: (doc) => doc.querySelectorAll("div.clearfix li > a"),
    getSections: (doc) => doc.querySelectorAll("div.dirtitone > h2"),
    getSName: (sElem) => sElem.innerText.trim(),
    postHook: (chapter) => {
        chapter.sectionName =
            chapter.sectionName?.replace(chapter.bookname, "").trim() ?? null;
        return chapter;
    },
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div", true, content);
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("script", true, content);
        const c = document.createElement("div");
        c.innerHTML = content.innerHTML.replace(/\n/g, "<br/><br/>");
        return c;
    },
});


/***/ }),

/***/ "./src/rules/twoPage/imiaobige.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "imiaobige": () => (/* binding */ imiaobige)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");


const imiaobige = () => {
    const bookUrl = document.location.href
        .replace("/read/", "/novel/")
        .replace(/\/$/, ".html");
    const getName = (sElem) => sElem.firstElementChild?.innerText
        .split(" ")
        .slice(-1)?.[0] ?? "";
    return (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl,
        anotherPageUrl: bookUrl,
        getBookname: (doc) => doc.querySelector(".booktitle > h1").innerText.trim(),
        getAuthor: (doc) => doc.querySelector("#author > a").innerText.trim(),
        getIntroDom: (doc) => doc.querySelector("#bookintro"),
        introDomPatch: (introDom) => introDom,
        getCoverUrl: (doc) => doc.querySelector("#bookimg > img").src,
        getSections: (doc) => document.querySelectorAll("#readerlists > ul"),
        getAList: (doc) => document.querySelectorAll("#readerlists  a"),
        getSName: getName,
        postHook: (chapter) => {
            if (chapter.sectionName?.includes("最新章节")) {
                return;
            }
            chapter.sectionName =
                chapter.sectionName?.replace(chapter.bookname, "").trim() ?? null;
            return chapter;
        },
        getContent: (doc) => doc.querySelector("#content"),
        contentPatch: (content) => {
            const ads = ["您可以在百度里搜索“"];
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ads);
            return content;
        },
    });
};


/***/ }),

/***/ "./src/rules/twoPage/jingcaiyuedu6.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jingcaiyuedu6": () => (/* binding */ jingcaiyuedu6)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");


const jingcaiyuedu6 = () => (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    anotherPageUrl: document.querySelector("a.red-btn:nth-child(3)").href,
    getBookname: (doc) => document.querySelector(".book-info > h1 > em").innerText.trim(),
    getAuthor: (doc) => document.querySelector(".book-info > h1 > a").innerText.trim(),
    getIntroDom: (doc) => document.querySelector(".book-info > p.intro"),
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) => document.querySelector(".book-img-cover").src,
    getAList: (doc) => doc.querySelectorAll("dd.col-md-4 > a"),
    getContent: (doc) => doc.querySelector("#htmlContent"),
    contentPatch: (dom) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(dom, ["精彩小说网最新地址"]);
        return dom;
    },
});


/***/ }),

/***/ "./src/rules/twoPage/liuxs.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "liuxs": () => (/* binding */ liuxs)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");


const liuxs = () => (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    anotherPageUrl: document.querySelector(".btopt > a")
        .href,
    getBookname: (doc) => doc.querySelector("div.infot:nth-child(1) > h1:nth-child(1)").innerText.trim(),
    getAuthor: (doc) => doc.querySelector("div.infot:nth-child(1) > span:nth-child(2)").innerText
        .replace("作者：", "")
        .trim(),
    getIntroDom: (doc) => document.querySelector(".intro"),
    introDomPatch: (dom) => dom,
    getCoverUrl: (doc) => document.querySelector(".pic > img").src,
    getAList: (doc) => doc.querySelectorAll("#defaulthtml4 > table > tbody  div > a"),
    getSections: (doc) => doc.querySelectorAll(".j_title > b"),
    getSName: (dom) => dom.innerText.trim(),
    postHook: (chapter) => {
        const bookname = chapter.bookname;
        if (chapter.sectionName) {
            chapter.sectionName = chapter.sectionName.replace(`《${bookname}》`, "");
        }
        return chapter;
    },
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (dom) => {
        (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(dom, ["--＆网--网"]);
        return dom;
    },
});


/***/ }),

/***/ "./src/rules/twoPage/shencou.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shencou": () => (/* binding */ shencou)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/main/main.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");



const shencou = () => {
    const anotherPageUrl = document.querySelector("#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)").href;
    return (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl: document.location.href,
        anotherPageUrl,
        getBookname: (doc) => document.querySelector("#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > span:nth-child(1) > a:nth-child(1)").innerText.trim(),
        getAuthor: (doc) => document.querySelector("#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)").innerText
            .replace("小说作者：", "")
            .trim(),
        getIntroDom: (doc) => document.querySelector("#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)"),
        introDomPatch: (el) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("a", true, el);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)(".hottext", true, el);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(el, ["论坛回帖，推荐本书，都可以得积分。每天送50积分"]);
            return el;
        },
        getCoverUrl: (doc) => document.querySelector("#content > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1) > img:nth-child(1)")?.src,
        getAList: (doc) => doc.querySelectorAll("div.zjbox ol > li > a"),
        getSections: (doc) => doc.querySelectorAll("div.zjbox div.ttname > h2"),
        getSName: (s) => s.innerText.trim(),
        getContent: (doc) => {
            doc.body.innerHTML = doc.body.innerHTML.replace('<script language="javascript">GetFont();</script>', '<div id="content" class="fonts_mesne">');
            doc.body.innerHTML = doc.body.innerHTML.replace("<center>", "</div>");
            return doc.querySelector("#content");
        },
        contentPatch: (dom) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("h1", true, dom);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[id^=BookSee]", true, dom);
            return dom;
        },
        cleanDomOptions: {
            referrerMode: _main_main__WEBPACK_IMPORTED_MODULE_2__/* .ReferrerMode.custom */ .n6.custom,
            customReferer: "http://www.wenku8.net",
        },
    });
};


/***/ }),

/***/ "./src/rules/twoPage/tempate.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ mkRuleClass)
/* harmony export */ });
/* harmony import */ var _lib_attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/attachments.ts");
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/http.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("loglevel");
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_log__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _main_Chapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/main/Chapter.ts");
/* harmony import */ var _main_Book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/main/Book.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/main/main.ts");









function mkRuleClass({ bookUrl, anotherPageUrl, ToCUrl, getBookname, getAuthor, getIntroDom, introDomPatch, getCoverUrl, getAList, getAName, getIsVIP, getSections, getSName, postHook, getContentFromUrl, getContent, contentPatch, concurrencyLimit, needLogin, nsfw, cleanDomOptions, overrideConstructor, }) {
    return class extends _rules__WEBPACK_IMPORTED_MODULE_0__/* .BaseRuleClass */ .c {
        constructor() {
            super();
            this.imageMode = "TM";
            if (concurrencyLimit) {
                this.concurrencyLimit = concurrencyLimit;
            }
            if (needLogin) {
                this.needLogin = needLogin;
            }
            if (nsfw) {
                this.nsfw = nsfw;
            }
            if (overrideConstructor) {
                overrideConstructor(this);
            }
        }
        async bookParse() {
            const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(anotherPageUrl, this.charset);
            const bookname = getBookname(doc);
            const author = getAuthor(doc);
            const introDom = getIntroDom(doc);
            const [introduction, introductionHTML] = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .introDomHandle */ .SN)(introDom, introDomPatch);
            const coverUrl = getCoverUrl(doc);
            const additionalMetadate = {};
            if (coverUrl) {
                (0,_lib_attachments__WEBPACK_IMPORTED_MODULE_3__/* .getImageAttachment */ .CE)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => _log__WEBPACK_IMPORTED_MODULE_4___default().error(error));
            }
            let sections;
            if (typeof getSections === "function") {
                sections = getSections(doc);
            }
            const chapters = [];
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionChapterNumber = 0;
            let sectionName = null;
            let hasSection = false;
            if (sections &&
                sections instanceof NodeList &&
                typeof getSName === "function") {
                hasSection = true;
            }
            const aList = getAList(doc);
            for (const aElem of Array.from(aList)) {
                let chapterName;
                if (getAName) {
                    chapterName = getAName(aElem);
                }
                else {
                    chapterName = aElem.innerText;
                }
                const chapterUrl = aElem.href;
                if (hasSection && sections && getSName) {
                    const _sectionName = (0,_lib_rule__WEBPACK_IMPORTED_MODULE_2__/* .getSectionName */ .$d)(aElem, sections, getSName);
                    if (_sectionName !== sectionName) {
                        sectionName = _sectionName;
                        sectionNumber++;
                        sectionChapterNumber = 0;
                    }
                }
                chapterNumber++;
                sectionChapterNumber++;
                let isVIP = false;
                let isPaid = false;
                if (getIsVIP) {
                    ({ isVIP, isPaid } = getIsVIP(aElem));
                }
                let chapter = new _main_Chapter__WEBPACK_IMPORTED_MODULE_5__/* .Chapter */ .W({
                    bookUrl,
                    bookname,
                    chapterUrl,
                    chapterNumber,
                    chapterName,
                    isVIP,
                    isPaid,
                    sectionName,
                    sectionNumber: hasSection ? sectionNumber : null,
                    sectionChapterNumber: hasSection ? sectionChapterNumber : null,
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: { bookname },
                });
                if (isVIP === true && isPaid === false) {
                    chapter.status = _main_main__WEBPACK_IMPORTED_MODULE_6__/* .Status.aborted */ .qb.aborted;
                }
                if (typeof postHook === "function") {
                    chapter = postHook(chapter);
                }
                if (chapter) {
                    chapters.push(chapter);
                }
            }
            const book = new _main_Book__WEBPACK_IMPORTED_MODULE_7__/* .Book */ .f({
                bookUrl,
                bookname,
                author,
                introduction,
                introductionHTML,
                additionalMetadate,
                chapters,
            });
            if (ToCUrl) {
                book.ToCUrl = ToCUrl;
            }
            else if (bookUrl !== anotherPageUrl) {
                book.ToCUrl = anotherPageUrl;
            }
            return book;
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            let content;
            if (getContentFromUrl !== undefined) {
                content = await getContentFromUrl(chapterUrl, chapterName, charset);
            }
            else if (getContent !== undefined) {
                const doc = await (0,_lib_http__WEBPACK_IMPORTED_MODULE_1__/* .getHtmlDOM */ .dL)(chapterUrl, charset);
                content = getContent(doc);
            }
            if (content) {
                content = contentPatch(content);
                const { dom, text, images } = await (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_8__/* .cleanDOM */ .zM)(content, "TM", cleanDomOptions);
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


/***/ }),

/***/ "./src/rules/twoPage/ujxs.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ujxs": () => (/* binding */ ujxs)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");


const ujxs = () => {
    const bookUrl = document.location.origin +
        document.location.pathname.replace(/^\/read/, "/book");
    return (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl,
        anotherPageUrl: bookUrl,
        getBookname: (doc) => document.querySelector("#smallcons > h1").innerText.trim(),
        getAuthor: (doc) => document.querySelector("#smallcons > span:nth-child(3) > a").innerText.trim(),
        getIntroDom: (doc) => doc.querySelector("#bookintro"),
        introDomPatch: (introDom) => introDom,
        getCoverUrl: (doc) => doc.querySelector(".img > img")?.src,
        getAList: (doc) => document.querySelectorAll("#readerlist  li > a"),
        getSections: (doc) => document.querySelectorAll("#readerlist  li.fj > h3"),
        getSName: (sElem) => sElem.innerText,
        postHook: (chapter) => {
            chapter.sectionName =
                chapter.sectionName?.replace(chapter.bookname, "") ?? null;
            return chapter;
        },
        getContent: (doc) => doc.querySelector(".read-content"),
        contentPatch: (content) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("script", true, content);
            const ads = ["免费小说无弹窗免费阅读！", "全集TXT电子书免费下载！"];
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rm2 */ .vS)(content, ads);
            return content;
        },
    });
};


/***/ }),

/***/ "./src/rules/twoPage/viviyzw.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "viviyzw": () => (/* binding */ viviyzw)
/* harmony export */ });
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");

const viviyzw = () => {
    const bookUrl = document.location.href.replace("/book", "/info");
    return (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl,
        anotherPageUrl: bookUrl,
        getBookname: (doc) => doc.querySelector("article.info > header > h1").innerText.trim(),
        getAuthor: (doc) => doc.querySelector("article.info > p.detail.pt20 > i:nth-child(1) > a").innerText.trim(),
        getIntroDom: (doc) => doc.querySelector("article.info > p.desc"),
        introDomPatch: (content) => content,
        getCoverUrl: (doc) => doc.querySelector("article.info > div.cover > img")
            .src,
        getAList: (doc) => document.querySelectorAll("ul.mulu > li.col3 > a"),
        getSections: (doc) => document.querySelectorAll("li.col1.volumn"),
        getSName: (sElem) => sElem.innerText,
        postHook: (chapter) => {
            if (chapter.sectionName?.includes("最新九章")) {
                return;
            }
            return chapter;
        },
        getContent: (doc) => doc.querySelector("#content"),
        contentPatch: (content) => content,
    });
};


/***/ }),

/***/ "./src/rules/twoPage/washuge.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "washuge": () => (/* binding */ washuge)
/* harmony export */ });
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");

const washuge = () => {
    const bookUrl = document.location.href;
    const bookId = /(\d+)\/?$/.exec(bookUrl)?.[1];
    if (!bookId) {
        throw Error("获取书籍信息出错！");
    }
    const anotherPageUrl = `${document.location.origin}/books/book${bookId}.html`;
    return (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl,
        anotherPageUrl,
        getBookname: (doc) => doc.querySelector("#content > dd > h1")?.innerText
            .replace("全文阅读", "")
            .trim(),
        getAuthor: (doc) => doc.querySelector("#at > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)")?.innerText.trim(),
        getIntroDom: (doc) => doc.querySelector("#content > dd:nth-child(7) > p:nth-child(3)"),
        introDomPatch: (dom) => dom,
        getCoverUrl: (doc) => doc.querySelector(".hst > img").src,
        getAList: (doc) => document.querySelectorAll("#at > tbody td > a"),
        getContent: (doc) => doc.querySelector("#contents"),
        contentPatch: (dom) => dom,
        concurrencyLimit: 1,
    });
};


/***/ }),

/***/ "./src/rules/twoPage/xiaoshuowu.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xiaoshuowu": () => (/* binding */ xiaoshuowu)
/* harmony export */ });
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");


const xiaoshuowu = () => {
    const href = document.location.href;
    const bookId = href.substring(href.lastIndexOf("/", href.lastIndexOf("/") - 1) + 1, href.lastIndexOf("/"));
    const bookUrl = document.location.origin + `/book/${bookId}/`;
    return (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
        bookUrl,
        ToCUrl: document.location.href,
        anotherPageUrl: bookUrl,
        getBookname: (doc) => doc.querySelector("div.divbox:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)").innerText.trim(),
        getAuthor: (doc) => doc.querySelector("div.divbox:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > a").innerText.trim(),
        getIntroDom: (doc) => doc.querySelector("div.tabvalue:nth-child(1) > div:nth-child(1)"),
        introDomPatch: (dom) => dom,
        getCoverUrl: (doc) => doc.querySelector("div.divbox:nth-child(2) > div:nth-child(1) > a:nth-child(1) > img").src,
        getAList: (doc) => document.querySelectorAll("li.chapter > a"),
        getSections: (doc) => document.querySelectorAll(".volume"),
        getSName: (sElem) => sElem.innerText.trim(),
        postHook: (chapter) => {
            if (chapter.sectionName) {
                chapter.sectionName = chapter.sectionName.replace(chapter.bookname, "");
            }
            return chapter;
        },
        getContent: (doc) => doc.querySelector("#acontent"),
        contentPatch: (content) => {
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("div[align]", true, content);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)(".tishi", true, content);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__.rm)("h1", false, content);
            (0,_lib_dom__WEBPACK_IMPORTED_MODULE_1__/* .rms */ .up)(["(小说屋 www.xiaoshuowu.com)", "小说屋 www.xiaoshuowu.com"], content);
            return content;
        },
        concurrencyLimit: 1,
    });
};


/***/ }),

/***/ "./src/rules/twoPage/yibige.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "yibige": () => (/* binding */ yibige)
/* harmony export */ });
/* harmony import */ var _lib_cleanDOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/lib/cleanDOM.ts");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/lib/dom.ts");
/* harmony import */ var _lib_rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/lib/rule.ts");
/* harmony import */ var _tempate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/rules/twoPage/tempate.ts");




const yibige = () => (0,_tempate__WEBPACK_IMPORTED_MODULE_0__/* .mkRuleClass */ .x)({
    bookUrl: document.location.href,
    anotherPageUrl: document.location.href + "index.html",
    getBookname: (doc) => document.querySelector("#info h1:nth-of-type(1)").innerText.trim(),
    getAuthor: (doc) => document.querySelector("#info > p:nth-child(2)").innerText
        .replace(/作(\s+)?者[：:]/, "")
        .trim(),
    getIntroDom: (doc) => document.querySelector("#intro > p:nth-child(1)"),
    introDomPatch: (introDom) => introDom,
    getCoverUrl: (doc) => document.querySelector("#fmimg > img")?.src ?? "",
    getAList: (doc) => doc.querySelectorAll("#list dd > a"),
    getContent: (doc) => doc.querySelector("#content"),
    getContentFromUrl: async (chapterUrl, chapterName, charset) => {
        const { contentRaw } = await (0,_lib_rule__WEBPACK_IMPORTED_MODULE_1__/* .nextPageParse */ .I2)({
            chapterName,
            chapterUrl,
            charset,
            selector: "#content",
            contentPatch: (content, doc) => {
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("script", true, content);
                (0,_lib_dom__WEBPACK_IMPORTED_MODULE_2__.rm)("div[style]", true, content);
                (0,_lib_cleanDOM__WEBPACK_IMPORTED_MODULE_3__/* .htmlTrim */ .iA)(content);
                return content;
            },
            getNextPage: (doc) => doc.querySelector(".bottem1 > a:nth-child(4)")
                .href,
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


/***/ }),

/***/ "./src/save/misc.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ getSectionsObj)
/* harmony export */ });
function getSectionsObj(chapters, chapterSort = (a, b) => a.chapterNumber - b.chapterNumber) {
    const _sectionsObj = {};
    for (const chapter of chapters) {
        let sectionNumber = null;
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
    const sectionsListObj = Object.values(_sectionsObj);
    sectionsListObj.sort(sectionListSort);
    sectionsListObj.forEach((s) => s.chpaters.sort(chapterSort));
    return sectionsListObj;
    function sectionListSort(a, b) {
        const aChapter = a.chpaters[0];
        const bChapter = b.chpaters[0];
        return chapterSort(aChapter, bChapter);
    }
}


/***/ }),

/***/ "./src/setting.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o5": () => (/* binding */ retryLimit),
/* harmony export */   "Cy": () => (/* binding */ enableDebug),
/* harmony export */   "Vo": () => (/* binding */ enableCustomFinishCallback),
/* harmony export */   "Td": () => (/* binding */ enableCustomChapterFilter),
/* harmony export */   "EI": () => (/* binding */ enableCustomSaveOptions),
/* harmony export */   "Z3": () => (/* binding */ enableJjwxcRemoteFont),
/* harmony export */   "CA": () => (/* binding */ enableSaveToArchiveOrg),
/* harmony export */   "cl": () => (/* binding */ iconStart0),
/* harmony export */   "wE": () => (/* binding */ iconStart1),
/* harmony export */   "d7": () => (/* binding */ iconSetting),
/* harmony export */   "y6": () => (/* binding */ iconJump),
/* harmony export */   "Qd": () => (/* binding */ getCustomEnableSaveToArchiveOrg)
/* harmony export */ });
/* harmony import */ var _lib_GM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/lib/GM.ts");

const retryLimit = 5;
const enableDebug = {
    value: false,
};
const enableCustomFinishCallback = true;
const enableCustomChapterFilter = true;
const enableCustomSaveOptions = true;
const enableJjwxcRemoteFont = true;
const enableSaveToArchiveOrg = true;
const iconStart0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFYElEQVR4nO2dIUxkORyHP4XD4E6RYNZgUGvWonAnVqxDbbJiNWLNOsQ65Oo1CMQIFAnJJiQIcgY7YhIEbgTJiEkm4USPuyNh3pv2tf33tb9f8kl4fe3H0Pm37xXi50/gHJgBC+C5YB6Bv4AL4CuwH7872skBcI/9oA5lBpwAO1F7p/IcUf5fuy8L4AzYjthPVWYfeMJ+wFLxABxG660K8xv7QcrBWawOqykfsB+YnEzQv4RXOcV+UHJzD+zF6LwaMsF+QCyYo3kBALfYD4YVK+DL8C4cd+6wHwhrfgJbQztyrJEAjhvgj4F9OcrUKMA33Me778/NaLCUXKMA27ivt48BP7vArYU0k1oFAPeRHjrJPQ3u0ZGlZgHATe5+Bv6ecxooGtUuwEuOCVvsugd2vXp0ZGlFAHDL3bOA3zfHzSmqTEsCgNsjcBXwO5e4T5Hq0poA4OYFoWsg1RWNWhTgJZ8ImxdcUdFuo5YFADcvmAZcY0olRaPWBQD313wZcJ0n3Fa6UUcC/JfvAdda4TagjjYS4HWOcF/7fK/5i5FODmvcDzC0eveOsO3xt4xwRVECvJ1t3MMmvtd+AN5HuH62SIDunOC/tLxgREUjCdCf0HnBKFYUJcBm2SNsXnCZqD3RIgE2zzZuidi3PVPcxLLISAD/fMYtDvm0qdht6BIgLIf4zwuWOHmKigQIzy5hhbSiKocSYFi2cFVA3zZ+ytjGztQogMVS7Vf85gVPFLLVrEYBrGbcvlvRJzbNfJ0aBbDc1++7Fd28bFyjAOdRe8g/PlvOfhm18d/UKMCKMjZqHNM/L1hiXCmsUYBn3ILMZ+zX6N/jVgi72mr6KFqtArzwiJtsneE+li3oezLJdNGodgHGgOm3AQlgz03vKCWMBLDnrneUEkYC2CMBGkcCNI4EaBwJ0DgSYEMecE/mbkLIA59NCnCzplElEbqfLvTJXwlQGEN2z+zjv4GzKQFK/xewZPiCTumS6xOgg4cI9xiyZ08CFIIESBwJYI8E6EACJI4EsEcCdCABEkcC2CMBOpAAiSMB7JEAHUiAxJEA9kiADiRA4kgAeyRABxIgcSSAPRKgAwmQOBLAHgnQgQRIHAlgjwToQAIkjgSwRwJ0IAESRwLYYyrA7zWNKgUJkDgSwB4J0IEESBwJYE8zAqxwr0T7webv2Ivxbv2PHtc7xb1qNucDpc0I8DHTPcXIB/yPi5MAHcT4KM+dXH3ThADzXDcUMSHHxEmADr5kuqcYOSJfvzQjwIKCz8/7X3bof8O3BAjkDvtXuPcl5HBICeDB9yx3FpZj8vdHcwKsKOCsnDeyhzvNSwJkYEp5hypfY9MXTQrwjDtJo5ScYNcPzQrwTBmHOx1g+y7BpgV4xJ21Z5Ut8hV8JMAaLpPf5fqcdbRLAmTE4lj1wwHtlQCRyV0l3MHvnF8JkIGcVcLc1T4JsCE5qoQW1T4JsCGpq4RW1b5iBbhe0yhLUlYJS7xfCfAGKaqE3wq4LwngQcxTta2rfRIggDlxqoQlVPskQCAxqoQlVPskwACG7CUspdonAQYQWiUsqdonAQYSUiUsqdonASLgUyUsrdonASKwwj2y1ZcSq30SIBKbVAlLK29LgMh0VQlLrfZJgMi89aRxydU+CRCZOe5g6JfsMo6TwiVARJbABe7r3pgmfRJASAAhAQQSQCABmsdUgKs1jRL5uO0dpYSRAPZMekcpYS7WNErk47R3lBLmx5pGiXyYvi1lDFumaua6f4jS5w77jmiRBa/XM8zyjnHX0sfIkrjPPQzOAeNdTRsbUzbb2ZQ9W7i9dBNghltyjUHrny4r3JtHJ//0b9RH4P8GSxsCzEN/51YAAAAASUVORK5CYII=";
const iconStart1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAESElEQVR4nO2cLUxcQRSFv4QgEBiSKgQCh6pCouvQlbVVdaRuTFUNoqaqEkktCoVD4HBITBMMosmaVsxu+kL3l3lv7p13z5ccyc68OSf3sLtvHwghhBBCjJM/hRKNowAERwEIjgIQHAUgOApAcBSA4CgAwVEAgqMABEcBCI4CEBwFIDgKQHAUgOAoAMFRAIKjAARHAQiOAhAcBSA4CkBwFIDgKADBUQCCowAERwEIjgIQHAUgOApAcBSA4CgAzkmUm9SqUvHpjYSEvRky35iEvSky35iEvTky35iEvUky35iEvVky35iEvWky35iEvXky35iEvYky35iEvZky35iEvaky35iEvbky35iEvcky35iEvdky35iEveky35iEzA9PQuaHJyHzm2e78O8T7Zhfeq2j4i1wDvyi/GAT/s1P5Gs9J197SN4An4A7hjlgz+a/fM078lm8KXxt92wDp8BPYEL9g/ZoflcT8tmcMrKK6I54TwfueS/NV8SyEe/54D3uoZmK2GTEt2KA5dov5bYiXjvivRthsea6Mq+Ivka8V0NqrlWqahUx1IjfRGeF15DWWCMVrnG2xhpDaLCKqDHiV+ka+ADs9nA9ack6qYfX3yXv9XrJOkOruCIsRvxLPZANOXztRSwhzVkvDbDO4fR1H+asV0trV4SHEf8M/ABOVm22B1Jn3VRhvRPytT1jc7YLK8LTiN/Z/FyLSNT/Vm8HZxVhtYnZiD8oOc3GOcC+Iqou9gx8p86Ib40T8tnUrogqi1wB76k/4ltkh3xWVzQegHvgM7Df6/HEYp98hvc0EoAn8hg7HuAwonNMPtsnnAVggkZ8TboV0cfb9aIRf4ZGvCX7ZA9KKmLjEf8NjXiPHJO92bQiFICRUCUAqgBfVK+AedI/gXVx80/goorQ28BhcPs2cFlF6IOgMpr7IGiRVBHrM5qPguep5vf9rWF1v0DVxbrS18EBvw5epGv6u+fPOx7uGXQXgJnGXBHWt4Q1EYCuhrwptBYebgptNgBd3dBORcxG/A325zaaAMz0G7gA3gFbaxpSgy3yni7Ie7Q+p9EGoKtH4AtwtNqfwTia7uER+/MIF4CuboCPwN5Su/phb7pWKyM+RABmGqoiWh7xoQLQ1SPwlbKKOJq+RssjPmwAurpl/YqYjfhbB/tWAHrWBLjk/9/HzX4XeYnd7yIVgMqa/T7O+neR1jLfgKQASIYy34CkAEiGcvGACKmu5j5DKPJboQha9BZ4Lh4eEiX1o+LnCKoi2tMgTxJVRfjWRiO+FFWEH5k/TVwVUV/mD4ueh4cHTY5ZVUd8KaqI/mQ+4ktRRWwulyO+FFXEcjU14ktRRfxT8yO+lIgVMcoRX8rYP2gKNeJLGVNFhB/xpbRYERrxA+C9IjTiK+KpIjTijbGoCI14hwxdERrxDdFnRWjEN85rKkIjfoSsqgiN+EB0K0IjXgghhBDh+Avri3imoU6g/AAAAABJRU5ErkJggg==";
const iconSetting = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAIxElEQVR4nO2dW4wWRRbHfzArzAIioFxk4oMKjLgqug9k2UUi3g0YYwKId59UXnaj0ejDamLUxTWi8cEbglFJvL7hLfFuHBGNVxBXjFGZWVC8jIoDOzPLTPtwvk+GoafOqe6qntbpf1LJZKrr1L+quqtOnXOqPqhQoUKFChUqVKhQoUKF8uDvQBIoXVUwdzOGDzYBB44JKOtPAWUFRZkHYFZAWUcHlDUk0ADsJNwUtKsms3Qo6xcwAxgVUN4fgcMCyguGsg5AyPm/jlJOQ0NpAI6KIDM3yjoAIRfgOko5AGVFG+5F9fiUMqcrZT6Ozvp3goOAXtydOT6lXJNS5v9AY2Tuv2mcAKwCfsDdkVscMtqVsiuAA+PQ/+3iNGA9dp3+KYes1wzlfwZuASbm4LxfjrJRcASwGXnD5mJb3A8BnsF/U3WTQ+ZdHnI6gFuBA4xtbEBeljXIVzrTWK4QPMvejfsauA9ZGEekPH8x8BP+nZ8ASxw8lmWQtw041yFzFvJibetX7jlHmUKxAHcDfwQeARYDE4B7lOe11OzgMjeH3Bf7yG4CrgY2KGUW+HVVeIwAPsHeSE270dKnuG0643LK7wReB3qMz28m/QsvDFemkAqduoAngFOwrS0n157vKoBbUuuDQcFEdJUxa+pB3sQrgMkZ+U0GrgFaI3Gspx+BSRk55sJ9GchqaTdwP3BoQJ4jkcV5SwS+9bQyIF8TjkU6K2QjNgGzI3IeAVwGfBOYd/3FOTYi933wauAGPAqMLoj7OOBOwr9ALcCwIhqwyEDmv8Db2LSeFUWQTsFsRKuydG478K3hucWxSTcCXxiILKo9fwhwKWI+6E557vbYhBVMRqa+gaaVF4CLEO+c5cVrJawnbx/800DiddI/xQlIY55AzACD3fl1TEZM1X3XomtI12xeQW//dbGINiGGrBCLUZb5fixwHqIlvY0spt219E3tfyuBpcD+nrKbkI6boTxnUT46avKC42Gl4gS4N0K9zcBqJLLBuiDuREzb0yPwsajfa0JX+hdsC+pJAescBdyGOFKsHd8/dSMWz5COmAsN9fYCc0JVOAy7vb49UMXTgY3GOi3pTeDgALwuxf5CvEVAn/vV2A1pP5PvSziOOJulNrJHWwwDbvSs7w4CBz1cht1K2AmclaGO6cTp/L6D4Psl7Ac86FFHD2LDioKlpOvzaWk3cImH7EbgA6PsPOkdJFLOgjHs62zSXrylHm3OhDOB/xkJ9QCXG+XeZpQZIt1g4NMIvO8hs530cJkomA/sMBLrRY9EaMa2uPUCTwMXILGeo2rpcEQ7edrIqQOYonAajl31/ZJB8BHPBr43kNtqkLXaIKcV+KtB1lz0wK4EuNsg612DnPcIo2FlwlHs66zun9YqMsaih6K34tfIqeiD0IHM8S6sUWS04L/r3gt51aSPkFgcF95V8hfiNmAlyML2lQcvLdIBxByiOdU3KfmtiNqdGSH0VC3o9T0lf76S/wywzk7nV7QgGowLJyr52gDkPvoUYgCmKvmblXwtEvpxDy6+ZbW6Ne5a2wuBppJqlk/N0ZHnZMs0RfZ2pfxopfyuHNyCQdsda2eztPCRPA4OrQM7lfJ/UMrvzsENKOaARpKzfB4/ayE+2jwIMQBdSr4WObZDyc8aFwT6ZusnJX+kkt/twSUVIQagQ8nXOvBzJf9vHlx8y2p1a56tnR5cUhFiAFwHJkAPsvpQyT/Hg0t/aIYxrW5XIDDYdvlOhBgA7S06Usl/WclfgJgXfDEPCY934SUl/89K/n/sdOJgDOJtcmkKqxUZ+6ObItrw07mbkNikvKaItYqMHcCpHryCYgo2Y9UHBlmrDHLasH0J89A7P8EWz7nVIKcbP79HEMzEFqCVIGZmzQEyHbuj51kkvmgaouePrv19MXbnSRf6Bm+SUVaCmMmvV+QFw/HYzND19D42i+GtHjLzpuXGtl6L36GSVcjmLRrOxi8+50Xsh+Aa0deTEGkdun7fF4uwewAT4HnExB4c/8DulE+Ah/A/zjmFuAcqtpItam0+chDDWs+HGetJxXAkxMKnoTeS3QxwDDaPlm9qJd+NKUd78tpEIFPIMCTIyFLpbuxOeBcmYjt07TPtaGYJC6Zid9S7zjN7Yw62xejCgHU2ItELHYZ6B0pdwL/wm/M1nGCodzsR1gHNP5oggauhMQVxoPsMREeNS4xbsl4y1L8sQr00oXeCJTx9BhIK7rtIjUHsQvcisarbkTe8q/b3euQQ+BL0HW4aLCHzC9E7/2MiqqLXGQiknZUajwS2trBnKvuUSHH0GbAcUTVfQLS9tPWiAQlC0Nq/MCZRnyNKI5EoOteh6TIMwnLSv+QW5KTMtNpzlnsoXimC8GIDkW/R7+7pOwgxj6e6sMLAr5c9J3Jcz/WgW0+DIfQx1V7kBM5BBfEfAzwWuA0PFsQdiHNQO0HessuJewHGHMSOH5L3LuREaKFYGYD4QGkLMueG1N+nAQ8Q58W5OSBPMybhZx/JktqQhTDPhR1XAG/gZ8fySVE2XVYUcV1Nwp4ra042cBqOXG1T1JU1UTZdVoxAwvcsROtX0HQanx8ojXPwacB+/cBAycf+H3XTZYV2ZdkG5JBfXd9vRjY8WTvI5ZZsziE3QS79m4Co2o+g32sXddPlg+fYm9g2RMd2Bb8uxeZz9fnkl2SQlyBr2fkp8kYCZyAKx/Z+ZbRojkIxE7k9aw1ytaP1rv6xwL/xM7Td5ZB3k4ecelqLbTfegDj870BCcQrbdFmR5zLTiYhJwHLuzHUg5ClD+Xp6A9uiPqRwILp5oN1RXruW7Afkso95cej/PtCIfmIybcoYr5TppThThxll/P2ATuAz5Zm0Y1HaNQRtwHeZGA1BPEk+dXKgxbZ0KOMXAOL4CA0tEnpQMJQGYEMEmblR1gHYGEFmKQegrGjALwRSS9UPuXmih7CHHzbWZJYOZR0ACDsNlXIBhnIPQMiFuJr/K1SoUKFChQoVKlSoUBr8Ah3QujNKRJdpAAAAAElFTkSuQmCC";
const iconJump = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAG6wAABusBTDGeSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAeVSURBVHic7VpvTBNpHv6901L+yQU3nCfrByU9IRYrWrCVGkVzgu4ZCSFSMBDJrhcTP+iqMdlcLvFyl7sPftn9diZsiHterpYz8TxuCXsauBNy2VVoXIEIXV2hAYt/WqF/mMGZ6fzugwxXSjudlnYHWJ5kMm+n7/zmeZ55531/7ztDEBF+zKCUJqA01gxQmoDSWDNAaQJKY80ApQkojTUDlCawFNTU1Pzk3LlzzYQQkmiMFW0AABzRarVfXLx40UYISUjLijaA4zjNunXrQK/XWy5dutS5b98+dbwxVrQB4jwmIyMDtm/fXrV3796eQ4cOZcYTY0UbEAqNRgM6na7caDTeP3r0aI7c81aNAQAAaWlpsG3bNr3BYHhYW1v7npxzVpUBAABqtRoKCwu1er1+sK6uLj9W/RVtQLS1DJVKBVu3bn1fr9cPWCyWAqkYK9oAKVAUBVqtNq+kpORRQ0ODLlo9kooVoVOnTv0yOzv7F1J1Yl1XDi+e53++e/fu6uzs7AX1w8sTExPMo0eP9lmtVnt4jKQbQAhJv3z58rDBYJhveuI1pEjKLSd6nsvlYh8+fFhptVp7Qvmm4hFQAUDCqWmqkJ+frykrK+tubGz8IPR4SvqA5brQumHDBpXJZPqyqampTjy2KjvBYDAILMsCwzAQCATA5/OB1+uFqakpAACqsLDQ1tzcfAoAIO7cWQ5S3QIEQYDZ2VngOA6CwSDwPA88z8+XAQDECWKkfVZWFqXVaj9vaGiYTYkByQbP80DTNDAMAwzDAMuyABBZnJRwcY+IMDMz4x8eHuYTNoAQQk6fPn1yYmLi7x0dHb7Q/5baAliWBZqm5zc5d1WOcJGby+V6cevWrY+dTudXCRlACKHOnj17o6ioyPL8+XMGAP6WSBwRgiCAz+cDn88HDMNAMBiUJSYe4YQQCAaD4HQ6v2tra/vY7Xb3ICIdtwFms1l9/vz5DpPJVMXzPLAsqwmvg4goipj7vWAP8K6jCgQCMD09DYFAICJpKcQjnBACLMvCkydPHlit1osMw/Qj4luAODvBAwcOZJrN5i6j0Vienp4OPp8vUjX+7t27nz5+/NgoFSsZmWBWVtZPi4uLj6Snp0u2jtnZWRgaGuq02Wy/EQRhEBF5MYZsAw4fPpxjMpn+W1paqtdoNICIEUkiIksI+UtfX9+SHgs5OHjw4NHi4uIj4Y9CaDkQCEBfX9+f29vbrwCAAxGF0BiyDDh27Nh7ZWVlD0pKSrRpaWnz4qPdJUT0LkWYXFRWVnKi4Ej9gdfrFXp6ej7r7u7+EwCMYgTCMQ2oqanJ37lzZ79er39frVaDIPzfwNCyUiCEAEVR82URr1+/Zru6un53//79LxDRFe18SQNqa2sLdu3a9UCn0+VRFDUveLmkuiKP8DF+cnLS39nZ+cng4OBNRHRLxYhqwPHjx3UGg+GboqKiHACIKH65tADRAEEQYHx8/OXt27cvjI6OdiBixF46FBENsFgspaWlpb1arTYz1jR0y5YtdWfOnNkVSihSWeo/OWW/3/+v1tbWO+FcRQM4joPR0dHvb968ee7Vq1f/QUQ6suSFWGRAfX39/rKysrubN2/WSIlHRMjMzASz2Vw9PT0NDMNEHMfjGa+l9uPj45WEkN3i+B0an2VZcDgc9ra2tgt+v/9BeB3ZBtTX139gNBr/uWnTJlV4Lx9eRkSYmpoCv98fNXGJJSoezF1fFXYMaZqGp0+f3rHZbL8WBGEgdIyXg3kDTpw4Ubdnzx7bxo0bqdBnO5IJHMeBx+MBlmWXJE7u3Y8Gu93+Lcdxf+zt7bUCwEj4GC8HagCAxsbGX5WXl7fk5eWRaOJF0DQNHo8n5kiQzLsf7Ryv1+vo7e29AgCBSGO8HKgtFkvj/v37P8/NzY3Zq79582ZBk0+GqKXEmmvu/rgvHgJqeHiY93g8tJT4YDAILpcL/H7pay21SUvFEpOdZIMaGhrqvHbt2ocOh8MTOoMTEQwG4cWLF8BxXERiSt39ZIFCRJ/T6fyypaWlaWBgYEwUCrBYvBRS8cz/EMZQAACISLvd7n9fvXq1yW63f8uy7ALxUoRCJ0ZSm1g31h4RQRCERVuq0u8FL0YIIWqKovQnT568UlBQUBk+yQjfcxwHIyMjXzEM8zpicIlMMNrxaHXGxsa+7u/vb0VEVpYymVj0Zoi8+9SkqLq6+pMdO3Y0Z2RkLCAWSpDjOLh3795H3d3dHckkFQVvUzHNXpQKI6JACBlpb2///czMjNtkMl3Iyspa1AWLRqhUKg4RXyWb2A+FiJOhuaTiGSHk05mZmTcVFRW/zcnJ0SjRS6cakusBiOgihLTQND1VVVV1Zf369TkAyg5byUbMFSFEdBNC/hoIBKarq6s/y8vL+5lKpYp12oqBrPQKEX3Pnj37x40bNz6anJz8XhCEVXH3AeJ4OYqI9MuXL7uuX7/+4djYmF1OcrQSEFeCjYhv/X7/162tracdDseduXd0y2OBMFHIzeTCsjoKAHQVFRV/yM3NLU4kxnLZEv5EhrzrBNYBABPvKsxyQko+klpJWJVfiMSDNQOUJqA01gxQmoDSWDNAaQJK40dvwP8AKk+/HC2PJW8AAAAASUVORK5CYII=";
async function getCustomEnableSaveToArchiveOrg() {
    const keyName = "novel-downloader-enableSaveToArchiveOrg";
    const value = (await (0,_lib_GM__WEBPACK_IMPORTED_MODULE_0__/* ._GM_getValue */ .QG)(keyName));
    if (value === undefined) {
        const v = confirm(`欢迎使用小说下载器脚本！
本脚本为404小说文库项目的组成部分之一。404小说文库项目致力于存档、保存、恢复因种种原因被删除的网络小说。
您是否同意将当前书页存档至互联网档案馆（archive.org），以备日后（被删除后）查看？

如您同意，小说下载器脚本将会发送当前书籍详情页URL及目录页URL（如果存在）至存档服务后端。
该过程将会搜集并上报您如下信息：IP地址、User-Agent、Referer、当前书籍详情页URL、当前书籍目录页URL（如果存在）、当前小说下载器脚本版本、当前脚本管理器版本。
除上述信息外，不会搜集您任何其他信息。

本存档功能为主体功能以外的附加功能，同意与否并不影响小说下载功能的正常使用。`);
        await (0,_lib_GM__WEBPACK_IMPORTED_MODULE_0__/* ._GM_setValue */ ._u)(keyName, JSON.stringify(v));
        return v;
    }
    else {
        try {
            const v = JSON.parse(value);
            if (typeof v !== "boolean") {
                throw new Error("value is not boolean");
            }
            return v;
        }
        catch (error) {
            await (0,_lib_GM__WEBPACK_IMPORTED_MODULE_0__/* ._GM_deleteValue */ .jF)(keyName);
            return false;
        }
    }
}


/***/ }),

/***/ "./src/ui/progress.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "el": () => (/* binding */ el),
  "o": () => (/* binding */ style),
  "vm": () => (/* binding */ vm)
});

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("vue");
// EXTERNAL MODULE: ./src/lib/dom.ts
var dom = __webpack_require__("./src/lib/dom.ts");
// EXTERNAL MODULE: ./src/ui/progress.css
var progress = __webpack_require__("./src/ui/progress.css");
;// CONCATENATED MODULE: ./src/ui/progress.html
// Module
var code = "<div> <div id=\"nd-progress\" v-if=\"ntProgressSeen\"> <div v-if=\"chapterProgressSeen\" id=\"chapter-progress\" v-bind:style=\"{'--position': chapterPercent+'%'}\" v-bind:title=\"chapterProgressTitle\"></div> </div> </div> ";
// Exports
/* harmony default export */ const ui_progress = (code);
;// CONCATENATED MODULE: ./src/ui/progress.ts




const style = (0,dom/* createStyle */.wj)(progress/* default */.Z);
const el = (0,dom/* createEl */.ut)(`<div id="progress-bar"></div>`);
const vm = (0,external_Vue_.createApp)({
    data() {
        return {
            totalChapterNumber: 0,
            finishedChapterNumber: 0,
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
        ntProgressSeen() {
            if (this.chapterProgressSeen || this.zipProgressSeen) {
                return true;
            }
            else {
                return false;
            }
        },
        chapterProgressTitle() {
            return `章节：${this.finishedChapterNumber}/${this.totalChapterNumber}`;
        },
    },
    methods: {
        reset() {
            this.totalChapterNumber = 0;
            this.finishedChapterNumber = 0;
        },
    },
    template: ui_progress,
}).mount(el);


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

/***/ "loglevel":
/***/ ((module) => {

"use strict";
module.exports = log;

/***/ }),

/***/ "./node_modules/mime-db/db.json":
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana"},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana"},"image/avcs":{"source":"iana"},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}');

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

// EXTERNAL MODULE: ./src/detect.ts
var detect = __webpack_require__("./src/detect.ts");
// EXTERNAL MODULE: ./src/lib/localStorageExpired.ts
var localStorageExpired = __webpack_require__("./src/lib/localStorageExpired.ts");
// EXTERNAL MODULE: ./src/lib/misc.ts
var misc = __webpack_require__("./src/lib/misc.ts");
;// CONCATENATED MODULE: ./src/global.ts


function init() {
    window.workerId = (0,misc/* randomUUID */.HP)();
    window.downloading = false;
    window.localStorageExpired = new localStorageExpired/* LocalStorageExpired */.Z();
    const stopController = new AbortController();
    const stopFlag = stopController.signal;
    window.stopController = stopController;
    window.stopFlag = stopFlag;
    window.failedCount = 0;
}

// EXTERNAL MODULE: external "log"
var external_log_ = __webpack_require__("loglevel");
var external_log_default = /*#__PURE__*/__webpack_require__.n(external_log_);
// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__("vue");
;// CONCATENATED MODULE: ./src/ui/fixVue.ts


globalThis.Function = new Proxy(Function, {
    construct(target, args) {
        const code = args[args.length - 1];
        if (code.includes("Vue") && code.includes("_Vue")) {
            external_log_default().debug("Function hook:" + code);
            return hookVue();
        }
        else {
            return new target(...args);
        }
        function hookVue() {
            args[args.length - 1] = "with (Vue) {" + code + "}";
            return new Proxy(new target(...["Vue", ...args]), {
                apply(targetI, thisArg, argumentsList) {
                    const newArgumentsList = [external_Vue_, ...argumentsList];
                    return Reflect.apply(targetI, thisArg, newArgumentsList);
                },
            });
        }
    },
});

// EXTERNAL MODULE: ./src/lib/dom.ts
var dom = __webpack_require__("./src/lib/dom.ts");
// EXTERNAL MODULE: ./src/lib/GM.ts
var GM = __webpack_require__("./src/lib/GM.ts");
;// CONCATENATED MODULE: ./src/router/download.ts
async function getRule() {
    const host = document.location.host;
    let ruleClass;
    switch (host) {
        case "www.ciweimao.com": {
            const { Ciweimao } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/ciweimao.ts"));
            ruleClass = Ciweimao;
            break;
        }
        case "www.uukanshu.com": {
            const { Uukanshu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/uukanshu.ts"));
            ruleClass = Uukanshu;
            break;
        }
        case "www.yruan.com": {
            const { yruan } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = yruan();
            break;
        }
        case "www.shuquge.com":
        case "www.sizhicn.com": {
            const { shuquge } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type2.ts"));
            ruleClass = shuquge();
            break;
        }
        case "www.dingdiann.net": {
            const { dingdiann } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type3.ts"));
            ruleClass = dingdiann();
            break;
        }
        case "www.biquge66.com":
        case "www.lewenn.com":
        case "www.klxs.la":
        case "www.xkzw.org": {
            const { Xkzw } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/xkzw.ts"));
            ruleClass = Xkzw;
            break;
        }
        case "www.266ks.com": {
            const { c226ks } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePageWithMultiIndexPage/226ks.ts"));
            ruleClass = c226ks();
            break;
        }
        case "book.sfacg.com": {
            const { Sfacg } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/sfacg.ts"));
            ruleClass = Sfacg;
            break;
        }
        case "www.hetushu.com":
        case "hetushu.com": {
            const { Hetushu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/hetushu.ts"));
            ruleClass = Hetushu;
            break;
        }
        case "www.shouda88.com": {
            const { shouda8 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/shouda8.ts"));
            ruleClass = shouda8();
            break;
        }
        case "www.gebiqu.com": {
            const { gebiqu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = gebiqu();
            break;
        }
        case "www.viviyzw.com": {
            const { viviyzw } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/viviyzw.ts"));
            ruleClass = viviyzw();
            break;
        }
        case "www.1pwx.com": {
            const { xiaoshuodaquan } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/1pwx.ts"));
            ruleClass = xiaoshuodaquan();
            break;
        }
        case "book.qidian.com": {
            const { Qidian } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/qidian.ts"));
            ruleClass = Qidian;
            break;
        }
        case "www.jjwxc.net": {
            const { Jjwxc } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/jjwxc.ts"));
            ruleClass = Jjwxc;
            break;
        }
        case "www.81book.com":
        case "www.81zw.com":
        case "www.fuguoduxs.com":
        case "www.shubaowa.org":
        case "www.bz01.org":
        case "www.aixiawx.com":
        case "www.banzhuer.org":
        case "www.biquwoo.com":
        case "www.biquwo.org":
        case "www.hongyeshuzhai.com": {
            const { common } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = common();
            break;
        }
        case "book.zongheng.com":
        case "huayu.zongheng.com": {
            const { Zongheng } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/zongheng.ts"));
            ruleClass = Zongheng;
            break;
        }
        case "www.17k.com": {
            const { C17k } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/17k.ts"));
            ruleClass = C17k;
            break;
        }
        case "www.shuhai.com":
        case "mm.shuhai.com": {
            const { Shuhai } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/shuhai.ts"));
            ruleClass = Shuhai;
            break;
        }
        case "www.gongzicp.com":
        case "gongzicp.com": {
            const { Gongzicp } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/gongzicp.ts"));
            ruleClass = Gongzicp;
            break;
        }
        case "www.linovel.net": {
            const { Linovel } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/linovel.ts"));
            ruleClass = Linovel;
            break;
        }
        case "www.xinwanben.com": {
            const { xinwanben } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type3.ts"));
            ruleClass = xinwanben();
            break;
        }
        case "www.tadu.com": {
            const { Tadu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/tadu.ts"));
            ruleClass = Tadu;
            break;
        }
        case "www.idejian.com": {
            const { Idejian } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/idejian.ts"));
            ruleClass = Idejian;
            break;
        }
        case "www.qimao.com": {
            const { Qimao } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/qimao.ts"));
            ruleClass = Qimao;
            break;
        }
        case "www.wenku8.net": {
            const { Wenku8 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/wenku8.ts"));
            ruleClass = Wenku8;
            break;
        }
        case "manhua.dmzj.com":
        case "www.dmzj.com": {
            const { Dmzj } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/dmzj.ts"));
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
            const { Sosadfun } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/sosadfun.ts"));
            ruleClass = Sosadfun;
            break;
        }
        case "www.westnovel.com": {
            const { westnovel } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/westnovel.ts"));
            ruleClass = westnovel();
            break;
        }
        case "www.mht99.com": {
            const { mht } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type3.ts"));
            ruleClass = mht();
            break;
        }
        case "www.xbiquge.so": {
            const { xbiquge } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = xbiquge();
            break;
        }
        case "www.linovelib.com": {
            const { Linovelib } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/linovelib.ts"));
            ruleClass = Linovelib;
            break;
        }
        case "www.luoqiuzw.com": {
            const { luoqiuzw } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = luoqiuzw();
            break;
        }
        case "www.yibige.cc": {
            const { yibige } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/yibige.ts"));
            ruleClass = yibige();
            break;
        }
        case "www.fushuwang.org": {
            const { Fushuwang } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/fushuwang.ts"));
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
            const { Soxscc } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/soxscc.ts"));
            ruleClass = Soxscc;
            break;
        }
        case "www.xyqxs.cc": {
            const { xyqxs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type2.ts"));
            ruleClass = xyqxs();
            break;
        }
        case "www.630shu.net": {
            const { c630shu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/630shu.ts"));
            ruleClass = c630shu;
            break;
        }
        case "www.qingoo.cn": {
            const { Qingoo } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/qingoo.ts"));
            ruleClass = Qingoo;
            break;
        }
        case "www.trxs.cc":
        case "www.trxs123.com":
        case "www.jpxs123.com":
        case "trxs.cc":
        case "trxs123.com":
        case "jpxs123.com": {
            const { trxs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/trxs.ts"));
            ruleClass = trxs();
            break;
        }
        case "www.tongrenquan.org":
        case "www.tongrenquan.me":
        case "tongrenquan.me":
        case "tongrenquan.org": {
            const { tongrenquan } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/trxs.ts"));
            ruleClass = tongrenquan();
            break;
        }
        case "www.imiaobige.com": {
            const { imiaobige } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/imiaobige.ts"));
            ruleClass = imiaobige();
            break;
        }
        case "www.256wxc.com":
        case "www.256wenku.com": {
            const { c256wxc } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/256wxc.ts"));
            ruleClass = c256wxc;
            break;
        }
        case regExpMatch(/lofter\.com$/): {
            const { Lofter } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/lofter.ts"));
            ruleClass = Lofter;
            break;
        }
        case "www.lwxs9.org": {
            const { lwxs9 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = lwxs9();
            break;
        }
        case "www.shubl.com": {
            const { Shubl } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/shubl.ts"));
            ruleClass = Shubl;
            break;
        }
        case "www.ujxs.net": {
            const { ujxs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/ujxs.ts"));
            ruleClass = ujxs();
            break;
        }
        case "m.haitangtxt.net": {
            const { haitangtxt } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/duplicate/haitangtxt.ts"));
            ruleClass = haitangtxt();
            break;
        }
        case "m.yuzhaige.cc":
        case "m.yushuge123.com": {
            const { yuzhaige } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/duplicate/haitangtxt.ts"));
            ruleClass = yuzhaige();
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
            const { Longmabook } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/longmabook.ts"));
            ruleClass = Longmabook;
            break;
        }
        case "dijiubook.net": {
            const { dijiubook } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = dijiubook();
            break;
        }
        case "www.biquwx.la": {
            const { biquwx } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = biquwx();
            break;
        }
        case "www.25zw.com": {
            const { c25zw } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = c25zw();
            break;
        }
        case "www.tycqxs.com": {
            const { tycqxs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = tycqxs();
            break;
        }
        case "www.kanunu8.com": {
            const { Kanunu8 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/reprint/kanunu8.ts"));
            ruleClass = Kanunu8;
            break;
        }
        case "www.ciyuanji.com": {
            const { Ciyuanji } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/ciyuanji.ts"));
            ruleClass = Ciyuanji;
            break;
        }
        case "www.wanben.org": {
            const { wanben } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/wanben.ts"));
            ruleClass = wanben();
            break;
        }
        case "m.wanben.org": {
            const { wanben } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePageWithMultiIndexPage/wanben.ts"));
            ruleClass = wanben();
            break;
        }
        case "www.ranwen.la": {
            const { ranwen } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = ranwen();
            break;
        }
        case "www.washuge.com": {
            const { washuge } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/washuge.ts"));
            ruleClass = washuge();
            break;
        }
        case "m.baihexs.com": {
            const { baihexs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePageWithMultiIndexPage/baihexs.ts"));
            ruleClass = baihexs();
            break;
        }
        case "www.quanshuzhai.com": {
            const { quanshuzhai } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/quanshuzhai.ts"));
            ruleClass = quanshuzhai();
            break;
        }
        case "masiro.me": {
            const { masiro } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/masiro.ts"));
            ruleClass = masiro();
            break;
        }
        case "www.pixiv.net": {
            const { Pixiv } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/pixiv.ts"));
            ruleClass = Pixiv;
            break;
        }
        case "kakuyomu.jp": {
            const { kakuyomu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/kakuyomu.ts"));
            ruleClass = kakuyomu();
            break;
        }
        case "ncode.syosetu.com":
        case "novel18.syosetu.com": {
            const { syosetu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/syosetu.ts"));
            ruleClass = syosetu();
            break;
        }
        case "syosetu.org": {
            const { syosetuOrg } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/syosetu.ts"));
            ruleClass = syosetuOrg();
            break;
        }
        case "zhaoze.art":
        case "houhuayuan.xyz": {
            const { houhuayuan } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/houhuayuan.ts"));
            ruleClass = houhuayuan();
            break;
        }
        case "www.myrics.com": {
            const { Myrics } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/myrics.ts"));
            ruleClass = Myrics;
            break;
        }
        case "www.lstxt.cc": {
            const { lusetxt } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type2.ts"));
            ruleClass = lusetxt();
            break;
        }
        case "www.a7xs.com": {
            const { a7xs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/a7xs.ts"));
            ruleClass = a7xs();
            break;
        }
        case "www.shencou.com": {
            const { shencou } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/shencou.ts"));
            ruleClass = shencou();
            break;
        }
        case "www.tianyabooks.com": {
            const { tianyabooks } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/tianyabooks.ts"));
            ruleClass = tianyabooks();
            break;
        }
        case "jingcaiyuedu6.com": {
            const { jingcaiyuedu6 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/jingcaiyuedu6.ts"));
            ruleClass = jingcaiyuedu6();
            break;
        }
        case "www.hanwujinian.com": {
            const { Hanwujinian } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/hanwujinian.ts"));
            ruleClass = Hanwujinian;
            break;
        }
        case "www.biqu55.com": {
            const { biqu55 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type3.ts"));
            ruleClass = biqu55();
            break;
        }
        case "manga.bilibili.com": {
            const { MangaBilibili } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/bilibili.ts"));
            ruleClass = MangaBilibili;
            break;
        }
        case "www.aixdzs.com": {
            const { aixdzs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/aixdzs.ts"));
            ruleClass = aixdzs();
            break;
        }
        case "www.liuxs.la": {
            const { liuxs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/liuxs.ts"));
            ruleClass = liuxs();
            break;
        }
        case "www.cool18.com": {
            const { Cool18 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/cool18.ts"));
            ruleClass = Cool18;
            break;
        }
        case "www.b5200.net": {
            const { b5200 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = b5200();
            break;
        }
        case "www.yqxs.cc": {
            const { yqxs } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type2.ts"));
            ruleClass = yqxs();
            break;
        }
        case "www.dushu369.com": {
            const { dushu369 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/dushu369.ts"));
            ruleClass = dushu369();
            break;
        }
        case "www.18kanshu.com": {
            const { c18kanshu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/18kanshu.ts"));
            ruleClass = c18kanshu();
            break;
        }
        case "www.bxwx333.org": {
            const { bxwx333 } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/biquge/type1.ts"));
            ruleClass = bxwx333();
            break;
        }
        case "www.xiaoshuowu.com": {
            const { xiaoshuowu } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/twoPage/xiaoshuowu.ts"));
            ruleClass = xiaoshuowu();
            break;
        }
        case "www.xrzww.com": {
            const { Xrzww } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/special/original/xrzww.ts"));
            ruleClass = Xrzww;
            break;
        }
        case "colorful-fantasybooks.com": {
            const { fantasybooks } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/rules/onePage/colorful-fantasybooks.ts"));
            ruleClass = fantasybooks();
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

;// CONCATENATED MODULE: ./src/router/ui.ts

const defaultObject = {
    type: "download",
};
const errorObject = {
    type: "error",
};
function getUI() {
    const host = document.location.host;
    switch (host) {
        case "wap.shuquge.com": {
            return () => {
                const id = /(\d+)\.html$/.exec(document.location.pathname)?.[1];
                if (!id) {
                    return errorObject;
                }
                return {
                    type: "jump",
                    jumpFunction() {
                        document.location.href = `https://www.shuquge.com/txt/${id}/index.html`;
                    },
                };
            };
        }
        case "m.xinwanben.com": {
            return () => ({
                type: "jump",
                jumpFunction() {
                    document.location.host = "www.xinwanben.com";
                },
            });
        }
        case "www.tadu.com": {
            return () => {
                const re = /^\/book\/\d+\/?$/;
                if (re.test(document.location.pathname)) {
                    return defaultObject;
                }
                return errorObject;
            };
        }
        case "www.kanunu8.com": {
            return () => {
                if (document.body.innerHTML.includes("作者：") ||
                    document.body.innerHTML.includes("作者:") ||
                    document.body.innerHTML.includes("内容简介")) {
                    return defaultObject;
                }
                return errorObject;
            };
        }
        case "www.ciyuanji.com": {
            return () => {
                if (document.location.pathname === "/bookDetails/info") {
                    return {
                        type: "jump",
                        jumpFunction: () => (document.location.pathname = "/bookDetails/catalog"),
                    };
                }
                return defaultObject;
            };
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
            return () => {
                const params = new URLSearchParams(document.location.search);
                if (params.get("act") === "showinfo" &&
                    params.has("bookwritercode") &&
                    params.has("bookid")) {
                    return defaultObject;
                }
                return errorObject;
            };
        }
        case "m.sfacg.com": {
            return () => {
                const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
                if (bookId) {
                    return {
                        type: "jump",
                        jumpFunction: () => (document.location.href = `https://book.sfacg.com/Novel/${bookId}/MainIndex/`),
                    };
                }
                else {
                    return errorObject;
                }
            };
        }
        case "book.sfacg.com": {
            return () => {
                const jump = /^\/Novel\/\d+\/?$/.test(document.location.pathname);
                if (jump) {
                    const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
                    if (bookId) {
                        return {
                            type: "jump",
                            jumpFunction: () => (document.location.href = `https://book.sfacg.com/Novel/${bookId}/MainIndex/`),
                        };
                    }
                    else {
                        return errorObject;
                    }
                }
                else {
                    return defaultObject;
                }
            };
        }
        case "www.ciweimao.com": {
            return () => {
                const jump = /^\/book\/\d+\/?$/.test(document.location.pathname);
                if (jump) {
                    const bookId = /(\d+)\/?$/.exec(document.location.pathname)?.[1];
                    if (bookId) {
                        return {
                            type: "jump",
                            jumpFunction: () => (document.location.href = `https://www.ciweimao.com/chapter-list/${bookId}/book_detail`),
                        };
                    }
                    else {
                        return errorObject;
                    }
                }
                else {
                    return defaultObject;
                }
            };
        }
        case "m.lusetxt.com": {
            return () => ({
                type: "jump",
                jumpFunction: () => (document.location.host = "www.lusetxt.com"),
            });
        }
        case "manhua.dmzj.com":
        case "www.dmzj.com": {
            return () => {
                window.addEventListener("load", async () => {
                    await (0,misc/* sleep */._v)(300);
                    document
                        .querySelectorAll('*[style*="2147483647;"]')
                        .forEach((elem) => elem.remove());
                });
                return defaultObject;
            };
        }
        case "www.cool18.com": {
            return () => {
                const url = new URL(document.location.href);
                if (url.searchParams.get("act") === "threadview" &&
                    url.searchParams.has("tid")) {
                    return defaultObject;
                }
                else {
                    return errorObject;
                }
            };
        }
        default: {
            return () => defaultObject;
        }
    }
}

// EXTERNAL MODULE: ./src/setting.ts
var src_setting = __webpack_require__("./src/setting.ts");
;// CONCATENATED MODULE: ./src/ui/button.html
// Module
var code = "<div class=\"button-div\" id=\"button-div\"> <div v-if=\"uiObj.type !== 'error'\"> <div class=\"jump\" v-if=\"uiObj.type === 'jump'\"> <button class=\"jump\"> <img class=\"jump\" v-bind:src=\"imgJump\" v-on:click=\"jumpButtonClick\"/> </button> </div> <div class=\"download\" v-if=\"uiObj.type === 'download'\"> <button class=\"start\"> <img class=\"start\" v-bind:src=\"imgStart\" v-on:click=\"startButtonClick\"/> </button> <button class=\"setting\" v-if=\"isSettingSeen\"> <img class=\"setting\" v-bind:src=\"imgSetting\" v-on:click=\"settingButtonClick\"/> </button> </div> </div> </div> ";
// Exports
/* harmony default export */ const ui_button = (code);
// EXTERNAL MODULE: ./src/ui/button.less
var src_ui_button = __webpack_require__("./src/ui/button.less");
// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__("./node_modules/file-saver/dist/FileSaver.min.js");
;// CONCATENATED MODULE: ./src/debug.ts


async function debug() {
    const rule = await getRule();
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
    unsafeWindow.saveAs = FileSaver_min.saveAs;
    const { parse, fetchAndParse, gfetchAndParse } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./src/lib/readability.ts"));
    const readability = {
        parse,
        fetchAndParse,
        gfetchAndParse,
    };
    unsafeWindow.readability = readability;
    unsafeWindow.stopController = window.stopController;
    return;
}

// EXTERNAL MODULE: ./src/main/main.ts
var main = __webpack_require__("./src/main/main.ts");
// EXTERNAL MODULE: ./src/save/misc.ts
var save_misc = __webpack_require__("./src/save/misc.ts");
;// CONCATENATED MODULE: ./src/ui/ChapterList.html
// Module
var ChapterList_code = "<div> <div v-if=\"loading\"> <div class=\"chapter-list-loading\"> <h2 v-if=\"failed\">加载章节失败！</h2> <h2 v-else>正在载入章节列表中，请耐心等待……</h2> </div> </div> <div class=\"chapter-list\" v-else> <div v-for=\"sectionObj in sectionsObj\" v-show=\"isSectionSeen(sectionObj)\" v-bind:key=\"sectionObj.sectionNumber\" class=\"section\"> <h3 class=\"section-label\" v-if=\"sectionObj.sectionName\"> {{ sectionObj.sectionName }} </h3> <div v-for=\"chapter in sectionObj.chpaters\" v-show=\"isChapterSeen(chapter)\" v-bind:key=\"chapter.chapterNumber\" class=\"chapter\" v-bind:class=\"{\n              good: this.filter(chapter),\n              bad: !this.filter(chapter),\n              warning: this.warningFilter(chapter)\n            }\" v-bind:title=\"chapter.chapterNumber\"> <a v-bind:href=\"chapter.chapterUrl\" v-bind:class=\"{\n                disabled: this.isChapterDisabled(chapter),\n              }\" target=\"_blank\" rel=\"noopener noreferrer\">{{ chapter.chapterName }}</a> </div> </div> </div> </div> ";
// Exports
/* harmony default export */ const ChapterList = (ChapterList_code);
// EXTERNAL MODULE: ./src/ui/ChapterList.less
var ui_ChapterList = __webpack_require__("./src/ui/ChapterList.less");
;// CONCATENATED MODULE: ./src/ui/ChapterList.ts









async function getSections() {
    if (window._sections &&
        window._url === document.location.href) {
        return window._sections;
    }
    else {
        const rule = await getRule();
        const book = await rule.bookParse();
        window._book = book;
        window._url = document.location.href;
        if (unsafeWindow.saveOptions?.chapterSort) {
            window._sections = (0,save_misc/* getSectionsObj */.f)(book.chapters, unsafeWindow.saveOptions?.chapterSort);
        }
        else {
            window._sections = (0,save_misc/* getSectionsObj */.f)(book.chapters);
        }
        return window._sections;
    }
}
const style = (0,dom/* createStyle */.wj)(ui_ChapterList/* default */.Z);
/* harmony default export */ const src_ui_ChapterList = ((0,external_Vue_.defineComponent)({
    name: "ChapterList",
    setup() {
        const sectionsObj = (0,external_Vue_.reactive)([]);
        const loading = (0,external_Vue_.ref)(true);
        const failed = (0,external_Vue_.ref)(false);
        (0,external_Vue_.onMounted)(async () => {
            if (sectionsObj.length === 0) {
                try {
                    const _sectionsObj = await getSections();
                    Object.assign(sectionsObj, _sectionsObj);
                    loading.value = false;
                }
                catch (error) {
                    external_log_default().error(error);
                    failed.value = true;
                }
            }
        });
        const filterSetting = (0,external_Vue_.inject)("filterSetting");
        const filter = (chapter) => {
            if (chapter.status === main/* Status.aborted */.qb.aborted) {
                return false;
            }
            if (filterSetting.value) {
                const filterFunction = getFilterFunction(filterSetting.value.arg, filterSetting.value.functionBody);
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
            failed,
            filter,
            warningFilter,
            isChapterDisabled,
            isChapterSeen,
            isSectionSeen,
        };
    },
    template: ChapterList,
}));

// EXTERNAL MODULE: ./src/ui/FilterTab.css
var FilterTab = __webpack_require__("./src/ui/FilterTab.css");
;// CONCATENATED MODULE: ./src/ui/FilterTab.html
// Module
var FilterTab_code = "<div> <div class=\"filter-setting\"> <div v-if=\"filterType !== 'null'\" class=\"filter-input\"> <p>请输入过滤的条件：<input type=\"text\" v-model=\"arg\"/></p> </div> <div class=\"filter-setter\"> <div> <span>当前过滤方法：</span> <select v-model=\"filterType\"> <option v-for=\"filterOption in filterOptionList\" v-bind:value=\"filterOption[0]\"> {{ filterOption[1][\"abbreviation\"] }} </option> </select> </div> <input type=\"checkbox\" id=\"hiddenBad\" v-model=\"hiddenBad\"/> <label for=\"hiddenBad\">只显示符合条件章节</label> <div class=\"filter-description\" v-html=\"filterDescription\"></div> <div v-if=\"false\"> <span class=\"good\"></span> <span class=\"warning\"></span> <span class=\"bad\"></span> </div> </div> </div> <chapter-list/> </div> ";
// Exports
/* harmony default export */ const ui_FilterTab = (FilterTab_code);
;// CONCATENATED MODULE: ./src/ui/FilterTab.ts





const filterOptionDict = {
    null: {
        raw: () => {
            return () => true;
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
                            const m = parseInt(_m[1]);
                            if (m === n) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case /^\d+-\d+$/.test(s): {
                        const _m = s.match(/^(\d+)-(\d+)$/);
                        if (_m?.length === 3) {
                            const m = _m.map((_s) => Number(_s));
                            if (n >= m[1] && n <= m[2]) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case /^\d+-$/.test(s): {
                        const _m = s.match(/^(\d+)-$/);
                        if (_m?.length === 2) {
                            const m = parseInt(_m[1]);
                            if (n >= m) {
                                return true;
                            }
                        }
                        return false;
                    }
                    case /^-\d+$/.test(s): {
                        const _m = s.match(/^-(\d+)$/);
                        if (_m?.length === 2) {
                            const m = parseInt(_m[1]);
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
/* harmony default export */ const src_ui_FilterTab = ((0,external_Vue_.defineComponent)({
    components: { "chapter-list": src_ui_ChapterList },
    emits: ["filterupdate"],
    setup(props, { emit }) {
        const arg = (0,external_Vue_.ref)("");
        const hiddenBad = (0,external_Vue_.ref)(true);
        const filterType = (0,external_Vue_.ref)("null");
        const filterOptionList = Object.entries(filterOptionDict);
        const functionBody = (0,external_Vue_.computed)(() => getFunctionBody(filterOptionDict[filterType.value].raw));
        const filterDescription = (0,external_Vue_.computed)(() => filterOptionDict[filterType.value].description);
        const filterSetting = (0,external_Vue_.computed)(() => ({
            arg: arg.value,
            hiddenBad: hiddenBad.value,
            filterType: filterType.value,
            functionBody: functionBody.value,
        }));
        (0,external_Vue_.provide)("filterSetting", filterSetting);
        (0,external_Vue_.watch)(filterSetting, () => {
            emit("filterupdate", filterSetting.value);
        }, {
            deep: true,
        });
        const getFilterSetting = (0,external_Vue_.inject)("getFilterSetting");
        (0,external_Vue_.onMounted)(() => {
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
    template: ui_FilterTab,
}));
const FilterTab_style = (0,dom/* createStyle */.wj)(FilterTab/* default */.Z);

// EXTERNAL MODULE: ./src/log.ts
var log = __webpack_require__("./src/log.ts");
;// CONCATENATED MODULE: ./src/ui/LogUI.ts


/* harmony default export */ const LogUI = ((0,external_Vue_.defineComponent)({
    name: "LogUI",
    setup(props, context) {
        const logText = (0,external_Vue_.ref)("");
        let requestID;
        (0,external_Vue_.onMounted)(() => {
            logText.value = (0,log/* getLogText */.mZ)();
            function step() {
                logText.value = (0,log/* getLogText */.mZ)();
                requestID = globalThis.requestAnimationFrame(step);
            }
            requestID = globalThis.requestAnimationFrame(step);
        });
        (0,external_Vue_.onUnmounted)(() => {
            if (requestID) {
                globalThis.cancelAnimationFrame(requestID);
            }
        });
        return { logText };
    },
    template: `<div class="log"><pre v-html="logText" id="novel-downloader-log"></per></div>`,
}));

;// CONCATENATED MODULE: ./src/ui/setting.html
// Module
var setting_code = "<div> <dialog-ui dialog-title=\"设置\" v-bind:status=\"openStatus\" v-on:dialogclose=\"closeSetting\" v-if=\"openStatus === 'true'\"> <div class=\"nd-setting\"> <div class=\"nd-setting-tab\"> <button v-bind:class=\"['tab-button', { active: setting.currentTab === 'tab-1'}]\" v-on:click=\"setting.currentTab = 'tab-1'\"> 基本设置 </button> <button v-bind:class=\"['tab-button', { active: setting.currentTab === 'tab-2'}]\" v-on:click=\"setting.currentTab = 'tab-2'\"> 自定义筛选条件 </button> <button v-if=\"setting.enableTestPage\" v-bind:class=\"['tab-button', { active: setting.currentTab === 'tab-3'}]\" v-on:click=\"setting.currentTab = 'tab-3'\"> 抓取测试 </button> <button v-if=\"setting.enableTestPage\" v-bind:class=\"['tab-button', { active: setting.currentTab === 'tab-4'}]\" v-on:click=\"setting.currentTab = 'tab-4'\"> 日志 </button> </div> <div class=\"nd-setting-body\"> <div id=\"nd-setting-tab-1\" class=\"tab-page\" v-show=\"setting.currentTab === 'tab-1'\"> <div> <input type=\"checkbox\" id=\"debug\" v-model=\"setting.enableDebug\"/> <label for=\"debug\">启用调式模式。（输出更详细日志）</label> <input type=\"checkbox\" id=\"test-page\" v-model=\"setting.enableTestPage\"/> <label for=\"test-page\">启用测试视图</label> </div> <hr class=\"hr-twill-colorful\"/> <div> <h3>自定义保存参数</h3> <ul> <li v-for=\"item of saveOptions\"> <input type=\"radio\" v-bind:id=\"item.key\" v-bind:value=\"item.key\" v-model=\"setting.chooseSaveOption\"/> <label v-bind:for=\"item.key\">{{ item.value }}</label> </li> </ul> </div> </div> <div id=\"nd-setting-tab-2\" class=\"tab-page\" v-show=\"setting.currentTab === 'tab-2'\"> <filter-tab v-on:filterupdate=\"saveFilter\"/> </div> <div v-if=\"setting.enableTestPage\" id=\"nd-setting-tab-3\" class=\"tab-page\" v-show=\"setting.currentTab === 'tab-3'\"> <test-ui></test-ui> </div> <div v-if=\"setting.enableTestPage\" id=\"nd-setting-tab-4\" class=\"tab-page\" v-show=\"setting.currentTab === 'tab-4'\"> <log-ui></log-ui> </div> </div> <div class=\"nd-setting-footer\"> <button v-on:click=\"closeAndSaveSetting\">Save</button> <button v-on:click=\"closeSetting\">Cancel</button> </div> </div> </dialog-ui> </div> ";
// Exports
/* harmony default export */ const setting = (setting_code);
// EXTERNAL MODULE: ./src/ui/setting.less
var ui_setting = __webpack_require__("./src/ui/setting.less");
// EXTERNAL MODULE: ./src/lib/attachments.ts
var attachments = __webpack_require__("./src/lib/attachments.ts");
;// CONCATENATED MODULE: ./src/ui/TestUI.html
// Module
var TestUI_code = "<div> <div id=\"test-page-div\"> <h2>元数据</h2> <table> <tbody> <tr v-for=\"(value, key) in metaData\"> <td>{{ key }}</td> <td v-html=\"getData(key, value)\"></td> </tr> </tbody> </table> <hr class=\"hr-edge-weak\"/> <h2>章节测试</h2> <div class=\"preview-chapter-setting\"> <label for=\"chapterNumber\">预览章节序号：</label> <input type=\"text\" id=\"chapterNumber\" v-model=\"chapterNumber\"/> </div> <div v-if=\"this.isSeenChapter(chapter)\"> <h4> <a v-bind:href=\"chapter.chapterUrl\" target=\"_blank\" rel=\"noopener noreferrer\">{{ chapter.chapterName }}</a> </h4> <div class=\"chapter\" v-html=\"getChapterHtml(chapter)\"></div> </div> <div v-else> <p v-if=\"this.isChapterFailed(chapter)\">章节加载失败！</p> <p v-else>正在加载章节中……</p> </div> </div> </div> ";
// Exports
/* harmony default export */ const TestUI = (TestUI_code);
// EXTERNAL MODULE: ./src/ui/TestUI.less
var ui_TestUI = __webpack_require__("./src/ui/TestUI.less");
;// CONCATENATED MODULE: ./src/ui/TestUI.ts







/* harmony default export */ const src_ui_TestUI = ((0,external_Vue_.defineComponent)({
    name: "TestUI",
    setup() {
        const book = (0,external_Vue_.reactive)({});
        async function waitBook() {
            while (true) {
                await (0,misc/* sleep */._v)(500);
                if (window._book) {
                    return window._book;
                }
            }
        }
        const metaData = (0,external_Vue_.reactive)({});
        function getData(key, value) {
            if (key === "封面") {
                return `<img src="${value[0]}" alt="${value[1]}">`;
            }
            if (key === "简介" && value instanceof HTMLElement) {
                return value.outerHTML;
            }
            if (key === "网址" && typeof value === "string") {
                return `<a href="${value}">${value}</a>`;
            }
            return value;
        }
        const chapter = (0,external_Vue_.reactive)({});
        const chapterNumber = (0,external_Vue_.ref)(-99);
        function getInitChapterNumber() {
            if (book) {
                const chapters = book.chapters;
                const cns = chapters
                    .filter((c) => c.status !== main/* Status.aborted */.qb.aborted)
                    .map((c) => c.chapterNumber);
                cns.sort();
                return cns.slice(-3)[0];
            }
        }
        async function initChapter(n) {
            const chapters = book.chapters;
            const _chapter = chapters.filter((c) => c.chapterNumber === n)[0];
            if (_chapter) {
                if (_chapter.status === main/* Status.pending */.qb.pending) {
                    await _chapter.init();
                    Object.assign(chapter, _chapter);
                }
                else {
                    Object.assign(chapter, _chapter);
                }
            }
        }
        (0,external_Vue_.watch)(chapterNumber, (value, oldValue) => {
            if (typeof value === "string") {
                value = parseInt(value, 10);
            }
            if (typeof oldValue === "string") {
                oldValue = parseInt(oldValue, 10);
            }
            if (oldValue !== value) {
                if (value !== -99) {
                    initChapter(value);
                }
            }
        });
        function isSeenChapter(_chapter) {
            return _chapter.status === main/* Status.finished */.qb.finished;
        }
        function isChapterFailed(_chapter) {
            return (_chapter.status === main/* Status.failed */.qb.failed || _chapter.status === main/* Status.aborted */.qb.aborted);
        }
        function getChapterHtml(_chapter) {
            const imgs = _chapter.contentHTML?.querySelectorAll("img");
            if (imgs) {
                Array.from(imgs).forEach((img) => {
                    const url = img.alt;
                    img.src = getObjectUrl(url);
                });
            }
            return _chapter.contentHTML?.outerHTML;
        }
        (0,external_Vue_.onMounted)(async () => {
            const _book = await waitBook();
            Object.assign(book, _book);
            const coverUrl = _book?.additionalMetadate?.cover?.url ?? "";
            const coverSrc = coverUrl ? getObjectUrl(coverUrl) : "";
            const _metaData = {
                封面: [coverSrc, coverUrl],
                题名: _book?.bookname ?? "None",
                作者: _book?.author ?? "None",
                网址: _book?.bookUrl,
                简介: _book?.introductionHTML ?? "",
            };
            Object.assign(metaData, _metaData);
            const cn = getInitChapterNumber();
            if (cn) {
                chapterNumber.value = cn;
            }
        });
        function getObjectUrl(url) {
            const attachment = (0,attachments/* getAttachmentClassCache */.gc)(url);
            if (attachment?.imageBlob) {
                const blob = attachment.imageBlob;
                const src = URL.createObjectURL(blob);
                return src;
            }
            return "";
        }
        return {
            metaData,
            getData,
            chapter,
            isSeenChapter,
            isChapterFailed,
            getChapterHtml,
            chapterNumber,
        };
    },
    template: TestUI,
}));
const TestUI_style = (0,dom/* createStyle */.wj)(ui_TestUI/* default */.Z);

;// CONCATENATED MODULE: ./src/ui/setting.ts












const setting_style = (0,dom/* createStyle */.wj)(ui_setting/* default */.Z);
const el = (0,dom/* createEl */.ut)(`<div id="setting"></div>`);
const vm = (0,external_Vue_.createApp)({
    name: "nd-setting",
    components: { "filter-tab": src_ui_FilterTab, "log-ui": LogUI, "test-ui": src_ui_TestUI },
    setup() {
        const setting = (0,external_Vue_.reactive)({});
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
        setting.enableDebug = src_setting/* enableDebug.value */.Cy.value;
        setting.chooseSaveOption = "null";
        setting.enableTestPage = false;
        setting.currentTab = "tab-1";
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
            setting.filterSetting = (0,misc/* deepcopy */.X8)(filterSetting);
        };
        const getFilterSetting = () => {
            if (setting.filterSetting) {
                return setting.filterSetting;
            }
            else {
                return;
            }
        };
        (0,external_Vue_.provide)("getFilterSetting", getFilterSetting);
        const setConfig = (config) => {
            setEnableDebug();
            setCustomSaveOption();
            setCustomFilter();
            function setEnableDebug() {
                if (typeof config.enableDebug === "boolean") {
                    config.enableDebug ? external_log_default().setLevel("trace") : external_log_default().setLevel("info");
                    src_setting/* enableDebug.value */.Cy.value = config.enableDebug;
                    if (config.enableDebug) {
                        debug();
                    }
                    external_log_default().info(`[Init]enableDebug: ${src_setting/* enableDebug.value */.Cy.value}`);
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
                        const filterFunction = getFilterFunction(config.filterSetting.arg, config.filterSetting.functionBody);
                        if (filterFunction) {
                            const chapterFilter = (chapter) => {
                                if (chapter.status === main/* Status.aborted */.qb.aborted) {
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
        const openStatus = (0,external_Vue_.ref)("false");
        const openSetting = () => {
            settingBackup = (0,misc/* deepcopy */.X8)(setting);
            openStatus.value = "true";
        };
        const closeSetting = (keep) => {
            if (keep === true) {
                settingBackup = (0,misc/* deepcopy */.X8)(setting);
            }
            else {
                Object.assign(setting, settingBackup);
            }
            openStatus.value = "false";
        };
        const closeAndSaveSetting = async () => {
            closeSetting(true);
            await (0,misc/* sleep */._v)(30);
            setConfig((0,misc/* deepcopy */.X8)(setting));
            external_log_default().info("[Init]自定义设置：" + JSON.stringify(setting));
        };
        return {
            openStatus,
            openSetting,
            closeSetting,
            closeAndSaveSetting,
            saveFilter,
            setting,
            saveOptions,
        };
    },
    template: setting,
}).mount(el);

;// CONCATENATED MODULE: ./src/ui/button.ts










const button_style = (0,dom/* createStyle */.wj)(src_ui_button/* default */.Z, "button-div-style");
const button_el = (0,dom/* createEl */.ut)('<div id="nd-button"></div>');
const button_vm = (0,external_Vue_.createApp)({
    data() {
        return {
            imgStart: src_setting/* iconStart0 */.cl,
            imgSetting: src_setting/* iconSetting */.d7,
            isSettingSeen: GM/* _GM_info.scriptHandler */._p.scriptHandler !== "Greasemonkey",
            imgJump: src_setting/* iconJump */.y6,
            uiObj: {},
        };
    },
    methods: {
        startButtonClick() {
            if (window.downloading) {
                alert("正在下载中，请耐心等待……");
                return;
            }
            const self = this;
            self.imgStart = src_setting/* iconStart1 */.wE;
            async function run() {
                const ruleClass = await getRule();
                await ruleClass.run();
            }
            run()
                .then(() => {
                self.imgStart = src_setting/* iconStart0 */.cl;
            })
                .catch((error) => external_log_default().error(error));
        },
        settingButtonClick() {
            vm.openSetting();
        },
        jumpButtonClick() {
            this.uiObj.jumpFunction();
        },
    },
    mounted() {
        Object.assign(this.uiObj, getUI()());
    },
    template: ui_button,
});

// EXTERNAL MODULE: ./src/ui/dialog.css
var dialog = __webpack_require__("./src/ui/dialog.css");
;// CONCATENATED MODULE: ./src/ui/dialog.html
// Module
var dialog_code = "<div class=\"overlay\" v-bind:class=\"{ open: myPrivateStatus }\" v-if=\"myPrivateStatus\"></div> <div class=\"out\" v-if=\"myPrivateStatus\"> <div id=\"dialog\" class=\"dialog\" v-bind:class=\"{ open: myPrivateStatus }\"> <div class=\"titlebar\"> <h1 class=\"dialog-title\">{{ dialogTitle }}</h1> <button class=\"dialog-close\" v-on:click=\"dialogClose\">❌</button> </div> <div class=\"body\"> <slot></slot> </div> </div> </div> ";
// Exports
/* harmony default export */ const ui_dialog = (dialog_code);
;// CONCATENATED MODULE: ./src/ui/dialog.ts



/* harmony default export */ const src_ui_dialog = ((0,external_Vue_.defineCustomElement)({
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
    template: ui_dialog,
    styles: [dialog/* default */.Z],
}));

// EXTERNAL MODULE: ./src/ui/progress.ts + 1 modules
var progress = __webpack_require__("./src/ui/progress.ts");
;// CONCATENATED MODULE: ./src/ui/ui.ts







function register() {
    customElements.define("dialog-ui", src_ui_dialog);
}
function ui_init() {
    register();
    button_vm.mount(button_el);
    document.body.appendChild(button_el);
    document.body.appendChild(progress.el);
    document.body.appendChild(el);
    document.head.appendChild(button_style);
    document.head.appendChild(progress/* style */.o);
    document.head.appendChild(setting_style);
    document.head.appendChild(FilterTab_style);
    document.head.appendChild(style);
    document.head.appendChild(TestUI_style);
}

;// CONCATENATED MODULE: ./src/index.ts





async function printEnvironments() {
    external_log_default().info("[Init]开始载入小说下载器……");
    Object.entries(await (0,detect/* environments */.Ty)()).forEach((kv) => external_log_default().info("[Init]" + kv.join("：")));
}
async function src_main() {
    init();
    await printEnvironments();
    ui_init();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", (event) => {
        src_main();
    });
}
else {
    src_main();
}

})();

/******/ })()
;