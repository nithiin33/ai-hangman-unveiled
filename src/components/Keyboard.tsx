
import React from 'react';

interface KeyboardProps {
  usedLetters: {
    [key: string]: 'correct' | 'incorrect' | undefined;
  };
  onLetterGuess: (letter: string) => void;
  disabled: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ usedLetters, onLetterGuess, disabled }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleClick = (letter: string) => {
    if (!disabled && !usedLetters[letter]) {
      onLetterGuess(letter);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="flex justify-center gap-1 sm:gap-2 mb-2"
          style={{ 
            paddingLeft: rowIndex === 1 ? '1rem' : rowIndex === 2 ? '2rem' : '0'
          }}
        >
          {row.map(letter => {
            const status = usedLetters[letter];
            let buttonClass = 'hangman-letter-button ';
            
            if (status === 'correct') {
              buttonClass += 'hangman-letter-button-correct';
            } else if (status === 'incorrect') {
              buttonClass += 'hangman-letter-button-incorrect';
            } else {
              buttonClass += 'hangman-letter-button-unused';
            }
            
            return (
              <button
                key={letter}
                className={buttonClass}
                onClick={() => handleClick(letter)}
                disabled={!!status || disabled}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
