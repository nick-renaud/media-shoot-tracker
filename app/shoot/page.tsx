'use client';

import { useRouter } from 'next/navigation';
import { useShoot } from '@/lib/hooks/useShoot';
import { RoomCategory } from '@/components/RoomCategory';
import { ProgressBar } from '@/components/ProgressBar';
import { AddRoomModal } from '@/components/AddRoomModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { calculateTotals } from '@/lib/utils/calculate-totals';
import { useEffect, useState } from 'react';
import { RoomCategory as RoomCategoryType } from '@/types';

const CATEGORY_ORDER: RoomCategoryType[] = [
  'exteriors',
  'main_living',
  'kitchen_dining',
  'beds_baths',
  'misc',
  'twilights',
];

export default function ShootPage() {
  const router = useRouter();
  const {
    shoot,
    updateActualShots,
    toggleComplete,
    toggleSkip,
    updateNotes,
    addCustomRoom,
    updateAddress,
    updateGlobalNotes,
    completeShoot,
  } = useShoot();

  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (!shoot) {
      router.push('/');
      return;
    }

    if (shoot.status === 'completed') {
      router.push('/shoot/summary');
      return;
    }

    setAddress(shoot.address ?? '');
    setNotes(shoot.globalNotes ?? '');
  }, [shoot, router]);

  if (!shoot) {
    return null;
  }

  const totals = calculateTotals(shoot.rooms);

  const handleComplete = () => {
    if (address) {
      updateAddress(address);
    }
    if (notes) {
      updateGlobalNotes(notes);
    }
    completeShoot();
    router.push('/shoot/summary');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 pb-24">
      <div className="sticky top-0 z-10 bg-background pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{shoot.tierDisplayName}</h1>
            <p className="text-sm text-muted-foreground">
              👤 {shoot.photographer}
            </p>
          </div>
        </div>

        <div className="mt-3">
          <Input
            placeholder="📍 Property address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => address && updateAddress(address)}
          />
        </div>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const categoryRooms = shoot.rooms.filter(
          (r) => r.category === category
        );
        return (
          <RoomCategory
            key={category}
            category={category}
            rooms={categoryRooms}
            onUpdateActualShots={updateActualShots}
            onToggleComplete={toggleComplete}
            onToggleSkip={toggleSkip}
            onUpdateNotes={updateNotes}
          />
        );
      })}

      <AddRoomModal onAddRoom={addCustomRoom} />

      <ProgressBar totals={totals} targetShots={shoot.targetShots} />

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => setShowNotes(!showNotes)}
          className="w-full"
        >
          📝 {showNotes ? 'Hide' : 'Add'} Global Notes
        </Button>

        {showNotes && (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => notes && updateGlobalNotes(notes)}
            placeholder="Add notes about this shoot..."
            className="min-h-[100px]"
          />
        )}

        <Button onClick={handleComplete} className="w-full" size="lg">
          Complete Shoot
        </Button>
      </div>
    </div>
  );
}

