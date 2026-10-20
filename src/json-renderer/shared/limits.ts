/**
 * Presupuestos del motor.
 *
 * Un esquema puede venir de un modelo que alucina o de un backend con un bug: el
 * motor no puede confiar en que el árbol sea razonable. Estos techos son la red
 * que evita que una pantalla congele el hilo o agote la memoria.
 */

/** Techos de trabajo del motor. */
export interface EngineLimits {
  /** Número máximo de nodos que se pintan en una pantalla. @default 5000 */
  maxNodes: number;
  /** Profundidad máxima de anidación. @default 40 */
  maxDepth: number;
  /** Milisegundos de trabajo por fragmento de stream antes de diferir al siguiente frame. @default 8 */
  maxMsPerChunk: number;
  /** Milisegundos máximos de una acción antes de considerarla colgada. @default 15000 */
  actionTimeoutMs: number;
  /** Profundidad máxima de encadenado de efectos (`then`/`onError`). @default 5 */
  maxEffectChain: number;
}

/** Presupuesto por defecto. */
export const DEFAULT_LIMITS: EngineLimits = {
  maxNodes: 5000,
  maxDepth: 40,
  maxMsPerChunk: 8,
  actionTimeoutMs: 15000,
  maxEffectChain: 5,
};

/** Resuelve un presupuesto parcial sobre los valores por defecto. */
export function resolveLimits(overrides: Partial<EngineLimits> = {}): EngineLimits {
  const merged: EngineLimits = { ...DEFAULT_LIMITS, ...overrides };
  for (const [key, value] of Object.entries(merged) as [keyof EngineLimits, number][]) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`Límite inválido: ${key} = ${String(value)}`);
    }
  }
  return merged;
}

/** Consumidor de presupuesto: cuenta nodos y profundidad y avisa al agotarse. */
export interface LimitTracker {
  /** Registra un nodo en la profundidad indicada. `false` si ya no cabe. */
  visit(depth: number): boolean;
  /** Nodos contados hasta ahora. */
  readonly nodes: number;
  /** Profundidad máxima vista. */
  readonly deepest: number;
  /** `true` cuando se agotó el presupuesto y se recortó el árbol. */
  readonly exceeded: boolean;
}

/**
 * Crea un consumidor de presupuesto para un render.
 *
 * @example
 * const tracker = createLimitTracker({ maxNodes: 100 });
 * tracker.visit(0); // true
 */
export function createLimitTracker(limits: EngineLimits = DEFAULT_LIMITS): LimitTracker {
  let nodes = 0;
  let deepest = 0;
  let exceeded = false;

  return {
    visit(depth: number) {
      if (depth > deepest) deepest = depth;
      if (nodes >= limits.maxNodes || depth > limits.maxDepth) {
        exceeded = true;
        return false;
      }
      nodes += 1;
      return true;
    },
    get nodes() {
      return nodes;
    },
    get deepest() {
      return deepest;
    },
    get exceeded() {
      return exceeded;
    },
  };
}
