# Получение User ID в Telegram Mini App

## ✅ РЕШЕНИЕ: Menu Button через BotFather

Menu Button - это кнопка в меню бота, которая:
- ✅ Дает полный доступ к WebApp API (включая sendData)
- ✅ Передает user ID через initDataUnsafe
- ✅ Не закрывает приложение
- ✅ Работает как полноценное веб-приложение

### Настройка через BotFather:

1. **Откройте [@BotFather](https://t.me/BotFather)**
2. **Отправьте команду:** `/mybots`
3. **Выберите вашего бота**
4. **Выберите:** "Bot Settings" → "Menu Button"
5. **Выберите:** "Configure Menu Button"
6. **Введите текст кнопки:** например "Открыть приложение" или "Menu"
7. **Введите URL:** `https://your-domain.com`

### После настройки:

Пользователи увидят кнопку с тремя линиями (≡) слева от поля ввода. При нажатии откроется ваше приложение с **полным доступом к WebApp API**.

## 📱 Проверка что всё работает:

```tsx
import { useTelegram, getTelegramUserId } from '@/shared/hooks/use-telegram';

function App() {
  const { user, webApp } = useTelegram();
  
  console.log('User ID:', user?.id); // ✅ Будет доступен
  console.log('WebApp методы:', webApp); // ✅ Все методы доступны
  
  // Можно использовать sendData
  const handleSend = () => {
    webApp?.sendData(JSON.stringify({
      user_id: user?.id,
      action: 'test'
    }));
  };
}
```

## 🔄 Альтернатива: Direct Link (Рекомендуется для тестирования)

Если бот еще не опубликован, создайте Direct Link:

1. В BotFather отправьте: `/newapp`
2. Выберите вашего бота
3. Введите короткое имя (short name): например `myapp`
4. Введите название приложения
5. Загрузите картинку и описание
6. Введите URL приложения

Теперь приложение доступно по ссылке: `https://t.me/your_bot_name/myapp`

## ⚠️ Что НЕ работает:

- ❌ **Keyboard Button** - не передает initData
- ❌ **Обычная ссылка в сообщении** - не передает initData

## ✅ Что работает:

- ✅ **Menu Button** (через /setmenubutton в BotFather)
- ✅ **Direct Link** (через /newapp в BotFather)
- ✅ **Inline Button с web_app** (но вы сказали что не подходит)

## 💻 Код для бота (Python):

```python
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters

# Обработчик данных от WebApp (sendData)
async def web_app_data(update: Update, context):
    data = update.effective_message.web_app_data.data
    user_id = update.effective_user.id
    
    print(f"Получены данные от пользователя {user_id}: {data}")
    await update.message.reply_text(f"Данные получены: {data}")

# Добавляем обработчик
app = Application.builder().token("YOUR_TOKEN").build()
app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, web_app_data))
```

## 🎯 Итог:

**Используйте Menu Button!** Это даст вам:
1. User ID через `window.Telegram.WebApp.initDataUnsafe.user.id`
2. Полный доступ к WebApp API (sendData, close, expand, и т.д.)
3. Приложение не закрывается
4. Работает как полноценное веб-приложение
