'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const unionIcon = '/assets/union-white.svg';
const logoImage = '/assets/amulex-logo.svg';

interface CreatorsCardProps {
  onWebsiteClick?: () => void;
}

export function CreatorsCard({ onWebsiteClick }: CreatorsCardProps) {
  return (
    <div
      className="bg-white flex gap-[12px] items-start justify-center p-[16px] rounded-[16px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)] w-full"
      data-name="Карточка"
      data-node-id="426:9790"
    >
      <div
        className="flex flex-col gap-[12px] items-start justify-center w-[149px]"
        data-name="Текст"
        data-node-id="426:9791"
      >
        <div
          className="flex flex-col font-semibold justify-center text-[#212121] text-[16px] leading-[1.2] w-full"
          data-node-id="426:9792"
        >
          Создатели
        </div>
        <div
          className="flex flex-col font-normal justify-center text-[#8e939d] text-[10px] leading-[1.3] w-full"
          data-node-id="426:9793"
        >
          <p className="mb-0">Национальная</p>
          <p>Юридическая Служба</p>
        </div>
        <div className="h-[19px] w-[103px]" data-name="Лого" data-node-id="426:9794">
          <img alt="amulex.ru" className="block max-w-none w-full h-full" src={logoImage} />
        </div>
      </div>
      <div
        className="flex flex-col gap-[8px] items-start w-[149px]"
        data-name="Область кнопок"
        data-node-id="426:9795"
      >
        <button
          onClick={onWebsiteClick}
          className={cn(
            'bg-[#8aa6f4] flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[12px] w-full',
            'transition-transform active:scale-95'
          )}
          data-name="Кнопка"
          data-node-id="426:9796"
        >
          <div
            className="flex flex-col font-semibold justify-center text-[12px] text-white leading-[1.3] whitespace-nowrap"
            data-node-id="426:9797"
          >
            Перейти на сайт
          </div>
          <div className="w-[8px] h-[8px] flex-shrink-0" data-name="Union" data-node-id="426:9798">
            <img alt="" className="block max-w-none w-full h-full" src={unionIcon} />
          </div>
        </button>
        <Link
          href="https://t.me/AmulexBot"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-[22px] bg-[#E8F5F3] px-3 py-2.5 text-[13px] font-semibold text-[#22B1A3] transition-all hover:bg-[#d9eeeb] w-full"
          data-name="Кнопка"
          data-node-id="426:9799"
        >
          Связаться
        </Link>
      </div>
    </div>
  );
}
