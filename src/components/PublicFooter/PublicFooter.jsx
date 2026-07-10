import { Logo, LOGO_MODES } from "../Logo";
import { Text, TEXT_SIZE, TEXT_WEIGHT } from "../Text";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getFooterLinkClass({ compact = false } = {}) {
  return [
    "inline-flex rounded-md transition-colors",
    compact
      ? "text-sm font-medium text-[var(--fhl-navy-muted)] hover:text-[var(--fhl-navy-text)]"
      : "text-sm font-medium text-[var(--fhl-navy-muted)] hover:text-[var(--fhl-navy-text)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)]",
  ].join(" ");
}

function normalizeLegacySections(navItems) {
  if (!Array.isArray(navItems) || navItems.length === 0) {
    return [];
  }

  return [
    {
      title: "Explore",
      links: navItems,
    },
  ];
}

function renderFooterLink(item, key, { compact = false } = {}) {
  if (!item?.label) {
    return null;
  }

  return (
    <a
      key={key}
      href={item.href || "#"}
      onClick={item.onClick}
      target={item.target}
      rel={item.rel}
      className={getFooterLinkClass({ compact })}
    >
      {item.label}
    </a>
  );
}

export function PublicFooter({
  brand = "FHL Enterprises Group",
  brandHref = "",
  onBrandClick,
  description = "",
  sections = [],
  socialLinks = [],
  signInLink = null,
  bottomLinks = [],
  copyrightLabel = "",
  navItems = [],
  aside = null,
  className = "",
  contentClassName = "",
}) {
  const resolvedSections =
    Array.isArray(sections) && sections.length > 0
      ? sections
      : normalizeLegacySections(navItems);
  const currentYear = new Date().getFullYear();
  const resolvedCopyrightLabel = copyrightLabel || brand;
  const brandContent = (
    <>
      <span className="sr-only">{brand}</span>
      <Logo
        mode={LOGO_MODES.DARK}
        className="h-9 w-40 object-contain sm:w-44"
      />
    </>
  );

  return (
    <footer
      className={joinClassNames("mt-16 border-t px-4 py-8 md:px-8", className)}
      style={{
        borderColor: "rgba(255, 255, 255, 0.16)",
        backgroundColor: "var(--fhl-primary-navy)",
        color: "var(--fhl-white)",
      }}
    >
      <div
        className={joinClassNames(
          "mx-auto max-w-7xl space-y-6",
          contentClassName,
        )}
      >
        <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start">
          <div className="space-y-4">
            {brandHref ? (
              <a
                href={brandHref}
                onClick={onBrandClick}
                aria-label={`${brand} home`}
                className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fhl-color-accent-hover)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fhl-navy-surface)]"
              >
                {brandContent}
              </a>
            ) : (
              <div aria-label={brand} className="inline-flex">
                {brandContent}
              </div>
            )}

            {socialLinks.length > 0 ? (
              <nav
                aria-label="Social links"
                className="flex flex-wrap items-center gap-3"
              >
                {socialLinks.map((item, index) =>
                  renderFooterLink(item, `${item.label}-${item.href || index}`),
                )}
              </nav>
            ) : null}
          </div>

          {resolvedSections.length > 0 ? (
            <nav
              aria-label="Footer navigation"
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5"
            >
              {resolvedSections.map((section, sectionIndex) => (
                <section
                  key={section.title || `section-${sectionIndex}`}
                  className="space-y-3"
                  aria-labelledby={`public-footer-section-${sectionIndex}`}
                >
                  {section.title ? (
                    <Text
                      as="h2"
                      id={`public-footer-section-${sectionIndex}`}
                      size={TEXT_SIZE.XS}
                      weight={TEXT_WEIGHT.SEMIBOLD}
                      className="text-[var(--fhl-white)]"
                    >
                      {section.title}
                    </Text>
                  ) : null}

                  {Array.isArray(section.links) && section.links.length > 0 ? (
                    <ul className="space-y-2">
                      {section.links.map((item, linkIndex) => (
                        <li key={`${item.label}-${item.href || linkIndex}`}>
                          {renderFooterLink(
                            item,
                            `${item.label}-${item.href || linkIndex}`,
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </nav>
          ) : null}
        </div>

        <div
          className="flex flex-col gap-4 border-t pt-5 md:flex-row md:items-end md:justify-between"
          style={{ borderColor: "var(--fhl-navy-border)" }}
        >
          <div className="space-y-3">
            <Text
              as="p"
              size={TEXT_SIZE.SM}
              className="text-[var(--fhl-white)]"
            >
              &copy; {currentYear} {resolvedCopyrightLabel}. All rights
              reserved.
            </Text>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {bottomLinks.map((item, index) =>
                renderFooterLink(item, `${item.label}-${item.href || index}`, {
                  compact: true,
                }),
              )}
            </div>
          </div>

          {aside ? <div className="self-end md:shrink-0">{aside}</div> : null}
        </div>
      </div>
    </footer>
  );
}
