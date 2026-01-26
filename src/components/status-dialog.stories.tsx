import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusDialog } from './status-dialog';

const meta = {
  component: StatusDialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatusDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    open: true,
    type: 'success',
    onOpenChange: () => {},
  },
};

export const Error: Story = {
  args: {
    open: true,
    type: 'error',
    onOpenChange: () => {},
  },
};