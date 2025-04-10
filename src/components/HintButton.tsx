
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HintButtonProps {
  onRequestHint: () => void;
  hintsLeft: number;
  disabled: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ onRequestHint, hintsLeft, disabled }) => {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 bg-hangman-blue/30 border-hangman-blue hover:bg-hangman-blue/50"
      onClick={onRequestHint}
      disabled={hintsLeft <= 0 || disabled}
    >
      <Sparkles size={18} /> 
      {hintsLeft > 0 ? `Get AI Hint (${hintsLeft} left)` : "No hints left"}
    </Button>
  );
};

export default HintButton;
