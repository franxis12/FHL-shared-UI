import {
  DashboardProgressCard,
  DASHBOARD_PROGRESS_CARD_LAYOUT,
} from "./DashboardProgressCard";

const meta = {
  title: "Components/DashboardProgressCard",
  component: DashboardProgressCard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Checklist = {
  args: {
    title: "Profile completion",
    description: "Complete your profile before applying.",
    percent: 50,
    summary: "2 of 4 items complete",
    checklist: [
      { key: "contact", label: "Contact details", done: true },
      { key: "income", label: "Income", done: true },
      { key: "household", label: "Household", done: false },
      { key: "history", label: "Rental history", done: false },
    ],
  },
};

export const InteractiveSteps = {
  args: {
    title: "Application progress",
    description: "Next step: Approved · Example residence",
    layout: DASHBOARD_PROGRESS_CARD_LAYOUT.STEPS,
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
