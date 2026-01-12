import { useReducer } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Info, Zap } from "lucide-react";

const INITIAL_CREDITS = 1000000;
const BET_AMOUNT = 10000;

interface GameState {
  credits: number;
  spinning: boolean;
  selectedBet: string | null;
  winningNumber: number | null;
  lastWinnings: number;
  message: string;
  wheelRotation: number;
}

type GameAction =
  | { type: "SELECT_BET"; bet: string }
  | { type: "SPIN" }
  | { type: "SPIN_COMPLETE"; number: number; winnings: number }
  | { type: "RESET" };

const initialState: GameState = {
  credits: INITIAL_CREDITS,
  spinning: false,
  selectedBet: null,
  winningNumber: null,
  lastWinnings: 0,
  message: "Select a bet and SPIN to play!",
  wheelRotation: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SELECT_BET":
      return {
        ...state,
        selectedBet: action.bet,
        message: `Bet selected: ${action.bet}. Click SPIN to play!`,
      };

    case "SPIN":
      if (state.credits < BET_AMOUNT || !state.selectedBet) {
        return {
          ...state,
          message: state.credits < BET_AMOUNT ? "Not enough credits!" : "Select a bet first!",
        };
      }

      return {
        ...state,
        spinning: true,
        credits: state.credits - BET_AMOUNT,
        message: "Spinning...",
        wheelRotation: state.wheelRotation + 3600 + Math.random() * 360,
      };

    case "SPIN_COMPLETE":
      return {
        ...state,
        spinning: false,
        winningNumber: action.number,
        lastWinnings: action.winnings,
        credits: state.credits + action.winnings,
        message: action.winnings > 0 ? `🎉 YOU WON! ${action.winnings.toLocaleString()} credits!` : "No match. Try again!",
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function Roulette() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleSpin = async () => {
    if (state.spinning || !state.selectedBet) return;

    dispatch({ type: "SPIN" });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const winningNumber = Math.floor(Math.random() * 37);
    let winnings = 0;

    if (state.selectedBet === "red") {
      const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
      winnings = redNumbers.includes(winningNumber) ? BET_AMOUNT * 2 : 0;
    } else if (state.selectedBet === "black") {
      const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
      winnings = blackNumbers.includes(winningNumber) ? BET_AMOUNT * 2 : 0;
    } else if (state.selectedBet === "odd") {
      winnings = winningNumber % 2 === 1 ? BET_AMOUNT * 2 : 0;
    } else if (state.selectedBet === "even") {
      winnings = winningNumber % 2 === 0 && winningNumber !== 0 ? BET_AMOUNT * 2 : 0;
    } else if (state.selectedBet === "low") {
      winnings = winningNumber > 0 && winningNumber <= 18 ? BET_AMOUNT * 2 : 0;
    } else if (state.selectedBet === "high") {
      winnings = winningNumber >= 19 ? BET_AMOUNT * 2 : 0;
    } else if (state.selectedBet.startsWith("dozen")) {
      const dozen = parseInt(state.selectedBet.split("-")[1]);
      const start = (dozen - 1) * 12 + 1;
      const end = dozen * 12;
      winnings = winningNumber >= start && winningNumber <= end ? BET_AMOUNT * 3 : 0;
    } else if (state.selectedBet.startsWith("single-")) {
      const number = parseInt(state.selectedBet.split("-")[1]);
      winnings = winningNumber === number ? BET_AMOUNT * 36 : 0;
    }

    dispatch({ type: "SPIN_COMPLETE", number: winningNumber, winnings });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black pb-20">
      {/* Premium Header */}
      <div className="bg-black/90 backdrop-blur border-b-2 border-cyan-500/50 sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-widest uppercase">🎡 Roulette</h1>
            <p className="text-cyan-400 text-sm mt-1 tracking-wide">Spin the Wheel and Win Big</p>
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
              {/* Wheel Display */}
              <div className="mb-8 flex justify-center">
                <div className="relative w-64 h-64">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 border-4 border-cyan-400 flex items-center justify-center text-6xl font-bold text-white shadow-2xl transition-transform ${
                      state.spinning ? "animate-spin" : ""
                    }`}
                    style={{
                      transform: `rotate(${state.wheelRotation}deg)`,
                      transitionDuration: state.spinning ? "3s" : "0s",
                    }}
                  >
                    {state.winningNumber !== null ? state.winningNumber : "?"}
                  </div>
                </div>
              </div>

              {/* Message Display */}
              <div className="text-center mb-8 min-h-14">
                <div className={`text-2xl font-bold tracking-wide uppercase transition-all ${
                  state.message.includes("WON")
                    ? "text-yellow-400 animate-pulse drop-shadow-lg"
                    : state.message.includes("No match")
                    ? "text-red-400 drop-shadow-lg"
                    : "text-cyan-400"
                }`}>
                  {state.message}
                </div>
              </div>

              {/* Betting Options */}
              <div className="mb-8">
                <h3 className="text-cyan-400 font-bold uppercase tracking-widest mb-4 text-sm">Select Your Bet</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Red", value: "red", payout: "1:1" },
                    { label: "Black", value: "black", payout: "1:1" },
                    { label: "Odd", value: "odd", payout: "1:1" },
                    { label: "Even", value: "even", payout: "1:1" },
                    { label: "Low (1-18)", value: "low", payout: "1:1" },
                    { label: "High (19-36)", value: "high", payout: "1:1" },
                  ].map((bet) => (
                    <button
                      key={bet.value}
                      onClick={() => dispatch({ type: "SELECT_BET", bet: bet.value })}
                      disabled={state.spinning}
                      className={`p-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 ${
                        state.selectedBet === bet.value
                          ? "bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-2 border-yellow-400 shadow-lg shadow-yellow-500/50"
                          : "bg-gradient-to-br from-cyan-600 to-blue-700 text-white border-2 border-cyan-400 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/50"
                      } ${state.spinning && "opacity-50"}`}
                    >
                      {bet.label}
                      <div className="text-xs mt-1">{bet.payout}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                  <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">Bet Amount</div>
                  <div className="text-3xl font-bold text-white font-mono">{BET_AMOUNT.toLocaleString()}</div>
                </div>
                <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4 text-center hover:border-cyan-500/60 transition-all">
                  <div className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">Last Number</div>
                  <div className="text-3xl font-bold text-white font-mono">{state.winningNumber ?? "-"}</div>
                </div>
                <div className="bg-black/60 border-2 border-green-500/30 rounded-xl p-4 text-center hover:border-green-500/60 transition-all">
                  <div className="text-green-400 text-xs uppercase tracking-widest mb-2 font-bold">Last Win</div>
                  <div className="text-3xl font-bold text-green-400 font-mono">{state.lastWinnings.toLocaleString()}</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={handleSpin}
                  disabled={state.spinning || !state.selectedBet}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-3 text-lg shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:shadow-none uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                >
                  <Zap size={20} className="mr-2" />
                  Spin
                </Button>

                <Button
                  onClick={() => dispatch({ type: "RESET" })}
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
                  <p className="leading-relaxed">Select a bet type, spin the wheel, and match the winning number!</p>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-3 uppercase tracking-wide text-sm">Bet Types</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Colors/Ranges:</span>
                      <span className="text-yellow-400 font-bold">1:1 (2x)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Single Number:</span>
                      <span className="text-yellow-400 font-bold">36:1 (37x)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/15 border-2 border-cyan-500/40 rounded-xl p-4 hover:border-cyan-500/60 transition-all">
                  <h3 className="font-bold text-cyan-400 mb-2 uppercase tracking-wide text-sm">Strategy</h3>
                  <p className="leading-relaxed text-xs">Color bets are safer but lower payout. Single numbers are risky but pay up to 36x!</p>
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
