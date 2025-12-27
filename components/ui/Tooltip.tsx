// components/ui/Tooltip.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'top',
  delay = 200,
  className 
}) => {
  const [show, setShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovering) {
      timeoutRef.current = setTimeout(() => {
        setShow(true);
      }, delay);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShow(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovering, delay]);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900'
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </div>
      {show && (
        <div
          className={cn(
            'absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-xl whitespace-nowrap pointer-events-none',
            positionClasses[position],
            'animate-in fade-in-0 zoom-in-95',
            className
          )}
        >
          {content}
          <div className={cn('absolute', arrowClasses[position])} />
        </div>
      )}
    </div>
  );
};