'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Menu } from 'lucide-react';

interface GameResult {
  multiplier: number;
  bet: number;
  winnings: number;
  timestamp: string;
}

export default function Plinko() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [credits, setCredits] = useState(1000000);
  const [betAmount, setBetAmount] = useState(10000);
  const [pins, setPins] = useState(14);
  const [playing, setPlaying] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [lastWin, setLastWin] = useState(0);
  const [selectedColor, setSelectedColor] = useState<'green' | 'yellow' | 'red'>('green');
  const [autoplayCount, setAutoplayCount] = useState(10);
  const [autoplayActive, setAutoplayActive] = useState(false);
  const [autoplayRemaining, setAutoplayRemaining] = useState(0);

  // Multipliers for different pin configurations
  const multipliers14 = [
    353, 49, 14, 5.3, 2.1, 0.5, 0.2, 0, 0.2, 0.5, 2.1, 5.3, 14, 49, 353
  ];

  const multipliers12 = [
    55, 12, 5.6, 3.2, 1.6, 1, 0.7, 0.2, 0.7, 1, 1.6, 3.2, 5.6, 12, 55
  ];

  const multipliers8 = [
    18, 3.2, 1.6, 1.3, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.3, 1.6, 3.2, 18
  ];

  const getMultipliers = () => {
    if (pins === 14) return multipliers14;
    if (pins === 12) return multipliers12;
    return multipliers8;
  };

  const drawBoard = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a7a7a');
    gradient.addColorStop(1, '#0d4d4d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw decorative circles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(canvas.width * 0.15, canvas.height * (0.3 + i * 0.3), 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width * 0.85, canvas.height * (0.3 + i * 0.3), 80, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw dashed border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 30, canvas.width - 80, canvas.height - 180);
    ctx.setLineDash([]);

    // Draw pegs
    const pegRadius = 6;
    const pegColor = '#ffffff';
    const pegGlow = '#88dddd';

    const rows = pins === 14 ? 12 : pins === 12 ? 10 : 8;
    const startX = canvas.width / 2;
    const startY = 60;
    const spacingX = 30;
    const spacingY = 25;

    for (let row = 0; row < rows; row++) {
      const pegsInRow = row + 1;
      for (let col = 0; col < pegsInRow; col++) {
        const x = startX - (pegsInRow - 1) * spacingX / 2 + col * spacingX;
        const y = startY + row * spacingY;

        // Glow effect
        ctx.fillStyle = pegGlow;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(x, y, pegRadius + 3, 0, Math.PI * 2);
        ctx.fill();

        // Peg
        ctx.globalAlpha = 1;
        ctx.fillStyle = pegColor;
        ctx.beginPath();
        ctx.arc(x, y, pegRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw multiplier slots at bottom
    const slotY = canvas.height - 140;
    const multipliers = getMultipliers();
    const slotWidth = (canvas.width - 80) / multipliers.length;

    multipliers.forEach((mult, index) => {
      const x = 40 + index * slotWidth;
      const y = slotY;

      // Determine color based on multiplier value
      let slotColor = '#22c55e'; // green
      if (mult >= 5) {
        slotColor = '#ef4444'; // red
      } else if (mult >= 1.5) {
        slotColor = '#f59e0b'; // orange
      }

      // Draw slot background
      ctx.fillStyle = slotColor;
      ctx.fillRect(x + 2, y, slotWidth - 4, 40);

      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 2, y, slotWidth - 4, 40);

      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(mult.toFixed(2) + 'x', x + slotWidth / 2, y + 20);
    });
  };

  const simulateBall = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rows = pins === 14 ? 12 : pins === 12 ? 10 : 8;
    const startX = canvas.width / 2;
    const startY = 60;
    const spacingX = 30;
    const spacingY = 25;

    let ballX = startX;
    let ballY = startY - 30;
    let path: number[] = [];

    // Simulate ball path through pegs
    for (let row = 0; row < rows; row++) {
      const direction = Math.random() > 0.5 ? 1 : -1;
      ballX += direction * spacingX / 2;
      ballY += spacingY;
      path.push(ballX, ballY);
    }

    // Determine final slot
    const slotIndex = Math.floor((ballX - (startX - (rows - 1) * spacingX / 2)) / spacingX);
    const finalSlot = Math.max(0, Math.min(getMultipliers().length - 1, slotIndex));

    // Animate ball falling
    let frame = 0;
    const totalFrames = 60;

    return new Promise<number>((resolve) => {
      const animate = () => {
        drawBoard(canvas);

        // Draw ball at current position
        const progress = frame / totalFrames;
        let currentX = startX;
        let currentY = startY - 30;

        if (progress < 1) {
          const pathIndex = Math.floor(progress * (path.length / 2 - 1));
          if (pathIndex < path.length / 2 - 1) {
            currentX = path[pathIndex * 2];
            currentY = path[pathIndex * 2 + 1];
          }
        } else {
          currentX = startX - (rows - 1) * spacingX / 2 + finalSlot * spacingX;
          currentY = canvas.height - 120;
        }

        // Draw ball with gradient
        const ballGradient = ctx.createRadialGradient(currentX - 3, currentY - 3, 0, currentX, currentY, 5);
        ballGradient.addColorStop(0, '#ffffff');
        ballGradient.addColorStop(1, '#00dddd');
        ctx.fillStyle = ballGradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(currentX, currentY + 6, 4, 0, Math.PI * 2);
        ctx.fill();

        frame++;

        if (frame <= totalFrames + 30) {
          requestAnimationFrame(animate);
        } else {
          // Game complete
          const multiplier = getMultipliers()[finalSlot];
          const winnings = Math.floor(betAmount * multiplier);
          setLastWin(winnings);
          setCredits(prev => prev + winnings);

          const result: GameResult = {
            multiplier,
            bet: betAmount,
            winnings,
            timestamp: new Date().toLocaleTimeString()
          };

          setGameHistory([result, ...gameHistory.slice(0, 9)]);
          resolve(winnings);
        }
      };

      animate();
    });
  };

  const handleDrop = async () => {
    if (credits < betAmount || playing) return;
    setPlaying(true);
    setCredits(credits - betAmount);
    await simulateBall();
    setPlaying(false);
  };

  const handleAutoplay = async () => {
    if (credits < betAmount * autoplayCount || playing) return;
    
    setAutoplayActive(true);
    setAutoplayRemaining(autoplayCount);
    setPlaying(true);

    for (let i = 0; i < autoplayCount; i++) {
      if (credits < betAmount) {
        setAutoplayActive(false);
        setPlaying(false);
        break;
      }

      setCredits(prev => prev - betAmount);
      setAutoplayRemaining(autoplayCount - i - 1);
      await simulateBall();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setAutoplayActive(false);
    setPlaying(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      drawBoard(canvas);
    }
  }, [pins]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-4 border-2 border-orange-400 flex items-center justify-between">
          {/* Left: Game selector */}
          <div className="flex items-center gap-4">
            <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-full font-bold border-2 border-teal-500 flex items-center gap-2">
              PLINKO
              <span>▼</span>
            </button>
            <button className="bg-orange-400 hover:bg-orange-500 text-slate-900 px-6 py-2 rounded-full font-bold flex items-center gap-2">
              <span>?</span> How to Play?
            </button>
            <button className="bg-orange-400 hover:bg-orange-500 text-slate-900 px-6 py-2 rounded-full font-bold">
              FUN MODE
            </button>
          </div>

          {/* Right: Credits and menu */}
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-lg">
              {(credits / 1000).toFixed(0)}K
            </div>
            <button className="bg-teal-700 hover:bg-teal-800 text-white p-2 rounded-full border-2 border-teal-500">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-b from-teal-600 to-teal-700 rounded-lg p-6 border-4 border-orange-400">
          {/* Pins Display */}
          <div className="text-center mb-4">
            <div className="inline-block bg-teal-700 text-white px-6 py-2 rounded-full font-bold border-2 border-teal-500">
              Pins: {pins}
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full border-2 border-teal-500 rounded-lg mb-6 bg-gradient-to-b from-teal-500 to-teal-600"
          />

          {/* Controls */}
          <div className="bg-teal-800 rounded-lg p-6 border-2 border-teal-600">
            {/* Bet Control */}
            <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
              <div className="text-center">
                <div className="text-white text-sm mb-2">Bet Amount</div>
                <div className="bg-teal-700 border-2 border-teal-500 rounded-lg px-6 py-3 text-white font-bold text-lg min-w-[150px]">
                  {(betAmount / 1000).toFixed(0)}K
                </div>
              </div>

              <button
                onClick={() => setBetAmount(Math.max(1000, betAmount - 5000))}
                className="bg-teal-600 hover:bg-teal-700 text-white w-12 h-12 rounded-full font-bold border-2 border-teal-500 text-xl"
              >
                −
              </button>

              <button className="bg-teal-600 hover:bg-teal-700 text-white w-12 h-12 rounded-full font-bold border-2 border-teal-500">
                ⚙
              </button>

              <button
                onClick={() => setBetAmount(betAmount + 5000)}
                className="bg-teal-600 hover:bg-teal-700 text-white w-12 h-12 rounded-full font-bold border-2 border-teal-500 text-xl"
              >
                +
              </button>

              {/* Spin Button */}
              <button
                onClick={handleDrop}
                disabled={playing || credits < betAmount}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white w-16 h-16 rounded-full font-bold border-4 border-blue-400 text-2xl flex items-center justify-center"
              >
                ▶
              </button>

              {/* Color Selection */}
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold border-2 border-green-400">
                GREEN
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-bold border-2 border-yellow-400">
                YELLOW
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold border-2 border-red-400">
                RED
              </button>
            </div>

            {/* Pin Selection and Autoplay */}
            <div className="flex justify-center gap-4 flex-wrap">
              {[8, 12, 14].map(p => (
                <button
                  key={p}
                  onClick={() => setPins(p)}
                  className={`px-6 py-2 rounded-full font-bold border-2 ${
                    pins === p
                      ? 'bg-orange-400 text-slate-900 border-orange-300'
                      : 'bg-teal-700 text-white border-teal-500 hover:bg-teal-600'
                  }`}
                >
                  {p} Pins
                </button>
              ))}

              {/* Autoplay Controls */}
              <div className="flex items-center gap-2 ml-4">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={autoplayCount}
                  onChange={(e) => setAutoplayCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-teal-700 text-white border-2 border-teal-500 rounded px-3 py-2 w-16 font-bold"
                />
                <button
                  onClick={handleAutoplay}
                  disabled={playing || credits < betAmount * autoplayCount}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 text-white px-6 py-2 rounded-full font-bold border-2 border-purple-400"
                >
                  {autoplayActive ? `Autoplay (${autoplayRemaining})` : 'Autoplay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game History */}
      {gameHistory.length > 0 && (
        <div className="max-w-6xl mx-auto mt-6">
          <div className="bg-slate-800 rounded-lg p-4 border-2 border-teal-600">
            <h3 className="text-white font-bold mb-4">Recent Drops</h3>
            <div className="grid grid-cols-5 gap-2">
              {gameHistory.slice(0, 5).map((result, idx) => (
                <div key={idx} className="bg-teal-700 rounded p-3 text-center border border-teal-600">
                  <div className="text-white font-bold">{result.multiplier.toFixed(2)}x</div>
                  <div className="text-teal-200 text-sm">+{(result.winnings / 1000).toFixed(0)}K</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* How to Play Section */}
      <div className="max-w-6xl mx-auto mt-8 bg-slate-800 rounded-lg p-6 border-2 border-teal-600">
        <h2 className="text-white font-bold text-2xl mb-4">📖 HOW TO PLAY PLINKO</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-orange-400 font-bold mb-2">1️⃣ PLACE YOUR BET</h3>
            <p className="text-teal-200 text-sm">Select your bet amount using the +/- buttons. Choose between 8, 12, or 14 pins for different difficulty levels. More pins = higher volatility!</p>
          </div>
          <div>
            <h3 className="text-orange-400 font-bold mb-2">2️⃣ DROP THE BALL</h3>
            <p className="text-teal-200 text-sm">Click the spin button to drop the ball. Watch it bounce off the white pegs as it falls down the pyramid. The path is completely random!</p>
          </div>
          <div>
            <h3 className="text-orange-400 font-bold mb-2">3️⃣ WIN & COLLECT</h3>
            <p className="text-teal-200 text-sm">The ball lands in a multiplier slot at the bottom. Your winnings = Bet × Multiplier. Use Autoplay for automatic consecutive drops!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
