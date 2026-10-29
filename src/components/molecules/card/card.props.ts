/** Pastel tint applied to a card through the `--color-<tone>-soft` token. */
export type ITCardTone =
  | "primary"
  | "secondary"
  | "ternary"
  | "success"
  | "info"
  | "warning"
  | "danger";

export interface ITCardProps {
  /** Pastel tile: tints the card background with the `--color-<tone>-soft` token of the palette, overriding the default white surface. In `soft`/`flat` appearances it also uses `--color-<tone>-soft-border` for the border; in `bento` the card stays borderless. Works in every appearance and in dark mode. Omit it for the regular surface. */
  tone?: ITCardTone;
  /** Click handler. When provided, the card becomes interactive with hover shadow effect. */
  onClick?: () => void;
  /** Card title displayed in the header area. */
  title?: string;
  /** Optional actions rendered at the right of the title row (e.g. a play button). */
  headerActions?: React.ReactNode;
  /** Image source URL displayed at the top of the card. */
  image?: string;
  /** Alt text for the card image. @default "Card Image" */
  alt?: string;
  /** Card body content. Rendered below the title. */
  children?: React.ReactNode;
  /** Action elements rendered in a footer section separated by a border. */
  actions?: React.ReactNode;
  /** Additional CSS class names for the card container. */
  className?: string;
  /** Additional CSS class names for the image element. */
  imageClassName?: string;
  /** Additional CSS class names for the title element. */
  titleClassName?: string;
  /** Additional CSS class names for the content wrapper. */
  contentClassName?: string;
  /** Additional CSS class names for the actions footer. */
  actionClassName?: string;
}
