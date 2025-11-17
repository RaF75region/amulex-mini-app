'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

type InfoCard = {
  title: string;
  subtitle: string;
  href: string;
  target?: '_blank' | '_self';
  rel?: string;
};

const infoCards: InfoCard[] = [
  {
    title: 'Функционал и описание',
    subtitle: 'Что может Твой Друг Юрист',
    href: 'info/capabilities',
  },
  {
    title: 'Персональные данные',
    subtitle: 'По использованию «Твоего Друга Юриста»',
    href: '/Politici_personal_data.pdf',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4 pt-6">
        <h1 className="text-[26px] font-bold leading-tight text-[#0F172A]">Информация</h1>

        <section className="rounded-[26px] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <p className="text-[17px] font-bold text-[#0F172A] mb-1">Создатели</p>
                <p className="text-[13px] text-[#6B7280] leading-[1.4]">
                  Национальная<br />Юридическая Служба
                </p>
              </div>
              <Image src="/logo.svg" alt="amulex.ru" width={100} height={32} className="object-contain" />
            </div>

            <div className="flex flex-col gap-2 w-[160px] flex-shrink-0">
              <Link
                href="https://amulex.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-[22px] bg-[#22B1A3] px-3 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(34,177,163,0.25)] transition-all hover:bg-[#1e9b8e]"
              >
                Перейти на сайт
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
                            <Link
                href="https://t.me/amulex_int"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-[22px] bg-[#E8F5F3] px-3 py-2.5 text-[13px] font-semibold text-[#22B1A3] transition-all hover:bg-[#d9eeeb]"
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
              target={card.target}
              rel={card.rel}
              className="group rounded-[26px] bg-[#22B1A3] p-4 text-white shadow-[0_8px_24px_rgba(34,177,163,0.25)] transition-all hover:shadow-[0_12px_32px_rgba(34,177,163,0.35)]"
            >
              <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#22B1A3] transition-transform group-hover:scale-105">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <p className="text-[15px] font-bold leading-[1.25] mb-1.5">{card.title}</p>
              <p className="text-[11px] leading-[1.3] text-white/90">{card.subtitle}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
