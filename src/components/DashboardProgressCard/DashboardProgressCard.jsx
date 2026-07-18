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

export const DASHBOARD_PROGRESS_CARD_LAYOUT = Object.freeze({
  CHECKLIST: "checklist",
  STEPS: "steps",
});

function progressStepState(checklist, index) {
  if (checklist[index]?.done) return "complete";

  const firstIncompleteIndex = checklist.findIndex((item) => !item.done);
  return index === firstIncompleteIndex ? "current" : "upcoming";
}

function progressStepButtonVariant(state) {
  if (state === "complete") return BUTTON_VARIANT.PRIMARY;
  if (state === "current") return BUTTON_VARIANT.OUTLINE;
  return BUTTON_VARIANT.SECONDARY;
}

function ProgressCheckIcon({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        d="m5 13 4 4L19 7"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashboardProgressSteps({ checklist }) {
  return (
    <div className="overflow-x-auto pb-1">
      <ol
        className="flex min-w-[44rem] items-start pt-1"
        aria-label="Progress steps"
      >
        {checklist.map((item, index) => {
          const state = progressStepState(checklist, index);
          const connectorIsReached = index > 0 && state !== "upcoming";
          const isActionable = Boolean(item.href || item.onClick);
          const isDisabled = state === "upcoming" || !isActionable;
          const StepIcon =
            state === "complete"
              ? ProgressCheckIcon
              : function ProgressStepNumber() {
                  return <span>{index + 1}</span>;
                };

          return (
            <li
              key={item.key ?? item.label ?? index}
              className="relative grid min-w-0 flex-1 justify-items-center"
            >
              {index > 0 ? (
                <div
                  className={`absolute right-1/2 top-5 h-1 w-full ${
                    connectorIsReached
                      ? "bg-[var(--fhl-color-accent)]"
                      : "bg-[var(--fhl-color-border)]"
                  }`}
                  aria-hidden="true"
                />
              ) : null}

              <div className="relative z-10">
                <Button
                  href={isDisabled ? undefined : item.href}
                  onClick={isDisabled ? undefined : item.onClick}
                  disabled={isDisabled}
                  variant={progressStepButtonVariant(state)}
                  size={BUTTON_SIZE.SM}
                  shape={BUTTON_SHAPE.CIRCLE}
                  icon={StepIcon}
                  aria-label={`${item.label}: ${state}`}
                  aria-current={state === "current" ? "step" : undefined}
                />
              </div>

              <div className="mt-2 w-full px-2">
                <Text
                  as="p"
                  size={TEXT_SIZE.XS}
                  tone={
                    state === "current"
                      ? TEXT_TONE.ACCENT
                      : state === "upcoming"
                        ? TEXT_TONE.MUTED
                        : TEXT_TONE.DEFAULT
                  }
                  weight={
                    state === "current"
                      ? TEXT_WEIGHT.BOLD
                      : TEXT_WEIGHT.MEDIUM
                  }
                  align="center"
                >
                  {item.label}
                </Text>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function DashboardProgressCard({
  title = "Progress",
  description = "",
  percent = 0,
  summary = "",
  checklist = [],
  actionLabel = "",
  actionHref,
  onActionClick,
  layout = DASHBOARD_PROGRESS_CARD_LAYOUT.CHECKLIST,
}) {
  if (layout === DASHBOARD_PROGRESS_CARD_LAYOUT.STEPS) {
    return (
      <Container
        title={title}
        description={description}
        padding={CONTAINER_PADDING.SM}
        radius={CONTAINER_RADIUS.XL}
        surface={CONTAINER_SURFACE.DEFAULT}
      >
        <DashboardProgressSteps checklist={checklist} />
      </Container>
    );
  }

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
