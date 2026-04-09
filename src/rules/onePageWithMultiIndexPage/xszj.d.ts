type QueryableNode = Pick<ParentNode, "querySelectorAll">;
export declare function getXszjIndexUrlsFromNode(node: QueryableNode | null, baseUrl: string): string[];
export declare const xszj: () => import("../../lib/misc").PublicConstructor<import("../../rules").BaseRuleClass>;
export {};
