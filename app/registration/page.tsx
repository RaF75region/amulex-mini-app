'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTelegram } from '@/shared/hooks/use-telegram';
import Image from 'next/image';

// Test mode for local development
const TEST_MODE = process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && !window.WebApp?.initData;

export default function RegistrationPage() {
  const router = useRouter();
  const { user } = useTelegram();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rateId, setRateId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToPersonalData, setAgreedToPersonalData] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get rateId from sessionStorage
    if (typeof window !== 'undefined') {
      const storedRateId = sessionStorage.getItem('selectedRateId');
      if (storedRateId) {
        setRateId(parseInt(storedRateId, 10));
      } else if (!TEST_MODE) {
        // If no rateId and not in test mode, redirect back to subscription page
        router.push('/subscription');
      } else {
        // Test mode: use dummy rateId
        setRateId(1);
      }
    }
  }, [router]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

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

    if (!agreedToPersonalData) {
      setError('Необходимо согласие на обработку персональных данных');
      return;
    }

    if (!rateId) {
      setError('Не выбран тариф');
      return;
    }

    // In test mode, use dummy user ID
    const userId = TEST_MODE ? '123456789' : user?.id;

    if (!userId) {
      setError('Не удалось получить данные пользователя');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const paymentData = {
        rateId: String(rateId),
        name: name.trim(),
        mobile: phone.trim(),
        tgId: String(userId),
      };

      const response = await fetch('https://n8n.amulex.ru/webhook/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить данные');
      }

      // Mark payment as successful
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('paymentSuccess', 'true');
      }

      // Redirect to subscription page
      router.push('/subscription?payment=success');

      // Close WebApp if not in test mode
      if (typeof window !== 'undefined' && window.WebApp && !TEST_MODE) {
        setTimeout(() => {
          window.WebApp?.close();
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось отправить данные');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (rateId === null && !TEST_MODE) {
    return (
      <div className="min-h-0 bg-[#F3F5F9] flex items-center justify-center">
        <p className="text-[#8E939D]">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-0 bg-[#F3F5F9] flex flex-col">
      <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8">
        <div className="flex flex-col gap-6 w-full">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] font-semibold leading-[1.1] text-[#212121]">
              Введите ФИО и телефон
            </h1>
            <div className="flex items-center gap-2 relative" ref={tooltipRef}>
              <p className="text-[12px] font-medium leading-[1.2] text-[#212121]">
                Ваше ФИО
              </p>
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                className="relative w-3 h-3 flex-shrink-0"
              >
                <Image
                  src="/images/registration/icon-info.png"
                  alt="Информация"
                  fill
                  className="object-contain"
                />
              </button>

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute top-full left-[-12px] mt-2 z-10 w-[calc(100vw-48px)] max-w-[400px]">
                  <div className="bg-white rounded-br-[16px] rounded-bl-[16px] rounded-tr-[16px] p-4 shadow-[0px_1px_16px_rgba(0,0,0,0.12)]">
                    <p className="text-[10px] leading-[1.3] text-[#8AA6F4] whitespace-pre-wrap">
                      Запрашиваем ваше ФИО, чтобы прозрачно отобразить платежи перед налоговой
                      в случае проверок. Мы соблюдаем 152-ФЗ
                      и надежно защищаем ваши данные
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card with form */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0px_2px_16px_rgba(0,0,0,0.06)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Inputs */}
              <div className="flex flex-col gap-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ФИО"
                  className="h-10 rounded-[12px] border border-[#E9EBEF] bg-white px-4 text-[10px] leading-[1.3] text-[#212121] placeholder:text-[#8E939D] focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Input
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 ___ ___-__-__"
                  className="h-10 rounded-[12px] border border-[#E9EBEF] bg-white px-4 text-[10px] leading-[1.3] text-[#212121] placeholder:text-[#8E939D] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative w-4 h-4 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={agreedToPersonalData}
                    onChange={(e) => setAgreedToPersonalData(e.target.checked)}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    agreedToPersonalData ? 'bg-[#8AA6F4] border-[#8AA6F4]' : 'bg-white border-[#E9EBEF]'
                  }`}>
                    {agreedToPersonalData && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-[10px] leading-[1.3] text-[#8E939D]">
                  Согласен на обработку{' '}
                  <button
                    type="button"
                    className="text-[#8AA6F4]"
                    onClick={() => window?.open?.('https://1d47d82f-rag-test.s3.twcstorage.ru/files/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8_%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%94%D0%B0%D0%BD%D0%BD%D1%8B%D1%85_%22%D0%A2%D0%B2%D0%BE%D0%B9_%D0%94%D1%80%D1%83%D0%B3_%D0%AE%D1%80%D0%B8%D1%81%D1%82%22_2%20%281%29.pdf', '_blank')}
                  >
                    персональных данных
                  </button>
                </p>
              </label>

              {error && <p className="text-[10px] text-red-500">{error}</p>}

              {/* Button */}
              <Button
                type="submit"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-[12px] bg-[#8AA6F4] text-[12px] font-semibold leading-[1.3] text-white hover:bg-[#7A96E4] focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправляем…' : 'Отправить'}
                {!isSubmitting && (
                  <div className="relative w-2 h-2">
                    <Image
                      src="/images/registration/arrow-right.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
