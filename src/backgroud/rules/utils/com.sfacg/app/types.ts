// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SfResp<T> {
  status: Status;
  data: T;
}

enum SignStatus {
  Vip = "VIP",
  签约 = "签约",
  普通 = "普通",
}

export type Login = null;

/*
{
    "ip": "xxx.xxx.xxx.xxx",
    "location": "中国XXXX",
    "countryCode": 86
}
*/
export interface Position {
  ip: string;
  location: string;
  countryCode: number;
}

/*
{
    "userName": "XXXXXXXXXXXXXXXX",
    "countryCode": 86,
    "nickName": "【昵称】",
    "email": "XXXX@XXXX.com",
    "accountId": 29xxxxx,
    "roleName": "",
    "fireCoin": 0,
    "avatar": "https://rss.sfacg.com/web/account/images/avatars/common/xxxx-xx-xx_x-xx-xx.jpg",
    "isAuthor": false,
    "phoneNum": "",
    "registerDate": "201X-XX-XXTxx:xx:xx"
}
*/
export interface User {
  userName: string;
  countryCode: number;
  nickName: string;
  email: string;
  accountId: number;
  roleName: string;
  fireCoin: number;
  avatar: string;
  isAuthor: boolean;
  phoneNum: string;
  registerDate: string;
}

/* 
{
    "httpCode": 200,
    "errorCode": 200,
    "msgType": 0,
    "msg": null
}
{
    "httpCode": 401,
    "errorCode": 502,
    "msgType": 0,
    "msg": "需要登录才能访问该资源"
}
{
    "httpCode": 401,
    "errorCode": 644,
    "msgType": 0,
    "msg": "请支持作者的辛勤写作,VIP章节必须登录购买后才可阅读"
}
*/
interface Status {
  httpCode: number;
  errorCode: number;
  msgType: number;
  msg: null;
}

export function check<T>(data: SfResp<T>) {
  const status = data.status;
  if (status.httpCode === 200 && status.errorCode === 200) {
    return true;
  }
  throw new SyntaxError("SFACG APP API check failed!", {
    cause: { httpCode: status.httpCode, errorCode: status.errorCode, msg: status.msg },
  });
}

/*
{
    "authorId": 94503,
    "lastUpdateTime": "2023-07-16T20:00:00",
    "markCount": 18201,
    "novelCover": "https://rss.sfacg.com/web/novel/images/NovelCover/Big/2023/04/f496064a-94a0-4e24-96e3-f3895df580c2.jpg",
    "bgBanner": "",
    "novelId": 632848,
    "novelName": "反派的我把败犬养成黑化BOSS",
    "point": 5,
    "isFinish": false,
    "authorName": "紫风汐",
    "charCount": 335066,
    "viewTimes": 1861899,
    "typeId": 21,
    "allowDown": false,
    "addTime": "2023-04-02T00:05:05",
    "isSensitive": false,
    "signStatus": "VIP",
    "categoryId": 0,
    "expand": {
        "intro": "作为资深游戏策划的威尔，在发现自己成为退队文炮灰反派后，就有一个梦想——\n他要让追夫火葬场的败犬们，通通黑化，折磨那个主角！\n他教胆小怯懦的兽娘女仆，要永远把你爱的那个他囚禁在身边。\n他教傲娇毒舌的萝莉魔女，要让你的意中人眼里只剩下你一个。\n他教冰山呆萌的半精灵公主，用你的权用你的势让他插翅难飞。\n洗白弱三分，黑化强十倍，看着败犬逐渐成长，威尔很欣慰。\n“哦？这么多年你一直不知道我是女孩子吗？没事，你把我当兄弟不妨碍我想上你。”\n多年以后，威尔面对黑化少女们的柴刀，会想起他第一次见到主角……和她那对大白兔的那个下午。",
        "typeName": "魔幻",
        "sysTags": [
            {
                "sysTagId": 16,
                "tagName": "西幻"
            },
            {
                "sysTagId": 58,
                "tagName": "恋爱"
            },
            {
                "sysTagId": 397,
                "tagName": "养成"
            },
            {
                "sysTagId": 399,
                "tagName": "倒追"
            }
        ]
    }
}
*/

interface SysTag {
  sysTagId: number;
  tagName: string;
}
interface NovelInfoExpand {
  intro: string;
  typeName: string;
  sysTags: SysTag[];
}
export interface NovelInfo {
  authorId: number;
  lastUpdateTime: string;
  markCount: number;
  novelCover: string;
  bgBanner: string;
  novelId: number;
  novelName: string;
  point: number;
  isFinish: boolean;
  authorName: string;
  charCount: number;
  viewTimes: number;
  typeId: number;
  allowDown: boolean;
  addTime: string;
  isSensitive: boolean;
  signStatus: SignStatus;
  categoryId: number;
  expand: NovelInfoExpand;
}

/*
{
    "chapId": 7538868,
    "novelId": 632848,
    "volumeId": 833177,
    "needFireMoney": 0,
    "originNeedFireMoney": 0,
    "chapterOriginFireMoney": 0,
    "charCount": 2941,
    "rowNum": 0,
    "chapOrder": 1,
    "title": "序章 我会像养狗一样养你的！",
    "content": null,
    "sno": 1,
    "isVip": false,
    "AddTime": "2023-04-02T00:05:37",
    "updateTime": null,
    "canUnlockWithAd": false,
    "ntitle": "序章 我会像养狗一样养你的！",
    "isRubbish": false,
    "auditStatus": 1
}
{
    "chapId": 7802910,
    "novelId": 632848,
    "volumeId": 851767,
    "needFireMoney": 10,
    "originNeedFireMoney": 10,
    "chapterOriginFireMoney": 10,
    "charCount": 2143,
    "rowNum": 0,
    "chapOrder": 36,
    "title": "第一百三十八章 强化石的来源？",
    "content": null,
    "sno": 36,
    "isVip": true,
    "AddTime": "2023-07-13T19:52:32",
    "updateTime": null,
    "canUnlockWithAd": true,
    "ntitle": "第一百三十八章 强化石的来源？",
    "isRubbish": false,
    "auditStatus": -1
}
{
    "chapId": 7566651,
    "novelId": 632848,
    "volumeId": 833177,
    "needFireMoney": 0,
    "originNeedFireMoney": 0,
    "chapterOriginFireMoney": 0,
    "charCount": 2648,
    "rowNum": 0,
    "chapOrder": 12,
    "title": "第十一章 女主角",
    "content": null,
    "sno": 12,
    "isVip": false,
    "AddTime": "2023-04-11T19:54:23",
    "updateTime": "2023-04-12T10:15:12",
    "canUnlockWithAd": false,
    "ntitle": "第十一章 女主角",
    "isRubbish": false,
    "auditStatus": 1
}
*/
interface ChapterListItem {
  chapId: number;
  novelId: number;
  volumeId: number;
  needFireMoney: number;
  originNeedFireMoney: number;
  chapterOriginFireMoney: number;
  charCount: number;
  rowNum: number;
  chapOrder: number;
  title: string;
  content: null;
  sno: number;
  isVip: boolean;
  AddTime: string;
  updateTime: null | string;
  canUnlockWithAd: boolean;
  ntitle: string;
  isRubbish: boolean;
  auditStatus: number;
}

/* 
{
    "volumeId": 833177,
    "title": "第一卷",
    "sno": 1,
    "chapterList": [
        ......
    ]
}
*/
interface VolumeListItem {
  volumeId: number;
  title: string;
  sno: number;
  chapterList: ChapterListItem[];
}
export interface Catalog {
  novelId: number;
  lastUpdateTime: string;
  volumeList: VolumeListItem[];
}

/*
{
    "chapId": 7538868,
    "novelId": 632848,
    "volumeId": 833177,
    "charCount": 2941,
    "rowNum": 0,
    "chapOrder": 1,
    "title": "序章 我会像养狗一样养你的！",
    "addTime": "2023-04-02T00:05:37",
    "updateTime": "2023-04-02T00:05:37",
    "sno": 1,
    "isVip": false,
    "expand": {
        "needFireMoney": 0,
        "originNeedFireMoney": 0,
        "content": "“命运，是注定的。”\r\n细雪飘飞。\r\n希斯特姆公爵家的别院，北边荒凉的后院的一棵桦树下，一块小小的一眼便知是小孩用石块垒起的墓碑前，眼镜上已经起雾的棕发少年，抱着这个季节难寻的一簇白菊，沉重地说。\r\n他没有流泪，眼眶却是红的。\r\n“不管用什么方式，不管付出了多大的努力，不管用多么细致的方法，不管精心计划了多少……最后……应得的死亡都会在你以为倾尽一切终于抵达的终点，等着收割你的头颅。”\r\n他外表看起来只有十岁的样子，但嘴里说出的话却成熟又沉重。\r\n“威……威尔少爷？您……没事吧？”\r\n一旁的女仆叫出了少年的名字，她看起来和威尔一个年龄，棕色的短发刚好垂到肩膀。\r\n比较特别的是，她头上有一对竖立的狼耳，狼耳因为天气寒冷而打了个颤。\r\n“哦，我亲爱的伊爱尔，不用担心我。这般残酷的命运我早有预料，从我出生在这个世界，我就已经想到了这一天，对这一天我早有准备。”\r\n他看了一眼那简陋的墓碑，在飘散的细雪中，墓碑的顶端已经积起了薄薄一层雪花。\r\n风吹过桦树林，传来叶落的声音。\r\n“呃……少爷，允许我问一个问题吗？”\r\n“问吧，伊爱尔，想必你也和我一样看穿了命运的无奈——”\r\n“少爷，刚刚……刚刚真的只是死了只狗吧？埋、埋进去的……不是、不是别的什么东西吧？少爷说的好恐怖——”\r\n“……”\r\n威尔·希斯特姆，作为一个外表十岁的贵族少爷，有些难以启齿，自己其实是转生到这里的。\r\n他一睁眼的时候，听到周围人在庆祝“希斯特姆”家的少爷出生了，只感觉眼前一黑。\r\n这不是著名厕纸轻小说《退队之后被地下城女帝包养了》的反派家少爷在的那个家族吗？！\r\n而自己……\r\n被这本厕纸折磨得不轻。\r\n一本剧情非常传统，非常套路，非常典中典的退队文，最要命的地方是它动画化之后大火特火大爆特爆——以至于老板买了它的版权并且告诉自己：\r\n“小威啊，这个IP就由我们改成手游了，系统策划、数值策划、任务策划就都交给你完成了。加油啊，今年公司怎么向股东交代就全靠你了！”\r\n啊，这大概是报应吧。自己上辈子为了赚钱把这玩意改成圈钱手游，这辈子就得转生成厕纸里面的反派被主角暴打。\r\n幸好，游戏似乎还没上线，以他目前的观察，这应该是“小说”的世界，而不是他“游戏”的世界，这样他好歹还是知道剧情走向的——毕竟他不太信任动手写手游剧情的那位编剧小妹。\r\n至于为什么这么说……\r\n因为他为了圈钱大刀阔斧原创的一系列骗氪强化素材，并没有出现。\r\n太好了，神圣、纯洁、完美（暂定）的原著还没有被玷污。\r\n威尔·希斯特姆是贯穿小说前期的反派少爷。原作主角修·泊洛尔所被赶出来的冒险队“启明之星”，就是由他一手建立的——哦，当然赶主角走这件事，反派少爷也是助推器。\r\n他的队友，在他赶走修之后，逐渐擦亮双眼，清醒头脑，愤慨追夫火葬场，为了修而纷纷叛逃。\r\n战况叫一个惨烈，追夫的女主们不但被主角所在的地下城女帝一顿暴打，甚至连情感上也得不到主角的回眸，一个个都化身败犬，又菜又谐还啥也没做成，就只会原地搁那哭唧唧。\r\n哇，都好惨哦（棒读）。\r\n而他这位少爷，不但做了光杆司令，最后还在某个地下城一层被天降的超大史莱姆压死了。\r\n——老板说用户调研表示这段特别受欢迎，一定要记得做在活动剧情的彩蛋里，能做个BOSS就更好了。\r\n幸好，距离他被史莱姆砸死，嗯，大概还有很长的时间，大概有个八年左右吧，让他能够找到回避的方法。\r\n但……\r\n开始了吗？\r\n已经结束了哦（笑）。\r\n对“命运限制程度”的测试，在今天结束了。\r\n原作中，被威尔折磨了很多年的胆小女仆伊爱尔的回忆里，提到过，十岁的时候，威尔因为他宠物狗三七被他自己忘在室外冻死了，暴揍了她一顿。\r\n现威尔，在尝试对这一命运进行“修改”。\r\n他可是前系统策划，最知道如何规划养成资源，养好角色了。\r\n他精心挑选狗粮，不但要最贵的，而且要能增加冰冻耐性的那种！\r\n他精心训练狗子，冬天每天早上都要亲自带狗子出去跑三公里，彻底让狗子不畏严寒！\r\n他精心建造狗屋，而且三年都在叮嘱伊爱尔，睡觉前要记得绕房屋三圈，保证狗子已经回到柴火充足的狗屋！\r\n三年下来，狗子三七在附近村里闻名遐迩，甚至已经能做到单刷周围魔物冰狼群。\r\n威尔觉得它都不至于被史莱姆砸死了。\r\n然而……\r\n这一天还是没能躲过。\r\n一个飘雪的冬天，一只健壮的狗子，躺在一个狭窄的坟墓里。\r\n“伊爱尔，这真的是可悲的一生。”\r\n“呃……伊爱尔不知道说什么，请少爷节哀！想哭的话可以哭出来，伊爱尔会给你擦眼泪防止它冻在脸上的。不要这么憋着，您看起来太不正常了，伊爱尔很害怕。”\r\n“除了命运，已经无法解释了。”\r\n虽然威尔嘴上说了无数次“这都是命运”来安慰自己。\r\n但……\r\n一旦想起……\r\n三七是因为刚刚走出精致的狗窝两步路踩到了他精心准备的提升冰冻耐性的狗盘翻了五个跟头滑到了冰冻景观湖上凭空用自己壮实的后脚跟蹬腿超级加速转了三十七圈撞到了对面树上而死这件事。\r\n他就绷不住啊？！\r\n是不是太强行了一点？！\r\n即使是固定又可悲的命运……\r\n一定要用这种逆天办法去死吗？\r\n想到那个画面，他嘴角就忍不住上翘。\r\n“那那那……少爷，不要顾忌三七的在天之灵！想笑就笑出来吧！笑出来可能……可能就好受了……噗……”\r\n“哈哈哈哈哈哈哈哈哈……傻狗，你死的太tm好笑了——”\r\n“哈哈哈哈哈哈哈……”\r\n伊爱尔和他在三七的坟墓面前放声大笑。\r\n雪，下的更大了。\r\n不过，这给了威尔一些新的启发，让他得开始执行plan B。\r\n伊爱尔的性格比原作里开朗了不少，并不惧怕他，还会对他开玩笑。这归功于这些年来他对伊爱尔这个主角后宫关爱有加。\r\n特别……\r\n“少爷，又累又冷，我们回屋喝点热茶吧？我给您泡好了。”\r\n在他的关爱下，通过一年的训练，原作里面特别强调的伊爱尔不会泡茶这个设定，被他改变了。现在伊爱尔泡得一手好茶，连女仆长苏珊也承认她的水平极好。\r\n以及，那只会冻死的狗，虽然它死亡的命运没有改变，但至少在这一段时间内，它确实打遍了周围的魔物，体能得到了锻炼。\r\n也就是说，虽然结局没有改变，但这个世界角色们的性格、能力，是可以由他“养成”的。\r\n就像游戏系统一样，她们可以学会新的技能获得新的能力。\r\n她们是可以变强的！\r\n于是……\r\n他觉得相当恶趣味的PlanB可以付诸实践了——\r\n他，必死的反派少爷，要把那些追夫火葬场的三位败犬——\r\n不坦率又冷淡只会嫌弃主角能力不足的半精灵小公主。\r\n披着红瞳金发萝莉皮毒舌暴躁总骂人的老不死小魔女。\r\n还有这边这位，明明原型是狼娘却胆小怕事不敢站出来维护主角的小兽娘。\r\n统统养成一个一个一个的黑化少女！\r\n常言道，洗白弱三分，黑化强十倍。\r\n原作的她们又菜又败犬，BOSS和主角都打不过，感情是说不出来，只有被主角吊打之后鸭子坐在地上哭唧唧的份。\r\n但要是黑化了就不一样了。\r\n她们够强，够有病，够恐怖，就可以折磨主角。\r\n可以把主角绑起来，吊起来，囚禁起来，让主角哪也去不了什么也干不成，眼睛里面只有她们，直到精神崩溃，身体磨损，再也离不开她们。\r\n至于他，可以在旁边嗑瓜子看乐子。\r\n人生得意须尽欢，莫使金樽空对月。\r\n春宵苦短，反正结局也不会改变，不如多给自己找点乐子。\r\n这是作为一个前世的游戏策划的觉悟。\r\n折磨玩家，他是专业的。\r\n“哈哈哈哈哈哈哈——我不能要你命，但我可以让你生不如死啊，哈哈哈哈哈——”\r\n“少爷——你怎么又在发癫？”\r\n“听好了，伊爱尔，我想通了。”\r\n他握住了伊爱尔的手，认真地看着伊爱尔水蓝色的眼睛。\r\n他的镜片在反光，虽然起了一层薄雾，但依然显得他格外睿智。\r\n既然可以把一只本该会被冻死的狗打造成把自己创死的存在，那只要像养这只狗一样养成她们，就有希望！\r\n“从今天开始，我会像养这只狗一样养你的！”\r\n“？？？”\r\n伊爱尔歪着头，头上的狼耳朝着她歪头的反方向倾斜。\r\n她心想一定是自己大脑还没有长出来，没能参悟少爷的意思。\r\n“那……汪汪？”",
        "tsukkomi": null,
        "chatLines": null,
        "authorTalk": null,
        "isContentEncrypted": false,
        "isBranch": false
    },
    "ntitle": "序章 我会像养狗一样养你的！",
    "isRubbish": false,
    "auditStatus": 1
}
{
    "chapId": 7420529,
    "novelId": 620487,
    "volumeId": 817644,
    "charCount": 3650,
    "rowNum": 0,
    "chapOrder": 59,
    "title": "第五十八章：小栖与王女的报恩",
    "addTime": "2023-02-18T13:43:29",
    "updateTime": "2023-02-18T13:43:29",
    "sno": 59,
    "isVip": false,
    "expand": {
        "needFireMoney": 0,
        "originNeedFireMoney": 0,
        "content": "剩下的事，便不足道也。\r\n自从塔佩亚盆地一战后，莉莉娅率军绕道丽尔特湖，中途还与兽人正好赶来的狼骑兵军团，发生了几次较大的摩擦。\r\n不过好在王国军撤退的还算及时，并未陷入兽人的包围圈中，一番鏖战后，王女殿下与绯焰花领军冲杀而出，斩敌数百余，凭借独角马比狼骑更出色的耐力甩开了敌军。\r\n后面，莉莉娅又率军几番与兽人从各个方向围拢而来的部队交战，这才知道原来对方早已布下了天罗地网，意图吃掉这支混入国境内部的小老鼠。\r\n但莉莉娅也早已有所准备，令雷顿大将军之子雷克特率一轻骑军蹲守在兽王国边境，兽人部队向内收缩，他也顺势带军冲入敌境，在预定位置接应了久战而疲的莉莉娅等人。\r\n最后，冲开兽人包围，回到了万壑堡垒。\r\n不过她们不清楚的是，其实兽人方面还派出了一支鹰身人部队，在空中拦截监视，而之所以莉莉娅等人从头到尾都没见到这支力量…….\r\n其实是因为某只巨龙和她的主人在向东飞驰的时候，一不小心冲过头，正好撞上了这些倒霉蛋。\r\n薇莉丝本身是无意对军队出手的，但双方因为同时高速飞行，注意到的时候已经碰面了。\r\n众所周知，龙娘小姐在处于本体状态的时候，会自然释放出龙威。\r\n虽然只是晓光下意识的行为，并没有出太多力，但属于lv100最上位巨龙的恐怖气息只是刚扩散出去，就让覆盖范围内的鹰身人跟下饺子一样，噼里啪啦掉的满地都是…….\r\n剩下的，也跟吓破了胆似的一哄而散，就像群受惊的雀鸟。\r\n而直到薇莉丝骑着龙在空中转了好几圈，与“慢悠悠”抵达丽尔特湖的莉莉娅等人汇合，这支部队也再没出现过。\r\n不过饶是如此，当几日后她们在雷克特援护下，从兽人边境线薄弱处突破而出，辗转回到万壑堡垒时，这支原本两千余人的精锐部队，也只剩下一千出头了。\r\n这就是战争，哪怕一次次胜利，摘取丰硕战果，也无法避免战士的接连死去，就连莉莉娅最精锐的影卫，同样在与狐人刺客们的拼杀中折损了五分之一左右。\r\n但从战略角度来看，无疑是莉莉娅的完全胜利。\r\n此次行动，联合王国方面彻底断绝、摧毁了【永生御座】其背后势力提供给兽人的战争支持，缴获品级不等魔晶数千，斩活尸百余，狮、虎、狼、豹等各类兽人六千余，击杀鬼狐刺客团四人。\r\n【永生御座】第六御座安东尼奥·史蒂文森，第四御座巴尔克和巴克尔被证实死亡，第七御座普拉卡卡不知所踪。\r\n几日后，万壑堡垒。\r\n“哈……突然就悠闲下来了呢。”\r\n黑发白袍的薇莉丝小姐靠在西城墙的石砖上，宝石般澄澈的银蓝色眸子无聊遥望着碧空，与低语平原广袤的大地，打了个哈欠。\r\n“薇莉丝，在干嘛呢？”\r\n已经换回了王女华服的莉莉娅从阶梯一步步登上城头，脚步轻快地来到牧师小姐身边，与她并肩坐下。\r\n银色战甲已然卸下，但悬于腰间的佩剑却已不会再消失，这场行动，让原本还有些稚嫩的王女殿下得到了铁与血的真正磨炼。\r\n自从那日薇莉丝替她和花挡下死兆星后，不知为何，莉莉娅对前者的称呼就进一步升级，很自然地变成了直呼其名。\r\n这并非疏远，对深谙各种礼仪规范的王女小姐来说，不加任何敬称，或许反而是代表着与对象间真正的交心与信任吧。\r\n“不干嘛啊…..看看外面有没有什么乐…..麻烦呗，说不定兽人哪根筋抽着，突然就杀回来了呢。”\r\n“噗嗤…….”\r\n莉莉娅掩嘴轻笑，经过这么长时间相处，她又怎么会不知道眼前之人那唯恐天下不乱的性子，不过这回她恐怕要失望了。\r\n“很可惜哦，刚刚得到斥候线报，兽人大军已经全面撤退，缩回兽王国境内了呢，其他城池也都解了围。”\r\n“何况，没有后续粮草支援，兽人是不可能再支撑得起百万大军长期开销了，所以卷土重来是不可能的，战争，已经结束啦。”\r\n“哎呀哎呀，知道了知道啦，别念了师父！”\r\n“？？？”\r\n王女小姐吃惊地瞪大了眼睛，薇莉丝也愣了一下，才意识到这里是异世界。不过她也没办法去跟莉莉娅解释此师父非彼师父，而是来自蓝星的某种开花…….\r\n两人同时安静了下来，气氛突然变得有些异样。\r\n“总感觉，有些不真实呢……本以为这次真的要死在外面了，没想到还能活着回来，甚至把兽人也打退了。”\r\n“是莉莉娅努力的结果哦。”\r\n牧师小姐温和地笑了笑。\r\n“不，多亏了薇莉丝的帮助，还有大家的努力。很多人都为此付出了生命，我还太不够成熟了，现在想想，很多事情其实当初都能做的更好。”\r\n王女殿下停了一下，缓缓说出掩藏在内心的真实想法。\r\n“而且，我总觉得兽王国在这场战争中未尽全力，像是有所顾忌。无论是攻击西疆防线，亦或塔佩亚盆地一战后围堵我们的兽人部队，都是如此。”\r\n“哦？莉莉娅觉得它们在演？”\r\n“没有，它们的确是抱着杀意而来的，但…….除了那些狐人刺客，尤其是为首的梅维斯外，其他兽人都只能说尽力，而没有拼命，否则我军的损失会更加惨重。”\r\n“而且，我自始至终都没见到兽人的空军，这太不合理了，甚至一些原本的部署也落在了空处………”\r\n“啊这…….”\r\n薇莉丝有点尴尬地悄悄偏过头，略作犹豫，还是没有说出真相。\r\n“嘛…….”\r\n牧师小姐无所谓地双手抱胸，“总而言之，成功不就行了吗，管那么多呢，莉莉娅就是喜欢整天想些有的没的，这样很累哦。”\r\n“哈哈……这是来自师父的教导吗？”\r\n“谁知道呢～”\r\n两位少女同时发出银铃般的轻笑，又不约而同停顿下来，良久，依旧是王女小姐打开话题。\r\n“呐，薇莉丝。”\r\n莉莉娅转头遥望着远方。\r\n“嗯？”\r\n“明天，我就要回去了，回王都勇气之城。”\r\n“啊，我听说了哦。”\r\n“…………….”\r\n沉默了。\r\n少女们心照不宣。\r\n莉莉娅的西疆之战圆满落幕，不但粉碎了王子与兽人勾结的阴谋，自身也获得了飞跃般的成长，可以说是破茧成蝶。\r\n孤军深入敌境，摧毁兽王国补给线，连战连胜，逼退百万兽人大军，还获得了西境大将军雷顿的支持。\r\n带着如此赫赫战功回到王都的话，即使是那些不择手段的豺狼们，也得好好考虑一下自己的立场了吧。\r\n但，莉莉娅的成功，也代表着她与薇莉丝之间契约的结束。\r\n毕竟两人之间的约定，就是由牧师小姐保护前者安全回到勇气之城为止。\r\n“…..不要走好吗，留在我身边，你帮了我太多，我想….尽可能回报这份恩情。”\r\n莉莉娅的声音很轻，听起来更像在恳求。\r\n薇莉丝知道她并非贪恋自己的力量与庇护，或许有一点点吧，但那绝非主要原因。\r\n王女小姐的眸子很亮，清澈见底，看不见贪婪与阴谋算计。\r\n就算是眷养了很久的小动物，互相也会产生感情，何况是活生生的人呢？\r\n但…….\r\n“…..抱歉，我不能答应你。”\r\n“为什么呢，薇莉丝厌烦我了吗？莉莉娅知道自己很没用，总是得依靠你，但我会努力……”\r\n“好了，不是你想的那样啦。”\r\n薇莉丝抬起头，绸缎般的墨色长发被平原上拂来的微风卷起，轻笑着。\r\n“我不属于这个地方，不属于这里的任何地方，所以我应该会一直旅行，随性地去任何想去的所在…….或许很久以后会找个定居之所吧，但肯定不是现在。”\r\n“这样啊……”\r\n王女小姐沉默了。\r\n半晌，她从戒指里取出某个东西，交到薇莉丝手中。\r\n“这个收好，虽然以薇莉丝的力量，应该没什么能给你造成麻烦，但有些时候，应该还是能发挥点作用的。”\r\n那是一枚小巧的徽章，上面雕刻着精致的飞鸟图案，这是象征联合王国王室的印记——自由与不羁之鸟，其中央有六个小小的凹陷，唯独第五处镶嵌着昂贵的水蓝色宝石。\r\n“？”\r\n薇莉丝不解地歪了歪头。\r\n“我考虑了一下，之前那个契约对你似乎还是太吃亏了，这个，就当作额外报酬吧。”\r\n莉莉娅露出有些落寞的笑容，“我知道薇莉丝很厉害，寻常那些魔法装备可能对你不值一提，思来想去，也就这个还有点用了。这是我的身份象征，凡在联合王国境内出示此物，便相当于莉莉娅·梅凯兰德亲临，应该是能帮你解决一些麻烦的。”\r\n“另外。”\r\n蓝发的绝美少女突然侧过头，闪电般在身边的牧师小姐脸上轻啄一下，还不等对方有所反应，自己先羞红着脸缩了回去。\r\n“不要忘记我。”\r\n“啊……..”\r\n薇莉丝僵住了。\r\n虽然她能反应过来莉莉娅的动作，但这段时间相处下的信任，加上王女殿下并未散发出任何敌意，最终导致了牧师小姐还是被偷袭成功。\r\n要命…….\r\n算上前世，这还是第一次被非家人的女孩子主动亲吻吧，不过现在自己也不再是男生了，所以莉莉娅此举应该没什么太深入的含义才对。\r\n就是，稍微有点刺激。\r\n没有多余的推脱，她将莉莉娅的赠礼放入怀中，强忍着内心澎湃的情绪波动，略作平复，随后笑了笑。\r\n“那我就却之不恭了，就算到了勇气之城，我也不会还给你哦。”\r\n“这是当然的，既然送出去，我就没打算再………..唉？”\r\n说到一半，王女小姐突然抬起头，宝石般瑰丽的瞳孔里，填满了错愕与惊喜。\r\n“等等，你刚刚说什么？”\r\n牧师小姐勾了勾唇角，露出恶作剧得逞的奸诈。\r\n“我说，打算继续旅程，在联合王国好好逛一圈呀，当然，王都这么有趣的地方，旅者又怎么可能会错过呢？”\r\n“好哇，薇莉丝你故意的对吧！”\r\n“哈哈哈！因为王女小姐害羞沮丧的样子很可爱啊，忍不住就想逗弄逗弄呢，我家小徒弟还这么不成熟，本师父又怎么放心丢下不管呢？咱又不是那种无情无义的家伙。”\r\n王女殿下羞愤欲绝，联想到刚刚的举动，小脑袋更是直接冒起了白色蒸汽。\r\n“可恶！害我白伤心一场，去死去死去死！”\r\n粉拳雨点般捶打在薇莉丝微微起伏的胸口上，虽然并未用力，也突破不了她的防御力，但那种以前从未体验过的酥麻异样感，让牧师小姐也变得有些羞恼起来，光滑白皙的脸蛋浮起一抹艳丽晕色。\r\n“居然偷袭，看我的挠痒痒攻击！”\r\n“咿呀！”\r\n城墙上响起了少女们打闹的欢笑声。\r\n纵使是惊涛澎湃的浪潮中，偶尔也会留有片刻的暂息之地呢。\r\n第一卷：降临之地与王国的物语，完。\r\n下面是封面的全身图，也是女主薇莉丝的人设，有兴趣可以了解下～\r\n[img=828,1656]https://rss.sfacg.com/web/novel/images/UploadPic/202302/18/447b8783-a36d-4126-b750-088fd887b6fc.jpg[/img]\r\r\n",
        "tsukkomi": null,
        "chatLines": null,
        "authorTalk": null,
        "isContentEncrypted": false,
        "isBranch": false
    },
    "ntitle": "第五十八章：小栖与王女的报恩",
    "isRubbish": false,
    "auditStatus": -1
}
*/
interface ContentExpand {
  needFireMoney: number;
  originNeedFireMoney: number;
  content: string;
  tsukkomi: null;
  chatLines: null;
  authorTalk: null;
  isContentEncrypted: boolean;
  isBranch: boolean;
}
export interface Content {
  chapId: number;
  novelId: number;
  volumeId: number;
  charCount: number;
  rowNum: number;
  chapOrder: number;
  title: string;
  addTime: string;
  updateTime: string;
  sno: number;
  isVip: boolean;
  expand: ContentExpand;
  ntitle: string;
  isRubbish: boolean;
  auditStatus: number;
}

/*
{
    "novels": [
        {
            "authorId": 40919,
            "lastUpdateTime": "2023-07-16T23:24:50",
            "markCount": 151971,
            "novelCover": "https://rss.sfacg.com/web/novel/images/NovelCover/Big/2023/07/2818c630-22cd-47da-afb6-b4af63394b06.jpg",
            "bgBanner": "https://rss.sfacg.com/web/novel/images/images/beitouNew/cut/292551.jpg?AACBD33E98CF2280879B5662BD552B2D",
            "novelId": 292551,
            "novelName": "在充满怪谈的世界里成为魔女",
            "point": 9.2,
            "isFinish": false,
            "authorName": "吃土的书语",
            "charCount": 4852981,
            "viewTimes": 51389295,
            "typeId": 21,
            "allowDown": true,
            "addTime": "2020-02-27T21:21:40",
            "isSensitive": false,
            "signStatus": "VIP",
            "categoryId": 0,
            "weight": 51389295,
            "Highlight": [
                "怪谈",
                "怪谈！？\n……\nDay101：已经没有什么好怕的了！\n穿上了魔女的长裙，我已经成为了怪谈"
            ]
        },
        {
            "authorId": 43682,
            "lastUpdateTime": "2021-10-17T00:01:50",
            "markCount": 49545,
            "novelCover": "https://rss.sfacg.com/web/novel/images/NovelCover/Big/2020/06/a0691a1a-1642-40b4-81a4-81369dc8afe5.jpg",
            "bgBanner": "https://rss.sfacg.com/web/novel/images/images/beitouNew/cut/268459.jpg?CCF480561E7CD73028BB65E8EF017B68",
            "novelId": 268459,
            "novelName": "怪谈校花找上门",
            "point": 8.3,
            "isFinish": false,
            "authorName": "万物偏差",
            "charCount": 3622932,
            "viewTimes": 15952301,
            "typeId": 21,
            "allowDown": true,
            "addTime": "2019-12-22T14:48:14",
            "isSensitive": false,
            "signStatus": "VIP",
            "categoryId": 0,
            "weight": 15952301,
            "Highlight": [
                "怪谈"
            ]
        },
        {
            "authorId": 211632,
            "lastUpdateTime": "2022-11-30T18:36:25",
            "markCount": 2914,
            "novelCover": "https://rss.sfacg.com/web/novel/images/NovelCover/Big/2020/04/afbbaf39-0125-452a-bfbb-81bfc8f148a2.jpg",
            "bgBanner": "",
            "novelId": 317085,
            "novelName": "身为校花的我才不要变怪谈女嫁",
            "point": 6,
            "isFinish": false,
            "authorName": "失恋阵线联盟",
            "charCount": 251978,
            "viewTimes": 212076,
            "typeId": 25,
            "allowDown": false,
            "addTime": "2020-04-14T11:13:04",
            "isSensitive": false,
            "signStatus": "签约",
            "categoryId": 0,
            "weight": 212076,
            "Highlight": [
                "怪谈"
            ]
        }
    ],
    "comics": [],
    "albums": []
}
*/

export interface Search {
  novels: searchNovel[];
  comics: any[];
  albums: any[];
}

export interface searchNovel {
  authorId: number;
  lastUpdateTime: string;
  markCount: number;
  novelCover: string;
  bgBanner: string;
  novelId: number;
  novelName: string;
  point: number;
  isFinish: boolean;
  authorName: string;
  charCount: number;
  viewTimes: number;
  typeId: number;
  allowDown: boolean;
  addTime: string;
  isSensitive: boolean;
  signStatus: SignStatus;
  categoryId: number;
  weight: number;
  Highlight: string[];
}

/*
{
  "accountId": 28xxxxxx,
  "pocketId": 12xxxxxxx,
  "name": "我的书架",
  "typeId": 2,
  "createTime": "202x-xx-xxTxx:xx:xx",
  "isFull": false,
  "canModify": true,
  "expand": {
    .....
  }
}
*/
export interface Bookshelf {
  accountId: number;
  pocketId: number;
  name: string;
  typeId: number;
  createTime: string;
  isFull: boolean;
  canModify: boolean;
  expand: BookshelfExpand;
}

interface BookshelfExpand {
  albums?: BookshelAlbum[];
  comics?: BookshelfComic[];
  novels?: BookshelfNovel[];
}

/*
{
    "albumId": 113,
    "novelId": 400179,
    "authorId": 1,
    "latestChapterId": 70831,
    "visitTimes": 982108,
    "name": "反派再生后不想跟美少女纠缠",
    "lastUpdateTime": "2023-07-18T17:01:00",
    "coverBig": "https://rss.sfacg.com/web/audio/images/albumCover/2022/06/96c5fe5b-70e5-4ede-ac63-9500bb3ead00.jpg",
    "coverSmall": "https://rss.sfacg.com/web/audio/images/albumCover/2022/06/99ecb73a-a9d1-412e-b2ea-16b7bc587da4.png",
    "coverMedium": "https://rss.sfacg.com/web/audio/images/albumCover/2022/06/a2ee0356-5844-481a-9448-10044950ac71.png",
    "expand": {},
    "isSticky": false,
    "stickyDateTime": null,
    "markDateTime": "202x-xx-xxTxx:xx:xx"
}
*/
interface BookshelAlbum {
  albumId: number;
  novelId: number;
  authorId: number;
  latestChapterId: number;
  visitTimes: number;
  name: string;
  lastUpdateTime: string;
  coverBig: string;
  coverSmall: string;
  coverMedium: string;
  expand: Record<string, never>;
  isSticky: boolean;
  stickyDateTime: null;
  markDateTime: string;
}

/*
{
    "comicId": 3133,
    "comicName": "在充满怪谈的世界里成为魔女",
    "folderName": "ZCMGT",
    "typeId": 1,
    "viewTimes": 53417202,
    "point": 9,
    "isFinished": false,
    "comicCover": "https://rss.sfacg.com/web/comic/images/Logo/202210/4e50bd5c-312e-4779-b585-b2968bda94eb.jpg",
    "bgBanner": "https://rss.sfacg.com/web/comic/images/Logo/202210/8dd98d8e-df47-4a90-80a4-b63a45930933.jpg",
    "latestChapterTitle": "50 花城的守护者",
    "lastUpdateTime": "2023-07-14T21:01:01",
    "authorId": 2096,
    "signStatus": "VIP",
    "expand": {},
    "isSticky": false,
    "stickyDateTime": null,
    "markDateTime": "202x-xx-xxTxx:xx:xx"
}
*/
interface BookshelfComic {
  comicId: number;
  comicName: string;
  folderName: string;
  typeId: number;
  viewTimes: number;
  point: number;
  isFinished: boolean;
  comicCover: string;
  bgBanner: string;
  latestChapterTitle: string;
  lastUpdateTime: string;
  authorId: number;
  signStatus: SignStatus;
  expand: Record<string, never>;
  isSticky: boolean;
  stickyDateTime: null;
  markDateTime: string;
}

/*
{
    "authorId": 49014,
    "lastUpdateTime": "2023-07-19T00:21:03",
    "markCount": 45723,
    "novelCover": "https://rss.sfacg.com/web/novel/images/NovelCover/Big/2021/10/6fd0e4aa-f6e3-4c31-b669-954a606981f7.jpg",
    "bgBanner": "https://rss.sfacg.com/web/novel/images/images/beitouNew/cut/400412.jpg?EF823451E76CC792F1F5FBD096F0DC45",
    "novelId": 400412,
    "novelName": "今天的魔女小姐也在努力活着",
    "point": 8.7,
    "isFinish": false,
    "authorName": "总裁下放",
    "charCount": 5625441,
    "viewTimes": 14867811,
    "typeId": 21,
    "allowDown": false,
    "signStatus": "VIP",
    "categoryId": 0,
    "isSensitive": false,
    "expand": {},
    "isSticky": false,
    "stickyDateTime": null,
    "markDateTime": "202x-xx-xxTxx:xx:xx"
}
*/
interface BookshelfNovel {
  authorId: number;
  lastUpdateTime: string;
  markCount: number;
  novelCover: string;
  bgBanner: string;
  novelId: number;
  novelName: string;
  point: number;
  isFinish: boolean;
  authorName: string;
  charCount: number;
  viewTimes: number;
  typeId: number;
  allowDown: boolean;
  signStatus: SignStatus;
  categoryId: number;
  isSensitive: boolean;
  expand: Record<string, never>;
  isSticky: boolean;
  stickyDateTime: null;
  markDateTime: string;
}

/*
[
  {
    "typeId": 21,
    "typeName": "魔幻",
    "expand": null
  },
  {
    "typeId": 22,
    "typeName": "玄幻",
    "expand": null
  },
  {
    "typeId": 23,
    "typeName": "古风",
    "expand": null
  },
  {
    "typeId": 24,
    "typeName": "科幻",
    "expand": null
  },
  {
    "typeId": 25,
    "typeName": "校园",
    "expand": null
  },
  {
    "typeId": 26,
    "typeName": "都市",
    "expand": null
  },
  {
    "typeId": 27,
    "typeName": "游戏",
    "expand": null
  },
  {
    "typeId": 29,
    "typeName": "悬疑",
    "expand": null
  }
]
*/
export interface NovelType {
  typeId: number;
  typeName: string;
  expand: null;
}

/* 
{
  "sysTagId": 73,
  "refferTimes": 24514,
  "tagName": "末世",
  "imageUrl": "https://rssyn.sfacg.com/web/systag/images/202104/09/58f40c97-36a4-4dc9-a880-4ac5a89869cb.jpg",
  "novelCount": 24514,
  "isDefault": false
}
{
  "sysTagId": 16,
  "refferTimes": 19943,
  "tagName": "西幻",
  "imageUrl": "https://rssyn.sfacg.com/web/systag/images/202104/09/ce91e627-864e-443f-9b1a-34a8952e80d7.jpg",
  "novelCount": 19943,
  "isDefault": false
}
{
  "sysTagId": 145,
  "refferTimes": 18523,
  "tagName": "嫁人",
  "imageUrl": "https://rssyn.sfacg.com/web/systag/images/202104/09/730b0775-af8c-4599-ab54-f3c0224f1bc8.jpg",
  "novelCount": 18523,
  "isDefault": false
}

全部 Tag 详见 tags.json

此外，一些 Tag 似乎已经被移除了，但实际上仍然可以被使用
例如：
id: 74
name: "百合"
*/
export interface TagItem {
  sysTagId: number;
  refferTimes: number;
  tagName: string;
  imageUrl: string;
  novelCount: number;
  isDefault: boolean;
}

export interface Novels {
  novelId: number;
}
