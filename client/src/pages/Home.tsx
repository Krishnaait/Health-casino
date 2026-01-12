import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Users, Gift, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-primary via-purple-900 to-secondary flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/hero-casino-night.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-accent">Lucky Lotus</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Join millions of players in the ultimate social casino experience. Play free, win big, and celebrate with our vibrant community!
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/play-now">
                <a className="no-underline">
                  <Button className="bg-accent text-primary hover:bg-accent/90 font-bold px-8 py-3 text-lg">
                    PLAY NOW
                  </Button>
                </a>
              </Link>
              <Link href="/about">
                <a className="no-underline">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-bold px-8 py-3 text-lg"
                  >
                    Learn More
                  </Button>
                </a>
              </Link>
            </div>
          </div>

          {/* Right - Character Image */}
          <div className="flex justify-center">
            <img
              src="/images/lucky-mascot-character.png"
              alt="Lucky Lotus Mascot"
              className="max-w-md w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Start Playing Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-accent rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🎮 Start Playing Now
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Get 1,000,000 FREE COINS to play all our amazing games!
            </p>
            <Link href="/play-now">
              <a className="no-underline">
                <Button className="bg-white text-secondary hover:bg-gray-100 font-bold px-8 py-3 text-lg">
                  PLAY NOW
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Why Choose Lucky Lotus?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-secondary to-accent rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Gift className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Daily Rewards
              </h3>
              <p className="text-muted-foreground">
                Collect daily bonuses, free spins, and exclusive rewards every time you play.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-accent to-secondary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Vibrant Community
              </h3>
              <p className="text-muted-foreground">
                Connect with millions of players, join clans, and compete in tournaments worldwide.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Premium Games
              </h3>
              <p className="text-muted-foreground">
                Enjoy 170+ unique slot machines with stunning graphics and exciting features.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-secondary to-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Win Big
              </h3>
              <p className="text-muted-foreground">
                Unlock massive jackpots, special bonuses, and legendary rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Celebration Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-purple-900 to-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="/images/coins-celebration.jpg"
                alt="Celebration with coins"
                className="rounded-xl shadow-2xl max-w-full h-auto"
              />
            </div>

            {/* Content */}
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Join Our Winning Community
              </h2>
              <p className="text-lg mb-8 text-gray-200">
                Experience the thrill of social casino gaming with our active community of players from around the world. Share your wins, celebrate together, and unlock exclusive rewards!
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-accent text-2xl">✓</span>
                  <span>700K+ active community members</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent text-2xl">✓</span>
                  <span>Daily tournaments with amazing prizes</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent text-2xl">✓</span>
                  <span>Safe, secure, and fair gameplay</span>
                </li>
              </ul>
              <Link href="/community">
                <a className="no-underline">
                  <Button className="bg-accent text-primary hover:bg-accent/90 font-bold px-8 py-3 text-lg">
                    Join Community
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">
            Ready to Strike Gold?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start playing now and experience the ultimate social casino adventure. Free to play, always!
          </p>
          <Link href="/play-now">
            <a className="no-underline">
              <Button className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-xl">
                PLAY NOW - FREE!
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
