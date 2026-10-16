export type JsonComponentType =
  | "button"
  | "text"
  | "card"
  | "flex"
  | "stack"
  | "grid"
  | "alert"
  | "div";

export interface JsonProps {
  [key: string]: any;
}

export interface JsonComponentNode {
  /** Component type to render */
  type: JsonComponentType;
  /** Props to pass to the component */
  props?: JsonProps;
  /** Children nodes */
  children?: JsonComponentNode[] | React.ReactNode;
  /** Text content (shorthand for text children) */
  text?: string;
}

export interface ITJsonRendererProps {
  /** JSON structure to render */
  json: JsonComponentNode | JsonComponentNode[];
  /** Additional CSS class names */
  className?: string;
}