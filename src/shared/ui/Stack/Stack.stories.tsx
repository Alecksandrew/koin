import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "./Stack";
import { ReactNode } from "react";

const responsiveObjectDescription = `{\n  base?: Token,\n  xs?: Token,\n  sm?: Token,\n  md?: Token,\n  lg?: Token,\n  xl?: Token\n}`;

const meta = {
  title: "Shared/UI/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The \`Stack\` component is the primitive flexbox layout component.

### How to use responsive properties (\`ResponsiveProp\`)
All layout properties (direction, gap, align, etc.) accept either a fixed value or an object for precise control at each breakpoint.

**1. Fixed Value (Applies to all screen sizes)**
\`\`\`tsx
<Stack direction="col" gap="md">
\`\`\`

**2. Responsive Object (Mobile-first)**
\`\`\`tsx
<Stack 
  direction={{ base: 'col', md: 'row' }} 
  gap={{ base: 'xs', md: 'md', xl: 'xl' }}
>
\`\`\`
*Where \`base\` is the default behavior (mobile/0px), and \`md\` applies from that breakpoint onward.*
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      description: "Defines the flexbox direction.",
      control: "object",
      table: {
        category: "Layout",
        type: {
          summary: "Token | ResponsiveObject",
          detail: `Token: "row" | "col" | "row-reverse" | "col-reverse"\n\nResponsiveObject: ${responsiveObjectDescription}`,
        },
        defaultValue: { summary: '"row"' },
      },
    },
    gap: {
      description: "Spacing between items.",
      control: "object",
      table: {
        category: "Layout",
        type: {
          summary: "Token | ResponsiveObject",
          detail: `Token: "none" | "xs" | "sm" | "md" | "lg" | "xl"\n\nResponsiveObject: ${responsiveObjectDescription}`,
        },
        defaultValue: { summary: '"none"' },
      },
    },
    align: {
      description: "Cross-axis alignment (align-items).",
      control: "object",
      table: {
        category: "Layout",
        type: {
          summary: "Token | ResponsiveObject",
          detail: `Token: "start" | "center" | "end" | "baseline" | "stretch"\n\nResponsiveObject: ${responsiveObjectDescription}`,
        },
      },
    },
    justify: {
      description: "Main-axis distribution (justify-content).",
      control: "object",
      table: {
        category: "Layout",
        type: {
          summary: "Token | ResponsiveObject",
          detail: `Token: "normal" | "start" | "center" | "end" | "between" | "around" | "evenly"\n\nResponsiveObject: ${responsiveObjectDescription}`,
        },
      },
    },
    wrap: {
      description: "Line wrapping behavior (flex-wrap).",
      control: "object",
      table: {
        category: "Layout",
        type: {
          summary: "Token | ResponsiveObject",
          detail: `Token: "wrap" | "nowrap" | "wrap-reverse"\n\nResponsiveObject: ${responsiveObjectDescription}`,
        },
      },
    },
    as: {
      description: "Semantic HTML element to render.",
      control: "text",
      table: {
        category: "Polymorphic",
        type: { summary: 'ElementType (ex: "section", "ul", "div")' },
        defaultValue: { summary: '"div"' },
      },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-primary text-primary-foreground rounded-md p-lg ${className}`}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    direction: "row",
    gap: "md",
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const ResponsiveDirection: Story = {
  args: {
    direction: { base: "col", md: "row" },
    gap: "md",
    children: (
      <>
        <Box>Mobile: Column</Box>
        <Box>Desktop: Row</Box>
        <Box>Resize the window!</Box>
      </>
    ),
  },
};

export const ResponsiveGap: Story = {
  args: {
    direction: "row",
    gap: { base: "xs", md: "lg", xl: "xl" },
    children: (
      <>
        <Box>Gap grows</Box>
        <Box>with</Box>
        <Box>screen size</Box>
      </>
    ),
  },
};

export const NestedStacks: Story = {
  args: {
    direction: "col",
    gap: "lg",
    children: (
      <>
        <Box>Header</Box>
        <Stack direction={{ base: "col", sm: "row" }} gap="md">
          <Box className="flex-1">Sidebar</Box>
          <Box className="flex-3">Main Content</Box>
        </Stack>
        <Box>Footer</Box>
      </>
    ),
  },
};
