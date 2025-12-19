'use client';

import { ShootRoom } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { OrientationBadge } from './OrientationBadge';
import { useState } from 'react';
import {
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
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
        room.completed
          ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white shadow-md'
          : room.skipped
            ? 'border-slate-200 bg-slate-50/50 opacity-60'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
      }`}
    >
      {room.completed && (
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-600" />
      )}

      <div className="p-6">
        <div className="flex items-start gap-5">
          <button
            onClick={onToggleComplete}
            disabled={room.skipped}
            className="mt-1 flex-shrink-0 transition-transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {room.completed ? (
              <CheckCircleSolid className="h-10 w-10 text-emerald-500" />
            ) : room.skipped ? (
              <MinusCircleIcon className="h-10 w-10 text-slate-400" />
            ) : (
              <div className="h-10 w-10 rounded-full border-3 border-slate-300 transition-all group-hover:border-slate-400 group-hover:shadow-sm" />
            )}
          </button>

          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3
                    className={`text-lg font-bold leading-tight ${
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

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotes(!showNotes);
                  }}
                  disabled={room.skipped}
                  className={`rounded-xl p-3 transition-all ${
                    showNotes
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                  title="Add notes"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSkip();
                  }}
                  className="rounded-xl p-3 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
                  title={room.skipped ? 'Unskip room' : 'Skip room'}
                >
                  <MinusCircleIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5">
                  <CameraIcon className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Expected</div>
                  <div className="text-2xl font-bold text-slate-900">{room.expectedShots}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const current = room.actualShots ?? 0;
                    if (current > 0) onUpdateActualShots(current - 1);
                  }}
                  disabled={room.skipped || (room.actualShots ?? 0) === 0}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all hover:bg-slate-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="text-2xl font-bold">−</span>
                </button>

                <div className="flex min-w-[80px] flex-col items-center">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Actual</div>
                  <div className="text-3xl font-bold text-indigo-600">{room.actualShots ?? 0}</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const current = room.actualShots ?? 0;
                    onUpdateActualShots(current + 1);
                  }}
                  disabled={room.skipped}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="text-2xl font-bold">+</span>
                </button>
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
