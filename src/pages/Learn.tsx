import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Calculator, 
  DollarSign, 
  Shield, 
  Sun, 
  Zap, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  FileText,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

const Learn = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Complete Guide to Solar Installation in Texas",
      excerpt: "Everything you need to know about going solar in Texas, from permits to incentives.",
      category: "Installation",
      readTime: "12 min",
      featured: true
    },
    {
      id: 2,
      title: "Texas Solar Incentives & Tax Credits 2024",
      excerpt: "Maximize your savings with federal tax credits and Texas-specific solar incentives.",
      category: "Incentives",
      readTime: "8 min",
      featured: true
    },
    {
      id: 3,
      title: "How to Choose the Best Solar Installer",
      excerpt: "Key factors to consider when selecting a solar installation company in Texas.",
      category: "Choosing Installer",
      readTime: "6 min",
      featured: false
    },
    {
      id: 4,
      title: "Solar Panel Types: Monocrystalline vs Polycrystalline",
      excerpt: "Compare different solar panel technologies to find the best option for your home.",
      category: "Technology",
      readTime: "10 min",
      featured: false
    },
    {
      id: 5,
      title: "Battery Storage Systems for Texas Homes",
      excerpt: "Learn about solar battery options for energy independence and backup power.",
      category: "Storage",
      readTime: "9 min",
      featured: false
    },
    {
      id: 6,
      title: "Solar Financing Options in Texas",
      excerpt: "Explore loans, leases, and power purchase agreements for solar installations.",
      category: "Financing",
      readTime: "7 min",
      featured: false
    }
  ]);

  const categories = [
    { name: "Installation", icon: Sun, count: 15 },
    { name: "Incentives", icon: DollarSign, count: 8 },
    { name: "Technology", icon: Zap, count: 12 },
    { name: "Financing", icon: Calculator, count: 6 },
    { name: "Maintenance", icon: Shield, count: 4 },
    { name: "Storage", icon: Battery, count: 5 }
  ];

  const faqs = [
    {
      question: "How much does solar installation cost in Texas?",
      answer: "Solar installation costs in Texas typically range from $15,000 to $25,000 for a residential system after federal tax credits. The exact cost depends on system size, panel type, and installation complexity."
    },
    {
      question: "What solar incentives are available in Texas?",
      answer: "Texas offers several solar incentives including the federal solar tax credit (30% through 2032), property tax exemptions, net metering programs, and local utility rebates. Some cities also offer additional incentives."
    },
    {
      question: "How long does solar installation take?",
      answer: "Most residential solar installations in Texas take 1-3 days for the physical installation, plus additional time for permits, inspections, and utility interconnection. The entire process typically takes 4-8 weeks."
    },
    {
      question: "Do I need a permit for solar installation in Texas?",
      answer: "Yes, most Texas cities require permits for solar installations. Your installer will typically handle the permit process, but requirements vary by location and system size."
    },
    {
      question: "What is net metering in Texas?",
      answer: "Net metering allows you to sell excess solar energy back to the grid for credits on your utility bill. Texas has competitive retail electric providers, so net metering policies vary by utility company."
    },
    {
      question: "How do I choose a solar installer in Texas?",
      answer: "Look for NABCEP-certified installers with local experience, proper licensing, insurance, and positive reviews. Get multiple quotes and verify certifications before making a decision."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Solar Education Hub | Learn About Solar Energy in Texas"
        description="Comprehensive solar education resources for Texas homeowners. Learn about installation, incentives, financing, and technology. Expert guides and FAQs."
        canonicalUrl="https://solarinstallerstx.com/learn"
        schema={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Solar Education Hub",
          "description": "Educational resources for solar energy in Texas",
          "url": "https://solarinstallerstx.com/learn",
          "educationalCredentialAwarded": "Solar Installation Knowledge",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Solar Education Resources",
            "itemListElement": articles.map(article => ({
              "@type": "Course",
              "name": article.title,
              "description": article.excerpt,
              "provider": {
                "@type": "Organization",
                "name": "SolarInstallersTX"
              }
            }))
          }
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Learn</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Solar Education Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about solar energy in Texas. Expert guides, incentives, technology insights, and installation tips.
            </p>
          </div>

          {/* Featured Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.filter(article => article.featured).map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Card key={category.name} className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <category.icon className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* All Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="group hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Go Solar?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get a free quote from certified solar installers in your area. Compare prices, read reviews, and find the best solar solution for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/installers">Browse Installers</Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Learn;
