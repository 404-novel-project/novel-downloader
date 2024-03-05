// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";
import { v4 as uuidv4 } from "uuid";
import * as browser from "webextension-polyfill";

import { bytesToBase64DataUrl } from "vendor/utils";

interface streamSaveObj {
  id: string;
  filename: string;
  size?: number;
  type?: string;
  readStream: ReadableStream<string>;
  ready: boolean;
}
const streamSaveObjMap: Map<string, streamSaveObj> = new Map();

/* service work To backgroud */
export interface swStartMsg {
  id: string;
  type: "swStart";
}

export interface swEndMsg {
  id: string;
  type: "swEnd";
}

/* proxy page To backgroud */
export interface proxyStartMsg {
  id: string;
  type: "proxyStart";
}

/* backgroud To service work */
export interface errorMsg {
  id: string;
  type: "error";
  msg: string;
}
export interface dataMsg {
  id: string;
  type: "data";
  data?: string; // bytes 编码后的 data url
  end: boolean;
}

/* service work To proxy page */
export interface proxyPing {
  id: string;
  type: "proxyPing";
}

/* proxy page To service work */
export interface proxyPong {
  id: string;
  type: "proxyPong";
}

/**
 * streamSave Listen
 * @internal
 */
export function streamSaveListen() {
  function onConnect(port: browser.Runtime.Port) {
    const name = port.name;

    const prefix = "streamSave-";
    if (!name.startsWith(prefix)) {
      return;
    }
    log.debug("Port connected", port.name, port);

    port.onDisconnect.addListener(async (p) => {
      log.debug("Port disconnected", port.name, p);
    });

    const onMessage = async (
      message: swStartMsg | proxyStartMsg | swEndMsg,
      port: browser.Runtime.Port,
    ) => {
      const name = port.name;
      const prefix = "streamSave-";
      const id = name.substring(prefix.length);
      const obj = streamSaveObjMap.get(id);

      const closeProxyPage = async () => {
        const proxyPageUrl = browser.runtime.getURL(`/sw/streamSave/${id}?target=proxy`);
        const tabs = await browser.tabs.query({ url: proxyPageUrl });
        tabs.forEach((tab) => {
          if (tab.id) {
            browser.tabs.remove(tab.id);
          }
        });
      };

      if (obj) {
        switch (message.type) {
          case "proxyStart": {
            const params = new URLSearchParams({
              target: "download",
              filename: obj.filename,
              size: obj.size?.toString() ?? "",
              type: obj.type ?? "",
            });
            const downloadPageUrl = browser.runtime.getURL(
              `/sw/streamSave/${id}?${params.toString()}`,
            );
            await browser.tabs.create({ url: downloadPageUrl, active: false });
            break;
          }
          case "swStart": {
            obj.ready = true;

            // 开始传输数据
            const stream = obj.readStream;
            const reader = stream.getReader();

            // 将 readableStream 流中的数据持续压入 port 中
            const processData = async (result: ReadableStreamReadResult<string>): Promise<void> => {
              if (result.done) {
                const dataMsg: dataMsg = {
                  id,
                  type: "data",
                  end: true,
                };
                port.postMessage(dataMsg);
                return;
              }

              const value = result.value;
              const dataMsg: dataMsg = {
                id,
                type: "data",
                data: value,
                end: false,
              };
              try {
                port.postMessage(dataMsg);
              } catch (error) {
                log.error("stream saver port postMessage failed!", error);
                return reader.cancel(error);
              }

              return reader.read().then(processData);
            };
            reader.read().then(processData);
            break;
          }
          case "swEnd": {
            port.disconnect();

            closeProxyPage();
            streamSaveObjMap.delete(id);
            log.info("Stream save finished!");
          }
        }
      } else {
        const errMsg: errorMsg = {
          id,
          type: "error",
          msg: `${id} streamSaveObj don't exists.`,
        };
        port.postMessage(errMsg);
        port.disconnect();

        closeProxyPage();
        streamSaveObjMap.delete(id);

        log.error(`stream save Error! ${id} streamSaveObj don't exists.`);
      }
    };

    port.onMessage.addListener(onMessage);
  }

  browser.runtime.onConnect.addListener(onConnect);
}

/**
 * 流式保存对象
 *
 * 目前仅支持 Chromium
 * @public
 */
export async function streamSave({
  filename,
  size,
  type,
}: {
  filename: string;
  size?: number;
  type?: string;
}): Promise<WritableStream<Uint8Array>> {
  const id = uuidv4();
  const ts = new TransformStream<Uint8Array, string>({
    start() {
      // required.
    },
    async transform(chunk, controller) {
      const dataUrl = await bytesToBase64DataUrl(chunk);
      controller.enqueue(dataUrl);
    },
    flush() {
      // do any destructor work here
    },
  });
  const obj: streamSaveObj = {
    id,
    filename,
    size,
    type,
    readStream: ts.readable,
    ready: false,
  };
  streamSaveObjMap.set(id, obj);

  await browser.tabs.create({
    url: browser.runtime.getURL(`/sw/streamSave/${id}?target=proxy`),
    active: false,
    pinned: true,
  });

  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (obj.ready) {
        clearInterval(intervalId);
        resolve(ts.writable);
      }
    }, 100);
  });
}
