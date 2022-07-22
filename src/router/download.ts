import { BaseRuleClass } from "../rules";

export async function getRule(): Promise<BaseRuleClass> {
  const host: string = document.location.host;
  let ruleClass;
  switch (host) {
    case "www.ciweimao.com": {
      const { Ciweimao } = await import("../rules/special/original/ciweimao");
      ruleClass = Ciweimao;
      break;
    }
    case "www.uukanshu.com": {
      const { uukanshu } = await import("../rules/onePage/uukanshu");
      ruleClass = uukanshu();
      break;
    }
    case "www.yruan.com": {
      const { yruan } = await import("../rules/biquge/onePage");
      ruleClass = yruan();
      break;
    }
    case "www.shuquge.com":
    case "www.sizhicn.com": {
      const { shuquge } = await import("../rules/biquge/onePage");
      ruleClass = shuquge();
      break;
    }
    case "www.dingdiann.net": {
      const { dingdiann } = await import("../rules/biquge/onePage");
      ruleClass = dingdiann();
      break;
    }
    case "www.biquge66.com":
    case "www.lewenn.com":
    case "www.xkzw.org": {
      const { Xkzw } = await import("../rules/special/reprint/xkzw");
      ruleClass = Xkzw;
      break;
    }
    case "www.266ks.com": {
      const { c226ks } = await import("../rules/biquge/multiIndexNextPage");
      ruleClass = c226ks();
      break;
    }
    case "book.sfacg.com": {
      const { Sfacg } = await import("../rules/special/original/sfacg");
      ruleClass = Sfacg;
      break;
    }
    case "www.hetushu.com":
    case "hetushu.com": {
      const { Hetushu } = await import("../rules/special/reprint/hetushu");
      ruleClass = Hetushu;
      break;
    }
    case "www.shouda88.com": {
      const { shouda8 } = await import("../rules/onePage/shouda8");
      ruleClass = shouda8();
      break;
    }
    case "www.gebiqu.com": {
      const { gebiqu } = await import("../rules/biquge/onePage");
      ruleClass = gebiqu();
      break;
    }
    case "www.viviyzw.com": {
      const { viviyzw } = await import("../rules/twoPage/viviyzw");
      ruleClass = viviyzw();
      break;
    }
    case "www.1pwx.com": {
      const { xiaoshuodaquan } = await import("../rules/twoPage/1pwx");
      ruleClass = xiaoshuodaquan();
      break;
    }
    case "book.qidian.com": {
      const { Qidian } = await import("../rules/special/original/qidian");
      ruleClass = Qidian;
      break;
    }
    case "www.jjwxc.net": {
      const { Jjwxc } = await import("../rules/special/original/jjwxc");
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
    case "www.hongyeshuzhal.com":
    case "www.yb3.cc": {
      const { common } = await import("../rules/biquge/onePage");
      ruleClass = common();
      break;
    }
    case "book.zongheng.com":
    case "huayu.zongheng.com": {
      const { Zongheng } = await import("../rules/special/original/zongheng");
      ruleClass = Zongheng;
      break;
    }
    case "www.17k.com": {
      const { C17k } = await import("../rules/special/original/17k");
      ruleClass = C17k;
      break;
    }
    case "www.shuhai.com":
    case "mm.shuhai.com": {
      const { Shuhai } = await import("../rules/special/original/shuhai");
      ruleClass = Shuhai;
      break;
    }
    case "www.gongzicp.com":
    case "m.gongzicp.com":
    case "gongzicp.com": {
      const { Gongzicp } = await import("../rules/special/original/gongzicp");
      ruleClass = Gongzicp;
      break;
    }
    case "www.linovel.net": {
      const { Linovel } = await import("../rules/special/original/linovel");
      ruleClass = Linovel;
      break;
    }
    case "www.xinwanben.com": {
      const { xinwanben } = await import("../rules/biquge/nextPage");
      ruleClass = xinwanben();
      break;
    }
    case "www.tadu.com": {
      const { Tadu } = await import("../rules/special/original/tadu");
      ruleClass = Tadu;
      break;
    }
    case "www.idejian.com": {
      const { Idejian } = await import("../rules/special/reprint/idejian");
      ruleClass = Idejian;
      break;
    }
    case "www.qimao.com": {
      const { Qimao } = await import("../rules/special/original/qimao");
      ruleClass = Qimao;
      break;
    }
    case "www.wenku8.net": {
      const { wenku8 } = await import("../rules/twoPage/wenku8");
      ruleClass = wenku8();
      break;
    }
    case "manhua.dmzj.com":
    case "www.dmzj.com": {
      const { Dmzj } = await import("../rules/special/reprint/dmzj");
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
      const { Sosadfun } = await import("../rules/special/original/sosadfun");
      ruleClass = Sosadfun;
      break;
    }
    case "www.westnovel.com": {
      const { westnovel } = await import("../rules/onePage/westnovel");
      ruleClass = westnovel();
      break;
    }
    case "www.mht99.com": {
      const { mht } = await import("../rules/biquge/mht");
      ruleClass = mht();
      break;
    }
    case "www.xbiquge.so": {
      const { xbiquge } = await import("../rules/biquge/onePage");
      ruleClass = xbiquge();
      break;
    }
    case "www.linovelib.com": {
      const { linovelib } = await import("../rules/twoPage/linovelib");
      ruleClass = linovelib();
      break;
    }
    case "w.linovelib.com": {
      const { wlinovelib } = await import("../rules/twoPage/linovelib");
      ruleClass = wlinovelib();
      break;
    }
    case "www.luoqiuzw.com": {
      const { luoqiuzw } = await import("../rules/biquge/onePage");
      ruleClass = luoqiuzw();
      break;
    }
    case "www.yibige.cc": {
      const { yibige } = await import("../rules/twoPage/yibige");
      ruleClass = yibige();
      break;
    }
    case "www.fushuwang.org": {
      const { Fushuwang } = await import("../rules/special/reprint/fushuwang");
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
      const { soxscc } = await import("../rules/onePage/soxscc");
      ruleClass = soxscc();
      break;
    }
    case "www.yqbiqu.com": {
      const { xyqxs } = await import("../rules/biquge/onePage");
      ruleClass = xyqxs();
      break;
    }
    case "www.630shu.net": {
      const { c630shu } = await import("../rules/onePage/630shu");
      ruleClass = c630shu;
      break;
    }
    case "www.trxs.cc":
    case "www.trxs.me":
    case "www.trxs123.com":
    case "www.jpxs123.com":
    case "www.tongrenquan.org":
    case "www.tongrenquan.me":
    case "www.tongrenquan.cc":
    case "trxs.cc":
    case "trxs.me":
    case "trxs123.com":
    case "jpxs123.com":
    case "tongrenquan.me":
    case "tongrenquan.org":
    case "tongrenquan.cc": {
      const { trxs } = await import("../rules/onePage/trxs");
      ruleClass = trxs();
      break;
    }
    case "www.imbg.cc":
    case "www.imiaobige.com": {
      const { imiaobige } = await import("../rules/twoPage/imiaobige");
      ruleClass = imiaobige();
      break;
    }
    case "www.256wenku.com": {
      const { c256wxc } = await import("../rules/onePage/256wxc");
      ruleClass = c256wxc;
      break;
    }
    case regExpMatch(/lofter\.com$/): {
      const { Lofter } = await import("../rules/special/original/lofter");
      ruleClass = Lofter;
      break;
    }
    case "www.lwxs9.org": {
      const { lwxs9 } = await import("../rules/biquge/onePage");
      ruleClass = lwxs9();
      break;
    }
    case "www.shubl.com": {
      const { Shubl } = await import("../rules/special/original/ciweimao");
      ruleClass = Shubl;
      break;
    }
    case "m.haitangtxt.net": {
      const { haitangtxt } = await import(
        "../rules/special/reprint/haitangtxt"
      );
      ruleClass = haitangtxt();
      break;
    }
    case "m.yushuge123.com": {
      const { yuzhaige } = await import("../rules/special/reprint/haitangtxt");
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
      const { Longmabook } = await import(
        "../rules/special/original/longmabook"
      );
      ruleClass = Longmabook;
      break;
    }
    case "dijiubook.net": {
      const { dijiubook } = await import("../rules/biquge/onePage");
      ruleClass = dijiubook();
      break;
    }
    case "www.xbiquwx.la": {
      const { biquwx } = await import("../rules/biquge/onePage");
      ruleClass = biquwx();
      break;
    }
    case "www.25zw.com": {
      const { c25zw } = await import("../rules/biquge/onePage");
      ruleClass = c25zw();
      break;
    }
    case "www.zmccx.com": {
      const { tycqxs } = await import("../rules/biquge/onePage");
      ruleClass = tycqxs();
      break;
    }
    case "www.kanunu8.com": {
      const { Kanunu8 } = await import("../rules/special/reprint/kanunu8");
      ruleClass = Kanunu8;
      break;
    }
    case "www.ciyuanji.com": {
      const { Ciyuanji } = await import("../rules/special/original/ciyuanji");
      ruleClass = Ciyuanji;
      break;
    }
    case "www.wanben.org": {
      const { wanben } = await import("../rules/onePage/wanben");
      ruleClass = wanben();
      break;
    }
    case "m.wanben.org": {
      const { wanben } = await import(
        "../rules/onePageWithMultiIndexPage/wanben"
      );
      ruleClass = wanben();
      break;
    }
    case "www.ranwen.la": {
      const { ranwen } = await import("../rules/biquge/onePage");
      ruleClass = ranwen();
      break;
    }
    case "www.wangshuge.com": {
      const { washuge } = await import("../rules/twoPage/washuge");
      ruleClass = washuge();
      break;
    }
    case "m.baihexs.com": {
      const { baihexs } = await import(
        "../rules/onePageWithMultiIndexPage/baihexs"
      );
      ruleClass = baihexs();
      break;
    }
    case "www.quanshuzhai.com": {
      const { quanshuzhai } = await import("../rules/mbtxt/quanshuzhai");
      ruleClass = quanshuzhai();
      break;
    }
    case "masiro.me": {
      const { masiro } = await import("../rules/onePage/original/masiro");
      ruleClass = masiro();
      break;
    }
    case "www.pixiv.net": {
      const { Pixiv } = await import("../rules/special/original/pixiv");
      ruleClass = Pixiv;
      break;
    }
    case "kakuyomu.jp": {
      const { kakuyomu } = await import("../rules/onePage/original/kakuyomu");
      ruleClass = kakuyomu();
      break;
    }
    case "ncode.syosetu.com":
    case "novel18.syosetu.com": {
      const { syosetu } = await import("../rules/onePage/original/syosetu");
      ruleClass = syosetu();
      break;
    }
    case "syosetu.org": {
      const { syosetuOrg } = await import("../rules/onePage/original/syosetu");
      ruleClass = syosetuOrg();
      break;
    }
    case "zhaoze.art":
    case "houhuayuan.vip": {
      const { houhuayuan } = await import(
        "../rules/onePage/original/houhuayuan"
      );
      ruleClass = houhuayuan();
      break;
    }
    case "www.myrics.com": {
      const { Myrics } = await import("../rules/special/original/myrics");
      ruleClass = Myrics;
      break;
    }
    case "www.lstxt.cc": {
      const { lusetxt } = await import("../rules/biquge/onePage");
      ruleClass = lusetxt();
      break;
    }
    case "www.a7xs.com": {
      const { a7xs } = await import("../rules/onePage/a7xs");
      ruleClass = a7xs();
      break;
    }
    case "www.shencou.com": {
      const { shencou } = await import("../rules/twoPage/shencou");
      ruleClass = shencou();
      break;
    }
    case "www.tianyabooks.com": {
      const { tianyabooks } = await import("../rules/onePage/tianyabooks");
      ruleClass = tianyabooks();
      break;
    }
    case "jingcaiyuedu6.com": {
      const { jingcaiyuedu6 } = await import("../rules/twoPage/jingcaiyuedu6");
      ruleClass = jingcaiyuedu6();
      break;
    }
    case "www.hanwujinian.com": {
      const { Hanwujinian } = await import(
        "../rules/special/original/hanwujinian"
      );
      ruleClass = Hanwujinian;
      break;
    }
    case "www.biqu55.net": {
      const { biqu55 } = await import("../rules/biquge/biqu55");
      ruleClass = biqu55();
      break;
    }
    case "manga.bilibili.com": {
      const { MangaBilibili } = await import(
        "../rules/special/original/bilibili"
      );
      ruleClass = MangaBilibili;
      break;
    }
    case "www.aixdzs.com": {
      const { aixdzs } = await import("../rules/onePage/aixdzs");
      ruleClass = aixdzs();
      break;
    }
    case "www.liuxs.la": {
      const { liuxs } = await import("../rules/twoPage/liuxs");
      ruleClass = liuxs();
      break;
    }
    case "www.cool18.com": {
      const { Cool18 } = await import("../rules/special/original/cool18");
      ruleClass = Cool18;
      break;
    }
    case "www.b5200.net": {
      const { b5200 } = await import("../rules/biquge/onePage");
      ruleClass = b5200();
      break;
    }
    case "www.xsyq.cc": {
      const { yqxs } = await import("../rules/biquge/onePage");
      ruleClass = yqxs();
      break;
    }
    case "www.dushu369.com": {
      const { dushu369 } = await import("../rules/onePage/dushu369");
      ruleClass = dushu369();
      break;
    }
    case "www.18kanshu.com": {
      const { c18kanshu } = await import("../rules/twoPage/18kanshu");
      ruleClass = c18kanshu();
      break;
    }
    case "www.bxwx888.org": {
      const { bxwx333 } = await import("../rules/biquge/onePage");
      ruleClass = bxwx333();
      break;
    }
    case "www.xiaoshuowu.com": {
      const { xiaoshuowu } = await import("../rules/twoPage/xiaoshuowu");
      ruleClass = xiaoshuowu();
      break;
    }
    case "www.xrzww.com": {
      const { Xrzww } = await import("../rules/special/original/xrzww");
      ruleClass = Xrzww;
      break;
    }
    case "colorful-fantasybooks.com": {
      const { fantasybooks } = await import(
        "../rules/onePage/colorful-fantasybooks"
      );
      ruleClass = fantasybooks();
      break;
    }
    case "www.dizishu.com": {
      const { dizishu } = await import("../rules/onePage/dizishu");
      ruleClass = dizishu();
      break;
    }
    case "www.xbiquge.la": {
      const { xbiqugeLa } = await import("../rules/biquge/onePage");
      ruleClass = xbiqugeLa();
      break;
    }
    case "www.akatsuki-novels.com": {
      const { akatsuki } = await import("../rules/onePage/original/akatsuki");
      ruleClass = akatsuki();
      break;
    }
    case "www.alphapolis.co.jp": {
      const { alphapolis } = await import(
        "../rules/onePage/original/alphapolis"
      );
      ruleClass = alphapolis();
      break;
    }
    case "novelup.plus": {
      const { novelup } = await import(
        "../rules/onePageWithMultiIndexPage/original/novelup"
      );
      ruleClass = novelup();
      break;
    }
    case "www.69shu.com": {
      const { c69shu } = await import("../rules/twoPage/69shu");
      ruleClass = c69shu();
      break;
    }
    case "new-read.readmoo.com": {
      const { Readmoo } = await import("../rules/special/original/readmoo");
      ruleClass = Readmoo;
      break;
    }
    case "www.iqingguo.com": {
      const { Iqingguo } = await import("../rules/special/original/iqingguo");
      ruleClass = Iqingguo;
      break;
    }
    case "www.ywggzy.com": {
      const { ywggzy } = await import("../rules/biquge/nextPage");
      ruleClass = ywggzy();
      break;
    }
    case "www.ptwxz.net": {
      const { ptwxz } = await import(
        "../rules/onePageWithMultiIndexPage/ptwxz"
      );
      ruleClass = ptwxz();
      break;
    }
    case "www.mbtxt.la": {
      const { mbtxt } = await import("../rules/mbtxt/mbtxt");
      ruleClass = mbtxt();
      break;
    }
    case "www.znlzd.com": {
      const { znlzd } = await import("../rules/biquge/multiIndexNextPage");
      ruleClass = znlzd();
      break;
    }
    case "www.yyun.net": {
      const { yyun } = await import("../rules/biquge/nextPage");
      ruleClass = yyun();
      break;
    }
    case "hongxiuzhao.me": {
      const { hongxiuzhao } = await import("../rules/onePage/hongxiuzhao");
      ruleClass = hongxiuzhao();
      break;
    }
    case "www.mijiashe.com": {
      const { mijiashe } = await import("../rules/biquge/nextPage");
      ruleClass = mijiashe();
      break;
    }
    case "www.duread8.com": {
      const { Duread } = await import("../rules/special/original/ciweimao");
      ruleClass = Duread;
      break;
    }
    default: {
      throw new Error("Not Found Rule!");
    }
  }
  return new ruleClass();

  function regExpMatch(regexp: RegExp) {
    if (regexp.test(host)) {
      return host;
    }
  }
}
