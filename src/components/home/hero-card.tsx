'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const unionIcon = '/assets/union.svg';

interface StatBlockProps {
  value: string;
  label: string;
  valueNodeId: string;
  labelNodeId: string;
}

function StatBlock({ value, label, valueNodeId, labelNodeId }: StatBlockProps) {
  return (
    <div className="flex flex-col flex-1 gap-[2px] items-center" data-name="Строка">
      <div
        className="flex flex-col font-semibold justify-center text-[28px] text-center text-white leading-[1.1] w-full"
        data-node-id={valueNodeId}
      >
        {value}
      </div>
      <div
        className="flex flex-col font-normal justify-center text-[10px] text-center text-white leading-[1.3] w-full"
        data-node-id={labelNodeId}
      >
        {label}
      </div>
    </div>
  );
}

interface HeroCardProps {
  onRegisterClick?: () => void;
}

export function HeroCard({ onRegisterClick }: HeroCardProps) {
  return (
    <div
      className="flex flex-col gap-[16px] items-center p-[16px] rounded-[16px] w-full"
      data-name="Карточка"
      data-node-id="426:9719"
      style={{
        backgroundImage:
          'linear-gradient(138.95754112395707deg, rgba(105, 137, 227, 1) 12.302%, rgba(138, 166, 244, 1) 64.823%)',
      }}
    >
      <div
        className="flex flex-col font-semibold justify-center text-[28px] text-center text-white leading-[1.1] w-full"
        data-node-id="426:9720"
      >
        Твой Друг Юрист
      </div>
      <div
        className="flex flex-col font-normal justify-center text-[10px] text-center text-white leading-[1.3] w-full"
        data-node-id="426:9721"
      >
        Твой Друг Юрист — нейросеть компании Амулекс, обученная на законодательстве, подзаконных
        актах и судебной практики
      </div>
      <div
        className="flex items-start text-center text-white w-full"
        data-node-id="426:9722"
      >
        <StatBlock value="10К+" label="Пользователей" valueNodeId="426:9724" labelNodeId="426:9725" />
        <StatBlock value="№1" label="Сервис в РФ" valueNodeId="426:9727" labelNodeId="426:9728" />
        <StatBlock
          value="96%"
          label="Довольных клиентов"
          valueNodeId="426:9730"
          labelNodeId="426:9731"
        />
      </div>
      {/* <button
        onClick={onRegisterClick}
        className={cn(
          'bg-white flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[12px] w-full',
          'transition-transform active:scale-95'
        )}
        data-name="Кнопка"
        data-node-id="426:9732"
      >
        <div
          className="flex flex-col font-semibold justify-center text-[#8aa6f4] text-[12px] leading-[1.3] whitespace-nowrap"
          data-node-id="426:9733"
        >
          Начать общение
        </div>
        <div className="w-[8px] h-[8px] flex-shrink-0" data-name="Union" data-node-id="426:9734">
          <img alt="" className="block max-w-none w-full h-full" src={unionIcon} />
        </div>
      </button> */}
    </div>
  );
}
