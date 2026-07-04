import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

const PADDING_CLASSES = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-7",
};

const SURFACE_STYLES = {
  default: {
    backgroundColor: "var(--fhl-container-bg)",
  },
  soft: {
    backgroundColor: "var(--fhl-container-bg-soft)",
  },
  transparent: {
    backgroundColor: "transparent",
  },
};

export const CONTAINER_PADDING = Object.freeze({
  NONE: "none",
  SM: "sm",
  MD: "md",
  LG: "lg",
});

export const CONTAINER_SURFACE = Object.freeze({
  DEFAULT: "default",
  SOFT: "soft",
  TRANSPARENT: "transparent",
});

export const CONTAINER_RADIUS = Object.freeze({
  MD: "md",
  LG: "lg",
  XL: "xl",
});

const RADIUS_CLASSES = {
  [CONTAINER_RADIUS.MD]: "rounded-2xl",
  [CONTAINER_RADIUS.LG]: "rounded-3xl",
  [CONTAINER_RADIUS.XL]: "rounded-[28px]",
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function getPaddingClassName(padding) {
  return PADDING_CLASSES[padding] ?? PADDING_CLASSES.md;
}

function getSurfaceStyle(surface) {
  return SURFACE_STYLES[surface] ?? SURFACE_STYLES.default;
}

function ContainerHeader({
  title,
  description,
  headerAction,
  padding,
  divided,
  headerClassName,
  titleClassName,
  descriptionClassName,
}) {
  if (!title && !description && !headerAction) {
    return null;
  }

  return (
    <div
      className={joinClassNames(
        "flex items-start justify-between gap-4",
        getPaddingClassName(padding),
        divided ? "border-b" : "",
        headerClassName,
      )}
      style={{ borderColor: "var(--fhl-container-border)" }}
    >
      <div className="min-w-0 space-y-1">
        {title ? (
          <Text
            as="h3"
            size={TEXT_SIZE.XL}
            weight={TEXT_WEIGHT.SEMIBOLD}
            className={titleClassName}
          >
            {title}
          </Text>
        ) : null}

        {description ? (
          <Text
            as="p"
            size={TEXT_SIZE.SM}
            tone={TEXT_TONE.MUTED}
            className={joinClassNames("leading-6", descriptionClassName)}
          >
            {description}
          </Text>
        ) : null}
      </div>

      {headerAction ? (
        <div className="shrink-0">{headerAction}</div>
      ) : null}
    </div>
  );
}

export function Container({
  as: Component = "section",
  title,
  description,
  header,
  headerAction,
  footer,
  children,
  className = "",
  contentClassName = "",
  headerClassName = "",
  footerClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  padding = CONTAINER_PADDING.MD,
  surface = CONTAINER_SURFACE.DEFAULT,
  radius = CONTAINER_RADIUS.XL,
  fitContent = false,
  divided = false,
  bordered = true,
  shadow = true,
  style,
  ...props
}) {
  const resolvedPaddingClassName = getPaddingClassName(padding);
  const hasGeneratedHeader =
    !header && (title || description || headerAction);
  const hasFooter = Boolean(footer);

  return (
    <Component
      {...props}
      className={joinClassNames(
        fitContent ? "inline-flex max-w-full" : "flex",
        "flex-col overflow-hidden",
        RADIUS_CLASSES[radius] ?? RADIUS_CLASSES[CONTAINER_RADIUS.XL],
        bordered ? "border" : "",
        shadow
          ? "shadow-[0_24px_60px_-30px_var(--fhl-container-shadow)]"
          : "",
        className,
      )}
      style={{
        borderColor: bordered ? "var(--fhl-container-border)" : "transparent",
        color: "var(--fhl-container-text)",
        ...getSurfaceStyle(surface),
        ...style,
      }}
    >
      {header ? (
        <div
          className={joinClassNames(
            getPaddingClassName(padding),
            divided ? "border-b" : "",
            headerClassName,
          )}
          style={{ borderColor: "var(--fhl-container-border)" }}
        >
          {header}
        </div>
      ) : null}

      {hasGeneratedHeader ? (
        <ContainerHeader
          title={title}
          description={description}
          headerAction={headerAction}
          padding={padding}
          divided={divided}
          headerClassName={headerClassName}
          titleClassName={titleClassName}
          descriptionClassName={descriptionClassName}
        />
      ) : null}

      <div className={joinClassNames(resolvedPaddingClassName, contentClassName)}>
        {children}
      </div>

      {hasFooter ? (
        <div
          className={joinClassNames(
            resolvedPaddingClassName,
            divided ? "border-t" : "",
            footerClassName,
          )}
          style={{ borderColor: "var(--fhl-container-border)" }}
        >
          {footer}
        </div>
      ) : null}
    </Component>
  );
}
