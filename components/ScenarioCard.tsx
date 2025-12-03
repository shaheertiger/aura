import React from 'react';

interface ScenarioCardProps {
  text: string;
  timeLeft: number;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ text, timeLeft }) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-6 mb-8 relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-aura-green via-aura-gold to-aura-red rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-[#111] border border-aura-gray p-6 sm:p-8 rounded-sm shadow-2xl flex flex-col items-center text-center min-h-[200px] justify-between">
        <div className="w-full flex justify-between items-center mb-4 text-xs text-aura-gray font-mono">
          <span>// INCOMING_SCENARIO</span>
          <span>ID: {Math.floor(Math.random() * 9999)}</span>
        </div>

        <h2 className="text-lg sm:text-2xl font-mono leading-relaxed text-aura-light mb-6">
          {text}
        </h2>

        <div className="w-full h-2 bg-aura-gray/30 rounded-full overflow-hidden mt-auto">
          <div 
            className={`h-full transition-all duration-75 ease-linear ${
              timeLeft < 30 ? 'bg-aura-red' : 'bg-aura-light'
            }`}
            style={{ width: `${timeLeft}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
