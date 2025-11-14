'use client';

import React from 'react';

interface DocumentCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-3xl p-5 flex items-center gap-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 text-left">
        <h3 className="text-[15px] font-medium text-zinc-900">{title}</h3>
        {subtitle && <p className="text-[13px] text-zinc-400 mt-1">{subtitle}</p>}
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="flex-shrink-0 text-zinc-300"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
