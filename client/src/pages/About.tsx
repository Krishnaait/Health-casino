import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Lucky Lotus</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Discover the story behind the world's most exciting social casino platform.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Lucky Lotus was founded with a simple mission: to bring the excitement and thrill of casino gaming to everyone, completely free and safe.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We believe that entertainment should be accessible to all. Our platform combines cutting-edge gaming technology with a vibrant community, creating an unmatched social casino experience.
              </p>
              <p className="text-lg text-muted-foreground">
                With over 170 unique games and a community of millions of players worldwide, Lucky Lotus continues to innovate and deliver unforgettable gaming moments every single day.
              </p>
            </div>
            <div>
              <img
                src="/images/lucky-mascot-character.png"
                alt="Lucky Lotus Character"
                className="rounded-xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-card-foreground">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-background rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide the world's most entertaining, safe, and inclusive social casino experience that brings joy and community to millions of players.
              </p>
            </div>

            {/* Values */}
            <div className="bg-background rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Integrity & Fairness</li>
                <li>✓ Player Safety</li>
                <li>✓ Innovation</li>
                <li>✓ Community First</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-background rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the most loved and trusted social casino platform globally, where every player feels valued and celebrated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Players Love Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Why Players Love Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-4xl text-secondary">🎮</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">170+ Unique Games</h3>
                <p className="text-muted-foreground">
                  From classic slots to modern adventures, we have something for everyone.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl text-accent">👥</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Thriving Community</h3>
                <p className="text-muted-foreground">
                  Connect with 700K+ players and join an active, supportive community.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl text-secondary">🎁</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Generous Rewards</h3>
                <p className="text-muted-foreground">
                  Daily bonuses, free spins, and exclusive rewards await you every day.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl text-accent">🔒</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Safe & Secure</h3>
                <p className="text-muted-foreground">
                  Play with peace of mind on our secure, fair, and transparent platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-purple-900 to-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">170+</div>
              <p className="text-lg text-gray-200">Unique Games</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">700K+</div>
              <p className="text-lg text-gray-200">Active Players</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50M+</div>
              <p className="text-lg text-gray-200">Daily Spins</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-lg text-gray-200">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">
            Join Our Community Today
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the magic of Lucky Lotus and become part of our amazing gaming community.
          </p>
          <Link href="/play-now">
            <a className="no-underline">
              <Button className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-xl">
                START PLAYING NOW
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
