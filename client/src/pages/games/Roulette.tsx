import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Bet {
  type: 'number' | 'color' | 'oddeven' | 'range';
  value: string | number;
  amount: number;
}

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

export default function Roulette() {
  const [credits, setCredits] = useState(1000000);
  const [betAmount, setBetAmount] = useState(10000);
  const [bets, setBets] = useState<Bet[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [lastWin, setLastWin] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);
  const [message, setMessage] = useState('');
  const [resultDisplay, setResultDisplay] = useState<string>('');

  const getBetsForNumber = (num: number) => {
    return bets.filter(b => b.type === 'number' && b.value === num);
  };

  const placeBet = (type: string, value: string | number) => {
    if (credits < betAmount) {
      setMessage('Insufficient credits!');
      return;
    }

    const newBet: Bet = {
      type: type as any,
      value,
      amount: betAmount,
    };

    setBets([...bets, newBet]);
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

    bets.forEach((bet) => {
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

    const isRed = RED_NUMBERS.includes(number);
    const isOdd = number % 2 === 1;
    const range = number === 0 ? '' : (number >= 1 && number <= 18 ? 'LOW' : 'HIGH');
    const color = isRed ? 'RED' : (number === 0 ? 'GREEN' : 'BLACK');
    const oddEven = number === 0 ? '' : (isOdd ? 'ODD' : 'EVEN');
    
    let resultText = `${color}`;
    if (oddEven) resultText += ` ${oddEven}`;
    if (range) resultText += ` ${range}`;

    setResultDisplay(resultText);
    setLastWin(totalWin);
    setCredits(credits + totalWin);
    setBets([]);

    if (totalWin > 0) {
      setMessage(`🎉 WIN! +${totalWin.toLocaleString()}`);
    } else {
      setMessage('💣 NO WIN');
    }
  };

  const reset = () => {
    setCredits(1000000);
    setBets([]);
    setLastNumber(null);
    setLastWin(0);
    setBallRotation(0);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-gray-900 p-4">
      <div className="max-w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 px-4">
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
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold py-3 px-4 rounded mb-4 text-center text-lg mx-4">
            {message}
          </div>
        )}

        {/* Main Game Container */}
        <div className="px-4 mb-6">
          <div className="flex gap-6 items-start">
            {/* Left: Betting Table */}
            <div className="flex-shrink-0 w-80">
              <div className="bg-gradient-to-b from-green-700 to-green-800 border-4 border-yellow-600 rounded-lg p-3 shadow-2xl">
                <div className="text-center mb-2">
                  <div className="text-yellow-400 text-xs font-bold tracking-widest">BETTING TABLE</div>
                </div>

                {/* Number Grid - 3 columns x 12 rows */}
                <div className="grid grid-cols-3 gap-1 mb-2">
                  {/* 0 */}
                  <button
                    onClick={() => placeBet('number', 0)}
                    disabled={spinning}
                    className="col-span-3 relative bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs h-10 flex items-center justify-center"
                  >
                    0
                    {getBetsForNumber(0).length > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {getBetsForNumber(0).map((bet, idx) => (
                            <div
                              key={idx}
                              className="absolute w-6 h-6 rounded-full bg-gradient-to-b from-red-500 to-red-700 border-2 border-yellow-400 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                              style={{
                                transform: `translate(${Math.cos(idx * 0.8) * 10}px, ${Math.sin(idx * 0.8) * 10}px)`,
                              }}
                            >
                              {(bet.amount / 1000).toFixed(0)}K
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>

                  {/* Numbers 1-36 */}
                  {Array.from({ length: 36 }, (_, i) => i + 1).map((num) => {
                    const isRed = RED_NUMBERS.includes(num);
                    const numBets = getBetsForNumber(num);
                    
                    return (
                      <button
                        key={num}
                        onClick={() => placeBet('number', num)}
                        disabled={spinning}
                        className={`relative ${
                          isRed
                            ? 'bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600'
                            : 'bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
                        } text-white font-bold py-0.5 rounded border-2 border-yellow-500 disabled:opacity-50 text-xs h-8 flex items-center justify-center`}
                      >
                        {num}
                        {numBets.length > 0 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              {numBets.map((bet, idx) => (
                                <div
                                  key={idx}
                                  className="absolute w-5 h-5 rounded-full bg-gradient-to-b from-red-500 to-red-700 border-2 border-yellow-400 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                                  style={{
                                    transform: `translate(${Math.cos(idx * 0.8) * 8}px, ${Math.sin(idx * 0.8) * 8}px)`,
                                  }}
                                >
                                  {(bet.amount / 1000).toFixed(0)}K
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Outside Bets */}
                <div className="space-y-1 text-xs">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => placeBet('range', 'low')}
                      disabled={spinning}
                      className="bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50"
                    >
                      1-18
                    </button>
                    <button
                      onClick={() => placeBet('range', 'high')}
                      disabled={spinning}
                      className="bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50"
                    >
                      19-36
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => placeBet('oddeven', 'odd')}
                      disabled={spinning}
                      className="bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50"
                    >
                      ODD
                    </button>
                    <button
                      onClick={() => placeBet('color', 'red')}
                      disabled={spinning}
                      className="bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50"
                    >
                      RED
                    </button>
                    <button
                      onClick={() => placeBet('color', 'black')}
                      disabled={spinning}
                      className="bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50"
                    >
                      BLACK
                    </button>
                  </div>
                  <button
                    onClick={() => placeBet('oddeven', 'even')}
                    disabled={spinning}
                    className="w-full bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-1 rounded border-2 border-yellow-500 disabled:opacity-50"
                  >
                    EVEN
                  </button>
                </div>
              </div>
            </div>

            {/* Center: Large Wheel */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-96 h-96">
                {/* Outer Golden Frame */}
                <div className="absolute inset-0 -m-6 rounded-full border-8 border-yellow-500 shadow-2xl" style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)',
                  boxShadow: '0 0 60px rgba(255,215,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)',
                }}></div>
                
                {/* Wheel Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-8 border-yellow-600" style={{
                  boxShadow: '0 0 80px rgba(255,215,0,1), inset 0 0 40px rgba(0,0,0,0.6)',
                }}>
                  <img
                    src="/images/roulette-wheel.png"
                    alt="Roulette Wheel"
                    className="w-full h-full object-cover"
                  />

                  {/* Spinning Ball */}
                  <div
                    className="absolute w-6 h-6 bg-white rounded-full shadow-lg border-2 border-yellow-300"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${ballRotation}deg) translateY(-140px)`,
                      transition: spinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                    }}
                  />

                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-10 border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg"></div>
                  </div>
                </div>
              </div>

              {/* Spin Button */}
              <Button
                onClick={spin}
                disabled={spinning || bets.length === 0}
                className="mt-6 bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-12 text-xl border-3 border-yellow-500 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
              >
                {spinning ? 'SPINNING...' : 'SPIN'}
              </Button>
            </div>

            {/* Right: Result & Stats */}
            <div className="flex-shrink-0 w-64 space-y-3">
              {/* Result Box */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-4 border-yellow-600 rounded-lg p-4 text-center shadow-2xl">
                <div className="text-yellow-300 text-xs uppercase tracking-widest font-bold mb-3">Result</div>
                {lastNumber !== null ? (
                  <div>
                    <div className="text-6xl font-bold text-yellow-400 mb-3">{lastNumber}</div>
                    <div className="text-lg font-bold text-yellow-300 tracking-wider mb-3">{resultDisplay}</div>
                    <div className="text-sm text-yellow-300">YOU WON</div>
                    <div className="text-3xl font-bold text-yellow-400">${(lastWin / 1000).toFixed(1)}K</div>
                  </div>
                ) : (
                  <div className="text-5xl text-gray-500">-</div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 border-2 border-yellow-600 rounded p-2 text-center shadow-lg">
                  <div className="text-yellow-300 text-xs uppercase font-bold">Bets</div>
                  <div className="text-yellow-400 font-bold text-lg">{bets.length}</div>
                </div>
                <div className="bg-gray-800 border-2 border-yellow-600 rounded p-2 text-center shadow-lg">
                  <div className="text-yellow-300 text-xs uppercase font-bold">Bet</div>
                  <div className="text-yellow-400 font-bold text-sm">{(betAmount / 1000).toFixed(0)}K</div>
                </div>
              </div>

              {/* Total Bet */}
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-600 rounded p-3 text-center shadow-lg">
                <div className="text-yellow-300 text-xs uppercase font-bold mb-1">Total Bet</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {(bets.reduce((sum, b) => sum + b.amount, 0) / 1000).toFixed(0)}K
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-1">
                <Button
                  onClick={clearBets}
                  disabled={spinning}
                  className="w-full bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-2 border-2 border-yellow-500 disabled:opacity-50 text-sm"
                >
                  CLEAR
                </Button>
                <Button
                  onClick={reset}
                  className="w-full bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-2 border-2 border-yellow-500 text-sm"
                >
                  RESET
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bet Amount Controls */}
        <div className="grid grid-cols-4 gap-2 mb-6 px-4 max-w-md">
          {[5000, 10000, 25000, 50000].map((amount) => (
            <Button
              key={amount}
              onClick={() => setBetAmount(amount)}
              className={`py-2 font-bold border-2 rounded transition-all text-sm ${
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
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-600 rounded-lg p-4 shadow-2xl mx-4">
          <h2 className="text-xl font-bold text-yellow-400 mb-3">📖 HOW TO PLAY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-yellow-300 text-sm">
              <h3 className="font-bold text-yellow-400 mb-1">OBJECTIVE</h3>
              <p>Click numbers to place bets. Ball spins inside wheel. Match the winning number to win!</p>
            </div>
            <div className="text-yellow-300 text-sm">
              <h3 className="font-bold text-yellow-400 mb-1">BET TYPES</h3>
              <ul className="space-y-0.5">
                <li>• Single Number: 36:1 payout</li>
                <li>• Color/Odd/Even: 1:1 payout</li>
                <li>• Ranges: 1:1 payout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
