/** Allowed file MIME types for the dropzone */
export enum FileTypeEnum {
  PDF = "application/pdf",
  XLS = "application/vnd.ms-excel",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  CSV = "text/csv",
  PNG = "image/png",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
}

/** Upload lifecycle status */
export enum UploadStatus {
  PENDING = "pendiente",
  UPLOADING = "subiendo",
  UPLOADED = "subido",
  ERROR = "error",
}

export interface ITDropfileProps {
  /** Called when a file is selected or cleared. */
  onFileSelect: (file: File | null) => void;
  /** Called when the user cancels the current selection. */
  onCancel?: () => void;
  /** Called when the user confirms and submits the file. */
  onSubmit?: (file: File) => void;
  /** List of accepted MIME types. */
  acceptedFileTypes?: FileTypeEnum[];
  /** Additional classes for the preview/content area. */
  contentClassName?: string;
  /** Additional classes for the outermost container. */
  containerClassName?: string;
  /** Whether to show the status badge (pending/uploading/uploaded/error). */
  showStatusBadge?: boolean;
  /** Externally controlled upload status. */
  uploadStatus?: UploadStatus;
  /** Callback when upload status changes. */
  onStatusChange?: (status: UploadStatus) => void;
  /** An initial preview URL to display before any file is selected. */
  initialPreviewUrl?: string | null;
}
