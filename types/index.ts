// Room Categories
export type RoomCategory =
  | 'exteriors'
  | 'main_living'
  | 'kitchen_dining'
  | 'beds_baths'
  | 'misc'
  | 'twilights';

// Property Tiers
export type PropertyTier =
  | 'basic' // 2/1, 2/2, condos
  | 'standard_3_2' // 3+2
  | 'standard_4_3' // 4+3
  | 'standard_5_3' // 5+3
  | 'deluxe_4_3' // 4+3 upscale
  | 'deluxe_5_3' // 5+3 upscale
  | 'custom'; // Luxury/Estate

// Orientation types
export type Orientation = 'H' | 'V' | 'H+V';

// Room Template
export interface RoomTemplate {
  id: string;
  name: string;
  category: RoomCategory;
  orientation: Orientation;
  shots: {
    basic: number;
    standard_3_2: number;
    standard_4_3: number;
    standard_5_3: number;
    deluxe_4_3: number;
    deluxe_5_3: number;
    custom: number;
  };
  // For "Other Bedrooms" and "Other Bathrooms" - these are per-room counts
  isPerRoom?: boolean;
  // Show only if count > 0 for selected tier
  conditionalDisplay: boolean;
}

// Active Shoot Model
export interface Shoot {
  id: string;
  tier: PropertyTier;
  tierDisplayName: string; // "Standard 3+2"
  address?: string;
  photographer: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'active' | 'completed';
  rooms: ShootRoom[];
  globalNotes?: string;
  targetShots: number; // 40, 45, etc.
}

export interface ShootRoom {
  id: string;
  templateId: string;
  name: string;
  category: RoomCategory;
  expectedShots: number; // From matrix based on tier
  actualShots: number | null;
  orientation: Orientation;
  completed: boolean;
  skipped: boolean;
  notes?: string;
  sortOrder: number;
  isCustom: boolean; // Added by user during shoot
}

// Quick Add Room
export interface QuickAddRoom {
  name: string;
  category: RoomCategory;
  orientation: Orientation;
  defaultShots: number;
}

// Shoot Summary
export interface ShootSummary {
  shoot: Shoot;
  totals: {
    expectedTotal: number;
    actualTotal: number;
    variance: number;
    completedCount: number;
    totalCount: number;
    progressPercent: number;
  };
}

// Tier Display Info
export interface TierInfo {
  tier: PropertyTier;
  displayName: string;
  description: string;
  targetShots: number;
}

