'use client';

import { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
}

export function SuccessAnimation({ show, message = 'Room completed!' }: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div className="animate-in zoom-in fade-in duration-300 rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600">
            <CheckCircleIcon className="h-7 w-7 text-white" />
          </div>
          <p className="text-lg font-semibold text-slate-900">{message}</p>
        </div>
      </div>
    </div>
  );
}

