'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const infoCards = [
  {
    title: 'Функционал и описание',
    subtitle: 'Что может Твой Друг Юрист',
    href: '/docs',
  },
  {
    title: 'Публичная оферта',
    subtitle: 'По использованию «Твоего Друга Юриста»',
    href: '/docs/legal-analysis',
  },
];

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[#EDEEF2] px-4 pb-28">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4 pt-6">
        <h1 className="text-[36px] font-bold leading-[1.1] text-[#0F0F0F] mb-2">Информация</h1>

        <section className="rounded-[32px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-1 flex-col gap-4">
              <div>
                <p className="text-[20px] font-bold text-[#0F0F0F] mb-1">Создатели</p>
                <p className="text-[15px] text-[#898A8F] leading-[1.4]">
                  Национальная<br />Юридическая Служба
                </p>
              </div>
              <Image src="/logo.svg" alt="amulex.ru" width={120} height={40} className="object-contain" />
            </div>

            <div className="flex flex-col gap-2 w-[180px] flex-shrink-0">
              <Link
                href="https://amulex.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-[24px] bg-[#3FBFB3] px-4 py-3 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(63,191,179,0.3)] transition-all hover:bg-[#36a89e]"
              >
                Перейти на сайт
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="mailto:info@amulex.ru"
                className="flex items-center justify-center rounded-[24px] bg-[#E8F5F3] px-4 py-3 text-[15px] font-semibold text-[#3FBFB3] transition-all hover:bg-[#d9eeeb]"
              >
                Связаться
              </Link>
            </div>
          </div>
        </section>

        <section className="grid auto-rows-fr grid-cols-2 gap-3">
          {infoCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-[28px] bg-[#3FBFB3] p-5 text-white shadow-[0_4px_20px_rgba(63,191,179,0.35)] transition-all hover:shadow-[0_6px_24px_rgba(63,191,179,0.45)]"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#3FBFB3] transition-transform group-hover:scale-105">
                <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <p className="text-[18px] font-bold leading-[1.25] mb-2">{card.title}</p>
              <p className="text-[13px] leading-[1.4] text-white/90">{card.subtitle}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
