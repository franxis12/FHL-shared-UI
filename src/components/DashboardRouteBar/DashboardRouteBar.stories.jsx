import { DashboardRouteBar } from "./DashboardRouteBar";

const meta = {
  title: "Components/DashboardRouteBar",
  component: DashboardRouteBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = {
  args: {
    breadcrumbItems: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Applications", href: "#applications" },
      { label: "Request", isCurrent: true },
    ],
    actions: [
      { key: "refresh", label: "Refresh", variant: "secondary" },
      { key: "add", label: "Add property", variant: "primary" },
    ],
  },
  render: (args) => (
    <div style={{ padding: "1.5rem", backgroundColor: "var(--fhl-color-bg)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <DashboardRouteBar {...args} />
      </div>
    </div>
  ),
};
