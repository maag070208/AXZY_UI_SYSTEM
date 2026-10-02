import { FaCheck, FaDesktop, FaLayerGroup, FaTerminal } from "react-icons/fa";
import type { Producto } from "./productos";

/**
 * Ícono de un producto del portafolio.
 *
 * @example
 * ```tsx
 * <ProductoIcono icono="terminal" size={16} />
 * ```
 */
export default function ProductoIcono({
  icono,
  size = 18,
}: {
  /** Ícono declarado en los datos del producto. */
  icono: Producto["icono"];
  /** Tamaño en px. @default 18 */
  size?: number;
}) {
  if (icono === "terminal") return <FaTerminal size={size} />;
  if (icono === "layers") return <FaLayerGroup size={size} />;
  if (icono === "check") return <FaCheck size={size} />;
  return <FaDesktop size={size} />;
}
