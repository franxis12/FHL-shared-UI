import { useEffect, useMemo, useState } from "react";
import { Button, BUTTON_VARIANT, BUTTON_SIZE, BUTTON_SHAPE } from "../Button";
import { LOGO_MODES, Logo } from "../Logo";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

const baseClassName = "hidden min-h-0 flex-col md:!flex md:h-full md:border-b-0";
const smoothSidebarTransition =
  "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M3.75 5.25c0-.83.67-1.5 1.5-1.5h2.36c.72 0 1.33.5 1.47 1.21l.54 2.7c.1.5-.06 1.01-.43 1.37l-1.7 1.7a13.49 13.49 0 0 0 5.73 5.73l1.7-1.7c.36-.37.87-.53 1.37-.43l2.7.54c.71.14 1.21.75 1.21 1.47v2.36c0 .83-.67 1.5-1.5 1.5h-1.5C9.14 21.75 2.25 14.86 2.25 6.75v-1.5Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 5 15 15M15 5 5 15"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getItemKey(item, index) {
  return item.key ?? item.href ?? item.label ?? index;
}

function getSectionKey(section, index) {
  return section.key ?? section.title ?? index;
}

function getCollapsibleLabelClassName(collapsed) {
  return collapsed
    ? `pointer-events-none max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,transform] ${smoothSidebarTransition}`
    : `max-w-[160px] translate-x-0 overflow-hidden whitespace-nowrap opacity-100 transition-[max-width,opacity,transform] ${smoothSidebarTransition}`;
}

function getCollapsedItemLayoutClassName(collapsed) {
  return collapsed
    ? "justify-center gap-0 px-2.5"
    : "justify-start gap-2 px-3";
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

function DashboardConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  isConfirming = false,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCancel?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-[28px] border p-5 md:p-6"
        style={{
          borderColor: "var(--fhl-color-border)",
          backgroundColor: "var(--fhl-color-surface)",
          boxShadow: "0 28px 60px -28px rgba(15, 23, 42, 0.55)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Text as="h3" size={TEXT_SIZE.XL} weight={TEXT_WEIGHT.BOLD}>
              {title}
            </Text>
            <Text
              as="p"
              size={TEXT_SIZE.SM}
              tone={TEXT_TONE.MUTED}
              className="mt-1"
            >
              {message}
            </Text>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[var(--fhl-color-text)] transition hover:bg-[var(--fhl-color-surface-soft)]"
            style={{ borderColor: "var(--fhl-color-border)" }}
            aria-label="Close logout confirmation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant={BUTTON_VARIANT.SECONDARY}
            size={BUTTON_SIZE.SM}
            shape={BUTTON_SHAPE.PILL}
            onClick={onCancel}
            disabled={isConfirming}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={BUTTON_VARIANT.PRIMARY}
            size={BUTTON_SIZE.SM}
            shape={BUTTON_SHAPE.PILL}
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? `${confirmLabel}...` : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
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
  const itemLayoutClassName = getCollapsedItemLayoutClassName(collapsed);
  const itemClassName = item.isActive
    ? `flex items-center rounded-xl py-2 text-sm font-semibold transition-[background-color,color] ${smoothSidebarTransition} ${itemLayoutClassName} ${
        collapsed ? "text-center" : ""
      }`
    : `flex items-center rounded-xl py-2 text-sm font-semibold transition-[background-color,color] hover:bg-[var(--fhl-navbar-hover-bg)] hover:text-[var(--fhl-navbar-text)] ${smoothSidebarTransition} ${itemLayoutClassName} ${
        collapsed ? "text-center" : ""
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
  const itemLayoutClassName = getCollapsedItemLayoutClassName(collapsed);
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
        className={`flex items-center rounded-xl py-2 text-sm font-semibold transition-[background-color,color] hover:bg-[var(--fhl-navbar-hover-bg)] ${smoothSidebarTransition} ${itemLayoutClassName} ${
          collapsed ? "text-center" : ""
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
      className={`flex w-full items-center rounded-xl py-2 text-left text-sm font-semibold transition-[background-color,color] hover:bg-[var(--fhl-navbar-hover-bg)] ${smoothSidebarTransition} ${itemLayoutClassName} ${
        collapsed ? "text-center" : ""
      }`}
      style={{ color: "var(--fhl-navbar-text-muted)" }}
      title={collapsed ? item.label : undefined}
    >
      {content}
    </button>
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
  isSigningOut = false,
  onSignOut,
  signOutIcon: SignOutIcon,
  signOutLabel = "Log out",
  signingOutLabel = "Signing out...",
  supportItem,
  supportLabel = "Call support",
  supportHref = "tel:+13055550199",
  supportIcon: SupportIcon = PhoneIcon,
  requireSignOutConfirmation = true,
  signOutConfirmationTitle = "Sign out?",
  signOutConfirmationMessage = "You will need to sign in again to access this dashboard.",
  signOutConfirmationLabel = "Sign out",
  signOutCancelLabel = "Cancel",
  mobileDrawer = false,
  mobileOpen = false,
  onMobileClose,
  mobileWidthClassName = "w-72 max-w-[calc(100vw-1.5rem)]",
  mobileCloseLabel = "Close menu",
  mobileCloseIcon: MobileCloseIcon = CloseIcon,
}) {
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const isMobileDrawerActive = mobileDrawer && mobileOpen;
  const effectiveCollapsed = isMobileDrawerActive ? false : collapsed;
  const resolvedClassName = mobileDrawer
    ? [
        mobileOpen ? "!fixed inset-y-0 left-0 z-[70] !flex h-[100dvh]" : "hidden",
        "md:!relative md:inset-auto md:z-auto md:!flex md:h-full md:border-b-0",
        className,
        mobileOpen ? mobileWidthClassName : "",
      ]
        .filter(Boolean)
        .join(" ")
        .trim()
    : `${baseClassName} ${className}`.trim();
  const brandContent = renderBrandContent(brand);
  const resolvedSupportItem = useMemo(() => {
    if (supportItem === false || supportItem === null) {
      return null;
    }

    const nextSupportItem =
      typeof supportItem === "object" && supportItem
        ? supportItem
        : {
            href: supportHref,
            label: supportLabel,
          };

    return {
      key: nextSupportItem.key ?? "dashboard-support",
      label: nextSupportItem.label ?? supportLabel,
      href: nextSupportItem.href ?? supportHref,
      onClick: nextSupportItem.onClick,
      icon: nextSupportItem.icon ?? SupportIcon,
    };
  }, [SupportIcon, supportHref, supportItem, supportLabel]);
  const hasSimpleFooter =
    Boolean(resolvedSupportItem) || footerItems.length > 0 || onSignOut;
  const resolvedNavSections =
    Array.isArray(navSections) && navSections.length > 0
      ? navSections
      : [{ items: navItems }];

  useEffect(() => {
    if (!isMobileDrawerActive) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileDrawerActive]);

  useEffect(() => {
    if (!isMobileDrawerActive || !onMobileClose) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onMobileClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileDrawerActive, onMobileClose]);

  function handleSignOutRequest() {
    if (!onSignOut || isSigningOut) {
      return;
    }

    if (!requireSignOutConfirmation) {
      onSignOut();
      return;
    }

    setIsSignOutConfirmOpen(true);
  }

  async function handleConfirmSignOut() {
    if (!onSignOut || isSigningOut) {
      return;
    }

    setIsSignOutConfirmOpen(false);
    await Promise.resolve(onSignOut());
  }

  return (
    <>
      {isMobileDrawerActive ? (
        <button
          type="button"
          className="fixed inset-0 z-[65] bg-slate-950/45 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
          aria-label={mobileCloseLabel}
        />
      ) : null}

      <aside
        className={resolvedClassName}
        style={{
          borderColor: "var(--fhl-navbar-border)",
          backgroundColor: "var(--fhl-navbar-bg)",
          color: "var(--fhl-navbar-text)",
          ...style,
        }}
      >
        {collapseToggle?.onToggle || isMobileDrawerActive ? (
          <div
            className={`flex h-20 border-b px-2 py-2 transition-[justify-content,padding] ${smoothSidebarTransition} ${
              effectiveCollapsed
                ? "justify-center"
                : "items-center justify-between"
            }`}
            style={{ borderColor: "var(--fhl-navbar-border)" }}
          >
            {brandContent ? (
              <a
                href={brand.href ?? "/"}
                onClick={brand.onClick}
                aria-label={brand.ariaLabel ?? "Dashboard home"}
                className={`inline-flex items-center overflow-hidden rounded-md p-1 transition-[max-width,opacity,transform] ${smoothSidebarTransition} ${
                  effectiveCollapsed
                    ? "pointer-events-none max-w-0 -translate-x-2 opacity-0"
                    : "max-w-[11rem] translate-x-0 opacity-100"
                }`}
              >
                {brandContent}
              </a>
            ) : null}

            {isMobileDrawerActive ? (
              <button
                type="button"
                onClick={onMobileClose}
                className="rounded-md p-1.5 transition hover:bg-[var(--fhl-navbar-hover-bg)] md:hidden"
                style={{
                  backgroundColor: "var(--fhl-navbar-surface-soft)",
                  color: "var(--fhl-navbar-text)",
                }}
                aria-label={mobileCloseLabel}
                title={mobileCloseLabel}
              >
                <MobileCloseIcon className="h-4 w-4" />
              </button>
            ) : null}

            {collapseToggle?.onToggle ? (
              <button
                type="button"
                onClick={collapseToggle.onToggle}
                className={`hidden rounded-md p-1.5 transition hover:bg-[var(--fhl-navbar-hover-bg)] md:inline-flex ${smoothSidebarTransition}`}
                style={{
                  backgroundColor: "var(--fhl-navbar-surface-soft)",
                  color: "var(--fhl-navbar-text)",
                }}
                aria-label={
                  effectiveCollapsed
                    ? (collapseToggle.collapsedLabel ?? "Expand menu")
                    : (collapseToggle.expandedLabel ?? "Collapse menu")
                }
                title={
                  effectiveCollapsed
                    ? (collapseToggle.collapsedLabel ?? "Expand menu")
                    : (collapseToggle.expandedLabel ?? "Collapse menu")
                }
              >
                {effectiveCollapsed
                  ? collapseToggle.collapsedIcon
                  : collapseToggle.expandedIcon}
              </button>
            ) : null}
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

        <div className="min-h-0 flex-1 overflow-hidden p-2">
          <nav className="space-y-3">
            {resolvedNavSections.map((section, sectionIndex) => {
              const sectionItems = Array.isArray(section.items)
                ? section.items
                : [];

              if (sectionItems.length === 0) {
                return null;
              }

              return (
                <div
                  key={getSectionKey(section, sectionIndex)}
                  className="space-y-1.5"
                >
                  {section.title && !collapsed ? (
                    <p className="px-3 pt-2 text-[10px] font-bold tracking-[0.14em] text-[var(--fhl-navbar-text-muted)] uppercase">
                      {section.title}
                    </p>
                  ) : null}

                  {sectionItems.map((item, itemIndex) => (
                    <DashboardNavItem
                      key={getItemKey(item, itemIndex)}
                      item={item}
                      collapsed={effectiveCollapsed}
                    />
                  ))}
                </div>
              );
            })}
          </nav>
        </div>
        {hasSimpleFooter ? (
          <div
            className="mt-auto space-y-2 border-t p-3"
            style={{ borderColor: "var(--fhl-navbar-border)" }}
          >
            {resolvedSupportItem ? (
              <DashboardFooterItem
                item={resolvedSupportItem}
                collapsed={effectiveCollapsed}
              />
            ) : null}

            {footerItems.map((item, index) => (
              <DashboardFooterItem
                key={getItemKey(item, index)}
                item={item}
                collapsed={effectiveCollapsed}
              />
            ))}

            {onSignOut ? (
              <button
                type="button"
                onClick={handleSignOutRequest}
                disabled={isSigningOut}
                className={`flex w-full items-center rounded-xl py-2 text-left text-sm font-semibold transition-[background-color,color] hover:bg-[var(--fhl-navbar-hover-bg)] disabled:opacity-60 ${smoothSidebarTransition} ${
                  getCollapsedItemLayoutClassName(effectiveCollapsed)
                }`}
                style={{ color: "var(--fhl-navbar-text-muted)" }}
                aria-label={isSigningOut ? signingOutLabel : signOutLabel}
                title={effectiveCollapsed ? signOutLabel : undefined}
              >
                {SignOutIcon ? (
                  <SignOutIcon
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                    focusable="false"
                  />
                ) : null}
                <span className={getCollapsibleLabelClassName(effectiveCollapsed)}>
                  {isSigningOut ? signingOutLabel : signOutLabel}
                </span>
              </button>
            ) : null}
          </div>
        ) : null}
      </aside>

      <DashboardConfirmDialog
        isOpen={isSignOutConfirmOpen}
        title={signOutConfirmationTitle}
        message={signOutConfirmationMessage}
        confirmLabel={signOutConfirmationLabel}
        cancelLabel={signOutCancelLabel}
        isConfirming={isSigningOut}
        onCancel={() => setIsSignOutConfirmOpen(false)}
        onConfirm={handleConfirmSignOut}
      />
    </>
  );
}
