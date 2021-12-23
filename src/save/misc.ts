import { Chapter } from "../main";

export interface SectionObj {
  sectionName: string | null;
  sectionNumber: number | null;
  chpaters: Chapter[];
}
export interface SectionsObj {
  [sectionNumber: number]: SectionObj;
}
export function getSectionsObj(chapters: Chapter[]): SectionObj[] {
  const _sectionsObj: SectionsObj = {};
  for (const chapter of chapters) {
    let sectionNumber: number | null = null;
    // const sectionName: string | null = null;
    if (chapter.sectionNumber && chapter.sectionName) {
      sectionNumber = chapter.sectionNumber;
    } else {
      sectionNumber = -99999999;
    }

    if (_sectionsObj[sectionNumber]) {
      _sectionsObj[sectionNumber].chpaters.push(chapter);
    } else {
      _sectionsObj[sectionNumber] = {
        sectionName: chapter.sectionName,
        sectionNumber: chapter.sectionNumber,
        chpaters: [chapter],
      };
    }
  }
  const _sectionsListObj: [string, SectionObj][] = Object.entries(_sectionsObj);
  function sectionListSort(a: [string, SectionObj], b: [string, SectionObj]) {
    const aKey = parseInt(a[0]);
    const bKey = parseInt(b[0]);
    return aKey - bKey;
  }
  _sectionsListObj.sort(sectionListSort);
  const sectionsListObj = _sectionsListObj.map((s) => s[1]);
  return sectionsListObj;
}
