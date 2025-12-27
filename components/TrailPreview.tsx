
import React from 'react';
import { Trail as TrailType } from '../types';

interface TrailPreviewProps {
  trail: TrailType | null;
  t: (key: string) => string;
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
               <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" style={{width: '100%', height: '100%'}}>
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


export const TrailPreview: React.FC<TrailPreviewProps> = ({ trail, t }) => {
  if (!trail || trail.id === 'none') {
    return (
      <div className="w-full h-full bg-white/90 flex items-center justify-center rounded-lg">
          {/* A subtle clean white look as requested for "None" */}
      </div>
    );
  }
  
  const { extra, colors } = trail.style;
  const particleShape = extra?.particleShape || 'circle';
  const effect = extra?.effect || 'none';
  const numParticles = 15;

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-gray-800 rounded-lg">
      <style>{`
        @keyframes fly-across {
          0% { transform: translateX(-20px) scale(1.2); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(250px) scale(0.2); opacity: 0; }
        }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 5px 2px currentColor; } 50% { box-shadow: 0 0 12px 6px currentColor; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4); } }
        @keyframes flicker { 0%, 100% { opacity: 1; } 25% { opacity: 0.2; } 50% { opacity: 0.8; } 75% { opacity: 0.4; } }
        @keyframes disintegrate { 
            from { transform: scale(1) rotate(0deg); opacity: 1; } 
            to { transform: scale(0) rotate(180deg); opacity: 0; } 
        }
        @keyframes spiral { from { transform: translateX(-20px) rotate(0deg) scale(1); opacity:0; } 20% {opacity:1;} to { transform: translateX(250px) rotate(720deg) scale(0.5); opacity: 0; } }
      `}</style>
      <div className="w-full h-full relative">
        {Array.from({ length: numParticles }).map((_, i) => {
          const color = colors[i % colors.length];
          const size = particleShape === 'swirl' ? Math.random() * 10 + 10 : Math.random() * 8 + 6;
          const duration = Math.random() * 2 + 2.5; 
          const delay = Math.random() * 4;
          const top = Math.random() * 85 + 7.5;

          const animations: string[] = [];
          
          if (particleShape === 'swirl') {
              animations.push(`spiral ${duration}s linear ${delay}s infinite`);
          } else {
              animations.push(`fly-across ${duration}s linear ${delay}s infinite`);
              if (effect && effect !== 'none' && effect !== 'spiral') {
                 const effectDuration = effect === 'flicker' ? '0.5s' : '1.5s';
                 const timingFunction = effect === 'flicker' ? 'steps(1, end)' : 'ease-in-out';
                 const direction = (i % 2 === 0) ? 'normal' : 'reverse';
                 animations.push(`${effect} ${effectDuration} ${timingFunction} ${delay}s infinite ${direction}`);
              }
          }

          const particleStyle: React.CSSProperties = {
            position: 'absolute',
            top: `${top}%`,
            left: 0,
            width: size,
            height: size,
            color: color,
            animation: animations.join(', '),
          };

          return (
            <Particle
              key={i}
              shape={particleShape}
              color={color}
              style={particleStyle}
            />
          );
        })}
      </div>
    </div>
  );
};
