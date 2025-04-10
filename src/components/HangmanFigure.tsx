
import React from 'react';

interface HangmanFigureProps {
  wrongAttempts: number;
}

const HangmanFigure: React.FC<HangmanFigureProps> = ({ wrongAttempts }) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Gallows */}
        <line x1="40" y1="180" x2="160" y2="180" stroke="#7E69AB" strokeWidth="4" />
        <line x1="60" y1="20" x2="60" y2="180" stroke="#7E69AB" strokeWidth="4" />
        <line x1="60" y1="20" x2="120" y2="20" stroke="#7E69AB" strokeWidth="4" />
        <line x1="120" y1="20" x2="120" y2="40" stroke="#7E69AB" strokeWidth="4" />
        
        {/* Head */}
        {wrongAttempts > 0 && (
          <circle 
            cx="120" 
            cy="55" 
            r="15" 
            stroke="#1A1F2C" 
            strokeWidth="4" 
            fill="none"
            className={wrongAttempts === 1 ? "animate-pulse-soft" : ""}
          />
        )}
        
        {/* Body */}
        {wrongAttempts > 1 && (
          <line 
            x1="120" 
            y1="70" 
            x2="120" 
            y2="110" 
            stroke="#1A1F2C" 
            strokeWidth="4"
            className={wrongAttempts === 2 ? "animate-pulse-soft" : ""}
          />
        )}
        
        {/* Left Arm */}
        {wrongAttempts > 2 && (
          <line 
            x1="120" 
            y1="80" 
            x2="100" 
            y2="100" 
            stroke="#1A1F2C" 
            strokeWidth="4"
            className={wrongAttempts === 3 ? "animate-pulse-soft" : ""}
          />
        )}
        
        {/* Right Arm */}
        {wrongAttempts > 3 && (
          <line 
            x1="120" 
            y1="80" 
            x2="140" 
            y2="100" 
            stroke="#1A1F2C" 
            strokeWidth="4"
            className={wrongAttempts === 4 ? "animate-pulse-soft" : ""}
          />
        )}
        
        {/* Left Leg */}
        {wrongAttempts > 4 && (
          <line 
            x1="120" 
            y1="110" 
            x2="100" 
            y2="140" 
            stroke="#1A1F2C" 
            strokeWidth="4"
            className={wrongAttempts === 5 ? "animate-pulse-soft" : ""}
          />
        )}
        
        {/* Right Leg */}
        {wrongAttempts > 5 && (
          <line 
            x1="120" 
            y1="110" 
            x2="140" 
            y2="140" 
            stroke="#1A1F2C" 
            strokeWidth="4"
            className={wrongAttempts === 6 ? "animate-pulse-soft" : ""}
          />
        )}
      </svg>
    </div>
  );
};

export default HangmanFigure;
