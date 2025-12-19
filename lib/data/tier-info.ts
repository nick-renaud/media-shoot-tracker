import { TierInfo } from '@/types';

export const TIER_INFO: TierInfo[] = [
  {
    tier: 'basic',
    displayName: '2 BR',
    description: 'Basic',
    targetShots: 40,
  },
  {
    tier: 'standard_3_2',
    displayName: '3 / 2',
    description: 'Standard',
    targetShots: 40,
  },
  {
    tier: 'standard_4_3',
    displayName: '4 / 3',
    description: 'Standard',
    targetShots: 42,
  },
  {
    tier: 'standard_5_3',
    displayName: '5 / 3',
    description: 'Standard',
    targetShots: 45,
  },
  {
    tier: 'deluxe_4_3',
    displayName: '4+ BR',
    description: 'Deluxe',
    targetShots: 45,
  },
  {
    tier: 'deluxe_5_3',
    displayName: '5+ BR',
    description: 'Deluxe',
    targetShots: 48,
  },
  {
    tier: 'custom',
    displayName: 'Luxury / Custom',
    description: '',
    targetShots: 60,
  },
];

export function getTierInfo(tier: string): TierInfo | undefined {
  return TIER_INFO.find((t) => t.tier === tier);
}

