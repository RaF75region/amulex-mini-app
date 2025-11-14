'use client';

import { ArrowRight, ArrowUpRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4 pt-6">
        {/* Header */}
        <h1 className="text-[26px] font-bold leading-tight text-[#0F172A]">Профиль</h1>

        {/* Top Section */}
        <div className="flex gap-3">
          {/* Subscription Card */}
          <div className="flex flex-1 flex-col justify-between rounded-[26px] bg-gradient-to-br from-[#22B1A3] to-[#1a8e82] p-4 shadow-[0_12px_32px_rgba(34,177,163,0.25)]">
            <div className="mb-2.5 inline-flex w-fit items-center rounded-[12px] bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white">
              Бесплатный тариф
            </div>
            <h2 className="mb-1.5 text-[18px] font-bold leading-tight text-white">
              Моя подписка
            </h2>
            <p className="mb-3 text-[12px] leading-tight text-white/90">
              5 сообщений в день
            </p>
            <button className="flex w-full items-center justify-center gap-1.5 rounded-[18px] bg-white px-3 py-2 text-[12px] font-semibold text-[#22B1A3] transition-all hover:bg-white/95">
              Улучшить план
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Consultation Card */}
          <div className="flex flex-1 flex-col items-start justify-between rounded-[26px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#D7F5F1]">
              <ArrowUpRight className="h-4 w-4 text-[#22B1A3]" />
            </div>
            <div>
              <h3 className="mb-1 text-[15px] font-bold leading-tight text-[#0F172A]">
                Консультация
              </h3>
              <p className="text-[11px] leading-[1.3] text-[#6B7280]">
                Получить профессиональную консультацию от юриста
              </p>
            </div>
          </div>
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
            <Link
              href="/services"
              className="flex h-[48px] flex-1 items-center justify-center gap-1.5 rounded-[22px] bg-[#22B1A3] text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(34,177,163,0.25)] transition-all hover:bg-[#1e9b8e]"
            >
              Больше услуг
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/support"
              className="flex h-[48px] flex-1 items-center justify-center gap-1.5 rounded-[22px] bg-white text-[13px] font-semibold text-[#22B1A3] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all hover:bg-gray-50"
            >
              <HelpCircle className="h-4 w-4" />
              Поддержка
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
