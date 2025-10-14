import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-solar.jpg";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-blue-500 text-primary-foreground overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Find Top Solar Installers in Texas
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Connect with verified, trusted solar installation professionals across the Lone Star State
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-card rounded-lg p-2 shadow-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by city, zip code, or company name..." 
                  className="pl-10 border-0 focus-visible:ring-0 text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button size="lg" className="shadow-lg" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold">125</div>
              <div className="text-sm text-primary-foreground/80">Verified Installers</div>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-primary-foreground/80">Happy Customers</div>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-primary-foreground/80">Texas Coverage</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};