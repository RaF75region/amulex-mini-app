'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export function BackButton({ href = '/docs', label = 'Вернуться назад', className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn('gap-2 px-0 text-gray-500 hover:bg-transparent', className)}
      onClick={() => router.push(href)}
    >
      <ArrowLeft className="h-[8px] w-[8px]" />
      {label}
    </Button>
  );
}
