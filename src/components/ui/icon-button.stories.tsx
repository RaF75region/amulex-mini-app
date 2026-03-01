import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IconButton } from './icon-button';

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};