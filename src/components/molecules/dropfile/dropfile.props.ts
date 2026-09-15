/** Allowed file MIME types for the dropzone */
export enum FileTypeEnum {
  PDF = "application/pdf",
  XLS = "application/vnd.ms-excel",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  CSV = "text/csv",
  PNG = "image/png",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  MP4 = "video/mp4",
  MOV = "video/quicktime",
  AVI = "video/x-msvideo",
  MKV = "video/x-matroska",
  VIDEO_3GPP = "video/3gpp",
  WEBM = "video/webm",
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
  /**
   * Presentation mode. `"drop"` renders the dropzone/preview inline (default,
   * current behavior). `"button"` renders a compact trigger button instead —
   * clicking it opens the same dropzone/preview UI inside an `ITDialog`, so
   * callers don't need to build their own "open a modal" button around
   * `ITDropfile`.
   * @default "drop"
   */
  view?: "drop" | "button";
  /** Label for the trigger button when `view="button"` and no file is selected yet. @default "Subir archivo" */
  buttonLabel?: string;
  /** Title of the modal opened when `view="button"`. Defaults to `buttonLabel`. */
  modalTitle?: string;
}
