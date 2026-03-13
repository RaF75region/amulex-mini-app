'use client';

import { useMemo } from 'react';

interface MaxUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export const useTelegram = () => {
  const webAppContext = useMemo(() => {
    if (typeof window === 'undefined' || !window.WebApp) {
      return {
        user: null as MaxUser | null,
        initData: '',
        isReady: false,
        webApp: undefined,
      };
    }

    const app = window.WebApp;

    return {
      user: app.initDataUnsafe.user ?? null,
      initData: app.initData ?? '',
      isReady: true,
      webApp: app,
    };
  }, []);

  return webAppContext;
};

// Утилита для получения user ID из MAX Bridge или sessionStorage
export const getTelegramUserId = (): number | null => {
  if (typeof window !== 'undefined' && window.WebApp?.initDataUnsafe?.user?.id) {
    return window.WebApp.initDataUnsafe.user.id;
  }

  if (typeof window !== 'undefined') {
    const storedId = sessionStorage.getItem('max_user_id');
    if (storedId) {
      return parseInt(storedId, 10);
    }
  }

  return null;
};
