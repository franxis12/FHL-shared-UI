import { LOGO_MODES, Logo } from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  args: {
    mode: LOGO_MODES.HORIZONTAL,
    className: "h-12 w-48 object-contain",
  },
};

export default meta;

export const Horizontal = {};

export const Dark = {
  args: {
    mode: LOGO_MODES.DARK,
  },
};

export const Normal = {
  args: {
    mode: LOGO_MODES.NORMAL,
    className: "h-16 w-16 object-contain",
  },
};

export const ThemeAware = {
  args: {
    mode: LOGO_MODES.HORIZONTAL,
    darkMode: LOGO_MODES.DARK,
    themeAware: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          "--color-surface": "#ffffff",
          background: "#ffffff",
          padding: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
