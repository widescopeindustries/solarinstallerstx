import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  CheckCircle,
  XCircle,
  Globe,
  TrendingUp,
  Users,
  BarChart,
  LineChart,
  Phone,
  Mail,
  MapPin,
  Image,
  FileText,
  AlertCircle
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface PricingFeature {
  name: string;
  standard: boolean;
  verified: boolean;
  premium: boolean;
}

const features: PricingFeature[] = [
  {
    name: "Company Profile",
    standard: true,
    verified: true,
    premium: true
  },
  {
    name: "NABCEP Certification Display",
    standard: true,
    verified: true,
    premium: true
  },
  {
    name: "Basic Contact Information",
    standard: true,
    verified: true,
    premium: true
  },
  {
    name: "Service Area Map",
    standard: false,
    verified: true,
    premium: true
  },
  {
    name: "Photo Gallery",
    standard: false,
    verified: true,
    premium: true
  },
  {
    name: "Customer Reviews",
    standard: false,
    verified: true,
    premium: true
  },
  {
    name: "Verified Badge",
    standard: false,
    verified: true,
    premium: true
  },
  {
    name: "Premium Badge",
    standard: false,
    verified: false,
    premium: true
  },
  {
    name: "Featured Placement",
    standard: false,
    verified: false,
    premium: true
  },
  {
    name: "Lead Generation",
    standard: false,
    verified: false,
    premium: true
  },
  {
    name: "Analytics Dashboard",
    standard: false,
    verified: false,
    premium: true
  },
  {
    name: "Project Portfolio",
    standard: false,
    verified: false,
    premium: true
  }
];

export default function PremiumPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <>
      <SEOHead
        title="Premium Solar Installer Listings | SolarInstallersTX"
        description="Upgrade your solar installer profile with premium features. Get more visibility, leads, and tools to grow your business."
        canonicalUrl="https://solarinstallerstx.com/premium"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="secondary">
              <Star className="h-4 w-4 mr-1" />
              Premium Installer Network
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Dominate Your Local Solar Market
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get featured placement, qualified leads, and powerful tools to grow your solar installation business across Texas
            </p>
            
            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-semibold">3x More Visibility</div>
                <div className="text-sm text-muted-foreground">Priority search placement</div>
              </Card>
              <Card className="p-4">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-semibold">Qualified Leads</div>
                <div className="text-sm text-muted-foreground">Direct customer inquiries</div>
              </Card>
              <Card className="p-4">
                <BarChart className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-semibold">Real-Time Analytics</div>
                <div className="text-sm text-muted-foreground">Track your performance</div>
              </Card>
            </div>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-muted p-1 rounded-lg mb-8">
              <Button
                variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={billingCycle === 'annual' ? 'default' : 'ghost'}
                onClick={() => setBillingCycle('annual')}
              >
                Annual
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              </Button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Standard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Standard</span>
                  <Badge variant="outline">Free</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">$0</div>
                <Button className="w-full mb-6">Get Started</Button>
                <ul className="space-y-3">
                  {features.map(feature => (
                    <li key={feature.name} className="flex items-start gap-2">
                      {feature.standard ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <span className={!feature.standard ? "text-muted-foreground" : ""}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Verified */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Verified</span>
                  <Badge>Popular</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${billingCycle === 'monthly' ? '29' : '279'}
                </div>
                <div className="text-sm text-muted-foreground mb-6">
                  per {billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
                <Button className="w-full mb-6">Upgrade to Verified</Button>
                <ul className="space-y-3">
                  {features.map(feature => (
                    <li key={feature.name} className="flex items-start gap-2">
                      {feature.verified ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <span className={!feature.verified ? "text-muted-foreground" : ""}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Premium */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Premium</span>
                  <Badge variant="default">Best Value</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${billingCycle === 'monthly' ? '99' : '949'}
                </div>
                <div className="text-sm text-muted-foreground mb-6">
                  per {billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
                <Button className="w-full mb-6" variant="premium">
                  Upgrade to Premium
                </Button>
                <ul className="space-y-3">
                  {features.map(feature => (
                    <li key={feature.name} className="flex items-start gap-2">
                      <CheckCircle 
                        className={`h-5 w-5 ${
                          feature.premium 
                            ? "text-primary" 
                            : "text-red-500"
                        } mt-0.5`}
                      />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Features Tabs */}
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="visibility">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="visibility">Enhanced Visibility</TabsTrigger>
                <TabsTrigger value="leads">Lead Generation</TabsTrigger>
                <TabsTrigger value="tools">Pro Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="visibility" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <Globe className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Premium Profile Features
                      </h3>
                      <p className="text-muted-foreground">
                        Stand out with a verified badge, photo gallery, customer reviews, and detailed company information.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <TrendingUp className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Priority Placement
                      </h3>
                      <p className="text-muted-foreground">
                        Get featured at the top of search results and city pages for maximum exposure.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="leads" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <Users className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Qualified Lead Generation
                      </h3>
                      <p className="text-muted-foreground">
                        Receive detailed lead information and quote requests directly from potential customers.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <BarChart className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Lead Management
                      </h3>
                      <p className="text-muted-foreground">
                        Track and manage your leads with our built-in CRM tools and analytics.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <LineChart className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Analytics Dashboard
                      </h3>
                      <p className="text-muted-foreground">
                        Get insights into your profile performance, lead conversion rates, and customer engagement.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <FileText className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Project Portfolio
                      </h3>
                      <p className="text-muted-foreground">
                        Showcase your best work with a customizable project portfolio and photo gallery.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-4">
              {[
                {
                  q: "What's included in the premium plan?",
                  a: "Premium members get priority placement in search results, enhanced profile features, lead generation tools, analytics dashboard, and the ability to showcase project portfolios."
                },
                {
                  q: "Can I upgrade or downgrade my plan?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
                },
                {
                  q: "How do I get verified?",
                  a: "Verification requires proof of your NABCEP certification, business license, and insurance. Our team will review your documentation within 2 business days."
                },
                {
                  q: "Is there a contract or commitment?",
                  a: "No long-term contract required. You can cancel your premium subscription at any time."
                }
              ].map((faq, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}