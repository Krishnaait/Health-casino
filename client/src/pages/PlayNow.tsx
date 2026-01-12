import { Button } from "@/components/ui/button";

export default function PlayNow() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Play Now</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Start your casino adventure with 1 million free coins!
          </p>
        </div>
      </section>

      {/* Start with Free Coins */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-accent rounded-2xl p-12 text-center text-white shadow-2xl mb-16">
            <h2 className="text-4xl font-bold mb-4">Play for Free</h2>
            <p className="text-2xl mb-8">Start with 1,000,000 FREE COINS</p>
            <p className="text-lg mb-8 text-gray-100">
              No deposit required. No credit card needed. Just pure gaming fun!
            </p>
            <p className="text-sm text-gray-200">
              Your coins reset when you run out - play as much as you want!
            </p>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-card-foreground">How to Get Started</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="text-5xl font-bold text-secondary mb-4">1</div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account in seconds with just an email.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="text-5xl font-bold text-accent mb-4">2</div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Claim Bonus</h3>
              <p className="text-muted-foreground">
                Instantly receive 1 million free coins to start playing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="text-5xl font-bold text-secondary mb-4">3</div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Play Games</h3>
              <p className="text-muted-foreground">
                Choose from 170+ exciting slot machines and games.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="text-5xl font-bold text-accent mb-4">4</div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Win & Celebrate</h3>
              <p className="text-muted-foreground">
                Unlock rewards and celebrate with our community!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Featured Games</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Game 1 */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <div className="text-6xl">🎰</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Lucky 777</h3>
                <p className="text-muted-foreground mb-4">
                  Classic slots with massive jackpots and exciting features.
                </p>
                <Button className="w-full bg-secondary text-white hover:bg-secondary/90">
                  Play Now
                </Button>
              </div>
            </div>

            {/* Game 2 */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <div className="text-6xl">💎</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Diamond Quest</h3>
                <p className="text-muted-foreground mb-4">
                  Hunt for precious gems and unlock hidden treasures.
                </p>
                <Button className="w-full bg-accent text-primary hover:bg-accent/90">
                  Play Now
                </Button>
              </div>
            </div>

            {/* Game 3 */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <div className="text-6xl">⭐</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">Star Burst</h3>
                <p className="text-muted-foreground mb-4">
                  Explode with wins in this cosmic slot adventure.
                </p>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Play Now
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-6">And 167+ more amazing games!</p>
          </div>
        </div>
      </section>

      {/* Game Features */}
      <section className="py-20 bg-gradient-to-r from-primary via-purple-900 to-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Our Games Rock</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold mb-4">Easy to Play</h3>
              <p>Simple mechanics with big winning potential</p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4">Fast Action</h3>
              <p>Quick rounds keep the excitement going</p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur text-center">
              <div className="text-5xl mb-4">🎰</div>
              <h3 className="text-2xl font-bold mb-4">5 Unique Games</h3>
              <p>Variety of gameplay styles to enjoy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">
            Ready to Win Big?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join millions of players and start your lucky journey today. Free to play, always!
          </p>
          <Button className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-xl">
            PLAY NOW - CLAIM 1M COINS
          </Button>
        </div>
      </section>
    </div>
  );
}
