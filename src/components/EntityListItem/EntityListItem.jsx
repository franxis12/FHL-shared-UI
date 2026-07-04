function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

const BADGE_TONE_STYLES = {
  default: {
    backgroundColor: "var(--fhl-color-surface-soft)",
    borderColor: "var(--fhl-color-border)",
    color: "var(--fhl-color-text-muted)",
  },
  success: {
    backgroundColor: "var(--fhl-color-success-soft)",
    borderColor: "var(--fhl-color-success-border)",
    color: "var(--fhl-color-success)",
  },
  warning: {
    backgroundColor: "var(--fhl-color-warning-soft)",
    borderColor: "var(--fhl-color-warning-border)",
    color: "var(--fhl-color-warning)",
  },
  danger: {
    backgroundColor: "var(--fhl-color-alert-soft)",
    borderColor: "var(--fhl-color-alert-border)",
    color: "var(--fhl-color-alert)",
  },
};

function FallbackMedia({ label }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--fhl-color-surface-soft)] px-3 text-center text-xs font-medium text-[var(--fhl-color-text-muted)]">
      {label}
    </div>
  );
}

function renderBadge(badge, index) {
  const styles = BADGE_TONE_STYLES[badge?.tone] || BADGE_TONE_STYLES.default;

  return (
    <span
      key={badge?.key || `${badge?.label || "badge"}-${index}`}
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      style={styles}
    >
      {badge?.label}
    </span>
  );
}

export function EntityListItem({
  imageUrl = "",
  imageAlt = "",
  imageFallbackLabel = "No image",
  eyebrow = "",
  title,
  subtitle = "",
  description = "",
  meta = [],
  badges = [],
  onClick,
  onContextMenu,
  onActionsClick,
  actionsLabel = "Actions",
  actionIcon: ActionIcon,
  className = "",
}) {
  return (
    <article
      className={joinClassNames(
        "group flex min-w-0 items-stretch gap-3 rounded-xl border p-3 transition",
        "hover:border-[var(--fhl-color-primary)] hover:bg-[color-mix(in_srgb,var(--fhl-color-surface)_92%,var(--fhl-color-primary)_8%)]",
        className,
      )}
      style={{
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface)",
        boxShadow: "0 10px 24px -22px var(--fhl-color-shadow)",
      }}
      onContextMenu={onContextMenu}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex min-w-0 flex-1 items-start gap-3 text-left"
      >
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface-soft)]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || `${title} cover`}
              className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <FallbackMedia label={imageFallbackLabel} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--fhl-color-text-muted)]">
              {eyebrow}
            </p>
          ) : null}

          <div className="mt-1 flex min-w-0 flex-wrap items-start gap-2">
            <h3 className="truncate text-base font-semibold text-[var(--fhl-color-text)]">
              {title}
            </h3>
            {badges.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1">
                {badges.map(renderBadge)}
              </div>
            ) : null}
          </div>

          {subtitle ? (
            <p className="mt-1 text-sm text-[var(--fhl-color-text-muted)]">
              {subtitle}
            </p>
          ) : null}

          {description ? (
            <p className="mt-2 text-sm text-[var(--fhl-color-text)]">
              {description}
            </p>
          ) : null}

          {meta.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {meta.map((item, index) => (
                <div
                  key={item?.key || `${item?.label || "meta"}-${index}`}
                  className="rounded-full border border-[var(--fhl-color-border)] bg-[var(--fhl-color-surface-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--fhl-color-text)]"
                >
                  {item?.label ? `${item.label}: ` : ""}
                  <span className="text-[var(--fhl-color-text-muted)]">
                    {item?.value}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </button>

      {onActionsClick ? (
        <button
          type="button"
          onClick={onActionsClick}
          className="inline-flex h-11 shrink-0 items-center gap-2 self-center rounded-xl border px-3 text-sm font-semibold text-[var(--fhl-color-text)] transition hover:bg-[var(--fhl-color-surface-soft)]"
          style={{ borderColor: "var(--fhl-color-border)" }}
          aria-label={actionsLabel}
        >
          {ActionIcon ? (
            <ActionIcon className="h-4 w-4" aria-hidden="true" />
          ) : null}
          <span>{actionsLabel}</span>
        </button>
      ) : null}
    </article>
  );
}
