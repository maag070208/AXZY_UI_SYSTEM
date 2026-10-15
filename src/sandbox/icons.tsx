/**
 * Íconos de las familias del catálogo, compartidos por la barra lateral
 * (`App.tsx`) y la landing (`LandingShowcase`) para que la misma familia se vea
 * igual en los dos sitios.
 */

import type { ReactNode } from "react";
import {
  FaBell,
  FaCreditCard,
  FaHome,
  FaKeyboard,
  FaSlidersH,
  FaTable,
} from "react-icons/fa";

/** Ícono por id de grupo (`navigation.ts`). */
export const GROUP_ICONS: Record<string, ReactNode> = {
  general: <FaHome />,
  struc: <FaCreditCard />,
  forms: <FaKeyboard />,
  data: <FaTable />,
  nav: <FaSlidersH />,
  feed: <FaBell />,
};
