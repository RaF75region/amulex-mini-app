'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/back-button';
import { StatusDialog } from '@/components/status-dialog';
import { useTelegram } from '@/shared/hooks/use-telegram';

const bonusCards = [
  {
    icon: '/images/bonus/icon-discount.svg',
    title: 'Получите скидку',
    description: 'Заполните форму и мы свяжемся с Вами, чтобы активировать скидку в 20 000 ₽ на процедуру банкротства физических лиц',
  },
  {
    icon: '/images/bonus/icon-share.svg',
    title: 'Делитесь выгодой',
    description:
      'Как только Вы или Ваш друг начнете процедуру и произведете оплату, тот, кто порекомендовал наш сервис, также получит бонус в размере 20 000 ₽',
  },
];

export default function GiftBonusPage() {
  const { user } = useTelegram();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Always start with +7
    let formatted = '+7';

    // Format: +7 (XXX) XXX-XX-XX
    if (digits.length > 1) {
      // Skip the leading 7 or 8 if present
      const phoneDigits = digits.startsWith('7') || digits.startsWith('8')
        ? digits.slice(1)
        : digits;

      if (phoneDigits.length > 0) {
        formatted += ' (' + phoneDigits.slice(0, 3);
      }
      if (phoneDigits.length > 3) {
        formatted += ') ' + phoneDigits.slice(3, 6);
      }
      if (phoneDigits.length > 6) {
        formatted += '-' + phoneDigits.slice(6, 8);
      }
      if (phoneDigits.length > 8) {
        formatted += '-' + phoneDigits.slice(8, 10);
      }
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!consent) {
      setError('Необходимо согласие на обработку данных.');
      return;
    }

    if (!user?.id) {
      setError('Не удалось получить данные пользователя');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/bonus-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: user.id,
          full_name: formData.name,
          phone: formData.phone,
          agreement_accepted: consent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось отправить данные');
      }

      setShowSuccessDialog(true);
      setFormData({ name: '', phone: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F3F5F9] px-4 pt-4 pb-4">
      <div className="mx-auto flex max-w-[480px] flex-col gap-3">
        <header className="flex flex-wrap items-baseline gap-1">
          <p className="text-[28px] font-semibold text-[#212121] leading-[1.1]">Дарим</p>
          <p className="text-[28px] font-semibold text-[#8AA6F4] leading-[1.1]">40 000 ₽</p>
        </header>

        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {bonusCards.map(({ icon, title, description }) => (
              <div key={title} className="flex h-full flex-col rounded-[16px] bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                <div className="mb-2 h-8 w-8">
                  <img src={icon} alt="" className="w-full h-full" />
                </div>
                <p className="text-[12px] font-medium text-[#212121] leading-[1.2]">{title}</p>
                <p className="mt-1 text-[10px] leading-[1.3] text-[#8E939D]">{description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[16px] p-4 text-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]" style={{ background: 'linear-gradient(150.99deg, #6989E3 12.3%, #8AA6F4 64.82%)' }}>
            <div className="mb-2 h-8 w-8">
              <img src="/images/bonus/icon-cooperation.svg" alt="" className="w-full h-full" />
            </div>
            <p className="text-[12px] font-medium leading-[1.2]">Выгодное сотрудничество</p>
            <p className="mt-1 text-[10px] leading-[1.3]">
              Вы оба выигрываете! Экономьте на услугах и радуйте своих друзей возможностью получить выгоду. Присоединяйтесь к нашей реферальной программе и наслаждайтесь преимуществами вместе
            </p>
          </div>
        </section>

        <section className="rounded-[16px] bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <p className="text-[16px] font-semibold text-[#212121] leading-[1.2]">Введите свои контактные данные, и мы свяжемся с Вами</p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
              className="h-10 rounded-[12px] border border-[#E9EBEF] bg-white px-4 text-[10px] text-[#212121] placeholder:text-[#8E939D] focus:border-[#8AA6F4] focus:ring-0"
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+7 ___ ___-__-__"
              className="h-10 rounded-[12px] border border-[#E9EBEF] bg-white px-4 text-[10px] text-[#212121] placeholder:text-[#8E939D] focus:border-[#8AA6F4] focus:ring-0"
            />

            <label className="flex cursor-pointer items-center gap-2 text-[10px] leading-[1.3] text-[#8E939D]">
              <button
                type="button"
                onClick={() => setConsent((prev) => !prev)}
                className="flex h-4 w-4 items-center justify-center rounded-sm border border-[#E9EBEF] bg-white flex-shrink-0"
                aria-pressed={consent}
              >
                {consent && <img src="/images/bonus/checkbox-checked.svg" alt="" className="w-full h-full" />}
              </button>
              <span>
                Согласен на обработку{' '}
                <button
                  type="button"
                  className="text-[#8AA6F4]"
                  onClick={() => window?.open?.('/docs/privacy', '_blank')}
                >
                  персональных данных
                </button>
              </span>
            </label>

            {error && <p className="text-[10px] text-red-500">{error}</p>}

            <Button
              type="submit"
              className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-[12px] bg-[#8AA6F4] text-[12px] font-semibold text-white hover:bg-[#7899F0] leading-[1.3]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправляем…' : 'Получить бонусное предложение'}
            </Button>
          </form>
        </section>

        <div className="flex justify-center">
          <BackButton href="/bonus" />
        </div>
      </div>

      <StatusDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        type="success"
        title="Ура! Вы получили премиум-доступ"
        description=""
      />
    </div>
  );
}
