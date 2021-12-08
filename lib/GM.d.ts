/// <reference types="tampermonkey" />
export declare const _GM_info: Tampermonkey.ScriptInfo;
export declare function _GM_xmlhttpRequest<TContext = any>(details: Tampermonkey.Request<TContext>): void;
export declare function _GM_setValue(name: string, value: any): Promise<void>;
export declare function _GM_getValue<TValue>(name: string, defaultValue?: TValue): Promise<TValue>;
export declare function _GM_deleteValue(name: string): Promise<void>;
