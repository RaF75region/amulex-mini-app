'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { HeroCard } from '@/components/home/hero-card';
import { FeatureCard } from '@/components/home/feature-card';
import { CreatorsCard } from '@/components/home/creators-card';
import { PublicOfferCard } from '@/components/home/public-offer-card';
import { cn } from '@/lib/utils';

const hammerImage = '/assets/hammer-figma.png';
const messageImage = '/assets/message-bubble-figma.png';
const unionIcon = '/assets/union-white.svg';

const iconArrow = '/assets/icon-arrow-circle.svg';
const iconMessage = '/assets/icon-message.svg';
const iconDocument = '/assets/icon-document.svg';
const iconFile = '/assets/icon-file.svg';
const iconChart = '/assets/icon-chart.svg';
const iconStar = '/assets/icon-star.svg';

export default function HomePage() {
  const router = useRouter();

  const handleRegisterClick = () => {
    // Открываем чат с ботом Амулекс
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/AmulexBot');
    } else {
      // Fallback для обычного браузера
      window.open('https://t.me/AmulexBot', '_blank');
    }
  };

  const handleWebsiteClick = () => {
    window.open('https://amulex.ru?utm_source=botfriend', '_blank');
  };

  const handleContactClick = () => {
    // Открываем Telegram канал Амулекс
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/amulex_ru');
    } else {
      // Fallback для обычного браузера
      window.open('https://t.me/amulex_ru', '_blank');
    }
  };

  const handlePublicOfferClick = () => {
    // Открываем PDF оферты для скачивания/просмотра
    const offerUrl = 'https://1d47d82f-rag-test.s3.twcstorage.ru/files/%D0%9E%D1%84%D0%B5%D1%80%D1%82%D0%B0%20%22%D0%A2%D0%B2%D0%BE%D0%B9%20%D0%94%D1%80%D1%83%D0%B3%20%D0%AE%D1%80%D0%B8%D1%81%D1%82%22.pdf';

    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      // В Telegram Mini App используем openLink для внешних URL
      window.Telegram.WebApp.openLink(offerUrl);
    } else {
      // Fallback для обычного браузера
      window.open(offerUrl, '_blank');
    }
  };

  const handleSuggestionClick = () => {
    router.push('/docs/contact-specialist');
  };

  const handleMarketplaceClick = () => {
    router.push('/docs');
  };

  return (
    <main
      className="flex flex-col gap-[24px] items-start w-full min-h-screen  bg-[#F3F5F9]"
      data-name="Контент"
      data-node-id="426:9718"
    >
      <HeroCard onRegisterClick={handleRegisterClick} />

      <section className="flex flex-col gap-[16px] items-start w-full" data-name="Блок" data-node-id="426:9735">
        <h2
          className="flex flex-col font-semibold justify-center text-[#212121] text-[16px] leading-[1.2] w-full"
          data-node-id="426:9736"
        >
          Возможности сервиса
        </h2>

        <div
          className="flex flex-col gap-[12px] items-start w-full"
          data-name="Область карточек"
          data-node-id="426:9737"
        >
          {/* Row 1: Marketplace */}
          <div className="flex items-start w-full" data-name="Ряд" data-node-id="426:9738">
            <FeatureCard
              icon={iconArrow}
              title="Больше услуг"
              description="от Твоего Друга Юриста"
              variant="primary"
              nodeId="426:9739"
              iconNodeId="426:9742"
              overlayImage={hammerImage}
              overlayNodeId="426:9740"
              onClick={handleMarketplaceClick}
            />
          </div>

          {/* Row 2: Free consultations + Document analysis */}
          <div className="flex gap-[12px] items-stretch w-full" data-name="Ряд" data-node-id="426:9747">
            <FeatureCard
              icon={iconMessage}
              description="Бесплатные консультации (до 5 сообщений в день)"
              nodeId="426:9748"
              iconNodeId="426:9750"
            />
            <FeatureCard
              icon={iconDocument}
              description="Анализ документов (PDF, фото)"
              nodeId="426:9754"
              iconNodeId="426:9756"
            />
          </div>

          {/* Row 3: Templates + Reports */}
          <div className="flex gap-[12px] items-stretch w-full" data-name="Ряд" data-node-id="426:9760">
            <FeatureCard
              icon={iconFile}
              description="Подготовка шаблонов исков, заявлений, договоров"
              nodeId="426:9761"
              iconNodeId="426:9763"
            />
            <FeatureCard
              icon={iconChart}
              description="Создание платного аналитического отчета\nпо вашему вопросу"
              nodeId="426:9767"
              iconNodeId="426:9769"
            />
          </div>

          {/* Row 4: Subscription + Suggestion */}
          <div className="flex gap-[12px] items-stretch w-full" data-name="Ряд" data-node-id="426:9773">
            <div className="flex-1 min-h-[120px]">
              <div
                className="bg-white flex flex-col items-start justify-center p-[16px] rounded-[16px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.06)] h-full min-h-[120px]"
                data-name="Карточка"
                data-node-id="426:9774"
              >
                <div className="flex flex-col gap-[8px] items-start w-full" data-name="Область текста" data-node-id="426:9775">
                  <div className="w-[32px] h-[32px] flex-shrink-0" data-name="Иконка" data-node-id="426:9776">
                    <img alt="" className="block max-w-none w-full h-full" src={iconStar} />
                  </div>
                  <div className="flex flex-col items-start w-full" data-name="Текст" data-node-id="426:9778">
                    <div
                      className="flex flex-col font-normal justify-center text-[10px] text-[#8e939d] leading-[1.3] w-full"
                      data-node-id="426:9779"
                    >
                      Платная подписка: безлимитные консультации (день / неделя / месяц / год)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-[120px]">
              <div
                onClick={handleSuggestionClick}
                className="flex flex-col gap-[12px] items-start p-[16px] rounded-[16px] relative h-full min-h-[120px] overflow-visible cursor-pointer transition-transform active:scale-95"
                data-name="Карточка"
                data-node-id="426:9780"
                style={{
                  backgroundImage: 'linear-gradient(132.47131702378982deg, rgba(105, 137, 227, 1) 12.302%, rgba(138, 166, 244, 1) 64.823%)',
                }}
              >
                <div
                  className="absolute right-[-10px] top-[-15px] w-[80px] h-[80px] pointer-events-none"
                  data-name="Сообщение"
                  data-node-id="426:9781"
                >
                  <img
                    alt=""
                    className="w-full h-full object-contain grayscale"
                    src={messageImage}
                  />
                </div>
                <div className="relative w-[32px] h-[32px] flex-shrink-0" data-name="Кнопка" data-node-id="426:9784">
                  <img alt="" className="block max-w-none w-full h-full" src={iconArrow} />
                </div>
                <div className="flex flex-col gap-[8px] items-start w-full relative z-10" data-name="Область текста" data-node-id="426:9786">
                  <div className="flex flex-col items-start justify-center w-full" data-name="Заголовок" data-node-id="426:9787">
                    <div
                      className="flex flex-col font-semibold justify-center text-[16px] text-white leading-[1.2] w-full"
                      data-node-id="426:9788"
                    >
                      Есть предложение?
                    </div>
                  </div>
                  <div
                    className="flex flex-col font-normal justify-center text-[10px] text-white leading-[1.3] w-full"
                    data-node-id="426:9789"
                  >
                    Напишите нам
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creators card */}
          <CreatorsCard onWebsiteClick={handleWebsiteClick} />

          {/* Public offer card */}
          <PublicOfferCard onClick={handlePublicOfferClick} />

          {/* Final register button */}
          {/* <button
            onClick={handleRegisterClick}
            className={cn(
              'bg-[#8aa6f4] flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[12px] w-full',
              'transition-transform active:scale-95'
            )}
            data-name="Кнопка"
            data-node-id="426:9807"
          >
            <div
              className="flex flex-col font-semibold justify-center text-[12px] text-white leading-[1.3] whitespace-nowrap"
              data-node-id="426:9808"
            >
              Зарегистрироваться сейчас
            </div>
            <div className="w-[8px] h-[8px] flex-shrink-0" data-name="Union" data-node-id="426:9809">
              <img alt="" className="block max-w-none w-full h-full" src={unionIcon} />
            </div>
          </button> */}
        </div>
      </section>
    </main>
  );
}
