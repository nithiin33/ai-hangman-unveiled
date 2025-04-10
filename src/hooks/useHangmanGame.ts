
import { useState, useEffect } from "react";
import { getRandomWord, generateHint, getWordDefinition } from "@/utils/aiWordGenerator";

export interface HangmanGameState {
  word: string;
  guessedLetters: string[];
  wrongAttempts: number;
  gameStatus: 'playing' | 'won' | 'lost';
  usedLetters: { [key: string]: 'correct' | 'incorrect' | undefined };
  hintsLeft: number;
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
  currentHint: string;
  isHintDialogOpen: boolean;
  isLoadingHint: boolean;
  isGameOverModalOpen: boolean;
  wordDefinition: string;
}

const MAX_WRONG_ATTEMPTS = 6;
const HINTS_PER_GAME = 2;

export const useHangmanGame = () => {
  const [gameState, setGameState] = useState<HangmanGameState>(() => {
    // Load game stats from localStorage if available
    const savedStats = localStorage.getItem('hangmanStats');
    const stats = savedStats ? JSON.parse(savedStats) : {
      gamesPlayed: 0,
      wins: 0,
      currentStreak: 0,
      bestStreak: 0
    };
    
    const initialWord = getRandomWord();
    
    return {
      word: initialWord.word,
      guessedLetters: [],
      wrongAttempts: 0,
      gameStatus: 'playing',
      usedLetters: {},
      hintsLeft: HINTS_PER_GAME,
      gamesPlayed: stats.gamesPlayed,
      wins: stats.wins,
      currentStreak: stats.currentStreak,
      bestStreak: stats.bestStreak,
      currentHint: '',
      isHintDialogOpen: false,
      isLoadingHint: false,
      isGameOverModalOpen: false,
      wordDefinition: initialWord.definition
    };
  });
  
  // Save game stats to localStorage when they change
  useEffect(() => {
    const stats = {
      gamesPlayed: gameState.gamesPlayed,
      wins: gameState.wins,
      currentStreak: gameState.currentStreak,
      bestStreak: gameState.bestStreak
    };
    localStorage.setItem('hangmanStats', JSON.stringify(stats));
  }, [gameState.gamesPlayed, gameState.wins, gameState.currentStreak, gameState.bestStreak]);
  
  // Check if the game is over whenever guessedLetters changes
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;
    
    // Check if player won
    const uniqueLettersInWord = [...new Set(gameState.word.split(''))];
    const correctGuesses = uniqueLettersInWord.filter(letter => 
      gameState.guessedLetters.includes(letter.toUpperCase())
    );
    
    if (correctGuesses.length === uniqueLettersInWord.length) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'won',
        wins: prev.wins + 1,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
        isGameOverModalOpen: true
      }));
    }
    
    // Check if player lost
    if (gameState.wrongAttempts >= MAX_WRONG_ATTEMPTS) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'lost',
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0,
        isGameOverModalOpen: true
      }));
    }
  }, [gameState.guessedLetters, gameState.wrongAttempts]);
  
  // Function to handle letter guessing
  const guessLetter = (letter: string) => {
    if (gameState.gameStatus !== 'playing' || gameState.guessedLetters.includes(letter)) {
      return;
    }
    
    const upperLetter = letter.toUpperCase();
    const upperWord = gameState.word.toUpperCase();
    
    // Check if the letter is in the word
    const isCorrect = upperWord.includes(upperLetter);
    
    setGameState(prev => {
      const newGuessedLetters = [...prev.guessedLetters, upperLetter];
      const newWrongAttempts = isCorrect ? prev.wrongAttempts : prev.wrongAttempts + 1;
      const newUsedLetters = { 
        ...prev.usedLetters, 
        [upperLetter]: isCorrect ? 'correct' as const : 'incorrect' as const
      };
      
      return {
        ...prev,
        guessedLetters: newGuessedLetters,
        wrongAttempts: newWrongAttempts,
        usedLetters: newUsedLetters
      };
    });
  };
  
  // Function to start a new game
  const startNewGame = () => {
    const newWordData = getRandomWord();
    
    setGameState(prev => ({
      ...prev,
      word: newWordData.word,
      guessedLetters: [],
      wrongAttempts: 0,
      gameStatus: 'playing',
      usedLetters: {},
      hintsLeft: HINTS_PER_GAME,
      isGameOverModalOpen: false,
      wordDefinition: newWordData.definition
    }));
  };
  
  // Function to request a hint
  const requestHint = () => {
    if (gameState.hintsLeft <= 0 || gameState.gameStatus !== 'playing') {
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      isHintDialogOpen: true,
      isLoadingHint: true
    }));
    
    // Simulate AI hint generation with a delay
    setTimeout(() => {
      const hint = generateHint(gameState.word, gameState.guessedLetters);
      
      setGameState(prev => ({
        ...prev,
        isLoadingHint: false,
        currentHint: hint,
        hintsLeft: prev.hintsLeft - 1
      }));
    }, 1500);
  };
  
  // Function to close hint dialog
  const closeHintDialog = () => {
    setGameState(prev => ({
      ...prev,
      isHintDialogOpen: false
    }));
  };
  
  return {
    ...gameState,
    maxWrongAttempts: MAX_WRONG_ATTEMPTS,
    guessLetter,
    startNewGame,
    requestHint,
    closeHintDialog
  };
};
