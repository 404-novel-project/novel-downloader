import { Chapter } from "../main";
export interface SectionObj {
    sectionName: string | null;
    sectionNumber: number | null;
    chpaters: Chapter[];
}
export interface SectionsObj {
    [sectionNumber: number]: SectionObj;
}
export declare function getSectionsObj(chapters: Chapter[]): SectionObj[];
