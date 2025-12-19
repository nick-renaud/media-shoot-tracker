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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-8 py-12">
        <div className="animate-in fade-in slide-in-from-top-4 text-center duration-700">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
            Professional Photo Tracking
          </div>
          <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            323 Media Shoot List
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Select a property tier to begin tracking your shoot
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const info = TIER_INFO[tier];
            const Icon = TIER_ICONS[tier];

            return (
              <button
                key={tier}
                onClick={() => onSelectTier(tier)}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-4 group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />

                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="relative rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 p-3 transition-all duration-300 group-hover:from-indigo-200 group-hover:to-indigo-100 group-hover:shadow-lg">
                      <Icon className="h-6 w-6 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-slate-100 to-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
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

        <div className="animate-in fade-in slide-in-from-bottom-4 pt-8 text-center duration-1000">
          <p className="text-sm text-slate-500">
            Built for professional photographers • Track shots in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
