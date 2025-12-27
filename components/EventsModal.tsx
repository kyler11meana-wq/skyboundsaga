
import React, { useState } from 'react';
import { DiamondIcon, CoinIcon } from './Icons';
import { audioManager } from '../utils/audio';

interface EventsModalProps {
  onClose: () => void;
  t: (key: string) => string;
  serverTime: Date;
  currencies: { diamonds: number; coins: number };
  onUpdateCurrency: (type: 'diamonds' | 'coins', amount: number) => void;
  ownedItems: string[];
  onUnlockItem: (itemId: string) => void;
  lastMiningClaimTime: number;
  onClaimMining: () => number;
}

interface Reward {
    type: 'COINS' | 'DIAMONDS' | 'ITEM';
    amount?: number;
    itemId?: string;
    itemName?: string;
    rarity?: string;
}

export const EventsModal: React.FC<EventsModalProps> = ({ 
    onClose, t, currencies, onUpdateCurrency
}) => {
  const [activeTab, setActiveTab] = useState<'vault'>('vault');
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState<Reward[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  // Diamond Vault Logic
  const spinDiamondVault = (count: number) => {
      const cost = count * 1000;
      if (currencies.coins < cost) {
          setMsg('Not enough Coins!');
          audioManager.playCrash();
          return;
      }
      if (isSpinning) return;

      onUpdateCurrency('coins', -cost);
      
      // Start Spin Effect
      setIsSpinning(true);
      setResults(null);
      setMsg(null);
      audioManager.playClick();
      audioManager.startSpinSound(); // Start looping sound

      setTimeout(() => {
          // Stop Spin Effect
          audioManager.stopSpinSound();

          const newResults: Reward[] = [];
          let diamondsWon = 0;

          for (let i = 0; i < count; i++) {
              // 100% Chance for 100 Diamonds
              diamondsWon += 100;
              newResults.push({ type: 'DIAMONDS', amount: 100 });
          }

          onUpdateCurrency('diamonds', diamondsWon);
          setResults(newResults);
          setIsSpinning(false);
          audioManager.playVictory();
      }, 2000);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 p-4 z-50 backdrop-blur-md">
      <div className="w-full max-w-6xl h-[90vh] bg-[#0f172a] rounded-3xl border-2 border-slate-700 flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header Tabs */}
        <div className="flex border-b border-slate-700 bg-slate-900 justify-center">
            <button 
                onClick={() => { setActiveTab('vault'); setResults(null); setMsg(null); }}
                className={`flex-1 max-w-md py-6 font-black uppercase tracking-widest text-lg transition-all relative overflow-hidden ${activeTab === 'vault' ? 'text-cyan-200 bg-gradient-to-b from-cyan-900/50 to-slate-900' : 'text-slate-500 hover:text-slate-300'}`}
            >
                {activeTab === 'vault' && <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>}
                DIAMOND VAULT
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow relative flex flex-col md:flex-row">
            
            {/* Background Effects */}
            <div className={`absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,#0891b2_0%,transparent_70%)]`}></div>

            {/* Left: Info & Probabilities */}
            <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-slate-700 bg-slate-900/50 flex flex-col justify-center z-10">
                <h2 className={`text-4xl font-black mb-2 italic uppercase text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]`}>
                    Diamond Vault
                </h2>
                <p className="text-slate-400 text-sm font-mono mb-8">
                    Guaranteed Diamond conversion!
                </p>

                <div className="bg-slate-800 rounded-xl p-4 border border-slate-600 shadow-lg">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">Details</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between font-bold"><span className="text-cyan-200 text-shadow-sm">100%</span> <span className="text-cyan-100">100 Diamonds</span></div>
                        <div className="text-[10px] text-slate-500 mt-1 italic">Per 1,000 Coin draw</div>
                    </div>
                </div>
            </div>

            {/* Right: Interaction */}
            <div className="flex-grow flex flex-col items-center justify-center p-8 relative">
                
                {/* Result Display */}
                <div className="flex-grow w-full flex items-center justify-center mb-8 min-h-[200px]">
                    {isSpinning ? (
                        <div className={`text-9xl animate-spin grayscale filter drop-shadow-2xl`}>
                            💠
                        </div>
                    ) : results ? (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-[zoomIn_0.3s_ease-out] w-full max-h-80 overflow-y-auto custom-scrollbar p-2">
                            {results.map((r, i) => (
                                <div key={i} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 shadow-lg bg-slate-800 border-slate-600`}>
                                    <div className="text-3xl mb-2">
                                        {r.type === 'COINS' ? <CoinIcon className="w-8 h-8 text-yellow-400"/> : r.type === 'DIAMONDS' ? <DiamondIcon className="w-8 h-8 text-cyan-400"/> : '🎁'}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase text-center text-white`}>
                                        {r.itemName || r.amount?.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-slate-600 font-black text-6xl opacity-30 select-none">
                            EXCHANGE
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-8 w-full max-w-lg z-10">
                    <button onClick={() => spinDiamondVault(1)} disabled={isSpinning} className="group relative bg-slate-800 hover:bg-slate-700 border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 rounded-2xl p-4 transition-all">
                        <span className="block text-center font-black text-white text-xl italic mb-1">DRAW x1</span>
                        <div className="flex justify-center items-center gap-1 bg-black/40 rounded-full py-1">
                            <span className="text-yellow-400 font-bold font-mono">1,000</span>
                            <CoinIcon className="w-4 h-4 text-yellow-400" />
                        </div>
                    </button>
                    <button onClick={() => spinDiamondVault(5)} disabled={isSpinning} className="group relative bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 border-b-4 border-cyan-900 active:border-b-0 active:translate-y-1 rounded-2xl p-4 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                        <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-md">MAX</div>
                        <span className="block text-center font-black text-white text-xl italic mb-1">DRAW x5</span>
                        <div className="flex justify-center items-center gap-1 bg-black/40 rounded-full py-1">
                            <span className="text-white font-bold font-mono">5,000</span>
                            <CoinIcon className="w-4 h-4 text-white" />
                        </div>
                    </button>
                </div>

                {msg && <div className="absolute top-4 bg-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg animate-bounce z-20 border-2 border-emerald-400">{msg}</div>}
            </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center">
            <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700">
                    <DiamondIcon className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-400 font-mono font-bold text-lg">{currencies.diamonds.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700">
                    <CoinIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-mono font-bold text-lg">{currencies.coins.toLocaleString()}</span>
                </div>
            </div>
            <button onClick={onClose} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 text-sm uppercase tracking-wider">
                CLOSE
            </button>
        </div>
      </div>
    </div>
  );
};
