import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface GameHistory {
  result: string;
  multiplier: number;
  winnings: number;
  timestamp: Date;
}

interface Peg {
  x: number;
  y: number;
  radius: number;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const BET_AMOUNTS = [5000, 10000, 25000, 50000];
const BOARD_CONFIGS = [
  { pins: 8, label: '8 Pins', multipliers: [0.5, 1, 2, 5, 10, 5, 2, 1, 0.5] },
  { pins: 12, label: '12 Pins', multipliers: [0.5, 1, 1.5, 2, 3, 5, 10, 5, 3, 2, 1.5, 1, 0.5] },
  { pins: 14, label: '14 Pins', multipliers: [0.5, 1, 1.6, 3.2, 5.6, 12, 55, 0.2, 0.7, 1, 1.6, 3.2, 5.6, 12, 55] },
];

export default function Plinko() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [credits, setCredits] = useState(1000000);
  const [betAmount, setBetAmount] = useState(10000);
  const [boardConfig, setBoardConfig] = useState(BOARD_CONFIGS[2]);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState('');
  const [lastWinnings, setLastWinnings] = useState(0);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoplay, setAutoplay] = useState(0);
  const [autoplayCount, setAutoplayCount] = useState(0);

  const ballRef = useRef<Ball | null>(null);
  const pegsRef = useRef<Peg[]>([]);
  const animationRef = useRef<number | null>(null);

  // Initialize pegs
  useEffect(() => {
    const pegs: Peg[] = [];
    const boardWidth = 500;
    const boardHeight = 350;
    const pegRadius = 8;
    const spacing = boardWidth / (boardConfig.pins + 2);

    for (let row = 0; row < boardConfig.pins; row++) {
      const pegsInRow = row + 1;
      const rowWidth = pegsInRow * spacing;
      const rowX = (boardWidth - rowWidth) / 2 + spacing / 2;

      for (let col = 0; col < pegsInRow; col++) {
        pegs.push({
          x: rowX + col * spacing,
          y: 50 + row * (spacing * 0.9),
          radius: pegRadius,
        });
      }
    }

    pegsRef.current = pegs;
  }, [boardConfig]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1e7a8a');
      gradient.addColorStop(0.5, '#2a9fa8');
      gradient.addColorStop(1, '#1e7a8a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw decorative circles in background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.arc(canvas.width * 0.15, canvas.height * 0.3, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width * 0.85, canvas.height * 0.4, 100, 0, Math.PI * 2);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = 'rgba(0, 200, 200, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 100);
      ctx.setLineDash([]);

      // Draw pegs - white/light colored
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 200, 200, 0.5)';
      ctx.shadowBlur = 10;
      pegsRef.current.forEach((peg) => {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowColor = 'transparent';

      // Draw ball
      if (ballRef.current) {
        const ball = ballRef.current;
        const gradient = ctx.createRadialGradient(
          ball.x - 3,
          ball.y - 3,
          0,
          ball.x,
          ball.y,
          ball.radius
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.7, '#00d4ff');
        gradient.addColorStop(1, '#0099cc');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Ball shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y + ball.radius + 2, ball.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw multipliers at bottom with color coding
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const multiplierY = canvas.height - 45;
      const multiplierSpacing = (canvas.width - 40) / boardConfig.multipliers.length;

      boardConfig.multipliers.forEach((mult, idx) => {
        const x = 20 + multiplierSpacing * (idx + 0.5);
        
        // Determine color based on multiplier value
        let bgColor = '#2d5a2d'; // Green for low
        if (mult >= 5 && mult < 20) {
          bgColor = '#8b7500'; // Yellow for medium
        } else if (mult >= 20) {
          bgColor = '#8b0000'; // Red for high
        }
        
        // Draw multiplier box
        ctx.fillStyle = bgColor;
        ctx.fillRect(x - multiplierSpacing * 0.4, multiplierY - 20, multiplierSpacing * 0.8, 40);
        
        // Draw border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - multiplierSpacing * 0.4, multiplierY - 20, multiplierSpacing * 0.8, 40);
        
        // Draw text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${mult}x`, x, multiplierY);
      });
    };

    draw();
  }, [boardConfig]);

  // Physics simulation
  const simulateBall = (): boolean => {
    if (!ballRef.current) return false;

    const ball = ballRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gravity = 0.4;
    const friction = 0.98;
    const bounce = 0.6;

    // Apply gravity
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Apply friction
    ball.vx *= friction;

    // Collision with pegs
    pegsRef.current.forEach((peg) => {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = ball.radius + peg.radius;

      if (distance < minDistance) {
        const angle = Math.atan2(dy, dx);
        ball.x = peg.x + Math.cos(angle) * minDistance;
        ball.y = peg.y + Math.sin(angle) * minDistance;

        ball.vx = Math.cos(angle) * 6 * bounce;
        ball.vy = Math.sin(angle) * 6 * bounce;
      }
    });

    // Collision with walls
    if (ball.x - ball.radius < 20) {
      ball.x = 20 + ball.radius;
      ball.vx *= -bounce;
    }
    if (ball.x + ball.radius > canvas.width - 20) {
      ball.x = canvas.width - 20 - ball.radius;
      ball.vx *= -bounce;
    }

    // Check if ball reached bottom
    if (ball.y > canvas.height - 80) {
      return true; // Ball finished
    }

    return false;
  };

  const dropBall = async () => {
    if (credits < betAmount) {
      setMessage('Insufficient credits!');
      return;
    }

    setPlaying(true);
    setMessage('🎮 Dropping ball...');
    setCredits(credits - betAmount);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize ball
    ballRef.current = {
      x: canvas.width / 2,
      y: 30,
      vx: (Math.random() - 0.5) * 3,
      vy: 0,
      radius: 7,
    };

    // Animate ball
    let finished = false;
    const animate = () => {
      finished = simulateBall();

      if (!finished) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Calculate result
        const canvas = canvasRef.current;
        if (canvas && ballRef.current) {
          const multiplierIndex = Math.floor(
            (ballRef.current.x / canvas.width) * boardConfig.multipliers.length
          );
          const safeIndex = Math.max(
            0,
            Math.min(multiplierIndex, boardConfig.multipliers.length - 1)
          );
          const multiplier = boardConfig.multipliers[safeIndex];
          const winnings = Math.floor(betAmount * multiplier);

          setCredits((prev) => prev + winnings);
          setLastWinnings(winnings);
          setMessage(
            multiplier > 1
              ? `🎉 WIN! ${multiplier}x = ${winnings.toLocaleString()} credits!`
              : `❌ ${multiplier}x = ${winnings.toLocaleString()} credits`
          );

          addToHistory(multiplier, winnings);

          if (autoplay > 0 && autoplayCount + 1 < autoplay) {
            setAutoplayCount(autoplayCount + 1);
            setTimeout(dropBall, 1000);
          } else {
            setPlaying(false);
            if (autoplay > 0) {
              setAutoplay(0);
              setAutoplayCount(0);
            }
          }
        }
      }
    };

    animate();
  };

  const addToHistory = (multiplier: number, winnings: number) => {
    setGameHistory([
      {
        result: `${multiplier}x`,
        multiplier,
        winnings,
        timestamp: new Date(),
      },
      ...gameHistory.slice(0, 9),
    ]);
  };

  const startAutoplay = () => {
    if (autoplay > 0) {
      setAutoplay(0);
      setAutoplayCount(0);
    } else {
      setAutoplay(10);
      setAutoplayCount(0);
      dropBall();
    }
  };

  const reset = () => {
    setCredits(1000000);
    setMessage('');
    setLastWinnings(0);
    setGameHistory([]);
    setAutoplay(0);
    setAutoplayCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-teal-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400">🎯 PLINKO</h1>
            <p className="text-cyan-300 text-sm mt-1">Pins: {boardConfig.pins}</p>
          </div>
          <div className="text-right bg-gray-800 border-2 border-cyan-600 rounded-lg p-4">
            <div className="text-cyan-300 text-sm font-semibold">YOUR CREDITS</div>
            <div className="text-3xl font-bold text-cyan-400">{credits.toLocaleString()}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`font-bold py-3 px-4 rounded mb-4 text-center shadow-lg text-white ${
            message.includes('WIN')
              ? 'bg-gradient-to-r from-green-600 to-green-500'
              : 'bg-gradient-to-r from-red-600 to-red-500'
          }`}>
            {message}
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-cyan-600">
              {/* Canvas */}
              <canvas
                ref={canvasRef}
                width={550}
                height={450}
                className="w-full border-2 border-cyan-500 rounded-lg mb-6 bg-gradient-to-b from-teal-700 to-teal-900"
              />

              {/* Game Settings */}
              <div className="mb-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">⚙️ GAME SETTINGS</h3>

                {/* Board Configuration */}
                <div className="mb-4">
                  <label className="text-cyan-300 font-semibold text-sm mb-2 block">Board Layout</label>
                  <div className="grid grid-cols-3 gap-2">
                    {BOARD_CONFIGS.map((config) => (
                      <button
                        key={config.pins}
                        onClick={() => setBoardConfig(config)}
                        disabled={playing}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          boardConfig.pins === config.pins
                            ? 'bg-cyan-600 text-white ring-2 ring-cyan-400'
                            : 'bg-gray-700 text-cyan-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bet Amount Selection */}
                <div className="mb-6">
                  <label className="text-cyan-300 font-semibold text-sm mb-2 block">Bet Amount</label>
                  <div className="grid grid-cols-4 gap-2">
                    {BET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        disabled={playing}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          betAmount === amount
                            ? 'bg-green-600 text-white ring-2 ring-green-400'
                            : 'bg-gray-700 text-cyan-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {(amount / 1000).toFixed(0)}K
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Game Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-cyan-300 text-sm font-semibold">Bet Amount</div>
                  <div className="text-2xl font-bold text-cyan-400">{(betAmount / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-cyan-300 text-sm font-semibold">Board</div>
                  <div className="text-2xl font-bold text-cyan-400">{boardConfig.label}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-cyan-300 text-sm font-semibold">Last Win</div>
                  <div className="text-2xl font-bold text-yellow-400">{lastWinnings.toLocaleString()}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={dropBall}
                  disabled={playing || credits < betAmount}
                  className="bg-gradient-to-b from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold py-4 text-lg border-2 border-cyan-400 shadow-lg rounded-lg disabled:opacity-50"
                >
                  🎯 DROP
                </Button>
                <Button
                  onClick={startAutoplay}
                  disabled={playing}
                  className={`font-bold py-4 text-lg border-2 shadow-lg rounded-lg ${
                    autoplay > 0
                      ? 'bg-gradient-to-b from-yellow-600 to-yellow-700 border-yellow-500 text-white'
                      : 'bg-gradient-to-b from-gray-600 to-gray-700 border-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
                  }`}
                >
                  ⚡ AUTOPLAY {autoplay > 0 ? `(${autoplayCount}/${autoplay})` : ''}
                </Button>
                <Button
                  onClick={reset}
                  className="bg-gradient-to-b from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 text-lg border-2 border-gray-500 shadow-lg rounded-lg"
                >
                  🔄 RESET
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Game History */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-5 shadow-xl h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cyan-400 font-bold text-lg">📊 RECENT DROPS</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-cyan-300 hover:text-cyan-400 text-sm font-semibold"
                >
                  {showHistory ? '▼' : '▶'}
                </button>
              </div>

              {showHistory && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {gameHistory.length === 0 ? (
                    <div className="text-gray-400 text-center py-8 text-sm">No drops yet</div>
                  ) : (
                    gameHistory.map((game, idx) => (
                      <div key={idx} className={`rounded p-3 text-sm border ${
                        game.multiplier > 1
                          ? 'bg-green-900/30 border-green-600'
                          : 'bg-red-900/30 border-red-600'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-cyan-400">{game.result}</span>
                          <span className="text-gray-300 text-xs">{game.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-300">Winnings</span>
                          <span className={`font-bold ${
                            game.multiplier > 1 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {game.winnings.toLocaleString()}
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
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">📖 HOW TO PLAY PLINKO</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">1️⃣ PLACE YOUR BET</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Select your bet amount (5K, 10K, 25K, or 50K credits) and choose your board layout (8, 12, or 14 pins). More pins = more possible outcomes!
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">2️⃣ DROP THE BALL</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Click DROP to release the ball from the top. Watch it bounce off the white pegs as it falls down the pyramid. The path is completely random!
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">3️⃣ WIN & COLLECT</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                The ball lands in one of the multiplier slots at the bottom. Your winnings are calculated instantly. Use AUTOPLAY for 10 consecutive drops!
              </p>
            </div>
          </div>
        </div>

        {/* Game Rules Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">🎲 GAME RULES & MECHANICS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-cyan-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Basic Rules</h3>
              <ul className="space-y-2">
                <li>✓ Each drop costs your selected bet amount</li>
                <li>✓ Ball bounces randomly off white pegs as it falls</li>
                <li>✓ Landing position determines your multiplier</li>
                <li>✓ Color-coded slots: Green (low), Yellow (medium), Red (high)</li>
                <li>✓ Winnings = Bet Amount × Multiplier</li>
                <li>✓ Use AUTOPLAY to drop 10 balls automatically</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Board Configurations</h3>
              <ul className="space-y-2">
                <li><span className="text-cyan-400 font-semibold">8 Pins:</span> Simple layout, lower volatility</li>
                <li><span className="text-cyan-400 font-semibold">12 Pins:</span> Balanced gameplay, medium volatility</li>
                <li><span className="text-cyan-400 font-semibold">14 Pins:</span> Professional layout, higher volatility</li>
                <li><span className="text-cyan-400 font-semibold">RTP:</span> Typically 96% - favorable odds</li>
                <li><span className="text-cyan-400 font-semibold">Max Win:</span> 55x your bet (on 14-pin board)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Plinko Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">ℹ️ ABOUT PLINKO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-cyan-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">History & Origins</h3>
              <p className="mb-4">
                Plinko is inspired by the classic Pachinko machines from Japan and the game show "The Price is Right." Modern online Plinko combines the simplicity of ball-dropping with the excitement of multiplier-based payouts. It's a game of pure chance with a zen-like quality as you watch the ball bounce down the pyramid.
              </p>
              <h3 className="text-cyan-300 font-bold mb-3">Why Players Love Plinko</h3>
              <ul className="space-y-2">
                <li>✓ Simple and intuitive gameplay</li>
                <li>✓ Relaxing, zen-like experience</li>
                <li>✓ Customizable difficulty levels</li>
                <li>✓ Fast results and instant payouts</li>
                <li>✓ Provably fair randomness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Game Features</h3>
              <ul className="space-y-2 mb-4">
                <li><span className="text-cyan-400 font-semibold">Physics-Based:</span> Realistic ball bouncing and gravity</li>
                <li><span className="text-cyan-400 font-semibold">Multiplier System:</span> Color-coded payout slots</li>
                <li><span className="text-cyan-400 font-semibold">Autoplay:</span> Set 10 automatic drops</li>
                <li><span className="text-cyan-400 font-semibold">Game History:</span> Track all recent drops</li>
                <li><span className="text-cyan-400 font-semibold">Free-to-Play:</span> Unlimited credits, no real money</li>
              </ul>

              <h3 className="text-cyan-300 font-bold mb-3">Strategy Tips</h3>
              <ul className="space-y-2">
                <li>✓ Start with 8-pin board to learn the game</li>
                <li>✓ Increase pins for higher volatility and bigger wins</li>
                <li>✓ Use AUTOPLAY to maintain momentum</li>
                <li>✓ Track your history to identify patterns</li>
                <li>✓ Set a budget and play responsibly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
