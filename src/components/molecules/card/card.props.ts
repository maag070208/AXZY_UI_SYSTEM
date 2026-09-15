export interface ITCardProps {
  /** Click handler. When provided, the card becomes interactive with hover shadow effect. */
  onClick?: () => void;
  /** Card title displayed in the header area. */
  title?: string;
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
