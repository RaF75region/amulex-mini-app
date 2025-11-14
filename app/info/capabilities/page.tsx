'use client';

import { MessageCircle, Search, FileText, Clipboard, Sparkles, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const capabilities = [
  {
    icon: MessageCircle,
    title: 'Бесплатные консультации',
    subtitle: '(до 5 сообщений в день)',
    bgColor: 'bg-[#D7F5F1]',
    iconColor: 'text-[#22B1A3]',
  },
  {
    icon: Search,
    title: 'Анализ документов',
    subtitle: '(PDF, фото)',
    bgColor: 'bg-[#D7F5F1]',
    iconColor: 'text-[#22B1A3]',
  },
  {
    icon: FileText,
    title: 'Подготовка шаблонов',
    subtitle: 'исков, заявлений, договоров',
    bgColor: 'bg-[#D7F5F1]',
    iconColor: 'text-[#22B1A3]',
  },
  {
    icon: Clipboard,
    title: 'Создание платного',
    subtitle: 'аналитического отчета по вашему вопросу',
    bgColor: 'bg-[#D7F5F1]',
    iconColor: 'text-[#22B1A3]',
  },
  {
    icon: Sparkles,
    title: 'Платная подписка:',
    subtitle: 'безлимитные консультации (день / неделя / месяц / год)',
    bgColor: 'bg-[#D7F5F1]',
    iconColor: 'text-[#22B1A3]',
  },
];

export default function CapabilitiesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4 pt-6">
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="text-[26px] font-bold leading-[1.2] text-[#0F172A]">
            Что может<br />«Твой Друг Юрист»
          </h1>
          <p className="text-[12px] leading-[1.4]">
            <span className="font-semibold text-[#22B1A3]">Твой Друг Юрист</span>
            <span className="text-[#6B7280]"> — нейросеть компании Амулекс, обученная на законодательстве, подзаконных актах и судебной практики РФ</span>
          </p>
        </header>

        {/* Capabilities Section */}
        <section className="space-y-2">
          <h2 className="text-[17px] font-bold text-[#0F172A]">Что умеет:</h2>

          <div className="space-y-2.5">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-[22px] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                >
                  <div className={`flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-[12px] ${capability.bgColor}`}>
                    <Icon className={`h-4 w-4 ${capability.iconColor}`} />
                  </div>
                  <div className="flex flex-col justify-center gap-0.5 min-w-0">
                    <p className="text-[14px] font-semibold leading-[1.3] text-[#0F172A]">{capability.title}</p>
                    <p className="text-[12px] leading-[1.3] text-[#6B7280]">{capability.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <Link
          href="/docs/contact-specialist"
          className="flex items-start gap-3 rounded-[26px] bg-[#22B1A3] p-4 shadow-[0_12px_32px_rgba(34,177,163,0.25)] transition-all hover:shadow-[0_16px_40px_rgba(34,177,163,0.35)]"
        >
          <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-[12px] bg-white">
            <ArrowUpRight className="h-4 w-4 text-[#22B1A3]" />
          </div>
          <div className="flex flex-col gap-0.5 justify-center">
            <p className="text-[16px] font-bold leading-[1.3] text-white">Есть предложение?</p>
            <p className="text-[13px] leading-[1.3] text-white/90">Напишите нам</p>
          </div>
        </Link>

        {/* Back Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => router.push('/info')}
            className="flex items-center gap-2 text-[13px] text-[#6B7280] transition-colors hover:text-[#0F172A]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Вернуться назад
          </button>
        </div>
      </div>
    </div>
  );
}
