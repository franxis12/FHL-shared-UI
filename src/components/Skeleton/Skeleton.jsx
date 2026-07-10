export const SKELETON_RADIUS = Object.freeze({
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  FULL: "full",
});

const RADIUS_CLASSES = {
  [SKELETON_RADIUS.SM]: "rounded-lg",
  [SKELETON_RADIUS.MD]: "rounded-xl",
  [SKELETON_RADIUS.LG]: "rounded-2xl",
  [SKELETON_RADIUS.XL]: "rounded-[1.5rem]",
  [SKELETON_RADIUS.FULL]: "rounded-full",
};

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function Skeleton({
  as: Component = "div",
  className = "",
  radius = SKELETON_RADIUS.MD,
  shimmer = true,
  style,
  ...props
}) {
  return (
    <Component
      aria-hidden="true"
      className={joinClassNames(
        "fhl-skeleton",
        RADIUS_CLASSES[radius] ?? RADIUS_CLASSES[SKELETON_RADIUS.MD],
        shimmer ? "fhl-skeleton--shimmer" : "",
        className,
      )}
      style={style}
      {...props}
    />
  );
}
