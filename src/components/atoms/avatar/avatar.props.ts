import { ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ITAvatarProps {
  /** Image source URL for the avatar. When provided, displays an `<img>` element. */
  src?: string;
  /** Alt text for the avatar image. Also used as fallback initial when no `initials` or `src` is provided. */
  alt?: string;
  /** Initials to display when no image is available (max 2 characters recommended). */
  initials?: string;
  /** Avatar dimensions. Valid values: `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`. @default "md" */
  size?: AvatarSize;
  /**
   * Color de fondo para el fallback de iniciales. Acepta un valor de color
   * real (`"#8b5cf6"`, `"rgb(...)"`, `"hsl(...)"`, `"var(--...)"`) — se
   * aplica como `style` inline y SIEMPRE se renderiza — o una clase de
   * Tailwind (`"bg-purple-600"`) por compatibilidad con código existente.
   * Una clase de Tailwind solo se ve si esa clase exacta ya existe en el
   * CSS compilado que consume la app (esta librería se distribuye con un
   * CSS estático pre-compilado, ver scripts/build-css.mjs), así que para
   * cualquier color calculado en tiempo de ejecución (p.ej. un hash por
   * usuario) se recomienda pasar el valor de color directamente.
   * @default "bg-primary-600"
   */
  color?: string;
  /** Additional CSS class names for the avatar container. */
  className?: string;
  /** React node rendered as a badge overlay at the bottom-right corner. */
  badge?: ReactNode;
  /** Click handler. When provided, the avatar becomes interactive (role="button"). */
  onClick?: () => void;
}
