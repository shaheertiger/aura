import React from 'react';
import { Option } from '../types';
import { AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';

interface OptionButtonProps {
  option: Option;
  onClick: (option: Option) => void;
  disabled: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, onClick, disabled }) => {
  const getIcon = () => {
    switch (option.type) {
      case 'risk': return <AlertTriangle className="w-5 h-5" />;
      case 'wild': return <Sparkles className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (option.type) {
      case 'risk': 
        return 'border-l-aura-red hover:bg-aura-red/10 text-aura-red';
      case 'wild': 
        return 'border-l-aura-gold hover:bg-aura-gold/10 text-aura-gold';
      default: 
        return 'border-l-aura-green hover:bg-aura-green/10 text-aura-green';
    }
  };

  return (
    <button
      onClick={() => onClick(option)}
      disabled={disabled}
      className={`
        w-full p-4 sm:p-5 text-left font-mono text-sm sm:text-base border border-aura-gray 
        border-l-4 bg-[#0a0a0a] transition-all duration-150
        flex items-center gap-4 group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${getStyles()}
      `}
    >
      <div className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform">
        {getIcon()}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-aura-light group-hover:text-white">
          {option.text}
        </span>
        {option.type === 'risk' && (
           <span className="text-[10px] uppercase tracking-wider opacity-60 mt-1">
             Success Rate: {Math.floor((option.successRate || 0) * 100)}%
           </span>
        )}
      </div>
    </button>
  );
};

export default OptionButton;
