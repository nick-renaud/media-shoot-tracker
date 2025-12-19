'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUICK_ADD_ROOMS } from '@/lib/data/quick-add-rooms';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AddRoomModalProps {
  readonly onAddRoom: (name: string, expectedShots: number) => void;
}

export function AddRoomModal({ onAddRoom }: AddRoomModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customShots, setCustomShots] = useState('');

  const handleQuickAdd = (name: string, shots: number) => {
    onAddRoom(name, shots);
    setIsOpen(false);
  };

  const handleCustomAdd = () => {
    const shots = Number.parseInt(customShots, 10);
    if (customName.trim() && !Number.isNaN(shots) && shots > 0) {
      onAddRoom(customName, shots);
      setCustomName('');
      setCustomShots('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50"
      >
        <PlusCircleIcon className="mr-2 h-5 w-5" />
        Add Room
      </Button>

      {isOpen && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Add Room</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Quick-add a common room or create a custom entry
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Quick add */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Quick Add
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                  {QUICK_ADD_ROOMS.map((room) => (
                    <button
                      key={room.id}
                      onClick={() =>
                        handleQuickAdd(room.name, room.defaultShots)
                      }
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition-all hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <div>{room.name}</div>
                      <div className="text-xs text-slate-500">
                        {room.defaultShots} shots
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Custom Room
                </h3>
                <div className="mt-3 space-y-3">
                  <Input
                    placeholder="Room name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Expected shots"
                    value={customShots}
                    onChange={(e) => setCustomShots(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleCustomAdd} className="flex-1">
                Add Custom Room
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
