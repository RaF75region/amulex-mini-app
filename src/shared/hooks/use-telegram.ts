'use client';

import { useMemo } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export const useTelegram = () => {
  const telegramContext = useMemo(() => {
    if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
      return {
        user: null as TelegramUser | null,
        initData: '',
        isReady: false,
        webApp: undefined,
      };
    }

    const tg = window.Telegram.WebApp;

    return {
      user: tg.initDataUnsafe.user ?? null,
      initData: tg.initData ?? '',
      isReady: true,
      webApp: tg,
    };
  }, []);

  return telegramContext;
};

// Утилита для получения user ID из разных источников
export const getTelegramUserId = (): number | null => {
  // Пытаемся получить из Telegram WebApp
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id;
  }

  // Пытаемся получить из sessionStorage
  if (typeof window !== 'undefined') {
    const storedId = sessionStorage.getItem('telegram_user_id');
    if (storedId) {
      return parseInt(storedId, 10);
    }
  }

  return null;
};
