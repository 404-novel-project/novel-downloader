import { Book, Chapter } from "../main";

interface tabData {
  [key: string]: string;
}
interface tabDataRaw {
  domain: string;
  value: tabData;
}

const TabDataKeyName = "data-5186766268769811";
function setTabData(key: string, value: string): Promise<tabData> {
  return new Promise((resolve, reject) => {
    GM_getTab(async (curTabObject) => {
      const _tabData = await getTabData(document.location.hostname);
      let tabData: tabData;
      if (_tabData) {
        tabData = _tabData;
      } else {
        tabData = {};
      }
      tabData[key] = value;
      (<any>curTabObject)[TabDataKeyName] = {
        domain: document.location.hostname,
        value: tabData,
      };
      GM_saveTab(curTabObject);
      resolve(tabData);
    });
  });
}

function getTabData(domain: string): Promise<tabData | null> {
  return new Promise((resolve, reject) => {
    GM_getTabs((curTabObjects) => {
      for (let i in curTabObjects) {
        const rawData = curTabObjects[i] as any;
        if (
          typeof rawData === "undefined" ||
          Object.keys(rawData).length === 0
        ) {
          continue;
        }
        let data: tabDataRaw | undefined;
        if (rawData[TabDataKeyName]) {
          data = rawData[TabDataKeyName] as tabDataRaw;
        } else {
          continue;
        }
        const dataDomain = data.domain;
        const tabData = data.value;
        if (dataDomain === domain) {
          resolve(tabData);
        }
      }
      resolve(null);
    });
  });
}

function deleteTabData(key: string): Promise<tabData> {
  return new Promise((resolve, reject) => {
    GM_getTab(async (curTabObject) => {
      const _tabData = await getTabData(document.location.hostname);
      let tabData: tabData;
      if (_tabData) {
        tabData = _tabData;
      } else {
        tabData = {};
      }
      if (tabData[key]) {
        delete tabData[key];
      }
      resolve(tabData);
    });
  });
}

function randomChoose(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (
  document.location.origin === "https://greasyfork.org" &&
  document.location.pathname.includes(
    "/scripts/406070-%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8"
  )
) {
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
    "https://sosadfun.com/threads/36426/profile",
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
  ];

  async function runTest() {
    setTabData("runTest", "true");

    const openWindow = (u: string[] | string) => {
      if (typeof u === "string") {
        GM_openInTab(u);
      } else if (Array.isArray(u)) {
        const url = randomChoose(u);
        GM_openInTab(url);
      }
    };
    for (const u of exampleUrls) {
      await sleep(500);
      openWindow(u);
    }
  }
  (<any>unsafeWindow).runTest = runTest;
} else {
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(async () => {
      const runFlag = await getTabData("greasyfork.org");
      if (runFlag) {
        console.log("[novel-downloader-tester]开始运行测试……");

        function chapterFilter(chapter: Chapter) {
          return chapter.chapterNumber <= 20;
        }
        (<any>unsafeWindow).chapterFilter = chapterFilter;

        function customFinishCallback(book: Book) {
          window.close();
        }
        (<any>unsafeWindow).customFinishCallback = customFinishCallback;

        document.getElementById("novel-downloader")?.click();
      }
    }, 1000 + Math.random() * 3000);
  });
}

console.log("[novel-downloader-tester]测试脚本载入成功……");
