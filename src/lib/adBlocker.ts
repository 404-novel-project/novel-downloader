export function floatBuster() {
  if (window !== window.top) {
    return;
  }
  let tstart: number;
  const ttl = 30000;
  let delay = 0;
  const delayStep = 50;

  const buster = () => {
    const button = document.querySelector("#button-div");
    if (button) {
      getFixNearby(button).forEach((node) => node.remove());
      tstart = Date.now();
    }
    const progress = document.querySelector("#nd-progress");
    if (progress) {
      getFixNearby(progress).forEach((node) => node.remove());
      tstart = Date.now();
    }

    if (Date.now() - tstart < ttl) {
      delay = Math.min(delay + delayStep, 1000);
      setTimeout(buster, delay);
    }
  };

  const domReady = (ev?: Event) => {
    if (ev) {
      document.removeEventListener(ev.type, domReady);
    }
    tstart = Date.now();
    setTimeout(buster, delay);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", domReady);
  } else {
    domReady();
  }

  function getFixNearby(elem: Element) {
    const docEl = document.documentElement;
    const vw = Math.min(docEl.clientWidth, window.innerWidth);
    const vh = Math.min(docEl.clientHeight, window.innerHeight);
    const { x: elemX, y: elemY } = getXY(elem);

    return Array.from(document.querySelectorAll("body *")).filter((node) => {
      const style = window.getComputedStyle(node);
      const { x: nodeX, y: nodeY } = getXY(node);
      const nodeRect = node.getBoundingClientRect();
      return (
        node !== elem &&
        !(
          node.compareDocumentPosition(elem) &
            Node.DOCUMENT_POSITION_CONTAINS ||
          node.compareDocumentPosition(elem) &
            Node.DOCUMENT_POSITION_CONTAINED_BY
        ) &&
        style.position === "fixed" &&
        style.visibility === "visible" &&
        isNaN(parseInt(style.zIndex)) === false &&
        parseInt(style.zIndex, 10) >= 1000 &&
        (Math.abs(nodeX - elemX) / vw < 0.15 ||
          Math.abs(nodeRect.left - elemX) / vw < 0.15 ||
          Math.abs(nodeRect.right - elemX) / vw < 0.15) &&
        (Math.abs(nodeY - elemY) / vh < 0.2 ||
          Math.abs(nodeRect.top - elemY) / vh < 0.2 ||
          Math.abs(nodeRect.bottom - elemY) / vh < 0.2)
      );
    });

    function getXY(ele: Element) {
      const rect = ele.getBoundingClientRect();
      const x = (rect.left + rect.right) / 2;
      const y = (rect.top + rect.bottom) / 2;
      return { x, y };
    }
  }
}
