import { TierInfo, PropertyTier } from '@/types';

export const TIER_INFO: Record<PropertyTier, TierInfo> = {
  basic: {
    tier: 'basic',
    displayName: '2 BR',
    description: 'Basic',
    targetShots: 40,
  },
  standard_3_2: {
    tier: 'standard_3_2',
    displayName: '3 / 2',
    description: 'Standard',
    targetShots: 40,
  },
  standard_4_3: {
    tier: 'standard_4_3',
    displayName: '4 / 3',
    description: 'Standard',
    targetShots: 42,
  },
  standard_5_3: {
    tier: 'standard_5_3',
    displayName: '5 / 3',
    description: 'Standard',
    targetShots: 45,
  },
  deluxe_4_3: {
    tier: 'deluxe_4_3',
    displayName: '4+ BR',
    description: 'Deluxe',
    targetShots: 45,
  },
  deluxe_5_3: {
    tier: 'deluxe_5_3',
    displayName: '5+ BR',
    description: 'Deluxe',
    targetShots: 48,
  },
  custom: {
    tier: 'custom',
    displayName: 'Luxury / Custom',
    description: '',
    targetShots: 60,
  },
};

export function getTierInfo(tier: PropertyTier): TierInfo {
  return TIER_INFO[tier];
}

