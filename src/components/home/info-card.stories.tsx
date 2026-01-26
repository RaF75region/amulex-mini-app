import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InfoCard } from './info-card';

const meta = {
  component: InfoCard,
} satisfies Meta<typeof InfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "url",
    title: "title",
    color: "color",
    id: 0
  }
};