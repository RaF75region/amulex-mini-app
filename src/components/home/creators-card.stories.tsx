import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CreatorsCard } from './creators-card';

const meta = {
  component: CreatorsCard,
} satisfies Meta<typeof CreatorsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};