interface ImageTable {
  [index: string]: string;
}

export function replaceHaitangtxtImage(inputText: string) {
  let outputText = inputText;
  for (const imageFilename in imageTable) {
    if (Object.prototype.hasOwnProperty.call(imageTable, imageFilename)) {
      const normalCharacter = imageTable[imageFilename];
      const imageHTML = `<img src="${document.location.origin}/wzbodyimg/${imageFilename}">`;
      outputText = outputText.replaceAll(imageHTML, normalCharacter);
    }
  }
  return outputText;
}

const imageTable: ImageTable = {};
