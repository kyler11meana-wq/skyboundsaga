
import { BackgroundInfo } from './types';

export const backgrounds: BackgroundInfo[] = [
    {
        id: 'default',
        name: 'Pixel Plains',
        price: 0,
        rarity: 'common',
        style: {
            background: 'linear-gradient(to bottom, #38bdf8, #bae6fd)',
            scenery: 'hills',
            extra: { sun: true }
        }
    },
    {
        id: 'forest_dawn',
        name: 'Forest Dawn',
        price: 0,
        rarity: 'common',
        style: {
            // Enhanced dawn gradient: Cyan -> Pale Yellow -> Peach -> Light Green
            background: 'linear-gradient(to bottom, #a5f3fc 0%, #cffafe 40%, #fef08a 70%, #fdba74 100%)',
            scenery: 'forest',
            extra: { 
                sun: true,
                fog: true, // Morning mist
                godRays: true
            }
        }
    },
    {
        id: 'candy_kingdom',
        name: 'Candy Kingdom',
        price: 0,
        rarity: 'common',
        style: {
            // "Cotton Candy" Sky - Soft Pink to Cyan/White
            background: 'linear-gradient(to bottom, #ffdde1, #ee9ca7 40%, #a7bfe8 100%)', 
            scenery: 'candy_hills',
            extra: { 
                foregroundScenery: 'candy',
                bubbles: true,
                sun: true
            }
        }
    },
    {
        id: 'crystal_caverns',
        name: 'Crystal Caverns',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            background: 'linear-gradient(to bottom, #2e1065, #4c1d95, #581c87)', // Deep Purple
            scenery: 'mountains', // Placeholder for geometry
            extra: {
                foregroundScenery: 'crystals',
                hasStars: true,
                fog: true
            }
        }
    },
    {
        id: 'neon_city',
        name: 'Neon City',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            background: 'linear-gradient(to bottom, #0f172a, #1e1b4b)', // Slate to Indigo
            scenery: 'mountains', // Base
            extra: {
                distantScenery: 'neon_city',
                dataLines: true,
                hasStars: true
            }
        }
    },
    {
        id: 'midnight_city',
        name: 'Midnight City',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            background: 'linear-gradient(to bottom, #020617, #172554, #1e3a8a)', // Dark Blue Night
            scenery: 'mountains', // Base
            extra: {
                distantScenery: 'cyber_buildings',
                shootingStars: true,
                dataLines: true
            }
        }
    },
    {
        id: 'olympus',
        name: 'Olympus',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            // Divine Gold/Orange/White
            background: 'linear-gradient(to bottom, #fef3c7, #fcd34d, #f59e0b)', 
            scenery: 'olympus',
            extra: {
                distantScenery: 'floating_islands',
                sun: true,
                fallingPetals: 'sakura', // Reused for divine effect
                bubbles: true
            }
        }
    },
    {
        id: 'cyber_void',
        name: 'Cyber Void',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            background: 'linear-gradient(to bottom, #000000, #111827, #1f2937)',
            scenery: 'mountains', 
            extra: {
                distantScenery: 'neon_city',
                dataLines: true,
                glowingEyes: true,
                fog: true
            }
        }
    },
    {
        id: 'abyssal_plane',
        name: 'Abyssal Plane',
        price: 799,
        currency: 'diamonds',
        rarity: 'legendary',
        style: {
            // Deep Void
            background: 'linear-gradient(to bottom, #000000, #2e1065, #000000)',
            scenery: 'mountains', 
            extra: {
                distantScenery: 'floating_islands', 
                fog: true,
                glowingEyes: true,
                shootingStars: true
            }
        }
    },
    {
        id: 'heavens_gate',
        name: 'Elysium Spire',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        style: {
            // Majestic Deep Blue/Gold/White shift
            background: 'linear-gradient(to bottom, #1e3a8a 0%, #3b82f6 40%, #fef3c7 80%, #fffbeb 100%)',
            scenery: 'elysium',
            extra: {
                distantScenery: 'elysium_spires',
                sun: true, // Used as a divine source light
                godRays: true,
                floatingRunes: true,
                fallingPetals: 'divine',
            }
        }
    }
];
