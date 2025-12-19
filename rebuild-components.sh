#!/bin/bash

# Create professional RoomCard component
cat > components/RoomCard.tsx << 'EOF'
'use client';

import { ShootRoom } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OrientationBadge } from './OrientationBadge';
import { useState } from 'react';
import {
  CheckCircleIcon,
  MinusCircleIcon,
  CameraIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

interface RoomCardProps {
  room: ShootRoom;
  onUpdateActualShots: (actual: number) => void;
  onToggleComplete: () => void;
  onToggleSkip: () => void;
  onUpdateNotes: (notes: string) => void;
}

export function RoomCard({
  room,
  onUpdateActualShots,
  onToggleComplete,
  onToggleSkip,
  onUpdateNotes,
}: RoomCardProps) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-200 ${
        room.completed
          ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white shadow-sm'
          : room.skipped
            ? 'border-slate-200 bg-slate-50/50 opacity-60'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
      }`}
    >
      {room.completed && (
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-emerald-600" />
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          <button
            onClick={onToggleComplete}
            disabled={room.skipped}
            className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {room.completed ? (
              <CheckCircleSolid className="h-7 w-7 text-emerald-500" />
            ) : room.skipped ? (
              <MinusCircleIcon className="h-7 w-7 text-slate-400" />
            ) : (
              <div className="h-7 w-7 rounded-full border-2 border-slate-300 transition-all group-hover:border-slate-400 group-hover:shadow-sm" />
            )}
          </button>

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h3
                    className={`text-base font-semibold leading-tight ${
                      room.completed
                        ? 'text-emerald-900'
                        : room.skipped
                          ? 'text-slate-500 line-through'
                          : 'text-slate-900'
                    }`}
                  >
                    {room.name}
                  </h3>
                  <OrientationBadge orientation={room.orientation} />
                </div>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotes(!showNotes);
                  }}
                  disabled={room.skipped}
                  className={`rounded-lg p-2 transition-all ${
                    showNotes
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                  title="Add notes"
                >
                  <ChatBubbleLeftIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSkip();
                  }}
                  className="rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
                  title={room.skipped ? 'Unskip room' : 'Skip room'}
                >
                  <MinusCircleIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CameraIcon className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-700">
                  {room.expectedShots}
                </span>
                <span className="text-slate-400">expected</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-400">→</span>
                <Input
                  type="number"
                  min="0"
                  value={room.actualShots ?? ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      onUpdateActualShots(val);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="h-9 w-20 border-slate-300 text-center text-sm font-semibold transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="0"
                  disabled={room.skipped}
                />
                <span className="text-sm text-slate-400">actual</span>
              </div>
            </div>

            {showNotes && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <Textarea
                  value={room.notes ?? ''}
                  onChange={(e) => onUpdateNotes(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Add notes about this room..."
                  className="min-h-[90px] resize-none border-slate-300 text-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  disabled={room.skipped}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

chmod +x rebuild-components.sh
