import { Input } from "./Input";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: 'Shared/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'medium', 'lg'],
      description: 'Controls the variant',
    },
  },
  args: {
    placeholder: "Enter your name",
    value:"",
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    "aria-invalid": true,
  },
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "Read Only",
  },
}