'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const infoCards = [
  {
    title: 'Функционал и описание',
    subtitle: 'Что может «Твой Друг Юрист»',
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
    <div className="min-h-screen bg-[#EEF2F7] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-5 pt-8">
        <h1 className="text-[32px] font-semibold leading-tight text-[#0F172A]">Информация</h1>

        <section className="rounded-[32px] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 min-w-0 flex-col gap-3">
              <div>
                <p className="text-base font-semibold text-[#0F172A]">Создатели</p>
                <p className="text-sm text-[#5B6472]">Национальная Юридическая Служба</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-[18px] bg-[#F4F7FB] px-3 py-2 text-sm font-semibold text-[#22B1A3]">
                <Image src="/globe.svg" alt="Amulex" width={24} height={24} />
                amulex.ru
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-2 sm:w-[200px]">
              <Link
                href="https://amulex.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-[24px] bg-[#22B1A3] px-4 py-3 text-sm font-semibold text-white"
              >
                Перейти на сайт
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="mailto:info@amulex.ru"
                className="flex w-full items-center justify-center rounded-[24px] bg-[#E8F4F2] px-4 py-3 text-sm font-semibold text-[#22B1A3]"
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
              className="rounded-[30px] bg-[#18B3A4] p-5 text-white shadow-[0_18px_35px_rgba(24,179,164,0.35)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#18B3A4]">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <p className="text-base font-semibold leading-[130%]">{card.title}</p>
              <p className="mt-2 text-xs text-white/90">{card.subtitle}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
