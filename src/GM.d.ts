// Tampermonkey API : https://www.tampermonkey.net/documentation.php

interface unsafeWindow extends Window {}
declare const unsafeWindow: unsafeWindow;

declare const GM_addStyle: (css: string) => HTMLElement;

type GM_addElement = {
  (tag_name: string, attributes: object): HTMLElement;
  (parent_node: HTMLElement, tag_name: string, attributes: object): HTMLElement;
};
declare const GM_addElement: GM_addElement;

type GM_setValue = (name: string, value: string) => void;
type GM_getValue = (name: string, defaultValue?: string) => string;
type GM_deleteValue = (name: string) => void;
type GM_listValues = () => string[];
declare const GM_setValue: GM_setValue;
declare const GM_getValue: GM_getValue;
declare const GM_deleteValue: GM_deleteValue;
declare const GM_listValues: GM_deleteValue;

type GM_addValueChangeListener_callback = (
  name: string,
  old_value: string | undefined,
  new_value: string | undefined,
  remote: boolean
) => any;
type GM_addValueChangeListener = (
  name: string,
  callback: GM_addValueChangeListener_callback
) => number;
declare const GM_addValueChangeListener: GM_addValueChangeListener;
type GM_removeValueChangeListener = (listener_id: number) => void;
declare const GM_removeValueChangeListener: GM_removeValueChangeListener;

type GM_log = (message: any) => void;
declare const GM_log: GM_log;

type GM_getResourceText = (name: string) => string | null;
type GM_getResourceURL = (name: string) => string | null;
declare const GM_getResourceText: GM_getResourceText;
declare const GM_getResourceURL: GM_getResourceURL;

type GM_registerMenuCommand = (
  name: string,
  fn: Function,
  accessKey?: string
) => number;
type GM_unregisterMenuCommand = (menuCmdId: number) => void;
declare const GM_registerMenuCommand: GM_registerMenuCommand;
declare const GM_unregisterMenuCommand: GM_unregisterMenuCommand;

interface GM_openInTab_options {
  active?: boolean;
  insert?: boolean;
  setParent?: boolean;
  incognito?: boolean;
}
interface GM_tab {
  close: Function;
  closed: boolean;
  name: undefined | string;
  onclose: Function | null;
}
type GM_openInTab = {
  (url: string, options?: GM_openInTab_options): GM_tab;
  (url: string, loadInBackground?: boolean): GM_tab;
};
declare const GM_openInTab: GM_openInTab;

interface GM_xmlhttpRequest_details {
  url: string;
  method?: string;
  headers?: object;
  data?: string;
  cookie?: string;
  binary?: boolean;
  nocache?: boolean;
  revalidate?: boolean;
  timeout?: number;
  context?: object;
  responseType?: "arraybuffer" | "blob" | "json";
  overrideMimeType?: string;
  anonymous?: boolean;
  fetch?: boolean;
  username?: string;
  password?: string;
  onabort?: (obj: {}) => any;
  onerror?: (obj: GM_xmlhttpError) => any;
  onloadstart?: (obj: GM_xmlhttpResponse) => any;
  onprogress?: (obj: GM_xmlhttpRequest_progress) => any;
  onreadystatechange?: (obj: GM_xmlhttpRequest_readystatechange) => any;
  ontimeout?: (obj: {}) => any;
  onload?: (obj: GM_xmlhttpResponse) => any;
}
interface GM_xmlhttpBase {
  readyState: number;
  status: number;
  statusText: string;
  responseHeaders: Object;
  response: Blob | ArrayBuffer | Object;
  responseXML: XMLDocument;
  responseText: string;
}
interface GM_xmlhttpResponse extends GM_xmlhttpBase {
  finalUrl: string;
}
interface GM_xmlhttpError extends GM_xmlhttpBase {
  error: string;
}
interface GM_xmlhttpRequest_progress
  extends GM_xmlhttpRequest_readystatechange {
  done: number;
  lengthComputable: boolean;
  loaded: number;
  position: number;
  total: number;
  totalSize: number;
}
interface GM_xmlhttpRequest_readystatechange {
  finalUrl: string;
  readyState: number;
  responseHeaders: Object;
  status: number;
  statusText: string;
}
interface GM_xmlhttpRequest_return {
  abort: () => void;
}
type GM_xmlhttpRequest = (
  details: GM_xmlhttpRequest_details
) => GM_xmlhttpRequest_return;
declare const GM_xmlhttpRequest: GM_xmlhttpRequest;

interface GM_download_details {
  url: string;
  name: string;
  headers?: object;
  saveAs?: boolean;
  onerror?: (obj: GM_download_error | GM_download_progress) => any;
  onload?: ({}) => any;
  onprogress?: (obj: GM_download_progress) => any;
  ontimeout?: (obj: object) => any;
}
interface GM_download_error {
  error: string;
  details?: any;
}
interface GM_download_progress extends GM_xmlhttpRequest_progress {
  response: null;
  responseText: string;
  responseXML: string;
}
type GM_download = {
  (details: GM_download_details): GM_xmlhttpRequest_return;
  (url: string, name: string): GM_xmlhttpRequest_return;
};
declare const GM_download: GM_download;

type GM_tab_object = object;
interface GM_tabs {
  [hash: number]: GM_tab_object;
}

type GM_getTab = (callback: (obj: GM_tab_object) => any) => void;
declare const GM_getTab: GM_getTab;

type GM_getTabs = (callback: (obj: GM_tabs) => any) => void;
declare const GM_getTabs: GM_getTabs;

type GM_saveTab = (tab: GM_tab_object) => void;
declare const GM_saveTab: GM_saveTab;

type GM_notification_details = {
  text: string;
  title?: string;
  image?: string;
  highlight?: boolean;
  silent?: boolean;
  timeout?: number;
  ondone?: (done: boolean) => any;
  onclick?: () => any;
};
type GM_notification = {
  (details: GM_notification_details, ondone?: (done: boolean) => any): void;
  (text: string, title?: string, image?: string, onclick?: () => any): void;
};
declare const GM_notification: GM_notification;

type GM_setClipboard_info = {
  type: string;
  mimetype: string;
};
type GM_setClipboard = (
  data: string,
  info?: GM_setClipboard_info | string
) => void;
declare const GM_setClipboard: GM_setClipboard;

interface GM_info {
  downloadMode: string;
  isFirstPartyIsolation: boolean | undefined;
  isIncognito: boolean;
  script: GM_script;
  scriptHandler: string;
  scriptMetaStr: string | undefined;
  scriptSource: string | undefined;
  scriptUpdateURL: string | undefined;
  scriptWillUpdate: boolean;
  version: string;
}
interface GM_script {
  antifeature: object;
  author: string | null;
  copyright: string | null;
  description: string | null;
  description_i18n: string[];
  excludes: string[];
  grant: string[];
  header: string;
  homepage: string | null;
  icon: string | null;
  icon64: string | null;
  includes: string[];
  lastModified: number;
  matches: string[];
  name: string;
  name_i18n: string[];
  namespace: string;
  options: GM_script_options;
  position: number;
  resources: string[];
  "run-at": string;
  supportURL: string | null;
  unwrap: boolean;
  updateURL: string | null;
  uuid: string;
  version: string;
}
interface GM_script_options {
  check_for_updates: boolean;
  comment: string | null;
  compat_foreach: boolean;
  compat_metadata: boolean;
  compat_prototypes: boolean;
  compat_wrappedjsobject: boolean;
  compatopts_for_requires: boolean;
  noframes: boolean | null;
  override: object;
  run_at: string;
}
declare const GM_info: GM_info;

// Greasemonkey API : https://wiki.greasespot.net/Greasemonkey_Manual:API
interface GM {
  info: GM_info;
  deleteValue: GM_deleteValue;
  getValue: GM_getValue;
  listValues: GM_listValues;
  setValue: GM_setValue;
  getResourceUrl: GM_getResourceURL;
  notification: GM_notification;
  openInTab: GM_openInTab;
  registerMenuCommand: GM_registerMenuCommand;
  setClipboard: GM_setClipboard;
  xmlHttpRequest: GM_xmlhttpRequest;
  unsafeWindow: unsafeWindow;
}
declare const GM: GM;
