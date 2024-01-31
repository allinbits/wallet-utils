import * as ProxyBindings from "./proxyBindings";

export type ProxyAPI = typeof ProxyBindings;

/**
 * Initialize the window instance with bindings to proxy API functions
 *
 * @export
 * @param { ProxyAPI } globalOrWindow
 */
export function bindToWindow(
  globalOrWindow: typeof globalThis | Window,
  name: string,
) {
  const instance = globalOrWindow as (typeof globalThis | Window) & {
    [key in typeof name]: ProxyAPI;
  };

  instance[name] = ProxyBindings;
}
