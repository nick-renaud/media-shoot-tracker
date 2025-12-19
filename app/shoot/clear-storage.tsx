'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ClearStorageButton() {
  const router = useRouter();

  const handleClear = () => {
    if (confirm('Clear all shoot data and start fresh? This cannot be undone.')) {
      localStorage.removeItem('current-shoot');
      router.push('/');
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleClear}
      className="fixed bottom-4 left-4 z-50 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-red-600"
    >
      Clear & Restart
    </button>
  );
}

