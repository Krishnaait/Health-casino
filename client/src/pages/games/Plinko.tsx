import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, Zap } from "lucide-react";

const INITIAL_CREDITS = 1000000;
const BET_AMOUNT = 10000;
const SLOTS = 8;
const MULTIPLIERS = [0.5, 1, 2, 5, 10, 5, 2, 1];

export default function Plinko() {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("Click DROP to release the ball!");
  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [lastWinnings, setLastWinnings] = useState(0);

  const handleDrop = () => {
    if (credits < BET_AMOUNT) {
      setMessage("Not enough credits!");
      return;
    }

    setPlaying(true);
    setMessage("Ball dropping...");
    setCredits(credits - BET_AMOUNT);
    setBallPosition(null);

    let position = Math.floor(SLOTS / 2);
    let steps = 0;

    const dropInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        position = Math.min(position + 1, SLOTS - 1);
      } else {
        position = Math.max(position - 1, 0);
      }
      setBallPosition(position);
      steps++;

      if (steps > 15) {
        clearInterval(dropInterval);
        setPlaying(false);

        const multiplier = MULTIPLIERS[position];
        const winnings = Math.floor(BET_AMOUNT * multiplier);

        if (multiplier > 1) {
          setCredits((prev) => prev + winnings);
          setLastWinnings(winnings);
          setMessage(`🎉 YOU WON! ${winnings.toLocaleString()} credits!`);
        } else if (multiplier === 1) {
          setLastWinnings(0);
          setMessage("Break even! Try again!");
        } else {
          setLastWinnings(0);
          setMessage("No win this time. Better luck next time!");
        }
      }
    }, 150);
  };

  const resetGame = () => {
    setCredits(INITIAL_CREDITS);
    setBallPosition(null);
    setMessage("Click DROP to release the ball!");
    setLastWinnings(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-20">
      {/* Premium Header */}
      <div className="bg-black/90 backdrop-blur border-b-2 border-cyan-500/50 sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-widest uppercase">🎯 Plinko</h1>
            <p className="text-cyan-400 text-sm mt-1 tracking-wide">Drop the Ball Through Pegs</p>
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
              {/* Game Board */}
              <div className="mb-8">
                {/* Drop Zone */}
                <div className="h-16 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 rounded-t-3xl flex items-center justify-center mb-2 shadow-lg border-2 border-cyan-400">
                  <div className={`text-4xl ${playing ? "animate-bounce" : ""}`}>⚪</div>
                </div>

                {/* Plinko Board */}
                <div className="bg-gradient-to-b from-purple-900/80 to-black/80 rounded-lg p-12 min-h-80 flex flex-col justify-between border-2 border-cyan-500/30">
                  {/* Peg rows */}
                  {[0, 1, 2, 3, 4].map((row) => (
                    <div key={row} className="flex justify-center gap-6">
                      {Array.from({ length: row + 2 }).map((_, col) => (
                        <div
                          key={col}
                          className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg hover:shadow-cyan-500/50 transition-all"
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Slots */}
                <div className="grid grid-cols-8 gap-2 mt-4 mb-6">
                  {MULTIPLIERS.map((multiplier, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl text-center font-bold text-lg transition-all duration-300 border-2 ${
                        ballPosition === index
                          ? "bg-gradient-to-br from-yellow-500 to-orange-600 text-white scale-110 shadow-2xl shadow-yellow-500/50 border-yellow-400"
                          : multiplier > 5
                          ? "bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30 border-green-400/50 hover:border-green-400"
                          : "bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-500/30 border-cyan-400/50 hover:border-cyan-400"
                      }`}
                    >
                      {multiplier}x
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div className="text-center mb-8 min-h-14">
                  <div className={`text-2xl font-bold tracking-wide uppercase transition-all ${
                    message.includes("WON")
                      ? "text-yellow-400 animate-pulse drop-shadow-lg"
                      : message.includes("dropping")
                      ? "text-cyan-400"
                      : "text-red-400"
                  }`}>
                    {message}
                  </div>
                </div>

                {/* Last Winnings */}
                {lastWinnings > 0 && (
                  <div className="text-center text-xl font-bold text-yellow-400 mb-4 animate-pulse drop-shadow-lg">
                    Last Win: {lastWinnings.toLocaleString()} credits
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={handleDrop}
                  disabled={playing || credits < BET_AMOUNT}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:shadow-none uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                >
                  <Zap size={20} className="mr-2" />
                  Drop
                </Button>

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
                  <p className="leading-relaxed">Drop the ball from the top and watch it bounce through pegs to land in a winning slot!</p>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-3 uppercase tracking-wide text-sm">Multipliers</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Left/Right Edge:</span>
                      <span className="text-yellow-400 font-bold">0.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Near Edges:</span>
                      <span className="text-yellow-400 font-bold">1x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Center (Max):</span>
                      <span className="text-green-400 font-bold">10x</span>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-2 uppercase tracking-wide text-sm">Scoring</h3>
                  <p className="leading-relaxed text-xs">Winnings = Bet × Multiplier. Center slots offer highest multipliers!</p>
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
