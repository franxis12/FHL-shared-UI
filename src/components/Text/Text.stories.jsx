import { useEffect } from "react";
import { Text, TEXT_SIZE, TEXT_TONE, TEXT_WEIGHT } from "./Text";

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
      <div className="max-w-[720px] space-y-6">{children}</div>
    </div>
  );
}

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "Shared typography keeps the whole site aligned.",
    size: TEXT_SIZE.MD,
    weight: TEXT_WEIGHT.REGULAR,
    tone: TEXT_TONE.DEFAULT,
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <StoryShell>
      <Text {...args} />
    </StoryShell>
  ),
};

export const Scale = {
  render: () => (
    <StoryShell>
      <div className="space-y-3">
        <Text as="p" size={TEXT_SIZE.XS}>Extra small body text</Text>
        <Text as="p" size={TEXT_SIZE.SM}>Small body text</Text>
        <Text as="p" size={TEXT_SIZE.MD}>Medium body text</Text>
        <Text as="p" size={TEXT_SIZE.LG}>Large supporting text</Text>
        <Text as="h3" size={TEXT_SIZE.XL} weight={TEXT_WEIGHT.SEMIBOLD}>
          Section heading
        </Text>
        <Text as="h2" size={TEXT_SIZE.TWO_XL} weight={TEXT_WEIGHT.BOLD}>
          Prominent heading
        </Text>
        <Text as="h1" size={TEXT_SIZE.THREE_XL} weight={TEXT_WEIGHT.BOLD}>
          Page title
        </Text>
      </div>
    </StoryShell>
  ),
};

export const Tones = {
  render: () => (
    <StoryShell>
      <div className="space-y-2">
        <Text tone={TEXT_TONE.DEFAULT}>Default text</Text>
        <Text tone={TEXT_TONE.MUTED}>Muted text</Text>
        <Text tone={TEXT_TONE.PRIMARY}>Primary text</Text>
        <Text tone={TEXT_TONE.ACCENT}>Accent text</Text>
        <Text tone={TEXT_TONE.SUCCESS}>Success text</Text>
        <Text tone={TEXT_TONE.WARNING}>Warning text</Text>
        <Text tone={TEXT_TONE.DANGER}>Danger text</Text>
      </div>
    </StoryShell>
  ),
};

export const DarkMode = {
  render: () => (
    <StoryShell theme="dark">
      <div className="space-y-2">
        <Text as="h2" size={TEXT_SIZE.TWO_XL} weight={TEXT_WEIGHT.BOLD}>
          Dark mode typography
        </Text>
        <Text tone={TEXT_TONE.MUTED}>
          These values come from the same shared typography tokens.
        </Text>
      </div>
    </StoryShell>
  ),
};
