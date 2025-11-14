'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ContactSpecialistPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) {
      setError('Пожалуйста, введите текст');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact-specialist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить запрос');
      }

      setMessage('');
      router.push('/docs');
    } catch {
      setError('Не удалось отправить запрос. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pb-8 flex flex-col">
      <div className="mx-auto flex max-w-[480px] flex-col gap-6 pt-8 flex-1">
        <div>
          <h1 className="text-[40px] font-bold leading-tight text-[#0F172A] mb-4">
            Отправить запрос
          </h1>
          <p className="text-base leading-relaxed text-[#6B7280]">
            Что-то не нашли? Есть жалоба или классная идея? Напишите сюда — мы все читаем и реагируем
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите текст"
            rows={10}
            className="rounded-[32px] border-0 bg-white px-6 py-5 text-base text-[#0F172A] placeholder:text-[#9CA3AF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus:ring-2 focus:ring-[#22B1A3] focus:ring-offset-0 resize-none"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[30px] bg-[#22B1A3] text-base font-semibold text-white hover:bg-[#1b8c80] shadow-[0_8px_30px_rgba(34,177,163,0.3)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправляем…' : 'Отправить'}
            {!isSubmitting && <ArrowUpRight className="h-5 w-5" />}
          </Button>
        </form>
      </div>

      <div className="mx-auto flex w-full max-w-[480px] justify-center pb-24 pt-8">
        <Button
          variant="ghost"
          className="gap-2 px-0 text-[#6B7280] hover:bg-transparent hover:text-[#22B1A3]"
          onClick={() => router.push('/docs')}
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться назад
        </Button>
      </div>
    </div>
  );
}
