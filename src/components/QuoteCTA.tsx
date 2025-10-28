import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { logEvent } from "@/lib/analytics";

export function QuoteCTA({ className = "mb-8" }: { className?: string }) {
  const handleClick = () => {
    // Track consumer lead conversion
    logEvent('generate_lead', {
      currency: 'USD',
      value: 150, // Estimated value of consumer solar lead
      lead_type: 'consumer_solar_quote',
      partner: 'signature_solar',
      location: window.location.pathname
    });
    
    // Track affiliate conversion
    logEvent('conversion', {
      send_to: 'G-35T6PEV5S6/solar_quote_lead',
      value: 150,
      currency: 'USD'
    });
    
    // Legacy tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'signature_solar_affiliate',
        value: 1
      });
    }
    
    window.open('https://signaturesolar.com/?ref=**SWAP_YOUR_ID_HERE**', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`text-center ${className}`}>
      <Button
        onClick={handleClick}
        size="lg"
        className="group bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:to-orange-600 text-xl font-bold shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 px-12 py-8 mx-auto"
        aria-describedby="partner-description"
      >
        <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
        <span className="font-black">Get Free Quote from Our Premiere TX Partner</span>
        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
      </Button>
      <p id="partner-description" className="mt-4 text-sm text-gray-600 max-w-md mx-auto">
        <span className="font-bold">Signature Solar</span> – Premiere Installer & Equipment Supplier in Texas
      </p>
    </div>
  );
}
