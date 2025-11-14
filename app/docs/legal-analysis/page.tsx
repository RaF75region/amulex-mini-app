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

  return (
    <div className="min-h-screen bg-[#E9EBEF] pb-28 px-4">
      <div className="max-w-[768px] mx-auto pt-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Юридический анализ</h1>

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
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {featureItems.map(({ title, icon: Icon }) => (
              <div key={title} className="rounded-3xl bg-[#F3F9F8] p-4 flex flex-col gap-3">
                <div className="h-12 w-12 rounded-2xl bg-[#DDF5F0] flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[#22B1A3]" />
                </div>
                <p className="text-[13px] leading-[140%] text-gray-700">{title}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-[#22B1A3] text-white border-none shadow-lg">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <span className="text-3xl font-bold">250 ₽</span>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold">Оформить заказ</p>
                <p className="text-sm text-white/80">
                  Получите готовый PDF — скачайте и действуйте!
                </p>
              </div>
              <Button
                variant="secondary"
                className="bg-white text-[#1b6f68] hover:bg-white/90"
              >
                Оформить заказ
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#22B1A3]/10 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-[#22B1A3]" />
                </div>
                <p className="text-lg font-semibold text-[#22B1A3]">
                  Посмотреть пример отчета
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Ознакомьтесь с образцом перед заказом, чтобы понять структуру документа
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4">
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
