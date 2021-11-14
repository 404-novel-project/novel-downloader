export function createEl(el: string): HTMLElement {
  const _el = document.createElement("div");
  _el.innerHTML = el;
  if (_el.childElementCount === 1 && _el.firstElementChild) {
    return _el.firstElementChild as HTMLElement;
  } else {
    throw new Error("Create HTMLElement Failed!");
  }
}

export function createStyle(style: string, id: string | undefined = undefined) {
  const el = createEl(`<style>${style}</style>`);
  if (id) {
    el.id = id;
  }
  document.head.appendChild(el);
  return el;
}
