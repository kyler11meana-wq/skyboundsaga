
import React from 'react';
import { BackgroundInfo } from '../types';

const Cloud: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    className="absolute bg-white rounded-full opacity-60 filter blur-[8px]"
    style={style}
  ></div>
);

const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div
      className="absolute bg-white rounded-full shadow-[0_0_4px_white]"
      style={style}
    ></div>
);

type BackgroundComponentProps = BackgroundInfo['style'] & {
  isPreview?: boolean;
}

const BackgroundComponent: React.FC<BackgroundComponentProps> = ({ scenery, moon, extra, isPreview }) => {
  const showClouds = scenery !== 'elysium'; // Disable standard clouds for Elysium to avoid clutter
  const animateClouds = true;
  const showTwinklingStars = extra?.hasStars;
  
  const animationDuration = isPreview ? 20 : 60;
  const slowerAnimationDuration = isPreview ? 40 : 120;
  const fastestAnimationDuration = isPreview ? 10 : 30;

  const dynamicElements = React.useMemo(() => {
    const elements: { [key: string]: any[] } = {};
    if (showTwinklingStars) {
        elements.stars = Array.from({ length: 50 }).map((_, i) => ({
          id: i,
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 200}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animation: `twinkle ${Math.random() * 5 + 2}s linear infinite`,
            opacity: Math.random() * 0.5 + 0.5,
          },
        }));
    }
    if (extra?.shootingStars) {
        elements.shootingStars = Array.from({ length: 3 }).map((_, i) => ({
            id: i,
            style: {
                top: `${Math.random() * 40}%`,
                left: '0',
                animation: `shooting-star ${3 + Math.random() * 4}s linear infinite ${i * 2}s`,
            }
        }));
    }
     if (extra?.fallingPetals) {
        const petalColors = {
            sakura: ['#f8bbd0', '#fce4ec', '#ffffff'],
            autumn: ['#ff8f00', '#f57f17', '#e65100'],
            divine: ['#fef3c7', '#fcd34d', '#ffffff'],
        }
        const colors = petalColors[extra.fallingPetals as 'sakura' | 'autumn' | 'divine'] || petalColors.sakura;
        
        elements.petals = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 200}%`,
                width: `${Math.random() * 5 + 5}px`,
                height: `${Math.random() * 5 + 5}px`,
                backgroundColor: colors[Math.floor(Math.random() * 3)],
                animation: `fall ${5 + Math.random() * 5}s linear infinite ${Math.random() * 5}s`,
                boxShadow: extra.fallingPetals === 'divine' ? '0 0 5px white' : 'none',
            }
        }));
    }
    if (extra?.bubbles) {
        elements.bubbles = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 200}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animation: `rise ${4 + Math.random() * 6}s linear infinite ${Math.random() * 5}s`,
            }
        }));
    }
    if (extra?.dataLines) {
      elements.lines = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        style: {
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 100 + 50}px`,
          animation: `data-line ${2 + Math.random() * 3}s linear infinite ${Math.random() * 3}s`,
        }
      }));
    }
    if (extra?.floatingRunes) {
        const runes = ['✨', '✧', '✦', '❂', '✺'];
        elements.runes = Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            content: runes[Math.floor(Math.random() * runes.length)],
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80 + 10}%`,
                animation: `float-rune ${4 + Math.random() * 4}s ease-in-out infinite`,
                fontSize: `${10 + Math.random() * 15}px`,
                opacity: 0.6
            }
        }));
    }
    return elements;
  }, [showTwinklingStars, extra]);

  return (
    <>
      <style>
        {`
          @keyframes scroll-bg { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes scroll-bg-slower { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes scroll-bg-fastest { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes twinkle { 0%, 100% { opacity: 0.5; box-shadow: 0 0 2px white; } 50% { opacity: 1; box-shadow: 0 0 6px white; } }
          @keyframes shooting-star {
            0% { transform: translateX(550px) translateY(-550px) scale(1); opacity: 1; }
            100% { transform: translateX(-550px) translateY(550px) scale(0); opacity: 0; }
          }
          @keyframes fall { from { transform: translateY(-10vh); } to { transform: translateY(110vh); } }
          @keyframes rise { from { transform: translateY(100vh); opacity: 0.8; } to { transform: translateY(-10vh); opacity: 0; } }
          @keyframes glow { from { opacity: 0.2; } to { opacity: 1; } }
          @keyframes data-line { 
            from { transform: translateX(-200px); opacity: 0; } 
            50% { opacity: 0.7; }
            to { transform: translateX(1200px); opacity: 0; } 
          }
          @keyframes float-island {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes god-ray {
            0% { transform: rotate(45deg) translateX(-50%) scaleX(1); opacity: 0.3; }
            50% { transform: rotate(45deg) translateX(-50%) scaleX(1.2); opacity: 0.6; }
            100% { transform: rotate(45deg) translateX(-50%) scaleX(1); opacity: 0.3; }
          }
          @keyframes float-rune {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
            50% { transform: translateY(-15px) rotate(10deg); opacity: 0.8; }
            100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          }
          .scrolling-bg { animation: scroll-bg ${animationDuration}s linear infinite; }
          .scrolling-bg-slower { animation: scroll-bg-slower ${slowerAnimationDuration}s linear infinite; }
          .scrolling-bg-fastest { animation: scroll-bg-fastest ${fastestAnimationDuration}s linear infinite; }
        `}
      </style>
      
       {/* Background Base */}
       <div className="absolute inset-0 z-0" style={{ background: extra?.distantScenery === 'neon_city' ? 'linear-gradient(to bottom, #020617, #1e1b4b, #312e81)' : scenery === 'hills' ? 'linear-gradient(to bottom, #38bdf8 0%, #7dd3fc 60%, #bae6fd 100%)' : scenery === 'forest' ? 'linear-gradient(to bottom, #a5f3fc 0%, #cffafe 40%, #fef08a 70%, #fdba74 100%)' : scenery === 'candy_hills' ? 'linear-gradient(to bottom, #ffdde1, #ee9ca7 40%, #a7bfe8 100%)' : scenery === 'olympus' ? 'linear-gradient(to bottom, #fef3c7, #fcd34d, #fbbf24)' : scenery === 'elysium' ? 'linear-gradient(to bottom, #1e3a8a 0%, #3b82f6 40%, #fef3c7 80%, #fffbeb 100%)' : 'linear-gradient(to bottom, #0f172a, #334155)' }}></div>

       {extra?.sun && <div className="absolute top-[10%] left-[15%] w-32 h-32 bg-yellow-100 rounded-full shadow-[0_0_60px_30px_rgba(253,224,71,0.6)] blur-sm z-0"/>}
       
       {extra?.godRays && (
           <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
               <div className="absolute top-[-50%] left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl animate-[god-ray_8s_ease-in-out_infinite]"></div>
               <div className="absolute top-[-50%] left-1/3 w-[150%] h-[200%] bg-gradient-to-r from-transparent via-yellow-100/5 to-transparent blur-xl animate-[god-ray_12s_ease-in-out_infinite_reverse]"></div>
           </div>
       )}

       {moon && (
        <div className="absolute top-[15%] left-[25%] w-24 h-24 bg-slate-200 rounded-full shadow-[0_0_40px_10px_rgba(255,255,255,0.4)] z-0">
            <div className="absolute top-4 right-6 w-6 h-6 bg-slate-300 rounded-full opacity-50 blur-[1px]" />
            <div className="absolute bottom-6 left-6 w-8 h-8 bg-slate-300 rounded-full opacity-50 blur-[1px]" />
        </div>
      )}

      {/* Background Elements (Clouds, Stars, etc.) */}
      <div className={`absolute top-0 left-0 w-[200%] h-full z-0 ${animateClouds ? 'scrolling-bg' : ''}`}>
         {showClouds && (
            <>
                <Cloud style={{ top: '20%', left: '10%', width: 120, height: 40 }} />
                <Cloud style={{ top: '30%', left: '30%', width: 160, height: 50 }} />
                <Cloud style={{ top: '15%', left: '75%', width: 140, height: 45 }} />
                <Cloud style={{ top: '20%', left: '110%', width: 120, height: 40 }} />
                <Cloud style={{ top: '30%', left: '130%', width: 160, height: 50 }} />
                <Cloud style={{ top: '15%', left: '175%', width: 140, height: 45 }} />
            </>
         )}
        {dynamicElements.stars?.map(star => <Star key={star.id} style={star.style} />)}
        {dynamicElements.shootingStars?.map(star => <div key={star.id} style={star.style} className="absolute w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full -rotate-45 blur-[1px]" />)}
        {dynamicElements.lines?.map(line => <div key={line.id} style={line.style} className="absolute h-0.5 bg-cyan-400 blur-[1px] opacity-0" />)}
        {dynamicElements.runes?.map(rune => <div key={rune.id} style={rune.style} className="absolute text-yellow-200 pointer-events-none">{rune.content}</div>)}
      </div>

      {/* Distant Scenery (Silhouette Layers) */}
      <div className={`absolute bottom-0 left-0 w-[200%] h-full z-0 scrolling-bg-slower opacity-80`}>
        
        {extra?.distantScenery === 'neon_city' && <>
          {/* Cyberpunk Cityscape */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="absolute bottom-0 bg-indigo-950 border-t border-cyan-500/50 shadow-[0_-5px_20px_rgba(34,211,238,0.2)]" 
                   style={{ 
                       left: `${i * 10}%`, 
                       width: `${5 + Math.random() * 5}%`, 
                       height: `${20 + Math.random() * 40}%`,
                       zIndex: 1
                   }}>
                   <div className="w-full h-full opacity-30 bg-[linear-gradient(rgba(34,211,238,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.5)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
              </div>
          ))}
        </>}

        {extra?.distantScenery === 'floating_islands' && (
            <>
                {Array.from({length: 8}).map((_, i) => (
                    <div key={i} className="absolute z-0" 
                        style={{ 
                            left: `${10 + i * 25}%`, 
                            top: `${20 + Math.random() * 30}%`,
                            width: '120px',
                            height: '60px',
                            background: 'linear-gradient(to bottom, #f8fafc, #cbd5e1)',
                            borderRadius: '50% 50% 40% 40% / 60% 60% 30% 30%',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            animation: `float-island ${3 + Math.random() * 2}s ease-in-out infinite alternate ${Math.random()}s`
                        }}>
                        {/* Hanging Vines/Roots */}
                        <div className="absolute bottom-2 left-4 w-1 h-8 bg-green-700/50 rounded-full"></div>
                        <div className="absolute bottom-0 left-8 w-1 h-5 bg-green-700/50 rounded-full"></div>
                        <div className="absolute bottom-3 right-6 w-1 h-10 bg-stone-400/50 rounded-full"></div>
                        
                        {/* Ruins on top */}
                        <div className="absolute -top-4 left-4 w-2 h-6 bg-stone-300 border-r border-stone-400"></div>
                        <div className="absolute -top-6 left-8 w-2 h-8 bg-stone-300 border-r border-stone-400"></div>
                        <div className="absolute -top-8 left-12 w-2 h-10 bg-stone-300 border-r border-stone-400"></div>
                        <div className="absolute -top-8 left-4 w-10 h-1 bg-stone-300"></div>
                    </div>
                ))}
            </>
        )}
        
        {extra?.distantScenery === 'heaven_gates' && (
            <div className="absolute w-full h-full">
                {/* Giant Gate Silhouette */}
                <div className="absolute bottom-0 left-[20%] w-[10%] h-[60%] bg-gradient-to-t from-orange-200/50 to-white/10 rounded-t-full border-4 border-yellow-200/30"></div>
                <div className="absolute bottom-0 left-[70%] w-[10%] h-[60%] bg-gradient-to-t from-orange-200/50 to-white/10 rounded-t-full border-4 border-yellow-200/30"></div>
                <div className="absolute bottom-[50%] left-[20%] w-[60%] h-[10%] bg-yellow-100/20 rounded-full blur-md"></div>
            </div>
        )}

        {extra?.distantScenery === 'elysium_spires' && (
            <div className="absolute w-full h-full">
                {/* Majestic Spires */}
                {Array.from({length: 6}).map((_, i) => (
                    <div key={i} className="absolute bottom-0 bg-gradient-to-t from-white/90 to-blue-200/50 backdrop-blur-sm" 
                        style={{
                            left: `${15 * i + 5}%`,
                            width: `${4 + Math.random() * 4}%`,
                            height: `${40 + Math.random() * 40}%`,
                            borderRadius: '50% 50% 0 0',
                            boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                        }}
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-200/80 rounded-full shadow-[0_0_10px_gold]"></div>
                    </div>
                ))}
            </div>
        )}
      </div>
      
      {/* Mid-ground Scenery */}
      <div className={`absolute bottom-0 left-0 w-[200%] h-64 z-0 scrolling-bg-slower`}>
        {scenery === 'hills' && (
          <div className="w-full h-full relative">
             <div className="absolute bottom-0 left-0 w-full h-32 bg-[#4ade80] rounded-t-[50%] scale-150 origin-bottom"></div>
             <div className="absolute bottom-0 left-[50%] w-full h-48 bg-[#22c55e] rounded-t-[60%] scale-150 origin-bottom -z-10"></div>
          </div>
        )}
        {scenery === 'forest' && (
          <div className="w-full h-full relative">
             {/* Back Hills */}
             <div className="absolute bottom-0 left-[-20%] w-[140%] h-48 bg-[#166534] rounded-t-[100%] scale-x-150 origin-bottom"></div>
             
             {/* Trees on Back Hill */}
             {Array.from({length: 12}).map((_, i) => (
                 <div key={`ft-b-${i}`} className="absolute bottom-24" style={{ 
                     left: `${i * 9}%`,
                     transform: `scale(${0.6 + Math.random() * 0.3})`
                 }}>
                     <div className="w-2 h-6 bg-[#3f2e18] mx-auto opacity-80"></div>
                     <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[35px] border-b-[#14532d] -mt-5 mx-auto"></div>
                     <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[25px] border-b-[#15803d] -mt-4 mx-auto"></div>
                 </div>
             ))}

             {/* Front Hill */}
             <div className="absolute bottom-0 right-[-10%] w-[120%] h-24 bg-[#22c55e] rounded-t-[50%] scale-x-125 origin-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.1)]"></div>

             {/* Trees on Front Hill */}
             {Array.from({length: 7}).map((_, i) => (
                 <div key={`ft-f-${i}`} className="absolute bottom-10 z-10" style={{ 
                     left: `${10 + i * 15 + Math.random() * 5}%`,
                     transform: `scale(${0.9 + Math.random() * 0.2})`
                 }}>
                     <div className="w-3 h-8 bg-[#451a03] mx-auto"></div>
                     <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[50px] border-b-[#16a34a] -mt-7 mx-auto shadow-sm"></div>
                     <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[40px] border-b-[#4ade80] -mt-6 mx-auto"></div>
                 </div>
             ))}
          </div>
        )}
        {scenery === 'mountains' && (
          <div className="w-full h-full flex items-end">
             {Array.from({length: 10}).map((_, i) => (
                 <div key={i} style={{
                     width: 0, height: 0,
                     borderLeft: '100px solid transparent',
                     borderRight: '100px solid transparent',
                     borderBottom: `250px solid ${i % 2 === 0 ? '#475569' : '#334155'}`,
                     marginLeft: '-50px'
                 }}></div>
             ))}
          </div>
        )}
        {(scenery === 'olympus' || scenery === 'elysium') && (
            <div className="w-full h-full relative">
                {/* Golden Cloud Floor / Marble Floor */}
                <div className="absolute bottom-0 w-full h-40 flex">
                    {Array.from({length: 20}).map((_, i) => (
                        <div key={i} className={`w-32 h-32 rounded-full -ml-10 blur-sm shadow-inner ${scenery === 'elysium' ? 'bg-gradient-to-t from-white to-blue-50' : 'bg-gradient-to-t from-orange-100 to-white'}`} style={{ transform: `scale(${1 + Math.random() * 0.5})` }}></div>
                    ))}
                </div>
                {/* Pillars in background */}
                {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className="absolute bottom-10 w-8 h-48 bg-stone-200 border-l-4 border-stone-300" style={{ left: `${i * 20}%` }}>
                        <div className="absolute -top-2 -left-2 w-12 h-4 bg-stone-300 rounded-sm"></div>
                        <div className={`absolute bottom-0 left-0 w-full h-full opacity-50 ${scenery === 'elysium' ? 'bg-gradient-to-t from-blue-200 to-transparent' : 'bg-gradient-to-t from-orange-200 to-transparent'}`}></div>
                    </div>
                ))}
            </div>
        )}
        {scenery === 'candy_hills' && (
          <div className="w-full h-full relative">
             {/* Back Hill - Gummy Purple */}
             <div className="absolute bottom-0 left-[10%] w-full h-40 rounded-t-[100%] scale-125 origin-bottom-left -z-20" style={{ background: 'radial-gradient(circle at 50% 0%, #e879f9, #a21caf)', boxShadow: 'inset 0 10px 20px rgba(255,255,255,0.3)' }}></div>
             
             {/* Front Hill - Chocolate with 3D effect */}
             <div className="absolute bottom-0 right-[10%] w-[120%] h-28 rounded-t-[100%] scale-110 origin-bottom-right z-0" style={{ background: 'linear-gradient(to bottom, #8d6e63, #3e2723)', boxShadow: '0 -5px 15px rgba(0,0,0,0.3)' }}>
                {/* White Icing Layer */}
                <div className="absolute top-0 left-0 w-full h-6 bg-white opacity-90" style={{ maskImage: 'radial-gradient(circle at bottom, transparent 60%, black 65%)', maskSize: '40px 20px', maskRepeat: 'repeat-x', WebkitMaskImage: 'radial-gradient(circle at bottom, transparent 60%, black 65%)', WebkitMaskSize: '40px 20px', WebkitMaskRepeat: 'repeat-x' }}></div>
                <div className="absolute top-0 w-full h-2 bg-white rounded-t-[100%] opacity-90 blur-[1px]"></div>
             </div>

             {/* Decorative 3D Lollipops */}
             {Array.from({length: 6}).map((_, i) => (
                 <div key={i} className="absolute bottom-16 z-[-1] origin-bottom transform hover:scale-110 transition-transform duration-500" style={{ left: `${5 + i * 18 + Math.random() * 5}%`, transform: `rotate(${Math.random() * 10 - 5}deg) scale(${0.7 + Math.random() * 0.5})` }}>
                     <div className="w-1.5 h-24 bg-white mx-auto shadow-sm" style={{ background: 'repeating-linear-gradient(45deg, #eee, #eee 5px, #ddd 5px, #ddd 10px)' }}></div> {/* Stick */}
                     <div className="w-12 h-12 rounded-full border-2 border-white shadow-[0_5px_15px_rgba(0,0,0,0.2)] -mt-1 relative overflow-hidden" 
                          style={{ 
                              background: `conic-gradient(${['#ff5252', '#448aff', '#69f0ae', '#e040fb'][i % 4]} 0deg, white 45deg, ${['#ff5252', '#448aff', '#69f0ae', '#e040fb'][i % 4]} 90deg, white 135deg, ${['#ff5252', '#448aff', '#69f0ae', '#e040fb'][i % 4]} 180deg, white 225deg, ${['#ff5252', '#448aff', '#69f0ae', '#e040fb'][i % 4]} 270deg, white 315deg)`,
                          }}>
                          {/* Shine */}
                          <div className="absolute top-2 left-2 w-4 h-2 bg-white rounded-full opacity-60 blur-[1px]"></div>
                     </div>
                 </div>
             ))}
          </div>
        )}
      </div>
      
      {/* Foreground Elements */}
      <div className={`absolute top-0 left-0 w-[200%] h-full z-1 scrolling-bg-fastest`}>
        {dynamicElements.petals?.map(petal => <div key={petal.id} style={petal.style} className="absolute rounded-full shadow-sm" />)}
        {dynamicElements.bubbles?.map(bubble => <div key={bubble.id} style={bubble.style} className="absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-sm shadow-inner" />)}
      </div>

       {extra?.fog && <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/30 via-white/10 to-transparent z-10 blur-xl pointer-events-none" />}

    </>
  );
};

export const Background = React.memo(BackgroundComponent);
