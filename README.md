# 323 Media Shoot List App

A mobile-first Progressive Web App (PWA) built with Next.js and Tailwind CSS that enables 323 Media photographers to efficiently track photo shoots in the field. The app replaces manual notebook tracking with template-based digital checklists, reducing shoot setup time by 5-10 minutes and ensuring consistent photo delivery.

**Target:** ~40 photos for standard shoots, 45-50 for larger/deluxe properties
**Coverage:** 95%+ of Tallahassee residential market

## Features

- 📱 **Mobile-First PWA** - Install on your phone and use offline
- 🏠 **Property Tier Templates** - Pre-configured shot lists for different property types
- ✅ **Real-Time Tracking** - Check off rooms as you shoot
- 📊 **Progress Monitoring** - See expected vs actual shot counts
- 📝 **Notes & Skipping** - Add notes to rooms or skip them with reasons
- ➕ **Custom Rooms** - Quick-add common rooms or create custom entries
- 💾 **Auto-Save** - All data persists in localStorage
- 🎯 **Target Goals** - Track progress toward target shot counts

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State Management:** React Hooks + localStorage
- **Code Quality:** ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/nick-renaud/media-shoot-tracker.git
cd media-shoot-tracker

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
media-shoot-tracker/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home - tier selection
│   ├── shoot/
│   │   ├── page.tsx         # Active shoot tracking
│   │   └── summary/
│   │       └── page.tsx     # Completion summary
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── TemplateSelector.tsx
│   ├── RoomCard.tsx
│   ├── RoomCategory.tsx
│   ├── ProgressBar.tsx
│   ├── AddRoomModal.tsx
│   ├── ShootSummary.tsx
│   └── OrientationBadge.tsx
├── lib/
│   ├── data/               # Data models
│   │   ├── room-templates.ts    # Nathan Cool shot matrix
│   │   ├── quick-add-rooms.ts   # Quick-add options
│   │   └── tier-info.ts         # Property tier info
│   ├── hooks/              # React hooks
│   │   ├── useShoot.ts          # Shoot state management
│   │   └── useLocalStorage.ts   # localStorage hook
│   └── utils/              # Utility functions
│       ├── generate-rooms.ts    # Room list generation
│       └── calculate-totals.ts  # Math helpers
├── types/
│   └── index.ts            # TypeScript types
└── public/
    └── manifest.json       # PWA manifest
```

## Property Tiers

| Tier | Description | Beds + Baths | Target Shots |
|------|-------------|--------------|--------------|
| Basic | Small homes, condos | 2/1, 2/2 | ~40 |
| Standard S | Typical starter home | 3+2 | ~40 |
| Standard M | Mid-size home | 4+3 | ~42 |
| Standard L | Larger home | 5+3 | ~45 |
| Deluxe M | Upscale 4BR | 4+3 | ~45 |
| Deluxe L | Upscale 5BR+ | 5+3 | ~48 |
| Custom/Luxury | Estate, luxury | N/A | ~55-65 |

## Room Categories

1. **Exteriors** - Front wide, walkup, back wide, pool/spa, details, views
2. **Main Living Area** - Grand entrance, open concept, living room, family room, fireplace, staircase
3. **Kitchen, Dining** - Kitchen, eat-in kitchen, indoor-outdoor, dining room
4. **Beds, Baths** - Master bedroom/bathroom/closet, other bedrooms/bathrooms
5. **Misc** - Den/office, laundry, media room, detail shots, community
6. **Twilights** - Exterior front, backyard/pool/spa, views

## Development

### Code Quality

The project uses strict TypeScript configuration:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitOverride: true`

ESLint and Prettier are configured for consistent code style.

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

This project is proprietary software for 323 Media.

## Acknowledgments

- Shot matrix designed by Nathan Cool
- Built for 323 Media photographers in Tallahassee, FL
