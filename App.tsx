
// @refresh reset
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bird } from './components/Bird';
import { Pipe } from './components/Pipe';
import { Background } from './components/Background';
import { Trail } from './components/Trail';
import { SettingsModal } from './components/SettingsModal';
import { UpdateModal } from './components/UpdateModal';
import { ShopModal } from './components/ShopModal';
import { EventsModal } from './components/EventsModal';
import { GameState, Pipe as PipeType, Currencies, Collectible } from './types';
import { characters } from './characters';
import { backgrounds } from './backgrounds';
import { trails } from './trails';
import { pipeSkins } from './pipeSkins';
import { translations } from './translations';
import { audioManager } from './utils/audio';
import { DiamondIcon, CoinIcon } from './components/Icons';
import { updateLog } from './updates';
import { powerUps } from './powerUps';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  BIRD_INITIAL_Y,
  GRAVITY,
  JUMP_STRENGTH,
  PIPE_WIDTH,
  DIFFICULTY_SETTINGS,
  GROUND_HEIGHT
} from './constants';

const appVersion = "1.4.97";
const difficultyLevel = 'easy'; 

const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// --- ICONS ---

const GearIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.42.18-1.003.511-1.38.896l-1.342-.635a1.875 1.875 0 00-2.285.811l-1.385 2.4a1.875 1.875 0 00.535 2.39l1.17.9c-.02.245-.031.492-.031.74 0 .239.01.486.029.732l-1.17.9a1.875 1.875 0 00.535 2.39l1.17.9a1.875 1.875 0 00.535 2.39l1.385 2.4c.48.83 1.523 1.13 2.285.811l1.341-.635c.378.384.962.716 1.381.896l.179 1.572c.15.904.933 1.567 1.85 1.567h2.77c.917 0 1.699-.663 1.85-1.567l.178-1.572c.42-.18 1.003-.511 1.381-.896l1.341.635a1.875 1.875 0 002.285-.811l1.385-2.4a1.875 1.875 0 00-.535-2.39l-1.17-.9c.02-.245.03-.492.03-.74 0-.238-.01-.486-.029-.731l1.17-.9a1.875 1.875 0 00.535-2.39l-1.385-2.4a1.875 1.875 0 00-2.285-.811l-1.341.635c-.378-.384-.962-.716-1.381-.896l-.178-1.572a1.875 1.875 0 00-1.85-1.567h-2.77zM12 15a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

const ShopIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
);

const PlayIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [activeModal, setActiveModal] = useState<'settings' | 'update' | 'shop' | 'events' | null>(null);
  const [highScore, setHighScore] = useState<number>(0);
  const [currencies, setCurrencies] = useState<Currencies>({ diamonds: 0, coins: 0 });
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  const [lastMiningClaimTime, setLastMiningClaimTime] = useState<number>(Date.now());
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [, setRenderTrigger] = useState(0);
  
  // Power-Ups State
  const [timelapseActive, setTimelapseActive] = useState(false);
  const [timelapseEndTime, setTimelapseEndTime] = useState(0);
  const [timelapseCooldownEnd, setTimelapseCooldownEnd] = useState(0);

  const [echoCloakActive, setEchoCloakActive] = useState(false);
  const [echoCloakEndTime, setEchoCloakEndTime] = useState(0);
  const [echoCloakCooldownEnd, setEchoCloakCooldownEnd] = useState(0);

  const [sunbeamActive, setSunbeamActive] = useState(false);
  const [sunbeamEndTime, setSunbeamEndTime] = useState(0);
  const [sunbeamCooldownEnd, setSunbeamCooldownEnd] = useState(0);

  const [goldenHeartsCooldownEnd, setGoldenHeartsCooldownEnd] = useState(0);
  const [goldenHeartsParticles, setGoldenHeartsParticles] = useState<{id: number, x: number, y: number, vx: number, vy: number, life: number, type: 'heart' | 'sparkle'}[]>([]);

  const [autoPilotActive, setAutoPilotActive] = useState(false);
  const [autoPilotEndTime, setAutoPilotEndTime] = useState(0);
  const [autoPilotCooldownEnd, setAutoPilotCooldownEnd] = useState(0);

  const [explosions, setExplosions] = useState<{id: number, x: number, y: number}[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  
  // Lives System
  const [lives, setLives] = useState<number>(5);
  const livesRef = useRef<number>(5); 
  const invulnerableUntilRef = useRef<number>(0);
  const [reviveAnim, setReviveAnim] = useState(false);

  // Collectibles State
  const collectibles = useRef<Collectible[]>([]);
  const [collectedAnim, setCollectedAnim] = useState<{id: number, x: number, y: number, text: string, color: string}[]>([]);

  // Real-time server clock
  const [serverTime, setServerTime] = useState<Date>(new Date());

  const birdY = useRef<number>(BIRD_INITIAL_Y);
  const birdVelocity = useRef<number>(0);
  const pipes = useRef<PipeType[]>([]);
  const score = useRef<number>(0);
  // Trail history needs to store x position now to move with the world
  const birdHistory = useRef<{ x: number; y: number; time: number }[]>([]);
  
  const gameLoopRef = useRef<number | null>(null);
  const lastPipeSpawnTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(characters[0].id);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<string>(backgrounds[0].id);
  const [selectedTrailId, setSelectedTrailId] = useState<string>(trails[0].id);
  const [selectedPipeSkinId, setSelectedPipeSkinId] = useState<string>(pipeSkins[0].id);

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId) || characters[0];
  const selectedBackground = backgrounds.find(b => b.id === selectedBackgroundId) || backgrounds[0];
  const selectedTrail = trails.find(t => t.id === selectedTrailId) || trails[0];
  const selectedPipeSkin = pipeSkins.find(p => p.id === selectedPipeSkinId) || pipeSkins[0];

  const t = useCallback((key: string, options?: { [key: string]: string | number }) => {
    let translation = translations.en[key] || key;
    if (options) {
        Object.keys(options).forEach(optionKey => {
            translation = translation.replace(`{${optionKey}}`, String(options[optionKey]));
        });
    }
    return translation;
  }, []);

  const handleUpdateCurrency = useCallback((type: 'diamonds' | 'coins', amount: number) => {
      setCurrencies(prev => ({ ...prev, [type]: prev[type] + amount }));
  }, []);

  const loadGame = useCallback(() => {
    try {
        const storedHighScore = localStorage.getItem('tapRushHighScore');
        if (storedHighScore) setHighScore(JSON.parse(storedHighScore));
        
        const storedCurrencies = localStorage.getItem('skyRushCurrencies');
        if (storedCurrencies) {
             const parsed = JSON.parse(storedCurrencies);
             setCurrencies({
                 diamonds: parsed.diamonds || 0,
                 coins: parsed.coins !== undefined ? parsed.coins : 0
             });
        }

        const storedOwned = localStorage.getItem('skyRushOwnedItems');
        if (storedOwned) {
            setOwnedItems(JSON.parse(storedOwned));
        } else {
            // Initial free items
            const freeItems = [
                ...characters, ...backgrounds, ...trails, ...pipeSkins
            ].filter(item => item.price === 0).map(item => item.id);
            setOwnedItems(freeItems);
        }

        const storedMiningTime = localStorage.getItem('skyRushMiningTime');
        if (storedMiningTime) {
            setLastMiningClaimTime(parseInt(storedMiningTime));
        } else {
            const now = Date.now();
            setLastMiningClaimTime(now);
            localStorage.setItem('skyRushMiningTime', now.toString());
        }

        const storedSettings = localStorage.getItem('tapRushSettings');
        if (storedSettings) {
            const { charId, bgId, trailId, pipeId } = JSON.parse(storedSettings);
            
            // Helper to check validity (owned)
            const isValid = (id: string) => {
                if (!id) return false;
                const reallyOwned = (storedOwned ? JSON.parse(storedOwned) : []).includes(id);
                const isDefault = ['default', 'voxel_green', 'bit_stream', 'cloud_puff', 'candy_kingdom', 'aqua_pip', 'forest_dawn', 'wind_gust', 'wooden_log'].includes(id); 
                return reallyOwned || isDefault;
            };

            if (isValid(charId)) setSelectedCharacterId(charId);
            if (isValid(bgId)) setSelectedBackgroundId(bgId);
            if (isValid(trailId)) setSelectedTrailId(trailId);
            if (isValid(pipeId)) setSelectedPipeSkinId(pipeId);
        }
    } catch (err) { console.error("Failed to load data from localStorage", err); }
  }, []);

  useEffect(() => { loadGame(); }, [loadGame]);

  useEffect(() => {
      const interval = setInterval(() => {
          setServerTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (gameState === 'menu') {
          audioManager.startMenuMusic();
      } else {
          audioManager.stopMenuMusic();
      }
  }, [gameState]);

  useEffect(() => {
    try {
        localStorage.setItem('tapRushSettings', JSON.stringify({ 
          charId: selectedCharacterId,
          bgId: selectedBackgroundId,
          trailId: selectedTrailId,
          pipeId: selectedPipeSkinId
        }));
        localStorage.setItem('tapRushHighScore', JSON.stringify(highScore));
        localStorage.setItem('skyRushCurrencies', JSON.stringify(currencies));
        localStorage.setItem('skyRushOwnedItems', JSON.stringify(ownedItems));
        localStorage.setItem('skyRushMiningTime', lastMiningClaimTime.toString());
    } catch (err) { console.error("Auto-save failed", err); }
  }, [highScore, currencies, ownedItems, selectedCharacterId, selectedBackgroundId, selectedTrailId, selectedPipeSkinId, lastMiningClaimTime]);

  const updateScale = useCallback(() => {
    if (!document.fullscreenElement) {
      setScale(1);
      return;
    }
    const { innerWidth, innerHeight } = window;
    const scaleX = innerWidth / GAME_WIDTH;
    const scaleY = innerHeight / GAME_HEIGHT;
    setScale(Math.min(scaleX, scaleY));
  }, []);

  const toggleFullscreen = useCallback(async (mobile: boolean = false) => {
    if (!document.fullscreenElement) {
        try {
            await document.documentElement.requestFullscreen();
            if (mobile && isMobileDevice()) {
                await (screen.orientation as any).lock('landscape');
                setIsMobileFullscreen(true);
            }
        } catch (err) {
            console.error("Fullscreen request failed", err);
        }
    } else {
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        }
    }
  }, []);

  const handleButtonClick = useCallback(() => {
      audioManager.playClick();
  }, []);

  const openModal = (modalType: typeof activeModal) => {
      handleButtonClick();
      setActiveModal(modalType);
  }
  
  const closeModal = () => {
      handleButtonClick();
      setActiveModal(null);
  }
  
  useEffect(() => {
    const handleFullscreenAndResize = () => {
      const fullscreen = !!document.fullscreenElement;
      setIsFullscreen(fullscreen);
      if (!fullscreen && isMobileFullscreen) {
          (screen.orientation as any).unlock();
          setIsMobileFullscreen(false);
      }
      updateScale();
    };
    document.addEventListener('fullscreenchange', handleFullscreenAndResize);
    window.addEventListener('resize', handleFullscreenAndResize);
    handleFullscreenAndResize(); 
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenAndResize);
      window.removeEventListener('resize', handleFullscreenAndResize);
    };
  }, [updateScale, isMobileFullscreen]);

  const resetGameState = useCallback(() => {
      birdY.current = BIRD_INITIAL_Y;
      birdVelocity.current = 0;
      score.current = 0;
      lastTimeRef.current = 0;
      birdHistory.current = [];
      collectibles.current = [];
      setTimelapseActive(false);
      setTimelapseEndTime(0);
      setTimelapseCooldownEnd(0);
      setEchoCloakActive(false);
      setEchoCloakEndTime(0);
      setEchoCloakCooldownEnd(0);
      setSunbeamActive(false);
      setSunbeamEndTime(0);
      setSunbeamCooldownEnd(0);
      setAutoPilotActive(false);
      setAutoPilotEndTime(0);
      setAutoPilotCooldownEnd(0);
      setGoldenHeartsCooldownEnd(0);
      setExplosions([]);
      setIsShaking(false);
      setReviveAnim(false);
      setLives(5); // Reset UI
      livesRef.current = 5; // Reset Logic Ref
      invulnerableUntilRef.current = 0;
      setCollectedAnim([]);
      setGoldenHeartsParticles([]);
  }, []);

  const startGame = useCallback(() => {
    audioManager.playClick();
    resetGameState();
    pipes.current = [];
    lastPipeSpawnTimeRef.current = 0;
    setGameState('getReady');
  }, [resetGameState]);

  const returnToMenu = useCallback(() => {
    audioManager.playClick();
    setGameState('menu');
  }, []);

  const handleEndGame = useCallback(() => {
    if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
    }
    
    const scoreVal = score.current;
    if (scoreVal > highScore) {
        setHighScore(scoreVal);
    }
    
    // Reward System: Score = Coins
    handleUpdateCurrency('coins', scoreVal);

    audioManager.playCrash();
    setGameState('gameOver');
  }, [highScore, handleUpdateCurrency]);

  const handleJump = useCallback(() => {
    if (gameState === 'playing' || gameState === 'getReady') {
      if(gameState === 'getReady') setGameState('playing');
      birdVelocity.current = JUMP_STRENGTH;
      audioManager.playJump();
    }
  }, [gameState]);

  // --- POWER UPS ACTIVATION ---

  const activateTimelapse = useCallback(() => {
      const now = Date.now();
      const p = powerUps.find(p => p.id === 'timelapse');
      if (gameState === 'playing' && ownedItems.includes('timelapse') && now > timelapseCooldownEnd && p) {
          setTimelapseActive(true);
          setTimelapseEndTime(now + (p.duration || 8000)); 
          setTimelapseCooldownEnd(now + (p.cooldown || 10000)); 
          audioManager.playTimelapse(); 
      }
  }, [gameState, ownedItems, timelapseCooldownEnd]);

  const activateEchoCloak = useCallback(() => {
      const now = Date.now();
      const p = powerUps.find(p => p.id === 'echo_cloak');
      if (gameState === 'playing' && ownedItems.includes('echo_cloak') && now > echoCloakCooldownEnd && p) {
          setEchoCloakActive(true);
          setEchoCloakEndTime(now + (p.duration || 6000));
          setEchoCloakCooldownEnd(now + (p.cooldown || 6000)); 
          audioManager.playEchoCloak();
      }
  }, [gameState, ownedItems, echoCloakCooldownEnd]);

  const activateSunbeamDash = useCallback(() => {
      const now = Date.now();
      const p = powerUps.find(p => p.id === 'sunbeam_dash');
      if (gameState === 'playing' && ownedItems.includes('sunbeam_dash') && now > sunbeamCooldownEnd && p) {
          setSunbeamActive(true);
          setSunbeamEndTime(now + (p.duration || 2000));
          setSunbeamCooldownEnd(now + (p.cooldown || 5000)); 
          audioManager.playSunbeam();
      }
  }, [gameState, ownedItems, sunbeamCooldownEnd]);

  const activateGoldenHearts = useCallback(() => {
      const now = Date.now();
      const p = powerUps.find(p => p.id === 'golden_hearts');
      if (gameState === 'playing' && ownedItems.includes('golden_hearts') && now > goldenHeartsCooldownEnd && p) {
          setLives(5);
          livesRef.current = 5;
          setGoldenHeartsCooldownEnd(now + (p.cooldown || 15000));
          audioManager.playHeal();
          setReviveAnim(true);
          setTimeout(() => setReviveAnim(false), 1000);
          
          // Spawn Divine Particles
          const birdX = GAME_WIDTH / 2;
          const birdYPos = GAME_HEIGHT - birdY.current - BIRD_HEIGHT/2; // approximate visual Y
          const newParticles: any[] = [];
          for (let i = 0; i < 30; i++) {
              newParticles.push({
                  id: now + i,
                  x: birdX,
                  y: birdY.current + BIRD_HEIGHT/2,
                  vx: (Math.random() - 0.5) * 10,
                  vy: Math.random() * 5 + 2,
                  life: 1.0,
                  type: Math.random() > 0.5 ? 'heart' : 'sparkle'
              });
          }
          setGoldenHeartsParticles(newParticles);
      }
  }, [gameState, ownedItems, goldenHeartsCooldownEnd]);

  const activateAutoPilot = useCallback(() => {
      const now = Date.now();
      const p = powerUps.find(p => p.id === 'auto_pilot');
      if (gameState === 'playing' && ownedItems.includes('auto_pilot') && now > autoPilotCooldownEnd && p) {
          setAutoPilotActive(true);
          setAutoPilotEndTime(now + (p.duration || 12000));
          setAutoPilotCooldownEnd(now + (p.cooldown || 20000));
          audioManager.playAutoPilot();
      }
  }, [gameState, ownedItems, autoPilotCooldownEnd]);

  // Updated takeDamage to use livesRef for stability
  const takeDamage = useCallback(() => {
      if (livesRef.current > 1) {
          livesRef.current -= 1;
          setLives(livesRef.current); // Sync UI
          
          birdVelocity.current = JUMP_STRENGTH;
          invulnerableUntilRef.current = Date.now() + 1500; 
          
          if (birdY.current < GROUND_HEIGHT) birdY.current = GROUND_HEIGHT + 1;
          if (birdY.current + BIRD_HEIGHT > GAME_HEIGHT) birdY.current = GAME_HEIGHT - BIRD_HEIGHT - 1;
          
          setReviveAnim(true);
          setTimeout(() => setReviveAnim(false), 1000);
          audioManager.playCrash(); // Use crash sound for hit
          return true; // Survived
      }
      return false; // Died
  }, []);

  const handlePurchaseItem = useCallback((item: any) => {
      const price = item.price;
      const currencyType = item.currency || 'coins';
      const currentBalance = currencyType === 'diamonds' ? currencies.diamonds : currencies.coins;

      if (currentBalance >= price) {
          setCurrencies(prev => ({
              ...prev,
              [currencyType]: prev[currencyType as keyof Currencies] - price
          }));
          setOwnedItems(prev => [...prev, item.id]);
          audioManager.playScore(); 
          return true;
      } else {
          audioManager.playCrash(); 
          return false;
      }
  }, [currencies]);

  const handleUnlockItem = useCallback((itemId: string) => {
      setOwnedItems(prev => [...prev, itemId]);
  }, []);

  // Mining Claim Handler
  const handleClaimMining = useCallback(() => {
      const now = Date.now();
      const elapsedSeconds = (now - lastMiningClaimTime) / 1000;
      const amount = Math.floor(elapsedSeconds * 19.92);
      
      if (amount > 0) {
          setCurrencies(prev => ({ ...prev, coins: prev.coins + amount }));
          setLastMiningClaimTime(now);
          audioManager.playVictory();
          return amount;
      }
      return 0;
  }, [lastMiningClaimTime]);

  const handleRedeemCode = useCallback((code: string) => {
      const redeemed = JSON.parse(localStorage.getItem('skyRushRedeemedCodes') || '[]');
      if (redeemed.includes(code)) return { success: false, message: 'Code already redeemed!' };
      
      let rewardMsg = '';
      
      switch (code) {
          case 'XMASCODE':
          case 'XMASCODE2':
              handleUpdateCurrency('diamonds', 1000);
              handleUpdateCurrency('coins', 10000);
              rewardMsg = '1000 Diamonds & 10000 Coins!';
              break;
          case 'NEWYEARGIFT0101':
              handleUpdateCurrency('diamonds', 1000);
              handleUpdateCurrency('coins', 100000);
              rewardMsg = '1000 Diamonds & 100000 Coins!';
              break;
          case 'VIP01':
              handleUpdateCurrency('diamonds', 10000);
              rewardMsg = '10000 Diamonds!';
              break;
          default:
              return { success: false, message: 'Invalid Code' };
      }

      localStorage.setItem('skyRushRedeemedCodes', JSON.stringify([...redeemed, code]));
      audioManager.playVictory();
      return { success: true, message: `Redeemed: ${rewardMsg}` };
  }, [handleUpdateCurrency]);
  
  const showAnyModal = activeModal !== null;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Escape') { closeModal(); return; }
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !showAnyModal) {
        e.preventDefault();
        handleJump();
        return;
      }
      if (e.code === 'KeyX' && !showAnyModal) activateTimelapse();
      if (e.code === 'KeyC' && !showAnyModal) activateEchoCloak();
      if (e.code === 'KeyV' && !showAnyModal) activateSunbeamDash();
      if (e.code === 'KeyB' && !showAnyModal) activateGoldenHearts();
      if (e.code === 'KeyN' && !showAnyModal) activateAutoPilot();
      if (e.shiftKey && e.code === 'KeyF') toggleFullscreen();
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (!showAnyModal && !(e.target as HTMLElement).closest('button') && !(e.target as HTMLElement).closest('.cursor-pointer')) {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [handleJump, activateTimelapse, activateEchoCloak, activateSunbeamDash, activateGoldenHearts, activateAutoPilot, toggleFullscreen, gameState, showAnyModal]);

  const gameLoop = useCallback((timestamp: number) => {
    if (gameState !== 'playing') { gameLoopRef.current = null; return; }
    if (lastTimeRef.current === 0) { lastTimeRef.current = timestamp; gameLoopRef.current = requestAnimationFrame(gameLoop); return; }
    
    const now = Date.now();
    let deltaTime = timestamp - lastTimeRef.current;
    if (timelapseActive && now > timelapseEndTime) setTimelapseActive(false);
    if (echoCloakActive && now > echoCloakEndTime) setEchoCloakActive(false);
    if (sunbeamActive && now > sunbeamEndTime) setSunbeamActive(false);
    if (autoPilotActive && now > autoPilotEndTime) setAutoPilotActive(false);

    let timeScale = timelapseActive ? 0.5 : 1;
    lastTimeRef.current = timestamp;
    const deltaFactor = (deltaTime / (1000 / 60)) * timeScale;

    setExplosions(prev => prev.filter(ex => now - ex.id < 500));
    setCollectedAnim(prev => prev.filter(a => now - a.id < 800));
    
    // Update Golden Hearts Particles
    setGoldenHeartsParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx * deltaFactor,
        y: p.y + p.vy * deltaFactor,
        life: p.life - 0.02 * deltaFactor
    })).filter(p => p.life > 0));

    // Auto-Pilot Logic
    if (autoPilotActive) {
        // Simple AI
        const birdX = GAME_WIDTH / 2 - BIRD_WIDTH / 2;
        const upcomingPipe = pipes.current.find(p => p.x + PIPE_WIDTH > birdX - 20); // Look slightly ahead
        
        if (upcomingPipe) {
            const targetY = upcomingPipe.gapY + DIFFICULTY_SETTINGS[difficultyLevel].PIPE_GAP / 2 - BIRD_HEIGHT / 2;
            const distance = targetY - birdY.current;
            
            // If below target, jump. Add some buffer to avoid frantic tapping.
            if (birdY.current < targetY - 10 && birdVelocity.current < 2) {
                birdVelocity.current = JUMP_STRENGTH;
            }
        } else {
            // Keep center if no pipe
            if (birdY.current < GAME_HEIGHT / 2 && birdVelocity.current < 2) {
                birdVelocity.current = JUMP_STRENGTH;
            }
        }
    }

    birdVelocity.current += GRAVITY * deltaFactor;
    birdY.current += birdVelocity.current * deltaFactor;
    
    const settings = DIFFICULTY_SETTINGS[difficultyLevel];

    // Trail Logic: Update X positions of existing particles to move with the world
    birdHistory.current.forEach(point => {
        point.x -= settings.PIPE_SPEED * deltaFactor;
    });
    
    if (selectedTrail.id !== 'none') {
        const birdX = GAME_WIDTH / 2 - BIRD_WIDTH / 2;
        birdHistory.current.push({ 
            x: birdX + BIRD_WIDTH / 2, 
            y: birdY.current + BIRD_HEIGHT / 2, 
            time: Date.now() 
        });
        
        // Prune old history
        if (birdHistory.current.length > 30) birdHistory.current.shift();
    }

    const isInvulnerable = now < invulnerableUntilRef.current;
    if (!isInvulnerable && (birdY.current < GROUND_HEIGHT || birdY.current + BIRD_HEIGHT > GAME_HEIGHT)) {
      if (!takeDamage()) { handleEndGame(); return; }
    }
    
    const adjustedSpawnInterval = settings.PIPE_SPAWN_INTERVAL / timeScale;

    if (timestamp - lastPipeSpawnTimeRef.current > adjustedSpawnInterval) {
        const gapCenter = Math.random() * (GAME_HEIGHT - settings.PIPE_GAP - 2 * GROUND_HEIGHT) + settings.PIPE_GAP / 2 + GROUND_HEIGHT;
        pipes.current.push({
            x: GAME_WIDTH,
            gapY: gapCenter - settings.PIPE_GAP / 2,
            initialGapY: gapCenter - settings.PIPE_GAP / 2,
            phase: Math.random() * Math.PI * 2,
            passed: false,
            destroyed: false,
        });
        
        // Spawn Collectible Chance (30%)
        if (Math.random() < 0.3) {
            const isDiamond = Math.random() < 0.5; // 50% chance for diamond vs coin
            collectibles.current.push({
                id: now,
                x: GAME_WIDTH + PIPE_WIDTH / 2 - 15,
                y: gapCenter - 15, // Centered in gap
                type: isDiamond ? 'diamond' : 'coin',
                value: isDiamond ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 401) + 100, // 1-5 or 100-500
                collected: false
            });
        }

        lastPipeSpawnTimeRef.current = timestamp;
    }

    const birdX = GAME_WIDTH / 2 - BIRD_WIDTH / 2;
    const birdRect = { x: birdX, y: birdY.current, width: BIRD_WIDTH, height: BIRD_HEIGHT };

    // Move & Update Pipes
    pipes.current.forEach(pipe => {
        if (pipe.destroyed) return;

        pipe.x -= settings.PIPE_SPEED * deltaFactor;
        
        // Vertical oscillation logic
        let targetGapY = pipe.initialGapY;
        if (settings.PIPE_VERTICAL_AMPLITUDE > 0) {
            targetGapY = pipe.initialGapY + Math.sin(timestamp * settings.PIPE_VERTICAL_SPEED + pipe.phase) * settings.PIPE_VERTICAL_AMPLITUDE;
        }

        // Echo Cloak Logic: Push obstacles away
        if (echoCloakActive && pipe.x > birdX - 300 && pipe.x < birdX + 500) {
             const safeY = birdY.current - settings.PIPE_GAP / 2;
             // Smoothly interpolate gapY towards the bird's safe position
             const approachFactor = 0.15 * deltaFactor;
             pipe.gapY = pipe.gapY + (safeY - pipe.gapY) * approachFactor;
        } else {
             pipe.gapY = targetGapY; // Return to normal if out of range
        }

        // Sunbeam Dash Logic: Destroy obstacles ahead
        if (sunbeamActive && pipe.x > birdX && pipe.x < birdX + 800 && !pipe.destroyed) {
            pipe.destroyed = true;
            setExplosions(prev => [...prev, { id: Date.now(), x: pipe.x, y: pipe.gapY + settings.PIPE_GAP }]);
            setExplosions(prev => [...prev, { id: Date.now(), x: pipe.x, y: pipe.gapY - 100 }]); 
        }
    });

    // Collectibles Logic
    collectibles.current.forEach(c => {
        if (c.collected) return;
        c.x -= settings.PIPE_SPEED * deltaFactor; // Move with pipes

        // Collision Check
        if (
            birdRect.x < c.x + 30 &&
            birdRect.x + birdRect.width > c.x &&
            birdRect.y < c.y + 30 &&
            birdRect.y + birdRect.height > c.y
        ) {
            c.collected = true;
            audioManager.playScore(); // Reuse score sound for collecting
            if (c.type === 'diamond') {
                handleUpdateCurrency('diamonds', c.value);
                setCollectedAnim(prev => [...prev, { id: Date.now(), x: c.x, y: c.y, text: `+${c.value}`, color: '#22d3ee' }]);
            } else {
                handleUpdateCurrency('coins', c.value);
                setCollectedAnim(prev => [...prev, { id: Date.now(), x: c.x, y: c.y, text: `+${c.value}`, color: '#facc15' }]);
            }
        }
    });
    // Remove off-screen collectibles
    collectibles.current = collectibles.current.filter(c => c.x > -50 && !c.collected);

    // Score Logic
    for (const pipe of pipes.current) {
        if (!pipe.passed && !pipe.destroyed && pipe.x + PIPE_WIDTH < birdX) {
            pipe.passed = true;
            const scoreAdd = Math.floor(Math.random() * 100) + 1; // RANDOM SCORE 1-100
            score.current += scoreAdd;
            audioManager.playScore();
        }
    }
    pipes.current = pipes.current.filter((pipe) => pipe.x > -PIPE_WIDTH);

    // Collision Detection (Pipes)
    for (const pipe of pipes.current) {
        if (pipe.destroyed) continue;
        const topPipeRect = { x: pipe.x, y: pipe.gapY + settings.PIPE_GAP, width: PIPE_WIDTH, height: GAME_HEIGHT - (pipe.gapY + settings.PIPE_GAP) };
        const bottomPipeRect = { x: pipe.x, y: 0, width: PIPE_WIDTH, height: pipe.gapY };
        const collides = (rect1: any, rect2: any) => rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
        
        if (!isInvulnerable && (collides(birdRect, topPipeRect) || collides(birdRect, bottomPipeRect))) {
            if (!takeDamage()) { handleEndGame(); return; }
        }
    }
    setRenderTrigger(r => r + 1);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, handleEndGame, selectedTrail, timelapseActive, timelapseEndTime, echoCloakActive, echoCloakEndTime, sunbeamActive, sunbeamEndTime, autoPilotActive, autoPilotEndTime, takeDamage, handleUpdateCurrency]);

  useEffect(() => {
    if (gameState === 'playing' && !gameLoopRef.current) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => { 
        if (gameLoopRef.current) {
            cancelAnimationFrame(gameLoopRef.current);
            gameLoopRef.current = null;
        }
    };
  }, [gameState, gameLoop]);
  
  const renderEndScreen = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 z-30 backdrop-blur-md">
            <div className={`p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center border-4 border-rose-500 bg-[#fff1f2] w-[500px] relative overflow-hidden transition-all duration-500 scale-110`}>
                <h2 className={`text-5xl font-black mb-6 tracking-tighter text-rose-600 drop-shadow-sm`}>
                    CRASHED
                </h2>
                <div className="flex justify-center gap-12 mb-6">
                    <div className="text-center">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('SCORE')}</p>
                        <p className="text-5xl font-black text-slate-900">{score.current}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('HIGH_SCORE')}</p>
                        <p className="text-3xl font-black text-slate-700">{highScore}</p>
                    </div>
                </div>

                {/* Rewards Display */}
                <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-xl mb-6 w-full flex items-center justify-between">
                    <span className="text-yellow-600 font-bold uppercase text-xs tracking-widest">{t('REWARDS')}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-600 font-black text-xl">+{score.current}</span>
                        <CoinIcon className="w-6 h-6 text-yellow-500" />
                    </div>
                </div>
                
                <button onClick={startGame} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-[0_6px_0_rgb(30,58,138)] hover:bg-blue-500 active:translate-y-[2px] active:shadow-none transition-all mb-4 text-2xl uppercase tracking-tighter border-b-2 border-white/20">
                    {t('TRY_AGAIN')}
                </button>
                <button onClick={returnToMenu} className="w-full py-4 bg-slate-700 text-white font-black rounded-2xl shadow-[0_6px_0_rgb(15,23,42)] hover:bg-slate-600 active:translate-y-[2px] active:shadow-none transition-all text-xl uppercase tracking-widest border-b-2 border-white/10">
                    {t('MENU')}
                </button>
            </div>
        </div>
    );
  };

  const renderCooldownButton = (itemId: string, active: boolean, cooldownEnd: number, activateFn: () => void, icon: string, keyChar: string, colorClass: string) => {
      const now = Date.now();
      const isCoolingDown = now < cooldownEnd;
      const remainingTime = Math.max(0, cooldownEnd - now);
      const p = powerUps.find(p => p.id === itemId);
      const totalCooldown = p?.cooldown || 10000;
      const pct = Math.min(100, (remainingTime / totalCooldown) * 100);

      return (
          <button 
              onClick={(e) => { e.stopPropagation(); activateFn(); }} 
              className={`relative w-16 h-16 rounded-2xl border-b-4 flex flex-col items-center justify-center transition-all shadow-lg active:border-b-0 active:translate-y-1 overflow-hidden 
              ${active ? 'animate-pulse ring-4 ring-white' : ''} 
              ${isCoolingDown ? 'cursor-not-allowed bg-slate-800 border-slate-900 text-slate-500' : colorClass}`}
          >
              {/* Cooldown Overlay */}
              {isCoolingDown && (
                  <div 
                      className="absolute bottom-0 left-0 w-full bg-black/60 transition-all duration-100 ease-linear z-0" 
                      style={{ height: `${pct}%` }}
                  />
              )}
              
              {/* Icon & Key */}
              <span className="text-3xl z-10 relative">{icon}</span>
              <span className={`text-[8px] font-black px-1 rounded absolute bottom-1 z-10 ${isCoolingDown ? 'text-slate-400 bg-slate-900' : 'text-white bg-black/40'}`}>{keyChar}</span>
              
              {/* Countdown Text */}
              {isCoolingDown && !active && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                      <span className="text-xl font-black text-white drop-shadow-md">{Math.ceil(remainingTime / 1000)}</span>
                  </div>
              )}
          </button>
      );
  };
  
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#020617] text-white overflow-hidden ${isMobileFullscreen ? '' : 'p-4'}`}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        @keyframes sonic-ripple { 0% { width: 50px; height: 50px; opacity: 0.8; border-width: 5px; } 100% { width: 800px; height: 800px; opacity: 0; border-width: 0px; } }
        @keyframes sunbeam-pulse { 0% { opacity: 0.8; height: 150px; } 50% { opacity: 1; height: 300px; } 100% { opacity: 0.8; height: 150px; } }
        @keyframes sunbeam-flash { 0% { opacity: 0; transform: scaleX(0.1); } 20% { opacity: 1; transform: scaleX(1.5); } 100% { opacity: 0; transform: scaleX(0.1); } }
        @keyframes sunbeam-stream { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes float-collectible { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
      `}</style>

      <div 
        className={`relative overflow-hidden shadow-2xl transition-all duration-300 ${isMobileFullscreen ? '' : 'rounded-[2rem] ring-[12px] ring-slate-800/50'} ${isShaking ? 'shake' : ''}`}
        style={{ 
          width: GAME_WIDTH, 
          height: GAME_HEIGHT, 
          transform: `scale(${scale})`,
          cursor: gameState === 'playing' ? 'pointer' : 'default'
        }}
        onClick={handleJump}
      >
        <Background {...selectedBackground.style} />
        
        {/* Visual Effects Layer */}
        {timelapseActive && (
            <div className="absolute inset-0 pointer-events-none z-20 bg-blue-900/20 mix-blend-screen overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]"></div>
                <div className="w-full h-20 bg-white/10 absolute top-0 animate-[scanline_2s_linear_infinite] blur-md"></div>
                <div className="absolute top-4 right-4 text-4xl font-mono text-cyan-400 font-bold opacity-50">TIMELAPSE ACTIVE</div>
            </div>
        )}
        {autoPilotActive && (
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <div className="absolute inset-0 border-[20px] border-emerald-500/20 animate-pulse"></div>
                <div className="absolute top-4 right-4 text-4xl font-mono text-emerald-400 font-bold opacity-50 flex items-center gap-2">
                    <span className="animate-spin text-5xl">⚙️</span> AUTO-PILOT
                </div>
                {/* HUD Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-emerald-500/30 rounded-full opacity-30 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-dashed border-emerald-500/30 rounded-full opacity-50 animate-[spin_8s_linear_infinite_reverse]"></div>
            </div>
        )}

        <div className="absolute inset-0 z-10">
            {pipes.current.map((pipe, i) => (
                <Pipe key={i} x={pipe.x} gapY={pipe.gapY} pipeGap={DIFFICULTY_SETTINGS[difficultyLevel].PIPE_GAP} skin={selectedPipeSkin.style} isDestroyed={pipe.destroyed} />
            ))}
            
            {/* Render Collectibles */}
            {collectibles.current.map(c => (
                <div key={c.id} className="absolute z-20 animate-[float-collectible_1s_ease-in-out_infinite]" style={{ left: c.x, bottom: c.y, width: '30px', height: '30px' }}>
                    {c.type === 'diamond' ? (
                        <div className="w-full h-full drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"><DiamondIcon className="w-full h-full text-cyan-400" /></div>
                    ) : (
                        <div className="w-full h-full drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"><CoinIcon className="w-full h-full text-yellow-400" /></div>
                    )}
                </div>
            ))}

            {/* Collected Animations */}
            {collectedAnim.map(anim => (
                <div key={anim.id} className="absolute z-30 font-black text-xl animate-[float_0.8s_ease-out_forwards]" style={{ left: anim.x, bottom: anim.y + 30, color: anim.color, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {anim.text}
                </div>
            ))}

            <Trail history={[...birdHistory.current]} trail={selectedTrail} />
            
            {/* Power-Up Visuals Container */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Echo Cloak Visuals */}
                {echoCloakActive && (
                    <div className="absolute" style={{ left: GAME_WIDTH / 2 - BIRD_WIDTH / 2 + 20, bottom: birdY.current + BIRD_HEIGHT / 2 }}>
                        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-cyan-400 border-[6px] opacity-0 animate-[sonic-ripple_1.5s_linear_infinite]"></div>
                        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-white border-[4px] opacity-0 animate-[sonic-ripple_1.5s_linear_infinite_0.5s]"></div>
                        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 w-40 h-40 blur-md"></div>
                    </div>
                )}
                
                {/* Sunbeam Dash Enhanced Visuals */}
                {sunbeamActive && (
                    <div className="absolute" style={{ left: GAME_WIDTH / 2 + 20, bottom: birdY.current + BIRD_HEIGHT / 2 }}>
                        {/* Radiant Main Beam */}
                        <div className="absolute top-1/2 left-0 h-48 w-[1500px] bg-gradient-to-r from-yellow-200 via-white to-transparent transform -translate-y-1/2 blur-md animate-[sunbeam-pulse_0.1s_infinite] origin-left"></div>
                        
                        {/* High Intensity Core */}
                        <div className="absolute top-1/2 left-0 h-12 w-[2000px] bg-white transform -translate-y-1/2 blur-sm box-shadow-[0_0_50px_white]"></div>
                        
                        {/* Speed Lines */}
                        <div className="absolute top-[-100px] left-0 w-[1000px] h-[5px] bg-white/50 blur-[1px] animate-[sunbeam-stream_0.2s_linear_infinite]"></div>
                        <div className="absolute bottom-[-100px] left-0 w-[1000px] h-[5px] bg-white/50 blur-[1px] animate-[sunbeam-stream_0.3s_linear_infinite]"></div>
                        
                        {/* Impact Burst */}
                        <div className="absolute top-1/2 left-0 w-32 h-32 bg-yellow-400/80 rounded-full blur-xl transform -translate-y-1/2 -translate-x-1/2 mix-blend-screen animate-pulse"></div>
                    </div>
                )}
                
                {/* Golden Hearts Divine Particles */}
                {goldenHeartsParticles.map(p => (
                    <div 
                        key={p.id} 
                        className="absolute text-yellow-300 drop-shadow-[0_0_5px_gold] animate-pulse"
                        style={{ 
                            left: p.x, 
                            bottom: p.y, 
                            opacity: p.life, 
                            transform: `scale(${p.life})` 
                        }}
                    >
                        {p.type === 'heart' ? '💛' : '✨'}
                    </div>
                ))}
            </div>

            <div style={{ opacity: Date.now() < invulnerableUntilRef.current ? 0.5 : 1 }}>
                <Bird y={birdY.current} velocity={birdVelocity.current} characterStyle={selectedCharacter.style} />
            </div>
            {explosions.map(ex => (
                <div key={ex.id} className="absolute text-8xl animate-ping pointer-events-none" style={{ left: ex.x, bottom: ex.y }}>💥</div>
            ))}
            {reviveAnim && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce z-50 drop-shadow-[0_0_20px_white]">❤️</div>
            )}
        </div>

        <div className="absolute bottom-0 w-full z-20 pointer-events-none">
             <div className="h-4 w-full bg-slate-900/40 backdrop-blur-sm"></div>
             <div className="h-10 w-full bg-gradient-to-b from-slate-900 to-black"></div>
        </div>

        {/* HUD - SCORING & LIVES */}
        {(gameState === 'playing' || gameState === 'getReady') && (
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-30">
                {/* Score Card */}
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-4 flex flex-col items-center shadow-2xl relative overflow-hidden min-w-[140px] pointer-events-auto">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">SCORE</span>
                    <span className="text-5xl font-black text-white leading-none drop-shadow-md">{score.current}</span>
                </div>

                {/* Right Side: Lives & Powerups */}
                <div className="flex flex-col gap-3 items-end pointer-events-auto">
                     {/* Hearts Display - New 5 Lives System */}
                     <div className="bg-slate-900/80 p-3 rounded-2xl backdrop-blur-sm border border-slate-700 flex items-center gap-1 shadow-xl">
                         {Array.from({ length: 5 }).map((_, i) => (
                             <span key={i} className={`text-2xl transition-all duration-300 ${i < lives ? 'scale-100 opacity-100' : 'scale-75 opacity-20 grayscale'}`}>
                                 ❤️
                             </span>
                         ))}
                     </div>
                     
                     <div className="flex gap-4">
                         {ownedItems.includes('timelapse') && renderCooldownButton(
                             'timelapse', 
                             timelapseActive, 
                             timelapseCooldownEnd, 
                             activateTimelapse, 
                             '⏳', 
                             'X', 
                             'bg-gradient-to-br from-blue-500 to-indigo-600 border-indigo-800 hover:scale-105'
                         )}
                         {ownedItems.includes('echo_cloak') && renderCooldownButton(
                             'echo_cloak',
                             echoCloakActive,
                             echoCloakCooldownEnd,
                             activateEchoCloak,
                             '🔊',
                             'C',
                             'bg-gradient-to-br from-cyan-500 to-teal-600 border-teal-800 hover:scale-105'
                         )}
                         {ownedItems.includes('sunbeam_dash') && renderCooldownButton(
                             'sunbeam_dash',
                             sunbeamActive,
                             sunbeamCooldownEnd,
                             activateSunbeamDash,
                             '☀️',
                             'V',
                             'bg-gradient-to-br from-yellow-200 to-orange-300 border-orange-400 hover:scale-105 text-orange-900'
                         )}
                         {ownedItems.includes('golden_hearts') && renderCooldownButton(
                             'golden_hearts',
                             false, // Instant effect
                             goldenHeartsCooldownEnd,
                             activateGoldenHearts,
                             '💛',
                             'B',
                             'bg-gradient-to-br from-red-500 to-rose-600 border-rose-800 hover:scale-105'
                         )}
                         {ownedItems.includes('auto_pilot') && renderCooldownButton(
                             'auto_pilot',
                             autoPilotActive,
                             autoPilotCooldownEnd,
                             activateAutoPilot,
                             '🤖',
                             'N',
                             'bg-gradient-to-br from-emerald-500 to-teal-600 border-teal-800 hover:scale-105'
                         )}
                     </div>
                </div>
            </div>
        )}
        
        {/* MAIN MENU UI REVAMP */}
        {gameState === 'menu' && (
            <div className="absolute inset-0 z-40 flex flex-col p-4 md:p-8">
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"></div>
                
                {/* Header */}
                <div className="relative z-10 w-full flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1 pointer-events-none opacity-80">
                         <div className="text-white font-black text-xl tracking-tighter drop-shadow-md">
                            {serverTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                         </div>
                         <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">v{appVersion}</div>
                    </div>
                    
                    <div className="flex gap-3 md:gap-4 scale-90 md:scale-100 origin-top-right">
                         <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-5 py-2 rounded-xl border border-slate-700 shadow-xl">
                             <DiamondIcon className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                             <span className="font-black font-mono text-cyan-400 text-lg">{currencies.diamonds.toLocaleString()}</span>
                         </div>
                         <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-5 py-2 rounded-xl border border-slate-700 shadow-xl">
                             <CoinIcon className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                             <span className="font-black font-mono text-yellow-400 text-lg">{currencies.coins.toLocaleString()}</span>
                         </div>
                         <button onClick={() => openModal('settings')} className="p-3 bg-slate-800/80 backdrop-blur-md rounded-xl hover:bg-slate-700 transition-all border border-slate-600 shadow-xl">
                             <GearIcon className="w-6 h-6 text-white" />
                         </button>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto w-full">
                    
                    {/* LEFT: Revamped Updates Section */}
                    <div className="hidden lg:flex flex-col h-full justify-center">
                        <div 
                            className="bg-gradient-to-br from-indigo-900/80 to-slate-900/80 border-l-4 border-indigo-500 rounded-r-3xl rounded-l-md p-8 shadow-2xl relative overflow-hidden group hover:bg-indigo-900 transition-all duration-300 cursor-pointer w-full max-w-sm" 
                            onClick={() => openModal('update')}
                        >
                             <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-black text-indigo-200 pointer-events-none -mt-8 -mr-8">v{appVersion}</div>
                             
                             <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-indigo-500 rounded-lg shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-indigo-400 font-black uppercase tracking-wider text-xs">Patch Notes</h3>
                                    <div className="text-white font-bold text-sm">What's New</div>
                                </div>
                             </div>
                             
                             <div className="space-y-4 mb-6 relative z-10">
                                 <div className="flex gap-3">
                                     <div className="w-1 bg-green-500 rounded-full h-auto"></div>
                                     <p className="text-white font-medium text-sm leading-snug">{updateLog[0].additions[0] || updateLog[0].changes[0]}</p>
                                 </div>
                                 <div className="flex gap-3">
                                     <div className="w-1 bg-blue-500 rounded-full h-auto"></div>
                                     <p className="text-slate-300 text-xs leading-relaxed">{updateLog[0].additions[1] || updateLog[0].changes[1]}</p>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                Full Changelog <span>&rarr;</span>
                             </div>
                        </div>
                    </div>

                    {/* CENTER: Play & Character */}
                    <div className="flex flex-col items-center justify-center gap-12">
                        <div className="text-center animate-float">
                            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-600 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] tracking-tighter italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                                {t('SKYQUEST')}
                            </h1>
                            <p className="text-indigo-400 font-bold tracking-[0.8em] text-xs md:text-sm uppercase opacity-80 mt-2">Infinite Flight</p>
                        </div>

                        {/* Character Preview IS NOW PLAY BUTTON */}
                        <div 
                            className="relative w-80 h-80 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95" 
                            onClick={startGame}
                        >
                            {/* Effects for the "Button" feel */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-teal-600/20 rounded-full blur-[50px] animate-pulse group-hover:bg-emerald-500/30 transition-colors"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-white/10 border-dashed animate-[spin_12s_linear_infinite] group-hover:border-emerald-400/30"></div>
                            <div className="absolute inset-4 rounded-full border-2 border-white/5 bg-black/20 backdrop-blur-sm shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"></div>

                            {/* Bird */}
                            <div className="transform scale-[4] transition-transform duration-500 group-hover:scale-[4.2] drop-shadow-2xl z-10 filter group-hover:brightness-110">
                                <Bird y={0} velocity={0} characterStyle={selectedCharacter.style} isPreview />
                            </div>
                            
                            {/* Play Prompt */}
                            <div className="absolute -bottom-8 flex flex-col items-center z-20 animate-bounce pointer-events-none">
                                 <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xl px-8 py-2 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] tracking-widest uppercase border border-white/20">
                                     PLAY
                                 </div>
                                 <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-emerald-500 mt-[-1px]"></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Events Section */}
                    <div className="hidden lg:flex flex-col gap-6 h-full justify-center items-end">
                         {/* Active Event Card */}
                         <div 
                            className="bg-slate-900/80 border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-yellow-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer w-full max-w-sm" 
                            onClick={() => openModal('events')}
                        >
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-yellow-500 group-hover:shadow-[0_0_20px_#eab308] transition-shadow"></div>
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
                            
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <h3 className="text-yellow-400 font-black uppercase tracking-[0.2em] text-xs">Diamond Vault</h3>
                                <span className="bg-yellow-900/50 text-yellow-200 text-[10px] font-bold px-2 py-1 rounded border border-yellow-500/30 animate-pulse">OPEN</span>
                            </div>
                            
                            <div className="text-white font-bold text-2xl mb-2 relative z-10">Vault Exchange</div>
                            <p className="text-slate-400 text-sm mb-6 relative z-10">Swap Coins for Diamonds instantly.</p>
                            
                            <div className="flex items-center gap-2 text-xs text-yellow-400 font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform relative z-10">
                                Enter Vault <span>&rarr;</span>
                            </div>
                         </div>

                         {/* Quick Shop Button */}
                         <div 
                            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800 hover:border-slate-500 transition-all group w-full max-w-sm"
                            onClick={() => openModal('shop')}
                        >
                             <div className="p-3 bg-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                 <ShopIcon className="text-white w-6 h-6"/>
                             </div>
                             <div>
                                 <h3 className="text-white font-bold uppercase tracking-wider text-sm">Item Shop</h3>
                                 <p className="text-slate-400 text-xs">Customize your bird!</p>
                             </div>
                         </div>
                    </div>
                
                    {/* Mobile Only: Simple Row for Extras */}
                    <div className="lg:hidden w-full flex gap-4 mt-8">
                         <button onClick={() => openModal('update')} className="flex-1 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                             <div className="text-blue-400 font-black uppercase text-xs mb-1">Updates</div>
                             <div className="text-white font-bold">v{appVersion}</div>
                         </button>
                         <button onClick={() => openModal('events')} className="flex-1 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                             <div className="text-yellow-400 font-black uppercase text-xs mb-1">Vault</div>
                             <div className="text-white font-bold">Exchange</div>
                         </button>
                         <button onClick={() => openModal('shop')} className="flex-1 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                             <div className="text-green-400 font-black uppercase text-xs mb-1">Shop</div>
                             <div className="text-white font-bold">Items</div>
                         </button>
                    </div>
                </div>
            </div>
        )}

        {gameState === 'getReady' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/40 backdrop-blur-[4px] pointer-events-none">
                 <div className="text-center animate-pulse">
                    <h2 className="text-8xl font-black text-white drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] tracking-tighter italic scale-125 mb-10">{t('GET_READY')}</h2>
                    <div className="bg-white/10 backdrop-blur-xl px-12 py-6 rounded-3xl border-2 border-white/20 inline-block shadow-2xl">
                        <p className="text-2xl text-blue-300 font-black uppercase tracking-[0.3em]">{t('TAP_OR_SPACE')}</p>
                    </div>
                 </div>
             </div>
        )}
        {gameState === 'gameOver' && renderEndScreen()}
      </div>
      
      {activeModal === 'settings' && <SettingsModal onClose={closeModal} t={t} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} onRedeemCode={handleRedeemCode} />}
      {activeModal === 'update' && <UpdateModal onClose={closeModal} t={t} />}
      {activeModal === 'shop' && (
          <ShopModal initialTab="character" characters={characters} selectedCharacterId={selectedCharacterId} backgrounds={backgrounds} selectedBackgroundId={selectedBackgroundId} trails={trails} selectedTrailId={selectedTrailId} pipeSkins={pipeSkins} selectedPipeSkinId={selectedPipeSkinId} currencies={currencies} ownedItems={ownedItems} onPurchaseItem={handlePurchaseItem} onSelectCharacter={setSelectedCharacterId} onSelectBackground={setSelectedBackgroundId} onSelectTrail={setSelectedTrailId} onSelectPipeSkin={setSelectedPipeSkinId} onClose={closeModal} t={t} />
      )}
      {activeModal === 'events' && (
          <EventsModal onClose={closeModal} t={t} serverTime={serverTime} currencies={currencies} onUpdateCurrency={handleUpdateCurrency} ownedItems={ownedItems} onUnlockItem={handleUnlockItem} lastMiningClaimTime={lastMiningClaimTime} onClaimMining={handleClaimMining} />
      )}
    </div>
  );
};

export default App;
