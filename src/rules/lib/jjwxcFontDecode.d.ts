export declare function replaceJjwxcCharacter(fontName: string, inputText: string): Promise<string>;
interface JjwxcFontTable {
    [index: string]: string;
}
export declare function buildFontTableViaOCR(fontName: string, inputText: string): Promise<JjwxcFontTable | undefined>;
export {};
