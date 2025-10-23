import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <h3 className="font-semibold text-lg">SolarInstallersTX</h3>
            <p className="text-sm text-muted-foreground">
              Connecting Texans with verified solar installers across the Lone Star State.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/texas-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Texas Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-2">
            <NewsletterSignup />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 SolarInstallersTX.com. All rights reserved.
        </div>
      </div>

      {/* Placeholder for Live Chat Widget */}
      {/* To implement live chat, you would typically paste a script from a service like Tidio, LiveChat, or Intercom here. */}
      {/* Example: <script src="//code.tidio.co/your_key.js" async></script> */}
      <div id="chat-widget-placeholder"></div>

    </footer>
  );
};
