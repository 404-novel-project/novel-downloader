import { el as buttonEl, style as buttonStyel, vm as buttonVm } from "./button";
import { style as chapterListStyel } from "./ChapterList";
import Dialog from "./dialog";
import { style as filterTabStyel } from "./FilterTab";
import mduiCss from "./mdui.css";
import { el as progressEl, style as progressStyel } from "./progress";
import { el as settingEl, style as settingStyle } from "./setting";
import { style as testUIStyle } from "./TestUI";
import { initTheme } from "./theme";

function register() {
  customElements.define("dialog-ui", Dialog);
}

/**
 * 将本地 MDUI CSS 注入到 shadow root 中。
 * 通过 webpack css-loader 加载为字符串，创建 <style> 元素注入。
 */
function injectMduiStyles(shadowRoot: ShadowRoot) {
  const styleEl = document.createElement("style");
  styleEl.textContent = mduiCss;
  shadowRoot.prepend(styleEl);
}

export async function init() {
  register();

  const shadowHost = document.createElement("div");
  shadowHost.id = "nd-shadow-host";
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  // 直接注入本地 MDUI CSS
  injectMduiStyles(shadowRoot);

  shadowRoot.appendChild(buttonEl);
  shadowRoot.appendChild(progressEl);
  shadowRoot.appendChild(settingEl);

  shadowRoot.appendChild(buttonStyel);
  shadowRoot.appendChild(progressStyel);
  shadowRoot.appendChild(settingStyle);
  shadowRoot.appendChild(filterTabStyel);
  shadowRoot.appendChild(chapterListStyel);
  shadowRoot.appendChild(testUIStyle);

  // CSS 已加载完毕，初始化主题
  initTheme(shadowHost);
}
