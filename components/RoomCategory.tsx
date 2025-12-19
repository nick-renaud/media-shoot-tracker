'use client';

import { RoomCategory as RoomCategoryType, ShootRoom } from '@/types';
import { RoomCard } from './RoomCard';

interface RoomCategoryProps {
  category: RoomCategoryType;
  rooms: ShootRoom[];
  onUpdateActualShots: (roomId: string, actualShots: number) => void;
  onToggleComplete: (roomId: string) => void;
  onToggleSkip: (roomId: string) => void;
  onUpdateNotes: (roomId: string, notes: string) => void;
}

const CATEGORY_LABELS: Record<RoomCategoryType, string> = {
  exteriors: 'Exteriors',
  main_living: 'Main Living Area',
  kitchen_dining: 'Kitchen & Dining',
  beds_baths: 'Bedrooms & Bathrooms',
  misc: 'Miscellaneous',
  twilights: 'Twilight Shots',
};

export function RoomCategory({
  category,
  rooms,
  onUpdateActualShots,
  onToggleComplete,
  onToggleSkip,
  onUpdateNotes,
}: RoomCategoryProps) {
  if (rooms.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {CATEGORY_LABELS[category]}
      </h2>
      <div className="space-y-3">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onUpdateActualShots={(actual) => onUpdateActualShots(room.id, actual)}
            onToggleComplete={() => onToggleComplete(room.id)}
            onToggleSkip={() => onToggleSkip(room.id)}
            onUpdateNotes={(notes) => onUpdateNotes(room.id, notes)}
          />
        ))}
      </div>
    </div>
  );
}
