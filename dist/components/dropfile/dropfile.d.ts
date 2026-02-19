import { default as React } from '../../../node_modules/react';
/** Enum con tipos de archivo permitidos */
export declare enum FileTypeEnum {
    PDF = "application/pdf",
    XLS = "application/vnd.ms-excel",
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    CSV = "text/csv",
    PNG = "image/png",
    JPG = "image/jpg",
    JPEG = "image/jpeg"
}
/** Enum para el estado de subida */
export declare enum UploadStatus {
    PENDING = "pendiente",
    UPLOADING = "subiendo",
    UPLOADED = "subido",
    ERROR = "error"
}
/** Props del componente */
export interface ITDropfileProps {
    onFileSelect: (file: File | null) => void;
    onCancel?: () => void;
    onSubmit?: (file: File) => void;
    acceptedFileTypes?: FileTypeEnum[];
    contentClassName?: string;
    containerClassName?: string;
    showStatusBadge?: boolean;
    uploadStatus?: UploadStatus;
    onStatusChange?: (status: UploadStatus) => void;
    initialPreviewUrl?: string | null;
}
declare const ITDropfile: React.FC<ITDropfileProps>;
export default ITDropfile;
