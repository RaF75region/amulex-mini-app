'use client';

import { useState } from 'react';
import { ArrowUpRight, Link as LinkIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/back-button';
import { Input } from '@/components/ui/input';
import { StatusDialog } from '@/components/status-dialog';
import { useTelegram } from '@/shared/hooks/use-telegram';

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
  const { user } = useTelegram();
  const [linkValue, setLinkValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error'>('success');
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

    if (!user?.id) {
      setError('Не удалось получить данные пользователя');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/premium-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: user.id,
          username: user.username || null,
          name: user.first_name ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}` : null,
          link: trimmedValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось отправить заявку');
      }

      setDialogType('success');
      setDialogOpen(true);
      setLinkValue('');
    } catch (err) {
      setDialogType('error');
      setDialogOpen(true);
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[768px] mx-auto flex flex-col justify-between pb-[130px] min-h-0">
      <div className="flex flex-col gap-[12px]">
        <section className="relative overflow-hidden rounded-[16px] p-[16px] h-[184px]" style={{ backgroundImage: 'linear-gradient(144.31deg, rgba(105, 137, 227, 1) 12.3%, rgba(138, 166, 244, 1) 64.82%)' }}>
          <div className="relative z-10">
            <h1 className="text-[28px] font-semibold leading-[1.1] text-white mb-[12px] whitespace-pre-line">Премиум-доступ{`\n`}на год</h1>
            <p className="text-[10px] font-normal leading-[1.3] text-white max-w-[250px]">
              Мы хотим, чтобы юридическая помощь была доступна каждому. Серверы и команда стоят денег, но есть ценность, которую мы любим — это люди, которым мы помогаем. Добавь Твоего Друга Юриста в чат Telegram и получи бесплатный доступ к консультациям на год!
            </p>
          </div>
          <div className="pointer-events-none absolute right-[-124px] top-1/2 -translate-y-1/2 w-[250px] h-[250px]">
            <img
              src="/images/star-premium.png"
              alt=""
              className="w-full h-full object-contain grayscale transform rotate-[-165deg] scale-y-[-1]"
            />
          </div>
        </section>

        <section className="rounded-[16px] bg-white p-[16px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)]">
          <h2 className="text-[16px] font-semibold text-[#212121] leading-[1.2] mb-[16px]">Условия:</h2>
          <div className="flex flex-col gap-[12px]">
            {conditions.map((condition) => (
              <div
                key={condition.number}
                className="flex items-center gap-[8px]"
              >
                <span
                  className="flex w-[32px] h-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[rgba(138,166,244,0.12)] text-[16px] font-semibold text-[#8aa6f4] leading-[1.2]"
                >
                  {condition.number}
                </span>
                <p className="text-[10px] font-normal leading-[1.3] text-[#8e939d] flex-1">
                  {condition.highlight ? (
                    <>
                      {condition.text}{' '}
                      <button
                        type="button"
                        className="font-semibold text-[#8aa6f4]"
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-[8px]">
          <div className="relative">
            <span className="pointer-events-none absolute left-[16px] top-1/2 -translate-y-1/2 text-[#8e939d]">
              <LinkIcon className="w-[12px] h-[12px]" strokeWidth={2} />
            </span>
            <Input
              id="premium-link"
              name="link"
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
              placeholder="Вставьте ссылку для проверки"
              className="h-[40px] rounded-[12px] border border-[#e9ebef] bg-white pl-[36px] pr-[16px] text-[10px] font-normal text-[#212121] placeholder:text-[#8e939d] leading-[1.3] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)] focus:border-[#8aa6f4] focus:ring-0 focus:ring-offset-0 focus-visible:border-[#8aa6f4] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button
            type="submit"
            className="flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[12px] bg-[#8aa6f4] text-[12px] font-semibold text-white leading-[1.3] hover:bg-[#7a96e4]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправляем…' : 'Отправить'}
            {!isSubmitting && <ArrowUpRight className="w-[8px] h-[8px]" />}
          </Button>
        </form>
      </div>

      <div className="flex justify-center items-center gap-[8px]">
        <BackButton href="/bonus" />
      </div>

      <StatusDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        type={dialogType}
      />
    </div>
  );
}
