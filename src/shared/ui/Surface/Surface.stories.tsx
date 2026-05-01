import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from './Surface';

const meta = {
  title: 'Shared/UI/Surface',
  component: Surface,
  parameters: {
    layout: 'centered',
  },
  argTypes:{
    boxShadow:{
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      control: "select",
    },
    variant: {
      options: ["default", "primary"],
      control: "select",
    }
  },
  args: {
    as: 'div',
    children: 'Surface Content',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
