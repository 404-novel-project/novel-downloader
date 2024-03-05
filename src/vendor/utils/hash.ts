// SPDX-License-Identifier: AGPL-3.0-or-later

import { Hex, WordArray } from "crypto-es/lib/core";
import { SHA256 } from "crypto-es/lib/sha256";

type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

/** @internal */
async function sha256BufferByNaive(messgae: ArrayBuffer | TypedArray) {
  const hashBuffer = await crypto.subtle.digest("SHA-256", messgae);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

/** @internal */
function sha256BufferByCryptoES(messgae: ArrayBuffer | TypedArray) {
  // structuredClone 用于修复在 Firefox 中 Hash 值计算错误的问题
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1681809
  messgae = structuredClone(messgae);
  const messageWordArray = WordArray.create(messgae);
  const hashWordArray = SHA256(messageWordArray);
  const hashHex = Hex.stringify(hashWordArray);
  return hashHex;
}

/** @internal */
async function sha256StringByNaive(messgae: string) {
  const msgUint8 = new TextEncoder().encode(messgae);
  return await sha256BufferByNaive(msgUint8);
}

/** @internal */
function sha256StringByCryptoES(messgae: string) {
  const hashWordArray = SHA256(messgae);
  const hashHex = Hex.stringify(hashWordArray);
  return hashHex;
}

/**
 * 计算 Buffer 对象 SHA-256 值
 * @internal
 */
async function sha256Buffer(messgae: ArrayBuffer | TypedArray) {
  try {
    return sha256BufferByNaive(messgae);
  } catch (error) {
    return sha256BufferByCryptoES(messgae);
  }
}

/**
 * 计算字符串 SHA-256 值
 * @internal
 */
async function sha256String(messgae: string) {
  try {
    return sha256StringByNaive(messgae);
  } catch (error) {
    return sha256StringByCryptoES(messgae);
  }
}

/**
 * 计算 Blob 对象 SHA-256 值
 * @internal
 */
async function sha256Blob(messgae: Blob) {
  const msgUint8 = await messgae.arrayBuffer();
  return await sha256Buffer(msgUint8);
}

/**
 * 计算消息 SHA-256 值
 * @public
 */
export function sha256(messgae: string | Blob | ArrayBuffer | TypedArray) {
  if (typeof messgae === "string") {
    return sha256String(messgae);
  } else {
    if (messgae instanceof Blob) {
      return sha256Blob(messgae);
    } else {
      return sha256Buffer(messgae as ArrayBuffer | TypedArray);
    }
  }
}

/**
 * sha256 单元测试
 * @internal
 */
export async function test() {
  const { testFactory } = await import("./test");

  return testFactory("sha256", async (t) => {
    const msg = "0123456789";
    const msgUint8 = new TextEncoder().encode(msg);
    const msgBlob = new Blob([msg]);

    console.log("msgUint8 instanceof Uint8Array:", msgUint8 instanceof Uint8Array);
    console.log("msgBlob instanceof Blob:", msgBlob instanceof Blob);
    console.log(
      "structuredClone(msgUint8) instanceof Uint8Array:",
      structuredClone(msgUint8) instanceof Uint8Array,
    );

    t.equal(
      await sha256StringByNaive(msg),
      "84d89877f0d4041efb6bf91a16f0248f2fd573e6af05c19f96bedb9f882f7882",
    );

    t.equal(
      await sha256StringByNaive(msg),
      sha256StringByCryptoES(msg),
      "sha256StringByNaive vs sha256StringByCryptoES",
    );
    t.equal(
      await sha256StringByNaive(msg),
      await sha256BufferByNaive(msgUint8),
      "sha256StringByNaive vs sha256BufferByNaive",
    );
    t.equal(
      await sha256StringByNaive(msg),
      sha256BufferByCryptoES(msgUint8),
      "sha256StringByNaive vs sha256BufferByCryptoES",
    );

    t.equal(
      sha256StringByCryptoES(msg),
      await sha256BufferByNaive(msgUint8),
      "sha256StringByCryptoES vs sha256BufferByNaive",
    );
    t.equal(
      sha256StringByCryptoES(msg),
      sha256BufferByCryptoES(msgUint8),
      "sha256StringByCryptoES vs sha256BufferByCryptoES",
    );

    t.equal(
      await sha256BufferByNaive(msgUint8),
      sha256BufferByCryptoES(msgUint8),
      "sha256BufferByNaive vs sha256BufferByCryptoES",
    );

    t.equal(await sha256(msg), await sha256StringByNaive(msg));
    t.equal(await sha256(msg), sha256StringByCryptoES(msg));
    t.equal(await sha256(msg), await sha256BufferByNaive(msgUint8));
    t.equal(await sha256(msg), sha256BufferByCryptoES(msgUint8));

    t.equal(await sha256(msg), await sha256(msgUint8));
    t.equal(await sha256(msg), await sha256(msgBlob));
    t.equal(await sha256(msgUint8), await sha256(msgBlob));
  });
}
