export declare const c630shu: {
    new (): {
        imageMode: "naive" | "TM";
        charset: string;
        bookParse(): Promise<import("../../main").Book>;
        chapterParse(chapterUrl: string, chapterName: string | null, isVIP: boolean, isPaid: boolean, charset: string, options: object): Promise<{
            chapterName: string | null;
            contentRaw: HTMLElement;
            contentText: string;
            contentHTML: HTMLElement;
            contentImages: import("../../main").attachmentClass[];
            additionalMetadate: null;
        } | {
            chapterName: string | null;
            contentRaw: null;
            contentText: null;
            contentHTML: null;
            contentImages: null;
            additionalMetadate: null;
        }>;
    };
};
