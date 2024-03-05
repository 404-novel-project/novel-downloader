// SPDX-License-Identifier: AGPL-3.0-or-later

import { ApiClient } from ".";

const client = new ApiClient();

const cookies = await client.login("xxxxxxxxx", "xxxxxxxxx");
console.log(cookies);

const user = await client.user_info();
console.log(user);

await client.book_info(632848);
await client.book_info(640577);
await client.toc_info(632848);
await client.content_info(7735359);
await client.content_info(7538868);
await client.content_info(7420529);
await client.content_info(7394919);
await client.search_infos("只想", 0, 12);
await client.search_infos("怪谈", 0, 12);

await client.bookshelf_infos();
await client.categories();
await client.tags();

const options = {
  char_count_begin: 1_0000,
  // sys_tag_ids: [74],
  is_free: true,
};
const ns = await client.novels(27, 0, 12, options);
console.log(ns);
