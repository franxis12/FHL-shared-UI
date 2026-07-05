import { useEffect, useMemo, useRef } from "react";

const MENU_WIDTH = 240;

function clampPosition(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function EntityActionMenu({
  isOpen,
  position,
  items = [],
  onClose,
}) {
  const menuRef = useRef(null);

  const resolvedStyle = useMemo(() => {
    if (!position || typeof window === "undefined") {
      return { left: 16, top: 16 };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const left = clampPosition(position.x, 12, viewportWidth - MENU_WIDTH - 12);
    const top = clampPosition(position.y, 12, viewportHeight - 280);

    return { left, top };
  }, [position]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        onClose?.();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-[90] w-[240px] overflow-hidden rounded-2xl border p-1.5 shadow-[0_24px_50px_-24px_var(--fhl-color-shadow)]"
      style={{
        ...resolvedStyle,
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface)",
      }}
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          disabled={item.disabled}
          onClick={() => {
            item.onSelect?.();
            onClose?.();
          }}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition hover:bg-[var(--fhl-color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            color:
              item.tone === "danger"
                ? "var(--fhl-color-alert)"
                : "var(--fhl-color-text)",
          }}
        >
          <span>{item.label}</span>
          {item.shortcut ? (
            <span className="text-[11px] text-[var(--fhl-color-text-muted)]">
              {item.shortcut}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
