
import { PipeSkin } from './types';

export const pipeSkins: PipeSkin[] = [
    {
        id: 'voxel_green',
        name: 'Voxel Green',
        price: 0,
        rarity: 'common',
        style: {
            // Classic Cylinder Green
            bodyGradient: 'linear-gradient(90deg, #166534 0%, #22c55e 20%, #4ade80 45%, #22c55e 55%, #15803d 90%, #14532d 100%)',
            headGradient: 'linear-gradient(90deg, #14532d 0%, #16a34a 20%, #4ade80 45%, #16a34a 55%, #15803d 90%, #052e16 100%)',
            borderColor: '#052e16',
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    },
    {
        id: 'wooden_log',
        name: 'Wooden Log',
        price: 0,
        rarity: 'common',
        style: {
            // Natural Wood Texture
            bodyGradient: 'linear-gradient(90deg, #78350f 0%, #92400e 20%, #b45309 45%, #92400e 55%, #78350f 90%, #451a03 100%)',
            headGradient: 'linear-gradient(90deg, #451a03 0%, #78350f 20%, #b45309 45%, #78350f 55%, #451a03 90%, #2a1202 100%)',
            borderColor: '#451a03',
            shadowColor: 'rgba(0,0,0,0.4)'
        }
    },
    {
        id: 'sugar_cane',
        name: 'Sugar Cane',
        price: 0,
        rarity: 'common',
        style: {
            // Candy Cane 3D
            bodyGradient: 'repeating-linear-gradient(45deg, #991b1b, #991b1b 10px, #fee2e2 10px, #fee2e2 20px)',
            headGradient: 'linear-gradient(90deg, #7f1d1d, #ef4444, #fee2e2, #ef4444, #7f1d1d)',
            borderColor: '#450a0a',
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    },
    {
        id: 'golden_pillars',
        name: 'Golden Pillars',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            // Lux Gold
            bodyGradient: 'linear-gradient(90deg, #713f12 0%, #ca8a04 20%, #fde047 45%, #ca8a04 55%, #713f12 90%, #422006 100%)',
            headGradient: 'linear-gradient(90deg, #713f12 0%, #eab308 20%, #fef08a 45%, #eab308 55%, #713f12 90%, #422006 100%)',
            borderColor: '#422006',
            shadowColor: 'rgba(234, 179, 8, 0.4)'
        }
    },
    {
        id: 'holo_grid',
        name: 'Holo Grid',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            // Neon Cyber Cylinder
            bodyGradient: 'repeating-linear-gradient(0deg, #020617 0px, #0f172a 2px, #0ea5e9 3px, #020617 4px)',
            headGradient: 'linear-gradient(90deg, #0c4a6e, #0ea5e9, #bae6fd, #0ea5e9, #0c4a6e)',
            borderColor: '#0ea5e9',
            shadowColor: '#0ea5e9' // Glow effect handled in component
        }
    },
    {
        id: 'ice_shard',
        name: 'Ice Shard',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            // Icy Blue
            bodyGradient: 'linear-gradient(90deg, #155e75 0%, #22d3ee 30%, #cffafe 50%, #22d3ee 70%, #155e75 100%)',
            headGradient: 'linear-gradient(90deg, #0e7490 0%, #67e8f9 30%, #ecfeff 50%, #67e8f9 70%, #0e7490 100%)',
            borderColor: '#0891b2',
            shadowColor: 'rgba(34, 211, 238, 0.6)'
        }
    },
    {
        id: 'dragon_scale',
        name: 'Dragon Scale',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            // Magma/Dragon Scale Effect
            bodyGradient: 'repeating-linear-gradient(45deg, #450a0a, #7f1d1d 5px, #ef4444 6px, #7f1d1d 7px)',
            headGradient: 'linear-gradient(90deg, #450a0a, #b91c1c, #fca5a5, #b91c1c, #450a0a)',
            borderColor: '#7f1d1d',
            shadowColor: 'rgba(239, 68, 68, 0.8)'
        }
    },
    {
        id: 'obsidian_flow',
        name: 'Obsidian Flow',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            // Dark obsidian with red veins
            bodyGradient: 'linear-gradient(90deg, #1f2937, #000000, #ef4444, #000000, #1f2937)',
            headGradient: 'linear-gradient(90deg, #1f2937, #991b1b, #ef4444, #991b1b, #1f2937)',
            borderColor: '#7f1d1d',
            shadowColor: '#ef4444'
        }
    },
    {
        id: 'nether_spire',
        name: 'Nether Spire',
        price: 799,
        currency: 'diamonds',
        rarity: 'legendary',
        style: {
            // Dark rock with glowing purple veins
            bodyGradient: 'linear-gradient(90deg, #000000 0%, #1f2937 20%, #4c1d95 35%, #581c87 45%, #4c1d95 55%, #1f2937 80%, #000000 100%)',
            headGradient: 'linear-gradient(90deg, #000000 0%, #2e1065 50%, #000000 100%)',
            borderColor: '#581c87',
            shadowColor: '#8b5cf6' // Bright purple glow
        }
    },
    {
        id: 'sanctum_pillar',
        name: 'Sanctum Pillar',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        style: {
            // Marble and Gold
            bodyGradient: 'linear-gradient(90deg, #fefce8 0%, #fef3c7 20%, #ffffff 40%, #fef3c7 60%, #fde68a 80%, #fefce8 100%)',
            headGradient: 'linear-gradient(90deg, #ca8a04 0%, #facc15 50%, #ca8a04 100%)',
            borderColor: '#eab308',
            shadowColor: 'rgba(253, 224, 71, 0.8)'
        }
    }
];
