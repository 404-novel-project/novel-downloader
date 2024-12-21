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
        const url = `https://novel.snssdk.com/api/novel/reader/full/v1/?item_id=${id}`;
        // const result = await fetch(url, {
        //     method: "GET",
        //     headers: {
        //         "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.62 Mobile Safari/537.36",
        //         "ismobile": "0",
        //     },
        // }).then((res) => res.text());
        const result:string = await new Promise((resolve) => {
            _GM_xmlhttpRequest({
                url: url,
                headers: {
                    // "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.62 Mobile Safari/537.36",
                    // "ismobile": "0",
                    cookie: document.cookie,
                },
                method: "GET",
                onload: function (response) {
                    resolve(response.responseText);
                },
            });
        });
        log.debug(url,result);
        const json = JSON.parse(result);
        const data = json?.data ?? null;
        let content = '';
        if (!data) 
            content = '获取章节内容失败';
        else if (data.need_pay)
            content = 'VIP章节未购买';
        else content = data.content; //GetContentDecode(data.content);
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

function GetTitleDecode(res: string) {
    const data1 = ["s", "?", "作", "口", "在", "他", "能", "并", "B", "士", "4", "U", "克", "才", "正", "们", "字", "声", "高", "全", "尔", "活", "者", "动", "其", "主", "报", "多", "望", "放", "h", "w", "次", "年", "?", "中", "3", "特", "于", "十", "入", "要", "男", "同", "G", "面", "分", "方", "K", "什", "再", "教", "本", "己", "结", "1", "等", "世", "N", "?", "说", "g", "u", "期", "Z", "外", "美", "M", "行", "给", "9", "文", "将", "两", "许", "张", "友", "0", "英", "应", "向", "像", "此", "白", "安", "少", "何", "打", "气", "常", "定", "间", "花", "见", "孩", "它", "直", "风", "数", "使", "道", "第", "水", "已", "女", "山", "解", "d", "P", "的", "通", "关", "性", "叫", "儿", "L", "妈", "问", "回", "神", "来", "S", "?", "四", "里", "前", "国", "些", "O", "v", "l", "A", "心", "平", "自", "无", "军", "光", "代", "是", "好", "却", "c", "得", "种", "就", "意", "先", "立", "z", "子", "过", "Y", "j", "表", "?", "么", "所", "接", "了", "名", "金", "受", "J", "满", "眼", "没", "部", "那", "m", "每", "车", "度", "可", "R", "斯", "经", "现", "门", "明", "V", "如", "走", "命", "y", "6", "E", "战", "很", "上", "f", "月", "西", "7", "长", "夫", "想", "话", "变", "海", "机", "x", "到", "W", "一", "成", "生", "信", "笑", "但", "父", "开", "内", "东", "马", "日", "小", "而", "后", "带", "以", "三", "几", "为", "认", "X", "死", "员", "目", "位", "之", "学", "远", "人", "音", "呢", "我", "q", "乐", "象", "重", "对", "个", "被", "别", "F", "也", "书", "稜", "D", "写", "还", "因", "家", "发", "时", "i", "或", "住", "德", "当", "o", "I", "比", "觉", "然", "吃", "去", "公", "a", "老", "亲", "情", "体", "太", "b", "万", "C", "电", "理", "?", "失", "力", "更", "拉", "物", "着", "原", "她", " 工", "实", "色", "感", "记", "看", "出", "相", "路", "大", "你", "侯", "2", "和", "?", "与", "p", "样", "新", "只", "便", "最", "不", "进", "T", "r", "做", "格", "母", "总", "爱", "身", "师", "轻", "知", "往", "加", "从", "?", "天", "e", "H", "?", "听", "场", "由", "快", "边", " 让", "把", "任", "8", "条", "头", "事", "至", "起", "点", "真", "手", "这", "难", "都", "界", "用", "法", "n", "处", "下", "又", "Q", "告", "地", "5", "k", "t", "岁", "有", "会", "果", "利", "民"]
    const code = 58345;
    let content = '';
    for (let i = 0; i < res.length; i++) {
        const key = res[i].charCodeAt(0);
        const index = key - code;
        const replacement = (data1[index] && data1[index] !== '?') ? data1[index] : res[i];
        content += replacement;
    }
    return content;
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

function GetDecode(res: string) {
    const data3 = ['体', 'y', '十', '现', '快', '便', '话', '却', '月', '物', '水', '的', '放', '知', '爱', '万', '?', '表', '风', '理', 'O', '老', '也', 'p', '常', '克', '平', '几', '最', '主', '她', 's', '将', '法', '情', 'o', '光', 'a', '我', '呢', 'J', '员', '太', '每', '望', '受', '教', 'w', '利', '军', '已', 'U', '人', '如', '变', '得', '要', '少', '斯', '门', '电', 'm', '男', '没', 'A', 'K', '国', '时', '中', '走', '么', '何', '口', '小', '向', '问', '轻', 'T', 'd', '神', '下', '间', '车', 'f', 'G', '度', 'D', '又', '大', '面', '远', '就', '写', 'j', '给', '通', '起', '实', 'E', '?', '它', '去', 'S', '到', '道', '数', '吃', '们', '加', 'P', '是', '无', '把', '事', '西', '多', '界', '?', '发', '新', '外', '活', '解', '孩', '只', '作', '前', 'Y', '尔', '经', '?', 'u', '心', '告', '父', '等', 'Q', '民', '全', '这', '9', '果', '安', '?', 'i', '母', '8', 'r', '说', '任', '先', '和', '地', 'C', '张', '战', '场', 'g', '像', 'c', 'q', '你', '使', '?', '样', '总', '目', 'x', '性', '处', '音', '头', '?', '应', '乐', '关', '能', '花', 'l', '当', '名', '手', '4', '重', '字', '声', '力', '友', '然', '生', '代', '内', '里', '本', '回', '真', '入', '师', '象', '?', '0', '点', 'R', ' 亲', 'V', '种', '动', '英', '命', 'Z', 'h', 'X', '做', '特', '边', '高', '有', 'B', '为', '期', '自', '年', '马', '认', '出', '接', '至', 'H', '正', '方', '感', '所', '明', '者', '稜', 'F', '住', '学', '还', '分', '意', '更', '其', 'n', '但', '比', '觉', '以', '由', '死', '家', '让', '失', '士', 'L', '2', 'I', '金', '叫', '身', '报', '听', 'w', '再', '原', '山', '海', '白', '很', '见', '5', '直', '位', '第', '工', '个', '开', '岁', '好', '用', '都', '于', '可', '同', '3', '次', '四', '?', '日', '信', '与', '女', '笑', '满', '并', '部', '什', '不', '从', '或', '机', '此', '?', '了', '记', '三', 'e', '些', 'b', 'N', '夫', '会', '才', '儿', '眼', '两', '美', '被', ' 一', '公', '来', '立', 'z', '长', '对', '己', '看', 'k', '许', '因', '相', '色', '后', '往', '打', '结', '格', '过', '世', '气', '7', '子', '条', '在', '书', '之', '定', 'v', '拉', '成', '进', '带', '着', '东', '上', '想', '天', '他', '妈', '1', '文', '而', '路', '那', '别', '德', '6', 'M', 't', '行', '侯', '难']
    const code = 58344;
    let content = '';
    for (let i = 0; i < res.length; i++) {
        const key = res[i].charCodeAt(0);
        const index = key - code;
        const replacement = (data3[index] && data3[index] !== '?') ? data3[index] : res[i];
        content += replacement;
    }
    return content;
}