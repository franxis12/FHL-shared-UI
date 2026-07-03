import { Button } from "../Button";
import { Container, CONTAINER_PADDING } from "../Container";
import { LOGO_MODES, Logo } from "../Logo";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function AuthRedirectCard({
  title = "Redirecting to sign in",
  message = "",
  continueLabel = "Continue",
  secondaryLabel = "Open auth",
  onContinue,
  onSecondaryAction,
  continueVariant = "primary",
  secondaryVariant = "secondary",
  className = "",
  contentClassName = "",
  logoClassName = "h-auto w-56",
  logoMode = LOGO_MODES.HORIZONTAL,
  darkLogoMode = LOGO_MODES.DARK,
  themeAware = true,
}) {
  return (
    <Container
      className={joinClassNames("w-full max-w-md", className)}
      padding={CONTAINER_PADDING.LG}
      contentClassName={joinClassNames("grid gap-6", contentClassName)}
    >
      <div className="flex justify-center">
        <Logo
          mode={logoMode}
          darkMode={darkLogoMode}
          themeAware={themeAware}
          className={logoClassName}
        />
      </div>

      <div className="grid gap-2">
        <Text as="h1" size={TEXT_SIZE.LG} weight={TEXT_WEIGHT.SEMIBOLD}>
          {title}
        </Text>
        {message ? (
          <Text tone={TEXT_TONE.MUTED}>{message}</Text>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          className="flex-1 justify-center"
          variant={continueVariant}
          onClick={onContinue}
        >
          {continueLabel}
        </Button>
        {secondaryLabel && onSecondaryAction ? (
          <Button
            className="flex-1 justify-center"
            variant={secondaryVariant}
            onClick={onSecondaryAction}
          >
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </Container>
  );
}
