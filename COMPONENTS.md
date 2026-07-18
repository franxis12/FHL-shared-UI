# Component Usage

This file documents how to use each exported component from `@franxis12/fhl-shared-ui`.

Import the shared CSS once in the consuming app:

```jsx
import "@franxis12/fhl-shared-ui/FHL-shared-UI.css";
```

All icon props expect a React component unless noted otherwise.

## Button

Use `Button` for primary and secondary actions.

Common props:
- `children`
- `variant`: `"primary"` or `"secondary"`
- `icon`
- `type`
- `disabled`
- `onClick`
- `className`

Example:

```jsx
import { Button } from "@franxis12/fhl-shared-ui";
import { FiSave } from "react-icons/fi";

<Button variant="primary" icon={FiSave} onClick={handleSave}>
  Save changes
</Button>;
```

## Card

Use `Card` for simple grouped content.

Common props:
- `title`
- `icon`
- `children`

Example:

```jsx
import { Card } from "@franxis12/fhl-shared-ui";
import { FiHome } from "react-icons/fi";

<Card title="Property summary" icon={FiHome}>
  Active listings, monthly revenue and occupancy can live here.
</Card>;
```

## Container

Use `Container` for forms, modal bodies, detail panels and grouped sections.

Exports:
- `Container`
- `CONTAINER_PADDING`
- `CONTAINER_SURFACE`

Common props:
- `as`
- `title`
- `description`
- `header`
- `headerAction`
- `footer`
- `padding`
- `surface`
- `fitContent`
- `divided`
- `bordered`
- `shadow`
- `className`
- `contentClassName`

Example:

```jsx
import {
  Button,
  Container,
  CONTAINER_PADDING,
} from "@franxis12/fhl-shared-ui";

<Container
  title="Invite owner"
  description="Send an invitation to a new owner."
  padding={CONTAINER_PADDING.LG}
  divided
  footer={
    <div className="flex justify-end gap-3">
      <Button variant="secondary">Cancel</Button>
      <Button>Send invite</Button>
    </div>
  }
>
  <div className="space-y-4">{/* form fields */}</div>
</Container>;
```

For modal-sized content:

```jsx
<Container fitContent className="max-w-full" />
```

## Input

Use `Input` for text, email, password and other standard input types.

Exports:
- `Input`
- `INPUT_STATUS`

Common props:
- `label`
- `helperText`
- `status`
- `statusMessage`
- `icon`
- `trailingIcon`
- `trailingIconAriaLabel`
- `onTrailingIconClick`
- `selected`
- `type`
- `showPasswordToggle`
- `disabled`
- `required`
- `className`
- `containerClassName`
- `inputClassName`

Available status values:
- `INPUT_STATUS.SUCCESS`
- `INPUT_STATUS.ERROR`
- `INPUT_STATUS.WARNING`

Example:

```jsx
import { Input, INPUT_STATUS } from "@franxis12/fhl-shared-ui";
import { FiMail } from "react-icons/fi";

<Input
  label="Email"
  type="email"
  icon={FiMail}
  placeholder="name@example.com"
  status={INPUT_STATUS.ERROR}
  statusMessage="Enter a valid email address."
/>;
```

Password example:

```jsx
import { Input } from "@franxis12/fhl-shared-ui";
import { FiKey } from "react-icons/fi";

<Input
  label="Password"
  type="password"
  icon={FiKey}
  helperText="Use 8 or more characters."
/>;
```

## Checkbox

Use `Checkbox` for terms acceptance, boolean preferences, and settings toggles that should share the same visual language as the rest of the UI.

Exports:
- `Checkbox`
- `CHECKBOX_STATUS`

Common props:
- `label`
- `helperText`
- `status`
- `statusMessage`
- `checked`
- `defaultChecked`
- `selected`
- `indeterminate`
- `disabled`
- `required`
- `className`
- `controlClassName`

Available status values:
- `CHECKBOX_STATUS.SUCCESS`
- `CHECKBOX_STATUS.ERROR`
- `CHECKBOX_STATUS.WARNING`

Example:

```jsx
import { Checkbox, CHECKBOX_STATUS } from "@franxis12/fhl-shared-ui";

<Checkbox
  label="I agree to the terms and conditions."
  checked={acceptedTerms}
  onChange={(event) => setAcceptedTerms(event.target.checked)}
  status={!acceptedTerms ? CHECKBOX_STATUS.ERROR : undefined}
  statusMessage={!acceptedTerms ? "Required to continue." : ""}
/>;
```

## PropertyDashboardCard

Use `PropertyDashboardCard` for owner/admin dashboard property grids where each card needs occupancy context, rating, and a direct edit action.

Exports:
- `PropertyDashboardCard`
- `PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE`

Common props:
- `title`
- `propertyType`
- `address`
- `coverImageUrl`
- `onOpen`
- `onEdit`
- `editIcon`
- `availableUnitsLabel`
- `occupancyLabel`
- `occupancyTone`
- `ratingValue`
- `ratingCount`

Example:

```jsx
import {
  PropertyDashboardCard,
  PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE,
} from "@franxis12/fhl-shared-ui";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

<PropertyDashboardCard
  title="Oak Street Apartments"
  propertyType="Apartment building"
  address="123 Main Street, Miami, FL 33101"
  coverImageUrl={coverUrl}
  availableUnitsLabel="2/10 units available"
  occupancyLabel="High vacancy"
  occupancyTone={PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.WARNING}
  ratingValue={4.6}
  ratingCount={18}
  editIcon={PencilSquareIcon}
  onOpen={() => navigate(`/owner/dashboard/properties/${property.id}`)}
  onEdit={() => navigate(`/owner/dashboard/properties/${property.id}/edit`)}
/>;
```

## Text

Use `Text` as the shared typography layer. If the text system changes later, components that use this API can update together.

Exports:
- `Text`
- `TEXT_SIZE`
- `TEXT_WEIGHT`
- `TEXT_TONE`

Common props:
- `as`
- `size`
- `weight`
- `tone`
- `align`
- `truncate`
- `uppercase`
- `className`

Available sizes:
- `TEXT_SIZE.XS`
- `TEXT_SIZE.SM`
- `TEXT_SIZE.MD`
- `TEXT_SIZE.LG`
- `TEXT_SIZE.XL`
- `TEXT_SIZE.TWO_XL`
- `TEXT_SIZE.THREE_XL`
- `TEXT_SIZE.FOUR_XL`

Available weights:
- `TEXT_WEIGHT.REGULAR`
- `TEXT_WEIGHT.MEDIUM`
- `TEXT_WEIGHT.SEMIBOLD`
- `TEXT_WEIGHT.BOLD`

Available tones:
- `TEXT_TONE.DEFAULT`
- `TEXT_TONE.MUTED`
- `TEXT_TONE.PRIMARY`
- `TEXT_TONE.ACCENT`
- `TEXT_TONE.SUCCESS`
- `TEXT_TONE.WARNING`
- `TEXT_TONE.DANGER`
- `TEXT_TONE.INHERIT`

Example:

```jsx
import {
  Text,
  TEXT_SIZE,
  TEXT_TONE,
  TEXT_WEIGHT,
} from "@franxis12/fhl-shared-ui";

<>
  <Text as="h1" size={TEXT_SIZE.THREE_XL} weight={TEXT_WEIGHT.BOLD}>
    Dashboard
  </Text>
  <Text size={TEXT_SIZE.SM} tone={TEXT_TONE.MUTED}>
    Shared typography keeps the site consistent.
  </Text>
</>;
```

## Logo

Use `Logo` when you need the shared FHL logo system.

Exports:
- `Logo`
- `LOGO_MODES`

Available modes:
- `LOGO_MODES.NORMAL`
- `LOGO_MODES.HORIZONTAL`
- `LOGO_MODES.DARK`

Common props:
- `mode`
- `darkMode`
- `themeAware`
- `className`
- `lightClassName`
- `darkClassName`

Example:

```jsx
import { Logo, LOGO_MODES } from "@franxis12/fhl-shared-ui";

<Logo
  mode={LOGO_MODES.HORIZONTAL}
  darkMode={LOGO_MODES.DARK}
  themeAware
  className="h-10 w-auto"
/>;
```

## DashboardProgressCard

Use `DashboardProgressCard` for dashboard progress summaries. Its default
checklist layout remains appropriate for completion percentages. Use the steps
layout when progress is sequential and the current step owns the next action.

Exports:
- `DashboardProgressCard`
- `DASHBOARD_PROGRESS_CARD_LAYOUT`

Common props:
- `title`
- `description`
- `layout`: `"checklist"` (default) or `"steps"`
- `checklist`
- `percent`, `summary`, `actionLabel`, `actionHref`, `onActionClick` for the default checklist layout

Step items can include:
- `key`
- `label`
- `done`
- `href`
- `onClick`

The first incomplete step is marked current. Future steps are disabled; completed
steps and the current step are interactive only when they receive `href` or
`onClick`.

```jsx
import {
  DashboardProgressCard,
  DASHBOARD_PROGRESS_CARD_LAYOUT,
} from "@franxis12/fhl-shared-ui";

<DashboardProgressCard
  title="Application progress"
  description="Next step: Approved"
  layout={DASHBOARD_PROGRESS_CARD_LAYOUT.STEPS}
  checklist={[
    { key: "submitted", label: "Submitted", done: true, href: "/applications" },
    { key: "approved", label: "Approved", done: false, href: "/applications" },
    { key: "screening", label: "Screening", done: false },
  ]}
/>;
```

## DashboardBreadcrumb

Use `DashboardBreadcrumb` for route trails inside dashboard pages.

Common props:
- `items`
- `className`

Each item can include:
- `label`
- `href`
- `onClick`
- `isCurrent`
- `key`

Example:

```jsx
import { DashboardBreadcrumb } from "@franxis12/fhl-shared-ui";

<DashboardBreadcrumb
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Properties", href: "/dashboard/properties" },
    { label: "Property details", isCurrent: true },
  ]}
/>;
```

## DashboardRouteBar

Use `DashboardRouteBar` under a topbar to show breadcrumbs plus page-level actions.

Common props:
- `breadcrumbItems`
- `actions`
- `className`
- `style`

Each action can include:
- `label`
- `href`
- `onClick`
- `disabled`
- `loading`
- `loadingLabel`
- `variant`: `"primary"`, `"secondary"` or `"ghost"`
- `title`
- `ariaLabel`
- `key`

Example:

```jsx
import { DashboardRouteBar } from "@franxis12/fhl-shared-ui";

<DashboardRouteBar
  breadcrumbItems={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Applications", isCurrent: true },
  ]}
  actions={[
    { label: "Refresh", variant: "ghost", onClick: handleRefresh },
    { label: "New application", variant: "primary", onClick: handleCreate },
  ]}
/>;
```

## DashboardTopbar

Use `DashboardTopbar` for the page title area in dashboards.

Common props:
- `dashboardLabel`
- `currentTabLabel`
- `currentTabHint`
- `displayName`
- `userLabel`
- `topbarBadges`
- `avatarContent`
- `className`
- `style`

Each badge can include:
- `label`
- `value`
- `key`

Example:

```jsx
import { DashboardTopbar } from "@franxis12/fhl-shared-ui";

<DashboardTopbar
  dashboardLabel="Owner dashboard"
  currentTabLabel="Applications"
  currentTabHint="Review rental applications and tour requests."
  displayName="Jessica Parker"
  userLabel="Logged user"
  topbarBadges={[
    { label: "Open", value: 12 },
    { label: "Tours", value: 3 },
  ]}
/>;
```

## DashboardNavbar

Use `DashboardNavbar` for shared dashboard side navigation.

Common props:
- `brand`
- `navItems`
- `navSections`
- `footerItems`
- `collapsed`
- `collapseToggle`
- `profileMenu`
- `isSigningOut`
- `onSignOut`
- `signOutIcon`
- `signOutLabel`
- `signingOutLabel`
- `className`
- `style`

`brand` can include:
- `href`
- `onClick`
- `ariaLabel`
- `content`
- `logoMode`
- `darkLogoMode`
- `logoThemeAware`
- `logoClassName`
- `lightLogoClassName`
- `darkLogoClassName`

Each nav item can include:
- `label`
- `href`
- `onClick`
- `icon`
- `isActive`
- `children`
- `showChildren`
- `key`

If you need grouped navigation, use `navSections`:

```jsx
[
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", isActive: true }],
  },
]
```

`collapseToggle` can include:
- `onToggle`
- `expandedLabel`
- `collapsedLabel`
- `expandedIcon`
- `collapsedIcon`

`profileMenu` can include:
- `ref`
- `isOpen`
- `onToggle`
- `displayName`
- `avatarContent`
- `menuItems`

Example:

```jsx
import {
  DashboardNavbar,
  LOGO_MODES,
} from "@franxis12/fhl-shared-ui";
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

<DashboardNavbar
  brand={{
    href: "/dashboard",
    logoMode: LOGO_MODES.HORIZONTAL,
    darkLogoMode: LOGO_MODES.DARK,
    logoThemeAware: true,
    logoClassName: "h-10 w-44 object-contain",
  }}
  navItems={[
    { label: "Dashboard", href: "/dashboard", icon: FiHome, isActive: true },
    { label: "Users", href: "/dashboard/users", icon: FiUsers },
    { label: "Settings", href: "/dashboard/settings", icon: FiSettings },
  ]}
  collapseToggle={{
    onToggle: toggleSidebar,
    expandedLabel: "Collapse menu",
    collapsedLabel: "Expand menu",
    expandedIcon: <FiChevronLeft className="h-4 w-4" />,
    collapsedIcon: <FiChevronRight className="h-4 w-4" />,
  }}
  signOutIcon={FiLogOut}
  onSignOut={handleSignOut}
/>;
```

## Suggested Pattern

If a new screen needs text, spacing, buttons and fields, prefer building it from these shared pieces first:

1. `Container` for the surface
2. `Text` for headings and copy
3. `Input` for fields
4. `Button` for actions

That keeps future UI changes centralized in the shared library.
