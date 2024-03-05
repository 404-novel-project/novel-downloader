import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { parseHTML } from "linkedom";

async function main() {
  const r = await fetch("https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes");
  const doc = parseHTML(await r.text()).document;
  const tbody = doc.querySelector(".sortable > tbody");
  if (!tbody) {
    throw Error("Not Fount tbody");
  }
  Array.from(tbody.querySelectorAll("style")).forEach((s) => s.remove());
  Array.from(tbody.querySelectorAll('a[href^="#cite"]')).forEach((s) => s.remove());

  const ls = Array.from(tbody.querySelectorAll("tr"))
    .slice(3)
    .map((tr) => Array.from(tr.children).map((td) => td.textContent!.trim()));

  return `// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * {@link https://en.wikipedia.org/wiki/ISO_3166-1 | ISO 3166-1 alpha-2} 代码
 * @public
 */
export enum ISO_3166_1_A2 {
${ls
  .filter((l) => l[3])
  .map((l) => `"${l[0]}" = "${l[3]}",`)
  .join("\n")}
}

/**
 * {@link https://en.wikipedia.org/wiki/ISO_3166-1 | ISO 3166-1 alpha-3} 代码
 * @public
 */
export enum ISO_3166_1_A3 {
${ls
  .filter((l) => l[4])
  .map((l) => `"${l[0]}" = "${l[4]}",`)
  .join("\n")}
}

/**
 * {@link https://en.wikipedia.org/wiki/ISO_3166-1 | ISO 3166-1 numeric} 代码
 * @public
 */
export enum ISO_3166_1_NC {
${ls
  .filter((l) => l[5])
  .map((l) => `"${l[0]}" = "${l[5]}",`)
  .join("\n")}
}`;
}

const pwd = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(pwd, "../", "src/vendor/types/ISO_3166.ts");
console.log("target file:", target);

const output = await main();
fs.writeFileSync(target, output);
