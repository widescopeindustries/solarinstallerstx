import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Users } from "lucide-react";

const SDVOSB_LOGO_URL = "/images/sba-sdvosb-logo.png"; 
const SBA_VERIFICATION_URL = "https://veterans.certify.sba.gov/#search";

const About = () => {
  return (
    <>
      <SEOHead
        title="About Us - A Texas-Based, Veteran-Owned Company"
        description="Learn about SolarInstallersTX.com, a Texas-based company founded on integrity. Our parent company, Widescope Industries LLC, is a certified Service-Disabled Veteran-Owned Small Business (SDVOSB)."
        canonicalUrl="https://solarinstallerstx.com/about"
      />
      <Header />
      <main>
        <div className="bg-background">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Texans Serving Texans: Built on a Foundation of Service
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              SolarInstallersTX.com is a Texas-based company dedicated to bringing transparency, quality, and trust to our local solar industry. We're not a faceless national directory; we're your neighbors, committed to empowering fellow Texans to make confident energy decisions.
            </p>
          </div>
        </div>

        <div className="py-16 bg-muted/40">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-100 p-8 flex flex-col items-center justify-center">
                  <img 
                    src={SDVOSB_LOGO_URL} 
                    alt="SBA Certified Service-Disabled Veteran-Owned Small Business Logo" 
                    className="w-40 h-40"
                    width="160"
                    height="160"
                  />
                  <a 
                    href={SBA_VERIFICATION_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 text-sm text-center text-primary hover:underline font-semibold"
                  >
                    Verify Our Certification
                  </a>
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    A Widescope Industries LLC Company
                  </h2>
                  <p className="mt-2 text-base text-gray-600">
                    SolarInstallersTX.com is proudly owned and operated by <strong className="font-semibold text-gray-700">Widescope Industries LLC</strong>, a Texas-based, Service-Disabled Veteran-Owned Small Business (SDVOSB) officially certified by the U.S. Small Business Administration (SBA).
                  </p>
                  <p className="mt-4 text-base text-gray-600">
                    This certification is more than a credential; it's a reflection of our core values<strong className="font-semibold text-gray-700">integrity, discipline, and an unwavering commitment to service</strong>. These are the principles that guide our mission to serve the Texas community with honor and transparency.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="mt-2 text-muted-foreground">
                  To provide Texans with a comprehensive, unbiased, and free resource to find trusted local solar installers.
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Our Values</h3>
                <p className="mt-2 text-muted-foreground">
                  Honesty, transparency, and a commitment to quality. We operate with the same integrity that defines our veteran leadership.
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Our Community</h3>
                <p className="mt-2 text-muted-foreground">
                  We are Texans serving Texans. Our goal is to strengthen our local communities by promoting clean energy and supporting local businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
