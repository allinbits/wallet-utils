/**
 * Safely binds functions to globalThis
 *
 * @example
 * ```ts
 * type bindings = { test: Function };
 *
 * set<bindings>("wallet", bindings);
 * ```
 *
 * @export
 * @template T
 * @param {string} name
 * @param {T} bindings
 */
export function set<T = object>(name: string, bindings: T) {
  (
    globalThis as typeof globalThis & {
      [key in typeof name]: T;
    }
  )[name] = bindings;
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
