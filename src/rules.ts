import {
  BookAdditionalMetadate,
  attachmentClass,
  Chapter,
  ChapterAdditionalMetadate,
} from "./main";

export interface bookParseObject {
  bookUrl: string;
  bookname: string;
  author: string;
  introduction: string | null;
  introductionHTML: HTMLElement | null;
  additionalMetadate: BookAdditionalMetadate;
  chapters: Chapter[];
}
export interface chapterParseObject {
  chapterName: string | null;

  contentRaw: HTMLElement | null;
  contentText: string | null;
  contentHTML: HTMLElement | null;
  contentImages: attachmentClass[] | null;
  additionalMetadate: ChapterAdditionalMetadate | null;
}
export interface ruleClass {
  imageMode: "naive" | "TM";
  charset?: string;
  concurrencyLimit?: number;
  maxRunLimit?: number;
  bookParse(chapterParse: ruleClass["chapterParse"]): Promise<bookParseObject>;
  chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string,
    options: object
  ): Promise<chapterParseObject>;
}

/* #################################################### */

export const retryLimit = 5;
export const enaleDebug = false;
export const enableCustomChapterFilter = true;
export const enableCustomSaveOptions = true;
export const enableR18SiteWarning = false;

export const icon0 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFYElEQVR4nO2dIUxkORyHP4XD4E6RYNZgUGvWonAnVqxDbbJiNWLNOsQ65Oo1CMQIFAnJJiQIcgY7YhIEbgTJiEkm4USPuyNh3pv2tf33tb9f8kl4fe3H0Pm37xXi50/gHJgBC+C5YB6Bv4AL4CuwH7872skBcI/9oA5lBpwAO1F7p/IcUf5fuy8L4AzYjthPVWYfeMJ+wFLxABxG660K8xv7QcrBWawOqykfsB+YnEzQv4RXOcV+UHJzD+zF6LwaMsF+QCyYo3kBALfYD4YVK+DL8C4cd+6wHwhrfgJbQztyrJEAjhvgj4F9OcrUKMA33Me778/NaLCUXKMA27ivt48BP7vArYU0k1oFAPeRHjrJPQ3u0ZGlZgHATe5+Bv6ecxooGtUuwEuOCVvsugd2vXp0ZGlFAHDL3bOA3zfHzSmqTEsCgNsjcBXwO5e4T5Hq0poA4OYFoWsg1RWNWhTgJZ8ImxdcUdFuo5YFADcvmAZcY0olRaPWBQD313wZcJ0n3Fa6UUcC/JfvAdda4TagjjYS4HWOcF/7fK/5i5FODmvcDzC0eveOsO3xt4xwRVECvJ1t3MMmvtd+AN5HuH62SIDunOC/tLxgREUjCdCf0HnBKFYUJcBm2SNsXnCZqD3RIgE2zzZuidi3PVPcxLLISAD/fMYtDvm0qdht6BIgLIf4zwuWOHmKigQIzy5hhbSiKocSYFi2cFVA3zZ+ytjGztQogMVS7Vf85gVPFLLVrEYBrGbcvlvRJzbNfJ0aBbDc1++7Fd28bFyjAOdRe8g/PlvOfhm18d/UKMCKMjZqHNM/L1hiXCmsUYBn3ILMZ+zX6N/jVgi72mr6KFqtArzwiJtsneE+li3oezLJdNGodgHGgOm3AQlgz03vKCWMBLDnrneUEkYC2CMBGkcCNI4EaBwJ0DgSYEMecE/mbkLIA59NCnCzplElEbqfLvTJXwlQGEN2z+zjv4GzKQFK/xewZPiCTumS6xOgg4cI9xiyZ08CFIIESBwJYI8E6EACJI4EsEcCdCABEkcC2CMBOpAAiSMB7JEAHUiAxJEA9kiADiRA4kgAeyRABxIgcSSAPRKgAwmQOBLAHgnQgQRIHAlgjwToQAIkjgSwRwJ0IAESRwLYYyrA7zWNKgUJkDgSwB4J0IEESBwJYE8zAqxwr0T7webv2Ivxbv2PHtc7xb1qNucDpc0I8DHTPcXIB/yPi5MAHcT4KM+dXH3ThADzXDcUMSHHxEmADr5kuqcYOSJfvzQjwIKCz8/7X3bof8O3BAjkDvtXuPcl5HBICeDB9yx3FpZj8vdHcwKsKOCsnDeyhzvNSwJkYEp5hypfY9MXTQrwjDtJo5ScYNcPzQrwTBmHOx1g+y7BpgV4xJ21Z5Ut8hV8JMAaLpPf5fqcdbRLAmTE4lj1wwHtlQCRyV0l3MHvnF8JkIGcVcLc1T4JsCE5qoQW1T4JsCGpq4RW1b5iBbhe0yhLUlYJS7xfCfAGKaqE3wq4LwngQcxTta2rfRIggDlxqoQlVPskQCAxqoQlVPskwACG7CUspdonAQYQWiUsqdonAQYSUiUsqdonASLgUyUsrdonASKwwj2y1ZcSq30SIBKbVAlLK29LgMh0VQlLrfZJgMi89aRxydU+CRCZOe5g6JfsMo6TwiVARJbABe7r3pgmfRJASAAhAQQSQCABmsdUgKs1jRL5uO0dpYSRAPZMekcpYS7WNErk47R3lBLmx5pGiXyYvi1lDFumaua6f4jS5w77jmiRBa/XM8zyjnHX0sfIkrjPPQzOAeNdTRsbUzbb2ZQ9W7i9dBNghltyjUHrny4r3JtHJ//0b9RH4P8GSxsCzEN/51YAAAAASUVORK5CYII=";
export const icon1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAESElEQVR4nO2cLUxcQRSFv4QgEBiSKgQCh6pCouvQlbVVdaRuTFUNoqaqEkktCoVD4HBITBMMosmaVsxu+kL3l3lv7p13z5ccyc68OSf3sLtvHwghhBBCjJM/hRKNowAERwEIjgIQHAUgOApAcBSA4CgAwVEAgqMABEcBCI4CEBwFIDgKQHAUgOAoAMFRAIKjAARHAQiOAhAcBSA4CkBwFIDgKADBUQCCowAERwEIjgIQHAUgOApAcBSA4CgAzkmUm9SqUvHpjYSEvRky35iEvSky35iEvTky35iEvUky35iEvVky35iEvWky35iEvXky35iEvYky35iEvZky35iEvaky35iEvbky35iEvcky35iEvdky35iEveky35iEzA9PQuaHJyHzm2e78O8T7Zhfeq2j4i1wDvyi/GAT/s1P5Gs9J197SN4An4A7hjlgz+a/fM078lm8KXxt92wDp8BPYEL9g/ZoflcT8tmcMrKK6I54TwfueS/NV8SyEe/54D3uoZmK2GTEt2KA5dov5bYiXjvivRthsea6Mq+Ivka8V0NqrlWqahUx1IjfRGeF15DWWCMVrnG2xhpDaLCKqDHiV+ka+ADs9nA9ack6qYfX3yXv9XrJOkOruCIsRvxLPZANOXztRSwhzVkvDbDO4fR1H+asV0trV4SHEf8M/ABOVm22B1Jn3VRhvRPytT1jc7YLK8LTiN/Z/FyLSNT/Vm8HZxVhtYnZiD8oOc3GOcC+Iqou9gx8p86Ib40T8tnUrogqi1wB76k/4ltkh3xWVzQegHvgM7Df6/HEYp98hvc0EoAn8hg7HuAwonNMPtsnnAVggkZ8TboV0cfb9aIRf4ZGvCX7ZA9KKmLjEf8NjXiPHJO92bQiFICRUCUAqgBfVK+AedI/gXVx80/goorQ28BhcPs2cFlF6IOgMpr7IGiRVBHrM5qPguep5vf9rWF1v0DVxbrS18EBvw5epGv6u+fPOx7uGXQXgJnGXBHWt4Q1EYCuhrwptBYebgptNgBd3dBORcxG/A325zaaAMz0G7gA3gFbaxpSgy3yni7Ie7Q+p9EGoKtH4AtwtNqfwTia7uER+/MIF4CuboCPwN5Su/phb7pWKyM+RABmGqoiWh7xoQLQ1SPwlbKKOJq+RssjPmwAurpl/YqYjfhbB/tWAHrWBLjk/9/HzX4XeYnd7yIVgMqa/T7O+neR1jLfgKQASIYy34CkAEiGcvGACKmu5j5DKPJboQha9BZ4Lh4eEiX1o+LnCKoi2tMgTxJVRfjWRiO+FFWEH5k/TVwVUV/mD4ueh4cHTY5ZVUd8KaqI/mQ+4ktRRWwulyO+FFXEcjU14ktRRfxT8yO+lIgVMcoRX8rYP2gKNeJLGVNFhB/xpbRYERrxA+C9IjTiK+KpIjTijbGoCI14hwxdERrxDdFnRWjEN85rKkIjfoSsqgiN+EB0K0IjXgghhBDh+Avri3imoU6g/AAAAABJRU5ErkJggg==";

export const r18SiteList = [
  "www.01bzw.org",
  "www.dierbanzhu1.com",
  "m.yuzhaige.cc",
];

export async function getRule(): Promise<ruleClass> {
  const host: string = document.location.host;
  let ruleClass;
  switch (host) {
    case "www.ciweimao.com": {
      const { ciweimao } = await import("./rules/ciweimao");
      ruleClass = ciweimao;
      break;
    }
    case "www.uukanshu.com": {
      const { uukanshu } = await import("./rules/uukanshu");
      ruleClass = uukanshu;
      break;
    }
    case "www.yruan.com": {
      const { yrun } = await import("./rules/yruan");
      ruleClass = yrun;
      break;
    }
    case "www.biquwoo.com": {
      const { biquwo } = await import("./rules/biquge");
      ruleClass = biquwo;
      break;
    }
    case "www.shuquge.com": {
      const { shuquge } = await import("./rules/biquge");
      ruleClass = shuquge;
      break;
    }
    case "www.dingdiann.net": {
      const { dingdiann } = await import("./rules/biquge");
      ruleClass = dingdiann;
      break;
    }
    case "www.lewenn.com":
    case "www.xkzw.org": {
      const { xkzw } = await import("./rules/xkzw");
      ruleClass = xkzw;
      break;
    }
    case "www.266ks.com": {
      const { c226ks } = await import("./rules/226ks");
      ruleClass = c226ks;
      break;
    }
    case "book.sfacg.com": {
      const { sfacg } = await import("./rules/sfacg");
      ruleClass = sfacg;
      break;
    }
    case "www.hetushu.com": {
      const { hetushu } = await import("./rules/hetushu");
      ruleClass = hetushu;
      break;
    }
    case "www.shouda8.com":
    case "www.shouda88.com": {
      const { shouda8 } = await import("./rules/shouda8");
      ruleClass = shouda8;
      break;
    }
    case "www.gebiqu.com": {
      const { gebiqu } = await import("./rules/biquge");
      ruleClass = gebiqu;
      break;
    }
    case "www.meegoq.com":
    case "www.viviyzw.com": {
      const { meegoq } = await import("./rules/meegoq");
      ruleClass = meegoq;
      break;
    }
    case "www.xiaoshuodaquan.com": {
      const { xiaoshuodaquan } = await import("./rules/xiaoshuodaquan");
      ruleClass = xiaoshuodaquan;
      break;
    }
    case "book.qidian.com": {
      const { qidian } = await import("./rules/qidian");
      ruleClass = qidian;
      break;
    }
    case "www.jjwxc.net": {
      const { jjwxc } = await import("./rules/jjwxc");
      ruleClass = jjwxc;
      break;
    }
    case "www.81book.com": {
      const { zwdu } = await import("./rules/biquge");
      ruleClass = zwdu;
      break;
    }
    case "book.zongheng.com":
    case "huayu.zongheng.com": {
      const { zongheng } = await import("./rules/zongheng");
      ruleClass = zongheng;
      break;
    }
    case "www.17k.com": {
      const { c17k } = await import("./rules/17k");
      ruleClass = c17k;
      break;
    }
    case "www.shuhai.com":
    case "mm.shuhai.com": {
      const { shuhai } = await import("./rules/shuhai");
      ruleClass = shuhai;
      break;
    }
    case "www.gongzicp.com": {
      const { gongzicp } = await import("./rules/gongzicp");
      ruleClass = gongzicp;
      break;
    }
    case "m.yuzhaige.cc": {
      const { yuzhaige } = await import("./rules/yuzhaige");
      ruleClass = yuzhaige;
      break;
    }
    case "www.linovel.net": {
      const { linovel } = await import("./rules/linovel");
      ruleClass = linovel;
      break;
    }
    case "www.xinwanben.com": {
      const { xinwanben } = await import("./rules/xinwanben");
      ruleClass = xinwanben;
      break;
    }
    case "www.tadu.com": {
      const { tadu } = await import("./rules/tadu");
      ruleClass = tadu;
      break;
    }
    case "www.idejian.com": {
      const { idejian } = await import("./rules/idejian");
      ruleClass = idejian;
      break;
    }
    case "www.qimao.com": {
      const { qimao } = await import("./rules/qimao");
      ruleClass = qimao;
      break;
    }
    case "www.wenku8.net": {
      const { wenku8 } = await import("./rules/wenku8");
      ruleClass = wenku8;
      break;
    }
    case "www.dmzj.com":
    case "www.dmzj1.com": {
      const { dmzj } = await import("./rules/dmzj");
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
      const { sosadfun } = await import("./rules/sosadfun");
      ruleClass = sosadfun;
      break;
    }
    case "www.westnovel.com": {
      const { westnovel } = await import("./rules/westnovel");
      ruleClass = westnovel;
      break;
    }
    case "www.mht.tw": {
      const { mht } = await import("./rules/mht");
      ruleClass = mht;
      break;
    }
    case "www.01bzw.org":
    case "www.dierbanzhu1.com": {
      const { dierbanzhu } = await import("./rules/dierbanzhu");
      ruleClass = dierbanzhu;
      break;
    }
    case "www.xbiquge.so": {
      const { xbiquge } = await import("./rules/biquge");
      ruleClass = xbiquge;
      break;
    }
    case "www.hongyeshuzhai.com": {
      const { hongyeshuzhai } = await import("./rules/biquge");
      ruleClass = hongyeshuzhai;
      break;
    }
    default: {
      throw new Error("Not Found Rule!");
    }
  }
  const rule = new ruleClass();
  return rule;
}
