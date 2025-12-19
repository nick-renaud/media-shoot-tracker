'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export function ClearStorageButton() {
  const [showModal, setShowModal] = useState(false);

  const handleClear = () => {
    localStorage.removeItem('current-shoot');
    // Force full page reload to home page
    window.location.href = '/';
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowModal(true)}
        className="gap-2"
      >
        <ArrowPathIcon className="h-4 w-4" />
        Reset
      </Button>

      {showModal && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowModal(false)}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-slate-900">Reset Shoot?</h2>
            <p className="mt-3 text-sm text-slate-600">
              This will clear all current shoot data and return you to the home screen. This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleClear}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Reset Shoot
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

