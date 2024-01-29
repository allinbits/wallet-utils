import { expect, test } from "vitest";
import { toHexString } from ".";

test("Converts to Hex String", () => {
  expect(toHexString([0, 1, 2])).toBe("000102");
});
