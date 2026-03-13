'use client';

import { useEffect } from 'react';

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const checkMaxWebApp = () => {
      if (window.WebApp) {
        console.log('✅ MAX Bridge SDK загружен успешно');

        const app = window.WebApp;

        // Сообщаем MAX, что мини-приложение готово к работе
        app.ready();

        console.log('📱 MAX initData:', app.initData);
        console.log('📱 MAX initDataUnsafe:', app.initDataUnsafe);
        console.log('📱 MAX platform:', app.platform);
        console.log('📱 MAX version:', app.version);

        if (!app.initData || app.initData.length === 0) {
          console.warn('⚠️ initData пустой!');
          console.warn('🔧 Убедитесь, что приложение открыто через MAX с настроенным мини-приложением.');
        }

        if (app.initDataUnsafe.user) {
          const user = app.initDataUnsafe.user;
          console.log('👤 User Info:', {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            languageCode: user.language_code,
          });

          if (typeof window !== 'undefined') {
            sessionStorage.setItem('max_user_id', user.id.toString());
            console.log('💾 User ID сохранен в sessionStorage');
          }

          console.log('✅ User ID доступен:', user.id);
        } else {
          console.warn('❌ Данные пользователя недоступны');
          console.log('🔍 Полный объект WebApp:', app);
        }
      } else {
        console.log('❌ MAX Bridge SDK не загружен, повторная попытка...');
        setTimeout(checkMaxWebApp, 100);
      }
    };

    checkMaxWebApp();
  }, []);

  return <>{children}</>;
};
