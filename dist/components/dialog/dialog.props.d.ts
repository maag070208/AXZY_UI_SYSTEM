export interface ITDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
    useFormHeader?: boolean;
}
