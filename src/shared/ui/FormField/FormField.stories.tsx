import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";
import { Input } from "../Input";
import { Surface } from "../Surface";

const meta = {
  title: "Shared/UI/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  args: {
    id: "email",
    label: "Email Address",
    children: <Input placeholder="Enter your email" />,
  },
  tags: ["autodocs"],

} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "We'll never share your email with anyone else.",
  },
};

export const WithError: Story = {
  args: {
    error: "Invalid email address format.",
  },
};

export const WithErrorAndHint: Story = {
  args: {
    error: "Invalid email address format.",
    hint: "We'll never share your email with anyone else.",
  },
};
