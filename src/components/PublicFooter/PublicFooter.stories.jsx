import { ThemeToggle, THEME_TOGGLE_MODE } from "../ThemeToggle";
import { PublicFooter } from "./PublicFooter";

function FooterAside() {
  return (
    <ThemeToggle
      value={THEME_TOGGLE_MODE.SYSTEM}
      tone="navy"
      compact
      onChange={() => {}}
    />
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
    sections: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Security", href: "/security" },
          { label: "Integrations", href: "/integrations" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "For Owners", href: "/solutions/owners" },
          { label: "For Tenants", href: "/solutions/tenants" },
          { label: "For Handymen", href: "/solutions/handymen" },
          {
            label: "For Property Managers",
            href: "/solutions/property-managers",
          },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Help Center", href: "/help" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
          { label: "System Status", href: "/status" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-and-conditions" },
          { label: "Cookie Policy", href: "/cookie-policy" },
          { label: "Accessibility", href: "/accessibility" },
        ],
      },
    ],
    bottomLinks: [
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-and-conditions" },
      { label: "Cookies", href: "/cookie-policy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
    aside: <FooterAside />,
  },
};

export default meta;

export const Default = {};
