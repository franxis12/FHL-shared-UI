export const TEXT_SIZE = Object.freeze({
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  TWO_XL: "2xl",
  THREE_XL: "3xl",
  FOUR_XL: "4xl",
});

export const TEXT_WEIGHT = Object.freeze({
  REGULAR: "regular",
  MEDIUM: "medium",
  SEMIBOLD: "semibold",
  BOLD: "bold",
});

export const TEXT_TONE = Object.freeze({
  DEFAULT: "default",
  MUTED: "muted",
  PRIMARY: "primary",
  ACCENT: "accent",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  INHERIT: "inherit",
});

const SIZE_CLASSES = {
  [TEXT_SIZE.XS]:
    "text-[length:var(--fhl-text-size-xs)] leading-[var(--fhl-text-leading-xs)]",
  [TEXT_SIZE.SM]:
    "text-[length:var(--fhl-text-size-sm)] leading-[var(--fhl-text-leading-sm)]",
  [TEXT_SIZE.MD]:
    "text-[length:var(--fhl-text-size-md)] leading-[var(--fhl-text-leading-md)]",
  [TEXT_SIZE.LG]:
    "text-[length:var(--fhl-text-size-lg)] leading-[var(--fhl-text-leading-lg)]",
  [TEXT_SIZE.XL]:
    "text-[length:var(--fhl-text-size-xl)] leading-[var(--fhl-text-leading-xl)]",
  [TEXT_SIZE.TWO_XL]:
    "text-[length:var(--fhl-text-size-2xl)] leading-[var(--fhl-text-leading-2xl)]",
  [TEXT_SIZE.THREE_XL]:
    "text-[length:var(--fhl-text-size-3xl)] leading-[var(--fhl-text-leading-3xl)]",
  [TEXT_SIZE.FOUR_XL]:
    "text-[length:var(--fhl-text-size-4xl)] leading-[var(--fhl-text-leading-4xl)]",
};

const WEIGHT_CLASSES = {
  [TEXT_WEIGHT.REGULAR]: "font-normal",
  [TEXT_WEIGHT.MEDIUM]: "font-medium",
  [TEXT_WEIGHT.SEMIBOLD]: "font-semibold",
  [TEXT_WEIGHT.BOLD]: "font-bold",
};

const TONE_CLASSES = {
  [TEXT_TONE.DEFAULT]: "text-[var(--fhl-text-tone-default)]",
  [TEXT_TONE.MUTED]: "text-[var(--fhl-text-tone-muted)]",
  [TEXT_TONE.PRIMARY]: "text-[var(--fhl-text-tone-primary)]",
  [TEXT_TONE.ACCENT]: "text-[var(--fhl-text-tone-accent)]",
  [TEXT_TONE.SUCCESS]: "text-[var(--fhl-text-tone-success)]",
  [TEXT_TONE.WARNING]: "text-[var(--fhl-text-tone-warning)]",
  [TEXT_TONE.DANGER]: "text-[var(--fhl-text-tone-danger)]",
  [TEXT_TONE.INHERIT]: "text-inherit",
};

const ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function Text({
  as: Component = "p",
  children,
  size = TEXT_SIZE.MD,
  weight = TEXT_WEIGHT.REGULAR,
  tone = TEXT_TONE.DEFAULT,
  align = "left",
  truncate = false,
  uppercase = false,
  className = "",
  ...props
}) {
  return (
    <Component
      {...props}
      className={joinClassNames(
        SIZE_CLASSES[size] ?? SIZE_CLASSES[TEXT_SIZE.MD],
        WEIGHT_CLASSES[weight] ?? WEIGHT_CLASSES[TEXT_WEIGHT.REGULAR],
        TONE_CLASSES[tone] ?? TONE_CLASSES[TEXT_TONE.DEFAULT],
        ALIGN_CLASSES[align] ?? ALIGN_CLASSES.left,
        truncate ? "truncate" : "",
        uppercase ? "uppercase tracking-[0.14em]" : "",
        className,
      )}
    >
      {children}
    </Component>
  );
}
