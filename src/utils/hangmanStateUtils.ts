
import { HangmanGameState, GameStats } from "@/types/hangman";
import { getRandomWord } from "@/utils/aiWordGenerator";
import { MAX_WRONG_ATTEMPTS, HINTS_PER_GAME } from "@/utils/hangmanConstants";

// Load game stats from localStorage
export const loadGameStats = (): GameStats => {
  const savedStats = localStorage.getItem('hangmanStats');
  return savedStats ? JSON.parse(savedStats) : {
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    bestStreak: 0
  };
};

// Save game stats to localStorage
export const saveGameStats = (stats: GameStats): void => {
  localStorage.setItem('hangmanStats', JSON.stringify(stats));
};

// Initialize a new game state
export const initializeGameState = (): HangmanGameState => {
  const stats = loadGameStats();
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
};

// Check if the player has won
export const checkWinCondition = (word: string, guessedLetters: string[]): boolean => {
  const uniqueLettersInWord = [...new Set(word.split(''))];
  const correctGuesses = uniqueLettersInWord.filter(letter => 
    guessedLetters.includes(letter.toUpperCase())
  );
  
  return correctGuesses.length === uniqueLettersInWord.length;
};

// Update game state after a win
export const handleWin = (state: HangmanGameState): HangmanGameState => {
  return {
    ...state,
    gameStatus: 'won',
    wins: state.wins + 1,
    gamesPlayed: state.gamesPlayed + 1,
    currentStreak: state.currentStreak + 1,
    bestStreak: Math.max(state.bestStreak, state.currentStreak + 1),
    isGameOverModalOpen: true
  };
};

// Update game state after a loss
export const handleLoss = (state: HangmanGameState): HangmanGameState => {
  return {
    ...state,
    gameStatus: 'lost',
    gamesPlayed: state.gamesPlayed + 1,
    currentStreak: 0,
    isGameOverModalOpen: true
  };
};

// Process a letter guess
export const processLetterGuess = (
  state: HangmanGameState,
  letter: string
): HangmanGameState => {
  const upperLetter = letter.toUpperCase();
  const upperWord = state.word.toUpperCase();
  
  // Check if the letter is in the word
  const isCorrect = upperWord.includes(upperLetter);
  
  const newGuessedLetters = [...state.guessedLetters, upperLetter];
  const newWrongAttempts = isCorrect ? state.wrongAttempts : state.wrongAttempts + 1;
  const newUsedLetters = { 
    ...state.usedLetters, 
    [upperLetter]: isCorrect ? 'correct' as const : 'incorrect' as const
  };
  
  return {
    ...state,
    guessedLetters: newGuessedLetters,
    wrongAttempts: newWrongAttempts,
    usedLetters: newUsedLetters
  };
};

// Set up a new game
export const setupNewGame = (state: HangmanGameState): HangmanGameState => {
  const newWordData = getRandomWord();
  
  return {
    ...state,
    word: newWordData.word,
    guessedLetters: [],
    wrongAttempts: 0,
    gameStatus: 'playing',
    usedLetters: {},
    hintsLeft: HINTS_PER_GAME,
    isGameOverModalOpen: false,
    wordDefinition: newWordData.definition
  };
};
