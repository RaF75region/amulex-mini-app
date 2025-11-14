'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, HelpCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fio, setFio] = useState('');
  const [phone, setPhone] = useState('+7 ');
  const [agreed, setAgreed] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+7 ')) {
      value = '+7 ';
    }
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    // Handle form submission
    console.log({ fio, phone });
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 pb-32">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4 pt-6">
        {/* Header */}
        <header>
          <h1 className="text-[26px] font-bold leading-tight text-[#0F172A]">
            Введите ФИО и телефон
          </h1>
        </header>

        {/* Form Section */}
        <section className="rounded-[26px] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FIO Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[14px] font-semibold text-[#0F172A]">
                Ваше ФИО
                <HelpCircle className="h-4 w-4 text-[#22B1A3]" />
              </label>
              <input
                type="text"
                value={fio}
                onChange={(e) => setFio(e.target.value)}
                placeholder="ФИО"
                className="h-[48px] w-full rounded-[18px] border-2 border-[#E5E7EB] bg-white px-4 text-[14px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:border-[#22B1A3] focus:outline-none transition-colors"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+7 ___ ___-__-__"
                className="h-[48px] w-full rounded-[18px] border-2 border-[#E5E7EB] bg-white px-4 text-[14px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:border-[#22B1A3] focus:outline-none transition-colors"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[7px] transition-all ${
                  agreed
                    ? 'bg-[#22B1A3]'
                    : 'border-2 border-[#E5E7EB] bg-white'
                }`}
              >
                {agreed && (
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <p className="text-[12px] leading-[1.4] text-[#6B7280]">
                Согласен на обработку{' '}
                <button
                  type="button"
                  className="font-medium text-[#22B1A3] hover:underline"
                >
                  персональных данных
                </button>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!agreed}
              className={`flex h-[48px] w-full items-center justify-center gap-1.5 rounded-[22px] text-[14px] font-semibold transition-all ${
                agreed
                  ? 'bg-[#22B1A3] text-white hover:bg-[#1e9b8e] shadow-[0_8px_24px_rgba(34,177,163,0.25)]'
                  : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              Отправить
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
