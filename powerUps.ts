
import { Rarity } from './types';

export interface PowerUp {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: 'diamonds';
    rarity: Rarity;
    type: 'score_mult' | 'reward_mult' | 'active' | 'revive_mult' | 'star_mult';
    value?: number; // Multiplier value
    cooldown?: number; // in ms
    duration?: number; // in ms
    icon?: string;
    key?: string;
}

export const powerUps: PowerUp[] = [
    {
        id: 'timelapse',
        name: 'Timelapse',
        description: 'Active Ability: Slow motion matrix mode! (8s Duration, 10s Cooldown)',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        type: 'active',
        duration: 8000,
        cooldown: 10000,
        icon: '⏳',
        key: 'X'
    },
    {
        id: 'echo_cloak',
        name: 'Echo Cloak',
        description: 'Active Ability: Massive sound waves push obstacles away! (6s Duration, 6s Cooldown)',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        type: 'active',
        duration: 6000,
        cooldown: 6000,
        icon: '🔊',
        key: 'C'
    },
    {
        id: 'sunbeam_dash',
        name: 'Sunbeam Dash',
        description: 'Active Ability: Instant burst of holy light! (2s Duration, 5s Cooldown)',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        type: 'active',
        duration: 2000,
        cooldown: 5000,
        icon: '☀️',
        key: 'V'
    },
    {
        id: 'golden_hearts',
        name: 'Golden Hearts',
        description: 'Active Ability: Divine blessing that instantly restores full health! (15s Cooldown)',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        type: 'active',
        duration: 0,
        cooldown: 15000,
        icon: '💛',
        key: 'B'
    },
    {
        id: 'auto_pilot',
        name: 'Auto-Pilot',
        description: 'Active Ability: AI takes control to navigate perfectly! (12s Duration, 20s Cooldown)',
        price: 1599,
        currency: 'diamonds',
        rarity: 'divine',
        type: 'active',
        duration: 12000,
        cooldown: 20000,
        icon: '🤖',
        key: 'N'
    }
];
