import { BookAdditionalMetadate, attachmentClass, Chapter } from "./main";

export interface bookParseObject {
  bookUrl: string;
  bookname: string;
  author: string;
  introduction: string | null;
  additionalMetadate: BookAdditionalMetadate;
  chapters: Chapter[];
}
export interface chapterParseObject {
  chapterName: string | null;

  contentRaw: HTMLElement | null;
  contentText: string | null;
  contentHTML: HTMLElement | null;
  contentImages: attachmentClass[] | null;
}
export interface ruleClass {
  imageMode: "naive" | "TM";
  charset?: string;
  concurrencyLimit?: number;
  maxRunLimit?: number;
  bookParse(
    chapterParse: ruleClassNamespace.chapterParse
  ): Promise<bookParseObject>;
  chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    charset: string
  ): Promise<chapterParseObject>;
}

export namespace ruleClassNamespace {
  export interface bookParse {
    (): Promise<bookParseObject>;
  }
  export interface chapterParse {
    (
      chapterUrl: string,
      chapterName: string | null,
      isVIP: boolean,
      isPaid: boolean | null,
      charset: string
    ): Promise<chapterParseObject>;
  }
}

/* #################################################### */

export const retryLimit = 5;
export const enaleDebug = false;

export const icon0 =
  "data:image/png;base64,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";
export const icon1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAANSAAADUgEQACRKAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAUdQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiYSOVQAAAGx0Uk5TAAECAwQFCAkKCwwNDhETFRkaHB0fICMkKCwwNTg5PD1AQUZKTk9QV1tcX2BjZGhtb3B2eHl6fX6AgYKHi4+QlJicnaChpamur7C3uru+v8LEyMzP0NXZ3N3f4OTn6uvt7/Hy8/T2+Pn6/P3+VI4wmgAAAyxJREFUeNrtmVdT4zAUhTFs6BB6Cb13WLpooffeQjW9hMT//3mVJbsT4li6ahbD6D4y5p5vzrGuFDkry5QpznLSygAYAANgAAyAATAABsAAGAADYAAMgAEwAD8XADlChTQTIM0eIM0pIM3vAdL8JiLNawFpXo1I8zxAmicS0jwTkeapjDTvC8r0gQQK9UEESvUBBIr1qQTK9SkESvR/wQkQ5V95KhS+Q1AC14N34ZCYenD0LGNjoH7ij2ejQV71QPd2lNQapI8rut0d4LMe0Bz4CHMUSetZCGgPMESRYj1cAGARMIqv1kMlgK8pNQq39TARBB8VhCgyW59S414y6frjxDYeUYTCNnnKHw4WeUxl1/wtGjwk97LToyBan6irmRrPfSHj/K+ZuSJ3TImCav3zaqvlvTN57T9W6+ozJAqa9fH9/gLS3kja/wr69+PUKMhGXUxVie0mVVMXZAUSwONys4ztvHn5kQcgttubJ+tEkde7G2MEiExUyD3VVExE4AAPS40qTlaNSw8QgI+dnlxVx8ncnp0PCsD5WJnaI23Z2Lk3wP1igx83jA2L998V4G8E5WrVy0kRfIeXMLkMm1TIN8GWYXIQTVbKVa+cjLCO4r2+fFnq+X17MZ7N6GmlxRJXt1pWnjh3Q1yX09Vi8tXTl/zb8eeB5GCgkFe9cOAgTutPBcD1stbGEYXVtvYCaA4BwHU9W8smXzt7DesMBMB1NFQMVS8eOgK3hQM4zut6ezZdPbt9/ZWhKQsArpu5OrJ83dwNW0dGAFzHwyVe6iXDx8zt2AEc522jI8etntOx8cbRjAcA1+18/Vf5+vlbvk6cALhORkr/qZeOnHC34QdwnPfNTvzjLtC5+S7QRAQg8eNuYcEW6yAIIF4GQD8A9W5IZX3eFQW6tqI61KNbXf9vy4K/T/2Wd90X+hqFnfHG1K8oUq1nuqpVZD3zjal865nvjBVY74pC/qpg/nYkNQqb6+uZrChYrFcQhcBnOwlR2KIfLoUGlIj1EgaUsPVCUcixnjcKmdZzRCHdeqYo1FgPjUKl9YAolFtPjMIf672i8NP6DFH4br2pH1d/AAm28mJJn9pPAAAAAElFTkSuQmCC";

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
    default: {
      throw new Error("Not Found Rule!");
    }
  }
  const rule = new ruleClass();
  return rule;
}
