import { Chapter } from "../main/Chapter";

export interface SectionObj {
  sectionName: string | null;
  sectionNumber: number | null;
  chpaters: Chapter[];
}

export interface SectionsObj {
  [sectionNumber: number]: SectionObj;
}

/**
 * 生成保存文件名的基名。
 * 作者为空（或只有空白）时不输出空的 `[]` 前缀，例如作者未知的帖子直接存为 `书名.epub`。
 */
export function mkSaveFileNameBase(author: string, bookname: string): string {
  const _author = (author ?? "").trim();
  return _author ? `[${_author}]${bookname}` : bookname;
}

export function getSectionsObj(
  chapters: Chapter[],
  chapterSort = (a: Chapter, b: Chapter) => a.chapterNumber - b.chapterNumber
): SectionObj[] {
  const _sectionsObj: SectionsObj = {};
  for (const chapter of chapters) {
    let sectionNumber: number | null;
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
