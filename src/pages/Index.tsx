
import React from 'react';
import HangmanFigure from "@/components/HangmanFigure";
import Keyboard from "@/components/Keyboard";
import WordDisplay from "@/components/WordDisplay";
import HintButton from "@/components/HintButton";
import DifficultySelector from "@/components/DifficultySelector";
import GameStats from "@/components/GameStats";
import GameOverModal from "@/components/GameOverModal";
import HintDialog from "@/components/HintDialog";
import { Button } from "@/components/ui/button";
import { useHangmanGame } from "@/hooks/useHangmanGame";
import { RefreshCw } from "lucide-react";

const Index = () => {
  const game = useHangmanGame();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-hangman-light">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hangman-primary to-hangman-secondary mb-2">
            AI Hangman
          </h1>
          <p className="text-hangman-dark text-lg">Challenge your word-guessing skills</p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <DifficultySelector 
              difficulty={game.difficulty} 
              onChange={game.changeDifficulty}
              disabled={game.gameStatus !== 'playing'}
            />
            
            <div className="flex gap-2">
              <HintButton 
                onRequestHint={game.requestHint} 
                hintsLeft={game.hintsLeft}
                disabled={game.gameStatus !== 'playing'}
              />
              
              <Button 
                variant="outline" 
                onClick={game.startNewGame}
                className="flex items-center gap-2"
              >
                <RefreshCw size={18} /> New Game
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center">
                <HangmanFigure wrongAttempts={game.wrongAttempts} />
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="text-center mb-2">
                  <p className="text-lg font-medium">
                    Wrong attempts: <span className="font-bold text-hangman-primary">{game.wrongAttempts}</span>
                    <span className="text-gray-400">/{game.maxWrongAttempts}</span>
                  </p>
                </div>
                
                <WordDisplay 
                  word={game.word} 
                  guessedLetters={game.guessedLetters} 
                  gameOver={game.gameStatus !== 'playing'} 
                />
              </div>
            </div>
            
            <div className="mt-8">
              <Keyboard 
                usedLetters={game.usedLetters} 
                onLetterGuess={game.guessLetter}
                disabled={game.gameStatus !== 'playing'}
              />
            </div>
          </div>
          
          <GameStats 
            gamesPlayed={game.gamesPlayed} 
            wins={game.wins} 
            currentStreak={game.currentStreak} 
            bestStreak={game.bestStreak} 
          />
        </div>
      </div>
      
      <HintDialog 
        isOpen={game.isHintDialogOpen} 
        onClose={game.closeHintDialog}
        hint={game.currentHint}
        isLoading={game.isLoadingHint}
      />
      
      <GameOverModal 
        isOpen={game.isGameOverModalOpen}
        won={game.gameStatus === 'won'}
        word={game.word}
        onPlayAgain={game.startNewGame}
        attempts={game.wrongAttempts}
        maxAttempts={game.maxWrongAttempts}
        aiDefinition={game.wordDefinition}
      />
    </div>
  );
};

export default Index;
