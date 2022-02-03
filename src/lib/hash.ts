import * as CryptoJS from "crypto-js";

export async function calculateSha1(blob: Blob) {
  if (typeof crypto?.subtle?.digest === "function") {
    const arrayBuffer = await blob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-1", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // noinspection UnnecessaryLocalVariableJS
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  } else {
    // https://stackoverflow.com/questions/34492637/how-to-calculate-md5-checksum-of-blob-using-cryptojs
    return new Promise((resolve, rejects) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => {
        if (reader.result) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const wordArray = CryptoJS.lib.WordArray.create(reader.result);
          const hash = CryptoJS.SHA1(wordArray).toString();
          // or CryptoJS.SHA256(wordArray).toString(); for SHA-2
          resolve(hash);
        } else {
          rejects(Error("计算MD5值出错"));
          return;
        }
      };
    });
  }
}
