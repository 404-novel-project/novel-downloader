import * as Vue from "vue";

// @ts-ignore
globalThis.Vue = Vue;
globalThis.Function = new Proxy(Function, {
  construct(target, args) {
    const code: string = args[args.length - 1];
    if (code.includes("Vue") && code.includes("_Vue")) {
      return hook();
    } else {
      return new target(...args);
    }

    function hook() {
      function getGlobalObjectKeys() {
        function _get() {
          const _g = [];
          for (const key of Object.getOwnPropertyNames(window)) {
            // @ts-ignore
            if (window[key] === window) {
              _g.push(key);
            }
          }
          return _g;
        }
        const _f = new target(`${_get.toString()};return _get()`);
        return _f();
      }
      const globalObjectKeys = getGlobalObjectKeys();
      const newArgs = [];
      newArgs.push(...globalObjectKeys);
      args[args.length - 1] = "with (window) {" + code + "}";
      newArgs.push(...args);
      const _newTarget = new target(...newArgs);
      const newTarget = new Proxy(_newTarget, {
        apply(targetI, thisArg, argumentsList) {
          const newArgumentsList = [];
          globalObjectKeys.forEach(() => newArgumentsList.push(window));
          newArgumentsList.push(...argumentsList);
          return Reflect.apply(targetI, window, newArgumentsList);
        },
      });
      return newTarget;
    }
  },
});
