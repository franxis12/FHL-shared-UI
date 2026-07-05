import { useEffect } from "react";
import { FiMail, FiUser, FiX } from "react-icons/fi";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  Container,
  CONTAINER_PADDING,
  CONTAINER_RADIUS,
  CONTAINER_SURFACE,
} from "./Container";

function StoryShell({ children, theme = "light", centered = false }) {
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
      className={centered ? "flex min-h-screen items-center justify-center" : ""}
      style={{
        background: "var(--fhl-color-bg)",
        color: "var(--fhl-color-text)",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <StoryShell>
      <Container
        {...args}
        className="max-w-[560px]"
        title="Shared container"
        description="Use this surface for forms, modal content or any grouped dashboard content."
      >
        <div className="space-y-3 text-sm leading-6 text-[var(--fhl-container-text-muted)]">
          <p>
            The container keeps spacing, border and surface styles consistent
            across the app.
          </p>
          <p>
            Width stays parent-driven, so each project can decide whether it
            behaves like a page section or a modal body.
          </p>
        </div>
      </Container>
    </StoryShell>
  ),
};

export const FormLayout = {
  render: (args) => (
    <StoryShell>
      <Container
        {...args}
        className="max-w-[480px]"
        title="Create account"
        description="This example shows how the container behaves with stacked fields."
        divided
        footer={
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button>Create account</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Full name" placeholder="Francis Martinez" icon={FiUser} />
          <Input label="Email" type="email" placeholder="name@example.com" icon={FiMail} />
        </div>
      </Container>
    </StoryShell>
  ),
};

export const ModalLayout = {
  render: (args) => (
    <StoryShell centered>
      <Container
        {...args}
        fitContent
        padding={CONTAINER_PADDING.LG}
        surface={CONTAINER_SURFACE.DEFAULT}
        divided
        title="Invite owner"
        description="Send an invitation to join the dashboard."
        headerAction={
          <button
            type="button"
            className="rounded-xl p-2 text-[var(--fhl-container-text-muted)] transition hover:bg-[var(--fhl-color-hover-soft)] hover:text-[var(--fhl-container-text)]"
            aria-label="Close modal"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        }
        footer={
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary">Close</Button>
            <Button>Send invite</Button>
          </div>
        }
      >
        <div className="w-[420px] max-w-full space-y-4">
          <Input label="Owner name" placeholder="Jessica Parker" icon={FiUser} />
          <Input label="Email" type="email" placeholder="owner@example.com" icon={FiMail} />
        </div>
      </Container>
    </StoryShell>
  ),
};

export const CompactRadius = {
  render: (args) => (
    <StoryShell>
      <Container
        {...args}
        className="max-w-[480px]"
        radius={CONTAINER_RADIUS.MD}
        title="rounded-2xl card"
        description="Use radius='md' for tighter detail-page cards instead of the default 28px."
      >
        <p className="text-sm leading-6 text-[var(--fhl-container-text-muted)]">
          Same container, smaller corner radius.
        </p>
      </Container>
    </StoryShell>
  ),
};

export const SoftDarkMode = {
  render: (args) => (
    <StoryShell theme="dark">
      <Container
        {...args}
        className="max-w-[520px]"
        surface={CONTAINER_SURFACE.SOFT}
        title="Dark mode container"
        description="The same shared tokens drive the surface in dark mode."
      >
        <div className="space-y-3 text-sm leading-6 text-[var(--fhl-container-text-muted)]">
          <p>
            Use the soft surface when you want a slightly recessed card or a
            secondary modal panel.
          </p>
        </div>
      </Container>
    </StoryShell>
  ),
};
