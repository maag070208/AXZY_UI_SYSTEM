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
      style={muted ? { color: "var(--color-text-muted)", ...style } : { color: "var(--color-text-default)", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
