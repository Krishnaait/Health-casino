import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info } from "lucide-react";

export default function Plinko() {
  const INITIAL_CREDITS = 1000000;
  const BET_AMOUNT = 10000;
  const SLOTS = 8;
  const multipliers = [0.5, 1, 2, 5, 10, 5, 2, 1];

  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("Click DROP to release the ball!");
  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [lastWinnings, setLastWinnings] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const handleDrop = () => {
    if (credits < BET_AMOUNT) {
      setMessage("Not enough credits! Resetting...");
      setCredits(INITIAL_CREDITS);
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

        const multiplier = multipliers[position];
        const winnings = Math.floor(BET_AMOUNT * multiplier);

        if (multiplier > 1) {
          setCredits(prev => prev + winnings);
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
    <div className="min-h-screen bg-gradient-to-b from-primary via-purple-900 to-secondary pb-20">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur p-6 sticky top-0 z-40 border-b border-cyan-400/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">🎯 PLINKO</h1>
            <p className="text-cyan-400 text-sm">Drop the ball and watch it fall through the pegs!</p>
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
              {/* Game Board */}
              <div className="mb-8">
                {/* Drop Zone */}
                <div className="h-16 bg-gradient-to-r from-secondary via-accent to-secondary rounded-t-3xl flex items-center justify-center mb-1 shadow-lg">
                  <div className="text-4xl animate-bounce">⚪</div>
                </div>

                {/* Plinko Board */}
                <div className="bg-gradient-to-b from-purple-900/80 to-black/80 rounded-lg p-12 min-h-80 flex flex-col justify-between border border-cyan-400/20">
                  {/* Peg rows */}
                  {[0, 1, 2, 3, 4].map(row => (
                    <div key={row} className="flex justify-center gap-6">
                      {Array.from({ length: row + 2 }).map((_, col) => (
                        <div
                          key={col}
                          className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Slots */}
                <div className="grid grid-cols-8 gap-2 mt-4 mb-6">
                  {multipliers.map((multiplier, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl text-center font-bold text-lg transition-all duration-300 ${
                        ballPosition === index
                          ? "bg-yellow-500 text-black scale-110 shadow-2xl"
                          : "bg-gradient-to-br from-secondary to-accent text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {multiplier}x
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div className="text-center text-2xl font-bold text-cyan-400 mb-4 min-h-10">
                  {message}
                </div>

                {/* Last Winnings */}
                {lastWinnings > 0 && (
                  <div className="text-center text-xl font-bold text-yellow-400 mb-4 animate-pulse">
                    Last Win: {lastWinnings.toLocaleString()} credits
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={handleDrop}
                  disabled={playing || credits < BET_AMOUNT}
                  className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-lg disabled:opacity-50 shadow-lg"
                >
                  {playing ? "DROPPING..." : `DROP (${BET_AMOUNT.toLocaleString()})`}
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
                  Drop the ball from the top and watch it bounce through the pegs. It lands in a slot at the bottom to determine your multiplier.
                </p>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-3 text-lg">Multipliers</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Left/Right Edge:</span>
                    <span className="text-yellow-400 font-bold">0.5x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Near Edges:</span>
                    <span className="text-yellow-400 font-bold">1x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Middle Slots:</span>
                    <span className="text-yellow-400 font-bold">2x - 10x</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-2 text-lg">Scoring</h3>
                <p className="text-sm leading-relaxed">
                  Your winnings = Bet × Multiplier. The center slots offer the highest multipliers (10x), but the ball's path is random!
                </p>
              </div>

              <div className="bg-accent/20 rounded-xl p-4 border border-accent/50">
                <h3 className="font-bold text-accent mb-2 text-lg">Bet Amount</h3>
                <p className="text-lg font-bold text-yellow-400">
                  {BET_AMOUNT.toLocaleString()} credits per drop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
