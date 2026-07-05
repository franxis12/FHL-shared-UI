# ThemeToggle

Use this component as the shared visual control for light, dark, and auto theme modes.

```jsx
import { ThemeToggle } from "@franxis12/fhl-shared-ui";

function SettingsThemeControl({ themeMode, setThemeMode }) {
  return (
    <ThemeToggle
      value={themeMode}
      onChange={setThemeMode}
    />
  );
}
```
