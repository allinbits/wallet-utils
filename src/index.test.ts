import * as bindings from "./binder";
import { expect, test } from "vitest";

declare global {
  // eslint-disable-next-line no-var
  var wallet: typeof testBindings;
}

const testBindings = {
  test1() {},
  test2() {},
  test3() {},
};

let index = 0;

class Test {
  private id = 0;

  constructor() {
    this.id = index;
    index += 1;
  }

  getId() {
    return this.id;
  }
}

test("test binding to 'window' or 'global' variables with object", () => {
  const bindingName = "wallet";

  const target = typeof window !== "undefined" ? window : global;

  expect(typeof target).not.toBe("undefined");
  expect(Object.hasOwn(target, bindingName)).toBe(false);

  bindings.setObject(bindingName, testBindings);

  expect(typeof target[bindingName]).not.toBe("undefined");

  const result = bindings.get<typeof testBindings>(bindingName);
  expect(typeof result.test1).toBe("function");
  expect(typeof result.test2).toBe("function");
  expect(typeof result.test3).toBe("function");
});

test("test binding to 'window' or 'global' variables with class", () => {
  const bindingName = "wallet";

  // Bindings testing
  const testClass = new Test();
  expect(testClass.getId() === 0).toBe(true);
  const testClass2 = new Test();
  expect(testClass2.getId() === 1).toBe(true);

  bindings.setClass(bindingName, testClass);

  const target = typeof window !== "undefined" ? window : global;
  expect(typeof target[bindingName]).not.toBe("undefined");

  const result = bindings.get<Test>(bindingName);
  expect(typeof result.getId).toBe("function");
  expect(result.getId() === 0).toBe(true);
});
