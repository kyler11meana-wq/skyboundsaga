
import { Difficulty, Rarity } from './types';

export const GAME_WIDTH: number = 1100;
export const GAME_HEIGHT: number = 640;

export const BIRD_WIDTH: number = 40;
export const BIRD_HEIGHT: number = 30;
export const BIRD_INITIAL_Y: number = GAME_HEIGHT / 2 - BIRD_HEIGHT / 2;

export const GROUND_HEIGHT: number = 64; 

export const GRAVITY: number = -0.3;
export const JUMP_STRENGTH: number = 6;

export const PIPE_WIDTH: number = 65;

export const VICTORY_SCORE: number = 1000;

export const COLLECTION_POINTS: Record<Rarity, number> = {
    common: 5,
    rare: 10,
    deluxe: 20,
    legendary: 50,
    divine: 100
};

// Added missing RANK_THRESHOLDS for RankModal.tsx
export const RANK_THRESHOLDS = {
    BEGINNER: 0,
    ROOKIE: 50,
    MASTER: 150,
    GRANDMASTER: 300,
    SUPERIOR: 500
};

export const COLLECTION_RANK_THRESHOLDS = {
    AMATEUR: 0,
    JUNIOR: 200
};

interface DifficultySettings {
  PIPE_SPEED: number;
  PIPE_GAP: number;
  PIPE_SPAWN_INTERVAL: number;
  PIPE_VERTICAL_SPEED: number;
  PIPE_VERTICAL_AMPLITUDE: number;
}

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
  easy: {
    PIPE_SPEED: 2.5,
    PIPE_GAP: 300,
    PIPE_SPAWN_INTERVAL: 2300,
    PIPE_VERTICAL_SPEED: 0,
    PIPE_VERTICAL_AMPLITUDE: 0,
  },
  medium: {
    PIPE_SPEED: 3,
    PIPE_GAP: 260,
    PIPE_SPAWN_INTERVAL: 2000,
    PIPE_VERTICAL_SPEED: 0.001,
    PIPE_VERTICAL_AMPLITUDE: 20,
  },
  hard: {
    PIPE_SPEED: 4,
    PIPE_GAP: 230,
    PIPE_SPAWN_INTERVAL: 1700,
    PIPE_VERTICAL_SPEED: 0.0015,
    PIPE_VERTICAL_AMPLITUDE: 35,
  },
  extreme: {
    PIPE_SPEED: 4.5,
    PIPE_GAP: 200,
    PIPE_SPAWN_INTERVAL: 1400,
    PIPE_VERTICAL_SPEED: 0.002,
    PIPE_VERTICAL_AMPLITUDE: 45,
  },
  nightmare: {
    PIPE_SPEED: 5,
    PIPE_GAP: 180,
    PIPE_SPAWN_INTERVAL: 1100,
    PIPE_VERTICAL_SPEED: 0.0025,
    PIPE_VERTICAL_AMPLITUDE: 55,
  },
};