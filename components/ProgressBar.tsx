import { Progress } from '@/components/ui/progress';
import { ShootTotals } from '@/lib/utils/calculate-totals';

interface ProgressBarProps {
  totals: ShootTotals;
  targetShots: number;
}

export function ProgressBar({ totals, targetShots }: ProgressBarProps) {
  const {
    completedCount,
    totalCount,
    expectedTotal,
    actualTotal,
    variance,
    progressPercent,
  } = totals;

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="font-medium">ROOMS</span>
          <span className="ml-2 text-muted-foreground">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div>
          <span className="font-medium">TARGET</span>
          <span className="ml-2 text-muted-foreground">{expectedTotal}</span>
        </div>
        <div>
          <span className="font-medium">ACTUAL</span>
          <span className="ml-2 text-muted-foreground">{actualTotal}</span>
        </div>
      </div>

      <Progress value={progressPercent} className="h-2" />

      <div className="flex items-center justify-between text-sm">
        <div className="text-muted-foreground">{progressPercent}%</div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <span className="font-medium">Target: {targetShots} shots</span>
        </div>
      </div>

      {variance !== 0 && (
        <div
          className={`text-center text-sm font-medium ${
            variance > 0 ? 'text-green-600' : 'text-amber-600'
          }`}
        >
          {variance > 0 ? '+' : ''}
          {variance} vs expected
        </div>
      )}
    </div>
  );
}

