import {
  Button,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from "../Button";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const DASHBOARD_RECORD_CARD_TONE = Object.freeze({
  DEFAULT: "default",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
});

const TONE_STYLES = {
  [DASHBOARD_RECORD_CARD_TONE.DEFAULT]: {
    borderColor: "var(--fhl-color-border)",
    backgroundColor: "var(--fhl-color-surface-soft)",
    color: "var(--fhl-color-text-muted)",
  },
  [DASHBOARD_RECORD_CARD_TONE.SUCCESS]: {
    borderColor: "var(--fhl-color-success-border)",
    backgroundColor: "var(--fhl-color-success-soft)",
    color: "var(--fhl-color-success)",
  },
  [DASHBOARD_RECORD_CARD_TONE.WARNING]: {
    borderColor: "var(--fhl-color-warning-border)",
    backgroundColor: "var(--fhl-color-warning-soft)",
    color: "var(--fhl-color-warning)",
  },
  [DASHBOARD_RECORD_CARD_TONE.DANGER]: {
    borderColor: "var(--fhl-color-alert-border)",
    backgroundColor: "var(--fhl-color-alert-soft)",
    color: "var(--fhl-color-alert)",
  },
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function FallbackMedia({ label }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--fhl-color-surface)] px-3 text-center">
      <Text as="span" size={TEXT_SIZE.XS} tone={TEXT_TONE.MUTED}>
        {label}
      </Text>
    </div>
  );
}

function StatusBadge({ label, tone }) {
  if (!label) return null;

  const styles = TONE_STYLES[tone] ?? TONE_STYLES.default;

  return (
    <span
      className="inline-flex rounded-full border px-3 py-1.5"
      style={{
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      }}
    >
      <Text
        as="span"
        size={TEXT_SIZE.XS}
        weight={TEXT_WEIGHT.SEMIBOLD}
        tone={TEXT_TONE.INHERIT}
        className="capitalize"
      >
        {label}
      </Text>
    </span>
  );
}

export function DashboardRecordCard({
  imageUrl = "",
  imageAlt = "",
  imageFallbackLabel = "No image available",
  title,
  subtitle = "",
  meta = "",
  statusLabel = "",
  statusTone = DASHBOARD_RECORD_CARD_TONE.DEFAULT,
  actions = [],
  className = "",
}) {
  const visibleActions = Array.isArray(actions)
    ? actions.filter((action) => action && action.label)
    : [];

  return (
    <article
      className={joinClassNames(
        "rounded-3xl border p-4",
        className,
      )}
      style={{
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface-soft)",
      }}
    >
      <div className="flex gap-3">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[var(--fhl-color-surface)]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <FallbackMedia label={imageFallbackLabel} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <Text
                as="h4"
                size={TEXT_SIZE.MD}
                weight={TEXT_WEIGHT.SEMIBOLD}
                truncate
              >
                {title}
              </Text>
              {subtitle ? (
                <Text
                  as="p"
                  size={TEXT_SIZE.SM}
                  tone={TEXT_TONE.MUTED}
                  className="mt-1"
                >
                  {subtitle}
                </Text>
              ) : null}
              {meta ? (
                <Text
                  as="p"
                  size={TEXT_SIZE.XS}
                  tone={TEXT_TONE.MUTED}
                  className="mt-1"
                >
                  {meta}
                </Text>
              ) : null}
            </div>

            <StatusBadge label={statusLabel} tone={statusTone} />
          </div>

          {visibleActions.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {visibleActions.map((action, index) => (
                <Button
                  key={action.key ?? `${action.label}-${index}`}
                  href={action.href}
                  onClick={action.onClick}
                  disabled={Boolean(action.isLoading)}
                  variant={action.variant ?? BUTTON_VARIANT.PRIMARY}
                  size={BUTTON_SIZE.SM}
                  shape={BUTTON_SHAPE.PILL}
                  className={action.className ?? ""}
                >
                  {action.isLoading
                    ? action.loadingLabel ?? action.label
                    : action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
