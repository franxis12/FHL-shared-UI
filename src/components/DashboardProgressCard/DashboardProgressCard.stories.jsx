import { DashboardProgressCard } from "./DashboardProgressCard";

const meta = {
  title: "Components/DashboardProgressCard",
  component: DashboardProgressCard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Interactive = {
  args: {
    title: "Application progress",
    description: "Next step: Approved · Example residence",
    checklist: [
      { key: "submitted", label: "Submitted", done: true, href: "#submitted" },
      { key: "approved", label: "Approved", done: false, href: "#approved" },
      { key: "screening", label: "Screening", done: false },
      { key: "agreement", label: "Agreement signed", done: false },
      { key: "move-in", label: "Move-in paid", done: false },
      { key: "completed", label: "Completed", done: false },
    ],
  },
};
