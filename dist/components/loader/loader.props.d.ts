import { LoaderSize, LoaderVariant } from '../../types/loader.types';
export interface LoaderProps {
    size?: LoaderSize;
    variant?: LoaderVariant;
    color?: string;
    className?: string;
}
