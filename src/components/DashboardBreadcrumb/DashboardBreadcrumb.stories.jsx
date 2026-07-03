import { DashboardBreadcrumb } from "./DashboardBreadcrumb";

const meta = {
  title: "Components/DashboardBreadcrumb",
  component: DashboardBreadcrumb,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = {
  args: {
    items: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Properties", href: "#properties" },
      { label: "Edit", isCurrent: true },
    ],
  },
};
