function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function Tabs({ items = [], activeKey, onSelect, className = "" }) {
  return (
    <nav
      className={joinClassNames(
        "flex gap-8 overflow-x-auto border-b text-sm font-semibold text-[var(--fhl-color-text-muted)]",
        className,
      )}
      style={{ borderColor: "var(--fhl-color-border)" }}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <a
            key={item.key}
            href={item.href}
            onClick={(event) => onSelect?.(item.key, event)}
            className={joinClassNames(
              "shrink-0 border-b-2 px-1 py-4 transition hover:text-[var(--fhl-color-accent)]",
              isActive
                ? "border-[var(--fhl-color-accent)] text-[var(--fhl-color-accent)]"
                : "border-transparent",
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
