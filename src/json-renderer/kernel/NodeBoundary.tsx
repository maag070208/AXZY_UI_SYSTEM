import React from "react";
import { JsonEngineError } from "../shared/errors";

/** Props de `NodeBoundary`. */
export interface NodeBoundaryProps {
  /** Ruta del nodo dentro del esquema, para el aviso. */
  path: string;
  /** Qué pintar si el subárbol falla. */
  fallback?: React.ReactNode;
  /** Se llama con el error y su ruta para acumularlo en el informe. */
  onError?: (error: Error, path: string) => void;
  /** Subárbol del nodo. */
  children: React.ReactNode;
}

/** Estado interno del boundary. */
interface NodeBoundaryState {
  failed: boolean;
}

/**
 * Aísla el fallo de un nodo: si un componente del catálogo lanza durante el
 * render, solo se pierde ese subárbol y el resto de la pantalla sigue viva
 * (aviso `JR012`).
 *
 * @example
 * <NodeBoundary path="content[0]" fallback={<p>No se pudo pintar</p>}>
 *   <ITCard />
 * </NodeBoundary>
 */
export class NodeBoundary extends React.Component<NodeBoundaryProps, NodeBoundaryState> {
  state: NodeBoundaryState = { failed: false };

  static getDerivedStateFromError(): NodeBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error): void {
    this.props.onError?.(error, this.props.path);
  }

  render(): React.ReactNode {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

/** Extrae un `Error` de cualquier valor lanzado. */
export function asError(value: unknown): Error {
  if (value instanceof Error) return value;
  if (value instanceof JsonEngineError) return value;
  return new Error(typeof value === "string" ? value : "Fallo desconocido al pintar el nodo");
}
