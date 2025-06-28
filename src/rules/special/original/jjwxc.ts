import {
  getAttachment,
  getAttachmentClassCache,
  getRandomName,
  putAttachmentClassCache,
} from "../../../lib/attachments";
import { cleanDOM } from "../../../lib/cleanDOM";
import { getHtmlDOM, gfetch, ggetHtmlDOM } from "../../../lib/http";
import { sleep } from "../../../lib/misc";
import { rm, rms } from "../../../lib/dom";
import { introDomHandle } from "../../../lib/rule";
import { log } from "../../../log";
import { ReferrerMode, Status } from "../../../main/main";
import { AttachmentClass } from "../../../main/Attachment";
import { Chapter } from "../../../main/Chapter";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { BaseRuleClass, ChapterParseObject } from "../../../rules";
import { retryLimit } from "../../../setting";
import { replaceJjwxcCharacter } from "../../lib/jjwxcFontDecode";
import { UnsafeWindow } from "../../../global";
import { _GM_xmlhttpRequest } from "../../../lib/GM";

import * as csstree from "css-tree";
import * as CryptoJS from "crypto-js";
import { version } from "node:os";

type JJWindow = UnsafeWindow & { getCookie: (key: string) => string };

const AUTHOR_SAY_PREFIX = "作者有话说："; // before it was "-".repeat(20)

export class Jjwxc extends BaseRuleClass {
  public constructor() {
    super();
    this.attachmentMode = "TM";
    this.concurrencyLimit = 1;
    this.charset = "GB18030";
    // 获取nd-setting-tab-1的第一个子元素
    const firstChild = document.querySelector('#nd-setting-tab-1')?.firstElementChild;
    // 创建一个按钮元素
    const button = document.createElement('button');
    button.innerText = '获取token';
    button.style.marginLeft = '10px'; // 添加一些样式
    // 插入按钮到第一个子元素后面
    firstChild?.parentNode?.insertBefore(button, firstChild.nextSibling);
    function encode(data: string) {
      const key = CryptoJS.enc.Utf8.parse("KW8Dvm2N");
      const iv = CryptoJS.enc.Utf8.parse("1ae2c94b");

      const encrypted = CryptoJS.DES.encrypt(data, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });

      return encrypted.toString(); //encrypted.ciphertext.toString(CryptoJS.enc.Base64));
    }

    function rd() {
      const n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let s = "";
      for (let i = 0; i < 20; i++) {
        const r = Math.floor(Math.random() * 10);
        s += n[r];
      }
      return s;
    }

    function generateAndroidId() {
      const chars = '0123456789abcdef';
      let androidId = '';
      for (let i = 0; i < 16; i++) {
        const r = Math.floor(Math.random() * 16);
        androidId += chars[r];
      }
      return androidId;
    }

    function checkLogin(account: string, password: string, verificationCode: string) {
      if (account === "" || password === "") {
        alert("账号或密码不能为空");
        return 0;
      } else if (verificationCode === "") {
        return 1;
      } else {
        return 2;
      }
    }

    async function login() {
      const account = (document.getElementById("nd-jj-account") as HTMLInputElement)?.value;
      const password = (document.getElementById("nd-jj-password") as HTMLInputElement)?.value;
      const verificationCode = (document.getElementById("nd-jj-verificationCode") as HTMLInputElement)?.value;
      const CheckLogin = checkLogin(account, password, verificationCode);
      let t = 'phone';
      if (account.indexOf("@") !== -1) {
        t = 'email';
      }
      if (CheckLogin != 0) {
        const en = encode(password);
        const id = rd() + ":" + generateAndroidId() + "d4:";
        const sign = encode(Date.now() + "_" + id + "_");
        let loginUrl = `https://app.jjwxc.org/androidapi/login?versionCode=402&loginName=${encodeURIComponent(account)}&encode=1&loginPassword=${encodeURIComponent(en)}&sign=${encodeURIComponent(sign)}&identifiers=${encodeURIComponent(id)}&autologin=1`;
        const headers = {
          Host: "app.jjwxc.org",
          'User-Agent': `Mobile ${Date.now()}`,
          'Accept-Encoding': 'gzip',
          'Keep-Alive': '300',
          'Content-Type': '',
          'Accept': '',
          'Sec-Fetch-Site': '',
          'Sec-Fetch-Mode': '',
          'Sec-Fetch-Dest': '',
          'Accept-Language': '',

        };
        interface LoginResponse {
          code: string;
          message: string;
          data: Array<{
            type: string;
            text: string;
          }>;
          token: string;
        }
        interface CodeResponse {
          code: string;
          message: string;
          data: {
            message: string;
          };
        }
        if (CheckLogin === 1) {
          const resJson: LoginResponse = await new Promise((resolve) => {
            _GM_xmlhttpRequest({
              url: loginUrl,
              headers: headers,
              method: "GET",
              anonymous: true,
              fetch: true,
              responseType: "json",
              onload: function (response) {
                const resultI: LoginResponse = JSON.parse(response.responseText);
                log.debug(`LoginResponse url ${loginUrl}`);
                if (response.status === 200) {
                  resolve(resultI);
                } else {
                  log.error(`LoginResponse url ${loginUrl} response status = ${response.status}`);
                  resolve(resultI);
                }
              },
            });
          });
          if (resJson.code == "221003") {
            const verifyUrl = "https://app.jjwxc.org//appDevicesecurityAndroid/getDeviceSecurityCode";
            const body = `versionCode=402&username=${encodeURIComponent(account)}&checktype=${t}`;
            const responseJson: CodeResponse = await new Promise((resolve) => {
              _GM_xmlhttpRequest({
                url: verifyUrl,
                headers: headers,
                method: "POST",
                data: body,
                anonymous: true,
                responseType: "json",
                // fetch: true,
                onload: function (response) {
                  const resultI: CodeResponse = JSON.parse(response.responseText);
                  log.debug(`CodeResponse url ${verifyUrl}`);
                  log.debug(`${response.responseText}`);
                  log.debug(`${body}`);
                  if (response.status === 200) {
                    resolve(resultI);
                  } else {
                    log.error(`CodeResponse url ${verifyUrl} response status = ${response.status}`);
                    resolve(resultI);
                  }
                },
              });
            });
            let msg = responseJson.data.message;
            if (!msg) msg = responseJson.message;
            alert(msg);
          } else {
            alert(resJson.message);
          }
        } else if (CheckLogin === 2) {
          loginUrl = loginUrl + "&checktype=" + t + "&checkdevicecode=" + verificationCode;
          const tokenJson: LoginResponse = await new Promise((resolve) => {
            _GM_xmlhttpRequest({
              url: loginUrl,
              headers: headers,
              method: "GET",
              anonymous: true,
              responseType: "json",
              fetch: true,
              onload: function (response) {
                const resultI: LoginResponse = JSON.parse(response.responseText);
                log.debug(`LoginResponse url ${loginUrl}`);
                if (response.status === 200) {
                  resolve(resultI);
                } else {
                  log.error(`LoginResponse url ${loginUrl} response status = ${response.status}`);
                  resolve(resultI);
                }
              },
            });
          });
          const token = tokenJson.token;
          const tokenelement = document.getElementById("nd-jj-token");
          if (tokenelement) {
            tokenelement.textContent = token;
          }
        }
      }
    }
    // 添加按钮点击事件处理程序
    button.addEventListener('click', () => {
      // 创建一个新的页面元素
      const page = document.createElement('div');
      // 设置页面的内容
      page.innerHTML = `
        <h1 class="center-align">JJ获取token</h1>
        <div>
            <div class="row">
                <div class="input-field">
                    <label for="account">账号</label>
                    <input type="text" id="nd-jj-account" name="account" required>
                </div>
            </div>
            <div class="row">
                <div class="input-field">
                    <label for="password">密码</label>
                    <input type="password" id="nd-jj-password" name="password" required>
                </div>
            </div>
            <div class="row">
                <div class="input-field">
                    <label for="verificationCode">验证码</label>
                    <input type="text" id="nd-jj-verificationCode" name="verificationCode">
                </div>
            </div>
            <div class="row">
                <button type="click" id="nd-jj-login">登录</button>
            </div>
        </div>
        <h2 class="center-align">生成的Token:</h2>
        <p id="nd-jj-token" class="center-align"></p>
      `;

      page.style.position = 'fixed';
      page.style.top = '50%';
      page.style.left = '50%';
      page.style.transform = 'translate(-50%, -50%)';
      page.style.padding = '20px';
      page.style.backgroundColor = 'white';
      page.style.border = '1px solid black';
      page.style.zIndex = '1000';
      // 添加关闭按钮
      const closeButton = document.createElement('button');
      closeButton.innerText = '关闭';
      closeButton.style.display = 'block';
      closeButton.style.marginTop = '10px';
      closeButton.addEventListener('click', () => {
        document.body.removeChild(page);
      });
      page.appendChild(closeButton);
      // 将页面添加到body
      document.body.appendChild(page);
      document.getElementById("nd-jj-login")?.addEventListener('click', () => login());
    });
  }  

  /**
   * Extract protagonist, co-star, and other information from content tags section
   */
  private extractProtagonistInfo(): { protagonist?: string; costar?: string; other?: string } {
    try {
      const result: { protagonist?: string; costar?: string; other?: string } = {};
      
      // Look for protagonist info in smallreadbody divs that contain character information
      const smallreadBodyDivs = Array.from(document.querySelectorAll('.smallreadbody'));
      
      for (const smallreadDiv of smallreadBodyDivs) {
        // Find the div that contains character information (role icons and character names)
        const hasCharacterInfo = smallreadDiv.querySelector('.role_icon_out') || 
                                 smallreadDiv.querySelector('.character_name') ||
                                 smallreadDiv.querySelector('.role_pic_frame');
        
        if (hasCharacterInfo) {
          // Parse character information based on the DOM structure observed:
          // In JJWXC BL novels, typically the first 2 characters are protagonists (攻 and 受)
          // and the rest are co-stars, regardless of role icon positions
          
          const characterFrames = Array.from(smallreadDiv.querySelectorAll('.role_pic_frame'));
          const protagonistNames: string[] = [];
          const costarNames: string[] = [];
          
          characterFrames.forEach((frame, index) => {
            const characterNameDiv = frame.querySelector('.character_name');
            if (characterNameDiv && characterNameDiv.textContent?.trim()) {
              const characterName = characterNameDiv.textContent.trim();
              
              // First two characters are typically protagonists (攻 and 受)
              if (index < 2) {
                protagonistNames.push(characterName);
              } else {
                // Rest are co-stars
                costarNames.push(characterName);
              }
            }
          });
          
          // Assign the extracted names
          if (protagonistNames.length > 0 && !result.protagonist) {
            result.protagonist = protagonistNames.join('、');
          }
          
          if (costarNames.length > 0 && !result.costar) {
            result.costar = costarNames.join('、');
          }
          
          // Also look for direct text patterns as fallback
          const divText = smallreadDiv.textContent || '';
          
          // Extract protagonist patterns like "主角：" or "受：" as fallback
          if (!result.protagonist) {
            const protagonistMatch = divText.match(/(?:主角|受)[：:]\s*([^，,。.]+)/);
            if (protagonistMatch && protagonistMatch[1]) {
              result.protagonist = protagonistMatch[1].trim();
            }
          }
          
          // Extract co-star patterns like "配角：" as fallback
          if (!result.costar) {
            const costarMatch = divText.match(/配角[：:]\s*([^，,。.]+)/);
            if (costarMatch && costarMatch[1]) {
              result.costar = costarMatch[1].trim();
            }
          }
          
          // If we found character information in this div, we're done
          break;
        }
      }
      
      return result;
    } catch (error) {
      console.warn('Error extracting protagonist info:', error);
      return {};
    }
  }

  /**
   * 向简介DOM添加额外的元数据信息
   */
  private addAdditionalMetadataToDOM(introDom: HTMLElement): HTMLElement {
    const descriptionElements: HTMLElement[] = [];
    
    // Extract protagonist, co-star, and other information
    const protagonistInfo = this.extractProtagonistInfo();
    if (protagonistInfo.protagonist || protagonistInfo.costar) {
      const protagonistDiv = document.createElement('div');
      protagonistDiv.className = 'metadata-protagonist';
      let protagonistHTML = '';
      
      if (protagonistInfo.protagonist) {
        protagonistHTML += `<strong>主角：</strong>${protagonistInfo.protagonist}`;
      }
      
      if (protagonistInfo.costar) {
        if (protagonistHTML) protagonistHTML += '<br>';
        protagonistHTML += `<strong>配角：</strong>${protagonistInfo.costar}`;
      }
      
      protagonistDiv.innerHTML = protagonistHTML;
      descriptionElements.push(protagonistDiv);
    }
    
    // Extract "一句话简介", "立意", and "其他" from smallreadbody divs
    const smallreadBodyDivs = Array.from(document.querySelectorAll('.smallreadbody'));
    
    for (const smallreadDiv of smallreadBodyDivs) {
      // Look for the div that contains metadata spans
      const spans = Array.from(smallreadDiv.querySelectorAll('span'));
      
      for (const span of spans) {
        const spanText = span.textContent?.trim() || '';
        
        // Extract one-sentence introduction
        if (spanText.startsWith('一句话简介：')) {
          const introText = spanText.replace('一句话简介：', '').trim();
          if (introText) {
            const introDiv = document.createElement('div');
            introDiv.className = 'metadata-intro';
            introDiv.innerHTML = `<strong>一句话简介：</strong>${introText}`;
            descriptionElements.push(introDiv);
          }
        }
        
        // Extract theme/meaning (立意)
        if (spanText.startsWith('立意：')) {
          const themeText = spanText.replace('立意：', '').trim();
          if (themeText) {
            const themeDiv = document.createElement('div');
            themeDiv.className = 'metadata-theme';
            themeDiv.innerHTML = `<strong>立意：</strong>${themeText}`;
            descriptionElements.push(themeDiv);
          }
        }
        
        // Extract other information (其他/其它) as novel metadata
        if (spanText.startsWith('其他：') || spanText.startsWith('其它：')) {
          const otherText = spanText.replace(/^其[他它]：/, '').trim();
          if (otherText) {
            const otherDiv = document.createElement('div');
            otherDiv.className = 'metadata-other';
            otherDiv.innerHTML = `<strong>其他：</strong>${otherText}`;
            descriptionElements.push(otherDiv);
          }
        }
      }
      
      // If we found metadata spans, no need to check other divs
      if (descriptionElements.some(el => 
        el.className === 'metadata-intro' || 
        el.className === 'metadata-theme' || 
        el.className === 'metadata-other'
      )) {
        break;
      }
    }

    // Append additional metadata to the intro DOM if any were found
    if (descriptionElements.length > 0) {
      // Add a separator line before additional metadata
      const separator = document.createElement('hr');
      separator.style.margin = '10px 0';
      introDom.appendChild(separator);
      
      // Add each metadata element
      descriptionElements.forEach(element => {
        introDom.appendChild(element);
      });
    }

    return introDom;
  }

  public async bookParse() {
    const bookUrl = document.location.href;
    const getInformationBlocked = () => {
      const fl = Array.from(document.querySelectorAll(".smallreadbody")).filter(
        (div) =>
          (div as HTMLDivElement).innerText.includes(
            "文案信息审核未通过，等待作者修改后重新审核"
          )
      );
      return fl.length !== 0;
    };

    let bookname: string;
    const additionalMetadate: BookAdditionalMetadate = {};
    let author = "";
    let introduction: string | null = null;
    let introductionHTML: HTMLElement | null = null;
    let introCleanimages: AttachmentClass[] | null = null;
    if (!getInformationBlocked()) {
      bookname = (
        document.querySelector('#oneboolt .bigtext') as HTMLElement
      ).innerText.trim()

      author = (
        document.querySelector("#oneboolt  h2 > a") as HTMLElement
      )?.innerText ?? (
        document.querySelector('#oneboolt > .noveltitle > span > a') as HTMLElement
      )?.innerText;
      
      // Enhanced intro processing: convert roles and add metadata before introDomHandle
      const introDom = document.querySelector("#novelintro")?.cloneNode(true) as HTMLElement;
      if (introDom) {
        const enhancedIntroDom = this.addAdditionalMetadataToDOM(introDom);
        [introduction, introductionHTML, introCleanimages] = await introDomHandle(enhancedIntroDom);
      } else {
        [introduction, introductionHTML, introCleanimages] = [null, null, null];
      }
      if (introCleanimages) {
        additionalMetadate.attachments = [...introCleanimages];
      }

      const coverUrl = (
        document.querySelector(".noveldefaultimage") as HTMLImageElement
      ).src;
      if (coverUrl) {
        getAttachment(
          coverUrl,
          this.attachmentMode,
          "cover-",
          false,
          getRandomName(),
          { referrerMode: ReferrerMode.none }
        )
          .then((coverClass) => {
            additionalMetadate.cover = coverClass;
          })
          .catch((error) => log.error(error));
      }

      let tags = (
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(1) > span:nth-child(2)"
        ) as HTMLSpanElement
      ).innerText.split("-"); // 文章类型
      tags = tags.concat(
        Array.from(
          document.querySelectorAll("div.smallreadbody:nth-child(3) > span > a")
        ).map((a) => (a as HTMLAnchorElement).innerText)
      ); // 内容标签
      const perspective = (
        document.querySelector(
          "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(2)"
        ) as HTMLLIElement
      ).innerText.replace("\n", "").replace("作品视角：", ""); // 作品视角
      // const workStyle = (
      //   document.querySelector(
      //     "table > tbody > tr > td.readtd > div.righttd > ul.rightul > li:nth-child(3)"
      //   ) as HTMLLIElement
      // ).innerText.replace("\n", "");
      tags.push(perspective);
      // tags.push(workStyle);
      additionalMetadate.tags = tags;
    } else {
      window.scrollTo(0, document?.body?.scrollHeight ?? 0);
      await sleep(3000);
      bookname = (
        document.querySelector(
          "td[id^=comment_] span.coltext > a"
        ) as HTMLAnchorElement
      )?.innerText
        .trim()
        .replace(/[《》]/g, "");
      window.scrollTo(0, 0);
      if (!bookname) {
        throw new Error("抓取书名出错");
      }
      const authorPageUrl = (
        document.querySelector(
          "#oneboolt > tbody > tr:nth-child(1) > td > div > h2 > a"
        ) as HTMLAnchorElement
      )?.href;
      if (authorPageUrl) {
        const authorPage = await getHtmlDOM(authorPageUrl, this.charset);
        author =
          (authorPage.querySelector('span[itemprop="name"]') as HTMLSpanElement)
            ?.innerText ?? author;
      }
    }

    const chapters: Chapter[] = [];
    const trList = document.querySelectorAll("#oneboolt > tbody > tr");
    let chapterNumber = 0;
    let sectionNumber = 0;
    let sectionName = null;
    let sectionChapterNumber = 0;
    if (trList.length === 0) {
      const tr = document.querySelector("div#oneboolt");
      if (tr) {
        const chapterName = tr.querySelector("h2")?.innerText.trim() ?? "全一章";
        const chapterUrl = bookUrl + "&chapterid=1";
        chapterNumber++;
        const chapter = new Chapter({
          bookUrl,
          bookname,
          chapterUrl,
          chapterNumber,
          chapterName,
          isVIP: false,
          isPaid: null,
          sectionName,
          sectionNumber,
          sectionChapterNumber,
          chapterParse: this.chapterParse,
          charset: this.charset,
          options: {},
        });
        chapters.push(chapter);
      }
    }
    for (const tr of Array.from(trList)) {
      if (tr.getAttribute("bgcolor")) {
        sectionNumber++;
        sectionChapterNumber = 0;
        sectionName = (
          tr.querySelector("b.volumnfont") as HTMLElement
        )?.innerText.trim();
      } else if (tr.getAttribute("itemprop")) {
        chapterNumber++;
        sectionChapterNumber++;
        const td = tr.querySelector("td:nth-child(2)");
        const a = td?.querySelector("a:nth-child(1)");
        const isLocked = () => {
          return (td as HTMLElement)?.innerText.trim() === "[锁]";
        };
        const isVIP = () => {
          return !!a?.getAttribute("onclick");
        };

        if (!isLocked()) {
          if (isVIP()) {
            const chapterName = (a as HTMLAnchorElement).innerText.trim();
            const chapterUrl = (a as HTMLAnchorElement).getAttribute("rel");
            if (chapterUrl) {
              const chapter = new Chapter({
                bookUrl,
                bookname,
                chapterUrl,
                chapterNumber,
                chapterName,
                isVIP: isVIP(),
                isPaid: null,
                sectionName,
                sectionNumber,
                sectionChapterNumber,
                chapterParse: this.chapterParse,
                charset: this.charset,
                options: {},
              });
              const isLogin = () => {
                if (typeof (unsafeWindow as UnsafeWindow).tokenOptions === "object")
                  return true;
                return !document.getElementById("jj_login");
              };
              if (isVIP() && !isLogin()) {
                chapter.status = Status.aborted;
              }
              chapters.push(chapter);
            }
          } else {
            const chapterName = (a as HTMLAnchorElement).innerText.trim();
            const chapterUrl = (a as HTMLAnchorElement).href;
            const chapter = new Chapter({
              bookUrl,
              bookname,
              chapterUrl,
              chapterNumber,
              chapterName,
              isVIP: isVIP(),
              isPaid: null,
              sectionName,
              sectionNumber,
              sectionChapterNumber,
              chapterParse: this.chapterParse,
              charset: this.charset,
              options: {},
            });
            const isLogin = () => {
              if (typeof (unsafeWindow as UnsafeWindow).tokenOptions === "object")
                return true;
              return !document.getElementById("jj_login");
            };
            if (isVIP() && !isLogin()) {
              chapter.status = Status.aborted;
            }
            chapters.push(chapter);
          }
        } else {
          const chapterName = "[锁]";
          const chapterUrl = "";
          const chapter = new Chapter({
            bookUrl,
            bookname,
            chapterUrl,
            chapterNumber,
            chapterName,
            isVIP: false,
            isPaid: null,
            sectionName,
            sectionNumber,
            sectionChapterNumber,
            chapterParse: this.chapterParse,
            charset: this.charset,
            options: {},
          });
          chapter.status = Status.aborted;
          chapters.push(chapter);
        }
      }
    }

    return new Book({
      bookUrl,
      bookname,
      author,
      introduction,
      introductionHTML,
      additionalMetadate,
      chapters,
    });
  }

  public async chapterParse(
    chapterUrl: string,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean,
    charset: string,
    options: object
  ) {
    async function publicChapter(): Promise<ChapterParseObject> {
      const doc = await getHtmlDOM(chapterUrl, charset);
      const content = doc.querySelector("div.novelbody > div") as HTMLElement;
      if (content) {
        rm("hr", true, content);
        const rawAuthorSayDom = content.querySelector("div.danmu_total_str");
        let authorSayDom;
        let authorSayText;
        if (rawAuthorSayDom) {
          const { dom: adom, text: atext } = await cleanDOM(
            rawAuthorSayDom,
            "TM"
          );
          [authorSayDom, authorSayText] = [adom, atext];
        }
        rm("div", true, content);
        rms(["@无限好文，尽在晋江文学城"], content);
        // eslint-disable-next-line prefer-const
        let { dom, text, images } = await cleanDOM(content, "TM");
        if (rawAuthorSayDom && authorSayDom && authorSayText) {
          const hr = document.createElement("hr");
          authorSayDom.className = "authorSay";
          dom.appendChild(hr);
          dom.appendChild(authorSayDom);

          text = text + "\n\n" + AUTHOR_SAY_PREFIX + "\n\n" + authorSayText;
        }
        return {
          chapterName,
          contentRaw: content,
          contentText: text,
          contentHTML: dom,
          contentImages: images,
          additionalMetadate: null,
        };
      }
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }

    async function vipChapter(): Promise<ChapterParseObject> {
      async function getFont(
        dom: Document
      ): Promise<
        [string | null, AttachmentClass | null, HTMLStyleElement | null]
      > {
        function getFontInfo() {
          const s = dom.querySelectorAll("body > style")[1] as HTMLStyleElement;
          let fontNameI = "";
          let fontUrlI = "";

          if (s.sheet) {
            const f = s.sheet.cssRules[s.sheet.cssRules.length - 2];

            const m1 = f.cssText.match(/jjwxcfont_[\d\w]+/);
            const m2 = f.cssText.match(/{(.*)}/);
            if (m1 && m2) {
              fontNameI = m1[0];

              const ft = m2[1];
              for (const k of ft.split(",")) {
                if (k.includes('format("woff2")')) {
                  const m3 = k.match(/url\("(.*)"\)\s/);
                  if (m3) {
                    fontUrlI = document.location.protocol + m3[1];
                    return [fontNameI, fontUrlI];
                  }
                }
              }
            }
          }

          if (fontNameI !== "") {
            fontUrlI = `${document.location.protocol}//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
            return [fontNameI, fontUrlI];
          } else {
            const css = dom.querySelector("div.noveltext")?.classList;
            if (css) {
              fontNameI = Array.from(css).filter((cn) =>
                cn.startsWith("jjwxcfont_")
              )[0];
              if (fontNameI) {
                fontUrlI = `${document.location.protocol}//static.jjwxc.net/tmp/fonts/${fontNameI}.woff2?h=my.jjwxc.net`;
                return [fontNameI, fontUrlI];
              }
            }
          }

          return [null, null];
        }

        let retryTime = 0;

        function fetchFont(fontUrlI: string): Promise<Blob | null | void> {
          log.debug(
            `[Chapter]请求 ${fontUrlI} Referer ${chapterUrl} 重试次数 ${retryTime}`
          );
          return gfetch(fontUrlI, {
            headers: {
              accept: "*/*",
              Referer: chapterUrl,
            },
            responseType: "blob",
          })
            .then((response) => {
              if (response.status >= 200 && response.status <= 299) {
                return response.response as Blob;
              } else {
                log.error(
                  `[Chapter]请求 ${fontUrlI} 失败 Referer ${chapterUrl}`
                );
                if (retryTime < retryLimit) {
                  retryTime++;
                  return fetchFont(fontUrlI);
                } else {
                  return null;
                }
              }
            })
            .catch((error) => log.error(error));
        }

        const [fontName, fontUrl] = getFontInfo();
        if (fontName && fontUrl) {
          const fontFileName = `${fontName}.woff2`;
          let fontClassObj: AttachmentClass;
          const fontClassObjCache = getAttachmentClassCache(fontUrl);
          if (fontClassObjCache) {
            fontClassObj = fontClassObjCache;
          } else {
            const fontBlob = await fetchFont(fontUrl);
            fontClassObj = new AttachmentClass(fontUrl, fontFileName, "TM");
            fontClassObj.Blob = fontBlob;
            fontClassObj.status = Status.finished;
            putAttachmentClassCache(fontClassObj);
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

      function decrypt(doc: Document) {
        function getDecryptContent() {
          function getCookie(name: string): null | string {
            let cookies: string | null = "";
            const dc = document.cookie;
            const prefix = name + "=";
            let begin = dc.indexOf("; " + prefix);
            if (begin == -1) {
              begin = dc.indexOf(prefix);
              if (begin != 0) cookies = null;
            } else {
              begin += 2;
            }
            let end = document.cookie.indexOf(";", begin);
            if (end == -1) {
              end = dc.length;
            }
            if (cookies != null) {
              cookies = unescape(dc.substring(begin + prefix.length, end));
            }
            if (cookies == null && name != "token" && name != "managertoken") {
              const tokenKey = [
                "readerid",
                "ubuntu",
                "ptid",
                "email",
                "authorid",
                "cookietime",
                "islocaluser",
                "authorname",
                "newwindow",
                "showname",
                "examineright",
                "logintype",
                "certification",
                "userclosecomment",
                "shareweibo",
                "commentfilterversion",
              ]; //xwb
              const managerKey = [
                "managerid",
                "managertoken",
                "moderatorName",
                "isAdmin",
                "managername",
                "loginSource",
                "commentSearch",
              ];
              if (tokenKey.indexOf(name) > -1) {
                let token: null | string | string[] = getCookie("token");
                const index = tokenKey.indexOf(name);
                if (token != null) {
                  token = strdecode(token);
                  token = token.split("|");
                  return token[index];
                }
              } else if (managerKey.indexOf(name) > -1) {
                let token: null | string | string[] = getCookie("managertoken");
                const index = managerKey.indexOf(name);
                if (token != null) {
                  token = strdecode(token);
                  token = token.split("|");
                  return token[index];
                }
              }
              return null;
            }
            return cookies;
          }

          function strdecode(str: string) {
            return utf8to16(decode64(str));
          }

          const base64DecodeChars = [
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54,
            55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3,
            4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
            22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32,
            33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            50, 51, -1, -1, -1, -1, -1,
          ];

          function decode64(str: string) {
            let c1, c2, c3, c4;
            let i, out;
            const len = str.length;
            i = 0;
            out = "";
            while (i < len) {
              do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
              } while (i < len && c1 == -1);
              if (c1 == -1) break;
              do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
              } while (i < len && c2 == -1);
              if (c2 == -1) break;
              out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
              do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61) return out;
                c3 = base64DecodeChars[c3];
              } while (i < len && c3 == -1);
              if (c3 == -1) break;
              out += String.fromCharCode(
                ((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2)
              );
              do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return out;
                c4 = base64DecodeChars[c4];
              } while (i < len && c4 == -1);
              if (c4 == -1) break;
              out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
          }

          function utf8to16(str: string) {
            let out, i, c;
            let char2, char3;
            out = "";
            const len = str.length;
            i = 0;
            while (i < len) {
              c = str.charCodeAt(i++);
              switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                  // 0xxxxxxx
                  out += str.charAt(i - 1);
                  break;
                case 12:
                case 13:
                  // 110x xxxx    10xx xxxx
                  char2 = str.charCodeAt(i++);
                  out += String.fromCharCode(
                    ((c & 0x1f) << 6) | (char2 & 0x3f)
                  );
                  break;
                case 14:
                  // 1110 xxxx   10xx xxxx   10xx xxxx
                  char2 = str.charCodeAt(i++);
                  char3 = str.charCodeAt(i++);
                  out += String.fromCharCode(
                    ((c & 0x0f) << 12) |
                    ((char2 & 0x3f) << 6) |
                    ((char3 & 0x3f) << 0)
                  );
                  break;
              }
            }

            return out;
          }

          // https://static.jjwxc.net/scripts/jjcontent.js?ver=20220527

          const children = doc.querySelector(
            "#contentlets, #contentvars"
          )?.children;
          if (!children) {
            throw new Error("获取章节失败");
          }
          const data: Record<string, string> = {};
          Array.from(children).forEach(
            (item) =>
            (data[item.getAttribute("name") as string] = item.getAttribute(
              "value"
            ) as string)
          );

          const novelid = parseInt(data["novelid"]);
          const chapterid = parseInt(data["chapterid"]);
          const _readerid = getCookie("readerid");
          if (!_readerid) {
            throw new Error("无法获取客户号");
          }
          const readerid = parseInt(_readerid);
          const accessKey = data["accessKey"];
          const convert = (input: string) => {
            let out = 0;
            for (let i = 0; i < input.length; i++) {
              out += input.charCodeAt(i);
            }
            return out;
          };
          const accessKeyConvert = convert(accessKey);
          let modi = 0;
          let _decrypedtCryptInfo = "";
          while (modi <= 1) {
            let _hash = "";
            let hashSlice = "";
            if (chapterid % 2 == modi) {
              _hash =
                novelid + "." + chapterid + "." + readerid + "." + accessKey;
            } else {
              _hash =
                accessKey + "-" + novelid + "-" + chapterid + "-" + readerid;
            }
            const hash = CryptoJS.MD5(_hash).toString();
            if (chapterid % 2 == modi) {
              hashSlice =
                hash.slice(accessKeyConvert % hash.length) +
                hash.slice(0, accessKeyConvert % hash.length);
            } else {
              hashSlice =
                hash.slice(accessKeyConvert % (hash.length + 1)) +
                hash.slice(0, accessKeyConvert % (hash.length + 1));
            }
            let hashSlice16 = hashSlice.slice(0, 16);
            let hashSlice_16 = hashSlice.slice(-16);
            if (hash.charCodeAt(0)) {
              [hashSlice16, hashSlice_16] = [hashSlice_16, hashSlice16];
            }
            const cryptInfo = data["cryptInfo"];
            _decrypedtCryptInfo = CryptoJS.DES.decrypt(
              cryptInfo,
              CryptoJS.enc.Utf8.parse(hashSlice16),
              {
                iv: CryptoJS.enc.Utf8.parse(hashSlice_16),
              }
            ).toString(CryptoJS.enc.Utf8);
            if (_decrypedtCryptInfo != "") {
              break;
            } else modi++;
          }
          interface cryptInfo {
            time: number;
            key: string;
            ver: string;
          }
          const decrypedtCryptInfo = JSON.parse(
            atob(_decrypedtCryptInfo)
          ) as cryptInfo;
          const verifyTime = (obj: cryptInfo) => {
            if (new Date()["getTime"]() / 1000 - obj["time"] > 86400) {
              throw new Error(
                "章节内容解码失败，内容生成时间与当前设备时间相差过大，请刷新页面或校准当前设备时间。内容生成时间为:" +
                new Date(obj["time"] * 100).toLocaleString()
              );
            }
          };
          verifyTime(decrypedtCryptInfo);
          const md5sum = CryptoJS.MD5(
            decrypedtCryptInfo["key"] + decrypedtCryptInfo["time"] + readerid
          ).toString();
          const t =
            md5sum["slice"](accessKeyConvert % md5sum["length"]) +
            md5sum["slice"](0, accessKeyConvert % md5sum["length"]);
          const key = t.slice(0, 16);
          const iv = t.slice(-16);

          const decryptContent = CryptoJS.DES.decrypt(
            data["content"],
            CryptoJS.enc.Utf8.parse(key),
            { iv: CryptoJS.enc.Utf8.parse(iv) }
          ).toString(CryptoJS.enc.Utf8);
          return decryptContent;
        }

        const decryptContent = getDecryptContent();
        const decryptContentDoc = new DOMParser().parseFromString(
          decryptContent,
          "text/html"
        );

        function decryptCssEncrypt() {
          // 修复CSS加密文本
          // https://github.com/404-novel-project/novel-downloader/issues/521

          const cssText = Array.from(doc.querySelectorAll("style"))
            .map((s) => s.innerText)
            .join("\n");
          const ast = csstree.parse(cssText);

          csstree.walk(ast, function (node) {
            if (node.type === "Declaration" && node.property === "content") {
              const value = (
                (
                  node.value as csstree.Value
                ).children.toArray()?.[0] as csstree.StringNode
              ).value;

              const selectorList = (
                this.rule?.prelude as csstree.SelectorList
              ).children.toArray();
              for (const s of selectorList) {
                const _selector = (s as csstree.Selector).children.toArray();
                const selector = new Map(
                  _selector.map((sc) => [
                    sc.type,
                    (
                      sc as
                      | csstree.ClassSelector
                      | csstree.PseudoElementSelector
                    ).name,
                  ])
                );
                const classSelector = selector.get("ClassSelector");
                const pseudoClassSelector = selector.get("PseudoClassSelector");

                if (classSelector && pseudoClassSelector && value) {
                  const sNode = decryptContentDoc.querySelector(
                    `.${classSelector}`
                  );
                  if (sNode) {
                    const pNode = sNode.parentNode;

                    const iNode = decryptContentDoc.createElement("span");
                    iNode.id = `${classSelector}-${pseudoClassSelector}`;
                    iNode.innerText = value;

                    if (pseudoClassSelector === "before") {
                      pNode?.insertBefore(iNode, sNode);
                    } else if (pseudoClassSelector === "after") {
                      pNode?.insertBefore(iNode, sNode.nextSibling);
                    }
                  }
                }
              }
            }
          });

          csstree.walk(ast, function (node) {
            if (node.type === "Declaration" && node.property === "display") {
              const value = (
                (
                  node.value as csstree.Value
                ).children.toArray()?.[0] as csstree.Identifier
              ).name;

              const selectorList = (
                this.rule?.prelude as csstree.SelectorList
              ).children.toArray();
              for (const s of selectorList) {
                const _selector = (s as csstree.Selector).children.toArray();
                const selector = new Map(
                  _selector.map((sc) => [
                    sc.type,
                    (
                      sc as
                      | csstree.ClassSelector
                      | csstree.PseudoElementSelector
                    ).name,
                  ])
                );
                const classSelector = selector.get("ClassSelector");
                const pseudoClassSelector = selector.get("PseudoClassSelector");

                if (classSelector && pseudoClassSelector && value === "none") {
                  decryptContentDoc
                    .querySelector(`#${classSelector}-${pseudoClassSelector}`)
                    ?.remove();
                }
              }
            }
          });
        }
        decryptCssEncrypt();

        return decryptContentDoc.body.innerHTML;
      }

      const doc = await ggetHtmlDOM(chapterUrl, charset);
      const isPaidF = () => {
        return !!(
          !doc.querySelector("#buy_content") &&
          doc.querySelector("div.noveltext")
        );
      };

      if (isPaidF()) {
        const ChapterName = (
          doc.querySelector("div.noveltext h2") as HTMLElement
        ).innerText.trim();

        const content = document.createElement("div");
        content.innerHTML = decrypt(doc);
        rm("hr", true, content);
        const rawAuthorSayDom = doc.querySelector(".readsmall");
        let authorSayDom;
        let authorSayText;
        if (rawAuthorSayDom) {
          rm("hr", true, rawAuthorSayDom as HTMLElement);
          const { dom: adom, text: atext } = await cleanDOM(
            rawAuthorSayDom,
            "TM"
          );
          [authorSayDom, authorSayText] = [adom, atext];
        }
        rm("div", true, content);
        rms(["@无限好文，尽在晋江文学城"], content);
        let {
          dom: rawDom, // eslint-disable-line
          text: rawText,
          images, // eslint-disable-line
        } = await cleanDOM(content, "TM");
        if (rawAuthorSayDom && authorSayDom && authorSayText) {
          const hr = document.createElement("hr");
          authorSayDom.className = "authorSay";
          rawDom.appendChild(hr);
          rawDom.appendChild(authorSayDom);

          rawText = rawText + "\n\n" + AUTHOR_SAY_PREFIX + "\n\n" + authorSayText;
        }

        let finalDom = rawDom;
        let finalText = rawText;
        const [fontName, fontClassObj, fontStyleDom] = await getFont(doc);
        if (fontName && fontClassObj && fontStyleDom) {
          // Replace Text
          finalText = await replaceJjwxcCharacter(fontName, rawText);

          // DOM
          images.push(fontClassObj);
          finalDom = document.createElement("div");

          // Replace DOM innerHTML
          const replacedDom = document.createElement("div");
          replacedDom.innerHTML = await replaceJjwxcCharacter(
            fontName,
            rawDom.innerHTML
          );

          // Backup raw DOM
          finalDom.appendChild(fontStyleDom);
          rawDom.className = `${fontName} hide`;
          finalDom.appendChild(rawDom);

          finalDom.appendChild(replacedDom);
        }

        return {
          chapterName: ChapterName,
          contentRaw: content,
          contentText: finalText,
          contentHTML: finalDom,
          contentImages: images,
          additionalMetadate: null,
        };
      }
      return {
        chapterName,
        contentRaw: null,
        contentText: null,
        contentHTML: null,
        contentImages: null,
        additionalMetadate: null,
      };
    }
    // interface vipChapterInfo {
    //   downloadContent: ChapterInfo[];
    // }
    interface ChapterInfo {
      code: number | null; //0,
      chapterId: string; //"39",
      vipChapterid: string | null; //"25"
      chapterName: string | null; //"另一种可能",
      chapterIntro: string | null; //"算是番外吗？",
      chapterSize: string | null; //"1484",
      chapterDate: string | null; //"2012-03-17 20:54:01",
      sayBody: string | null; // 包括营养液等信息
      sayBodyV2: string | null; // 只包括作者有话说
      upDown: number | null; //1,
      update: number | null; //1,
      content: string; //"另一种可能\n
      isvip: number | null; //0,
      isProtect: number | null; //1,
      encryptField: Array<string>;//["content"]
      encryptType: string; //"jj",
      authorid: string; //"376815",
      autobuystatus: string | null; //"0",
      noteislock: string | null; //"1"
      message: string | null; //"[本章节已锁定]"
      show_saybody_page: string | null; //"1"
    }
    let retryTime = 0;
    function extractKeys(responseHeader: string) {
      const accessKeyMatch = responseHeader.match(/accesskey:([^\r\n]+)/);
      const keyStringMatch = responseHeader.match(/keystring:([^\r\n]+)/);

      const accessKey = accessKeyMatch ? accessKeyMatch[1].trim() : "accesskey";
      const keyString = keyStringMatch ? keyStringMatch[1].trim() : "keystring";

      return { accessKey, keyString };
    }
    function decodeVIPResopnce(responseHeader: string, responseText: string) {
      let v43, v38, dest;
      let accessKey = "accesskey", keyString = "keystring";
      const keys = extractKeys(responseHeader);
      accessKey = keys.accessKey;
      keyString = keys.keyString;
      // log.debug(`responseHeader: ${responseHeader}`);
      // log.debug(`decodeVIPResopnce accesskey: ${accessKey}, keyString: ${keyString}`);
      const content = String(responseText);
      const accesskeyLen = accessKey.length;
      let v9 = 0;
      const v6 = String(accessKey[accesskeyLen - 1]).charCodeAt(0);
      for (let i = 0; i < accesskeyLen; i++) {
        v9 += accessKey[i].charCodeAt(0);
      }
      const v15 = v9 % keyString.length;
      const v17 = v9 / 65;
      const v18 = keyString.length;
      if (v17 + v15 > v18) {
        v43 = keyString.substring(v15, (v18 - v15) + v15);
      } else {
        v43 = keyString.substring(v15, v17 + v15);
      }
      const v32 = content.length;
      if ((v6 & 1) != 0) {
        v38 = content.substring(v32 - 12, v32);
        dest = content.substring(0, v32 - 12);
      } else {
        v38 = content.substring(0, 12);
        dest = content.substring(12, content.length);
      }
      const key = CryptoJS.MD5(v43 + v38).toString().substring(0, 8);
      const iv = CryptoJS.MD5(v38).toString().substring(0, 8);
      const keyHex = CryptoJS.enc.Utf8.parse(key);
      const ivHex = CryptoJS.enc.Utf8.parse(iv);
      let result = '{"message":"try again!"}';
      try {
        const decrypted = CryptoJS.DES.decrypt(dest, keyHex, {
          iv: ivHex,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        result = decrypted.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        log.debug(`decodeVIPResopnce error, 即VIP章节解密失败：${e}`);
        result = '{"message":"try again!"}';
      }
      return result;
    }
    interface EncryptKey {
      code: string;
      data: {
        key: string;
        version: string;
      };
      message: string;
    }
    function decodeVIPText(text: string, encryptType: string, novel_info: string, user_key?: string) {

      // async function getFockKey() {
      //   const url = "https://android.jjwxc.net/app.jjwxc/android/AACC/Security/getEncryptKey";
      //   //data = user_key;
      //   // method = POST
      //   //Fock.addKeypool(jSONObject.optString("key"), jSONObject.optString("version"));
      //   const Key: EncryptKey = await new Promise((resolve) => {
      //     _GM_xmlhttpRequest({
      //       url: url,
      //       headers: {
      //         //   accept: "application/json",
      //         referer: "http://android.jjwxc.net?v=402",
      //         //    not_tip: "updateTime",
      //         //  "accept-encoding": "gzip",
      //       },
      //       method: "POST",
      //       data:user_key,
      //       onload: function (response) {
      //         if (response.status === 200) {
      //             const resultI: EncryptKey = JSON.parse(
      //               response.responseText
      //             );
      //             resolve(resultI);
      //         } else {
      //         const resultI: EncryptKey = JSON.parse(
      //             `{"code":"${response.status}"}`
      //           );
      //           resolve(resultI);
      //         }
      //       },
      //     });
      //   });
      // }
      if (encryptType == 'jj') {
        const keyHex = CryptoJS.enc.Utf8.parse("KW8Dvm2N");
        const ivHex = CryptoJS.enc.Utf8.parse("1ae2c94b");
        const decrypted = CryptoJS.DES.decrypt(text, keyHex, {
          iv: ivHex,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
      // else if (encryptType == 'yw') {
      //   const str5 = novel_info;
      //str4 = JNIPwdUtils.decodeByFock(text, str5);
      // let str3;
      // let str4 = "";
      // try {
      // Fock.FockResult unlock = Fock.unlock(text, str5);
      // if (unlock.status == Fock.FockResult.STATUS_SUCCESS) {
      //   str3 = new String(unlock.data, StandardCharsets.UTF_8);
      //   try {
      //     if (!g.E(str3)) {
      //       str4 = str3;
      //     }
      //   } catch (e2) {
      //     log.error("fock解密失败/additionalKey=" + str5 + "/content=" + text + "/errorStr=" + (e2 as any).toString());
      //     return;
      //   }
      // }
      //     return str4;
      //   }
      // }
      else {
        log.error(`unknown encryptType ${encryptType}`);
        return text;
      }
    }
    async function getChapterByApi(): Promise<ChapterParseObject> {
      let chapterGetInfoUrl = chapterUrl.replaceAll("id", "Id");
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "http://www.jjwxc.net/onebook.php?",
        "https://app.jjwxc.net/androidapi/chapterContent?"
      );
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "https://www.jjwxc.net/onebook.php?",
        "https://app.jjwxc.net/androidapi/chapterContent?"
      );
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "http://my.jjwxc.net/onebook_vip.php?",
        "https://app.jjwxc.net/androidapi/chapterContent?"
      );
      chapterGetInfoUrl = chapterGetInfoUrl.replace(
        "https://my.jjwxc.net/onebook_vip.php?",
        "https://app.jjwxc.net/androidapi/chapterContent?"
      );
      //let sid = getCookieObj("token");
      chapterGetInfoUrl += "&versionCode=381";
      // if (isVIP) {
      let sid = (unsafeWindow as UnsafeWindow).tokenOptions?.Jjwxc;
      if (sid) {
        if (typeof sid !== "string") {
          sid = sid as {
            token: string;
            user_key: string;
          };
          // if (sid.user_key)
          //   sid = sid.token + "&user_key=" + sid.user_key;
          // else
          sid = sid.token;
        }
        chapterGetInfoUrl +=
          "&token=" + sid;
      } else {
        throw new Error(
          `当前需要手动捕获android版app token,详见github主页说明`
        );
      }
      //}
      // }

      async function getChapterInfo(url: string): Promise<ChapterInfo> {
        log.debug(
          `请求地址: ${url}, Referrer: ${chapterUrl}, 重试次数: ${retryTime}`
        );
        const user_agent = "Mozilla/5.0 (Linux; Android 15; Pixel 7 Pro Build/TP1A.241005.002.B2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/134.0.6998.109 Mobile Safari/537.36/JINJIANG-Android/381(Pixel7Pro;Scale/3.5;isHarmonyOS/false)" + Date.now();
        return new Promise((resolve) => {
          _GM_xmlhttpRequest({
            url: url,
            headers: {
              //   accept: "application/json",
              referer: "http://android.jjwxc.net?v=381",
              //    not_tip: "updateTime",
              "user-agent": user_agent,
              //  "accept-encoding": "gzip",
            },
            method: "GET",
            onload: function (response) {
              if (response.status === 200) {
                // if (isVIP) {
                let decodeResponseText = String(response.responseText);
                let resultI = JSON.parse('{"message":"try again!"}');
                try {
                  resultI = JSON.parse(decodeResponseText);
                } catch (e) {
                  decodeResponseText = decodeVIPResopnce(response.responseHeaders, decodeResponseText);
                }
                try {
                  resultI = JSON.parse(decodeResponseText);
                } catch (e) {
                  log.debug(`json：${decodeResponseText}`);
                  resultI = JSON.parse('{"message":"try again!"}');
                }
                resolve(resultI);
                // } else {
                //   const resultI: ChapterInfo = JSON.parse(
                //     response.responseText
                //   );
                //   resolve(resultI);
                // }
              } else {
                log.error(`response status = ${response.status}`);
                const resultI: ChapterInfo = JSON.parse(
                  '{"message":"try again!"}'
                );
                resolve(resultI);
              }
            },
          });
        });
      }
      let result = await getChapterInfo(chapterGetInfoUrl.toString());
      while ("message" in result && result.message == "try again!") {
        retryTime++;
        if (retryTime > retryLimit) {
          retryTime = 0;
          log.error(`请求${chapterGetInfoUrl.toString()}$失败`);
          throw new Error(`请求${chapterGetInfoUrl.toString()}$失败`);
        }
        result = await getChapterInfo(chapterGetInfoUrl.toString());
      }
      log.debug(`本章请求结果如下： response code ${result?.code}, info ${result.message}`);
      retryTime = 0;
      if ("content" in result) {
        const chapterinfo = "";//novelID + "-" + chapterID;
        let content = result.content;
        let postscript = result.sayBodyV2 ?? " ";
        // if (isVIP) {
        if (result.encryptField.includes("content"))
          content = decodeVIPText(content, result.encryptType, chapterinfo);
        if (result.encryptField.includes("sayBodyV2"))
          postscript = decodeVIPText(postscript, result.encryptType, chapterinfo);
        // }
        const contentRaw = document.createElement("pre");
        contentRaw.innerHTML = content;
        // content can have HTML characters (such as &amp;).
        contentRaw.innerHTML = contentRaw.textContent || "";
        // these special characters are double-encoded. decode them twice.
        const contentTextRaw = contentRaw.textContent || "";
        let contentText = contentTextRaw.split("\n").map((p: string) => p.trim()).join("\n\n");
        const _contentHTML = document.createElement("div");
        _contentHTML.innerHTML = contentTextRaw
          .split("\n")
          .map((p: string) => p.trim())
          .map((p: string) => {
            if (p.length === 0) {
              return "<p><br/></p>";
            } else {
              return `<p>${p}</p>`;
            }
          })
          .join("\n");
        const contentHTML = document.createElement("div");
        contentHTML.className = "main";

        contentHTML.appendChild(_contentHTML);

        if (postscript.trim().length > 0) {
          const hr = document.createElement("hr");
          const authorSayDom = document.createElement("div");
          authorSayDom.innerHTML =
            postscript
              ?.split("\n")
              ?.map((p: string) => {
                if (p.length === 0) {
                  return "<p><br/></p>";
                } else {
                  return `<p>${p}</p>`;
                }
              })
              ?.join("\n") ?? "";

          contentHTML.appendChild(hr);
          contentHTML.appendChild(authorSayDom);
        }

        contentRaw.innerHTML = postscript.trim().length === 0 ? contentRaw.innerHTML : 
        [
          contentRaw.innerHTML,
          AUTHOR_SAY_PREFIX,
          postscript,
        ].join("\n\n");
        contentText = postscript.trim().length === 0 ? contentText: [contentText, AUTHOR_SAY_PREFIX, postscript].join("\n\n");
        await sleep(2000 + Math.round(Math.random() * 2000));
        return {
          chapterName,
          contentRaw,
          contentText,
          contentHTML,
          contentImages: null,
          additionalMetadate: null,
        };
      } else {
        await sleep(1000 + Math.round(Math.random() * 1000));
        return {
          chapterName,
          contentRaw: null,
          contentText: null,
          contentHTML: null,
          contentImages: null,
          additionalMetadate: null,
        };
      }
    }
    if (((unsafeWindow as UnsafeWindow).tokenOptions?.Jjwxc ?? null) != null) {
      return getChapterByApi();
    } else {
      log.warn(`当前我们更推荐手动捕获android版app token以下载章节,详见github主页说明,脚本将继续尝试使用远程字体下载，但可能会失败`);
      if (isVIP) {
        return vipChapter();
      } else {
        return publicChapter();
      }
    }
  }
}
