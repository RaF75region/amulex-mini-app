'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const unionIconUrl = 'https://www.figma.com/api/mcp/asset/6350226d-a308-4485-9be7-6f4b43fee850';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        data-name="Кнопка"
        data-node-id="426:9742"
        className={cn(
          'relative flex-shrink-0 rounded-full overflow-hidden',
          'w-8 h-8',
          'transition-transform active:scale-95',
          className
        )}
        {...props}
      >
        <img
          src={unionIconUrl}
          alt=""
          className="block max-w-none w-full h-full object-cover"
        />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
