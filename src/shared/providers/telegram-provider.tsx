'use client';

import { useEffect } from 'react';

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Проверяем загрузку скрипта Telegram
    const checkTelegramWebApp = () => {
      if (window.Telegram?.WebApp) {
        console.log('✅ Telegram Web App SDK загружен успешно');

        const tg = window.Telegram.WebApp;

        // Инициализируем приложение
        tg.ready();
        tg.expand();

        // Выводим initData
        console.log('📱 Telegram initData:', tg.initData);
        console.log('📱 Telegram initDataUnsafe:', tg.initDataUnsafe);
        console.log('📱 Telegram initData length:', tg.initData.length);

        // Вызываем API при запуске приложения
        const callAPI = async () => {
          try {
            console.log('🔄 Отправка запроса к API...');
            const response = await fetch('/api', {
              method: 'GET',
            });
            const data = await response.json();
            console.log('✅ Ответ от API:', data);
          } catch (error) {
            console.error('❌ Ошибка при вызове API:', error);
          }
        };

        callAPI();

        // Отправляем тестовые данные
        try {
          tg.sendData("ddd");
        //   tg.close();
          console.log('✅ sendData("ddd") отправлен в бот');
        } catch (error) {
          console.error('❌ Ошибка при отправке sendData:', error);
        }

        // Проверяем, есть ли данные
        if (!tg.initData || tg.initData.length === 0) {
          console.warn('⚠️ initData пустой!');
          console.warn('');
          console.warn('🔧 РЕШЕНИЕ:');
          console.warn('1. Настройте Menu Button в BotFather:');
          console.warn('   /mybots → выберите бота → Bot Settings → Menu Button');
          console.warn('');
          console.warn('2. Или создайте Direct Link:');
          console.warn('   /newapp в BotFather');
          console.warn('');
          console.warn('❌ Keyboard Button НЕ работает!');
          console.warn('✅ Menu Button даст user ID + все методы WebApp');
        }

        // Выводим более детальную информацию
        if (tg.initDataUnsafe.user) {
          console.log('👤 User Info:', {
            id: tg.initDataUnsafe.user.id,
            firstName: tg.initDataUnsafe.user.first_name,
            lastName: tg.initDataUnsafe.user.last_name,
            username: tg.initDataUnsafe.user.username,
            languageCode: tg.initDataUnsafe.user.language_code,
            isPremium: tg.initDataUnsafe.user.is_premium,
          });

          // Сохраняем ID пользователя для использования в приложении
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('telegram_user_id', tg.initDataUnsafe.user.id.toString());
            console.log('💾 User ID сохранен в sessionStorage');
          }

          console.log('✅ User ID доступен:', tg.initDataUnsafe.user.id);
          console.log('✅ Все методы WebApp доступны (включая sendData)');
        } else {
          console.warn('❌ Данные пользователя недоступны');
          console.log('🔍 Полный объект WebApp:', tg);
        }

      } else {
        console.log('❌ Telegram Web App SDK не загружен');
        // Пробуем проверить еще раз через 100ms
        setTimeout(checkTelegramWebApp, 100);
      }
    };

    // Проверяем сразу и через небольшую задержку
    checkTelegramWebApp();
  }, []);

  return <>{children}</>;
};
