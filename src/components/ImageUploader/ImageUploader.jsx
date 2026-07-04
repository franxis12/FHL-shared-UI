import { useEffect, useId, useRef, useState } from "react";
import { HiOutlinePhoto, HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";

const DEFAULT_ACCEPT = "image/webp,image/jpeg,image/png";

function formatMaxSizeLabel(maxSizeBytes) {
  if (!maxSizeBytes) return "";
  const megabytes = maxSizeBytes / (1024 * 1024);
  return `${Number.isInteger(megabytes) ? megabytes : megabytes.toFixed(1)}MB`;
}

function validateFile(file, { accept, maxSizeBytes }) {
  const allowedTypes = accept
    ? accept.split(",").map((type) => type.trim())
    : null;

  if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return "Use a valid image format.";
  }

  if (maxSizeBytes && file.size > maxSizeBytes) {
    return `Each image must be ${formatMaxSizeLabel(maxSizeBytes)} or less.`;
  }

  return null;
}

function buildPreviewKey(file, fileIndex) {
  return [file?.name, file?.size, file?.lastModified, fileIndex].join("-");
}

function AddTile({ disabled, multiple, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-dashed px-4 py-4 text-center transition",
        "border-[var(--fhl-container-border)] bg-[var(--fhl-container-bg-soft)] text-[var(--fhl-color-primary-strong)]",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-[var(--fhl-color-primary)] hover:bg-[var(--fhl-color-selected-soft)]",
      ].join(" ")}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-[var(--fhl-color-selected-soft)] opacity-70" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--fhl-container-bg)] shadow-sm ring-1 ring-[var(--fhl-container-border)]">
        <HiOutlinePhoto className="h-6 w-6 opacity-80" />
        <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--fhl-color-primary-strong)] text-[var(--fhl-white)] shadow-sm">
          <HiOutlinePlus className="h-4 w-4" />
        </span>
      </span>
      <span className="relative mt-4 text-sm font-semibold">
        {multiple ? "Add photos" : "Add photo"}
      </span>
      <span className="relative mt-1 text-xs text-[var(--fhl-color-text-muted)]">
        {multiple ? "Select one or more images" : "Upload from your device"}
      </span>
    </button>
  );
}

function PreviewTile({
  preview,
  label,
  removable = true,
  onOpenPicker,
  onRemove,
}) {
  const WrapperTag = onOpenPicker ? "button" : "div";

  return (
    <div className="group relative aspect-square overflow-hidden rounded-[28px] border border-[var(--fhl-container-border)] bg-[var(--fhl-container-bg)] shadow-sm">
      <WrapperTag
        {...(onOpenPicker
          ? {
              type: "button",
              onClick: onOpenPicker,
            }
          : {})}
        className="h-full w-full text-left"
      >
        <img
          src={preview.url}
          alt={label}
          className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent px-3 pb-3 pt-8 text-xs font-medium text-white">
          {label}
        </span>
      </WrapperTag>

      {removable ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white shadow-sm transition hover:bg-black/85"
          aria-label={`Remove ${label}`}
        >
          <HiOutlineXMark className="h-4.5 w-4.5" />
        </button>
      ) : null}
    </div>
  );
}

export function ImageUploader({
  label,
  helperText,
  multiple = false,
  maxFiles,
  accept = DEFAULT_ACCEPT,
  maxSizeBytes,
  value,
  onChange,
  onError,
  required = false,
}) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const files = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value
      ? [value]
      : [];
  const hasReachedMaxFiles = Boolean(multiple && maxFiles && files.length >= maxFiles);

  useEffect(() => {
    const nextPreviewUrls = files.map((file, fileIndex) => ({
      key: buildPreviewKey(file, fileIndex),
      url: URL.createObjectURL(file),
    }));

    setPreviewUrls(nextPreviewUrls);

    return () => {
      nextPreviewUrls.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [files]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event) => {
    const nextFiles = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (nextFiles.length === 0) {
      return;
    }

    if (multiple && maxFiles && files.length + nextFiles.length > maxFiles) {
      onError?.(`You can upload up to ${maxFiles} photos.`);
      return;
    }

    for (const file of nextFiles) {
      const validationMessage = validateFile(file, { accept, maxSizeBytes });
      if (validationMessage) {
        onError?.(validationMessage);
        return;
      }
    }

    onError?.("");
    onChange(multiple ? [...files, ...nextFiles] : nextFiles[0]);
  };

  const handleRemove = (fileIndex) => {
    onError?.("");

    if (multiple) {
      onChange(files.filter((_, index) => index !== fileIndex));
      return;
    }

    onChange(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {label ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--fhl-color-text)]">
            {label}
          </span>
          {required ? (
            <span className="text-sm font-semibold text-[var(--fhl-color-primary)]">
              *
            </span>
          ) : null}
        </div>
      ) : null}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        required={required && files.length === 0}
        onChange={handleInputChange}
        className="sr-only"
      />

      <div className={multiple ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : "w-full max-w-[15rem]"}>
        {files.map((file, fileIndex) => {
          const preview = previewUrls[fileIndex];

          if (!preview) return null;

          return (
            <PreviewTile
              key={buildPreviewKey(file, fileIndex)}
              preview={preview}
              label={file.name}
              removable
              onOpenPicker={multiple ? undefined : openFilePicker}
              onRemove={() => handleRemove(fileIndex)}
            />
          );
        })}

        {multiple ? (
          hasReachedMaxFiles ? null : (
            <AddTile disabled={false} multiple onClick={openFilePicker} />
          )
        ) : files.length > 0 ? null : (
          <AddTile disabled={false} multiple={false} onClick={openFilePicker} />
        )}
      </div>

      {helperText ? (
        <p className="text-xs text-[var(--fhl-color-text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
