import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface Bet {
  type: 'number' | 'color' | 'oddeven' | 'range';
  value: string | number;
  amount: number;
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
    
    const totalSpins = 6 + Math.random() * 2;
    const finalAngle = (totalSpins * 360) + (numberIndex * anglePerNumber) + (anglePerNumber / 2);
    
    const startTime = Date.now();
    const duration = 4000;
    const startAngle = ballAngle;
    const startRadius = 125;
    const endRadius = 110;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setBallAngle(startAngle + (finalAngle - startAngle) * easeOut);
      setBallRadius(startRadius + (endRadius - startRadius) * easeOut);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setLastNumber(randomNumber);
        calculateWinnings(randomNumber);
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

  const reset = () => {
    setCredits(1000000);
    setBets([]);
    setLastNumber(null);
    setLastWin(0);
    setBallAngle(0);
    setBallRadius(125);
    setMessage('');
    setResultDisplay('');
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">🎡 ROULETTE</h1>
            <p className="text-yellow-300 text-sm">Spin the Wheel and Win Big</p>
          </div>
          <div className="text-right">
            <div className="text-yellow-300 text-sm">YOUR CREDITS</div>
            <div className="text-2xl font-bold text-yellow-400">{credits.toLocaleString()}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold py-2 px-4 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {/* Main Game Area */}
        <div className="flex gap-6 mb-4">
          {/* Left: Wheel */}
          <div className="flex flex-col items-center">
            {/* Wheel Container */}
            <div className="relative w-72 h-72 mb-4">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <img
                  src="/images/roulette-wheel.png"
                  alt="Roulette Wheel"
                  className="w-full h-full object-cover"
                />
                {/* Ball - Realistic silver ball */}
                <div
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #e8e8e8 30%, #c0c0c0 60%, #909090 100%)',
                    transform: `translate(-50%, -50%) rotate(${ballAngle}deg) translateY(-${ballRadius}px)`,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,255,255,0.9)',
                  }}
                />
              </div>
            </div>

            {/* Spin Button */}
            <Button
              onClick={spin}
              disabled={spinning || bets.length === 0}
              className="bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 px-8 text-lg border-2 border-green-400 disabled:opacity-50 shadow-lg rounded-lg"
            >
              {spinning ? 'SPINNING...' : 'SPIN'}
            </Button>

            {/* Result Box */}
            <div className="mt-4 bg-gray-800 border-2 border-yellow-600 rounded-lg p-4 text-center w-full">
              <div className="text-yellow-300 text-xs uppercase tracking-wider font-bold mb-2">Result</div>
              {lastNumber !== null ? (
                <div>
                  <div className="text-4xl font-bold text-yellow-400 mb-1">{lastNumber}</div>
                  <div className="text-sm font-bold text-yellow-300">{resultDisplay}</div>
                  <div className="text-xs text-yellow-300 mt-1">YOU WON</div>
                  <div className="text-xl font-bold text-yellow-400">${(lastWin / 1000).toFixed(1)}K</div>
                </div>
              ) : (
                <div className="text-3xl text-gray-500">-</div>
              )}
            </div>
          </div>

          {/* Right: Betting Table */}
          <div className="flex-1">
            <div className="bg-green-800 rounded-lg p-4 shadow-xl">
              {/* Betting Table */}
              <div className="flex gap-1 mb-2">
                {/* Zero */}
                <button
                  onClick={() => placeBet('number', 0)}
                  disabled={spinning}
                  className="relative w-12 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded border-2 border-green-400 disabled:opacity-50 flex items-center justify-center overflow-visible"
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
                              } text-white font-bold text-sm rounded border border-green-600 disabled:opacity-50 flex items-center justify-center overflow-visible`}
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
              <div className="grid grid-cols-6 gap-1 mt-2">
                <button onClick={() => placeBet('range', 'low')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50">1-18</button>
                <button onClick={() => placeBet('oddeven', 'even')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50">EVEN</button>
                <button onClick={() => placeBet('color', 'red')} disabled={spinning} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 text-xs rounded border border-red-400 disabled:opacity-50">RED</button>
                <button onClick={() => placeBet('color', 'black')} disabled={spinning} className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 text-xs rounded border border-gray-600 disabled:opacity-50">BLACK</button>
                <button onClick={() => placeBet('oddeven', 'odd')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50">ODD</button>
                <button onClick={() => placeBet('range', 'high')} disabled={spinning} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 text-xs rounded border border-green-500 disabled:opacity-50">19-36</button>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex gap-3 mt-4 items-center flex-wrap">
              {/* Chip Selector */}
              <div className="flex gap-2">
                {[5000, 10000, 25000, 50000].map((amount) => {
                  const chipStyle = CHIP_COLORS[amount];
                  return (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all ${
                        betAmount === amount
                          ? 'ring-4 ring-yellow-300 ring-offset-2 ring-offset-green-900 scale-110'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{
                        background: chipStyle.bg,
                        border: `4px solid ${chipStyle.border}`,
                        boxShadow: betAmount === amount 
                          ? '0 6px 20px rgba(255,215,0,0.6)' 
                          : '0 3px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      <span className="text-white text-sm drop-shadow-lg">{(amount / 1000).toFixed(0)}K</span>
                    </button>
                  );
                })}
              </div>

              {/* Stats & Controls */}
              <div className="flex gap-2 ml-auto items-center">
                <div className="bg-gray-800 border border-yellow-600 rounded px-3 py-2">
                  <span className="text-yellow-300 text-sm">Bets: <span className="text-yellow-400 font-bold">{bets.length}</span></span>
                </div>
                <div className="bg-gray-800 border border-yellow-600 rounded px-3 py-2">
                  <span className="text-yellow-300 text-sm">Total: <span className="text-yellow-400 font-bold">{(bets.reduce((sum, b) => sum + b.amount, 0) / 1000).toFixed(0)}K</span></span>
                </div>
                <Button onClick={clearBets} disabled={spinning} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 disabled:opacity-50">CLEAR</Button>
                <Button onClick={reset} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4">RESET</Button>
              </div>
            </div>
          </div>
        </div>

        {/* How to Play */}
        <div className="bg-gray-800 border border-yellow-600 rounded-lg p-4 shadow-xl">
          <h2 className="text-lg font-bold text-yellow-400 mb-2">📖 HOW TO PLAY</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-yellow-300">
              <h3 className="font-bold text-yellow-400 mb-1">OBJECTIVE</h3>
              <p>Select a chip value, click numbers to place bets. Ball spins around wheel and lands on a number. Match to win!</p>
            </div>
            <div className="text-yellow-300">
              <h3 className="font-bold text-yellow-400 mb-1">BET TYPES</h3>
              <ul className="space-y-0.5">
                <li>• Single Number: 36:1 payout</li>
                <li>• Color/Odd/Even: 1:1 payout</li>
                <li>• Ranges (1-18/19-36): 1:1 payout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
