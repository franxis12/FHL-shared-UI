import { useEffect } from "react";
import {
  PropertyDashboardCard,
  PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE,
} from "./PropertyDashboardCard";

function PencilIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="m16.862 4.487 2.651 2.651m-1.398-4.05a1.875 1.875 0 1 1 2.652 2.652L7.5 19.007l-4.5 1.5 1.5-4.5L17.717 3.79Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
        padding: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "360px" }}>{children}</div>
    </div>
  );
}

const meta = {
  title: "Components/PropertyDashboardCard",
  component: PropertyDashboardCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const HighVacancy = {
  render: (args) => (
    <StoryShell>
      <PropertyDashboardCard
        {...args}
        title="Oak Street Apartments"
        propertyType="Apartment building"
        address="123 Main Street, Miami, FL 33101"
        availableUnitsLabel="6/10 units available"
        occupancyLabel="High vacancy"
        occupancyTone={PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.WARNING}
        ratingValue={4.3}
        ratingCount={18}
        editIcon={PencilIcon}
      />
    </StoryShell>
  ),
};

export const FullyOccupiedDark = {
  render: (args) => (
    <StoryShell theme="dark">
      <PropertyDashboardCard
        {...args}
        title="Seabreeze Residences"
        propertyType="Multi family"
        address="980 Coastal Drive, Fort Lauderdale, FL 33301"
        availableUnitsLabel="0/12 units available"
        occupancyLabel="Fully occupied"
        occupancyTone={PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.SUCCESS}
        ratingValue={4.9}
        ratingCount={42}
        editIcon={PencilIcon}
      />
    </StoryShell>
  ),
};
