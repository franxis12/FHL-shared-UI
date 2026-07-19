import { FiKey, FiLogIn, FiMail, FiPhone, FiUser, FiUserPlus } from "react-icons/fi";
import { Button, BUTTON_VARIANT } from "../Button";
import { Checkbox, CHECKBOX_STATUS } from "../Checkbox";
import { Container, CONTAINER_PADDING } from "../Container";
import { Input, INPUT_STATUS } from "../Input";
import { LOGO_MODES, Logo } from "../Logo";
import { Notice, NOTICE_TONE } from "../Notice";
import { PublicFooter } from "../PublicFooter";
import { PublicNavbar } from "../PublicNavbar";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "../Text";

export const AUTH_PORTAL_MODE = Object.freeze({
  ACCOUNT_CREATED: "account-created",
  CHANGE_PASSWORD: "change-password",
  FORGOT_PASSWORD: "forgot-password",
  LOGIN: "login",
  REGISTER: "register",
  RESET_PASSWORD: "reset-password",
});

function joinClassNames(...values) {
  return values.filter(Boolean).join(" ");
}

function resolveNoticeTone(tone) {
  if (tone === NOTICE_TONE.ERROR || tone === "error") {
    return NOTICE_TONE.ERROR;
  }

  if (tone === NOTICE_TONE.SUCCESS || tone === "success") {
    return NOTICE_TONE.SUCCESS;
  }

  if (tone === NOTICE_TONE.WARNING || tone === "warning") {
    return NOTICE_TONE.WARNING;
  }

  return NOTICE_TONE.INFO;
}

function resolveTitle(mode, title) {
  if (title) {
    return title;
  }

  if (mode === AUTH_PORTAL_MODE.ACCOUNT_CREATED) {
    return "Account Created";
  }

  if (mode === AUTH_PORTAL_MODE.REGISTER) {
    return "Create Account";
  }

  if (mode === AUTH_PORTAL_MODE.CHANGE_PASSWORD) {
    return "Change Password";
  }

  if (mode === AUTH_PORTAL_MODE.FORGOT_PASSWORD) {
    return "Forgot Password";
  }

  if (mode === AUTH_PORTAL_MODE.RESET_PASSWORD) {
    return "Reset Password";
  }

  return "Sign In";
}

function resolveSubmitIcon(mode) {
  if (mode === AUTH_PORTAL_MODE.REGISTER) {
    return FiUserPlus;
  }

  if (
    mode === AUTH_PORTAL_MODE.CHANGE_PASSWORD ||
    mode === AUTH_PORTAL_MODE.RESET_PASSWORD
  ) {
    return FiKey;
  }

  if (mode === AUTH_PORTAL_MODE.FORGOT_PASSWORD) {
    return FiMail;
  }

  return FiLogIn;
}

function resolveModeAction(mode) {
  if (mode === AUTH_PORTAL_MODE.LOGIN) {
    return {
      label: "Create account",
      nextMode: AUTH_PORTAL_MODE.REGISTER,
      tone: "accent",
    };
  }

  if (mode === AUTH_PORTAL_MODE.REGISTER) {
    return {
      label: "Already have an account? Login",
      nextMode: AUTH_PORTAL_MODE.LOGIN,
      tone: "accent",
    };
  }

  if (
    mode === AUTH_PORTAL_MODE.CHANGE_PASSWORD ||
    mode === AUTH_PORTAL_MODE.FORGOT_PASSWORD
  ) {
    return {
      label: "Back to login",
      nextMode: AUTH_PORTAL_MODE.LOGIN,
      tone: "accent",
    };
  }

  return {
    label: "Request another reset link",
    nextMode: AUTH_PORTAL_MODE.FORGOT_PASSWORD,
    tone: "accent",
  };
}

function renderTermsLabel(termsHref) {
  if (!termsHref) {
    return <span>I agree to the terms and conditions.</span>;
  }

  return (
    <span>
      I agree to the{" "}
      <a
        href={termsHref}
        target="_blank"
        rel="noreferrer"
        className="auth-portal-page__terms-link"
      >
        terms and conditions
      </a>
      .
    </span>
  );
}

export function AuthPortalPage({
  mode = AUTH_PORTAL_MODE.LOGIN,
  title = "",
  notice = null,
  submitLabel = "",
  disabled = false,
  values = {},
  errors = {},
  termsHref = "",
  onFieldChange,
  onModeChange,
  onSubmit,
  navbar = {},
  footer = {},
  backgroundLightSrc = "",
  backgroundDarkSrc = "",
  className = "",
  mainClassName = "",
}) {
  const resolvedTitle = resolveTitle(mode, title);
  const isAccountCreated = mode === AUTH_PORTAL_MODE.ACCOUNT_CREATED;
  const modeAction = resolveModeAction(mode);
  const submitIcon = resolveSubmitIcon(mode);
  const pageStyle = {
    "--fhl-auth-light-image": backgroundLightSrc
      ? `url("${backgroundLightSrc}")`
      : "none",
    "--fhl-auth-dark-image": backgroundDarkSrc
      ? `url("${backgroundDarkSrc}")`
      : "none",
  };

  function handleFieldChange(fieldName, fieldValue) {
    onFieldChange?.(fieldName, fieldValue);
  }

  function renderEmailField(id) {
    return (
      <Input
        id={id}
        label="Email"
        type="email"
        icon={FiMail}
        value={values.email || ""}
        onChange={(event) => handleFieldChange("email", event.target.value)}
        placeholder="name@fhlenterprisesgroup.com"
        autoComplete="email"
        disabled={disabled}
        status={errors.email ? INPUT_STATUS.ERROR : undefined}
        statusMessage={errors.email}
      />
    );
  }

  function renderPasswordField({
    id,
    label,
    value,
    error,
    placeholder,
    autoComplete,
  }) {
    return (
      <Input
        id={id}
        label={label}
        type="password"
        icon={FiKey}
        value={value || ""}
        onChange={(event) => handleFieldChange(id, event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        status={error ? INPUT_STATUS.ERROR : undefined}
        statusMessage={error}
      />
    );
  }

  function renderFormFields() {
    if (mode === AUTH_PORTAL_MODE.REGISTER) {
      return (
        <>
          <div className="auth-portal-page__name-row">
            <Input
              id="firstName"
              label="First name"
              type="text"
              icon={FiUser}
              value={values.firstName || ""}
              onChange={(event) =>
                handleFieldChange("firstName", event.target.value)
              }
              placeholder="Jane"
              autoComplete="given-name"
              disabled={disabled}
              status={errors.firstName ? INPUT_STATUS.ERROR : undefined}
              statusMessage={errors.firstName}
            />

            <Input
              id="lastName"
              label="Last name"
              type="text"
              icon={FiUser}
              value={values.lastName || ""}
              onChange={(event) =>
                handleFieldChange("lastName", event.target.value)
              }
              placeholder="Doe"
              autoComplete="family-name"
              disabled={disabled}
              status={errors.lastName ? INPUT_STATUS.ERROR : undefined}
              statusMessage={errors.lastName}
            />
          </div>

          {renderEmailField("email")}

          <Input
            id="phone"
            label="Phone"
            type="tel"
            icon={FiPhone}
            value={values.phone || ""}
            onChange={(event) => handleFieldChange("phone", event.target.value)}
            placeholder="+1 305 555 0101"
            autoComplete="tel"
            disabled={disabled}
            status={errors.phone ? INPUT_STATUS.ERROR : undefined}
            statusMessage={errors.phone}
          />

          <div className="auth-portal-page__pair-row">
            {renderPasswordField({
              id: "password",
              label: "Password",
              value: values.password,
              error: errors.password,
              placeholder: "Create password",
              autoComplete: "new-password",
            })}

            {renderPasswordField({
              id: "confirmPassword",
              label: "Confirm password",
              value: values.confirmPassword,
              error: errors.confirmPassword,
              placeholder: "Repeat password",
              autoComplete: "new-password",
            })}
          </div>

          <Checkbox
            id="acceptedTerms"
            label={renderTermsLabel(termsHref)}
            helperText="This acceptance is stored when the account is created."
            checked={Boolean(values.acceptedTerms)}
            onChange={(event) =>
              handleFieldChange("acceptedTerms", event.target.checked)
            }
            disabled={disabled}
            status={errors.acceptedTerms ? CHECKBOX_STATUS.ERROR : undefined}
            statusMessage={errors.acceptedTerms}
          />
        </>
      );
    }

    if (mode === AUTH_PORTAL_MODE.FORGOT_PASSWORD) {
      return renderEmailField("forgot-password-email");
    }

    if (
      mode === AUTH_PORTAL_MODE.RESET_PASSWORD ||
      mode === AUTH_PORTAL_MODE.CHANGE_PASSWORD
    ) {
      return (
        <>
          {renderPasswordField({
            id: "password",
            label: "New password",
            value: values.password,
            error: errors.password,
            placeholder: "New password",
            autoComplete: "new-password",
          })}

          {renderPasswordField({
            id: "confirmPassword",
            label: "Confirm new password",
            value: values.confirmPassword,
            error: errors.confirmPassword,
            placeholder: "Repeat new password",
            autoComplete: "new-password",
          })}
        </>
      );
    }

    return (
      <>
        {renderEmailField("login-email")}

        <Input
          id="password"
          label="Password"
          type="password"
          icon={FiKey}
          value={values.password || ""}
          onChange={(event) => handleFieldChange("password", event.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          disabled={disabled}
          status={errors.password ? INPUT_STATUS.ERROR : undefined}
          statusMessage={errors.password}
        />

        <button
          type="button"
          className={joinClassNames(
            "auth-portal-page__text-action",
            "auth-portal-page__text-action--muted",
          )}
          onClick={() => onModeChange?.(AUTH_PORTAL_MODE.FORGOT_PASSWORD)}
          disabled={disabled}
        >
          Forgot your password?
        </button>
      </>
    );
  }

  return (
    <div
      className={joinClassNames("auth-portal-page", className)}
      style={pageStyle}
    >
      <PublicNavbar {...navbar} />

      <main
        className={joinClassNames("auth-portal-page__main", mainClassName)}
      >
        <Container
          className="auth-portal-page__card"
          padding={CONTAINER_PADDING.LG}
          contentClassName="auth-portal-page__card-content"
        >
          <div className="auth-portal-page__brand">
            <Logo
              mode={LOGO_MODES.HORIZONTAL}
              darkMode={LOGO_MODES.DARK}
              themeAware
              className="auth-portal-page__logo"
            />
          </div>

          <div className="auth-portal-page__header">
            <Text
              as="h1"
              size={TEXT_SIZE.TWO_XL}
              weight={TEXT_WEIGHT.BOLD}
              tone={TEXT_TONE.DEFAULT}
              align="center"
            >
              {resolvedTitle}
            </Text>
          </div>

          {notice?.message ? (
            <Notice tone={resolveNoticeTone(notice.tone)}>
              {notice.message}
            </Notice>
          ) : null}

          {isAccountCreated ? (
            <div className="auth-portal-page__form">
              <Button
                type="button"
                variant={BUTTON_VARIANT.PRIMARY}
                disabled={disabled}
                icon={FiLogIn}
                fullWidth
                onClick={() => onModeChange?.(AUTH_PORTAL_MODE.LOGIN)}
              >
                {submitLabel || "Back to sign in"}
              </Button>
            </div>
          ) : (
            <form className="auth-portal-page__form" onSubmit={onSubmit}>
              {renderFormFields()}

              <Button
                type="submit"
                variant={BUTTON_VARIANT.PRIMARY}
                disabled={disabled}
                icon={submitIcon}
                fullWidth
              >
                {submitLabel || "Continue"}
              </Button>

              <button
                type="button"
                className={joinClassNames(
                  "auth-portal-page__text-action",
                  modeAction.tone === "accent"
                    ? "auth-portal-page__text-action--accent"
                    : "auth-portal-page__text-action--muted",
                )}
                onClick={() => onModeChange?.(modeAction.nextMode)}
                disabled={disabled}
              >
                {modeAction.label}
              </button>
            </form>
          )}
        </Container>
      </main>

      <div className="auth-portal-page__footer">
        <PublicFooter {...footer} />
      </div>
    </div>
  );
}
