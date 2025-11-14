'use client';

import { useState } from 'react';
import { ArrowUpRight, Bolt, Check, Percent, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/back-button';

const bonusCards = [
  {
    icon: Percent,
    title: 'Получите скидку',
    description: 'Заполните форму и мы свяжемся с вами, чтобы активировать скидку в 20 000 ₽ на процедуру банкротства физических лиц',
  },
  {
    icon: Smile,
    title: 'Делитесь выгодой',
    description:
      'Как только вы или ваш друг начнёте процедуру и произведёте оплату, тот, кто порекомендовал наш сервис, также получит бонус в размере 20 000 ₽',
  },
];

export default function GiftBonusPage() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!consent) {
      setError('Необходимо согласие на обработку данных.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/bonus-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить данные');
      }

      setSuccessMessage('Заявка отправлена. Мы скоро свяжемся с вами.');
      setFormData({ name: '', phone: '' });
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9EBEF] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-5 pt-6">
        <header className="flex flex-wrap items-end gap-2">
          <p className="text-[24px] font-semibold text-[#0F1F2D] leading-none">Дарим</p>
          <p className="text-[32px] font-semibold text-[#22B1A3] leading-none">40 000 ₽</p>
        </header>

        <section className="grid auto-rows-fr grid-cols-2 gap-3">
          {bonusCards.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex h-full flex-col rounded-[28px] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[16px] bg-[#E6F5F2]">
                <Icon className="h-4 w-4 text-[#22B1A3]" />
              </div>
              <p className="text-sm font-semibold text-[#0F1F2D]">{title}</p>
              <p className="mt-2 text-[11px] leading-[150%] text-[#52606D]">{description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] bg-[#22B1A3] p-5 text-white shadow-[0_20px_48px_rgba(3,155,142,0.35)]">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[16px] bg-white/15">
            <Bolt className="h-4 w-4" />
          </div>
          <p className="text-base font-semibold">Выгодное сотрудничество</p>
          <p className="mt-2 text-xs leading-[150%] text-white/85">
            Вы оба выигрываете! Экономьте на услугах и радуйте своих друзей возможностью получить выгоду. Присоединяйтесь к нашей реферальной программе и наслаждайтесь преимуществами вместе.
          </p>
        </section>

        <section className="rounded-[32px] bg-white p-5 shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
          <p className="text-lg font-semibold text-[#0F1F2D]">Введите контактные данные, и мы свяжемся с вами</p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
              className="h-12 rounded-[22px] border border-transparent bg-[#F5F7FA] px-4 text-sm text-[#0F1F2D] placeholder:text-[#98A2B3] focus:border-[#22B1A3] focus:ring-0"
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 ___ ___-__-__"
              className="h-12 rounded-[22px] border border-transparent bg-[#F5F7FA] px-4 text-sm text-[#0F1F2D] placeholder:text-[#98A2B3] focus:border-[#22B1A3] focus:ring-0"
            />

            <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-[150%] text-[#52606D]">
              <button
                type="button"
                onClick={() => setConsent((prev) => !prev)}
                className="mt-[2px] flex h-5 w-5 items-center justify-center rounded-md border border-[#D0D5DD] bg-white text-[#22B1A3]"
                aria-pressed={consent}
              >
                {consent && <Check className="h-3 w-3" strokeWidth={3} />}
              </button>
              <span>
                Согласен на обработку{' '}
                <button
                  type="button"
                  className="text-[#22B1A3] underline"
                  onClick={() => window?.open?.('/docs/privacy', '_blank')}
                >
                  персональных данных
                </button>
              </span>
            </label>

            {error && <p className="text-[11px] text-red-500">{error}</p>}
            {successMessage && <p className="text-[11px] text-[#22B1A3]">{successMessage}</p>}

            <Button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#22B1A3] text-sm font-semibold text-white hover:bg-[#1b8c80]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправляем…' : 'Получить бонусное предложение'}
              {!isSubmitting && <ArrowUpRight className="h-4 w-4" />}
            </Button>
          </form>
        </section>

        <div className="flex justify-center pt-1">
          <BackButton href="/bonus" />
        </div>
      </div>
    </div>
  );
}
