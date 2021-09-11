import { BaseRuleClass } from "./rules";

export async function getRule(): Promise<BaseRuleClass> {
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
    case "www.shuquge.com":
    case "www.sizhicn.com": {
      const { shuquge } = await import("./rules/biquge");
      ruleClass = shuquge();
      break;
    }
    case "www.dingdiann.net": {
      const { dingdiann } = await import("./rules/dingdiann");
      ruleClass = dingdiann;
      break;
    }
    case "www.biquge66.com":
    case "www.lewenn.com":
    case "www.klxs.la":
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
      ruleClass = gebiqu();
      break;
    }
    case "www.meegoq.com":
    case "www.viviyzw.com": {
      const { meegoq } = await import("./rules/meegoq");
      ruleClass = meegoq;
      break;
    }
    case "www.xiaoshuodaquan.com":
    case "www.1pwx.com": {
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
    case "www.biquwoo.com":
    case "www.biquwo.org":
    case "www.hongyeshuzhai.com": {
      const { common } = await import("./rules/biquge");
      ruleClass = common();
      break;
    }
    case "www.81book.com": {
      const { c81book } = await import("./rules/biquge");
      ruleClass = c81book();
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
    case "m.yuzhaige.cc":
    case "m.yushuge123.com": {
      const { yuzhaige } = await import("./rules/yuzhaige");
      ruleClass = yuzhaige;
      break;
    }
    case "www.linovel.net": {
      const { linovel } = await import("./rules/linovel");
      ruleClass = linovel;
      break;
    }
    case "www.xinwanben.com":
    case "www.wanben.org": {
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
    case "www.dmzj.com": {
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
    case "www.dierbanzhu1.com":
    case "www.banzhuer.org": {
      const { dierbanzhu } = await import("./rules/dierbanzhu");
      ruleClass = dierbanzhu;
      break;
    }
    case "www.xbiquge.so": {
      const { xbiquge } = await import("./rules/biquge");
      ruleClass = xbiquge;
      break;
    }
    case "www.linovelib.com": {
      const { linovelib } = await import("./rules/linovelib");
      ruleClass = linovelib;
      break;
    }
    case "www.luoqiuzw.com": {
      const { luoqiuzw } = await import("./rules/biquge");
      ruleClass = luoqiuzw();
      break;
    }
    case "www.yibige.la": {
      const { yibige } = await import("./rules/yibige");
      ruleClass = yibige;
      break;
    }
    case "www.fushuwang.org": {
      const { fushuwang } = await import("./rules/fushuwang");
      ruleClass = fushuwang;
      break;
    }
    case "www.soxscc.net":
    case "www.soxscc.org":
    case "www.soxs.cc":
    case "www.soshuw.com":
    case "www.soshuwu.org": {
      const { soxscc } = await import("./rules/soxscc");
      ruleClass = soxscc;
      break;
    }
    case "www.fuguoduxs.com":
    case "www.shubaowa.org": {
      const { shubaowa } = await import("./rules/shubaowa");
      ruleClass = shubaowa;
      break;
    }
    case "www.xyqxs.cc": {
      const { xyqxs } = await import("./rules/biquge");
      ruleClass = xyqxs();
      break;
    }
    case "www.630shu.net": {
      const { c630shu } = await import("./rules/simple/630shu");
      ruleClass = c630shu;
      break;
    }
    case "www.qingoo.cn": {
      const { qingoo } = await import("./rules/qingoo");
      ruleClass = qingoo;
      break;
    }
    case "www.trxs.cc":
    case "www.trxs123.com":
    case "www.jpxs123.com": {
      const { trxs } = await import("./rules/simple/trxs");
      ruleClass = trxs();
      break;
    }
    case "www.tongrenquan.org":
    case "www.tongrenquan.me": {
      const { tongrenquan } = await import("./rules/simple/trxs");
      ruleClass = tongrenquan();
      break;
    }
    case "www.imiaobige.com": {
      const { imiaobige } = await import("./rules/imiaobige");
      ruleClass = imiaobige;
      break;
    }
    case "www.256wxc.com": {
      const { c256wxc } = await import("./rules/simple/256wxc");
      ruleClass = c256wxc;
      break;
    }
    case regExpMatch(/lofter\.com$/): {
      const { lofter } = await import("./rules/lofter");
      ruleClass = lofter;
      break;
    }
    case "www.lwxs9.org": {
      const { lwxs9 } = await import("./rules/biquge");
      ruleClass = lwxs9();
      break;
    }
    case "www.shubl.com": {
      const { shubl } = await import("./rules/shubl");
      ruleClass = shubl;
      break;
    }
    case "www.ujxs.net": {
      const { ujxs } = await import("./rules/ujxs");
      ruleClass = ujxs;
      break;
    }
    case "m.haitangtxt.net": {
      const { haitangtxt } = await import("./rules/haitangtxt");
      ruleClass = haitangtxt;
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
