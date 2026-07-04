import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const STAT_ITEM_SIZE = Object.freeze({
  SM: "sm",
  MD: "md",
  LG: "lg",
});

const ICON_SIZE_CLASSES = {
  [STAT_ITEM_SIZE.SM]: "h-5 w-5",
  [STAT_ITEM_SIZE.MD]: "h-6 w-6",
  [STAT_ITEM_SIZE.LG]: "h-7 w-7",
};

const VALUE_TEXT_SIZE = {
  [STAT_ITEM_SIZE.SM]: TEXT_SIZE.SM,
  [STAT_ITEM_SIZE.MD]: TEXT_SIZE.MD,
  [STAT_ITEM_SIZE.LG]: TEXT_SIZE.LG,
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function StatItem({
  icon: Icon,
  value,
  label,
  size = STAT_ITEM_SIZE.MD,
  align = "center",
  className = "",
}) {
  return (
    <div
      className={joinClassNames(
        "flex items-center gap-3 px-2",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {Icon ? (
        <Icon
          className={joinClassNames(
            ICON_SIZE_CLASSES[size] ?? ICON_SIZE_CLASSES.md,
            "shrink-0 text-[var(--fhl-color-primary)]",
          )}
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
      <div className="text-left">
        <Text
          as="p"
          size={VALUE_TEXT_SIZE[size] ?? VALUE_TEXT_SIZE.md}
          weight={TEXT_WEIGHT.BOLD}
        >
          {value}
        </Text>
        <Text as="p" size={TEXT_SIZE.XS} weight={TEXT_WEIGHT.SEMIBOLD} tone={TEXT_TONE.MUTED}>
          {label}
        </Text>
      </div>
    </div>
  );
}
