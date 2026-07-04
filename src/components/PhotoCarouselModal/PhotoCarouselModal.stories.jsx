import { useEffect, useState } from "react";
import { Button } from "../Button";
import { PhotoCarouselModal } from "./PhotoCarouselModal";

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

function ModalStory({ theme = "light" }) {
  const [open, setOpen] = useState(false);

  const images = [
    {
      id: "property-1",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      alt: "Property exterior",
    },
    {
      id: "property-2",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      alt: "Property kitchen",
    },
    {
      id: "property-3",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      alt: "Property living room",
    },
  ];

  return (
    <StoryShell theme={theme}>
      <Button onClick={() => setOpen(true)}>Open photo carousel</Button>
      <PhotoCarouselModal
        isOpen={open}
        title="Peace St Property photos"
        images={images}
        onClose={() => setOpen(false)}
      />
    </StoryShell>
  );
}

const meta = {
  title: "Components/PhotoCarouselModal",
  component: PhotoCarouselModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = {
  render: () => <ModalStory />,
};

export const DarkMode = {
  render: () => <ModalStory theme="dark" />,
};
