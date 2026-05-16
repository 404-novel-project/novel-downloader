export function pierceShadow(
  root: Document | Element | ShadowRoot,
  selector: string,
): Element | null {
  const direct = root.querySelector(selector);
  if (direct) return direct;

  const all = Array.from(root.querySelectorAll("*"));
  for (const el of all) {
    if (el.shadowRoot) {
      const found = el.shadowRoot.querySelector(selector);
      if (found) return found;
      const deeper = pierceShadow(el.shadowRoot, selector);
      if (deeper) return deeper;
    }
  }
  return null;
}
