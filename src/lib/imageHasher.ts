class ImageHasher {
  private hashSize: number;

  constructor(hashSize: number = 8) {
    this.hashSize = hashSize;
  }

  /**
   * Generates a dHash for a given image blob.
   * @param imageBlob - Image blob to process.
   * @returns A promise that resolves with the binary hash string.
   */
  public async hash(imageBlob: Blob): Promise<string> {
    const grayscalePixels = await this.preprocessImage(imageBlob);
    return this.calculateDHash(grayscalePixels);
  }

  /**
   * Calculates the Hamming distance between two binary hash strings.
   * @param hash1 - The first binary hash string.
   * @param hash2 - The second binary hash string.
   * @returns The Hamming distance.
   */
  public static hammingDistance(hash1: string, hash2: string): number {
    if (hash1.length !== hash2.length) {
      throw new Error("Hashes must be of equal length.");
    }
    const xorResult = BigInt(`0b${hash1}`) ^ BigInt(`0b${hash2}`);
    return (xorResult.toString(2).match(/1/g) || []).length;
  }

  private async preprocessImage(
    imageBlob: Blob,
  ): Promise<Uint8ClampedArray> {
    const image = await this.loadImageFromBlob(imageBlob);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2D canvas context.");

    const scaledWidth = this.hashSize + 1;
    const scaledHeight = this.hashSize;
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

    const imageData = context.getImageData(
      0,
      0,
      scaledWidth,
      scaledHeight,
    ).data;
    const grayscale = new Uint8ClampedArray(scaledWidth * scaledHeight);
    for (let i = 0, j = 0; i < imageData.length; i += 4, j++) {
      grayscale[j] =
        0.299 * imageData[i] +
        0.587 * imageData[i + 1] +
        0.114 * imageData[i + 2];
    }
    return grayscale;
  }

  private calculateDHash(pixels: Uint8ClampedArray): string {
    let hash = "";
    const width = this.hashSize + 1;
    for (let y = 0; y < this.hashSize; y++) {
      for (let x = 0; x < this.hashSize; x++) {
        const left = pixels[y * width + x];
        const right = pixels[y * width + x + 1];
        hash += left < right ? "1" : "0";
      }
    }
    return hash;
  }

  private loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load image from blob`));
      };
      
      img.src = url;
    });
  }
}

export default ImageHasher;
