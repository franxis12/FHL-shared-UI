# Canonical Badge roadmap

Status: `BADGE_COMPONENT_COMPLETED`

Scope: add one non-interactive, domain-neutral `Badge` contract to Shared UI and validate it through the existing Handyman `QuoteStatusBadge` domain adapter. Owner, Tenant, Admin, Web and existing Shared UI compound components are audit-only consumers in this phase.

## Transversal evidence

| Repository | Component / file | States | Tones | Sizes | Icons | Interaction | Use |
| --- | --- | --- | --- | --- | --- | --- | --- |
| handyman-FHL | `HandymanDashboardOverviewTab.jsx` / `QuoteStatusBadge` | Quote labels supplied by two table renderers | info, success, warning, error | small, 11px | No | None | Quote request and recent-ticket status |
| owner-FHL | `OwnerDashboardPage.jsx` / `StatusBadge` | Application, agreement, lease and payment labels | neutral | small, 11px, uppercase | No | None | Cross-domain status label |
| owner-FHL | `OwnerDashboardMaintenanceTab.jsx` / `PriorityBadge` | Maintenance priorities | neutral | small, 11px, uppercase | No | None | DataTable renderer |
| owner-FHL | `OwnerDashboardMaintenanceTab.jsx` / `QuoteStatusBadge` | Quote states | neutral, success, warning, error | small, 11px | No | None | DataTable renderer |
| owner-FHL | `OwnerDashboardMaintenanceTab.jsx` / `PayoutStatusBadge` | Payout states | neutral, success, warning, error | small, 11px | No | None | DataTable renderer |
| owner-FHL | `PropertyBrowserView.jsx` / inline badges | Occupancy, rating, unit, pets and smoking labels | neutral, success, warning, error | small | Rating uses an icon | None | Property metadata |
| owner-FHL | `OwnerDashboardLeasesTab.jsx` / inline pills | Lease states and attributes | neutral plus semantic colors | medium, 12px | No | None | Status and metadata |
| owner-FHL | `ApplicationMenuTabs.jsx` / tab counters | Application counts | neutral | small | No | Inside buttons | Interactive counter; do not replace independently with Badge |
| tenant-FHL | `UserDashboardMaintenanceTab.jsx` / `StatusBadge` | Lease count, ticket status and priority | info, success, warning | small, 11px | No | None | Maintenance summaries and rows |
| tenant-FHL | `RentPaymentsList.jsx` / `StatusPill` | Paid, late, upcoming, processing, failed, disputed and related states | neutral, info, success, warning, error plus domain-specific hues | small, 11px, uppercase | No | None; displayed inside a clickable row | Payment state label |
| tenant-FHL | `userDashboardShared.jsx` / inline status pills | Applications and leases | neutral, success, warning, error | small or medium | No | None | Status labels |
| web-FHL | Application and tour pages / inline pills | Adult/minor, rent responsibility, screening state and pre-filled info | neutral, info | small | One informational pill uses an icon | None | Public-form metadata |
| admin-FHL | Dashboard topbar badge data | Resource counts | compound-owned neutral metadata | small | No | None | Presentation is already owned by Shared UI; not a local Badge migration |
| FHL-shared-UI | `EntityListItem.jsx` / private `renderBadge` | Consumer-provided labels | neutral, success, warning, error | small, 11px | No | None | Compound metadata |
| FHL-shared-UI | `DashboardRecordCard.jsx` / private `StatusBadge` | Consumer-provided status | neutral, success, warning, error | medium, 12px | No | None | Compound status |

### Common contract

- All eligible examples are inline, rounded, bordered and non-interactive. Domain code supplies visible text, so color is not the only meaning.
- The recurring semantic palette is neutral, informational, successful, warning and error. Business strings remain outside Shared UI.
- Both 11px compact and 12px regular pills have active consumers, supporting `sm` and `md` only.
- Icons have real presentational precedents. A dot indicator does not: current dots belong to interactive selection or progress patterns.
- Uppercase status labels recur in Owner and Tenant; it is a presentation option, not a tone or business-state mapping.
- No eligible consumer needs polymorphic rendering. Interactive counters, buttons and links must remain owned by their interactive component.
- Existing pills do not establish a truncation contract. Badge content should remain visible and able to wrap within an available width.

## Public API decision

```jsx
<Badge
  tone={BADGE_TONE.WARNING}
  size={BADGE_SIZE.SM}
  icon={ClockIcon}
  uppercase={false}
  aria-label="Optional accessible label"
>
  Pending review
</Badge>
```

Exports:

- `Badge`
- `BADGE_TONE`: `NEUTRAL`, `INFO`, `SUCCESS`, `WARNING`, `ERROR`
- `BADGE_SIZE`: `SM`, `MD`

The default element is a semantic-neutral `span`. Standard non-styling HTML and ARIA attributes are forwarded. `className` and `style` are not presentation seams; Shared UI retains visual authority.

Rejected initial props:

- `dot`: no qualifying non-interactive consumer evidence.
- `as`: no qualifying polymorphic consumer evidence and Badge must not become a button or link.
- business-state props: would couple the package to quotes, tickets, leases or payments.
- `role="status"` by default: static labels must not imply live-region behavior.
- additional tones for orange, indigo or fuchsia: those are domain palettes, not distinct reusable semantic meanings.

Naming uses `ERROR`, matching the existing public `NOTICE_TONE.ERROR`. The package may use alert tokens internally without exposing a conflicting `danger` semantic.

### Contrast decision

The existing semantic text tokens alone are slightly below 4.5:1 for compact text in several light-mode tone/background pairs. Badge therefore derives its neutral, success, warning and error text from an 85% semantic-token / 15% application-text-token `color-mix` without changing global tokens or other components. Checks against the package fallback palette produce these light/dark contrast ratios:

| Tone | Light | Dark |
| --- | ---: | ---: |
| neutral | 5.19:1 | 10.68:1 |
| info | 12.81:1 | 6.73:1 |
| success | 5.19:1 | 11.26:1 |
| warning | 5.04:1 | 12.55:1 |
| error | 4.92:1 | 9.08:1 |

All visible labels remain present; Badge does not rely on color alone.

## Compatibility and rollout

The official FHL dependency policy is for application consumers to declare `@franxis12/fhl-shared-ui` from GitHub `main`. `package-lock.json` records the exact resolved commit, preserving reproducibility without making a commit hash the normal manifest contract. Direct commit hashes are temporary exceptions only when a documented rollback, hotfix, comparative test or known incompatibility requires one.

Shared UI work is developed and validated outside `main`, integrated into `main`, and only then consumed by applications. The Handyman pilot used the feature hash temporarily to validate the remote package boundary; its manifest returns to `#main` as part of publication closure. Owner, Tenant, Admin and Web remain unchanged in this task.

| Consumer | Locked Shared UI commit |
| --- | --- |
| handyman-FHL | `main` manifest; exact publication commit recorded by its lockfile |
| owner-FHL | `b61fc877156b72afc7103910062b6df7109d1c7c` |
| tenant-FHL | `c66ed3e4855960d3fa691d8896e4274d4d9dd1d8` |
| admin-FHL | `b61fc877156b72afc7103910062b6df7109d1c7c` |
| web-FHL | `b61fc877156b72afc7103910062b6df7109d1c7c` |

Only the Handyman package manifest and lockfile were updated. Its prior lock resolved `b61fc877156b72afc7103910062b6df7109d1c7c`.

## Phases

| Phase | Status | Work |
| --- | --- | --- |
| A. Consumer audit and API evidence | `COMPLETED` | Inspected Handyman, Owner, Tenant, Admin, Web and internal compound badge patterns. |
| B. Shared UI component | `COMPLETED` | Added component, enums, Storybook coverage, public exports and documentation. |
| C. Handyman pilot | `COMPLETED` | Retained `QuoteStatusBadge` as the domain adapter and delegated all presentation to the remotely installed Badge. |
| D. Publication and reproducible install | `COMPLETED` | Published Badge through `main`, restored Handyman to the canonical branch reference, regenerated its lock from a clean install and reran all static gates. |

## Validation record

- Shared UI production build passed; the public bundle exports `Badge`, `BADGE_TONE` and `BADGE_SIZE`.
- Storybook production build passed with stories for all tones, both sizes, icon, uppercase, wrapping and dark mode. Its existing chunk-size warning remains.
- Runtime Storybook inspection confirmed all five tones in light and dark mode, `sm` at 11px/27px high, `md` at 12px/30px high, a decorative icon with `aria-hidden`/`focusable=false`, normal wrapping for long content and no new console errors.
- The package has no lint, test or dedicated typecheck scripts; no new validation infrastructure was introduced for this component.
- Server rendering verified all tones, both sizes, optional icon, uppercase, ARIA forwarding and the absence of consumer `className`/`style` presentation seams.
- Handyman production build passed after removing `node_modules` and installing the exact remote Badge commit. Full and focused lint reproduce the repository's documented JSX and effect baselines; the baseline-excluded focused gate passes.
- Exact source searches show both `QuoteStatusBadge` consumers remain and the three Handyman amber compatibility selectors are orphaned after migration and removed.
- Handyman `package.json` uses the canonical `#main` reference; its regenerated lockfile records the exact published `main` commit. Installed exports for `Badge`, `BADGE_TONE` and `BADGE_SIZE` are verified after the clean install.
- The local dashboard smoke reached the sign-in surface because no reusable authenticated browser session was available. It produced no new console errors; no credential, quote or backend mutation was used to bypass that environment limit.

## Publication record

- Source baseline: `3db138851d808f267bf5e1959f793ef9959b686f`.
- Published Badge feature commit on `origin/Dev`: `dbc424d3eb26aa96e255076da47f8d67b0b89776`.
- Badge publication documentation commit on `origin/Dev`: `8d09ec9c3833f51900b1fefbc6cd773de3f3156f`.
- Both commits were verified on `origin/Dev`, and the branch diff against `origin/main` contained only Badge, exports, stories, documentation and required build artifacts before normal merge integration.
- No tag or release was created.
- Handyman alone is updated in this task and reproduces the package from `#main` through its exact lockfile resolution.

## Future candidates, not part of this phase

- Owner maintenance quote, payout and priority badges.
- Tenant maintenance and rent-payment status pills.
- Internal `EntityListItem` and `DashboardRecordCard` private badge rendering.
- Public application metadata pills where the final semantic mapping is clear.

Interactive tab counters and controls are intentionally excluded.
