export declare enum Status {
    pending = 0,
    downloading = 1,
    failed = 2,
    finished = 3,
    aborted = 4,
    saved = 5
}
export declare enum ReferrerMode {
    keep = 0,
    none = 1,
    self = 2,
    custom = 3
}
export declare class ExpectError extends Error {
}
