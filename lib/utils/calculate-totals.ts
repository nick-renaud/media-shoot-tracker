import { ShootRoom } from '@/types';

export interface ShootTotals {
  expectedTotal: number;
  actualTotal: number;
  variance: number;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
}

export function calculateTotals(rooms: ShootRoom[]): ShootTotals {
  const activeRooms = rooms.filter((r) => !r.skipped);

  const expectedTotal = activeRooms.reduce(
    (sum, room) => sum + room.expectedShots,
    0
  );

  const actualTotal = activeRooms.reduce(
    (sum, room) => sum + (room.actualShots ?? 0),
    0
  );

  const completedCount = activeRooms.filter((r) => r.completed).length;
  const totalCount = activeRooms.length;

  const variance = actualTotal - expectedTotal;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    expectedTotal,
    actualTotal,
    variance,
    completedCount,
    totalCount,
    progressPercent,
  };
}

