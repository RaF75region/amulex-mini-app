'use client';

import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CardVariant = 'primary' | 'disabled' | 'accent' | 'secondary';

interface BonusCard {
  id: string;
  title: string;
  subtitle: string;
  amount?: string | null;
  route?: string | null;
  variant: CardVariant;
}

const cards: BonusCard[] = [
  {
    id: 'premium',
    title: 'Подписка навсегда',
    subtitle: 'Добавьте бота в чат от 1000 человек',
    amount: '0₽',
    route: '/bonus/premium-access',
    variant: 'primary' as const,
  },
  {
    id: 'weekly',
    title: 'Скоро',
    subtitle: 'Подписка на неделю',
    amount: null,
    route: null,
    variant: 'disabled' as const,
  },
  {
    id: 'invite',
    title: 'Приведи друга',
    subtitle: 'На процедуру оформления банкротства',
    amount: '40000₽',
    route: '/bonus/gift',
    variant: 'primary' as const,
  },
  {
    id: 'suggestion',
    title: 'Есть предложение?',
    subtitle: 'Напишите нам',
    amount: null,
    route: '/docs/contact-specialist',
    variant: 'secondary' as const,
  },
];

export default function BonusPage() {
  const router = useRouter();

  const renderCard = ({ id, title, subtitle, amount, route, variant }: BonusCard) => {
    if (variant === 'disabled') {
      return (
        <div
          key={id}
          className="rounded-[32px] bg-[#E1E5EC] p-5 sm:p-6 text-left text-gray-400 flex flex-col justify-center gap-2"
        >
          <p className="text-lg font-semibold text-[#22B1A3]">{title}</p>
          <p className="text-[10px] font-normal leading-[130%] text-gray-500">{subtitle}</p>
        </div>
      );
    }

    const interactive = Boolean(route) || variant === 'secondary';
    const Component: 'button' | 'div' = interactive ? 'button' : 'div';

    const baseClasses = cn(
      'rounded-[32px] p-5 sm:p-6 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B1A3] flex flex-col gap-4 transition-all duration-200',
      variant === 'primary' && 'bg-white',
      variant === 'accent' && 'bg-[#22B1A3] text-white',
      variant === 'secondary' && 'bg-[#22B1A3] text-white shadow-md cursor-pointer'
    );

    const componentClassName = variant === 'accent' ? cn(baseClasses, 'cursor-default') : baseClasses;

    return (
      <Component
        key={id}
        type={interactive ? 'button' : undefined}
        onClick={
          interactive
            ? () => {
                if (route) {
                  router.push(route);
                } else if (variant === 'secondary') {
                  console.log('Есть предложение? Напишите нам');
                }
              }
            : undefined
        }
        className={componentClassName}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'h-11 w-11 rounded-full flex items-center justify-center transition-colors duration-200',
              variant === 'primary' && 'bg-[#22B1A3] text-white',
              variant === 'accent' && 'bg-white text-[#22B1A3]',
              variant === 'secondary' && 'bg-white text-[#22B1A3]'
            )}
          >
            <ArrowUpRight className={cn('h-5 w-5', variant === 'accent' && 'text-[#22B1A3]')} />
          </div>
          {amount && (
            <span
              className={cn(
                'text-xl font-semibold tracking-tight transition-colors duration-200',
                variant === 'primary' && 'text-[#22B1A3]',
                variant === 'accent' && 'text-white'
              )}
            >
              {amount}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <p
            className={cn(
              'text-lg font-semibold leading-tight transition-colors duration-200',
              variant === 'primary' && 'text-gray-900',
              variant === 'accent' && 'text-white',
              variant === 'secondary' && 'text-white'
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              'text-[10px] leading-[130%] transition-colors duration-200',
              variant === 'primary' && 'text-gray-500',
              variant === 'accent' && 'text-white/90',
              variant === 'secondary' && 'text-white/85'
            )}
          >
            {subtitle}
          </p>
        </div>
      </Component>
    );
  };

  return (
    <div className="min-h-screen bg-[#E9EBEF] pb-28 px-4">
      <div className="max-w-[768px] mx-auto pt-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Бонусы</h1>
        <div className="grid grid-cols-2 gap-4">
          {cards.map(renderCard)}
        </div>
      </div>
    </div>
  );
}
