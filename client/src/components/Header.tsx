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
          <Link href="/" className="flex items-center gap-3 no-underline">
            <img src="/images/health-mitan-logo.png" alt="Health Mitan" className="h-16 w-16" />
            <div className="text-xl font-bold text-white font-poppins">
              HEALTH MITAN
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-accent transition-colors font-medium">
              Home
            </Link>
            <Link href="/games" className="text-white hover:text-accent transition-colors font-medium">
              Games
            </Link>

            <Link href="/about" className="text-white hover:text-accent transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <Link href="/games" className="hidden md:inline-block no-underline">
            <Button className="bg-accent text-primary hover:bg-accent/90 font-bold px-6 py-2 text-lg">
              PLAY NOW
            </Button>
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
            <Link href="/" className="text-white hover:text-accent transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/games" className="text-white hover:text-accent transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Games
            </Link>

            <Link href="/about" className="text-white hover:text-accent transition-colors font-medium" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/games" className="no-underline" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-accent text-primary hover:bg-accent/90 font-bold py-2 text-lg">
                PLAY NOW
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
