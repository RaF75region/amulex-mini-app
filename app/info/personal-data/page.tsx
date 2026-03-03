"use client";

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useCallback } from 'react';
import { useTelegram } from '@/shared/hooks/use-telegram';

const PDF_URL = 'https://1d47d82f-rag-test.s3.twcstorage.ru/files/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8_%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%94%D0%B0%D0%BD%D0%BD%D1%8B%D1%85_%22%D0%A2%D0%B2%D0%BE%D0%B9_%D0%94%D1%80%D1%83%D0%B3_%D0%AE%D1%80%D0%B8%D1%81%D1%82%22_2%20%281%29.pdf';

export default function PersonalDataPage() {
  const { webApp } = useTelegram();

  const handleOpenDocument = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const telegramWebApp = webApp ?? window.Telegram?.WebApp;

    if (telegramWebApp?.openLink) {
      telegramWebApp.openLink(PDF_URL);
      return;
    }

    window.open(PDF_URL, '_blank');
  }, [webApp]);

  return (
    <div className="min-h-0 bg-[#EEF2F7] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4 pt-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/info"
            className="inline-flex items-center gap-1 rounded-[18px] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#22B1A3] shadow-[0_4px_12px_rgba(34,177,163,0.15)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Link>
          <h1 className="flex-1 text-right text-[22px] font-bold text-[#0F172A]">
            Персональные данные
          </h1>
        </div>

        <div className="rounded-[26px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-[#6B7280]">
              Документ отображается внутри приложения; для комфортного чтения воспользуйтесь полноэкранным режимом.
            </p>
            <button
              type="button"
              onClick={handleOpenDocument}
              className="inline-flex items-center justify-center gap-1 rounded-[18px] bg-[#22B1A3] px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_6px_18px_rgba(34,177,163,0.3)] transition hover:bg-[#1f9f90]"
            >
              Открыть во весь экран
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>

          <iframe
            src={PDF_URL}
            title="Политика обработки персональных данных"
            className="w-full rounded-[18px] border border-[#E5E7EB]"
            style={{ minHeight: 'calc(100vh - 220px)' }}
          />
          <p className="mt-4 text-center text-[12px] text-[#6B7280]">
            Если документ не отображается, вы можете
            <Link
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22B1A3] hover:underline"
            >
              {' '}скачать PDF
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
