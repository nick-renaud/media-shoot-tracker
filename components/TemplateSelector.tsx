'use client';

import { PropertyTier } from '@/types';
import { Card } from '@/components/ui/card';
import { TIER_INFO } from '@/lib/data/tier-info';

interface TemplateSelectorProps {
  onSelectTier: (tier: PropertyTier) => void;
}

export function TemplateSelector({ onSelectTier }: TemplateSelectorProps) {
  const standardTiers = TIER_INFO.filter(
    (t) =>
      t.tier === 'basic' ||
      t.tier === 'standard_3_2' ||
      t.tier === 'standard_4_3' ||
      t.tier === 'standard_5_3'
  );

  const deluxeTiers = TIER_INFO.filter(
    (t) => t.tier === 'deluxe_4_3' || t.tier === 'deluxe_5_3'
  );

  const customTier = TIER_INFO.find((t) => t.tier === 'custom');

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">323 MEDIA</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Photo Shoot List
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-center text-lg font-semibold">
          SELECT PROPERTY TYPE
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {standardTiers.map((tier) => (
            <Card
              key={tier.tier}
              className="cursor-pointer p-6 text-center transition-all hover:border-primary hover:shadow-md"
              onClick={() => onSelectTier(tier.tier)}
            >
              <div className="text-xl font-bold">{tier.displayName}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                ~{tier.targetShots} shots
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                ({tier.description})
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {deluxeTiers.map((tier) => (
            <Card
              key={tier.tier}
              className="cursor-pointer p-6 text-center transition-all hover:border-primary hover:shadow-md"
              onClick={() => onSelectTier(tier.tier)}
            >
              <div className="text-xl font-bold">{tier.displayName}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                ~{tier.targetShots} shots
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                ({tier.description})
              </div>
            </Card>
          ))}
        </div>

        {customTier && (
          <Card
            className="mt-4 cursor-pointer p-6 text-center transition-all hover:border-primary hover:shadow-md"
            onClick={() => onSelectTier(customTier.tier)}
          >
            <div className="text-xl font-bold">{customTier.displayName}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              ~{customTier.targetShots}+ shots
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

