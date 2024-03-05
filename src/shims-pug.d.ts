// SPDX-License-Identifier: AGPL-3.0-or-later

declare module "*.pug" {
  import type { compileTemplate } from "pug";
  const compileTmpl: compileTemplate;
  export default compileTmpl;
}
