// components/ui/Popover.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({ 
  trigger, 
  children, 
  position = 'right',
  className 
}) => {
  const [show, setShow] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  const positionClasses = {
    left: 'right-0',
    right: 'left-0'
  };

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={() => setShow(!show)}>
        {trigger}
      </div>
      {show && (
        <div
          className={cn(
            'absolute z-50 mt-2 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-4 min-w-[280px]',
            positionClasses[position],
            'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2',
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};