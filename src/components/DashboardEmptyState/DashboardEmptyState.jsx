import { Button, BUTTON_SHAPE, BUTTON_SIZE, BUTTON_VARIANT } from "../Button";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function DashboardEmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onActionClick,
  actionVariant = BUTTON_VARIANT.SECONDARY,
  className = "",
}) {
  return (
    <div
      className={joinClassNames(
        "rounded-2xl border border-dashed p-5",
        className,
      )}
      style={{
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface-soft)",
      }}
    >
      <Text as="p" size={TEXT_SIZE.SM} weight={TEXT_WEIGHT.SEMIBOLD}>
        {title}
      </Text>
      {description ? (
        <Text
          as="p"
          size={TEXT_SIZE.SM}
          tone={TEXT_TONE.MUTED}
          className="mt-1"
        >
          {description}
        </Text>
      ) : null}

      {actionLabel ? (
        <div className="mt-4">
          <Button
            href={actionHref}
            onClick={onActionClick}
            variant={actionVariant}
            size={BUTTON_SIZE.SM}
            shape={BUTTON_SHAPE.PILL}
          >
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
