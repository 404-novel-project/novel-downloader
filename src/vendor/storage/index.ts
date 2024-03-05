// SPDX-License-Identifier: AGPL-3.0-or-later

import { storage } from "./storage";
export default storage;

export { onChanged } from "./onChanged";
export type { settingValue, HookFunction, local, session, sync } from "./settings";
export { initSettingValus, initSettingHooks } from "./initSettings";
