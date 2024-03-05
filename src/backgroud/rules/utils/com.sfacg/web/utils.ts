// SPDX-License-Identifier: AGPL-3.0-or-later

export class SfacgClient {
  public readonly baseUrl: string;

  protected constructor(
    public readonly baseOrigin: string,
    public readonly basePathname: string,
    private signal?: AbortSignal,
  ) {
    this.baseUrl = this.baseOrigin + this.basePathname;
  }

  private client() {
    return (url: string, options: RequestInit = {}) => {
      return new Request(url, {
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "zh-CN,zh;q=0.9",
        },
        ...options,
      });
    };
  }

  private client_rss() {
    return (url: string, options: RequestInit = {}) =>
      new Request(url, {
        headers: {
          Accept: "image/avif,image/webp,*/*",
          "Accept-Language": "zh-CN,zh;q=0.9",
        },
        ...options,
      });
  }

  private fetch(request: Request) {
    return fetch(request, { signal: this.signal });
  }

  protected get(url: string) {
    const client = this.client();
    const request = client(this.baseUrl + url);
    return this.fetch(request);
  }

  protected get_query(url: string, query: URLSearchParams) {
    const client = this.client();
    const request = client(this.baseUrl + url + "?" + query.toString());
    return this.fetch(request);
  }

  protected get_rss(url: string) {
    const client = this.client_rss();
    const request = client(url);
    return this.fetch(request);
  }
}
