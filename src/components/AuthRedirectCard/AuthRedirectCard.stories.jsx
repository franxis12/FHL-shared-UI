import { useEffect } from "react";
import { AuthRedirectCard } from "./AuthRedirectCard";

function StoryShell({ children, theme = "light" }) {
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    return () => {
      if (previousTheme) {
        root.setAttribute("data-theme", previousTheme);
        return;
      }

      root.removeAttribute("data-theme");
    };
  }, [theme]);

  return (
    <div
      className="grid min-h-[420px] place-items-center p-6"
      style={{
        background: "var(--fhl-color-bg)",
        color: "var(--fhl-color-text)",
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: "Components/AuthRedirectCard",
  component: AuthRedirectCard,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Redirecting to sign in",
    message: "Your session expired. Sign in again to continue.",
    continueLabel: "Continue",
    secondaryLabel: "Open auth",
    onContinue: () => {},
    onSecondaryAction: () => {},
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <StoryShell>
      <AuthRedirectCard {...args} />
    </StoryShell>
  ),
};

export const WithoutMessage = {
  args: {
    message: "",
  },
  render: (args) => (
    <StoryShell>
      <AuthRedirectCard {...args} />
    </StoryShell>
  ),
};

export const DarkMode = {
  render: (args) => (
    <StoryShell theme="dark">
      <AuthRedirectCard {...args} />
    </StoryShell>
  ),
};
