'use client';

import { useRouter } from 'next/navigation';
import { DocumentCard } from '@/entities/documents';

export default function DocsPage() {
  const router = useRouter();

  const handleLegalAnalysis = () => {
    router.push('/docs/legal-analysis');
  };

  const handleFindTemplate = () => {
    console.log('Найти шаблон');
  };

  const handleContactSpecialist = () => {
    router.push('/docs/contact-specialist');
  };  return (
    <div className="min-h-screen bg-[#E9EBEF] pb-24 px-4">
      <div className="max-w-[768px] mx-auto pt-8">
        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Документы
        </h1>

        {/* Первые две карточки в ряд */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="no-hover-card">
            <DocumentCard
              title="Юридический анализ"
              description="Расскажите, что случилось — «Твой Друг Юрист» изучит закон, практику и составит понятный план для Вашей ситуации"
              onClick={handleLegalAnalysis}
            />
          </div>

          <div className="no-hover-card">
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

      <style jsx>{`
        .no-hover-card :global(.group:hover) {
          background-color: #ffffff !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
        }

        .no-hover-card :global(.group .group-hover\:bg-white) {
          background-color: #22b1a3 !important;
          color: #ffffff !important;
        }

        .no-hover-card :global(.group h3.group-hover\:text-white) {
          color: #111827 !important;
        }

        .no-hover-card :global(.group p.group-hover\:text-white) {
          color: #6b7280 !important;
        }

        .no-hover-card :global(.group .group-hover\:text-\[\#22B1A3\]) {
          color: #ffffff !important;
        }

        .highlighted-card :global(.group) {
          background-color: #22b1a3 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 15px -3px rgba(34, 177, 163, 0.35), 0 4px 6px -4px rgba(34, 177, 163, 0.3) !important;
        }

        .highlighted-card :global(.group:hover) {
          background-color: #22b1a3 !important;
          box-shadow: 0 10px 15px -3px rgba(34, 177, 163, 0.35), 0 4px 6px -4px rgba(34, 177, 163, 0.3) !important;
        }

        .highlighted-card :global(.group .group-hover\:bg-white) {
          background-color: #ffffff !important;
        }

        .highlighted-card :global(.group .group-hover\:text-\[\#22B1A3\]) {
          color: #22b1a3 !important;
        }

        .highlighted-card :global(h3.group-hover\:text-white),
        .highlighted-card :global(p.group-hover\:text-white) {
          color: #ffffff !important;
        }

        .highlighted-card :global(.group .group-hover\:text-white) {
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
