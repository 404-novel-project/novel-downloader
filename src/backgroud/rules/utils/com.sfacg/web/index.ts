// SPDX-License-Identifier: AGPL-3.0-or-later

import { SfacgClient } from "./utils";

export class PC extends SfacgClient {
  public constructor(baseOrigin: string, basePathname: string, signal?: AbortSignal) {
    super(baseOrigin, basePathname, signal);
  }

  public async user_info() {
    //TODO
  }

  public async book_info(novelId: number) {
    //TODO
  }

  public async toc_info(novelId: number) {
    //TODO
  }

  public async content_info(novelId: number, volumeId: number, chapId: number, isVIP: boolean) {
    //TODO
  }

  public async image(url: string) {
    const response = await this.get_rss(url);
    return response.blob();
  }
}

export class Mobile extends SfacgClient {
  public constructor(baseOrigin: string, basePathname: string, signal?: AbortSignal) {
    super(baseOrigin, basePathname, signal);
  }

  public async user_info() {
    //TODO
  }

  public async book_info(novelId: number) {
    //TODO
  }

  public async toc_info(novelId: number) {
    //TODO
  }

  public async content_info(novelId: number, volumeId: number, chapId: number, isVIP: boolean) {
    //TODO
  }

  public async image(url: string) {
    const response = await this.get_rss(url);
    return response.blob();
  }
}
