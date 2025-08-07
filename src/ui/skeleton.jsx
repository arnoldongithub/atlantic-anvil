// src/ui/skeleton.jsx
import * as React from 'react';
import { cn } from '../lib/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
      {...props}
    />
  );
}

// Article Skeleton Component
function ArticleSkeleton({ variant = 'default' }) {
  if (variant === 'horizontal') {
    return (
      <div className="flex gap-4 p-4 border rounded-lg">
        <Skeleton className="w-32 h-24 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

// Featured Article Skeleton
function FeaturedSkeleton() {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <Skeleton className="h-96 w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <Skeleton className="h-8 w-3/4 bg-muted/50" />
        <Skeleton className="h-4 w-full bg-muted/50" />
        <Skeleton className="h-4 w-2/3 bg-muted/50" />
      </div>
    </div>
  );
}

// Sidebar Article Skeleton
function SidebarSkeleton() {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-32 w-full rounded" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

// List Item Skeleton
function ListItemSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export { 
  Skeleton, 
  ArticleSkeleton, 
  FeaturedSkeleton, 
  SidebarSkeleton,
  ListItemSkeleton 
};
