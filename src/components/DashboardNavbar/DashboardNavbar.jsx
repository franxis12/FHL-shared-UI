import { Button } from "../Button";

const defaultActionButton = {
  label: "Save",
  variant: "primary",
};

function getItemKey(item, index) {
  return item.key ?? item.href ?? item.label ?? index;
}

function DashboardNavItem({ item }) {
  const Icon = item.icon;
  const className = item.isActive
    ? "flex items-center gap-2 rounded-xl bg-(--color-primary-strong) px-3 py-2 text-sm font-semibold text-white"
    : "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-(--color-text-muted) transition hover:bg-(--color-surface-soft) hover:text-(--color-text)";
  const style = item.isActive ? { color: "#ffffff" } : undefined;

  if (item.href) {
    return (
      <a
        href={item.href}
        onClick={item.onClick}
        style={style}
        className={className}
        aria-current={item.isActive ? "page" : undefined}
      >
        {Icon ? (
          <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
        ) : null}
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      style={style}
      className={className}
      aria-current={item.isActive ? "page" : undefined}
    >
      {Icon ? (
        <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
      ) : null}
      <span>{item.label}</span>
    </button>
  );
}

function DashboardFooterItem({ item }) {
  const Icon = item.icon;

  if (item.href) {
    return (
      <a
        href={item.href}
        onClick={item.onClick}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-(--color-surface-soft)"
        style={{ color: "var(--color-text-muted)" }}
      >
        {Icon ? (
          <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
        ) : null}
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-(--color-surface-soft)"
      style={{ color: "var(--color-text-muted)" }}
    >
      {Icon ? (
        <Icon className="h-5 w-5" aria-hidden="true" focusable="false" />
      ) : null}
      <span>{item.label}</span>
    </button>
  );
}

export function DashboardNavbar({
  brand,
  navItems = [],
  footerItems = [],
  actionButton = defaultActionButton,
  isSigningOut = false,
  onSignOut,
  signOutIcon: SignOutIcon,
  signOutLabel = "Log out",
  signingOutLabel = "Signing out...",
}) {
  return (
    <aside
      className="flex flex-col border-b p-3 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:border-b-0 lg:border-r"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }} //
    >
      {brand?.content ? (
        <a
          href={brand.href ?? "/"}
          onClick={brand.onClick}
          aria-label={brand.ariaLabel ?? "Dashboard home"}
          className="mb-4 inline-flex items-center px-1 transition hover:opacity-85"
        >
          {brand.content}
        </a>
      ) : null}

      <nav className="space-y-1">
        {navItems.map((item, index) => (
          <DashboardNavItem key={getItemKey(item, index)} item={item} />
        ))}
      </nav>

      <div
        className="mt-auto space-y-2 border-t pt-3"
        style={{ borderColor: "var(--color-border)" }}
      >
        {footerItems.map((item, index) => (
          <DashboardFooterItem key={getItemKey(item, index)} item={item} />
        ))}

        {actionButton ? (
          <Button
            variant={actionButton.variant}
            disabled={actionButton.disabled}
            onClick={actionButton.onClick}
            icon={actionButton.icon}
          >
            {actionButton.label}
          </Button>
        ) : null}

        {onSignOut ? (
          <button
            type="button"
            onClick={onSignOut}
            disabled={isSigningOut}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-(--color-surface-soft) disabled:opacity-60"
            style={{ color: "var(--color-text-muted)" }}
          >
            {SignOutIcon ? (
              <SignOutIcon
                className="h-5 w-5"
                aria-hidden="true"
                focusable="false"
              />
            ) : null}
            <span>{isSigningOut ? signingOutLabel : signOutLabel}</span>
          </button>
        ) : null}
      </div>
    </aside>
  );
}
