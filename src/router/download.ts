import { BaseRuleClass } from "../rules";

export async function getRule(): Promise<BaseRuleClass> {
  const host: string = document.location.host;
  let ruleClass;
  switch (host) {
    case "www.ciweimao.com": {
      const { Ciweimao } = await import("../rules/special/ciweimao");
      ruleClass = Ciweimao;
      break;
    }
    case "www.uukanshu.com": {
      const { Uukanshu } = await import("../rules/uukanshu");
      ruleClass = Uukanshu;
      break;
    }
    case "www.yruan.com": {
      const { Yrun } = await import("../rules/yruan");
      ruleClass = Yrun;
      break;
    }
    case "www.shuquge.com":
    case "www.sizhicn.com": {
      const { shuquge } = await import("../rules/biquge/type2");
      ruleClass = shuquge();
      break;
    }
    case "www.dingdiann.net": {
      const { Dingdiann } = await import("../rules/biquge/dingdiann");
      ruleClass = Dingdiann;
      break;
    }
    case "www.biquge66.com":
    case "www.lewenn.com":
    case "www.klxs.la":
    case "www.xkzw.org": {
      const { Xkzw } = await import("../rules/special/xkzw");
      ruleClass = Xkzw;
      break;
    }
    case "www.266ks.com": {
      const { c226ks } = await import(
        "../rules/onePageWithoutSectionWithMultiIndexPage/226ks"
      );
      ruleClass = c226ks();
      break;
    }
    case "book.sfacg.com": {
      const { Sfacg } = await import("../rules/special/sfacg");
      ruleClass = Sfacg;
      break;
    }
    case "www.hetushu.com":
    case "hetushu.com": {
      const { Hetushu } = await import("../rules/special/hetushu");
      ruleClass = Hetushu;
      break;
    }
    case "www.shouda8.com":
    case "www.shouda88.com": {
      const { Shouda8 } = await import("../rules/shouda8");
      ruleClass = Shouda8;
      break;
    }
    case "www.gebiqu.com": {
      const { gebiqu } = await import("../rules/biquge/type1");
      ruleClass = gebiqu();
      break;
    }
    case "www.meegoq.com":
    case "www.viviyzw.com": {
      const { Meegoq } = await import("../rules/meegoq");
      ruleClass = Meegoq;
      break;
    }
    case "www.xiaoshuodaquan.com":
    case "www.1pwx.com":
    case "1pwx.com": {
      const { Xiaoshuodaquan } = await import("../rules/xiaoshuodaquan");
      ruleClass = Xiaoshuodaquan;
      break;
    }
    case "book.qidian.com": {
      const { Qidian } = await import("../rules/special/qidian");
      ruleClass = Qidian;
      break;
    }
    case "www.jjwxc.net": {
      const { Jjwxc } = await import("../rules/special/jjwxc");
      ruleClass = Jjwxc;
      break;
    }
    case "www.biquwoo.com":
    case "www.biquwo.org":
    case "www.hongyeshuzhai.com": {
      const { common } = await import("../rules/biquge/type1");
      ruleClass = common();
      break;
    }
    case "www.81book.com":
    case "www.81zw.com": {
      const { c81book } = await import("../rules/biquge/type1");
      ruleClass = c81book();
      break;
    }
    case "book.zongheng.com":
    case "huayu.zongheng.com": {
      const { Zongheng } = await import("../rules/special/zongheng");
      ruleClass = Zongheng;
      break;
    }
    case "www.17k.com": {
      const { C17k } = await import("../rules/special/17k");
      ruleClass = C17k;
      break;
    }
    case "www.shuhai.com":
    case "mm.shuhai.com": {
      const { Shuhai } = await import("../rules/special/shuhai");
      ruleClass = Shuhai;
      break;
    }
    case "www.gongzicp.com":
    case "gongzicp.com": {
      const { Gongzicp } = await import("../rules/special/gongzicp");
      ruleClass = Gongzicp;
      break;
    }
    case "m.yuzhaige.cc":
    case "m.yushuge123.com": {
      const { Yuzhaige } = await import("../rules/yuzhaige");
      ruleClass = Yuzhaige;
      break;
    }
    case "www.linovel.net": {
      const { Linovel } = await import("../rules/linovel");
      ruleClass = Linovel;
      break;
    }
    case "www.xinwanben.com": {
      const { Xinwanben } = await import("../rules/biquge/xinwanben");
      ruleClass = Xinwanben;
      break;
    }
    case "www.tadu.com": {
      const { Tadu } = await import("../rules/special/tadu");
      ruleClass = Tadu;
      break;
    }
    case "www.idejian.com": {
      const { Idejian } = await import("../rules/idejian");
      ruleClass = Idejian;
      break;
    }
    case "www.qimao.com": {
      const { Qimao } = await import("../rules/qimao");
      ruleClass = Qimao;
      break;
    }
    case "www.wenku8.net": {
      const { Wenku8 } = await import("../rules/special/wenku8");
      ruleClass = Wenku8;
      break;
    }
    case "manhua.dmzj.com":
    case "www.dmzj.com": {
      const { Dmzj } = await import("../rules/special/dmzj");
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
      const { Sosadfun } = await import("../rules/special/sosadfun");
      ruleClass = Sosadfun;
      break;
    }
    case "www.westnovel.com": {
      const { Westnovel } = await import("../rules/westnovel");
      ruleClass = Westnovel;
      break;
    }
    case "www.mht.tw":
    case "www.mht99.com": {
      const { Mht } = await import("../rules/biquge/mht");
      ruleClass = Mht;
      break;
    }
    case "www.dierbanzhu1.com":
    case "www.banzhuer.org":
    case "www.bz01.org": {
      const { Dierbanzhu } = await import("../rules/dierbanzhu");
      ruleClass = Dierbanzhu;
      break;
    }
    case "www.xbiquge.so": {
      const { Xbiquge } = await import("../rules/biquge/xbiquge");
      ruleClass = Xbiquge;
      break;
    }
    case "www.linovelib.com": {
      const { Linovelib } = await import("../rules/linovelib");
      ruleClass = Linovelib;
      break;
    }
    case "www.luoqiuzw.com": {
      const { luoqiuzw } = await import("../rules/biquge/type1");
      ruleClass = luoqiuzw();
      break;
    }
    case "www.yibige.la": {
      const { Yibige } = await import("../rules/yibige");
      ruleClass = Yibige;
      break;
    }
    case "www.fushuwang.org": {
      const { Fushuwang } = await import("../rules/fushuwang");
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
      const { Soxscc } = await import("../rules/soxscc");
      ruleClass = Soxscc;
      break;
    }
    case "www.fuguoduxs.com":
    case "www.shubaowa.org": {
      const { Shubaowa } = await import("../rules/shubaowa");
      ruleClass = Shubaowa;
      break;
    }
    case "www.xyqxs.cc": {
      const { xyqxs } = await import("../rules/biquge/type2");
      ruleClass = xyqxs();
      break;
    }
    case "www.630shu.net": {
      const { c630shu } = await import("../rules/onePageWithoutSection/630shu");
      ruleClass = c630shu;
      break;
    }
    case "www.qingoo.cn": {
      const { Qingoo } = await import("../rules/qingoo");
      ruleClass = Qingoo;
      break;
    }
    case "www.trxs.cc":
    case "www.trxs123.com":
    case "www.jpxs123.com":
    case "trxs.cc":
    case "trxs123.com":
    case "jpxs123.com": {
      const { trxs } = await import("../rules/onePageWithoutSection/trxs");
      ruleClass = trxs();
      break;
    }
    case "www.tongrenquan.org":
    case "www.tongrenquan.me":
    case "tongrenquan.me":
    case "tongrenquan.org": {
      const { tongrenquan } = await import(
        "../rules/onePageWithoutSection/trxs"
      );
      ruleClass = tongrenquan();
      break;
    }
    case "www.imiaobige.com": {
      const { Imiaobige } = await import("../rules/imiaobige");
      ruleClass = Imiaobige;
      break;
    }
    case "www.256wxc.com":
    case "www.256wenku.com": {
      const { c256wxc } = await import("../rules/onePageWithoutSection/256wxc");
      ruleClass = c256wxc;
      break;
    }
    case regExpMatch(/lofter\.com$/): {
      const { Lofter } = await import("../rules/special/lofter");
      ruleClass = Lofter;
      break;
    }
    case "www.lwxs9.org": {
      const { lwxs9 } = await import("../rules/biquge/type1");
      ruleClass = lwxs9();
      break;
    }
    case "www.shubl.com": {
      const { Shubl } = await import("../rules/special/shubl");
      ruleClass = Shubl;
      break;
    }
    case "www.ujxs.net": {
      const { Ujxs } = await import("../rules/ujxs");
      ruleClass = Ujxs;
      break;
    }
    case "m.haitangtxt.net": {
      const { Haitangtxt } = await import("../rules/haitangtxt");
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
      const { Longmabook } = await import("../rules/special/longmabook");
      ruleClass = Longmabook;
      break;
    }
    case "dijiubook.net": {
      const { dijiubook } = await import("../rules/biquge/type1");
      ruleClass = dijiubook();
      break;
    }
    case "www.biquwx.la": {
      const { biquwx } = await import("../rules/biquge/type1");
      ruleClass = biquwx();
      break;
    }
    case "www.25zw.com": {
      const { C25zw } = await import("../rules/biquge/25zw");
      ruleClass = C25zw;
      break;
    }
    case "www.tycqxs.com": {
      const { tycqxs } = await import("../rules/biquge/type1");
      ruleClass = tycqxs();
      break;
    }
    default: {
      throw new Error("Not Found Rule!");
    }
  }
  const rule = new ruleClass();
  return rule;

  function regExpMatch(regexp: RegExp) {
    if (regexp.test(host)) {
      return host;
    }
  }
}
