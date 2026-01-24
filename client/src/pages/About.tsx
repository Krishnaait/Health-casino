import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About CC INNOVATIONS</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Discover the story behind a premium social casino gaming platform dedicated to entertainment and fun.
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
                CC INNOVATIONS was founded with a mission to create a safe, entertaining, and responsible gaming platform where players can enjoy premium social casino games completely free.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We believe that entertainment should be accessible to all. Our platform combines engaging games with a focus on player safety and responsible gaming practices.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, CC INNOVATIONS continues to innovate and deliver exceptional gaming experiences with a commitment to integrity, fairness, and community.
              </p>
            </div>
            <div>
              <img
                src="/images/lucky-mascot-character.webp"
                alt="Health Mitan Character"
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
                To provide the world's most entertaining, safe, and responsible social gaming experience that brings joy and community to our players.
              </p>
            </div>

            {/* Values */}
            <div className="bg-background rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Integrity & Fairness</li>
                <li>✓ Player Safety</li>
                <li>✓ Responsible Gaming</li>
                <li>✓ Community First</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-background rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the most trusted social gaming platform, where every player enjoys safe, fair, and entertaining experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Why Choose CC INNOVATIONS?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-4xl text-secondary">🎮</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Engaging Games</h3>
                <p className="text-muted-foreground">
                  Enjoy a variety of exciting games with stunning graphics and engaging gameplay, all completely free.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl text-accent">🛡️</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Safe & Secure</h3>
                <p className="text-muted-foreground">
                  Play with peace of mind on our secure platform with no real money involved and responsible gaming practices.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl text-secondary">🎁</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Rewards & Bonuses</h3>
                <p className="text-muted-foreground">
                  Enjoy daily bonuses, rewards, and exclusive perks as you play and progress through our platform.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl text-accent">👥</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Community</h3>
                <p className="text-muted-foreground">
                  Connect with players worldwide and be part of a vibrant, supportive gaming community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-card-foreground">About Our Company</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">CC INNOVATIONS (OPC) PRIVATE LIMITED</h3>
              <p className="text-muted-foreground mb-6">
                CC INNOVATIONS (OPC) PRIVATE LIMITED is a registered company committed to providing safe, entertaining, and responsible gaming experiences. We operate with transparency, integrity, and a focus on player satisfaction.
              </p>
              <div className="bg-background rounded-lg p-6 space-y-3">
                <p className="text-muted-foreground"><strong>Legal Name:</strong> CC INNOVATIONS (OPC) PRIVATE LIMITED</p>
                <p className="text-muted-foreground"><strong>CIN:</strong> U78100JH2023OPC021360</p>
                <p className="text-muted-foreground"><strong>PAN:</strong> AALCC3673P</p>
                <p className="text-muted-foreground"><strong>Email:</strong> Support@pureplayfantasy.com</p>
                <p className="text-muted-foreground"><strong>Address:</strong> C/O N K SHARMA SEC 9 TYPE, BT QR NO 463. HEC, Dhurwa, Ranchi, Ranchi, Jharkhand 834004, India</p>
              </div>
            </div>
            <div>
              <img
                src="/images/cc-innovations-logo.png"
                alt="CC INNOVATIONS Logo"
                className="rounded-xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Gaming */}
      <section className="py-20 bg-gradient-to-r from-primary via-purple-900 to-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Responsible Gaming Commitment</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6 text-gray-200">
              At CC INNOVATIONS, we are deeply committed to promoting responsible gaming. Our platform is designed for entertainment purposes only, with no real money involved.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">For Players</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>✓ Set time limits for gaming</li>
                  <li>✓ Take regular breaks</li>
                  <li>✓ Play for fun, not profit</li>
                  <li>✓ Never share your account</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>✓ Free-to-play model only</li>
                  <li>✓ No real money transactions</li>
                  <li>✓ 18+ age requirement</li>
                  <li>✓ Support for problem gaming</li>
                </ul>
              </div>
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
            Experience premium social casino gaming with CC INNOVATIONS. Safe, entertaining, and completely free!
          </p>
          <Link href="/games">
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
