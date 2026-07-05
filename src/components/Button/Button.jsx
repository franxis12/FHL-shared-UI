import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const BUTTON_VARIANT = Object.freeze({
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  GHOST: "ghost",
});

export const BUTTON_SIZE = Object.freeze({
  SM: "sm",
  MD: "md",
  LG: "lg",
});

export const BUTTON_SHAPE = Object.freeze({
  DEFAULT: "default",
  PILL: "pill",
  CIRCLE: "circle",
});

const baseClasses =
  "inline-flex items-center justify-center gap-2 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses = {
  [BUTTON_VARIANT.PRIMARY]:
    "border-transparent bg-[var(--fhl-button-primary-bg)] text-[var(--fhl-button-primary-text)] hover:bg-[var(--fhl-button-primary-hover)] focus-visible:ring-[var(--fhl-button-primary-ring)]",
  [BUTTON_VARIANT.SECONDARY]:
    "border-[var(--fhl-button-secondary-border)] bg-[var(--fhl-button-secondary-bg)] text-[var(--fhl-button-secondary-text)] hover:bg-[var(--fhl-button-secondary-hover)] focus-visible:ring-[var(--fhl-button-secondary-ring)]",
  [BUTTON_VARIANT.OUTLINE]:
    "border-[var(--fhl-color-accent)] bg-transparent text-[var(--fhl-color-accent)] hover:bg-[var(--fhl-color-accent)] hover:text-[var(--fhl-color-accent-contrast)] focus-visible:ring-[var(--fhl-color-selected-soft)]",
  [BUTTON_VARIANT.GHOST]:
    "border-transparent bg-transparent text-[var(--fhl-color-text-muted)] hover:bg-[var(--fhl-color-surface-soft)] hover:text-[var(--fhl-color-primary)] focus-visible:ring-[var(--fhl-color-selected-soft)]",
};

const SIZE_CLASSES = {
  [BUTTON_SIZE.SM]: "h-10 px-3 text-sm",
  [BUTTON_SIZE.MD]: "px-4 py-2.5",
  [BUTTON_SIZE.LG]: "h-14 px-5",
};

const SHAPE_CLASSES = {
  [BUTTON_SHAPE.DEFAULT]: "rounded-xl",
  [BUTTON_SHAPE.PILL]: "rounded-full",
  [BUTTON_SHAPE.CIRCLE]: "rounded-full",
};

const ICON_ONLY_SIZE_CLASSES = {
  [BUTTON_SIZE.SM]: "h-10 w-10 p-0",
  [BUTTON_SIZE.MD]: "h-11 w-11 p-0",
  [BUTTON_SIZE.LG]: "h-14 w-14 p-0",
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function Button({
  as,
  href,
  children,
  variant = BUTTON_VARIANT.PRIMARY,
  size = BUTTON_SIZE.MD,
  shape = BUTTON_SHAPE.DEFAULT,
  fullWidth = false,
  disabled = false,
  onClick,
  icon: Icon,
  iconPosition = "start",
  iconClassName = "h-4 w-4 shrink-0",
  type = "button",
  className = "",
  ...rest
}) {
  const Component = href ? "a" : as || "button";
  const isAnchor = Component === "a";
  const isIconOnly = !children;

  const classes = joinClassNames(
    baseClasses,
    isIconOnly
      ? (ICON_ONLY_SIZE_CLASSES[size] ?? ICON_ONLY_SIZE_CLASSES.md)
      : (SIZE_CLASSES[size] ?? SIZE_CLASSES.md),
    SHAPE_CLASSES[shape] ?? SHAPE_CLASSES.default,
    variantClasses[variant] ?? variantClasses.primary,
    fullWidth ? "w-full" : "",
    disabled && isAnchor ? "pointer-events-none opacity-60" : "",
    className,
  );

  const componentProps = isAnchor
    ? { href, "aria-disabled": disabled || undefined }
    : { type, disabled };

  return (
    <Component
      {...componentProps}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {Icon && iconPosition === "start" ? (
        <Icon className={iconClassName} aria-hidden="true" focusable="false" />
      ) : null}
      {children ? (
        <Text
          as="span"
          size={size === BUTTON_SIZE.SM ? TEXT_SIZE.XS : TEXT_SIZE.SM}
          weight={TEXT_WEIGHT.SEMIBOLD}
          tone={TEXT_TONE.INHERIT}
        >
          {children}
        </Text>
      ) : null}
      {Icon && iconPosition === "end" ? (
        <Icon className={iconClassName} aria-hidden="true" focusable="false" />
      ) : null}
    </Component>
  );
}
