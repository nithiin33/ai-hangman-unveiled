
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface GameStatsProps {
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
}

const GameStats: React.FC<GameStatsProps> = ({ gamesPlayed, wins, currentStreak, bestStreak }) => {
  const winPercentage = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Games Played</p>
            <h3 className="text-2xl font-bold">{gamesPlayed}</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Win %</p>
            <h3 className="text-2xl font-bold">{winPercentage}%</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <h3 className="text-2xl font-bold">{currentStreak}</h3>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Best Streak</p>
            <h3 className="text-2xl font-bold">{bestStreak}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;
