import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Users, Gift, Trophy, CheckCircle, XCircle } from "lucide-react";

export default function Home() {
  const games = [
    {
      id: "mines",
      name: "Mines",
      description: "Click tiles to find safe spots and avoid mines. Increase your multiplier with each safe reveal!",
      maxMultiplier: "Up to 3x",
      icon: "/images/mines-icon.webp",
      href: "/game/mines",
    },
    {
      id: "slots",
      name: "Slots",
      description: "Match 3 symbols on the reels to win! The Crown is worth 20x your bet!",
      maxMultiplier: "Up to 20x",
      icon: "/images/slots-icon.webp",
      href: "/game/slots",
    },
    {
      id: "plinko",
      name: "Plinko",
      description: "Drop the ball and watch it fall through pegs. Land in the center for the biggest multiplier!",
      maxMultiplier: "Up to 10x",
      icon: "/images/plinko-icon.webp",
      href: "/game/plinko",
    },
    {
      id: "diamonds",
      name: "Diamonds",
      description: "Match 3 or more gems of the same type to score big! The more you match, the bigger your reward!",
      maxMultiplier: "Up to 5x per match",
      icon: "/images/diamonds-icon.webp",
      href: "/game/diamonds",
    },
    {
      id: "roulette",
      name: "Roulette",
      description: "Spin the wheel and bet on numbers, colors, or ranges. Multiple betting options for every strategy!",
      maxMultiplier: "Up to 36x",
      icon: "/images/roulette-icon.webp",
      href: "/game/roulette",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-primary via-purple-900 to-secondary flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/hero-casino-night.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-accent">AQUASTRUCT</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Experience premium social casino gaming. Play free, enjoy exciting games, and have fun with our community!
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/games">
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
              src="/images/lucky-mascot-character.webp"
              alt="AQUASTRUCT Mascot"
              className="max-w-md w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Free-to-Play Model Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              <span className="text-accent">Free-to-Play</span>
              <br />
              <span className="text-foreground">Gaming Model</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy all our games completely free. No real money involved, no financial risk, just pure entertainment and fun!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* What We Offer */}
            <div className="bg-card rounded-2xl p-8 border-2 border-accent/20">
              <h3 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="text-accent" size={28} />
                What We Offer
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-1">✓</span>
                  <span className="text-muted-foreground">Completely free to play - no deposits required</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-1">✓</span>
                  <span className="text-muted-foreground">Virtual points only - no real money transactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-1">✓</span>
                  <span className="text-muted-foreground">Safe and secure gaming environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent text-xl mt-1">✓</span>
                  <span className="text-muted-foreground">Entertainment and fun for all ages (18+)</span>
                </li>
              </ul>
            </div>

            {/* Do's & Don'ts */}
            <div className="space-y-6">
              {/* Do's */}
              <div className="bg-card rounded-2xl p-8 border-2 border-green-500/20">
                <h3 className="text-2xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={28} />
                  Do's
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span className="text-muted-foreground">Play for entertainment and fun</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span className="text-muted-foreground">Set time limits for gaming sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span className="text-muted-foreground">Take regular breaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 text-lg">✓</span>
                    <span className="text-muted-foreground">Enjoy responsibly with friends</span>
                  </li>
                </ul>
              </div>

              {/* Don'ts */}
              <div className="bg-card rounded-2xl p-8 border-2 border-red-500/20">
                <h3 className="text-2xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <XCircle className="text-red-500" size={28} />
                  Don'ts
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">✗</span>
                    <span className="text-muted-foreground">Don't play if under 18 years old</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">✗</span>
                    <span className="text-muted-foreground">Don't spend excessive time gaming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">✗</span>
                    <span className="text-muted-foreground">Don't neglect work, school, or relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">✗</span>
                    <span className="text-muted-foreground">Don't share your account with others</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Here Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Why We're Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AQUASTRUCT is dedicated to providing a safe, entertaining, and responsible gaming platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-secondary to-accent rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Gift className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Entertainment First
              </h3>
              <p className="text-muted-foreground">
                We create engaging games designed purely for entertainment and enjoyment, with no financial risk.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-accent to-secondary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Community Building
              </h3>
              <p className="text-muted-foreground">
                We foster a vibrant community where players can connect, share experiences, and have fun together.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Responsible Gaming
              </h3>
              <p className="text-muted-foreground">
                We prioritize player safety and responsible gaming practices in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Games Section */}
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              <span className="text-accent">Popular</span>
              <br />
              <span className="text-foreground">Games</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy a variety of exciting games with stunning graphics and engaging gameplay.
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-card border-2 border-secondary/30 rounded-2xl p-8 hover:border-accent/50 transition-all hover:shadow-xl group"
              >
                {/* Game Icon */}
                <div className="mb-6 flex justify-center">
                  <img
                    src={game.icon}
                    alt={game.name}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Game Name */}
                <h3 className="text-2xl font-bold text-card-foreground mb-3 text-center">
                  {game.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-center mb-6 text-sm">
                  {game.description}
                </p>

                {/* Max Multiplier */}
                <div className="bg-gradient-to-r from-secondary/20 to-accent/20 border border-secondary/50 rounded-lg p-4 mb-6 text-center">
                  <p className="text-accent font-bold text-lg">
                    {game.maxMultiplier}
                  </p>
                </div>

                {/* Play Button */}
                <Link href={game.href}>
                  <a className="no-underline block">
                    <Button className="w-full bg-gradient-to-r from-accent to-secondary text-white hover:opacity-90 font-bold py-3 text-base">
                      ▶ Play Now
                    </Button>
                  </a>
                </Link>
              </div>
            ))}
          </div>

          {/* View All Games Button */}
          <div className="text-center">
            <Link href="/games">
              <a className="no-underline">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 font-bold px-8 py-3 text-lg"
                >
                  View All Games
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">
            Ready to Have Fun?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Start playing now and experience premium social casino entertainment. Completely free, always!
          </p>
          <Link href="/games">
            <a className="no-underline">
              <Button className="bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold px-12 py-4 text-xl">
                PLAY NOW - FREE!
              </Button>
            </a>
          </Link>
        </div>
      </section>

      {/* Age & Responsible Gaming Disclaimer */}
      <section className="py-16 bg-gradient-to-r from-primary via-purple-900 to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-black/30 rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-accent">Age & Responsible Gaming Disclaimer</h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              The content on this site is intended for users who are 18 years of age or older. It operates as a social gaming platform featuring free-to-play experiences available for entertainment and fun. This is a safe environment with no real money involved.
            </p>
            <p className="text-gray-200 leading-relaxed">
              We are committed to responsible gaming practices. If you or someone you know needs help with gaming habits, please reach out to our support team or visit our Responsible Gaming page for resources and assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
