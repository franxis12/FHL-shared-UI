import { Text, TEXT_SIZE, TEXT_WEIGHT } from "../Text";

export const NOTICE_TONE = Object.freeze({
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
});

const TONE_STYLES = {
  [NOTICE_TONE.INFO]: {
    borderColor: "var(--fhl-color-selected-soft)",
    backgroundColor: "color-mix(in oklab, var(--fhl-color-primary) 12%, transparent)",
    textColor: "var(--fhl-color-primary-strong)",
  },
  [NOTICE_TONE.SUCCESS]: {
    borderColor: "var(--fhl-color-success-border)",
    backgroundColor: "var(--fhl-color-success-soft)",
    textColor: "var(--fhl-color-success)",
  },
  [NOTICE_TONE.WARNING]: {
    borderColor: "var(--fhl-color-warning-border)",
    backgroundColor: "var(--fhl-color-warning-soft)",
    textColor: "var(--fhl-color-warning)",
  },
  [NOTICE_TONE.ERROR]: {
    borderColor: "var(--fhl-color-alert-border)",
    backgroundColor: "var(--fhl-color-alert-soft)",
    textColor: "var(--fhl-color-alert)",
  },
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function Notice({
  tone = NOTICE_TONE.INFO,
  children,
  className = "",
  textClassName = "",
}) {
  if (!children) {
    return null;
  }

  const styles = TONE_STYLES[tone] ?? TONE_STYLES[NOTICE_TONE.INFO];

  return (
    <div
      className={joinClassNames(
        "rounded-2xl border px-4 py-3",
        className,
      )}
      style={{
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
      }}
    >
      <Text
        as="p"
        size={TEXT_SIZE.SM}
        weight={TEXT_WEIGHT.SEMIBOLD}
        className={textClassName}
        style={{ color: styles.textColor }}
      >
        {children}
      </Text>
    </div>
  );
}
