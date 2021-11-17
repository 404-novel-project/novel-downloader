interface UIObject {
    type: "jump" | "download" | "error";
    jumpUrl?: string;
}
export declare function getUI(): UIObject;
export {};
