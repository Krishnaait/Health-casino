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
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/health-mitan-logo.webp" alt="Health Mitan" className="h-8 w-8" />
              <h3 className="text-xl font-bold">HEALTH MITAN</h3>
            </div>
            <p className="text-sm text-gray-200 mb-4">
              Experience the thrill of premium social casino gaming with our community of players worldwide.
            </p>
            <p className="text-xs text-gray-300">
              <strong>Health Mitan Private Limited</strong><br />
              CIN: U86909CT2023PTC014998<br />
              GST: 22AAGCH9149C1ZR
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
                <Link href="/games">
                  <a className="hover:text-accent transition-colors">Games</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-accent transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-accent transition-colors">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
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
                  <a className="hover:text-accent transition-colors">Legal Information</a>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer">
                  <a className="hover:text-accent transition-colors">Disclaimer</a>
                </Link>
              </li>
              <li>
                <Link href="/fair-policy">
                  <a className="hover:text-accent transition-colors">Fair Play Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/responsible-gaming">
                  <a className="hover:text-accent transition-colors">Responsible Gaming</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Operator Company */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">COMPANY</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-300">Legal Name:</p>
                <p className="font-semibold">HEALTH MITAN PRIVATE LIMITED</p>
              </div>
              <div>
                <p className="text-gray-300">CIN:</p>
                <p className="font-semibold">U86909CT2023PTC014998</p>
              </div>
              <div>
                <p className="text-gray-300">PAN:</p>
                <p className="font-semibold">AWRPH8122K</p>
              </div>
              <div>
                <p className="text-gray-300">GST:</p>
                <p className="font-semibold">22AAGCH9149C1ZR</p>
              </div>
              <div>
                <p className="text-gray-300 text-xs">Address: C/O Murit Lal Karsh, Vill Kot, Kasdol, Raipur-493335, Chhattisgarh, India</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div style={{display: 'none'}}>
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
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200 space-y-4 md:space-y-0">
          <p>
            &copy; {currentYear} Health Mitan Private Limited. All rights reserved. | For amusement purposes only. Must be 18+
          </p>
          <p className="text-xs text-gray-300">
            Operated by: Health Mitan Private Limited | Address: C/O Murit Lal Karsh, Vill Kot, Kasdol, Raipur-493335, Chhattisgarh, India
          </p>
        </div>
      </div>
    </footer>
  );
}
