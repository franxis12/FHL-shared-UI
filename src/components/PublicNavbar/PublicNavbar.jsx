import { useEffect, useRef, useState } from "react";
import { Logo, LOGO_MODES } from "../Logo";

const USER_MENU_IDLE_CLOSE_MS = 2600;

function getPublicNavLinkClass(isActive) {
  return [
    "relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium tracking-tight outline-none transition-all duration-200",
    "hover:-translate-y-0.5 hover:bg-[var(--fhl-color-hover-soft)] hover:text-[var(--fhl-navy-text)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)]",
    isActive
      ? "bg-[var(--fhl-color-hover-soft)] text-[var(--fhl-navy-text)]"
      : "text-[var(--fhl-navy-muted)]",
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
  registerHref = "",
  onDashboardClick,
  onSignOut,
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [avatarErrorUrl, setAvatarErrorUrl] = useState("");
  const userMenuRef = useRef(null);
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
    if (isUserMenuOpen) {
      clearUserMenuIdleTimer();
      setIsUserMenuOpen(false);
      return;
    }

    setIsUserMenuOpen(true);
    scheduleUserMenuIdleClose();
  }

  useEffect(() => {
    if (!isUserMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!userMenuRef.current?.contains(event.target)) {
        clearUserMenuIdleTimer();
        setIsUserMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        clearUserMenuIdleTimer();
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    return () => {
      clearUserMenuIdleTimer();
    };
  }, []);

  function handleSignOut() {
    clearUserMenuIdleTimer();
    setIsUserMenuOpen(false);
    onSignOut?.();
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      <nav
        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-4 py-3 backdrop-blur-sm md:px-8"
        style={{
          borderColor: "var(--fhl-navy-border)",
          backgroundColor: "var(--fhl-public-navbar-bg)",
          boxShadow: "0 14px 34px rgba(6, 43, 73, 0.22)",
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

        <ul className="hidden items-center justify-center gap-1 px-1.5 py-1 text-sm md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={item.onClick}
                className={getPublicNavLinkClass(item.isActive)}
              >
                <span>{item.label}</span>
                {item.isActive && (
                  <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-[var(--fhl-color-accent)]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-2">
          {isAuthenticated ? (
            <div
              ref={userMenuRef}
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
                className="inline-flex max-w-48 items-center gap-2 rounded-full px-1 py-1 text-left text-[var(--fhl-navy-text)] transition hover:text-[var(--fhl-color-accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)] sm:max-w-64"
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
                <div
                  className="min-w-48 rounded-bl-xl border p-2 shadow-lg backdrop-blur-xl"
                  style={{
                    borderColor: "var(--fhl-navy-border)",
                    backgroundColor: "var(--fhl-public-navbar-menu-bg)",
                    boxShadow: "0 14px 34px rgba(6, 43, 73, 0.22)",
                  }}
                  role="menu"
                >
                  <a
                    href={dashboardHref}
                    onClick={(event) => {
                      clearUserMenuIdleTimer();
                      setIsUserMenuOpen(false);
                      onDashboardClick?.(event);
                    }}
                    className="block rounded-lg px-3 py-2 text-left text-xs font-semibold transition hover:bg-[var(--fhl-color-hover-soft)] md:text-sm"
                    style={{ color: "var(--fhl-navy-text)" }}
                    role="menuitem"
                  >
                    Dashboard
                  </a>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold transition hover:bg-[var(--fhl-color-hover-soft)] md:text-sm"
                    style={{ color: "var(--fhl-color-alert)" }}
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {loginHref ? (
                <a
                  href={loginHref}
                  className="rounded-lg border px-3 py-2 text-xs font-semibold md:text-sm"
                  style={{
                    borderColor: "var(--fhl-navy-border)",
                    color: "var(--fhl-navy-text)",
                    backgroundColor:
                      "color-mix(in oklab, var(--fhl-navy-surface) 88%, white)",
                  }}
                >
                  Login
                </a>
              ) : null}

              {registerHref ? (
                <a
                  href={registerHref}
                  className="rounded-lg px-3 py-2 text-xs font-semibold md:text-sm"
                  style={{
                    color: "var(--fhl-color-accent-contrast)",
                    backgroundColor: "var(--fhl-color-accent)",
                  }}
                >
                  Register
                </a>
              ) : null}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
