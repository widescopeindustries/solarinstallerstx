import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";
import { AffiliateDisclosure } from "./AffiliateDisclosure";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-3 md:col-span-1">
            <h3 className="font-semibold text-lg">SolarInstallersTX</h3>
            <p className="text-sm text-muted-foreground">
              Connecting Texans with verified solar installers across the Lone Star State.
            </p>
            <div className="pt-4">
              <a
                href="https://veterans.certify.sba.gov/#search"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/sba-sdvosb-logo.png"
                  alt="SBA Certified Service-Disabled Veteran-Owned Small Business"
                  className="h-16 w-16"
                  width={240}
                  height={300}
                  loading="lazy"
                  sizes="64px"
                />
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                A Widescope Industries LLC Company
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Homeowners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/installers" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Certified Solar Installers
                </Link>
              </li>
              <li>
                <Link to="/nabcep-certified-installers" className="text-muted-foreground hover:text-primary transition-colors">
                  NABCEP Certified Installers
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-muted-foreground hover:text-primary transition-colors">
                  Get Free Solar Quotes
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-muted-foreground hover:text-primary transition-colors">
                  Learn About Solar Energy
                </Link>
              </li>
              <li>
                <Link to="/safety-score-explained" className="text-muted-foreground hover:text-primary transition-colors">
                  How We Rate Installers
                </Link>
              </li>
              <li>
                <Link to="/how-we-protect-you" className="text-muted-foreground hover:text-primary transition-colors">
                  How We Protect You
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar News &amp; Insights
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About SolarInstallersTX
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Resources &amp; Guides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/learn/solar-buying-guide-texas" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Buying Guide
                </Link>
              </li>
              <li>
                <Link to="/learn/choosing-installer" className="text-muted-foreground hover:text-primary transition-colors">
                  How to Choose an Installer
                </Link>
              </li>
              <li>
                <Link to="/learn/texas-incentives" className="text-muted-foreground hover:text-primary transition-colors">
                  Texas Solar Incentives
                </Link>
              </li>
              <li>
                <Link to="/learn/solar-financing" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Financing Options
                </Link>
              </li>
              <li>
                <Link to="/learn/battery-storage" className="text-muted-foreground hover:text-primary transition-colors">
                  Battery Storage Guide
                </Link>
              </li>
              <li>
                <Link to="/learn/solar-panel-types" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Panel Types
                </Link>
              </li>
              <li>
                <Link to="/texas-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Complete Texas Solar Guide
                </Link>
              </li>
              <li>
                <Link to="/texas-solar-incentives-2025" className="text-muted-foreground hover:text-primary transition-colors">
                  Texas Incentives 2025
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Cities &amp; Industry News</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cities/austin" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Installers Austin
                </Link>
              </li>
              <li>
                <Link to="/cities/dallas" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Installers Dallas
                </Link>
              </li>
              <li>
                <Link to="/cities/houston" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Installers Houston
                </Link>
              </li>
              <li>
                <Link to="/cities/san-antonio" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Installers San Antonio
                </Link>
              </li>
              <li>
                <Link to="/solar-bankruptcies" className="text-muted-foreground hover:text-primary transition-colors">
                  Solar Company Bankruptcies
                </Link>
              </li>
              <li>
                <Link to="/sunnova-help" className="text-muted-foreground hover:text-primary transition-colors">
                  Sunnova Customer Help
                </Link>
              </li>
              <li>
                <Link to="/report-bankruptcy" className="text-muted-foreground hover:text-primary transition-colors">
                  Report a Bankruptcy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">For Installers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/for-installers" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Verified Installer
                </Link>
              </li>
              <li>
                <Link to="/upgrade-to-premium" className="text-muted-foreground hover:text-primary transition-colors">
                  Premium Listing Options
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Our Sales Team
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-1">
            <NewsletterSignup />
          </div>
        </div>

        <div className="mt-8">
          <AffiliateDisclosure className="mb-6" />
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 SolarInstallersTX.com. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/sitemap" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/affiliate-disclosure" className="hover:text-primary transition-colors">
              Affiliate Disclosure
            </Link>
            <Link to="/refund" className="hover:text-primary transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Placeholder for Live Chat Widget */}
      {/* To implement live chat, you would typically paste a script from a service like Tidio, LiveChat, or Intercom here. */}
      {/* Example: <script src="//code.tidio.co/your_key.js" async></script> */}
      <div id="chat-widget-placeholder"></div>

    </footer>
  );
};
