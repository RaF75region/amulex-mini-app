'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegistrationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rateId, setRateId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get rateId from sessionStorage
    if (typeof window !== 'undefined') {
      const storedRateId = sessionStorage.getItem('selectedRateId');
      if (storedRateId) {
        setRateId(parseInt(storedRateId, 10));
      } else {
        // If no rateId, redirect back to subscription page
        router.push('/subscription');
      }
    }
  }, [router]);

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

    setPhone(formatted);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Пожалуйста, введите имя');
      return;
    }

    if (!phone.trim() || phone.length < 10) {
      setError('Пожалуйста, введите корректный номер телефона');
      return;
    }

    if (!rateId) {
      setError('Не выбран тариф');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const paymentData = {
        action: 'send_payment_button',
        rateId: rateId,
        name: name.trim(),
        mobile: phone.trim(),
      };

      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        // Send data via Telegram WebApp API
        window.Telegram.WebApp.sendData(JSON.stringify(paymentData));

        // Close the Mini App after sending data
        window.Telegram.WebApp.close();
      } else {
        throw new Error('Telegram WebApp не доступен');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить данные');
      setIsSubmitting(false);
    }
  };

  if (rateId === null) {
    return (
      <div className="min-h-screen bg-[#E9EBEF] flex items-center justify-center">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9EBEF] px-4 pb-8 flex flex-col">
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-6 pt-8 flex-1">
        <div>
          <h1 className="text-[32px] font-bold leading-tight text-[#0F172A] mb-4">
            Введите ФИО и телефон
          </h1>
          <p className="text-[15px] leading-relaxed text-[#6B7280]">
            Введите ваши контактные данные для оформления подписки
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            className="h-14 rounded-[30px] border-0 bg-white px-6 py-5 text-base text-[#0F172A] placeholder:text-[#9CA3AF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus:ring-2 focus:ring-[#22B1A3] focus:ring-offset-0"
          />

          <Input
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            className="h-14 rounded-[30px] border-0 bg-white px-6 py-5 text-base text-[#0F172A] placeholder:text-[#9CA3AF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus:ring-2 focus:ring-[#22B1A3] focus:ring-offset-0"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[30px] bg-[#22B1A3] text-base font-semibold text-white hover:bg-[#1b8c80] shadow-[0_8px_30px_rgba(34,177,163,0.3)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправляем…' : 'Оформить подписку'}
            {!isSubmitting && <ArrowUpRight className="h-5 w-5" />}
          </Button>
        </form>
      </div>

      <div className="mx-auto flex w-full max-w-[480px] justify-center pb-24 pt-8">
        <Button
          variant="ghost"
          className="gap-2 px-0 text-[#6B7280] hover:bg-transparent hover:text-[#22B1A3]"
          onClick={() => router.push('/subscription')}
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться назад
        </Button>
      </div>
    </div>
  );
}
