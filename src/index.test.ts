import { ProxyAPI, bindToWindow } from "./extension";
import { expect, test } from "vitest";

declare global {
  var wallet: ProxyAPI;
}

test("test binding to 'window' or 'global' variables", () => {
  const target = typeof window !== "undefined" ? window : global;

  expect(typeof target).not.toBe("undefined");
  expect(Object.hasOwn(target, "wallet")).toBe(false);

  bindToWindow(target, "wallet");

  expect(typeof target.wallet).not.toBe("undefined");

  expect(typeof target.wallet?.test1).toBe("function");
  expect(typeof target.wallet?.test2).toBe("function");
  expect(typeof target.wallet?.test3).toBe("function");
});
