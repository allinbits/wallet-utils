/**
 * Safely binds an `object` or `class` to the window instance under a name variable
 *
 * Avoid using `lambda` functions for classes for this to work properly.
 *
 * @example
 * ```ts
 * type bindings = { test: Function };
 *
 * set("wallet", bindings);
 * ```
 *
 * ```ts
 * class Test {
 *    constructor(){}
 *
 *    test1() {}
 * }
 *
 * set("wallet", new Test());
 * ```
 *
 * @export
 * @param {string} name
 * @param {object} bindings
 * @return {*}
 */
export function set(name: string, bindings: object) {
  const isObject = (Object.keys(bindings) as Array<keyof object>).find((key) => typeof bindings[key] === "function");

  if (isObject) {
    (
      globalThis as typeof globalThis & {
        [key in typeof name]: object;
      }
    )[name] = bindings;
    return;
  }

  const target = globalThis as typeof globalThis & {
    [key in typeof name]: object;
  };

  const newBindings: { [key: string]: () => void } = {};
  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(bindings))) {
    if (typeof key !== "string") {
      continue;
    }

    newBindings[key] = (bindings as { [key: string]: () => void })[key].bind(bindings);
  }

  target[name] = newBindings;
}

/**
 * Returns bindings assigned to globalThis
 *
 * @example
 * ```
 * type bindings = { test: Function };
 *
 * const wallet = get<bindings>("wallet");
 * ```
 *
 * @export
 * @template T
 * @param {string} name
 * @return {T}
 */
export function get<T = object>(name: string): T {
  return (
    globalThis as typeof globalThis & {
      [key in typeof name]: T;
    }
  )[name];
}
