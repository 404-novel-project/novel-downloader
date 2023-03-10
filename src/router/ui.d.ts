export interface UIObject {
    type: "jump" | "download" | "error";
    jumpFunction?: () => void;
    isSettingSeen?: boolean;
}
export declare function getUI(): () => UIObject;
