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
  /** Background color class for the initials fallback. @default "bg-primary-600" */
  color?: string;
  /** Additional CSS class names for the avatar container. */
  className?: string;
  /** React node rendered as a badge overlay at the bottom-right corner. */
  badge?: ReactNode;
  /** Click handler. When provided, the avatar becomes interactive (role="button"). */
  onClick?: () => void;
}
