'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: string;
  title?: string;
  description: string;
  variant?: 'default' | 'primary' | 'gradient';
  nodeId: string;
  iconNodeId: string;
  overlayImage?: string;
  overlayNodeId?: string;
  onClick?: () => void;
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = 'default',
  nodeId,
  iconNodeId,
  overlayImage,
  overlayNodeId,
  onClick,
}: FeatureCardProps) {
  const isGradient = variant === 'gradient';
  const isPrimary = variant === 'primary';

  const cardClasses = cn(
    'relative flex flex-col gap-[8px] items-start justify-center p-[16px] rounded-[16px] flex-1 self-stretch',
    isGradient &&
      'bg-gradient-to-br from-[#6989e3] via-[#8aa6f4] to-[#8aa6f4]',
    isPrimary &&
      'bg-gradient-to-br from-[#6989e3] via-[#8aa6f4] to-[#8aa6f4]',
    !isGradient && !isPrimary && 'bg-white shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)]',
    onClick && 'cursor-pointer transition-transform active:scale-95'
  );

  const textColor = isGradient || isPrimary ? 'text-white' : 'text-[#8e939d]';
  const titleColor = isGradient || isPrimary ? 'text-white' : 'text-[#212121]';

  return (
    <div className={cardClasses} data-name="Карточка" data-node-id={nodeId} onClick={onClick}>
      {overlayImage && overlayNodeId && (
        <div
          className="absolute right-0 top-[-17px] w-[140px] h-[121px] pointer-events-none overflow-hidden"
          data-name="Молоток"
          data-node-id={overlayNodeId}
        >
          <img
            alt=""
            className="absolute h-[127.87%] left-[-5.2%] max-w-none top-[-12.49%] w-[111.01%] grayscale"
            src={overlayImage}
          />
        </div>
      )}
      <div className="relative w-[32px] h-[32px] flex-shrink-0" data-name="Иконка" data-node-id={iconNodeId}>
        <img alt="" className="block max-w-none w-full h-full" src={icon} />
      </div>
      <div className="flex flex-col items-start w-full gap-[4px]" data-name="Текст">
        {title && (
          <div className={cn('flex flex-col font-semibold justify-center text-[16px] leading-[1.2] w-full', titleColor)}>
            {title}
          </div>
        )}
        <div className={cn('flex flex-col font-normal justify-center text-[10px] leading-[1.3] w-full', textColor)}>
          {description.split('\n').map((line, index) => (
            <p key={index} className={index === 0 ? 'mb-0' : ''}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
