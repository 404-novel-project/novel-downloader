import { Chapter } from "../main/Chapter";

export interface SectionObj {
  sectionName: string | null;
  sectionNumber: number | null;
  chpaters: Chapter[];
}

export interface SectionsObj {
  [sectionNumber: number]: SectionObj;
}

export function getSectionsObj(
  chapters: Chapter[],
  chapterSort = (a: Chapter, b: Chapter) => a.chapterNumber - b.chapterNumber
): SectionObj[] {
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

  const sectionsListObj: SectionObj[] = Object.values(_sectionsObj);
  sectionsListObj.sort(sectionListSort);
  sectionsListObj.forEach((s) => s.chpaters.sort(chapterSort));
  return sectionsListObj;

  function sectionListSort(a: SectionObj, b: SectionObj) {
    const aChapter = a.chpaters[0];
    const bChapter = b.chpaters[0];
    return chapterSort(aChapter, bChapter);
  }
}
