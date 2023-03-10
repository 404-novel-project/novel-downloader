import { AttachmentClass } from "../main/Attachment";
import { ReferrerMode } from "../main/main";
export declare function getAttachmentClassCache(url: string): AttachmentClass | undefined;
export declare function putAttachmentClassCache(attachmentClass: AttachmentClass): boolean;
export declare function clearAttachmentClassCache(): void;
export declare function getAttachment(url: string, mode: "naive" | "TM", prefix?: string, noMD5?: boolean, comments?: string, options?: {
    referrerMode?: ReferrerMode;
    customReferer?: string;
}): Promise<AttachmentClass>;
export declare function getRandomName(): string;
export declare function getExt(b: Blob, u: string): Promise<string>;
