
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  disabled: boolean;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, onChange, disabled }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <span className="text-sm font-medium">Difficulty:</span>
      <div className="flex gap-1">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
          <Button
            key={level}
            variant="outline"
            size="sm"
            className={cn(
              "capitalize",
              difficulty === level 
                ? "bg-hangman-primary text-white border-hangman-primary hover:bg-hangman-primary/90" 
                : "bg-transparent"
            )}
            onClick={() => onChange(level)}
            disabled={disabled}
          >
            {level}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
