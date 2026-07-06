import { forwardRef, useId, useRef } from "react";
import { FiFileText, FiPaperclip, FiUploadCloud, FiX } from "react-icons/fi";
import { Button, BUTTON_SIZE, BUTTON_VARIANT } from "../Button";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const FILE_UPLOADER_STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
});

const STATUS_STYLES = {
  [FILE_UPLOADER_STATUS.SUCCESS]: {
    borderColor: "var(--fhl-color-success)",
    ringColor: "var(--fhl-color-success-soft)",
    messageColor: "var(--fhl-color-success)",
  },
  [FILE_UPLOADER_STATUS.ERROR]: {
    borderColor: "var(--fhl-color-alert)",
    ringColor: "var(--fhl-color-alert-soft)",
    messageColor: "var(--fhl-color-alert)",
  },
  [FILE_UPLOADER_STATUS.WARNING]: {
    borderColor: "var(--fhl-color-warning)",
    ringColor: "var(--fhl-color-warning-soft)",
    messageColor: "var(--fhl-color-warning)",
  },
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function resolveFieldState(status, selected) {
  if (status && STATUS_STYLES[status]) {
    return STATUS_STYLES[status];
  }

  if (selected) {
    return {
      borderColor: "var(--fhl-color-primary)",
      ringColor: "var(--fhl-color-selected-soft)",
      messageColor: "var(--fhl-input-helper)",
    };
  }

  return {
    borderColor: "var(--fhl-input-border)",
    ringColor: "var(--fhl-color-selected-soft)",
    messageColor: "var(--fhl-input-helper)",
  };
}

function normalizeFiles(value) {
  return Array.isArray(value) ? value : [];
}

export const FileUploader = forwardRef(function FileUploader(
  {
    id,
    label,
    helperText,
    status,
    statusMessage,
    selected = false,
    files = [],
    accept = "",
    multiple = false,
    required = false,
    disabled = false,
    buttonLabel = "",
    emptyTitle = "",
    emptyDescription = "",
    onFilesSelect,
    onRemoveFile,
    className = "",
    dropzoneClassName = "",
    fileListClassName = "",
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `fhl-file-uploader-${generatedId}`;
  const inputRef = useRef(null);
  const normalizedFiles = normalizeFiles(files);
  const hasFiles = normalizedFiles.length > 0;
  const fieldState = resolveFieldState(status, selected || hasFiles);
  const fieldStyle = {
    "--fhl-file-uploader-current-border": fieldState.borderColor,
    "--fhl-file-uploader-current-ring": fieldState.ringColor,
    "--fhl-file-uploader-current-message": fieldState.messageColor,
  };

  const handleOpenPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleInputChange = (event) => {
    const nextFiles = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (nextFiles.length === 0) return;
    onFilesSelect?.(nextFiles);
  };

  return (
    <div className={joinClassNames("w-full space-y-3", className)}>
      {label ? (
        <Text
          as="label"
          htmlFor={inputId}
          size={TEXT_SIZE.SM}
          weight={TEXT_WEIGHT.SEMIBOLD}
          className="block text-[var(--fhl-input-label)]"
        >
          {label}
          {required ? (
            <span className="ml-1 text-[var(--fhl-color-primary)]">*</span>
          ) : null}
        </Text>
      ) : null}

      {helperText ? (
        <Text as="p" size={TEXT_SIZE.XS} tone={TEXT_TONE.MUTED}>
          {helperText}
        </Text>
      ) : null}

      <input
        id={inputId}
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={handleInputChange}
      />

      <div
        className={joinClassNames(
          "rounded-[28px] border border-dashed bg-[var(--fhl-container-bg-soft)] p-4 transition",
          "border-[var(--fhl-file-uploader-current-border)] focus-within:ring-4",
          disabled ? "opacity-60" : "",
          dropzoneClassName,
        )}
        style={fieldStyle}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--fhl-container-bg)] text-[var(--fhl-color-primary-strong)] shadow-sm">
              <FiUploadCloud className="h-5 w-5" aria-hidden="true" />
            </span>

            <div className="min-w-0 space-y-1">
              <Text as="p" size={TEXT_SIZE.SM} weight={TEXT_WEIGHT.BOLD}>
                {emptyTitle || (multiple ? "Upload files" : "Upload file")}
              </Text>
              <Text as="p" size={TEXT_SIZE.XS} tone={TEXT_TONE.MUTED}>
                {emptyDescription ||
                  (multiple
                    ? "Choose one or more files from your device."
                    : "Choose one file from your device.")}
              </Text>
            </div>
          </div>

          <Button
            type="button"
            variant={BUTTON_VARIANT.SECONDARY}
            size={BUTTON_SIZE.SM}
            disabled={disabled}
            icon={FiPaperclip}
            onClick={handleOpenPicker}
          >
            {buttonLabel || (multiple ? "Select files" : "Select file")}
          </Button>
        </div>

        {hasFiles ? (
          <div
            className={joinClassNames(
              "mt-4 space-y-2 border-t border-[var(--fhl-container-border)] pt-4",
              fileListClassName,
            )}
          >
            {normalizedFiles.map((fileItem, fileIndex) => {
              const fileId =
                fileItem?.id ||
                fileItem?.storagePath ||
                fileItem?.name ||
                `file-${fileIndex}`;
              const fileName = fileItem?.name || `File ${fileIndex + 1}`;
              const fileDetail = fileItem?.detail || fileItem?.sizeLabel || "";

              return (
                <div
                  key={fileId}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-[var(--fhl-container-bg)] px-3.5 py-3 shadow-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--fhl-container-bg-soft)] text-[var(--fhl-color-primary-strong)]">
                      <FiFileText className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>

                    <div className="min-w-0 space-y-0.5">
                      <Text
                        as="p"
                        size={TEXT_SIZE.SM}
                        weight={TEXT_WEIGHT.SEMIBOLD}
                        className="truncate"
                      >
                        {fileName}
                      </Text>
                      {fileDetail ? (
                        <Text as="p" size={TEXT_SIZE.XS} tone={TEXT_TONE.MUTED}>
                          {fileDetail}
                        </Text>
                      ) : null}
                    </div>
                  </div>

                  {onRemoveFile ? (
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => onRemoveFile(fileItem, fileIndex)}
                      className="rounded-full p-2 text-[var(--fhl-color-text-muted)] transition hover:bg-[var(--fhl-color-hover-soft)] hover:text-[var(--fhl-color-alert)] disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label={`Remove ${fileName}`}
                    >
                      <FiX className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {statusMessage ? (
        <Text
          as="p"
          size={TEXT_SIZE.XS}
          weight={TEXT_WEIGHT.SEMIBOLD}
          style={{ color: "var(--fhl-file-uploader-current-message)" }}
        >
          {statusMessage}
        </Text>
      ) : null}
    </div>
  );
});
