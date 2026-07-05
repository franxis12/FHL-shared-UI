import { useEffect, useState } from "react";
import { DashboardNavbar } from "./DashboardNavbar";

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5M6.75 9.75V21h10.5V9.75" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 20.25s-6.75-4.27-8.63-8.08A4.87 4.87 0 0 1 7.78 5.25c1.63 0 3.1.78 4.22 2.12 1.12-1.34 2.6-2.12 4.22-2.12a4.87 4.87 0 0 1 4.41 6.92C18.75 15.98 12 20.25 12 20.25Z" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.75H7.5A2.25 2.25 0 0 0 5.25 6v12A2.25 2.25 0 0 0 7.5 20.25h9A2.25 2.25 0 0 0 18.75 18V8.25l-4.5-4.5Z" />
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.75V8.25H18.75" />
    </svg>
  );
}

function KeyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25a4.5 4.5 0 1 1-8.54 2h-4.46l-1.5 1.5 2.25 2.25-1.5 1.5L4.5 18l1.5-1.5 1.5 1.5 2.1-2.1" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M9.59 3.94 8.88 6.1a1.5 1.5 0 0 1-.94.94L5.78 7.75l1.41 2.06a1.5 1.5 0 0 1 0 1.38l-1.41 2.06 2.16.71a1.5 1.5 0 0 1 .94.94l.71 2.16 2.06-1.41a1.5 1.5 0 0 1 1.38 0l2.06 1.41.71-2.16a1.5 1.5 0 0 1 .94-.94l2.16-.71-1.41-2.06a1.5 1.5 0 0 1 0-1.38l1.41-2.06-2.16-.71a1.5 1.5 0 0 1-.94-.94l-.71-2.16-2.06 1.41a1.5 1.5 0 0 1-1.38 0L9.59 3.94Z" />
      <circle cx="12" cy="12" r="2.25" strokeWidth="1.8" />
    </svg>
  );
}

function OverviewIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.25h6.75V12H4.5V5.25Zm8.25 0h6.75v4.5h-6.75v-4.5ZM12.75 11.25h6.75v7.5h-6.75v-7.5ZM4.5 13.5h6.75v5.25H4.5V13.5Z" />
    </svg>
  );
}

function BuildingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3.75 20.25h16.5M6 20.25V6l6-2.25V20.25M18 20.25V9.75L12 7.5" />
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M8.25 9h1.5M8.25 12h1.5M8.25 15h1.5M14.25 10.5h1.5M14.25 13.5h1.5" />
    </svg>
  );
}

function ChevronLeftDoubleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="m11.25 6-6 6 6 6M18.75 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRightDoubleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="m5.25 6 6 6-6 6M12.75 6l6 6-6 6" />
    </svg>
  );
}

function ArrowExitIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25V5.63A1.88 1.88 0 0 0 13.88 3.75H6.38A1.88 1.88 0 0 0 4.5 5.63v12.75a1.88 1.88 0 0 0 1.88 1.87h7.5a1.88 1.88 0 0 0 1.87-1.87v-2.63" />
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h9m0 0-3-3m3 3-3 3" />
    </svg>
  );
}

function StoryShell({
  children,
  theme = "light",
  width = "240px",
  minHeight = "720px",
}) {
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
        color: "var(--fhl-color-text)",
        padding: "1.5rem",
      }}
    >
      <div style={{ width, minHeight }}>{children}</div>
    </div>
  );
}

function UserNavbarStory({ storyTheme = "light", ...args }) {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    { href: "#overview", label: "Dashboard", icon: HomeIcon, isActive: true },
    { href: "#saved", label: "Saved Homes", icon: HeartIcon },
    { href: "#profile", label: "Rental Profile", icon: FileIcon },
    { href: "#security", label: "Security", icon: KeyIcon },
    { href: "#settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <StoryShell theme={storyTheme} width={collapsed ? "64px" : "240px"}>
      <DashboardNavbar
        {...args}
        className={`!flex ${args.className || ""}`.trim()}
        brand={{
          href: "#home",
          ariaLabel: "FHL Enterprises home",
          logoMode: "horizontal",
          darkLogoMode: "dark",
          logoThemeAware: true,
          logoClassName: "h-10 w-44 object-contain",
        }}
        navItems={navItems}
        collapsed={collapsed}
        collapseToggle={{
          onToggle: () => setCollapsed((previous) => !previous),
          expandedLabel: "Collapse menu",
          collapsedLabel: "Expand menu",
          expandedIcon: <ChevronLeftDoubleIcon className="h-4 w-4" />,
          collapsedIcon: <ChevronRightDoubleIcon className="h-4 w-4" />,
        }}
        footerItems={[{ href: "#home", label: "Home", icon: HomeIcon }]}
        onSignOut={() => {}}
        signOutIcon={ArrowExitIcon}
        signOutLabel="Log out"
      />
    </StoryShell>
  );
}

function OwnerNavbarStory({ storyTheme = "light", ...args }) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { href: "#overview", label: "Overview", icon: OverviewIcon, isActive: true },
    { href: "#properties", label: "Properties", icon: BuildingIcon },
    {
      href: "#applications",
      label: "Applications",
      icon: FileIcon,
      showChildren: true,
      children: [
        { href: "#applications-list", label: "Rental applications", isActive: true },
        { href: "#tours", label: "Tour requests" },
      ],
    },
    {
      href: "#settings",
      label: "Settings",
      icon: SettingsIcon,
      children: [
        { href: "#personal-information", label: "Personal information" },
        { href: "#appearance", label: "Appearance" },
      ],
    },
  ];

  return (
    <StoryShell
      theme={storyTheme}
      width={collapsed ? "64px" : "240px"}
    >
      <DashboardNavbar
        {...args}
        className={`!flex ${args.className || ""}`.trim()}
        brand={{
          href: "#overview",
          ariaLabel: "Owner dashboard home",
          logoMode: "horizontal",
          darkLogoMode: "dark",
          logoThemeAware: true,
          logoClassName: "h-auto w-full object-contain",
        }}
        navItems={navItems}
        collapsed={collapsed}
        collapseToggle={{
          onToggle: () => setCollapsed((previous) => !previous),
          expandedLabel: "Collapse menu",
          collapsedLabel: "Expand menu",
          expandedIcon: <ChevronLeftDoubleIcon className="h-4 w-4" />,
          collapsedIcon: <ChevronRightDoubleIcon className="h-4 w-4" />,
        }}
        footerItems={[{ href: "#home", label: "Home", icon: HomeIcon }]}
        onSignOut={() => {}}
        signOutIcon={ArrowExitIcon}
        signOutLabel="Sign out"
      />
    </StoryShell>
  );
}

const meta = {
  title: "Components/DashboardNavbar",
  component: DashboardNavbar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const User = {
  render: (args) => <UserNavbarStory {...args} />,
};

export const Owner = {
  render: (args) => <OwnerNavbarStory {...args} />,
};

export const OwnerDark = {
  render: (args) => <OwnerNavbarStory {...args} storyTheme="dark" />,
};

export const Admin = {
  render: (args) => (
    <StoryShell width="280px">
      <DashboardNavbar
        {...args}
        className={`!flex ${args.className || ""}`.trim()}
        brand={{
          href: "#admin",
          ariaLabel: "Admin dashboard home",
          logoMode: "horizontal",
          darkLogoMode: "dark",
          logoThemeAware: true,
          logoClassName: "h-auto w-full object-contain",
        }}
        navSections={[
          {
            title: "Overview",
            items: [
              { href: "#dashboard", label: "Dashboard", icon: OverviewIcon, isActive: true },
              { href: "#storage", label: "Storage" },
              { href: "#settings", label: "Settings", icon: SettingsIcon },
            ],
          },
          {
            title: "Users",
            items: [
              { href: "#users", label: "Users" },
              { href: "#owners", label: "Owners" },
              { href: "#handymen", label: "Handymen" },
            ],
          },
        ]}
        footerItems={[{ href: "#home", label: "Home", icon: HomeIcon }]}
        onSignOut={() => {}}
        signOutIcon={ArrowExitIcon}
        signOutLabel="Sign out"
      />
    </StoryShell>
  ),
};
