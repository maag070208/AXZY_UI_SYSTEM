/**
 * Preparación común de las pruebas del motor `ITJsonRenderer`.
 *
 * jsdom no implementa `ResizeObserver` (lo usan componentes como `ITJSONEditor`)
 * ni `matchMedia` (lo usa `ITThemeProvider`). Se dejan disponibles para que los
 * fixtures puedan montar cualquier componente del catálogo sin parches por test.
 */

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!("ResizeObserver" in globalThis)) {
  (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverStub;
}

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// `ITJSONEditor` usa `document.fonts`; jsdom no lo trae.
if (!document.fonts) {
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { ready: Promise.resolve(), check: () => true },
  });
}
