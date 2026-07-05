import { forwardRef, useEffect, useId, useRef } from "react";
import { FiCheck } from "react-icons/fi";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const CHECKBOX_STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
});

const STATUS_STYLES = {
  [CHECKBOX_STATUS.SUCCESS]: {
    borderColor: "var(--fhl-color-success)",
    ringColor: "var(--fhl-color-success-soft)",
    messageColor: "var(--fhl-color-success)",
    checkedBackground: "var(--fhl-color-success-soft)",
    checkedColor: "var(--fhl-color-success)",
  },
  [CHECKBOX_STATUS.ERROR]: {
    borderColor: "var(--fhl-color-alert)",
    ringColor: "var(--fhl-color-alert-soft)",
    messageColor: "var(--fhl-color-alert)",
    checkedBackground: "var(--fhl-color-alert-soft)",
    checkedColor: "var(--fhl-color-alert)",
  },
  [CHECKBOX_STATUS.WARNING]: {
    borderColor: "var(--fhl-color-warning)",
    ringColor: "var(--fhl-color-warning-soft)",
    messageColor: "var(--fhl-color-warning)",
    checkedBackground: "var(--fhl-color-warning-soft)",
    checkedColor: "var(--fhl-color-warning)",
  },
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function joinIds(...values) {
  const result = values.filter(Boolean).join(" ");
  return result || undefined;
}

function resolveCheckboxState(status, selected) {
  if (status && STATUS_STYLES[status]) {
    return STATUS_STYLES[status];
  }

  if (selected) {
    return {
      borderColor: "var(--fhl-color-primary)",
      ringColor: "var(--fhl-color-selected-soft)",
      messageColor: "var(--fhl-checkbox-helper)",
      checkedBackground: "var(--fhl-color-primary)",
      checkedColor: "var(--fhl-color-accent-contrast)",
    };
  }

  return {
    borderColor: "var(--fhl-checkbox-border)",
    ringColor: "var(--fhl-checkbox-ring)",
    messageColor: "var(--fhl-checkbox-helper)",
    checkedBackground: "var(--fhl-color-primary)",
    checkedColor: "var(--fhl-color-accent-contrast)",
  };
}

function setForwardedRef(ref, value) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(value);
    return;
  }

  ref.current = value;
}

export const Checkbox = forwardRef(function Checkbox(
  {
    id,
    label,
    helperText,
    status,
    statusMessage,
    selected = false,
    indeterminate = false,
    className = "",
    controlClassName = "",
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
  const inputId = id ?? `fhl-checkbox-${generatedId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const statusId = statusMessage ? `${inputId}-status` : undefined;
  const describedBy = joinIds(ariaDescribedBy, helperId, statusId);
  const resolvedAriaInvalid =
    ariaInvalid ?? (status === CHECKBOX_STATUS.ERROR ? true : undefined);
  const fieldState = resolveCheckboxState(status, selected);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  const fieldStyle = {
    "--fhl-checkbox-current-border": fieldState.borderColor,
    "--fhl-checkbox-current-ring": fieldState.ringColor,
    "--fhl-checkbox-current-message": fieldState.messageColor,
    "--fhl-checkbox-current-checked-bg": fieldState.checkedBackground,
    "--fhl-checkbox-current-checked-color": fieldState.checkedColor,
  };

  return (
    <div className={joinClassNames("w-full space-y-1.5", className)}>
      <label
        htmlFor={inputId}
        className={joinClassNames(
          "flex w-full items-start gap-3",
          disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        )}
      >
        <span className="relative mt-0.5 shrink-0" style={fieldStyle}>
          <input
            {...props}
            id={inputId}
            ref={(node) => {
              inputRef.current = node;
              setForwardedRef(ref, node);
            }}
            type="checkbox"
            disabled={disabled}
            required={required}
            aria-describedby={describedBy}
            aria-invalid={resolvedAriaInvalid}
            className="peer sr-only"
          />

          <span
            className={joinClassNames(
              "relative flex h-5 w-5 items-center justify-center rounded-md border bg-[var(--fhl-checkbox-bg)] text-[var(--fhl-checkbox-current-checked-color)] shadow-sm transition",
              "border-[var(--fhl-checkbox-current-border)] peer-checked:bg-[var(--fhl-checkbox-current-checked-bg)] peer-indeterminate:bg-[var(--fhl-checkbox-current-checked-bg)]",
              "peer-checked:[&>svg]:opacity-100 peer-indeterminate:[&>svg]:opacity-0 peer-indeterminate:[&>span]:opacity-100",
              "peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--fhl-checkbox-current-ring)]",
              "peer-disabled:border-[var(--fhl-checkbox-border)] peer-disabled:bg-[var(--fhl-checkbox-disabled-bg)]",
              controlClassName,
            )}
          >
            <FiCheck
              className="h-3.5 w-3.5 opacity-0 transition"
              aria-hidden="true"
              focusable="false"
            />
            <span className="absolute h-0.5 w-2.5 rounded-full bg-current opacity-0 transition peer-indeterminate:opacity-100" />
          </span>
        </span>

        <span className="min-w-0 space-y-1">
          {label ? (
            <Text
              as="span"
              size={TEXT_SIZE.SM}
              weight={TEXT_WEIGHT.SEMIBOLD}
              className={joinClassNames(
                "block text-[var(--fhl-checkbox-label)]",
                labelClassName,
              )}
            >
              {label}
              {required ? (
                <span className="ml-1 text-[var(--fhl-color-primary)]">*</span>
              ) : null}
            </Text>
          ) : null}

          {helperText ? (
            <Text
              as="p"
              id={helperId}
              size={TEXT_SIZE.XS}
              weight={TEXT_WEIGHT.MEDIUM}
              tone={TEXT_TONE.MUTED}
              className={joinClassNames(
                "text-[var(--fhl-checkbox-helper)]",
                helperClassName,
              )}
            >
              {helperText}
            </Text>
          ) : null}
        </span>
      </label>

      {statusMessage ? (
        <Text
          as="p"
          id={statusId}
          size={TEXT_SIZE.XS}
          weight={TEXT_WEIGHT.SEMIBOLD}
          className={statusClassName}
          style={{ color: "var(--fhl-checkbox-current-message)" }}
        >
          {statusMessage}
        </Text>
      ) : null}
    </div>
  );
});
