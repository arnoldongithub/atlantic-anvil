// src/ui/badge.jsx
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // Atlantic Anvil variants
        breaking: 'border-transparent bg-destructive text-white animate-pulse',
        trending: 'border-transparent bg-gradient-to-r from-torch-gold to-anvil-red text-white',
        premium: 'border-transparent bg-gradient-to-r from-atlantic-navy to-torch-gold text-white',
        patriot: 'border-transparent bg-anvil-red text-white',
        defender: 'border-transparent bg-torch-gold text-atlantic-navy',
        guardian: 'border-transparent bg-atlantic-navy text-white',
        viral: 'border-transparent bg-gradient-to-r from-destructive to-highlight text-white animate-pulse',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Category Badge Component
function CategoryBadge({ category, className, ...props }) {
  const categoryStyles = {
    'trump': 'bg-anvil-red text-white',
    'republican-party': 'bg-atlantic-navy text-white',
    'europe': 'bg-lightning-blue text-white',
    'elon-musk': 'bg-torch-gold text-atlantic-navy',
    'steve-bannon': 'bg-anvil-red text-white',
    'breaking': 'bg-destructive text-white animate-pulse',
  };
  
  return (
    <Badge
      className={cn(
        categoryStyles[category?.slug] || 'bg-muted',
        className
      )}
      {...props}
    >
      {category?.name || 'News'}
    </Badge>
  );
}

// Source Badge Component
function SourceBadge({ source, className, ...props }) {
  return (
    <Badge
      variant="outline"
      className={cn('text-xs', className)}
      {...props}
    >
      {source?.display_name || source}
    </Badge>
  );
}

// Trending Score Badge
function TrendingBadge({ score, className, ...props }) {
  let variant = 'outline';
  let text = 'Trending';
  
  if (score >= 9) {
    variant = 'viral';
    text = '🔥 VIRAL';
  } else if (score >= 7) {
    variant = 'trending';
    text = '📈 HOT';
  } else if (score >= 5) {
    text = '⭐ TRENDING';
  }
  
  return (
    <Badge variant={variant} className={className} {...props}>
      {text}
    </Badge>
  );
}

export { Badge, CategoryBadge, SourceBadge, TrendingBadge, badgeVariants };
