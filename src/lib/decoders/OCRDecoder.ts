import { log } from "../../log";
import { gfetch } from "../http";
import { _GM_setValue, _GM_getValue } from "../GM";
import * as eSearchOCR from "@oovz/esearch-ocr";
import * as ort from "onnxruntime-web";
import { unzipSync } from "fflate";

/**
 * OCR decoder for extracting text from images using PaddleOCR
 * Models are downloaded from GitHub releases and cached permanently in GM storage
 */
export class OCRDecoder {
  private modelLoaded = false;
  private loadingPromise: Promise<void> | null = null;
  private ocrEngine: any = null;
  private modelCache: { [key: string]: Blob } = {};
  private ppocrDict: string = "";

  private readonly cacheKey = "paddleocr_ch_models";
  private readonly cacheVersion = "4.0.0";
  private readonly cacheVersionKey = "paddleocr_ch_models_version";
  private readonly zipUrl = "https://github.com/xushengfeng/eSearch-OCR/releases/download/4.0.0/ch.zip";
  private readonly filesToExtract = ["ppocr_keys_v1.txt", "ppocr_det.onnx", "ppocr_rec.onnx"];

  constructor() {
    // No initialization needed
  }

  /**
   * Decode image to text using PaddleOCR
   */
  async decode(imageData: Uint8Array): Promise<string | null> {
    try {
      await this.ensureModelLoaded();
      
      if (!this.modelLoaded || !this.ocrEngine) {
        throw new Error("PaddleOCR model not available for decoding");
      }

      // Convert Uint8Array to ImageData
      const imageDataObj = await this.uint8ArrayToImageData(imageData);
      if (!imageDataObj) {
        throw new Error("Failed to convert image data for OCR");
      }

      // Extract text using PaddleOCR
      const result = await this.ocrEngine.ocr(imageDataObj);
      
      if (result && result.parragraphs && result.parragraphs.length > 0) {
        // Find the result with highest confidence
        let bestResult = result.parragraphs[0];
        for (const paragraph of result.parragraphs) {
          if (paragraph.mean && paragraph.mean > (bestResult.mean || 0)) {
            bestResult = paragraph;
          }
        }

        // Clean up the OCR result for single character extraction
        const cleanText = bestResult.text
          .trim()
          .replace(/\s+/g, "") // Remove all whitespace
          .replace(/[^\u4e00-\u9fff\u3400-\u4dbf\u3000-\u303f\uff00-\uffef]/g, ""); // Keep only Chinese characters

        if (cleanText.length > 0) {
          const firstChar = cleanText.charAt(0);
          log.debug(`OCR confidence: ${Math.round((bestResult.mean || 0) * 100)}%, extracted char: "${firstChar}"`);
          return firstChar;
        }
      }

      log.debug("No meaningful character found in OCR result");
      return null;
    } catch (error) {
      log.error("Error in PaddleOCR decoding:", error);
      throw error; // Fail fast - no fallback
    }
  }

  /**
   * Check if OCR is available
   */
  isAvailable(): boolean {
    return this.modelLoaded && this.ocrEngine !== null;
  }

  /**
   * Get OCR model information
   */
  getModelInfo(): { name: string; version: string; loaded: boolean } {
    return {
      name: "PaddleOCR",
      version: this.cacheVersion,
      loaded: this.modelLoaded
    };
  }

  /**
   * Close and cleanup OCR resources
   */
  async close(): Promise<void> {
    this.ocrEngine = null;
    this.modelLoaded = false;
    this.loadingPromise = null;
    log.debug("PaddleOCR engine closed and cleaned up");
  }

  /**
   * Clear all cached OCR data from GM storage
   */
  async clearModelCache(): Promise<void> {
    try {
      await _GM_setValue(this.cacheKey, null);
      await _GM_setValue(this.cacheVersionKey, null);
      
      // Clear in-memory cache
      this.modelCache = {};
      this.ppocrDict = "";
      this.modelLoaded = false;
      this.ocrEngine = null;
      this.loadingPromise = null;
      
      log.debug("Cleared all OCR model cache data");
    } catch (error) {
      log.error("Failed to clear OCR model cache:", error);
    }
  }

  /**
   * Ensure OCR model is loaded
   */
  private async ensureModelLoaded(): Promise<void> {
    if (this.modelLoaded) {
      return;
    }

    if (this.loadingPromise) {
      await this.loadingPromise;
      return;
    }

    this.loadingPromise = this.loadModel();
    await this.loadingPromise;
  }

  /**
   * Load PaddleOCR model and initialize engine
   */
  private async loadModel(): Promise<void> {
    try {
      log.debug("Loading PaddleOCR model...");
      
      if (!eSearchOCR || !ort) {
        throw new Error(
          "PaddleOCR dependencies not loaded. Ensure esearch-ocr and onnxruntime-web are included via script tags."
        );
      }

      // Configure ONNX Runtime Web to use CDN paths for WASM files
      this.configureONNXRuntime();

      // Download and cache models first
      await this.downloadAndCacheModels();

      // Load the dictionary content
      const dictContent = await this.loadPaddleOCRDict();

      const detModel = this.modelCache["ppocr_det.onnx"];
      const recModel = this.modelCache["ppocr_rec.onnx"];

      if (!detModel || !recModel) {
        throw new Error("Failed to download required PaddleOCR models");
      }

      log.debug("Initializing PaddleOCR engine...");
      
      this.ocrEngine = await eSearchOCR.init({
        det: {
          input: await detModel.arrayBuffer(), // Detection model ArrayBuffer
          ratio: 2.0, // Original image is too small, use 2.0 to upscale
        },
        rec: {
          input: await recModel.arrayBuffer(), // Recognition model ArrayBuffer
          decodeDic: dictContent, // Dictionary content
          optimize: {
            space: false, // v3 v4识别时英文空格不理想，但v5得到了改善，默认为true，需要传入false来关闭
          },
        },
        dev: false, // Set to true for debugging
        ort: ort,
      });

      this.modelLoaded = true;
      log.debug("PaddleOCR engine initialized successfully");
    } catch (error) {
      log.error("Failed to load PaddleOCR model:", error);
      this.modelLoaded = false;
      this.ocrEngine = null;
      throw error;
    }
  }

  /**
   * Configure ONNX Runtime Web to use correct paths for WASM files
   */
  private configureONNXRuntime(): void {
    try {
      // Set the correct base path for ONNX Runtime WASM files
      ort.env.wasm.wasmPaths = "https://unpkg.com/onnxruntime-web@1.22.0/dist/";

      // Multi-thread has 1) limited support in browsers, 2) has CORS issue getting wasm
      // If we want to use multi-thread, we need to dynamically load wasm files to wasmBinary
      ort.env.wasm.numThreads = 1;
      ort.env.wasm.simd = true; // Enable SIMD if available

      // Set log level for debugging
      ort.env.logLevel = "info";

      log.debug(
        "ONNX Runtime Web configured with WASM paths:",
        ort.env.wasm.wasmPaths
      );
    } catch (error) {
      log.warn("Failed to configure ONNX Runtime:", error);
    }
  }

  /**
   * Download and cache PaddleOCR models from GitHub
   */
  private async downloadAndCacheModels(): Promise<void> {
    try {
      // Check if we already have the models cached and up to date
      const storedVersion = await _GM_getValue(this.cacheVersionKey, null);
      const cachedModels = await _GM_getValue(this.cacheKey, null);

      if (storedVersion === this.cacheVersion && cachedModels) {
        const parsedCache = JSON.parse(cachedModels as string);
        // Convert base64 back to blobs and store in memory cache
        for (const [filename, base64Data] of Object.entries(parsedCache)) {
          if (typeof base64Data === "string") {
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            this.modelCache[filename] = new Blob([bytes]);
          }
        }
        log.debug("Loaded models from browser cache");
        return;
      } else {
        // Clear old cache if version mismatch
        log.debug(
          `Cache version mismatch, clearing old cache: ${storedVersion} vs ${this.cacheVersion}`
        );
        await _GM_setValue(this.cacheKey, null);
        await _GM_setValue(this.cacheVersionKey, null);
        this.modelCache = {}; // Reset in-memory cache
        log.debug("Cleared old model cache");
      }
    } catch (error) {
      log.warn("Failed to load from cache, will download fresh:", error);
    }

    // Download zip file using attachment system
    log.debug("Downloading PaddleOCR models from GitHub...");

    const cacheData: { [key: string]: string } = {};

    try {
      log.debug(`Downloading from ${this.zipUrl}...`);

      // Use gfetch to download the zip file (no attachment system)
      const response = await gfetch(this.zipUrl, {
        responseType: "blob",
        method: "GET"
      });

      if (response.status !== 200 || !response.response) {
        throw new Error(`Failed to download ZIP: HTTP ${response.status} ${response.statusText}`);
      }

      const zipBlob = response.response as Blob;
      log.debug("Successfully downloaded zip file using gfetch");
      log.debug(`Downloaded ${zipBlob.size} bytes`);

      // Extract files from the zip using fflate
      await this.extractZipFiles(zipBlob, cacheData);

      // Cache whatever we managed to download
      if (Object.keys(cacheData).length > 0) {
        try {
          await _GM_setValue(this.cacheKey, JSON.stringify(cacheData));
          await _GM_setValue(this.cacheVersionKey, this.cacheVersion);
          log.debug(
            `Cached ${Object.keys(cacheData).length} files successfully`
          );
        } catch (cacheError) {
          log.warn("Failed to cache models (GM storage full?):", cacheError);
        }
      }
    } catch (error) {
      log.error("Failed to download models:", error);
      throw error; // Fail fast - no fallback
    }
  }

  /**
   * Extract files from zip blob using fflate
   */
  private async extractZipFiles(
    zipBlob: Blob,
    cacheData: { [key: string]: string },
  ): Promise<void> {
    try {
      log.debug("Extracting files from zip...");

      // Convert blob to Uint8Array for fflate processing
      const zipArrayBuffer = await zipBlob.arrayBuffer();
      const zipData = new Uint8Array(zipArrayBuffer);

      // Extract files using fflate with file filtering
      const extracted = unzipSync(zipData, {
        filter: (file) => this.filesToExtract.includes(file.name)
      });

      log.debug(`Found ${Object.keys(extracted).length} matching files in zip`);

      for (const [filename, fileData] of Object.entries(extracted)) {
        log.debug(`Processing ${filename}...`);

        // Create blob from extracted file data
        const blob = new Blob([fileData]);
        this.modelCache[filename] = blob;

        // Check file size before processing
        if (fileData.length > 50 * 1024 * 1024) {
          // 50MB limit
          log.warn(
            `File ${filename} is very large (${(fileData.length / 1024 / 1024).toFixed(1)}MB), skipping GM storage cache`
          );
          // Store in memory cache only for very large files
          continue;
        }

        try {
          // Use chunked conversion to avoid stack overflow for large files
          const binaryString = this.uint8ArrayToBinaryString(fileData);
          cacheData[filename] = btoa(binaryString);
        } catch (conversionError) {
          log.warn(
            `Failed to convert ${filename} to base64, skipping GM storage cache:`,
            conversionError
          );
          // Continue without caching this file
        }

        log.debug(
          `Extracted ${filename} (${blob.size} bytes)`
        );
      }

      log.debug(
        `Successfully extracted ${Object.keys(cacheData).length} files from zip`
      );
    } catch (error) {
      log.error("Failed to extract zip files:", error);
      throw error;
    }
  }

  /**
   * Convert Uint8Array to binary string using chunked approach to avoid stack overflow
   */
  private uint8ArrayToBinaryString(uint8Array: Uint8Array): string {
    const chunkSize = 8192; // Process 8KB chunks to avoid stack overflow
    let binaryString = "";

    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      // Use Array.from with smaller chunks to avoid stack overflow
      binaryString += String.fromCharCode.apply(null, Array.from(chunk));
    }

    return binaryString;
  }

  /**
   * Load PaddleOCR dictionary from cached models
   */
  private async loadPaddleOCRDict(): Promise<string> {
    if (this.ppocrDict) {
      return this.ppocrDict;
    }

    try {
      // First ensure models are downloaded and cached
      await this.downloadAndCacheModels();

      // Get dictionary from cache
      const dictBlob = this.modelCache["ppocr_keys_v1.txt"];
      if (!dictBlob) {
        throw new Error("Dictionary not found in cached models");
      }

      this.ppocrDict = await dictBlob.text();
      log.debug(
        `Loaded PaddleOCR dictionary from cache with ${this.ppocrDict.split("\n").length} entries`
      );
      return this.ppocrDict;
    } catch (error) {
      log.error("Failed to load PaddleOCR dictionary from cache:", error);
      throw error; // Fail fast - no fallback
    }
  }

  /**
   * Convert Uint8Array to ImageData for PaddleOCR processing
   */
  private async uint8ArrayToImageData(uint8Array: Uint8Array): Promise<ImageData | null> {
    try {
      // Create a blob from the Uint8Array
      const blob = new Blob([uint8Array]);
      
      // Create an image element and load the blob
      const img = new Image();
      const imageLoadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });
      
      img.src = URL.createObjectURL(blob);
      await imageLoadPromise;

      // Create a canvas and draw the image with white background
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Cannot get canvas 2D context");
      }

      // Calculate scaled dimensions (minimum 4x scale, at least 120x120)
      const scaleX = Math.max(4, Math.ceil(120 / img.width));
      const scaleY = Math.max(4, Math.ceil(120 / img.height));
      const scale = Math.max(scaleX, scaleY);
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      
      // Fill with white background to handle transparent images
      ctx.fillStyle = "#ffffff"; 
      ctx.fillRect(0, 0, scaledWidth, scaledHeight);
      
      // Draw the image scaled up on top of the white background
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      
      log.debug(`Image scaled from ${img.width}x${img.height} to ${scaledWidth}x${scaledHeight} (${scale}x scale)`);

      // Get ImageData from canvas
      const imageData = ctx.getImageData(0, 0, scaledWidth, scaledHeight);
      
      // Clean up the object URL
      URL.revokeObjectURL(img.src);
      
      return imageData;
    } catch (error) {
      log.error("Error converting Uint8Array to ImageData:", error);
      return null;
    }
  }
}
