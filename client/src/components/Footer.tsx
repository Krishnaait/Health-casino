import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary via-primary to-secondary text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">🎰 LUCKY LOTUS</h3>
            <p className="text-sm text-gray-200">
              Experience the thrill of premium social casino gaming with our community of players worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="hover:text-accent transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/play-now">
                  <a className="hover:text-accent transition-colors">Play Now</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-accent transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <a className="hover:text-accent transition-colors">Community</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact">
                  <a className="hover:text-accent transition-colors">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="hover:text-accent transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="hover:text-accent transition-colors">Terms & Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="/legal">
                  <a className="hover:text-accent transition-colors">Legal</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
          <p>
            &copy; {currentYear} Lucky Lotus Casino. All rights reserved. | For amusement purposes only. Must be 21+
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/disclaimer">
              <a className="hover:text-accent transition-colors">Disclaimer</a>
            </Link>
            <Link href="/community">
              <a className="hover:text-accent transition-colors">Community Rules</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
