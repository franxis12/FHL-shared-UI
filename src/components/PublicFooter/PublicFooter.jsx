import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getFooterLinkClass() {
  return [
    "transition",
    "text-[var(--fhl-navy-text)] hover:text-[var(--fhl-color-accent-hover)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)] rounded-md",
  ].join(" ");
}

export function PublicFooter({
  brand = "FHL Enterprises Group",
  brandHref = "",
  onBrandClick,
  description = "",
  navItems = [],
  aside = null,
  className = "",
  contentClassName = "",
}) {
  const brandContent = (
    <Text
      as="span"
      size={TEXT_SIZE.SM}
      weight={TEXT_WEIGHT.SEMIBOLD}
      tone={TEXT_TONE.ACCENT}
      uppercase
      className="tracking-[0.14em]"
    >
      {brand}
    </Text>
  );

  return (
    <footer
      className={joinClassNames("mt-12 border-t px-4 py-8 md:px-8", className)}
      style={{
        borderColor: "var(--fhl-navy-border)",
        backgroundColor: "var(--fhl-navy-surface)",
        color: "var(--fhl-navy-text)",
      }}
    >
      <div
        className={joinClassNames(
          "mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between",
          contentClassName,
        )}
      >
        <div className="space-y-2">
          {brandHref ? (
            <a
              href={brandHref}
              onClick={onBrandClick}
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)]"
            >
              {brandContent}
            </a>
          ) : (
            brandContent
          )}

          {description ? (
            <Text
              as="p"
              size={TEXT_SIZE.SM}
              className="max-w-xl leading-6 text-[var(--fhl-navy-muted)]"
            >
              {description}
            </Text>
          ) : null}
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          {aside ? <div>{aside}</div> : null}

          {navItems.length > 0 ? (
            <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold">
              {navItems.map((item) => (
                <a
                  key={`${item.label}-${item.href || "action"}`}
                  href={item.href || "#"}
                  onClick={item.onClick}
                  target={item.target}
                  rel={item.rel}
                  className={getFooterLinkClass()}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
