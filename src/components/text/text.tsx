import { ITTextProps } from "./text.props";

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
