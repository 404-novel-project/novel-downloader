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
  buttonVm.mount(buttonEl);
  document.body.appendChild(buttonEl);
  document.body.appendChild(progressEl);
  document.body.appendChild(settingEl);

  document.head.appendChild(buttonStyel);
  document.head.appendChild(progressStyel);
  document.head.appendChild(settingStyle);
  document.head.appendChild(filterTabStyel);
  document.head.appendChild(chapterListStyel);
  document.head.appendChild(testUIStyle);
}
