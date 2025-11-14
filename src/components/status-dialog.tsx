import { X, CheckCircle2, AlertCircle } from 'lucide-react';
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
    ? 'Рассмотрим его в течении 3-х рабочих дней'
    : 'Ваше сообщение не доставлено, попробуйте снова через некоторое время';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[36px] p-8 text-center max-w-[400px]">
        <DialogClose className="absolute right-6 top-6 text-gray-400" aria-label="Закрыть">
          <X className="h-5 w-5" />
        </DialogClose>
        <DialogHeader className="space-y-4">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] ${
              isSuccess ? 'bg-[#00AFA0]/10' : 'bg-red-50'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="h-8 w-8 text-[#00AFA0]" />
            ) : (
              <AlertCircle className="h-8 w-8 text-red-500" />
            )}
          </div>
          <DialogTitle className="text-[17px] font-semibold text-gray-900 leading-tight">
            {title || defaultTitle}
          </DialogTitle>
          <DialogDescription className="text-[12px] leading-[150%] text-gray-500">
            {description || defaultDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            className={`gap-2 px-0 hover:bg-transparent ${
              isSuccess ? 'text-[#00AFA0]' : 'text-gray-600'
            }`}
            onClick={() => onOpenChange(false)}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
