import React, { useCallback, useRef, useState } from 'react';
import './FileUpload.css';

/* ================================================================
   Types
   ================================================================ */
export interface FileUploadItem {
  /** File name. */
  name: string;
  /** File size in bytes. */
  size: number;
  /** Upload progress, 0 – 100. */
  progress?: number;
  /** Current upload status. */
  status?: 'uploading' | 'complete' | 'error';
}

export interface FileUploadProps {
  /** List of files in the queue. */
  files?: FileUploadItem[];
  /** Called when files are added via click or drag-and-drop. */
  onFilesAdd?: (files: File[]) => void;
  /** Called when a file is removed from the queue. */
  onFileRemove?: (index: number) => void;
  /** Accepted file types (HTML accept attribute). */
  accept?: string;
  /** Maximum file size in bytes. */
  maxSize?: number;
  /** Allow multiple file selection. */
  multiple?: boolean;
  /** Hint text shown below the action text (e.g. "SVG, PNG, JPG or GIF (max. 800x400px)"). */
  hint?: string;
  /** Additional CSS class for the root element. */
  className?: string;
}

/* ================================================================
   Helpers
   ================================================================ */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${Number.isInteger(value) ? value : value.toFixed(1)} ${units[i]}`;
}

/* ================================================================
   Inline SVG icons (matching Figma spec)
   ================================================================ */
const UploadCloudIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6.667 13.333 10 10m0 0 3.333 3.333M10 10v7.5m6.667-3.548a4.583 4.583 0 0 0-2.917-8.12.516.516 0 0 1-.445-.25 6.25 6.25 0 1 0-9.816 7.58"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon: React.FC = () => (
  <svg
    viewBox="0 0 32 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0 4a4 4 0 0 1 4-4h16l12 12v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
      fill="#E9EAEB"
    />
    <path d="M20 0l12 12h-8a4 4 0 0 1-4-4V0Z" fill="#D5D7DA" />
  </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 8l2 2 4-4m3 2A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 5.333V8m0 2.667h.007M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon: React.FC = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 2h4M2 4h12m-1.333 0-.467 7.02c-.07 1.05-.105 1.575-.332 1.977a2 2 0 0 1-.866.835c-.413.168-.94.168-1.992.168H6.99c-1.053 0-1.58 0-1.992-.168a2 2 0 0 1-.866-.835c-.227-.402-.263-.928-.332-1.977L3.333 4"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ================================================================
   FileUploadItemRow (internal)
   ================================================================ */
interface FileUploadItemRowProps {
  item: FileUploadItem;
  onRemove?: () => void;
}

const FileUploadItemRow: React.FC<FileUploadItemRowProps> = ({
  item,
  onRemove,
}) => {
  const progress = item.progress ?? 0;
  const status = item.status ?? 'uploading';
  const isComplete = status === 'complete';
  const isError = status === 'error';
  const isUploading = status === 'uploading';

  const sizeText = isUploading
    ? `${formatBytes(Math.round((item.size * progress) / 100))} of ${formatBytes(item.size)}`
    : formatBytes(item.size);

  const statusLabel = isComplete
    ? 'Complete'
    : isError
      ? 'Failed'
      : 'Uploading...';

  const rootClasses = [
    'file-upload-item',
    isError && 'file-upload-item--error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      <div className="file-upload-item__content">
        <div className="file-upload-item__icon">
          <FileIcon />
        </div>
        <div className="file-upload-item__details">
          <div className="file-upload-item__text">
            <p className="file-upload-item__name" title={item.name}>
              {item.name}
            </p>
            <div className="file-upload-item__meta">
              <span className="file-upload-item__size">{sizeText}</span>
              <span className="file-upload-item__divider" />
              <span className="file-upload-item__status">
                <span
                  className={`file-upload-item__status-icon file-upload-item__status-icon--${status}`}
                >
                  {isComplete && <CheckCircleIcon />}
                  {isUploading && (
                    <UploadCloudIcon className="file-upload-item__status-icon" />
                  )}
                  {isError && <AlertCircleIcon />}
                </span>
                <span
                  className={`file-upload-item__status-text file-upload-item__status-text--${status}`}
                >
                  {statusLabel}
                </span>
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {(isUploading || isError) && (
            <div className="file-upload-item__progress-row">
              <div className="file-upload-item__progress-track">
                <div
                  className={`file-upload-item__progress-fill${isError ? ' file-upload-item__progress-fill--error' : ''}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="file-upload-item__progress-percent">
                {progress}%
              </span>
            </div>
          )}

          {/* Complete state: show 100% in meta row instead of progress bar */}
          {isComplete && (
            <div className="file-upload-item__progress-row">
              <div className="file-upload-item__progress-track">
                <div
                  className="file-upload-item__progress-fill"
                  style={{ width: '100%' }}
                />
              </div>
              <span className="file-upload-item__progress-percent">100%</span>
            </div>
          )}
        </div>
      </div>

      {onRemove && (
        <button
          type="button"
          className="file-upload-item__remove"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

/* ================================================================
   FileUpload (main export)
   ================================================================ */
export const FileUpload: React.FC<FileUploadProps> = ({
  files = [],
  onFilesAdd,
  onFileRemove,
  accept,
  maxSize,
  multiple = true,
  hint = 'SVG, PNG, JPG or GIF (max. 800x400px)',
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      let selected = Array.from(fileList);
      if (maxSize) {
        selected = selected.filter((f) => f.size <= maxSize);
      }
      if (selected.length > 0) {
        onFilesAdd?.(selected);
      }
    },
    [maxSize, onFilesAdd],
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset value so the same file can be re-selected
    e.target.value = '';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (dragCounter.current === 1) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const rootClasses = ['file-upload', className].filter(Boolean).join(' ');

  const dropzoneClasses = [
    'file-upload__dropzone',
    isDragOver && 'file-upload__dropzone--dragover',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* Drop zone */}
      <div
        className={dropzoneClasses}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-upload__input"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          tabIndex={-1}
        />
        <div className="file-upload__content">
          <div className="file-upload__icon-wrapper">
            <UploadCloudIcon className="file-upload__icon" />
          </div>
          <div>
            <div className="file-upload__action">
              <span className="file-upload__action-link">Click to upload</span>
              <span className="file-upload__action-text">
                or drag and drop
              </span>
            </div>
            {hint && <p className="file-upload__hint">{hint}</p>}
          </div>
        </div>
      </div>

      {/* File queue */}
      {files.length > 0 && (
        <div className="file-upload__queue">
          {files.map((file, index) => (
            <FileUploadItemRow
              key={`${file.name}-${index}`}
              item={file}
              onRemove={onFileRemove ? () => onFileRemove(index) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

FileUpload.displayName = 'FileUpload';
