import {
  Button,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from "../Button";
import {
  Container,
  CONTAINER_PADDING,
  CONTAINER_RADIUS,
  CONTAINER_SURFACE,
} from "../Container";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export function DashboardProgressCard({
  title = "Progress",
  description = "",
  percent = 0,
  summary = "",
  checklist = [],
  actionLabel = "",
  actionHref,
  onActionClick,
}) {
  const boundedPercent = Math.max(0, Math.min(Number(percent) || 0, 100));

  return (
    <Container
      title={title}
      description={description}
      headerAction={
        actionLabel ? (
          <Button
            href={actionHref}
            onClick={onActionClick}
            variant={BUTTON_VARIANT.OUTLINE}
            size={BUTTON_SIZE.SM}
            shape={BUTTON_SHAPE.PILL}
          >
            {actionLabel}
          </Button>
        ) : null
      }
      padding={CONTAINER_PADDING.MD}
      radius={CONTAINER_RADIUS.XL}
      surface={CONTAINER_SURFACE.DEFAULT}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <Text as="p" size={TEXT_SIZE.SM} weight={TEXT_WEIGHT.SEMIBOLD}>
            Progress
          </Text>
          <Text
            as="p"
            size={TEXT_SIZE.SM}
            weight={TEXT_WEIGHT.BOLD}
            tone={TEXT_TONE.PRIMARY}
          >
            {boundedPercent}%
          </Text>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--fhl-color-surface-soft)]">
          <div
            className="h-full rounded-full bg-[var(--fhl-color-accent)] transition-[width] duration-200"
            style={{ width: `${boundedPercent}%` }}
          />
        </div>

        {summary ? (
          <Text
            as="p"
            size={TEXT_SIZE.XS}
            tone={TEXT_TONE.MUTED}
            className="mt-2"
          >
            {summary}
          </Text>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {checklist.map((item, index) => (
          <div
            key={item.key ?? item.label ?? index}
            className="flex items-center gap-3 rounded-2xl bg-[var(--fhl-color-surface-soft)] px-4 py-3"
          >
            <div
              className={[
                "grid h-9 w-9 shrink-0 place-items-center rounded-full border",
                item.done
                  ? "border-[var(--fhl-color-success-border)] bg-[var(--fhl-color-success-soft)] text-[var(--fhl-color-success)]"
                  : "border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface)] text-[var(--fhl-color-primary)]",
              ].join(" ")}
            >
              {item.done ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    d="m5 13 4 4L19 7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              )}
            </div>
            <Text as="p" size={TEXT_SIZE.SM} weight={TEXT_WEIGHT.SEMIBOLD}>
              {item.label}
            </Text>
          </div>
        ))}
      </div>
    </Container>
  );
}
