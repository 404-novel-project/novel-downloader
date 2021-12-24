import * as Vue from "vue";
import { log } from "../log";

globalThis.Function = new Proxy(Function, {
  construct(target, args) {
    const code: string = args[args.length - 1];
    if (code.includes("Vue") && code.includes("_Vue")) {
      log.debug("Function hook:" + code);
      return hookVue();
    } else {
      return new target(...args);
    }

    function hookVue() {
      args[args.length - 1] = "with (Vue) {" + code + "}";
      return new Proxy(new target(...["Vue", ...args]), {
        apply(targetI, thisArg, argumentsList) {
          const newArgumentsList = [Vue, ...argumentsList];
          return Reflect.apply(targetI, thisArg, newArgumentsList);
        },
      });
    }
  },
});
