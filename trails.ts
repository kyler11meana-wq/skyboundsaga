
import { Trail } from './types';

export const trails: Trail[] = [
    {
        id: 'bit_stream',
        name: 'Bit Stream',
        price: 0,
        rarity: 'common',
        style: { 
            colors: ['#4ade80', '#22c55e', '#16a34a'],
            extra: {
                particleShape: 'square',
                effect: 'disintegrate'
            }
        }
    },
    {
        id: 'wind_gust',
        name: 'Wind Gust',
        price: 0,
        rarity: 'common',
        style: {
            colors: ['#ffffff', '#e2e8f0', '#cbd5e1'],
            extra: {
                particleShape: 'line',
                effect: 'none'
            }
        }
    },
    {
        id: 'rainbow_dust',
        name: 'Rainbow Dust',
        price: 0,
        rarity: 'common',
        style: {
            colors: ['#ef4444', '#f59e0b', '#fde047', '#22c55e', '#3b82f6', '#a855f7'],
            extra: {
                particleShape: 'sparkle',
                effect: 'flicker'
            }
        }
    },
    {
        id: 'stardust',
        name: 'Stardust',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            colors: ['#fef08a', '#fde047', '#ffffff'],
            extra: {
                particleShape: 'star',
                effect: 'glow'
            }
        }
    },
    {
        id: 'plasma',
        name: 'Plasma',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            colors: ['#22d3ee', '#818cf8', '#c084fc'],
            extra: {
                particleShape: 'swirl',
                effect: 'spiral'
            }
        }
    },
    {
        id: 'frost_path',
        name: 'Frost Path',
        price: 299,
        currency: 'diamonds',
        rarity: 'rare',
        style: {
            colors: ['#a5f3fc', '#cffafe', '#ffffff'],
            extra: {
                particleShape: 'sparkle',
                effect: 'glow'
            }
        }
    },
    {
        id: 'void_essence',
        name: 'Void Essence',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            colors: ['#2e1065', '#4c1d95', '#a855f7', '#000000'],
            extra: {
                particleShape: 'swirl',
                effect: 'spiral'
            }
        }
    },
    {
        id: 'quantum_rift',
        name: 'Quantum Rift',
        price: 499,
        currency: 'diamonds',
        rarity: 'deluxe',
        style: {
            colors: ['#000000', '#8b5cf6', '#d946ef', '#ffffff'],
            extra: {
                particleShape: 'swirl',
                effect: 'disintegrate'
            }
        }
    },
    {
        id: 'shadow_step',
        name: 'Shadow Step',
        price: 799,
        currency: 'diamonds',
        rarity: 'legendary',
        style: {
            colors: ['#000000', '#4c1d95', '#7c3aed', '#000000'],
            extra: {
                particleShape: 'swirl',
                effect: 'disintegrate'
            }
        }
    },
    {
        id: 'divine_aura',
        name: 'Divine Aura',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        style: {
            colors: ['#fef3c7', '#fcd34d', '#ffffff'],
            extra: {
                particleShape: 'rune',
                effect: 'glow'
            }
        }
    }
];
