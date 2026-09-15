import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
// import pdfjsLib from "@/hooks/pdf"; // Disabled as hook is missing
import clsx from "clsx";
import ITText from "@/components/text/text";
import ITButton from "@/components/button/button";
import ITDialog from "@/components/dialog/dialog";
import { ITDropfileProps, FileTypeEnum, UploadStatus } from "./dropfile.props";
export { FileTypeEnum, UploadStatus } from "./dropfile.props";

/**
 * Drag-and-drop file uploader with preview, status tracking, and confirmation flow.
 *
 * Supports configurable accepted file types (PDF, Excel, CSV, images), visual
 * drag-active feedback, image previews, and a three-step workflow: select →
 * confirm → upload. Upload status is tracked internally or controlled
 * externally via the `uploadStatus` prop. Re-exports `FileTypeEnum` and
 * `UploadStatus` enums for consuming code.
 *
 * @example
 * ```tsx
 * <ITDropfile
 *   onFileSelect={(file) => setSelectedFile(file)}
 *   onSubmit={(file) => uploadToServer(file)}
 *   acceptedFileTypes={[FileTypeEnum.PDF, FileTypeEnum.XLSX]}
 *   showStatusBadge
 * />
 * ```
 *
 * @example
 * Compact trigger button that opens the dropzone in a modal — no need to
 * build your own "open a modal" button around `ITDropfile`:
 * ```tsx
 * <ITDropfile
 *   view="button"
 *   buttonLabel="Subir archivos"
 *   onFileSelect={(file) => setSelectedFile(file)}
 * />
 * ```
 */
const ITDropfile: React.FC<ITDropfileProps> = ({
  onFileSelect,
  onCancel,
  onSubmit,
  contentClassName,
  containerClassName,
  acceptedFileTypes = [FileTypeEnum.PDF, FileTypeEnum.XLS, FileTypeEnum.XLSX, FileTypeEnum.JPG, FileTypeEnum.PNG, FileTypeEnum.JPEG],
  showStatusBadge = true,
  uploadStatus: externalStatus,
  onStatusChange,
  initialPreviewUrl,
  view = "drop",
  buttonLabel = "Subir archivo",
  modalTitle,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  // Initialize preview with prop if available
  const [imagePreview, setImagePreview] = useState<string | null>(initialPreviewUrl || null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  // If initial URL exists, assume uploaded
  const [internalUploadStatus, setInternalUploadStatus] = useState<UploadStatus>(
    initialPreviewUrl ? UploadStatus.UPLOADED : UploadStatus.PENDING
  );
  // Sync initialPreviewUrl if it changes
  useEffect(() => {
    if (initialPreviewUrl && !selectedFile) {
        setImagePreview(initialPreviewUrl);
        if (externalStatus === undefined) setInternalUploadStatus(UploadStatus.UPLOADED);
    }
  }, [initialPreviewUrl, selectedFile, externalStatus]);

  // Determinar qué estado usar (interno o externo)
  const uploadStatus = externalStatus || internalUploadStatus;

  // Función para actualizar el estado
  const setUploadStatus = (status: UploadStatus) => {
    if (externalStatus === undefined) {
      setInternalUploadStatus(status);
    }
    onStatusChange?.(status);
  };

  // 🔹 Configuración correcta para react-dropzone
  const getAcceptedFileTypes = () => {
    const accept: Record<string, string[]> = {};
    
    acceptedFileTypes.forEach(type => {
      switch (type) {
        case FileTypeEnum.PDF:
          accept[FileTypeEnum.PDF] = [".pdf"];
          break;
        case FileTypeEnum.XLS:
          accept[FileTypeEnum.XLS] = [".xls"];
          break;
        case FileTypeEnum.XLSX:
          accept[FileTypeEnum.XLSX] = [".xlsx"];
          break;
        case FileTypeEnum.CSV:
          accept[FileTypeEnum.CSV] = [".csv"];
          break;
        case FileTypeEnum.PNG:
          accept[FileTypeEnum.PNG] = [".png"];
          break;
        case FileTypeEnum.JPG:
          accept[FileTypeEnum.JPG] = [".jpg", ".jpeg"];
          break;
        case FileTypeEnum.JPEG:
          accept[FileTypeEnum.JPEG] = [".jpeg", ".jpg"];
          break;
        case FileTypeEnum.MP4:
          accept[FileTypeEnum.MP4] = [".mp4"];
          break;
        case FileTypeEnum.MOV:
          accept[FileTypeEnum.MOV] = [".mov"];
          break;
        case FileTypeEnum.AVI:
          accept[FileTypeEnum.AVI] = [".avi"];
          break;
        case FileTypeEnum.MKV:
          accept[FileTypeEnum.MKV] = [".mkv"];
          break;
        case FileTypeEnum.VIDEO_3GPP:
          accept[FileTypeEnum.VIDEO_3GPP] = [".3gp"];
          break;
        case FileTypeEnum.WEBM:
          accept[FileTypeEnum.WEBM] = [".webm"];
          break;
      }
    });
    
    return accept;
  };

  // 🔹 Obtener extensiones para mostrar en el label
  const getFileExtensions = () => {
    const extensions: string[] = [];
    
    acceptedFileTypes.forEach(type => {
      switch (type) {
        case FileTypeEnum.PDF:
          if (!extensions.includes("PDF")) extensions.push("PDF");
          break;
        case FileTypeEnum.XLS:
        case FileTypeEnum.XLSX:
          if (!extensions.includes("EXCEL")) extensions.push("EXCEL");
          break;
        case FileTypeEnum.CSV:
          if (!extensions.includes("CSV")) extensions.push("CSV");
          break;
        case FileTypeEnum.PNG:
        case FileTypeEnum.JPG:
        case FileTypeEnum.JPEG:
           if (!extensions.includes("IMAGEN")) extensions.push("IMAGEN");
          break;
        case FileTypeEnum.MP4:
        case FileTypeEnum.MOV:
        case FileTypeEnum.AVI:
        case FileTypeEnum.MKV:
        case FileTypeEnum.VIDEO_3GPP:
        case FileTypeEnum.WEBM:
          if (!extensions.includes("VIDEO")) extensions.push("VIDEO");
          break;
      }
    });
    
    return extensions.join(", ");
  };

  // Componente para el badge de estado
  const StatusBadge = ({ status }: { status: UploadStatus }) => {
    const config = {
      [UploadStatus.PENDING]: {
        label: "Pendiente",
        color: "bg-warning-100 text-warning-800 border-warning-200",
        dotColor: "bg-warning-400",
      },
      [UploadStatus.UPLOADING]: {
        label: "Subiendo...",
        color: "bg-primary-100 text-primary-800 border-primary-200",
        dotColor: "bg-primary-400 animate-pulse",
      },
      [UploadStatus.UPLOADED]: {
        label: "Subido",
        color: "bg-success-100 text-success-800 border-success-200",
        dotColor: "bg-success-400",
      },
      [UploadStatus.ERROR]: {
        label: "Error",
        color: "bg-danger-100 text-danger-800 border-danger-200",
        dotColor: "bg-danger-400",
      },
    };

    const { label, color, dotColor } = config[status];

    return (
      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${color}`}>
        <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        <ITText as="span" className="text-xs font-medium flex items-center gap-1.5">
          {label}
        </ITText>
      </div>
    );
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (acceptedFileTypes.includes(file.type as FileTypeEnum)) {
        setSelectedFile(file);
        setFileType(file.type);
        setUploadStatus(UploadStatus.PENDING);
        
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
          setImagePreview(null);
        }
        
        if (file.type.startsWith('image/')) {
          const previewUrl = URL.createObjectURL(file);
          setImagePreview(previewUrl);
        }
      } else {
        alert(`Tipo de archivo no permitido.`);
        setSelectedFile(null);
        setFileType(null);
        setImagePreview(null);
        setUploadStatus(UploadStatus.PENDING);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    maxFiles: 1,
  });

  // Renderizar PDF si aplica (COMENTADO)
  useEffect(() => {
    const renderPDF = async () => {
      /*
      if (selectedFile && fileType === FileTypeEnum.PDF) {
          // Logic for PDF would go here
      }
      */
    };
    renderPDF();
  }, [selectedFile, fileType]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleConfirm = async () => {
    if (selectedFile) {
      setIsConfirmed(true);
      setUploadStatus(UploadStatus.UPLOADING);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
        onFileSelect(selectedFile);
        onSubmit?.(selectedFile);
        setUploadStatus(UploadStatus.UPLOADED);
      } catch (error) {
        setUploadStatus(UploadStatus.ERROR);
        console.error("Error al subir archivo:", error);
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setFileType(null);
    setIsConfirmed(false);
    setUploadStatus(UploadStatus.PENDING);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    onFileSelect(null);
    onCancel?.();
  };

  const handleDelete = () => {
    handleCancel();
  };

  // In "button" view, close the modal a moment after a successful upload so
  // the trigger collapses back to its compact state instead of leaving the
  // modal open on a finished confirmation.
  useEffect(() => {
    if (view === "button" && isConfirmed && uploadStatus === UploadStatus.UPLOADED) {
      const timeout = setTimeout(() => setIsModalOpen(false), 900);
      return () => clearTimeout(timeout);
    }
  }, [view, isConfirmed, uploadStatus]);

  const headerRow = (
    <div className="flex items-center justify-between mb-2">
      <label className="block text-sm font-semibold text-secondary-700">
        <ITText as="span">Subir archivo </ITText><ITText as="span" className="text-secondary-400 font-normal text-xs">({getFileExtensions()})</ITText>
      </label>

      {showStatusBadge && selectedFile && (
        <StatusBadge status={uploadStatus} />
      )}
    </div>
  );

  const dropZoneOrPreview = (
    <>
      {!selectedFile && !imagePreview ? (
        <div
          {...getRootProps()}
          className={`
            relative group flex flex-col items-center justify-center w-full p-6 
            border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out
            ${
              isDragActive
                ? "border-primary-500 bg-primary-50 scale-[1.01]"
                : "border-secondary-300 bg-white hover:border-primary-400 hover:bg-secondary-50"
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className={`mb-3 p-3 rounded-full transition-colors duration-300 ${isDragActive ? 'bg-primary-100' : 'bg-secondary-100 group-hover:bg-primary-50'}`}>
            <svg 
              className={`w-6 h-6 transition-colors duration-300 ${isDragActive ? 'text-primary-600' : 'text-secondary-400 group-hover:text-primary-500'}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <div className="text-center space-y-1">
            <ITText as="p" className={`text-sm font-medium transition-colors duration-300 ${isDragActive ? 'text-primary-700' : 'text-secondary-700'}`}>
              {isDragActive ? "¡Suelta aquí!" : "Haz clic o arrastra"}
            </ITText>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white border border-secondary-200 rounded-xl shadow-sm overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between p-3 bg-secondary-50 border-b border-secondary-100">
             <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                  {(selectedFile && fileType?.startsWith('image/')) || (!selectedFile && imagePreview) ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <ITText as="p" className="text-xs font-medium text-secondary-900 truncate" title={selectedFile?.name || "Imagen cargada"}>
                    {selectedFile?.name || "Imagen cargada"}
                  </ITText>
                  <ITText as="p" className="text-[10px] text-secondary-500">
                    {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + " MB" : ""}
                  </ITText>
                </div>
             </div>
          </div>

          <div className={clsx("relative bg-secondary-100 flex items-center justify-center", !contentClassName ? "max-h-[200px] min-h-[100px] overflow-auto" : contentClassName)}>
            {((selectedFile && fileType?.startsWith('image/')) || (!selectedFile && imagePreview)) ? (
              <img 
                src={imagePreview} 
                alt="Vista previa" 
                className="w-full h-full object-contain max-h-[200px]"
              />
            ) : (
              <div className="py-8 flex flex-col items-center text-secondary-400">
                <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <ITText as="span" className="text-xs">Sin vista previa</ITText>
              </div>
            )}
          </div>

          <div className="px-3 py-2 bg-white border-t border-secondary-100 flex justify-end gap-2">
            {!isConfirmed ? (
              <>
                <ITButton
                  type="button"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={handleCancel}
                >
                  <ITText>Cancelar</ITText>
                </ITButton>
                <ITButton
                  type="button"
                  variant="filled"
                  color="primary"
                  size="small"
                  onClick={handleConfirm}
                >
                  <div className="flex items-center gap-2">
                    <ITText>Confirmar</ITText>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </ITButton>
              </>
            ) : (
              <ITButton
                type="button"
                variant="outlined"
                color="danger"
                size="small"
                onClick={handleDelete}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <ITText>Eliminar</ITText>
              </ITButton>
            )}
          </div>

          {uploadStatus === UploadStatus.UPLOADING && (
            <div className="px-4 pb-2">
              <div className="w-full bg-secondary-200 rounded-full h-1.5">
                <div 
                  className="bg-primary-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: '100%',
                    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  if (view === "button") {
    const hasFile = Boolean(selectedFile || imagePreview);
    return (
      <div className={clsx("inline-block", containerClassName)}>
        <ITButton
          type="button"
          variant="outlined"
          color={hasFile ? "primary" : "secondary"}
          size="small"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-2 max-w-[220px]">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <ITText className="truncate">
              {selectedFile?.name || (hasFile ? "Archivo cargado" : buttonLabel)}
            </ITText>
            {showStatusBadge && hasFile && <StatusBadge status={uploadStatus} />}
          </div>
        </ITButton>

        <ITDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle ?? buttonLabel}>
          <div className="w-full transition-all duration-300">
            {headerRow}
            {dropZoneOrPreview}
          </div>
        </ITDialog>
      </div>
    );
  }

  return (
    <div className={clsx("w-full transition-all duration-300", containerClassName)}>
      {headerRow}
      {dropZoneOrPreview}
    </div>
  );
};

export default ITDropfile;
