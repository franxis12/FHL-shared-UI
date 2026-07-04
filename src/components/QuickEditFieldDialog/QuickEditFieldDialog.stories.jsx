import { useEffect, useState } from "react";
import { Button } from "../Button";
import { QuickEditFieldDialog } from "./QuickEditFieldDialog";

function StoryShell({ children, theme = "light" }) {
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
        minHeight: "320px",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

function SingleFieldStory({ theme = "light" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Peace St Property");

  return (
    <StoryShell theme={theme}>
      <Button onClick={() => setOpen(true)}>Open single-field edit</Button>
      <QuickEditFieldDialog
        isOpen={open}
        title="Change property name"
        description="Update only the property name."
        label="Property name"
        value={value}
        placeholder="Example: Oak Street Apartments"
        onClose={() => setOpen(false)}
        onSubmit={(nextValue) => {
          setValue(String(nextValue || ""));
          setOpen(false);
        }}
      />
    </StoryShell>
  );
}

function AddressFieldGroupStory({ theme = "light" }) {
  const [open, setOpen] = useState(false);
  const [addressValues, setAddressValues] = useState({
    address: "108 Peace St",
    city: "Miami",
    state: "FL",
    county: "Miami-Dade",
    zipCode: "33101",
  });

  return (
    <StoryShell theme={theme}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open address editor
      </Button>
      <QuickEditFieldDialog
        isOpen={open}
        title="Change property address"
        description="Update the full property address in one step."
        fields={[
          {
            key: "address",
            label: "Street address",
            placeholder: "123 Main Street",
            value: addressValues.address,
          },
          {
            key: "city",
            label: "City",
            placeholder: "Miami",
            value: addressValues.city,
          },
          {
            key: "state",
            label: "State",
            value: addressValues.state,
            options: [
              { value: "FL", label: "Florida (FL)" },
              { value: "GA", label: "Georgia (GA)" },
              { value: "NC", label: "North Carolina (NC)" },
            ],
          },
          {
            key: "county",
            label: "County",
            placeholder: "Miami-Dade",
            value: addressValues.county,
          },
          {
            key: "zipCode",
            label: "ZIP code",
            placeholder: "33101",
            value: addressValues.zipCode,
          },
        ]}
        onClose={() => setOpen(false)}
        onSubmit={(nextValue) => {
          setAddressValues(nextValue);
          setOpen(false);
        }}
      />
    </StoryShell>
  );
}

const meta = {
  title: "Components/QuickEditFieldDialog",
  component: QuickEditFieldDialog,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const SingleField = {
  render: () => <SingleFieldStory />,
};

export const AddressFieldGroup = {
  render: () => <AddressFieldGroupStory />,
};

export const DarkMode = {
  render: () => <AddressFieldGroupStory theme="dark" />,
};
