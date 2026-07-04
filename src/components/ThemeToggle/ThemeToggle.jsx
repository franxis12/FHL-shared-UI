import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const THEME_TOGGLE_MODE = Object.freeze({
  DARK: "dark",
  SYSTEM: "system",
  LIGHT: "light",
});

const DEFAULT_OPTIONS = [
  { mode: THEME_TOGGLE_MODE.DARK, label: "Dark" },
  { mode: THEME_TOGGLE_MODE.SYSTEM, label: "Auto" },
  { mode: THEME_TOGGLE_MODE.LIGHT, label: "Light" },
];

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getWrapperStyle(tone) {
  if (tone === "navy") {
    return {
      borderColor: "var(--color-navy-border, var(--fhl-color-border))",
      color: "var(--color-navy-text, var(--fhl-color-text))",
      backgroundColor:
        "color-mix(in oklab, var(--color-navy-surface, var(--fhl-color-surface)) 88%, white)",
    };
  }

  return {
    borderColor: "var(--fhl-color-border)",
    color: "var(--fhl-color-text)",
    backgroundColor: "var(--fhl-color-surface-soft)",
  };
}

export function ThemeToggle({
  value = THEME_TOGGLE_MODE.SYSTEM,
  onChange,
  options = DEFAULT_OPTIONS,
  compact = false,
  tone = "surface",
  className = "",
  ariaLabel = "Theme mode",
  disabled = false,
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={joinClassNames(
        "inline-flex items-center rounded-full border transition",
        compact ? "gap-1 px-1.5 py-2" : "gap-1 px-1.5 py-1.5",
        className,
      )}
      style={getWrapperStyle(tone)}
    >
      {options.map((option) => {
        const isSelected = value === option.mode;

        return (
          <button
            key={option.mode}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${option.label} mode`}
            title={`${option.label} mode`}
            disabled={disabled}
            onClick={() => onChange?.(option.mode)}
            className={joinClassNames(
              "inline-flex items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--fhl-color-accent-hover) focus-visible:ring-offset-2 focus-visible:ring-offset-(--fhl-color-bg) disabled:cursor-not-allowed disabled:opacity-60",
              compact ? "h-5 w-5" : "gap-1.5 px-2.5 py-1.5",
              isSelected
                ? "bg-(--fhl-color-accent) text-(--fhl-color-accent-contrast)"
                : "text-(--fhl-color-text-muted) hover:bg-(--fhl-color-hover-soft) hover:text-(--fhl-color-text)",
            )}
          >
            <span
              className={joinClassNames(
                "h-2 w-2 rounded-full",
                isSelected
                  ? "bg-(--fhl-color-accent-contrast)"
                  : "bg-current opacity-70",
              )}
            />
            {!compact ? (
              <Text
                as="span"
                size={TEXT_SIZE.XS}
                weight={TEXT_WEIGHT.SEMIBOLD}
                tone={TEXT_TONE.INHERIT}
              >
                {option.label}
              </Text>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
