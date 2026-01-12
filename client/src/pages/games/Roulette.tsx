import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface BetSelection {
  type: 'number' | 'color' | 'oddeven' | 'range';
  value: string | number;
  amount: number;
}

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const WHEEL_NUMBERS = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];

export default function Roulette() {
  const [credits, setCredits] = useState(1000000);
  const [betAmount, setBetAmount] = useState(10000);
  const [selectedBets, setSelectedBets] = useState<BetSelection[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [lastWin, setLastWin] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);
  const [message, setMessage] = useState('');
  const [resultDisplay, setResultDisplay] = useState<string>('');
  const [glowingNumbers, setGlowingNumbers] = useState<Set<number>>(new Set());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const placeBet = (type: string, value: string | number) => {
    if (credits < betAmount) {
      setMessage('Insufficient credits!');
      return;
    }

    const newBet: BetSelection = {
      type: type as any,
      value,
      amount: betAmount,
    };

    setSelectedBets([...selectedBets, newBet]);
    setCredits(credits - betAmount);

    // Add glow to number if it's a number bet
    if (type === 'number') {
      const newGlowing = new Set(glowingNumbers);
      newGlowing.add(value as number);
      setGlowingNumbers(newGlowing);
    }

    setMessage(`Bet placed: ${betAmount.toLocaleString()} credits`);
    setTimeout(() => setMessage(''), 2000);
  };

  const spin = () => {
    if (selectedBets.length === 0) {
      setMessage('Place a bet first!');
      return;
    }

    setSpinning(true);
    setMessage('Spinning...');
    const randomNumber = Math.floor(Math.random() * 37);
    
    // Calculate ball rotation - each number is 9.73 degrees (360/37)
    const spins = 5 + Math.random() * 3;
    const rotation = (randomNumber * 9.73) + (spins * 360);
    
    setBallRotation(rotation);

    setTimeout(() => {
      setLastNumber(randomNumber);
      calculateWinnings(randomNumber);
      setSpinning(false);
    }, 3000);
  };

  const calculateWinnings = (number: number) => {
    let totalWin = 0;
    let resultText = '';

    selectedBets.forEach((bet) => {
      let won = false;
      let multiplier = 0;

      if (bet.type === 'number' && bet.value === number) {
        won = true;
        multiplier = 36;
      } else if (bet.type === 'color') {
        const isRed = RED_NUMBERS.includes(number);
        if ((bet.value === 'red' && isRed) || (bet.value === 'black' && !isRed)) {
          won = true;
          multiplier = 1;
        }
      } else if (bet.type === 'oddeven') {
        const isOdd = number % 2 === 1;
        if ((bet.value === 'odd' && isOdd) || (bet.value === 'even' && !isOdd)) {
          won = true;
          multiplier = 1;
        }
      } else if (bet.type === 'range') {
        if ((bet.value === 'low' && number >= 1 && number <= 18) ||
            (bet.value === 'high' && number >= 19 && number <= 36)) {
          won = true;
          multiplier = 1;
        }
      }

      if (won) {
        totalWin += bet.amount * (multiplier + 1);
      }
    });

    // Build result text
    const isRed = RED_NUMBERS.includes(number);
    const isOdd = number % 2 === 1;
    const range = number === 0 ? '' : (number >= 1 && number <= 18 ? 'LOW' : 'HIGH');
    const color = isRed ? 'RED' : (number === 0 ? 'GREEN' : 'BLACK');
    const oddEven = number === 0 ? '' : (isOdd ? 'ODD' : 'EVEN');
    
    resultText = `${color}`;
    if (oddEven) resultText += ` ${oddEven}`;
    if (range) resultText += ` ${range}`;

    setResultDisplay(resultText);
    setLastWin(totalWin);
    setCredits(credits + totalWin);
    setSelectedBets([]);
    setGlowingNumbers(new Set());

    if (totalWin > 0) {
      setMessage(`🎉 WIN! +${totalWin.toLocaleString()}`);
    } else {
      setMessage('💣 NO WIN');
    }
  };

  const reset = () => {
    setCredits(1000000);
    setSelectedBets([]);
    setLastNumber(null);
    setLastWin(0);
    setBallRotation(0);
    setMessage('');
    setResultDisplay('');
    setGlowingNumbers(new Set());
  };

  const clearBets = () => {
    const returnedCredits = selectedBets.reduce((sum, bet) => sum + bet.amount, 0);
    setCredits(credits + returnedCredits);
    setSelectedBets([]);
    setGlowingNumbers(new Set());
    setMessage('Bets cleared');
    setTimeout(() => setMessage(''), 2000);
  };

  // Draw glow effect on canvas overlay
  useEffect(() => {
    if (!canvasRef.current || glowingNumbers.size === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw glow for each betting number
    WHEEL_NUMBERS.forEach((num, idx) => {
      if (!glowingNumbers.has(num)) return;

      const angle = (idx * 360) / 37;
      const rad = (angle * Math.PI) / 180;
      const cx = canvas.width / 2 + 155 * Math.cos(rad - Math.PI / 2);
      const cy = canvas.height / 2 + 155 * Math.sin(rad - Math.PI / 2);

      // Cyan glow effect
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fill();

      // Bright cyan outline
      ctx.strokeStyle = 'rgba(0, 255, 255, 1)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.stroke();
    });
  }, [glowingNumbers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-4">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">🎡 ROULETTE</h1>
            <p className="text-yellow-300 text-sm">Spin the Wheel and Win Big</p>
          </div>
          <div className="text-right">
            <div className="text-yellow-300 text-sm">YOUR CREDITS</div>
            <div className="text-3xl font-bold text-yellow-400">{credits.toLocaleString()}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold py-3 px-4 rounded mb-4 text-center text-lg">
            {message}
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Left: Betting Table */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-green-700 to-green-800 border-4 border-yellow-600 rounded-lg p-4 shadow-2xl">
              <div className="text-center mb-4">
                <div className="text-yellow-400 text-lg font-bold tracking-widest">BETS</div>
              </div>

              {/* Number Grid */}
              <div className="grid grid-cols-3 gap-1 mb-4">
                {/* 0 */}
                <button
                  onClick={() => placeBet('number', 0)}
                  disabled={spinning}
                  className="col-span-3 bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 rounded border-2 border-yellow-500 disabled:opacity-50 text-sm"
                >
                  0
                </button>

                {/* Numbers 1-36 */}
                {Array.from({ length: 36 }, (_, i) => i + 1).map((num) => {
                  const isRed = RED_NUMBERS.includes(num);
                  return (
                    <button
                      key={num}
                      onClick={() => placeBet('number', num)}
                      disabled={spinning}
                      className={`${
                        isRed
                          ? 'bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600'
                          : 'bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
                      } text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Outside Bets */}
              <div className="space-y-2">
                <button
                  onClick={() => placeBet('range', 'low')}
                  disabled={spinning}
                  className="w-full bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs"
                >
                  1-18
                </button>
                <button
                  onClick={() => placeBet('oddeven', 'even')}
                  disabled={spinning}
                  className="w-full bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-2 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs"
                >
                  EVEN
                </button>
                <button
                  onClick={() => placeBet('color', 'red')}
                  disabled={spinning}
                  className="w-full bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-2 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs"
                >
                  RED
                </button>
                <button
                  onClick={() => placeBet('color', 'black')}
                  disabled={spinning}
                  className="w-full bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-2 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs"
                >
                  BLACK
                </button>
                <button
                  onClick={() => placeBet('oddeven', 'odd')}
                  disabled={spinning}
                  className="w-full bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-2 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs"
                >
                  ODD
                </button>
                <button
                  onClick={() => placeBet('range', 'high')}
                  disabled={spinning}
                  className="w-full bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs"
                >
                  19-36
                </button>
              </div>
            </div>
          </div>

          {/* Center: Wheel */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            {/* Stable Roulette Wheel */}
            <div className="relative w-80 h-80 mb-6">
              {/* Outer Golden Frame */}
              <div className="absolute inset-0 -m-6 rounded-full border-8 border-yellow-500 shadow-2xl" style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)',
                boxShadow: '0 0 40px rgba(255,215,0,0.6), inset 0 0 20px rgba(0,0,0,0.4)',
              }}></div>
              
              {/* Wheel Container - STABLE */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-8 border-yellow-600" style={{
                boxShadow: '0 0 60px rgba(255,215,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)',
              }}>
                <img
                  src="/images/roulette-wheel.png"
                  alt="Roulette Wheel"
                  className="w-full h-full object-cover"
                />

                {/* Glow Overlay Canvas */}
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={320}
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: 'none' }}
                />

                {/* Spinning Ball Animation */}
                <div
                  className="absolute w-6 h-6 bg-white rounded-full shadow-lg"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${ballRotation}deg) translateX(155px)`,
                    transition: spinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white border-2 border-yellow-400 shadow-lg"></div>
                </div>

                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-10 border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg"></div>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <Button
              onClick={spin}
              disabled={spinning || selectedBets.length === 0}
              className="bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-12 text-xl border-2 border-yellow-500 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all mb-4"
            >
              {spinning ? 'SPINNING...' : 'SPIN'}
            </Button>
          </div>

          {/* Right: Result & Stats */}
          <div className="lg:col-span-1 space-y-4">
            {/* Result Box */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-4 border-yellow-600 rounded-lg p-6 text-center shadow-2xl">
              <div className="text-yellow-300 text-xs uppercase tracking-widest font-bold mb-4">Result</div>
              {lastNumber !== null ? (
                <div>
                  <div className="text-6xl font-bold text-yellow-400 mb-4">{lastNumber}</div>
                  <div className="text-xl font-bold text-yellow-300 tracking-wider mb-4">{resultDisplay}</div>
                  <div className="text-sm text-yellow-300">YOU WON</div>
                  <div className="text-3xl font-bold text-yellow-400">${(lastWin / 1000).toFixed(1)}K</div>
                </div>
              ) : (
                <div className="text-5xl text-gray-500">-</div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800 border-2 border-yellow-600 rounded p-3 text-center shadow-lg">
                <div className="text-yellow-300 text-xs uppercase font-bold">Bets</div>
                <div className="text-yellow-400 font-bold text-lg">{selectedBets.length}</div>
              </div>
              <div className="bg-gray-800 border-2 border-yellow-600 rounded p-3 text-center shadow-lg">
                <div className="text-yellow-300 text-xs uppercase font-bold">Bet</div>
                <div className="text-yellow-400 font-bold text-lg">{(betAmount / 1000).toFixed(0)}K</div>
              </div>
            </div>

            {/* Total Bet */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-600 rounded p-4 text-center shadow-lg">
              <div className="text-yellow-300 text-xs uppercase font-bold mb-2">Total Bet</div>
              <div className="text-2xl font-bold text-yellow-400">
                {(selectedBets.reduce((sum, b) => sum + b.amount, 0) / 1000).toFixed(0)}K
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-2">
              <Button
                onClick={clearBets}
                disabled={spinning}
                className="w-full bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-2 border-2 border-yellow-500 disabled:opacity-50"
              >
                CLEAR
              </Button>
              <Button
                onClick={reset}
                className="w-full bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-2 border-2 border-yellow-500"
              >
                RESET
              </Button>
            </div>
          </div>
        </div>

        {/* Bet Amount Controls */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[5000, 10000, 25000, 50000].map((amount) => (
            <Button
              key={amount}
              onClick={() => setBetAmount(amount)}
              className={`py-3 font-bold border-2 rounded transition-all ${
                betAmount === amount
                  ? 'bg-gradient-to-b from-yellow-500 to-yellow-600 border-yellow-300 text-gray-900 shadow-lg'
                  : 'bg-gradient-to-b from-gray-700 to-gray-800 border-yellow-600 text-yellow-400 hover:from-gray-600 hover:to-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              {(amount / 1000).toFixed(0)}K
            </Button>
          ))}
        </div>

        {/* How to Play */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">📖 HOW TO PLAY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-yellow-300">
              <h3 className="font-bold text-yellow-400 mb-2">OBJECTIVE</h3>
              <p className="text-sm">Place bets on numbers or outside bets. The ball spins around the wheel. Match the winning number to win!</p>
            </div>
            <div className="text-yellow-300">
              <h3 className="font-bold text-yellow-400 mb-2">BET TYPES</h3>
              <ul className="text-sm space-y-1">
                <li>• Single Number: 36:1 payout</li>
                <li>• Color/Odd/Even: 1:1 payout</li>
                <li>• Ranges (1-18/19-36): 1:1 payout</li>
              </ul>
            </div>
            <div className="text-yellow-300">
              <h3 className="font-bold text-yellow-400 mb-2">STRATEGY</h3>
              <p className="text-sm">Mix high-risk single numbers with safer outside bets for balanced gameplay.</p>
            </div>
            <div className="text-yellow-300">
              <h3 className="font-bold text-yellow-400 mb-2">RULES</h3>
              <p className="text-sm">Place multiple bets before spinning. Ball determines winner. Payouts automatic.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
