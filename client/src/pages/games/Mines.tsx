import { useReducer } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, Zap } from "lucide-react";

const GRID_SIZE = 25;
const INITIAL_MINES = 5;
const INITIAL_CREDITS = 1000000;
const BET_AMOUNT = 10000;

interface GameState {
  credits: number;
  gameStarted: boolean;
  revealed: Set<number>;
  mines: Set<number>;
  gameOver: boolean;
  won: boolean;
  currentMultiplier: number;
  message: string;
  safeCount: number;
}

type GameAction =
  | { type: "START_GAME" }
  | { type: "CLICK_TILE"; index: number }
  | { type: "CASH_OUT" }
  | { type: "RESET_GAME" };

const initialState: GameState = {
  credits: INITIAL_CREDITS,
  gameStarted: false,
  revealed: new Set(),
  mines: new Set(),
  gameOver: false,
  won: false,
  currentMultiplier: 1,
  message: "Click START to begin!",
  safeCount: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      if (state.credits < BET_AMOUNT) {
        return {
          ...state,
          credits: INITIAL_CREDITS,
          message: "Not enough credits! Resetting...",
        };
      }

      const newMines = new Set<number>();
      while (newMines.size < INITIAL_MINES) {
        newMines.add(Math.floor(Math.random() * GRID_SIZE));
      }

      return {
        ...state,
        credits: state.credits - BET_AMOUNT,
        gameStarted: true,
        gameOver: false,
        won: false,
        revealed: new Set(),
        mines: newMines,
        currentMultiplier: 1,
        message: "Click tiles to find safe spots!",
        safeCount: 0,
      };
    }

    case "CLICK_TILE": {
      if (!state.gameStarted || state.revealed.has(action.index) || state.gameOver || state.won) {
        return state;
      }

      const newRevealed = new Set(state.revealed);
      newRevealed.add(action.index);

      if (state.mines.has(action.index)) {
        return {
          ...state,
          revealed: newRevealed,
          gameOver: true,
          gameStarted: false,
          message: "💣 Hit a mine! Game Over!",
        };
      } else {
        const newSafeCount = state.safeCount + 1;
        const newMultiplier = 1 + newSafeCount * 0.1;

        if (newSafeCount === GRID_SIZE - INITIAL_MINES) {
          const winnings = Math.floor(BET_AMOUNT * newMultiplier * 2);
          return {
            ...state,
            revealed: newRevealed,
            currentMultiplier: newMultiplier,
            won: true,
            gameStarted: false,
            credits: state.credits + winnings,
            message: `🎉 You Won! ${winnings.toLocaleString()} credits!`,
            safeCount: newSafeCount,
          };
        }

        return {
          ...state,
          revealed: newRevealed,
          currentMultiplier: newMultiplier,
          message: "Click tiles to find safe spots!",
          safeCount: newSafeCount,
        };
      }
    }

    case "CASH_OUT": {
      if (!state.gameStarted || state.currentMultiplier === 1) {
        return state;
      }

      const winnings = Math.floor(BET_AMOUNT * state.currentMultiplier);
      return {
        ...state,
        credits: state.credits + winnings,
        gameStarted: false,
        gameOver: true,
        message: `Cashed out! Won ${winnings.toLocaleString()} credits!`,
      };
    }

    case "RESET_GAME": {
      return initialState;
    }

    default:
      return state;
  }
}

export default function Mines() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-20">
      {/* Premium Header */}
      <div className="bg-black/90 backdrop-blur border-b-2 border-cyan-500/50 sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-widest uppercase">💣 Mines</h1>
            <p className="text-cyan-400 text-sm mt-1 tracking-wide">Find Safe Tiles • Avoid Mines</p>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 text-xs uppercase tracking-widest mb-1">Your Credits</div>
            <div className="text-4xl font-bold text-yellow-400 font-mono drop-shadow-lg">{state.credits.toLocaleString()}</div>
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
                <div className="grid grid-cols-5 gap-3 bg-black/50 p-6 rounded-2xl border border-cyan-500/20">
                  {Array.from({ length: GRID_SIZE }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => dispatch({ type: "CLICK_TILE", index })}
                      disabled={!state.gameStarted || state.revealed.has(index)}
                      className={`aspect-square rounded-xl font-bold text-2xl transition-all duration-200 transform ${
                        state.revealed.has(index)
                          ? state.mines.has(index)
                            ? "bg-gradient-to-br from-red-700 to-red-900 text-white border-2 border-red-400 shadow-lg shadow-red-500/50 cursor-not-allowed"
                            : "bg-gradient-to-br from-green-600 to-green-800 text-white border-2 border-green-400 shadow-lg shadow-green-500/50 cursor-not-allowed"
                          : "bg-gradient-to-br from-cyan-600 to-blue-700 text-white border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/70 hover:scale-105 cursor-pointer active:scale-95"
                      } ${!state.gameStarted && "opacity-40 cursor-not-allowed"}`}
                    >
                      {state.revealed.has(index) ? (
                        state.mines.has(index) ? (
                          <span className="text-3xl">💣</span>
                        ) : (
                          <span className="text-3xl">✓</span>
                        )
                      ) : (
                        <span className="text-gray-300 text-sm">{index + 1}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Display */}
              <div className="text-center mb-8 min-h-14">
                <div className={`text-2xl font-bold tracking-wide uppercase transition-all ${
                  state.message.includes("Won")
                    ? "text-yellow-400 animate-pulse drop-shadow-lg"
                    : state.message.includes("mine")
                    ? "text-red-400 drop-shadow-lg"
                    : "text-cyan-400"
                }`}>
                  {state.message}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                  <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">Safe Tiles</div>
                  <div className="text-3xl font-bold text-white font-mono">{state.safeCount}/{GRID_SIZE - INITIAL_MINES}</div>
                </div>
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                  <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">Multiplier</div>
                  <div className="text-3xl font-bold text-yellow-400 font-mono">{state.currentMultiplier.toFixed(2)}x</div>
                </div>
                <div className="bg-black/60 border-2 border-green-500/30 rounded-xl p-4 text-center hover:border-green-500/60 transition-all">
                  <div className="text-green-400 text-xs uppercase tracking-widest mb-2 font-bold">Potential Win</div>
                  <div className="text-3xl font-bold text-green-400 font-mono">
                    {Math.floor(BET_AMOUNT * state.currentMultiplier).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => dispatch({ type: "START_GAME" })}
                  disabled={state.gameStarted}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:shadow-none uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                >
                  <Zap size={20} className="mr-2" />
                  Start Game
                </Button>

                {state.gameStarted && state.safeCount > 0 && (
                  <Button
                    onClick={() => dispatch({ type: "CASH_OUT" })}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-yellow-500/50 uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                  >
                    💰 Cash Out
                  </Button>
                )}

                <Button
                  onClick={() => dispatch({ type: "RESET_GAME" })}
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
                  <p className="leading-relaxed">Click tiles to find safe spots and avoid 5 hidden mines!</p>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-3 uppercase tracking-wide text-sm">Scoring</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Each Safe Tile:</span>
                      <span className="text-yellow-400 font-bold">+0.1x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Find All 20:</span>
                      <span className="text-yellow-400 font-bold">2x Bonus</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hit Mine:</span>
                      <span className="text-red-400 font-bold">Lose Bet</span>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-2 uppercase tracking-wide text-sm">Strategy</h3>
                  <p className="leading-relaxed">Cash out early for guaranteed wins, or risk it all for higher multipliers!</p>
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
