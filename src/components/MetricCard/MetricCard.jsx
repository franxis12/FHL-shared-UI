export function MetricCard({ label, value, hint, icon: Icon }) {
  return (
    <article
      className="rounded-2xl border p-5"
      style={{
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface)",
        boxShadow: `0 10px 24px var(--fhl-color-shadow)`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--fhl-color-text-muted)]">
          {label}
        </p>
        {Icon ? (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
            style={{
              borderColor: "var(--fhl-color-primary)",
              color: "var(--fhl-color-primary)",
            }}
          >
            <Icon className="h-4 w-4" aria-hidden="true" focusable="false" />
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-4xl font-extrabold text-[var(--fhl-color-text)]">
        {value}
      </p>
      <p className="mt-2 text-sm text-[var(--fhl-color-text-muted)]">{hint}</p>
    </article>
  );
}
