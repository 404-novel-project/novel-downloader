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
    const setting = document.querySelector("#nd-setting");
    if (setting) {
      getFixNearby(setting).forEach((node) => node.remove());
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
    return Array.from(document.querySelectorAll("body *")).filter((node) => {
      const { position, visibility, zIndex } = window.getComputedStyle(node);
      return (
        node !== elem &&
        !(
          node.compareDocumentPosition(elem) &
            Node.DOCUMENT_POSITION_CONTAINS ||
          node.compareDocumentPosition(elem) &
            Node.DOCUMENT_POSITION_CONTAINED_BY
        ) &&
        visibility === "visible" &&
        (position === "fixed" || parseInt(zIndex, 10) >= 1000) &&
        nearTest(node, elem)
      );
    });

    function nearTest(node: Element, element: Element) {
      if (isOverlap(getVertex(node), getVertex(element))) {
        return true;
      } else if (isNearby(getVertex(node), getVertex(element))) {
        return true;
      } else {
        return false;
      }

      function getVertex(
        ele: Element
      ): [
        [number, number],
        [number, number],
        [number, number],
        [number, number]
      ] {
        const { left, top, right, bottom } = ele.getBoundingClientRect();
        return [
          [left, top],
          [right, top],
          [left, bottom],
          [right, bottom],
        ];
      }

      function isOverlap(
        rec1: [
          [number, number],
          [number, number],
          [number, number],
          [number, number]
        ],
        rec2: [
          [number, number],
          [number, number],
          [number, number],
          [number, number]
        ]
      ) {
        const [left1, top1] = rec1[0];
        const [right1, bottom1] = rec1[3];
        const [left2, top2] = rec2[0];
        const [right2, bottom2] = rec2[3];
        return (
          // 矩形X坐标是否存在交集
          !(right1 < left2 || right2 < left1) &&
          // 矩形Y坐标是否存在交集
          !(bottom1 < top2 || bottom2 < top1)
        );
      }

      function isNearby(
        rec1: [
          [number, number],
          [number, number],
          [number, number],
          [number, number]
        ],
        rec2: [
          [number, number],
          [number, number],
          [number, number],
          [number, number]
        ]
      ) {
        const docEl = document.documentElement;
        const vw = Math.min(docEl.clientWidth, window.innerWidth);
        const vh = Math.min(docEl.clientHeight, window.innerHeight);
        const diagonal = Math.sqrt(vw ** 2 + vh ** 2);
        for (const [x1, y1] of rec1) {
          for (const [x2, y2] of rec2) {
            const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
            if (distance < diagonal * 0.1) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
}
