import { BookAdditionalMetadate, Chapter, Status, Book } from "../main";
import { getImageAttachment, sleep } from "../lib";
import { ruleClass, chapterParseObject, retryLimit } from "../rules";
import { introDomHandle } from "./lib/common";
import { log } from "../log";

export class gongzicp implements ruleClass {
  public imageMode: "naive" | "TM";
  public concurrencyLimit: number;

  public constructor() {
    this.imageMode = "TM";
    this.concurrencyLimit = 1;
  }
  public async bookParse() {
    const bookUrl = document.location.href;

    const bookId = (<HTMLSpanElement>(
      document.querySelector("span.id")
    )).innerText.replace("CP", "");
    if (!bookId) {
      throw new Error("获取bookID出错");
    }
    const novelGetInfoBaseUrl =
      "https://webapi.gongzicp.com/novel/novelGetInfo";
    const novelGetInfoUrl = new URL(novelGetInfoBaseUrl);
    novelGetInfoUrl.searchParams.set("id", bookId);

    interface cpUser {
      user_id: number;
      user_nickname: string;
      user_head: string;
      user_sign: string;
      is_sign: number;
      reward_level: string;
      reward_level_number: number;
      medal_img_pc: string;
      medal_img_app: string;
      pendant_img_pc: string;
      pendant_img_app: string;
    }
    interface cpChapterMoreItem {
      type: "more";
    }
    interface cpChapterVolumeItem {
      type: "volume";
      vid: number; //"1"
      isHide: string; //""
      name: string; //"正文"
    }
    interface cpChapterChapterItem {
      type: "item";
      isHide: "" | true;
      id: number; //1896248
      name: string; //"丑闻"
      order: string; //"1"
      public_date: string; //"2021-02-20 13:14:00"
      kt_number: string; //"3,674"
      lock: boolean; //false
      chapter_clock: number; //0
      chapter_status: number; //1
      pay: boolean; //false
      new: boolean; //false
      is_sub: boolean; //false
      price: number; //0
    }
    interface cpUpdateDateObj {
      key: number;
      value: number;
      number: number;
    }
    interface cpCommentReplyObj {
      replay_id: number; //225624,
      replay_rid: number; //225587,
      replay_module: "novel_chapter";
      replay_cid: number; //2029849,
      replay_uid: number; //1370477,
      replay_nickname: string; //"Rinbowdash",
      replay_head: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/static/images/default_head.png",
      user_level: "Lv0";
      user_level_number: number; //0,
      replay_title: string; //"",
      replay_content: string; //"姐妹你竟然是长评哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
      replay_time: string; //"昨天 19:33",
      replay_touid: number; //2328763,
      replay_touid_name: string; //"盈棠"
    }
    interface cpCommentObj {
      replay_id: number; //225106,
      replay_module: "novel_chapter";
      replay_pid: number; //0,
      replay_cid: number; //1981514,
      replay_uid: number; //2236328,
      replay_title: string; //"太可了，kswl",
      replay_content: string; //"汪汪汪汪",
      replay_time: string; //"昨天 11:05",
      gift_id: number; //0,
      gift_icon: string; //"",
      gift_name: string; //"",
      gift_number: number; //0,
      book_id: number; //0,
      novel_name: string; //"有名",
      novel_id: number; //273600,
      novel_chapter_name: string; //"狗",
      novel_chapter_id: number; //1981514,
      author_id: number; //272,
      author_uid: number; //1055,
      author_sign_id: number; //0,
      child_comment_number: number; //0,
      replay_nickname: string; //"肆伍仟",
      replay_head: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20210217/0cce902ce7e53945142e4f05275bd072b2.jpg?x-oss-process=style/small",
      user_level: string; //"Lv2",
      user_level_number: number; //2,
      top_time: number; //0,
      essence_time: number; //0,
      novel_top_time: number; //0,
      chapter_top_time: number; //0,
      medal_img_pc: string; //"",
      medal_img_app: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20210120/ccb9ed65fb891f84de757330a01ccd92.png",
      pendant_img_pc: string; //"",
      pendant_img_app: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20210112/14e19382de6391679c2e44a76e2dd40c.png",
      reply_list: cpCommentReplyObj[];
    }
    interface cpNovelInfo {
      novel_id: number; //273600
      novel_name: string; //"有名"
      novel_status: number; //1
      novel_lock: number; //0
      novel_process_index: number; //1
      novel_process: string; //"连载"
      novel_cover: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20210217/0c21d6d89833c44036fe9ff531d2f4adc2.png"
      type_ids: string; //"75,1,14"
      type_names: string; //"原创,现代,都市"
      novel_wordnumber: number; //223186
      novel_allclick: number; //9511233
      novel_allcoll: number; //99404
      novel_allrec: number; //806193
      novel_allpopu: number; //24345459
      novel_info: string; //"<p>娱乐圈</p><p>影帝X视帝</p><p>梁渔&许惊蛰</p><p></p><p>因为一场惊天群P丑闻而主动捆绑在一起的两位男演员，讲述他们之间的甜蜜营业生活。</p><p>典型却不怎么传统的娱乐圈文。</p><p>梗虽老，但甜。</p><p></p><p>高亮提醒：请不要代入任何原型，作者不追星，这两孩子会主动捆绑也是各有各的难，等这难处曝光了也不是啥优点，代入尴尬了你们回头还怪我就不好了。</p>"
      novel_desc: string; //"无实。"
      novel_tag_ids: string; //"1,48,109,32,62760"
      novel_tag_txt: string; //"甜宠,HE,轻松,娱乐圈,磕糖"
      novel_newcid: number; //2053529
      novel_newcname: string; //"85 一些比较重要的“大事”【中】"
      novel_uptime: string; //"6 小时前"
      novel_createtime: number; //1612108890
      novel_is_collection: number; //0
      author_id: number; //272
      novel_startcid: number; //1896248
      latest_cid: number; //1896248
      relieve_vip: number; //0
      plagiarism: number; //0
      comment_number: number; //78120
      reward_ranking: number; //43
      author_nickname: string; //"木更木更"
      author_sign_id: number; //0
      user_sign: string; //"木更木更写的书，关我静水边什么事。"
      author_info: string; //"更新时间不稳定，请假在微博，但不坑！"
      author_notice: string; //"不舍温柔与爱"
      author_user_id: number; //1055
      author_novel_count: number; //13
      author_follower_num: number; //93085
      author_is_collection: number; //0
      author_user_head: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20191202/e0fcb922c13155484279b84342712feb.jpg?x-oss-process=style/small"
      sub_auto: number; //0
      type_list: string[]; //["原创","现代","都市"]
      tag_list: string[]; //["甜宠","HE","轻松","娱乐圈","磕糖"]
      create_time: string; //"2021-02-01 00:01:30"
      author_level: number; //4
      author_medal: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20210430/b2c618bcaf05c1b5058c875723adc7d2.png"
      author_pendant: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20210419/706dc4936cc39b884b914bffc17c79e0.png"
    }
    interface novelInfo {
      code: number; //200
      msg: string; //"操作成功"
      data: {
        novelInfo: cpNovelInfo;
        chapterList: (
          | cpChapterVolumeItem
          | cpChapterChapterItem
          | cpChapterMoreItem
        )[];
        rewardList: [];
        updateDateList: {
          [index: number]: cpUpdateDateObj;
        };
        rewardRankingList: cpUser[];
        longComment: cpCommentObj[];
        topComment: cpCommentObj[];
      };
    }
    log.debug(`请求地址: ${novelGetInfoUrl.toString()}`);
    const novelInfo: novelInfo = await fetch(novelGetInfoUrl.toString(), {
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
    }).then((response) => response.json());
    if (novelInfo.code !== 200) {
      throw new Error(`数据接口请求失败，URL:${novelGetInfoUrl.toString()}`);
    }
    const data = novelInfo.data;
    const bookname = data.novelInfo.novel_name;
    const author = data.novelInfo.author_nickname;

    const introDom = document.createElement("div");
    introDom.innerHTML = data.novelInfo.novel_info;
    const [
      introduction,
      introductionHTML,
      introCleanimages,
    ] = await introDomHandle(introDom);

    const additionalMetadate: BookAdditionalMetadate = {};
    const coverUrl = data.novelInfo.novel_cover;
    if (coverUrl) {
      getImageAttachment(coverUrl, this.imageMode, "cover-").then(
        (coverClass) => {
          additionalMetadate.cover = coverClass;
        }
      );
    }

    additionalMetadate.tags = data.novelInfo.tag_list;

    async function isLogin() {
      interface cpUserInfo {
        info: {
          show_uid: number;
          user_display: number;
          mobile: string;
          email: string;
          nick_name: string;
          gender: string;
          signature: string;
          profile_image: string;
          profile_images: string;
          gold: string;
          gold2: number;
          gold2_frozen: number;
          ticket: number;
          rec_ticket: number;
          level: {
            level: number;
            experience: number;
            experience_start: number;
            next_experience: number;
            sea_star: number;
            follow_author: number;
            collect_novel: number;
            book: number;
          };
          level_number: number;
          comment_count: number;
          notice_count: number;
          is_author: number;
          is_sign: number;
          sign_id: number;
          author_id: number;
          nation_code: number;
          author_name: string;
          author_modify_num: number;
          following: number;
          followers: number;
          wechat_bind: number;
          wechat_name: string;
          weibo_bind: number;
          weibo_name: string;
          qq_bind: number;
          qq_name: string;
          medal_id: number;
          pendant_id: number;
          background_id: number;
          medal_img: string;
          pendant_img: string;
          background_img: string;
          gold_frozen: string;
          birthday: string;
          account_name: string;
          has_password: boolean;
          is_manager: boolean;
        };
        verify: boolean;
      }
      interface userInfo {
        code: number; //200, //9996
        msg: string; //"操作成功", //9996
        data: cpUserInfo;
        count?: number;
      }
      const getUserInfoUrl = "https://webapi.gongzicp.com/user/getUserInfo";
      log.debug(`正在请求: ${getUserInfoUrl}`);
      const userInfo: userInfo = await fetch(getUserInfoUrl, {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "x-requested-with": "XMLHttpRequest",
        },
        method: "GET",
        mode: "cors",
        credentials: "include",
      }).then((response) => response.json());
      if (userInfo.code === 200) {
        return true;
      }
      return false;
    }
    const logined = await isLogin();

    const chapters: Chapter[] = [];
    const _chapterList = data.chapterList;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    for (const chapterObj of _chapterList) {
      if (chapterObj.type === "volume") {
        sectionNumber = chapterObj.vid;
        sectionName = chapterObj.name;
        sectionChapterNumber = 0;
      } else if (chapterObj.type === "item") {
        const chapterUrl = [
          document.location.origin,
          "v4",
          `read-${chapterObj.id}.html`,
        ].join("/");
        const chapterNumber = Number(chapterObj.order);
        const chapterName = chapterObj.name;
        const isVIP = chapterObj.pay;
        const isPaid = chapterObj.is_sub;
        sectionChapterNumber++;
        const chapterOption = {
          novel_id: data.novelInfo.novel_id,
          chapter_id: chapterObj.id,
        };
        const chapter = new Chapter(
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
          this.chapterParse,
          "UTF-8",
          chapterOption
        );
        if (isVIP && !(logined && chapter.isPaid)) {
          chapter.status = Status.aborted;
        }
        chapters.push(chapter);
      }
    }
    const book = new Book(
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters
    );
    return book;
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    interface chapterOption {
      novel_id: number;
      chapter_id: number;
    }
    function cpDecrypt(content_orig: string) {
      const setIv = (key: string) => {
        key = key + parseInt("165455", 14).toString(32);
        const iv = CryptoJS.enc.Utf8.parse("$h$b3!" + key);
        return iv;
      };
      const setKey = (value: string) => {
        value = value + parseInt("4d5a6c8", 14).toString(36);
        const key = CryptoJS.enc.Utf8.parse(value + "A");
        return key;
      };
      interface cfg {
        mode: typeof CryptoJS.mode.CBC;
        padding: typeof CryptoJS.pad.Pkcs7;
        iv: CryptoJS.lib.WordArray;
      }
      const setcfg = (iv: CryptoJS.lib.WordArray): cfg => {
        return {
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
          iv: iv,
        };
      };
      const encrypt = (
        value: string,
        key: CryptoJS.lib.WordArray,
        cfg: cfg
      ) => {
        if ("string" != typeof value) {
          value = JSON.stringify(value);
        }
        const xml = CryptoJS.enc.Utf8.parse(value);
        return CryptoJS.AES.encrypt(xml, key, cfg).toString();
      };
      const decrypt = (
        secrets: string,
        key: CryptoJS.lib.WordArray,
        cfg: cfg
      ) => {
        const value = CryptoJS.AES.decrypt(secrets, key, cfg);
        return CryptoJS.enc.Utf8.stringify(value).toString();
      };

      interface __NUXT__ {
        layout: string;
        data: [
          {},
          {
            cid: number;
          }
        ];
        fetch: Object;
        error: null;
        state: {
          CpST: {
            LCngpxaF: string;
          };
          config: {
            timeDifference: string;
          };
          keepAlive: {
            app: {
              authorMain: undefined;
              indexMain: boolean;
              loginMain: boolean;
              managerMain: undefined;
              reportMain: undefined;
              userMain: undefined;
            };
            author: {};
            index: {};
            report: {};
            user: {};
          };
          user: {
            author: {};
            info: {};
            verify: boolean;
          };
        };
        serverRendered: boolean;
        routePath: string;
        config: {
          _app: {
            basePath: string;
            assetsPath: string;
            cdnURL: null | string;
          };
        };
      }
      // set __NUXT__
      // "const __NUXT__=(function(a,b,c,d){return {layout:\"default\",data:[{},{cid:1543527}],fetch:{},error:b,state:{config:{timeDifference:0},CpST:{LCngpxaF:\"_xu0LRrbu$En3*I\"},keepAlive:{app:{authorMain:a,indexMain:c,loginMain:d,userMain:a,reportMain:a,managerMain:a},author:{},user:{},index:{},report:{},manager:{}},user:{info:{},verify:d,author:{}}},serverRendered:c,routePath:\"\\u002Fread-1543527.html\",config:{_app:{basePath:\"\\u002Fv4\\u002F\",assetsPath:\"\\u002Fv4\\u002F_nuxt\\u002F\",cdnURL:b}}}}(void 0,null,true,false));"
      let _CP_NUXT: undefined | __NUXT__;
      //暂时禁用eval
      //   eval(
      //     (() => {
      //       const script = document.querySelector("body > script:nth-child(2)");
      //       if (script) {
      //         const script_text = script.innerHTML.replace(
      //           "window.__NUXT__",
      //           "_CP_NUXT"
      //         );
      //         return script_text;
      //       }
      //       return "";
      //     })()
      //   );

      let LCngpxaF_substr; //"u0LRrbu$En"
      if (_CP_NUXT) {
        LCngpxaF_substr = _CP_NUXT.state.CpST.LCngpxaF.substr(2, 10);
      } else {
        LCngpxaF_substr = (<any>(
          unsafeWindow
        )).__NUXT__.state.CpST.LCngpxaF.substr(1, 10);
      }

      const iv = setIv("iGzsYn");
      const key = setKey(LCngpxaF_substr);
      const cfg = setcfg(iv);
      const content = decrypt(content_orig, key, cfg);
      return content;
    }
    interface cpChapterInfo {
      name: string; //"3 KPI",
      number: number; //3053,
      publicTime: string; //"2021-02-21 13:50:51",
      updateTime: string; //"2021-02-21 15:31:12",
      postscript: string; //"两人差不多大，许老师大几个月，因为梁老师是天蝎男",
      isSub: number; //1,
      chapterPrice: number; //0,
      lock: number; //0,
      status: number; //1,
      renderType: number; //1,
      content: string; //"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"
    }
    interface cpNovelInfo2 {
      id: number; //273600,
      name: string; //"有名",
      author: string; //"木更木更",
      avatar: string; //"https://resourcecp.oss-cn-beijing.aliyuncs.com/uploads/20191202/e0fcb922c13155484279b84342712feb.jpg?x-oss-process=style/small",
      aid: string; //"272",
      reward_ranking: number; //43,
      rewardList: [];
      desc: string; //"无实。"
    }
    interface chapterInfo {
      code: number; //200
      msg: string; //"操作成功"
      data: {
        chapterInfo: cpChapterInfo;
        novelInfo: cpNovelInfo2;
        check: number; //1
      };
    }
    function randomWalker() {
      log.info("[chapter]随机翻页中……");
      //目录页
      if (document.location.pathname.includes("novel")) {
        (<HTMLAnchorElement>(
          document.querySelector(".chapter-list > .chapter > a")
        )).click();
      }
      //阅读页
      if (document.location.pathname.includes("read")) {
        const rightMenu = document.querySelector(
          ".right-menu"
        ) as HTMLDivElement;
        if (rightMenu?.childElementCount === 6) {
          (<HTMLAnchorElement>(
            document.querySelector(
              ".right-menu > div:nth-child(3) > a:nth-child(1)"
            )
          )).click();
        } else if (rightMenu?.childElementCount === 7) {
          // 未购VIP章节，向前翻页
          if (document.querySelector("div.content.unpaid")) {
            (<HTMLAnchorElement>(
              document.querySelector(
                ".right-menu > div:nth-child(3) > a:nth-child(1)"
              )
            )).click();
          }
          // 30%概率向前翻页
          else if (Math.random() < 0.3) {
            (<HTMLAnchorElement>(
              document.querySelector(
                ".right-menu > div:nth-child(3) > a:nth-child(1)"
              )
            )).click();
          } else {
            (<HTMLAnchorElement>(
              document.querySelector(
                ".right-menu > div:nth-child(4) > a:nth-child(1)"
              )
            )).click();
          }
        }
      }
    }

    async function getChapter(): Promise<chapterParseObject> {
      const nid = (<chapterOption>options).novel_id;
      const cid = (<chapterOption>options).chapter_id;
      const chapterGetInfoBaseUrl =
        "https://webapi.gongzicp.com/novel/chapterGetInfo";
      const chapterGetInfoUrl = new URL(chapterGetInfoBaseUrl);
      chapterGetInfoUrl.searchParams.set("cid", cid.toString());
      chapterGetInfoUrl.searchParams.set("nid", nid.toString());

      let retryTime = 0;
      async function getChapterInfo(url: string): Promise<chapterInfo> {
        log.debug(
          `请求地址: ${url}, Referrer: ${chapterUrl}，retryTime：${retryTime}`
        );
        const result: chapterInfo = await fetch(url, {
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
        }).then((resp) => resp.json());
        if (
          result.data.chapterInfo.content.length !== 0 &&
          result.data.chapterInfo.content.length < 30
        ) {
          retryTime++;
          if (retryLimit > retryLimit) {
            log.error(`请求 ${url} 失败`);
            throw new Error(`请求 ${url} 失败`);
          }

          log.warn("[chapter]疑似被阻断，进行随机翻页……");
          randomWalker();
          await sleep(3000);
          randomWalker();
          await sleep(7000);
          randomWalker();
          await sleep(3000);
          return getChapterInfo(url);
        } else {
          retryTime = 0;
          return result;
        }
      }

      const result = await getChapterInfo(chapterGetInfoUrl.toString());
      if (result.code === 200) {
        const chapterInfo = result.data.chapterInfo;
        // 从目录获取章节名
        // const chapterName = chapterInfo.name;
        if (
          chapterInfo.chapterPrice !== 0 &&
          chapterInfo.content.length === 0
        ) {
          // VIP章节未购买
          return {
            chapterName: chapterName,
            contentRaw: null,
            contentText: null,
            contentHTML: null,
            contentImages: null,
            additionalMetadate: null,
          };
        } else if (
          chapterInfo.chapterPrice === 0 ||
          (chapterInfo.chapterPrice !== 0 && chapterInfo.content.length !== 0)
        ) {
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
              } else {
                return `<p>${p}</p>`;
              }
            })
            .join("\n");

          if (chapterInfo.postscript.length === 0) {
            contentHTML = _contentHTML;
          } else {
            contentHTML = document.createElement("div");
            contentHTML.className = "main";

            const hr = document.createElement("hr");
            const authorSayDom = document.createElement("div");
            authorSayDom.innerHTML = chapterInfo.postscript
              .split("\n")
              .map((p) => {
                if (p.length === 0) {
                  return "<p><br/></p>";
                } else {
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
      // 随机游走，对抗阿里云验证码
      // https://help.aliyun.com/document_detail/122071.html
      if (Math.random() < 0.2) {
        randomWalker();
      }
      // 随机休眠3-7秒，反反爬
      await sleep(3000 + Math.round(Math.random() * 4000));
    }
    async function publicChapter(): Promise<chapterParseObject> {
      await antiAntiCrawler();
      return getChapter();
    }
    async function vipChapter(): Promise<chapterParseObject> {
      await antiAntiCrawler();
      return getChapter();
    }

    if (isVIP) {
      return vipChapter();
    } else {
      return publicChapter();
    }
  }
}
