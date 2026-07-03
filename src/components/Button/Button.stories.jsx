import { useEffect } from "react";
import ExampleIcon from "../../assets/icons/example-icon.svg?react";
import { Button } from "./Button";

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

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Click me",
    variant: "primary",
    disabled: false,
  },
};

export default meta;

export const Primary = {};

export const Secondary = {
  args: {
    children: "Secondary button",
    variant: "secondary",
  },
};

export const Disabled = {
  args: {
    children: "Disabled button",
    disabled: true,
  },
};

export const WithIcon = {
  args: {
    children: "Button with icon",
    icon: ExampleIcon,
  },
};

export const DarkMode = {
  render: (args) => (
    <StoryShell theme="dark">
      <Button {...args}>Dark mode button</Button>
    </StoryShell>
  ),
};
