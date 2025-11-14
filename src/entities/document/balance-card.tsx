'use client';

import React from 'react';

interface BalanceCardProps {
  balance: string;
  onClick?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#008D80] rounded-3xl p-6 flex flex-col items-center gap-2 active:scale-[0.98] transition-transform"
    >
      <span className="text-white text-sm font-medium opacity-90">Баланс</span>
      <span className="text-white text-4xl font-bold">{balance}</span>
    </button>
  );
};
