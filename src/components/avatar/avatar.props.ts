import { ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ITAvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  color?: string;
  className?: string;
  badge?: ReactNode;
  onClick?: () => void;
}
