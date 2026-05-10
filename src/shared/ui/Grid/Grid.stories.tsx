import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Grid } from "./Grid";
import { ReactNode } from "react";
import {
  ALIGN_TOKENS,
  COLS_TOKENS,
  JUSTIFY_TOKENS,
  ROWS_TOKENS,
  SPACING_TOKENS,
} from "./variants";

const RESPONSIVE_TYPE_OBJECT = `{
  base?: Token,
  xs?: Token,
  sm?: Token,
  md?: Token,
  lg?: Token,
  xl?: Token
}`;

const RESPONSIVE_TYPE_SUMMARY = "Token | ResponsiveProp<Token>";
const responsiveTypeDetails = (tokens: readonly (string | number)[]) => {
  return `Token: ${tokens.join(" | ")}\n\nResponsiveProp<Token>: ${RESPONSIVE_TYPE_OBJECT}`;
};

const meta: Meta<typeof Grid> = {
  title: "Shared/UI/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    as: {
      description: "Where the grid is rendered.",
      table: {
        type: { summary: "ElementType (HTML tag or React component)" },
        defaultValue: { summary: '"div"' },
      },
    },
    cols: {
      description: "Can be from 1 to 12 at maximum.",
      table: {
        type: {
          summary: RESPONSIVE_TYPE_SUMMARY,
          detail: responsiveTypeDetails(COLS_TOKENS),
        },
      },
    },
    rows: {
      description: "Can be from 1 to 12 at maximum.",
      table: {
        type: {
          summary: RESPONSIVE_TYPE_SUMMARY,
          detail: responsiveTypeDetails(ROWS_TOKENS),
        },
      },
    },
    gap: {
      table: {
        type: {
          summary: RESPONSIVE_TYPE_SUMMARY,
          detail: responsiveTypeDetails(SPACING_TOKENS),
        },
      },
    },
    align: {
      table: {
        type: {
          summary: RESPONSIVE_TYPE_SUMMARY,
          detail: responsiveTypeDetails(ALIGN_TOKENS),
        },
      },
    },
    justify: {
      table: {
        type: {
          summary: RESPONSIVE_TYPE_SUMMARY,
          detail: responsiveTypeDetails(JUSTIFY_TOKENS),
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const DummyItem = ({ children }: { children: ReactNode }) => (
  <div className="bg-surface text-surface-foreground border-interactive flex h-24 min-w-20 items-center justify-center rounded-md border">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    cols: 3,
    gap: "md",
    children: (
      <>
        <DummyItem>1</DummyItem>
        <DummyItem>2</DummyItem>
        <DummyItem>3</DummyItem>
        <DummyItem>4</DummyItem>
        <DummyItem>5</DummyItem>
        <DummyItem>6</DummyItem>
      </>
    ),
  },
};

export const ResponsiveColumns: Story = {
  args: {
    cols: { base: 1, md: 2, lg: 4 },
    gap: "sm",
    children: (
      <>
        <DummyItem>1</DummyItem>
        <DummyItem>2</DummyItem>
        <DummyItem>3</DummyItem>
        <DummyItem>4</DummyItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Resize your browser window to see the number of columns change across breakpoint.",
      },
    },
  },
};

export const ResponsiveGaps: Story = {
  args: {
    cols: 2,
    gap: { base: "xs", lg: "xl" },
    children: (
      <>
        <DummyItem>1</DummyItem>
        <DummyItem>2</DummyItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Resize your browser window to see the number of columns change across breakpoint.",
      },
    },
  },
};
