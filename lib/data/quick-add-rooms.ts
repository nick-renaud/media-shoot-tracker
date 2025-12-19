import { QuickAddRoom } from '@/types';

export const QUICK_ADD_ROOMS: QuickAddRoom[] = [
  // Exterior additions
  {
    name: 'Screened Porch',
    category: 'exteriors',
    orientation: 'H',
    defaultShots: 2,
  },
  {
    name: 'Covered Patio',
    category: 'exteriors',
    orientation: 'H',
    defaultShots: 2,
  },
  { name: 'Deck', category: 'exteriors', orientation: 'H', defaultShots: 2 },
  {
    name: 'Outdoor Kitchen',
    category: 'exteriors',
    orientation: 'H',
    defaultShots: 2,
  },
  {
    name: 'Dock/Boathouse',
    category: 'exteriors',
    orientation: 'H',
    defaultShots: 2,
  },

  // Main living additions
  {
    name: 'Bonus Room',
    category: 'main_living',
    orientation: 'H',
    defaultShots: 2,
  },
  {
    name: 'Sunroom',
    category: 'main_living',
    orientation: 'H',
    defaultShots: 2,
  },
  {
    name: 'Florida Room',
    category: 'main_living',
    orientation: 'H',
    defaultShots: 2,
  },

  // Kitchen/Dining additions
  {
    name: 'Breakfast Nook',
    category: 'kitchen_dining',
    orientation: 'H',
    defaultShots: 1,
  },
  {
    name: "Butler's Pantry",
    category: 'kitchen_dining',
    orientation: 'V',
    defaultShots: 1,
  },
  {
    name: 'Pantry',
    category: 'kitchen_dining',
    orientation: 'V',
    defaultShots: 1,
  },

  // Beds/Baths additions
  {
    name: 'Guest Suite',
    category: 'beds_baths',
    orientation: 'H',
    defaultShots: 2,
  },
  {
    name: 'Half Bath',
    category: 'beds_baths',
    orientation: 'V',
    defaultShots: 1,
  },

  // Misc additions
  {
    name: 'Game Room',
    category: 'misc',
    orientation: 'H',
    defaultShots: 2,
  },
  {
    name: 'Wine Room',
    category: 'misc',
    orientation: 'H',
    defaultShots: 1,
  },
  {
    name: 'Gym/Fitness',
    category: 'misc',
    orientation: 'H',
    defaultShots: 2,
  },
  {
    name: 'Workshop',
    category: 'misc',
    orientation: 'H',
    defaultShots: 1,
  },
  { name: 'Garage', category: 'misc', orientation: 'H', defaultShots: 2 },
  { name: 'Storage', category: 'misc', orientation: 'V', defaultShots: 1 },
];

