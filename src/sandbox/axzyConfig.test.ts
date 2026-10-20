import { describe, expect, it } from "vitest";
import { DEFAULT_AXZY_CONFIG, mergeAxzyConfig } from "./axzyConfig";

describe("axzy.json", () => {
  it("sin archivo devuelve los defaults", () => {
    expect(mergeAxzyConfig(null)).toEqual(DEFAULT_AXZY_CONFIG);
    expect(mergeAxzyConfig(undefined)).toEqual(DEFAULT_AXZY_CONFIG);
  });

  it("acepta los valores válidos", () => {
    const config = mergeAxzyConfig({ radius: 0, density: 1.4, shadow: 3, appearance: "flat", showFab: true });
    expect(config.radius).toBe(0);
    expect(config.density).toBe(1.4);
    expect(config.shadow).toBe(3);
    expect(config.appearance).toBe("flat");
    expect(config.showFab).toBe(true);
  });

  it("recorta fuera de rango en vez de romper", () => {
    const config = mergeAxzyConfig({ density: 9, radius: 99, shadow: -3 });
    expect(config.density).toBe(1.5);
    expect(config.radius).toBe(24);
    expect(config.shadow).toBe(0);
  });

  it("ignora tipos raros y conserva el resto", () => {
    const config = mergeAxzyConfig({ density: "alta", radius: null, appearance: "neón", theme: { primary: 42, danger: "#000" } });
    expect(config.density).toBe(DEFAULT_AXZY_CONFIG.density);
    expect(config.radius).toBe(DEFAULT_AXZY_CONFIG.radius);
    expect(config.appearance).toBe("soft");
    expect(config.theme).toEqual({ danger: "#000" });
  });

  it("mezcla la paleta con los defaults sin perder claves", () => {
    const config = mergeAxzyConfig({ theme: { primary: "#111", table: { rowBg: "#fff" } } });
    expect(config.theme.primary).toBe("#111");
    expect(config.theme.table).toEqual({ rowBg: "#fff" });
    expect(config.theme.danger).toBeUndefined();
  });
});
