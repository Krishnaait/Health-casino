import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Trophy, Heart, Zap } from "lucide-react";

export default function Community() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Community</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Join 700K+ players in the most vibrant social casino community worldwide.
          </p>
        </div>
      </section>

      {/* Community Image */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <img
            src="/images/community-celebration.jpg"
            alt="Community Celebration"
            className="rounded-xl shadow-2xl w-full h-auto max-h-96 object-cover"
          />
        </div>
      </section>

      {/* Community Benefits */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-card-foreground">Why Join Our Community?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-secondary to-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Connect</h3>
              <p className="text-muted-foreground">
                Meet players from around the world and make lasting friendships.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-accent to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Compete</h3>
              <p className="text-muted-foreground">
                Participate in tournaments and compete for amazing prizes.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Share</h3>
              <p className="text-muted-foreground">
                Celebrate wins and share your gaming moments with friends.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-background rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-secondary to-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Exclusive</h3>
              <p className="text-muted-foreground">
                Access exclusive events and special community rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Community Features</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Clans & Groups</h3>
              <p className="text-muted-foreground mb-4">
                Join or create a clan to play with friends, share strategies, and compete together in clan tournaments.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Team up with friends</li>
                <li>Clan-exclusive rewards</li>
                <li>Leaderboards & rankings</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Tournaments</h3>
              <p className="text-muted-foreground mb-4">
                Compete in weekly and monthly tournaments with prizes ranging from free coins to exclusive rewards.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Weekly tournaments</li>
                <li>Monthly championships</li>
                <li>Amazing prizes</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Social Features</h3>
              <p className="text-muted-foreground mb-4">
                Share your wins, send gifts to friends, and celebrate together in our vibrant social ecosystem.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Share achievements</li>
                <li>Send gifts & coins</li>
                <li>Chat & connect</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Events & Activities</h3>
              <p className="text-muted-foreground mb-4">
                Participate in special events, seasonal challenges, and limited-time activities with exclusive rewards.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Special events</li>
                <li>Seasonal challenges</li>
                <li>Limited rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Rules */}
      <section className="py-20 bg-gradient-to-r from-primary via-purple-900 to-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Community Rules</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold mb-2">Be Respectful</h3>
              <p>Treat all community members with respect and kindness. No harassment, hate speech, or discrimination.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold mb-2">Fair Play</h3>
              <p>Play fairly and honestly. No cheating, exploiting, or using unauthorized tools or bots.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold mb-2">No Spam</h3>
              <p>Do not spam, flood, or post repetitive content. Keep conversations meaningful and relevant.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold mb-2">Protect Privacy</h3>
              <p>Do not share personal information of yourself or others. Keep your account secure.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="text-xl font-bold mb-2">Report Issues</h3>
              <p>If you see violations, report them immediately. Help us keep the community safe and fun.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Community Stats</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-secondary mb-2">700K+</div>
              <p className="text-muted-foreground">Active Members</p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-accent mb-2">50M+</div>
              <p className="text-muted-foreground">Monthly Spins</p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-secondary mb-2">100+</div>
              <p className="text-muted-foreground">Active Clans</p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-accent mb-2">24/7</div>
              <p className="text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-card-foreground">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Connect with millions of players, make friends, and become part of something special.
          </p>
          <Link href="/play-now">
            <a className="no-underline">
              <Button className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-xl">
                JOIN NOW
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
