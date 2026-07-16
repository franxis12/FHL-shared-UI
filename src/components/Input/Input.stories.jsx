import { useEffect } from "react";
import { FiAlertCircle, FiKey, FiMail, FiSearch, FiUser } from "react-icons/fi";
import { Input, INPUT_STATUS } from "./Input";

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
      <div className="w-full max-w-95 space-y-4">{children}</div>
    </div>
  );
}

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    label: "Email",
    placeholder: "name@example.com",
    type: "email",
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <StoryShell>
      <Input
        {...args}
        icon={FiMail}
        helperText="We'll use this email for account updates."
      />
    </StoryShell>
  ),
};

export const Selected = {
  render: (args) => (
    <StoryShell>
      <Input
        {...args}
        label="Full name"
        type="text"
        placeholder="Francis Martinez"
        icon={FiUser}
        selected
      />
    </StoryShell>
  ),
};

export const Password = {
  render: (args) => (
    <StoryShell>
      <Input
        {...args}
        label="Password"
        type="password"
        placeholder="Create a secure password"
        icon={FiKey}
        helperText="Use 8 or more characters."
      />
    </StoryShell>
  ),
};

export const ValidationStates = {
  render: () => (
    <StoryShell>
      <Input
        label="Username"
        placeholder="franxis12"
        icon={FiUser}
        status={INPUT_STATUS.SUCCESS}
        statusMessage="Username available."
        defaultValue="franxis12"
      />
      <Input
        label="Search address"
        placeholder="Type a property address"
        icon={FiSearch}
        status={INPUT_STATUS.WARNING}
        statusMessage="Verify the unit number before continuing."
        defaultValue="53 Main Street"
      />
      <Input
        label="Email"
        placeholder="name@example.com"
        type="email"
        icon={FiMail}
        trailingIcon={FiAlertCircle}
        status={INPUT_STATUS.ERROR}
        statusMessage="Enter a valid email address."
        defaultValue="name@"
      />
    </StoryShell>
  ),
};

export const DarkMode = {
  render: (args) => (
    <StoryShell theme="dark">
      <Input
        {...args}
        icon={FiMail}
        helperText="Dark mode uses the same shared tokens."
      />
    </StoryShell>
  ),
};
