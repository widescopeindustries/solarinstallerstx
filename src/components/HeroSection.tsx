import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [localSearch, setLocalSearch] = useState("");

  const handleSearch = () => {
    onSearch(localSearch.trim());
    // Scroll to results - use RAF to avoid forced reflow
    requestAnimationFrame(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section 
      className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-background to-muted/20"
      role="banner"
      aria-label="Find certified solar installers"
    >
      <div className="container relative z-10 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left side - Content */}
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Find the <span className="text-primary">Best Solar Installers</span> in Texas
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Connect with NABCEP certified professionals and save up to 90% on your electricity bills
              </p>
            </div>
            
            {/* Trust Indicators */}
            <h2 className="sr-only">Why Choose Us</h2>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>NABCEP Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>26% Tax Credit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Free Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Texas Licensed</span>
              </div>
            </div>
            
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  requestAnimationFrame(() => {
                    const resultsSection = document.getElementById('results-section');
                    if (resultsSection) {
                      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  });
                }}
              >
                Get Free Solar Quotes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex items-center gap-2 px-8 py-4 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => {
                  requestAnimationFrame(() => {
                    const calculatorSection = document.getElementById('solar-calculator');
                    if (calculatorSection) {
                      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  });
                }}
              >
                <Zap className="h-5 w-5" />
                Calculate Your Savings
              </Button>
            </div>
            
            {/* Search bar - Secondary */}
            <div className="max-w-xl">
              <div className="relative flex items-center gap-2 p-2 bg-card backdrop-blur-md rounded-lg shadow-[var(--shadow-md)] border border-border">
                <Search className="absolute left-5 text-muted-foreground" size={20} />
                <Input 
                  id="hero-search-input"
                  aria-label="Search for installers by city or zip code"
                  placeholder="Enter your city or zip code..." 
                  className="flex-1 pl-12 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-offset-0 text-base"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 shadow-md font-medium"
                  onClick={handleSearch}
                  aria-controls="results-section"
                >
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="order-1 md:order-2">
            <OptimizedImage
              src="/images/hero-solar"
              alt="NABCEP certified solar installers installing residential solar panels in Texas"
              className="w-full h-auto rounded-lg shadow-[var(--shadow-lg)]"
              width={1024}
              height={683}
              style={{ aspectRatio: '1024 / 683' }}
              priority={true}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};