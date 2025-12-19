#!/bin/bash

# TemplateSelector
cat > components/TemplateSelector.tsx << 'EOF'
'use client';

import { PropertyTier } from '@/types';
import { TIER_INFO } from '@/lib/data/tier-info';
import { HomeIcon, BuildingOfficeIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

interface TemplateSelectorProps {
  onSelectTier: (tier: PropertyTier) => void;
}

const TIER_ICONS: Record<PropertyTier, any> = {
  basic: HomeIcon,
  standard_3_2: HomeIcon,
  standard_4_3: BuildingOfficeIcon,
  standard_5_3: BuildingOfficeIcon,
  deluxe_4_3: BuildingOffice2Icon,
  deluxe_5_3: BuildingOffice2Icon,
  custom: BuildingOffice2Icon,
};

export function TemplateSelector({ onSelectTier }: TemplateSelectorProps) {
  const tiers: PropertyTier[] = [
    'basic',
    'standard_3_2',
    'standard_4_3',
    'standard_5_3',
    'deluxe_4_3',
    'deluxe_5_3',
    'custom',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            323 Media Shoot List
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Select a property tier to begin tracking your shoot
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => {
            const info = TIER_INFO[tier];
            const Icon = TIER_ICONS[tier];

            return (
              <button
                key={tier}
                onClick={() => onSelectTier(tier)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-indigo-300 hover:shadow-xl active:scale-[0.98]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-indigo-100 p-3 group-hover:bg-indigo-200">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      ~{info.targetShots} shots
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {info.displayName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Target: {info.targetShots} photos
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
EOF

# AddRoomModal
cat > components/AddRoomModal.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUICK_ADD_ROOMS } from '@/lib/data/quick-add-rooms';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface AddRoomModalProps {
  onAddRoom: (name: string, expectedShots: number) => void;
}

export function AddRoomModal({ onAddRoom }: AddRoomModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customShots, setCustomShots] = useState('');

  const handleQuickAdd = (name: string, shots: number) => {
    onAddRoom(name, shots);
    setIsOpen(false);
  };

  const handleCustomAdd = () => {
    const shots = parseInt(customShots);
    if (customName.trim() && !isNaN(shots) && shots > 0) {
      onAddRoom(customName, shots);
      setCustomName('');
      setCustomShots('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50"
      >
        <PlusCircleIcon className="mr-2 h-5 w-5" />
        Add Room
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900">Add Room</h2>
            <p className="mt-2 text-sm text-slate-600">
              Quick-add a common room or create a custom entry
            </p>

            <div className="mt-6 space-y-6">
              {/* Quick add */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Quick Add
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {QUICK_ADD_ROOMS.map((room) => (
                    <button
                      key={room.id}
                      onClick={() =>
                        handleQuickAdd(room.name, room.defaultShots)
                      }
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition-all hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <div>{room.name}</div>
                      <div className="text-xs text-slate-500">
                        {room.defaultShots} shots
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Custom Room
                </h3>
                <div className="mt-3 space-y-3">
                  <Input
                    placeholder="Room name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Expected shots"
                    value={customShots}
                    onChange={(e) => setCustomShots(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleCustomAdd} className="flex-1">
                Add Custom Room
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
EOF

# ShootSummary
cat > components/ShootSummary.tsx << 'EOF'
'use client';

import { Shoot } from '@/types';
import { ShootTotals } from '@/lib/utils/calculate-totals';
import { Button } from '@/components/ui/button';
import {
  CheckCircleIcon,
  CameraIcon,
  UserIcon,
  MapPinIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface ShootSummaryProps {
  shoot: Shoot;
  totals: ShootTotals;
  onStartNew: () => void;
}

export function ShootSummary({
  shoot,
  totals,
  onStartNew,
}: ShootSummaryProps) {
  const skippedRooms = shoot.rooms.filter((r) => r.skipped);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6">
      <div className="mx-auto max-w-2xl space-y-6 py-12">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
            <CheckCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">
            Shoot Complete!
          </h1>
          <p className="mt-2 text-lg text-slate-600">{shoot.tierDisplayName}</p>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-3">
                <UserIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Photographer</div>
                <div className="font-semibold text-slate-900">
                  {shoot.photographer}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <CameraIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Total Shots</div>
                <div className="font-semibold text-slate-900">
                  {totals.actualTotal} / {shoot.targetShots}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Rooms Completed</span>
              <span className="font-semibold text-slate-900">
                {totals.completedCount} / {totals.totalCount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Expected Shots</span>
              <span className="font-semibold text-slate-900">
                {totals.expectedTotal}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Actual Shots</span>
              <span className="font-semibold text-slate-900">
                {totals.actualTotal}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-sm">
              <span className="font-semibold text-slate-900">Variance</span>
              <span
                className={`font-semibold ${
                  totals.variance >= 0 ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {totals.variance > 0 ? '+' : ''}
                {totals.variance}
              </span>
            </div>
          </div>
        </div>

        {/* Skipped rooms */}
        {skippedRooms.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Skipped Rooms ({skippedRooms.length})
            </h2>
            <ul className="mt-4 space-y-2">
              {skippedRooms.map((room) => (
                <li key={room.id} className="text-sm text-slate-600">
                  • {room.name}
                  {room.notes && ` - ${room.notes}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {shoot.globalNotes && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
              {shoot.globalNotes}
            </p>
          </div>
        )}

        {/* Action button */}
        <Button onClick={onStartNew} className="w-full" size="lg">
          Start New Shoot
        </Button>
      </div>
    </div>
  );
}
EOF

chmod +x create-remaining-components.sh
