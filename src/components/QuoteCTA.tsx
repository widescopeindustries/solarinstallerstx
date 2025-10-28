import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function QuoteCTA({ className = "mb-8" }: { className?: string }) {
  const handleClick = () => {
    // Track: window.gtag?.('event', 'quote_click');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quote_click', {
        event_category: 'engagement',
        event_label: 'signature_solar_affiliate'
      });
    }
    window.open('https://signaturesolar.com/?ref=YOUR_AFF_ID', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`text-center ${className}`}>
      <Button
        onClick={handleClick}
        size="lg"
        className="group bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:to-orange-600 text-xl font-bold shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 px-12 py-8 mx-auto"
      >
        <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
        FREE NABCEP Quote: Save $5K+ on TX Solar
        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
      </Button>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Powered by Signature Solar – Top TX Panels + Installs
      </p>
    </div>
  );
}
