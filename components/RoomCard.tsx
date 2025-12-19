'use client';

import { ShootRoom } from '@/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OrientationBadge } from './OrientationBadge';
import { useState } from 'react';

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

  const getStatusIcon = () => {
    if (room.skipped) return '━';
    if (room.completed) return '✓';
    return '○';
  };

  const getStatusColor = () => {
    if (room.skipped) return 'text-muted-foreground line-through';
    if (room.completed) return 'text-green-600';
    return 'text-foreground';
  };

  return (
    <Card
      className={`p-4 ${room.skipped ? 'opacity-50' : ''}`}
      onClick={() => !room.skipped && onToggleComplete()}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-xl ${getStatusColor()}`}>
              {getStatusIcon()}
            </span>
            <span className={`font-medium ${getStatusColor()}`}>
              {room.name}
            </span>
            <OrientationBadge orientation={room.orientation} />
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Expected: {room.expectedShots}</span>
            <span>→</span>
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
              className="h-8 w-16"
              placeholder="0"
              disabled={room.skipped}
            />
          </div>

          {room.skipped && (
            <div className="mt-2 text-sm text-muted-foreground">
              (Skipped - {room.notes || 'no reason given'})
            </div>
          )}

          {showNotes && !room.skipped && (
            <div className="mt-3">
              <Textarea
                value={room.notes ?? ''}
                onChange={(e) => onUpdateNotes(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Add notes..."
                className="min-h-[60px]"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNotes(!showNotes);
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
            disabled={room.skipped}
          >
            📝
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSkip();
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {room.skipped ? '↩' : '⊘'}
          </button>
        </div>
      </div>
    </Card>
  );
}

