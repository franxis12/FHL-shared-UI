import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Input, INPUT_STATUS } from "../Input";
import { Notice, NOTICE_TONE } from "../Notice";
import { Text, TEXT_SIZE, TEXT_WEIGHT } from "../Text";

function CloseIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickEditFieldDialog({
  isOpen,
  title,
  description = "",
  label,
  value = "",
  fields = [],
  placeholder = "",
  type = "text",
  options = [],
  multiline = false,
  isSubmitting = false,
  errorMessage = "",
  onClose,
  onSubmit,
}) {
  const hasFieldGroup = Array.isArray(fields) && fields.length > 0;
  const [draftValue, setDraftValue] = useState(String(value ?? ""));
  const [draftFields, setDraftFields] = useState(() =>
    Object.fromEntries(
      (Array.isArray(fields) ? fields : []).map((field) => [
        field.key,
        String(field.value ?? ""),
      ]),
    ),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (hasFieldGroup) {
      setDraftFields(
        Object.fromEntries(
          fields.map((field) => [field.key, String(field.value ?? "")]),
        ),
      );
      return;
    }

    setDraftValue(String(value ?? ""));
  }, [fields, hasFieldGroup, isOpen, value]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-xl rounded-[28px] border p-5 md:p-6"
        style={{
          borderColor: "var(--fhl-color-border)",
          backgroundColor: "var(--fhl-color-surface)",
          boxShadow: "0 28px 60px -28px rgba(15, 23, 42, 0.55)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Text as="h3" size={TEXT_SIZE.XL} weight={TEXT_WEIGHT.BOLD}>
              {title}
            </Text>
            {description ? (
              <p className="mt-1 text-sm text-[var(--fhl-color-text-muted)]">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[var(--fhl-color-text)] transition hover:bg-[var(--fhl-color-surface-soft)]"
            style={{ borderColor: "var(--fhl-color-border)" }}
            aria-label="Close quick edit dialog"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.(hasFieldGroup ? draftFields : draftValue);
          }}
        >
          {hasFieldGroup ? (
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map((field) =>
                field.options?.length > 0 ? (
                  <label key={field.key} className="grid gap-1.5">
                    <span className="text-sm font-semibold text-[var(--fhl-color-text)]">
                      {field.label}
                    </span>
                    <select
                      value={draftFields[field.key] ?? ""}
                      onChange={(event) =>
                        setDraftFields((previous) => ({
                          ...previous,
                          [field.key]: event.target.value,
                        }))
                      }
                      className="min-h-12 w-full appearance-none rounded-2xl border px-3.5 py-3 pr-11 shadow-sm transition outline-none focus:border-[var(--fhl-color-primary)] focus:ring-4 focus:ring-[var(--fhl-color-selected-soft)]"
                      style={{
                        borderColor: "var(--fhl-color-border)",
                        backgroundColor: "var(--fhl-color-surface)",
                        color: "var(--fhl-color-text)",
                      }}
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : field.multiline ? (
                  <label
                    key={field.key}
                    className="grid gap-1.5 md:col-span-2"
                  >
                    <span className="text-sm font-semibold text-[var(--fhl-color-text)]">
                      {field.label}
                    </span>
                    <textarea
                      value={draftFields[field.key] ?? ""}
                      onChange={(event) =>
                        setDraftFields((previous) => ({
                          ...previous,
                          [field.key]: event.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      rows={field.rows || 4}
                      className="min-h-32 w-full rounded-2xl border px-3.5 py-3 shadow-sm transition outline-none focus:border-[var(--fhl-color-primary)] focus:ring-4 focus:ring-[var(--fhl-color-selected-soft)]"
                      style={{
                        borderColor: "var(--fhl-color-border)",
                        backgroundColor: "var(--fhl-color-surface)",
                        color: "var(--fhl-color-text)",
                      }}
                    />
                  </label>
                ) : (
                  <Input
                    key={field.key}
                    label={field.label}
                    type={field.type || "text"}
                    value={draftFields[field.key] ?? ""}
                    onChange={(event) =>
                      setDraftFields((previous) => ({
                        ...previous,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    status={errorMessage ? INPUT_STATUS.ERROR : undefined}
                  />
                ),
              )}
            </div>
          ) : options.length > 0 ? (
            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-[var(--fhl-color-text)]">
                {label}
              </span>
              <select
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                className="min-h-12 w-full appearance-none rounded-2xl border px-3.5 py-3 pr-11 shadow-sm transition outline-none focus:border-[var(--fhl-color-primary)] focus:ring-4 focus:ring-[var(--fhl-color-selected-soft)]"
                style={{
                  borderColor: "var(--fhl-color-border)",
                  backgroundColor: "var(--fhl-color-surface)",
                  color: "var(--fhl-color-text)",
                }}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ) : multiline ? (
            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-[var(--fhl-color-text)]">
                {label}
              </span>
              <textarea
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                placeholder={placeholder}
                rows={5}
                className="min-h-32 w-full rounded-2xl border px-3.5 py-3 shadow-sm transition outline-none focus:border-[var(--fhl-color-primary)] focus:ring-4 focus:ring-[var(--fhl-color-selected-soft)]"
                style={{
                  borderColor: errorMessage
                    ? "var(--fhl-color-alert)"
                    : "var(--fhl-color-border)",
                  backgroundColor: "var(--fhl-color-surface)",
                  color: "var(--fhl-color-text)",
                }}
              />
            </label>
          ) : (
            <Input
              label={label}
              type={type}
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
              placeholder={placeholder}
              status={errorMessage ? INPUT_STATUS.ERROR : undefined}
            />
          )}

          {errorMessage ? (
            <Notice tone={NOTICE_TONE.ERROR}>{errorMessage}</Notice>
          ) : null}

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save change"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
