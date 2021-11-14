import { el as buttonEl } from "./button";
import { el as progressEl } from "./progress";

export function init() {
  document.body.appendChild(buttonEl);
  document.body.appendChild(progressEl);
}
