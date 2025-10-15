import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-solar-minimal.png";
import { useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [localSearch, setLocalSearch] = useState("");

  const handleSearch = () => {
    onSearch(localSearch.trim());
    // Scroll to results
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Find Certified Solar Installers in Texas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Connect with NABCEP certified professionals for your solar energy needs
            </p>
            
            {/* Search bar */}
            <div className="max-w-xl">
              <div className="relative flex items-center gap-2 p-2 bg-card backdrop-blur-md rounded-lg shadow-[var(--shadow-md)] border border-border">
                <Search className="absolute left-5 text-muted-foreground" size={20} />
                <Input 
                  placeholder="Enter your city or zip code..." 
                  className="flex-1 pl-12 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-offset-0 text-base"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Search for installers by city or zip code"
                />
                <Button 
                  size="lg" 
                  className="bg-foreground hover:bg-foreground/90 text-background px-6 shadow-md font-medium"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="order-1 md:order-2">
            <img 
              src={heroImage}
              alt="Minimalist solar panel illustration"
              className="w-full h-auto rounded-lg shadow-[var(--shadow-lg)]"
              fetchPriority="high"
              width="1000"
              height="1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
};