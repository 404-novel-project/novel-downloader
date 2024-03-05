# 开发指导

如果您有额外的需求（比如说添加新网站支持）或需要修复某些问题，如果您有空并且拥有相应技能，您可以向本项目贡献代码。

本项目欢迎并鼓励来自社区的贡献，您的贡献将使得小说下载器项目更加强大。

本文将简单介绍开发相关事项。

## 开发环境

**项目依赖**：

- [nodejs](https://nodejs.org/)
- [yarn](https://classic.yarnpkg.com/)

**IDE**：

- [vscode](https://github.com/microsoft/vscode)

**测试环境**：

- [firefox](https://www.mozilla.org/firefox/)
- [chromium](https://www.chromium.org/Home) / [google-chrome](https://www.google.com/chrome)

## 快速开始

### 1. 获取源码

贡献代码最简单的方式是在 Github 上 fork 本项目，然后将你的更改[创建一个PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)。

请基于 `develop` 分支创建你的更改。

```bash
git clone git@github.com:YOUR_GITHUB_USER_NAME/novel-downloader.git
git checkout develop
```

### 2. 安装依赖

安装 [nodejs](https://nodejs.org/) 以及 [yarn](https://classic.yarnpkg.com/)，如果可能的话请尽量安装并使用最新版。

为方便开发，建议安装 [vscode](https://github.com/microsoft/vscode) IDE。

为方便测试，建议安装 [firefox](https://www.mozilla.org/firefox/) 以及 [chromium](https://www.chromium.org/Home)（[google-chrome](https://www.google.com/chrome)）。

安装好上述软件后，打开终端运行如下命令安装依赖。

```bash
cd path/where/you/have/cloned/the/repository
yarn install
```

### 3. 创建更改

参考项目结构以及项目文档，根据需求修改相应代码。

你可以运行 `yarn dev` 启动开发服务，开发服务将在代码发生变更时重编译相应文件。

```bash
yarn dev
```

你还可以使用 `yarn run` 命令启动浏览器测试插件，该命令将启动一个全新的浏览器环境并加载编译好的插件（建议结合 `yarn dev` 使用），请根据浏览器目标选择相应 `yarn run` 命令。

建议在两种浏览器下均进行测试，以保证兼容性。

```bash
yarn run:firefox    # 启动 Firefox
yarn run:chromium   # 启动 Chromium
```

测试完成后，请格式化代码。

```bash
yarn lint --fix
yarn format
```

完成上述工作后，请创建一个 commit。

```bash
yarn commit
```

### 4. 创建PR

参考 [Github 文档](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)，为您的更改创建一个PR。

## 项目结构

```
.
├── _locales                <- 本地化文件 [1]
├── assets                  <- 资源文件
├── docs                    <- 项目文档
├── src                     <- 项目源码
├── tools                   <- 工具脚本
├── webpack                 <- webpack 配置文件
├── README.md
├── api-extractor.json      <- api-extractor 配置 [2]
├── build_misc.js           <- 编译脚本，进行一些杂项工作 [3]
├── license.txt
├── manifest.json           <- manifest.json 模板
├── package.json
└── yarn.lock
```

- [1] 插件本地化（i18n）详细内容可参见：[Internationalization](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization)
- [2] api-extractor 配置详情可参见[此页面](https://api-extractor.com/pages/setup/invoking/)。
- [3] 诸如：根据 manifest.json 模板创建 manifest.json 文件；生成打包ZIP文件；生成签名好的插件。

---

```
./src
├── backgroud                   <- Background scripts
├── content_scripts             <- Content scripts
├── pages                       <- Pages
├── sw                          <- ServiceWorker
├── vendor                      <- 共用组件
├── dev                         <- .gitignore 怱略目录，供开发测试使用
│   ├── backgroud.ts
│   └── content_scripts.ts
├── api-extractor.ts            <- api-extractor 文档生成入口
├── global.ts
├── shims-assets.d.ts
├── shims-pug.d.ts
├── shims-tape-esm.d.ts
├── shims-vue.d.ts
└── tsconfig.json
```

插件结构可参见 [Anatomy of an extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)。

![The components of a web extension. The manifest.JSON must be present in all extensions. It provides pointers to background pages, content scripts, browser actions, page actions, options pages, and web accessible resources. Background pages consist of HTML and JS. Content scripts consist of JS and CSS. The user clicks on an icon to trigger browser actions and page actions and the resulting pop-up consists of HTML, CSS, and JS. Options pages consist of HTML, CSS, and JS.](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension/webextension-anatomy.png)

如同一般的浏览器插件一样，本项目大体上可分为 Background scripts、Content scripts、Pages 三大部分，具体而言，这三个部分分别对应着 `backgroud`、`content_scripts`、`pages` 三个目录。

插件大致采用前后分离的架构，前端（Content scripts、Pages）主要负责界面交互，采用 Vue 写成。主要的下载任务执行则由后端（Background scripts）进行。

`pages` 目录下是一些页面，诸如 Popup 页面，管理面板页面等等。

`vendor` 目录下存放着一些共用组件。

`sw` 是一些 ServiceWorker 脚本，Chromium Manifest V3 Background 为 ServiceWorker ，因此可以手动注册一些 ServiceWorker 来接管某些请求。这里主要借用 ServiceWorker，实现了 Stream Saver。

`dev` 目录为 `.gitignore` 怱略目录，需手动创建。当处于开发模式下 Webpack 打包时，将自动将 `dev/backgroud.ts` 打包至 Background script 中，将 `dev/content_scripts.ts` 打包至 Content script 中。你可以利用此特性进行调试。

---

```
./src/backgroud
├── models                  <- 对象原型
│   ├── data                    <- 下载数据原型类
│   ├── meta                    <- 下载元数据原型类
│   ├── factory                 <- 下载规则生成器，用于快速生成下载规则
│   ├── rule.ts                 <- 下载规则原型类
│   └── saver                   <- 保存组件，将下载数据以 epub、txt 等格式保存至磁盘
├── rpc                     <- 前后端通讯组件 ③
├── rules                   <- 实际下载规则
│   ├── maintainers.ts          <- 规则维护者名单
│   ├── utils                   <- 下载规则使用到的一些组件
│   └── index.ts                <- 下载规则入口
├── runtime                 <- 运行时组件 ③
├── index.ts                <- 全局入口 ①
└── init.ts                 <- 初始化 ②
```

插件安装之后，Background scripts 会随浏览器启动而运行。

`index.ts` 为全局入口，加载之后运行 `init.ts` 进行初始化操作。

`init.ts` 加载众多监听器，如 `browser.runtime.onMessage`、`browser.runtime.onConnect`、`browser.tabs.onUpdated`、`browser.tabs.onRemoved`。

监听器加载完成后，Background scripts 将在一段时间后休眠，等待事件唤醒。

例如：当打开新Tab时，将通过 `browser.tabs.onUpdated` 调用 `runtime/injectContentScript.ts` 的 `injectContentScript` 函数，`injectContentScript` 函数进一步调用 `runtime/rule.ts` 的 `checkHostname` 函数判断是否存在该站点对应的规则，如存在相应规则，将调用 `browser.scripting.executeScript` 将 Content scripts 注入页面。

下载操作的执行与上面类似，前端页面接收到用户交互，通过 `browser.runtime.sendMessage`、`browser.runtime.connect` 与后端进行通讯发出下载指令，后端通过 `browser.runtime.onMessage`、`browser.runtime.onConnect` 接收到指令后，将运行相应的处理函数进行处理。下载过程中，后端将通过 `browser.Runtime.Port` 与前端持续通讯，通告下载进度，同时进行保活操作。

---

```
./src/content_scripts
├── models                  <- 页面插件规则原型
├── rpc                     <- 前后端通讯组件 ③
├── rules                   <- 页面插件规则
├── runtime
├── ui                      <- 用户界面 ②
├── index.ts                <- 全局入口 ①
└── init.ts                 <- 初始化 ②
```

当 Content scripts 被 Background scripts 注入页面之后，将随网页加载运行。

`index.ts` 为全局入口，然后进一步加载 ui 同时进行一些初始化操作。

一些初始化操作示例：

- 创建并加载 Vue 组件；
- 注册 `window.addEventListener("popstate", hanlder)` 监听页面 URL 变化；
- 将当前 URL 向后端请求询问是否有匹配的规则， 是否应当显示下载按钮。

如果 `rules` 还存在相应的页面插件规则，将运行相应的页面插件代码，进而实现网页版查看 APP Only 小说、每日自动签到等拓展需求。

---

```
./src/pages
├── dashboard       <- 后台管理面板页面
├── popup           <- 点击按钮时的小弹窗页面
└── worker          <- 供 ServiceWorker 使用的页面
```

---

```
./src/vendor
├── rpc                 <- 前后端通讯组件
├── storage             <- 更加友好的 browser.Storage 接口
├── types               <- typescript 相关
├── utils               <- 各种各样的小功能
├── cookies.ts          <- 导入导出 Cookies
├── debug.ts            <- 启用、禁用调试
└── init.ts             <- 可被共用的初始化组件
```

## 参考资料

- [Browser extensions - Mozilla | MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Extensions / Reference | Chrome for Developers](https://developer.chrome.com/docs/extensions/reference)
