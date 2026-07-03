import { DashboardTopbar } from "./DashboardTopbar";

const meta = {
  title: "Components/DashboardTopbar",
  component: DashboardTopbar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = {
  args: {
    dashboardLabel: "Owner Dashboard",
    currentTabLabel: "Applications",
    currentTabHint: "Review new rental applications and pending approvals.",
    displayName: "Francis Martinez",
    topbarBadges: [
      { label: "Rental apps", value: 14 },
      { label: "Pending review", value: 5 },
      { label: "Ready to approve", value: 3 },
    ],
  },
  render: (args) => (
    <div style={{ padding: "1.5rem", backgroundColor: "var(--fhl-color-bg)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <DashboardTopbar {...args} />
      </div>
    </div>
  ),
};
