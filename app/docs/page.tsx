'use client';

import { useRouter } from 'next/navigation';
import { DocumentCard } from '@/entities/documents';
import { InfoCard } from '@/components/home/info-card';

export default function DocsPage() {
  const router = useRouter();

  const handleLegalAnalysis = () => {
    router.push('/docs/legal-analysis');
  };

  const handleFindTemplate = () => {
    if (typeof window !== 'undefined') {
      window.open('https://amulex.ru/docs', '_blank');
    }
  };

  const handleContactSpecialist = () => {
    router.push('/docs/contact-specialist');
  };

  return (
    <div className="max-w-[768px] mx-auto">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Услуги
      </h1>

      {/* Первые две карточки в ряд */}
      <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="no-hover-card h-full">
            <DocumentCard
              title="Юридический анализ"
              description="Расскажите, что случилось — «Твой Друг Юрист» изучит закон, практику и составит понятный план для Вашей ситуации"
              onClick={handleLegalAnalysis}
            />
          </div>

          <div className="no-hover-card h-full">
            <DocumentCard
              title="Найти шаблон на сайте"
              description="Скачайте различные образцы договоров 2025, проверенные юристами. Найдите нужный вариант и загрузите в формате DOCX или PDF"
              onClick={handleFindTemplate}
            />
          </div>
        </div>

        {/* Третья карточка на всю ширину */}
        <div className="mb-6 highlighted-card">
          <DocumentCard
            title="Не нашли, что искали?"
            description="Отправьте запрос, наши специалисты свяжутся с Вами в течение 10 минут"
            onClick={handleContactSpecialist}
            showIllustration={true}
          />
        </div>
      </div>
    );
  }