
import React from 'react';
import { PIPE_WIDTH, GAME_HEIGHT } from '../constants';
import { PipeSkin } from '../types';

interface PipeProps {
  x: number;
  gapY: number;
  pipeGap: number;
  skin?: PipeSkin['style'];
  isDestroyed?: boolean;
}

const PipeComponent: React.FC<PipeProps> = ({ x, gapY, pipeGap, skin, isDestroyed }) => {
  if (isDestroyed) return null;

  const bottomPipeHeight = gapY;
  const topPipeHeight = GAME_HEIGHT - (gapY + pipeGap);
  
  const defaultBody = 'linear-gradient(90deg, #166534 0%, #22c55e 20%, #4ade80 45%, #22c55e 55%, #15803d 90%, #14532d 100%)';
  const defaultHead = 'linear-gradient(90deg, #14532d 0%, #16a34a 20%, #4ade80 45%, #16a34a 55%, #15803d 90%, #052e16 100%)';
  const defaultBorder = '#052e16';
  const defaultShadow = 'rgba(0,0,0,0.5)';

  const bodyBg = skin?.bodyGradient || defaultBody;
  const headBg = skin?.headGradient || defaultHead;
  const borderCol = skin?.borderColor || defaultBorder;
  const shadowCol = skin?.shadowColor || defaultShadow;

  const isNeon = skin?.shadowColor === '#0ea5e9'; // Special case for neon glow

  const pipeStyle: React.CSSProperties = {
    transform: `translateX(${x}px)`,
    width: PIPE_WIDTH,
    position: 'absolute',
    background: bodyBg,
    borderLeft: `1px solid ${borderCol}`,
    borderRight: `1px solid ${borderCol}`,
    boxSizing: 'border-box',
    boxShadow: isNeon ? `0 0 15px ${skin?.shadowColor}` : `5px 0 10px ${shadowCol}`,
    zIndex: 3
  };
  
  const pipeHeadStyle: React.CSSProperties = {
    position: 'absolute',
    width: 'calc(100% + 10px)',
    left: '-5px',
    height: '40px',
    background: headBg,
    border: `1px solid ${borderCol}`,
    boxSizing: 'border-box',
    boxShadow: isNeon ? `0 0 10px ${skin?.shadowColor}, inset 0 0 5px rgba(255,255,255,0.5)` : 'inset 0 2px 5px rgba(255,255,255,0.4), 0 5px 10px rgba(0,0,0,0.3)',
  };

  return (
    <>
      {/* Top Pipe */}
      <div
        className="pipe-body"
        style={{
          ...pipeStyle,
          bottom: gapY + pipeGap,
          height: topPipeHeight,
        }}
      >
        <div className="pipe-head" style={{...pipeHeadStyle, bottom: '0', borderRadius: '0 0 4px 4px' }} />
      </div>
      {/* Bottom Pipe */}
      <div
        className="pipe-body"
        style={{
          ...pipeStyle,
          bottom: 0,
          height: bottomPipeHeight,
        }}
      >
        <div className="pipe-head" style={{...pipeHeadStyle, top: '0', borderRadius: '4px 4px 0 0' }} />
      </div>
    </>
  );
};

export const Pipe = React.memo(PipeComponent);
