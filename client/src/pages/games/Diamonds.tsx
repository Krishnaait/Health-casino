import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info } from "lucide-react";

export default function Diamonds() {
  const INITIAL_CREDITS = 1000000;
  const BET_AMOUNT = 10000;
  const GRID_SIZE = 16; // 4x4 grid
  const GEMS = ["💎", "💍", "👑", "⭐"];

  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [grid, setGrid] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [message, setMessage] = useState("Click START to begin!");
  const [moves, setMoves] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // Initialize game
  useEffect(() => {
    if (gameActive && grid.length === 0) {
      const newGrid = Array.from({ length: GRID_SIZE }).map(
        () => GEMS[Math.floor(Math.random() * GEMS.length)]
      );
      setGrid(newGrid);
    }
  }, [gameActive, grid.length]);

  const startGame = () => {
    if (credits < BET_AMOUNT) {
      setMessage("Not enough credits! Resetting...");
      setCredits(INITIAL_CREDITS);
      return;
    }

    setCredits(credits - BET_AMOUNT);
    setGameActive(true);
    setScore(0);
    setMoves(0);
    setSelected(new Set());
    setGrid([]);
    setMessage("Match 3 or more gems to score!");
  };

  const handleGemClick = (index: number) => {
    if (!gameActive) return;

    const newSelected = new Set(selected);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelected(newSelected);

    // Check if adjacent gems are selected
    if (newSelected.size >= 3) {
      checkMatches(newSelected);
    }
  };

  const checkMatches = (selectedSet: Set<number>) => {
    const selectedArray = Array.from(selectedSet);
    const gem = grid[selectedArray[0]];

    // Check if all selected gems are the same
    const allSame = selectedArray.every(idx => grid[idx] === gem);

    if (allSame) {
      // Valid match
      const points = selectedArray.length * 5000;
      setScore(score + points);
      setCredits(credits - BET_AMOUNT + points);
      setMessage(`🎉 Matched ${selectedArray.length} gems! +${points.toLocaleString()} credits!`);
      setMoves(moves + 1);

      // Remove matched gems
      const newGrid = grid.map((g, i) => (selectedSet.has(i) ? "" : g));
      setGrid(newGrid);
      setSelected(new Set());
    } else {
      setMessage("Not a valid match! Select same gems.");
    }
  };

  const endGame = () => {
    const finalWinnings = score;
    if (finalWinnings > 0) {
      setCredits(credits + finalWinnings);
      setMessage(`Game Over! Total Winnings: ${finalWinnings.toLocaleString()} credits!`);
    } else {
      setMessage("Game Over! No winnings this round.");
    }
    setGameActive(false);
    setSelected(new Set());
  };

  const resetGame = () => {
    setCredits(INITIAL_CREDITS);
    setGameActive(false);
    setScore(0);
    setMoves(0);
    setSelected(new Set());
    setGrid([]);
    setMessage("Click START to begin!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-purple-900 to-secondary pb-20">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur p-6 sticky top-0 z-40 border-b border-cyan-400/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">💎 DIAMONDS</h1>
            <p className="text-cyan-400 text-sm">Match 3 or more gems to win!</p>
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
                <div className="grid grid-cols-4 gap-3 mb-6 bg-black/40 p-6 rounded-2xl">
                  {grid.map((gem, index) => (
                    <button
                      key={index}
                      onClick={() => handleGemClick(index)}
                      disabled={!gameActive || gem === ""}
                      className={`aspect-square rounded-xl text-4xl font-bold transition-all transform ${
                        selected.has(index)
                          ? "bg-yellow-500 scale-110 shadow-2xl"
                          : gem === ""
                          ? "bg-gray-800 opacity-30 cursor-not-allowed"
                          : "bg-gradient-to-br from-secondary to-accent hover:scale-105 shadow-lg"
                      }`}
                    >
                      {gem}
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30 text-center">
                    <div className="text-cyan-400 text-sm">Score</div>
                    <div className="text-2xl font-bold text-white">{score.toLocaleString()}</div>
                  </div>
                  <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30 text-center">
                    <div className="text-cyan-400 text-sm">Moves</div>
                    <div className="text-2xl font-bold text-white">{moves}</div>
                  </div>
                  <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30 text-center">
                    <div className="text-cyan-400 text-sm">Bet</div>
                    <div className="text-2xl font-bold text-yellow-400">{BET_AMOUNT.toLocaleString()}</div>
                  </div>
                </div>

                {/* Message */}
                <div className="text-center text-xl font-bold text-cyan-400 mb-4 min-h-8">
                  {message}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                {!gameActive ? (
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-lg shadow-lg"
                  >
                    START GAME
                  </Button>
                ) : (
                  <Button
                    onClick={endGame}
                    className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold px-12 py-4 text-lg"
                  >
                    END GAME
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
                  Click on gems to select them. Match 3 or more gems of the same type to score points!
                </p>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-3 text-lg">Scoring</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>3 Gems Matched:</span>
                    <span className="text-yellow-400 font-bold">15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4 Gems Matched:</span>
                    <span className="text-yellow-400 font-bold">20,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5+ Gems Matched:</span>
                    <span className="text-yellow-400 font-bold">25,000+</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-2 text-lg">Gems</h3>
                <p className="text-sm">
                  💎 Diamond • 💍 Ring • 👑 Crown • ⭐ Star
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
