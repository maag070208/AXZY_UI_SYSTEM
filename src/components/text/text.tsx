import { ITTextProps } from "./text.props";

/**
 * Semantic typography wrapper that renders any HTML element.
 * Supports muted styling via the `muted` prop and passes through all standard HTML attributes.
 *
 * @example
 * <ITText as="h1" className="text-2xl font-bold">Welcome</ITText>
 *
 * @example
 * <ITText as="label" htmlFor="email" muted>Email Address</ITText>
 */
export default function ITText({
  children,
  as: Tag = "p",
  className = "",
  muted = false,
  style,
  ...rest
}: ITTextProps & { style?: React.CSSProperties }) {
  return (
    <Tag
      className={className}
      style={muted ? { color: "var(--color-text-muted)", ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
