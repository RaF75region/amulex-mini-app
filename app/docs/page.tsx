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
    console.log('Связаться со специалистом');
  };

  return (
    <div className="min-h-screen bg-[#E9EBEF] pb-24 px-4">
      <div className="max-w-[768px] mx-auto pt-8">
        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Документы
        </h1>

        {/* Первые две карточки в ряд */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <DocumentCard
            title="Юридический анализ"
            description="Расскажите, что случилось — «Твой Друг Юрист» изучит закон, практику и составит понятный план для Вашей ситуации"
            onClick={handleLegalAnalysis}
          />

          <DocumentCard
            title="Найти шаблон на сайте"
            description="Скачайте различные образцы договоров 2025, проверенные юристами. Найдите нужный вариант и загрузите в формате DOCX или PDF"
            onClick={handleFindTemplate}
          />
        </div>

        {/* Третья карточка на всю ширину */}
        <div className="mb-6">
          <DocumentCard
            title="Не нашли, что искали?"
            description="Отправьте запрос, наши специалисты свяжутся с Вами в течение 10 минут"
            onClick={handleContactSpecialist}
            showIllustration={true}
          />
        </div>
      </div>
    </div>
  );
}
