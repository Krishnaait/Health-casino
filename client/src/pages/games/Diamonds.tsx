import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, Zap } from "lucide-react";

const INITIAL_CREDITS = 1000000;
const BET_AMOUNT = 10000;
const GRID_SIZE = 16;
const GEMS = ["💎", "💍", "👑", "⭐"];

export default function Diamonds() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [grid, setGrid] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [message, setMessage] = useState("Click START to begin!");
  const [lastWinnings, setLastWinnings] = useState(0);

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
      setMessage("Not enough credits!");
      return;
    }

    setCredits(credits - BET_AMOUNT);
    setGameActive(true);
    setScore(0);
    setSelected(new Set());
    setGrid([]);
    setLastWinnings(0);
    setMessage("Match 3 or more gems to score!");
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
        const matchBonus = newSelected.size * 5000;
        setScore((prev) => prev + matchBonus);
        setLastWinnings(matchBonus);
        setCredits((prev) => prev + matchBonus);
        setMessage(`🎉 Match of ${newSelected.size}! +${matchBonus.toLocaleString()} credits!`);

        const newGrid = grid.map((gem, i) =>
          newSelected.has(i) ? GEMS[Math.floor(Math.random() * GEMS.length)] : gem
        );
        setGrid(newGrid);
        setSelected(new Set());
      }
    }
  };

  const endGame = () => {
    setGameActive(false);
    setMessage(`Game Over! Total Score: ${score.toLocaleString()} credits!`);
    setCredits((prev) => prev + score);
  };

  const resetGame = () => {
    setCredits(INITIAL_CREDITS);
    setGrid([]);
    setSelected(new Set());
    setScore(0);
    setGameActive(false);
    setMessage("Click START to begin!");
    setLastWinnings(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-20">
      {/* Premium Header */}
      <div className="bg-black/90 backdrop-blur border-b-2 border-cyan-500/50 sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-widest uppercase">💎 Diamonds</h1>
            <p className="text-cyan-400 text-sm mt-1 tracking-wide">Match 3+ Gems to Win</p>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 text-xs uppercase tracking-widest mb-1">Your Credits</div>
            <div className="text-4xl font-bold text-yellow-400 font-mono drop-shadow-lg">{credits.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/90 border-2 border-cyan-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur">
              {/* Game Grid */}
              <div className="mb-8">
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-2xl p-6">
                  <div className="grid grid-cols-4 gap-3">
                    {grid.map((gem, index) => (
                      <button
                        key={index}
                        onClick={() => handleGemClick(index)}
                        disabled={!gameActive}
                        className={`aspect-square rounded-xl text-4xl font-bold transition-all transform hover:scale-110 ${
                          selected.has(index)
                            ? "bg-gradient-to-br from-yellow-500 to-orange-600 border-2 border-yellow-400 shadow-lg shadow-yellow-500/50 scale-105"
                            : "bg-gradient-to-br from-cyan-600 to-blue-700 border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
                        } ${!gameActive && "opacity-40 cursor-not-allowed"}`}
                      >
                        {gem}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Display */}
              <div className="text-center mb-8 min-h-14">
                <div className={`text-2xl font-bold tracking-wide uppercase transition-all ${
                  message.includes("Match")
                    ? "text-yellow-400 animate-pulse drop-shadow-lg"
                    : message.includes("Game Over")
                    ? "text-green-400 drop-shadow-lg"
                    : "text-cyan-400"
                }`}>
                  {message}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                  <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">Selected</div>
                  <div className="text-3xl font-bold text-white font-mono">{selected.size}</div>
                </div>
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                  <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">Score</div>
                  <div className="text-3xl font-bold text-yellow-400 font-mono">{score.toLocaleString()}</div>
                </div>
                <div className="bg-black/60 border-2 border-green-500/30 rounded-xl p-4 text-center hover:border-green-500/60 transition-all">
                  <div className="text-green-400 text-xs uppercase tracking-widest mb-2 font-bold">Last Win</div>
                  <div className="text-3xl font-bold text-green-400 font-mono">{lastWinnings.toLocaleString()}</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                {!gameActive ? (
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-cyan-500/50 uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                  >
                    <Zap size={20} className="mr-2" />
                    Start Game
                  </Button>
                ) : (
                  <Button
                    onClick={endGame}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-yellow-500/50 uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                  >
                    💰 End Game
                  </Button>
                )}

                <Button
                  onClick={resetGame}
                  className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 font-bold px-6 py-3 uppercase tracking-widest transition-all"
                >
                  <RotateCcw size={20} className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/90 border-2 border-cyan-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Info size={24} className="text-cyan-400" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest">How to Play</h2>
              </div>

              <div className="space-y-4 text-gray-300 text-sm">
                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-2 uppercase tracking-wide text-sm">Objective</h3>
                  <p className="leading-relaxed">Click and select 3 or more gems of the same type to match and score!</p>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-3 uppercase tracking-wide text-sm">Scoring</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>3 Gems Match:</span>
                      <span className="text-yellow-400 font-bold">15,000 credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4 Gems Match:</span>
                      <span className="text-yellow-400 font-bold">20,000 credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5+ Gems Match:</span>
                      <span className="text-yellow-400 font-bold">25,000+ credits</span>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-2 uppercase tracking-wide text-sm">Strategy</h3>
                  <p className="leading-relaxed text-xs">Match more gems at once for bigger bonuses! Click END GAME to cash out your score.</p>
                </div>

                <div className="bg-yellow-600/25 border-2 border-yellow-500/50 rounded-xl p-4">
                  <h3 className="font-bold text-yellow-400 mb-2 uppercase tracking-wide text-sm">Bet Amount</h3>
                  <p className="text-lg font-bold text-yellow-300">{BET_AMOUNT.toLocaleString()} credits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
