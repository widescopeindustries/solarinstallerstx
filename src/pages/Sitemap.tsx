import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Zap, BookOpen, Shield, BarChart3, Phone } from "lucide-react";

const Sitemap = () => {
  const cities = [
    'austin', 'dallas', 'houston', 'san-antonio', 'fort-worth',
    'el-paso', 'arlington', 'corpus-christi', 'plano', 'lubbock',
    'laredo', 'garland', 'frisco', 'mckinney', 'killeen', 'waco'
  ];

  const mainPages = [
    { path: '/', label: 'Home', description: 'Find certified solar installers in Texas' },
    { path: '/installers', label: 'Find Installers', description: 'Browse all NABCEP certified solar installers' },
    { path: '/quote', label: 'Get Free Quote', description: 'Request free solar installation quotes' },
  ];

  const learningResources = [
    { path: '/learn', label: 'Solar Learning Center', description: 'Comprehensive solar education hub' },
    { path: '/learn/solar-buying-guide-texas', label: 'Solar Buying Guide', description: 'Complete guide to buying solar in Texas' },
    { path: '/learn/texas-incentives', label: 'Texas Incentives Guide', description: 'All available solar incentives in Texas' },
    { path: '/learn/choosing-installer', label: 'Choosing an Installer', description: 'How to select the right solar installer' },
    { path: '/learn/solar-panel-types', label: 'Solar Panel Types', description: 'Understanding different panel technologies' },
    { path: '/learn/battery-storage', label: 'Battery Storage Guide', description: 'Solar battery storage options and costs' },
    { path: '/learn/solar-financing', label: 'Solar Financing Guide', description: 'Financing options for solar systems' },
  ];

  const trustPages = [
    { path: '/safety-score-explained', label: 'Safety Score System', description: 'How we rate and verify solar installers' },
    { path: '/how-we-protect-you', label: 'How We Protect You', description: 'Consumer protection measures and guarantees' },
    { path: '/sunnova-help', label: 'Sunnova Bankruptcy Help', description: 'Help if affected by solar company bankruptcy' },
    { path: '/report-bankruptcy', label: 'Report Bankruptcy', description: 'Report a solar installer bankruptcy' },
  ];

  const companyPages = [
    { path: '/about', label: 'About Us', description: 'Learn about SolarInstallersTX' },
    { path: '/contact', label: 'Contact Us', description: 'Contact our sales and support team' },
    { path: '/faq', label: 'FAQ', description: 'Frequently asked questions about solar' },
    { path: '/blog', label: 'Blog', description: 'Solar news, tips, and industry insights' },
  ];

  const partnerPages = [
    { path: '/for-installers', label: 'For Installers', description: 'Become a verified solar installer' },
    { path: '/upgrade-to-premium', label: 'Premium Listings', description: 'Upgrade to premium installer listing' },
  ];

  const legalPages = [
    { path: '/privacy', label: 'Privacy Policy', description: 'Our privacy policy and data practices' },
    { path: '/terms', label: 'Terms of Service', description: 'Terms and conditions of use' },
    { path: '/affiliate-disclosure', label: 'Affiliate Disclosure', description: 'Our affiliate disclosure statement' },
    { path: '/refund', label: 'Refund Policy', description: 'Refund policy for services' },
  ];

  return (
    <>
      <SEOHead
        title="Sitemap | SolarInstallersTX.com"
        description="Complete sitemap of SolarInstallersTX.com. Browse all pages, city guides, learning resources, and trust & safety information."
        canonicalUrl="https://solarinstallerstx.com/sitemap"
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Site Map</h1>
            <p className="text-xl text-muted-foreground">
              Navigate the complete SolarInstallersTX.com website. Find certified solar installers, learning resources, and trust & safety information.
            </p>
          </div>

          {/* Main Pages */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Main Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mainPages.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-primary hover:underline font-medium text-lg"
                        title={page.description}
                      >
                        {page.label}
                      </Link>
                      <p className="text-sm text-muted-foreground">{page.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* City Pages */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Solar Installers by City ({cities.length} cities)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cities.map((city) => (
                    <Link
                      key={city}
                      to={`/cities/${city}`}
                      className="text-primary hover:underline"
                      title={`Find solar installers in ${city.replace('-', ' ')}, Texas`}
                    >
                      {city.replace('-', ' ')} Solar
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Resources */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Solar Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {learningResources.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-primary hover:underline font-medium"
                        title={page.description}
                      >
                        {page.label}
                      </Link>
                      <p className="text-sm text-muted-foreground">{page.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Trust & Safety */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {trustPages.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-primary hover:underline font-medium"
                        title={page.description}
                      >
                        {page.label}
                      </Link>
                      <p className="text-sm text-muted-foreground">{page.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Company Pages */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {companyPages.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-primary hover:underline font-medium"
                        title={page.description}
                      >
                        {page.label}
                      </Link>
                      <p className="text-sm text-muted-foreground">{page.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Partner Pages */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  For Installers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {partnerPages.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-primary hover:underline font-medium"
                        title={page.description}
                      >
                        {page.label}
                      </Link>
                      <p className="text-sm text-muted-foreground">{page.description}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Legal Pages */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Legal & Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {legalPages.map((page) => (
                    <div key={page.path}>
                      <Link
                        to={page.path}
                        className="text-primary hover:underline font-medium block"
                        title={page.description}
                      >
                        {page.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Section */}
          <div className="mb-12 bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Site Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-3xl font-bold text-primary">{16 + cities.length}</div>
                <div className="text-sm text-muted-foreground">City Pages</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Learning Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Trust Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Total Pages</div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
