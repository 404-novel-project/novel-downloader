# 小说下载器

一个**可扩展的**通用型小说下载器。

## 关于 404 小说文库项目

在这个 404 时代，由于种种原因，起点、晋江、刺猬猫、SF 等小说网站上的小说经常毫无征兆的消失。即使该小说已经入 V，即使你已经订阅了该小说。

这样的例子数不胜数。随便打开笔趣阁等转载网站，首发于起点，但现在起点上找不到该小说的情形比比皆是。像轻文轻小说这种整个网站都上天了的情况也不是没有。

如果小说消失时被笔趣阁等转载网站转载了，后来的读者尚且能一睹其风采，但如果小说发布的网站不是起点，小说也不够热，根本就没有转载网站转载，那后来者想一睹该小说的风采，就相当困难了。

404 小说文库项目的目的是：保存这些质量上乘，但不够热门，没有被其他网站转载，彻底从互联网上消失的作品。

本脚本为 404 小说文库项目的组成部分之一，对于无登录墙的小说网站，**如您同意**，本脚本将会尝试将当前书籍详情页及目录页（如果存在）存档至互联网档案馆（[archive.org](https://archive.org/)），以备日后（被删除后）查看。

存档过程中将会搜集并上报您如下信息：IP 地址、User-Agent、Referer、当前书籍详情页 URL、当前书籍目录页 URL（如果存在）、当前小说下载器脚本版本、当前脚本管理器版本。除上述信息外，不会搜集您任何其他信息。

# 安装

本软件为油猴脚本，需先在浏览器安装脚本管理器（Greasemonkey、Violentmonkey、Tampermonkey），再安装本脚本。具体可参见：[如何安装用户脚本](https://greasyfork.org/zh-CN/help/installing-user-scripts)。

本脚本地址：

- [github 版](https://github.com/404-novel-project/novel-downloader/raw/gh-pages/bundle.user.js)：启用代码压缩，更新最快。
- [greasyfork 版](https://greasyfork.org/scripts/406070-%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8/code/%E5%B0%8F%E8%AF%B4%E4%B8%8B%E8%BD%BD%E5%99%A8.user.js)：无代码压缩，更新可能有延迟。

## 使用方法

**本脚本执行下载任务时将播放无声音频，以保证脚本后台运行时不被休眠。**

如果本脚本支持该小说网站，当打开小说目录页时，网页右上角会出现下载图标，点击该图标即可开始下载。

如果你要下载的小说章节较多，等待时间可能较长，此时请耐心等待。

你通过右下角进度条了解当前下载进度，或者按下 F12，打开网页控制台查看当前下载状态。

下载完成后，本脚本将会自动下载一个 TXT 文档及 EPUB 文件。

TXT 文档请使用记事本或其它阅读软件进行阅读。

EPUB 文件请使用相应阅读器阅读。

## 常见问题

**特别提醒：请至[本项目支持页面](https://github.com/404-novel-project/novel-downloader/issues)提交 issue， 发布于 greasyfork 评论区、交流群组等地方的反馈不会被处理。**

- Q：我在使用脚本时出现了 / 发现了问题。

  A：请在项目支持页面提交 issue 并按模板要求检查和填写所有信息。

  为生成详尽的日志，你需要在设置中启用调试模式。
  
  调试日志为下载生成的 zip 文件中的 `debug.log` 文件。如下载卡住，没有生成任何文件，你可以在设置中启用测试视图，而后复制日志选项卡中的所有内容并保存到txt文档后上传。

  如果我们未能复现你的问题，以及日志中没有相关问题的报错，可能需要你提供进一步的信息（某些问题可能和账号或网络环境有关）。

- Q：希望支持某某网站。/希望增加某个功能。

  A：请在项目支持页面提交 issue 并按模板要求检查和填写所有信息。我们将视情况，酌情添加。

  需要注意的是，并不是所有的网站支持和新功能请求都会被满足，或者被立即满足。我们更欢迎贡献代码。

- Q: 我在issue区中找到了和我反馈相重复的内容，我是否还要继续反馈。

  A：如果你反馈的是新网站或新功能请求，请直接在该issue下进行补充，重复的issue将被直接关闭。如果该issue已被关闭且未被实现，请不要再重复提交。

  对于bug，这些bug可能是曾经修复后又新出现的，可以根据具体情况决定是否开新issue。但你应当首先参考issue中的回复，一些bug可能无法在脚本中修复，但有其他解决方案，如ESJ EPUB下载问题（https://github.com/404-novel-project/novel-downloader/issues/690 ）。

- Q：请问有交流群组吗？

  A：有的。Matrix 空间：[#404-novel-project:bgme.me](https://matrix.to/#/#404-novel-project:bgme.me)，Telegram 群组：https://t.me/+ZCngCQiJ_xo2NDI1 。

## 目前支持小说网站（部分）

**特别提醒：如欲下载支持列表中网站的付费章节，请登录相应网站帐户，并确定已购买相应付费章节。未登录网站帐户，或未购买的付费章节，下载时将直接忽略，无法进行下载。**

| 站点                                                | 公共章节 | 付费章节 | 备注                                                                                                                                                                                                                                                                         |
| --------------------------------------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SF 轻小说](https://book.sfacg.com/)                | ✅\*     | ✅\*\*   | \*不支持对话小说，例：[224282](https://book.sfacg.com/Novel/224282/)。 \*\*VIP 章节仅支持图片版。                                                                                                                                                                            |
| [起点中文网](https://www.qidian.com/)               | ✅       | ✅       | 部分小说 VIP 章节可能出现乱码无法下载。脚本支持 book.qidian.com 页面下载，但VIP章节因跨域问题需要切换至 www.qidian.com 下载。                                                                                                                                                                                                                                      |
| [起点女生网](https://www.qdmm.com/)                 | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [晋江文学城](http://www.jjwxc.net/)                 | ✅       | ✅       | 晋江文学城章节下载可通过添加 API Token 以获得更好体验，Token 添加方法参见 [Token 填写一节](#token-填写)。                                                                                                                                                                       |
| [长佩文学](https://www.gongzicp.com/)               | ✅       | ✅       | 反爬较严，限制下载速度，每分钟约可下载 6 章，请耐心等待，最好不要多开页面同时下载多本长佩小说。<br>长佩文学为单页应用，如打开书籍详情页右上角未出现下载图标，请按下 F5 重新加载当前页面。                                                                                    |
| [书耽](https://www.shubl.com/)                      | ✅       | ✅       | VIP 章节仅支持图片版。                                                                                                                                                                                                                                                       |
| [海棠文化线上文学城](https://ebook.longmabook.com/) | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [次元姬](https://www.ciyuanji.com/)                 | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [米国度](https://www.myrics.com/)                   | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [寒武纪年原创网](https://www.hanwujinian.com/)      | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [息壤中文网](https://www.xrzww.com/)                | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [有毒小说网](https://www.youdubook.com/)           | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [独阅读](https://www.duread.cn/)                  | ✅       | ✅       |                                                                                                                                                                                                                                                                              |
| [轻之文库轻小说](https://www.linovel.net/)          | ✅       | ❌       | VIP 章节仅支持 APP 查看                                                                                                                                                                                                                                                      |
| [纵横中文网](http://www.zongheng.com/)              | ✅       | ❌       |                                                                                                                                                                                                                                                                              |
| [花语女生网](http://huayu.zongheng.com/)            | ✅       | ❌       |                                                                                                                                                                                                                                                                              |
| [17K 小说网](https://www.17k.com/)                  | ✅       | ❌       |                                                                                                                                                                                                                                                                              |
| [书海小说网](http://www.shuhai.com/)                | ✅       | ❌       |                                                                                                                                                                                                                                                                              |
| [塔读文学](https://www.tadu.com/)                   | ✅       | ❌       |                                                                                                                                                                                                                                                                              |
| [七猫中文网](https://www.qimao.com/)                | ✅       | ❌       | 请先进入作品目录再运行脚本。 |
| [废文网](https://sosad.fun/)                        | ✅       | ❎       | 部分小说或章节需登录后查看。                                                                                                                                                                                                                                                 |
| [pixiv](https://www.pixiv.net/novel/)               | ✅       | ❎       | 单页应用，如打开书籍详情页右上角未出现下载图标，请按下 F5 重新加载当前页面。                                                                                                                                                                                                 |
| [Lofter](https://www.lofter.com/)                   | ✅       | ❎       | 因本脚本会将博文中的图片也一同下载下来，对于图片特别多的博客，下载时请注意内存用量（800MB 限制），根据实际情况使用筛选函数分次下载。<br>部分博文内含视频内容，为节省内存使用，加快下载速度，本脚本将跳过视频内容。<br>如您使用广告屏蔽器，可能会影响本脚本在 Lofter 的工作。 |
| [努努书坊](https://www.kanunu8.com/)                | ✅       | ❎       | 格式众多，如发现不支持页面敬请反馈。                                                                                                                                                                                                                                         |
| [真白萌](https://masiro.me/)                        | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [天涯书库](https://www.tianyabooks.com/)            | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [爱青果](https://www.iqingguo.com/)                 | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [カクヨム](https://kakuyomu.jp/)                    | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [小説家になろう](https://syosetu.com/)              | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [ハーメルン](https://syosetu.org/)                  | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [暁](https://www.akatsuki-novels.com/)              | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [ファンタジー小説](https://www.alphapolis.co.jp/)   | ✅       | ❌       |                                                                                                                                                                                                                                                                              |
| [Novel Up Plus](https://novelup.plus/)              | ✅       | ❎       |                                                                                                                                                                                                                                                                              |
| [ESJ](https://www.esjzone.cc/)              | ✅       | ❎       |  当前下载EPUB文件可能会遇到问题。<br> 解决办法： <br> 按F12 弹出开发工具-> 转到网络页（Network）->按ctrl+R重新加载->找到core.js（链接为https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js ）->右键选择点击“屏蔽请求网址”->重新刷新网页即可正常下载。  |
<details>
<summary>点击查看全部支持网站</summary>

| 站点                                              | 公共章节 | 付费章节 | 备注                                                                                     |
| ------------------------------------------------- | -------- | -------- | ---------------------------------------------------------------------------------------- |
| [番茄小说](https://fanqienovel.com/) | ✅       | ✅   |部分章节需要SVIP账号登录下载，否则会调用第三方API请求。
| [禁忌书屋](https://www.cool18.com/bbs4/index.php) | ✅       | ❎       |                                                                                          |
| [UU 看书网](https://www.uukanshu.com/)            | ✅       | ❎       |                                                                                          |
| [亿软网](http://www.yiruan.la/)                   | ✅       | ❎       | 网站性能差，降低抓取频率，请耐心等待。                                                   |
| [书趣阁](http://www.ishuquge.org/)                | ✅       | ❎       | 网站性能差，降低抓取频率，请耐心等待。                                                   |
| [星空中文](http://www.xkzw.org/)                  | ✅       | ❎       |                                                                                          |
| [乐文小说网](https://www.lewenn.net/)             | ✅       | ❎       |                                                                                          |
| [266 看书](http://www.266ks.com/)                 | ✅       | ❎       |                                                                                          |
| [和图书](https://www.hetushu.com/index.php)       | ✅       | ❎       |                                                                                          |
| [阁笔趣](http://www.gashuw.com/)                  | ✅       | ❎       |                                                                                          |
| [书书网](https://www.1pwx.com/)                   | ✅       | ❎       |                                                                                          |
| [八一中文网](https://www.81book.com/)             | ✅       | ❎       | 抓取速度慢，请耐心等待。                                                                 |
| [完本神站](https://www.wanben.info/)              | ✅       | ❎       |                                                                                          |
| [得间小说](https://www.idejian.com/)              | ✅       | ❎       |                                                                                          |
| [轻小说文库](https://www.wenku8.net/)             | ✅       | ❎       |                                                                                          |
| [西方奇幻小说网](https://www.westnovel.com/)      | ✅       | ❎       |                                                                                          |
| [棉花糖小说网](https://www.mht99.com/)            | ✅       | ❎       |                                                                                          |
| [笔趣阁](https://www.xbiquge.tw/)                 | ✅       | ❎       |                                                                                          |
| [红叶书斋](https://www.007zw.com/)                | ✅       | ❎       |                                                                                          |
| [哩哔轻小说](https://www.linovelib.com/)          | ✅       | ❎       |    因需要基于邻近章节修复隐藏链接的章节，生成目录时间变慢，大约2分钟。                                                                                      |
| [落秋中文](https://www.luoqiuzw.com/)             | ✅       | ❎       |                                                                                          |
| [一笔阁](https://www.yibige.cc/)                  | ✅       | ❎       |                                                                                          |
| [腐书网](https://www.fushuwang.org/)              | ✅       | ❎       |                                                                                          |
| [搜小说](https://www.soxscc.net/)                 | ✅       | ❎       |                                                                                          |
| [腐国度](https://www.fuguoduxs.com/)              | ✅       | ❎       |                                                                                          |
| [书包网](http://www.shubaowa.org/)                | ✅       | ❎       |                                                                                          |
| [恋上你看书](https://www.630shu.net/)             | ✅       | ❎       |                                                                                          |
| [同人小说网](https://www.trxs123.com/)            | ✅       | ❎       |                                                                                          |
| [同人圈](http://www.tongrenquan.org/)             | ✅       | ❎       |                                                                                          |
| [精品小说网](http://www.jpxs123.com/)             | ✅       | ❎       |                                                                                          |
| [256 文学](https://www.256wenku.com/)             | ✅       | ❎       |                                                                                          |
| [笔趣阁小说网](http://www.biquge66.com/)          | ✅       | ❎       |                                                                                          |
| [海棠小说网](http://m.haitangtxt.net/)            | ✅       | ❎       | 部分文字被图片替换，请使用 HTML 版查看。<br>如需替换清理图片，请自行生成图片文字对照表。 |
| [笔趣阁](https://www.biquzw.la/)                  | ✅       | ❎       |                                                                                          |
| [25 中文网](http://www.i25zw.com/)                 | ✅       | ❎       |                                                                                          |
| [天域小说网](https://www.tycqzw.com/)             | ✅       | ❎       |                                                                                          |
| [完本神站](https://www.wanbengo.com/)               | ✅       | ❎       |                                                                                          |
| [燃文小说](https://www.ranwen.la)                 | ✅       | ❎       |                                                                                          |
| [望书阁](https://www.wangshugu.org/)               | ✅       | ❎       |                                                                                          |
| [百合小说网](https://m.baihexs.com/)              | ✅       | ❎       |                                                                                          |
| [全书斋](https://www.quanshuzhai.com/)            | ✅       | ❎       |                                                                                          |
| [蔷薇后花园](https://houhuayuan.xyz/)             | ✅       | ❎       |                                                                                          |
| [黑沼泽俱乐部](https://houhuayuan.xyz/)           | ✅       | ❎       |                                                                                          |
| [神凑轻小说](http://www.shencou.com/)             | ✅       | ❎       |                                                                                          |
| [爱下书小说网](https://www.aixiaxs.net/)          | ✅       | ❎       |                                                                                          |
| [精彩小说网](https://jingcaiyuedu6.com/)          | ✅       | ❎       |                                                                                          |
| [爱下电子书](https://www.aixdzs.com/)             | ✅       | ❎       |                                                                                          |
| [笔趣阁](http://www.biquge5200.cc/)                   | ✅       | ❎       |                                                                                          |
| [言情小说](https://www.yqxsge.cc/)                | ✅       | ❎       |                                                                                          |
| [18 看书](https://www.18kanshu.com/)              | ✅       | ❎       |                                                                                          |
| [笔下文学 333](http://www.bixia3.com/)            | ✅       | ❎       |                                                                                          |
| [小说屋](http://www.xiaoshuowu.com/)              | ✅       | ❎       |                                                                                          |
| [缤纷幻想](https://colorful-fantasybooks.com/)    | ✅       | ❎       |                                                                                          |
| [弟子小说网](https://www.dizishu.cc/xiaoshuo/)   | ✅       | ❎       |                                                                                          |
| [新笔趣阁](https://www.ibiquge.la/)               | ✅       | ❎       |                                                                                          |
| [69 书吧](https://69shuba.cx/)                 | ✅       | ❎       |                                                                                          |
| [笔下文学](https://www.ywggzy.com/)               | ✅       | ❎       |                                                                                          |
| [飘天文学网](https://www.piaotia.com/)                | ✅       | ❎       |                                                                                          |
| [红袖招](https://hongxiuzhao.net/)                 | ✅       | ❎       |                                                                                          |
| [38 看书](https://www.mijiashe.com/)              | ✅       | ❎       |                                                                                          |
| [天天看小说](https://www.ttkan.co/)               | ✅       | ❎       |                                                                                          |
| [精华书阁](https://www.xbyuan.com/)               | ✅       | ❎       |                                                                                          |
| [全职小说网](http://www.quanzhifashi.com/)        | ✅       | ❎       | 网站反爬较严，大量抓取可能导致封禁ip。 |
| [笔趣阁](https://www.42zw.la/)                    | ✅       | ❎       |                                                                                          |
| [新笔趣阁](http://www.boqugew.com/)               | ✅       | ❎       |                                                                                          |
| [全本同人小说](https://www.qbtr.cc/)               | ✅       | ❎       |                                                                                          |
| [鬼大爷网](https://b.guidaye.com/)               | ✅       | ❎       |                                                                                          |
| [69阅读](https://www.69yuedu.net/)                 | ✅       | ❎       |                                                                                          |
| [西瓜书屋](https://www.xiguashuwu.com/)            | ✅       | ❎       | 部分文字会被图片替换，通过文件名映射、哈希映射、OCR识别三层解码。首次使用需下载PaddleOCR模型。 |

</details>

## 特殊权限说明

- `unsafeWindow`：用于获取自定义筛选函数、自定义保存参数等设置。
- `GM_info`/`GM.info`： 获取并输出脚本运行环境。
- `GM_xmlhttpRequest`/`GM.xmlHttpRequest`：用于跨域 HTTP 请求。
- `GM_setValue`/`GM.setValue`、`GM_getValue`/`GM.getValue`、`GM_deleteValue`/`GM.deleteValue`： 用于统计模块，本地统计运行次数。

## OCR 图像文字识别

一些网站（比如西瓜书屋）为了防止文本被抓取，会把文字替换成图片。这个脚本针对这种情况做了专门的处理，采用了一套三步解码方案：

1. **文件名映射**：首先尝试根据图片文件名直接匹配对应的文字，这是最快的方法。
2. **哈希映射**：如果文件名匹配不到，就下载图片并计算哈希值来匹配，速度也比较快。
> [!NOTE]
> 文件名和哈希映射的匹配表会自动从(https://github.com/oovz/novel-downloader-image-to-text-mapping)获取并保存在 Tampermonkey 的本地存储中。
3. **OCR识别**：前两种方法都失败时，才会使用OCR（光学字符识别）来识别图片中的文字，这是最准确但也最慢的方法。注意，OCR识别也不能保证100%准确率。
> [!NOTE]
> OCR功能使用的是PaddleOCR中文识别模型，模型文件会从GitHub自动下载并保存在Tampermonkey本地存储中。

## 字体匹配表

当前，晋江文学城和番茄小说下载可能需要你手动进行字体匹配操作。

如果你发现下载的小说文档有不正常的字符出现，可以打开设置-测试视图后点击日志或者按下F12启用开发者选项了解是否有提示字体匹配操作的信息，它们一般以“[jjwxc-font]”或者“[fanqie-font]”为开头。

你可以按照提示信息的内容，提交issue进行字体匹配的更新。请注意，相关信息不要提交到项目的issue中去，否则会被直接关闭。

Tips:对于晋江文学城一本小说中多个章节对应多个字体的情况，你可以复制日志中的所有内容，使用正则匹配（正则表达式：[a-zA-z]+://static.jjwxc.net/[^\s]*）来匹配所有的字体链接（可以使用在线匹配网站如：https://tool.oschina.net/regex# ）。

## Token 填写

当前部分网站（如晋江文学城）可能需要手动填写登录 token。app 平台一般为 Android 平台，其他平台一般不能使用（但也可以实践看看）。

### 抓包软件和教程

这里列举出一些常用的工具以供参考。

1. 抓包精灵（Android）

下载抓包精灵/NetCapture（可在 Google Play、酷安搜索到，其他软件也可以）并配置好设置。

可参考 @ll0yiya 的经验（https://github.com/404-novel-project/novel-downloader/issues/599#issuecomment-1866142314）。

2. HttpCanary（Android）

可参考 https://blog.csdn.net/weixin_53891182/article/details/124739048 等资料。

在编写脚本时，作者使用的版本：https://fin.lanzoub.com/iGYv20vym1dc。

3. eCapture（Android）

需要 Android 内核版本 5.4以上。

详细信息，建议参考 https://mp.weixin.qq.com/s/KWm5d0uuzOzReRtr9PmuWQ 等资料。

4. Charles(Windows / MacOS / Linux)

官网： https://www.charlesproxy.com/

需要电脑，可搭配 Android 模拟器。

可参考 https://blog.csdn.net/qq_41631913/article/details/135748992。


注：本节脚本代码中的值均为编撰，仅为示意。

### 晋江文学城

该网站现提供 2 个方法以获取 token 。

1. 脚本设置获取

- 在任意晋江小说页面加载完时打开设置，在“基本设置”选项卡中会看到“获取token”按钮(仅限第一次打开可见)，点击按钮并关闭设置，按页面提示输入账号和密码后点击登录，如收到验证码则填入验证码后再次点击登录，如操作无误则可以看到返回的 token 值。

- 该方法可能需要禁用主设备验证功能。如获取失败可根据提示重试、先在晋江 app 里重新登录后再试。如一直不能获取，则参考方法 2 。
***
2. 自行抓取。
   
- 要抓取的数据：
  - token: 登录晋江文学城 Android app 并随意浏览章节，在形如“https://app.jjwxc.org/androidapi/chapterContent?” 等链接中找到 &token= 后的字符串（止于下一个&）
  - （暂不需要，请忽略）user_key 方法同上，数据为 &user_key= 后的字符串（止于下一个&）

注：user_key对于部分账号可能是必须的，但目前脚本暂不需要该值，可不用抓取。如果你采用方法2，可以将两个一起抓取，未来可能有用。 

***

成功抓取 token 后，在脚本管理器中新建如下脚本（不要把该脚本代码和其他脚本代码合并，除非你完全理解脚本的意思）并保存：

```javascript
// ==UserScript==
// @name         auto inject tokenOptions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto inject tokenOptions
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const tokenOptions = {
    Jjwxc: "11111111_750afc84c839aaaaafccd841fffd11f1", //填入token，形如客户号+下划线'_'+字母与数字混合的字符串
  };
  window.tokenOptions = tokenOptions;
})();
```

如果你采用方法2，成功抓取 token 和 user_key 后，在脚本管理器中新建如下脚本（不要把该脚本代码和其他脚本代码合并，除非你完全理解脚本的意思）并保存：

```javascript
// ==UserScript==
// @name         auto inject tokenOptions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto inject tokenOptions
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const tokenOptions = {
    Jjwxc: {
      token:"11111111_750afc84c839aaaaafccd841fffd11f1", //填入token，形如客户号+下划线'_'+字母与数字混合的字符串
      user_key:"11ffffff-11ff-11ff-11ff-111111111fff",//填入user_key
    }
  };
  window.tokenOptions = tokenOptions;
})();
```
> [!CAUTION] 
> 在设置中启用调试模式以后，日志可能会输出一些包含 token 的链接，这个设计的初衷是为了更快定位发生的问题。
> 
> 请不要直接将该日志上传到互联网上，当且仅当从事维护的开发者需要此日志定位问题时再提供（可以通过重新登录之前抓取 token 设备上的晋江 app 以使原 token 失效）。

### 息壤中文网 

该网站的 Android app 启动时会检测 root 和 VPN 代理， 因此可能需要一些额外的操作以越过；此外 header 数据的获取需要安装CA证书，建议具有一定相关知识的人士进行操作。

需要抓取的数据：登录息壤中文网 Android app 并随意浏览章节，在形如“https://android-api.xrzww.com/api/readWithEncrypt”的网址中转到 Request header（即请求头）页，header 中的 deviceIdentify 和 Authorization 即为需要抓取的数据（注意不要弄成 Response header（响应头））。

在脚本管理器中新建如下脚本（不要把该脚本代码和其他脚本代码合并，除非你完全理解脚本的意思）并保存：

```javascript
// ==UserScript==
// @name         auto inject tokenOptions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto inject tokenOptions
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const tokenOptions = {
    Xrzww: {
            deviceIdentify: "webh517657567560", //填入 header中的deviceIdentify值
            Authorization:  "Bearer 453453453e03ee546456546754756756", //填入 header中的Authorization值
        },
  };
  window.tokenOptions = tokenOptions;
})();
```
## 高阶使用技巧

### 启用调试功能

设置菜单中按击开启。

### 自定义下载设置

在设置面板中，选中“启用自定义下载设置”以使自定义下载参数生效。

以下是自定义下载参数的介绍：

- 并行下载线程数：可以理解为同时下载的章节数量。数值需设置为 > 0 的整数。非法数值可能会导致下载出错。
- 下载间隔：仅当“并行下载线程数” = 1时 生效。为每下载一章节后增加的下载间隔时间，单位为毫秒（1 秒= 1000 毫秒）。数值需设置为 > 0 的整数。
- 最大下载间隔：仅当“并行下载线程数” = 1 时生效。为下载两章节之间最大的间隔时间，单位为毫秒（1 秒= 1000 毫秒）。数值需设置为 > 0 的整数。

该设置将应用于所有网站，一般不需要修改此设置，我们已经为每个网站设置好了比较合适的数值。但当网站添加反爬检测时，你可以使用本设置进行调整，我们也欢迎将新的数值提交到issue中。

### 自定义筛选函数

如欲只下载部分章节，请在点击运行按钮前，按下 F12 打开开发者工具，在 `window` 下创建 `chapterFilter` 函数，具体格式如下：

```typescript
declare enum Status {
  pending = 0,
  downloading = 1,
  failed = 2,
  finished = 3,
  aborted = 4,
  saved = 5,
}
interface ChapterAdditionalMetadate {
  lastModified?: number;
}
declare class Chapter {
  bookUrl: string;
  bookname: string;
  chapterUrl: string;
  chapterNumber: number;
  chapterName: string | null;
  isVIP: boolean;
  isPaid: boolean | null;
  sectionName: string | null;
  sectionNumber: number | null;
  sectionChapterNumber: number | null;
  chapterParse: BaseRuleClass["chapterParse"];
  charset: string;
  options: object;
  status: Status;
  retryTime: number;
  contentRaw: HTMLElement | null;
  contentText: string | null;
  contentHTML: HTMLElement | null;
  contentImages: attachmentClass[] | null;
  additionalMetadate: ChapterAdditionalMetadate | null;
  chapterHtmlFileName: string | number;
  constructor(
    bookUrl: string,
    bookname: string,
    chapterUrl: string,
    chapterNumber: number,
    chapterName: string | null,
    isVIP: boolean,
    isPaid: boolean | null,
    sectionName: string | null,
    sectionNumber: number | null,
    sectionChapterNumber: number | null,
    chapterParse: BaseRuleClass["chapterParse"],
    charset: string,
    options: object
  );
  init(): Promise<this>;
  private parse;
}
declare class attachmentClass {
  url: string;
  name: string;
  mode: "naive" | "TM";
  headers?: {
    [index: string]: string;
  };
  private defaultHeader;
  status: Status;
  retryTime: number;
  imageBlob: Blob | null | void;
  constructor(imageUrl: string, name: string, mode: "naive" | "TM");
  init(): Promise<Blob | null>;
  private downloadImage;
  private tmDownloadImage;
}

interface chapterFilter {
  (chapter: Chapter): boolean;
}
```

**自定义筛选函数示例：**

只下载该本小说前 100 章内容：

```javascript
function chapterFilter(chapter) {
  return chapter.chapterNumber <= 100;
}
```

只下载第一卷内容：

```javascript
function chapterFilter(chapter) {
  return chapter.sectionNumber === 1;
}
```

只下载章节名称中含有“武器”的章节：

```javascript
function chapterFilter(chapter) {
  return chapter.chapterName.includes("武器");
}
```

### 自定义保存参数

自定义保存参数允许您修改保存文件的样式，章节标题等内容。

使用方法大致同自定义筛选函数，即在 `window` 下创建 `saveOptions` 对象，具体格式如下：

```typescript

interface SaveOptions {
  mainStyleText?: string;
  tocStyleText?: string;
  getchapterName?: Options["getchapterName"];
  //函数定义为：getchapterName(chapter: Chapter): string;
  genSectionText?: Options["genSectionText"];
  //函数定义为：genSectionText(sectionName: string): string;
  genChapterText?: Options["genChapterText"];
  //函数定义为：genChapterText(chapterName: string, contentText: string): string;
  genChapterEpub?: Options["genChapterEpub"];
  //函数定义为：genChapterEpub(contentXHTML: string):string;
  chapterSort?: Options["chapterSort"];
  //函数定义为：chapterSort(a: Chapter, b: Chapter): 0 | 1 | -1;
}
```

**自定义保存参数示例：**

将章节名称格式修改为 `第xx章 xxxx` ：

```javascript
const saveOptions = {
  getchapterName: (chapter) => {
    if (chapter.chapterName) {
      return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
    } else {
      return `第${chapter.chapterNumber.toString()}章`;
    }
  },
};
window.saveOptions = saveOptions;
```

更改 ZIP 文档中章节 HTML 文件样式：

```javascript
const saveOptions = {
  mainStyleText: `p {
  text-indent: 4em;
  display: block;
  line-height: 1.3em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}`,
};
window.saveOptions = saveOptions;
```

txt 文档每个自然段前加两个空格

```javascript
const saveOptions = {
  genChapterText: (chapterName, contentText) => {
    contentText = contentText
      .split("\n")
      .map((line) => {
        if (line.trim() === "") {
          return line;
        } else {
          return line.replace(/^/, "    ");
        }
      })
      .join("\n");
    return `## ${chapterName}\n\n${contentText}\n\n`;
  },
};
window.saveOptions = saveOptions;
```
epub 文档删除章节空行

```javascript
const saveOptions = {
  genChapterEpub: (contentXHTML) => {
    return contentXHTML.replaceAll("<p><br /></p>", "")
      .replaceAll("<p><br/></p>", "");
  },
};
window.saveOptions = saveOptions;
```
保存章节时倒序排列

```javascript
const saveOptions = {
  chapterSort: (a, b) => {
    if (a.chapterNumber > b.chapterNumber) {
      return -1;
    }
    if (a.chapterNumber === b.chapterNumber) {
      return 0;
    }
    if (a.chapterNumber < b.chapterNumber) {
      return 1;
    }
    return 0;
  },
};
window.saveOptions = saveOptions;
```

**使用用户脚本自动注入自定义保存参数：**

如您总是想使用某一自定义保存参数，你可以使用如下用户脚本（根据实际需要修改相应数值），自动向页面注入自定义保存参数。

```javascript
// ==UserScript==
// @name         auto inject saveOptions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto inject saveOptions
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const saveOptions = {
    getchapterName: (chapter) => {
      if (chapter.chapterName) {
        return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
      } else {
        return `第${chapter.chapterNumber.toString()}章`;
      }
    },
  };
  window.saveOptions = saveOptions;
})();
```

自定义筛选函数同理也可使用用户脚本自动注入。

### 自定义完成回调函数

```typescript
interface customFinishCallback {
  (): void;
}
```

自定义完成回调函数将在下载完成并生成 ZIP 文件后自动执行。

使用自定义完成回调函数可在下载完成后自动完成某些工作，例如：关闭当前窗口。

```javascript
function customFinishCallback(book: Book) {
  window.close();
}
window.customFinishCallback = customFinishCallback;
```
## 附录 完整的自定义脚本
```javascript
// ==UserScript==
// @name         Noveldownloader Settings
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Noveldownloader Settings
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // token 设置开始
  const tokenOptions = {
    Jjwxc: {
      token:"11111111_750afc84c839aaaaafccd841fffd11f1", //填入token，形如客户号+下划线'_'+字母与数字混合的字符串
      user_key:"11ffffff-11ff-11ff-11ff-111111111fff",//填入user_key
    },
    Xrzww: {
            deviceIdentify: "webh517657567560", //填入 header中的deviceIdentify值
            Authorization:  "Bearer 453453453e03ee546456546754756756", //填入 header中的Authorization值
        },
  };
  
  //token 设置结束

  // 章节过滤筛选开始
  function chapterFilter(chapter) {
    return chapter.chapterNumber <= 100;
  }
  //章节过滤筛选结束

  //保存设置开始
  const saveOptions = {
    getchapterName: (chapter) => {
      if (chapter.chapterName) {
        return `第${chapter.chapterNumber.toString()}章 ${chapter.chapterName}`;
      } else {
        return `第${chapter.chapterNumber.toString()}章`;
      } // 按 第i章 XXX 命名章节名字
    },
    genChapterEpub: (contentXHTML) => {
      return contentXHTML.replaceAll("<p><br /></p>", "")
        .replaceAll("<p><br/></p>", "");
    },
  };
  //保存设置结束

  if(saveOptions)
    window.saveOptions = saveOptions;
  if(tokenOptions)
  window.tokenOptions = tokenOptions;
  if(chapterFilter)
    window.chapterFilter = chapterFilter;
})();

```
## 开发

1. `git clone https://github.com/yingziwu/novel-downloader.git` 将项目克隆至本地（访问 github 可能需要使用代理）。
1. `yarn install` 安装依赖。
1. 继承 `BaseRuleClass` 类，实现 `bookParse`、`chapterParse` 抽象方法，在 `router/download.ts` 文件中添加相应选择规则，在 `header.json` 文件 `match`
   字段添加相应的匹配规则。
1. `yarn run build` 编译生成最终脚本文件 `dist/bundle.user.js`。

## License

AGPL-3.0

## 致谢

感谢 [JetBrains](https://www.jetbrains.com/community/opensource/) 向本项目提供 WebStorm IDE。
