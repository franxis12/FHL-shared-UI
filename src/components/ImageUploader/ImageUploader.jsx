import { useId } from "react";

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
  const files = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value
      ? [value]
      : [];

  const handleInputChange = (event) => {
    const nextFiles = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (nextFiles.length === 0) {
      return;
    }

    if (multiple && maxFiles && nextFiles.length > maxFiles) {
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
    onChange(multiple ? nextFiles : nextFiles[0]);
  };

  const handleRemove = (fileIndex) => {
    if (multiple) {
      onChange(files.filter((_, index) => index !== fileIndex));
    } else {
      onChange(null);
    }
  };

  return (
    <label htmlFor={inputId} className="flex flex-col gap-1.5">
      {label ? <span className="text-sm font-medium">{label}</span> : null}
      <input
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        required={required && files.length === 0}
        onChange={handleInputChange}
        className="rounded-xl border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] px-3 py-2 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--fhl-color-surface-soft)] file:px-3 file:py-2 file:font-semibold"
      />
      {helperText ? (
        <p className="text-xs text-[var(--fhl-color-text-muted)]">
          {helperText}
        </p>
      ) : null}
      {files.length > 0 && (
        <div className="space-y-1">
          {files.map((file, fileIndex) => (
            <div
              key={`${file.name}-${fileIndex}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] px-2.5 py-1.5"
            >
              <p className="truncate text-xs text-[var(--fhl-color-primary-strong)]">
                {file.name}
              </p>
              <button
                type="button"
                onClick={() => handleRemove(fileIndex)}
                className="shrink-0 text-xs font-semibold text-rose-600 transition hover:text-rose-500"
              >
                {multiple ? "Remove" : "Clear"}
              </button>
            </div>
          ))}
        </div>
      )}
    </label>
  );
}
