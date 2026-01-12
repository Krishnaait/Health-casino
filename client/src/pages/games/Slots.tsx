import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info } from "lucide-react";

export default function Slots() {
  const SYMBOLS = ["🍒", "🍊", "🍋", "🍇", "💎", "👑"];
  const INITIAL_CREDITS = 1000000;
  const BET_AMOUNT = 10000;
  const REELS = 3;

  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [reels, setReels] = useState<string[]>(["🍒", "🍒", "🍒"]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("Click SPIN to play!");
  const [lastWinnings, setLastWinnings] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const calculateWinnings = (symbols: string[]): number => {
    if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
      const multipliers: { [key: string]: number } = {
        "🍒": 2,
        "🍊": 3,
        "🍋": 4,
        "🍇": 5,
        "💎": 10,
        "👑": 20,
      };
      return BET_AMOUNT * (multipliers[symbols[0]] || 2);
    }
    return 0;
  };

  const handleSpin = () => {
    if (credits < BET_AMOUNT) {
      setMessage("Not enough credits! Resetting...");
      setCredits(INITIAL_CREDITS);
      return;
    }

    setSpinning(true);
    setMessage("Spinning...");
    setCredits(credits - BET_AMOUNT);

    let spins = 0;
    const spinInterval = setInterval(() => {
      const newReels = Array.from({ length: REELS }).map(
        () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      );
      setReels(newReels);
      spins++;

      if (spins > 20) {
        clearInterval(spinInterval);
        setSpinning(false);

        const winnings = calculateWinnings(newReels);
        if (winnings > 0) {
          setCredits(prev => prev + winnings);
          setLastWinnings(winnings);
          setMessage(`🎉 YOU WON! ${winnings.toLocaleString()} credits!`);
        } else {
          setLastWinnings(0);
          setMessage("No match. Try again!");
        }
      }
    }, 100);
  };

  const resetGame = () => {
    setCredits(INITIAL_CREDITS);
    setReels(["🍒", "🍒", "🍒"]);
    setMessage("Click SPIN to play!");
    setLastWinnings(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-purple-900 to-secondary pb-20">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur p-6 sticky top-0 z-40 border-b border-cyan-400/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">🎰 SLOTS</h1>
            <p className="text-cyan-400 text-sm">Match 3 symbols to win big!</p>
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
              {/* Reels */}
              <div className="mb-8">
                <div className="flex justify-center gap-6 mb-8 bg-black/40 p-8 rounded-2xl">
                  {reels.map((symbol, index) => (
                    <div
                      key={index}
                      className={`w-28 h-28 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center text-7xl shadow-lg transform transition-all ${
                        spinning ? "animate-bounce" : ""
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30 text-center">
                    <div className="text-cyan-400 text-sm">Bet</div>
                    <div className="text-2xl font-bold text-white">{BET_AMOUNT.toLocaleString()}</div>
                  </div>
                  <div className="bg-yellow-400/20 rounded-xl p-4 border border-yellow-400/50 text-center">
                    <div className="text-yellow-400 text-sm">Last Win</div>
                    <div className="text-2xl font-bold text-yellow-400">{lastWinnings.toLocaleString()}</div>
                  </div>
                </div>

                {/* Message */}
                <div className="text-center text-2xl font-bold text-cyan-400 mb-4 min-h-10">
                  {message}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={handleSpin}
                  disabled={spinning || credits < BET_AMOUNT}
                  className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-lg disabled:opacity-50 shadow-lg"
                >
                  {spinning ? "SPINNING..." : `SPIN`}
                </Button>
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
                  Spin the reels and match 3 symbols to win! Each symbol has a different payout.
                </p>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-3 text-lg">Payouts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>🍒 Cherry:</span>
                    <span className="text-yellow-400 font-bold">2x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🍊 Orange:</span>
                    <span className="text-yellow-400 font-bold">3x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🍋 Lemon:</span>
                    <span className="text-yellow-400 font-bold">4x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🍇 Grapes:</span>
                    <span className="text-yellow-400 font-bold">5x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>💎 Diamond:</span>
                    <span className="text-yellow-400 font-bold">10x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>👑 Crown:</span>
                    <span className="text-yellow-400 font-bold">20x</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent/20 rounded-xl p-4 border border-accent/50">
                <h3 className="font-bold text-accent mb-2 text-lg">Bet Amount</h3>
                <p className="text-lg font-bold text-yellow-400">
                  {BET_AMOUNT.toLocaleString()} credits per spin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
