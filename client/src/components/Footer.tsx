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
              <img src="/images/cc-innovations-logo.png" alt="CC INNOVATIONS" className="h-8 w-8" />
              <h3 className="text-xl font-bold">CC INNOVATIONS</h3>
            </div>
            <p className="text-sm text-gray-200 mb-4">
              Experience the thrill of premium social casino gaming with our community of players worldwide.
            </p>
            <p className="text-xs text-gray-300">
              <strong>CC INNOVATIONS (OPC) PRIVATE LIMITED</strong><br />
              CIN: U41001JK2023PTC014834<br />
              PAN: AAZCA0661R
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
                <p className="font-semibold">CC INNOVATIONS (OPC) PRIVATE LIMITED</p>
              </div>
              <div>
                <p className="text-gray-300">CIN:</p>
                <p className="font-semibold">U78100JH2023OPC021360</p>
              </div>
              <div>
                <p className="text-gray-300">PAN:</p>
                <p className="font-semibold">AALCC3673P</p>
              </div>
              <div>
                <p className="text-gray-300">Email:</p>
                <p className="font-semibold">Support@pureplayfantasy.com</p>
              </div>
              <div>
                <p className="text-gray-300 text-xs">Address: C/O N K SHARMA SEC 9 TYPE, BT QR NO 463. HEC, Dhurwa, Ranchi, Ranchi, Jharkhand 834004, India</p>
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

        {/* Disclaimer Section */}
        <div className="bg-white/5 rounded-lg p-6 mb-8">
          <h4 className="font-bold text-lg mb-3 text-accent">Age & Responsible Gaming Disclaimer</h4>
          <p className="text-sm text-gray-200 leading-relaxed">
            The content on this site is intended for users who are 18 years of age or older. It operates as a social gaming platform featuring free-to-play experiences available for entertainment and fun. This is a safe environment with no real money involved.
          </p>
          <p className="text-sm text-gray-200 leading-relaxed mt-3">
            We are committed to responsible gaming practices. If you or someone you know needs help with gaming habits, please reach out to our support team at Support@pureplayfantasy.com or visit our Responsible Gaming page for resources and assistance.
          </p>
        </div>

        {/* Legal Independence Disclaimer */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6 mb-8">
          <h4 className="font-bold text-lg mb-3 text-yellow-300">Legal Disclaimer - Independence & Non-Affiliation</h4>
          <p className="text-sm text-gray-200 leading-relaxed">
            CC INNOVATIONS is an independent gaming platform operated entirely by CC INNOVATIONS (OPC) PRIVATE LIMITED. This business does not affiliate with, endorse, or have any partnership with any other brand, company, or organization unless explicitly stated on this website. All services, games, and content provided on this platform are solely the responsibility of CC INNOVATIONS (OPC) PRIVATE LIMITED.
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200 space-y-4 md:space-y-0">
          <p>
            &copy; {currentYear} CC INNOVATIONS (OPC) PRIVATE LIMITED. All rights reserved. | For amusement purposes only. Must be 18+
          </p>
          <p className="text-xs text-gray-300">
            Operated by: CC INNOVATIONS (OPC) PRIVATE LIMITED | Support@pureplayfantasy.com | Address: C/O N K SHARMA SEC 9 TYPE, BT QR NO 463. HEC, Dhurwa, Ranchi, Ranchi, Jharkhand 834004, India
          </p>
        </div>
      </div>
    </footer>
  );
}
