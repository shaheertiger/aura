import { Scenario, Rank } from './types';

export const INITIAL_TIME = 100;
export const TIMER_DECAY = 1.2; // How fast the bar drops per tick
export const TIMER_TICK_MS = 50;

export const RANK_THRESHOLDS: { min: number; title: Rank }[] = [
  { min: 100000, title: "ELDRITCH GOD" },
  { min: 50000, title: "GIGACHAD" },
  { min: 20000, title: "SIGMA" },
  { min: 5000, title: "MAIN CHARACTER" },
  { min: 1000, title: "SIDE CHARACTER" },
  { min: 0, title: "NPC" },
  { min: -1000, title: "L MAN" },
  { min: -10000, title: "CRINGE LORD" },
  { min: -Infinity, title: "CANCELED" },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    text: "You accidentally liked a photo from 2016 while stalking.",
    options: [
      { id: '1a', text: "Unlike instantly and pray", type: 'safe', baseChange: -500 },
      { id: '1b', text: "Like 3 more to assert dominance", type: 'risk', successRate: 0.3, winAmount: 5000, lossAmount: -8000 },
      { id: '1c', text: "Comment 'Take me back'", type: 'wild', baseChange: -10000 }
    ]
  },
  {
    id: 's2',
    text: "POV: You get left on read for 4 hours by your crush.",
    options: [
      { id: '2a', text: "Wait 4 hours to reply back", type: 'safe', baseChange: 100 },
      { id: '2b', text: "Double text '???'", type: 'risk', successRate: 0.1, winAmount: 2000, lossAmount: -5000 },
      { id: '2c', text: "Post a thirst trap on story", type: 'wild', baseChange: 500 }
    ]
  },
  {
    id: 's3',
    text: "Your mom asks to follow your spam account (the feral one).",
    options: [
      { id: '3a', text: "Accept but mute her stories", type: 'safe', baseChange: -100 },
      { id: '3b', text: "Block her immediately", type: 'risk', successRate: 0.4, winAmount: 2000, lossAmount: -3000 },
      { id: '3c', text: "Let her in. Chaos ensues.", type: 'wild', baseChange: -5000 }
    ]
  },
  {
    id: 's4',
    text: "You are caught filming a TikTok in public. People are watching.",
    options: [
      { id: '4a', text: "Pretend you were FaceTiming", type: 'safe', baseChange: -200 },
      { id: '4b', text: "Keep dancing. Maintain eye contact.", type: 'risk', successRate: 0.15, winAmount: 15000, lossAmount: -10000 },
      { id: '4c', text: "Drop the phone and run", type: 'wild', baseChange: -1000 }
    ]
  },
  {
    id: 's5',
    text: "The group chat roasts your new haircut.",
    options: [
      { id: '5a', text: "Laugh along nervously", type: 'safe', baseChange: -500 },
      { id: '5b', text: "Roast the alpha's hairline", type: 'risk', successRate: 0.35, winAmount: 6000, lossAmount: -6000 },
      { id: '5c', text: "Leave the group chat", type: 'wild', baseChange: -2000 }
    ]
  },
  {
    id: 's6',
    text: "Someone asks 'What are those?' pointing at your shoes.",
    options: [
      { id: '6a', text: "Walk away silently", type: 'safe', baseChange: -100 },
      { id: '6b', text: "Reply 'Rent money'", type: 'risk', successRate: 0.5, winAmount: 2000, lossAmount: -2000 },
      { id: '6c', text: "Take them off immediately", type: 'wild', baseChange: 800 }
    ]
  },
  {
    id: 's7',
    text: "You accidentally use the 😂 emoji instead of 💀.",
    options: [
      { id: '7a', text: "Delete message quickly", type: 'safe', baseChange: -50 },
      { id: '7b', text: "Double down with 🤣", type: 'risk', successRate: 0.05, winAmount: 500, lossAmount: -2000 },
      { id: '7c', text: "Claim you were hacked", type: 'wild', baseChange: -500 }
    ]
  },
  {
    id: 's8',
    text: "WiFi disconnects during a ranked match. Team is raging.",
    options: [
      { id: '8a', text: "Switch to mobile data", type: 'safe', baseChange: 100 },
      { id: '8b', text: "Play on 900 ping", type: 'risk', successRate: 0.1, winAmount: 8000, lossAmount: -4000 },
      { id: '8c', text: "Throw router out the window", type: 'wild', baseChange: 1000 }
    ]
  },
  {
    id: 's9',
    text: "You encounter a 'Skibidi Toilet' kid in the wild.",
    options: [
      { id: '9a', text: "Ignore the brainrot", type: 'safe', baseChange: 0 },
      { id: '9b', text: "Sing along ironically", type: 'risk', successRate: 0.1, winAmount: 1000, lossAmount: -15000 },
      { id: '9c', text: "Lecture them on geopolitics", type: 'wild', baseChange: -500 }
    ]
  },
  {
    id: 's10',
    text: "Bestie posts a pic where you look cooked, but they look fire.",
    options: [
      { id: '10a', text: "Comment 'Fire 🔥'", type: 'safe', baseChange: -300 },
      { id: '10b', text: "Report the post for terrorism", type: 'risk', successRate: 0.6, winAmount: 1500, lossAmount: -500 },
      { id: '10c', text: "Post their ugly photos from 2012", type: 'wild', baseChange: 3000 }
    ]
  },
  {
    id: 's11',
    text: "Teacher says 'You can work in pairs'. You have no friends.",
    options: [
      { id: '11a', text: "Ask the teacher to assign you", type: 'safe', baseChange: -1000 },
      { id: '11b', text: "Lock eyes with the other loner", type: 'risk', successRate: 0.8, winAmount: 500, lossAmount: -1000 },
      { id: '11c', text: "Work alone. Sigma grindset.", type: 'wild', baseChange: 5000 }
    ]
  },
  {
    id: 's12',
    text: "You have to make a phone call. With your VOICE.",
    options: [
      { id: '12a', text: "Text them instead", type: 'safe', baseChange: -50 },
      { id: '12b', text: "Call immediately", type: 'risk', successRate: 0.4, winAmount: 1000, lossAmount: -500 },
      { id: '12c', text: "Hire a TaskRabbit to call", type: 'wild', baseChange: -2000 }
    ]
  },
   {
    id: 's13',
    text: "Your favorite streamer notices you in chat.",
    options: [
      { id: '13a', text: "Clip it", type: 'safe', baseChange: 500 },
      { id: '13b', text: "Ask for mod", type: 'risk', successRate: 0.01, winAmount: 50000, lossAmount: -5000 },
      { id: '13c', text: "Type 'L streamer'", type: 'wild', baseChange: -1000 }
    ]
  }
];