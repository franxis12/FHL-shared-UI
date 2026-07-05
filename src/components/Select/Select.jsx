import { forwardRef, useId } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";
import { INPUT_STATUS } from "../Input";

export const SELECT_STATUS = INPUT_STATUS;

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

export const Select = forwardRef(function Select(
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
    selectClassName = "",
    labelClassName = "",
    helperClassName = "",
    statusClassName = "",
    disabled = false,
    required = false,
    children,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? `fhl-select-${generatedId}`;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const statusId = statusMessage ? `${selectId}-status` : undefined;
  const describedBy = joinIds(ariaDescribedBy, helperId, statusId);
  const resolvedAriaInvalid =
    ariaInvalid ?? (status === INPUT_STATUS.ERROR ? true : undefined);
  const fieldState = resolveFieldState(status, selected);
  const fieldStyle = {
    "--fhl-select-current-border": fieldState.borderColor,
    "--fhl-select-current-ring": fieldState.ringColor,
    "--fhl-select-current-message": fieldState.messageColor,
    "--fhl-select-current-icon": fieldState.iconColor,
    "--fhl-select-current-bg": disabled
      ? "var(--fhl-input-disabled-bg)"
      : "var(--fhl-input-bg)",
  };

  return (
    <div className={joinClassNames("w-full space-y-1.5", className)}>
      {label ? (
        <Text
          as="label"
          htmlFor={selectId}
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
          "flex min-h-12 items-center gap-3 rounded-2xl border px-3.5 py-3 shadow-sm transition",
          "border-[var(--fhl-select-current-border)] bg-[var(--fhl-select-current-bg)]",
          "focus-within:border-[var(--fhl-select-current-border)]",
          "focus-within:ring-4 focus-within:ring-[var(--fhl-select-current-ring)]",
          disabled ? "cursor-not-allowed" : "",
          containerClassName,
        )}
        style={fieldStyle}
      >
        {Icon ? (
          <Icon
            className="h-5 w-5 shrink-0 text-[var(--fhl-select-current-icon)]"
            aria-hidden="true"
            focusable="false"
          />
        ) : null}

        <select
          {...props}
          id={selectId}
          ref={ref}
          disabled={disabled}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={resolvedAriaInvalid}
          className={joinClassNames(
            "min-w-0 flex-1 appearance-none bg-transparent text-[length:var(--fhl-text-size-sm)] leading-[var(--fhl-text-leading-sm)] font-medium text-[var(--fhl-input-text)] outline-none",
            "disabled:cursor-not-allowed disabled:text-[var(--fhl-input-disabled-text)]",
            selectClassName,
          )}
        >
          {children}
        </select>

        <FiChevronDown
          className="h-[18px] w-[18px] shrink-0 text-[var(--fhl-select-current-icon)]"
          aria-hidden="true"
          focusable="false"
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
          style={{ color: "var(--fhl-select-current-message)" }}
        >
          {statusMessage}
        </Text>
      ) : null}
    </div>
  );
});
