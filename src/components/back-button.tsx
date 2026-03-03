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
      className={cn('gap-2 px-0 text-[16px] font-medium text-[#8E939D] hover:bg-transparent hover:text-[#8AA6F4] transition-colors', className)}
      onClick={() => router.push(href)}
    >
      <ArrowLeft className="h-[16px] w-[16px]" />
      {label}
    </Button>
  );
}
