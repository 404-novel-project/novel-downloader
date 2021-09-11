import { attachmentClass } from "../main";
export declare function getAttachmentClassCache(url: string): attachmentClass | undefined;
export declare function putAttachmentClassCache(attachmentClass: attachmentClass): boolean;
export declare function clearAttachmentClassCache(): void;
export declare function getImageAttachment(url: string, imgMode?: "naive" | "TM", prefix?: string, noMD5?: boolean): Promise<attachmentClass>;
