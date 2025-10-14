import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Find certified solar installers"
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="Solar panels installation"
      />
      
      {/* Gradient overlay - sophisticated dark */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Subtle mesh pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            Find Certified Solar Installers in Texas
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
            Connect with NABCEP certified professionals for your solar energy needs
          </p>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center gap-2 p-2 bg-card/80 backdrop-blur-md rounded-lg shadow-[var(--shadow-elegant)] border border-border/50">
              <Search className="absolute left-5 text-muted-foreground" size={20} />
              <Input 
                placeholder="Enter your city or zip code..." 
                className="flex-1 pl-12 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-offset-0 text-base"
              />
              <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background px-8 shadow-md font-medium">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};