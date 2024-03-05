// SPDX-License-Identifier: AGPL-3.0-or-later AND (MIT OR Apache-2.0)

import { Hex } from "crypto-es/lib/core";
import { MD5 } from "crypto-es/lib/md5";
import { v4 as uuidv4 } from "uuid";

export async function getUid() {
  const storage = (await import("vendor/storage")).default;
  let device_token: string = await storage.local["com.sfacg"].device_token;
  if (device_token === "") {
    device_token = uuidv4().toUpperCase();
    storage.local["com.sfacg"].device_token = device_token;
  }
  return device_token;
}

function basicAuth(user: string, password: string): [string, string] {
  const credentials = btoa(`${user}:${password}`);
  return ["Authorization", `Basic ${credentials}`];
}

export const SFACG_USER_AGENT_PREFIX = "boluobao/4.9.76(iOS;16.5.1)/appStore/";
export const SFACG_USER_AGENT_RSS = "SFReader/4.9.76 (iPhone; iOS 16.5.1; Scale/3.00)";

// https://github.com/novel-rs/api/blob/main/src/sfacg/utils.rs
export class HttpClient {
  public APP_NAME = "sfacg";

  private HOST = "https://api.sfacg.com";
  private USER_AGENT_PREFIX = SFACG_USER_AGENT_PREFIX;
  private USER_AGENT_RSS = SFACG_USER_AGENT_RSS;

  private USERNAME = "apiuser";
  private PASSWORD = "3s#1-yt6e*Acv@qer";

  private SALT = "FMLxgOdsfxmN!Dt4";

  public cookies?: Record<string, string>;

  protected constructor(
    private getUid: () => Promise<string>,
    private signal?: AbortSignal,
  ) {}

  private async client() {
    const device_token = await this.getUid();
    const user_agent = this.USER_AGENT_PREFIX + device_token;

    return (url: string, options: RequestInit = {}) => {
      return new Request(url, {
        headers: {
          Accept: "application/vnd.sfacg.api+json;version=1",
          "Accept-Language": "zh-Hans-CN;q=1",
          "User-Agent": user_agent,
        },
        credentials: "include",
        ...options,
      });
    };
  }

  private client_rss() {
    return (url: string, options: RequestInit = {}) =>
      new Request(url, {
        headers: {
          Accept: "image/webp,image/*,*/*;q=0.8",
          "Accept-Language": "zh-Hans-CN;q=1",
          "User-Agent": this.USER_AGENT_RSS,
        },
        credentials: "include",
        ...options,
      });
  }

  private fetch(request: Request) {
    if (this.cookies) {
      const cookie = Object.entries(this.cookies)
        .map((co) => co.join("="))
        .join("; ");
      request.headers.set("Cookie", cookie);
    }
    return fetch(request, { signal: this.signal });
  }

  protected async get(url: string) {
    const client = await this.client();
    const request = client(this.HOST + url);
    const auth = basicAuth(this.USERNAME, this.PASSWORD);
    request.headers.set(...auth);
    request.headers.set("sfsecurity", await this.sf_security());
    return this.fetch(request);
  }

  protected async get_json(url: string) {
    const resp = await this.get(url);
    return resp.json();
  }

  protected async get_query(url: string, query: URLSearchParams) {
    const client = await this.client();

    const request = client(this.HOST + url + "?" + query.toString());
    const auth = basicAuth(this.USERNAME, this.PASSWORD);
    request.headers.set(auth[0], auth[1]);
    request.headers.set("sfsecurity", await this.sf_security());
    return this.fetch(request);
  }

  protected async get_query_json(url: string, query: URLSearchParams) {
    const resp = await this.get_query(url, query);
    return resp.json();
  }

  protected get_rss(url: string) {
    const client = this.client_rss();
    const request = client(url);
    return this.fetch(request);
  }

  protected async post(url: string, json: Record<string, string>) {
    const client = await this.client();
    const request = client(this.HOST + url, {
      method: "POST",
      body: new URLSearchParams(json).toString(),
    });
    const auth = basicAuth(this.USERNAME, this.PASSWORD);
    request.headers.set(auth[0], auth[1]);
    request.headers.set("sfsecurity", await this.sf_security());
    request.headers.set("Content-Type", "application/x-www-form-urlencoded");
    return this.fetch(request);
  }

  private async sf_security() {
    const uuid = uuidv4();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const device_token = await getUid();

    const data = `${uuid}${timestamp}${device_token}${this.SALT}`;
    const md5 = MD5(data);

    return `nonce=${uuid}&timestamp=${timestamp}&devicetoken=${device_token}&sign=${Hex.stringify(
      md5,
    ).toUpperCase()}`;
  }
}
