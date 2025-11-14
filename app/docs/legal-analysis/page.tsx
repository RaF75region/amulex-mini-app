'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BarChart3, ListChecks, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
  const handleOrder = () => {
    console.log('Оформить заказ');
  };

  const handlePreview = () => {
    console.log('Посмотреть пример отчета');
  };

  return (
    <div className="min-h-screen bg-[#E9EBEF] pb-28 px-4">
      <div className="max-w-[768px] mx-auto pt-8 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center whitespace-nowrap">
          Юридический анализ
        </h1>

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

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-[20px] text-gray-900">Что входит в отчет:</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {featureItems.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="rounded-[28px] bg-[#F3F9F8] p-4 flex flex-col items-center gap-3 text-center"
              >
                <div className="h-12 w-12 rounded-2xl bg-[#DDF5F0] flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[#22B1A3]" />
                </div>
                <p className="text-[13px] leading-[140%] text-gray-700">{title}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 md:flex-row">
          <button
            type="button"
            onClick={handleOrder}
            className="group flex-1 rounded-[32px] bg-white hover:bg-[#22B1A3] p-5 text-left shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B1A3]"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#22B1A3] flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
                <ArrowUpRight className="h-5 w-5 text-white transition-colors duration-200 group-hover:text-[#22B1A3]" />
              </div>
              <span className="text-3xl font-bold text-[#22B1A3] transition-colors duration-200 group-hover:text-white">
                250 ₽
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xl font-semibold text-[#22B1A3] transition-colors duration-200 group-hover:text-white">
                Оформить заказ
              </p>
              <p className="text-sm text-[#22B1A3] transition-colors duration-200 group-hover:text-white/90">
                Получите готовый PDF — скачайте и действуйте!
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={handlePreview}
            className="group flex-1 rounded-[32px] bg-white hover:bg-[#22B1A3] p-5 text-left shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B1A3]"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#22B1A3] flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
                <ArrowUpRight className="h-5 w-5 text-white transition-colors duration-200 group-hover:text-[#22B1A3]" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#22B1A3] transition-colors duration-200 group-hover:text-white">
                  Посмотреть пример отчета
                </p>
                <p className="text-sm text-[#22B1A3] transition-colors duration-200 group-hover:text-white/90">
                  Ознакомьтесь с образцом перед заказом
                </p>
              </div>
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
