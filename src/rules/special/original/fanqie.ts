import { rm } from "../../../lib/dom";
import { BaseRuleClass } from "../../../rules";
import { Book, BookAdditionalMetadate } from "../../../main/Book";
import { getHtmlDOM } from "../../../lib/http";
import { cleanDOM } from "../../../lib/cleanDOM";
import { Chapter } from "../../../main/Chapter";
import { introDomHandle } from "../../../lib/rule";
import { getAttachment } from "../../../lib/attachments";
import { log } from "../../../log";
import { getFrameContentCondition} from "../../../lib/http";
import { _GM_xmlhttpRequest } from "../../../lib/GM";

export class fanqie extends BaseRuleClass {
    public constructor() {
        super();
        this.attachmentMode = "TM";
    }
    public async bookParse() {
        const bookUrl = document.location.href;
        const bookname = (
            document.querySelector(".info-name h1") as HTMLElement
        ).innerText.trim();
        const author = (
            document.querySelector('.author-name') as HTMLElement
        )?.innerText.trim();
        const introDom = document.querySelector(".page-abstract-content") as HTMLElement;
        const [introduction, introductionHTML] = await introDomHandle(introDom);
        const additionalMetadate: BookAdditionalMetadate = {};
        additionalMetadate.tags = Array.from(
            document.querySelectorAll(
                'span.info-label-grey'
            )
        ).map((a) => (a as HTMLAnchorElement).innerText);
        const chapters: Chapter[] = [];
        let chapterNumber = 0;
        let sectionName: string | null = null;
        let sectionNumber = 0;
        let sectionChapterNumber = 0;
        const sectionList = document.querySelector('.page-directory-content')?.childNodes ?? [];
        sectionList.forEach((sectionElem) => { 
            const node = sectionElem as HTMLElement;
            sectionName = (node.querySelector('div.volume') as HTMLAnchorElement)?.innerText.trim(); 
            sectionChapterNumber = 0;
            sectionNumber++;
            const chapterList = node.querySelectorAll('div.chapter-item');
            chapterList.forEach((chapterElem) => {
                sectionChapterNumber++;
                chapterNumber++;
                const chapterUrl = (chapterElem.querySelector('a') as HTMLAnchorElement).href;
                const chapterName = (chapterElem.querySelector('a') as HTMLAnchorElement).innerText;
                const isVIP = chapterElem.querySelector('.chapter-item-lock') ? true : false;
                const isPaid = false;
                chapters.push(new Chapter({
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
                    chapterParse: this.chapterParse,
                    charset: this.charset,
                    options: {},
                }));
            });
        });
        while (document.querySelectorAll(".book-cover img.loaded").length === 0)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        const coverUrl = document.querySelector(".book-cover img.loaded")?.getAttribute("src") ?? null;
        if (coverUrl) {
            getAttachment(coverUrl, this.attachmentMode, "cover-")
                .then((coverClass) => {
                    additionalMetadate.cover = coverClass;
                })
                .catch((error) => log.error(error));
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
        const id = chapterUrl.match(/\d+/);
        let url = `https://fanqienovel.com/api/reader/full?itemId=${id}&force_mobile=0`
        let result:string = await new Promise((resolve) => {
            _GM_xmlhttpRequest({
                url: url,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.62 Mobile Safari/537.36",
                    "ismobile": "0",
                    cookie: document.cookie,
                },
                method: "GET",
                onload: function (response) {
                    if (response.status === 200) {
                        resolve(response.responseText);
                    } else {
                        log.error(response);
                        resolve('');
                    }
                },
            });
        });
        let content = '';
        let json = null;
        try {
            json = JSON.parse(result);
        } catch (error) {
            log.error('JSON.parse(result) error', error);
        }
        let data = json?.data?.chapterData ?? null;
        if (!data) {
            log.debug(url, result);
            content = '未购买SVIP';
        }
        else if (data.isChapterLock)
            content = '未购买SVIP';
        else content = GetContentDecode(data.content);
        if (content === '未购买SVIP') {
            log.debug('未购买SVIP,尝试第三方API获取章节内容');
            url = `https://novel.snssdk.com/api/novel/reader/full/v1/?item_id=${id}`;
            result = await new Promise((resolve) => {
                _GM_xmlhttpRequest({
                    url: url,
                    method: "GET",
                    onload: function (response) {
                        if (response.status === 200) {
                            resolve(response.responseText);
                        } else {
                            log.error(response);
                            resolve('');
                        }
                    },
                });
            });
            json = null;
            try {
                json = JSON.parse(result);
            } catch (error) {
                log.error('JSON.parse(result) error', error);
            }
            data = json?.data ?? null;
            if (!data) {
                log.debug(url, result);
                content = '你没有购买SVIP,且第三方API获取章节内容失败';
            }
            else if (data.need_pay)
                content = '你没有购买SVIP,且第三方API未购买VIP';
            else content = data.content;
        }
        const contentRaw = document.createElement('div');
        contentRaw.innerHTML = content;
        const { dom, text, images } = await cleanDOM(contentRaw, "TM");
        return {
            chapterName,
            contentRaw: contentRaw,
            contentText: text,
            contentHTML: dom,
            contentImages: images,
            additionalMetadate: null,
        };
    }
    
}

function GetContentDecode(res:string) {
    const data2 = ["D", "在", "主", "特", "家", "军", "然", "表", "场", "4", "要", "只", "v", "和", "?", "6", "别", "还", "g", "现", "儿", "岁", "?", "?", "此", "象", "月", "3", "出", "战", "工", "相", "o", "男", "直", "失", "世", "F", "都", "平", "文", "什", "V", "O", "将", "真", "T", "那", "当", "?", "会", "立", "些", "u", "是", "十", "张", "学", "气", "大", "爱", "两", "命", "全", "后", "东", "性", "通", "被", "1", "它", "乐", "接", "而", "感", "车", "山", "公", "了", "常", "以", "何", "可", "话", "先", "p", "i", "叫", "轻", "M", "士", "w", "着", "变", "尔", "快", "l", "个", "说", "少", "色", "里", "安", "花", "远", "7", "难", "师", "放", "t", "报", "认", "面", "道", "S", "?", "克", "地", "度", "I", "好", "机", "U", "民", "写", "把", "万", "同", "水", "新", "没", "书", "电", "吃", "像", "斯", "5", "为", "y", "白", "几", "日", "教", "看", "但", "第", "加", "侯", "作", "上", "拉", "住", "有", "法", "r", "事", "应", "位", "利", "你", "声", "身", "国", "问", "马", "女", "他", "Y", "比", "父", "x", "A", "H", "N", "s", "X", "边", "美", "对", "所", "金", "活", "回", "意", "到", "z", "从", "j", "知", "又", "内", "因", "点", "Q", "三", "定", "8", "R", "b", "正", "或", "夫", "向", "德", "听", "更", "?", "得", "告", "并", "本", "q", "过", "记", "L", "让", "打", "f", "人", "就", "者", "去", "原", "满", "体", "做", "经", "K", "走", "如", "孩", "c", "G", "给", "使", "物", "?", "最", "笑", "部", "?", "员", "等", "受", "k", "行", "一", "条", "果", "动", "光", "门", "头", "见", "往", "自", "解", "成", "处", "天", "能", "于", "名", "其", "发", "总", "母", "的", "死", "手", "入", "路", "进", "心", "来", "h", "时", "力", "多", "开", "已", "许", "d", "至", "由", "很", "界", "n", "小", " 与", "Z", "想", "代", "么", "分", "生", "口", "再", "妈", "望", "次", "西", "风", "种", "带", "J", "?", "实", "情", "才", "这", "?", "E", "我", "神", "格", "长", "觉", "间", "年", "眼", "无", "不", "亲", "关", "结", "0", "友", "信", "下", "却", "重", "己", "老", "2", "音", "字", "m", "呢", "明", "之", "前", "高", "P", "B", "目", "太", "e", "9", "起", "稜", "她", "也", "W", "用", "方", "子", "英", "每", "理", "便", "四", "数", "期", "中", "C", "外", "样", "a", "海", "们", "任"]
    const code = 58344;
    let content = '';
    for (let i = 0; i < res.length; i++) {
        const key = res[i].charCodeAt(0);
        const index = key - code;
        const replacement = (data2[index] && data2[index] !== '?') ? data2[index] : res[i];
        content += replacement;
    }
    return content;
}