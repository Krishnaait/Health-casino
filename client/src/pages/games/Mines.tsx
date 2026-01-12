import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface GameState {
  grid: ('mine' | 'diamond' | 'empty')[];
  revealed: boolean[];
  gameActive: boolean;
  currentMultiplier: number;
  nextMultiplier: number;
  minesHit: number;
}

const GRID_SIZES = [
  { label: '3x3', value: 9 },
  { label: '5x5', value: 25 },
  { label: '7x7', value: 49 },
  { label: '9x9', value: 81 },
];

const MINE_COUNTS = [1, 3, 5, 7];

export default function Mines() {
  const [credits, setCredits] = useState(1000000);
  const [betAmount, setBetAmount] = useState(10000);
  const [gridSize, setGridSize] = useState(25); // 5x5
  const [mineCount, setMineCount] = useState(3);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [message, setMessage] = useState('');
  const [gameHistory, setGameHistory] = useState<{ result: string; multiplier: number; winnings: number; timestamp: Date }[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const gridDimension = Math.sqrt(gridSize);

  const initializeGame = () => {
    if (credits < betAmount) {
      setMessage('Insufficient points!');
      return;
    }

    setCredits(credits - betAmount);
    const newGrid: ('mine' | 'diamond' | 'empty')[] = Array(gridSize).fill('empty');
    
    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const randomIndex = Math.floor(Math.random() * gridSize);
      if (newGrid[randomIndex] !== 'mine') {
        newGrid[randomIndex] = 'mine';
        minesPlaced++;
      }
    }

    // Place diamonds in remaining spots
    for (let i = 0; i < gridSize; i++) {
      if (newGrid[i] === 'empty') {
        newGrid[i] = 'diamond';
      }
    }

    setGameState({
      grid: newGrid,
      revealed: Array(gridSize).fill(false),
      gameActive: true,
      currentMultiplier: 1,
      nextMultiplier: getNextMultiplier(0),
      minesHit: 0,
    });

    setMessage('Game started! Pick a tile');
  };

  const getNextMultiplier = (diamondsFound: number) => {
    const safeSpots = gridSize - mineCount;
    const multiplier = Math.pow(1 + (mineCount / gridSize) * 0.5, diamondsFound + 1);
    return Math.round(multiplier * 100) / 100;
  };

  const revealTile = (index: number) => {
    if (!gameState || !gameState.gameActive || gameState.revealed[index]) return;

    const newRevealed = [...gameState.revealed];
    newRevealed[index] = true;

    if (gameState.grid[index] === 'mine') {
      // Hit a mine - game over
      setGameState({
        ...gameState,
        revealed: newRevealed,
        gameActive: false,
        minesHit: gameState.minesHit + 1,
      });
      setMessage('💣 MINE HIT! Game Over!');
      addToHistory('MINE HIT', gameState.currentMultiplier, 0);
      setTimeout(() => setMessage(''), 2000);
    } else {
      // Found a diamond
      const diamondsFound = newRevealed.filter((r, i) => r && gameState.grid[i] === 'diamond').length;
      const newMultiplier = getNextMultiplier(diamondsFound);

      setGameState({
        ...gameState,
        revealed: newRevealed,
        currentMultiplier: newMultiplier,
        nextMultiplier: getNextMultiplier(diamondsFound),
      });

      setMessage(`💎 Diamond found! Multiplier: ${newMultiplier.toFixed(2)}x`);
      setTimeout(() => setMessage(''), 1500);
    }
  };

  const cashOut = () => {
    if (!gameState || !gameState.gameActive) return;

    const winnings = Math.floor(betAmount * gameState.currentMultiplier);
    setCredits(credits + winnings);
    addToHistory('CASH OUT', gameState.currentMultiplier, winnings);
    setMessage(`🎉 CASH OUT! Won ${(winnings / 1000).toFixed(1)}K credits!`);
    setGameState(null);
    setTimeout(() => setMessage(''), 2000);
  };

  const addToHistory = (result: string, multiplier: number, winnings: number) => {
    setGameHistory([
      { result, multiplier, winnings, timestamp: new Date() },
      ...gameHistory.slice(0, 9),
    ]);
  };

  const getTileColor = (index: number) => {
    if (!gameState || !gameState.revealed[index]) {
      return 'bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700';
    }

    if (gameState.grid[index] === 'mine') {
      return 'bg-gradient-to-br from-red-600 to-red-800';
    }

    return 'bg-gradient-to-br from-green-500 to-green-700';
  };

  const getTileContent = (index: number) => {
    if (!gameState || !gameState.revealed[index]) {
      return '?';
    }

    if (gameState.grid[index] === 'mine') {
      return '💣';
    }

    return '💎';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">⛏️ MINES</h1>
            <p className="text-yellow-300 text-sm mt-1">Uncover Diamonds, Avoid Mines, Win Big!</p>
          </div>
          <div className="text-right bg-gray-800 border-2 border-yellow-600 rounded-lg p-4">
            <div className="text-yellow-300 text-sm font-semibold">YOUR POINTS</div>
            <div className="text-3xl font-bold text-yellow-400">{credits.toLocaleString()}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold py-3 px-4 rounded mb-4 text-center shadow-lg">
            {message}
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Game Grid */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-yellow-600">
              {/* Game Controls */}
              <div className="mb-6">
                <h3 className="text-yellow-400 font-bold text-lg mb-4">⚙️ GAME SETTINGS</h3>
                
                {/* Grid Size Selection */}
                <div className="mb-4">
                  <label className="text-yellow-300 font-semibold text-sm mb-2 block">Grid Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {GRID_SIZES.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setGridSize(size.value)}
                        disabled={gameState?.gameActive}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          gridSize === size.value
                            ? 'bg-yellow-500 text-gray-900 ring-2 ring-yellow-300'
                            : 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mine Count Selection */}
                <div className="mb-4">
                  <label className="text-yellow-300 font-semibold text-sm mb-2 block">Number of Mines</label>
                  <div className="grid grid-cols-4 gap-2">
                    {MINE_COUNTS.map((count) => (
                      <button
                        key={count}
                        onClick={() => setMineCount(count)}
                        disabled={gameState?.gameActive}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          mineCount === count
                            ? 'bg-red-600 text-white ring-2 ring-red-400'
                            : 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bet Amount */}
                <div className="mb-4">
                  <label className="text-yellow-300 font-semibold text-sm mb-2 block">Bet Amount</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5000, 10000, 25000, 50000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        disabled={gameState?.gameActive}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          betAmount === amount
                            ? 'bg-green-600 text-white ring-2 ring-green-400'
                            : 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
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
                <h3 className="text-yellow-400 font-bold text-lg mb-4">🎮 GAME BOARD</h3>
                <div
                  className="grid gap-2 bg-gray-900 p-4 rounded-lg"
                  style={{
                    gridTemplateColumns: `repeat(${gridDimension}, minmax(0, 1fr))`,
                  }}
                >
                  {gameState ? (
                    gameState.grid.map((cell, index) => (
                      <button
                        key={index}
                        onClick={() => revealTile(index)}
                        disabled={!gameState.gameActive || gameState.revealed[index]}
                        className={`aspect-square rounded-lg font-bold text-2xl transition-all transform hover:scale-105 disabled:hover:scale-100 ${getTileColor(index)} shadow-lg border-2 border-gray-700`}
                      >
                        {getTileContent(index)}
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
              {gameState && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                    <div className="text-yellow-300 text-sm font-semibold">Current Multiplier</div>
                    <div className="text-3xl font-bold text-yellow-400">{gameState.currentMultiplier.toFixed(2)}x</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                    <div className="text-yellow-300 text-sm font-semibold">Next Multiplier</div>
                    <div className="text-3xl font-bold text-green-400">{gameState.nextMultiplier.toFixed(2)}x</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                    <div className="text-yellow-300 text-sm font-semibold">Potential Win</div>
                    <div className="text-3xl font-bold text-green-400">${(betAmount * gameState.nextMultiplier / 1000).toFixed(1)}K</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {!gameState || !gameState.gameActive ? (
                  <Button
                    onClick={initializeGame}
                    className="col-span-2 bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 text-lg border-2 border-green-400 shadow-lg rounded-lg"
                  >
                    🎮 START GAME
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={cashOut}
                      className="bg-gradient-to-b from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold py-4 text-lg border-2 border-yellow-400 shadow-lg rounded-lg"
                    >
                      💰 CASH OUT
                    </Button>
                    <Button
                      onClick={() => setGameState(null)}
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
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-5 shadow-xl h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-yellow-400 font-bold text-lg">📊 GAME HISTORY</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-yellow-300 hover:text-yellow-400 text-sm font-semibold"
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
                          <span className={`font-bold ${game.result === 'CASH OUT' ? 'text-green-400' : 'text-red-400'}`}>
                            {game.result}
                          </span>
                          <span className="text-gray-300 text-xs">{game.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-300">Multiplier: {game.multiplier.toFixed(2)}x</span>
                          <span className={`font-bold ${game.winnings > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {game.winnings > 0 ? '+' : ''}{(game.winnings / 1000).toFixed(1)}K
                          </span>
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
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">📖 HOW TO PLAY MINES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-yellow-400 mb-3 text-lg">1️⃣ PLACE YOUR BET</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                Select your bet amount (5K, 10K, 25K, or 50K credits) and choose your game difficulty by setting the grid size (3x3, 5x5, 7x7, 9x9) and number of mines (1, 3, 5, or 7). Higher mines = higher risk but bigger multipliers!
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-yellow-400 mb-3 text-lg">2️⃣ REVEAL TILES</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                Click on any tile to reveal what's underneath. If you find a diamond 💎, your multiplier increases and you can continue playing. If you hit a mine 💣, the game ends immediately and you lose your bet.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-yellow-400 mb-3 text-lg">3️⃣ CASH OUT OR RISK</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                After each safe reveal, you can choose to "Collect" and collect your winnings (bet × current multiplier), or continue playing to increase your multiplier. The longer you play, the higher the risk but the bigger the potential payout!
              </p>
            </div>
          </div>
        </div>

        {/* Game Rules Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎲 GAME RULES & MECHANICS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">Basic Rules</h3>
              <ul className="space-y-2">
                <li>✓ Click tiles to reveal diamonds or mines</li>
                <li>✓ Finding a diamond increases your multiplier</li>
                <li>✓ Hitting a mine ends the game immediately</li>
                <li>✓ You can cash out anytime to collect winnings</li>
                <li>✓ Your winnings = Bet Amount × Current Multiplier</li>
                <li>✓ If you hit a mine, you lose your entire bet</li>
              </ul>
            </div>
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">Difficulty Settings</h3>
              <ul className="space-y-2">
                <li><span className="text-yellow-400 font-semibold">Grid Size:</span> Larger grids = lower mine density = safer but smaller multipliers</li>
                <li><span className="text-yellow-400 font-semibold">Mine Count:</span> More mines = higher risk = bigger multipliers if you survive</li>
                <li><span className="text-yellow-400 font-semibold">Example:</span> 3x3 grid with 1 mine is safest; 9x9 grid with 7 mines is riskiest</li>
                <li><span className="text-yellow-400 font-semibold">Strategy:</span> Balance risk and reward based on your confidence and bankroll</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Mines Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">ℹ️ ABOUT MINES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">History & Origins</h3>
              <p className="mb-4">
                Mines is a modern casino adaptation of the classic Minesweeper game that became famous in the 1980s and 1990s. While the original Minesweeper was a logic puzzle game, the casino version transforms it into a pure luck-based game with exciting risk/reward mechanics. It has become one of the most popular instant-win games at online casinos worldwide.
              </p>
              <h3 className="text-yellow-300 font-bold mb-3">Why Players Love Mines</h3>
              <ul className="space-y-2">
                <li>✓ Simple, easy-to-learn gameplay</li>
                <li>✓ Fast-paced action with quick rounds</li>
                <li>✓ Customizable difficulty levels</li>
                <li>✓ High multiplier potential</li>
                <li>✓ Nostalgic connection to classic Minesweeper</li>
              </ul>
            </div>
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">Game Features</h3>
              <ul className="space-y-2 mb-4">
                <li><span className="text-yellow-400 font-semibold">RTP (Return to Player):</span> Typically 98% - highly favorable odds</li>
                <li><span className="text-yellow-400 font-semibold">Max Multiplier:</span> Can reach 100x or higher on large grids with few mines</li>
                <li><span className="text-yellow-400 font-semibold">Instant Results:</span> No waiting - results are revealed immediately</li>
                <li><span className="text-yellow-400 font-semibold">Provably Fair:</span> All results are mathematically fair and verified</li>
              </ul>

              <h3 className="text-yellow-300 font-bold mb-3">Strategy Tips</h3>
              <ul className="space-y-2">
                <li>✓ Start with smaller grids and fewer mines to build confidence</li>
                <li>✓ Set a target multiplier and cash out when you reach it</li>
                <li>✓ Don't get greedy - the longer you play, the higher the risk</li>
                <li>✓ Manage your bankroll wisely across multiple rounds</li>
                <li>✓ Remember: it's a game of luck, not skill - enjoy responsibly!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
