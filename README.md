# 小说下载器

一个**可扩展的**通用型小说下载器。
## 使用方法

**特别提醒：本脚本与[Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)脚本管理器不兼容。本脚本执行下载任务时将播放无声音频，以保证脚本后台运行时不被休眠。**

![demo](assets/demo.png)

如果本脚本支持该小说网站，当打开小说目录页时，网页右上角会出现下载图标，点击该图标即可开始下载。

如果你要下载的小说章节较多，等待时间可能较长，此时请耐心等待。

你通过右下角进度条了解当前下载进度，或者按下 F12，打开网页控制台查看当前下载状态。

下载完成后，本脚本将会自动下载一个TXT文档及由HTML文件及图片组成的ZIP压缩包。

TXT文档请使用记事本或其它阅读软件进行阅读。

ZIP压缩包，请在解压后，直接双击打开HTML文件进行阅读。

![TXT文档](assets/text1.png)

![HTML文档-普通章节](assets/html4.png)

![HTML文档-含有图片的普通章节](assets/html3.png)

![HTML文档-VIP章节](assets/html2.png)
## 目前支持小说网站

**特别提醒：如欲下载支持列表中网站的付费章节，请登录相应网站帐户，并确定已购买相应付费章节。未登录网站帐户，或未购买的付费章节，下载时将直接忽略，无法进行下载。**

|站点|公共章节|付费章节|备注|
|---|-------|------|----|
|[刺猬猫](https://www.ciweimao.com/)|✅|✅\*|\*VIP章节仅支持图片版。|
|[SF轻小说](https://book.sfacg.com/)|✅\*|✅\*\*|\*不支持对话小说，例：[224282](https://book.sfacg.com/Novel/224282/)。 \*\*VIP章节仅支持图片版。|
|[起点中文网](https://book.qidian.com/)|✅|✅||
|[起点女生网](https://www.qdmm.com/)|✅|✅||
|[晋江文学城](http://www.jjwxc.net/)|✅|✅\*|\*VIP章节已使用[防盗字体对照表](https://github.com/7325156/jjwxcNovelCrawler/tree/master/%E5%8F%8D%E7%88%AC%E8%99%AB%E5%AF%B9%E7%85%A7%E8%A1%A8)去除空格，如在使用中发现VIP章节仍存在空格，请附上所下载的文件进行反馈。|
|[长佩文学](https://www.gongzicp.com/)|✅|✅|反爬较严，限制下载速度，每分钟约可下载12章，请耐心等待。|
|[纵横中文网](http://www.zongheng.com/)|✅|❌||
|[花语女生网](http://huayu.zongheng.com/)|✅|❌||
|[17K小说网](https://www.17k.com/)|✅|❌||
|[书海小说网](http://www.shuhai.com/)|✅|❌||
|[UU看书网](https://www.uukanshu.com/)|✅|❎||
|[亿软网](http://www.yruan.com/)|✅|❎||
|[笔趣窝](http://www.biquwoo.com/)|✅|❎||
|[书趣阁](http://www.shuquge.com/)|✅|❎||
|[顶点小说](https://www.dingdiann.net/)|✅|❎||
|[星空中文](http://www.xkzw.org/)|✅|❎||
|[乐文小说网](https://www.lewenn.com/)|✅|❎||
|[266看书](https://www.266ks.com/)|✅|❎||
|[和图书](https://www.hetushu.com/index.php)|✅|❎||
|[手打吧](https://www.shouda88.com/)|✅|❎||
|[阁笔趣](http://www.gebiqu.com/)|✅|❎||
|[米趣小说](http://www.viviyzw.com/)|✅|❎||
|[书书网](https://www.xiaoshuodaquan.com/)|✅|❎||
|[八一中文网](https://www.81book.com/)|✅|❎||

## License

AGPL-3.0
