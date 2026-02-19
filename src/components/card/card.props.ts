export interface ITCardProps {
  onClick?: () => void;
  title?: string;
  image?: string;
  alt?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  actionClassName?: string;
}
