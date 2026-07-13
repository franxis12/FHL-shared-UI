export const BADGE_TONE = Object.freeze({
  NEUTRAL: "neutral",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
});

export const BADGE_SIZE = Object.freeze({
  SM: "sm",
  MD: "md",
});

const TONE_STYLES = {
  [BADGE_TONE.NEUTRAL]: {
    backgroundColor: "var(--fhl-color-surface-soft)",
    borderColor: "var(--fhl-color-border)",
    color:
      "color-mix(in oklab, var(--fhl-color-text-muted) 85%, var(--fhl-color-text) 15%)",
  },
  [BADGE_TONE.INFO]: {
    backgroundColor:
      "color-mix(in oklab, var(--fhl-color-primary) 12%, transparent)",
    borderColor: "var(--fhl-color-selected-soft)",
    color: "var(--fhl-color-primary-strong)",
  },
  [BADGE_TONE.SUCCESS]: {
    backgroundColor: "var(--fhl-color-success-soft)",
    borderColor: "var(--fhl-color-success-border)",
    color:
      "color-mix(in oklab, var(--fhl-color-success) 85%, var(--fhl-color-text) 15%)",
  },
  [BADGE_TONE.WARNING]: {
    backgroundColor: "var(--fhl-color-warning-soft)",
    borderColor: "var(--fhl-color-warning-border)",
    color:
      "color-mix(in oklab, var(--fhl-color-warning) 85%, var(--fhl-color-text) 15%)",
  },
  [BADGE_TONE.ERROR]: {
    backgroundColor: "var(--fhl-color-alert-soft)",
    borderColor: "var(--fhl-color-alert-border)",
    color:
      "color-mix(in oklab, var(--fhl-color-alert) 85%, var(--fhl-color-text) 15%)",
  },
};

const SIZE_CLASSES = {
  [BADGE_SIZE.SM]: "px-2.5 py-1 text-[11px]",
  [BADGE_SIZE.MD]: "px-3 py-1.5 text-xs",
};

const ICON_SIZE_CLASSES = {
  [BADGE_SIZE.SM]: "h-3.5 w-3.5",
  [BADGE_SIZE.MD]: "h-4 w-4",
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

const FORWARDED_HTML_PROPS = new Set(["dir", "id", "lang", "role", "title"]);

function getSemanticHtmlProps(props) {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([name]) =>
        FORWARDED_HTML_PROPS.has(name) ||
        name.startsWith("aria-") ||
        name.startsWith("data-"),
    ),
  );
}

export function Badge({
  children,
  tone = BADGE_TONE.NEUTRAL,
  size = BADGE_SIZE.SM,
  icon: Icon,
  uppercase = false,
  ...rest
}) {
  // Badge owns its visual and non-interactive contract. Consumers can forward
  // semantic, data and ARIA attributes, but not styling or event handlers.
  const htmlProps = getSemanticHtmlProps(rest);

  const resolvedTone = TONE_STYLES[tone] ?? TONE_STYLES[BADGE_TONE.NEUTRAL];
  const resolvedSize = SIZE_CLASSES[size] ?? SIZE_CLASSES[BADGE_SIZE.SM];
  const resolvedIconSize =
    ICON_SIZE_CLASSES[size] ?? ICON_SIZE_CLASSES[BADGE_SIZE.SM];

  return (
    <span
      {...htmlProps}
      className={joinClassNames(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border font-semibold",
        "break-words",
        resolvedSize,
        uppercase ? "uppercase tracking-[0.12em]" : "",
      )}
      style={resolvedTone}
    >
      {Icon ? (
        <Icon
          className={joinClassNames(resolvedIconSize, "shrink-0")}
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
      <span className="min-w-0">{children}</span>
    </span>
  );
}
