# AuthRedirectCard

Use this component when an app needs to send the user to the central auth portal.

```jsx
import { AuthRedirectCard } from "@franxis12/fhl-shared-ui";

function LoginRedirectPage({ authPortalUrl, reason, getAuthPortalUrl }) {
  return (
    <AuthRedirectCard
      message={reason}
      onContinue={() => window.location.replace(authPortalUrl)}
      onSecondaryAction={() => window.location.replace(getAuthPortalUrl())}
    />
  );
}
```
