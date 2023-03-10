import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

import got, { OptionsInit, Response, RequestError } from "got";
import pLimit from "p-limit";

/*
本脚本用于检测match列表中的网站是否仍然存活，是否变更域名。
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getHeader() {
  const headerPath = path.resolve(__dirname, "..", "src/header.json");
  const header = JSON.parse(fs.readFileSync(headerPath).toString());
  return header;
}

function getDomains(header: any): string[] {
  const match: string[] = header.match;
  return match
    .map((m) => {
      const url = m.replace("*://", "http://");
      return new URL(url).host;
    })
    .filter((x) => !x.includes("*"));
}

interface testResult {
  error: string | null;
  ok: boolean;
  status: number;
  length: number;
  match: boolean;
}
interface siteTestResult {
  http: testResult;
  https: testResult;
  ok: boolean;
  match: boolean;
}
async function siteTester(domain: string): Promise<siteTestResult> {
  const options = {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    },
    timeout: { request: 20000, response: 30000 },
    retry: { limit: 1 },
    responseType: "text",
    http2: true,
  };

  function isMatch(resp: Response): boolean {
    return new URL(resp.requestUrl).host === new URL(resp.url).host;
  }
  async function runTest(url: string): Promise<testResult> {
    try {
      console.info(`Request ${url}`);
      const resp = (await got({
        url,
        ...options,
      } as OptionsInit)) as Response<string>;
      return {
        error: null,
        ok: resp.ok,
        status: resp.statusCode,
        length: resp.body.length,
        match: isMatch(resp),
      };
    } catch (error) {
      const code = (error as RequestError).code;
      if (code === "ERR_NON_2XX_3XX_RESPONSE") {
        const resp = (error as RequestError).response as Response<string>;
        return {
          error: code,
          ok: resp.ok,
          status: resp.statusCode,
          length: resp.body.length,
          match: isMatch(resp),
        };
      } else {
        return {
          error: code,
          ok: false,
          status: 0,
          length: 0,
          match: false,
        };
      }
    }
  }
  function isGOk(rs: testResult[]): boolean {
    const oks = rs.map((r) => r.ok);
    return oks.some((x) => x === true);
  }
  function isGMatch(rs: testResult[]): boolean {
    const matchs = rs.map((r) => r.match);
    return matchs.some((x) => x === true);
  }

  const tasks = [runTest("http://" + domain), runTest("https://" + domain)];
  const results = await Promise.all(tasks);
  return {
    http: results[0],
    https: results[1],
    ok: isGOk(results),
    match: isGMatch(results),
  };
}

async function run() {
  const domains = getDomains(getHeader());
  const limit = pLimit(10);
  const _results = domains.map((x) => limit(() => siteTester(x)));
  const results = await Promise.all(_results);

  const output = Object.fromEntries(
    domains
      .map((_, i): [string, siteTestResult] => [domains[i], results[i]])
      .sort(
        (j, k) =>
          Number(j[1].ok) - Number(k[1].ok) ||
          Number(j[1].match) - Number(k[1].match)
      )
  );
  return output;
}

async function main() {
  function convert(v: siteTestResult) {
    const nv: Record<string, any> = {};
    for (const [kk, vv] of Object.entries(v)) {
      if (kk.startsWith("http")) {
        for (const [kkk, vvv] of Object.entries(vv)) {
          nv[`${kk}_${kkk}`] = vvv;
        }
      } else {
        nv[kk] = vv;
      }
    }
    return nv;
  }
  function toCsv(input: { [k: string]: Record<string, string | boolean> }) {
    const ins = Object.entries(input);
    const out: string[] = [];

    const header = ["(index)", ...Object.keys(ins[0][1])].join(", ");
    out.push(header);

    for (const l of ins) {
      const line = [l[0], ...Object.values(l[1])].join(", ");
      out.push(line);
    }
    return out.join("\n");
  }

  const _output = await run();
  const output = Object.fromEntries(
    Object.entries(_output).map((k, i) => [k[0], convert(k[1])])
  );
  console.table(output);

  const csv = toCsv(output);
  const csvDirPath = path.resolve(__dirname, "..", "dist/csv");
  const csvPath = path.resolve(csvDirPath, "sites.csv");
  if (!fs.existsSync(csvDirPath)) {
    fs.mkdirSync(csvDirPath, { recursive: true });
  }
  fs.writeFileSync(csvPath, csv);
}

if (import.meta.url === `file://${__filename}`) {
  main();
}
