'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, FileText, Send, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StatusDialog } from '@/components/status-dialog';

export default function SendRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ topic: '', description: '', name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/docs/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить запрос');
      }

      setFormData({ topic: '', description: '', name: '', phone: '' });
      setShowSuccessDialog(true);
    } catch {
      setError('Не удалось отправить запрос. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-0 bg-[#E9EBEF] px-4 pb-28">
      <div className="mx-auto flex max-w-[480px] flex-col gap-6 pt-8">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#22B1A3]">Документы</p>
          <h1 className="text-[32px] font-semibold text-[#0F1F2D]">Не нашли ответ? Отправьте запрос</h1>
          <p className="text-[12px] leading-[150%] text-[#6B7280]">
            Юристы «Твой Друг Юрист» помогут в любом вопросе. Расскажите, что нужно — мы подготовим решение или
            подберём шаблон.
          </p>
        </header>

        <section className="rounded-[36px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] space-y-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#E6F5F2]">
              <FileText className="h-5 w-5 text-[#22B1A3]" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-[#0F1F2D]">Опишите задачу</p>
              <p className="text-sm leading-[150%] text-[#6B7280]">
                Получим от Вас вводные и предложим готовое решение или документ.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#E6F5F2]">
              <Send className="h-5 w-5 text-[#22B1A3]" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-[#0F1F2D]">Согласуем всё онлайн</p>
              <p className="text-sm leading-[150%] text-[#6B7280]">
                Согласуем нюансы, при необходимости уточним детали и отправим результат в Telegram.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#22B1A3] text-white">
              <Phone className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">Срок ответа — до 10 минут</p>
              <p className="text-sm leading-[150%] text-white/90">
                У нас оперативная поддержка, поэтому не придётся ждать.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-[36px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-semibold text-[#0F1F2D]">Отправьте запрос</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Тема</label>
              <Input
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Например, договор поставки"
                className="h-12 rounded-[22px] border border-[#E4E7EC] bg-[#F7F8FA] px-4 text-sm text-[#0F1F2D] placeholder:text-[#98A2B3] focus:border-[#22B1A3] focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Краткое описание</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Опишите, что нужно подготовить или проверить"
                className="min-h-[120px] rounded-[24px] border border-[#E4E7EC] bg-[#F7F8FA] px-4 py-3 text-sm text-[#0F1F2D] placeholder:text-[#98A2B3] focus:border-[#22B1A3] focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Имя</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Как вас зовут"
                className="h-12 rounded-[22px] border border-[#E4E7EC] bg-[#F7F8FA] px-4 text-sm text-[#0F1F2D] placeholder:text-[#98A2B3] focus:border-[#22B1A3] focus:ring-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Телефон</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="@username или номер"
                className="h-12 rounded-[22px] border border-[#E4E7EC] bg-[#F7F8FA] px-4 text-sm text-[#0F1F2D] placeholder:text-[#98A2B3] focus:border-[#22B1A3] focus:ring-0"
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <Button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[26px] bg-[#22B1A3] text-base font-semibold text-white hover:bg-[#1b8c80]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправляем…' : 'Отправить запрос'}
              {!isSubmitting && <ArrowUpRight className="h-[8px] w-[8px]" />}
            </Button>
          </form>
        </section>

        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            className="gap-2 px-0 text-[16px] font-medium text-[#8E939D] hover:bg-transparent hover:text-[#8AA6F4] transition-colors"
            onClick={() => router.push('/docs')}
          >
            <ArrowLeft className="h-[16px] w-[16px]" />
            Вернуться назад
          </Button>
        </div>
      </div>

      <StatusDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        type="success"
        title="Ваше сообщение успешно отправлено!"
        description="Мы рассмотрим его, в ближайшее время и свяжемся с вами."
        buttonText="Вернуться назад"
        onButtonClick={() => { setShowSuccessDialog(false); router.push('/docs'); }}
      />
    </div>
  );
}
