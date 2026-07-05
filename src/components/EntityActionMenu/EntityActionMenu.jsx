import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const FALLBACK_MENU_SIZE = Object.freeze({
  width: 280,
  height: 320,
});

function clampPosition(value, min, max) {
  if (max <= min) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

function getItemKey(item, index) {
  return item?.key ?? item?.label ?? index;
}

function getSectionKey(section, index) {
  return section?.key ?? section?.title ?? index;
}

export function EntityActionMenu({
  isOpen,
  position,
  items = [],
  sections = [],
  onClose,
}) {
  const menuRef = useRef(null);
  const [menuSize, setMenuSize] = useState(FALLBACK_MENU_SIZE);

  const resolvedSections = useMemo(() => {
    const nextSections = Array.isArray(sections) ? sections : [];
    const normalizedSections = nextSections
      .map((section) => ({
        ...section,
        items: Array.isArray(section?.items) ? section.items : [],
      }))
      .filter((section) => section.items.length > 0);

    if (normalizedSections.length > 0) {
      return normalizedSections;
    }

    if (Array.isArray(items) && items.length > 0) {
      return [{ key: "default", items }];
    }

    return [];
  }, [items, sections]);

  useLayoutEffect(() => {
    if (!isOpen || !menuRef.current) {
      return;
    }

    const nextRect = menuRef.current.getBoundingClientRect();
    const nextWidth = nextRect.width || FALLBACK_MENU_SIZE.width;
    const nextHeight = nextRect.height || FALLBACK_MENU_SIZE.height;

    setMenuSize((previous) => {
      if (previous.width === nextWidth && previous.height === nextHeight) {
        return previous;
      }

      return {
        width: nextWidth,
        height: nextHeight,
      };
    });
  }, [isOpen, resolvedSections]);

  const resolvedStyle = useMemo(() => {
    if (!position || typeof window === "undefined") {
      return { left: 12, top: 12 };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const left = clampPosition(
      position.x,
      12,
      viewportWidth - menuSize.width - 12,
    );
    const top = clampPosition(
      position.y,
      12,
      viewportHeight - menuSize.height - 12,
    );

    return { left, top };
  }, [menuSize.height, menuSize.width, position]);

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

  if (!isOpen || resolvedSections.length === 0) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-[90] w-[280px] max-w-[calc(100vw-24px)] overflow-y-auto rounded-2xl border p-1.5 shadow-[0_24px_50px_-24px_var(--fhl-color-shadow)]"
      style={{
        ...resolvedStyle,
        maxHeight: "calc(100vh - 24px)",
        borderColor: "var(--fhl-color-border)",
        backgroundColor: "var(--fhl-color-surface)",
      }}
    >
      <div className="space-y-1">
        {resolvedSections.map((section, sectionIndex) => (
          <div
            key={getSectionKey(section, sectionIndex)}
            className={
              sectionIndex > 0
                ? "space-y-1 border-t pt-2"
                : "space-y-1"
            }
            style={
              sectionIndex > 0
                ? { borderColor: "var(--fhl-color-border)" }
                : undefined
            }
          >
            {section.title ? (
              <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--fhl-color-text-muted)]">
                {section.title}
              </p>
            ) : null}

            {section.items.map((item, itemIndex) => (
              <button
                key={getItemKey(item, itemIndex)}
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
                <span className="min-w-0 truncate">{item.label}</span>
                {item.shortcut ? (
                  <span className="ml-3 shrink-0 text-[11px] text-[var(--fhl-color-text-muted)]">
                    {item.shortcut}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
