import { Book, Chapter } from "./main";
import { indexNameSpace } from "./index";
export declare const buttonStyleText = "position: fixed;\ntop: 15%;\nright: 5%;\nz-index: 2147483647;\nborder-style: none;\ntext-align:center;\nvertical-align:baseline;\nbackground-color: rgba(128, 128, 128, 0.2);\npadding: 5px;\nborder-radius: 12px;";
export declare const progressStyleText = "#nd-progress {\n  position: fixed;\n  bottom: 8%;\n  right: 3%;\n  z-index: 2147483647;\n  border-style: none;\n  text-align: center;\n  vertical-align: baseline;\n  background-color: rgba(210, 210, 210, 0.2);\n  padding: 6px;\n  border-radius: 12px;\n}\n#chapter-progress{\n  --color:green;\n  --position:0%;\n  width:200px;\n  height:10px;\n  border-radius:30px;\n  background-color:#ccc;\n  background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));\n  background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));\n  background-size:100% ,var(--position);\n  background-repeat: no-repeat;\n}\n#zip-progress{\n  --color:yellow;\n  --position:0%;\n  width:200px;\n  height:10px;\n  border-radius:30px;\n  background-color:#ccc;\n  background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));\n  background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));\n  background-size:100% ,var(--position);\n  background-repeat: no-repeat;\n  margin-top: 5px;\n}";
export interface saveOptions {
    mainStyleText?: string;
    tocStyleText?: string;
    getchapterName?: (chapter: Chapter) => string;
}
export declare function saveOptionsValidate(data: any): boolean;
export declare function save(book: Book, options: saveOptions): void;
export declare function setTabMark(): Promise<indexNameSpace.mainTabObject>;
export declare function getNowRunNumber(): Promise<number>;
export declare function removeTabMark(): Promise<indexNameSpace.mainTabObject>;
export declare function r18SiteWarning(): boolean;
