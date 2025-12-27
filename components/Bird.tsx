

import React from 'react';
import { BIRD_WIDTH, BIRD_HEIGHT, GAME_WIDTH } from '../constants';
import { Character } from '../types';

interface BirdProps {
  y: number;
  velocity: number;
  characterStyle: Character['style'];
  isPreview?: boolean;
}

const BirdComponent: React.FC<BirdProps> = ({ y, velocity, characterStyle, isPreview }) => {
  const birdRotation = Math.max(-20, Math.min(90, velocity * -7));
  const wingRotation = velocity > 0 ? -30 : 30;

  const { extra } = characterStyle;

  const baseStyle: React.CSSProperties = {
    background: characterStyle.body,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    zIndex: 20,
    position: 'absolute',
    boxShadow: isPreview ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'inset -5px -5px 10px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.3)',
  };

  const previewStyle: React.CSSProperties = {
      ...baseStyle,
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) rotate(${birdRotation}deg)`,
  };

  const gameStyle: React.CSSProperties = {
      ...baseStyle,
      left: GAME_WIDTH / 2 - BIRD_WIDTH / 2,
      bottom: y,
      transform: `rotate(${birdRotation}deg)`,
  };

  const tailStyle: React.CSSProperties = {
    position: 'absolute',
    borderBottom: '2px solid rgba(0,0,0,0.3)',
    borderRight: '2px solid rgba(0,0,0,0.3)',
    background: extra?.tail?.color || characterStyle.wing,
    bottom: '5px',
    left: '-8px',
    transform: 'rotate(20deg)',
    zIndex: -1,
  };

  if (extra?.tail?.shape === 'fan') {
    Object.assign(tailStyle, {
        width: '30px', height: '30px', left: '-20px', bottom: '0px',
        borderRadius: '100% 0% 0% 100% / 50% 0% 0% 50%',
        borderRight: 'none', borderTop: '1px solid rgba(0,0,0,0.2)', borderLeft: '1px solid rgba(0,0,0,0.2)',
        background: `radial-gradient(circle at 100% 100%, transparent 40%, ${extra.tail.color} 40%)`,
    });
  } else if (extra?.tail?.shape === 'plume') {
    Object.assign(tailStyle, { width: '20px', height: '25px', left: '-12px', borderRadius: '0% 100% 50% 50% / 0% 50% 50% 100%', });
  } else if (extra?.tail?.shape === 'sharp') {
      Object.assign(tailStyle, { width: '18px', height: '18px', left: '-10px', borderRadius: '0% 100% 0% 100% / 0% 20% 80% 100%', });
  } else if (extra?.tail?.shape === 'wisp') {
      Object.assign(tailStyle, { 
        width: '20px', height: '25px', left: '-12px', 
        borderRadius: '50% 50% 0 50%',
        borderBottom: 'none', borderRight: 'none',
        background: `radial-gradient(circle at 70% 70%, ${extra.tail.color}, transparent)`,
        opacity: 0.8 
      });
  } else { // standard
    Object.assign(tailStyle, { width: '15px', height: '15px', borderRadius: '0% 100% 0% 100% / 0% 50% 50% 100%', });
  }

  const crestStyle: React.CSSProperties = {
    position: 'absolute',
    borderTop: '1px solid rgba(0,0,0,0.2)',
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    background: extra?.crest?.color || characterStyle.wing,
    top: '-5px',
    left: '10px',
    transform: 'rotate(-25deg)',
  };

  if (extra?.crest?.shape === 'plume') {
    Object.assign(crestStyle, { width: '12px', height: '18px', borderRadius: '100% 0% 50% 50% / 100% 50% 50% 0%', });
  } else if (extra?.crest?.shape === 'spikes') {
    Object.assign(crestStyle, { width: '15px', height: '10px', background: 'none', border: 'none' });
  } else if (extra?.crest?.shape === 'tuft') {
      Object.assign(crestStyle, { width: '8px', height: '12px', borderRadius: '100% 0% 0% 0% / 100% 100% 0% 0%' });
  } else if (extra?.crest?.shape === 'sharp') {
      Object.assign(crestStyle, { width: '12px', height: '16px', borderRadius: '0% 100% 0% 0% / 0% 100% 0% 0%' });
  } else { // standard
    Object.assign(crestStyle, { width: '10px', height: '10px', borderRadius: '100% 0% 0% 0% / 100% 100% 0% 0%' });
  }
  
  return (
    <div className="bird-container relative" style={isPreview ? previewStyle : gameStyle}>
       {/* Glow Effect */}
       {extra?.glow && <div className="absolute inset-[-8px] rounded-full z-[-1]" style={{ background: `radial-gradient(circle, ${extra.glow} 0%, transparent 70%)` }} />}
       
       <div className={`relative w-full h-full`} style={{ position: 'relative', top: 0, left: 0 }}>
          {/* Specular Highlight for 3D effect */}
          <div className="absolute top-1 left-2 w-4 h-2 bg-white rounded-full opacity-40 blur-[1px] transform -rotate-12 z-10 pointer-events-none"></div>

          <div style={tailStyle} />
          <div style={crestStyle}>
              {extra?.crest?.shape === 'spikes' && (
                  <>
                      <div className="absolute w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px]" style={{ borderBottomColor: extra.crest.color, top: '0', left: '0' }} />
                      <div className="absolute w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px]" style={{ borderBottomColor: extra.crest.color, top: '0', left: '5px' }} />
                  </>
              )}
          </div>
          
          <div className="absolute border-b border-black/20 rounded-r-full shadow-sm" style={{ width: '15px', height: '10px', background: characterStyle.beak, top: '10px', right: '-10px', zIndex: 1 }} />
          <div className="absolute rounded-full shadow-inner" style={{ width: '25px', height: '12px', background: characterStyle.belly, bottom: '-2px', left: '10px' }} />
          <div className="absolute border-t border-white/30 border-b border-black/20" style={{ width: '20px', height: '15px', background: characterStyle.wing, top: '5px', left: '10px', transform: `rotate(${wingRotation}deg)`, transformOrigin: 'top left', transition: 'transform 0.2s ease-out', borderRadius: '50% 0 50% 0', boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }} />
          
          <div className="absolute bg-white rounded-full border border-black/50 shadow-sm" style={{ width: '10px', height: '10px', top: '7px', right: '7px', zIndex: 1 }}>
            <div className="absolute rounded-full" style={{width: '4px', height: '4px', top: '3px', left: '3px', backgroundColor: extra?.eyeColor || 'black'}}></div>
            <div className="absolute rounded-full bg-white w-1.5 h-1.5 top-1 left-1 opacity-80"></div>
          </div>
          
          {extra?.bodyMarking?.type === 'stitches' && (
            <>
              <div className="absolute w-3 h-px top-3 right-2" style={{ transform: 'rotate(20deg)', backgroundColor: extra.bodyMarking.color }} />
              <div className="absolute w-px h-2 top-2 right-3" style={{ transform: 'rotate(20deg)', backgroundColor: extra.bodyMarking.color }} />
              <div className="absolute w-3 h-px bottom-3 left-4" style={{ transform: 'rotate(-30deg)', backgroundColor: extra.bodyMarking.color }} />
              <div className="absolute w-px h-2 bottom-4 left-5" style={{ transform: 'rotate(-30deg)', backgroundColor: extra.bodyMarking.color }} />
            </>
          )}
          {extra?.bodyMarking?.type === 'cracks' && (
              <div className="absolute w-full h-full top-0 left-0">
                  <div className="absolute w-px h-3 top-2 right-4 rotate-[25deg]" style={{backgroundColor: extra.bodyMarking.color}}/>
                  <div className="absolute w-px h-2 top-4 right-3 rotate-[-45deg]" style={{backgroundColor: extra.bodyMarking.color}}/>
              </div>
          )}
           {extra?.bodyMarking?.type === 'swirl' && (
              <div className="absolute top-[10px] left-[5px] w-[20px] h-[10px] border-2 rounded-full border-l-transparent border-b-transparent" style={{ borderColor: extra.bodyMarking.color }} />
          )}
           {extra?.bodyMarking?.type === 'lines' && (
               <div className="absolute w-full h-full top-0 left-0 mix-blend-overlay">
                  <div className="absolute w-px h-full top-0 left-4" style={{backgroundColor: extra.bodyMarking.color}}/>
                  <div className="absolute w-full h-px top-4 left-0" style={{backgroundColor: extra.bodyMarking.color}}/>
              </div>
          )}
          {extra?.bodyMarking?.type === 'gears' && (
              <div className="absolute text-xs" style={{color: extra.bodyMarking.color, top: '12px', left: '8px'}}>⚙</div>
          )}
       </div>
    </div>
  );
};

export const Bird = React.memo(BirdComponent);