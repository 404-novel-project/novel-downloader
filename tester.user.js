// ==UserScript==
// @name        小说下载器测试脚本
// @version     4.8.3.636
// @author      bgme
// @description 小说下载器测试脚本
// @match       *://www.ciweimao.com/chapter-list/*
// @match       *://www.ciweimao.com/book/*
// @match       *://book.sfacg.com/Novel/*/MainIndex/
// @match       *://book.sfacg.com/Novel/*/
// @match       *://m.sfacg.com/b/*/
// @match       *://book.qidian.com/info/*
// @match       *://www.jjwxc.net/onebook.php?novelid=*
// @match       *://www.gongzicp.com/novel-*.html
// @match       *://gongzicp.com/novel-*.html
// @match       *://book.zongheng.com/showchapter/*.html
// @match       *://book.zongheng.com/book/*.html
// @match       *://huayu.zongheng.com/showchapter/*.html
// @match       *://huayu.zongheng.com/book/*.html
// @match       *://www.linovel.net/book/*.html
// @match       *://www.17k.com/list/*.html
// @match       *://www.17k.com/book/*.html
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
// @match       *://www.shuquge.com/txt/*/index.html
// @match       *://wap.shuquge.com/s/*.html
// @match       *://wap.shuquge.com/d/*.html
// @match       *://www.sizhicn.com/txt/*/index.html
// @match       *://www.dingdiann.net/ddk*/
// @match       *://www.xkzw.org/xkzw*/
// @match       *://www.lewenn.com/lw*/
// @match       *://www.266ks.com/book/*/
// @match       *://www.266ks.com/book/*/index*.html
// @match       *://www.hetushu.com/book/*/index.html
// @match       *://hetushu.com/book/*/index.html
// @match       *://www.shouda88.com/*/
// @match       *://www.gebiqu.com/biquge_*/
// @match       *://www.viviyzw.com/book*.html
// @match       *://www.1pwx.com/*.htm
// @match       *://www.81book.com/book/*/
// @match       *://www.81zw.com/book/*/
// @match       *://m.yushuge123.com/*/*/
// @match       *://www.xinwanben.com/*/
// @match       *://m.xinwanben.com/*/
// @match       *://www.idejian.com/book/*/
// @match       *://www.wenku8.net/novel/*/*/index.htm
// @match       *://www.dmzj.com/info/*.html
// @match       *://manhua.dmzj.com/*
// @match       *://www.westnovel.com/*/*/
// @match       *://www.mht99.com/*/
// @match       *://www.bz01.org/*_*/
// @match       *://www.banzhuer.org/*_*/
// @match       *://www.xbiquge.so/book/*/
// @match       *://www.hongyeshuzhal.com/shuzhai/*/
// @match       *://www.linovelib.com/novel/*/catalog
// @match       *://www.linovelib.com/novel/*.html
// @match       *://www.luoqiuzw.com/book/*/
// @match       *://www.yibige.cc/*/
// @match       *://www.fushuwang.org/*/*/*/*.html
// @match       *://www.fushuwang.org/*/*/*/*.html?*
// @match       *://www.fushuwang.org/*/*/*.html
// @match       *://www.fushuwang.org/*/*/*.html?*
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
// @match       *://www.yqbiqu.com/html/*/*/index.html
// @match       *://www.630shu.net/shu/*.html
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
// @match       *://www.256wenku.com/read/*/index.html
// @match       *://www.256wenku.com/read/*/
// @match       *://www.biquge66.com/biquge*/
// @match       *://*.lofter.com/
// @match       *://*.lofter.com/?page=*
// @match       *://www.lwxs9.org/*/*/
// @match       *://www.shubl.com/book/book_detail/*
// @match       *://m.haitangtxt.net/*/*/
// @match       *://ebook.longmabook.com/*
// @match       *://www.longmabookcn.com/*
// @match       *://ebook.lmbooks.com/*
// @match       *://www.lmebooks.com/*
// @match       *://www.haitbook.com/*
// @match       *://www.htwhbook.com/*
// @match       *://www.myhtebook.com/*
// @match       *://www.lovehtbooks.com/*
// @match       *://www.myhtebooks.com/*
// @match       *://www.myhtlmebook.com/*
// @match       *://jp.myhtebook.com/*
// @match       *://jp.myhtlmebook.com/*
// @match       *://ebook.urhtbooks.com/*
// @match       *://www.urhtbooks.com/*
// @match       *://www.newhtbook.com/*
// @match       *://www.lvhtebook.com/*
// @match       *://jp.lvhtebook.com/*
// @match       *://www.htlvbooks.com/*
// @match       *://dijiubook.net/*_*
// @match       *://www.xbiquwx.la/*_*/
// @match       *://www.25zw.com/*/
// @match       *://www.zmccx.com/*_*/
// @match       *://www.kanunu8.com/*
// @match       *://www.ciyuanji.com/bookDetails/*
// @match       *://ciyuanji.com/bookDetails/*
// @match       *://m.wanben.org/*/
// @match       *://www.wanben.org/*/
// @match       *://www.ranwen.la/files/article/*/*/
// @match       *://www.wangshuge.com/books/*/*/
// @match       *://m.baihexs.com/info-*/
// @match       *://www.quanshuzhai.com/book/*.html
// @match       *://masiro.me/admin/novelView?novel_id=*
// @match       *://www.pixiv.net/novel/show.php?*
// @match       *://www.pixiv.net/novel/series/*
// @match       *://kakuyomu.jp/works/*
// @match       *://ncode.syosetu.com/*/
// @match       *://ncode.syosetu.com/*
// @match       *://novel18.syosetu.com/*/
// @match       *://novel18.syosetu.com/*
// @match       *://syosetu.org/novel/*/
// @match       *://houhuayuan.xyz/*
// @match       *://zhaoze.art/*/
// @match       *://www.myrics.com/novels/*
// @match       *://m.lusetxt.com/ebook/*.html
// @match       *://www.lstxt.cc/ebook/*.html
// @match       *://www.a7xs.com/*/*/
// @match       *://www.shencou.com/books/read_*.html
// @match       *://www.tianyabooks.com/*/*/
// @match       *://www.aixiawx.com/*/*/
// @match       *://jingcaiyuedu6.com/novel/*.html
// @match       *://www.hanwujinian.com/book/*
// @match       *://www.biqu55.net/*_*/
// @match       *://manga.bilibili.com/detail/mc*
// @match       *://www.aixdzs.com/novel/*
// @match       *://www.liuxs.la/bookinfo-*/
// @match       *://www.cool18.com/bbs4/index.php?*
// @match       *://www.b5200.net/*_*/
// @match       *://www.xsyq.cc/html/*/*/index.html
// @match       *://www.dushu369.com/*/*/
// @match       *://www.18kanshu.com/*/*/info.html
// @match       *://www.18kanshu.com/module/novel/info.php?*
// @match       *://www.bxwx888.org/txt/*/
// @match       *://www.xiaoshuowu.com/html/*/*/
// @match       *://www.xrzww.com/bookdetail/*
// @match       *://colorful-fantasybooks.com/module/novel/info.php?*
// @match       *://www.dizishu.com/*/*/
// @match       *://www.xbiquge.la/*/*/
// @match       *://www.akatsuki-novels.com/stories/index/novel_id~*
// @match       *://www.alphapolis.co.jp/novel/*/*
// @match       *://novelup.plus/story/*
// @match       https://greasyfork.org/*/scripts/406070-%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8
// @name:en     novel-downloader-tester
// @namespace   https://blog.bgme.me
// @icon        https://cdn.jsdelivr.net/gh/yingziwu/novel-downloader/assets/icon.png
// @license     AGPL-3.0
// @run-at      document-start
// @noframes    true
// @exclude     *://www.jjwxc.net/onebook.php?novelid=*&chapterid=*
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
// @exclude     *://m.haitangtxt.net/tag/*/
// @exclude     *://m.haitangtxt.net/sort/*/
// @exclude     *://m.haitangtxt.net/top/*/
// @exclude     *://m.haitangtxt.net/full/*/
// @exclude     *://m.haitangtxt.net/book/*/
// @exclude     *://www.linovel.net/book/*/*.html
// @exclude     *://www.qimao.com/shuku/*-*/
// @exclude     *://www.trxs.cc/tongren/*/*.html
// @exclude     *://www.trxs123.com/tongren/*/*.html
// @exclude     *://www.tongrenquan.org/tongren/*/*.html
// @exclude     *://tongrenquan.org/tongren/*/*.html
// @exclude     *://www.jpxs123.com/*/*/*.html
// @exclude     *://www.25zw.com/lastupdate/
// @exclude     *://www.25zw.com/postdate/
// @exclude     *://www.25zw.com/monthvisit/
// @exclude     *://www.25zw.com/goodnum/
// @exclude     *://www.25zw.com/goodnew/
// @exclude     *://www.myrics.com/novels/*/chapters/*
// @exclude     *://dijiubook.net/*_*/*.html
// @exclude     *://ncode.syosetu.com/*/*/
// @exclude     *://novel18.syosetu.com/*/*/
// @exclude     *://manhua.dmzj.com/
// @exclude     *://houhuayuan.xyz/
// @exclude     *://book.sfacg.com/Novel/*/*/*/
// @exclude     *://www.alphapolis.co.jp/novel/*/*/episode/*
// @exclude     *://novelup.plus/story/*/*
// @grant       unsafeWindow
// @grant       GM_openInTab
// @grant       window.close
// @grant       GM_getTab
// @grant       GM_saveTab
// @grant       GM_getTabs
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
const TabDataKeyName = "data-5186766268769811";
function setTabData(key, value) {
    return new Promise((resolve, reject) => {
        GM_getTab(async (curTabObject) => {
            const _tabData = await getTabData(document.location.hostname);
            let tabData;
            if (_tabData) {
                tabData = _tabData;
            }
            else {
                tabData = {};
            }
            tabData[key] = value;
            curTabObject[TabDataKeyName] = {
                domain: document.location.hostname,
                value: tabData,
            };
            GM_saveTab(curTabObject);
            resolve(tabData);
        });
    });
}
function getTabData(domain) {
    return new Promise((resolve, reject) => {
        GM_getTabs((curTabObjects) => {
            for (const i in curTabObjects) {
                if (Object.prototype.hasOwnProperty.call(curTabObjects, i)) {
                    const rawData = curTabObjects[i];
                    if (typeof rawData === "undefined" ||
                        Object.keys(rawData).length === 0) {
                        continue;
                    }
                    let data;
                    if (rawData[TabDataKeyName]) {
                        data = rawData[TabDataKeyName];
                    }
                    else {
                        continue;
                    }
                    const dataDomain = data.domain;
                    const tabData = data.value;
                    if (dataDomain === domain) {
                        resolve(tabData);
                    }
                }
            }
            resolve(null);
        });
    });
}
function deleteTabData(key) {
    return new Promise((resolve, reject) => {
        GM_getTab(async (curTabObject) => {
            const _tabData = await getTabData(document.location.hostname);
            let tabData;
            if (_tabData) {
                tabData = _tabData;
            }
            else {
                tabData = {};
            }
            if (tabData[key]) {
                delete tabData[key];
            }
            resolve(tabData);
        });
    });
}
function randomChoose(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
if (document.location.origin === "https://greasyfork.org" &&
    document.location.pathname.includes("/scripts/406070-%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8")) {
    const exampleUrls = [
        [
            "https://www.ciweimao.com/chapter-list/100244593/book_detail",
            "https://www.ciweimao.com/chapter-list/100243812/book_detail",
            "https://www.ciweimao.com/chapter-list/100248092/book_detail",
        ],
        [
            "https://book.sfacg.com/Novel/160284/MainIndex/",
            "https://book.sfacg.com/Novel/286895/MainIndex/",
            "https://book.sfacg.com/Novel/447540/MainIndex/",
        ],
        [
            "https://book.qidian.com/info/1019664125",
            "https://book.qidian.com/info/1021617576",
            "https://book.qidian.com/info/1021635590",
        ],
        [
            "http://www.jjwxc.net/onebook.php?novelid=2267777",
            "http://www.jjwxc.net/onebook.php?novelid=395278",
            "http://www.jjwxc.net/onebook.php?novelid=4306657",
        ],
        [
            "http://book.zongheng.com/showchapter/1108153.html",
            "http://book.zongheng.com/showchapter/1057288.html",
            "http://book.zongheng.com/showchapter/952586.html",
        ],
        [
            "http://huayu.zongheng.com/showchapter/867082.html",
            "http://huayu.zongheng.com/showchapter/1120889.html",
            "http://huayu.zongheng.com/showchapter/1086399.html",
        ],
        [
            "https://www.linovel.net/book/109856.html",
            "https://www.linovel.net/book/106056.html",
            "https://www.linovel.net/book/105330.html",
        ],
        [
            "https://www.17k.com/list/3006464.html",
            "https://www.17k.com/list/3038645.html",
            "https://www.17k.com/list/3301855.html",
        ],
        [
            "http://www.shuhai.com/book/54334.htm",
            "http://www.shuhai.com/book/37784.htm",
            "http://www.shuhai.com/book/701.htm",
        ],
        [
            "http://mm.shuhai.com/book/55973.htm",
            "http://mm.shuhai.com/book/90856.htm",
            "http://mm.shuhai.com/book/57557.htm",
        ],
        [
            "http://www.tadu.com/book/catalogue/803448",
            "http://www.tadu.com/book/catalogue/776168",
            "http://www.tadu.com/book/catalogue/786116",
        ],
        [
            "https://www.qimao.com/shuku/209902/",
            "https://www.qimao.com/shuku/199373/",
            "https://www.qimao.com/shuku/209859/",
        ],
        "https://sosad.fun/threads/7857/profile",
        "https://wenzhan.org/threads/8503/profile",
        [
            "https://sosadfun.com/threads/36426/profile",
            "https://sosadfun.com/threads/5163/profile",
        ],
        "https://xn--pxtr7m5ny.com/threads/8998/profile",
        "https://xn--pxtr7m.com/threads/3370/profile",
        "https://xn--pxtr7m5ny.net/threads/13628/profile",
        "https://xn--pxtr7m.net/threads/3841/profile",
        "https://sosadfun.link/threads/4330/profile",
        "https://www.sosad.fun/threads/7857/profile",
        "https://www.wenzhan.org/threads/8503/profile",
        "https://www.sosadfun.com/threads/36426/profile",
        "https://www.xn--pxtr7m5ny.com/threads/8998/profile",
        "https://www.xn--pxtr7m.com/threads/3370/profile",
        "https://www.xn--pxtr7m5ny.net/threads/13628/profile",
        "https://www.xn--pxtr7m.net/threads/3841/profile",
        "https://www.sosadfun.link/threads/4330/profile",
        "https://www.uukanshu.com/b/151226/",
        "https://www.yruan.com/article/107112.html",
        "https://www.biquwo.org/bqw195972/",
        "https://www.sizhicn.com/txt/63542/index.html",
        "https://www.dingdiann.net/ddk254569/",
        "http://www.xkzw.org/xkzw288143/",
        "https://www.lewenn.com/lw315781/",
        "https://www.klxs.la/info-291641/",
        "https://www.266ks.com/461_461525/",
        "https://www.266ks.com/1_1420/index_2.html",
        [
            "https://www.hetushu.com/book/4268/index.html",
            "https://www.hetushu.com/book/4308/index.html",
            "https://www.hetushu.com/book/5/index.html",
        ],
        "https://hetushu.com/book/5626/index.html",
        "https://www.shouda88.com/117454/",
        "http://www.gebiqu.com/biquge_2181/",
        "http://www.viviyzw.com/book76557.html",
        "https://www.1pwx.com/xueyinglingzhu/",
        "https://www.81book.com/book/10304/",
        "http://m.yuzhaige.cc/33/33249/",
        "https://www.xinwanben.com/93974973/",
        "https://www.idejian.com/book/11539708/",
        "https://www.wenku8.net/novel/1/1758/index.htm",
        "https://www.dmzj.com/info/naniannatunaxieshier.html",
        "https://www.westnovel.com/dd/lms/",
        "https://www.mht.tw/21661/",
        "https://www.mht99.com/21661/",
        "http://www.dierbanzhu1.com/3_3348/",
        "https://www.xbiquge.so/book/43106/",
        "https://www.hongyeshuzhai.com/shuzhai/56609/",
        [
            "https://www.linovelib.com/novel/111/catalog",
            "https://www.linovelib.com/novel/112/catalog",
            "https://www.linovelib.com/novel/2547/catalog",
        ],
        "https://www.luoqiuzw.com/book/65403/",
        "https://www.yibige.la/249688/",
        "https://www.fushuwang.org/chuanyuechongsheng/2021n/1/28196.html",
        "https://www.soxscc.net/QiLingFuYunXiaoJiaoQi/",
        "https://www.soxscc.org/ZhongShengXiaoYuanGuoMinNvShenZhuaiFanTian/",
        "https://www.soxs.cc/TunShiXingKong/",
        "https://www.kubiji.net/298802/",
        [
            "http://www.shubaowa.org/7_7914/",
            "http://www.shubaowa.org/0_2/",
            "http://www.shubaowa.org/11_11568/",
        ],
        [
            "https://www.fuguoduxs.com/5_5914/",
            "https://www.fuguoduxs.com/9_9668/",
            "https://www.fuguoduxs.com/4_4790/",
        ],
        [
            "https://www.xyqxs.cc/html/112/112859/index.html",
            "https://www.xyqxs.cc/html/0/186/index.html",
            "https://www.xyqxs.cc/html/47/47987/index.html",
        ],
        [
            "https://www.630shu.net/shu/145476.html",
            "https://www.630shu.net/shu/105670.html",
        ],
        "http://www.trxs.cc/tongren/1768.html",
        "http://www.trxs123.com/tongren/2952.html",
        [
            "http://www.jpxs123.com/tongren/5578.html",
            "http://www.jpxs123.com/book/3940.html",
            "http://www.jpxs123.com/dsxs/2724.html",
            "http://www.jpxs123.com/xuanhuan/zhetian.html",
        ],
        "http://trxs.cc/tongren/1768.html",
        "http://trxs123.com/tongren/2952.html",
        "http://jpxs123.com/tongren/5578.html",
        "https://www.imiaobige.com/read/173201/",
        "https://www.256wxc.com/read/68624/index.html",
        "https://www.256wenku.com/read/7667/",
        "http://www.biquge66.com/biquge263372/",
        [
            "https://caogousheng.lofter.com/",
            "https://caogousheng.lofter.com/?page=2&t=1599134400003",
            "https://shuju.lofter.com/",
            "https://wangnuannuan.lofter.com/",
            "https://geekhome.lofter.com/",
            "https://absb6.lofter.com/",
        ],
        "http://www.bq8xs.com/3399/",
        "http://www.tongrenquan.org/tongren/5730.html",
        "https://www.tongrenquan.me/tongren/5373.html",
        "https://tongrenquan.me/tongren/5753.html",
        "http://tongrenquan.org/tongren/5730.html",
        "https://www.lwxs9.org/5/5203/",
        [
            "https://www.shubl.com/book/book_detail/100308566",
            "https://www.shubl.com/book/book_detail/100254251",
            "https://www.shubl.com/book/book_detail/100374396",
        ],
        "https://www.ujxs.net/read/10494/",
        [
            "http://m.haitangtxt.net/book/101821/",
            "http://m.haitangtxt.net/book/101832/",
        ],
        "https://gongzicp.com/novel-341364.html",
        "https://www.gongzicp.com/novel-406782.html",
        "https://ebook.longmabook.com/?act=showinfo&bookwritercode=EB20171122105148478253",
    ];
    async function runTest() {
        await setTabData("runTest", "true");
        const openWindow = (u) => {
            if (typeof u === "string") {
                GM_openInTab(u);
            }
            else if (Array.isArray(u)) {
                const url = randomChoose(u);
                GM_openInTab(url);
            }
        };
        for (const u of exampleUrls) {
            await sleep(500);
            openWindow(u);
        }
    }
    unsafeWindow.runTest = runTest;
}
else {
    window.addEventListener("DOMContentLoaded", () => {
        setTimeout(async () => {
            const runFlag = await getTabData("greasyfork.org");
            if (runFlag) {
                console.log("[novel-downloader-tester]开始运行测试……");
                function chapterFilter(chapter) {
                    return chapter.chapterNumber <= 20;
                }
                unsafeWindow.chapterFilter = chapterFilter;
                function customFinishCallback(book) {
                    window.close();
                }
                unsafeWindow.customFinishCallback = customFinishCallback;
                document.getElementById("novel-downloader")?.click();
            }
        }, 1000 + Math.random() * 3000);
    });
}
console.log("[novel-downloader-tester]测试脚本载入成功……");


/******/ })()
;