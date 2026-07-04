import { useEffect } from "react";
import { EntityActionMenu } from "./EntityActionMenu";

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
        minHeight: "420px",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: "Components/EntityActionMenu",
  component: EntityActionMenu,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const lightItems = [
  { key: "open", label: "Open property" },
  { key: "address", label: "Change address" },
  { key: "name", label: "Change name" },
  { key: "type", label: "Change type" },
];

const darkItems = [
  { key: "rent", label: "Change rent" },
  { key: "status", label: "Change status" },
  { key: "parking", label: "Change parking spaces" },
  { key: "delete", label: "Archive unit", tone: "danger" },
];

export const Default = {
  render: () => (
    <StoryShell>
      <div className="text-sm text-[var(--fhl-color-text-muted)]">
        Action menu preview
      </div>
      <EntityActionMenu
        isOpen
        position={{ x: 260, y: 140 }}
        items={lightItems}
        onClose={() => {}}
      />
    </StoryShell>
  ),
};

export const DarkMode = {
  render: () => (
    <StoryShell theme="dark">
      <div className="text-sm text-[var(--fhl-color-text-muted)]">
        Action menu preview
      </div>
      <EntityActionMenu
        isOpen
        position={{ x: 260, y: 140 }}
        items={darkItems}
        onClose={() => {}}
      />
    </StoryShell>
  ),
};
