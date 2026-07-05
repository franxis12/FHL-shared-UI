import { ThemeToggle, THEME_TOGGLE_MODE } from "../ThemeToggle";
import { PublicFooter } from "./PublicFooter";

function FooterAside() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold tracking-[0.12em] text-[var(--fhl-navy-muted)] uppercase">
        Theme
      </span>
      <ThemeToggle
        value={THEME_TOGGLE_MODE.SYSTEM}
        tone="navy"
        onChange={() => {}}
      />
    </div>
  );
}

const meta = {
  title: "Components/PublicFooter",
  component: PublicFooter,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--fhl-color-bg)] pt-24">
        <Story />
      </div>
    ),
  ],
  args: {
    brand: "FHL Enterprises Group",
    description:
      "Professional rental housing management with clear listings, unit-level details, tour requests, and application workflows.",
    navItems: [
      { label: "Listings", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-and-conditions" },
    ],
    aside: <FooterAside />,
  },
};

export default meta;

export const Default = {};
