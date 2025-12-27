
import React from 'react';
import { Trail as TrailType } from '../types';

interface TrailProps {
  history: { x: number; y: number; time: number }[];
  trail: TrailType | null;
}

const Particle: React.FC<{
  style: React.CSSProperties;
  shape: 'circle' | 'square' | 'star' | 'sparkle' | 'line' | 'swirl' | 'rune';
  color: string;
}> = ({ style, shape, color }) => {
  const commonStyle: React.CSSProperties = {
    ...style,
    position: 'absolute',
    backgroundColor: (shape === 'circle' || shape === 'square' || shape === 'line') ? color : undefined,
    pointerEvents: 'none',
  };

  switch (shape) {
    case 'swirl':
        return (
            <div style={{...commonStyle, width: style.width, height: style.height, backgroundColor: 'transparent'}}>
               <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" style={{width: '100%', height: '100%', filter: 'drop-shadow(0 0 2px white)'}}>
                   <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10" strokeLinecap="round" strokeDasharray="10 5" opacity="0.8"/>
                   <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12" opacity="0.6"/>
               </svg>
            </div>
        );
    case 'rune':
        return (
            <div style={{...commonStyle, width: style.width, height: style.height, backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: style.width, color: color, filter: 'drop-shadow(0 0 5px gold)' }}>
                ✧
            </div>
        );
    case 'square':
      return <div style={commonStyle} />;
    case 'line':
      return <div style={{ ...commonStyle, height: '2px', transform: 'rotate(45deg)' }} />;
    case 'sparkle':
      return (
        <div style={{ ...style, position: 'absolute', pointerEvents: 'none' }}>
          <div style={{ width: style.width, height: '2px', background: color, position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)' }} />
          <div style={{ width: '2px', height: style.height, background: color, position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      );
    case 'star':
      const size = Number(style.width);
      return (
        <div style={{...style, position: 'absolute', pointerEvents: 'none'}}>
            <div style={{
                width: 0,
                height: 0,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                borderBottom: `${size}px solid ${color}`,
                position: 'relative',
            }}>
                <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${size / 2}px solid transparent`,
                    borderRight: `${size / 2}px solid transparent`,
                    borderTop: `${size}px solid ${color}`,
                    position: 'absolute',
                    top: `${size * 0.3}px`,
                    left: `-${size / 2}px`,
                }}/>
            </div>
        </div>
      );
    case 'circle':
    default:
      return <div className="rounded-full" style={commonStyle} />;
  }
};


const TrailComponent: React.FC<TrailProps> = ({ history, trail }) => {
  if (!trail || trail.id === 'none') {
    return null;
  }

  const now = Date.now();
  const { extra } = trail.style;
  const particleShape = extra?.particleShape || 'circle';
  const effect = extra?.effect || '';

  return (
    <>
      <style>{`
        @keyframes glow { 0%, 100% { box-shadow: 0 0 5px 2px currentColor; } 50% { box-shadow: 0 0 10px 5px currentColor; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
        @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes disintegrate { from { transform: scale(1); opacity: 1; } to { transform: scale(0.5); opacity: 0; } }
        @keyframes spiral { from { transform: rotate(0deg) scale(1); } to { transform: rotate(360deg) scale(0.5); } }
      `}</style>
      {history.map((pos) => {
        const age = now - pos.time;
        const maxAge = particleShape === 'swirl' ? 800 : 500;
        if (age > maxAge) return null;
        
        const baseOpacity = 1 - age / maxAge;
        const size = Math.max(2, (particleShape === 'swirl' ? 20 : 10) * (1 - age / maxAge));
        const color = trail.style.colors[Math.floor(Math.random() * trail.style.colors.length)];
        
        const particleStyle: React.CSSProperties = {
              left: pos.x - size / 2,
              bottom: pos.y - size / 2,
              width: size,
              height: size,
              opacity: baseOpacity,
              zIndex: 19,
              color: color, 
        };

        if(effect) {
            const duration = effect === 'flicker' ? 0.2 : (effect === 'spiral' ? 0.8 : 1);
            // We don't apply animation name here to avoid restarting it every frame due to key change? 
            // Actually keys are stable if we use time+id. 
            // But we recreate components. 
            // Simple CSS animation is fine for particles.
            particleStyle.animation = `${effect} ${duration}s infinite linear`;
             if (effect === 'flicker') {
                particleStyle.opacity = (Math.sin(now / (duration * 250)) > 0) ? baseOpacity : baseOpacity * 0.3;
            }
        }
        
        return (
           <Particle
              key={`${pos.time}`} // Use time as unique key for particle lifecycle
              style={particleStyle}
              shape={particleShape}
              color={color}
            />
        );
      })}
    </>
  );
};

export const Trail = React.memo(TrailComponent);
