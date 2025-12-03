import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import ScenarioCard from './components/ScenarioCard';
import OptionButton from './components/OptionButton';
import Feedback from './components/Feedback';
import { GameState, Option, Scenario } from './types';
import { SCENARIOS, INITIAL_TIME, TIMER_DECAY, TIMER_TICK_MS } from './constants';
import { getRandomScenario, getRank } from './utils';
import { Play, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'MENU',
    aura: 0,
    maxAura: 0,
    streak: 0,
    history: []
  });

  const [currentScenario, setCurrentScenario] = useState<Scenario>(SCENARIOS[0]);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [feedback, setFeedback] = useState<{ msg: string, type: 'good' | 'bad' | 'neutral' } | null>(null);
  const [isShake, setIsShake] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  // Sound effects logic (simplified for React)
  const playSound = (type: 'good' | 'bad') => {
    // In a real app, we'd add audio objects here
    // But for now, we just rely on visuals
  };

  const startGame = () => {
    setGameState({
      status: 'PLAYING',
      aura: 0,
      maxAura: 0,
      streak: 0,
      history: []
    });
    nextScenario();
  };

  const endGame = (reason: string) => {
    stopTimer();
    setGameState(prev => ({ ...prev, status: 'GAMEOVER', history: [...prev.history, reason] }));
  };

  const nextScenario = useCallback(() => {
    const randomScenario = getRandomScenario(SCENARIOS);
    setCurrentScenario(randomScenario);
    setTimeLeft(INITIAL_TIME);
    startTimer();
  }, []);

  const startTimer = () => {
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleTimeout();
          return 0;
        }
        return prev - TIMER_DECAY;
      });
    }, TIMER_TICK_MS);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTimeout = () => {
    stopTimer();
    triggerFeedback("-1000 Aura (SLOW)", 'bad');
    updateAura(-1000);
    shakeScreen();
    setTimeout(nextScenario, 1000);
  };

  const triggerFeedback = (msg: string, type: 'good' | 'bad' | 'neutral') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 800);
  };

  const shakeScreen = () => {
    setIsShake(true);
    setTimeout(() => setIsShake(false), 500);
  };

  const updateAura = (amount: number) => {
    setGameState(prev => {
      const newAura = prev.aura + amount;
      
      let newStreak = prev.streak;
      if (amount > 0) {
        newStreak += 1;
      } else if (amount < 0) {
        newStreak = 0;
      }

      // Check Loss Conditions
      if (newAura <= -20000) {
        setTimeout(() => endGame("CANCELED FOR BEING CRINGE"), 500);
      }

      return {
        ...prev,
        aura: newAura,
        streak: newStreak,
        maxAura: Math.max(prev.maxAura, newAura)
      };
    });
  };

  const handleOptionClick = (option: Option) => {
    stopTimer();
    let change = 0;
    let type: 'good' | 'bad' | 'neutral' = 'neutral';
    let msg = "";

    if (option.type === 'safe' || option.type === 'wild') {
      change = option.baseChange || 0;
      type = change >= 0 ? 'good' : 'bad';
      msg = change > 0 ? `+${change}` : `${change}`;
    } else if (option.type === 'risk') {
      const roll = Math.random();
      if (roll < (option.successRate || 0)) {
        change = option.winAmount || 0;
        type = 'good';
        msg = `W (+${change})`;
      } else {
        change = option.lossAmount || 0;
        type = 'bad';
        msg = `COOKED (${change})`;
      }
    }

    updateAura(change);
    triggerFeedback(msg, type);
    
    if (change < 0) shakeScreen();

    setTimeout(nextScenario, 800);
  };

  // Menu Screen
  if (gameState.status === 'MENU') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-20 relative">
        <h1 className="text-6xl sm:text-9xl font-display font-black text-white mb-2 tracking-tighter mix-blend-difference">
          ±AURA
        </h1>
        <p className="font-mono text-aura-green mb-12 text-lg sm:text-xl tracking-widest animate-pulse">
          SOCIAL CREDIT SIMULATOR
        </p>
        
        <div className="border border-aura-gray bg-black/50 p-6 max-w-md w-full text-left font-mono text-sm sm:text-base text-aura-light mb-8 space-y-2">
          <p>{`> OBJECTIVE: ASCEND TO MAIN CHARACTER`}</p>
          <p>{`> CAUTION: AVOID "CRINGE" STATUS`}</p>
          <p>{`> CURRENT RANK: NPC`}</p>
        </div>

        <button 
          onClick={startGame}
          className="group relative px-8 py-4 bg-aura-light text-aura-bg font-bold font-mono text-xl uppercase hover:bg-aura-green hover:scale-105 transition-all duration-200"
        >
          <span className="flex items-center gap-2">
            <Play fill="currentColor" /> Initialize
          </span>
          <div className="absolute inset-0 border-2 border-white translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform -z-10"></div>
        </button>
      </div>
    );
  }

  // Game Over Screen
  if (gameState.status === 'GAMEOVER') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-20 relative bg-red-900/10">
        <h1 className="text-5xl sm:text-8xl font-display font-black text-aura-red mb-4 tracking-tighter">
          CANCELED
        </h1>
        <p className="font-mono text-aura-light text-xl mb-8">
          REASON: {gameState.history[gameState.history.length - 1] || "You fell off."}
        </p>
        
        <div className="bg-black border border-aura-gray p-8 mb-8">
          <p className="text-aura-gray text-xs uppercase tracking-widest mb-2">Final Aura</p>
          <p className={`text-4xl font-mono font-bold ${gameState.aura >= 0 ? 'text-aura-green' : 'text-aura-red'}`}>
            {gameState.aura}
          </p>
          <p className="text-aura-gray text-xs uppercase tracking-widest mt-4 mb-2">Peak Rank</p>
          <p className="text-xl font-mono text-aura-gold">
            {getRank(gameState.maxAura)}
          </p>
        </div>

        <button 
          onClick={startGame}
          className="group px-8 py-4 bg-transparent border-2 border-aura-light text-aura-light font-bold font-mono text-lg uppercase hover:bg-aura-light hover:text-black transition-all"
        >
          <span className="flex items-center gap-2">
            <RotateCcw /> Redeem Yourself
          </span>
        </button>
      </div>
    );
  }

  // Main Game Loop
  return (
    <div className={`min-h-screen flex flex-col relative z-10 transition-transform duration-75 ${isShake ? 'animate-shake' : ''}`}>
      <Header aura={gameState.aura} streak={gameState.streak} />
      
      {feedback && <Feedback message={feedback.msg} type={feedback.type} />}

      <main className="flex-1 w-full max-w-3xl mx-auto p-4 flex flex-col justify-center">
        <ScenarioCard 
          text={currentScenario.text} 
          timeLeft={timeLeft} 
        />
        
        <div className="grid grid-cols-1 gap-4 w-full max-w-xl mx-auto">
          {currentScenario.options.map((opt) => (
            <OptionButton 
              key={opt.id} 
              option={opt} 
              onClick={handleOptionClick} 
              disabled={!!feedback}
            />
          ))}
        </div>
      </main>

      <footer className="p-4 text-center text-aura-gray text-xs font-mono uppercase tracking-widest opacity-50">
        System Ver. 2.0.4 // Aura_OS
      </footer>
    </div>
  );
};

export default App;