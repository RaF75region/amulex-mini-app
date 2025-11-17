'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type SubscriptionType = 'free' | 'premium';

const subscriptionPlans = [
  { duration: '24 часа', price: '50 ₽', rateId: 3969 },
  { duration: '7 дней', price: '99 ₽', rateId: 4019 },
  { duration: '1 месяц', price: '199 ₽', rateId: 4021 },
  { duration: '1 год', price: '999 ₽', rateId: 4024 },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [subscriptionType] = useState<SubscriptionType>('free'); // Change to 'premium' to see premium state
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const isPremium = subscriptionType === 'premium';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRateId = sessionStorage.getItem('selectedRateId');
      if (storedRateId) {
        setSelectedRateId(storedRateId);
      }
    }
  }, []);

  const handlePlanSelect = (rateId: number) => {
    const rateIdString = rateId.toString();
    if (selectedRateId === rateIdString) {
      return;
    }
    // Store selected rateId in sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedRateId', rateIdString);
    }
    setSelectedRateId(rateIdString);
    // Navigate to registration page
    router.push('/registration');
  };

  const handleBonusClick = () => {
    router.push('/bonus');
  };

  return (
    <div className="min-h-screen bg-[#EDEEF2] px-4 pb-8 flex flex-col">
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-4 pt-6 flex-1">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-[36px] font-bold leading-[1.1] text-[#0F0F0F]">Подписка</h1>
          {isPremium ? (
            <span className="rounded-[14px] bg-[#3FBFB3] px-3 py-1.5 text-[14px] font-semibold text-white">
              Премиум
            </span>
          ) : (
            <span className="rounded-[14px] bg-[#E8E9ED] px-3 py-1.5 text-[14px] font-medium text-[#898A8F]">
              Бесплатный тариф
            </span>
          )}
        </div>

        {isPremium && (
          <p className="text-[15px] leading-tight">
            <span className="font-semibold text-[#3FBFB3]">Истекает через:</span>{' '}
            <span className="text-[#898A8F]">12 дней</span>
          </p>
        )}

        {/* Subscription Cards Grid */}
        <section className="grid auto-rows-fr grid-cols-2 gap-3">
          {subscriptionPlans.map((plan) => {
            const planRateIdString = plan.rateId.toString();
            const isDisabled = selectedRateId === planRateIdString;

            return (
              <button
                key={plan.duration}
                onClick={() => handlePlanSelect(plan.rateId)}
                disabled={isDisabled}
                className={`group flex flex-col items-start rounded-[24px] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all ${
                  isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#3FBFB3] transition-transform group-hover:scale-105">
                  <ArrowUpRight className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <p className="mb-1 text-[16px] font-semibold text-[#3FBFB3] leading-tight">
                  {plan.duration}
                </p>
                <p className="text-[22px] font-bold text-[#0F0F0F] leading-tight">
                  {plan.price}
                </p>
                {isDisabled && (
                  <span className="mt-2 text-[11px] font-medium text-[#898A8F]">Недоступно</span>
                )}
              </button>
            );
          })}
        </section>

        {/* Free Subscription Banner */}
        <button
          type="button"
          onClick={handleBonusClick}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3FBFB3] to-[#2ea599] p-5 shadow-[0_8px_32px_rgba(63,191,179,0.3)] text-left"
        >
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white">
                <ArrowUpRight className="h-5 w-5 text-[#3FBFB3]" strokeWidth={2.5} />
              </div>
              <p className="text-[20px] font-bold leading-[1.2] text-white">
                Как получить<br />подписку бесплатно
              </p>
            </div>
            <div className="relative h-[120px] w-[140px] flex-shrink-0">
              <Image
                src="/pig.svg"
                alt="Piggy bank"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </button>
      </div>

      {/* Back Button */}
      <div className="mx-auto flex w-full max-w-[480px] justify-center pb-24 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[15px] text-[#898A8F] transition-colors hover:text-[#3FBFB3]"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться назад
        </button>
      </div>
    </div>
  );
}
