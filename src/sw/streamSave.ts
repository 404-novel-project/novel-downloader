// SPDX-License-Identifier: AGPL-3.0-or-later

import { dataUrlToBytes } from "vendor/utils";

import type {
  dataMsg,
  errorMsg,
  swEndMsg,
  swStartMsg,
  proxyPing,
  proxyPong,
} from "backgroud/rpc/streamSave";

export function proxyPage() {
  const pageHtml = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Stream Saver Proxy Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="icon" href="icon-48.png"/><script type="module" src="/sw/streamSave/page.js"></script></head>
    <body>
    <h1>Stream Saver 代理页面，请勿关闭此页，关闭此页将导致下载出错。下载完成后，本页面将自动关闭。</h1>
    <h1>Stream Saver proxy page, please do not close this page, closing this page will cause download error. After the download is complete, this page will close automatically.</h1>
    </body>
  </html>`;
  const response = new Response(pageHtml, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "text/html",
    },
  });
  return response;
}

export function downloadPage({
  id,
  filename,
  size,
  type,
}: {
  id: string;
  filename: string;
  size?: string;
  type?: string;
}) {
  const name = "streamSave-" + id;
  const bc = new BroadcastChannel(name);
  const ts = new TransformStream<string, Uint8Array>({
    start() {
      // required.
    },
    async transform(chunk, controller) {
      const bytes = await dataUrlToBytes(chunk);
      controller.enqueue(bytes);
    },
    flush() {
      // do any destructor work here
    },
  });
  const writer = ts.writable.getWriter();

  let pingFailed = 0;
  const pingIntervalId = setInterval(() => {
    if (pingFailed > 10) {
      clearInterval(pingIntervalId);
      writer.abort("proxy page dead!");
    }
    const ping: proxyPing = {
      id,
      type: "proxyPing",
    };
    bc.postMessage(ping);
    pingFailed = pingFailed + 1;
  }, 500);

  const onmessage = async (ev: MessageEvent<dataMsg | errorMsg | proxyPong>) => {
    if (ev.data.id !== id) {
      return;
    }
    switch (ev.data.type) {
      case "data": {
        const data = ev.data;

        if (data.data) {
          await writer.write(data.data);
        }

        if (data.end) {
          clearInterval(pingIntervalId);
          await writer.close();

          const proxyEndMsg: swEndMsg = {
            id,
            type: "swEnd",
          };
          bc.postMessage(proxyEndMsg);
          return;
        }
        break;
      }
      case "error": {
        await writer.abort(ev.data.msg);
        break;
      }
      case "proxyPong": {
        pingFailed = pingFailed - 1;
        break;
      }
    }
  };

  bc.addEventListener("message", onmessage);

  const startMsg: swStartMsg = {
    id,
    type: "swStart",
  };
  bc.postMessage(startMsg);

  const headers: Record<string, string> = {
    "Content-Disposition": `attachment; filename="${filename}"`,
  };
  if (type) headers["Content-Type"] = type;
  if (size) headers["Content-Length"] = size;
  const response = new Response(ts.readable, {
    status: 200,
    statusText: "OK",
    headers,
  });
  return response;
}
