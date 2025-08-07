// src/ui/alert.jsx
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        // Atlantic Anvil variants
        breaking: 'border-destructive bg-destructive/10 text-destructive animate-pulse',
        success: 'border-green-500/50 bg-green-50 text-green-900 dark:bg-green-900/10 dark:text-green-400',
        warning: 'border-torch-gold/50 bg-torch-gold/10 text-torch-gold',
        patriot: 'border-anvil-red bg-gradient-to-r from-anvil-red/10 to-atlantic-navy/10 text-atlantic-navy',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

// Breaking News Alert Component
function BreakingNewsAlert({ title, description, ...props }) {
  return (
    <Alert variant="breaking" {...props}>
      <span className="text-2xl mr-2">🚨</span>
      <AlertTitle className="text-lg font-bold">
        BREAKING: {title}
      </AlertTitle>
      {description && (
        <AlertDescription className="mt-2">
          {description}
        </AlertDescription>
      )}
    </Alert>
  );
}

export { Alert, AlertDescription, AlertTitle, BreakingNewsAlert };
