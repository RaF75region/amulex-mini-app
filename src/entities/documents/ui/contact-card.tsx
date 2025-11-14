import React from 'react';
import Image from 'next/image';
import { ArrowIcon } from '@/shared/ui/arrow-icon';

interface ContactCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative bg-[#26B5CE] rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow duration-200 text-left w-full overflow-hidden min-h-[200px]"
    >
      <div className="relative z-10 flex flex-col gap-4 max-w-[60%]">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#26B5CE]">
          <ArrowIcon className="w-5 h-5" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      {/* Иллюстрация документа справа */}
      <div className="absolute right-4 bottom-4 w-48 h-48 opacity-90">
        <div className="relative w-full h-full">
          {/* Планшет с документом - используем SVG для простоты */}
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className="w-full h-full"
          >
            {/* Планшет */}
            <rect
              x="40"
              y="20"
              width="120"
              height="160"
              rx="8"
              fill="white"
              opacity="0.9"
            />
            <rect
              x="50"
              y="30"
              width="100"
              height="140"
              rx="4"
              fill="#E5E7EB"
            />
            
            {/* Документ */}
            <rect
              x="60"
              y="40"
              width="80"
              height="100"
              rx="4"
              fill="white"
            />
            {/* Линии текста */}
            <line x1="70" y1="55" x2="130" y2="55" stroke="#D1D5DB" strokeWidth="2" />
            <line x1="70" y1="65" x2="130" y2="65" stroke="#D1D5DB" strokeWidth="2" />
            <line x1="70" y1="75" x2="110" y2="75" stroke="#D1D5DB" strokeWidth="2" />
            
            {/* Ручка */}
            <rect
              x="85"
              y="120"
              width="4"
              height="60"
              rx="2"
              fill="#374151"
              transform="rotate(-25 87 150)"
            />
            <circle cx="82" cy="180" r="3" fill="#374151" />
          </svg>
        </div>
      </div>
    </button>
  );
};
