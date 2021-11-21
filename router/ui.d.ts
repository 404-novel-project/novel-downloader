interface UIObject {
    type: "jump" | "download" | "error";
    jumpFunction?: () => void;
}
export declare function getUI(): () => UIObject;
export {};
