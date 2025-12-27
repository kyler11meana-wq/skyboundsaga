
export type GameState = 'menu' | 'getReady' | 'playing' | 'gameOver' | 'victory' | 'reviving';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme' | 'nightmare';

export type Rarity = 'common' | 'rare' | 'deluxe' | 'legendary' | 'divine';

export interface Currencies {
    diamonds: number;
    coins: number;
}

export interface Collectible {
    id: number;
    x: number;
    y: number;
    type: 'diamond' | 'coin';
    value: number;
    collected: boolean;
}

export interface Pipe {
  x: number;
  gapY: number;
  initialGapY: number;
  phase: number;
  passed?: boolean;
  destroyed?: boolean;
}

export interface RankTier {
    name: string;
    minStars: number;
    color: string;
}

export interface CollectionRankTier {
    name: string;
    minPoints: number;
    color: string;
}

export interface Character {
    id: string;
    name: string;
    price: number;
    currency?: 'coins' | 'diamonds';
    rarity: Rarity;
    style: {
        body: string;
        belly: string;
        beak: string;
        wing: string;
        extra?: {
            glow?: string;
            crest?: {
                shape: 'standard' | 'plume' | 'spikes' | 'tuft' | 'sharp';
                color: string;
            };
            tail?: {
                shape: 'standard' | 'fan' | 'plume' | 'sharp' | 'wisp';
                color: string;
            };
            eyeColor?: string;
            bodyMarking?: {
                type: 'stitches' | 'cracks' | 'swirl' | 'stripes' | 'gears' | 'lines';
                color: string;
            };
        };
    };
}

export interface BackgroundInfo {
    id: string;
    name: string;
    price: number;
    currency?: 'coins' | 'diamonds';
    rarity: Rarity;
    style: {
        background: string;
        scenery?: 'hills' | 'mountains' | 'spooky_trees' | 'candy_hills' | 'olympus' | 'elysium' | 'forest';
        moon?: boolean;
        extra?: {
            hasStars?: boolean;
            sun?: boolean;
            shootingStars?: boolean;
            fog?: boolean;
            fallingPetals?: 'sakura' | 'autumn' | 'divine';
            bubbles?: boolean;
            glowingEyes?: boolean;
            dataLines?: boolean;
            volcano?: boolean;
            underwater?: boolean;
            godRays?: boolean;
            floatingRunes?: boolean;
            foregroundScenery?: 'flowers' | 'candy' | 'vines' | 'crystals' | 'gears' | 'ruins' | 'bamboo' | 'wasteland' | 'oasis' | 'ice';
            distantScenery?: 'cyber_buildings' | 'temple_ruins' | 'atlantis' | 'neon_city' | 'floating_islands' | 'heaven_gates' | 'elysium_spires';
        }
    };
}

export type Language = 'en';

export interface Trail {
    id: string;
    name: string;
    price: number;
    currency?: 'coins' | 'diamonds';
    rarity: Rarity;
    style: {
        colors: string[];
        extra?: {
            particleShape?: 'circle' | 'square' | 'star' | 'sparkle' | 'line' | 'swirl' | 'rune';
            effect?: 'glow' | 'pulse' | 'flicker' | 'disintegrate' | 'spiral' | 'none';
        }
    };
}

export interface PipeSkin {
    id: string;
    name: string;
    price: number;
    currency?: 'coins' | 'diamonds';
    rarity: Rarity;
    style: {
        borderColor: string;
        bodyGradient: string;
        headGradient: string;
        shadowColor?: string;
    };
}
