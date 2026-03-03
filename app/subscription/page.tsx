'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type SubscriptionType = 'free' | 'premium';

// Test mode for local development without Telegram
const TEST_MODE = process.env.NODE_ENV === 'development';

const subscriptionPlans = [
  { duration: '24 часа', price: '50 ₽', rateId: 3969 },
  { duration: '7 дней', price: '99 ₽', rateId: 4019 },
  { duration: '1 месяц', price: '199 ₽', rateId: 4021 },
  { duration: '1 год', price: '999 ₽', rateId: 4024 },
];

function SubscriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // In test mode, default to 'free', otherwise get from real data
  const [subscriptionType] = useState<SubscriptionType>(TEST_MODE ? 'free' : 'free');
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPlanDuration, setSelectedPlanDuration] = useState<string>('7 дней');
  const isPremium = subscriptionType === 'premium';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRateId = sessionStorage.getItem('selectedRateId');
      const storedDuration = sessionStorage.getItem('selectedPlanDuration');
      if (storedRateId) {
        setSelectedRateId(storedRateId);
      }
      if (storedDuration) {
        setSelectedPlanDuration(storedDuration);
      }
    }
  }, []);

  useEffect(() => {
    // Check if payment was successful
    const payment = searchParams.get('payment');
    if (payment === 'success' && typeof window !== 'undefined') {
      const paymentSuccess = sessionStorage.getItem('paymentSuccess');
      if (paymentSuccess === 'true') {
        setShowSuccessModal(true);
        // Clear the flag
        sessionStorage.removeItem('paymentSuccess');
        sessionStorage.removeItem('selectedRateId');
        // Remove query param from URL
        router.replace('/subscription', { scroll: false });
      }
    }
  }, [searchParams, router]);

  const handlePlanSelect = (rateId: number) => {
    const rateIdString = rateId.toString();
    if (selectedRateId === rateIdString) {
      return;
    }
    // Find the selected plan to get duration
    const selectedPlan = subscriptionPlans.find(plan => plan.rateId === rateId);

    // Store selected rateId and duration in sessionStorage
    if (typeof window !== 'undefined' && selectedPlan) {
      sessionStorage.setItem('selectedRateId', rateIdString);
      sessionStorage.setItem('selectedPlanDuration', selectedPlan.duration);
    }
    setSelectedRateId(rateIdString);
    if (selectedPlan) {
      setSelectedPlanDuration(selectedPlan.duration);
    }
    // Navigate to registration page
    router.push('/registration');
  };

  const handleBonusClick = () => {
    router.push('/bonus');
  };

  return (
    <div className="min-h-0 bg-[#F3F5F9] flex flex-col relative">
      <div className="mx-auto flex w-full max-w-[480px] flex-col pt-6 pb-8 px-6 flex-1">
        {/* Content Area */}
        <div className="flex flex-col pb-6">
          {/* Content */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-semibold leading-[1.1] text-[#212121]">Подписка</h1>
              {isPremium ? (
                <span className="rounded-[80px] bg-[#8AA6F4] px-2 py-1 text-[10px] font-normal leading-[1.3] text-white">
                  Премиум
                </span>
              ) : (
                <span className="rounded-[80px] bg-[#E9EBEF] px-2 py-1 text-[10px] font-normal leading-[1.3] text-[#8E939D]">
                  Бесплатный тариф
                </span>
              )}
            </div>

            {isPremium && (
              <p className="text-[12px] leading-[1.3]">
                <span className="font-semibold text-[#8AA6F4]">Истекает через:</span>{' '}
                <span className="text-[#8E939D]">12 дней</span>
              </p>
            )}

            {/* Subscription Cards Grid */}
            <div className="flex flex-col gap-3">
              {/* First Row */}
              <div className="flex gap-3">
                {subscriptionPlans.slice(0, 2).map((plan) => {
                  const planRateIdString = plan.rateId.toString();
                  const isDisabled = selectedRateId === planRateIdString;

                  return (
                    <button
                      key={plan.duration}
                      onClick={() => handlePlanSelect(plan.rateId)}
                      disabled={isDisabled}
                      className={`flex-1 flex flex-col items-start rounded-[16px] bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all ${
                        isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="shrink-0 size-8">
                          <Image
                            src="/images/subscription/arrow-icon.svg"
                            alt=""
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <p className="text-[12px] font-semibold leading-[1.3] text-[#8AA6F4]">
                            {plan.duration}
                          </p>
                          <p className="text-[16px] font-semibold leading-[1.2] text-[#212121]">
                            {plan.price}
                          </p>
                        </div>
                      </div>
                      {isDisabled && (
                        <span className="mt-2 text-[10px] font-normal text-[#8E939D]">Недоступно</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Second Row */}
              <div className="flex gap-3">
                {subscriptionPlans.slice(2, 4).map((plan) => {
                  const planRateIdString = plan.rateId.toString();
                  const isDisabled = selectedRateId === planRateIdString;

                  return (
                    <button
                      key={plan.duration}
                      onClick={() => handlePlanSelect(plan.rateId)}
                      disabled={isDisabled}
                      className={`flex-1 flex flex-col items-start rounded-[16px] bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all ${
                        isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="shrink-0 size-8">
                          <Image
                            src="/images/subscription/arrow-icon.svg"
                            alt=""
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <p className="text-[12px] font-semibold leading-[1.3] text-[#8AA6F4]">
                            {plan.duration}
                          </p>
                          <p className="text-[16px] font-semibold leading-[1.2] text-[#212121]">
                            {plan.price}
                          </p>
                        </div>
                      </div>
                      {isDisabled && (
                        <span className="mt-2 text-[10px] font-normal text-[#8E939D]">Недоступно</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Free Subscription Banner */}
              <button
                type="button"
                onClick={handleBonusClick}
                className="relative overflow-hidden rounded-[16px] p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] text-left h-[114px]"
                style={{
                  backgroundImage: 'linear-gradient(156deg, rgb(105, 137, 227) 12.3%, rgb(138, 166, 244) 64.8%)'
                }}
              >
                <div className="relative z-10 flex flex-col gap-3">
                  <div className="shrink-0 size-8">
                    <Image
                      src="/images/subscription/arrow-white-icon.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <p className="text-[16px] font-semibold leading-[1.2] text-white whitespace-pre-wrap">
                    Как получить{'\n'}подписку бесплатно
                  </p>
                </div>
                <div className="absolute right-[29px] top-[6px] w-[112px] h-[124px]">
                  <Image
                    src="/images/subscription/pig-subscription.png"
                    alt="Piggy bank"
                    fill
                    className="object-contain"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <div className="w-[11px] h-[10px] relative shrink-0">
              <Image
                src="/images/subscription/arrow-left-icon.svg"
                alt=""
                width={11}
                height={10}
              />
            </div>
            <button
              onClick={() => router.back()}
              className="text-[16px] font-medium leading-[1.2] text-[#8E939D] transition-colors hover:text-[#8AA6F4]"
            >
              Вернуться назад
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal — закомментировано: при успешной оплате закрывать мини-апп Telegram вместо показа модалки */}
      {/* {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-[16px] p-6 w-full max-w-[400px] relative">
            <div className="flex flex-col gap-6 items-center">
              {/* Text Content */}
              {/* <div className="flex flex-col gap-4 items-center relative w-full"> */}
                {/* Success Icon */}
                {/* <div className="w-10 h-10 relative shrink-0">
                  <Image
                    src="/images/subscription/success-icon.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div> */}
                {/* Title */}
                {/* <div className="flex flex-col items-center w-full">
                  <p className="text-[16px] font-semibold leading-[1.2] text-[#212121] text-center">
                    Ура! Вы получили
                  </p>
                  <p className="text-[16px] font-semibold leading-[1.2] text-center">
                    <span className="text-[#212121]">премиум-доступ на </span>
                    <span className="text-[#8AA6F4]">{selectedPlanDuration}</span>
                  </p>
                </div> */}
                {/* Close Button (X) */}
                {/* <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute right-0 top-0 w-3 h-3 rotate-[-90deg]"
                >
                  <Image
                    src="/images/subscription/close-icon.png"
                    alt="Закрыть"
                    fill
                    className="object-contain"
                  />
                </button>
              </div> */}
              {/* Back Button */}
              {/* <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#F3F5F9] h-10 w-full rounded-[12px] px-4 flex items-center justify-center"
              >
                <p className="text-[12px] font-semibold leading-[1.3] text-[#8AA6F4]">
                  Вернуться назад
                </p>
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-0 bg-[#F3F5F9] flex items-center justify-center">
        <p className="text-[#8E939D]">Загрузка...</p>
      </div>
    }>
      <SubscriptionContent />
    </Suspense>
  );
}
