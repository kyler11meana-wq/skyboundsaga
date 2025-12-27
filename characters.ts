
import { Character } from './types';

export const characters: Character[] = [
    {
        id: 'default',
        name: 'Retro Pip',
        price: 0,
        rarity: 'common',
        style: {
            // Gold Sphere
            body: 'radial-gradient(circle at 30% 30%, #FACC15, #CA8A04)', 
            belly: 'linear-gradient(to bottom, #FEF08A, #FDE047)',
            beak: 'linear-gradient(to bottom right, #F97316, #C2410C)',
            wing: 'linear-gradient(to bottom, #EAB308, #854D0E)',
        }
    },
    {
        id: 'cloud_puff',
        name: 'Cloud Puff',
        price: 0,
        rarity: 'common',
        style: {
            // Soft White Matte
            body: 'radial-gradient(circle at 30% 30%, #ffffff, #cbd5e1)',
            belly: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
            beak: 'linear-gradient(to bottom right, #fbbf24, #d97706)',
            wing: 'linear-gradient(to bottom, #e2e8f0, #94a3b8)',
            extra: {
                crest: { shape: 'tuft', color: '#f1f5f9' },
                tail: { shape: 'wisp', color: '#f1f5f9' }
            }
        }
    },
    {
        id: 'aqua_pip',
        name: 'Aqua Pip',
        price: 0,
        rarity: 'common',
        style: {
            // Bright Blue
            body: 'radial-gradient(circle at 30% 30%, #38bdf8, #0284c7)',
            belly: 'linear-gradient(to bottom, #e0f2fe, #bae6fd)',
            beak: 'linear-gradient(to bottom right, #fbbf24, #d97706)',
            wing: 'linear-gradient(to bottom, #7dd3fc, #0369a1)',
            extra: {
                crest: { shape: 'standard', color: '#0ea5e9' }
            }
        }
    },
    {
        id: 'crimson_wing',
        name: 'Crimson Wing',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            // Metallic Red
            body: 'radial-gradient(circle at 40% 40%, #ef4444, #991b1b)',
            belly: 'linear-gradient(to bottom, #fee2e2, #fca5a5)',
            beak: 'linear-gradient(to bottom right, #f59e0b, #d97706)',
            wing: 'linear-gradient(to bottom, #b91c1c, #7f1d1d)',
            extra: {
                crest: { shape: 'spikes', color: '#b91c1c' },
                tail: { shape: 'sharp', color: '#b91c1c' },
                eyeColor: '#fbbf24',
                glow: 'rgba(239, 68, 68, 0.4)'
            }
        }
    },
    {
        id: 'neon_glider',
        name: 'Neon Glider',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            // Glowing Blue Glass
            body: 'radial-gradient(circle at 40% 40%, #38bdf8, #0284c7)',
            belly: 'linear-gradient(to bottom, #e0f2fe, #bae6fd)',
            beak: 'linear-gradient(to bottom right, #fb7185, #e11d48)',
            wing: 'linear-gradient(to bottom, #0ea5e9, #0369a1)',
            extra: {
                glow: '#0ea5e9',
                eyeColor: '#f43f5e',
                bodyMarking: { type: 'lines', color: 'rgba(255,255,255,0.8)' }
            }
        }
    },
    {
        id: 'azure_wing',
        name: 'Azure Wing',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            // Metallic Cyan/Blue
            body: 'radial-gradient(circle at 40% 40%, #22d3ee, #0891b2)',
            belly: 'linear-gradient(to bottom, #ecfeff, #cffafe)',
            beak: 'linear-gradient(to bottom right, #fcd34d, #d97706)',
            wing: 'linear-gradient(to bottom, #0e7490, #155e75)',
            extra: {
                crest: { shape: 'sharp', color: '#0e7490' },
                tail: { shape: 'sharp', color: '#0e7490' },
                eyeColor: '#ffffff',
                glow: 'rgba(34, 211, 238, 0.4)'
            }
        }
    },
    {
        id: 'gilded_guardian',
        name: 'Gilded Guardian',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            // Gold and Royal Purple
            body: 'radial-gradient(circle at 30% 30%, #fde047, #ca8a04, #854d0e)',
            belly: 'linear-gradient(to bottom, #faf5ff, #e9d5ff)',
            beak: 'linear-gradient(to bottom right, #e879f9, #a21caf)',
            wing: 'linear-gradient(to bottom, #a855f7, #6b21a8)',
            extra: {
                crest: { shape: 'plume', color: '#7e22ce' },
                tail: { shape: 'fan', color: '#7e22ce' },
                eyeColor: '#3b82f6',
                glow: 'rgba(234, 179, 8, 0.6)',
                bodyMarking: { type: 'lines', color: '#a855f7' }
            }
        }
    },
    {
        id: 'phoenix_reborn',
        name: 'Phoenix Reborn',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            // Fiery Phoenix
            body: 'radial-gradient(circle at 40% 40%, #fca5a5, #ef4444, #7f1d1d)',
            belly: 'linear-gradient(to bottom, #ffedd5, #fdba74)',
            beak: 'linear-gradient(to bottom right, #fde047, #d97706)',
            wing: 'linear-gradient(to bottom, #f87171, #b91c1c)',
            extra: {
                crest: { shape: 'plume', color: '#fca5a5' },
                tail: { shape: 'fan', color: '#ef4444' },
                eyeColor: '#fcd34d',
                glow: 'rgba(239, 68, 68, 0.8)',
                bodyMarking: { type: 'swirl', color: '#7f1d1d' }
            }
        }
    },
    {
        id: 'void_walker',
        name: 'Void Walker',
        price: 799,
        currency: 'diamonds',
        rarity: 'legendary',
        style: {
            // Dark Void Theme
            body: 'radial-gradient(circle at 30% 30%, #4c1d95, #000000)',
            belly: 'linear-gradient(to bottom, #7c3aed, #4c1d95)',
            beak: 'linear-gradient(to bottom right, #a855f7, #6b21a8)',
            wing: 'linear-gradient(to bottom, #000000, #2e1065)',
            extra: {
                crest: { shape: 'sharp', color: '#000000' },
                tail: { shape: 'wisp', color: '#7c3aed' },
                eyeColor: '#ef4444', 
                glow: 'rgba(124, 58, 237, 0.8)',
                bodyMarking: { type: 'cracks', color: '#c084fc' }
            }
        }
    },
    {
        id: 'seraphim',
        name: 'Seraphim',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        style: {
            // Divine White/Gold Light
            body: 'radial-gradient(circle at 30% 30%, #ffffff, #fefce8)',
            belly: 'linear-gradient(to bottom, #fff7ed, #fef3c7)',
            beak: 'linear-gradient(to bottom right, #fde047, #eab308)',
            wing: 'linear-gradient(to bottom, #ffffff, #fef08a)',
            extra: {
                crest: { shape: 'plume', color: '#fef08a' },
                tail: { shape: 'fan', color: '#fef08a' },
                eyeColor: '#38bdf8',
                glow: 'rgba(255, 255, 255, 0.9)',
                bodyMarking: { type: 'swirl', color: '#eab308' }
            }
        }
    }
];
