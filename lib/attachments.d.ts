import { AttachmentClass as attachmentClassType } from "../main";
export declare function getAttachmentClassCache(url: string): attachmentClassType | undefined;
export declare function putAttachmentClassCache(attachmentClass: attachmentClassType): boolean;
export declare function clearAttachmentClassCache(): void;
export declare function getImageAttachment(url: string, imgMode: "naive" | "TM", prefix?: string, noMD5?: boolean, comments?: string): Promise<attachmentClassType>;
export declare function getRandomName(): string;
