import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryCard } from './category-card';

const meta = {
  title: 'Marketplace/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof CategoryCard>;

export const SVO: Story = {
  args: {
    category: {
      id: 'svo',
      label: 'СВО',
      gradient: 'linear-gradient(180deg, #BCCEFF 0%, #E1E9FF 100%)',
      icon: '/images/marketplace/svo-image.png',
    },
  },
};

export const Divorce: Story = {
  args: {
    category: {
      id: 'divorce',
      label: 'Развод',
      gradient: 'linear-gradient(180deg, #FFD4E4 0%, #FFE4EE 100%)',
      icon: '/images/marketplace/divorce-image.png',
    },
  },
};

export const Court: Story = {
  args: {
    category: {
      id: 'court',
      label: 'Суд',
      gradient: 'linear-gradient(180deg, #FDF5B9 0%, #FFFBDB 100%)',
      icon: '/images/marketplace/court-hammer.png',
    },
  },
};

export const Debts: Story = {
  args: {
    category: {
      id: 'debts',
      label: 'Долги',
      gradient: 'linear-gradient(180deg, #FFE0AB 0%, #FFE9C3 100%)',
    },
  },
};

export const Utilities: Story = {
  args: {
    category: {
      id: 'utilities',
      label: 'ЖКХ',
      gradient: 'linear-gradient(180deg, #C2F9C3 0%, #E2FBE2 100%)',
    },
  },
};
