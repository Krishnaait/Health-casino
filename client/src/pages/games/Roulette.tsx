import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface Bet {
  type: 'number' | 'color' | 'oddeven' | 'range';
  value: string | number;
  amount: number;
}

interface SpinHistory {
  id: number;
  number: number;
  color: string;
  oddEven: string;
  range: string;
  timestamp: Date;
}

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

// European roulette wheel number sequence (clockwise)
const WHEEL_NUMBERS = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

// Proper roulette table layout - 3 rows x 12 columns
const TABLE_LAYOUT = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
];

// Chip colors based on value
const CHIP_COLORS: Record<number, { bg: string; border: string }> = {
  5000: { bg: 'linear-gradient(145deg, #22c55e 0%, #16a34a 50%, #15803d 100%)', border: '#ffd700' },
  10000: { bg: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)', border: '#ffd700' },
  25000: { bg: 'linear-gradient(145deg, #a855f7 0%, #9333ea 50%, #7e22ce 100%)', border: '#ffd700' },
  50000: { bg: 'linear-gradient(145deg, #f59e0b 0%, #d97706 50%, #b45309 100%)', border: '#ffd700' },
};

export default function Roulette() {
  const [credits, setCredits] = useState(1000000);
  const [betAmount, setBetAmount] = useState(10000);
  const [bets, setBets] = useState<Bet[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [lastWin, setLastWin] = useState(0);
  const [ballAngle, setBallAngle] = useState(0);
  const [ballRadius, setBallRadius] = useState(125);
  const [message, setMessage] = useState('');
  const [resultDisplay, setResultDisplay] = useState<string>('');
  const [spinHistory, setSpinHistory] = useState<SpinHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const animationRef = useRef<number | null>(null);

  const getBetsOnNumber = (num: number) => {
    return bets.filter(b => b.type === 'number' && b.value === num);
  };

  const placeBet = (type: string, value: string | number) => {
    if (credits < betAmount) {
      setMessage('Insufficient credits!');
      return;
    }

    setBets([...bets, { type: type as any, value, amount: betAmount }]);
    setCredits(credits - betAmount);
    setMessage(`Bet placed: ${betAmount.toLocaleString()} credits`);
    setTimeout(() => setMessage(''), 1500);
  };

  const spin = () => {
    if (bets.length === 0) {
      setMessage('Place a bet first!');
      return;
    }

    setSpinning(true);
    setMessage('Spinning...');
    
    const randomNumber = Math.floor(Math.random() * 37);
    const numberIndex = WHEEL_NUMBERS.indexOf(randomNumber);
    const anglePerNumber = 360 / 37;
    
    // Ball spins 8-10 full rotations before landing
    const totalSpins = 8 + Math.random() * 2;
    const finalAngle = (totalSpins * 360) + (numberIndex * anglePerNumber) + (anglePerNumber / 2);
    
    const startTime = Date.now();
    const duration = 5000; // 5 seconds for realistic spin
    const startAngle = ballAngle;
    const startRadius = 145;
    const endRadius = 110;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: starts fast, slows down significantly
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      setBallAngle(startAngle + (finalAngle - startAngle) * easeOut);
      setBallRadius(startRadius + (endRadius - startRadius) * easeOut);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setLastNumber(randomNumber);
        calculateWinnings(randomNumber);
        addToHistory(randomNumber);
        setSpinning(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const calculateWinnings = (number: number) => {
    let totalWin = 0;

    bets.forEach((bet) => {
      let won = false;
      let multiplier = 0;

      if (bet.type === 'number' && bet.value === number) {
        won = true;
        multiplier = 36;
      } else if (bet.type === 'color') {
        const isRed = RED_NUMBERS.includes(number);
        if ((bet.value === 'red' && isRed) || (bet.value === 'black' && !isRed && number !== 0)) {
          won = true;
          multiplier = 1;
        }
      } else if (bet.type === 'oddeven') {
        const isOdd = number % 2 === 1;
        if (number !== 0 && ((bet.value === 'odd' && isOdd) || (bet.value === 'even' && !isOdd))) {
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

      if (won) totalWin += bet.amount * (multiplier + 1);
    });

    const isRed = RED_NUMBERS.includes(number);
    const isOdd = number % 2 === 1;
    const range = number === 0 ? '' : (number >= 1 && number <= 18 ? 'LOW' : 'HIGH');
    const color = number === 0 ? 'GREEN' : (isRed ? 'RED' : 'BLACK');
    const oddEven = number === 0 ? '' : (isOdd ? 'ODD' : 'EVEN');
    
    setResultDisplay(`${color}${oddEven ? ` ${oddEven}` : ''}${range ? ` ${range}` : ''}`);
    setLastWin(totalWin);
    setCredits(credits + totalWin);
    setBets([]);
    setMessage(totalWin > 0 ? `🎉 WIN! +${totalWin.toLocaleString()}` : '💣 NO WIN');
  };

  const addToHistory = (number: number) => {
    const isRed = RED_NUMBERS.includes(number);
    const isOdd = number % 2 === 1;
    const range = number === 0 ? '' : (number >= 1 && number <= 18 ? 'LOW' : 'HIGH');
    const color = number === 0 ? 'GREEN' : (isRed ? 'RED' : 'BLACK');
    const oddEven = number === 0 ? '' : (isOdd ? 'ODD' : 'EVEN');

    const newEntry: SpinHistory = {
      id: Date.now(),
      number,
      color,
      oddEven,
      range,
      timestamp: new Date(),
    };

    setSpinHistory([newEntry, ...spinHistory.slice(0, 9)]);
  };

  const reset = () => {
    setCredits(1000000);
    setBets([]);
    setLastNumber(null);
    setLastWin(0);
    setBallAngle(0);
    setBallRadius(125);
    setMessage('');
    setResultDisplay('');
    setSpinHistory([]);
  };

  const clearBets = () => {
    const returnedCredits = bets.reduce((sum, bet) => sum + bet.amount, 0);
    setCredits(credits + returnedCredits);
    setBets([]);
    setMessage('Bets cleared');
    setTimeout(() => setMessage(''), 1500);
  };

  // Render stacked chips on a number
  const ChipStack = ({ betsOnNumber }: { betsOnNumber: Bet[] }) => {
    if (betsOnNumber.length === 0) return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
        {betsOnNumber.slice(0, 5).map((bet, idx) => {
          const chipStyle = CHIP_COLORS[bet.amount] || CHIP_COLORS[10000];
          return (
            <div
              key={idx}
              className="absolute w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: chipStyle.bg,
                border: `3px solid ${chipStyle.border}`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
                transform: `translateY(${idx * -3}px)`,
                zIndex: 20 + idx,
              }}
            >
              <span className="text-white text-xs font-bold drop-shadow-md">
                {bet.amount >= 1000 ? `${(bet.amount / 1000).toFixed(0)}K` : bet.amount}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">🎡 ROULETTE</h1>
            <p className="text-yellow-300 text-sm mt-1">European Roulette - Spin the Wheel and Win Big</p>
          </div>
          <div className="text-right bg-gray-800 border-2 border-yellow-600 rounded-lg p-4">
            <div className="text-yellow-300 text-sm font-semibold">YOUR CREDITS</div>
            <div className="text-3xl font-bold text-yellow-400">{credits.toLocaleString()}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold py-3 px-4 rounded mb-4 text-center shadow-lg">
            {message}
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Wheel */}
          <div className="lg:col-span-1 flex flex-col items-center">
            {/* Wheel Container */}
            <div className="relative w-96 h-96 mb-6 shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src="/images/roulette-wheel.png"
                  alt="Roulette Wheel"
                  className="w-full h-full object-cover"
                />
                {/* Ball - Stylish gold ball spinning around wheel */}
                <div
                  className="absolute w-5 h-5 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #ffd700 0%, #ffed4e 20%, #ffc700 50%, #cc9900 80%, #996600 100%)',
                    transform: `translate(-50%, -50%) rotate(${ballAngle}deg) translateY(-${ballRadius}px)`,
                    boxShadow: '0 4px 12px rgba(255,215,0,0.8), inset -2px -2px 4px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.6)',
                  }}
                />
              </div>
            </div>

            {/* Spin Button */}
            <Button
              onClick={spin}
              disabled={spinning || bets.length === 0}
              className="bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-12 text-lg border-2 border-green-400 disabled:opacity-50 shadow-lg rounded-lg w-full mb-4"
            >
              {spinning ? '⏳ SPINNING...' : '🎰 SPIN'}
            </Button>

            {/* Result Box */}
            <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 text-center shadow-lg">
              <div className="text-yellow-300 text-xs uppercase tracking-widest font-bold mb-3">Result</div>
              {lastNumber !== null ? (
                <div>
                  <div className="text-5xl font-bold text-yellow-400 mb-2">{lastNumber}</div>
                  <div className="text-sm font-bold text-yellow-300 mb-3">{resultDisplay}</div>
                  <div className="text-xs text-yellow-300 mb-1">YOU WON</div>
                  <div className="text-2xl font-bold text-yellow-400">${(lastWin / 1000).toFixed(1)}K</div>
                </div>
              ) : (
                <div className="text-4xl text-gray-500">-</div>
              )}
            </div>
          </div>

          {/* Center: Betting Table */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-green-800 to-green-900 rounded-lg p-5 shadow-xl border border-green-700">
              <h3 className="text-yellow-400 font-bold text-center mb-4 text-lg">BETTING TABLE</h3>
              
              {/* Betting Table */}
              <div className="flex gap-1 mb-3">
                {/* Zero */}
                <button
                  onClick={() => placeBet('number', 0)}
                  disabled={spinning}
                  className="relative w-12 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded border-2 border-green-400 disabled:opacity-50 flex items-center justify-center overflow-visible transition-all"
                  style={{ height: '132px' }}
                >
                  <span className="relative z-10">0</span>
                  <ChipStack betsOnNumber={getBetsOnNumber(0)} />
                </button>

                {/* Numbers Grid */}
                <div className="flex-1">
                  <div className="grid grid-rows-3 gap-1">
                    {TABLE_LAYOUT.map((row, rowIdx) => (
                      <div key={rowIdx} className="grid grid-cols-12 gap-1">
                        {row.map((num) => {
                          const isRed = RED_NUMBERS.includes(num);
                          const betsOnNum = getBetsOnNumber(num);
                          return (
                            <button
                              key={num}
                              onClick={() => placeBet('number', num)}
                              disabled={spinning}
                              className={`relative h-10 ${
                                isRed ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-900 hover:bg-gray-800'
                              } text-white font-bold text-sm rounded border border-green-600 disabled:opacity-50 flex items-center justify-center overflow-visible transition-all`}
                            >
                              <span className="relative z-10">{num}</span>
                              <ChipStack betsOnNumber={betsOnNum} />
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outside Bets */}
              <div className="grid grid-cols-6 gap-1">
                <button onClick={() => placeBet('range', 'low')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50 transition-all">1-18</button>
                <button onClick={() => placeBet('oddeven', 'even')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50 transition-all">EVEN</button>
                <button onClick={() => placeBet('color', 'red')} disabled={spinning} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 text-xs rounded border border-red-400 disabled:opacity-50 transition-all">RED</button>
                <button onClick={() => placeBet('color', 'black')} disabled={spinning} className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 text-xs rounded border border-gray-600 disabled:opacity-50 transition-all">BLACK</button>
                <button onClick={() => placeBet('oddeven', 'odd')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50 transition-all">ODD</button>
                <button onClick={() => placeBet('range', 'high')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50 transition-all">19-36</button>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 bg-gray-800 border border-yellow-600 rounded-lg p-4 shadow-lg">
              <h4 className="text-yellow-400 font-bold text-sm mb-3">CHIP SELECTOR</h4>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[5000, 10000, 25000, 50000].map((amount) => {
                  const chipStyle = CHIP_COLORS[amount];
                  return (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      className={`relative h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        betAmount === amount
                          ? 'ring-4 ring-yellow-300 ring-offset-2 ring-offset-gray-800 scale-110'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        background: chipStyle.bg,
                        border: `3px solid ${chipStyle.border}`,
                        boxShadow: betAmount === amount 
                          ? '0 6px 20px rgba(255,215,0,0.6)' 
                          : '0 3px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      <span className="text-white text-xs drop-shadow-lg">{(amount / 1000).toFixed(0)}K</span>
                    </button>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-300">Bets Placed:</span>
                  <span className="text-yellow-400 font-bold">{bets.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-300">Total Bet:</span>
                  <span className="text-yellow-400 font-bold">{(bets.reduce((sum, b) => sum + b.amount, 0) / 1000).toFixed(0)}K</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={clearBets} disabled={spinning} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 text-sm disabled:opacity-50">CLEAR</Button>
                <Button onClick={reset} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 text-sm">RESET</Button>
              </div>
            </div>
          </div>

          {/* Right: Betting History */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-5 shadow-xl h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-yellow-400 font-bold text-lg">📊 SPIN HISTORY</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-yellow-300 hover:text-yellow-400 text-sm font-semibold"
                >
                  {showHistory ? '▼' : '▶'}
                </button>
              </div>

              {showHistory && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {spinHistory.length === 0 ? (
                    <div className="text-gray-400 text-center py-8 text-sm">No spins yet</div>
                  ) : (
                    spinHistory.map((spin, idx) => (
                      <div key={spin.id} className="bg-gray-700 border border-gray-600 rounded p-3 text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-yellow-400 font-bold text-lg">#{spin.number}</span>
                          <span className="text-gray-300 text-xs">{spin.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            spin.color === 'RED' ? 'bg-red-600 text-white' :
                            spin.color === 'BLACK' ? 'bg-gray-900 text-white' :
                            'bg-green-600 text-white'
                          }`}>
                            {spin.color}
                          </span>
                          {spin.oddEven && (
                            <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-600 text-white">
                              {spin.oddEven}
                            </span>
                          )}
                          {spin.range && (
                            <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-600 text-white">
                              {spin.range}
                            </span>
                          )}
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
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">📖 HOW TO PLAY ROULETTE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-yellow-400 mb-3 text-lg">1️⃣ SELECT & BET</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                Choose a chip value (5K, 10K, 25K, or 50K credits) from the selector. Click on any number (0-36) or outside bets (Red/Black, Odd/Even, 1-18/19-36) to place your wagers on the table.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-yellow-400 mb-3 text-lg">2️⃣ SPIN THE WHEEL</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                After placing your bets, click the SPIN button. The ball will spin around the wheel for 5 seconds, making 8-10 complete rotations before landing on a random number.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-yellow-400 mb-3 text-lg">3️⃣ WIN & COLLECT</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                If your bet matches the winning number, you win! Payouts: Single Number 36:1, Color/Odd/Even 1:1, Range (1-18/19-36) 1:1. Your winnings are automatically added to your credits.
              </p>
            </div>
          </div>
        </div>

        {/* Bet Types Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎲 BET TYPES & PAYOUTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">Inside Bets</h3>
              <ul className="space-y-2 text-sm text-yellow-200">
                <li><span className="font-semibold text-yellow-400">Straight:</span> Bet on a single number (0-36) → <span className="text-green-400">36:1 Payout</span></li>
                <li><span className="font-semibold text-yellow-400">Split:</span> Bet on two adjacent numbers → <span className="text-green-400">17:1 Payout</span></li>
                <li><span className="font-semibold text-yellow-400">Street:</span> Bet on three numbers in a row → <span className="text-green-400">11:1 Payout</span></li>
                <li><span className="font-semibold text-yellow-400">Corner:</span> Bet on four numbers forming a square → <span className="text-green-400">8:1 Payout</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">Outside Bets</h3>
              <ul className="space-y-2 text-sm text-yellow-200">
                <li><span className="font-semibold text-yellow-400">Red/Black:</span> Bet on color of the number → <span className="text-green-400">1:1 Payout</span></li>
                <li><span className="font-semibold text-yellow-400">Odd/Even:</span> Bet on odd or even number → <span className="text-green-400">1:1 Payout</span></li>
                <li><span className="font-semibold text-yellow-400">1-18/19-36:</span> Bet on low or high range → <span className="text-green-400">1:1 Payout</span></li>
                <li><span className="font-semibold text-yellow-400">Dozen:</span> Bet on 1-12, 13-24, or 25-36 → <span className="text-green-400">2:1 Payout</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Roulette Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">ℹ️ ABOUT ROULETTE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">History</h3>
              <p className="mb-4">
                Roulette originated in 17th-century France and has become one of the most iconic casino games worldwide. The name "roulette" comes from the French word meaning "little wheel." The game combines chance and strategy, making it a favorite among both casual and experienced gamblers.
              </p>
              <h3 className="text-yellow-300 font-bold mb-3">The Wheel</h3>
              <p>
                European roulette features 37 numbered pockets (0-36) on a spinning wheel. Numbers alternate between red and black, with 0 being green. The ball is spun in the opposite direction of the wheel, creating unpredictable results that ensure fair gameplay.
              </p>
            </div>
            <div>
              <h3 className="text-yellow-300 font-bold mb-3">Game Rules</h3>
              <ul className="space-y-2 mb-4">
                <li>✓ Players place bets before the wheel spins</li>
                <li>✓ The ball lands on a random number between 0-36</li>
                <li>✓ Winning bets are paid according to the odds</li>
                <li>✓ Losing bets are collected by the house</li>
                <li>✓ Multiple bets can be placed on a single spin</li>
              </ul>
              <h3 className="text-yellow-300 font-bold mb-3">Strategy Tips</h3>
              <p>
                While roulette is a game of chance, smart betting strategies can improve your experience. Manage your bankroll wisely, understand the odds, and remember that outside bets (Red/Black, Odd/Even) offer better winning chances but lower payouts. Play responsibly and have fun!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
