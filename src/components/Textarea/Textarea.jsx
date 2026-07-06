import { forwardRef, useId } from "react";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";
import { INPUT_STATUS } from "../Input";

export const TEXTAREA_STATUS = INPUT_STATUS;

const STATUS_STYLES = {
  [INPUT_STATUS.SUCCESS]: {
    borderColor: "var(--fhl-color-success)",
    ringColor: "var(--fhl-color-success-soft)",
    messageColor: "var(--fhl-color-success)",
    iconColor: "var(--fhl-color-success)",
  },
  [INPUT_STATUS.ERROR]: {
    borderColor: "var(--fhl-color-alert)",
    ringColor: "var(--fhl-color-alert-soft)",
    messageColor: "var(--fhl-color-alert)",
    iconColor: "var(--fhl-color-alert)",
  },
  [INPUT_STATUS.WARNING]: {
    borderColor: "var(--fhl-color-warning)",
    ringColor: "var(--fhl-color-warning-soft)",
    messageColor: "var(--fhl-color-warning)",
    iconColor: "var(--fhl-color-warning)",
  },
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function joinIds(...values) {
  const result = values.filter(Boolean).join(" ");
  return result || undefined;
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
      iconColor: "var(--fhl-color-primary)",
    };
  }

  return {
    borderColor: "var(--fhl-input-border)",
    ringColor: "var(--fhl-color-selected-soft)",
    messageColor: "var(--fhl-input-helper)",
    iconColor: "var(--fhl-input-icon)",
  };
}

export const Textarea = forwardRef(function Textarea(
  {
    id,
    label,
    helperText,
    status,
    statusMessage,
    icon: Icon,
    selected = false,
    className = "",
    containerClassName = "",
    textareaClassName = "",
    labelClassName = "",
    helperClassName = "",
    statusClassName = "",
    disabled = false,
    required = false,
    rows = 4,
    resize = "vertical",
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? `fhl-textarea-${generatedId}`;
  const helperId = helperText ? `${textareaId}-helper` : undefined;
  const statusId = statusMessage ? `${textareaId}-status` : undefined;
  const describedBy = joinIds(ariaDescribedBy, helperId, statusId);
  const resolvedAriaInvalid =
    ariaInvalid ?? (status === INPUT_STATUS.ERROR ? true : undefined);
  const fieldState = resolveFieldState(status, selected);
  const fieldStyle = {
    "--fhl-textarea-current-border": fieldState.borderColor,
    "--fhl-textarea-current-ring": fieldState.ringColor,
    "--fhl-textarea-current-message": fieldState.messageColor,
    "--fhl-textarea-current-icon": fieldState.iconColor,
    "--fhl-textarea-current-bg": disabled
      ? "var(--fhl-input-disabled-bg)"
      : "var(--fhl-input-bg)",
  };

  return (
    <div className={joinClassNames("w-full space-y-1.5", className)}>
      {label ? (
        <Text
          as="label"
          htmlFor={textareaId}
          size={TEXT_SIZE.SM}
          weight={TEXT_WEIGHT.SEMIBOLD}
          className={joinClassNames(
            "block text-[var(--fhl-input-label)]",
            labelClassName,
          )}
        >
          {label}
          {required ? (
            <span className="ml-1 text-[var(--fhl-color-primary)]">*</span>
          ) : null}
        </Text>
      ) : null}

      <div
        className={joinClassNames(
          "flex gap-3 rounded-2xl border px-3.5 py-3 shadow-sm transition",
          "border-[var(--fhl-textarea-current-border)] bg-[var(--fhl-textarea-current-bg)]",
          "focus-within:border-[var(--fhl-textarea-current-border)]",
          "focus-within:ring-4 focus-within:ring-[var(--fhl-textarea-current-ring)]",
          disabled ? "cursor-not-allowed" : "",
          containerClassName,
        )}
        style={fieldStyle}
      >
        {Icon ? (
          <Icon
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--fhl-textarea-current-icon)]"
            aria-hidden="true"
            focusable="false"
          />
        ) : null}

        <textarea
          {...props}
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          className={joinClassNames(
            "min-h-24 w-full min-w-0 bg-transparent text-[length:var(--fhl-text-size-sm)] leading-[var(--fhl-text-leading-sm)] font-medium text-[var(--fhl-input-text)] outline-none",
            "placeholder:text-[var(--fhl-input-placeholder)] disabled:cursor-not-allowed disabled:text-[var(--fhl-input-disabled-text)]",
            resize === "none"
              ? "resize-none"
              : resize === "horizontal"
                ? "resize-x"
                : resize === "both"
                  ? "resize"
                  : "resize-y",
            textareaClassName,
          )}
        />
      </div>

      {helperText ? (
        <Text
          as="p"
          id={helperId}
          size={TEXT_SIZE.XS}
          weight={TEXT_WEIGHT.MEDIUM}
          tone={TEXT_TONE.MUTED}
          className={joinClassNames(
            "text-[var(--fhl-input-helper)]",
            helperClassName,
          )}
        >
          {helperText}
        </Text>
      ) : null}

      {statusMessage ? (
        <Text
          as="p"
          id={statusId}
          size={TEXT_SIZE.XS}
          weight={TEXT_WEIGHT.SEMIBOLD}
          className={statusClassName}
          style={{ color: "var(--fhl-textarea-current-message)" }}
        >
          {statusMessage}
        </Text>
      ) : null}
    </div>
  );
});
