function getBadgeKey(badge, index) {
  return badge.key ?? badge.label ?? index;
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4.5 6.75h15M4.5 12h15m-15 5.25h15"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardTopbar({
  dashboardLabel = "Dashboard",
  currentTabLabel = "Overview",
  currentTabHint = "",
  displayName = "User",
  userLabel = "Logged user",
  topbarBadges = [],
  avatarContent,
  mobileMenuButton,
  className = "",
  style,
}) {
  const resolvedDisplayName = String(displayName || "User").trim() || "User";
  const resolvedAvatarContent =
    avatarContent ?? resolvedDisplayName.charAt(0).toUpperCase();
  const resolvedClassName = `px-4 py-3 md:px-5 ${className}`.trim();
  const MobileMenuIcon = mobileMenuButton?.icon ?? MenuIcon;
  const mobileMenuLabel = mobileMenuButton?.label ?? "Open menu";

  return (
    <header
      className={resolvedClassName}
      style={{
        backgroundColor: "var(--fhl-color-surface)",
        ...style,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {mobileMenuButton?.onClick ? (
            <button
              type="button"
              onClick={mobileMenuButton.onClick}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition hover:bg-[var(--fhl-color-surface-soft)] md:hidden"
              style={{
                borderColor: "var(--fhl-color-border)",
                backgroundColor: "var(--fhl-color-surface)",
                color: "var(--fhl-color-text)",
              }}
              aria-label={mobileMenuLabel}
              title={mobileMenuLabel}
            >
              {mobileMenuButton.content ?? (
                <MobileMenuIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          ) : null}

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
