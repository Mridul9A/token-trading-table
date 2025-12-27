// components/ui/Skeleton.tsx

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'default' 
}) => {
  const baseClasses = 'animate-pulse bg-gray-800/50';
  
  const variantClasses = {
    default: 'h-16 rounded-lg',
    circular: 'w-10 h-10 rounded-full',
    rectangular: 'h-32 rounded-lg'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="space-y-2 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16" />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
};