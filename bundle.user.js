// ==UserScript==
// @name           小说下载器
// @version        4.4.4.298
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
// @match          *://www.idejian.com/book/*/
// @match          *://www.wenku8.net/novel/*/*/index.htm
// @match          *://www.dmzj.com/info/*.html
// @match          *://www.westnovel.com/*/*/
// @match          *://www.mht.tw/*/
// @match          *://www.mht99.com/*/
// @match          *://www.dierbanzhu1.com/*_*/
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
// @name:en        novel-downloader
// @description:en An scalable universal novel downloader.
// @namespace      https://blog.bgme.me
// @icon           https://cdn.jsdelivr.net/gh/yingziwu/novel-downloader/assets/icon.png
// @license        AGPL-3.0
// @run-at         document-idle
// @noframes       true
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
// @require        https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.js#sha256-8L3yX9qPmvWSDIIHB3WGTH4RZusxVA0DDmuAo4LjnOE=
// @require        https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js#sha256-xoh0y6ov0WULfXcLMoaA6nZfszdgI8w2CEJ/3k8NBIE=
// @require        https://cdn.jsdelivr.net/npm/nunjucks@3.2.3/browser/nunjucks.min.js#sha256-+CJElYLgP9RjEvMt/VTU1+qF8CuntjliUUBKp26fPck=
// @require        https://cdn.jsdelivr.net/npm/vue@3.2.21/dist/vue.global.prod.js#sha256-/vjXAc6GTRSzj94ZRmI9JLA5vL8Z/fEzwv4ByA6DdI0=
// @downloadURL    https://github.com/yingziwu/novel-downloader/raw/gh-pages/bundle.user.js
// @updateURL      https://github.com/yingziwu/novel-downloader/raw/gh-pages/bundle.meta.js
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

/***/ "./src/ui/ChapterList.css":
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
___CSS_LOADER_EXPORT___.push([module.id, ".section {\n  margin-top: 1.5em;\n  display: grid;\n  grid-template-columns: 32% 32% 32%;\n}\n.section > h2:first-child {\n  grid-column-end: span 3;\n  text-align: center;\n}\n.section > div.chapter {\n  text-align: center;\n  padding-top: 0.5em;\n  padding-bottom: 0.3em;\n  padding-left: 23px;\n  padding-right: 20px;\n  border: 1px solid #d9d9d9;\n  border-radius: 5px;\n  margin-left: 10px;\n  margin-top: 5px;\n  margin-right: 0;\n  margin-bottom: 0;\n}\n.section a.disabled {\n  pointer-events: none;\n  cursor: default;\n}\n.section a {\n  text-decoration: none;\n}\ndiv.chapter.good {\n  background: #41b883;\n}\ndiv.chapter.bad {\n  background: #ff9900;\n}\ndiv.chapter.bad a,\ndiv.chapter.good a {\n  color: white;\n}\ndiv.chapter-list-loading {\n  padding-top: 5em;\n  padding-bottom: 5em;\n  text-align: center;\n}\ndiv.chapter-list {\n  max-height: 320px;\n  overflow-y: scroll;\n}\n", ""]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".filter-setting {\n  padding-top: 0.4em;\n  padding-bottom: 0.8em;\n  text-align: center;\n}\n.filter-setter {\n  margin-top: 2em;\n}\n.filter-description {\n  font-size: larger;\n  color: cornflowerblue;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/ui/button.css":
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
___CSS_LOADER_EXPORT___.push([module.id, ".button-div {\n  position: fixed;\n  top: 15%;\n  right: 5%;\n  z-index: 5000;\n}\n\n.button-div button {\n  border-style: none;\n  text-align: center;\n  vertical-align: baseline;\n  background-color: rgba(128, 128, 128, 0.2);\n  padding: 3px;\n  border-radius: 12px;\n  min-width: auto;\n  min-height: auto;\n}\n\n.button-div img.start {\n  height: 2em;\n}\n.button-div img.setting {\n  height: 1em;\n}\n", ""]);
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
___CSS_LOADER_EXPORT___.push([module.id, ".nd-setting-body * {\n  position: static;\n  opacity: 1;\n}\n.nd-setting-body {\n  background: #e0e0e0;\n  padding: 1em;\n  border-top-right-radius: 3px;\n}\n.nd-setting-footer {\n  background: #e0e0e0;\n  padding-bottom: 0.7em;\n  text-align: center;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.tab-button {\n  padding: 6px 10px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  background: #f0f0f0;\n  margin-bottom: -1px;\n  margin-right: -1px;\n}\n.tab-button:hover {\n  background: #e0e0e0;\n}\n.tab-button.active {\n  background: #e0e0e0;\n}\n.nd-setting-body hr {\n  margin-top: 1.5em;\n}\n", ""]);
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
var code = "<div> <div v-if=\"chapter-list-loading\"> <div class=\"loading\"><h2>正在载入章节列表中，请耐心等待……</h2></div> </div> <div class=\"chapter-list\" v-else> <div v-bind:key=\"sectionObj.sectionNumber\" class=\"section\" v-for=\"sectionObj in sectionsObj\"> <h2 class=\"section-label\" v-if=\"sectionObj.sectionName\"> {{ sectionObj.sectionName }} </h2> <div v-show=\"isSeen(chapter)\" v-bind:key=\"chapter.chapterNumber\" class=\"chapter\" v-for=\"chapter in sectionObj.chpaters\" v-bind:class=\"{\n              good: this.filter(chapter),\n              bad: !this.filter(chapter),\n            }\" v-bind:title=\"chapter.chapterNumber\"> <a v-bind:href=\"chapter.chapterUrl\" v-bind:class=\"{\n                disabled: this.isDisabled(chapter),\n              }\" target=\"_blank\" rel=\"noopener noreferrer\">{{ chapter.chapterName }}</a> </div> </div> </div> </div> ";
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
var code = "<div> <div class=\"filter-setting\"> <div v-if=\"filterType !== 'null'\"> <p>请输入过滤的条件：<input type=\"text\" v-model=\"arg\"/></p> </div> <div class=\"filter-setter\"> <div> <span>当前过滤方法：</span> <select v-model=\"filterType\"> <option v-for=\"filterOption in filterOptionList\" v-bind:value=\"filterOption[0]\"> {{ filterOption[1][\"abbreviation\"] }} </option> </select> </div> <input type=\"checkbox\" id=\"hiddenBad\" v-model=\"hiddenBad\"/> <label for=\"hiddenBad\">只显示符合条件章节</label> <div class=\"filter-description\" v-html=\"filterDescription\"></div> </div> </div> <chapter-list/> </div> ";
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
var code = "<div class=\"button-div\" id=\"button-div\"> <button class=\"start\"> <img class=\"start\" v-bind:src=\"imgStart\" v-on:click=\"startButtonClick\"/> </button> <button class=\"setting\"> <img class=\"setting\" v-bind:src=\"imgSetting\" v-on:click=\"settingButtonClick\"/> </button> </div> ";
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
var code = "<div> <dialog-ui dialog-title=\"设置\" v-bind:status=\"openStatus\" v-on:dialogclose=\"closeSetting\" v-if=\"openStatus === 'true'\"> <div class=\"nd-setting\"> <div class=\"nd-setting-tab\"> <button v-bind:class=\"['tab-button', { active: currentTab === 'tab-1'}]\" v-on:click=\"currentTab = 'tab-1'\"> 基本设置 </button> <button v-bind:class=\"['tab-button', { active: currentTab === 'tab-2'}]\" v-on:click=\"currentTab = 'tab-2'\"> 自定义筛选条件 </button> </div> <div class=\"nd-setting-body\"> <div id=\"nd-setting-tab-1\" class=\"tab-page\" v-show=\"currentTab === 'tab-1'\"> <div> <input type=\"checkbox\" id=\"debug\" v-model=\"setting.enableDebug\"/> <label for=\"debug\">启用调式模式。（输出更详细日志）</label> </div> <hr/> <div> <h3>自定义保存参数</h3> <ul> <li v-for=\"item of saveOptions\"> <input type=\"radio\" v-bind:id=\"item.key\" v-bind:value=\"item.key\" v-model=\"setting.chooseSaveOption\"/> <label v-bind:for=\"item.key\">{{ item.value }}</label> </li> </ul> </div> </div> <div id=\"nd-setting-tab-2\" class=\"tab-page\" v-show=\"currentTab === 'tab-2'\"> <filter-tab v-on:filterupdate=\"saveFilter\"/> </div> </div> <div class=\"nd-setting-footer\"> <button v-on:click=\"closeAndSaveSetting\">Save</button> <button v-on:click=\"closeSetting\">Cancel</button> </div> </div> </dialog-ui> </div> ";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ }),

/***/ "./src/debug.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debug = void 0;
const routers_1 = __webpack_require__("./src/routers.ts");
async function debug() {
    const rule = await (0, routers_1.getRule)();
    const book = await rule.bookParse();
    unsafeWindow.rule = rule;
    unsafeWindow.book = book;
    unsafeWindow.saveAs = saveAs;
    const { parse, fetchAndParse, gfetchAndParse } = await Promise.resolve().then(() => __webpack_require__("./src/rules/lib/readability.ts"));
    const readability = {
        parse: parse,
        fetchAndParse: fetchAndParse,
        gfetchAndParse: gfetchAndParse,
    };
    unsafeWindow.readability = readability;
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
    const targetPrototype = target["prototype"];
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
        new misc_1.localStorageExpired();
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
async function getImageAttachment(url, imgMode = "TM", prefix = "", noMD5 = false) {
    const tmpImageName = Math.random().toString().replace("0.", "");
    let imgClass;
    const imgClassCache = getAttachmentClassCache(url);
    if (imgClassCache) {
        imgClass = imgClassCache;
    }
    else {
        imgClass = new main_1.attachmentClass(url, tmpImageName, imgMode);
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
            throw new main_1.ExpectError("[getImageAttachment] Init Image failed!");
        }
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
const main_1 = __webpack_require__("./src/main.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const blockElements = [
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
const ignoreElements = [
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
    let nodename = _elem.nodeName.toLowerCase();
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
    let tfi = await _formatImage(elem, builder);
    if (!tfi) {
        return;
    }
    let [imgElem, imgText, imgClass] = tfi;
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
    try {
        let noMD5 = false;
        if (builder.option?.keepImageName) {
            noMD5 = true;
        }
        const imgClass = await (0, attachments_1.getImageAttachment)(imageUrl, imgMode, "", noMD5);
        const imageName = imgClass.name;
        const filterdImages = builder.images.find((imgClass) => imgClass.url === elem.src);
        if (!filterdImages) {
            builder.images.push(imgClass);
        }
        const imgElem = document.createElement("img");
        imgElem.setAttribute("data-src-address", imageName);
        imgElem.alt = imageUrl;
        const imgText = `![${imageUrl}](${imageName})`;
        return [imgElem, imgText, imgClass];
    }
    catch (error) {
        if (error instanceof main_1.ExpectError) {
            const imgElem = document.createElement("img");
            imgElem.setAttribute("data-src-address", imageUrl);
            imgElem.alt = imageUrl;
            const imgText = `![${imageUrl}](${imageUrl})`;
            return [imgElem, imgText, null];
        }
        else {
            throw error;
        }
    }
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
        const lastElement = builder.dom.lastElementChild;
        if (lastElement?.nodeName.toLowerCase() === "p") {
            const textElem = document.createTextNode(textContent);
            lastElement.appendChild(textElem);
            const tPText = textContent + "\n".repeat(brCount);
            builder.text = builder.text + tPText;
        }
        else {
            temp0();
            const tPText = textContent + "\n".repeat(brCount);
            builder.text = builder.text + tPText;
        }
    }
    const brCount = elems.filter((elem) => elem.nodeName.toLowerCase() === "br").length;
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
        const previousSibling = getPreviousSibling(elem);
        if (nextSibling === null) {
            if (previousSibling?.nodeName.toLowerCase() === "br") {
                temp0();
                const tPText = textContent + "\n\n";
                builder.text = builder.text + tPText;
                return;
            }
            else if (previousSibling === null &&
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
            if (previousSibling === null) {
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
        const lastElement = builder.dom.lastElementChild;
        if (lastElement?.nodeName.toLowerCase() === "p") {
            const br = document.createElement("br");
            const textElem = document.createTextNode(textContent);
            lastElement.appendChild(br);
            lastElement.appendChild(textElem);
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
    const childNodes = [...findBase(dom, blockElements, ignoreElements)].filter((b) => b);
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
                let elems = [node];
                let j = i + 1;
                let jnodeName = nodeName;
                do {
                    if (j >= childNodes.length) {
                        break;
                    }
                    let jnode = childNodes[j];
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
        imgMode: imgMode,
        option: option,
    };
    await walk(DOM, builder);
    return {
        dom: builder.dom,
        text: builder.text.trim(),
        images: builder.images,
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
function createStyle(style, id = undefined) {
    const el = createEl(`<style>${style}</style>`);
    if (id) {
        el.id = id;
    }
    document.head.appendChild(el);
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
async function getText(url, charset, init = undefined) {
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
async function getHtmlDOM(url, charset, init = undefined) {
    const htmlText = await getText(url, charset, init);
    if (!htmlText) {
        throw new Error("Fetch Content failed!");
    }
    return new DOMParser().parseFromString(htmlText, "text/html");
}
exports.getHtmlDOM = getHtmlDOM;
async function ggetText(url, charset, init = undefined) {
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
            init["responseType"] = "arraybuffer";
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
async function ggetHtmlDOM(url, charset, init = undefined) {
    const htmlText = await ggetText(url, charset, init);
    if (!htmlText) {
        throw new Error("Fetch Content failed!");
    }
    return new DOMParser().parseFromString(htmlText, "text/html");
}
exports.ggetHtmlDOM = ggetHtmlDOM;


/***/ }),

/***/ "./src/lib/misc.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deepcopy = exports.localStorageExpired = exports.calculateMd5 = exports.storageAvailable = exports.sandboxed = exports.sleep = exports.concurrencyRun = exports.rm = void 0;
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
        let x = "__storage_test__";
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
        reader.onloadend = function () {
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
class localStorageExpired {
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
exports.localStorageExpired = localStorageExpired;
function deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepcopy = deepcopy;


/***/ }),

/***/ "./src/lib/zip.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fflateZip = void 0;
const log_1 = __webpack_require__("./src/log.ts");
const fflate_1 = __webpack_require__("./node_modules/fflate/lib/index.cjs");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
class fflateZip {
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
                    throw "[fflateZip] 完成函数出错";
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
    async generateAsync(onUpdate = undefined) {
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
exports.fflateZip = fflateZip;


/***/ }),

/***/ "./src/log.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.log = exports.saveLogTextToFile = exports.logText = void 0;
const setting_1 = __webpack_require__("./src/setting.ts");
const loglevel_1 = __webpack_require__("./node_modules/loglevel/lib/loglevel.js");
exports.log = loglevel_1.default;
if (setting_1.enableDebug.value) {
    loglevel_1.default.setLevel("trace");
}
else {
    loglevel_1.default.setLevel("info");
}
exports.logText = "";
const originalFactory = loglevel_1.default.methodFactory;
loglevel_1.default.methodFactory = function (methodName, logLevel, loggerName) {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);
    return function (message) {
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
        catch (error) { }
        rawMethod(message);
    };
};
loglevel_1.default.setLevel(loglevel_1.default.getLevel());
function saveLogTextToFile() {
    saveAs(new Blob([exports.logText], { type: "text/plain; charset=UTF-8" }), `novel-downloader-${Date.now().toString()}.log`);
}
exports.saveLogTextToFile = saveLogTextToFile;


/***/ }),

/***/ "./src/main.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpectError = exports.attachmentClass = exports.Chapter = exports.Book = exports.Status = void 0;
const setting_1 = __webpack_require__("./src/setting.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const log_1 = __webpack_require__("./src/log.ts");
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
class attachmentClass {
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
        delete headers["Referer"];
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
                throw new Error(`Image request response is not ok!\nImage url: ${this.url} .`);
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
                throw new Error(`Bad response!\nRequest url: ${this.url}`);
            }
        })
            .catch(async (err) => {
            this.retryTime++;
            log_1.log.error(`[attachment]下载 ${this.url} 出错，第${this.retryTime}次重试，下载模式：${this.mode}`);
            if (this.status !== Status.failed && this.retryTime < setting_1.retryLimit) {
                await (0, misc_1.sleep)(this.retryTime * 1500);
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
exports.attachmentClass = attachmentClass;
class ExpectError extends Error {
}
exports.ExpectError = ExpectError;


/***/ }),

/***/ "./src/routers.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRule = void 0;
async function getRule() {
    const host = document.location.host;
    let ruleClass;
    switch (host) {
        case "www.ciweimao.com": {
            const { ciweimao } = await Promise.resolve().then(() => __webpack_require__("./src/rules/ciweimao.ts"));
            ruleClass = ciweimao;
            break;
        }
        case "www.uukanshu.com": {
            const { uukanshu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/uukanshu.ts"));
            ruleClass = uukanshu;
            break;
        }
        case "www.yruan.com": {
            const { yrun } = await Promise.resolve().then(() => __webpack_require__("./src/rules/yruan.ts"));
            ruleClass = yrun;
            break;
        }
        case "www.shuquge.com":
        case "www.sizhicn.com": {
            const { shuquge } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = shuquge();
            break;
        }
        case "www.dingdiann.net": {
            const { dingdiann } = await Promise.resolve().then(() => __webpack_require__("./src/rules/dingdiann.ts"));
            ruleClass = dingdiann;
            break;
        }
        case "www.biquge66.com":
        case "www.lewenn.com":
        case "www.klxs.la":
        case "www.xkzw.org": {
            const { xkzw } = await Promise.resolve().then(() => __webpack_require__("./src/rules/xkzw.ts"));
            ruleClass = xkzw;
            break;
        }
        case "www.266ks.com": {
            const { c226ks } = await Promise.resolve().then(() => __webpack_require__("./src/rules/226ks.ts"));
            ruleClass = c226ks;
            break;
        }
        case "book.sfacg.com": {
            const { sfacg } = await Promise.resolve().then(() => __webpack_require__("./src/rules/sfacg.ts"));
            ruleClass = sfacg;
            break;
        }
        case "www.hetushu.com":
        case "hetushu.com": {
            const { hetushu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/hetushu.ts"));
            ruleClass = hetushu;
            break;
        }
        case "www.shouda8.com":
        case "www.shouda88.com": {
            const { shouda8 } = await Promise.resolve().then(() => __webpack_require__("./src/rules/shouda8.ts"));
            ruleClass = shouda8;
            break;
        }
        case "www.gebiqu.com": {
            const { gebiqu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = gebiqu();
            break;
        }
        case "www.meegoq.com":
        case "www.viviyzw.com": {
            const { meegoq } = await Promise.resolve().then(() => __webpack_require__("./src/rules/meegoq.ts"));
            ruleClass = meegoq;
            break;
        }
        case "www.xiaoshuodaquan.com":
        case "www.1pwx.com":
        case "1pwx.com": {
            const { xiaoshuodaquan } = await Promise.resolve().then(() => __webpack_require__("./src/rules/xiaoshuodaquan.ts"));
            ruleClass = xiaoshuodaquan;
            break;
        }
        case "book.qidian.com": {
            const { qidian } = await Promise.resolve().then(() => __webpack_require__("./src/rules/qidian.ts"));
            ruleClass = qidian;
            break;
        }
        case "www.jjwxc.net": {
            const { jjwxc } = await Promise.resolve().then(() => __webpack_require__("./src/rules/jjwxc.ts"));
            ruleClass = jjwxc;
            break;
        }
        case "www.biquwoo.com":
        case "www.biquwo.org":
        case "www.hongyeshuzhai.com": {
            const { common } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = common();
            break;
        }
        case "www.81book.com":
        case "www.81zw.com": {
            const { c81book } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = c81book();
            break;
        }
        case "book.zongheng.com":
        case "huayu.zongheng.com": {
            const { zongheng } = await Promise.resolve().then(() => __webpack_require__("./src/rules/zongheng.ts"));
            ruleClass = zongheng;
            break;
        }
        case "www.17k.com": {
            const { c17k } = await Promise.resolve().then(() => __webpack_require__("./src/rules/17k.ts"));
            ruleClass = c17k;
            break;
        }
        case "www.shuhai.com":
        case "mm.shuhai.com": {
            const { shuhai } = await Promise.resolve().then(() => __webpack_require__("./src/rules/shuhai.ts"));
            ruleClass = shuhai;
            break;
        }
        case "www.gongzicp.com":
        case "gongzicp.com": {
            const { gongzicp } = await Promise.resolve().then(() => __webpack_require__("./src/rules/gongzicp.ts"));
            ruleClass = gongzicp;
            break;
        }
        case "m.yuzhaige.cc":
        case "m.yushuge123.com": {
            const { yuzhaige } = await Promise.resolve().then(() => __webpack_require__("./src/rules/yuzhaige.ts"));
            ruleClass = yuzhaige;
            break;
        }
        case "www.linovel.net": {
            const { linovel } = await Promise.resolve().then(() => __webpack_require__("./src/rules/linovel.ts"));
            ruleClass = linovel;
            break;
        }
        case "www.xinwanben.com": {
            const { xinwanben } = await Promise.resolve().then(() => __webpack_require__("./src/rules/xinwanben.ts"));
            ruleClass = xinwanben;
            break;
        }
        case "www.tadu.com": {
            const { tadu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/tadu.ts"));
            ruleClass = tadu;
            break;
        }
        case "www.idejian.com": {
            const { idejian } = await Promise.resolve().then(() => __webpack_require__("./src/rules/idejian.ts"));
            ruleClass = idejian;
            break;
        }
        case "www.qimao.com": {
            const { qimao } = await Promise.resolve().then(() => __webpack_require__("./src/rules/qimao.ts"));
            ruleClass = qimao;
            break;
        }
        case "www.wenku8.net": {
            const { wenku8 } = await Promise.resolve().then(() => __webpack_require__("./src/rules/wenku8.ts"));
            ruleClass = wenku8;
            break;
        }
        case "www.dmzj.com": {
            const { dmzj } = await Promise.resolve().then(() => __webpack_require__("./src/rules/dmzj.ts"));
            ruleClass = dmzj;
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
            const { sosadfun } = await Promise.resolve().then(() => __webpack_require__("./src/rules/sosadfun.ts"));
            ruleClass = sosadfun;
            break;
        }
        case "www.westnovel.com": {
            const { westnovel } = await Promise.resolve().then(() => __webpack_require__("./src/rules/westnovel.ts"));
            ruleClass = westnovel;
            break;
        }
        case "www.mht.tw":
        case "www.mht99.com": {
            const { mht } = await Promise.resolve().then(() => __webpack_require__("./src/rules/mht.ts"));
            ruleClass = mht;
            break;
        }
        case "www.dierbanzhu1.com":
        case "www.banzhuer.org": {
            const { dierbanzhu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/dierbanzhu.ts"));
            ruleClass = dierbanzhu;
            break;
        }
        case "www.xbiquge.so": {
            const { xbiquge } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = xbiquge;
            break;
        }
        case "www.linovelib.com": {
            const { linovelib } = await Promise.resolve().then(() => __webpack_require__("./src/rules/linovelib.ts"));
            ruleClass = linovelib;
            break;
        }
        case "www.luoqiuzw.com": {
            const { luoqiuzw } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = luoqiuzw();
            break;
        }
        case "www.yibige.la": {
            const { yibige } = await Promise.resolve().then(() => __webpack_require__("./src/rules/yibige.ts"));
            ruleClass = yibige;
            break;
        }
        case "www.fushuwang.org": {
            const { fushuwang } = await Promise.resolve().then(() => __webpack_require__("./src/rules/fushuwang.ts"));
            ruleClass = fushuwang;
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
            const { soxscc } = await Promise.resolve().then(() => __webpack_require__("./src/rules/soxscc.ts"));
            ruleClass = soxscc;
            break;
        }
        case "www.fuguoduxs.com":
        case "www.shubaowa.org": {
            const { shubaowa } = await Promise.resolve().then(() => __webpack_require__("./src/rules/shubaowa.ts"));
            ruleClass = shubaowa;
            break;
        }
        case "www.xyqxs.cc": {
            const { xyqxs } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = xyqxs();
            break;
        }
        case "www.630shu.net": {
            const { c630shu } = await Promise.resolve().then(() => __webpack_require__("./src/rules/simple/630shu.ts"));
            ruleClass = c630shu;
            break;
        }
        case "www.qingoo.cn": {
            const { qingoo } = await Promise.resolve().then(() => __webpack_require__("./src/rules/qingoo.ts"));
            ruleClass = qingoo;
            break;
        }
        case "www.trxs.cc":
        case "www.trxs123.com":
        case "www.jpxs123.com":
        case "trxs.cc":
        case "trxs123.com":
        case "jpxs123.com": {
            const { trxs } = await Promise.resolve().then(() => __webpack_require__("./src/rules/simple/trxs.ts"));
            ruleClass = trxs();
            break;
        }
        case "www.tongrenquan.org":
        case "www.tongrenquan.me":
        case "tongrenquan.me":
        case "tongrenquan.org": {
            const { tongrenquan } = await Promise.resolve().then(() => __webpack_require__("./src/rules/simple/trxs.ts"));
            ruleClass = tongrenquan();
            break;
        }
        case "www.imiaobige.com": {
            const { imiaobige } = await Promise.resolve().then(() => __webpack_require__("./src/rules/imiaobige.ts"));
            ruleClass = imiaobige;
            break;
        }
        case "www.256wxc.com":
        case "www.256wenku.com": {
            const { c256wxc } = await Promise.resolve().then(() => __webpack_require__("./src/rules/simple/256wxc.ts"));
            ruleClass = c256wxc;
            break;
        }
        case regExpMatch(/lofter\.com$/): {
            const { lofter } = await Promise.resolve().then(() => __webpack_require__("./src/rules/lofter.ts"));
            ruleClass = lofter;
            break;
        }
        case "www.lwxs9.org": {
            const { lwxs9 } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = lwxs9();
            break;
        }
        case "www.shubl.com": {
            const { shubl } = await Promise.resolve().then(() => __webpack_require__("./src/rules/shubl.ts"));
            ruleClass = shubl;
            break;
        }
        case "www.ujxs.net": {
            const { ujxs } = await Promise.resolve().then(() => __webpack_require__("./src/rules/ujxs.ts"));
            ruleClass = ujxs;
            break;
        }
        case "m.haitangtxt.net": {
            const { haitangtxt } = await Promise.resolve().then(() => __webpack_require__("./src/rules/haitangtxt.ts"));
            ruleClass = haitangtxt;
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
            const { longmabook } = await Promise.resolve().then(() => __webpack_require__("./src/rules/longmabook.ts"));
            ruleClass = longmabook;
            break;
        }
        case "dijiubook.net": {
            const { dijiubook } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = dijiubook();
            break;
        }
        case "www.biquwx.la": {
            const { biquwx } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = biquwx();
            break;
        }
        case "www.25zw.com": {
            const { c25zw } = await Promise.resolve().then(() => __webpack_require__("./src/rules/biquge.ts"));
            ruleClass = c25zw;
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

/***/ "./src/rules.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseRuleClass = void 0;
const save_1 = __webpack_require__("./src/save/save.ts");
const main_1 = __webpack_require__("./src/main.ts");
const log_1 = __webpack_require__("./src/log.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
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
            self.book = await self.bookParse();
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
            typeof unsafeWindow.customFinishCallback === "function") {
            const customFinishCallback = unsafeWindow
                .customFinishCallback;
            log_1.log.info(`发现自定义结束回调函数，内容如下：\n${customFinishCallback.toString()}`);
            customFinishCallback();
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
            const saveOptions = unsafeWindow.saveOptions;
            log_1.log.info("[run]发现自定义保存参数，内容如下\n", saveOptions);
            return (0, save_1.getSaveBookObj)(book, saveOptions);
        }
        else {
            return (0, save_1.getSaveBookObj)(book, {});
        }
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
            for (let chapter of chapters) {
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

/***/ "./src/rules/17k.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c17k = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class c17k extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/list/", "/book/");
        const bookname = (document.querySelector("h1.Title")).innerText.trim();
        const author = (document.querySelector("div.Author > a")).innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const introDom = doc.querySelector("#bookInfo p.intro > a");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        let coverUrl = doc.querySelector("#bookCover img.book")
            .src;
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
            const sectionName = (s.querySelector("dt > span.tit")).innerText.trim();
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll("dd > a");
            for (let j = 0; j < cs.length; j++) {
                const a = cs[j];
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
            const chapterName = (doc.querySelector("#readArea > div.readAreaBox.content > h1")).innerText.trim();
            const content = (doc.querySelector("#readArea > div.readAreaBox.content > div.p"));
            if (content) {
                (0, misc_1.rm)("p.copy", false, content);
                (0, misc_1.rm)("#banner_content", false, content);
                (0, misc_1.rm)("div.qrcode", false, content);
                (0, misc_1.rm)("div.chapter_text_ad", false, content);
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
                chapterName: chapterName,
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
exports.c17k = c17k;


/***/ }),

/***/ "./src/rules/226ks.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c226ks = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class c226ks extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href.replace(/index_\d+\.html/, "index_1.html");
        const bookname = (document.querySelector(".info > .top > h1")).innerText.trim();
        const author = (document.querySelector(".info > .top > .fix > p:nth-child(1)")).innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector(".desc");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector(".imgbox > img")
            .src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const indexUrls = Array.from(document.querySelectorAll('[name="pageselect"] > option')).map((opt) => document.location.origin + opt.getAttribute("value"));
        let lis = [];
        for (const indexUrl of indexUrls) {
            log_1.log.debug(`[chapter]请求${indexUrl}`);
            const dom = await (0, http_1.getHtmlDOM)(indexUrl, "UTF-8");
            const ul = dom.querySelector("div.row.row-section > div > div:nth-child(4) > ul");
            if (ul?.childElementCount) {
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
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", {});
            chapters.push(chapter);
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = dom.querySelector("h1.title").innerText.trim();
        const content = dom.querySelector("#content");
        const ad = '<div class="posterror"><a href="javascript:postError();" class="red">章节错误,点此举报(免注册)</a>,举报后维护人员会在两分钟内校正章节内容,请耐心等待,并刷新页面。</div>';
        content.innerHTML = content.innerHTML.replace(ad, "");
        if (content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.c226ks = c226ks;


/***/ }),

/***/ "./src/rules/biquge.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xbiquge = exports.xyqxs = exports.shuquge = exports.dijiubook = exports.c25zw = exports.biquwx = exports.lwxs9 = exports.luoqiuzw = exports.gebiqu = exports.c81book = exports.common = exports.bookParseTemp = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
async function bookParseTemp({ bookUrl, bookname, author, introDom, introDomPatch, coverUrl, chapterListSelector, charset, chapterParse, }) {
    const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, introDomPatch);
    const additionalMetadate = {};
    if (coverUrl) {
        (0, attachments_1.getImageAttachment)(coverUrl, "TM", "cover-")
            .then((coverClass) => {
            additionalMetadate.cover = coverClass;
        })
            .catch((error) => log_1.log.error(error));
    }
    const chapters = [];
    const dl = document.querySelector(chapterListSelector);
    if (dl?.childElementCount) {
        const dlc = Array.from(dl.children);
        if (dlc[0].nodeName === "DT" &&
            (dlc[0].innerText.includes("最新章节") ||
                dlc[0].innerText.includes("最新的八个章节"))) {
            for (let i = 0; i < dl?.childElementCount; i++) {
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
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, chapterParse, charset, { bookname: bookname });
                chapters.push(chapter);
            }
        }
    }
    const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
    return book;
}
exports.bookParseTemp = bookParseTemp;
async function chapterParseTemp({ dom, chapterUrl, chapterName, contenSelector, contentPatch, charset, }) {
    let content = dom.querySelector(contenSelector);
    if (content) {
        content = contentPatch(content);
        let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
        return {
            chapterName: chapterName,
            contentRaw: content,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
        };
    }
    else {
        return {
            chapterName: chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };
    }
}
function mkBiqugeClass(introDomPatch, contentPatch, concurrencyLimit = undefined) {
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
                bookname: (document.querySelector("#info h1:nth-of-type(1)")).innerText
                    .trim()
                    .replace(/最新章节$/, ""),
                author: (document.querySelector("#info > p:nth-child(2)")).innerText
                    .replace(/作(\s+)?者[：:]/, "")
                    .trim(),
                introDom: document.querySelector("#intro"),
                introDomPatch: introDomPatch,
                coverUrl: document.querySelector("#fmimg > img")
                    .src,
                chapterListSelector: "#list>dl",
                charset: document.charset,
                chapterParse: self.chapterParse,
            });
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            return chapterParseTemp({
                dom,
                chapterUrl,
                chapterName: (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim(),
                contenSelector: "#content",
                contentPatch: contentPatch,
                charset,
            });
        }
        overrideConstructor(self) { }
    };
}
const common = () => mkBiqugeClass((introDom) => introDom, (content) => content);
exports.common = common;
const c81book = () => mkBiqugeClass((introDom) => introDom, (content) => content);
exports.c81book = c81book;
const gebiqu = () => mkBiqugeClass((introDom) => {
    introDom.innerHTML = introDom.innerHTML.replace(/如果您喜欢.+，别忘记分享给朋友/g, "");
    (0, misc_1.rm)('a[href^="http://down.gebiqu.com"]', false, introDom);
    return introDom;
}, (content) => {
    content.innerHTML = content.innerHTML.replace(/"www.gebiqu.com"/g, "");
    return content;
});
exports.gebiqu = gebiqu;
const luoqiuzw = () => mkBiqugeClass((introDom) => introDom, (content) => {
    const ad = content.firstElementChild;
    if (ad.innerText.includes("天才一秒记住本站地址：")) {
        ad.remove();
    }
    const ads = ["记住网址m.luoqｉｕｘｚｗ．ｃｏｍ"];
    ads.forEach((adt) => (content.innerHTML = content.innerHTML.replace(adt, "")));
    return content;
});
exports.luoqiuzw = luoqiuzw;
const lwxs9 = () => mkBiqugeClass((introDom) => introDom, (content) => {
    (0, misc_1.rm)("div[align]", false, content);
    return content;
});
exports.lwxs9 = lwxs9;
const biquwx = () => mkBiqugeClass((introDom) => {
    introDom.innerHTML = introDom.innerHTML.replace(/本站提示：各位书友要是觉得《.+》还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！/, "");
    return introDom;
}, (content) => content, 1);
exports.biquwx = biquwx;
class c25zw extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = document.charset;
    }
    async bookParse() {
        const self = this;
        return bookParseTemp({
            bookUrl: document.location.href,
            bookname: (document.querySelector("#info h1:nth-of-type(1)")).innerText
                .trim()
                .replace(/最新章节$/, ""),
            author: (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim(),
            introDom: document.querySelector("#intro"),
            introDomPatch: (introDom) => {
                introDom.querySelector("font")?.parentElement?.remove();
                introDom.innerHTML = introDom.innerHTML.replace("简介:", "");
                return introDom;
            },
            coverUrl: document.querySelector("#fmimg > img").src,
            chapterListSelector: "#list>dl",
            charset: document.charset,
            chapterParse: self.chapterParse,
        });
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        return chapterParseTemp({
            dom,
            chapterUrl,
            chapterName: (dom.querySelector(".zhangjieming > h1")).innerText.trim(),
            contenSelector: "#content",
            contentPatch: (content) => {
                (0, misc_1.rm)(".bottem", false, content);
                return content;
            },
            charset,
        });
    }
}
exports.c25zw = c25zw;
const dijiubook = () => {
    const c = mkBiqugeClass((introDom) => {
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
function mkBiqugeClass2(introDomPatch, contentPatch, concurrencyLimit = undefined) {
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
                author: (document.querySelector(".small > span:nth-child(1)")).innerText
                    .replace(/作(\s+)?者[：:]/, "")
                    .trim(),
                introDom: document.querySelector(".intro"),
                introDomPatch: introDomPatch,
                coverUrl: (document.querySelector(".info > .cover > img")).src,
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
                chapterName: (dom.querySelector(".content > h1:nth-child(1)")).innerText.trim(),
                contenSelector: "#content",
                contentPatch: contentPatch,
                charset,
            });
        }
        overrideConstructor(self) { }
    };
}
const shuquge = () => mkBiqugeClass2((introDom) => {
    introDom.innerHTML = introDom.innerHTML.replace(/推荐地址：https?:\/\/www.shuquge.com\/txt\/\d+\/index\.html/g, "");
    return introDom;
}, (content) => {
    content.innerHTML = content.innerHTML
        .replace("请记住本书首发域名：www.shuquge.com。书趣阁_笔趣阁手机版阅读网址：m.shuquge.com", "")
        .replace(/https?:\/\/www.shuquge.com\/txt\/\d+\/\d+\.html/, "");
    return content;
}, 1);
exports.shuquge = shuquge;
const xyqxs = () => mkBiqugeClass2((introDom) => {
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
class xbiquge extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const self = this;
        return bookParseTemp({
            bookUrl: document.location.href,
            bookname: (document.querySelector("#info > h1:nth-child(1)")).innerText.trim(),
            author: (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim(),
            introDom: document.querySelector("#intro"),
            introDomPatch: (introDom) => introDom,
            coverUrl: document.querySelector("#fmimg > img")?.src,
            chapterListSelector: "#list>dl",
            charset: "GBK",
            chapterParse: self.chapterParse,
        });
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        return chapterParseTemp({
            dom,
            chapterUrl,
            chapterName: (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim(),
            contenSelector: "#content",
            contentPatch: (content) => {
                content.innerHTML = content.innerHTML.replace(`笔趣阁 www.xbiquge.so，最快更新${options.bookname} ！`, "");
                return content;
            },
            charset,
        });
    }
}
exports.xbiquge = xbiquge;


/***/ }),

/***/ "./src/rules/ciweimao.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ciweimao = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class ciweimao extends rules_1.BaseRuleClass {
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
        const bookname = (document.querySelector(".book-catalog .hd h3")).innerText.trim();
        const author = (document.querySelector(".book-catalog .hd > p > a")).innerText.trim();
        const dom = await (0, http_2.getHtmlDOM)(bookUrl, undefined);
        const introDom = dom.querySelector(".book-intro-cnt .book-desc");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = dom.querySelector(".cover > img").src;
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
            const sectionName = s.querySelector(".sub-tit").innerText;
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll(".book-chapter-list > li > a");
            for (let j = 0; j < cs.length; j++) {
                const c = cs[j];
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
        async function getChapterAuthorSay() {
            const doc = await (0, http_2.getHtmlDOM)(chapterUrl, undefined);
            const _chapter_author_says = doc.querySelectorAll("#J_BookCnt .chapter.author_say");
            let div_chapter_author_say;
            if (_chapter_author_says.length !== 0) {
                let hr = document.createElement("hr");
                div_chapter_author_say = document.createElement("div");
                div_chapter_author_say.appendChild(hr);
                for (let _chapter_author_say of Array.from(_chapter_author_says)) {
                    (0, misc_1.rm)("i", true, _chapter_author_say);
                    div_chapter_author_say.appendChild(_chapter_author_say);
                }
            }
            return div_chapter_author_say;
        }
        const chapter_id = chapterUrl.split("/").slice(-1)[0];
        async function publicChapter() {
            async function chapterDecrypt(chapter_id, refererUrl) {
                const rootPath = "https://www.ciweimao.com/";
                const access_key_url = rootPath + "chapter/ajax_get_session_code";
                const chapter_content_url = rootPath + "chapter/get_book_chapter_detail_info";
                log_1.log.debug(`[Chapter]请求 ${access_key_url} Referer ${refererUrl}`);
                const access_key_obj = await (0, http_1.gfetch)(access_key_url, {
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
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                const chapter_access_key = access_key_obj
                    .chapter_access_key;
                log_1.log.debug(`[Chapter]请求 ${chapter_content_url} Referer ${refererUrl}`);
                const chapter_content_obj = await (0, http_1.gfetch)(chapter_content_url, {
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
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                if (chapter_content_obj.code !== 100000) {
                    log_1.log.error(chapter_content_obj);
                    throw new Error(`下载 ${refererUrl} 失败`);
                }
                return decrypt({
                    content: chapter_content_obj.chapter_content,
                    keys: chapter_content_obj.encryt_keys,
                    accessKey: chapter_access_key,
                });
            }
            const div_chapter_author_say = await getChapterAuthorSay();
            let content = document.createElement("div");
            let decryptDate = await chapterDecrypt(chapter_id, chapterUrl);
            content.innerHTML = decryptDate;
            (0, misc_1.rm)(".chapter span", true, content);
            if (div_chapter_author_say) {
                content.appendChild(div_chapter_author_say);
            }
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
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
                async function vipChapterDecrypt(chapter_id, refererUrl) {
                    const HB = unsafeWindow.HB;
                    const parentWidth = 871;
                    const setFontSize = "14";
                    const image_session_code_url = HB.config.rootPath + "chapter/ajax_get_image_session_code";
                    log_1.log.debug(`[Chapter]请求 ${image_session_code_url} Referer ${refererUrl}`);
                    const image_session_code_object = await (0, http_1.gfetch)(image_session_code_url, {
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
                    if (image_session_code_object.code !==
                        100000) {
                        log_1.log.error(image_session_code_object);
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
                }
                const div_chapter_author_say = await getChapterAuthorSay();
                const vipCHapterImageUrl = await vipChapterDecrypt(chapter_id, chapterUrl);
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
                const vipCHapterName = `vipCHapter${chapter_id}.png`;
                const vipCHapterImage = new main_1.attachmentClass(vipCHapterImageUrl, vipCHapterName, "TM");
                if (vipCHapterImageBlob) {
                    vipCHapterImage.imageBlob = vipCHapterImageBlob;
                    vipCHapterImage.status = main_1.Status.finished;
                }
                const contentImages = [vipCHapterImage];
                let ddom, dtext, dimages;
                if (div_chapter_author_say) {
                    let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(div_chapter_author_say, "TM");
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
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
exports.ciweimao = ciweimao;


/***/ }),

/***/ "./src/rules/dierbanzhu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dierbanzhu = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class dierbanzhu extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
        const author = (document.querySelector("#info > p:nth-child(2)")).innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img")
            .src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const dl = document.querySelector("#list>dl");
        if (dl?.childElementCount) {
            const dlc = Array.from(dl.children);
            const chapterList = dlc.filter((obj) => obj !== undefined);
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionName = null;
            let sectionChapterNumber = 0;
            for (let i = 0; i < chapterList.length; i++) {
                const node = chapterList[i];
                if (node.nodeName === "DT" && !node.innerText.includes("最新章节")) {
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
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
        const content = dom.querySelector("#content");
        if (content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.dierbanzhu = dierbanzhu;


/***/ }),

/***/ "./src/rules/dingdiann.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dingdiann = void 0;
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const biquge_1 = __webpack_require__("./src/rules/biquge.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class dingdiann extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const self = this;
        return (0, biquge_1.bookParseTemp)({
            bookUrl: document.location.href,
            bookname: (document.querySelector("#info > h1:nth-child(1)")).innerText.trim(),
            author: (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim(),
            introDom: document.querySelector("#intro"),
            introDomPatch: (introDom) => introDom,
            coverUrl: document.querySelector("#fmimg > img").src,
            chapterListSelector: "#list>dl",
            charset: "UTF-8",
            chapterParse: self.chapterParse,
        });
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        return (0, common_1.nextPageParse)(chapterName, chapterUrl, charset, "#content", (_content, doc) => {
            (0, misc_1.rm)("div[align]", false, _content);
            (0, misc_1.rm)("script", true, _content);
            const removelist = [
                "一秒记住，精彩小说无弹窗免费阅读！",
                "&lt;/a　:&gt;",
                "--&gt;&gt;",
                "本章未完，点击下一页继续阅读",
            ];
            removelist.forEach((removeStr) => (_content.innerHTML = _content.innerHTML.replaceAll(removeStr, "")));
            (0, cleanDOM_1.htmlTrim)(_content);
            return _content;
        }, (doc) => doc.querySelector(".bottem2 > a:nth-child(4)")
            .href, (_content, nextLink) => _content.innerText.includes("本章未完，点击下一页继续阅读"));
    }
}
exports.dingdiann = dingdiann;


/***/ }),

/***/ "./src/rules/dmzj.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dmzj = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class dmzj extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".comic_deCon > h1 > a")).innerText.trim();
        const author = (document.querySelector(".comic_deCon_liO > li:nth-child(1)")).innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector(".comic_deCon_d");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = (document.querySelector(".comic_i_img > a > img")).src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        let cos = document.querySelectorAll("div.zj_list_con:nth-child(4) > ul.list_con_li > li");
        let chapterNumber = 0;
        for (const co of Array.from(cos)) {
            chapterNumber++;
            const a = co.firstElementChild;
            const span = a.lastElementChild;
            const chapterName = span.innerText;
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
        function getpicUrlList(doc) {
            const img_prefix = "https://images.dmzj.com/";
            let pages = (0, misc_1.sandboxed)(doc.querySelector("head > script").innerText +
                ";return pages;");
            pages = pages.replace(/\n/g, "");
            pages = pages.replace(/\r/g, "|");
            const info = (0, misc_1.sandboxed)("return (" + pages + ")");
            if (info) {
                const picUrlList = info["page_url"]
                    .split("|")
                    .map((pic) => img_prefix + pic);
                return picUrlList;
            }
        }
        log_1.log.debug(`[Chapter]请求 ${chapterUrl}`);
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
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        return {
            chapterName: chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
        };
    }
}
exports.dmzj = dmzj;


/***/ }),

/***/ "./src/rules/fushuwang.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fushuwang = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
class fushuwang extends rules_1.BaseRuleClass {
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
        const [bookname, author] = (document.querySelector(".title_info > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > h1:nth-child(1)")).innerText.split("——");
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
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.fushuwang = fushuwang;


/***/ }),

/***/ "./src/rules/gongzicp.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gongzicp = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class gongzicp extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookId = (document.querySelector("span.id")).innerText.replace("CP", "");
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
        function cpDecrypt(content_orig) {
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
                    iv: iv,
                };
            };
            const encrypt = (value, key, cfg) => {
                if ("string" != typeof value) {
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
            let LCngpxaF_substr;
            if (_CP_NUXT) {
                LCngpxaF_substr = _CP_NUXT.state.CpST.LCngpxaF.substr(2, 10);
            }
            else {
                LCngpxaF_substr = (unsafeWindow).__NUXT__.state.CpST.LCngpxaF.substr(1, 10);
            }
            const iv = setIv("iGzsYn");
            const key = setKey(LCngpxaF_substr);
            const cfg = setcfg(iv);
            const content = decrypt(content_orig, key, cfg);
            return content;
        }
        function randomWalker() {
            log_1.log.info("[chapter]随机翻页中……");
            if (document.location.pathname.includes("novel")) {
                (document.querySelector(".chapter-list > .chapter > a")).click();
            }
            if (document.location.pathname.includes("read")) {
                const rightMenu = document.querySelector(".right-menu");
                if (rightMenu?.childElementCount === 6) {
                    (document.querySelector(".right-menu > div:nth-child(3) > a:nth-child(1)")).click();
                }
                else if (rightMenu?.childElementCount === 7) {
                    if (document.querySelector("div.content.unpaid")) {
                        (document.querySelector(".right-menu > div:nth-child(3) > a:nth-child(1)")).click();
                    }
                    else if (Math.random() < 0.3) {
                        (document.querySelector(".right-menu > div:nth-child(3) > a:nth-child(1)")).click();
                    }
                    else {
                        (document.querySelector(".right-menu > div:nth-child(4) > a:nth-child(1)")).click();
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
                const result = await fetch(url, {
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
                if (result.data.chapterInfo.content.length !== 0 &&
                    result.data.chapterInfo.content.length < 30) {
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
                    return result;
                }
            }
            const result = await getChapterInfo(chapterGetInfoUrl.toString());
            if (result.code === 200) {
                const chapterInfo = result.data.chapterInfo;
                if (chapterInfo.chapterPrice !== 0 &&
                    chapterInfo.content.length === 0) {
                    return {
                        chapterName: chapterName,
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
                        chapterName: chapterName,
                        contentRaw: contentRaw,
                        contentText: contentText,
                        contentHTML: contentHTML,
                        contentImages: null,
                        additionalMetadate: null,
                    };
                }
            }
            return {
                chapterName: chapterName,
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
exports.gongzicp = gongzicp;


/***/ }),

/***/ "./src/rules/haitangtxt.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.haitangtxt = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const haitangtxtImageDecode_1 = __webpack_require__("./src/rules/lib/haitangtxtImageDecode.ts");
const log_1 = __webpack_require__("./src/log.ts");
class haitangtxt extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = (document.querySelector("div.currency_head > h1 > a")).href;
        const bookId = bookUrl.split("/").slice(-2, -1)[0];
        log_1.log.debug(`[chapter]请求 ${bookUrl}`);
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, "UTF-8");
        const bookname = (dom.querySelector("div.cataloginfo > h3")).innerText.trim();
        const author = (dom.querySelector(".infotype > p:nth-child(1) > a:nth-child(1)")).innerText.trim();
        const introDom = dom.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            (0, misc_1.rm)("span:nth-child(1)", false, introDom);
            return introDom;
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
            const indexUrls = [];
            const maxPageNumber = Number(getMaxPageNumber());
            for (let i = 1; i <= maxPageNumber; i++) {
                const indexUrl = [
                    document.location.origin,
                    document.location.pathname.split("/")[1],
                    `${bookId}_${i}`,
                ].join("/") + "/";
                indexUrls.push(indexUrl);
            }
            return indexUrls;
        };
        const indexUrls = getIndexUrls();
        let lis = [];
        for (const indexUrl of indexUrls) {
            log_1.log.debug(`[chapter]请求 ${indexUrl}`);
            const dom = await (0, http_1.getHtmlDOM)(indexUrl, "UTF-8");
            const ul = dom.querySelector("ul.chapters");
            if (ul?.childElementCount) {
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
                let childNode = [];
                if (Array.from(dom.querySelectorAll("script")).filter((s) => s.src.includes("/17mb/js/article.js")).length) {
                    for (let i = 0; i < e.length; i++) {
                        let k = UpWz(e[i], i);
                        childNode[k] = contentRaw.childNodes[i];
                    }
                    for (const node of childNode) {
                        if (node.nodeType != 1) {
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
            const nextLink = (dom.querySelector(".novelbutton .p1.p3 > a:nth-child(1)")).href;
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
            let { dom: oldDom, text: _text, images: finalImages, } = await (0, cleanDOM_1.cleanDOM)(content, "TM", { keepImageName: true });
            const _newDom = document.createElement("div");
            _newDom.innerHTML = (0, haitangtxtImageDecode_1.replaceHaitangtxtImage)(content.innerHTML);
            let { dom: newDom, text: finalText, images, } = await (0, cleanDOM_1.cleanDOM)(_newDom, "TM", { keepImageName: true });
            const fontStyleDom = document.createElement("style");
            fontStyleDom.innerHTML = `.hide { display: none; }`;
            oldDom.className = "hide";
            const finalDom = document.createElement("div");
            finalDom.appendChild(fontStyleDom);
            finalDom.appendChild(oldDom);
            finalDom.appendChild(newDom);
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: finalText,
                contentHTML: finalDom,
                contentImages: finalImages,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.haitangtxt = haitangtxt;


/***/ }),

/***/ "./src/rules/hetushu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hetushu = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class hetushu extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".book_info > h2")).innerText.trim();
        const author = (document.querySelector(".book_info > div:nth-child(3) > a:nth-child(1)")).innerText.trim();
        const introDom = document.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = (document.querySelector(".book_info > img")).src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const chapterList = (document.querySelector("#dir")?.childNodes);
        if (chapterList && chapterList.length !== 0) {
            let chapterNumber = 0;
            let sectionNumber = 0;
            let sectionName = null;
            let sectionChapterNumber = 0;
            for (let i = 0; i < chapterList.length; i++) {
                const node = chapterList[i];
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
            let path, bid, sid, position;
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
                const token_dict = atob(token)
                    .split(/[A-Z]+%/)
                    .map((v) => Number(v));
                const this_body = dom.querySelector("#content");
                let b = 0, star = 0;
                for (let i = 0; i < this_body.childNodes.length; i++) {
                    if (this_body.childNodes[i].nodeName == "H2") {
                        star = i + 1;
                    }
                    if (this_body.childNodes[i].nodeName == "DIV" &&
                        this_body.childNodes[i].className != "chapter") {
                        break;
                    }
                }
                const this_childNode = [];
                for (let i = 0; i < token_dict.length; i++) {
                    if (token_dict[i] < 5) {
                        this_childNode[token_dict[i]] = this_body.childNodes[i + star];
                        b++;
                    }
                    else {
                        this_childNode[token_dict[i] - b] = this_body.childNodes[i + star];
                    }
                }
                for (let i = 0; i < this_childNode.length; i++) {
                    if (!this_childNode[i]) {
                        continue;
                    }
                    this_body.appendChild(this_childNode[i]);
                }
            }
        }
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector("#content .h2")).innerText.trim();
        await sorfPage();
        const content = dom.querySelector("#content");
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
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.hetushu = hetushu;


/***/ }),

/***/ "./src/rules/idejian.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.idejian = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class idejian extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.maxRunLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const _bookID = bookUrl.match(/\/(\d+)\/$/);
        const bookID = _bookID && _bookID[1];
        const bookname = (document.querySelector(".detail_bkname > a")).innerText.trim();
        const _author = document.querySelector(".detail_bkauthor")
            .childNodes[0];
        let author = "佚名";
        if (_author && _author.textContent) {
            author = _author.textContent.trim();
        }
        const introDom = document.querySelector(".brief_con");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = (document.querySelector(".book_img > img")).src;
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
            const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, "UTF-8", { bookID: bookID });
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
        let doc = await (0, http_1.ggetHtmlDOM)(chapterUrl, charset, {
            headers: { "User-Agent": fakeUA, Referer: referUrl },
        });
        chapterName = (doc.querySelector(".text-title-1")).innerText.trim();
        let content;
        if (doc.querySelectorAll("div.h5_mainbody").length === 1) {
            content = doc.querySelector("div.h5_mainbody");
        }
        else {
            content = doc.querySelectorAll("div.h5_mainbody")[1];
        }
        if (content) {
            (0, misc_1.rm)("h1", false, content);
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.idejian = idejian;


/***/ }),

/***/ "./src/rules/imiaobige.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.imiaobige = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class imiaobige extends rules_1.BaseRuleClass {
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
        const bookname = (doc.querySelector(".booktitle > h1")).innerText.trim();
        const author = (doc.querySelector("#author > a")).innerText.trim();
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
            for (let j = 0; j < cs.length; j++) {
                const a = cs[j];
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = a.innerText.trim();
                const chapterUrl = a.href;
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, false, false, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, { bookname: bookname });
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const bookname = options.bookname;
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector(".title > h1:nth-child(1)")).innerText.trim();
        const content = dom.querySelector("#content");
        if (content) {
            content.innerHTML = content.innerHTML.replace(`<p>您可以在百度里搜索“${bookname} 妙笔阁(imiaobige.com)”查找最新章节！</p>`, "");
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.imiaobige = imiaobige;


/***/ }),

/***/ "./src/rules/jjwxc.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jjwxc = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const jjwxcFontDecode_1 = __webpack_require__("./src/rules/lib/jjwxcFontDecode.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class jjwxc extends rules_1.BaseRuleClass {
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
        let additionalMetadate = {};
        let author = "佚名";
        let introduction = null;
        let introductionHTML = null;
        let introCleanimages = null;
        if (!getInformationBlocked()) {
            bookname = (document.querySelector('h1[itemprop="name"] > span')).innerText.trim();
            author = (document.querySelector("td.sptd h2 a span")).innerText
                .replace(/作\s+者:/, "")
                .trim();
            const introDom = document.querySelector("#novelintro");
            [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
            if (introCleanimages) {
                additionalMetadate.attachments = [...introCleanimages];
            }
            let coverUrl = (document.querySelector(".noveldefaultimage")).src;
            if (coverUrl) {
                (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                    .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                    .catch((error) => log_1.log.error(error));
            }
            let tags = (document.querySelector("table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(1) > span:nth-child(2)")).innerText.split("-");
            tags = tags.concat(Array.from(document.querySelectorAll("div.smallreadbody:nth-child(3) > span > a")).map((a) => a.innerText));
            const perspective = (document.querySelector("table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(2)")).innerText.replace("\n", "");
            const workStyle = (document.querySelector("table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(3)")).innerText.replace("\n", "");
            tags.push(perspective);
            tags.push(workStyle);
            additionalMetadate.tags = tags;
        }
        else {
            window.scrollTo(0, document.body.scrollHeight);
            await (0, misc_1.sleep)(3000);
            bookname = (document.querySelector("td[id^=comment_] span.coltext > a"))?.innerText
                .trim()
                .replace(/《|》/g, "");
            window.scrollTo(0, 0);
            if (!bookname) {
                throw new Error("抓取书名出错");
            }
            const authorPageUrl = (document.querySelector("#oneboolt > tbody > tr:nth-child(1) > td > div > h2 > a"))?.href;
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
        for (let i = 0; i < trList.length; i++) {
            const tr = trList[i];
            if (tr.getAttribute("bgcolor")) {
                sectionNumber++;
                sectionChapterNumber = 0;
                sectionName = (tr.querySelector("b.volumnfont"))?.innerText.trim();
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
            const dom = await (0, http_2.getHtmlDOM)(chapterUrl, charset);
            const chapterName = (dom.querySelector("div.noveltext h2")).innerText.trim();
            const content = dom.querySelector("div.noveltext");
            if (content) {
                (0, misc_1.rm)("hr", true, content);
                const rawAuthorSayDom = content.querySelector(".readsmall");
                let authorSayDom, authorSayText;
                if (rawAuthorSayDom) {
                    let { dom: adom, text: atext, images: aimages, } = await (0, cleanDOM_1.cleanDOM)(rawAuthorSayDom, "TM");
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
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            return {
                chapterName: chapterName,
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
                    let fontName, fontUrl;
                    if (s.sheet) {
                        const f = s.sheet.cssRules[s.sheet.cssRules.length - 2];
                        const m1 = f.cssText.match(/jjwxcfont_[\d\w]+/);
                        const m2 = f.cssText.match(/{(.*)}/);
                        if (m1 && m2) {
                            fontName = m1[0];
                            const ft = m2[1];
                            for (const k of ft.split(",")) {
                                if (k.includes('format("woff2")')) {
                                    const m3 = k.match(/url\("(.*)"\)\s/);
                                    if (m3) {
                                        fontUrl = document.location.protocol + m3[1];
                                        return [fontName, fontUrl];
                                    }
                                }
                            }
                        }
                    }
                    const _fontName = document.querySelector("div.noveltext")?.classList[1];
                    if (_fontName) {
                        fontName = _fontName;
                        fontUrl =
                            document.location.protocol +
                                `//static.jjwxc.net/tmp/fonts/${fontName}.woff2?h=my.jjwxc.net`;
                        return [fontName, fontUrl];
                    }
                    return [null, null];
                }
                let retryTime = 0;
                function fetchFont(fontUrl) {
                    log_1.log.debug(`[Chapter]请求 ${fontUrl} Referer ${chapterUrl} 重试次数 ${retryTime}`);
                    return (0, http_1.gfetch)(fontUrl, {
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
                            log_1.log.error(`[Chapter]请求 ${fontUrl} 失败 Referer ${chapterUrl}`);
                            if (retryTime < setting_1.retryLimit) {
                                retryTime++;
                                return fetchFont(fontUrl);
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
                        fontClassObj = new main_1.attachmentClass(fontUrl, fontFileName, "TM");
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
            const isPaid = () => {
                if (!dom.querySelector("#buy_content") &&
                    dom.querySelector("div.noveltext")) {
                    return true;
                }
                else {
                    return false;
                }
            };
            if (isPaid()) {
                const chapterName = (dom.querySelector("div.noveltext h2")).innerText.trim();
                const content = dom.querySelector("div.noveltext");
                if (content) {
                    (0, misc_1.rm)("hr", true, content);
                    const rawAuthorSayDom = content.querySelector(".readsmall");
                    let authorSayDom, authorSayText;
                    if (rawAuthorSayDom) {
                        let { dom: adom, text: atext, images: aimages, } = await (0, cleanDOM_1.cleanDOM)(rawAuthorSayDom, "TM");
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
                        chapterName: chapterName,
                        contentRaw: content,
                        contentText: finalText,
                        contentHTML: finalDom,
                        contentImages: images,
                        additionalMetadate: null,
                    };
                }
            }
            return {
                chapterName: chapterName,
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
exports.jjwxc = jjwxc;


/***/ }),

/***/ "./src/rules/lib/common.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mkRuleClass1 = exports.nextPageParse = exports.introDomHandle = void 0;
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const log_1 = __webpack_require__("./src/log.ts");
async function introDomHandle(introDom, domPatch = undefined) {
    if (introDom === null) {
        return [null, null, null];
    }
    else {
        if (domPatch) {
            introDom = domPatch(introDom.cloneNode(true));
        }
        let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = await (0, cleanDOM_1.cleanDOM)(introDom, "TM");
        return [introCleantext, introCleanDom, introCleanimages];
    }
}
exports.introDomHandle = introDomHandle;
async function nextPageParse(chapterName, chapterUrl, charset, selector, contentPatch, getNextPage, continueCondition) {
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
    let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
    return {
        chapterName: chapterName,
        contentRaw: content,
        contentText: text,
        contentHTML: dom,
        contentImages: images,
        additionalMetadate: null,
    };
}
exports.nextPageParse = nextPageParse;
function mkRuleClass1(optionis) {
    const { bookUrl, bookname, author, introDom, introDomPatch, coverUrl, cos, getContent, contentPatch, } = optionis;
    return class extends rules_1.BaseRuleClass {
        constructor() {
            super();
            this.imageMode = "TM";
            this.charset = document.charset;
        }
        async bookParse() {
            const [introduction, introductionHTML, introCleanimages] = await introDomHandle(introDom, introDomPatch);
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
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, null, null, null, this.chapterParse, this.charset, { bookname: bookname });
                chapters.push(chapter);
            }
            const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
            return book;
        }
        async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
            const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            let content = getContent(doc);
            if (content) {
                content = contentPatch(content);
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
exports.mkRuleClass1 = mkRuleClass1;


/***/ }),

/***/ "./src/rules/lib/haitangtxtImageDecode.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceHaitangtxtImage = void 0;
function replaceHaitangtxtImage(inputText) {
    let outputText = inputText;
    for (const imageFilename in imageTable) {
        const normalCharacter = imageTable[imageFilename];
        const imageHTML = `<img src="${document.location.origin}/wzbodyimg/${imageFilename}">`;
        outputText = outputText.replaceAll(imageHTML, normalCharacter);
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
const idb_keyval_1 = __webpack_require__("./node_modules/idb-keyval/dist/index.js");
const setting_1 = __webpack_require__("./src/setting.ts");
const log_1 = __webpack_require__("./src/log.ts");
async function replaceJjwxcCharacter(fontName, inputText) {
    let outputText = inputText;
    const jjwxcFontTable = await getJjwxcFontTable(fontName);
    if (jjwxcFontTable) {
        for (const jjwxcCharacter in jjwxcFontTable) {
            const normalCharacter = jjwxcFontTable[jjwxcCharacter];
            outputText = outputText.replaceAll(jjwxcCharacter, normalCharacter);
        }
        outputText = outputText.replaceAll("‌\u200c", "");
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

/***/ "./src/rules/lib/readability.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gfetchAndParse = exports.fetchAndParse = exports.parse = void 0;
const readability_1 = __webpack_require__("./node_modules/@mozilla/readability/index.js");
const http_1 = __webpack_require__("./src/lib/http.ts");
function parse(doc, options = undefined) {
    return new readability_1.Readability(doc, options).parse();
}
exports.parse = parse;
async function fetchAndParse(url, charset, init = undefined, patch = (doc) => doc, options = undefined) {
    let doc = await (0, http_1.getHtmlDOM)(url, charset, init);
    doc = patch(doc);
    return parse(doc, options);
}
exports.fetchAndParse = fetchAndParse;
async function gfetchAndParse(url, charset, init = undefined, patch = (doc) => doc, options = undefined) {
    let doc = await (0, http_1.ggetHtmlDOM)(url, charset, init);
    doc = patch(doc);
    return parse(doc, options);
}
exports.gfetchAndParse = gfetchAndParse;


/***/ }),

/***/ "./src/rules/lib/yuzhaigeImageDecode.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceYuzhaigeImage = void 0;
function replaceYuzhaigeImage(inputText) {
    let outputText = inputText;
    for (const imageFilename in imageTable) {
        const normalCharacter = imageTable[imageFilename];
        const imageHTML = `<img src="${document.location.origin}/wzbodyimg/${imageFilename}">`;
        outputText = outputText.replaceAll(imageHTML, normalCharacter);
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
exports.linovel = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class linovel extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".book-title")).innerText.trim();
        const author = (document.querySelector(".author-frame > .novelist > div:nth-child(3) > a")).innerText.trim();
        const introDom = document.querySelector(".about-text");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const attachmentsUrlList = [];
        const coverUrl = (document.querySelector(".book-cover > a")).href;
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
            const sectionName = (s.querySelector(".volume-info > h2.volume-title > a")).innerText.trim();
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll(".chapter-list > .text-content-actual div.chapter");
            for (let j = 0; j < cs.length; j++) {
                const div = cs[j];
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
            const chapterName = (doc.querySelector(".article-title")).innerText.trim();
            const content = doc.querySelector(".article-text");
            if (content) {
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
                chapterName: chapterName,
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
exports.linovel = linovel;


/***/ }),

/***/ "./src/rules/linovelib.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.linovelib = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class linovelib extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href.replace(/\/catalog$/, ".html");
        const bookname = (document.querySelector(".book-meta > h1")).innerText.trim();
        const author = (document.querySelector(".book-meta > p:nth-child(2) > span:nth-child(1) > a:nth-child(2)")).innerText.trim();
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
        for (let i = 0; i < liList.length; i++) {
            const node = liList[i];
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
        return (0, common_1.nextPageParse)(chapterName, chapterUrl, charset, "#TextContent", (_content, doc) => {
            const s = Array.from(doc.querySelectorAll("script")).find((s) => s.innerHTML.includes('document.getElementById("chapter_last")'));
            if (s) {
                const _dom_nr = s.innerText.trim().match(/let dom_nr = '(.+)';/);
                if (_dom_nr) {
                    const dom_nr = _dom_nr[1];
                    doc.getElementById("chapter_last").innerHTML =
                        dom_nr;
                }
            }
            (0, misc_1.rm)(".tp", true, _content);
            (0, misc_1.rm)(".bd", true, _content);
            return _content;
        }, (doc) => doc.querySelector(".mlfy_page > a:nth-child(5)")
            .href, (_content, nextLink) => new URL(nextLink).pathname.includes("_"));
    }
}
exports.linovelib = linovelib;


/***/ }),

/***/ "./src/rules/lofter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lofter = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const log_1 = __webpack_require__("./src/log.ts");
class lofter extends rules_1.BaseRuleClass {
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
            const getIndexPageNumber = (url) => {
                const _pageNumber = new URL(url).searchParams.get("page") ?? "1";
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
            const chapter = new main_1.Chapter(bookUrl, bookname, pageUrl, i, null, false, false, null, null, null, this.chapterParse, "UTF-8", { author: author });
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
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
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
            chapterName = (doc.querySelector("#title"))?.innerText.trim();
            const content = doc.querySelector("#m-cnt .long-text");
            if (content) {
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
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
exports.lofter = lofter;


/***/ }),

/***/ "./src/rules/longmabook.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.longmabook = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
class longmabook extends rules_1.BaseRuleClass {
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
            [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        }
        const additionalMetadate = {};
        const coverUrl = (document.querySelector("#mypages > div:nth-child(8) > div:nth-child(1) > img"))?.src.replace("_s.", "_b.");
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
            const liList = [];
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
                        .filter((page) => page);
                    pageMax = Math.max(...pages);
                    page++;
                    if (page !== 1 && page <= pageMax) {
                        showbooklistParams["pages"] = page.toString();
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
                liList.push(..._liList);
            } while (flag);
            return liList;
        }
        const chapters = [];
        const liList = await getLiList();
        let chapterNumber = 0;
        let sectionNumber = 0;
        let sectionName = null;
        let sectionChapterNumber = 0;
        for (let i = 0; i < liList.length; i++) {
            const li = liList[i];
            const uk_icon = li.querySelector("span")?.getAttribute("uk-icon");
            if (uk_icon === "folder") {
                const _sectionName = (li.querySelector("b > font"))?.innerText.trim();
                if (_sectionName !== sectionName) {
                    sectionName = _sectionName;
                    sectionNumber++;
                    sectionChapterNumber = 0;
                }
            }
            else if (uk_icon === "file-text") {
                chapterNumber++;
                sectionChapterNumber++;
                const a = li.querySelector("a");
                const chapterName = a?.innerText.trim();
                const chapterUrl = a?.href;
                const isVIP = Boolean(li.innerText.match(/\$[\d\.]+/));
                if (chapterUrl && chapterName) {
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, null, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, { bookId: bookId, bookwritercode: bookwritercode });
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
            chapterName: chapterName,
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
            chapterName: chapterName,
            contentRaw: content,
            contentText: contentText,
            contentHTML: content,
            contentImages: contentImages,
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
                const s = Array.from(doc.querySelectorAll("script")).filter((s) => s.innerText.includes("vercodechk"))[0];
                const m = s.innerText.match(/{\spaperid:\s'(\d+)',\svercodechk:\s'(\w+)'}/);
                if (m?.length === 3) {
                    const [paperid, vercodechk] = m.slice(1);
                    return [paperid, vercodechk];
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
                        paperid: paperid,
                        vercodechk: vercodechk,
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
        function getEgg() { }
    }
}
exports.longmabook = longmabook;


/***/ }),

/***/ "./src/rules/meegoq.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.meegoq = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class meegoq extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 3;
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/book", "/info");
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, "GBK");
        const author = (dom.querySelector("article.info > p.detail.pt20 > i:nth-child(1) > a")).innerText.trim();
        const bookname = (dom.querySelector("article.info > header > h1")).innerText.trim();
        const introDom = dom.querySelector("article.info > p.desc");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            (0, misc_1.rm)("b", false, introDom);
            return introDom;
        });
        const additionalMetadate = {};
        const coverUrl = (dom.querySelector("article.info > div.cover > img")).src;
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
            for (let i = 0; i < chapterList.length; i++) {
                const li = chapterList[i];
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
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector("article > header > h1")).innerText.trim();
        const content = dom.querySelector("#content");
        if (content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.meegoq = meegoq;


/***/ }),

/***/ "./src/rules/mht.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mht = void 0;
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const biquge_1 = __webpack_require__("./src/rules/biquge.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class mht extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const self = this;
        return (0, biquge_1.bookParseTemp)({
            bookUrl: document.location.href,
            bookname: (document.querySelector("#info > h1:nth-child(1)")).innerText.trim(),
            author: (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim(),
            introDom: document.querySelector("#intro"),
            introDomPatch: (introDom) => introDom,
            coverUrl: document.querySelector("#fmimg > img").src,
            chapterListSelector: "#list>dl",
            charset: "UTF-8",
            chapterParse: self.chapterParse,
        });
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        return (0, common_1.nextPageParse)(chapterName, chapterUrl, charset, "#content", (_content, doc) => {
            (0, misc_1.rm)("p[data-id]", true, _content);
            return _content;
        }, (doc) => doc.querySelector(".bottem2 > a:nth-child(4)")
            .href, (_content, nextLink) => new URL(nextLink).pathname.includes("_"));
    }
}
exports.mht = mht;


/***/ }),

/***/ "./src/rules/qidian.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.qidian = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class qidian extends rules_1.BaseRuleClass {
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
        const _csrfToken = unsafeWindow.jQuery.ajaxSettings.data._csrfToken;
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".book-info > h1 > em")).innerText.trim();
        const author = (document.querySelector(".book-info .writer")).innerText
            .replace(/作\s+者:/, "")
            .trim();
        const introDom = document.querySelector(".book-info-detail .book-intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = (document.querySelector("#bookImg > img")).src;
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
            const span = (document.querySelector("#J-catalogCount")).innerText.match(/\d+/);
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
            for (let j = 0; j < cs.length; j++) {
                const c = cs[j];
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
                    _csrfToken: _csrfToken,
                    bookId: bookId,
                    authorId: authorId,
                    chapterId: chapterId,
                    limitFree: limitFree,
                });
                const isLogin = () => {
                    const sign_in_dom = document.querySelector(".sign-in");
                    const sign_out_dom = document.querySelector(".sign-out");
                    if (sign_in_dom && sign_out_dom) {
                        if (Array.from(sign_out_dom.classList).includes("hidden")) {
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
            const dom = await (0, http_2.ggetHtmlDOM)(chapterUrl, charset);
            const chapterName = (dom.querySelector(".j_chapterName > .content-wrap")).innerText.trim();
            const nullObj = {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
            if (dom.querySelector(".vip-limit-wrap")) {
                return nullObj;
            }
            const content = dom.querySelector(".read-content");
            const author_say_wrap = (dom.querySelector(".author-say-wrap"));
            if (content) {
                if (author_say_wrap) {
                    const author_say = author_say_wrap.querySelector("div.author-say > p:nth-child(3)");
                    const hr = document.createElement("hr");
                    content.appendChild(hr);
                    content.appendChild(author_say);
                }
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
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
                    _csrfToken: _csrfToken,
                    bookId: bookId,
                    chapterId: chapterId,
                    authorId: authorId,
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
                        chapterName: chapterName,
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
                        chapterName: chapterName,
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
                chapterName: chapterName,
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
exports.qidian = qidian;


/***/ }),

/***/ "./src/rules/qimao.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.qimao = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class qimao extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        let bookUrl = document.location.href;
        const bookname = (document.querySelector("h2.tit")).innerText.trim();
        const author = (document.querySelector(".p-name > a")).innerHTML.trim();
        const introDom = (document.querySelector(".book-introduction .article"));
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = (document.querySelector(".poster-pic > img")).src;
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
            let doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            chapterName = doc.querySelector(".title").innerText.trim();
            const content = doc.querySelector(".article");
            if (content) {
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
                chapterName: chapterName,
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
exports.qimao = qimao;


/***/ }),

/***/ "./src/rules/qingoo.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.qingoo = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class qingoo extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
    }
    async bookParse() {
        let bookUrl = document.location.href;
        const bookname = (document.querySelector(".title > dl > dd > h1")).innerText.trim();
        const author = document.querySelector("#author").innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector("#allDesc");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = (document.querySelector(".title > dl > dt > img:nth-child(1)")).src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const data = unsafeWindow.data;
        const _linkTemp = (document.querySelector("#chapterItem")?.firstElementChild)?.href;
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
        chapterName = (doc.querySelector("#content > h1")).innerText.trim();
        const content = doc.querySelector("#content");
        if (content) {
            (0, misc_1.rm)("div.header", false, content);
            (0, misc_1.rm)("h1", false, content);
            (0, misc_1.rm)("h6", false, content);
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.qingoo = qingoo;


/***/ }),

/***/ "./src/rules/sfacg.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sfacg = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class sfacg extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/MainIndex/", "");
        const bookname = (document.querySelector("h1.story-title")).innerText.trim();
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const author = (dom.querySelector(".author-name")).innerText.trim();
        const introDom = dom.querySelector(".introduce");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        let coverUrl = (dom.querySelector("#hasTicket div.pic img")).src;
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
            const _beitouUrl = (dom.querySelector(".d-banner"))?.style.backgroundImage.split('"');
            if (_beitouUrl?.length === 3) {
                const beitouUrl = _beitouUrl[1];
                const beitou = new main_1.attachmentClass(beitouUrl, `beitou.${beitouUrl.split(".").slice(-1)[0]}`, "TM");
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
            const sectionName = (s.querySelector(".catalog-title")).innerText
                .replace(`【${bookname}】`, "")
                .trim();
            let sectionChapterNumber = 0;
            const cs = s.querySelectorAll(".catalog-list > ul > li > a");
            for (let j = 0; j < cs.length; j++) {
                const c = cs[j];
                const _chapterName = c.getAttribute("title")?.trim();
                chapterNumber++;
                sectionChapterNumber++;
                const chapterName = _chapterName ? _chapterName : "";
                const chapterUrl = c.href;
                let isVIP = false;
                let isPaid = null;
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
        const chapter_id = chapterUrl.split("/").slice(-2, -1)[0];
        async function publicChapter() {
            const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
            const chapterName = (dom.querySelector("h1.article-title")).innerText.trim();
            const content = dom.querySelector(".article-content");
            if (content) {
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
                function fetchVipChapterImage(vipChapterImageUrl) {
                    log_1.log.debug(`[Chapter]请求 ${vipChapterImageUrl} Referer ${chapterUrl} 重试次数 ${retryTime}`);
                    return fetch(vipChapterImageUrl, {
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
                            log_1.log.error(`[Chapter]请求 ${vipChapterImageUrl} 失败 Referer ${chapterUrl}`);
                            if (retryTime < setting_1.retryLimit) {
                                retryTime++;
                                return fetchVipChapterImage(vipChapterImageUrl);
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
                const vipChapterImage = new main_1.attachmentClass(vipChapterImageUrl, vipChapterName, "naive");
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
                const chapterName = (dom.querySelector("h1.article-title")).innerText.trim();
                const isPaid = dom.querySelector(".pay-section") === null;
                if (isPaid) {
                    const vipChapterDom = (dom.querySelector(".article-content > #vipImage"));
                    if (vipChapterDom) {
                        const vipChapterImageUrl = vipChapterDom.src;
                        const vipChapterName = `vipCHapter${chapter_id}.gif`;
                        const vipChapterImage = await getvipChapterImage(vipChapterImageUrl, vipChapterName);
                        const contentImages = [vipChapterImage];
                        const img = document.createElement("img");
                        img.src = vipChapterName;
                        img.alt = vipChapterImageUrl;
                        const contentHTML = document.createElement("div");
                        contentHTML.appendChild(img);
                        const contentText = `VIP章节，请打开HTML文件查看。\n![${vipChapterImageUrl}](${vipChapterName})`;
                        return {
                            chapterName: chapterName,
                            contentRaw: contentHTML,
                            contentText: contentText,
                            contentHTML: contentHTML,
                            contentImages: contentImages,
                            additionalMetadate: null,
                        };
                    }
                    else {
                        return publicChapter();
                    }
                }
            }
            return {
                chapterName: chapterName,
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
exports.sfacg = sfacg;


/***/ }),

/***/ "./src/rules/shouda8.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouda8 = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class shouda8 extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".bread-crumbs > li:nth-child(4)")).innerText.trim();
        const author = (document.querySelector("div.bookname > h1 > em")).innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            (0, misc_1.rm)(".book_keywords", false, introDom);
            (0, misc_1.rm)("script", true, introDom);
            (0, misc_1.rm)("#cambrian0", false, introDom);
            return introDom;
        });
        const additionalMetadate = {};
        const coverUrl = (document.querySelector(".pic > img:nth-child(1)")).src;
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
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector(".kfyd > h2:nth-child(1)")).innerText.trim();
        const content = dom.querySelector("#content");
        if (content) {
            (0, misc_1.rm)("p:last-child", false, content);
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.shouda8 = shouda8;


/***/ }),

/***/ "./src/rules/shubaowa.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shubaowa = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class shubaowa extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
        const author = (document.querySelector("#info > p:nth-child(2)")).innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img")
            ?.src;
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
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
        const content = dom.querySelector("#content");
        if (content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.shubaowa = shubaowa;


/***/ }),

/***/ "./src/rules/shubl.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shubl = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class shubl extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "UTF-8";
        this.concurrencyLimit = 1;
        this.maxRunLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".book-title > span")).innerText.trim();
        const author = (document.querySelector("div.username")).innerText.trim();
        const introDom = document.querySelector(".book-brief");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            introDom.innerHTML = introDom.innerHTML.replace("简介：", "");
            return introDom;
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
            for (let j = 0; j < cs.length; j++) {
                const c = cs[j];
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
        const chapter_id = chapterUrl.split("/").slice(-1)[0];
        const rootPath = "https://www.shubl.com/";
        async function publicChapter() {
            async function chapterDecrypt(chapter_id, refererUrl) {
                const access_key_url = rootPath + "chapter/ajax_get_session_code";
                const chapter_content_url = rootPath + "chapter/get_book_chapter_detail_info";
                log_1.log.debug(`[Chapter]请求 ${access_key_url} Referer ${refererUrl}`);
                const access_key_obj = await (0, http_1.gfetch)(access_key_url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/javascript, */*; q=0.01",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        Referer: refererUrl,
                        Origin: document.location.origin,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    data: `chapter_id=${chapter_id}`,
                    responseType: "json",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                const chapter_access_key = access_key_obj
                    .chapter_access_key;
                log_1.log.debug(`[Chapter]请求 ${chapter_content_url} Referer ${refererUrl}`);
                const chapter_content_obj = await (0, http_1.gfetch)(chapter_content_url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/javascript, */*; q=0.01",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        Referer: refererUrl,
                        Origin: document.location.origin,
                        "X-Requested-With": "XMLHttpRequest",
                    },
                    data: `chapter_id=${chapter_id}&chapter_access_key=${chapter_access_key}`,
                    responseType: "json",
                })
                    .then((response) => response.response)
                    .catch((error) => log_1.log.error(error));
                if (chapter_content_obj.code !== 100000) {
                    log_1.log.error(chapter_content_obj);
                    throw new Error(`下载 ${refererUrl} 失败`);
                }
                return decrypt({
                    content: chapter_content_obj.chapter_content,
                    keys: chapter_content_obj.encryt_keys,
                    accessKey: chapter_access_key,
                });
            }
            let content = document.createElement("div");
            let decryptDate = await chapterDecrypt(chapter_id, chapterUrl);
            content.innerHTML = decryptDate;
            (0, misc_1.rm)(".chapter span", true, content);
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        async function vipChapter() {
            if (isPaid) {
                async function vipChapterDecrypt(chapter_id, refererUrl) {
                    const parentWidth = 939.2;
                    const setFontSize = "18";
                    const image_session_code_url = rootPath + "chapter/ajax_get_image_session_code";
                    log_1.log.debug(`[Chapter]请求 ${image_session_code_url} Referer ${refererUrl}`);
                    const image_session_code_object = await (0, http_1.gfetch)(image_session_code_url, {
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
                    if (image_session_code_object.code !==
                        100000) {
                        log_1.log.error(image_session_code_object);
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
                    const vipCHapterImageUrl = rootPath +
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
                }
                const vipCHapterImageUrl = await vipChapterDecrypt(chapter_id, chapterUrl);
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
                const vipCHapterName = `vipCHapter${chapter_id}.png`;
                const vipCHapterImage = new main_1.attachmentClass(vipCHapterImageUrl, vipCHapterName, "TM");
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
                let contentText = `VIP章节，请打开HTML文件查看。\n![${vipCHapterImageUrl}](${vipCHapterName})`;
                return {
                    chapterName: chapterName,
                    contentRaw: contentHTML,
                    contentText: contentText,
                    contentHTML: contentHTML,
                    contentImages: contentImages,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
exports.shubl = shubl;


/***/ }),

/***/ "./src/rules/shuhai.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shuhai = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class shuhai extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("div.book-info-bookname > span:nth-child(1)")).innerText.trim();
        const author = (document.querySelector("div.book-info-bookname > span:nth-child(2)")).innerText
            .replace("作者: ", "")
            .trim();
        const introDom = document.querySelector("div.book-info-bookintro") ||
            document.querySelector("div.book-info-bookintro-all");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        let coverUrl = (document.querySelector(".book-cover-wrapper > img")).getAttribute("data-original");
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
        for (let i = 0; i < dsList.length; i++) {
            const node = dsList[i];
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
            const dom = await (0, http_1.ggetHtmlDOM)(chapterUrl, charset);
            const chapterName = (dom.querySelector("div.chapter-name")).innerText
                .replace("正文 ", "")
                .trim();
            const content = (dom.querySelector("#reader-content > div:nth-child(1)"));
            if (content) {
                (0, misc_1.rm)("div.chaper-info", false, content);
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
                chapterName: chapterName,
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
exports.shuhai = shuhai;


/***/ }),

/***/ "./src/rules/simple/256wxc.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c256wxc = void 0;
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
exports.c256wxc = (0, common_1.mkRuleClass1)({
    bookUrl: document.location.href,
    bookname: (document.querySelector(".art_tit")).innerText.trim(),
    author: ((document.querySelector("span.bookinfo:nth-child(1) > a") ??
        document.querySelector("span.bookinfo:nth-child(1)"))).innerText
        .replace(/^作者：/, "")
        .trim(),
    introDom: document.querySelector(".infotype > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: null,
    cos: document.querySelectorAll(".catalog > li > a"),
    getContent: (doc) => doc.querySelector(".book_con"),
    contentPatch: (content) => content,
});


/***/ }),

/***/ "./src/rules/simple/630shu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.c630shu = void 0;
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
exports.c630shu = (0, common_1.mkRuleClass1)({
    bookUrl: document.location.href,
    bookname: (document.querySelector("#info > h1")).innerText.trim(),
    author: (document.querySelector("div.options > span.item:nth-child(1) > a")).innerText.trim(),
    introDom: document.querySelector("#intro"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".img_in > img").src,
    cos: document.querySelectorAll(".zjlist > dd > a"),
    getContent: (doc) => doc.querySelector("#content"),
    contentPatch: (content) => {
        content.innerHTML = content.innerHTML.replace(/恋上你看书网 WWW.630SHU.NET ，最快更新.+最新章节！/, "");
        return content;
    },
});


/***/ }),

/***/ "./src/rules/simple/trxs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tongrenquan = exports.trxs = void 0;
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const trxs = () => (0, common_1.mkRuleClass1)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".infos > h1").innerText
        .split("(")[0]
        .trim(),
    author: (document.querySelector(".date > span > a")).innerText.trim(),
    introDom: document.querySelector(".infos > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".pic > img").src,
    cos: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) => doc.querySelector(".read_chapterDetail"),
    contentPatch: (content) => content,
});
exports.trxs = trxs;
const tongrenquan = () => (0, common_1.mkRuleClass1)({
    bookUrl: document.location.href,
    bookname: document.querySelector(".infos > h1").innerText
        .split("(")[0]
        .trim(),
    author: (document.querySelector(".date > span")).innerText
        .replace("作者：", "")
        .trim(),
    introDom: document.querySelector(".infos > p"),
    introDomPatch: (introDom) => introDom,
    coverUrl: document.querySelector(".pic > img").src,
    cos: document.querySelectorAll("div.book_list > ul.clearfix > li > a"),
    getContent: (doc) => doc.querySelector(".read_chapterDetail"),
    contentPatch: (content) => content,
});
exports.tongrenquan = tongrenquan;


/***/ }),

/***/ "./src/rules/sosadfun.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sosadfun = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
class sosadfun extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.origin + document.location.pathname;
        const bookname = (document.querySelector(".font-1")).innerText.trim();
        const authorDom = (document.querySelector("div.h5:nth-child(1) > div:nth-child(1) > a:nth-child(1)"));
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
            let { dom: introCleanDom, text: introCleantext, images: introCleanimages, } = await (0, cleanDOM_1.cleanDOM)(introDom, "TM");
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
        chapterName = (doc.querySelector("strong.h3")).innerText.trim();
        const content = document.createElement("div");
        const _content = (doc.querySelector(".main-text.no-selection > span[id^=full]"));
        const _authorSay = doc.querySelector(".main-text.no-selection > .grayout");
        if (_content) {
            for (const elem of Array.from(_content.cloneNode(true).children)) {
                content.appendChild(elem);
            }
        }
        if (_content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            if (_authorSay) {
                let { dom: authorSayDom, text: authorySayText, images: authorSayImages, } = await (0, cleanDOM_1.cleanDOM)(_authorSay, "TM");
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
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.sosadfun = sosadfun;


/***/ }),

/***/ "./src/rules/soxscc.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.soxscc = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class soxscc extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".xiaoshuo > h1")).innerText.trim();
        const author = (document.querySelector(".xiaoshuo > h6:nth-child(3) > a")).innerText.trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            (0, misc_1.rm)("span.tags", false, introDom);
            (0, misc_1.rm)("q", true, introDom);
            return introDom;
        });
        const additionalMetadate = {};
        const coverUrl = (document.querySelector(".book_cover > img")).src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const novel_list = document.querySelector("div.novel_list[id]");
        const sections = Array.from(novel_list.children);
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
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, i + 1, sectionChapterNumber, this.chapterParse, "UTF-8", { bookname: bookname });
                chapters.push(chapter);
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const doc = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        const bookname = options.bookname;
        chapterName = (doc.querySelector(".read_title > h1")).innerText.trim();
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
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.soxscc = soxscc;


/***/ }),

/***/ "./src/rules/tadu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tadu = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_2 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class tadu extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        let bookUrl = document.location.href;
        const bookname = (document.querySelector("div.bookNm > a.bkNm")).innerText.trim();
        const author = (document.querySelector("div.authorInfo > a.author > span")).innerText.trim();
        const introDom = (document.querySelector("div.boxCenter.boxT.clearfix > div.lf.lfO > p.intro"));
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = (document.querySelector("a.bookImg > img")).getAttribute("data-src");
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
                const callback = (obj) => {
                    return obj;
                };
                const contentObj = eval(jsonpText);
                if (typeof contentObj === "object") {
                    content.innerHTML = contentObj.content;
                    let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                    return {
                        chapterName: chapterName,
                        contentRaw: content,
                        contentText: text,
                        contentHTML: dom,
                        contentImages: images,
                        additionalMetadate: null,
                    };
                }
            }
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
        async function vipChapter() {
            return {
                chapterName: chapterName,
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
exports.tadu = tadu;


/***/ }),

/***/ "./src/rules/ujxs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ujxs = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class ujxs extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.origin +
            document.location.pathname.replace(/^\/read/, "/book");
        const bookname = (document.querySelector("#smallcons > h1")).innerText.trim();
        const author = (document.querySelector("#smallcons > span:nth-child(3) > a")).innerText.trim();
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
        for (let i = 0; i < liList.length; i++) {
            const li = liList[i];
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
                const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, { bookname: bookname });
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
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.ujxs = ujxs;


/***/ }),

/***/ "./src/rules/uukanshu.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uukanshu = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class uukanshu extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("dd.jieshao_content > h1 > a")).innerText
            .replace("最新章节", "")
            .trim();
        const author = (document.querySelector("dd.jieshao_content > h2 > a")).innerText.trim();
        const introDom = (document.querySelector("dd.jieshao_content > h3"));
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            introDom.innerHTML = introDom.innerHTML
                .replace(/^.+简介：\s+www.uukanshu.com\s+/, "")
                .replace(/\s+https:\/\/www.uukanshu.com/, "")
                .replace(/－+/, "");
            return introDom;
        });
        const additionalMetadate = {};
        const coverUrl = (document.querySelector("a.bookImg > img")).src;
        if (coverUrl) {
            (0, attachments_1.getImageAttachment)(coverUrl, this.imageMode, "cover-")
                .then((coverClass) => {
                additionalMetadate.cover = coverClass;
            })
                .catch((error) => log_1.log.error(error));
        }
        const chapters = [];
        const button = (document.querySelector('span[onclick="javascript:reverse(this);"]'));
        const reverse = unsafeWindow.reverse;
        if (button.innerText === "顺序排列") {
            reverse(button);
        }
        const chapterList = (document.getElementById("chapterList")?.childNodes);
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
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, this.charset, {});
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = dom.querySelector("#timu").innerText.trim();
        const content = dom.querySelector("#contentbox");
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
            for (let r of contentReplace) {
                content.innerHTML = content.innerHTML.replace(r, "");
            }
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.uukanshu = uukanshu;


/***/ }),

/***/ "./src/rules/wenku8.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wenku8 = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class wenku8 extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.charset = "GBK";
    }
    async bookParse() {
        const bookId = document.location.pathname.split("/").slice(-2, -1)[0];
        const bookUrl = [document.location.origin, "book", `${bookId}.htm`].join("/");
        const bookname = (document.querySelector("#title")).innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, "GBK");
        const author = (doc.querySelector("#content > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)")).innerText
            .replace("小说作者：", "")
            .trim();
        const introDom = doc.querySelector("#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(11)");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        let coverUrl = (doc.querySelector("#content > div:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > img:nth-child(1)")).src;
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
        for (let i = 0; i < tdList.length; i++) {
            const td = tdList[i];
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
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.wenku8 = wenku8;


/***/ }),

/***/ "./src/rules/westnovel.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.westnovel = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class westnovel extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector(".btitle > h1 > a")).innerText.trim();
        const author = (document.querySelector(".btitle > em:nth-child(2)")).innerText
            .replace("作者：", "")
            .trim();
        const introDom = document.querySelector(".intro-p > p:nth-child(1)");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        let coverUrl = document.querySelector(".img-img").src;
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
        chapterName = (doc.querySelector("#BookCon > h1:nth-child(1)")).innerText.trim();
        const content = doc.querySelector("#BookText");
        if (content) {
            (0, misc_1.rm)("div.ads", true, content);
            (0, misc_1.rm)("div.link", true, content);
            (0, misc_1.rm)("h4", true, content);
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.westnovel = westnovel;


/***/ }),

/***/ "./src/rules/xiaoshuodaquan.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xiaoshuodaquan = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class xiaoshuodaquan extends rules_1.BaseRuleClass {
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
            bookUrl = (document.querySelector(`.crumbswrap > a:nth-child(${ccount - 2})`)).href;
        }
        const bookname = (document.querySelector("div.dirwraps > h1")).innerText
            .replace("《", "")
            .replace("》", "")
            .trim();
        const author = (document.querySelector(".smallcons > span:nth-child(1) > a:nth-child(1)")).innerText.trim();
        const introDom = document.querySelector(".bookintro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            introDom.innerHTML = introDom.innerHTML.replace("内容简介:", "");
            return introDom;
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
            const sectionName = (sectionNameObj.firstElementChild)?.innerText
                .replace(bookname, "")
                .trim();
            let sectionChapterNumber = 0;
            const cos = sectionObj.querySelectorAll("ul>li>a");
            for (let j = 0; j < cos.length; j++) {
                chapterNumber++;
                sectionChapterNumber++;
                const a = cos[j];
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
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector(".page-body > h1:nth-child(4)")).innerText.trim();
        const _content = dom.querySelector("#content");
        if (_content) {
            (0, misc_1.rm)("div", true, _content);
            (0, misc_1.rm)("script", true, _content);
            const content = document.createElement("div");
            content.innerHTML = _content.innerHTML.replace(/\n/g, "<br/>");
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.xiaoshuodaquan = xiaoshuodaquan;


/***/ }),

/***/ "./src/rules/xinwanben.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xinwanben = void 0;
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const biquge_1 = __webpack_require__("./src/rules/biquge.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
class xinwanben extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const self = this;
        return (0, biquge_1.bookParseTemp)({
            bookUrl: document.location.href,
            bookname: (document.querySelector("#info > h1:nth-child(1)")).innerText.trim(),
            author: (document.querySelector("#info > p:nth-child(2)")).innerText
                .replace(/作(\s+)?者[：:]/, "")
                .trim(),
            introDom: document.querySelector("#intro"),
            introDomPatch: (introDom) => {
                const _bookname = introDom.innerHTML.match(/《(.*)》/);
                let bookname;
                if (_bookname?.length === 2) {
                    bookname = _bookname[1];
                }
                introDom.querySelectorAll("p").forEach((p) => {
                    const adList = [
                        "还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！",
                        "小说免费阅读地址：",
                    ];
                    for (const ad of adList) {
                        if (p.innerText.includes(ad)) {
                            p.remove();
                        }
                    }
                });
                introDom.innerHTML = introDom.innerHTML.replace(`${bookname}小说简介：`, "");
                return introDom;
            },
            coverUrl: document.querySelector("#fmimg > img").src,
            chapterListSelector: "div.box_con:nth-child(5) > div:nth-child(2) > dl:nth-child(1)",
            charset: "UTF-8",
            chapterParse: self.chapterParse,
        });
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        return (0, common_1.nextPageParse)(chapterName, chapterUrl, charset, "#content", (_content, doc) => {
            (0, cleanDOM_1.htmlTrim)(_content);
            return _content;
        }, (doc) => doc.querySelector("#next_url").href, (_content, nextLink) => nextLink.includes("_"));
    }
}
exports.xinwanben = xinwanben;


/***/ }),

/***/ "./src/rules/xkzw.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.xkzw = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class xkzw extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
        const author = (document.querySelector("#info > p:nth-child(2)")).innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector("#intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img")
            .src;
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
            let tmpColumnList = [];
            let tmpChapterList = [];
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
            return [tmpColumnList, tmpChapterList];
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
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        runEval(CryptoJS);
        chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
        const content = dom.querySelector("#content");
        if (content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.xkzw = xkzw;


/***/ }),

/***/ "./src/rules/yibige.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.yibige = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class yibige extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = (document.querySelector("#list_hb > li:nth-child(2) > a:nth-child(1)")).href;
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const bookname = (doc.querySelector(".title > h1:nth-child(1)")).innerText.trim();
        const author = (doc.querySelector("div.xsxq_2:nth-child(2) > a:nth-child(1)")).innerText.trim();
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
        const coverUrl = (doc.querySelector(".limg > img:nth-child(1)")).src;
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
            for (let i = 0; i < chapterList.length; i++) {
                const node = chapterList[i];
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
                    const chapter = new main_1.Chapter(bookUrl, bookname, chapterUrl, chapterNumber, chapterName, isVIP, isPaid, sectionName, sectionNumber, sectionChapterNumber, this.chapterParse, "UTF-8", { bookname: bookname });
                    chapters.push(chapter);
                }
            }
        }
        const book = new main_1.Book(bookUrl, bookname, author, introduction, introductionHTML, additionalMetadate, chapters);
        return book;
    }
    async chapterParse(chapterUrl, chapterName, isVIP, isPaid, charset, options) {
        return (0, common_1.nextPageParse)(chapterName, chapterUrl, charset, "#fontsize", (_content, doc) => {
            (0, misc_1.rm)("div", true, _content);
            (0, misc_1.rm)("script", true, _content);
            _content.innerHTML = _content.innerHTML
                .replaceAll("测试广告1", "")
                .replaceAll("测试广告2", "");
            return _content;
        }, (doc) => doc.querySelector(".nr_fy > a:nth-child(4)").href, (_content, nextLink) => new URL(nextLink).pathname.includes("_"));
    }
}
exports.yibige = yibige;


/***/ }),

/***/ "./src/rules/yruan.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.yrun = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class yrun extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 1;
    }
    async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (document.querySelector("#info > h1:nth-child(1)")).innerText.trim();
        const author = (document.querySelector("#info > p:nth-child(2)")).innerText
            .replace(/作(\s+)?者[：:]/, "")
            .trim();
        const introDom = document.querySelector("#intro > p");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        const coverUrl = document.querySelector("#fmimg > img")
            .src;
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
        const dom = await (0, http_1.getHtmlDOM)(chapterUrl, charset);
        chapterName = (dom.querySelector(".bookname > h1:nth-child(1)")).innerText.trim();
        const content = dom.querySelector("#content");
        if (content) {
            let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: text,
                contentHTML: dom,
                contentImages: images,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.yrun = yrun;


/***/ }),

/***/ "./src/rules/yuzhaige.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.yuzhaige = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const yuzhaigeImageDecode_1 = __webpack_require__("./src/rules/lib/yuzhaigeImageDecode.ts");
const log_1 = __webpack_require__("./src/log.ts");
class yuzhaige extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
    }
    async bookParse() {
        const bookUrl = (document.querySelector("div.currency_head > h1 > a")).href;
        const bookId = bookUrl.split("/").slice(-2, -1)[0];
        log_1.log.debug(`[chapter]请求 ${bookUrl}`);
        const dom = await (0, http_1.getHtmlDOM)(bookUrl, "UTF-8");
        const bookname = (dom.querySelector("div.cataloginfo > h3")).innerText.trim();
        const author = (dom.querySelector(".infotype > p:nth-child(1) > a:nth-child(1)")).innerText.trim();
        const introDom = dom.querySelector(".intro");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom, (introDom) => {
            (0, misc_1.rm)("span:nth-child(1)", false, introDom);
            return introDom;
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
            const indexUrls = [];
            const maxPageNumber = Number(getMaxPageNumber());
            for (let i = 1; i <= maxPageNumber; i++) {
                const indexUrl = [
                    document.location.origin,
                    document.location.pathname.split("/")[1],
                    `${bookId}_${i}`,
                ].join("/") + "/";
                indexUrls.push(indexUrl);
            }
            return indexUrls;
        };
        const indexUrls = getIndexUrls();
        let lis = [];
        for (const indexUrl of indexUrls) {
            log_1.log.debug(`[chapter]请求 ${indexUrl}`);
            const dom = await (0, http_1.getHtmlDOM)(indexUrl, "UTF-8");
            const ul = dom.querySelector("ul.chapters");
            if (ul?.childElementCount) {
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
                let childNode = [];
                if (Array.from(dom.querySelectorAll("script")).filter((s) => s.src.includes("/17mb/js/article.js")).length) {
                    for (let i = 0; i < e.length; i++) {
                        let k = UpWz(e[i], i);
                        childNode[k] = contentRaw.childNodes[i];
                    }
                    for (const node of childNode) {
                        if (node.nodeType != 1) {
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
            const nextLink = (dom.querySelector(".novelbutton .p1.p3 > a:nth-child(1)")).href;
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
            let { dom: oldDom, text: _text, images: finalImages, } = await (0, cleanDOM_1.cleanDOM)(content, "TM", { keepImageName: true });
            const _newDom = document.createElement("div");
            _newDom.innerHTML = (0, yuzhaigeImageDecode_1.replaceYuzhaigeImage)(content.innerHTML);
            let { dom: newDom, text: finalText, images, } = await (0, cleanDOM_1.cleanDOM)(_newDom, "TM", { keepImageName: true });
            const fontStyleDom = document.createElement("style");
            fontStyleDom.innerHTML = `.hide { display: none; }`;
            oldDom.className = "hide";
            const finalDom = document.createElement("div");
            finalDom.appendChild(fontStyleDom);
            finalDom.appendChild(oldDom);
            finalDom.appendChild(newDom);
            return {
                chapterName: chapterName,
                contentRaw: content,
                contentText: finalText,
                contentHTML: finalDom,
                contentImages: finalImages,
                additionalMetadate: null,
            };
        }
        else {
            return {
                chapterName: chapterName,
                contentRaw: null,
                contentText: null,
                contentHTML: null,
                contentImages: null,
                additionalMetadate: null,
            };
        }
    }
}
exports.yuzhaige = yuzhaige;


/***/ }),

/***/ "./src/rules/zongheng.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.zongheng = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const cleanDOM_1 = __webpack_require__("./src/lib/cleanDOM.ts");
const attachments_1 = __webpack_require__("./src/lib/attachments.ts");
const http_1 = __webpack_require__("./src/lib/http.ts");
const rules_1 = __webpack_require__("./src/rules.ts");
const common_1 = __webpack_require__("./src/rules/lib/common.ts");
const log_1 = __webpack_require__("./src/log.ts");
class zongheng extends rules_1.BaseRuleClass {
    constructor() {
        super();
        this.imageMode = "TM";
        this.concurrencyLimit = 5;
    }
    async bookParse() {
        const bookUrl = document.location.href.replace("/showchapter/", "/book/");
        const bookname = (document.querySelector("div.book-meta > h1")).innerText.trim();
        const author = (document.querySelector("div.book-meta > p > span:nth-child(1) > a")).innerText.trim();
        const doc = await (0, http_1.getHtmlDOM)(bookUrl, undefined);
        const introDom = doc.querySelector("div.book-info > div.book-dec");
        const [introduction, introductionHTML, introCleanimages] = await (0, common_1.introDomHandle)(introDom);
        const additionalMetadate = {};
        let coverUrl = doc.querySelector("div.book-img > img")
            .src;
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
            for (let j = 0; j < cs.length; j++) {
                const c = cs[j];
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
            const dom = await (0, http_1.ggetHtmlDOM)(chapterUrl, charset);
            const chapterName = (dom.querySelector("div.title_txtbox")).innerText.trim();
            const content = dom.querySelector("div.content");
            if (content) {
                let { dom, text, images } = await (0, cleanDOM_1.cleanDOM)(content, "TM");
                return {
                    chapterName: chapterName,
                    contentRaw: content,
                    contentText: text,
                    contentHTML: dom,
                    contentImages: images,
                    additionalMetadate: null,
                };
            }
            else {
                return {
                    chapterName: chapterName,
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
                chapterName: chapterName,
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
exports.zongheng = zongheng;


/***/ }),

/***/ "./src/save/save.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSaveBookObj = exports.saveOptionsValidate = exports.getSectionsObj = exports.saveBook = void 0;
const main_1 = __webpack_require__("./src/main.ts");
const zip_1 = __webpack_require__("./src/lib/zip.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const log_1 = __webpack_require__("./src/log.ts");
const main_css_1 = __webpack_require__("./src/save/main.css");
const toc_css_1 = __webpack_require__("./src/save/toc.css");
const template_1 = __webpack_require__("./src/save/template.ts");
const progress_1 = __webpack_require__("./src/ui/progress.ts");
class saveBook {
    constructor(book) {
        this.book = book;
        this.chapters = book.chapters;
        this.savedZip = new zip_1.fflateZip();
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
        let sections = [];
        for (const chapter of this.chapters) {
            const chapterName = this.getchapterName(chapter);
            if (chapter.sectionName && !sections.includes(chapter.sectionName)) {
                sections.push(chapter.sectionName);
                const sectionText = this.genSectionText(chapter.sectionName);
                this.savedTextArray.push(sectionText);
            }
            const chapterText = this.genChapterText(chapterName, chapter.contentText ?? "");
            this.savedTextArray.push(chapterText);
            if (!setting_1.enableDebug.value) {
                chapter.contentText = null;
            }
        }
        log_1.log.info("[save]保存TXT文件");
        const savedText = this.savedTextArray.join("\n").replaceAll("\n", "\r\n");
        saveAs(new Blob([savedText], { type: "text/plain;charset=utf-8" }), `${this.saveFileNameBase}.txt`);
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
                .forEach((c) => this.addChapter(c));
        }
        log_1.log.info("[save]开始保存ZIP文件");
        const self = this;
        self.saveLog();
        return new Promise((resolve, reject) => {
            const finalHandle = (blob) => {
                saveAs(blob, `${self.saveFileNameBase}.zip`);
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
        const sectionsObj = getSectionsObj(self.chapters);
        modifyTocStyleText();
        const indexHtmlText = template_1.index.render({
            creationDate: Date.now(),
            bookname: self.book.bookname,
            tocStyleText: self.tocStyleText,
            author: self.book.author,
            cover: self.book.additionalMetadate.cover,
            introductionHTML: self.book.introductionHTML?.outerHTML,
            bookUrl: self.book.bookUrl,
            sectionsObj: Object.values(sectionsObj),
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
    addChapter(chapter) {
        const chapterName = this.getchapterName(chapter);
        const chapterNumberToSave = this.getChapterNumberToSave(chapter);
        const chapterHtmlFileName = `No${chapterNumberToSave}Chapter.html`;
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
exports.saveBook = saveBook;
function getSectionsObj(chapters) {
    const _sectionsObj = {};
    for (const chapter of chapters) {
        let sectionNumber = null;
        let sectionName = null;
        if (chapter.sectionNumber && chapter.sectionName) {
            sectionNumber = chapter.sectionNumber;
        }
        else {
            sectionNumber = -99999999;
        }
        if (_sectionsObj[sectionNumber]) {
            _sectionsObj[sectionNumber]["chpaters"].push(chapter);
        }
        else {
            _sectionsObj[sectionNumber] = {
                sectionName: chapter.sectionName,
                sectionNumber: chapter.sectionNumber,
                chpaters: [chapter],
            };
        }
    }
    return _sectionsObj;
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
        if (!keyNametest(keyname)) {
            return false;
        }
        if (!(keyNamesStest(keyname) || keyNamesFtest(keyname))) {
            return false;
        }
    }
    return true;
}
exports.saveOptionsValidate = saveOptionsValidate;
function getSaveBookObj(book, options) {
    const saveBookObj = new saveBook(book);
    if (setting_1.enableCustomSaveOptions && saveOptionsValidate(options)) {
        for (const option in options) {
            saveBookObj[option] = options[option];
        }
    }
    if (book.saveOptions !== undefined) {
        for (const option in book.saveOptions) {
            saveBookObj[option] = book.saveOptions[option];
        }
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
const section_html_j2_1 = __webpack_require__("./src/save/section.html.j2");
const chapter_html_j2_1 = __webpack_require__("./src/save/chapter.html.j2");
const index_html_j2_1 = __webpack_require__("./src/save/index.html.j2");
const env = new nunjucks.Environment(undefined, { autoescape: false });
exports.section = new nunjucks.Template(section_html_j2_1.default, env, undefined, true);
exports.chapter = new nunjucks.Template(chapter_html_j2_1.default, env, undefined, true);
exports.index = new nunjucks.Template(index_html_j2_1.default, env, undefined, true);


/***/ }),

/***/ "./src/setting.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.r18SiteList = exports.iconSetting = exports.iconStart1 = exports.iconStart0 = exports.enableJjwxcRemoteFont = exports.enableR18SiteWarning = exports.enableCustomSaveOptions = exports.enableCustomChapterFilter = exports.enableCustomFinishCallback = exports.enableDebug = exports.retryLimit = void 0;
exports.retryLimit = 5;
exports.enableDebug = {
    value: unsafeWindow.enableDebug ?? false,
};
exports.enableCustomFinishCallback = true;
exports.enableCustomChapterFilter = true;
exports.enableCustomSaveOptions = true;
exports.enableR18SiteWarning = false;
exports.enableJjwxcRemoteFont = true;
exports.iconStart0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFYElEQVR4nO2dIUxkORyHP4XD4E6RYNZgUGvWonAnVqxDbbJiNWLNOsQ65Oo1CMQIFAnJJiQIcgY7YhIEbgTJiEkm4USPuyNh3pv2tf33tb9f8kl4fe3H0Pm37xXi50/gHJgBC+C5YB6Bv4AL4CuwH7872skBcI/9oA5lBpwAO1F7p/IcUf5fuy8L4AzYjthPVWYfeMJ+wFLxABxG660K8xv7QcrBWawOqykfsB+YnEzQv4RXOcV+UHJzD+zF6LwaMsF+QCyYo3kBALfYD4YVK+DL8C4cd+6wHwhrfgJbQztyrJEAjhvgj4F9OcrUKMA33Me778/NaLCUXKMA27ivt48BP7vArYU0k1oFAPeRHjrJPQ3u0ZGlZgHATe5+Bv6ecxooGtUuwEuOCVvsugd2vXp0ZGlFAHDL3bOA3zfHzSmqTEsCgNsjcBXwO5e4T5Hq0poA4OYFoWsg1RWNWhTgJZ8ImxdcUdFuo5YFADcvmAZcY0olRaPWBQD313wZcJ0n3Fa6UUcC/JfvAdda4TagjjYS4HWOcF/7fK/5i5FODmvcDzC0eveOsO3xt4xwRVECvJ1t3MMmvtd+AN5HuH62SIDunOC/tLxgREUjCdCf0HnBKFYUJcBm2SNsXnCZqD3RIgE2zzZuidi3PVPcxLLISAD/fMYtDvm0qdht6BIgLIf4zwuWOHmKigQIzy5hhbSiKocSYFi2cFVA3zZ+ytjGztQogMVS7Vf85gVPFLLVrEYBrGbcvlvRJzbNfJ0aBbDc1++7Fd28bFyjAOdRe8g/PlvOfhm18d/UKMCKMjZqHNM/L1hiXCmsUYBn3ILMZ+zX6N/jVgi72mr6KFqtArzwiJtsneE+li3oezLJdNGodgHGgOm3AQlgz03vKCWMBLDnrneUEkYC2CMBGkcCNI4EaBwJ0DgSYEMecE/mbkLIA59NCnCzplElEbqfLvTJXwlQGEN2z+zjv4GzKQFK/xewZPiCTumS6xOgg4cI9xiyZ08CFIIESBwJYI8E6EACJI4EsEcCdCABEkcC2CMBOpAAiSMB7JEAHUiAxJEA9kiADiRA4kgAeyRABxIgcSSAPRKgAwmQOBLAHgnQgQRIHAlgjwToQAIkjgSwRwJ0IAESRwLYYyrA7zWNKgUJkDgSwB4J0IEESBwJYE8zAqxwr0T7webv2Ivxbv2PHtc7xb1qNucDpc0I8DHTPcXIB/yPi5MAHcT4KM+dXH3ThADzXDcUMSHHxEmADr5kuqcYOSJfvzQjwIKCz8/7X3bof8O3BAjkDvtXuPcl5HBICeDB9yx3FpZj8vdHcwKsKOCsnDeyhzvNSwJkYEp5hypfY9MXTQrwjDtJo5ScYNcPzQrwTBmHOx1g+y7BpgV4xJ21Z5Ut8hV8JMAaLpPf5fqcdbRLAmTE4lj1wwHtlQCRyV0l3MHvnF8JkIGcVcLc1T4JsCE5qoQW1T4JsCGpq4RW1b5iBbhe0yhLUlYJS7xfCfAGKaqE3wq4LwngQcxTta2rfRIggDlxqoQlVPskQCAxqoQlVPskwACG7CUspdonAQYQWiUsqdonAQYSUiUsqdonASLgUyUsrdonASKwwj2y1ZcSq30SIBKbVAlLK29LgMh0VQlLrfZJgMi89aRxydU+CRCZOe5g6JfsMo6TwiVARJbABe7r3pgmfRJASAAhAQQSQCABmsdUgKs1jRL5uO0dpYSRAPZMekcpYS7WNErk47R3lBLmx5pGiXyYvi1lDFumaua6f4jS5w77jmiRBa/XM8zyjnHX0sfIkrjPPQzOAeNdTRsbUzbb2ZQ9W7i9dBNghltyjUHrny4r3JtHJ//0b9RH4P8GSxsCzEN/51YAAAAASUVORK5CYII=";
exports.iconStart1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAESElEQVR4nO2cLUxcQRSFv4QgEBiSKgQCh6pCouvQlbVVdaRuTFUNoqaqEkktCoVD4HBITBMMosmaVsxu+kL3l3lv7p13z5ccyc68OSf3sLtvHwghhBBCjJM/hRKNowAERwEIjgIQHAUgOApAcBSA4CgAwVEAgqMABEcBCI4CEBwFIDgKQHAUgOAoAMFRAIKjAARHAQiOAhAcBSA4CkBwFIDgKADBUQCCowAERwEIjgIQHAUgOApAcBSA4CgAzkmUm9SqUvHpjYSEvRky35iEvSky35iEvTky35iEvUky35iEvVky35iEvWky35iEvXky35iEvYky35iEvZky35iEvaky35iEvbky35iEvcky35iEvdky35iEveky35iEzA9PQuaHJyHzm2e78O8T7Zhfeq2j4i1wDvyi/GAT/s1P5Gs9J197SN4An4A7hjlgz+a/fM078lm8KXxt92wDp8BPYEL9g/ZoflcT8tmcMrKK6I54TwfueS/NV8SyEe/54D3uoZmK2GTEt2KA5dov5bYiXjvivRthsea6Mq+Ivka8V0NqrlWqahUx1IjfRGeF15DWWCMVrnG2xhpDaLCKqDHiV+ka+ADs9nA9ack6qYfX3yXv9XrJOkOruCIsRvxLPZANOXztRSwhzVkvDbDO4fR1H+asV0trV4SHEf8M/ABOVm22B1Jn3VRhvRPytT1jc7YLK8LTiN/Z/FyLSNT/Vm8HZxVhtYnZiD8oOc3GOcC+Iqou9gx8p86Ib40T8tnUrogqi1wB76k/4ltkh3xWVzQegHvgM7Df6/HEYp98hvc0EoAn8hg7HuAwonNMPtsnnAVggkZ8TboV0cfb9aIRf4ZGvCX7ZA9KKmLjEf8NjXiPHJO92bQiFICRUCUAqgBfVK+AedI/gXVx80/goorQ28BhcPs2cFlF6IOgMpr7IGiRVBHrM5qPguep5vf9rWF1v0DVxbrS18EBvw5epGv6u+fPOx7uGXQXgJnGXBHWt4Q1EYCuhrwptBYebgptNgBd3dBORcxG/A325zaaAMz0G7gA3gFbaxpSgy3yni7Ie7Q+p9EGoKtH4AtwtNqfwTia7uER+/MIF4CuboCPwN5Su/phb7pWKyM+RABmGqoiWh7xoQLQ1SPwlbKKOJq+RssjPmwAurpl/YqYjfhbB/tWAHrWBLjk/9/HzX4XeYnd7yIVgMqa/T7O+neR1jLfgKQASIYy34CkAEiGcvGACKmu5j5DKPJboQha9BZ4Lh4eEiX1o+LnCKoi2tMgTxJVRfjWRiO+FFWEH5k/TVwVUV/mD4ueh4cHTY5ZVUd8KaqI/mQ+4ktRRWwulyO+FFXEcjU14ktRRfxT8yO+lIgVMcoRX8rYP2gKNeJLGVNFhB/xpbRYERrxA+C9IjTiK+KpIjTijbGoCI14hwxdERrxDdFnRWjEN85rKkIjfoSsqgiN+EB0K0IjXgghhBDh+Avri3imoU6g/AAAAABJRU5ErkJggg==";
exports.iconSetting = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAIxElEQVR4nO2dW4wWRRbHfzArzAIioFxk4oMKjLgqug9k2UUi3g0YYwKId59UXnaj0ejDamLUxTWi8cEbglFJvL7hLfFuHBGNVxBXjFGZWVC8jIoDOzPLTPtwvk+GoafOqe6qntbpf1LJZKrr1L+quqtOnXOqPqhQoUKFChUqVKhQoUKF8uDvQBIoXVUwdzOGDzYBB44JKOtPAWUFRZkHYFZAWUcHlDUk0ADsJNwUtKsms3Qo6xcwAxgVUN4fgcMCyguGsg5AyPm/jlJOQ0NpAI6KIDM3yjoAIRfgOko5AGVFG+5F9fiUMqcrZT6Ozvp3goOAXtydOT6lXJNS5v9AY2Tuv2mcAKwCfsDdkVscMtqVsiuAA+PQ/+3iNGA9dp3+KYes1wzlfwZuASbm4LxfjrJRcASwGXnD5mJb3A8BnsF/U3WTQ+ZdHnI6gFuBA4xtbEBeljXIVzrTWK4QPMvejfsauA9ZGEekPH8x8BP+nZ8ASxw8lmWQtw041yFzFvJibetX7jlHmUKxAHcDfwQeARYDE4B7lOe11OzgMjeH3Bf7yG4CrgY2KGUW+HVVeIwAPsHeSE270dKnuG0643LK7wReB3qMz28m/QsvDFemkAqduoAngFOwrS0n157vKoBbUuuDQcFEdJUxa+pB3sQrgMkZ+U0GrgFaI3Gspx+BSRk55sJ9GchqaTdwP3BoQJ4jkcV5SwS+9bQyIF8TjkU6K2QjNgGzI3IeAVwGfBOYd/3FOTYi933wauAGPAqMLoj7OOBOwr9ALcCwIhqwyEDmv8Db2LSeFUWQTsFsRKuydG478K3hucWxSTcCXxiILKo9fwhwKWI+6E557vbYhBVMRqa+gaaVF4CLEO+c5cVrJawnbx/800DiddI/xQlIY55AzACD3fl1TEZM1X3XomtI12xeQW//dbGINiGGrBCLUZb5fixwHqIlvY0spt219E3tfyuBpcD+nrKbkI6boTxnUT46avKC42Gl4gS4N0K9zcBqJLLBuiDuREzb0yPwsajfa0JX+hdsC+pJAescBdyGOFKsHd8/dSMWz5COmAsN9fYCc0JVOAy7vb49UMXTgY3GOi3pTeDgALwuxf5CvEVAn/vV2A1pP5PvSziOOJulNrJHWwwDbvSs7w4CBz1cht1K2AmclaGO6cTp/L6D4Psl7Ac86FFHD2LDioKlpOvzaWk3cImH7EbgA6PsPOkdJFLOgjHs62zSXrylHm3OhDOB/xkJ9QCXG+XeZpQZIt1g4NMIvO8hs530cJkomA/sMBLrRY9EaMa2uPUCTwMXILGeo2rpcEQ7edrIqQOYonAajl31/ZJB8BHPBr43kNtqkLXaIKcV+KtB1lz0wK4EuNsg612DnPcIo2FlwlHs66zun9YqMsaih6K34tfIqeiD0IHM8S6sUWS04L/r3gt51aSPkFgcF95V8hfiNmAlyML2lQcvLdIBxByiOdU3KfmtiNqdGSH0VC3o9T0lf76S/wywzk7nV7QgGowLJyr52gDkPvoUYgCmKvmblXwtEvpxDy6+ZbW6Ne5a2wuBppJqlk/N0ZHnZMs0RfZ2pfxopfyuHNyCQdsda2eztPCRPA4OrQM7lfJ/UMrvzsENKOaARpKzfB4/ayE+2jwIMQBdSr4WObZDyc8aFwT6ZusnJX+kkt/twSUVIQagQ8nXOvBzJf9vHlx8y2p1a56tnR5cUhFiAFwHJkAPsvpQyT/Hg0t/aIYxrW5XIDDYdvlOhBgA7S06Usl/WclfgJgXfDEPCY934SUl/89K/n/sdOJgDOJtcmkKqxUZ+6ObItrw07mbkNikvKaItYqMHcCpHryCYgo2Y9UHBlmrDHLasH0J89A7P8EWz7nVIKcbP79HEMzEFqCVIGZmzQEyHbuj51kkvmgaouePrv19MXbnSRf6Bm+SUVaCmMmvV+QFw/HYzND19D42i+GtHjLzpuXGtl6L36GSVcjmLRrOxi8+50Xsh+Aa0deTEGkdun7fF4uwewAT4HnExB4c/8DulE+Ah/A/zjmFuAcqtpItam0+chDDWs+HGetJxXAkxMKnoTeS3QxwDDaPlm9qJd+NKUd78tpEIFPIMCTIyFLpbuxOeBcmYjt07TPtaGYJC6Zid9S7zjN7Yw62xejCgHU2ItELHYZ6B0pdwL/wm/M1nGCodzsR1gHNP5oggauhMQVxoPsMREeNS4xbsl4y1L8sQr00oXeCJTx9BhIK7rtIjUHsQvcisarbkTe8q/b3euQQ+BL0HW4aLCHzC9E7/2MiqqLXGQiknZUajwS2trBnKvuUSHH0GbAcUTVfQLS9tPWiAQlC0Nq/MCZRnyNKI5EoOteh6TIMwnLSv+QW5KTMtNpzlnsoXimC8GIDkW/R7+7pOwgxj6e6sMLAr5c9J3Jcz/WgW0+DIfQx1V7kBM5BBfEfAzwWuA0PFsQdiHNQO0HessuJewHGHMSOH5L3LuREaKFYGYD4QGkLMueG1N+nAQ8Q58W5OSBPMybhZx/JktqQhTDPhR1XAG/gZ8fySVE2XVYUcV1Nwp4ra042cBqOXG1T1JU1UTZdVoxAwvcsROtX0HQanx8ojXPwacB+/cBAycf+H3XTZYV2ZdkG5JBfXd9vRjY8WTvI5ZZsziE3QS79m4Co2o+g32sXddPlg+fYm9g2RMd2Bb8uxeZz9fnkl2SQlyBr2fkp8kYCZyAKx/Z+ZbRojkIxE7k9aw1ytaP1rv6xwL/xM7Td5ZB3k4ecelqLbTfegDj870BCcQrbdFmR5zLTiYhJwHLuzHUg5ClD+Xp6A9uiPqRwILp5oN1RXruW7Afkso95cej/PtCIfmIybcoYr5TppThThxll/P2ATuAz5Zm0Y1HaNQRtwHeZGA1BPEk+dXKgxbZ0KOMXAOL4CA0tEnpQMJQGYEMEmblR1gHYGEFmKQegrGjALwRSS9UPuXmih7CHHzbWZJYOZR0ACDsNlXIBhnIPQMiFuJr/K1SoUKFChQoVKlSoUBr8Ah3QujNKRJdpAAAAAElFTkSuQmCC";
exports.r18SiteList = [
    "www.dierbanzhu1.com",
    "www.banzhuer.org",
    "m.yuzhaige.cc",
];


/***/ }),

/***/ "./src/stat.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetStat = exports.printStat = exports.failedPlus = exports.successPlus = void 0;
const log_1 = __webpack_require__("./src/log.ts");
const GM_1 = __webpack_require__("./src/lib/GM.ts");
const statKeyName = "novel-downloader-22932304826849026";
const domain = document.location.hostname;
const _data = (0, GM_1._GM_getValue)(statKeyName);
let statData;
if (_data) {
    statData = JSON.parse(_data);
}
else {
    statData = { success: {}, failed: {} };
}
const saveData = () => {
    const dataJSON = JSON.stringify(statData);
    if (GM_1._GM_setValue === null ||
        GM_1._GM_getValue === null ||
        GM_1._GM_deleteValue === null) {
        throw new Error("未发现 GM value 相关 API");
    }
    (0, GM_1._GM_setValue)(statKeyName, dataJSON);
    return statData;
};
const dataPlus = (key) => {
    const tmpData = statData[key];
    if (tmpData[domain]) {
        tmpData[domain] = tmpData[domain] + 1;
    }
    else {
        tmpData[domain] = 1;
    }
    return saveData();
};
const successPlus = () => {
    return dataPlus("success");
};
exports.successPlus = successPlus;
const failedPlus = () => {
    return dataPlus("failed");
};
exports.failedPlus = failedPlus;
const printStat = () => {
    log_1.log.info("[stat]小说下载器脚本运行情况统计：");
    log_1.log.info(statData);
    for (const k in statData) {
        log_1.log.info(`[stat]${k}:`);
        const subData = statData[k];
        for (const j in subData) {
            log_1.log.info(`  [stat]${j}: ${subData[j]}`);
        }
    }
};
exports.printStat = printStat;
const resetStat = () => {
    statData = { success: {}, failed: {} };
    return saveData();
};
exports.resetStat = resetStat;


/***/ }),

/***/ "./src/ui/ChapterList.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__("./src/ui/injectVue.ts");
const routers_1 = __webpack_require__("./src/routers.ts");
const main_1 = __webpack_require__("./src/main.ts");
const save_1 = __webpack_require__("./src/save/save.ts");
const ChapterList_html_1 = __webpack_require__("./src/ui/ChapterList.html");
const ChapterList_css_1 = __webpack_require__("./src/ui/ChapterList.css");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const FilterTab_1 = __webpack_require__("./src/ui/FilterTab.ts");
async function getSections() {
    if (window._sections) {
        return window._sections;
    }
    else {
        const rule = await (0, routers_1.getRule)();
        const book = await rule.bookParse();
        window._sections = (0, save_1.getSectionsObj)(book.chapters);
        return window._sections;
    }
}
(0, createEl_1.createStyle)(ChapterList_css_1.default);
exports["default"] = Vue.defineComponent({
    name: "ChapterList",
    inject: ["getHiddenBad", "getFilterOption"],
    data() {
        return {
            Status: main_1.Status,
            sectionsObj: Vue.reactive({}),
            loading: true,
            filterObj: Vue.reactive([]),
            hiddenBad: false,
        };
    },
    methods: {
        filter(chapter) {
            if (chapter.status == this.Status.aborted) {
                return false;
            }
            if (this.filterObj && this.filterObj.length === 2) {
                const filterFunction = (0, FilterTab_1.getFilterFunction)(this.filterObj[0], this.filterObj[1]);
                if (typeof filterFunction === "function") {
                    return filterFunction(chapter);
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        },
        isDisabled(chapter) {
            if (!chapter.chapterUrl) {
                return true;
            }
            return false;
        },
        isSeen(chapter) {
            if (this.hiddenBad && !this.filter(chapter)) {
                return false;
            }
            else {
                return true;
            }
        },
        updateInject() {
            this.updateHiddenBad();
            this.updateFilterObj();
        },
        updateHiddenBad() {
            this.hiddenBad = this.getHiddenBad();
        },
        updateFilterObj() {
            this.filterObj = this.getFilterOption();
        },
    },
    async mounted() {
        this.sectionsObj = await getSections();
        this.loading = false;
        setInterval(() => {
            this.updateInject();
        }, 300);
    },
    template: ChapterList_html_1.default,
});


/***/ }),

/***/ "./src/ui/FilterTab.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFilterFunction = exports.filterOptionDict = exports.getFunctionBody = void 0;
__webpack_require__("./src/ui/injectVue.ts");
const FilterTab_html_1 = __webpack_require__("./src/ui/FilterTab.html");
const FilterTab_css_1 = __webpack_require__("./src/ui/FilterTab.css");
const ChapterList_1 = __webpack_require__("./src/ui/ChapterList.ts");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const setting_1 = __webpack_require__("./src/ui/setting.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
function getFunctionBody(fn) {
    return fn
        .toString()
        .replace("(arg) => {", "")
        .replace(/}$/, "")
        .split("\n")
        .map((l) => l.trim())
        .join(" ")
        .trim();
}
exports.getFunctionBody = getFunctionBody;
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
                return /^[\s\d\-,]+$/.test(arg);
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
                const ss = arg.split(",").map((s) => s.replace(/\s/g, "").trim());
                const booleans = [];
                for (const s of ss) {
                    booleans.push(match(s, n));
                }
                return booleans.some((element) => element === true);
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
    provide() {
        return {
            getFilterOption: this.getFilterOption,
            getHiddenBad: this.getHiddenBad,
        };
    },
    components: { "chapter-list": ChapterList_1.default },
    emits: ["filterupdate"],
    data() {
        return {
            arg: "",
            hiddenBad: true,
            filterOptionDict: exports.filterOptionDict,
            filterOptionList: Object.entries(exports.filterOptionDict),
            filterType: "null",
        };
    },
    computed: {
        functionBody() {
            return getFunctionBody(this.filterOptionDict[this.filterType]["raw"]);
        },
        filterObj() {
            return [this.arg, this.functionBody];
        },
        filterDescription() {
            return this.filterOptionDict[this.filterType]["description"];
        },
        filterSetting() {
            return {
                arg: this.arg.toString(),
                hiddenBad: this.hiddenBad,
                filterType: this.filterType.toString(),
                functionBody: this.functionBody.toString(),
            };
        },
    },
    methods: {
        getFilterOption() {
            return this.filterObj;
        },
        getHiddenBad() {
            return this.hiddenBad;
        },
    },
    mounted() {
        if (!setting_1.vm.setting.filterSetting) {
            return;
        }
        for (const setting of Object.entries((0, misc_1.deepcopy)(setting_1.vm.setting.filterSetting))) {
            this[setting[0]] = setting[1];
        }
    },
    watch: {
        filterSetting: {
            handler(newVal, oldVal) {
                this.$emit("filterupdate", this.filterSetting);
            },
            deep: true,
        },
    },
    template: FilterTab_html_1.default,
});
(0, createEl_1.createStyle)(FilterTab_css_1.default);


/***/ }),

/***/ "./src/ui/button.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vm = exports.el = void 0;
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const setting_1 = __webpack_require__("./src/setting.ts");
const routers_1 = __webpack_require__("./src/routers.ts");
const log_1 = __webpack_require__("./src/log.ts");
const button_html_1 = __webpack_require__("./src/ui/button.html");
const button_css_1 = __webpack_require__("./src/ui/button.css");
const setting_2 = __webpack_require__("./src/ui/setting.ts");
__webpack_require__("./src/ui/injectVue.ts");
(0, createEl_1.createStyle)(button_css_1.default, "button-div-style");
exports.el = (0, createEl_1.createEl)("<div></div>");
async function run() {
    const ruleClass = await (0, routers_1.getRule)();
    await ruleClass.run();
}
exports.vm = Vue.createApp({
    data() {
        return {
            imgStart: setting_1.iconStart0,
            imgSetting: setting_1.iconSetting,
        };
    },
    methods: {
        startButtonClick() {
            if (window.downloading) {
                alert("正在下载中，请耐心等待……");
                return;
            }
            const self = this;
            self["imgStart"] = setting_1.iconStart1;
            run()
                .then(() => {
                self["imgStart"] = setting_1.iconStart0;
            })
                .catch((error) => log_1.log.error(error));
        },
        settingButtonClick() {
            setting_2.vm.openSetting();
        },
    },
    template: button_html_1.default,
}).mount(exports.el);


/***/ }),

/***/ "./src/ui/dialog.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dialog_html_1 = __webpack_require__("./src/ui/dialog.html");
const dialog_css_1 = __webpack_require__("./src/ui/dialog.css");
__webpack_require__("./src/ui/injectVue.ts");
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

/***/ "./src/ui/injectVue.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
unsafeWindow.Vue = Vue;


/***/ }),

/***/ "./src/ui/progress.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vm = exports.el = void 0;
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const progress_css_1 = __webpack_require__("./src/ui/progress.css");
const progress_html_1 = __webpack_require__("./src/ui/progress.html");
__webpack_require__("./src/ui/injectVue.ts");
(0, createEl_1.createStyle)(progress_css_1.default);
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
exports.vm = exports.el = void 0;
__webpack_require__("./src/ui/injectVue.ts");
const createEl_1 = __webpack_require__("./src/lib/createEl.ts");
const misc_1 = __webpack_require__("./src/lib/misc.ts");
const log_1 = __webpack_require__("./src/log.ts");
const setting_html_1 = __webpack_require__("./src/ui/setting.html");
const setting_css_1 = __webpack_require__("./src/ui/setting.css");
const FilterTab_1 = __webpack_require__("./src/ui/FilterTab.ts");
const main_1 = __webpack_require__("./src/main.ts");
(0, createEl_1.createStyle)(setting_css_1.default);
exports.el = (0, createEl_1.createEl)(`<div id="setting"></div>`);
exports.vm = Vue.createApp({
    name: "nd-setting",
    components: { "filter-tab": FilterTab_1.default },
    data() {
        return {
            openStatus: "false",
            saveOptions: [
                { key: "null", value: "不使用自定义保存参数" },
                { key: "chapter_name", value: "将章节名称格式修改为 第xx章 xxxx" },
                { key: "txt_space", value: "txt文档每个自然段前加两个空格" },
                { key: "reverse_chapters", value: "保存章节时倒序排列" },
            ],
            setting: Vue.reactive({}),
            settingBackup: {},
            currentTab: "tab-1",
        };
    },
    methods: {
        openSetting() {
            this.settingBackup = (0, misc_1.deepcopy)(this.setting);
            if (this.openStatus === "true") {
                this.openStatus = "false";
                setTimeout(() => {
                    this.openStatus = "true";
                }, 0);
            }
            else {
                this.openStatus = "true";
            }
        },
        closeSetting(keep) {
            if (keep === true) {
                this.settingBackup = (0, misc_1.deepcopy)(this.setting);
            }
            else {
                this.setting = (0, misc_1.deepcopy)(this.settingBackup);
            }
            if (this.openStatus === "true") {
                this.openStatus = "false";
            }
        },
        closeAndSaveSetting() {
            this.closeSetting(true);
            setTimeout(() => {
                setConfig((0, misc_1.deepcopy)(this.setting))
                    .then(() => log_1.log.info("[Init]自定义设置：" + JSON.stringify(this.setting)))
                    .catch((error) => log_1.log.error(error));
            }, 20);
        },
        saveFilter(filterSetting) {
            this.setting["filterSetting"] = (0, misc_1.deepcopy)(filterSetting);
        },
    },
    template: setting_html_1.default,
}).mount(exports.el);
const saveOptionMap = {
    null: undefined,
    chapter_name: {
        getchapterName: (chapter) => {
            if (chapter.chapterName) {
                return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
            }
            else {
                return `第${chapter.chapterNumber.toString()}章`;
            }
        },
    },
    txt_space: {
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
    reverse_chapters: {
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
};
async function setConfig(setting) {
    if (typeof setting.enableDebug === "boolean") {
        const { enableDebug } = await Promise.resolve().then(() => __webpack_require__("./src/setting.ts"));
        if (setting.enableDebug) {
            enableDebug.value = true;
            log_1.log.setLevel("trace");
        }
        else {
            enableDebug.value = false;
            log_1.log.setLevel("info");
        }
    }
    if (setting.chooseSaveOption && setting.chooseSaveOption !== "null") {
        unsafeWindow.saveOptions = saveOptionMap[setting.chooseSaveOption];
    }
    if (setting.filterSetting && setting.filterSetting.filterType !== "null") {
        if (typeof setting.filterSetting.arg === "string" &&
            setting.filterSetting.functionBody) {
            const filterFunction = (0, FilterTab_1.getFilterFunction)(setting.filterSetting.arg, setting.filterSetting.functionBody);
            if (filterFunction) {
                const chapterFilter = (chapter) => {
                    if (chapter.status == main_1.Status.aborted) {
                        return false;
                    }
                    return filterFunction(chapter);
                };
                unsafeWindow.chapterFilter = chapterFilter;
            }
        }
    }
    else if (setting.filterSetting &&
        setting.filterSetting.filterType === "null") {
        unsafeWindow.chapterFilter = undefined;
    }
}


/***/ }),

/***/ "./src/ui/ui.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
const dialog_1 = __webpack_require__("./src/ui/dialog.ts");
const button_1 = __webpack_require__("./src/ui/button.ts");
const progress_1 = __webpack_require__("./src/ui/progress.ts");
const setting_1 = __webpack_require__("./src/ui/setting.ts");
function register() {
    customElements.define("dialog-ui", dialog_1.default);
}
function init() {
    register();
    document.body.appendChild(button_1.el);
    document.body.appendChild(progress_1.el);
    document.body.appendChild(setting_1.el);
}
exports.init = init;


/***/ }),

/***/ "./node_modules/fflate/lib/index.cjs":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
var node_worker_1 = __webpack_require__("./node_modules/fflate/lib/worker.cjs");
// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
// see fleb note
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
var freb = function (eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new u32(b[30]);
    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return [b, r];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = (function (cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i)
        ++l[cd[i] - 1];
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for (i = 0; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
            }
        }
    }
    return co;
});
// fixed length tree
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
    flt[i] = 8;
for (var i = 144; i < 256; ++i)
    flt[i] = 9;
for (var i = 256; i < 280; ++i)
    flt[i] = 7;
for (var i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max = function (a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
            m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
var bits = function (d, p, m) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function (d, p) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
};
// get end of byte
var shft = function (p) { return ((p + 7) / 8) | 0; };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
/**
 * Codes for errors generated within this library
 */
exports.FlateErrorCode = {
    UnexpectedEOF: 0,
    InvalidBlockType: 1,
    InvalidLengthLiteral: 2,
    InvalidDistance: 3,
    StreamFinished: 4,
    NoStreamHandler: 5,
    InvalidHeader: 6,
    NoCallback: 7,
    InvalidUTF8: 8,
    ExtraFieldTooLong: 9,
    InvalidDate: 10,
    FilenameTooLong: 11,
    StreamFinishing: 12,
    InvalidZipData: 13,
    UnknownCompressionMethod: 14
};
// error codes
var ec = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data'
    // determined by unknown compression method
];
;
var err = function (ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
    if (!nt)
        throw e;
    return e;
};
// expands raw DEFLATE data
var inflt = function (dat, buf, st) {
    // source length
    var sl = dat.length;
    if (!sl || (st && st.f && !st.l))
        return buf || new u8(0);
    // have to estimate size
    var noBuf = !buf || st;
    // no state
    var noSt = !st || st.i;
    if (!st)
        st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf)
        buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function (l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                if (t > sl) {
                    if (noSt)
                        err(0);
                    break;
                }
                // ensure size
                if (noBuf)
                    cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8, st.f = final;
                continue;
            }
            else if (type == 1)
                lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for (var i = 0; i < hcLen; ++i) {
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                var clb = max(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for (var i = 0; i < tl;) {
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >>> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    }
                    else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16)
                            n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17)
                            n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18)
                            n = 11 + bits(dat, pos, 127), pos += 7;
                        while (n--)
                            ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            }
            else
                err(1);
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf)
            cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (;; lpos = pos) {
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
            if (!c)
                err(2);
            if (sym < 256)
                buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos, lm = null;
                break;
            }
            else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d)
                    err(3);
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                }
                if (pos > tbts) {
                    if (noSt)
                        err(0);
                    break;
                }
                if (noBuf)
                    cbuf(bt + 131072);
                var end = bt + add;
                for (; bt < end; bt += 4) {
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
    d[o + 2] |= v >>> 16;
};
// creates code lengths from a frequency table
var hTree = function (d, mb) {
    // Need extra info to make a tree
    var t = [];
    for (var i = 0; i < d.length; ++i) {
        if (d[i])
            t.push({ s: i, f: d[i] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
        return [et, 0];
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return [v, 1];
    }
    t.sort(function (a, b) { return a.f - b.f; });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
    }
    var maxSym = t2[0].s;
    for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
            maxSym = t2[i].s;
    }
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
        for (; i < s; ++i) {
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << (mbt - tr[i2_1]));
                tr[i2_1] = mb;
            }
            else
                break;
        }
        dt >>>= lft;
        while (dt > 0) {
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb)
                dt -= 1 << (mb - tr[i2_2]++ - 1);
            else
                ++i;
        }
        for (; i >= 0 && dt; --i) {
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return [new u8(tr), mbt];
};
// get the max length and assign length codes
var ln = function (n, l, d) {
    return n.s == -1
        ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
        : (l[n.s] = d);
};
// length codes generation
var lc = function (c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while (s && !c[--s])
        ;
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function (v) { cl[cli++] = v; };
    for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
            ++cls;
        else {
            if (!cln && cls > 2) {
                for (; cls > 138; cls -= 138)
                    w(32754);
                if (cls > 2) {
                    w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                    cls = 0;
                }
            }
            else if (cls > 3) {
                w(cln), --cls;
                for (; cls > 6; cls -= 6)
                    w(8304);
                if (cls > 2)
                    w(((cls - 3) << 5) | 8208), cls = 0;
            }
            while (cls--)
                w(cln);
            cls = 1;
            cln = c[i];
        }
    }
    return [cl.subarray(0, cli), s];
};
// calculate the length of output from tree, code lengths
var clen = function (cf, cl) {
    var l = 0;
    for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function (out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >>> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
    var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
    var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
    var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
        lcfreq[lclt[i] & 31]++;
    for (var i = 0; i < lcdt.length; ++i)
        lcfreq[lcdt[i] & 31]++;
    var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
    var flen = (bl + 5) << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
    if (flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
            wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i = 0; i < clct.length; ++i) {
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15)
                    wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
            }
        }
    }
    else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
        if (syms[i] > 255) {
            var len = (syms[i] >>> 18) & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
                wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
            var dst = syms[i] & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
                wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
        }
        else {
            wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
        }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function (dat, lvl, plvl, pre, post, lst) {
    var s = dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var pos = 0;
    if (!lvl || s < 8) {
        for (var i = 0; i <= s; i += 65535) {
            // end
            var e = i + 65535;
            if (e < s) {
                // write full block
                pos = wfblk(w, pos, dat.subarray(i, e));
            }
            else {
                // write final block
                w[i] = lst;
                pos = wfblk(w, pos, dat.subarray(i, s));
            }
        }
    }
    else {
        var opt = deo[lvl - 1];
        var n = opt >>> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = new u16(32768), head = new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new u32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
        var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
        for (; i < s; ++i) {
            // hash value
            // deopt when i > s - 3 - at end, deopt acceptable
            var hv = hsh(i);
            // index mod 32768    previous index mod
            var imod = i & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for (var j = 0; j < 286; ++j)
                        lf[j] = 0;
                    for (var j = 0; j < 30; ++j)
                        df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while (dif <= maxd && --ch_1 && imod != pimod) {
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                ;
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn)
                                    break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for (var j = 0; j < mmd; ++j) {
                                    var ti = (i - dif + j + 32768) & 32767;
                                    var pti = prev[ti];
                                    var cd = (ti - pti + 32768) & 32767;
                                    if (cd > md)
                                        md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += (imod - pimod + 32768) & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one Uint32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                }
                else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        // this is the easiest way to avoid needing to maintain state
        if (!lst && pos & 7)
            pos = wfblk(w, pos + 1, et);
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ (function () {
    var t = new Int32Array(256);
    for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
            c = ((c & 1) && -306674912) ^ (c >>> 1);
        t[i] = c;
    }
    return t;
})();
// CRC32
var crc = function () {
    var c = -1;
    return {
        p: function (d) {
            // closures have awful performance
            var cr = c;
            for (var i = 0; i < d.length; ++i)
                cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
            c = cr;
        },
        d: function () { return ~c; }
    };
};
// Alder32
var adler = function () {
    var a = 1, b = 0;
    return {
        p: function (d) {
            // closures have awful performance
            var n = a, m = b;
            var l = d.length | 0;
            for (var i = 0; i != l;) {
                var e = Math.min(i + 2655, l);
                for (; i < e; ++i)
                    m += n += d[i];
                n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
        },
        d: function () {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | (a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8);
        }
    };
};
;
// deflate with opts
var dopt = function (dat, opt, pre, post, st) {
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
};
// Walmart object spread
var mrg = function (a, b) {
    var o = {};
    for (var k in a)
        o[k] = a[k];
    for (var k in b)
        o[k] = b[k];
    return o;
};
// worker clone
// This is possibly the craziest part of the entire codebase, despite how simple it may seem.
// The only parameter to this function is a closure that returns an array of variables outside of the function scope.
// We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
// We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
// The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
// This took me three weeks to figure out how to do.
var wcln = function (fn, fnStr, td) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/ /g, '').split(',');
    for (var i = 0; i < dt.length; ++i) {
        var v = dt[i], k = ks[i];
        if (typeof v == 'function') {
            fnStr += ';' + k + '=';
            var st_1 = v.toString();
            if (v.prototype) {
                // for global objects
                if (st_1.indexOf('[native code]') != -1) {
                    var spInd = st_1.indexOf(' ', 8) + 1;
                    fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                }
                else {
                    fnStr += st_1;
                    for (var t in v.prototype)
                        fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                }
            }
            else
                fnStr += st_1;
        }
        else
            td[k] = v;
    }
    return [fnStr, td];
};
var ch = [];
// clone bufs
var cbfs = function (v) {
    var tl = [];
    for (var k in v) {
        if (v[k] instanceof u8 || v[k] instanceof u16 || v[k] instanceof u32)
            tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    }
    return tl;
};
// use a worker to execute code
var wrkr = function (fns, init, id, cb) {
    var _a;
    if (!ch[id]) {
        var fnStr = '', td_1 = {}, m = fns.length - 1;
        for (var i = 0; i < m; ++i)
            _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
    }
    var td = mrg({}, ch[id][1]);
    return node_worker_1["default"](ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
};
// base async inflate fn
var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8]; };
var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
// gzip extra
var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
// gunzip extra
var guze = function () { return [gzs, gzl]; };
// zlib extra
var zle = function () { return [zlh, wbytes, adler]; };
// unzlib extra
var zule = function () { return [zlv]; };
// post buf
var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
// get u8
var gu8 = function (o) { return o && o.size && new u8(o.size); };
// async helper
var cbify = function (dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function (err, dat) {
        w.terminate();
        cb(err, dat);
    });
    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function () { w.terminate(); };
};
// auto stream
var astrm = function (strm) {
    strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
    return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
};
// async stream attach
var astrmify = function (fns, strm, opts, init, id) {
    var t;
    var w = wrkr(fns, init, id, function (err, dat) {
        if (err)
            w.terminate(), strm.ondata.call(strm, err);
        else {
            if (dat[1])
                w.terminate();
            strm.ondata.call(strm, err, dat[0], dat[1]);
        }
    });
    w.postMessage(opts);
    strm.push = function (d, f) {
        if (!strm.ondata)
            err(5);
        if (t)
            strm.ondata(err(4, 0, 1), null, !!f);
        w.postMessage([d, t = f], [d.buffer]);
    };
    strm.terminate = function () { w.terminate(); };
};
// read 2 bytes
var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
// read 4 bytes
var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
// write bytes
var wbytes = function (d, b, v) {
    for (; v; ++b)
        d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function (c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for (var i = 0; i <= fn.length; ++i)
            c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function (d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, 'invalid gzip data');
    var flg = d[3];
    var st = 10;
    if (flg & 4)
        st += d[10] | (d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
    return st + (flg & 2);
};
// gzip length
var gzl = function (d) {
    var l = d.length;
    return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
};
// gzip header length
var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
// zlib header
var zlh = function (c, o) {
    var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
    c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
};
// zlib valid
var zlv = function (d) {
    if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
        err(6, 'invalid zlib data');
    if (d[1] & 32)
        err(6, 'invalid zlib data: preset dictionaries not supported');
};
function AsyncCmpStrm(opts, cb) {
    if (!cb && typeof opts == 'function')
        cb = opts, opts = {};
    this.ondata = cb;
    return opts;
}
// zlib footer: -4 to -0 is Adler32
/**
 * Streaming DEFLATE compression
 */
var Deflate = /*#__PURE__*/ (function () {
    function Deflate(opts, cb) {
        if (!cb && typeof opts == 'function')
            cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
    }
    Deflate.prototype.p = function (c, f) {
        this.ondata(dopt(c, this.o, 0, 0, !f), f);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Deflate.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        this.d = final;
        this.p(chunk, final || false);
    };
    return Deflate;
}());
exports.Deflate = Deflate;
/**
 * Asynchronous streaming DEFLATE compression
 */
var AsyncDeflate = /*#__PURE__*/ (function () {
    function AsyncDeflate(opts, cb) {
        astrmify([
            bDflt,
            function () { return [astrm, Deflate]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
        }, 6);
    }
    return AsyncDeflate;
}());
exports.AsyncDeflate = AsyncDeflate;
function deflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
    ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
}
exports.deflate = deflate;
/**
 * Compresses data with DEFLATE without any wrapper
 * @param data The data to compress
 * @param opts The compression options
 * @returns The deflated version of the data
 */
function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
}
exports.deflateSync = deflateSync;
/**
 * Streaming DEFLATE decompression
 */
var Inflate = /*#__PURE__*/ (function () {
    /**
     * Creates an inflation stream
     * @param cb The callback to call whenever data is inflated
     */
    function Inflate(cb) {
        this.s = {};
        this.p = new u8(0);
        this.ondata = cb;
    }
    Inflate.prototype.e = function (c) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        var l = this.p.length;
        var n = new u8(l + c.length);
        n.set(this.p), n.set(c, l), this.p = n;
    };
    Inflate.prototype.c = function (final) {
        this.d = this.s.i = final || false;
        var bts = this.s.b;
        var dt = inflt(this.p, this.o, this.s);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
    };
    /**
     * Pushes a chunk to be inflated
     * @param chunk The chunk to push
     * @param final Whether this is the final chunk
     */
    Inflate.prototype.push = function (chunk, final) {
        this.e(chunk), this.c(final);
    };
    return Inflate;
}());
exports.Inflate = Inflate;
/**
 * Asynchronous streaming DEFLATE decompression
 */
var AsyncInflate = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous inflation stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncInflate(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            function () { return [astrm, Inflate]; }
        ], this, 0, function () {
            var strm = new Inflate();
            onmessage = astrm(strm);
        }, 7);
    }
    return AsyncInflate;
}());
exports.AsyncInflate = AsyncInflate;
function inflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt
    ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
}
exports.inflate = inflate;
/**
 * Expands DEFLATE data with no wrapper
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function inflateSync(data, out) {
    return inflt(data, out);
}
exports.inflateSync = inflateSync;
// before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
/**
 * Streaming GZIP compression
 */
var Gzip = /*#__PURE__*/ (function () {
    function Gzip(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gzip.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Gzip.prototype.p = function (c, f) {
        this.c.p(c);
        this.l += c.length;
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
        if (this.v)
            gzh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
    };
    return Gzip;
}());
exports.Gzip = Gzip;
exports.Compress = Gzip;
/**
 * Asynchronous streaming GZIP compression
 */
var AsyncGzip = /*#__PURE__*/ (function () {
    function AsyncGzip(opts, cb) {
        astrmify([
            bDflt,
            gze,
            function () { return [astrm, Deflate, Gzip]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
        }, 8);
    }
    return AsyncGzip;
}());
exports.AsyncGzip = AsyncGzip;
exports.AsyncCompress = AsyncGzip;
function gzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        gze,
        function () { return [gzipSync]; }
    ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
}
exports.gzip = gzip;
exports.compress = gzip;
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */
function gzipSync(data, opts) {
    if (!opts)
        opts = {};
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
exports.gzipSync = gzipSync;
exports.compressSync = gzipSync;
/**
 * Streaming GZIP decompression
 */
var Gunzip = /*#__PURE__*/ (function () {
    /**
     * Creates a GUNZIP stream
     * @param cb The callback to call whenever data is inflated
     */
    function Gunzip(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be GUNZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gunzip.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            var s = this.p.length > 3 ? gzs(this.p) : 4;
            if (s >= this.p.length && !final)
                return;
            this.p = this.p.subarray(s), this.v = 0;
        }
        if (final) {
            if (this.p.length < 8)
                err(6, 'invalid gzip data');
            this.p = this.p.subarray(0, -8);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Gunzip;
}());
exports.Gunzip = Gunzip;
/**
 * Asynchronous streaming GZIP decompression
 */
var AsyncGunzip = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous GUNZIP stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncGunzip(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            guze,
            function () { return [astrm, Inflate, Gunzip]; }
        ], this, 0, function () {
            var strm = new Gunzip();
            onmessage = astrm(strm);
        }, 9);
    }
    return AsyncGunzip;
}());
exports.AsyncGunzip = AsyncGunzip;
function gunzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        guze,
        function () { return [gunzipSync]; }
    ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
}
exports.gunzip = gunzip;
/**
 * Expands GZIP data
 * @param data The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */
function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
exports.gunzipSync = gunzipSync;
/**
 * Streaming Zlib compression
 */
var Zlib = /*#__PURE__*/ (function () {
    function Zlib(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be zlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Zlib.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Zlib.prototype.p = function (c, f) {
        this.c.p(c);
        var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
        if (this.v)
            zlh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
    };
    return Zlib;
}());
exports.Zlib = Zlib;
/**
 * Asynchronous streaming Zlib compression
 */
var AsyncZlib = /*#__PURE__*/ (function () {
    function AsyncZlib(opts, cb) {
        astrmify([
            bDflt,
            zle,
            function () { return [astrm, Deflate, Zlib]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
        }, 10);
    }
    return AsyncZlib;
}());
exports.AsyncZlib = AsyncZlib;
function zlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        zle,
        function () { return [zlibSync]; }
    ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
}
exports.zlib = zlib;
/**
 * Compress data with Zlib
 * @param data The data to compress
 * @param opts The compression options
 * @returns The zlib-compressed version of the data
 */
function zlibSync(data, opts) {
    if (!opts)
        opts = {};
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
exports.zlibSync = zlibSync;
/**
 * Streaming Zlib decompression
 */
var Unzlib = /*#__PURE__*/ (function () {
    /**
     * Creates a Zlib decompression stream
     * @param cb The callback to call whenever data is inflated
     */
    function Unzlib(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be unzlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzlib.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            if (this.p.length < 2 && !final)
                return;
            this.p = this.p.subarray(2), this.v = 0;
        }
        if (final) {
            if (this.p.length < 4)
                err(6, 'invalid zlib data');
            this.p = this.p.subarray(0, -4);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Unzlib;
}());
exports.Unzlib = Unzlib;
/**
 * Asynchronous streaming Zlib decompression
 */
var AsyncUnzlib = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous Zlib decompression stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncUnzlib(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            zule,
            function () { return [astrm, Inflate, Unzlib]; }
        ], this, 0, function () {
            var strm = new Unzlib();
            onmessage = astrm(strm);
        }, 11);
    }
    return AsyncUnzlib;
}());
exports.AsyncUnzlib = AsyncUnzlib;
function unzlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        zule,
        function () { return [unzlibSync]; }
    ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
}
exports.unzlib = unzlib;
/**
 * Expands Zlib data
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}
exports.unzlibSync = unzlibSync;
/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var Decompress = /*#__PURE__*/ (function () {
    /**
     * Creates a decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
    function Decompress(cb) {
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Decompress.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (!this.s) {
            if (this.p && this.p.length) {
                var n = new u8(this.p.length + chunk.length);
                n.set(this.p), n.set(chunk, this.p.length);
            }
            else
                this.p = chunk;
            if (this.p.length > 2) {
                var _this_1 = this;
                var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                    ? new this.G(cb)
                    : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                        ? new this.I(cb)
                        : new this.Z(cb);
                this.s.push(this.p, final);
                this.p = null;
            }
        }
        else
            this.s.push(chunk, final);
    };
    return Decompress;
}());
exports.Decompress = Decompress;
/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var AsyncDecompress = /*#__PURE__*/ (function () {
    /**
   * Creates an asynchronous decompression stream
   * @param cb The callback to call whenever data is decompressed
   */
    function AsyncDecompress(cb) {
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncDecompress.prototype.push = function (chunk, final) {
        Decompress.prototype.push.call(this, chunk, final);
    };
    return AsyncDecompress;
}());
exports.AsyncDecompress = AsyncDecompress;
function decompress(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzip(data, opts, cb)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflate(data, opts, cb)
            : unzlib(data, opts, cb);
}
exports.decompress = decompress;
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function decompressSync(data, out) {
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzipSync(data, out)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflateSync(data, out)
            : unzlibSync(data, out);
}
exports.decompressSync = decompressSync;
// flatten a directory structure
var fltn = function (d, p, t, o) {
    for (var k in d) {
        var val = d[k], n = p + k;
        if (val instanceof u8)
            t[n] = [val, o];
        else if (Array.isArray(val))
            t[n] = [val[0], mrg(o, val[1])];
        else
            fltn(val, n + '/', t, o);
    }
};
// text encoder
var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
// text decoder
var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, { stream: true });
    tds = 1;
}
catch (e) { }
// decode UTF8
var dutf8 = function (d) {
    for (var r = '', i = 0;;) {
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length)
            return [r, slc(d, i - 1)];
        if (!eb)
            r += String.fromCharCode(c);
        else if (eb == 3) {
            c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
        }
        else if (eb & 1)
            r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
        else
            r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
    }
};
/**
 * Streaming UTF-8 decoding
 */
var DecodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is decoded
     */
    function DecodeUTF8(cb) {
        this.ondata = cb;
        if (tds)
            this.t = new TextDecoder();
        else
            this.p = et;
    }
    /**
     * Pushes a chunk to be decoded from UTF-8 binary
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    DecodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        final = !!final;
        if (this.t) {
            this.ondata(this.t.decode(chunk, { stream: true }), final);
            if (final) {
                if (this.t.decode().length)
                    err(8);
                this.t = null;
            }
            return;
        }
        if (!this.p)
            err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a = dutf8(dat), ch = _a[0], np = _a[1];
        if (final) {
            if (np.length)
                err(8);
            this.p = null;
        }
        else
            this.p = np;
        this.ondata(ch, final);
    };
    return DecodeUTF8;
}());
exports.DecodeUTF8 = DecodeUTF8;
/**
 * Streaming UTF-8 encoding
 */
var EncodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is encoded
     */
    function EncodeUTF8(cb) {
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be encoded to UTF-8
     * @param chunk The string data to push
     * @param final Whether this is the last chunk
     */
    EncodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        this.ondata(strToU8(chunk), this.d = final || false);
    };
    return EncodeUTF8;
}());
exports.EncodeUTF8 = EncodeUTF8;
/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */
function strToU8(str, latin1) {
    if (latin1) {
        var ar_1 = new u8(str.length);
        for (var i = 0; i < str.length; ++i)
            ar_1[i] = str.charCodeAt(i);
        return ar_1;
    }
    if (te)
        return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function (v) { ar[ai++] = v; };
    for (var i = 0; i < l; ++i) {
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + ((l - i) << 1));
            n.set(ar);
            ar = n;
        }
        var c = str.charCodeAt(i);
        if (c < 128 || latin1)
            w(c);
        else if (c < 2048)
            w(192 | (c >> 6)), w(128 | (c & 63));
        else if (c > 55295 && c < 57344)
            c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
        else
            w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
    }
    return slc(ar, 0, ai);
}
exports.strToU8 = strToU8;
/**
 * Converts a Uint8Array to a string
 * @param dat The data to decode to string
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless encoding to binary string.
 * @returns The original UTF-8/Latin-1 string
 */
function strFromU8(dat, latin1) {
    if (latin1) {
        var r = '';
        for (var i = 0; i < dat.length; i += 16384)
            r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
        return r;
    }
    else if (td)
        return td.decode(dat);
    else {
        var _a = dutf8(dat), out = _a[0], ext = _a[1];
        if (ext.length)
            err(8);
        return out;
    }
}
exports.strFromU8 = strFromU8;
;
// deflate bit flag
var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
// skip local zip header
var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
// read zip header
var zh = function (d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
// read zip64 extra field
var z64e = function (d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
        ;
    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
// extra field length
var exfl = function (ex) {
    var le = 0;
    if (ex) {
        for (var k in ex) {
            var l = ex[k].length;
            if (l > 65535)
                err(9);
            le += l + 4;
        }
    }
    return le;
};
// write zip header
var wzh = function (d, b, f, fn, u, c, ce, co) {
    var fl = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
    if (ce != null)
        d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2; // spec compliance? what's that?
    d[b++] = (f.flag << 1) | (c == null && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
        err(10);
    wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1)), b += 4;
    if (c != null) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c);
        wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl;
    if (exl) {
        for (var k in ex) {
            var exf = ex[k], l = exf.length;
            wbytes(d, b, +k);
            wbytes(d, b + 2, l);
            d.set(exf, b + 4), b += 4 + l;
        }
    }
    if (col)
        d.set(co, b), b += col;
    return b;
};
// write zip footer (end of central directory)
var wzf = function (o, b, c, d, e) {
    wbytes(o, b, 0x6054B50); // skip disk
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
};
/**
 * A pass-through stream to keep data uncompressed in a ZIP archive.
 */
var ZipPassThrough = /*#__PURE__*/ (function () {
    /**
     * Creates a pass-through stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     */
    function ZipPassThrough(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
    }
    /**
     * Processes a chunk and pushes to the output stream. You can override this
     * method in a subclass for custom behavior, but by default this passes
     * the data through. You must call this.ondata(err, chunk, final) at some
     * point in this method.
     * @param chunk The chunk to process
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.process = function (chunk, final) {
        this.ondata(null, chunk, final);
    };
    /**
     * Pushes a chunk to be added. If you are subclassing this with a custom
     * compression algorithm, note that you must push data from the source
     * file only, pre-compression.
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        this.c.p(chunk);
        this.size += chunk.length;
        if (final)
            this.crc = this.c.d();
        this.process(chunk, final || false);
    };
    return ZipPassThrough;
}());
exports.ZipPassThrough = ZipPassThrough;
// I don't extend because TypeScript extension adds 1kB of runtime bloat
/**
 * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
 * for better performance
 */
var ZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function ZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function (dat, final) {
            _this_1.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
    }
    ZipDeflate.prototype.process = function (chunk, final) {
        try {
            this.d.push(chunk, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return ZipDeflate;
}());
exports.ZipDeflate = ZipDeflate;
/**
 * Asynchronous streaming DEFLATE compression for ZIP archives
 */
var AsyncZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function AsyncZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function (err, dat, final) {
            _this_1.ondata(err, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
    }
    AsyncZipDeflate.prototype.process = function (chunk, final) {
        this.d.push(chunk, final);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return AsyncZipDeflate;
}());
exports.AsyncZipDeflate = AsyncZipDeflate;
// TODO: Better tree shaking
/**
 * A zippable archive to which files can incrementally be added
 */
var Zip = /*#__PURE__*/ (function () {
    /**
     * Creates an empty ZIP archive to which files can be added
     * @param cb The callback to call whenever data for the generated ZIP archive
     *           is available
     */
    function Zip(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
    }
    /**
     * Adds a file to the ZIP archive
     * @param file The file stream to add
     */
    Zip.prototype.add = function (file) {
        var _this_1 = this;
        if (!this.ondata)
            err(5);
        // finishing or finished
        if (this.d & 2)
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
        else {
            var f = strToU8(file.filename), fl_1 = f.length;
            var com = file.comment, o = com && strToU8(com);
            var u = fl_1 != file.filename.length || (o && (com.length != o.length));
            var hl_1 = fl_1 + exfl(file.extra) + 30;
            if (fl_1 > 65535)
                this.ondata(err(11, 0, 1), null, false);
            var header = new u8(hl_1);
            wzh(header, 0, file, f, u);
            var chks_1 = [header];
            var pAll_1 = function () {
                for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                    var chk = chks_2[_i];
                    _this_1.ondata(null, chk, false);
                }
                chks_1 = [];
            };
            var tr_1 = this.d;
            this.d = 0;
            var ind_1 = this.u.length;
            var uf_1 = mrg(file, {
                f: f,
                u: u,
                o: o,
                t: function () {
                    if (file.terminate)
                        file.terminate();
                },
                r: function () {
                    pAll_1();
                    if (tr_1) {
                        var nxt = _this_1.u[ind_1 + 1];
                        if (nxt)
                            nxt.r();
                        else
                            _this_1.d = 1;
                    }
                    tr_1 = 1;
                }
            });
            var cl_1 = 0;
            file.ondata = function (err, dat, final) {
                if (err) {
                    _this_1.ondata(err, dat, final);
                    _this_1.terminate();
                }
                else {
                    cl_1 += dat.length;
                    chks_1.push(dat);
                    if (final) {
                        var dd = new u8(16);
                        wbytes(dd, 0, 0x8074B50);
                        wbytes(dd, 4, file.crc);
                        wbytes(dd, 8, cl_1);
                        wbytes(dd, 12, file.size);
                        chks_1.push(dd);
                        uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                        if (tr_1)
                            uf_1.r();
                        tr_1 = 1;
                    }
                    else if (tr_1)
                        pAll_1();
                }
            };
            this.u.push(uf_1);
        }
    };
    /**
     * Ends the process of adding files and prepares to emit the final chunks.
     * This *must* be called after adding all desired files for the resulting
     * ZIP file to work properly.
     */
    Zip.prototype.end = function () {
        var _this_1 = this;
        if (this.d & 2) {
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
            return;
        }
        if (this.d)
            this.e();
        else
            this.u.push({
                r: function () {
                    if (!(_this_1.d & 1))
                        return;
                    _this_1.u.splice(-1, 1);
                    _this_1.e();
                },
                t: function () { }
            });
        this.d = 3;
    };
    Zip.prototype.e = function () {
        var bt = 0, l = 0, tl = 0;
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
            var f = _c[_b];
            wzh(out, bt, f, f.f, f.u, f.c, l, f.o);
            bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
    };
    /**
     * A method to terminate any internal workers used by the stream. Subsequent
     * calls to add() will fail.
     */
    Zip.prototype.terminate = function () {
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            f.t();
        }
        this.d = 2;
    };
    return Zip;
}());
exports.Zip = Zip;
function zip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var r = {};
    fltn(data, '', r, opts);
    var k = Object.keys(r);
    var lft = k.length, o = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var cbf = function () {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for (var i = 0; i < slft; ++i) {
            var f = files[i];
            try {
                var l = f.c.length;
                wzh(out, tot, f, f.f, f.u, l);
                var badd = 30 + f.f.length + exfl(f.extra);
                var loc = tot + badd;
                out.set(f.c, loc);
                wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
            }
            catch (e) {
                return cbd(e, null);
            }
        }
        wzf(out, o, files.length, cdl, oe);
        cbd(null, out);
    };
    if (!lft)
        cbf();
    var _loop_1 = function (i) {
        var fn = k[i];
        var _a = r[fn], file = _a[0], p = _a[1];
        var c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        var compression = p.level == 0 ? 0 : 8;
        var cbl = function (e, d) {
            if (e) {
                tAll();
                cbd(e, null);
            }
            else {
                var l = d.length;
                files[i] = mrg(p, {
                    size: size,
                    crc: c.d(),
                    c: d,
                    f: f,
                    m: m,
                    u: s != fn.length || (m && (com.length != ms)),
                    compression: compression
                });
                o += 30 + s + exl + l;
                tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                if (!--lft)
                    cbf();
            }
        };
        if (s > 65535)
            cbl(err(11, 0, 1), null);
        if (!compression)
            cbl(null, file);
        else if (size < 160000) {
            try {
                cbl(null, deflateSync(file, p));
            }
            catch (e) {
                cbl(e, null);
            }
        }
        else
            term.push(deflate(file, p, cbl));
    };
    // Cannot use lft because it can decrease
    for (var i = 0; i < slft; ++i) {
        _loop_1(i);
    }
    return tAll;
}
exports.zip = zip;
/**
 * Synchronously creates a ZIP file. Prefer using `zip` for better performance
 * with more than one file.
 * @param data The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @returns The generated ZIP archive
 */
function zipSync(data, opts) {
    if (!opts)
        opts = {};
    var r = {};
    var files = [];
    fltn(data, '', r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
        var _a = r[fn], file = _a[0], p = _a[1];
        var compression = p.level == 0 ? 0 : 8;
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        if (s > 65535)
            err(11);
        var d = compression ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push(mrg(p, {
            size: file.length,
            crc: c.d(),
            c: d,
            f: f,
            m: m,
            u: s != fn.length || (m && (com.length != ms)),
            o: o,
            compression: compression
        }));
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i = 0; i < files.length; ++i) {
        var f = files[i];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd);
        wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
}
exports.zipSync = zipSync;
/**
 * Streaming pass-through decompression for ZIP archives
 */
var UnzipPassThrough = /*#__PURE__*/ (function () {
    function UnzipPassThrough() {
    }
    UnzipPassThrough.prototype.push = function (data, final) {
        this.ondata(null, data, final);
    };
    UnzipPassThrough.compression = 0;
    return UnzipPassThrough;
}());
exports.UnzipPassThrough = UnzipPassThrough;
/**
 * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
 * better performance.
 */
var UnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function UnzipInflate() {
        var _this_1 = this;
        this.i = new Inflate(function (dat, final) {
            _this_1.ondata(null, dat, final);
        });
    }
    UnzipInflate.prototype.push = function (data, final) {
        try {
            this.i.push(data, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    UnzipInflate.compression = 8;
    return UnzipInflate;
}());
exports.UnzipInflate = UnzipInflate;
/**
 * Asynchronous streaming DEFLATE decompression for ZIP archives
 */
var AsyncUnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function AsyncUnzipInflate(_, sz) {
        var _this_1 = this;
        if (sz < 320000) {
            this.i = new Inflate(function (dat, final) {
                _this_1.ondata(null, dat, final);
            });
        }
        else {
            this.i = new AsyncInflate(function (err, dat, final) {
                _this_1.ondata(err, dat, final);
            });
            this.terminate = this.i.terminate;
        }
    }
    AsyncUnzipInflate.prototype.push = function (data, final) {
        if (this.i.terminate)
            data = slc(data, 0);
        this.i.push(data, final);
    };
    AsyncUnzipInflate.compression = 8;
    return AsyncUnzipInflate;
}());
exports.AsyncUnzipInflate = AsyncUnzipInflate;
/**
 * A ZIP archive decompression stream that emits files as they are discovered
 */
var Unzip = /*#__PURE__*/ (function () {
    /**
     * Creates a ZIP decompression stream
     * @param cb The callback to call whenever a file in the ZIP archive is found
     */
    function Unzip(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
            0: UnzipPassThrough
        };
        this.p = et;
    }
    /**
     * Pushes a chunk to be unzipped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzip.prototype.push = function (chunk, final) {
        var _this_1 = this;
        if (!this.onfile)
            err(5);
        if (!this.p)
            err(4);
        if (this.c > 0) {
            var len = Math.min(this.c, chunk.length);
            var toAdd = chunk.subarray(0, len);
            this.c -= len;
            if (this.d)
                this.d.push(toAdd, !this.c);
            else
                this.k[0].push(toAdd);
            chunk = chunk.subarray(len);
            if (chunk.length)
                return this.push(chunk, final);
        }
        else {
            var f = 0, i = 0, is = void 0, buf = void 0;
            if (!this.p.length)
                buf = chunk;
            else if (!chunk.length)
                buf = this.p;
            else {
                buf = new u8(this.p.length + chunk.length);
                buf.set(this.p), buf.set(chunk, this.p.length);
            }
            var l = buf.length, oc = this.c, add = oc && this.d;
            var _loop_2 = function () {
                var _a;
                var sig = b4(buf, i);
                if (sig == 0x4034B50) {
                    f = 1, is = i;
                    this_1.d = null;
                    this_1.c = 0;
                    var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                    if (l > i + 30 + fnl + es) {
                        var chks_3 = [];
                        this_1.k.unshift(chks_3);
                        f = 2;
                        var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                        var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                        if (sc_1 == 4294967295) {
                            _a = dd ? [-2] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                        }
                        else if (dd)
                            sc_1 = -1;
                        i += es;
                        this_1.c = sc_1;
                        var d_1;
                        var file_1 = {
                            name: fn_1,
                            compression: cmp_1,
                            start: function () {
                                if (!file_1.ondata)
                                    err(5);
                                if (!sc_1)
                                    file_1.ondata(null, et, true);
                                else {
                                    var ctr = _this_1.o[cmp_1];
                                    if (!ctr)
                                        file_1.ondata(err(14, 'unknown compression type ' + cmp_1, 1), null, false);
                                    d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                    d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                    for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                                        var dat = chks_4[_i];
                                        d_1.push(dat, false);
                                    }
                                    if (_this_1.k[0] == chks_3 && _this_1.c)
                                        _this_1.d = d_1;
                                    else
                                        d_1.push(et, true);
                                }
                            },
                            terminate: function () {
                                if (d_1 && d_1.terminate)
                                    d_1.terminate();
                            }
                        };
                        if (sc_1 >= 0)
                            file_1.size = sc_1, file_1.originalSize = su_1;
                        this_1.onfile(file_1);
                    }
                    return "break";
                }
                else if (oc) {
                    if (sig == 0x8074B50) {
                        is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                        return "break";
                    }
                    else if (sig == 0x2014B50) {
                        is = i -= 4, f = 3, this_1.c = 0;
                        return "break";
                    }
                }
            };
            var this_1 = this;
            for (; i < l - 4; ++i) {
                var state_1 = _loop_2();
                if (state_1 === "break")
                    break;
            }
            this.p = et;
            if (oc < 0) {
                var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                if (add)
                    add.push(dat, !!f);
                else
                    this.k[+(f == 2)].push(dat);
            }
            if (f & 2)
                return this.push(buf.subarray(i), final);
            this.p = buf.subarray(i);
        }
        if (final) {
            if (this.c)
                err(13);
            this.p = null;
        }
    };
    /**
     * Registers a decoder with the stream, allowing for files compressed with
     * the compression type provided to be expanded correctly
     * @param decoder The decoder constructor
     */
    Unzip.prototype.register = function (decoder) {
        this.o[decoder.compression] = decoder;
    };
    return Unzip;
}());
exports.Unzip = Unzip;
var mt = typeof queueMicrotask == 'function' ? queueMicrotask : typeof setTimeout == 'function' ? setTimeout : function (fn) { fn(); };
function unzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var files = {};
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558) {
            cbd(err(13, 0, 1), null);
            return tAll;
        }
    }
    ;
    var lft = b2(data, e + 8);
    if (lft) {
        var c = lft;
        var o = b4(data, e + 16);
        var z = o == 4294967295;
        if (z) {
            e = b4(data, e - 12);
            if (b4(data, e) != 0x6064B50) {
                cbd(err(13, 0, 1), null);
                return tAll;
            }
            c = lft = b4(data, e + 32);
            o = b4(data, e + 48);
        }
        var fltr = opts && opts.filter;
        var _loop_3 = function (i) {
            var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
            o = no;
            var cbl = function (e, d) {
                if (e) {
                    tAll();
                    cbd(e, null);
                }
                else {
                    if (d)
                        files[fn] = d;
                    if (!--lft)
                        cbd(null, files);
                }
            };
            if (!fltr || fltr({
                name: fn,
                size: sc,
                originalSize: su,
                compression: c_1
            })) {
                if (!c_1)
                    cbl(null, slc(data, b, b + sc));
                else if (c_1 == 8) {
                    var infl = data.subarray(b, b + sc);
                    if (sc < 320000) {
                        try {
                            cbl(null, inflateSync(infl, new u8(su)));
                        }
                        catch (e) {
                            cbl(e, null);
                        }
                    }
                    else
                        term.push(inflate(infl, { size: su }, cbl));
                }
                else
                    cbl(err(14, 'unknown compression type ' + c_1, 1), null);
            }
            else
                cbl(null, null);
        };
        for (var i = 0; i < c; ++i) {
            _loop_3(i);
        }
    }
    else
        cbd(null, {});
    return tAll;
}
exports.unzip = unzip;
/**
 * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
 * performance with more than one file.
 * @param data The raw compressed ZIP file
 * @param opts The ZIP extraction options
 * @returns The decompressed files
 */
function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558)
            err(13);
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
        return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295;
    if (z) {
        e = b4(data, e - 12);
        if (b4(data, e) != 0x6064B50)
            err(13);
        c = b4(data, e + 32);
        o = b4(data, e + 48);
    }
    var fltr = opts && opts.filter;
    for (var i = 0; i < c; ++i) {
        var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_2
        })) {
            if (!c_2)
                files[fn] = slc(data, b, b + sc);
            else if (c_2 == 8)
                files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
            else
                err(14, 'unknown compression type ' + c_2);
        }
    }
    return files;
}
exports.unzipSync = unzipSync;


/***/ }),

/***/ "./node_modules/fflate/lib/worker.cjs":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var ch2 = {};
exports["default"] = (function (c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: 'text/javascript' }))));
    w.onmessage = function (e) {
        var d = e.data, ed = d.$e$;
        if (ed) {
            var err = new Error(ed[0]);
            err['code'] = ed[1];
            err.stack = ed[2];
            cb(err, null);
        }
        else
            cb(null, d);
    };
    w.postMessage(msg, transfer);
    return w;
});


/***/ }),

/***/ "./node_modules/idb-keyval/dist/index.js":
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "clear": () => (/* binding */ clear),
  "createStore": () => (/* binding */ createStore),
  "del": () => (/* binding */ del),
  "delMany": () => (/* binding */ delMany),
  "entries": () => (/* binding */ entries),
  "get": () => (/* binding */ get),
  "getMany": () => (/* binding */ getMany),
  "keys": () => (/* binding */ keys),
  "promisifyRequest": () => (/* binding */ promisifyRequest),
  "set": () => (/* binding */ set),
  "setMany": () => (/* binding */ setMany),
  "update": () => (/* binding */ update),
  "values": () => (/* binding */ values)
});

;// CONCATENATED MODULE: ./node_modules/safari-14-idb-fix/dist/index.js
/**
 * Work around Safari 14 IndexedDB open bug.
 *
 * Safari has a horrible bug where IDB requests can hang while the browser is starting up. https://bugs.webkit.org/show_bug.cgi?id=226547
 * The only solution is to keep nudging it until it's awake.
 */
function idbReady() {
    var isSafari = !navigator.userAgentData &&
        /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent);
    // No point putting other browsers or older versions of Safari through this mess.
    if (!isSafari || !indexedDB.databases)
        return Promise.resolve();
    var intervalId;
    return new Promise(function (resolve) {
        var tryIdb = function () { return indexedDB.databases().finally(resolve); };
        intervalId = setInterval(tryIdb, 100);
        tryIdb();
    }).finally(function () { return clearInterval(intervalId); });
}

/* harmony default export */ const dist = (idbReady);

;// CONCATENATED MODULE: ./node_modules/idb-keyval/dist/index.js


function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    const dbp = dist().then(() => {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        return promisifyRequest(request);
    });
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function setMany(entries, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        entries.forEach((entry) => store.put(entry[1], entry[0]));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function getMany(keys, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => Promise.all(keys.map((key) => promisifyRequest(store.get(key)))));
}
/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function update(key, updater, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => 
    // Need to create the promise manually.
    // If I try to chain promises, the transaction closes in browsers
    // that use a promise polyfill (IE10/11).
    new Promise((resolve, reject) => {
        store.get(key).onsuccess = function () {
            try {
                store.put(updater(this.result), key);
                resolve(promisifyRequest(store.transaction));
            }
            catch (err) {
                reject(err);
            }
        };
    }));
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete multiple keys at once.
 *
 * @param keys List of keys to delete.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function delMany(keys, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        keys.forEach((key) => store.delete(key));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(customStore, callback) {
    return customStore('readonly', (store) => {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        store.openCursor().onsuccess = function () {
            if (!this.result)
                return;
            callback(this.result);
            this.result.continue();
        };
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function keys(customStore = defaultGetStore()) {
    const items = [];
    return eachCursor(customStore, (cursor) => items.push(cursor.key)).then(() => items);
}
/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function values(customStore = defaultGetStore()) {
    const items = [];
    return eachCursor(customStore, (cursor) => items.push(cursor.value)).then(() => items);
}
/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function entries(customStore = defaultGetStore()) {
    const items = [];
    return eachCursor(customStore, (cursor) => items.push([cursor.key, cursor.value])).then(() => items);
}




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
const setting_1 = __webpack_require__("./src/setting.ts");
const global_1 = __webpack_require__("./src/global.ts");
const ui_1 = __webpack_require__("./src/ui/ui.ts");
const detect_1 = __webpack_require__("./src/detect.ts");
const debug_1 = __webpack_require__("./src/debug.ts");
const log_1 = __webpack_require__("./src/log.ts");
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