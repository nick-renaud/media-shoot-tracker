import { Shoot } from '@/types';
import { ShootTotals } from '@/lib/utils/calculate-totals';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  const completedRooms = shoot.rooms.filter((r) => r.completed && !r.skipped);
  const skippedRooms = shoot.rooms.filter((r) => r.skipped);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Shoot Complete! 🎉</h1>
        <p className="mt-2 text-muted-foreground">{shoot.tierDisplayName}</p>
        {shoot.address && (
          <p className="text-sm text-muted-foreground">{shoot.address}</p>
        )}
      </div>

      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Photographer:</span>
            <span className="font-medium">{shoot.photographer}</span>
          </div>
          <div className="flex justify-between">
            <span>Rooms Completed:</span>
            <span className="font-medium">
              {totals.completedCount} / {totals.totalCount}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Expected Shots:</span>
            <span className="font-medium">{totals.expectedTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Actual Shots:</span>
            <span className="font-medium">{totals.actualTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Target:</span>
            <span className="font-medium">{shoot.targetShots}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Variance:</span>
            <span
              className={`font-semibold ${
                totals.variance >= 0 ? 'text-green-600' : 'text-amber-600'
              }`}
            >
              {totals.variance > 0 ? '+' : ''}
              {totals.variance}
            </span>
          </div>
        </div>
      </Card>

      {skippedRooms.length > 0 && (
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Skipped Rooms ({skippedRooms.length})
          </h2>
          <ul className="space-y-1 text-sm">
            {skippedRooms.map((room) => (
              <li key={room.id} className="text-muted-foreground">
                • {room.name}
                {room.notes && ` - ${room.notes}`}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {shoot.globalNotes && (
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Notes</h2>
          <p className="whitespace-pre-wrap text-sm">{shoot.globalNotes}</p>
        </Card>
      )}

      <Button onClick={onStartNew} className="w-full" size="lg">
        Start New Shoot
      </Button>
    </div>
  );
}

