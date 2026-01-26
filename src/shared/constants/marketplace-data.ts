import { Category, Lawyer } from '@/shared/types/marketplace';

export const categories: Category[] = [
  {
    id: 'svo',
    label: 'СВО',
    gradient: 'linear-gradient(180deg, #BCCEFF 0%, #E1E9FF 100%)',
    icon: '/images/marketplace/svo-soldier.png',
  },
  {
    id: 'divorce',
    label: 'Развод',
    gradient: 'linear-gradient(180deg, #FFD4E4 0%, #FFE4EE 100%)',
    icon: '/images/marketplace/divorce-person.png',
  },
  {
    id: 'court',
    label: 'Суд',
    gradient: 'linear-gradient(180deg, #FDF5B9 0%, #FFFBDB 100%)',
    icon: '/images/marketplace/court-hammer.png',
  },
  {
    id: 'debts',
    label: 'Долги',
    gradient: 'linear-gradient(180deg, #FFE0AB 0%, #FFE9C3 100%)',
    icon: '/images/marketplace/wallet-image.png',
  },
  {
    id: 'utilities',
    label: 'ЖКХ',
    gradient: 'linear-gradient(180deg, #C2F9C3 0%, #E2FBE2 100%)',
  },
];

export const lawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Зайцев Иван Васильевич',
    photo: '/images/marketplace/lawyer-photo.jpg',
    specialization: 'Специалист по списанию долгов',
    experience: '24 года опыта',
    priceFrom: 1200,
  },
  {
    id: '2',
    name: 'Кришневская Инна Ивановна',
    photo: '/images/marketplace/lawyer-photo.jpg',
    specialization: 'Специалист\nпо недвижимости',
    experience: '16 лет опыта',
    priceFrom: 1200,
  },
  {
    id: '3',
    name: 'Кришневская Инна Ивановна',
    photo: '/images/marketplace/lawyer-photo.jpg',
    specialization: 'Специалист\nпо недвижимости',
    priceFrom: 1200,
  },
  {
    id: '4',
    name: 'Зайцев Иван Васильевич',
    photo: '/images/marketplace/lawyer-photo.jpg',
    specialization: 'Специалист по списанию долгов',
    priceFrom: 1200,
  },
];
