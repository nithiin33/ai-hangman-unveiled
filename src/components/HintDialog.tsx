
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
import { Sparkles } from "lucide-react";

interface HintDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
  isLoading: boolean;
  wordDefinition: string;
}

const HintDialog: React.FC<HintDialogProps> = ({
  isOpen,
  onClose,
  hint,
  isLoading,
  wordDefinition
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-hangman-primary" />
            <span>AI Hint</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="min-h-[100px] flex flex-col items-center justify-center gap-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-full border-4 border-hangman-primary/30 border-t-hangman-primary animate-spin"></div>
              <p className="text-sm text-muted-foreground">Generating hint...</p>
            </div>
          ) : (
            <>
              <DialogDescription className="text-center">{hint}</DialogDescription>
              
              {wordDefinition && (
                <div className="mt-2 pt-4 border-t w-full">
                  <p className="font-medium text-sm text-hangman-primary mb-1">Word Definition:</p>
                  <p className="text-sm text-muted-foreground">{wordDefinition}</p>
                </div>
              )}
            </>
          )}
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HintDialog;
