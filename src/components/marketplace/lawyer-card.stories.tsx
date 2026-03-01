import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LawyerCard } from './lawyer-card';

const meta = {
  title: 'Marketplace/LawyerCard',
  component: LawyerCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '180px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LawyerCard>;

export default meta;
type Story = StoryObj<typeof LawyerCard>;

export const WithExperience: Story = {
  args: {
    lawyer: {
      id: '1',
      name: 'Зайцев Иван Васильевич',
      photo: '/images/marketplace/lawyer-photo.jpg',
      specialization: 'Специалист по списанию долгов',
      experience: '24 года опыта',
      priceFrom: 1200,
    },
  },
};

export const WithoutExperience: Story = {
  args: {
    lawyer: {
      id: '2',
      name: 'Кришневская Инна Ивановна',
      photo: '/images/marketplace/lawyer-photo.jpg',
      specialization: 'Специалист по недвижимости',
      priceFrom: 1200,
    },
  },
};

export const LongSpecialization: Story = {
  args: {
    lawyer: {
      id: '3',
      name: 'Петров Алексей Михайлович',
      photo: '/images/marketplace/lawyer-photo.jpg',
      specialization: 'Специалист по корпоративному праву и международным сделкам',
      experience: '15 лет опыта',
      priceFrom: 2500,
    },
  },
};
