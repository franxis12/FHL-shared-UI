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

function ProgressStepNumber({ number, className = "" }) {
  return <span className={className}>{number}</span>;
}

function DashboardProgressSteps({ checklist }) {
  return (
    <div className="overflow-x-auto pb-1 pt-4">
      <ol
        className="flex min-w-[44rem] items-start"
        aria-label="Progress steps"
      >
        {checklist.map((item, index) => {
          const state = progressStepState(checklist, index);
          const connectorIsReached = index > 0 && state !== "upcoming";
          const isActionable = Boolean(item.href || item.onClick);
          const StepIcon = (props) => (
            <ProgressStepNumber {...props} number={index + 1} />
          );

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

              <div
                className={`relative z-10 rounded-full ${
                  state === "current"
                    ? "ring-4 ring-[var(--fhl-color-selected-soft)]"
                    : ""
                }`}
              >
                <Button
                  href={isActionable ? item.href : undefined}
                  onClick={isActionable ? item.onClick : undefined}
                  disabled={!isActionable}
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
                  size={TEXT_SIZE.SM}
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
  summary = "",
  checklist = [],
}) {
  return (
    <Container
      title={title}
      description={description}
      footer={
        summary ? (
          <Text as="p" size={TEXT_SIZE.SM} tone={TEXT_TONE.MUTED}>
            {summary}
          </Text>
        ) : null
      }
      padding={CONTAINER_PADDING.SM}
      radius={CONTAINER_RADIUS.XL}
      surface={CONTAINER_SURFACE.DEFAULT}
    >
      <DashboardProgressSteps checklist={checklist} />
    </Container>
  );
}
