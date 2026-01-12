import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary to-secondary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 no-underline">
              <div className="text-2xl font-bold text-white font-poppins">
                🎰 LUCKY LOTUS
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className="text-white hover:text-accent transition-colors font-medium">
                Home
              </a>
            </Link>
            <Link href="/games">
              <a className="text-white hover:text-accent transition-colors font-medium">
                Games
              </a>
            </Link>
            <Link href="/play-now">
              <a className="text-white hover:text-accent transition-colors font-medium">
                Play Now
              </a>
            </Link>
            <Link href="/about">
              <a className="text-white hover:text-accent transition-colors font-medium">
                About
              </a>
            </Link>
          </nav>

          {/* CTA Button */}
          <Link href="/games">
            <a className="hidden md:inline-block no-underline">
              <Button className="bg-accent text-primary hover:bg-accent/90 font-bold px-6 py-2 text-lg">
                PLAY NOW
              </Button>
            </a>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link href="/">
              <a
                className="text-white hover:text-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </Link>
            <Link href="/games">
              <a
                className="text-white hover:text-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Games
              </a>
            </Link>
            <Link href="/play-now">
              <a
                className="text-white hover:text-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Play Now
              </a>
            </Link>
            <Link href="/about">
              <a
                className="text-white hover:text-accent transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </Link>
            <Link href="/games">
              <a className="no-underline" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-accent text-primary hover:bg-accent/90 font-bold py-2 text-lg">
                  PLAY NOW
                </Button>
              </a>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
