
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

export interface GameStats {
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
}
