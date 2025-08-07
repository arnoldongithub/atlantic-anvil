// src/ui/separator.jsx
import * as React from 'react';
import { cn } from '../lib/utils';

const Separator = React.forwardRef(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = 'Separator';

// Atlantic Anvil Patriotic Separator
function PatrioticSeparator({ className, ...props }) {
  return (
    <div className={cn('relative w-full h-4 flex items-center justify-center', className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-anvil-red to-transparent" />
      </div>
      <div className="relative bg-background px-4">
        <span className="text-torch-gold text-xl">★</span>
      </div>
    </div>
  );
}

// Section Separator with Title
function SectionSeparator({ title, className, ...props }) {
  return (
    <div className={cn('relative flex items-center py-4', className)} {...props}>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-border to-border" />
      {title && (
        <span className="mx-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
      )}
      <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-border to-border" />
    </div>
  );
}

export { Separator, PatrioticSeparator, SectionSeparator };
