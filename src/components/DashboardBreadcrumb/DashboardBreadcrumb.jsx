function getBreadcrumbKey(item, index) {
  return item.key ?? item.href ?? item.label ?? index;
}

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" {...props}>
      <path
        d="m8 5 4 5-4 5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardBreadcrumb({ items = [], className = "" }) {
  const resolvedClassName = `flex flex-wrap items-center gap-1.5 text-xs font-semibold ${className}`.trim();

  return (
    <nav className={resolvedClassName} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const label = item?.label ?? "";
        const isLast = item?.isCurrent ?? index === items.length - 1;
        const sharedClassName = isLast
          ? "text-[var(--fhl-color-text)]"
          : "text-[var(--fhl-color-text-muted)] hover:underline";

        return (
          <span
            key={getBreadcrumbKey(item, index)}
            className="inline-flex items-center gap-1.5"
          >
            {index > 0 ? (
              <ChevronRightIcon
                className="h-3.5 w-3.5 shrink-0 text-[var(--fhl-color-text-muted)]"
                aria-hidden="true"
                focusable="false"
              />
            ) : null}

            {item.href ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className={sharedClassName}
                aria-current={isLast ? "page" : undefined}
              >
                {label}
              </a>
            ) : item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className={sharedClassName}
                aria-current={isLast ? "page" : undefined}
              >
                {label}
              </button>
            ) : (
              <span
                className={isLast ? "text-[var(--fhl-color-text)]" : "text-[var(--fhl-color-text-muted)]"}
                aria-current={isLast ? "page" : undefined}
              >
                {label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
