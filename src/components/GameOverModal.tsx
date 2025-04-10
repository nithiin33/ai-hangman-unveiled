
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

interface GameOverModalProps {
  isOpen: boolean;
  won: boolean;
  word: string;
  onPlayAgain: () => void;
  attempts: number;
  maxAttempts: number;
  aiDefinition: string;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  won,
  word,
  onPlayAgain,
  attempts,
  maxAttempts,
  aiDefinition
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            {won ? (
              <>
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <span>You won!</span>
              </>
            ) : (
              <>
                <div className="bg-red-100 p-2 rounded-full">
                  <X className="h-6 w-6 text-red-500" />
                </div>
                <span>Game Over</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-3">
            <p className="text-lg">
              The word was: <span className="font-bold">{word}</span>
            </p>
            
            {won ? (
              <p>Great job! You guessed the word with {attempts}/{maxAttempts} wrong attempts.</p>
            ) : (
              <p>Don't worry, better luck next time!</p>
            )}
            
            <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-md text-left">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">AI Definition:</h4>
              <p className="text-sm">{aiDefinition}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={onPlayAgain}
            className="bg-hangman-primary hover:bg-hangman-primary/90"
          >
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal;
