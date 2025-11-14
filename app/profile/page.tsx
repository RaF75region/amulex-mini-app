'use client';

import { useTelegram } from '@/shared/hooks/use-telegram';

export default function ProfilePage() {
  const { user, initData, isReady } = useTelegram();

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 pb-24">
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008D80]"></div>
          <p className="text-zinc-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 pb-24">
      <main className="flex flex-col items-center gap-6 p-8 max-w-md">
        <h1 className="text-4xl font-bold text-[#008D80]">Профиль</h1>

        {user ? (
          <div className="w-full bg-white rounded-lg p-6 shadow-md space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-zinc-500">User ID</p>
              <p className="text-lg font-semibold">{user.id}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-zinc-500">Имя</p>
              <p className="text-lg font-semibold">
                {user.first_name} {user.last_name || ''}
              </p>
            </div>

            {user.username && (
              <div className="space-y-2">
                <p className="text-sm text-zinc-500">Username</p>
                <p className="text-lg font-semibold">@{user.username}</p>
              </div>
            )}

            {user.language_code && (
              <div className="space-y-2">
                <p className="text-sm text-zinc-500">Язык</p>
                <p className="text-lg font-semibold">{user.language_code}</p>
              </div>
            )}

            {user.is_premium && (
              <div className="bg-[#008D80] text-white px-4 py-2 rounded-md text-center">
                ⭐ Premium пользователь
              </div>
            )}

            {initData && (
              <div className="space-y-2 border-t pt-4">
                <p className="text-sm text-zinc-500">Init Data (для API)</p>
                <p className="text-xs font-mono bg-zinc-100 p-2 rounded break-all">
                  {initData.substring(0, 50)}...
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-6 space-y-4">
            <p className="text-yellow-800 font-semibold">⚠️ Данные пользователя недоступны</p>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>Возможные причины:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Приложение запущено через keyboard button</li>
                <li>Не настроена интеграция с ботом</li>
              </ul>
              <p className="mt-4 font-semibold">Решение:</p>
              <p>Используйте inline кнопку в боте:</p>
              <code className="block bg-yellow-100 p-2 rounded mt-2 text-xs">
                InlineKeyboardButton(text=&quot;Открыть&quot;, web_app=WebAppInfo(url=&quot;...&quot;))
              </code>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
