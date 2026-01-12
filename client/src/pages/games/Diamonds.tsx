import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface GameHistory {
  result: string;
  score: number;
  timestamp: Date;
  multiplier: number;
}

const GEMS = ['💎', '💍', '👑', '⭐'];
const GRID_SIZES = [
  { label: '4x4', value: 16 },
  { label: '5x5', value: 25 },
  { label: '6x6', value: 36 },
];

const DIFFICULTY_LEVELS = [
  { label: 'Easy', value: 1, multiplier: 1 },
  { label: 'Medium', value: 2, multiplier: 1.5 },
  { label: 'Hard', value: 3, multiplier: 2 },
];

export default function Diamonds() {
  const [credits, setCredits] = useState(1000000);
  const [grid, setGrid] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [message, setMessage] = useState('');
  const [betAmount, setBetAmount] = useState(10000);
  const [gridSize, setGridSize] = useState(16);
  const [difficulty, setDifficulty] = useState(1);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const gridDimension = Math.sqrt(gridSize);
  const difficultyMultiplier = DIFFICULTY_LEVELS.find(d => d.value === difficulty)?.multiplier || 1;

  const initializeGame = () => {
    if (credits < betAmount) {
      setMessage('Insufficient points!');
      return;
    }

    setCredits(credits - betAmount);
    const newGrid = Array.from({ length: gridSize }).map(
      () => GEMS[Math.floor(Math.random() * GEMS.length)]
    );
    setGrid(newGrid);
    setGameActive(true);
    setScore(0);
    setSelected(new Set());
    setMessage('Match 3+ gems of the same type to score!');
  };

  const handleGemClick = (index: number) => {
    if (!gameActive || grid.length === 0) return;

    const newSelected = new Set(selected);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelected(newSelected);

    if (newSelected.size >= 3) {
      const selectedGems = Array.from(newSelected).map((i) => grid[i]);
      const firstGem = selectedGems[0];

      if (selectedGems.every((gem) => gem === firstGem)) {
        const baseBonus = newSelected.size * 5000;
        const bonus = Math.floor(baseBonus * difficultyMultiplier);
        setScore((prev) => prev + bonus);
        setMessage(`🎉 Match of ${newSelected.size}! +${bonus.toLocaleString()} credits!`);

        const newGrid = grid.map((gem, i) =>
          newSelected.has(i) ? GEMS[Math.floor(Math.random() * GEMS.length)] : gem
        );
        setGrid(newGrid);
        setSelected(new Set());
        setTimeout(() => setMessage(''), 2000);
      }
    }
  };

  const endGame = () => {
    const totalWinnings = Math.floor(score + betAmount);
    setCredits((prev) => prev + totalWinnings);
    addToHistory('GAME END', score, difficultyMultiplier);
    setMessage(`🎉 Game Over! Total Score: ${score.toLocaleString()} credits!`);
    setGameActive(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const addToHistory = (result: string, points: number, multiplier: number) => {
    setGameHistory([
      { result, score: points, timestamp: new Date(), multiplier },
      ...gameHistory.slice(0, 9),
    ]);
  };

  const resetGame = () => {
    setCredits(1000000);
    setGrid([]);
    setSelected(new Set());
    setScore(0);
    setGameActive(false);
    setMessage('');
    setGameHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400">💎 DIAMONDS</h1>
            <p className="text-cyan-300 text-sm mt-1">Match 3+ Gems to Win Big!</p>
          </div>
          <div className="text-right bg-gray-800 border-2 border-cyan-600 rounded-lg p-4">
            <div className="text-cyan-300 text-sm font-semibold">YOUR POINTS</div>
            <div className="text-3xl font-bold text-cyan-400">{credits.toLocaleString()}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-bold py-3 px-4 rounded mb-4 text-center shadow-lg">
            {message}
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Game Grid */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-cyan-600">
              {/* Game Controls */}
              <div className="mb-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">⚙️ GAME SETTINGS</h3>

                {/* Grid Size Selection */}
                <div className="mb-4">
                  <label className="text-cyan-300 font-semibold text-sm mb-2 block">Grid Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {GRID_SIZES.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setGridSize(size.value)}
                        disabled={gameActive}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          gridSize === size.value
                            ? 'bg-cyan-500 text-gray-900 ring-2 ring-cyan-300'
                            : 'bg-gray-700 text-cyan-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div className="mb-4">
                  <label className="text-cyan-300 font-semibold text-sm mb-2 block">Difficulty</label>
                  <div className="grid grid-cols-3 gap-2">
                    {DIFFICULTY_LEVELS.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setDifficulty(level.value)}
                        disabled={gameActive}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          difficulty === level.value
                            ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                            : 'bg-gray-700 text-cyan-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bet Amount */}
                <div className="mb-4">
                  <label className="text-cyan-300 font-semibold text-sm mb-2 block">Bet Amount</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5000, 10000, 25000, 50000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        disabled={gameActive}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          betAmount === amount
                            ? 'bg-green-600 text-white ring-2 ring-green-400'
                            : 'bg-gray-700 text-cyan-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {(amount / 1000).toFixed(0)}K
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Game Grid */}
              <div className="mb-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">🎮 GAME BOARD</h3>
                <div
                  className="grid gap-2 bg-gray-900 p-4 rounded-lg"
                  style={{
                    gridTemplateColumns: `repeat(${gridDimension}, minmax(0, 1fr))`,
                  }}
                >
                  {gameActive && grid.length > 0 ? (
                    grid.map((gem, index) => (
                      <button
                        key={index}
                        onClick={() => handleGemClick(index)}
                        className={`aspect-square rounded-lg font-bold text-3xl transition-all transform hover:scale-105 ${
                          selected.has(index)
                            ? 'bg-gradient-to-br from-yellow-500 to-orange-600 border-2 border-yellow-400 shadow-lg shadow-yellow-500/50 scale-105'
                            : 'bg-gradient-to-br from-cyan-600 to-blue-700 border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer'
                        }`}
                      >
                        {gem}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-gray-400">
                      Click "Start Game" to begin
                    </div>
                  )}
                </div>
              </div>

              {/* Game Stats */}
              {gameActive && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                    <div className="text-cyan-300 text-sm font-semibold">Selected Gems</div>
                    <div className="text-3xl font-bold text-cyan-400">{selected.size}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                    <div className="text-cyan-300 text-sm font-semibold">Current Score</div>
                    <div className="text-3xl font-bold text-yellow-400">{score.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                    <div className="text-cyan-300 text-sm font-semibold">Multiplier</div>
                    <div className="text-3xl font-bold text-purple-400">{difficultyMultiplier.toFixed(1)}x</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {!gameActive ? (
                  <Button
                    onClick={initializeGame}
                    className="col-span-2 bg-gradient-to-b from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold py-4 text-lg border-2 border-cyan-400 shadow-lg rounded-lg"
                  >
                    🎮 START GAME
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={endGame}
                      className="bg-gradient-to-b from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold py-4 text-lg border-2 border-yellow-400 shadow-lg rounded-lg"
                    >
                      💰 END GAME
                    </Button>
                    <Button
                      onClick={() => setGameActive(false)}
                      className="bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 text-lg border-2 border-red-400 shadow-lg rounded-lg"
                    >
                      ❌ QUIT
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Game History */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-5 shadow-xl h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cyan-400 font-bold text-lg">📊 RECENT GAMES</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-cyan-300 hover:text-cyan-400 text-sm font-semibold"
                >
                  {showHistory ? '▼' : '▶'}
                </button>
              </div>

              {showHistory && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {gameHistory.length === 0 ? (
                    <div className="text-gray-400 text-center py-8 text-sm">No games played yet</div>
                  ) : (
                    gameHistory.map((game, idx) => (
                      <div key={idx} className="bg-gray-700 border border-gray-600 rounded p-3 text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-cyan-400">{game.result}</span>
                          <span className="text-gray-300 text-xs">{game.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cyan-300">Score: {game.score.toLocaleString()}</span>
                          <span className="font-bold text-yellow-400">x{game.multiplier.toFixed(1)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Play Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">📖 HOW TO PLAY DIAMONDS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">1️⃣ PLACE YOUR BET</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Select your bet amount (5K, 10K, 25K, or 50K credits), choose your grid size (4x4, 5x5, 6x6), and difficulty level (Easy, Medium, Hard). Higher difficulty = higher multiplier!
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">2️⃣ MATCH GEMS</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Click on gems to select them. Match 3 or more gems of the same type to score! The more gems you match at once, the bigger your bonus. Matched gems are replaced with new ones.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">3️⃣ END & COLLECT</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Keep matching gems to increase your score. Click "End Game" to cash out your total score multiplied by your difficulty multiplier. The longer you play, the higher your score!
              </p>
            </div>
          </div>
        </div>

        {/* Game Rules Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">🎲 GAME RULES & MECHANICS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-cyan-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Basic Rules</h3>
              <ul className="space-y-2">
                <li>✓ Click gems to select them (selected gems highlight in yellow)</li>
                <li>✓ Match 3+ gems of the same type to score</li>
                <li>✓ Matched gems are replaced with new random gems</li>
                <li>✓ Your score = (Number of gems matched × 5,000) × Difficulty Multiplier</li>
                <li>✓ Click "End Game" to cash out your total score</li>
                <li>✓ If you quit, you lose your current score</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Difficulty & Scoring</h3>
              <ul className="space-y-2">
                <li><span className="text-cyan-400 font-semibold">Easy (1x):</span> Base multiplier - good for beginners</li>
                <li><span className="text-cyan-400 font-semibold">Medium (1.5x):</span> 50% score boost - balanced gameplay</li>
                <li><span className="text-cyan-400 font-semibold">Hard (2x):</span> Double score - for experienced players</li>
                <li><span className="text-cyan-400 font-semibold">Grid Sizes:</span> Larger grids = more gems = more matching opportunities</li>
                <li><span className="text-cyan-400 font-semibold">Match Bonuses:</span> 3 gems = 15K, 4 gems = 20K, 5+ gems = 25K+</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Diamonds Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">ℹ️ ABOUT DIAMONDS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-cyan-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">History & Origins</h3>
              <p className="mb-4">
                Diamonds is a classic match-3 puzzle game inspired by legendary titles like Bejeweled and Candy Crush. The game combines simple mechanics with addictive gameplay, making it one of the most popular casual games worldwide. Our casino version adds betting mechanics and multipliers to increase excitement and rewards.
              </p>
              <h3 className="text-cyan-300 font-bold mb-3">Why Players Love Diamonds</h3>
              <ul className="space-y-2">
                <li>✓ Simple, intuitive gameplay - easy to learn, hard to master</li>
                <li>✓ Satisfying match animations and feedback</li>
                <li>✓ Customizable difficulty levels for all skill levels</li>
                <li>✓ High score potential with strategic gem matching</li>
                <li>✓ Relaxing yet engaging gaming experience</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Game Features</h3>
              <ul className="space-y-2 mb-4">
                <li><span className="text-cyan-400 font-semibold">RTP (Return to Player):</span> Typically 96% - favorable odds</li>
                <li><span className="text-cyan-400 font-semibold">Max Score:</span> Unlimited - keep matching for bigger scores</li>
                <li><span className="text-cyan-400 font-semibold">Instant Results:</span> Matches are revealed immediately</li>
                <li><span className="text-cyan-400 font-semibold">Free-to-Play:</span> Play with unlimited credits, no real money</li>
              </ul>

              <h3 className="text-cyan-300 font-bold mb-3">Strategy Tips</h3>
              <ul className="space-y-2">
                <li>✓ Look for cascades - matches that create more matches</li>
                <li>✓ Plan ahead - think 2-3 moves in advance</li>
                <li>✓ Start with Easy difficulty to build confidence</li>
                <li>✓ Focus on larger matches for bigger bonuses</li>
                <li>✓ Use the multiplier system to maximize your winnings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
