import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { parseHTML } from "linkedom";

// https://stackoverflow.com/a/26554873
function* range(start: number, stop: number, step = 1) {
  if (stop == null) {
    // one param defined
    stop = start;
    start = 0;
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

async function get_ISO_639_1_2() {
  const r = await fetch("https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes");
  const doc = parseHTML(await r.text()).document;
  const tbody = doc.querySelector("table.wikitable > tbody");
  if (!tbody) {
    throw Error("Not Fount tbody");
  }
  const ls = Array.from(tbody.querySelectorAll("tr"))
    .slice(1)
    .map((tr) => Array.from(tr.children).map((td) => td.textContent!.trim()));

  return `// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * {@link https://en.wikipedia.org/wiki/ISO_639-1 | ISO 639-1} 代码
 * @public
 */
export enum ISO_639_1 {
${ls.map((l) => `"${l[0]}" = "${l[1]}",`).join("\n")}
}

/**
 * {@link https://en.wikipedia.org/wiki/ISO_639-2 | ISO 639‑2/T } 代码
 * @public
 */
export enum ISO_639_2T {
${ls.map((l) => `"${l[0]}" = "${l[2]}",`).join("\n")}
}

/**
 * {@link https://en.wikipedia.org/wiki/ISO_639-2 | ISO 639‑2/B } 代码
 * @public
 */
export enum ISO_639_2B {
${ls.map((l) => `"${l[0]}" = "${l[3]}",`).join("\n")}
}`;
}

async function get_ISO_639_3(url: string) {
  const r = await fetch(url);
  const doc = parseHTML(await r.text()).document;
  const tbody = doc.querySelector(".wikitable > tbody");
  if (!tbody) {
    throw Error("Not Fount tbody");
  }

  return Array.from(tbody.querySelectorAll("tr"))
    .slice(1)
    .map((tr) => Array.from(tr.children).map((td) => td.textContent!.trim()))
    .filter((l) => {
      if (l[0].startsWith("(")) {
        return false;
      }
      if (l[0].includes("...")) {
        return false;
      }
      return true;
    })
    .map((l) => `"${l[6]}" = "${l[0]}",`)
    .join("\n");
}

async function main() {
  let output = await get_ISO_639_1_2();

  output += `
/**
 * {@link https://en.wikipedia.org/wiki/ISO_639-3 | ISO 639-3} 代码
 * @public
 */
export enum ISO_639_3 {`;

  const url_base = "https://en.wikipedia.org/wiki/ISO_639:";
  for (const x of range(parseInt("61", 16), parseInt("7a", 16) + 1)) {
    const url = url_base + String.fromCodePoint(x);
    output += "\n" + (await get_ISO_639_3(url));
  }
  output += "\n}\n";

  return output;
}

const pwd = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(pwd, "../", "src/vendor/types/ISO_639.ts");
console.log("target file:", target);

const output = await main();
fs.writeFileSync(target, output);
