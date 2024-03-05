// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable @typescript-eslint/no-explicit-any */
// https://github.com/jessetane/tap-esm#api
declare module "tap-esm" {
  export interface TestCase {
    (test: Test): void | Promise<void>;
  }
  interface Test {
    /**
     * Declares that n assertions should be run.
     * t.end() will be called automatically after the nth assertion.
     * If there are any more assertions after the nth, or after t.end() is called, they will generate errors.
     */
    plan(n: number): void;
    /**
     * Declares the end of a test explicitly.
     */
    end(): void;
    /**
     * Generates a passing assertion with optional message.
     */
    pass(message?: string): void;
    /**
     * Generates a failing assertion.
     */
    fail(message?: string): void;
    /**
     * Asserts that `value` is truthy.
     */
    ok(value: any, message?: string): void;
    /**
     * Inverse of `t.ok()`.
     */
    notOk(value: any, message?: string): void;
    /**
     * Asserts that `actual` and `expected` are strictly equal.
     */
    equal(actual: any, expected: any, message?: string): void;
    /**
     * Wraps `actual` and `expected` with `Array.from()` and then asserts the resulting lengths
     * and all contained items are strictly equal.
     * Note that this method does not recurse nested arrays.
     */
    arrayEqual(actual: any, expected: any, message?: string): void;
    /**
     * Inverse of `t.arrayEqual()`.
     */
    notArrayEqual(actual: any, expected: any, message?: string): void;
  }

  interface Tap {
    (name: string, test: TestCase): void;
    onFinish(err: null | Error): void | Promise<void>;
  }
  const tap: Tap;
  export default tap;
}
