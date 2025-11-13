'use client';

import { useEffect, useState } from 'react';

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
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      setInitData(tg.initData);

      if (tg.initDataUnsafe.user) {
        setUser(tg.initDataUnsafe.user);
      }

      setIsReady(true);
    }
  }, []);

  return {
    user,
    initData,
    isReady,
    webApp: typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined,
  };
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
