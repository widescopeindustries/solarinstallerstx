import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const UpgradeToPremium = () => {
  const premiumFeatures = [
    "Dedicated, SEO-optimized installer page",
    "Higher visibility in search results",
    "Showcase unlimited projects & testimonials",
    "Direct lead generation forms",
    "Analytics and performance reports",
    "No competing ads on your page",
    "Priority support"
  ];

  return (
    <>
      <SEOHead
        title="Upgrade to Premium | SolarInstallersTX"
        description="Unlock advanced features and boost your visibility with a premium listing on SolarInstallersTX."
        canonicalUrl="https://solarinstallerstx.com/upgrade-to-premium"
      />
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Elevate Your Business with <span className="text-primary">Premium Listing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stand out from the competition, attract more clients, and showcase your expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-primary">Basic Listing</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Contact Information</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Basic Company Name</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Location Listing</li>
              </ul>
              <div className="text-center">
                <p className="text-4xl font-bold mb-4">Free</p>
                <Button asChild variant="outline" className="w-full text-lg py-6">
                  <Link to="/">View Basic Listings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col border-2 border-primary shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-primary">Premium Listing</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-6">
              <ul className="space-y-3 mb-6 text-foreground">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-5xl font-bold text-primary mb-4">$20<span className="text-2xl">.99/month</span></p>
                <Button className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpgradeToPremium;
