# 权限说明

本插件所需权限较多，本文档用于说明为什么索取这些权限。

---

- "host_permissions": ["<all_urls>"]

跨域xhr请求、向页面注入脚本、修改网络请求所必须权限。

---

- storage
- unlimitedStorage

用于存储站点配置、插件配置、断点续传等功能数据。

相关代码可参见：[src/vendor/storage](../src/vendor/storage)

---

- tabs
- scripting

用于向页面注入 [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)。

相关代码可参见：[src/backgroud/runtime/injectContentScript.ts](../src/backgroud/runtime/injectContentScript.ts)

---

- downloads

保存下载文件。

相关代码可参见：[src/backgroud/runtime/saveBlob.ts](../src/backgroud/runtime/saveBlob.ts)

---

- declarativeNetRequestWithHostAccess

修改网络请求（主要用于修改 [Forbidden header](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)），用于在浏览器中调用 APP API。

相关代码可参见：[src/backgroud/runtime/declarativeNetRequest](../src/backgroud/runtime/declarativeNetRequest)

---

- contextualIdentities (Firefox only)
- cookies

用于导入/导出 Cookies 功能。

相关代码可参见：[src/pages/popup/cookies.ts](../src/pages/popup/cookies.ts)

---

- notifications (optional)

用于显示通知。

相关代码可参见：[src/backgroud/runtime/notifications.ts](../src/backgroud/runtime/notifications.ts)
