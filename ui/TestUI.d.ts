/// <reference types="node" />
import * as Vue from "vue";
import { Chapter, Status } from "../main";
declare const _default: Vue.DefineComponent<{}, {
    metaData: {
        封面: string;
        题名: string;
        作者: string;
        网址: string;
        简介: HTMLElement;
    };
    getData: (key: string, value: string | HTMLElement) => string | HTMLElement;
    chapter: {
        bookUrl: string;
        bookname: string;
        chapterUrl: string;
        chapterNumber: number;
        chapterName: string | null;
        isVIP: boolean;
        isPaid: boolean | null;
        sectionName: string | null;
        sectionNumber: number | null;
        sectionChapterNumber: number | null;
        chapterParse: (chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean | null, charset: string, options: object) => Promise<import("../rules").ChapterParseObject>;
        charset: string;
        options: object;
        status: Status;
        retryTime: number;
        contentRaw: HTMLElement | null;
        contentText: string | null;
        contentHTML: HTMLElement | null;
        contentImages: {
            url: string;
            name: string;
            mode: "naive" | "TM";
            headers?: {
                [x: string]: string;
            } | undefined;
            status: Status;
            retryTime: number;
            imageBlob: void | {
                readonly size: number;
                readonly type: string;
                arrayBuffer: {
                    (): Promise<ArrayBuffer>;
                    (): Promise<ArrayBuffer>;
                };
                slice: {
                    (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob;
                    (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob;
                };
                stream: {
                    (): ReadableStream<any>;
                    (): NodeJS.ReadableStream;
                };
                text: {
                    (): Promise<string>;
                    (): Promise<string>;
                };
            } | null;
            comments: string;
            init: () => Promise<Blob | null>;
        }[] | null;
        additionalMetadate: {
            lastModified?: number | undefined;
        } | null;
        chapterHtmlFileName: string | number;
        init: () => Promise<Chapter>;
    };
    isSeenChapter: (_chapter: Chapter) => boolean;
    isChapterFailed: (_chapter: Chapter) => boolean;
}, {}, {}, {}, Vue.ComponentOptionsMixin, Vue.ComponentOptionsMixin, Vue.EmitsOptions, string, Vue.VNodeProps & Vue.AllowedComponentProps & Vue.ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
export declare const style: HTMLElement;
