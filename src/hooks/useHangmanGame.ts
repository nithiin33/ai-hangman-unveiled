
import { useState, useEffect } from "react";
import { generateHint } from "@/utils/aiWordGenerator";
import { HangmanGameState } from "@/types/hangman";
import { MAX_WRONG_ATTEMPTS, HINTS_PER_GAME } from "@/utils/hangmanConstants";
import {
  initializeGameState,
  saveGameStats,
  checkWinCondition,
  handleWin,
  handleLoss,
  processLetterGuess,
  setupNewGame,
} from "@/utils/hangmanStateUtils";

export const useHangmanGame = () => {
  const [gameState, setGameState] = useState<HangmanGameState>(initializeGameState);
  
  // Save game stats to localStorage when they change
  useEffect(() => {
    const stats = {
      gamesPlayed: gameState.gamesPlayed,
      wins: gameState.wins,
      currentStreak: gameState.currentStreak,
      bestStreak: gameState.bestStreak
    };
    saveGameStats(stats);
  }, [gameState.gamesPlayed, gameState.wins, gameState.currentStreak, gameState.bestStreak]);
  
  // Check if the game is over whenever guessedLetters changes
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;
    
    // Check if player won
    if (checkWinCondition(gameState.word, gameState.guessedLetters)) {
      setGameState(prev => handleWin(prev));
    }
    
    // Check if player lost
    if (gameState.wrongAttempts >= MAX_WRONG_ATTEMPTS) {
      setGameState(prev => handleLoss(prev));
    }
  }, [gameState.guessedLetters, gameState.wrongAttempts]);
  
  // Function to handle letter guessing
  const guessLetter = (letter: string) => {
    if (gameState.gameStatus !== 'playing' || gameState.guessedLetters.includes(letter)) {
      return;
    }
    
    setGameState(prev => processLetterGuess(prev, letter));
  };
  
  // Function to start a new game
  const startNewGame = () => {
    setGameState(prev => setupNewGame(prev));
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
