import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE = Object.freeze({
  DEFAULT: "default",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
});

const FEEDBACK_TONE_STYLES = {
  [PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.DEFAULT]: {
    backgroundColor: "var(--fhl-color-surface-soft)",
    borderColor: "var(--fhl-color-border)",
    color: "var(--fhl-color-text-muted)",
  },
  [PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.SUCCESS]: {
    backgroundColor: "var(--fhl-color-success-soft)",
    borderColor: "var(--fhl-color-success-border)",
    color: "var(--fhl-color-success)",
  },
  [PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.WARNING]: {
    backgroundColor: "var(--fhl-color-warning-soft)",
    borderColor: "var(--fhl-color-warning-border)",
    color: "var(--fhl-color-warning)",
  },
  [PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.DANGER]: {
    backgroundColor: "var(--fhl-color-alert-soft)",
    borderColor: "var(--fhl-color-alert-border)",
    color: "var(--fhl-color-alert)",
  },
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function StarIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.066 3.28a1 1 0 00.95.69h3.448c.969 0 1.371 1.24.588 1.81l-2.79 2.027a1 1 0 00-.364 1.118l1.066 3.28c.3.922-.755 1.688-1.539 1.118l-2.79-2.027a1 1 0 00-1.176 0l-2.79 2.027c-.783.57-1.838-.196-1.539-1.118l1.066-3.28a1 1 0 00-.364-1.118L2.997 8.707c-.783-.57-.38-1.81.588-1.81h3.448a1 1 0 00.95-.69l1.066-3.28z" />
    </svg>
  );
}

function FallbackCover({ label }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--fhl-color-surface-soft)] px-4 text-center">
      <Text as="span" size={TEXT_SIZE.XS} tone={TEXT_TONE.MUTED}>
        {label}
      </Text>
    </div>
  );
}

export function PropertyDashboardCard({
  title,
  propertyType,
  address,
  coverImageUrl,
  coverImageAlt,
  onOpen,
  onEdit,
  editIcon: EditIcon,
  editLabel = "Edit property",
  imageFallbackLabel = "No cover image",
  availableUnitsLabel,
  occupancyLabel,
  occupancyTone = PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.DEFAULT,
  ratingValue = null,
  ratingCount = 0,
  className = "",
}) {
  const hasRating =
    Number.isFinite(Number(ratingValue)) && Number(ratingCount) > 0;
  const feedbackStyle =
    FEEDBACK_TONE_STYLES[occupancyTone] ??
    FEEDBACK_TONE_STYLES[PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.DEFAULT];
  const reviewCountLabel =
    ratingCount === 1 ? "1 review" : `${ratingCount} reviews`;

  return (
    <article
      className={joinClassNames(
        "group relative overflow-hidden rounded-2xl border transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_40px_-26px_var(--fhl-color-shadow)]",
        className,
      )}
      style={{
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface)",
        boxShadow: "0 12px 28px -24px var(--fhl-color-shadow)",
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Open ${title}`}
      >
        <div className="relative h-44 overflow-hidden bg-[var(--fhl-color-surface-soft)]">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt={coverImageAlt || `${title} cover`}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <FallbackCover label={imageFallbackLabel} />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <Text
                as="p"
                size={TEXT_SIZE.XS}
                weight={TEXT_WEIGHT.SEMIBOLD}
                tone={TEXT_TONE.MUTED}
                uppercase
              >
                {propertyType || "Property"}
              </Text>
              <Text
                as="h3"
                size={TEXT_SIZE.LG}
                weight={TEXT_WEIGHT.SEMIBOLD}
                className="truncate"
              >
                {title}
              </Text>
            </div>

            <div className="shrink-0 rounded-full border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface-soft)] px-2.5 py-1">
              {hasRating ? (
                <div className="flex items-center gap-1.5">
                  <StarIcon className="h-4 w-4 text-[var(--fhl-color-primary)]" />
                  <Text
                    as="span"
                    size={TEXT_SIZE.XS}
                    weight={TEXT_WEIGHT.SEMIBOLD}
                  >
                    {Number(ratingValue).toFixed(1)}
                  </Text>
                </div>
              ) : (
                <Text
                  as="span"
                  size={TEXT_SIZE.XS}
                  weight={TEXT_WEIGHT.SEMIBOLD}
                  tone={TEXT_TONE.MUTED}
                >
                  New
                </Text>
              )}
            </div>
          </div>

          <Text
            as="p"
            size={TEXT_SIZE.SM}
            tone={TEXT_TONE.MUTED}
            className="min-h-[2.75rem]"
          >
            {address}
          </Text>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface-soft)] px-3 py-1.5">
              <Text
                as="span"
                size={TEXT_SIZE.XS}
                weight={TEXT_WEIGHT.SEMIBOLD}
              >
                {availableUnitsLabel}
              </Text>
            </div>

            {occupancyLabel ? (
              <div
                className="rounded-full border px-3 py-1.5"
                style={feedbackStyle}
              >
                <Text
                  as="span"
                  size={TEXT_SIZE.XS}
                  weight={TEXT_WEIGHT.SEMIBOLD}
                  tone={TEXT_TONE.INHERIT}
                >
                  {occupancyLabel}
                </Text>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <StarIcon className="h-4 w-4 text-[var(--fhl-color-primary)]" />
            {hasRating ? (
              <Text as="p" size={TEXT_SIZE.XS} tone={TEXT_TONE.MUTED}>
                {`${Number(ratingValue).toFixed(1)} average · ${reviewCountLabel}`}
              </Text>
            ) : (
              <Text as="p" size={TEXT_SIZE.XS} tone={TEXT_TONE.MUTED}>
                No ratings yet
              </Text>
            )}
          </div>
        </div>
      </button>

      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--fhl-color-surface)] text-[var(--fhl-color-text)] shadow-sm transition hover:bg-[var(--fhl-color-hover-soft)]"
          style={{ borderColor: "var(--fhl-color-border)" }}
          aria-label={editLabel}
          title={editLabel}
        >
          {EditIcon ? (
            <EditIcon className="h-4.5 w-4.5" aria-hidden="true" focusable="false" />
          ) : null}
        </button>
      ) : null}
    </article>
  );
}
