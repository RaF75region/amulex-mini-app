# Telegram Mini App - Получение данных пользователя

## ⚠️ Проблема: initData пустой

### Причины:

1. **Keyboard button не передает данные** - обычные кнопки клавиатуры не передают `initData`
2. **Нет правильной интеграции с ботом**

## ✅ Решения

### 1. Используйте Inline кнопку с web_app (РЕКОМЕНДУЕТСЯ)

В вашем Telegram боте (Python):

```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

# Создаем inline кнопку с Web App
keyboard = [
    [InlineKeyboardButton(
        text="🚀 Открыть приложение",
        web_app=WebAppInfo(url="https://your-domain.com")
    )]
]
reply_markup = InlineKeyboardMarkup(keyboard)

await update.message.reply_text(
    "Нажмите кнопку чтобы открыть приложение:",
    reply_markup=reply_markup
)
```

### 2. Настройте Menu Button через BotFather

1. Откройте [@BotFather](https://t.me/BotFather)
2. Введите `/setmenubutton`
3. Выберите вашего бота
4. Введите название кнопки (например: "Открыть приложение")
5. Введите URL вашего Mini App

### 3. Используйте Direct Link

Создайте прямую ссылку:
```
https://t.me/your_bot_name/your_app_name
```

## 🔧 Использование в коде

### Хук useTelegram:

```tsx
import { useTelegram, getTelegramUserId } from '@/shared/hooks/use-telegram';

function MyComponent() {
  const { user, initData, isReady } = useTelegram();
  
  if (!isReady) {
    return <div>Загрузка...</div>;
  }
  
  if (!user) {
    return <div>Откройте приложение через Telegram бота</div>;
  }
  
  return (
    <div>
      <p>User ID: {user.id}</p>
      <p>Имя: {user.first_name}</p>
    </div>
  );
}
```

### Получение User ID:

```tsx
import { getTelegramUserId } from '@/shared/hooks/use-telegram';

// В любом месте приложения
const userId = getTelegramUserId();

if (userId) {
  // Отправляем запрос на сервер
  fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({ telegram_id: userId })
  });
}
```

## 🐛 Отладка

Откройте консоль браузера при запуске приложения:

- ✅ `initData` не пустой - всё работает правильно
- ❌ `initData` пустой - используйте inline кнопку или menu button

## 📝 Важные моменты

1. **Keyboard buttons НЕ РАБОТАЮТ** для передачи данных
2. **Только inline buttons с web_app** или **menu button** передают initData
3. `initData` содержит подписанные данные для проверки на сервере
4. User ID доступен через `window.Telegram.WebApp.initDataUnsafe.user.id`
