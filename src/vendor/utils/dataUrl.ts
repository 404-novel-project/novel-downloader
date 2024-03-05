// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * 将 Bytes 转换为 data: URL
 *
 * 实现参考：{@link https://developer.mozilla.org/en-US/docs/Glossary/Base64#converting_arbitrary_binary_data | MDN}
 * @param bytes -
 * @param type - MIME type
 * @returns
 * @public
 */
export async function bytesToBase64DataUrl(
  bytes: Uint8Array,
  type = "application/octet-stream",
): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => resolve(reader.result as string),
      onerror: () => reject(reader.error),
    });
    reader.readAsDataURL(new File([bytes], "", { type }));
  });
}

/**
 * 将 data: URL 转换为 Bytes
 * @param dataUrl -
 * @returns
 * @public
 */
export async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl);
  return new Uint8Array(await res.arrayBuffer());
}

/**
 * 将 Blob 对象转为 blobUrl 对象
 * @public
 */
export async function blobToDataUrl(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  return await bytesToBase64DataUrl(bytes, blob.type);
}

/**
 * 将 blobUrl 对象转为 Blob 对象
 * @public
 */
export async function dataUrlToBlob(dataUrl: string) {
  const res = await fetch(dataUrl);
  return await res.blob();
}
