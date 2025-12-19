import { RoomCategory as RoomCategoryType, ShootRoom } from '@/types';
import { RoomCard } from './RoomCard';

interface RoomCategoryProps {
  category: RoomCategoryType;
  rooms: ShootRoom[];
  onUpdateActualShots: (roomId: string, actual: number) => void;
  onToggleComplete: (roomId: string) => void;
  onToggleSkip: (roomId: string) => void;
  onUpdateNotes: (roomId: string, notes: string) => void;
}

const CATEGORY_LABELS: Record<RoomCategoryType, string> = {
  exteriors: 'EXTERIORS',
  main_living: 'MAIN LIVING AREA',
  kitchen_dining: 'KITCHEN, DINING',
  beds_baths: 'BEDS, BATHS',
  misc: 'MISC',
  twilights: 'TWILIGHTS',
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
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {CATEGORY_LABELS[category]}
      </h2>
      <div className="space-y-2">
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

