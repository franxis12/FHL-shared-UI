import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  Container,
  CONTAINER_PADDING,
  CONTAINER_RADIUS,
} from "../Container";
import { Logo, LOGO_MODES } from "../Logo";

const USER_MENU_IDLE_CLOSE_MS = 2600;
const FIXED_NAV_TEXT = "var(--fhl-navy-text)";
const FIXED_NAV_BORDER = "var(--fhl-navy-border)";
const FIXED_NAV_LAYER = "var(--fhl-public-navbar-bg)";
const FIXED_NAV_MENU_BG = "var(--fhl-public-navbar-menu-bg)";
const FIXED_NAV_BUTTON_BG = "color-mix(in oklab, var(--fhl-primary-navy) 88%, white)";
const FIXED_NAV_SHADOW = "0 14px 34px rgba(6, 43, 73, 0.22)";
const FIXED_NAV_MENU_SHADOW = "0 18px 42px rgba(6, 43, 73, 0.28)";

function getPublicNavLinkClass(isActive) {
  return [
    "relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium tracking-tight outline-none transition-all duration-200",
    "hover:-translate-y-0.5 hover:bg-white/10 hover:text-white",
    "focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)]",
    isActive
      ? "bg-white/10 text-white"
      : "text-[rgba(255,255,255,0.72)]",
  ].join(" ");
}

function getInitials(name, email) {
  const source = String(name || email || "User").trim();
  const words = source.replace(/@.*/, "").split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return "U";
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getMenuActionClass({ danger = false } = {}) {
  return joinClassNames(
    "block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
    danger ? "hover:bg-[rgba(252,165,165,0.12)]" : "hover:bg-white/8",
  );
}

export function PublicNavbar({
  logoHref = "/",
  onLogoClick,
  navItems = [],
  isAuthenticated = false,
  userDisplayName = "User",
  userEmail = "",
  avatarUrl = "",
  dashboardHref = "",
  loginHref = "",
  onDashboardClick,
  onSignOut,
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isGuestMobileMenuOpen, setIsGuestMobileMenuOpen] = useState(false);
  const [avatarErrorUrl, setAvatarErrorUrl] = useState("");
  const userMenuRef = useRef(null);
  const guestMenuRef = useRef(null);
  const userMenuIdleTimerRef = useRef(null);
  const userInitials = getInitials(userDisplayName, userEmail);
  const shouldShowAvatar = Boolean(avatarUrl && avatarErrorUrl !== avatarUrl);

  function clearUserMenuIdleTimer() {
    if (userMenuIdleTimerRef.current) {
      window.clearTimeout(userMenuIdleTimerRef.current);
      userMenuIdleTimerRef.current = null;
    }
  }

  function scheduleUserMenuIdleClose() {
    clearUserMenuIdleTimer();
    userMenuIdleTimerRef.current = window.setTimeout(() => {
      setIsUserMenuOpen(false);
    }, USER_MENU_IDLE_CLOSE_MS);
  }

  function handleUserMenuToggle() {
    setIsGuestMobileMenuOpen(false);

    if (isUserMenuOpen) {
      clearUserMenuIdleTimer();
      setIsUserMenuOpen(false);
      return;
    }

    setIsUserMenuOpen(true);
    scheduleUserMenuIdleClose();
  }

  function handleGuestMobileMenuToggle() {
    clearUserMenuIdleTimer();
    setIsUserMenuOpen(false);
    setIsGuestMobileMenuOpen((currentValue) => !currentValue);
  }

  function closeAllMenus() {
    clearUserMenuIdleTimer();
    setIsUserMenuOpen(false);
    setIsGuestMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!isUserMenuOpen && !isGuestMobileMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      const isInsideUserMenu = userMenuRef.current?.contains(event.target);
      const isInsideGuestMenu = guestMenuRef.current?.contains(event.target);

      if (!isInsideUserMenu && !isInsideGuestMenu) {
        closeAllMenus();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGuestMobileMenuOpen, isUserMenuOpen]);

  useEffect(() => {
    return () => {
      clearUserMenuIdleTimer();
    };
  }, []);

  function handleSignOut() {
    closeAllMenus();
    onSignOut?.();
  }

  function renderNavLinks({ mobileOnly = false } = {}) {
    const wrapperClassName = mobileOnly
      ? "flex flex-col gap-1 md:hidden"
      : "public-navbar-desktop-links hidden items-center justify-center gap-1 px-1.5 py-1 text-sm md:flex";

    return (
      <ul className={wrapperClassName}>
        {navItems.map((item) => {
          const linkClassName = mobileOnly
            ? getMenuActionClass()
            : getPublicNavLinkClass(item.isActive);
          const linkStyle = mobileOnly
            ? {
                color: FIXED_NAV_TEXT,
                backgroundColor: item.isActive
                  ? "rgba(255, 255, 255, 0.1)"
                  : undefined,
              }
            : undefined;

          return (
            <li key={`${mobileOnly ? "mobile" : "desktop"}-${item.href}`}>
              <a
                href={item.href}
                onClick={(event) => {
                  closeAllMenus();
                  item.onClick?.(event);
                }}
                className={linkClassName}
                style={linkStyle}
                role={mobileOnly ? "menuitem" : undefined}
              >
                <span>{item.label}</span>
                {item.isActive && !mobileOnly ? (
                  <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-[var(--fhl-color-accent)]" />
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <header className="sticky inset-x-0 top-0 z-40 w-full">
      <nav
        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-4 py-3 backdrop-blur-sm md:px-8"
        style={{
          borderColor: FIXED_NAV_BORDER,
          backgroundColor: FIXED_NAV_LAYER,
          boxShadow: FIXED_NAV_SHADOW,
        }}
      >
        <a
          href={logoHref}
          onClick={onLogoClick}
          aria-label="FHL Enterprises home"
          className="inline-flex items-center rounded-xl transition hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)]"
        >
          <Logo
            mode={LOGO_MODES.HORIZONTAL}
            darkMode={LOGO_MODES.DARK}
            themeAware
            className="h-10 w-44 object-contain md:w-56"
          />
        </a>

        {renderNavLinks()}

        <div className="flex items-center justify-end gap-2">
          {isAuthenticated ? (
            <div
              ref={userMenuRef}
              className="relative"
              onMouseEnter={clearUserMenuIdleTimer}
              onMouseLeave={scheduleUserMenuIdleClose}
              onFocus={clearUserMenuIdleTimer}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  scheduleUserMenuIdleClose();
                }
              }}
            >
              <button
                type="button"
                onClick={handleUserMenuToggle}
                className="inline-flex max-w-48 items-center gap-2 rounded-full px-1 py-1 text-left text-[var(--fhl-white)] transition hover:text-[var(--fhl-soft-gold)] focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)] sm:max-w-64"
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
              >
                <span className="max-w-28 truncate text-xs sm:max-w-40 md:max-w-48 md:text-sm">
                  {userDisplayName}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--fhl-color-accent)] text-xs font-extrabold text-[var(--fhl-color-accent-contrast)]">
                  {shouldShowAvatar ? (
                    <img
                      src={avatarUrl}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={() => setAvatarErrorUrl(avatarUrl)}
                    />
                  ) : (
                    userInitials
                  )}
                </span>
                <span
                  className={`text-[10px] transition ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              <div
                className={`absolute right-0 top-full z-50 transition ${
                  isUserMenuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                <Container
                  padding={CONTAINER_PADDING.NONE}
                  radius={CONTAINER_RADIUS.MD}
                  className="min-w-56"
                  contentClassName="p-2"
                  style={{
                    backgroundColor: FIXED_NAV_MENU_BG,
                    borderColor: FIXED_NAV_BORDER,
                    color: FIXED_NAV_TEXT,
                    boxShadow: FIXED_NAV_MENU_SHADOW,
                  }}
                  role="menu"
                >
                  {navItems.length > 0 ? (
                    <div
                      className="mb-2 border-b pb-2 md:hidden"
                      style={{ borderColor: FIXED_NAV_BORDER }}
                    >
                      {renderNavLinks({ mobileOnly: true })}
                    </div>
                  ) : null}
                  <a
                    href={dashboardHref}
                    onClick={(event) => {
                      closeAllMenus();
                      onDashboardClick?.(event);
                    }}
                    className={getMenuActionClass()}
                    style={{ color: FIXED_NAV_TEXT }}
                    role="menuitem"
                  >
                    Dashboard
                  </a>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={getMenuActionClass({ danger: true })}
                    style={{ color: "#fca5a5" }}
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </Container>
              </div>
            </div>
          ) : (
            <>
              {loginHref ? (
                <a
                  href={loginHref}
                  className="rounded-lg border px-3 py-2 text-xs font-semibold md:text-sm"
                  style={{
                    borderColor: FIXED_NAV_BORDER,
                    color: FIXED_NAV_TEXT,
                    backgroundColor: FIXED_NAV_BUTTON_BG,
                  }}
                >
                  Login
                </a>
              ) : null}

              {navItems.length > 0 ? (
                <div ref={guestMenuRef} className="relative md:hidden">
                  <button
                    type="button"
                    onClick={handleGuestMobileMenuToggle}
                    className="inline-flex items-center justify-center rounded-lg border p-2.5 transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)]"
                    style={{
                      borderColor: FIXED_NAV_BORDER,
                      color: FIXED_NAV_TEXT,
                      backgroundColor: FIXED_NAV_BUTTON_BG,
                    }}
                    aria-label={isGuestMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isGuestMobileMenuOpen}
                    aria-haspopup="menu"
                  >
                    {isGuestMobileMenuOpen ? (
                      <FiX className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <FiMenu className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>

                  <div
                    className={`absolute right-0 top-full z-50 mt-2 transition ${
                      isGuestMobileMenuOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    <Container
                      padding={CONTAINER_PADDING.NONE}
                      radius={CONTAINER_RADIUS.MD}
                      className="min-w-52"
                      contentClassName="p-2"
                      style={{
                        backgroundColor: FIXED_NAV_MENU_BG,
                        borderColor: FIXED_NAV_BORDER,
                        color: FIXED_NAV_TEXT,
                        boxShadow: FIXED_NAV_MENU_SHADOW,
                      }}
                      role="menu"
                    >
                      {renderNavLinks({ mobileOnly: true })}
                    </Container>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
