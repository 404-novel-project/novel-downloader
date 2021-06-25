import { Book, Chapter } from "./main";
import { indexNameSpace } from "./index";
export declare const buttonStyleText = "position: fixed;\ntop: 15%;\nright: 5%;\nz-index: 2147483647;\nborder-style: none;\ntext-align:center;\nvertical-align:baseline;\nbackground-color: rgba(128, 128, 128, 0.2);\npadding: 5px;\nborder-radius: 12px;";
export declare const progressStyleText = "#nd-progress {\n  position: fixed;\n  bottom: 8%;\n  right: 3%;\n  z-index: 2147483647;\n  border-style: none;\n  text-align: center;\n  vertical-align: baseline;\n  background-color: rgba(210, 210, 210, 0.2);\n  padding: 6px;\n  border-radius: 12px;\n}\n#chapter-progress{\n  --color:green;\n  --position:0%;\n  width:200px;\n  height:10px;\n  border-radius:30px;\n  background-color:#ccc;\n  background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));\n  background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));\n  background-size:100% ,var(--position);\n  background-repeat: no-repeat;\n}\n#zip-progress{\n  --color:yellow;\n  --position:0%;\n  width:200px;\n  height:10px;\n  border-radius:30px;\n  background-color:#ccc;\n  background-image:radial-gradient(closest-side circle at var(--position),var(--color),var(--color) 100%,transparent),linear-gradient(var(--color),var(--color));\n  background-image:-webkit-radial-gradient(var(--position),circle closest-side,var(--color),var(--color) 100%,transparent),-webkit-linear-gradient(var(--color),var(--color));\n  background-size:100% ,var(--position);\n  background-repeat: no-repeat;\n  margin-top: 5px;\n}";
export declare class saveBook {
    protected book: Book;
    private chapters;
    mainStyleText: string;
    tocStyleText: string;
    private savedZip;
    private savedTextArray;
    private saveFileNameBase;
    private _sections;
    constructor(book: Book);
    saveTxt(): void;
    saveZip(runSaveChapters?: boolean): void;
    private saveToC;
    private saveChapters;
    addChapter(chapter: Chapter): void;
    getchapterName(chapter: Chapter): string;
    private genMetaDateTxt;
    private addImageToZip;
    genSectionText(sectionName: string): string;
    genChapterText(chapterName: string, contentText: string): string;
    genSectionHtmlFile(sectionName: string): Blob;
    genChapterHtmlFile(chapterName: string, DOM: HTMLElement, chapterUrl: string): Blob;
    private chapterSort;
}
export interface saveOptions {
    mainStyleText?: saveBook["mainStyleText"];
    tocStyleText?: saveBook["tocStyleText"];
    getchapterName?: saveBook["getchapterName"];
    genSectionText?: saveBook["genSectionText"];
    genChapterText?: saveBook["genChapterText"];
    genSectionHtmlFile?: saveBook["genSectionHtmlFile"];
    genChapterHtmlFile?: saveBook["genChapterHtmlFile"];
}
export declare function saveOptionsValidate(data: any): boolean;
export declare function getSaveBookObj(book: Book, options: saveOptions): saveBook;
export declare function setTabMark(): Promise<indexNameSpace.mainTabObject>;
export declare function getNowRunNumber(): Promise<number>;
export declare function removeTabMark(): Promise<indexNameSpace.mainTabObject>;
export declare function r18SiteWarning(): boolean;
