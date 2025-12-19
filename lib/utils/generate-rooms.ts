import { PropertyTier, ShootRoom } from '@/types';
import { ROOM_TEMPLATES } from '@/lib/data/room-templates';
import { nanoid } from 'nanoid';

export function generateRoomList(tier: PropertyTier): ShootRoom[] {
  const rooms: ShootRoom[] = [];
  let sortOrder = 0;

  for (const template of ROOM_TEMPLATES) {
    const expectedShots = template.shots[tier];

    // Skip rooms with 0 shots for this tier (unless they're always shown)
    if (expectedShots === 0 && template.conditionalDisplay) {
      continue;
    }

    rooms.push({
      id: nanoid(),
      templateId: template.id,
      name: template.name,
      category: template.category,
      expectedShots: expectedShots,
      actualShots: null,
      orientation: template.orientation,
      completed: false,
      skipped: false,
      notes: undefined,
      sortOrder: sortOrder++,
      isCustom: false,
    });
  }

  return rooms;
}

