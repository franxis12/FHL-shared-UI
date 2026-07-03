import { useEffect, useState } from "react";
import { THEME_TOGGLE_MODE, ThemeToggle } from "./ThemeToggle";

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
      style={{
        background: "var(--fhl-color-bg)",
        color: "var(--fhl-color-text)",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

function InteractiveThemeToggle(args) {
  const [value, setValue] = useState(args.value);

  return <ThemeToggle {...args} value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  args: {
    value: THEME_TOGGLE_MODE.SYSTEM,
    compact: false,
    tone: "surface",
    disabled: false,
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <StoryShell>
      <InteractiveThemeToggle {...args} />
    </StoryShell>
  ),
};

export const Compact = {
  args: {
    compact: true,
  },
  render: (args) => (
    <StoryShell>
      <InteractiveThemeToggle {...args} />
    </StoryShell>
  ),
};

export const DarkMode = {
  render: (args) => (
    <StoryShell theme="dark">
      <InteractiveThemeToggle {...args} />
    </StoryShell>
  ),
};
