import { Button } from "../Button";

const defaultActionButton = {
  label: "Save",
  variant: "primary",
};

const baseClassName =
  "flex flex-col border-b lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:border-b-0 lg:border-r";

function getItemKey(item, index) {
  return item.key ?? item.href ?? item.label ?? index;
}

function DashboardSubItem({ item }) {
  const style = item.isActive
    ? {
        backgroundColor: "var(--color-surface-soft)",
        color: "var(--color-text)",
      }
    : undefined;

  if (item.href) {
    return (
      <a
        href={item.href}
        onClick={item.onClick}
        className={`flex items-center rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
          item.isActive
            ? ""
            : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
        }`}
        style={style}
        aria-current={item.isActive ? "page" : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={`flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition ${
        item.isActive
          ? ""
          : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]"
      }`}
      style={style}
      aria-current={item.isActive ? "page" : undefined}
    >
      {item.label}
    </button>
  );
}

function DashboardNavItem({ item, collapsed = false }) {
  const Icon = item.icon;
  const itemClassName = item.isActive
    ? `flex items-center gap-2 rounded-xl bg-(--color-primary-strong) px-3 py-2 text-sm font-semibold text-white ${
        collapsed ? "justify-center px-2.5" : ""
      }`
    : `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-(--color-text-muted) transition hover:bg-(--color-surface-soft) hover:text-(--color-text) ${
        collapsed ? "justify-center px-2.5" : ""
      }`;
  const itemStyle = item.isActive ? { color: "#ffffff" } : undefined;
  const labelClassName = collapsed
    ? "max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300"
    : "max-w-[160px] translate-x-0 overflow-hidden whitespace-nowrap opacity-100 transition-all duration-300";
  const shouldShowChildren =
    Array.isArray(item.children) &&
    item.children.length > 0 &&
    item.showChildren &&
    !collapsed;

  const content = (
    <>
      {Icon ? (
        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" focusable="false" />
      ) : null}
      <span className={labelClassName}>{item.label}</span>
    </>
  );

  return (
    <div className="space-y-1">
      {item.href ? (
        <a
          href={item.href}
          onClick={item.onClick}
          style={itemStyle}
          className={itemClassName}
          aria-current={item.isActive ? "page" : undefined}
          title={collapsed ? item.label : undefined}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={item.onClick}
          style={itemStyle}
          className={itemClassName}
          aria-current={item.isActive ? "page" : undefined}
          title={collapsed ? item.label : undefined}
        >
          {content}
        </button>
      )}

      {shouldShowChildren ? (
        <div className="ml-6 space-y-1 pb-1">
          {item.children.map((child, index) => (
            <DashboardSubItem key={getItemKey(child, index)} item={child} />
          ))}
        </div>
      ) : null}
    </div>
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

function DashboardProfileMenu({ profileMenu, collapsed = false }) {
  const displayName = String(profileMenu.displayName || "User").trim() || "User";
  const avatarContent = profileMenu.avatarContent ?? displayName.charAt(0).toUpperCase();
  const menuItems = Array.isArray(profileMenu.menuItems)
    ? profileMenu.menuItems
    : [];

  return (
    <div
      ref={profileMenu.ref}
      className="relative border-t border-[var(--color-border)] p-2"
    >
      <button
        type="button"
        onClick={profileMenu.onToggle}
        className={`flex w-full items-center gap-2 rounded-xl bg-[var(--color-surface-soft)] px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--color-hover-soft)] ${
          collapsed ? "justify-center px-2.5" : ""
        }`}
        title={collapsed ? displayName : undefined}
      >
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-xs font-bold">
          {avatarContent}
        </span>
        <span
          className={
            collapsed
              ? "max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300"
              : "max-w-[160px] translate-x-0 overflow-hidden whitespace-nowrap opacity-100 transition-all duration-300"
          }
        >
          {displayName}
        </span>
      </button>

      {profileMenu.isOpen ? (
        <div
          className={`absolute z-20 rounded-xl bg-[var(--color-surface)] p-1 shadow-[0_12px_25px_var(--color-shadow)] ${
            collapsed ? "bottom-2 left-full ml-2 w-40" : "bottom-14 left-2 right-2"
          }`}
        >
          {menuItems.map((item, index) =>
            item.href ? (
              <a
                key={getItemKey(item, index)}
                href={item.href}
                onClick={item.onClick}
                className="flex w-full items-center justify-start rounded-lg px-2.5 py-2 text-sm font-semibold transition hover:bg-[var(--color-hover-soft)]"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={getItemKey(item, index)}
                type="button"
                onClick={item.onClick}
                disabled={item.disabled}
                className="flex w-full items-center justify-start rounded-lg px-2.5 py-2 text-sm font-semibold transition hover:bg-[var(--color-hover-soft)] disabled:opacity-60"
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

export function DashboardNavbar({
  brand,
  navItems = [],
  footerItems = [],
  actionButton = defaultActionButton,
  className = "",
  style,
  collapsed = false,
  collapseToggle,
  profileMenu,
  isSigningOut = false,
  onSignOut,
  signOutIcon: SignOutIcon,
  signOutLabel = "Log out",
  signingOutLabel = "Signing out...",
}) {
  const resolvedClassName = `${baseClassName} ${className}`.trim();
  const hasSimpleFooter =
    footerItems.length > 0 || actionButton || onSignOut;

  return (
    <aside
      className={resolvedClassName}
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
        ...style,
      }}
    >
      {collapseToggle?.onToggle ? (
        <div
          className={`flex h-20 border-b px-2 py-2 transition-all duration-300 ${
            collapsed ? "justify-center" : "items-center justify-between"
          }`}
          style={{ borderColor: "var(--color-border)" }}
        >
          {brand?.content ? (
            <a
              href={brand.href ?? "/"}
              onClick={brand.onClick}
              aria-label={brand.ariaLabel ?? "Dashboard home"}
              className={`inline-flex items-center overflow-hidden rounded-md p-1 transition-all duration-300 ease-in-out ${
                collapsed
                  ? "pointer-events-none w-0 -translate-x-2 opacity-0"
                  : "w-44 translate-x-0 opacity-100"
              }`}
            >
              {brand.content}
            </a>
          ) : null}

          <button
            type="button"
            onClick={collapseToggle.onToggle}
            className="rounded-md bg-[var(--color-surface-soft)] p-1.5 transition hover:bg-[var(--color-hover-soft)]"
            title={
              collapsed
                ? collapseToggle.collapsedLabel ?? "Expand menu"
                : collapseToggle.expandedLabel ?? "Collapse menu"
            }
          >
            {collapsed ? collapseToggle.collapsedIcon : collapseToggle.expandedIcon}
          </button>
        </div>
      ) : brand?.content ? (
        <div className="px-3 pb-1 pt-3">
          <a
            href={brand.href ?? "/"}
            onClick={brand.onClick}
            aria-label={brand.ariaLabel ?? "Dashboard home"}
            className="inline-flex items-center px-1 transition hover:opacity-85"
          >
            {brand.content}
          </a>
        </div>
      ) : null}

      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1.5">
          {navItems.map((item, index) => (
            <DashboardNavItem
              key={getItemKey(item, index)}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      {profileMenu ? <DashboardProfileMenu profileMenu={profileMenu} collapsed={collapsed} /> : null}

      {hasSimpleFooter ? (
        <div
          className="mt-auto space-y-2 border-t p-3"
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
      ) : null}
    </aside>
  );
}
