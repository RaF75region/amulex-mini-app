'use client';

import { ArrowRight, ArrowUpRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTelegram } from '@/shared/hooks/use-telegram';

interface UserProfile {
  telegramId: string;
  username: string;
  isPaid: boolean;
  paymentId: string | null;
  dateStart: string | null;
  dateEnd: string | null;
  createdAt: string;
  purchasesId: string | null;
  purchaseRateId: number | null;
  typeAi: string | null;
  countQueryByFree: number;
}

// Mock data for local testing
const MOCK_PROFILE: UserProfile = {
  telegramId: '123456789',
  username: 'testuser',
  isPaid: false,
  paymentId: null,
  dateStart: null,
  dateEnd: null,
  createdAt: new Date().toISOString(),
  purchasesId: null,
  purchaseRateId: null,
  typeAi: null,
  countQueryByFree: 5,
};

export default function ProfilePage() {
  const { user, initData, isReady, webApp } = useTelegram();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);

  // Enable local testing mode
  const isLocalTesting = typeof window !== 'undefined' && !window.WebApp?.initData;

  const openExternalLink = (url: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    const telegramWebApp = webApp ?? window.WebApp;

    if (telegramWebApp?.openLink) {
      telegramWebApp.openLink(url);
      return;
    }

    window.open(url, '_blank');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSelectedRateId(sessionStorage.getItem('selectedRateId'));
    }
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      // Use mock data for local testing
      if (isLocalTesting) {
        setProfile(MOCK_PROFILE);
        setLoading(false);
        return;
      }

      if (!isReady || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/profile?telegram_id=${user.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }

        setProfile(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [isReady, user?.id, isLocalTesting]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F5F9] pb-32">
        <div className="mx-auto flex max-w-[480px] flex-col items-center justify-center pt-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#8AA6F4] border-t-transparent"></div>
          <p className="mt-4 text-[14px] text-[#8E939D]">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#F3F5F9] pb-32">
        <div className="mx-auto flex max-w-[480px] flex-col items-center justify-center pt-20">
          <div className="rounded-[16px] bg-white p-6 text-center shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <p className="text-[16px] font-semibold text-[#212121]">
              {error || 'Не удалось загрузить профиль'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-[14px] text-[#8AA6F4] hover:underline"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  const messagesLeft = profile.countQueryByFree || 0;
  const isPaidUser = profile.isPaid;
  const tariffName = isPaidUser ? 'Premium тариф' : 'Бесплатный тариф';
  const messagesText = isPaidUser ? 'Безлимитные сообщения' : `${messagesLeft} сообщений в день`;
  const isYearlyPlanSelected = profile.purchaseRateId === 4024;
  const shouldShowUpgradeButton = !isYearlyPlanSelected;

  return (
    <div className="min-h-screen bg-[#F3F5F9]">
      <div className="mx-auto flex max-w-[480px] flex-col gap-[12px]">
        {/* Header */}
        <h1 className="text-[28px] font-semibold leading-[1.1] text-[#212121]">Профиль</h1>

        {/* Top Section */}
        <div className="flex gap-[12px]">
          {/* Subscription Card */}
          <div
            className="flex flex-1 flex-col gap-[12px] h-[149px] rounded-[16px] p-[16px]"
            style={{ background: 'linear-gradient(129.67deg, #6989E3 12.3%, #8AA6F4 64.82%)' }}
          >
            <div className="flex flex-col gap-[4px] w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="inline-flex w-fit items-center rounded-[80px] bg-[rgba(255,255,255,0.12)] px-[8px] py-[4px]">
                  <span className="text-[10px] font-normal leading-[1.3] text-white">
                    {tariffName}
                  </span>
                </div>
                <h2 className="text-[16px] font-semibold leading-[1.2] text-white">
                  Моя подписка
                </h2>
              </div>
              <p className="text-[10px] font-normal leading-[1.3] text-white">
                {messagesText}
              </p>
            </div>
            {shouldShowUpgradeButton && (
              <Link
                href="/subscription"
                className="flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[12px] bg-white px-[16px]"
              >
                <span className="text-[12px] font-semibold leading-[1.3] text-[#8AA6F4] whitespace-nowrap">
                  Улучшить план
                </span>
                <img src="/images/profile/arrow-right.svg" alt="" className="h-[8px] w-[8px]" />
              </Link>
            )}
          </div>

          {/* Consultation Card */}
          <button
            onClick={() => openExternalLink('https://t.me/AmulexBot')}
            className="flex flex-1 flex-col items-start justify-center h-[149px] rounded-[16px] bg-white p-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col items-start justify-between h-full w-full">
              <div className="h-[32px] w-[32px]">
                <img src="/images/profile/consultation-icon.svg" alt="" className="h-full w-full" />
              </div>
              <div className="flex flex-col gap-[8px] w-full text-left">
                <h3 className="text-[16px] font-semibold leading-[1.2] text-[#212121]">
                  Консультация
                </h3>
                <p className="text-[10px] font-normal leading-[1.3] text-[#8E939D]">
                  От профессиональных юристов Амулекс
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Additional Services Section */}
        <div className="flex flex-col gap-[12px] rounded-[16px] bg-white p-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-[8px] w-full">
            <h2 className="text-[16px] font-semibold leading-[1.2] text-[#212121]">
              Дополнительные услуги
            </h2>
            <p className="text-[10px] font-normal leading-[1.3] text-[#8E939D]">
              От юридической компании №1 в России
            </p>
          </div>

          <div className="flex gap-[8px] w-full">
            <button
              onClick={() => openExternalLink('https://amulex.ru/uslugi/russia?utm_source=botfriend')}
              className="flex flex-1 h-[40px] items-center justify-center gap-[8px] rounded-[12px] bg-[#8AA6F4] px-[16px]"
            >
              <span className="text-[12px] font-semibold leading-[1.3] text-white">
                Больше услуг
              </span>
              <img src="/images/profile/arrow-right-white.svg" alt="" className="h-[8px] w-[8px]" />
            </button>
            <button
              onClick={() => openExternalLink('https://t.me/amulex_int')}
              className="flex flex-1 h-[40px] items-center justify-center gap-[8px] rounded-[12px] bg-[#F3F5F9] px-[16px]"
            >
              <img src="/images/profile/help-icon.svg" alt="" className="h-[12px] w-[12px]" />
              <span className="text-[12px] font-semibold leading-[1.3] text-[#8AA6F4]">
                Поддержка
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
