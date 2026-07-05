# Checkbox

Use this component for terms acceptance, preferences, and boolean settings.

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
