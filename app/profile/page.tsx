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

export default function ProfilePage() {
  const { user, initData, isReady, webApp } = useTelegram();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);

  const openExternalLink = (url: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    const telegramWebApp = webApp ?? window.Telegram?.WebApp;

    if (url.startsWith('https://t.me') && telegramWebApp?.openTelegramLink) {
      telegramWebApp.openTelegramLink(url);
      return;
    }

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
  }, [isReady, user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF2F7] px-4 pb-32">
        <div className="mx-auto flex max-w-[480px] flex-col items-center justify-center pt-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#22B1A3] border-t-transparent"></div>
          <p className="mt-4 text-[14px] text-[#6B7280]">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#EEF2F7] px-4 pb-32">
        <div className="mx-auto flex max-w-[480px] flex-col items-center justify-center pt-20">
          <div className="rounded-[26px] bg-white p-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <p className="text-[16px] font-semibold text-[#0F172A]">
              {error || 'Не удалось загрузить профиль'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-[14px] text-[#22B1A3] hover:underline"
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
  const isYearlyPlanSelected = profile.purchaseRateId === 4024;
  const shouldShowUpgradeButton = !isYearlyPlanSelected;

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-4">
      {/* Header */}
      <h1 className="text-[26px] font-bold leading-tight text-[#0F172A]">Профиль</h1>

        {/* Top Section */}
        <div className="flex gap-3">
          {/* Subscription Card */}
          <div className="flex flex-1 flex-col justify-between rounded-[26px] bg-gradient-to-br from-[#22B1A3] to-[#1a8e82] p-4 shadow-[0_12px_32px_rgba(34,177,163,0.25)]">
            <div className="mb-2.5 inline-flex w-fit items-center rounded-[12px] bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white">
              {tariffName}
            </div>
            <h2 className="mb-1.5 text-[18px] font-bold leading-tight text-white">
              Моя подписка
            </h2>
            <p className="mb-3 text-[12px] leading-tight text-white/90">
              {isPaidUser ? 'Безлимитные сообщения' : `${messagesLeft} сообщений осталось`}
            </p>
            {shouldShowUpgradeButton && (
              <Link
                href="/subscription"
                className="flex w-full items-center justify-center gap-1.5 rounded-[18px] bg-white px-3 py-2 text-[12px] font-semibold text-[#22B1A3] transition-all hover:bg-white/95"
              >
                Улучшить план
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Consultation Card */}
          <button
            onClick={() => openExternalLink('https://t.me/AmulexBot')}
            className="flex flex-1 flex-col items-start justify-between rounded-[26px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
          >
            <div className="mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#D7F5F1]">
              <ArrowUpRight className="h-4 w-4 text-[#22B1A3]" />
            </div>
            <div className="text-left">
              <h3 className="mb-1 text-[15px] font-bold leading-tight text-[#0F172A]">
                Консультация
              </h3>
              <p className="text-[11px] leading-[1.3] text-[#6B7280]">
                Получить профессиональную консультацию от юриста
              </p>
            </div>
          </button>
        </div>

        {/* Additional Services Section */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#0F172A]">
              Дополнительные услуги
            </h2>
          </div>
          <p className="text-[12px] leading-[1.4] text-[#6B7280]">
            Получить профессиональную консультацию от юриста
          </p>

          <div className="flex gap-2.5">
            <button
              onClick={() => openExternalLink('https://amulex.ru/uslugi/russia?botfriend')}
              className="flex h-[48px] flex-1 items-center justify-center gap-1.5 rounded-[22px] bg-[#22B1A3] text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(34,177,163,0.25)] transition-all hover:bg-[#1e9b8e]"
            >
              Больше услуг
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => openExternalLink('https://t.me/amulex_int')}
              className="flex h-[48px] flex-1 items-center justify-center gap-1.5 rounded-[22px] bg-white text-[13px] font-semibold text-[#22B1A3] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all hover:bg-gray-50"
            >
              <HelpCircle className="h-4 w-4" />
              Поддержка
            </button>
          </div>
        </section>
      </div>
  );
}
