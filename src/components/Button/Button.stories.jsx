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

export const Outline = {
  args: {
    children: "Outline button",
    variant: "outline",
  },
};

export const Ghost = {
  args: {
    children: "Ghost button",
    variant: "ghost",
  },
};

export const Large = {
  args: {
    children: "Large CTA",
    size: "lg",
  },
};

export const Pill = {
  args: {
    children: "Pill shaped",
    shape: "pill",
  },
};

export const IconOnlyCircle = {
  args: {
    icon: ExampleIcon,
    shape: "circle",
    "aria-label": "Icon only action",
  },
};

export const AsLink = {
  args: {
    children: "Go to listings",
    href: "#",
  },
};

export const FullWidth = {
  args: {
    children: "Full width",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const DarkMode = {
  render: (args) => (
    <StoryShell theme="dark">
      <Button {...args}>Dark mode button</Button>
    </StoryShell>
  ),
};
