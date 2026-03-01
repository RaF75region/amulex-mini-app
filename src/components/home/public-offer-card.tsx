'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const iconImage = '/assets/arrow-circle-blue.svg';

interface PublicOfferCardProps {
  onClick?: () => void;
}

export function PublicOfferCard({ onClick }: PublicOfferCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-white flex gap-[12px] items-start justify-center overflow-clip p-[16px] rounded-[16px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)] w-full',
        'transition-transform active:scale-95'
      )}
      data-name="Карточка"
      data-node-id="426:9801"
    >
      <div
        className="flex flex-col flex-1 gap-[4px] items-start"
        data-name="Область текста"
        data-node-id="426:9802"
      >
        <div
          className="flex flex-col font-semibold justify-center text-[#212121] text-[16px] leading-[1.2] w-full text-left"
          data-node-id="426:9803"
        >
          Публичная оферта
        </div>
        <div
          className="flex flex-col font-normal justify-center text-[#8e939d] text-[10px] leading-[1.3] w-full text-left"
          data-node-id="426:9804"
        >
          По использованию «Твоего Друга Юриста»
        </div>
      </div>
      <div className="w-[32px] h-[32px] flex-shrink-0" data-name="Кнопка" data-node-id="426:9805">
        <img alt="" className="block max-w-none w-full h-full" src={iconImage} />
      </div>
    </button>
  );
}
