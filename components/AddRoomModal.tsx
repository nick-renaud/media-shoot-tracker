'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QUICK_ADD_ROOMS } from '@/lib/data/quick-add-rooms';
import { RoomCategory, Orientation, ShootRoom } from '@/types';

interface AddRoomModalProps {
  onAddRoom: (room: Partial<ShootRoom>) => void;
}

export function AddRoomModal({ onAddRoom }: AddRoomModalProps) {
  const [open, setOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customShots, setCustomShots] = useState(1);

  const handleQuickAdd = (
    name: string,
    category: RoomCategory,
    orientation: Orientation,
    shots: number
  ) => {
    onAddRoom({
      name,
      category,
      orientation,
      expectedShots: shots,
    });
    setOpen(false);
  };

  const handleCustomAdd = () => {
    if (!customName.trim()) return;

    onAddRoom({
      name: customName,
      category: 'misc',
      orientation: 'H',
      expectedShots: customShots,
    });

    setCustomName('');
    setCustomShots(1);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          + ADD ROOM
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">Quick Add</h3>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ADD_ROOMS.map((room, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuickAdd(
                      room.name,
                      room.category,
                      room.orientation,
                      room.defaultShots
                    )
                  }
                  className="justify-start text-left"
                >
                  {room.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-2 font-semibold">Custom Room</h3>
            <div className="space-y-3">
              <Input
                placeholder="Room name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <label className="text-sm">Expected shots:</label>
                <Input
                  type="number"
                  min="1"
                  value={customShots}
                  onChange={(e) => setCustomShots(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
              </div>
              <Button onClick={handleCustomAdd} className="w-full">
                Add Custom Room
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

