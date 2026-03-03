'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTelegram } from '@/shared/hooks/use-telegram';

export default function ContactSpecialistPage() {
  const router = useRouter();
  const { user, isReady } = useTelegram();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) {
      setError('Пожалуйста, введите текст');
      return;
    }

    if (!user?.id) {
      setError('Не удалось получить данные пользователя');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact-specialist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: user.id,
          username: user.username || null,
          message_text: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось отправить запрос');
      }

      setMessage('');
      router.push('/docs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить запрос. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[100%] mx-auto flex flex-col justify-between pb-[145px] min-h-[100vh]">
      <div className="flex flex-col gap-4">
        <h1 className="text-[28px] font-semibold text-[#212121] leading-[1.1]">
          Отправить запрос
        </h1>
        <p className="text-[10px] font-normal text-[#8e939d] leading-[1.3]">
          Что-то не нашли? Есть жалоба или классная идея? Напишите сюда — мы все читаем и реагируем
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-white rounded-[16px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)] p-[16px] h-[128px]">
            <textarea
              id='textOD'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите текст"
              className="w-full h-[96px] border-0 outline-none text-[14px] font-normal text-[#212121] placeholder:text-[#8e939d] leading-[1.3] resize-none bg-transparent overflow-auto"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-[#8aa6f4] h-[40px] rounded-[12px] flex items-center justify-center gap-[8px] px-[16px] disabled:opacity-50"
            disabled={isSubmitting}
          >
            <span className="text-[12px] font-semibold text-white leading-[1.3]">
              {isSubmitting ? 'Отправляем…' : 'Отправить'}
            </span>
            {!isSubmitting && <ArrowUpRight className="w-[8px] h-[8px] text-white" />}
          </button>
        </form>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-[8px] text-[12px] font-medium text-[#8e939d] leading-[1.2]"
        >
          <ArrowLeft className="w-[8px] h-[8px] text-[#8e939d]" />
          Вернуться назад
        </button>
      </div>
    </div>
  );
}
