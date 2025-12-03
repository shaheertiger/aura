import React from 'react';

interface FeedbackProps {
  message: string;
  type: 'good' | 'bad' | 'neutral';
}

const Feedback: React.FC<FeedbackProps> = ({ message, type }) => {
  if (!message) return null;

  const colorClass = 
    type === 'good' ? 'text-aura-green' : 
    type === 'bad' ? 'text-aura-red' : 
    'text-aura-light';

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <h1 
        className={`text-6xl sm:text-8xl font-black font-display tracking-tighter uppercase animate-[pop_0.4s_ease-out_forwards] ${colorClass}`}
        style={{ 
          textShadow: '4px 4px 0px black, -1px -1px 0 #000',
          transform: 'rotate(-5deg)'
        }}
      >
        {message}
      </h1>
      <style>{`
        @keyframes pop {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          50% { transform: scale(1.5) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(-5deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Feedback;
