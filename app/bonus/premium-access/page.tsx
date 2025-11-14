'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Link as LinkIcon, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/back-button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const conditions = [
  {
    number: '01',
    text: 'Чат должен быть активным и с 1000+ участниками',
  },
  {
    number: '02',
    text: 'Договорись с админом заранее, чтобы бот не был удален',
  },
  {
    number: '03',
    text: 'Передай админу ссылку',
    highlight: '@amulexfriendbot',
    suffix: 'и попроси сделать его админом',
  },
  {
    number: '04',
    text: 'Пришли нам ссылку на чат для проверки в окно ниже',
  },
];

export default function PremiumAccessPage() {
  const [linkValue, setLinkValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleBotCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText('@amulexfriendbot');
      setCopyFeedback('Скопировано');
    } catch {
      setCopyFeedback('Не удалось скопировать');
    } finally {
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = linkValue.trim();
    if (!trimmedValue) {
      setError('Укажите ссылку на чат, чтобы мы могли проверить его.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/premium-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: trimmedValue }),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить заявку');
      }

      setDialogOpen(true);
      setLinkValue('');
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9EBEF] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4 pt-6">
        <section className="relative overflow-hidden rounded-[36px] bg-[#00AFA0] px-6 py-8 text-white shadow-[0_25px_55px_rgba(3,155,142,0.35)]">
          <div className="space-y-4">
            <div>
              <p className="text-[32px] font-semibold leading-[110%]">Премиум-доступ навсегда</p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Мы хотим, чтобы юридическая помощь была доступна каждому. Добавь Твоего Друга Юриста в чат Telegram и
                получи бесплатный доступ к консультациям навсегда.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-white/10" />
          <Sparkles className="pointer-events-none absolute right-6 bottom-8 h-12 w-12 text-white/70" />
        </section>

        <section className="rounded-[36px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-semibold text-gray-900">Условия:</h2>
          <div className="mt-4 space-y-3">
            {conditions.map((condition) => (
              <div
                key={condition.number}
                className="flex items-start gap-3 rounded-[20px] bg-white"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#22B1A31F] text-base font-semibold text-[#00AFA0] font-mono"
                >
                  {condition.number}
                </span>
                <p className="text-sm leading-relaxed text-gray-700">
                  {condition.highlight ? (
                    <>
                      {condition.text}{' '}
                      <button
                        type="button"
                        className="font-semibold text-[#22B1A3]"
                        onClick={handleBotCopy}
                      >
                        {condition.highlight}
                      </button>{' '}
                      {condition.suffix}
                    </>
                  ) : (
                    condition.text
                  )}
                </p>
              </div>
            ))}
            {copyFeedback && <p className="text-xs text-gray-500">{copyFeedback}</p>}
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[18px] bg-white text-[#9CA3AF]">
              <LinkIcon className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <Input
              id="premium-link"
              name="link"
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
              placeholder="Вставьте ссылку для проверки"
              className="h-14 rounded-[30px] border border-transparent bg-white px-14 text-base font-medium text-[#111827] placeholder:text-[#9CA3AF] shadow-[0_20px_45px_rgba(15,23,42,0.08)] focus:border-[#22B1A3] focus:ring-0 focus:ring-offset-0 focus-visible:border-[#22B1A3] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-[24px] bg-[#00AFA0] text-base font-semibold text-white hover:bg-[#009486]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправляем…' : 'Отправить'}
            {!isSubmitting && <ArrowUpRight className="h-5 w-5" />}
          </Button>
        </form>

        <div className="flex justify-center pt-2">
          <BackButton href="/bonus" />
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-[36px] p-8 text-center">
          <DialogClose className="absolute right-6 top-6 text-gray-400" aria-label="Закрыть">
            <X className="h-5 w-5" />
          </DialogClose>
          <DialogHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00AFA0]/10">
              <CheckCircle2 className="h-8 w-8 text-[#00AFA0]" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-gray-900">Ваше обращение успешно отправлено</DialogTitle>
            <DialogDescription className="text-sm leading-[150%] text-gray-500">
              Рассмотрим его в течении 3-х рабочих дней
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Button
              variant="ghost"
              className="gap-2 px-0 text-[#00AFA0] hover:bg-transparent"
              onClick={() => setDialogOpen(false)}
            >
              Вернуться назад
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
