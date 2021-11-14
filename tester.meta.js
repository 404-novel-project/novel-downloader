// ==UserScript==
// @name        小说下载器测试脚本
// @version     4.4.0.282
// @author      bgme
// @description 小说下载器测试脚本
// @match       *://www.ciweimao.com/chapter-list/*
// @match       *://book.sfacg.com/Novel/*/MainIndex/
// @match       *://book.qidian.com/info/*
// @match       *://www.jjwxc.net/onebook.php?novelid=*
// @match       *://www.gongzicp.com/novel-*.html
// @match       *://gongzicp.com/novel-*.html
// @match       *://book.zongheng.com/showchapter/*.html
// @match       *://huayu.zongheng.com/showchapter/*.html
// @match       *://www.linovel.net/book/*.html
// @match       *://www.17k.com/list/*.html
// @match       *://www.shuhai.com/book/*.htm
// @match       *://mm.shuhai.com/book/*.htm
// @match       *://www.tadu.com/book/*
// @match       *://www.qimao.com/shuku/*/
// @match       *://sosad.fun/threads/*/profile*
// @match       *://wenzhan.org/threads/*/profile*
// @match       *://sosadfun.com/threads/*/profile*
// @match       *://xn--pxtr7m5ny.com/threads/*/profile*
// @match       *://xn--pxtr7m.com/threads/*/profile*
// @match       *://xn--pxtr7m5ny.net/threads/*/profile*
// @match       *://xn--pxtr7m.net/threads/*/profile*
// @match       *://sosadfun.link/threads/*/profile*
// @match       *://www.sosad.fun/threads/*/profile*
// @match       *://www.wenzhan.org/threads/*/profile*
// @match       *://www.sosadfun.com/threads/*/profile*
// @match       *://www.xn--pxtr7m5ny.com/threads/*/profile*
// @match       *://www.xn--pxtr7m.com/threads/*/profile*
// @match       *://www.xn--pxtr7m5ny.net/threads/*/profile*
// @match       *://www.xn--pxtr7m.net/threads/*/profile*
// @match       *://www.sosadfun.link/threads/*/profile*
// @match       *://www.uukanshu.com/b/*/
// @match       *://www.yruan.com/article/*.html
// @match       *://www.biquwoo.com/bqw*/
// @match       *://www.biquwo.org/bqw*/
// @match       *://www.shuquge.com/txt/*/index.html
// @match       *://www.sizhicn.com/txt/*/index.html
// @match       *://www.dingdiann.net/ddk*/
// @match       *://www.xkzw.org/xkzw*/
// @match       *://www.lewenn.com/lw*/
// @match       *://www.klxs.la/info-*/
// @match       *://www.266ks.com/*_*/
// @match       *://www.266ks.com/*_*/index*.html
// @match       *://www.hetushu.com/book/*/index.html
// @match       *://hetushu.com/book/*/index.html
// @match       *://www.shouda8.com/*/
// @match       *://www.shouda88.com/*/
// @match       *://www.gebiqu.com/biquge_*/
// @match       *://www.meegoq.com/book*.html
// @match       *://www.viviyzw.com/book*.html
// @match       *://www.xiaoshuodaquan.com/*/
// @match       *://www.1pwx.com/*/
// @match       *://1pwx.com/*/
// @match       *://www.81book.com/book/*/
// @match       *://www.81zw.com/book/*/
// @match       *://m.yuzhaige.cc/*/*/
// @match       *://m.yushuge123.com/*/*/
// @match       *://www.xinwanben.com/*/
// @match       *://www.idejian.com/book/*/
// @match       *://www.wenku8.net/novel/*/*/index.htm
// @match       *://www.dmzj.com/info/*.html
// @match       *://www.westnovel.com/*/*/
// @match       *://www.mht.tw/*/
// @match       *://www.mht99.com/*/
// @match       *://www.dierbanzhu1.com/*_*/
// @match       *://www.banzhuer.org/*_*/
// @match       *://www.xbiquge.so/book/*/
// @match       *://www.hongyeshuzhai.com/shuzhai/*/
// @match       *://www.linovelib.com/novel/*/catalog
// @match       *://www.luoqiuzw.com/book/*/
// @match       *://www.yibige.la/*/
// @match       *://www.fushuwang.org/*/*/*/*.html
// @match       *://www.fushuwang.org/*/*/*/*.html?*
// @match       *://www.soxscc.net/*/
// @match       *://www.soxscc.org/*/
// @match       *://www.soxs.cc/*/
// @match       *://www.soshuw.com/*/
// @match       *://www.soshuwu.org/*/
// @match       *://www.soxscc.cc/*/
// @match       *://www.soshuwu.com/*/
// @match       *://www.kubiji.net/*/
// @match       *://www.shubaowa.org/*_*/
// @match       *://www.fuguoduxs.com/*_*/
// @match       *://www.xyqxs.cc/html/*/*/index.html
// @match       *://www.630shu.net/shu/*.html
// @match       *://www.qingoo.cn/details?bookId=*
// @match       *://www.trxs.cc/tongren/*.html
// @match       *://www.trxs123.com/tongren/*.html
// @match       *://www.jpxs123.com/*/*.html
// @match       *://trxs.cc/tongren/*.html
// @match       *://trxs123.com/tongren/*.html
// @match       *://jpxs123.com/*/*.html
// @match       *://www.tongrenquan.org/tongren/*.html
// @match       *://www.tongrenquan.me/tongren/*.html
// @match       *://tongrenquan.me/tongren/*.html
// @match       *://www.imiaobige.com/read/*/
// @match       *://www.256wxc.com/read/*/index.html
// @match       *://www.256wxc.com/read/*/
// @match       *://www.256wenku.com/read/*/index.html
// @match       *://www.256wenku.com/read/*/
// @match       *://www.biquge66.com/biquge*/
// @match       *://*.lofter.com/
// @match       *://*.lofter.com/?page=*
// @match       *://www.lwxs9.org/*/*/
// @match       *://www.shubl.com/book/book_detail/*
// @match       *://www.ujxs.net/read/*/
// @match       *://m.haitangtxt.net/*/*/
// @match       *://ebook.longmabook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.longmabookcn.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://ebook.lmbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.lmebooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.haitbook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.htwhbook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.myhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.lovehtbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.myhtebooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.myhtlmebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://jp.myhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://jp.myhtlmebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://ebook.urhtbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.urhtbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.newhtbook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.lvhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://jp.lvhtebook.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://www.htlvbooks.com/?act=showinfo&bookwritercode=*&bookid=*
// @match       *://dijiubook.net/*_*/
// @match       *://www.biquwx.la/*_*/
// @match       *://www.25zw.com/*/
// @match       https://greasyfork.org/*/scripts/406070-%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8
// @name:en     novel-downloader-tester
// @namespace   https://blog.bgme.me
// @icon        https://cdn.jsdelivr.net/gh/yingziwu/novel-downloader/assets/icon.png
// @license     AGPL-3.0
// @run-at      document-start
// @noframes    true
// @exclude     *://www.jjwxc.net/onebook.php?novelid=*&chapterid=*
// @exclude     *://www.meegoq.com/book/*.html
// @exclude     *://www.viviyzw.com/book/*.html
// @exclude     *://www.yruan.com/article/*/*.html
// @exclude     *://m.yuzhaige.cc/tag/*/
// @exclude     *://m.yuzhaige.cc/sort/*/
// @exclude     *://m.yuzhaige.cc/top/*/
// @exclude     *://m.yuzhaige.cc/full/*/
// @exclude     *://m.yuzhaige.cc/book/*/
// @exclude     *://m.yushuge123.com/tag/*/
// @exclude     *://m.yushuge123.com/sort/*/
// @exclude     *://m.yushuge123.com/top/*/
// @exclude     *://m.yushuge123.com/full/*/
// @exclude     *://m.yushuge123.com/book/*/
// @exclude     *://www.linovel.net/book/*/*.html
// @exclude     *://www.qimao.com/shuku/*-*/
// @exclude     *://www.trxs.cc/tongren/*/*.html
// @exclude     *://www.trxs123.com/tongren/*/*.html
// @exclude     *://www.tongrenquan.org/tongren/*/*.html
// @exclude     *://tongrenquan.org/tongren/*/*.html
// @exclude     *://www.jpxs123.com/*/*/*.html
// @exclude     *://m.haitangtxt.net/tag/*/
// @exclude     *://m.haitangtxt.net/sort/*/
// @exclude     *://m.haitangtxt.net/top/*/
// @exclude     *://m.haitangtxt.net/full/*/
// @exclude     *://m.haitangtxt.net/book/*/
// @exclude     *://www.tadu.com/book/*/*/*
// @exclude     *://www.tadu.com/book/*/0*
// @exclude     *://www.tadu.com/book/*/1*
// @exclude     *://www.tadu.com/book/*/2*
// @exclude     *://www.tadu.com/book/*/3*
// @exclude     *://www.tadu.com/book/*/4*
// @exclude     *://www.tadu.com/book/*/5*
// @exclude     *://www.tadu.com/book/*/6*
// @exclude     *://www.tadu.com/book/*/7*
// @exclude     *://www.tadu.com/book/*/8*
// @exclude     *://www.tadu.com/book/*/9*
// @exclude     *://www.25zw.com/lastupdate/
// @exclude     *://www.25zw.com/postdate/
// @exclude     *://www.25zw.com/monthvisit/
// @exclude     *://www.25zw.com/goodnum/
// @exclude     *://www.25zw.com/goodnew/
// @grant       unsafeWindow
// @grant       GM_openInTab
// @grant       window.close
// @grant       GM_getTab
// @grant       GM_saveTab
// @grant       GM_getTabs
// ==/UserScript==
