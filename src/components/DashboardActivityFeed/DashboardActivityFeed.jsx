import {
  Container,
  CONTAINER_PADDING,
  CONTAINER_RADIUS,
  CONTAINER_SURFACE,
} from "../Container";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";
import { DashboardEmptyState } from "../DashboardEmptyState";

const TONE_STYLES = {
  default: {
    backgroundColor: "var(--fhl-color-surface-soft)",
    color: "var(--fhl-color-text-muted)",
  },
  success: {
    backgroundColor: "var(--fhl-color-success-soft)",
    color: "var(--fhl-color-success)",
  },
  warning: {
    backgroundColor: "var(--fhl-color-warning-soft)",
    color: "var(--fhl-color-warning)",
  },
  danger: {
    backgroundColor: "var(--fhl-color-alert-soft)",
    color: "var(--fhl-color-alert)",
  },
  primary: {
    backgroundColor:
      "color-mix(in oklab, var(--fhl-color-primary) 12%, transparent)",
    color: "var(--fhl-color-primary-strong)",
  },
};

export function DashboardActivityFeed({
  title = "Activity Feed",
  description = "",
  items = [],
  emptyTitle = "No activity yet",
  emptyDescription = "",
}) {
  return (
    <Container
      title={title}
      description={description}
      padding={CONTAINER_PADDING.MD}
      radius={CONTAINER_RADIUS.XL}
      surface={CONTAINER_SURFACE.DEFAULT}
    >
      {items.length === 0 ? (
        <DashboardEmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => {
            const styles = TONE_STYLES[item.tone] ?? TONE_STYLES.default;

            return (
              <div
                key={item.id ?? `${item.title}-${index}`}
                className="flex gap-3"
              >
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                  style={styles}
                >
                  <span className="h-3 w-3 rounded-full bg-current" />
                </div>
                <div className="min-w-0">
                  <Text
                    as="p"
                    size={TEXT_SIZE.SM}
                    weight={TEXT_WEIGHT.SEMIBOLD}
                  >
                    {item.title}
                  </Text>
                  {item.description ? (
                    <Text
                      as="p"
                      size={TEXT_SIZE.SM}
                      tone={TEXT_TONE.MUTED}
                      className="mt-1"
                    >
                      {item.description}
                    </Text>
                  ) : null}
                  {item.dateLabel ? (
                    <Text
                      as="p"
                      size={TEXT_SIZE.XS}
                      tone={TEXT_TONE.MUTED}
                      className="mt-1"
                    >
                      {item.dateLabel}
                    </Text>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
