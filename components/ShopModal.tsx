
import React, { useState } from 'react';
import { Character, BackgroundInfo, Trail, PipeSkin, Currencies, Rarity } from '../types';
import { Bird } from './Bird';
import { Background as BackgroundComponent } from './Background';
import { TrailPreview } from './TrailPreview';
import { DiamondIcon, CoinIcon } from './Icons';
import { powerUps } from '../powerUps';

interface ShopModalProps {
  initialTab: 'character' | 'background' | 'trail' | 'pipe';
  characters: Character[];
  selectedCharacterId: string;
  backgrounds: BackgroundInfo[];
  selectedBackgroundId: string;
  trails: Trail[];
  selectedTrailId: string;
  pipeSkins: PipeSkin[];
  selectedPipeSkinId: string;

  currencies: Currencies;
  
  ownedItems: string[];
  onPurchaseItem: (item: any) => boolean;

  onSelectCharacter: (id: string) => void;
  onSelectBackground: (id: string) => void;
  onSelectTrail: (id: string) => void;
  onSelectPipeSkin: (id: string) => void;
  
  onClose: () => void;
  t: (key: string) => string;
}

const RARITY_COLORS: Record<Rarity, string> = {
    common: '#94a3b8',
    rare: '#3b82f6',
    deluxe: '#a855f7',
    legendary: '#f59e0b',
    divine: '#fecaca', 
};

const RARITY_BORDER_COLORS: Record<Rarity, string> = {
    common: 'border-slate-500',
    rare: 'border-blue-500',
    deluxe: 'border-purple-500',
    legendary: 'border-amber-500',
    divine: 'border-rose-500',
};

const RARITY_BG_STYLES: Record<Rarity, string> = {
    common: 'bg-gradient-to-b from-slate-700 to-slate-800',
    rare: 'bg-gradient-to-b from-blue-900/50 to-slate-900',
    deluxe: 'bg-gradient-to-b from-purple-900/50 to-slate-900',
    legendary: 'bg-gradient-to-b from-amber-900/50 to-slate-900',
    divine: 'bg-gradient-to-b from-rose-900/50 to-slate-900',
};

export const ShopModal: React.FC<ShopModalProps> = ({
  initialTab,
  characters, selectedCharacterId,
  backgrounds, selectedBackgroundId,
  trails, selectedTrailId,
  pipeSkins, selectedPipeSkinId,
  currencies,
  ownedItems,
  onPurchaseItem,
  onSelectCharacter, onSelectBackground, onSelectTrail, onSelectPipeSkin,
  onClose, t
}) => {
  const [activeTab, setActiveTab] = useState<'character' | 'background' | 'trail' | 'pipe' | 'abilities'>(initialTab as any || 'character');
  const [purchaseMsg, setPurchaseMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const tabs = [
    { id: 'character', icon: '🐦', label: t('CHARACTER') },
    { id: 'background', icon: '🌄', label: t('BACKGROUND') },
    { id: 'trail', icon: '✨', label: t('TRAILS') },
    { id: 'pipe', icon: '🟩', label: t('PIPES') },
    { id: 'abilities', icon: '⚡', label: 'ABILITIES' },
  ];

  const handleItemClick = (item: any, selectHandler: (id: string) => void) => {
      const isOwned = ownedItems.includes(item.id);

      if (isOwned) {
          selectHandler(item.id);
      } else {
          // Attempt Purchase
          const success = onPurchaseItem(item);
          if (success) {
              setPurchaseMsg({ type: 'success', text: 'Item Unlocked!' });
              selectHandler(item.id); // Auto equip on buy
          } else {
              const currencyName = item.currency === 'diamonds' ? 'Diamonds' : 'Coins';
              setPurchaseMsg({ type: 'error', text: `Not enough ${currencyName}!` });
          }
          setTimeout(() => setPurchaseMsg(null), 2000);
      }
  };

  const handlePowerUpPurchase = (item: any) => {
      if (ownedItems.includes(item.id)) return;
      
      const success = onPurchaseItem(item);
      if (success) {
          setPurchaseMsg({ type: 'success', text: 'Ability Acquired!' });
      } else {
          setPurchaseMsg({ type: 'error', text: 'Not enough Diamonds!' });
      }
      setTimeout(() => setPurchaseMsg(null), 2000);
  };

  const renderPipePreview = (skin: PipeSkin) => {
      return (
          <div className="w-10 h-24 relative flex flex-col justify-between border-x-4 shadow-lg transform rotate-12" style={{ borderColor: skin.style.borderColor }}>
               <div className="w-full h-6 border-b-4" style={{ background: skin.style.headGradient, borderColor: skin.style.borderColor }}></div>
               <div className="flex-grow" style={{ background: skin.style.bodyGradient }}></div>
               <div className="w-full h-6 border-t-4" style={{ background: skin.style.headGradient, borderColor: skin.style.borderColor }}></div>
          </div>
      );
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 p-4 z-50 backdrop-blur-md">
      <div className="w-full max-w-7xl flex flex-col h-[95vh] bg-[#0f172a] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-slate-700">
        
        {/* Top Bar */}
        <div className="bg-[#1e293b] p-4 flex flex-col gap-4 border-b border-slate-700 shadow-md z-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
                        <span className="text-2xl">🛒</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-wide uppercase">{t('SHOP')}</h2>
                </div>
                
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700">
                        <DiamondIcon className="w-5 h-5 text-cyan-400 filter drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
                        <span className="text-cyan-400 font-mono font-bold text-lg">{currencies.diamonds}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700">
                        <CoinIcon className="w-5 h-5 text-yellow-400 filter drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                        <span className="text-yellow-400 font-mono font-bold text-lg">{currencies.coins}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold text-sm uppercase tracking-wide whitespace-nowrap border-b-4 ${
                            activeTab === tab.id 
                            ? 'bg-slate-700 text-white border-blue-500 shadow-lg' 
                            : 'bg-slate-800 text-slate-400 border-slate-800 hover:bg-slate-700 hover:text-white'
                        }`}
                    >
                        <span className="text-lg">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-[#0B1120] relative">
             <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20 pointer-events-none"></div>

             {purchaseMsg && (
                <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 px-8 py-4 rounded-full text-white font-bold shadow-2xl flex items-center gap-3 backdrop-blur-md border-2 ${purchaseMsg.type === 'success' ? 'bg-green-600/90 border-green-400' : 'bg-red-600/90 border-red-400'} animate-bounce`}>
                    <span>{purchaseMsg.type === 'success' ? '✨' : '⚠️'}</span>
                    {purchaseMsg.text}
                </div>
            )}

            {activeTab === 'abilities' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {powerUps.map((item) => {
                        const isOwned = ownedItems.includes(item.id);
                        const color = RARITY_COLORS[item.rarity];
                        
                        return (
                            <div key={item.id} className={`relative group bg-slate-800 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${isOwned ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-slate-600 hover:border-yellow-500 hover:scale-[1.02] hover:shadow-xl'}`}>
                                <div className="absolute top-0 right-0 p-2">
                                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-black/50" style={{ color }}>{item.rarity}</span>
                                </div>
                                
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-center mb-4 text-6xl filter drop-shadow-lg animate-pulse">{item.icon}</div>
                                    
                                    <h3 className="text-xl font-black text-white mb-2 text-center">{item.name}</h3>
                                    <p className="text-slate-400 text-sm text-center mb-6 flex-grow">{item.description}</p>
                                    
                                    {isOwned ? (
                                        <div className="bg-green-600/20 border border-green-500 text-green-400 font-bold text-center py-3 rounded-xl uppercase tracking-wider">
                                            Active
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handlePowerUpPurchase(item)}
                                            className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1"
                                        >
                                            <span>{item.price}</span>
                                            <DiamondIcon className="w-4 h-4 text-white" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {(activeTab === 'character' ? characters :
                      activeTab === 'background' ? backgrounds :
                      activeTab === 'trail' ? trails :
                      pipeSkins).map((item: any) => {
                        
                        const isOwned = ownedItems.includes(item.id);
                        
                        const isSelected = 
                            (activeTab === 'character' && selectedCharacterId === item.id) ||
                            (activeTab === 'background' && selectedBackgroundId === item.id) ||
                            (activeTab === 'trail' && selectedTrailId === item.id) ||
                            (activeTab === 'pipe' && selectedPipeSkinId === item.id);
                        
                        const selectHandler = 
                            activeTab === 'character' ? onSelectCharacter :
                            activeTab === 'background' ? onSelectBackground :
                            activeTab === 'trail' ? onSelectTrail :
                            onSelectPipeSkin;

                        const rarityColor = RARITY_COLORS[item.rarity as Rarity] || RARITY_COLORS.common;
                        const borderColor = RARITY_BORDER_COLORS[item.rarity as Rarity] || RARITY_BORDER_COLORS.common;
                        const bgStyle = RARITY_BG_STYLES[item.rarity as Rarity] || RARITY_BG_STYLES.common;

                        return (
                            <div 
                                key={item.id} 
                                onClick={() => !isSelected && handleItemClick(item, selectHandler)}
                                className={`relative group rounded-2xl overflow-hidden border-2 flex flex-col transition-all duration-300 ${
                                    isSelected 
                                    ? 'border-green-400 scale-[1.03] shadow-[0_0_20px_rgba(74,222,128,0.3)] z-10' 
                                    : (!isOwned) 
                                        ? 'border-slate-600 opacity-90 hover:opacity-100 hover:border-slate-400' 
                                        : `${borderColor} hover:scale-[1.02] hover:shadow-xl`
                                }`}
                            >
                                {/* Header / Rarity Strip */}
                                <div className="h-1 w-full" style={{ backgroundColor: isOwned ? rarityColor : '#475569' }}></div>
                                
                                {/* Preview Area */}
                                <div className={`aspect-square relative overflow-hidden flex items-center justify-center p-4 ${isOwned ? bgStyle : 'bg-slate-800'}`}>
                                    {/* Locked Overlay */}
                                    {(!isOwned) && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                                            <span className="text-3xl filter drop-shadow-md">🔒</span>
                                        </div>
                                    )}

                                    {/* Render Content */}
                                    <div className={`relative z-10 transform ${isOwned ? 'group-hover:scale-110' : ''} transition-transform duration-500 w-full h-full flex items-center justify-center ${(!isOwned) ? 'blur-[1px]' : ''}`}>
                                        {activeTab === 'character' && <div className="scale-125"><Bird y={0} velocity={0} characterStyle={item.style} isPreview /></div>}
                                        {activeTab === 'background' && (
                                            <div className="absolute inset-0 w-[400%] h-[400%] transform scale-[0.25] origin-top-left pointer-events-none rounded-lg overflow-hidden">
                                                <BackgroundComponent {...item.style} isPreview />
                                            </div>
                                        )}
                                        {activeTab === 'trail' && <div className="w-full h-full"><TrailPreview trail={item} t={t} /></div>}
                                        {activeTab === 'pipe' && renderPipePreview(item)}
                                    </div>

                                    {/* Equipped Badge */}
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg z-30">
                                            EQUIPPED
                                        </div>
                                    )}
                                </div>

                                {/* Info Footer */}
                                <div className="bg-slate-800 p-3 flex flex-col gap-1 border-t border-slate-700/50">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase opacity-70" style={{ color: isOwned ? rarityColor : '#94a3b8' }}>{item.rarity}</span>
                                        {(!isOwned) ? (
                                            <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-600">
                                                <span className={`${item.currency === 'diamonds' ? 'text-cyan-400' : 'text-yellow-400'} text-xs font-mono font-bold`}>{item.price}</span>
                                                {item.currency === 'diamonds' ? (
                                                    <DiamondIcon className="w-3 h-3 text-cyan-400" />
                                                ) : (
                                                    <CoinIcon className="w-3 h-3 text-yellow-400" />
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold uppercase text-green-400">
                                                Owned
                                            </span>
                                        )}
                                    </div>
                                    <h4 className={`font-bold text-sm truncate leading-tight ${isOwned ? 'text-white' : 'text-slate-400'}`}>{t(item.name)}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="bg-[#1e293b] p-4 border-t border-slate-700 flex justify-end">
            <button 
                onClick={onClose} 
                className="px-10 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm border-b-4 border-slate-900 active:border-b-0 active:translate-y-1"
            >
              {t('BACK')}
            </button>
        </div>
      </div>
    </div>
  );
};
