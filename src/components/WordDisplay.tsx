
import React from 'react';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  gameOver: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters, gameOver }) => {
  return (
    <div className="flex justify-center flex-wrap gap-1 my-6">
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter.toUpperCase());
        const showLetter = isGuessed || gameOver;
        
        return (
          <div key={index} className="hangman-word-letter">
            <span 
              className={`transition-opacity ${isGuessed || gameOver ? 'opacity-100' : 'opacity-0'} 
              ${!isGuessed && gameOver ? 'text-red-500' : ''} ${isGuessed ? 'text-green-600' : ''}`}
            >
              {letter.toUpperCase()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WordDisplay;
