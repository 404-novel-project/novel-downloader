// SPDX-License-Identifier: AGPL-3.0-or-later

import log from "loglevel";

import { Rule } from "../models";

export const SFACG: Rule = {
  ID: "com.sfacg",
  onMounted: () => {
    log.info("Content Scripts SFACG onMounted Event!");
  },
  click: {
    type: "click",
    listener: (ev) => {
      console.log("click document, ev:", ev);
    },
  },
};
