import { PublicConstructor } from "../../lib/misc";
import { BaseRuleClass } from "../../rules";
interface MkRuleClassOptions1 {
    bookUrl: string;
    bookname: string;
    author: string;
    introDom: HTMLElement;
    introDomPatch: (introDom: HTMLElement) => HTMLElement;
    coverUrl: string | null;
    cos: NodeListOf<Element>;
    getContent: (doc: Document) => HTMLElement;
    contentPatch: (content: HTMLElement) => HTMLElement;
}
export declare function mkRuleClass1(optionis: MkRuleClassOptions1): PublicConstructor<BaseRuleClass>;
export {};
