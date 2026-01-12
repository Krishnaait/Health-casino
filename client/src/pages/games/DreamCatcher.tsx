import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info } from "lucide-react";

export default function DreamCatcher() {
  const INITIAL_CREDITS = 1000000;
  const BET_AMOUNT = 10000;
  const SEGMENTS = 8;
  const multipliers = [1, 2, 5, 10, 2, 5, 1, 3];

  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("Click SPIN to start!");
  const [lastWinnings, setLastWinnings] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const handleSpin = () => {
    if (credits < BET_AMOUNT) {
      setMessage("Not enough credits! Resetting...");
      setCredits(INITIAL_CREDITS);
      return;
    }

    setSpinning(true);
    setMessage("Spinning...");
    setCredits(credits - BET_AMOUNT);

    // Random spin duration and final rotation
    const spinDuration = 3000 + Math.random() * 2000;
    const finalRotation = Math.random() * 360;
    const segmentAngle = 360 / SEGMENTS;
    const winningSegment = Math.floor((finalRotation % 360) / segmentAngle) % SEGMENTS;

    const startTime = Date.now();

    const spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Ease out animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentRotation = easeProgress * (360 * 5 + finalRotation);

      setRotation(currentRotation);

      if (progress >= 1) {
        clearInterval(spinInterval);
        setSpinning(false);

        const multiplier = multipliers[winningSegment];
        const winnings = Math.floor(BET_AMOUNT * multiplier);

        setCredits(prev => prev + winnings);
        setLastWinnings(winnings);
        setMessage(`🎉 YOU WON! ${winnings.toLocaleString()} credits! (${multiplier}x)`);
      }
    }, 50);
  };

  const resetGame = () => {
    setCredits(INITIAL_CREDITS);
    setRotation(0);
    setMessage("Click SPIN to start!");
    setLastWinnings(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-purple-900 to-secondary pb-20">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur p-6 sticky top-0 z-40 border-b border-cyan-400/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">🌙 DREAM CATCHER</h1>
            <p className="text-cyan-400 text-sm">Spin the wheel and catch your dreams!</p>
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
              {/* Wheel Container */}
              <div className="mb-8 flex justify-center">
                <div className="relative w-64 h-64">
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-yellow-400"></div>
                  </div>

                  {/* Wheel */}
                  <div
                    className="w-full h-full rounded-full shadow-2xl transition-transform"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      background: `conic-gradient(
                        from 0deg,
                        #ec4899 0deg 45deg,
                        #06b6d4 45deg 90deg,
                        #ec4899 90deg 135deg,
                        #06b6d4 135deg 180deg,
                        #ec4899 180deg 225deg,
                        #06b6d4 225deg 270deg,
                        #ec4899 270deg 315deg,
                        #06b6d4 315deg 360deg
                      )`,
                      border: "8px solid #1e293b",
                    }}
                  >
                    {/* Segments with multipliers */}
                    {multipliers.map((multiplier, index) => {
                      const angle = (index * 360) / SEGMENTS + 22.5;
                      return (
                        <div
                          key={index}
                          className="absolute w-full h-full flex items-center justify-center"
                          style={{
                            transform: `rotate(${angle}deg)`,
                          }}
                        >
                          <div
                            style={{
                              transform: `rotate(${-angle}deg) translateY(-90px)`,
                            }}
                            className="text-2xl font-bold text-white drop-shadow-lg"
                          >
                            {multiplier}x
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={handleSpin}
                  disabled={spinning || credits < BET_AMOUNT}
                  className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-lg disabled:opacity-50 shadow-lg"
                >
                  {spinning ? "SPINNING..." : `SPIN (${BET_AMOUNT.toLocaleString()})`}
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
                  Spin the wheel and watch where it lands. The multiplier at the top pointer determines your winnings!
                </p>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-3 text-lg">Multipliers</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>1x:</span>
                    <span className="text-yellow-400 font-bold">Break Even</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2x - 3x:</span>
                    <span className="text-yellow-400 font-bold">Good Win</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5x - 10x:</span>
                    <span className="text-yellow-400 font-bold">Big Win!</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-400/10 rounded-xl p-4 border border-cyan-400/30">
                <h3 className="font-bold text-cyan-400 mb-2 text-lg">Scoring</h3>
                <p className="text-sm leading-relaxed">
                  Your winnings = Bet × Multiplier. Each spin has an equal chance of landing on any multiplier!
                </p>
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
