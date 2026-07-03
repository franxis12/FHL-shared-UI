import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses = {
  primary:
    "border-transparent bg-[var(--fhl-button-primary-bg)] text-[var(--fhl-button-primary-text)] hover:bg-[var(--fhl-button-primary-hover)] focus-visible:ring-[var(--fhl-button-primary-ring)]",
  secondary:
    "border-[var(--fhl-button-secondary-border)] bg-[var(--fhl-button-secondary-bg)] text-[var(--fhl-button-secondary-text)] hover:bg-[var(--fhl-button-secondary-hover)] focus-visible:ring-[var(--fhl-button-secondary-ring)]",
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  icon: Icon,
  type = "button",
  className = "",
}) {
  const classes = joinClassNames(
    baseClasses,
    variantClasses[variant] ?? variantClasses.primary,
    className,
  );

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {Icon ? (
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" />
      ) : null}
      <Text
        as="span"
        size={TEXT_SIZE.SM}
        weight={TEXT_WEIGHT.SEMIBOLD}
        tone={TEXT_TONE.INHERIT}
      >
        {children}
      </Text>
    </button>
  );
}
