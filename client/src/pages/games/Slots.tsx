import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, Zap } from "lucide-react";

const INITIAL_CREDITS = 1000000;
const BET_AMOUNT = 10000;
const SYMBOLS = ["🍒", "🍊", "🍋", "🍇", "💎", "👑"];

const PAYOUTS: { [key: string]: number } = {
  "🍒": 2,
  "🍊": 3,
  "🍋": 4,
  "🍇": 5,
  "💎": 10,
  "👑": 20,
};

export default function Slots() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [reels, setReels] = useState(["🍒", "🍒", "🍒"]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("Click SPIN to play!");
  const [lastWinnings, setLastWinnings] = useState(0);

  const spin = async () => {
    if (credits < BET_AMOUNT) {
      setMessage("Not enough credits!");
      return;
    }

    setCredits(credits - BET_AMOUNT);
    setSpinning(true);
    setMessage("Spinning...");
    setLastWinnings(0);

    const spinDuration = 2000;
    const spinInterval = 50;
    const spins = spinDuration / spinInterval;

    for (let i = 0; i < spins; i++) {
      await new Promise((resolve) => setTimeout(resolve, spinInterval));
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
    }

    const finalReels = [
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    ];
    setReels(finalReels);

    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const multiplier = PAYOUTS[finalReels[0]];
      const winnings = BET_AMOUNT * multiplier;
      setCredits((prev) => prev + winnings);
      setLastWinnings(winnings);
      setMessage(`🎉 YOU WON! ${winnings.toLocaleString()} credits!`);
    } else {
      setMessage("No match. Try again!");
    }

    setSpinning(false);
  };

  const reset = () => {
    setCredits(INITIAL_CREDITS);
    setReels(["🍒", "🍒", "🍒"]);
    setMessage("Click SPIN to play!");
    setLastWinnings(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-20">
      {/* Premium Header */}
      <div className="bg-black/90 backdrop-blur border-b-2 border-cyan-500/50 sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-widest uppercase">🎰 Slots</h1>
            <p className="text-cyan-400 text-sm mt-1 tracking-wide">Match 3 Symbols to Win</p>
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
              {/* Reel Display */}
              <div className="mb-8">
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-2xl p-8 flex justify-center gap-6">
                  {reels.map((symbol, index) => (
                    <div
                      key={index}
                      className={`w-24 h-24 bg-gradient-to-br from-cyan-600 to-blue-700 border-2 border-cyan-400 rounded-xl flex items-center justify-center text-6xl shadow-lg transition-all ${
                        spinning ? "animate-spin" : ""
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Display */}
              <div className="text-center mb-8 min-h-14">
                <div className={`text-2xl font-bold tracking-wide uppercase transition-all ${
                  message.includes("WON")
                    ? "text-yellow-400 animate-pulse drop-shadow-lg"
                    : message.includes("No match")
                    ? "text-red-400 drop-shadow-lg"
                    : "text-cyan-400"
                }`}>
                  {message}
                </div>
              </div>

              {/* Payouts Table */}
              <div className="mb-8">
                <h3 className="text-cyan-400 font-bold uppercase tracking-widest mb-4 text-sm">Payouts</h3>
                <div className="grid grid-cols-3 gap-3">
                  {SYMBOLS.map((symbol) => (
                    <div
                      key={symbol}
                      className="bg-black/60 border border-cyan-500/30 rounded-lg p-3 text-center hover:border-cyan-500/60 transition-all"
                    >
                      <div className="text-3xl mb-2">{symbol}</div>
                      <div className="text-yellow-400 font-bold text-lg">{PAYOUTS[symbol]}x</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                  <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">Bet Amount</div>
                  <div className="text-3xl font-bold text-white font-mono">{BET_AMOUNT.toLocaleString()}</div>
                </div>
                <div className="bg-black/60 border-2 border-green-500/30 rounded-xl p-4 text-center hover:border-green-500/60 transition-all">
                  <div className="text-green-400 text-xs uppercase tracking-widest mb-2 font-bold">Last Win</div>
                  <div className="text-3xl font-bold text-green-400 font-mono">{lastWinnings.toLocaleString()}</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={spin}
                  disabled={spinning || credits < BET_AMOUNT}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:shadow-none uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                >
                  <Zap size={20} className="mr-2" />
                  Spin
                </Button>

                <Button
                  onClick={reset}
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
                  <p className="leading-relaxed">Match 3 identical symbols on the reels to win!</p>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-3 uppercase tracking-wide text-sm">How It Works</h3>
                  <div className="space-y-2 text-xs">
                    <p>1. Click SPIN to start</p>
                    <p>2. Reels spin automatically</p>
                    <p>3. Match 3 symbols to win</p>
                    <p>4. Higher symbols = bigger wins</p>
                  </div>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-3 uppercase tracking-wide text-sm">Symbol Values</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Cherry:</span>
                      <span className="text-yellow-400 font-bold">2x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crown:</span>
                      <span className="text-yellow-400 font-bold">20x</span>
                    </div>
                  </div>
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
