interface imageTable {
  [index: string]: string;
}

export function replaceHaitangtxtImage(inputText: string) {
  let outputText = inputText;
  for (const imageFilename in imageTable) {
    const normalCharacter = imageTable[imageFilename];
    const imageHTML = `<img src="${document.location.origin}/wzbodyimg/${imageFilename}">`;
    outputText = outputText.replaceAll(imageHTML, normalCharacter);
  }
  return outputText;
}

const imageTable: imageTable = {};
