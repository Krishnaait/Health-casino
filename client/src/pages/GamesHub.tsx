import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function GamesHub() {
  const games = [
    {
      id: "mines",
      name: "Mines",
      emoji: "💣",
      description: "Click tiles to find safe spots and avoid mines. Increase your multiplier with each safe tile!",
      path: "/game/mines",
      color: "from-red-600 to-orange-600",
      multiplier: "Up to 3x",
    },
    {
      id: "slots",
      name: "Slots",
      emoji: "🎰",
      description: "Match 3 symbols on the reels to win! The Crown is worth 20x your bet!",
      path: "/game/slots",
      color: "from-yellow-600 to-red-600",
      multiplier: "Up to 20x",
    },
    {
      id: "plinko",
      name: "Plinko",
      emoji: "🎯",
      description: "Drop the ball and watch it fall through pegs. Land in the center for the biggest multipliers!",
      path: "/game/plinko",
      color: "from-blue-600 to-purple-600",
      multiplier: "Up to 10x",
    },
    {
      id: "diamonds",
      name: "Diamonds",
      emoji: "💎",
      description: "Match 3 or more gems of the same type. The more you match, the bigger your reward!",
      path: "/game/diamonds",
      color: "from-pink-600 to-purple-600",
      multiplier: "Up to 5x per match",
    },
    {
      id: "dreamcatcher",
      name: "Dream Catcher",
      emoji: "🌙",
      description: "Spin the magical wheel and catch your dreams! Each spin has an equal chance to win big!",
      path: "/game/dreamcatcher",
      color: "from-indigo-600 to-cyan-600",
      multiplier: "Up to 10x",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-purple-900 to-secondary pb-20">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur p-6 sticky top-0 z-40 border-b border-cyan-400/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white">🎮 All Games</h1>
          <p className="text-cyan-400 text-sm mt-2">Choose a game and start playing for free!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Link key={game.id} href={game.path}>
              <a className="no-underline">
                <div className="bg-gradient-to-br from-black/60 to-purple-900/60 backdrop-blur rounded-3xl p-6 shadow-2xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all hover:scale-105 cursor-pointer h-full flex flex-col">
                  {/* Game Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-5xl mb-4 shadow-lg`}>
                    {game.emoji}
                  </div>

                  {/* Game Name */}
                  <h2 className="text-2xl font-bold text-white mb-2">{game.name}</h2>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {game.description}
                  </p>

                  {/* Multiplier Badge */}
                  <div className="bg-yellow-400/20 rounded-lg p-3 mb-4 border border-yellow-400/50">
                    <p className="text-yellow-400 font-bold text-center">
                      Max Multiplier: {game.multiplier}
                    </p>
                  </div>

                  {/* Play Button */}
                  <Button className="w-full bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold py-3 text-lg shadow-lg">
                    <Play size={20} className="mr-2" />
                    Play Now
                  </Button>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-br from-black/60 to-purple-900/60 backdrop-blur rounded-3xl p-8 shadow-2xl border border-cyan-400/20">
          <h2 className="text-3xl font-bold text-white mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cyan-400/10 rounded-xl p-6 border border-cyan-400/30">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Start with Free Coins</h3>
              <p className="text-gray-300">
                Every player starts with 1,000,000 free coins. No deposit required, no credit card needed!
              </p>
            </div>
            <div className="bg-cyan-400/10 rounded-xl p-6 border border-cyan-400/30">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-white mb-3">Play Your Favorite Game</h3>
              <p className="text-gray-300">
                Choose from 5 unique games with different mechanics and winning strategies. Find your favorite!
              </p>
            </div>
            <div className="bg-cyan-400/10 rounded-xl p-6 border border-cyan-400/30">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-white mb-3">Reset & Play Again</h3>
              <p className="text-gray-300">
                When you run out of coins, just reset and get another 1,000,000 coins to play again!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
