
export interface UpdateInfo {
  version: string;
  additions: string[];
  changes: string[];
}

export const updateLog: UpdateInfo[] = [
  {
      version: '1.4.97',
      additions: [
          'VFX UPGRADE: Golden Hearts now triggers a divine particle burst.',
          'VFX UPGRADE: Sunbeam Dash features a new high-intensity radiant beam.',
      ],
      changes: [
          'TIMELAPSE: Cooldown reduced to 10s.',
          'ECHO CLOAK: Duration 6s, Cooldown 6s. Fast cycling protection.',
          'GOLDEN HEARTS: Cooldown reduced to 15s.',
          'AUTO-PILOT: Duration 12s, Cooldown 20s.',
          'SUNBEAM DASH: Duration 2s, Cooldown 5s. Frequent bursts enabled.',
      ],
  },
  {
      version: '1.4.96',
      additions: [
          'NEW REDEEM CODES! Claim free loot in Settings.',
          'Added codes: XMASCODE2, NEWYEARGIFT0101, VIP01',
      ],
      changes: [
          'REWARDS: Massive currency boosts available via codes.',
      ],
  },
  {
      version: '1.4.95',
      additions: [
          'NEW DIVINE ABILITY: Golden Hearts! Instantly heal to full health.',
          'NEW DIVINE ABILITY: Auto-Pilot! Let the AI fly for you for 30s.',
      ],
      changes: [
          'CONTROLS: Added hotkeys B (Heal) and N (Auto-Pilot).',
          'SHOP: Added new abilities to the Divine tier.',
      ],
  },
  {
      version: '1.4.94',
      additions: [
          'SHOP UPDATE: Divine items are now purchasable directly!',
          'SETTINGS: Added "Redeem Code" section. Try code: XMASCODE',
          'REBRAND: "Power-Ups" are now "Abilities".',
      ],
      changes: [
          'REMOVED: Divine Wheel and Coin Mining events.',
          'ECONOMY: Adjusted prices for all item rarities.',
          'BALANCE: Abilities (formerly Power-Ups) are now Divine rarity (1599 Diamonds).',
      ],
  },
  {
      version: '1.4.93',
      additions: [
          'UI UPDATE: Enhanced Power-Up Cooldown Indicators with visual fill timers.',
      ],
      changes: [
          'BALANCE: Removed "Fire Blast" Power-Up due to balancing issues.',
          'IMPROVEMENT: Optimized HUD performance.',
      ],
  },
  {
      version: '1.4.92',
      additions: [
          'POWER-UP REWORK: Supernova is now "FIRE BLAST"! Launches a giant projectile.',
          'CONTROLS: Updated keyboard shortcuts for Power-Ups (Z, X, C, V).',
          'AUDIO: Added unique sound effects for activation of all abilities.',
      ],
      changes: [
          'FIRE BLAST: 6s Duration, 10s Cooldown. Clears path automatically.',
          'TIMELAPSE: 8s Duration, 16s Cooldown. Enhanced visuals.',
          'ECHO CLOAK: 20s Duration, 30s Cooldown. Massive protection window.',
          'SUNBEAM DASH: 3s Duration, 12s Cooldown. Instant clear burst.',
      ],
  },
  {
      version: '1.3.99',
      additions: [
          'AUDIO OVERHAUL: Brand new energetic Main Menu theme song!',
          'EVENT AUDIO: Added suspenseful sound effects when spinning the Divine Wheel and Diamond Vault.',
      ],
      changes: [
          'IMMERSION: Experience the thrill of the draw with new spinning sound effects!',
      ],
  },
  {
      version: '1.3.98',
      additions: [
          'VISUAL UPDATE: "Forest Dawn" background has been completely reworked based on player feedback.',
          'ENVIRONMENT: Added lush pine trees and morning mist to the Forest Dawn scenery.',
      ],
      changes: [
          'IMPROVEMENT: Forest Dawn now features a unique sunrise gradient and god rays.',
      ],
  },
  {
      version: '1.3.97',
      additions: [
          'NEW FREE CHARACTER: Aqua Pip (Common)',
          'NEW FREE BACKGROUND: Forest Dawn (Common)',
          'NEW FREE TRAIL: Wind Gust (Common)',
          'NEW FREE PIPE: Wooden Log (Common)',
      ],
      changes: [
          'CONTENT: Expanded the starting selection of items for all players.',
      ],
  },
  {
      version: '1.3.96',
      additions: [],
      changes: [
          'HOTFIX: Fixed a critical issue where equipped trails were invisible during gameplay.',
          'VISUALS: Restored trail rendering for all trail types.',
      ],
  },
  {
      version: '1.3.95',
      additions: [],
      changes: [
          'EVENT BUFF: Coin Mining rate increased 10x! Now generating 19.92 Coins per second.',
      ],
  },
  {
      version: '1.3.94',
      additions: [
          'NEW EVENT: Coin Mining! A lifetime passive income source.',
          'MINING RATE: Earn 1.992 Coins every second automatically.',
          'UI: Added Coin Mining tab to the Events menu.',
      ],
      changes: [
          'SYSTEM: Mining continues even while you are away. Claim your stash when you return!',
      ],
  },
  {
      version: '1.3.93',
      additions: [
          'NEW REWARD SYSTEM: Score = Coins! Earn coins equal to your score after every run.',
          'UI: Added reward summary to the Game Over screen.',
      ],
      changes: [
          'FIX: Trail effects now properly trail behind the bird instead of staying static.',
      ],
  },
  {
      version: '1.3.92',
      additions: [
          'NEW COLLECTIBLES: Find Diamonds (1-5) and Coins (100-500) floating in the sky!',
          'DIVINE WHEEL x5: Added a bulk spin option for the Divine Wheel.',
          'VISUAL OVERHAUL: "Heaven\'s Gate" is now "Elysium Spire" with stunning new god-ray animations.',
      ],
      changes: [
          'SCORING: Passing pipes now grants a random score between 1 and 100 (was 1).',
      ],
  },
  {
      version: '1.2.99',
      additions: [],
      changes: [
          'ECONOMY BALANCE: Reduced price of Echo Cloak and Sunbeam Dash to 599 Diamonds.',
      ],
  },
  {
      version: '1.2.98',
      additions: [
          'NEW LEGENDARY POWER-UP: Echo Cloak! Emits a sound wave that pushes obstacles away to create a safe path.',
          'NEW LEGENDARY POWER-UP: Sunbeam Dash! A burst of light that clears obstacles ahead.',
          'Visual Effects: Added sonic ripples and light beams for new abilities.',
      ],
      changes: [
          'Shop: Added new legendary items to the Power-Ups tab.',
          'HUD: Expanded power-up slots to accommodate new abilities.',
      ],
  },
  {
      version: '1.2.97',
      additions: [],
      changes: [
          'BUG FIX: Resolved a critical issue where the game would freeze after taking damage.',
          'OPTIMIZATION: Enhanced game loop stability for smoother gameplay.',
      ],
  },
  {
      version: '1.2.96',
      additions: [
          'NEW LIVES SYSTEM: You now possess 5 Hearts! Survive mistakes and keep flying.',
          'VISUAL UPDATE: "Heaven\'s Gate" background has been completely reimagined.',
          'UI: New Hearts display during gameplay.',
      ],
      changes: [
          'REMOVED: Post-game currency rewards (Score-to-Coins).',
          'REMOVED: Score, Reward, and Star Multipliers.',
          'REMOVED: Purchasable Revives. Everyone gets 5 lives by default.',
          'UI: Revamped the News/Updates card in the main menu.',
      ],
  },
  {
      version: '1.2.95',
      additions: [
          'STREAMLINED MENU: The Character Preview is now your launchpad!',
          'Tap the center character to start your flight instantly.',
      ],
      changes: [
          'UI: Removed the standalone Play button.',
          'Navigation: Customization is now accessed via the Shop button.',
      ],
  },
  {
      version: '1.2.94',
      additions: [
          'NEW REWARD SYSTEM: Earn rewards based on your score!',
          'Formula: Every 100 Score = 1 Diamond + 1,000 Coins.',
          'Endless Mode: The sky is the limit. No more level goals.',
      ],
      changes: [
          'REMOVED: Rank System and Stars.',
          'REMOVED: 100 Score Win Condition.',
          'UI: Simplified Main Menu and Game Over screens.',
      ],
  },
  {
      version: '1.2.93',
      additions: [
          'REBRAND: Welcome to "Skybound Saga"!',
          'UI OVERHAUL: Brand new Main Menu experience.',
      ],
      changes: [
          'Divine Wheel: Now GUARANTEED 100% Divine Item drop rate!',
          'Divine Wheel: Spin cost adjusted to 899 Diamonds.',
          'Diamond Vault: Now GUARANTEED 100% Diamond drop rate (1000 Coins -> 100 Diamonds).',
          'Diamond Vault: Removed 10x draw, available in 1x and 5x options.',
      ],
  },
];
