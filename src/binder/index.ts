/**
 * Safely binds functions to globalThis
 *
 * @example
 * ```ts
 * type bindings = { test: Function };
 *
 * setObject<bindings>("wallet", bindings);
 * ```
 *
 * @export
 * @template T
 * @param {string} name
 * @param {T} bindings
 */
export function setObject<T = object>(name: string, bindings: T) {
  (
    globalThis as typeof globalThis & {
      [key in typeof name]: T;
    }
  )[name] = bindings;
}

/**
 * Safely binds class functions to globalThis
 *
 * @example
 * ```ts
 * class Test {
 *    constructor(){}
 *
 *    test1() {}
 * }
 *
 * setClass('wallet', new Test());
 * ```
 *
 * @export
 * @template T
 * @param {string} name
 * @param {T} bindings
 */
export function setClass<T = object>(name: string, bindings: T) {
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
