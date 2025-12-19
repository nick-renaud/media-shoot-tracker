'use client';

import { Shoot, ShootRoom, PropertyTier } from '@/types';
import { useLocalStorage } from './useLocalStorage';
import { generateRoomList } from '@/lib/utils/generate-rooms';
import { getTierInfo } from '@/lib/data/tier-info';
import { nanoid } from 'nanoid';

export function useShoot() {
  const [shoot, setShoot] = useLocalStorage<Shoot | null>(
    'active-shoot',
    null
  );

  const startShoot = (tier: PropertyTier, photographer: string) => {
    const tierInfo = getTierInfo(tier);
    const rooms = generateRoomList(tier);

    const newShoot: Shoot = {
      id: nanoid(),
      tier,
      tierDisplayName: tierInfo?.displayName ?? tier,
      photographer,
      startedAt: new Date(),
      status: 'active',
      rooms,
      targetShots: tierInfo?.targetShots ?? 40,
    };

    setShoot(newShoot);
    return newShoot;
  };

  const updateRoom = (roomId: string, updates: Partial<ShootRoom>) => {
    if (!shoot) return;

    setShoot({
      ...shoot,
      rooms: shoot.rooms.map((room) =>
        room.id === roomId ? { ...room, ...updates } : room
      ),
    });
  };

  const updateActualShots = (roomId: string, actual: number) => {
    updateRoom(roomId, { actualShots: actual });
  };

  const toggleComplete = (roomId: string) => {
    if (!shoot) return;

    const room = shoot.rooms.find((r) => r.id === roomId);
    if (!room) return;

    updateRoom(roomId, { completed: !room.completed });
  };

  const toggleSkip = (roomId: string) => {
    if (!shoot) return;

    const room = shoot.rooms.find((r) => r.id === roomId);
    if (!room) return;

    updateRoom(roomId, {
      skipped: !room.skipped,
      completed: false,
      actualShots: null,
    });
  };

  const addCustomRoom = (room: Partial<ShootRoom>) => {
    if (!shoot) return;

    const newRoom: ShootRoom = {
      id: nanoid(),
      templateId: '',
      name: room.name ?? 'Custom Room',
      category: room.category ?? 'misc',
      expectedShots: room.expectedShots ?? 1,
      actualShots: null,
      orientation: room.orientation ?? 'H',
      completed: false,
      skipped: false,
      sortOrder: shoot.rooms.length,
      isCustom: true,
      ...room,
    };

    setShoot({
      ...shoot,
      rooms: [...shoot.rooms, newRoom],
    });
  };

  const updateAddress = (address: string) => {
    if (!shoot) return;
    setShoot({ ...shoot, address });
  };

  const updateNotes = (roomId: string, notes: string) => {
    updateRoom(roomId, { notes });
  };

  const updateGlobalNotes = (notes: string) => {
    if (!shoot) return;
    setShoot({ ...shoot, globalNotes: notes });
  };

  const completeShoot = () => {
    if (!shoot) return;

    setShoot({
      ...shoot,
      status: 'completed',
      completedAt: new Date(),
    });
  };

  const clearShoot = () => {
    setShoot(null);
  };

  return {
    shoot,
    startShoot,
    updateRoom,
    updateActualShots,
    toggleComplete,
    toggleSkip,
    addCustomRoom,
    updateAddress,
    updateNotes,
    updateGlobalNotes,
    completeShoot,
    clearShoot,
  };
}

