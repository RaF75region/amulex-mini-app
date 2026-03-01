'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Оригинальные SVG иконки из Figma
const MenuIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      width="40"
      height="40"
      rx="20"
      fill={isActive ? '#8AA6F4' : '#F3F5F9'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
    <path
      d="M28.5 24.5C29.3284 24.5 30 25.1716 30 26C30 26.8284 29.3284 27.5 28.5 27.5H11.5C10.6716 27.5 10 26.8284 10 26C10 25.1716 10.6716 24.5 11.5 24.5H28.5ZM28.5 18.5C29.3284 18.5 30 19.1716 30 20C30 20.8284 29.3284 21.5 28.5 21.5H11.5C10.6716 21.5 10 20.8284 10 20C10 19.1716 10.6716 18.5 11.5 18.5H28.5ZM28.5 12.5C29.3284 12.5 30 13.1716 30 14C30 14.8284 29.3284 15.5 28.5 15.5H11.5C10.6716 15.5 10 14.8284 10 14C10 13.1716 10.6716 12.5 11.5 12.5H28.5Z"
      fill={isActive ? 'white' : '#B6BBC5'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
  </svg>
);

const DocsIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      width="40"
      height="40"
      rx="20"
      fill={isActive ? '#8AA6F4' : '#F3F5F9'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
    <path d="M9.76666 28.5L19.7582 11.5L32 28.4981L8 18.7231L27.0628 24.0443L19.7562 16.8698L9.76471 28.4981L9.76666 28.5Z" fill={isActive ? 'white' : '#B6BBC5'} style={{ transition: 'fill 0.3s ease-in-out' }} />
    <path d="M9.76952 28.5L19.761 14.7506V11.5L9.76952 28.4981V28.5Z" fill={isActive ? 'white' : '#B6BBC5'} style={{ transition: 'fill 0.3s ease-in-out' }} />
    <path d="M19.7585 14.7504V16.8696L27.0649 24.0442L19.7585 14.7524V14.7504Z" fill={isActive ? 'white' : '#B6BBC5'} style={{ transition: 'fill 0.3s ease-in-out' }} />
    <path d="M8 18.7231L28.6129 25.7303L32 28.4996" fill={isActive ? 'white' : '#B6BBC5'} style={{ transition: 'fill 0.3s ease-in-out' }} />
  </svg>
);

const HomeIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      width="72"
      height="72"
      rx="36"
      fill={isActive ? '#8AA6F4' : '#F3F5F9'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
    <path
      d="M53.0461 29.4183C53.8835 29.9757 53.4857 31.2715 52.4772 31.2715C51.9134 31.2715 51.4563 31.7248 51.4563 32.284V46.4582C51.4563 48.9666 49.4059 51 46.8766 51H25.1234C22.5941 51 20.5437 48.9666 20.5437 46.4582V32.284C20.5437 31.7248 20.0866 31.2715 19.5228 31.2715C18.5143 31.2715 18.1165 29.9757 18.9539 29.4183L33.4478 19.7707C34.9915 18.7431 37.0085 18.7431 38.5522 19.7707L53.0461 29.4183Z"
      fill={isActive ? 'white' : '#B6BBC5'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
  </svg>
);

const BonusIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      width="40"
      height="40"
      rx="20"
      fill={isActive ? '#8AA6F4' : '#F3F5F9'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
    <path
      d="M11.4011 21.4696C13.935 21.4724 16.4685 21.467 19.002 21.4716C18.9997 24.314 19.0025 27.1566 19.0006 29.999C17.275 29.9999 15.5489 29.9989 13.8227 29.9994C13.4821 29.9952 13.1348 30.0225 12.8035 29.9284C12.3891 29.8209 12.0127 29.5698 11.7631 29.2217C11.519 28.886 11.4003 28.4682 11.4008 28.0553C11.4012 25.86 11.3997 23.6644 11.4011 21.4696ZM28.6011 21.4727C28.5978 23.6587 28.6006 25.8449 28.5997 28.0304C28.6025 28.3836 28.5217 28.7406 28.3468 29.0491C28.1611 29.3815 27.8677 29.6525 27.521 29.8122C27.2345 29.9467 26.916 30.0035 26.6005 29.9994C24.7334 29.9989 22.8659 30.0002 20.9988 29.9983C20.9974 27.1564 21.0012 24.3145 20.9974 21.4727C23.3102 21.4661 25.6229 21.4718 27.9356 21.4699C28.1572 21.4713 28.379 21.4666 28.6011 21.4727ZM22.4108 10.0005C23.2946 10.0052 24.1711 10.3669 24.7941 10.993C25.306 11.5013 25.6457 12.1828 25.7269 12.8996C25.7946 13.522 25.7165 14.1648 25.4617 14.7397C26.4888 14.7369 27.5155 14.7392 28.5426 14.7383C28.7643 14.7374 28.9866 14.7718 29.1961 14.844C29.8406 15.0609 30.3301 15.6469 30.4608 16.3084C30.5112 16.5309 30.498 16.7605 30.4994 16.9872C30.4985 17.2129 30.5007 17.4391 30.4984 17.6653C30.4937 18.0703 30.3716 18.4781 30.1299 18.8058C29.9255 19.0879 29.6365 19.3068 29.3117 19.4335C29.2529 19.4558 29.1933 19.4828 29.1285 19.4781C23.0287 19.4767 16.9284 19.479 10.8286 19.4771C10.5253 19.3956 10.2495 19.2198 10.0301 18.9964C9.6867 18.6445 9.50493 18.1529 9.5007 17.6646C9.49977 17.3299 9.49989 16.9956 9.50036 16.6609C9.50269 16.221 9.64453 15.7772 9.92453 15.4342C10.2787 14.9897 10.8466 14.7418 11.4117 14.739C12.4528 14.739 13.4952 14.7375 14.5368 14.7393C14.2712 14.1356 14.1961 13.4574 14.2852 12.8062C14.3958 12.0344 14.8064 11.3156 15.4018 10.8133C15.9926 10.3074 16.7635 10.0174 17.5418 10.0016C18.4463 9.97362 19.357 10.3239 20.0001 10.9617C20.6319 10.3361 21.5213 9.9861 22.4108 10.0005ZM17.9862 12.038C17.6161 11.9431 17.2078 11.9966 16.8812 12.1959C16.5475 12.3947 16.3031 12.7462 16.2574 13.1335C16.2294 13.416 16.2569 13.7101 16.3814 13.9684C16.5508 14.3324 16.8942 14.6085 17.2862 14.6974C17.4845 14.7495 17.6913 14.7371 17.8942 14.739C18.2633 14.739 18.632 14.7385 19.0006 14.739C19.0016 14.2828 19.0016 13.8263 19.0006 13.3701C19.0002 13.123 18.9395 12.8739 18.814 12.6602C18.6371 12.3521 18.331 12.1232 17.9862 12.038ZM22.7198 12.0319C22.3502 11.9444 21.9418 12.0012 21.6212 12.2078C21.3235 12.3945 21.1087 12.7051 21.034 13.0472C20.9948 13.2139 20.9975 13.3857 20.9985 13.5556V14.7383C21.383 14.7392 21.7683 14.7385 22.1537 14.739C22.2932 14.7381 22.4345 14.7435 22.5735 14.724C22.8413 14.6895 23.0985 14.574 23.3001 14.3943C23.5311 14.1899 23.6844 13.9028 23.7325 13.5989C23.7764 13.3 23.7576 12.9797 23.6088 12.7107C23.4296 12.3695 23.094 12.1199 22.7198 12.0319Z"
      fill={isActive ? 'white' : '#B6BBC5'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
  </svg>
);

const ProfileIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      width="40"
      height="40"
      rx="20"
      fill={isActive ? '#8AA6F4' : '#F3F5F9'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
    <path
      d="M20 20.3744C22.6573 20.3744 24.8185 17.5329 24.8185 14.8558C24.8185 12.1784 22.6573 10 20 10C17.3431 10 15.1815 12.1782 15.1815 14.8556C15.1818 17.5329 17.3433 20.3744 20 20.3744ZM23.6176 20.424C22.6515 21.1675 21.4693 21.5698 20.2536 21.5687H19.7464C18.5307 21.5698 17.3485 21.1675 16.3824 20.424C13.3305 20.9211 11 23.5867 11 26.8018C11 28.568 15.0294 30 20 30C24.9706 30 29 28.568 29 26.8018C29 23.5867 26.6693 20.9211 23.6176 20.424Z"
      fill={isActive ? 'white' : '#B6BBC5'}
      style={{ transition: 'fill 0.3s ease-in-out' }}
    />
  </svg>
);

const menuItems = [
  {
    id: 'menu',
    route: '/marketplace',
    icon: MenuIcon,
    size: 40,
  },
  {
    id: 'docs',
    route: '/docs',
    icon: DocsIcon,
    size: 40,
  },
  {
    id: 'home',
    route: '/home-new',
    icon: HomeIcon,
    size: 72,
  },
  {
    id: 'bonus',
    route: '/bonus',
    icon: BonusIcon,
    size: 40,
  },
  {
    id: 'profile',
    route: '/profile',
    icon: ProfileIcon,
    size: 40,
  },
];

export const FooterMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6">
      <div className="bg-white flex items-center justify-between px-3 rounded-[96px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)] h-16 max-w-[390px] w-full">
        {menuItems.map((item) => {
          const isActive = pathname === item.route || (item.id === 'home' && pathname === '/');
          const IconComponent = item.icon;

          return (
            <Link
              key={item.id}
              href={item.route}
              className="transition-all duration-300 ease-out focus:outline-none hover:scale-105 active:scale-95"
              aria-label={item.id}
            >
              <div
                className="relative flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  width: item.size,
                  height: item.size,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <IconComponent isActive={isActive} />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
