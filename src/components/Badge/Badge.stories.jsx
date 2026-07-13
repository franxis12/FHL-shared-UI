import { useEffect } from "react";
import { FiClock } from "react-icons/fi";
import { Badge, BADGE_SIZE, BADGE_TONE } from "./Badge";

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
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Pending review",
    tone: BADGE_TONE.NEUTRAL,
    size: BADGE_SIZE.SM,
  },
  argTypes: {
    tone: {
      control: "select",
      options: Object.values(BADGE_TONE),
    },
    size: {
      control: "select",
      options: Object.values(BADGE_SIZE),
    },
  },
};

export default meta;

export const Default = {};

export const Tones = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone={BADGE_TONE.NEUTRAL}>Neutral</Badge>
      <Badge tone={BADGE_TONE.INFO}>Information</Badge>
      <Badge tone={BADGE_TONE.SUCCESS}>Successful</Badge>
      <Badge tone={BADGE_TONE.WARNING}>Needs attention</Badge>
      <Badge tone={BADGE_TONE.ERROR}>Failed</Badge>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size={BADGE_SIZE.SM}>Small</Badge>
      <Badge size={BADGE_SIZE.MD}>Medium</Badge>
    </div>
  ),
};

export const WithIcon = {
  args: {
    icon: FiClock,
    tone: BADGE_TONE.WARNING,
  },
};

export const Uppercase = {
  args: {
    children: "Processing",
    uppercase: true,
    tone: BADGE_TONE.INFO,
  },
};

export const WrappingContent = {
  args: {
    children: "Additional information is required before this can continue",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "12rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const DarkMode = {
  render: () => (
    <StoryShell theme="dark">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={BADGE_TONE.NEUTRAL}>Neutral</Badge>
        <Badge tone={BADGE_TONE.INFO}>Information</Badge>
        <Badge tone={BADGE_TONE.SUCCESS}>Successful</Badge>
        <Badge tone={BADGE_TONE.WARNING}>Needs attention</Badge>
        <Badge tone={BADGE_TONE.ERROR}>Failed</Badge>
      </div>
    </StoryShell>
  ),
};
