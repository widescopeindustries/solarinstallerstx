import { Link, useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { LastUpdated } from "@/components/LastUpdated";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Share2, ArrowLeft } from "lucide-react";
import { getBlogPostBySlug } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Legacy content that was previously hardcoded
  const legacyContent = `
      <h2>Major Changes to Texas Solar Incentives in 2025</h2>
      <p>Texas homeowners looking to go solar in 2025 have excellent incentive opportunities. Here's what's new and what you need to know to maximize your savings.</p>
      
      <h3>1. Federal Solar Tax Credit Remains at 30%</h3>
      <p>The federal Investment Tax Credit (ITC) remains at <strong>30% through 2032</strong>, down from the previous scheduled decrease. This means Texas homeowners can deduct 30% of their total solar system cost from their federal taxes.</p>
      
      <h4>What's Covered:</h4>
      <ul>
        <li>Solar panels and racking</li>
        <li>Inverters and electrical equipment</li>
        <li>Battery storage systems (added in 2023)</li>
        <li>Installation labor costs</li>
        <li>Permit fees and inspections</li>
      </ul>
      
      <h3>2. CPS Energy (San Antonio) Rebate Updates</h3>
      <p>CPS Energy has <strong>increased rebates</strong> for residential solar installations:</p>
      <ul>
        <li><strong>Previous:</strong> $0.50/watt</li>
        <li><strong>New (2025):</strong> $0.60/watt for systems up to 25kW</li>
        <li><strong>Maximum rebate:</strong> $15,000 per residential installation</li>
      </ul>
      
      <h3>3. Oncor Service Territory Enhancements</h3>
      <p>Oncor (serving Dallas, Fort Worth, and much of North Texas) has implemented new programs:</p>
      <ul>
        <li>Enhanced net metering credits</li>
        <li>Streamlined interconnection process (now 10-15 business days)</li>
        <li>New battery storage incentive pilot program</li>
      </ul>
      
      <h3>4. Property Tax Exemption Remains Strong</h3>
      <p>Texas continues to offer <strong>100% property tax exemption</strong> on the added value from solar installations. This exemption:</p>
      <ul>
        <li>Applies to both residential and commercial properties</li>
        <li>Has no expiration date</li>
        <li>Transfers with property sale</li>
        <li>Saves average homeowner $300-500 annually</li>
      </ul>
      
      <h3>5. New Austin Energy Programs</h3>
      <p>Austin Energy has launched <strong>expanded solar programs</strong> for 2025:</p>
      <ul>
        <li>Value of Solar (VOS) tariff increased to $0.097/kWh</li>
        <li>New low-income solar assistance program</li>
        <li>Community solar options for renters and apartment dwellers</li>
      </ul>
      
      <h2>How to Maximize Your 2025 Solar Savings</h2>
      
      <h3>Step 1: Calculate Your Potential Savings</h3>
      <p>Use our <a href="https://solarinstallerstx.com/cities/austin">solar calculator</a> to estimate your specific savings based on your location, energy usage, and system size.</p>
      
      <h3>Step 2: Get Multiple Quotes</h3>
      <p>Compare quotes from <strong>at least 3 NABCEP certified installers</strong>. Our directory includes 500+ certified professionals across Texas.</p>
      
      <h3>Step 3: Understand Your Utility's Net Metering Policy</h3>
      <p>Each Texas utility has different net metering rules:</p>
      <ul>
        <li><strong>CPS Energy:</strong> Full retail credit</li>
        <li><strong>Oncor:</strong> Wholesale rate credit</li>
        <li><strong>Austin Energy:</strong> Value of Solar tariff</li>
        <li><strong>CenterPoint:</strong> Avoided cost rate</li>
      </ul>
      
      <h3>Step 4: Apply for Incentives Early</h3>
      <p>Many utility rebate programs are <strong>first-come, first-served</strong> with limited annual budgets. Apply as soon as you sign your installation contract.</p>
      
      <h2>2025 Solar Cost Breakdown Example</h2>
      <p>Here's what a typical 7kW residential system costs in Texas with 2025 incentives:</p>
      
      <div class="bg-muted p-6 rounded-lg my-6">
        <table class="w-full">
          <tr><td><strong>Base System Cost:</strong></td><td class="text-right">$21,000</td></tr>
          <tr><td>Federal Tax Credit (30%):</td><td class="text-right">-$6,300</td></tr>
          <tr><td>CPS Energy Rebate (example):</td><td class="text-right">-$4,200</td></tr>
          <tr class="border-t border-border"><td><strong>Net Cost:</strong></td><td class="text-right"><strong>$10,500</strong></td></tr>
        </table>
      </div>
      
      <h2>What's Coming in 2025</h2>
      <p>Keep an eye on these potential developments:</p>
      <ul>
        <li>Possible expansion of El Paso Electric's rebate program</li>
        <li>New battery storage incentives from multiple utilities</li>
        <li>Enhanced low-income solar access programs</li>
        <li>Streamlined permitting in major metro areas</li>
      </ul>
      
      <h2>Get Started Today</h2>
      <p>With the 30% federal tax credit, strong utility rebates, and property tax exemptions, 2025 is an excellent year to go solar in Texas. <a href="https://solarinstallerstx.com/quote">Get your free quote</a> from NABCEP certified installers today.</p>
    `;

  // Use legacy content for the original incentives post, otherwise use post content
  const displayContent = slug === "texas-solar-incentives-january-2025" && post.content.includes("[Previous blog post content")
    ? legacyContent
    : post.content;

  return (
    <>
      <SEOHead 
        title={`${post.title} | Texas Solar Blog`}
        description="Major updates to Texas solar incentives for 2025. Learn about federal tax credits, utility rebates, and how to maximize your solar savings."
        canonicalUrl={`https://solarinstallerstx.com/blog/${slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "datePublished": post.lastUpdated,
          "dateModified": post.lastUpdated,
          "author": {
            "@type": "Organization",
            "name": "SolarInstallersTX"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SolarInstallersTX",
            "logo": {
              "@type": "ImageObject",
              "url": "https://solarinstallerstx.com/opengraph-image.svg"
            }
          },
          "keywords": post.keywords.join(", ")
        }}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              {/* Package 2: Author Byline */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">By</span>
                    <span className="font-semibold text-foreground text-lg">Lyndon Bedford</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Texas Solar Energy Expert</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last Updated: {new Date(post.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <LastUpdated date={new Date(post.lastUpdated)} />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Article Content */}
            <Card>
              <CardContent className="p-8 prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: displayContent }} />
              </CardContent>
            </Card>

            {/* Package 2: Conversion CTA Box */}
            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/20 border-2 border-primary/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">See Your Solar Savings</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                  You've done the research. The next step is to see your potential savings.
                  Get a 100% free, no-obligation quote from NABCEP-certified installers in your area.
                </p>
                <Button asChild size="lg" className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-shadow">
                  <Link to="/quote">Get My Free Quote</Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  ✓ 100% Free, No Obligation • ✓ NABCEP-Certified Installers • ✓ Compare Multiple Quotes
                </p>
              </CardContent>
            </Card>

            {/* Package 2: Author Bio Box */}
            <Card className="mt-8 bg-muted/30 border-l-4 border-l-primary">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-foreground">About the Author</h3>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-foreground mb-1">Lyndon Bedford</p>
                    <p className="text-sm text-muted-foreground mb-3">Texas Solar Energy Expert</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Lyndon Bedford is a Texas-based solar energy expert with over a decade of experience in the renewable energy sector.
                      As a Service-Disabled Veteran and founder of SolarInstallersTX.com, he's dedicated to helping fellow Texans navigate
                      the solar landscape with transparency and integrity. His mission is to empower homeowners with the knowledge and
                      resources they need to make confident solar investment decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;

