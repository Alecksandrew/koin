import type { Preview } from "@storybook/nextjs-vite";
import { themes } from "storybook/theming";

import "@/app/ui/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="font-sans antialiased">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { ...themes.normal },
      light: { ...themes.normal },

      stylePreview: true,

      classTarget: "html",
    },
    a11y: {
      test: "todo",
      config: {
         runOnly: ["wcag2a", "wcag2aa", "best-practice", "wcag2aaa"],
      },
    },
  },
};

export default preview;
