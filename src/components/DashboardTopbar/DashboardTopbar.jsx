function getBadgeKey(badge, index) {
  return badge.key ?? badge.label ?? index;
}

export function DashboardTopbar({
  dashboardLabel = "Dashboard",
  currentTabLabel = "Overview",
  currentTabHint = "",
  displayName = "User",
  userLabel = "Logged user",
  topbarBadges = [],
  avatarContent,
  className = "",
  style,
}) {
  const resolvedDisplayName = String(displayName || "User").trim() || "User";
  const resolvedAvatarContent =
    avatarContent ?? resolvedDisplayName.charAt(0).toUpperCase();
  const resolvedClassName = `px-4 py-3 md:px-5 ${className}`.trim();

  return (
    <header
      className={resolvedClassName}
      style={{
        backgroundColor: "var(--fhl-color-surface)",
        ...style,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--fhl-color-primary-strong)] uppercase">
            {dashboardLabel}
          </p>
          <h1 className="mt-1 text-xl font-bold text-[var(--fhl-color-text)] md:text-2xl">
            {currentTabLabel}
          </h1>
          {currentTabHint ? (
            <p className="mt-1 text-xs text-[var(--fhl-color-text-muted)] md:text-sm">
              {currentTabHint}
            </p>
          ) : null}

          {topbarBadges.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {topbarBadges.map((badge, index) => (
                <span
                  key={getBadgeKey(badge, index)}
                  className="rounded-full px-3 py-1 text-[11px] font-medium"
                  style={{
                    backgroundColor: "var(--fhl-color-surface-soft)",
                    color: "var(--fhl-color-text-muted)",
                  }}
                >
                  {badge.label}: {badge.value}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="inline-flex items-center gap-2 pl-1">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
            style={{
              backgroundColor: "var(--fhl-color-surface)",
              color: "var(--fhl-color-primary)",
            }}
          >
            {resolvedAvatarContent}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--fhl-color-text-muted)]">
              {userLabel}
            </p>
            <p className="truncate text-sm font-semibold text-[var(--fhl-color-text)]">
              {resolvedDisplayName}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
