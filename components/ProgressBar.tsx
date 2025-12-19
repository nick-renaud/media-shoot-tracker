'use client';

import { ShootTotals } from '@/lib/utils/calculate-totals';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircleIcon,
  CameraIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface ProgressBarProps {
  totals: ShootTotals;
  targetShots: number;
}

export function ProgressBar({ totals, targetShots }: ProgressBarProps) {
  const varianceColor =
    totals.variance >= 0
      ? 'text-emerald-600'
      : totals.variance >= -5
        ? 'text-amber-600'
        : 'text-rose-600';

  const varianceSign = totals.variance > 0 ? '+' : '';

  return (
    <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
      <div className="mx-auto max-w-2xl space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Progress</span>
            <span className="font-semibold text-slate-900">
              {totals.progressPercent}%
            </span>
          </div>
          <Progress value={totals.progressPercent} className="h-2" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Rooms completed */}
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-100 p-2">
              <CheckCircleIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Rooms</div>
              <div className="text-sm font-semibold text-slate-900">
                {totals.completedCount}/{totals.totalCount}
              </div>
            </div>
          </div>

          {/* Shots taken */}
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-100 p-2">
              <CameraIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Shots</div>
              <div className="text-sm font-semibold text-slate-900">
                {totals.actualTotal}/{targetShots}
              </div>
            </div>
          </div>

          {/* Variance */}
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-slate-100 p-2">
              <ChartBarIcon className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Variance</div>
              <div className={`text-sm font-semibold ${varianceColor}`}>
                {varianceSign}
                {totals.variance}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
