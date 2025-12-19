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
    <div className="mx-auto max-w-3xl space-y-8 p-6 pb-32">
      <div className="sticky top-0 z-10 -mx-6 bg-gradient-to-b from-white via-white to-transparent px-6 pb-6 pt-4">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
              <span className="text-2xl font-bold text-white">{shoot.tierDisplayName.split(' ')[0]}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{shoot.photographer}</h1>
              <p className="text-base font-medium text-slate-500">{shoot.tierDisplayName}</p>
            </div>
          </div>

          <Input
            placeholder="Property address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={() => address && updateAddress(address)}
            className="h-12 border-slate-300 text-base"
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

