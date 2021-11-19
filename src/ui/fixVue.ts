import * as Vue from "vue";
import { log } from "../log";

// @ts-ignore
globalThis.Vue = Vue;
globalThis.Function = new Proxy(Function, {
  construct(target, args) {
    const code: string = args[args.length - 1];
    if (code.includes("Vue") && code.includes("_Vue")) {
      log.debug("Function hook:" + code);
      return hook();
    } else {
      return new target(...args);
    }

    function hook() {
      function getGlobalObjectKeys() {
        const _get = () => {
          return Object.getOwnPropertyNames(window).filter(
            // @ts-ignore
            (key) => window[key] === window
          );
        };
        const _f = new target(`return (${_get.toString()})()`);
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
