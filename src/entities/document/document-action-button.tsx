'use client';

import React from 'react';

interface DocumentActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const DocumentActionButton: React.FC<DocumentActionButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
}) => {
  const bgColor = variant === 'primary' ? 'bg-[#008D80]' : 'bg-white';
  const textColor = variant === 'primary' ? 'text-white' : 'text-zinc-900';

  return (
    <button
      onClick={onClick}
      className={`flex-1 ${bgColor} rounded-3xl py-4 px-6 active:scale-[0.98] transition-transform`}
    >
      <span className={`text-[15px] font-semibold ${textColor}`}>{label}</span>
    </button>
  );
};
