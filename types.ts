export type OptionType = 'safe' | 'risk' | 'wild';

export interface Option {
  id: string;
  text: string;
  type: OptionType;
  baseChange?: number; // For safe/wild
  successRate?: number; // 0.0 to 1.0, for risk
  winAmount?: number; // For risk
  lossAmount?: number; // For risk
}

export interface Scenario {
  id: string;
  text: string;
  options: Option[];
}

export type Rank = 
  | "NPC"
  | "SIDE CHARACTER"
  | "MAIN CHARACTER"
  | "SIGMA"
  | "GIGACHAD"
  | "ELDRITCH GOD"
  | "L MAN"
  | "CRINGE LORD"
  | "CANCELED";

export interface GameState {
  status: 'MENU' | 'PLAYING' | 'GAMEOVER';
  aura: number;
  maxAura: number;
  streak: number;
  history: string[]; // Log of last few actions
}
