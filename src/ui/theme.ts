/**
 * MDUI 2 涓婚绠＄悊妯″潡
 *
 * 鍔熻兘锛?
 * 1. 娴呰壊/鏆楄壊妯″紡璺熼殢绯荤粺鍒囨崲
 * 2. 鏍规嵁缃戦〉棰滆壊鍖归厤涓婚鑹诧紙鍔ㄦ€侀厤鑹诧級
 */
declare const mdui: {
  setTheme: (theme: "light" | "dark" | "auto", target?: string | HTMLElement) => void;
  setColorScheme: (color: string, options?: { target?: string | HTMLElement }) => void;
  removeColorScheme: (options?: { target?: string | HTMLElement }) => void;
  getColorFromImage: (image: string | HTMLImageElement) => Promise<string>;
};

/** 瑕佸簲鐢ㄤ富棰樼殑鐩爣鍏冪礌锛坰hadow host锛?*/
// let themeTarget: HTMLElement | undefined;

/** 鍒濆鍖栦富棰橈細璺熼殢绯荤粺 + 鍖归厤缃戦〉閰嶈壊 */
export async function initTheme(shadowHost: HTMLElement) {
  // themeTarget = shadowHost;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // 1. 璺熼殢绯荤粺鏆楄壊/娴呰壊妯″紡
  const updateTheme = () => {
    try {
      if (mediaQuery.matches) {
        mdui.setTheme("dark", shadowHost);
      } else {
        mdui.setTheme("light", shadowHost);
      }
    } catch (e) {
      console.warn("Failed to set theme:", e);
    }
  };
  updateTheme();

  // 2. 浠庣綉椤典腑鎻愬彇涓昏壊璋冨苟搴旂敤鍔ㄦ€侀厤鑹?
  try {
    const color = await extractPagePrimaryColor();
    if (color) {
      mdui.setColorScheme(color, { target: shadowHost });
    }
  } catch {
    // 鎻愬彇澶辫触涓嶅奖鍝嶆甯镐娇鐢紝浣跨敤 MDUI 榛樿閰嶈壊
  }

  // 3. 鐩戝惉绯荤粺涓婚鍙樺寲
  mediaQuery.addEventListener("change", updateTheme);
}

/**
 * 浠庡綋鍓嶇綉椤典腑鎻愬彇涓昏壊璋?
 *
 * 浼樺厛绾э細
 * 1. theme-color meta 鏍囩
 * 2. 缃戠珯 favicon 鍥炬爣涓昏壊
 * 3. body 鑳屾櫙鑹诧紙濡傛灉闈炵櫧/闈為粦锛?
 */
async function extractPagePrimaryColor(): Promise<string | undefined> {
  function isVibrantStr(colorStr: string | null | undefined): boolean {
    if (!colorStr) return false;
    let r = 0, g = 0, b = 0;
    if (colorStr.startsWith("#")) {
      let hex = colorStr.slice(1);
      if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        r = parseInt(match[1], 10);
        g = parseInt(match[2], 10);
        b = parseInt(match[3], 10);
      } else {
        return false;
      }
    }
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const l = (max + min) / 2;
    if (l < 0.15 || l > 0.85) return false;
    const d = max - min;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    return s > 0.15;
  }

  // 1. 网站icon
  const iconLinks = Array.from(document.querySelectorAll<HTMLLinkElement>(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel*="icon"]'
  ));
  for (const link of iconLinks) {
    if (link.href) {
      try {
        const color = await mdui.getColorFromImage(link.href);
        if (isVibrantStr(color)) return color;
      } catch {
        // ignore error
      }
    }
  }

  // 2. 小说封面图
  const coverUrl = document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content
    || Array.from(document.querySelectorAll<HTMLImageElement>('img')).find(img => {
      const s = (img.src + img.className + img.alt + img.id).toLowerCase();
      return s.includes('cover') || s.includes('fengmian') || s.includes('封面');
    })?.src;

  if (coverUrl) {
    try {
      const color = await mdui.getColorFromImage(coverUrl);
      if (isVibrantStr(color)) return color;
    } catch {
      // ignore error
    }
  }

  // 3. 网页页面中拾取 (theme-color meta)
  const themeColorMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"], meta[name="msapplication-TileColor"]'
  );
  if (themeColorMeta) {
    const color = themeColorMeta.getAttribute("content");
    if (isVibrantStr(color)) return color as string;
  }

  // 网页页面背景色和链接颜色
  try {
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    if (isVibrantStr(bodyBg)) return bodyBg;
    
    // links
    const links = document.querySelectorAll("a");
    for (let i = 0; i < Math.min(links.length, 10); i++) {
      const linkColor = window.getComputedStyle(links[i]).color;
      if (isVibrantStr(linkColor)) return linkColor;
    }
  } catch {
    console.warn("Failed to extract page color");
  }

  return undefined;
}
