declare class ImageHasher {
    private hashSize;
    constructor(hashSize?: number);
    hash(imageBlob: Blob): Promise<string>;
    static hammingDistance(hash1: string, hash2: string): number;
    private preprocessImage;
    private calculateDHash;
    private loadImageFromBlob;
}
export default ImageHasher;
