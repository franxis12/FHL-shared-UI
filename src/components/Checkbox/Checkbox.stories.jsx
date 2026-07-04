import { useEffect, useState } from "react";
import { Checkbox, CHECKBOX_STATUS } from "./Checkbox";

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
      <div className="w-full max-w-[420px] space-y-4">{children}</div>
    </div>
  );
}

function InteractiveCheckbox(args) {
  const [checked, setChecked] = useState(Boolean(args.checked));

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    label: "I agree to the terms and conditions.",
    helperText: "This preference can be stored during registration.",
    checked: false,
    disabled: false,
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <StoryShell>
      <InteractiveCheckbox {...args} />
    </StoryShell>
  ),
};

export const Selected = {
  args: {
    checked: true,
    selected: true,
  },
  render: (args) => (
    <StoryShell>
      <InteractiveCheckbox {...args} />
    </StoryShell>
  ),
};

export const ValidationStates = {
  render: () => (
    <StoryShell>
      <Checkbox
        label="Policy accepted"
        checked
        onChange={() => {}}
        status={CHECKBOX_STATUS.SUCCESS}
        statusMessage="Terms acceptance is ready to be stored."
      />
      <Checkbox
        label="Marketing preferences"
        helperText="Review the selected channels before saving."
        checked
        onChange={() => {}}
        status={CHECKBOX_STATUS.WARNING}
        statusMessage="This preference may affect future contact."
      />
      <Checkbox
        label="I agree to the terms and conditions."
        status={CHECKBOX_STATUS.ERROR}
        statusMessage="You must accept the terms before continuing."
      />
    </StoryShell>
  ),
};

export const DarkMode = {
  args: {
    checked: true,
  },
  render: (args) => (
    <StoryShell theme="dark">
      <InteractiveCheckbox {...args} />
    </StoryShell>
  ),
};
