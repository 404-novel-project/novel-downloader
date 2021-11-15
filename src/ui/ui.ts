import Dialog from "./dialog";
import { el as buttonEl } from "./button";
import { el as progressEl } from "./progress";
import { el as settingEl } from "./setting";

function register() {
  customElements.define("dialog-ui", Dialog);
}

export function init() {
  register();
  document.body.appendChild(buttonEl);
  document.body.appendChild(progressEl);
  document.body.appendChild(settingEl);
}
