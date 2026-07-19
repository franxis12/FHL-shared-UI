import { useEffect, useState } from "react";
import { AuthPortalPage, AUTH_PORTAL_MODE } from "./AuthPortalPage";

function StoryShell({ theme = "light", children }) {
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

  return children;
}

function AuthPortalStory(args) {
  const [mode, setMode] = useState(args.mode || AUTH_PORTAL_MODE.LOGIN);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  return (
    <AuthPortalPage
      {...args}
      mode={mode}
      values={values}
      onFieldChange={(field, value) =>
        setValues((previous) => ({
          ...previous,
          [field]: value,
        }))
      }
      onModeChange={setMode}
      onSubmit={(event) => event.preventDefault()}
    />
  );
}

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Security", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Owners", href: "#" },
      { label: "For Tenants", href: "#" },
      { label: "For Handymen", href: "#" },
      { label: "For Property Managers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "#" },
      { label: "System Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

const footerBottomLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Accessibility", href: "#" },
];

const meta = {
  title: "Components/AuthPortalPage",
  component: AuthPortalPage,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    mode: AUTH_PORTAL_MODE.LOGIN,
    submitLabel: "Sign in",
    notice: {
      tone: "info",
      message: "Use your shared FHL account to continue.",
    },
    navbar: {
      logoHref: "/",
      navItems: [
        { label: "Listings", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    footer: {
      brandHref: "/",
      sections: footerSections,
      navItems: footerSections.flatMap((section) => section.links),
      bottomLinks: footerBottomLinks,
    },
    termsHref: "#",
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <StoryShell>
      <AuthPortalStory {...args} />
    </StoryShell>
  ),
};

export const Register = {
  args: {
    mode: AUTH_PORTAL_MODE.REGISTER,
    submitLabel: "Create account",
  },
  render: (args) => (
    <StoryShell>
      <AuthPortalStory {...args} />
    </StoryShell>
  ),
};

export const AccountCreated = {
  args: {
    mode: AUTH_PORTAL_MODE.ACCOUNT_CREATED,
    submitLabel: "Back to sign in",
    notice: {
      tone: "success",
      message:
        "Check your inbox and verify your email address before signing in.",
    },
  },
  render: (args) => (
    <StoryShell>
      <AuthPortalStory {...args} />
    </StoryShell>
  ),
};

export const DarkMode = {
  render: (args) => (
    <StoryShell theme="dark">
      <AuthPortalStory {...args} />
    </StoryShell>
  ),
};
