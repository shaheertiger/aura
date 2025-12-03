import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Flame } from 'lucide-react';
import { getRank, formatAura } from '../utils';

interface HeaderProps {
  aura: number;
  streak: number;
}

const Header: React.FC<HeaderProps> = ({ aura, streak }) => {
  const rank = getRank(aura);
  const isPositive = aura >= 0;

  return (
    <header className="w-full border-b-2 border-aura-gray p-4 flex flex-col items-center justify-center gap-2 bg-aura-bg/90 backdrop-blur z-40 sticky top-0">
      
      <div className="w-full max-w-xl flex justify-between items-end text-xs sm:text-sm font-mono tracking-widest uppercase mb-2">
        <div className="flex items-center gap-2 text-aura-gray">
          <Trophy size={14} />
          <span>{rank}</span>
        </div>

        <div className={`flex items-center gap-2 transition-all duration-300 ${streak > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className={`${streak >= 3 ? 'text-aura-gold' : 'text-aura-gray'}`}>Streak: {streak}</span>
          <Flame 
            size={14} 
            className={`${streak >= 3 ? 'text-aura-gold fill-aura-gold animate-pulse' : 'text-aura-gray'}`} 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {isPositive ? (
          <TrendingUp className="text-aura-green w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
        ) : (
          <TrendingDown className="text-aura-red w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
        )}
        <h1 
          className={`text-4xl sm:text-6xl font-mono font-bold tracking-tighter transition-colors duration-300 ${
            isPositive ? 'text-aura-green shadow-aura-green/20' : 'text-aura-red shadow-aura-red/20'
          }`}
          style={{ textShadow: `0 0 20px ${isPositive ? '#00ff41' : '#ff0055'}40` }}
        >
          {formatAura(aura)}
        </h1>
      </div>
    </header>
  );
};

export default Header;