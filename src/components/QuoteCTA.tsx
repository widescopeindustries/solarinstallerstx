import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";
import { logEvent } from "@/lib/analytics";

export function QuoteCTA({ className = "mb-8" }: { className?: string }) {
  const handleClick = () => {
    logEvent('quote_cta_click', {
      location: window.location.pathname,
      cta_type: 'homepage_quote_button'
    });
  };

  return (
    <div className={`text-center ${className}`}>
      <Button
        asChild
        size="lg"
        className="group bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 hover:from-amber-500 hover:to-orange-600 text-xl font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 px-12 py-8 mx-auto"
      >
        <Link to="/quote" onClick={handleClick}>
          <span className="font-black">Get Your Free Solar Quote</span>
          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
        </Link>
      </Button>
      <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
        Connect with certified solar installers in your area - 100% free, no obligation
      </p>
    </div>
  );
}
