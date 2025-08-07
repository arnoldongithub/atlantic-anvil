// src/ui/spinner.jsx
import * as React from 'react';
import { cn } from '../lib/utils';

const Spinner = React.forwardRef(({ className, size = 'default', ...props }, ref) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-4'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'animate-spin rounded-full border-solid border-muted-foreground/20 border-t-primary',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});
Spinner.displayName = 'Spinner';

// Loading Overlay Component
function LoadingOverlay({ show = false, message = 'Loading...', className }) {
  if (!show) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <Spinner size="lg" />
        {message && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

// Inline Loading Component
function InlineLoading({ loading = false, children, className }) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Spinner />
        </div>
      )}
    </div>
  );
}

// Atlantic Anvil Patriotic Spinner
function PatrioticSpinner({ className, ...props }) {
  return (
    <div className={cn('relative h-12 w-12', className)} {...props}>
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-anvil-red/20 border-t-anvil-red" />
      <div className="absolute inset-2 animate-spin-reverse rounded-full border-2 border-atlantic-navy/20 border-t-atlantic-navy" />
      <div className="absolute inset-4 animate-pulse rounded-full bg-torch-gold/20" />
    </div>
  );
}

export { Spinner, LoadingOverlay, InlineLoading, PatrioticSpinner };
