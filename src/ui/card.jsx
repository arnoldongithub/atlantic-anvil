// src/ui/card.jsx
import * as React from 'react';
import { cn } from '../lib/utils';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Atlantic Anvil News Card variant
const NewsCard = React.forwardRef(({ 
  className, 
  article,
  variant = 'default',
  showImage = true,
  ...props 
}, ref) => {
  const isBreaking = article?.is_breaking;
  const isFeatured = article?.is_featured;
  
  return (
    <Card
      ref={ref}
      className={cn(
        'overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1',
        isBreaking && 'border-destructive border-2',
        isFeatured && 'border-highlight border-2',
        variant === 'horizontal' && 'flex flex-row',
        className
      )}
      {...props}
    >
      {showImage && article?.image_url && (
        <div className={cn(
          'overflow-hidden bg-muted',
          variant === 'horizontal' ? 'w-48 h-full' : 'h-48 w-full'
        )}>
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {isBreaking && (
              <span className="px-2 py-1 text-xs font-bold bg-destructive text-destructive-foreground rounded">
                BREAKING
              </span>
            )}
            {article?.source?.display_name && (
              <span className="text-xs text-muted-foreground">
                {article.source.display_name}
              </span>
            )}
          </div>
          <CardTitle className="line-clamp-2">{article?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">
            {article?.excerpt}
          </CardDescription>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <span>{article?.reading_time} min read</span>
          <span className="mx-2">•</span>
          <span>{article?.published_at}</span>
        </CardFooter>
      </div>
    </Card>
  );
});
NewsCard.displayName = 'NewsCard';

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  NewsCard 
};
