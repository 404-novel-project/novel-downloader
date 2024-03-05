// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

export async function gfetch() {
  const rpc = await import("../rpc");
  try {
    const resp0 = (await rpc.bfetch("https://book.sfacg.com/")).response;
    log.info(resp0);
    log.info(await resp0.blob());
  } catch (error) {
    log.error(error);
  }
  try {
    const resp1 = (await rpc.bfetch("https://booksafdsafsa.sfacg.com/")).response;
    log.info(resp1);
    log.info(await resp1.blob());
  } catch (error) {
    log.error(error);
  }
}
