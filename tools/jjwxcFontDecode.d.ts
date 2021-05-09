interface jjwxcFontTable {
    [index: string]: string;
}
interface jjwxcFontTables {
    [index: string]: jjwxcFontTable;
}
declare function replaceJjwxcCharacter(fontName: string, inputText: string): string;
declare const jjwxcFontTables: jjwxcFontTables;
