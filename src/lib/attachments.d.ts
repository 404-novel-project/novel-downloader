import { AttachmentClass as attachmentClassGlobal } from "../main";
export declare function getAttachmentClassCache(url: string): attachmentClassGlobal | undefined;
export declare function putAttachmentClassCache(attachmentClass: attachmentClassGlobal): boolean;
export declare function clearAttachmentClassCache(): void;
export declare function getImageAttachment(url: string, imgMode?: "naive" | "TM", prefix?: string, noMD5?: boolean, comments?: string): Promise<attachmentClassGlobal>;
