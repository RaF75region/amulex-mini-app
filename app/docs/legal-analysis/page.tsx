'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BarChart3, ListChecks, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTelegram } from '@/shared/hooks/use-telegram';
import { useMediaQuery, useTheme } from '@mui/material';

const featureItems = [
  {
    title: 'Что говорит закон именно в Вашем случае',
    icon: Scale,
  },
  {
    title: 'Подводные камни и реальные шансы на успех',
    icon: BarChart3,
  },
  {
    title: 'Пошаговая инструкция для дальнейших шагов',
    icon: ListChecks,
  },
];

export default function LegalAnalysisPage() {
  const router = useRouter();
  const { user } = useTelegram();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOrder = async () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp && user?.id) {
      try {
        await fetch('/api/send-message-to-bot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            telegram_id: user.id,
            message: 'legal-consultant',
          }),
        });

        window.Telegram.WebApp.close();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handlePreview = () => {
    const previewUrl = 'https://1d47d82f-rag-test.s3.twcstorage.ru/files/%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D1%8E%D1%80%D0%B8%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%20%D0%BE%D1%82%D1%87%D0%B5%D1%82%D0%B0.pdf';

    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(previewUrl);
    } else {
      window.open(previewUrl, '_blank');
    }
  };

  return (
    <div className="max-w-[768px] mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Юридический анализ
      </h1>

      <div className="space-y-6">

        <Card className="bg-white">
          <CardHeader className="space-y-3">
            <CardTitle className="text-[24px] leading-[130%] text-gray-900">
              Юридический анализ — быстрый план действий для Вашей ситуации
            </CardTitle>
            <CardDescription className="text-[14px] leading-[150%] text-gray-500">
              Расскажите, что случилось — «Твой Друг Юрист» изучит закон, практику и составит для Вас понятный план
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="rounded-[24px] border-0 bg-[#F7F8FA] shadow-none">
          <CardHeader className="pb-1">
            <CardTitle className="text-[16px] font-semibold leading-[1.2] text-[#212121]">Что входит в отчет:</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-[10px] pt-[6px]">
            {featureItems.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="flex flex-col items-start gap-[8px]"
              >
                <div className="h-[48px] w-[48px] rounded-[14px] bg-[#EEF2FD] flex items-center justify-center">
                  <Icon className="h-[20px] w-[20px] text-[#8AA6F4]" />
                </div>
                <p className="text-[10px] font-normal leading-[1.3] text-[#8E939D] text-left">{title}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4 items-stretch">
          <button
            type="button"
            onClick={handleOrder}
            className="group flex-1 rounded-[32px] p-5 text-left shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8AA6F4] flex flex-col"
            style={{ backgroundImage: 'linear-gradient(135.37deg, rgba(105, 137, 227, 1) 12.3%, rgba(138, 166, 244, 1) 64.82%)' }}
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                <ArrowUpRight className="h-5 w-5 text-[#8AA6F4] transition-colors duration-200" />
              </div>
              <span className="text-[20px] font-bold text-white transition-colors duration-200">
                250 ₽
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-[15px] font-semibold text-white transition-colors duration-200">
                Оформить заказ
              </p>
              <p className="text-[12px] text-white/90 transition-colors duration-200">
                Получите готовый PDF — скачайте и действуйте!
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={handlePreview}
            className="flex-1 rounded-[32px] bg-white p-5 text-left shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8AA6F4] flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-[#8AA6F4] flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[15px] font-semibold text-[#8AA6F4]">
                Посмотреть пример отчета
              </p>
            </div>
          </button>
        </div>

        <div className="pt-4 flex justify-center">
          <Button
            variant="ghost"
            className="gap-2 px-0 text-gray-500 hover:bg-transparent"
            onClick={() => router.push('/docs')}
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться назад
          </Button>
        </div>
      </div>
    </div>
  );
}
