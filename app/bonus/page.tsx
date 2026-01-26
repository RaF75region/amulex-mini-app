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
    title: 'Подписка на год',
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
          className="rounded-[16px] bg-[#e9ebef] p-[16px] text-left flex flex-col justify-between h-[135px]"
        >
          <p className="text-[16px] font-semibold text-[#8aa6f4] leading-[1.2] mb-auto">{title}</p>
          <p className="text-[16px] font-semibold text-[#212121] leading-[1.2] opacity-25 whitespace-pre-line">{subtitle}</p>
        </div>
      );
    }

    const interactive = Boolean(route) || variant === 'secondary';
    const Component: 'button' | 'div' = interactive ? 'button' : 'div';

    const baseClasses = cn(
      'rounded-[16px] p-[16px] text-left shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8aa6f4] flex flex-col gap-[12px] transition-all duration-200 h-[135px]',
      variant === 'primary' && 'bg-white justify-between',
      variant === 'accent' && 'bg-[#8aa6f4] text-white',
      variant === 'secondary' && 'text-white shadow-none cursor-pointer'
    );

    const componentClassName = variant === 'accent' ? cn(baseClasses, 'cursor-default') : baseClasses;

    return (
      <Component
        key={id}
        type={interactive ? 'button' : undefined}
        style={variant === 'secondary' ? { backgroundImage: 'linear-gradient(132.47deg, rgba(105, 137, 227, 1) 12.3%, rgba(138, 166, 244, 1) 64.82%)' } : undefined}
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
        <div className="flex items-center gap-[8px]">
          <div
            className={cn(
              'w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors duration-200',
              variant === 'primary' && 'bg-[#8aa6f4] text-white',
              variant === 'accent' && 'bg-white text-[#8aa6f4]',
              variant === 'secondary' && 'bg-white text-[#8aa6f4]'
            )}
          >
            <ArrowUpRight className={cn('h-5 w-5', variant === 'accent' && 'text-[#8aa6f4]')} />
          </div>
          {amount && (
            <span
              className={cn(
                'text-[16px] font-semibold leading-[1.2] transition-colors duration-200',
                variant === 'primary' && 'text-[#8aa6f4]',
                variant === 'accent' && 'text-white'
              )}
            >
              {amount}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <p
            className={cn(
              'text-[16px] font-semibold leading-[1.2] transition-colors duration-200',
              variant === 'primary' && 'text-[#212121]',
              variant === 'accent' && 'text-white',
              variant === 'secondary' && 'text-white'
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              'text-[10px] font-normal leading-[1.3] transition-colors duration-200',
              variant === 'primary' && 'text-[#8e939d]',
              variant === 'accent' && 'text-white',
              variant === 'secondary' && 'text-white'
            )}
          >
            {subtitle}
          </p>
        </div>
      </Component>
    );
  };

  return (
    <div className="max-w-[768px] mx-auto">
      <h1 className="text-[28px] font-semibold text-[#212121] leading-[1.1] mb-[24px]">Бонусы</h1>
      <div className="grid grid-cols-2 gap-[12px]">
        {cards.map(renderCard)}
      </div>
    </div>
  );
}
