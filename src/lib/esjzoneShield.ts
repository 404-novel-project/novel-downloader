// esjzone.cc 页面静态引入了 core-js 2.4.1 (cdnjs)，其 Symbol/Function polyfill
// 会破坏 TypedArray 构造器的 String(fn) 序列化（core.js:750 ctx 包装器 +
// 替换后的 toString），导致 fflate 在 AsyncZipDeflate 创建 Web Worker 前序列化
// 依赖函数时抛出 "Cannot convert undefined or null to object"。
// 修复：DOMContentLoaded（core.js 已执行完）后为各 TypedArray 构造器补一个
// 干净的 toString，并恢复原生原型方法。
const TYPED_ARRAYS = [
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
];

export function shieldTypedArrays() {
  if (!/(^|\.)esjzone\.(cc|one)$/.test(document.location.host)) {
    return;
  }
  const pristine = new Map<
    string,
    [ctor: unknown, proto: PropertyDescriptorMap]
  >();
  for (const name of TYPED_ARRAYS) {
    const ctor = (globalThis as Record<string, unknown>)[name];
    if (typeof ctor === "function") {
      pristine.set(name, [
        ctor,
        Object.getOwnPropertyDescriptors(
          (ctor as { prototype: object }).prototype
        ),
      ]);
    }
  }
  const restore = () => {
    const g = globalThis as Record<string, unknown>;
    for (const [name, [ctor, proto]] of pristine) {
      if (g[name] !== ctor) {
        g[name] = ctor;
      }
      Object.defineProperties((ctor as { prototype: object }).prototype, proto);
    }
    // core.js 还替换了构造器自身的 toString（经其 ctx 包装器），fflate 序列化
    // worker 依赖时会执行 `"" + Uint8Array`，触发上述报错。补一个原生实现。
    for (const name of TYPED_ARRAYS) {
      const ctor = g[name] as { toString?: () => string };
      if (typeof ctor === "function") {
        try {
          Object.defineProperty(ctor, "toString", {
            value: Function.prototype.toString,
            configurable: true,
            writable: true,
          });
        } catch {
          // ignore
        }
      }
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", restore, { once: true });
  } else {
    restore();
  }
}
