# Badge

`Badge` is a non-interactive, domain-neutral label for status and metadata. Consumers map their own business states to semantic tones.

```jsx
import {
  Badge,
  BADGE_SIZE,
  BADGE_TONE,
} from "@franxis12/fhl-shared-ui";

<Badge tone={BADGE_TONE.WARNING}>Pending review</Badge>

<Badge
  tone={BADGE_TONE.SUCCESS}
  size={BADGE_SIZE.MD}
  icon={CheckCircleIcon}
>
  Approved
</Badge>
```

## Contract

- `children`: visible label content. Text should carry the business meaning.
- `tone`: `neutral`, `info`, `success`, `warning` or `error`.
- `size`: `sm` or `md`.
- `icon`: optional icon component; decorative and hidden from assistive technology.
- `uppercase`: optional visual text transformation for established status-label patterns.
- Standard semantic, data and ARIA attributes are forwarded to the neutral `span`.

`Badge` is not a button, link or live region. It does not accept presentation overrides and does not map domain values such as `approved`, `paid` or `pending`.
