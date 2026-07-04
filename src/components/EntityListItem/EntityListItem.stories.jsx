import { useEffect } from "react";
import { EntityListItem } from "./EntityListItem";

function EllipsisIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="4" cy="10" r="1.4" fill="currentColor" />
      <circle cx="10" cy="10" r="1.4" fill="currentColor" />
      <circle cx="16" cy="10" r="1.4" fill="currentColor" />
    </svg>
  );
}

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
      <div className="mx-auto max-w-5xl">{children}</div>
    </div>
  );
}

const meta = {
  title: "Components/EntityListItem",
  component: EntityListItem,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const PropertyRow = {
  render: () => (
    <StoryShell>
      <EntityListItem
        eyebrow="Property"
        title="Peace St Property"
        subtitle="108 Peace St, Miami, FL 33101"
        description="2/10 units available for this property."
        meta={[
          { key: "type", label: "Type", value: "Multi family" },
          { key: "reviews", label: "Reviews", value: "4.8 avg" },
        ]}
        badges={[
          { key: "occupancy", label: "High vacancy", tone: "warning" },
          { key: "rating", label: "4.8 stars", tone: "default" },
        ]}
        actionIcon={EllipsisIcon}
        actionsLabel="Actions"
      />
    </StoryShell>
  ),
};

export const UnitRowDark = {
  render: () => (
    <StoryShell theme="dark">
      <EntityListItem
        eyebrow="Unit"
        title="Unit 2A"
        subtitle="Level: Second floor · Parking: 1"
        description="$1,850 per month"
        meta={[
          { key: "beds", label: "Beds", value: "2" },
          { key: "baths", label: "Baths", value: "2" },
          { key: "sqft", label: "Sq ft", value: "950" },
        ]}
        badges={[{ key: "status", label: "Available", tone: "success" }]}
        actionIcon={EllipsisIcon}
        actionsLabel="Actions"
      />
    </StoryShell>
  ),
};
