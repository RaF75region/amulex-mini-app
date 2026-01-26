'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface InfoCardProps {
  url: string;
  title: string;
  color: string;
  id: number;
  onClick?: () => void;
}

export function InfoCard({
  url,
  title,
  color,
  id,
  onClick,
}: InfoCardProps) {
  const cardClasses = cn(
    'relative flex flex-col gap-[12px] items-start p-[12px] rounded-[16px] overflow-clip w-[72px] h-[72px]',
    'bg-gradient-to-b',
    onClick && 'cursor-pointer transition-transform active:scale-95'
  );

  return (
    <div
      className={cardClasses}
      style={{
        background: `linear-gradient(180deg, ${color}CC 0%, ${color}FF 100%)`,
      }}
      data-name="Карточка"
      data-node-id={`info-card-${id}`}
      onClick={onClick}
    >
      {/* Область текста */}
      <div className="flex flex-col items-start w-full shrink-0">
        <div className="flex flex-col items-center justify-center w-full shrink-0">
          <p className="font-['Inter',sans-serif] font-semibold text-[12px] leading-[130%] tracking-[0] text-[rgba(0,0,0,0.8)] w-full whitespace-pre-wrap">
            {title}
          </p>
        </div>
      </div>

      {/* Изображение с маской */}
      <div className="absolute left-[28px] top-[28px] w-[72px] h-[72px] pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src={url}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
