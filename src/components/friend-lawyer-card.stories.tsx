import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FriendLawyerCard } from './friend-lawyer-card';

const meta = {
  component: FriendLawyerCard,
} satisfies Meta<typeof FriendLawyerCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};