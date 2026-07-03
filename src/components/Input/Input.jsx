import { forwardRef, useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const INPUT_STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
});

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

export const Input = forwardRef(function Input(
  {
    id,
    label,
    helperText,
    status,
    statusMessage,
    icon: Icon,
    trailingIcon: TrailingIcon,
    trailingIconAriaLabel = "Input action",
    onTrailingIconClick,
    selected = false,
    type = "text",
    showPasswordToggle = true,
    className = "",
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperClassName = "",
    statusClassName = "",
    disabled = false,
    required = false,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `fhl-input-${generatedId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const statusId = statusMessage ? `${inputId}-status` : undefined;
  const describedBy = joinIds(ariaDescribedBy, helperId, statusId);
  const resolvedAriaInvalid =
    ariaInvalid ?? (status === INPUT_STATUS.ERROR ? true : undefined);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordInput = type === "password";
  const canTogglePassword = isPasswordInput && showPasswordToggle;
  const resolvedType =
    canTogglePassword && isPasswordVisible ? "text" : type;
  const fieldState = resolveFieldState(status, selected);
  const fieldStyle = {
    "--fhl-input-current-border": fieldState.borderColor,
    "--fhl-input-current-ring": fieldState.ringColor,
    "--fhl-input-current-message": fieldState.messageColor,
    "--fhl-input-current-icon": fieldState.iconColor,
    "--fhl-input-current-bg": disabled
      ? "var(--fhl-input-disabled-bg)"
      : "var(--fhl-input-bg)",
  };
  const hasTrailingActions = Boolean(TrailingIcon) || canTogglePassword;

  return (
    <div className={joinClassNames("w-full space-y-1.5", className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className={joinClassNames(
            "block text-sm font-semibold text-[var(--fhl-input-label)]",
            labelClassName,
          )}
        >
          {label}
          {required ? (
            <span className="ml-1 text-[var(--fhl-color-primary)]">*</span>
          ) : null}
        </label>
      ) : null}

      <div
        className={joinClassNames(
          "flex min-h-12 items-center gap-3 rounded-2xl border px-3.5 py-3 shadow-sm transition",
          "border-[var(--fhl-input-current-border)] bg-[var(--fhl-input-current-bg)]",
          "focus-within:border-[var(--fhl-input-current-border)]",
          "focus-within:ring-4 focus-within:ring-[var(--fhl-input-current-ring)]",
          disabled ? "cursor-not-allowed" : "",
          containerClassName,
        )}
        style={fieldStyle}
      >
        {Icon ? (
          <Icon
            className="h-5 w-5 shrink-0 text-[var(--fhl-input-current-icon)]"
            aria-hidden="true"
            focusable="false"
          />
        ) : null}

        <input
          {...props}
          id={inputId}
          ref={ref}
          type={resolvedType}
          disabled={disabled}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          className={joinClassNames(
            "min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--fhl-input-text)] outline-none",
            "placeholder:text-[var(--fhl-input-placeholder)] disabled:cursor-not-allowed disabled:text-[var(--fhl-input-disabled-text)]",
            inputClassName,
          )}
        />

        {hasTrailingActions ? (
          <div className="flex items-center gap-1.5">
            {TrailingIcon ? (
              onTrailingIconClick ? (
                <button
                  type="button"
                  onClick={onTrailingIconClick}
                  disabled={disabled}
                  aria-label={trailingIconAriaLabel}
                  className="rounded-lg p-1 text-[var(--fhl-input-current-icon)] transition hover:bg-[var(--fhl-color-hover-soft)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <TrailingIcon
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                    focusable="false"
                  />
                </button>
              ) : (
                <TrailingIcon
                  className="h-[18px] w-[18px] shrink-0 text-[var(--fhl-input-current-icon)]"
                  aria-hidden="true"
                  focusable="false"
                />
              )
            ) : null}

            {canTogglePassword ? (
              <button
                type="button"
                onClick={() =>
                  setIsPasswordVisible((previous) => !previous)
                }
                disabled={disabled}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                className="rounded-lg p-1 text-[var(--fhl-input-current-icon)] transition hover:bg-[var(--fhl-color-hover-soft)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPasswordVisible ? (
                  <FiEyeOff className="h-[18px] w-[18px]" aria-hidden="true" />
                ) : (
                  <FiEye className="h-[18px] w-[18px]" aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {helperText ? (
        <p
          id={helperId}
          className={joinClassNames(
            "text-xs font-medium text-[var(--fhl-input-helper)]",
            helperClassName,
          )}
        >
          {helperText}
        </p>
      ) : null}

      {statusMessage ? (
        <p
          id={statusId}
          className={joinClassNames("text-xs font-semibold", statusClassName)}
          style={{ color: "var(--fhl-input-current-message)" }}
        >
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
});
