// Tiny mime-db replacement covering the file types the downloader actually emits
// (epub/zip output: HTML/CSS/text/xhtml/xml/JS + images + fonts + a few archives).
// Drops the 157 KiB mime-db dep entirely.

interface MimeEntry {
  extensions: string[];
  compressible: boolean;
}

const TABLE: Record<string, MimeEntry> = {
  "application/epub+zip": { extensions: ["epub"], compressible: false },
  "application/json": { extensions: ["json"], compressible: true },
  "application/oebps-package+xml": { extensions: ["opf"], compressible: true },
  "application/octet-stream": { extensions: ["bin"], compressible: false },
  "application/pdf": { extensions: ["pdf"], compressible: false },
  "application/x-dtbncx+xml": { extensions: ["ncx"], compressible: true },
  "application/xhtml+xml": { extensions: ["xhtml", "xht"], compressible: true },
  "application/xml": { extensions: ["xml", "xsl", "xsd"], compressible: true },
  "application/zip": { extensions: ["zip"], compressible: false },
  "font/otf": { extensions: ["otf"], compressible: true },
  "font/ttf": { extensions: ["ttf"], compressible: true },
  "font/woff": { extensions: ["woff"], compressible: false },
  "font/woff2": { extensions: ["woff2"], compressible: false },
  "image/bmp": { extensions: ["bmp"], compressible: true },
  "image/gif": { extensions: ["gif"], compressible: false },
  "image/jpeg": { extensions: ["jpeg", "jpg", "jpe"], compressible: false },
  "image/png": { extensions: ["png"], compressible: false },
  "image/svg+xml": { extensions: ["svg", "svgz"], compressible: true },
  "image/tiff": { extensions: ["tiff", "tif"], compressible: false },
  "image/webp": { extensions: ["webp"], compressible: false },
  "image/x-icon": { extensions: ["ico"], compressible: true },
  "text/css": { extensions: ["css"], compressible: true },
  "text/csv": { extensions: ["csv"], compressible: true },
  "text/html": { extensions: ["html", "htm", "shtml"], compressible: true },
  "text/javascript": { extensions: ["js", "mjs"], compressible: true },
  "text/markdown": { extensions: ["md", "markdown"], compressible: true },
  "text/plain": { extensions: ["txt", "text", "log", "conf", "ini"], compressible: true },
  "text/xml": { extensions: ["xml"], compressible: true },
};

export function extensionToMimetype(ext: string): string {
  if (!ext) return "application/octet-stream";
  const needle = ext.toLowerCase();
  for (const [mimetype, entry] of Object.entries(TABLE)) {
    if (entry.extensions.includes(needle)) return mimetype;
  }
  return "application/octet-stream";
}

export function mimetyepToCompressible(mimeType: string): boolean {
  if (!mimeType) return false;
  const key = mimeType.toLowerCase().split(";")[0].trim();
  return TABLE[key]?.compressible ?? false;
}
