import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-700/50 rounded ${className}`}></div>
  );
};

export const SkeletonProfile = () => (
  <div className="flex items-center gap-4 p-4 w-full">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);

export const SkeletonMessage = ({ isSender = false }: { isSender?: boolean }) => (
  <div className={`flex w-full ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
    <Skeleton className={`h-16 w-64 ${isSender ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' : 'rounded-tr-2xl rounded-tl-2xl rounded-br-2xl'}`} />
  </div>
);
