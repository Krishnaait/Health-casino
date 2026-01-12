import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GameHistory {
  result: string;
  winnings: number;
  timestamp: Date;
  symbols: string[];
}

const SYMBOLS = ['🍒', '🍊', '🍋', '🍇', '💎', '👑'];
const PAYOUTS: { [key: string]: number } = {
  '🍒': 2,
  '🍊': 3,
  '🍋': 4,
  '🍇': 5,
  '💎': 10,
  '👑': 20,
};

const PAYLINES = [1, 3, 5];
const BET_AMOUNTS = [5000, 10000, 25000, 50000];

export default function Slots() {
  const [credits, setCredits] = useState(1000000);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [lastWinnings, setLastWinnings] = useState(0);
  const [betAmount, setBetAmount] = useState(10000);
  const [paylines, setPaylines] = useState(1);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const spin = async () => {
    if (credits < betAmount) {
      setMessage('Insufficient points!');
      return;
    }

    setCredits(credits - betAmount);
    setSpinning(true);
    setMessage('🎰 SPINNING...');
    setLastWinnings(0);

    // Simulate reel spinning with animation
    const spinDuration = 3000;
    const spinInterval = 100;
    const spins = spinDuration / spinInterval;

    for (let i = 0; i < spins; i++) {
      await new Promise((resolve) => setTimeout(resolve, spinInterval));
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
    }

    // Generate final result
    const finalReels = [
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    ];
    setReels(finalReels);

    // Check for win
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const baseMultiplier = PAYOUTS[finalReels[0]];
      const paylineMultiplier = paylines;
      const winnings = betAmount * baseMultiplier * paylineMultiplier;
      setCredits((prev) => prev + winnings);
      setLastWinnings(winnings);
      setMessage(`🎉 JACKPOT! ${winnings.toLocaleString()} credits!`);
      addToHistory('WIN', winnings, finalReels);
    } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
      const smallWin = betAmount * 1.5;
      setCredits((prev) => prev + smallWin);
      setLastWinnings(smallWin);
      setMessage(`✨ SMALL WIN! ${smallWin.toLocaleString()} credits!`);
      addToHistory('SMALL WIN', smallWin, finalReels);
    } else {
      setMessage('❌ NO MATCH - Try Again!');
      addToHistory('LOSS', 0, finalReels);
    }

    setSpinning(false);
  };

  const addToHistory = (result: string, winnings: number, symbols: string[]) => {
    setGameHistory([
      { result, winnings, timestamp: new Date(), symbols },
      ...gameHistory.slice(0, 9),
    ]);
  };

  const reset = () => {
    setCredits(1000000);
    setReels(['🍒', '🍒', '🍒']);
    setMessage('');
    setLastWinnings(0);
    setGameHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400">🎰 SLOTS</h1>
            <p className="text-cyan-300 text-sm mt-1">Match 3 Symbols to Win Big!</p>
          </div>
          <div className="text-right bg-gray-800 border-2 border-cyan-600 rounded-lg p-4">
            <div className="text-cyan-300 text-sm font-semibold">YOUR POINTS</div>
            <div className="text-3xl font-bold text-cyan-400">{credits.toLocaleString()}</div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`font-bold py-3 px-4 rounded mb-4 text-center shadow-lg text-white ${
            message.includes('JACKPOT')
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-500'
              : message.includes('SMALL WIN')
              ? 'bg-gradient-to-r from-green-600 to-green-500'
              : 'bg-gradient-to-r from-red-600 to-red-500'
          }`}>
            {message}
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Game Controls */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl border border-cyan-600">
              {/* Game Settings */}
              <div className="mb-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">⚙️ GAME SETTINGS</h3>

                {/* Bet Amount Selection */}
                <div className="mb-4">
                  <label className="text-cyan-300 font-semibold text-sm mb-2 block">Bet Amount</label>
                  <div className="grid grid-cols-4 gap-2">
                    {BET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        disabled={spinning}
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

                {/* Paylines Selection */}
                <div className="mb-6">
                  <label className="text-cyan-300 font-semibold text-sm mb-2 block">Paylines</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PAYLINES.map((line) => (
                      <button
                        key={line}
                        onClick={() => setPaylines(line)}
                        disabled={spinning}
                        className={`py-2 px-3 rounded font-bold text-sm transition-all ${
                          paylines === line
                            ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                            : 'bg-gray-700 text-cyan-300 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        {line} Line{line > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reel Display */}
              <div className="mb-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">🎮 REEL DISPLAY</h3>
                <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg border-2 border-cyan-600 flex justify-center gap-4">
                  {reels.map((symbol, index) => (
                    <div
                      key={index}
                      className={`w-28 h-28 bg-gradient-to-br from-yellow-500 to-yellow-600 border-4 border-yellow-400 rounded-lg flex items-center justify-center text-6xl shadow-2xl transition-all ${
                        spinning ? 'animate-bounce' : ''
                      }`}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payout Table */}
              <div className="mb-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-4">💰 PAYOUT TABLE</h3>
                <div className="grid grid-cols-6 gap-2">
                  {SYMBOLS.map((symbol) => (
                    <div key={symbol} className="bg-gray-700 rounded-lg p-3 text-center border border-gray-600">
                      <div className="text-3xl mb-2">{symbol}</div>
                      <div className="text-yellow-400 font-bold text-sm">{PAYOUTS[symbol]}x</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Game Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-cyan-300 text-sm font-semibold">Bet Amount</div>
                  <div className="text-2xl font-bold text-cyan-400">{(betAmount / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-cyan-300 text-sm font-semibold">Paylines</div>
                  <div className="text-2xl font-bold text-cyan-400">{paylines}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-cyan-300 text-sm font-semibold">Last Win</div>
                  <div className="text-2xl font-bold text-yellow-400">{lastWinnings.toLocaleString()}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={spin}
                  disabled={spinning || credits < betAmount}
                  className="bg-gradient-to-b from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold py-4 text-lg border-2 border-cyan-400 shadow-lg rounded-lg disabled:opacity-50"
                >
                  🎰 SPIN
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
                <h3 className="text-cyan-400 font-bold text-lg">📊 RECENT SPINS</h3>
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
                    <div className="text-gray-400 text-center py-8 text-sm">No spins yet</div>
                  ) : (
                    gameHistory.map((game, idx) => (
                      <div key={idx} className={`rounded p-3 text-sm border ${
                        game.result === 'WIN'
                          ? 'bg-green-900/30 border-green-600'
                          : game.result === 'SMALL WIN'
                          ? 'bg-blue-900/30 border-blue-600'
                          : 'bg-red-900/30 border-red-600'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-cyan-400">{game.result}</span>
                          <span className="text-gray-300 text-xs">{game.timestamp.toLocaleTimeString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-300">{game.symbols.join(' ')}</span>
                          <span className={`font-bold ${
                            game.winnings > 0 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {game.winnings > 0 ? '+' : ''}{game.winnings.toLocaleString()}
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
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">📖 HOW TO PLAY SLOTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">1️⃣ PLACE YOUR BET</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Select your bet amount (5K, 10K, 25K, or 50K credits) and choose the number of paylines (1, 3, or 5). More paylines = more winning combinations!
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">2️⃣ SPIN THE REELS</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Click the SPIN button to start the reels spinning. Watch them spin and slow down to reveal your result. Each spin costs your selected bet amount.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h3 className="font-bold text-cyan-400 mb-3 text-lg">3️⃣ WIN & COLLECT</h3>
              <p className="text-cyan-200 text-sm leading-relaxed">
                Match 3 identical symbols to win! Payouts depend on the symbol value and number of paylines. Higher symbols = bigger payouts. Collect your winnings instantly!
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
                <li>✓ Match 3 identical symbols on any active payline to win</li>
                <li>✓ Winning combinations pay out based on symbol value</li>
                <li>✓ Payline multiplier applies to all winning combinations</li>
                <li>✓ Small wins (2 matching symbols) pay 1.5x your bet</li>
                <li>✓ Jackpot (3 matching symbols) pays symbol value × paylines × bet</li>
                <li>✓ Each spin costs your selected bet amount</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Symbol Payouts</h3>
              <ul className="space-y-2">
                <li><span className="text-cyan-400 font-semibold">🍒 Cherry:</span> 2x payout</li>
                <li><span className="text-cyan-400 font-semibold">🍊 Orange:</span> 3x payout</li>
                <li><span className="text-cyan-400 font-semibold">🍋 Lemon:</span> 4x payout</li>
                <li><span className="text-cyan-400 font-semibold">🍇 Grapes:</span> 5x payout</li>
                <li><span className="text-cyan-400 font-semibold">💎 Diamond:</span> 10x payout</li>
                <li><span className="text-cyan-400 font-semibold">👑 Crown:</span> 20x payout (BEST!)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Slots Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-cyan-600 rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">ℹ️ ABOUT SLOTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-cyan-200 text-sm leading-relaxed">
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">History & Origins</h3>
              <p className="mb-4">
                Slots machines have a rich history dating back to the late 1800s. The first mechanical slot machine was invented by Charles Fey in 1895. Today, slots remain the most popular casino game worldwide, combining simplicity with the thrill of potential big wins. Our digital slots bring the classic Vegas experience to your screen!
              </p>
              <h3 className="text-cyan-300 font-bold mb-3">Why Players Love Slots</h3>
              <ul className="space-y-2">
                <li>✓ Simple gameplay - no strategy needed, pure luck</li>
                <li>✓ Fast-paced action - quick spins keep the excitement high</li>
                <li>✓ Big win potential - jackpots can be life-changing</li>
                <li>✓ Variety of symbols - different themes and payouts</li>
                <li>✓ Instant gratification - results are immediate</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-300 font-bold mb-3">Game Features</h3>
              <ul className="space-y-2 mb-4">
                <li><span className="text-cyan-400 font-semibold">RTP (Return to Player):</span> Typically 96% - favorable odds</li>
                <li><span className="text-cyan-400 font-semibold">Max Payout:</span> 20x × 5 paylines × bet = 100x potential</li>
                <li><span className="text-cyan-400 font-semibold">Spin Speed:</span> 3 seconds for full animation</li>
                <li><span className="text-cyan-400 font-semibold">Free-to-Play:</span> Play with unlimited credits, no real money</li>
              </ul>

              <h3 className="text-cyan-300 font-bold mb-3">Strategy Tips</h3>
              <ul className="space-y-2">
                <li>✓ Start with 1 payline to conserve credits</li>
                <li>✓ Increase paylines for more winning opportunities</li>
                <li>✓ Bet higher amounts for bigger potential payouts</li>
                <li>✓ Track your spins - look for patterns in the history</li>
                <li>✓ Set a budget and stick to it for responsible play</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
