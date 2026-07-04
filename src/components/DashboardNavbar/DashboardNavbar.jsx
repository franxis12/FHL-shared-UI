import { LOGO_MODES, Logo } from "../Logo";

const baseClassName =
  "flex flex-col border-b lg:self-start lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:border-b-0 lg:border-r";

function getItemKey(item, index) {
  return item.key ?? item.href ?? item.label ?? index;
}

function getSectionKey(section, index) {
  return section.key ?? section.title ?? index;
}

function getCollapsibleLabelClassName(collapsed) {
  return collapsed
    ? "max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300"
    : "max-w-[160px] translate-x-0 overflow-hidden whitespace-nowrap opacity-100 transition-all duration-300";
}

function renderBrandContent(brand) {
  if (!brand) {
    return null;
  }

  if (brand.content) {
    return brand.content;
  }

  return (
    <Logo
      mode={brand.logoMode ?? LOGO_MODES.HORIZONTAL}
      darkMode={brand.darkLogoMode ?? LOGO_MODES.DARK}
      themeAware={brand.logoThemeAware ?? true}
      className={brand.logoClassName}
      lightClassName={brand.lightLogoClassName}
      darkClassName={brand.darkLogoClassName}
    />
  );
}

function DashboardSubItem({ item }) {
  const style = item.isActive
    ? {
        backgroundColor: "var(--fhl-navbar-surface-soft)",
        color: "var(--fhl-navbar-text)",
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
            : "text-[var(--fhl-navbar-text-muted)] hover:bg-[var(--fhl-navbar-surface-soft)] hover:text-[var(--fhl-navbar-text)]"
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
          : "text-[var(--fhl-navbar-text-muted)] hover:bg-[var(--fhl-navbar-surface-soft)] hover:text-[var(--fhl-navbar-text)]"
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
    ? `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${
        collapsed ? "justify-center px-2.5" : ""
      }`
    : `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-[var(--fhl-navbar-hover-bg)] hover:text-[var(--fhl-navbar-text)] ${
        collapsed ? "justify-center px-2.5" : ""
      }`;
  const itemStyle = item.isActive
    ? {
        backgroundColor: "var(--fhl-navbar-active-bg)",
        color: "var(--fhl-navbar-active-text)",
      }
    : {
        color: "var(--fhl-navbar-text-muted)",
      };
  const labelClassName = getCollapsibleLabelClassName(collapsed);
  const shouldShowChildren =
    Array.isArray(item.children) &&
    item.children.length > 0 &&
    item.showChildren &&
    !collapsed;

  const content = (
    <>
      {Icon ? (
        <Icon
          className="h-5 w-5 shrink-0"
          aria-hidden="true"
          focusable="false"
        />
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

function DashboardFooterItem({ item, collapsed = false }) {
  const Icon = item.icon;
  const labelClassName = getCollapsibleLabelClassName(collapsed);
  const content = (
    <>
      {Icon ? (
        <Icon
          className="h-5 w-5 shrink-0"
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
      <span className={labelClassName}>{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        onClick={item.onClick}
        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-[var(--fhl-navbar-hover-bg)] ${
          collapsed ? "justify-center px-2.5" : ""
        }`}
        style={{ color: "var(--fhl-navbar-text-muted)" }}
        title={collapsed ? item.label : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--fhl-navbar-hover-bg)] ${
        collapsed ? "justify-center px-2.5" : ""
      }`}
      style={{ color: "var(--fhl-navbar-text-muted)" }}
      title={collapsed ? item.label : undefined}
    >
      {content}
    </button>
  );
}

function DashboardProfileMenu({ profileMenu, collapsed = false }) {
  const displayName =
    String(profileMenu.displayName || "User").trim() || "User";
  const avatarContent =
    profileMenu.avatarContent ?? displayName.charAt(0).toUpperCase();
  const menuItems = Array.isArray(profileMenu.menuItems)
    ? profileMenu.menuItems
    : [];

  return (
    <div
      ref={profileMenu.ref}
      className="relative border-t p-2"
      style={{ borderColor: "var(--fhl-navbar-border)" }}
    >
      <button
        type="button"
        onClick={profileMenu.onToggle}
        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-(--fhl-navbar-hover-bg) ${
          collapsed ? "justify-center px-2.5" : ""
        }`}
        style={{
          backgroundColor: "var(--fhl-navbar-surface-soft)",
          color: "var(--fhl-navbar-text)",
        }}
        title={collapsed ? displayName : undefined}
      >
        <span
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{
            backgroundColor: "var(--fhl-navbar-surface)",
            color: "var(--fhl-navbar-text)",
          }}
        >
          {avatarContent}
        </span>
        <span className={getCollapsibleLabelClassName(collapsed)}>
          {displayName}
        </span>
      </button>

      {profileMenu.isOpen ? (
        <div
          className={`absolute z-20 rounded-xl p-1 shadow-[0_12px_25px_var(--fhl-navbar-shadow)] ${
            collapsed
              ? "bottom-2 left-full ml-2 w-40"
              : "bottom-14 left-2 right-2"
          }`}
          style={{
            backgroundColor: "var(--fhl-navbar-menu-bg)",
            color: "var(--fhl-navbar-text)",
          }}
        >
          {menuItems.map((item, index) =>
            item.href ? (
              <a
                key={getItemKey(item, index)}
                href={item.href}
                onClick={item.onClick}
                className="flex w-full items-center justify-start rounded-lg px-2.5 py-2 text-sm font-semibold transition hover:bg-[var(--fhl-navbar-hover-bg)]"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={getItemKey(item, index)}
                type="button"
                onClick={item.onClick}
                disabled={item.disabled}
                className="flex w-full items-center justify-start rounded-lg px-2.5 py-2 text-sm font-semibold transition hover:bg-[var(--fhl-navbar-hover-bg)] disabled:opacity-60"
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
  navSections = [],
  footerItems = [],
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
  const hasSimpleFooter = footerItems.length > 0 || onSignOut;
  const brandContent = renderBrandContent(brand);
  const resolvedNavSections =
    Array.isArray(navSections) && navSections.length > 0
      ? navSections
      : [{ items: navItems }];

  return (
    <aside
      className={resolvedClassName}
      style={{
        borderColor: "var(--fhl-navbar-border)",
        backgroundColor: "var(--fhl-navbar-bg)",
        color: "var(--fhl-navbar-text)",
        ...style,
      }}
    >
      {collapseToggle?.onToggle ? (
        <div
          className={`flex h-20 border-b px-2 py-2 transition-all duration-300 ${
            collapsed ? "justify-center" : "items-center justify-between"
          }`}
          style={{ borderColor: "var(--fhl-navbar-border)" }}
        >
          {brandContent ? (
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
              {brandContent}
            </a>
          ) : null}

          <button
            type="button"
            onClick={collapseToggle.onToggle}
            className="rounded-md p-1.5 transition hover:bg-[var(--fhl-navbar-hover-bg)]"
            style={{
              backgroundColor: "var(--fhl-navbar-surface-soft)",
              color: "var(--fhl-navbar-text)",
            }}
            aria-label={
              collapsed
                ? (collapseToggle.collapsedLabel ?? "Expand menu")
                : (collapseToggle.expandedLabel ?? "Collapse menu")
            }
            title={
              collapsed
                ? (collapseToggle.collapsedLabel ?? "Expand menu")
                : (collapseToggle.expandedLabel ?? "Collapse menu")
            }
          >
            {collapsed
              ? collapseToggle.collapsedIcon
              : collapseToggle.expandedIcon}
          </button>
        </div>
      ) : brandContent ? (
        <div className="px-3 pb-1 pt-3">
          <a
            href={brand.href ?? "/"}
            onClick={brand.onClick}
            aria-label={brand.ariaLabel ?? "Dashboard home"}
            className="inline-flex items-center px-1 transition hover:opacity-85"
          >
            {brandContent}
          </a>
        </div>
      ) : null}

      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-3">
          {resolvedNavSections.map((section, sectionIndex) => {
            const sectionItems = Array.isArray(section.items) ? section.items : [];

            if (sectionItems.length === 0) {
              return null;
            }

            return (
              <div key={getSectionKey(section, sectionIndex)} className="space-y-1.5">
                {section.title && !collapsed ? (
                  <p className="px-3 pt-2 text-[10px] font-bold tracking-[0.14em] text-[var(--fhl-navbar-text-muted)] uppercase">
                    {section.title}
                  </p>
                ) : null}

                {sectionItems.map((item, itemIndex) => (
                  <DashboardNavItem
                    key={getItemKey(item, itemIndex)}
                    item={item}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            );
          })}
        </nav>
      </div>

      {profileMenu ? (
        <DashboardProfileMenu profileMenu={profileMenu} collapsed={collapsed} />
      ) : null}

      {hasSimpleFooter ? (
        <div
          className="mt-auto space-y-2 border-t p-3"
          style={{ borderColor: "var(--fhl-navbar-border)" }}
        >
          {footerItems.map((item, index) => (
            <DashboardFooterItem
              key={getItemKey(item, index)}
              item={item}
              collapsed={collapsed}
            />
          ))}

          {onSignOut ? (
            <button
              type="button"
              onClick={onSignOut}
              disabled={isSigningOut}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--fhl-navbar-hover-bg)] disabled:opacity-60 ${
                collapsed ? "justify-center px-2.5" : ""
              }`}
              style={{ color: "var(--fhl-navbar-text-muted)" }}
              aria-label={isSigningOut ? signingOutLabel : signOutLabel}
              title={collapsed ? signOutLabel : undefined}
            >
              {SignOutIcon ? (
                <SignOutIcon
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                  focusable="false"
                />
              ) : null}
              <span className={getCollapsibleLabelClassName(collapsed)}>
                {isSigningOut ? signingOutLabel : signOutLabel}
              </span>
            </button>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
