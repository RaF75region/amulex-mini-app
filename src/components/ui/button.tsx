import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22B1A3] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-[#E9EBEF]',
  {
    variants: {
      variant: {
        default: 'bg-[#22B1A3] text-white hover:bg-[#1c8f84]',
        secondary: 'bg-white text-gray-900 hover:bg-gray-100 shadow-sm',
        outline: 'border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900',
        ghost: 'bg-transparent text-gray-500 hover:bg-white/60'
      },
      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
