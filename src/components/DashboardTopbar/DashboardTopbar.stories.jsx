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

export const MobileMenu = {
  args: {
    dashboardLabel: "Tenant Dashboard",
    currentTabLabel: "Rental Profile",
    currentTabHint: "Complete your profile and keep applications ready.",
    displayName: "Francis Martinez",
    topbarBadges: [
      { label: "Completion", value: "82%" },
      { label: "Applications", value: 3 },
    ],
    mobileMenuButton: {
      label: "Open navigation",
      onClick: () => {},
    },
  },
  render: (args) => (
    <div style={{ padding: "1rem", backgroundColor: "var(--fhl-color-bg)" }}>
      <div style={{ maxWidth: "420px", margin: "0 auto" }}>
        <DashboardTopbar {...args} />
      </div>
    </div>
  ),
};
