import catalogData from "./generated/catalog.json";
import type { Catalog, CatalogComponent, CatalogHook } from "./types";

/** The generated catalog, bundled at build time. */
export const catalog = catalogData as unknown as Catalog;

const componentsByName = new Map<string, CatalogComponent>(
  catalog.components.map((component) => [component.name, component])
);

const hooksByName = new Map<string, CatalogHook>(
  catalog.hooks.map((hook) => [hook.name, hook])
);

/** Display order of the explorer groups. */
export const LAYER_ORDER = ["atoms", "molecules", "organisms", "templates", "others"] as const;

/** Returns a component by export name. */
export function getComponent(name: string): CatalogComponent | undefined {
  return componentsByName.get(name);
}

/** Returns a hook by export name. */
export function getHook(name: string): CatalogHook | undefined {
  return hooksByName.get(name);
}

/** Human-readable label for a layer id. */
export function layerLabel(layer: string): string {
  return catalog.layers[layer] ?? layer.charAt(0).toUpperCase() + layer.slice(1);
}

/** Layers that currently have at least one component, in display order. */
export function populatedLayers(): string[] {
  return LAYER_ORDER.filter((layer) =>
    catalog.components.some((component) => component.layer === layer)
  );
}

/** All component names, sorted. */
export function componentNames(): string[] {
  return catalog.components.map((component) => component.name);
}
