import { el as buttonEl, style as buttonStyel, vm as buttonVm } from "./button";
import { style as chapterListStyel } from "./ChapterList";
import Dialog from "./dialog";
import { style as filterTabStyel } from "./FilterTab";
import { el as progressEl, style as progressStyel } from "./progress";
import { el as settingEl, style as settingStyle } from "./setting";
import { style as testUIStyle } from "./TestUI";

function register() {
  customElements.define("dialog-ui", Dialog);
}

export function init() {
  register();

  const shadowHost = document.createElement("div");
  shadowHost.id = "nd-shadow-host";
  document.body.appendChild(shadowHost);
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  buttonVm.mount(buttonEl);
  shadowRoot.appendChild(buttonEl);
  shadowRoot.appendChild(progressEl);
  shadowRoot.appendChild(settingEl);

  shadowRoot.appendChild(buttonStyel);
  shadowRoot.appendChild(progressStyel);
  shadowRoot.appendChild(settingStyle);
  shadowRoot.appendChild(filterTabStyel);
  shadowRoot.appendChild(chapterListStyel);
  shadowRoot.appendChild(testUIStyle);
}
