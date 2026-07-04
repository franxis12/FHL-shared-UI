export function MetricCard({ label, value, hint, icon: Icon }) {
  return (
    <article
      className="rounded-2xl border p-4"
      style={{
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface)",
        boxShadow: `0 10px 24px var(--fhl-color-shadow)`,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--fhl-color-text-muted)]">
          {label}
        </p>
        {Icon ? (
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor: "var(--fhl-color-primary)",
              color: "var(--fhl-color-primary)",
            }}
          >
            <Icon className="h-4 w-4" aria-hidden="true" focusable="false" />
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-extrabold text-[var(--fhl-color-text)]">
          {value}
        </p>
        <p className="text-xs text-[var(--fhl-color-text-muted)]">{hint}</p>
      </div>
    </article>
  );
}
