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

test("test binding to 'window' or 'global' variables", () => {
  const bindingName = "wallet";

  const target = typeof window !== "undefined" ? window : global;

  expect(typeof target).not.toBe("undefined");
  expect(Object.hasOwn(target, bindingName)).toBe(false);

  bindings.set(bindingName, testBindings);

  expect(typeof target[bindingName]).not.toBe("undefined");

  const result = bindings.get<typeof testBindings>(bindingName);
  expect(typeof result.test1).toBe("function");
  expect(typeof result.test2).toBe("function");
  expect(typeof result.test3).toBe("function");
});
