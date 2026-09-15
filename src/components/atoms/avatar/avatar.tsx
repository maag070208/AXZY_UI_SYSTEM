import clsx from "clsx";
import { ITAvatarProps, AvatarSize } from "./avatar.props";
import ITText from "@/components/atoms/text/text";

const sizeMap: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: "w-6 h-6", text: "text-[10px]" },
  sm: { container: "w-8 h-8", text: "text-xs" },
  md: { container: "w-10 h-10", text: "text-sm" },
  lg: { container: "w-12 h-12", text: "text-base" },
  xl: { container: "w-16 h-16", text: "text-xl" },
};

const DEFAULT_COLOR = "bg-primary-600";
const DEFAULT_BG = "var(--color-primary-600)";
const DEFAULT_SHADOW = "0 6px 16px -2px rgba(37, 99, 235, 0.25)";

// Un valor tipo "#8b5cf6", "rgb(...)", "hsl(...)" o "var(--...)" se aplica
// como color inline; cualquier otra cosa se trata como clase de Tailwind
// (comportamiento previo, sin romper a quien ya pasa "bg-purple-600" etc.).
// Motivo: esta librería se consume vía un CSS estático pre-compilado
// (ver scripts/build-css.mjs) que solo contiene las clases usadas en el
// código FUENTE de la librería. Si una app consumidora pasa un color de
// Tailwind que la librería nunca usa en ningún otro lado, esa clase no
// existe en el CSS entregado y el avatar se renderiza sin color visible.
// Un valor de color inline no tiene ese problema: siempre se aplica.
const isRawColorValue = (value: string) => /^#|^rgb|^hsl|^var\(/i.test(value.trim());

/**
 * Circular avatar component with image, initials fallback, and optional badge overlay.
 *
 * @example
 * <ITAvatar src="/avatar.jpg" alt="John Doe" size="lg" badge={<span className="w-2.5 h-2.5 bg-success-500 rounded-full" />} />
 *
 * @example
 * <ITAvatar initials="JD" size="md" color="bg-purple-600" />
 *
 * @example
 * // Recomendado cuando el color se calcula en tiempo de ejecución (p.ej. un
 * // hash por usuario/etiqueta): pasa un valor de color real, no una clase.
 * <ITAvatar initials="JD" size="md" color="#8b5cf6" />
 */
export default function ITAvatar({
  src,
  alt = "",
  initials,
  size = "md",
  color = DEFAULT_COLOR,
  className,
  badge,
  onClick,
}: ITAvatarProps) {
  const { container, text } = sizeMap[size];
  const useDefaultStyle = !color || color === DEFAULT_COLOR;
  const useRawColorStyle = !useDefaultStyle && isRawColorValue(color);

  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden text-white font-bold tracking-wide",
        container,
        !useDefaultStyle && !useRawColorStyle && color,
        className,
      )}
      style={
        useDefaultStyle
          ? { backgroundColor: DEFAULT_BG, boxShadow: DEFAULT_SHADOW }
          : useRawColorStyle
          ? { backgroundColor: color }
          : undefined
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span className={clsx("flex items-center justify-center w-full h-full", text)}>
          <ITText as="span" className="text-white">{initials || alt.charAt(0).toUpperCase() || "?"}</ITText>
        </span>
      )}
      {badge && (
        <div className="absolute -bottom-0.5 -right-0.5">
          {badge}
        </div>
      )}
    </div>
  );
}
