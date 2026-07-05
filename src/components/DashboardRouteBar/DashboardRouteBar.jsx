import { DashboardBreadcrumb } from "../DashboardBreadcrumb";

function getRouteActionKey(action, index) {
  return action.key ?? action.href ?? action.label ?? index;
}

function getActionClassName(variant = "secondary") {
  if (variant === "primary") {
    return "rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-60";
  }

  if (variant === "ghost") {
    return "rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--fhl-color-text)] transition hover:bg-[var(--fhl-color-surface-soft)] disabled:opacity-60";
  }

  return "rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-60";
}

function getActionStyle(variant = "secondary") {
  if (variant === "primary") {
    return {
      backgroundColor: "var(--fhl-color-accent)",
      color: "var(--fhl-color-accent-contrast)",
    };
  }

  if (variant === "ghost") {
    return undefined;
  }

  return {
    backgroundColor: "var(--fhl-color-surface-soft)",
    color: "var(--fhl-color-text)",
  };
}

function DashboardRouteAction({ action }) {
  const label = action.loading
    ? (action.loadingLabel ?? `${action.label}...`)
    : action.label;
  const sharedProps = {
    className: getActionClassName(action.variant),
    style: getActionStyle(action.variant),
    title: action.title,
    "aria-label": action.ariaLabel ?? label,
  };

  if (action.href && !action.disabled) {
    return (
      <a href={action.href} onClick={action.onClick} {...sharedProps}>
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={action.onClick}
      disabled={action.disabled || action.loading}
      {...sharedProps}
    >
      {label}
    </button>
  );
}

export function DashboardRouteBar({
  breadcrumbItems = [],
  actions = [],
  className = "",
  style,
}) {
  const resolvedClassName = `px-4 py-2 md:px-5 ${className}`.trim();

  return (
    <section
      className={resolvedClassName}
      style={{
        backgroundColor: "var(--fhl-color-surface)",
        ...style,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <DashboardBreadcrumb items={breadcrumbItems} />

        {actions.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {actions.map((action, index) => (
              <DashboardRouteAction
                key={getRouteActionKey(action, index)}
                action={action}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
