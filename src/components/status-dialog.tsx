import { X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'success' | 'error';
  title?: string;
  description?: string;
  buttonText?: string;
}

export function StatusDialog({
  open,
  onOpenChange,
  type,
  title,
  description,
  buttonText = 'Вернуться назад',
}: StatusDialogProps) {
  const isSuccess = type === 'success';

  const defaultTitle = isSuccess
    ? 'Ваше обращение успешно отправлено'
    : 'Что-то пошло не так';

  const defaultDescription = isSuccess
    ? 'Рассмотрим его в течение 3-х рабочих дней'
    : 'Ваше сообщение не доставлено, попробуйте снова через некоторое время';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[16px] p-[24px] text-center max-w-[400px]">
        <DialogClose className="absolute right-[24px] top-[24px] text-[#8e939d] hover:opacity-70" aria-label="Закрыть">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-90deg]">
            <path d="M2 10L10 2M10 10L2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </DialogClose>
        <DialogHeader className="flex flex-col gap-[16px] items-center">
          <div className="w-[40px] h-[40px] flex items-center justify-center shrink-0">
            {isSuccess ? (
              <img src="/images/bonus/icon-success.svg" alt="" className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-[8px] bg-red-50">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[8px] items-center w-full">
            <DialogTitle className="text-[16px] font-semibold text-[#212121] leading-[1.2] w-full">
              {title || defaultTitle}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-normal leading-[1.3] text-[#8e939d]">
              {description || defaultDescription}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="mt-[8px] flex justify-center">
          <Button
            variant="ghost"
            className="h-[40px] w-full rounded-[12px] bg-[#f3f5f9] px-[16px] text-[12px] font-semibold text-[#8aa6f4] leading-[1.3] hover:bg-[#e9ebef]"
            onClick={() => onOpenChange(false)}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
