import { RANK_THRESHOLDS } from './constants';
import { Rank } from './types';

export const getRank = (aura: number): Rank => {
  for (const threshold of RANK_THRESHOLDS) {
    if (aura >= threshold.min) {
      return threshold.title;
    }
  }
  return "NPC"; // Fallback
};

export const formatAura = (aura: number): string => {
  if (Math.abs(aura) >= 1000000) {
    return (aura / 1000000).toFixed(1) + 'M';
  }
  if (Math.abs(aura) >= 1000) {
    return (aura / 1000).toFixed(1) + 'k';
  }
  return aura.toString();
};

export const getRandomScenario = (scenarios: any[]) => {
  return scenarios[Math.floor(Math.random() * scenarios.length)];
};