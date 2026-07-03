import LogoMark from "../../assets/logos/FHL_logo.svg?react";
import HorizontalLogo from "../../assets/logos/FHL_horizontal_logo.svg?react";
import HorizontalDarkLogo from "../../assets/logos/FHL_horizontal_dark_logo.svg?react";

const LOGO_COMPONENTS = {
  normal: LogoMark,
  horizontal: HorizontalLogo,
  dark: HorizontalDarkLogo,
};

export const LOGO_MODES = Object.freeze({
  NORMAL: "normal",
  HORIZONTAL: "horizontal",
  DARK: "dark",
});

function resolveLogoComponent(mode) {
  return LOGO_COMPONENTS[mode] ?? HorizontalLogo;
}

export function Logo({
  mode = LOGO_MODES.HORIZONTAL,
  darkMode = LOGO_MODES.DARK,
  themeAware = false,
  className = "",
  lightClassName,
  darkClassName,
}) {
  const LightLogo = resolveLogoComponent(mode);
  const DarkLogo = resolveLogoComponent(darkMode);
  const resolvedLightClassName = lightClassName ?? className;
  const resolvedDarkClassName = darkClassName ?? className;

  if (themeAware) {
    return (
      <>
        <LightLogo
          aria-hidden="true"
          focusable="false"
          className={`theme-logo-light ${resolvedLightClassName}`.trim()}
        />
        <DarkLogo
          aria-hidden="true"
          focusable="false"
          className={`theme-logo-dark ${resolvedDarkClassName}`.trim()}
        />
      </>
    );
  }

  return (
    <LightLogo
      aria-hidden="true"
      focusable="false"
      className={resolvedLightClassName}
    />
  );
}
