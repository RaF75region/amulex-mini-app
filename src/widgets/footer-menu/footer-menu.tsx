'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/entities/menu';
import { cn } from '@/lib/utils';

export const FooterMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#E9EBEF] rounded-t-[26px] shadow-lg">
      <div className="flex items-center justify-around px-4 py-5 max-w-[390px] mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.route;

          return (
            <Link
              key={item.id}
              href={item.route}
              className="flex flex-col items-center gap-2 transition-all duration-200 focus:outline-none"
              aria-label={item.label}
            >
              <div
                className={cn(
                  'transition-colors duration-200',
                  isActive ? 'text-[#008D80]' : 'text-[#919191] bg-white rounded-[14px]'
                )}
              >
                <Icon className="w-10 h-10" />
              </div>
              <span
                className={cn(
                  'text-xs font-medium transition-colors duration-200',
                  isActive ? 'text-[#008D80]' : 'text-[#919191]'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
