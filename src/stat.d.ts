interface statData {
    success: {
        [domain: string]: number;
    };
    failed: {
        [domain: string]: number;
    };
}
declare let statData: statData;
export declare const successPlus: () => statData;
export declare const failedPlus: () => statData;
export declare const printStat: () => void;
export declare const resetStat: () => statData;
export {};
