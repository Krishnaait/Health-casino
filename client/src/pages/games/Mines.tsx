import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info } from "lucide-react";

export default function Mines() {
  const GRID_SIZE = 25; // 5x5 grid
  const INITIAL_MINES = 5;
  const INITIAL_CREDITS = 1000000;
  const BET_AMOUNT = 10000;

  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [gameStarted, setGameStarted] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [mines, setMines] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [message, setMessage] = useState("Click START to begin!");
  const [showInfo, setShowInfo] = useState(false);

  const startGame = () => {
    if (credits < BET_AMOUNT) {
      setMessage("Not enough credits! Resetting...");
      setCredits(INITIAL_CREDITS);
      return;
    }

    const newMines = new Set<number>();
    while (newMines.size < INITIAL_MINES) {
      newMines.add(Math.floor(Math.random() * GRID_SIZE));
    }

    setCredits(credits - BET_AMOUNT);
    setMines(newMines);
    setRevealed(new Set());
    setGameStarted(true);
    setGameOver(false);
    setWon(false);
    setCurrentMultiplier(1);
    setMessage("Click tiles to find safe spots!");
  };

  const handleTileClick = (index: number) => {
    if (!gameStarted || revealed.has(index) || gameOver || won) return;

    const newRevealed = new Set(revealed);
    newRevealed.add(index);
    setRevealed(newRevealed);

    if (mines.has(index)) {
      setGameOver(true);
      setMessage("💣 Hit a mine! Game Over!");
      setGameStarted(false);
    } else {
      const safeCount = newRevealed.size;
      const newMultiplier = 1 + safeCount * 0.1;
      setCurrentMultiplier(newMultiplier);

      if (safeCount === GRID_SIZE - INITIAL_MINES) {
        const winnings = Math.floor(BET_AMOUNT * newMultiplier * 2);
        setCredits(credits - BET_AMOUNT + winnings);
        setWon(true);
        setMessage(`🎉 You Won! ${winnings.toLocaleString()} credits!`);
        setGameStarted(false);
      }
    }
  };

  const handleCashOut = () => {
    if (!gameStarted || currentMultiplier === 1) return;

    const winnings = Math.floor(BET_AMOUNT * currentMultiplier);
    setCredits(credits - BET_AMOUNT + winnings);
    setMessage(`Cashed out! Won ${winnings.toLocaleString()} credits!`);
    setGameStarted(false);
    setGameOver(true);
  };

  const resetGame = () => {
    setCredits(INITIAL_CREDITS);
    setGameStarted(false);
    setRevealed(new Set());
    setMines(new Set());
    setGameOver(false);
    setWon(false);
    setCurrentMultiplier(1);
    setMessage("Click START to begin!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-purple-900 to-secondary pb-20">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur p-6 sticky top-0 z-40 border-b border-cyan-400/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">💣 MINES</h1>
            <p className="text-cyan-400 text-sm">Click safe tiles to increase your multiplier</p>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 text-sm">Your Credits</div>
            <div className="text-3xl font-bold text-white">{credits.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-black/60 to-purple-900/60 backdrop-blur rounded-3xl p-8 shadow-2xl border border-cyan-400/20">
              {/* Game Grid */}
              <div className="mb-8">
                <div className="grid grid-cols-5 gap-2 mb-6 bg-black/40 p-6 rounded-2xl">
                  {Array.from({ length: GRID_SIZE }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleTileClick(index)}
                      disabled={!gameStarted || revealed.has(index)}
                      className={`aspect-square rounded-lg font-bold text-2xl transition-all transform hover:scale-105 ${
                        revealed.has(index)
                          ? mines.has(index)
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                          : "bg-gradient-to-br from-secondary to-accent text-white hover:shadow-lg shadow-md"
                      } ${!gameStarted && "opacity-50 cursor-not-allowed"}`}
                    >
                      {revealed.has(index) && (mines.has(index) ? "💣" : "✓")}
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30 text-center">
                    <div className="text-cyan-400 text-sm">Safe Tiles</div>
                    <div className="text-2xl font-bold text-white">{revealed.size}/{GRID_SIZE - INITIAL_MINES}</div>
                  </div>
                  <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30 text-center">
                    <div className="text-cyan-400 text-sm">Mines</div>
                    <div className="text-2xl font-bold text-white">{INITIAL_MINES}</div>
                  </div>
                  <div className="bg-yellow-400/20 rounded-xl p-4 border border-yellow-400/50 text-center">
                    <div className="text-yellow-400 text-sm">Multiplier</div>
                    <div className="text-2xl font-bold text-yellow-400">{currentMultiplier.toFixed(2)}x</div>
                  </div>
                </div>

                {/* Message */}
                <div className="text-center text-xl font-bold text-cyan-400 mb-4 min-h-8">
                  {message}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                {!gameStarted ? (
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-lg shadow-lg"
                  >
                    START GAME
                  </Button>
                ) : (
                  <Button
                    onClick={handleCashOut}
                    disabled={currentMultiplier === 1}
                    className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold px-12 py-4 text-lg disabled:opacity-50"
                  >
                    CASH OUT ({Math.floor(BET_AMOUNT * currentMultiplier).toLocaleString()})
                  </Button>
                )}
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-bold px-6 py-3"
                >
                  <RotateCcw size={20} className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="bg-gradient-to-br from-black/60 to-purple-900/60 backdrop-blur rounded-3xl p-6 shadow-2xl border border-cyan-400/20 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">How to Play</h2>
              <Info size={24} className="text-cyan-400" />
            </div>

            <div className="space-y-6 text-gray-200">
              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-2 text-lg">Objective</h3>
                <p className="text-sm leading-relaxed">
                  Click tiles to find safe spots and avoid 5 hidden mines. Each safe tile increases your multiplier.
                </p>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-3 text-lg">Scoring</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Each Safe Tile:</span>
                    <span className="text-yellow-400 font-bold">+0.1x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Find All 20:</span>
                    <span className="text-yellow-400 font-bold">2x Multiplier</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hit Mine:</span>
                    <span className="text-red-400 font-bold">Lose Bet</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-2 text-lg">Strategy</h3>
                <p className="text-sm leading-relaxed">
                  You can cash out anytime to secure winnings. The longer you play, the higher the risk but also the higher the reward!
                </p>
              </div>

              <div className="bg-accent/20 rounded-xl p-4 border border-accent/50">
                <h3 className="font-bold text-accent mb-2 text-lg">Bet Amount</h3>
                <p className="text-lg font-bold text-yellow-400">
                  {BET_AMOUNT.toLocaleString()} credits per game
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
